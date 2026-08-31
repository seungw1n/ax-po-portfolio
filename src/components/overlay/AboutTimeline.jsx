import React, { useRef, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import useStore from '../../store/useStore';
import { timeline } from '../../data/pages/about-me/timeline';

/* 축 전체 범위: 2017.01 → 2026.09 를 100% 로 본다 */
const AXIS_START = '2017-01';
const AXIS_END = '2026-09';

const toMonths = (value) => {
    const [year, month] = value.split('-').map(Number);
    return year * 12 + (month - 1);
};

const AXIS_FROM = toMonths(AXIS_START);
const AXIS_SPAN = toMonths(AXIS_END) - AXIS_FROM;

/* 기간을 축 위의 left/width 백분율로 변환 */
const toBand = (start, end) => {
    const from = Math.max(0, toMonths(start) - AXIS_FROM);
    const to = Math.min(AXIS_SPAN, toMonths(end) - AXIS_FROM);
    const left = (from / AXIS_SPAN) * 100;
    const width = (Math.max(to - from, 0.6) / AXIS_SPAN) * 100;
    return { left, width };
};

const AXIS_YEARS = Array.from(
    { length: Math.floor(AXIS_SPAN / 12) + 1 },
    (_, i) => Number(AXIS_START.slice(0, 4)) + i
);

/* 활동 성격별 색: 실무 / 학업·교육 / 활동 / 그 외 */
const TAG_TONE = {
    work: 'border-sky-800/30 bg-sky-600/10 text-sky-900/75',
    study: 'border-amber-800/30 bg-amber-600/10 text-amber-900/75',
    activity: 'border-violet-800/25 bg-violet-600/10 text-violet-900/70',
    other: 'border-black/15 bg-black/[0.04] text-black/45',
};

const BAR_TONE = {
    work: 'bg-sky-900/75',
    study: 'bg-amber-800/70',
    activity: 'bg-violet-900/55',
    other: 'bg-black/45',
};

/* 트랙 기준 좌표 — 축이 프롤로그 칸만큼 밀려 있으므로 offsetParent 를 거슬러 올라가 더한다.
   (getBoundingClientRect 는 모달의 scale 애니메이션에 영향을 받아 쓰지 않는다) */
const offsetIn = (element, root) => {
    let x = 0;
    let y = 0;
    let node = element;
    while (node && node !== root) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent;
    }
    return { x, y };
};

/* 카드 한 장: 번호 / 활동명 / 간단한 내용 / 결과·레슨런 */
const TimelineCard = React.forwardRef(({ item, index, labels }, ref) => (
    <article
        ref={ref}
        className="w-[280px] md:w-[320px] shrink-0 flex flex-col border border-black/10 bg-white/85 backdrop-blur-sm"
    >
        <div className="flex items-baseline justify-between gap-3 px-5 pt-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-black/45">
                <span className="text-black/70">{String(index + 1).padStart(2, '0')}</span>
                <span className="mx-2 text-black/20">/</span>
                {item.period}
            </span>
            <span className={`shrink-0 text-[10px] tracking-[0.15em] uppercase border px-2 py-0.5 ${TAG_TONE[item.tone] || TAG_TONE.other}`}>
                {item.kind}
            </span>
        </div>

        <h4 className="px-5 mt-3 text-base font-bold leading-snug text-black">
            {item.title}
        </h4>

        <p className="px-5 mt-3 text-[13px] leading-relaxed text-black/60">
            {item.body}
        </p>

        <dl className="mt-8 px-5 pb-5">
            <div className="border-t border-black/10 pt-4">
                <dt className="text-[10px] tracking-[0.2em] uppercase text-black/40">
                    {labels.result}
                </dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-black/75">
                    {item.result}
                </dd>
            </div>
            <div className="mt-3">
                <dt className="text-[10px] tracking-[0.2em] uppercase text-black/40">
                    {labels.lesson}
                </dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-black/75 italic">
                    {item.lesson}
                </dd>
            </div>
        </dl>
    </article>
));

TimelineCard.displayName = 'TimelineCard';

/* 축이 시작되기 전 한 칸 — 번호도 기간 막대도 없고, 결과·레슨런도 두지 않는다 */
const PrologueCard = ({ item }) => (
    <article className="w-[280px] md:w-[320px] shrink-0 flex flex-col border border-dashed border-black/15 bg-white/60 backdrop-blur-sm">
        <div className="flex items-baseline justify-between gap-3 px-5 pt-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-black/45">
                <span className="text-black/25">—</span>
                <span className="mx-2 text-black/20">/</span>
                {item.cardPeriod}
            </span>
            <span className={`shrink-0 text-[10px] tracking-[0.15em] uppercase border px-2 py-0.5 ${TAG_TONE[item.tone] || TAG_TONE.other}`}>
                {item.kind}
            </span>
        </div>

        <h4 className="px-5 mt-3 text-base font-bold leading-snug text-black">
            {item.title}
        </h4>

        {(item.body || []).map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="px-5 mt-3 last:pb-5 text-[13px] leading-relaxed text-black/60">
                {paragraph}
            </p>
        ))}
    </article>
);

const AboutTimeline = () => {
    const language = useStore((state) => state.language);
    const data = timeline[language] || timeline.EN;

    const scrollRef = useRef(null);
    const trackRef = useRef(null);
    const segmentRefs = useRef([]);
    const cardRefs = useRef([]);
    const animRef = useRef({ target: 0, raf: 0 });
    const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
    const [links, setLinks] = useState([]);

    const eras = useMemo(() => data?.eras || [], [data]);

    /* 시작 시점 순으로 줄 세운 뒤 통번호를 매긴다 — 카드 순서가 축 위 순서와 항상 같아진다 */
    const numberedItems = useMemo(
        () =>
            eras
                .flatMap((era) => era.items.map((item) => ({ ...item, eraId: era.id })))
                .sort((a, b) => toMonths(a.start) - toMonths(b.start) || toMonths(a.end) - toMonths(b.end))
                .map((item, index) => ({ ...item, index })),
        [eras]
    );

    /* 기간이 겹치는 구간은 아래 줄로 내려 서로 가리지 않게 배치 (번호 라벨 폭만큼 여유를 둔다) */
    const lanes = useMemo(() => {
        const LABEL_GAP = 3; // months
        const rows = [];
        numberedItems.forEach((item) => {
            const from = toMonths(item.start);
            const to = toMonths(item.end);
            const row = rows.find((candidate) =>
                candidate.every((placed) =>
                    to + LABEL_GAP < toMonths(placed.start) || from > toMonths(placed.end) + LABEL_GAP
                )
            );
            if (row) row.push(item);
            else rows.push([item]);
        });
        return rows;
    }, [numberedItems]);

    /* 카드 왼쪽 위 모서리와 축 위 기간 시작점을 잇는 선의 좌표를 실측한다 */
    useLayoutEffect(() => {
        const measure = () => {
            const track = trackRef.current;
            if (!track) return;
            setLinks(
                numberedItems
                    .map((item, i) => {
                        const segment = segmentRefs.current[i];
                        const card = cardRefs.current[i];
                        if (!segment || !card) return null;
                        const bar = offsetIn(segment, track);
                        const box = offsetIn(card, track);
                        return {
                            key: `${item.eraId}-${item.index}`,
                            x1: bar.x,
                            y1: bar.y + segment.offsetHeight,
                            x2: box.x,
                            y2: box.y,
                        };
                    })
                    .filter(Boolean)
            );
        };

        measure();
        const observer = new ResizeObserver(measure);
        if (trackRef.current) observer.observe(trackRef.current);
        window.addEventListener('resize', measure);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [numberedItems]);

    /* requestAnimationFrame 으로 목표 위치까지 감속 이동 — 휠/드래그를 부드럽게 */
    const glide = useCallback(() => {
        const el = scrollRef.current;
        const state = animRef.current;
        if (!el) return;

        const step = () => {
            const distance = state.target - el.scrollLeft;
            if (Math.abs(distance) < 0.5) {
                el.scrollLeft = state.target;
                state.raf = 0;
                return;
            }
            el.scrollLeft += distance * 0.18;
            state.raf = requestAnimationFrame(step);
        };
        step();
    }, []);

    /**
     * 세로 휠을 축의 가로 이동으로 바꾼다.
     * 트랙 위에서는 브라우저가 세로 휠을 상위로 넘겨주지 않기 때문에,
     * 양 끝에 닿으면 preventDefault 를 걸지 않아 모달의 세로 스크롤로 되돌려준다.
     */
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return undefined;

        const state = animRef.current;
        state.target = el.scrollLeft;

        const onWheel = (e) => {
            if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // 트랙패드 가로 제스처는 기본 동작
            const max = el.scrollWidth - el.clientWidth;
            if (max <= 0) return;
            const atStart = e.deltaY < 0 && el.scrollLeft <= 0;
            const atEnd = e.deltaY > 0 && el.scrollLeft >= max - 1;
            if (atStart || atEnd) return;

            e.preventDefault();
            const base = state.raf ? state.target : el.scrollLeft;
            state.target = Math.max(0, Math.min(max, base + e.deltaY));
            if (!state.raf) state.raf = requestAnimationFrame(glide);
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => {
            el.removeEventListener('wheel', onWheel);
            if (state.raf) cancelAnimationFrame(state.raf);
            state.raf = 0;
        };
    }, [glide]);

    // 마우스 드래그로도 가로 이동
    const onPointerDown = useCallback((e) => {
        const el = scrollRef.current;
        if (!el || e.pointerType === 'touch') return;
        const state = animRef.current;
        if (state.raf) {
            cancelAnimationFrame(state.raf);
            state.raf = 0;
        }
        state.target = el.scrollLeft;
        dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
        el.classList.add('select-none');
        el.setPointerCapture?.(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e) => {
        const el = scrollRef.current;
        const drag = dragRef.current;
        if (!el || !drag.active) return;
        el.scrollLeft = drag.startScroll - (e.clientX - drag.startX);
        animRef.current.target = el.scrollLeft;
    }, []);

    const endDrag = useCallback((e) => {
        const el = scrollRef.current;
        dragRef.current.active = false;
        if (!el) return;
        el.classList.remove('select-none');
        if (e?.pointerId != null) el.releasePointerCapture?.(e.pointerId);
    }, []);

    if (!data) return null;

    const { label, title, description, hint, cardLabels, analysis, prologue } = data;

    return (
        <section className="mt-14 md:mt-20">
            {/* Section header */}
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-black/15 pt-6">
                <div>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-black/40">{label}</p>
                    <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-black">
                        {title}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm md:text-[15px] leading-relaxed text-black/55">
                        {description}
                    </p>
                </div>
                <p className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-black/35">
                    <svg width="26" height="8" viewBox="0 0 26 8" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                        <path d="M0 4h25M21 1l4 3-4 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {hint}
                </p>
            </div>

            {/* 톤 다운한 가로 스크롤 밴드 — 좌우는 모달 패딩 안쪽에 두어 세로 스크롤 여백을 남긴다 */}
            <div className="mt-8 bg-black/[0.05] border border-black/10">
                <div
                    ref={scrollRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onPointerLeave={endDrag}
                    className="overflow-x-auto px-6 md:px-8 py-8 cursor-grab active:cursor-grabbing [scrollbar-width:thin] [overscroll-behavior-x:contain]"
                >
                    <div ref={trackRef} className="relative w-max">
                      <div className="flex items-stretch gap-4" style={{ height: 92 + lanes.length * 15 }}>
                        {/* 축이 시작되기 전 한 칸 — 카드 한 장과 같은 너비 */}
                        {prologue && (
                            <div className="relative w-[280px] md:w-[320px] shrink-0">
                                <div className="h-[46px] border-l border-dashed border-black/20 pl-3 pr-2 pt-0.5">
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-black/35 truncate">
                                        00
                                    </p>
                                    <p className="mt-0.5 text-[13px] font-bold leading-tight text-black/55 truncate">
                                        {prologue.eraTitle}
                                    </p>
                                </div>
                                {/* 축 바깥 구간이라 점선으로만 이어둔다 */}
                                <div className="absolute left-0 right-0 top-[54px] border-t border-dashed border-black/25" />
                            </div>
                        )}

                        {/* 시간 축: 2017.01 → 2026.09 를 100% 로 하는 하나의 연속된 선 */}
                        <div className="relative flex-1">
                            {/* 구간(era) 밴드 */}
                            {eras.map((era, i) => {
                                const band = toBand(era.start, era.end);
                                return (
                                    <div
                                        key={era.id}
                                        className="absolute top-0 h-[46px] border-l border-black/15 overflow-hidden"
                                        style={{ left: `${band.left}%`, width: `${band.width}%` }}
                                    >
                                        <div className={`h-full pl-3 pr-2 pt-0.5 ${i % 2 === 0 ? 'bg-black/[0.03]' : ''}`}>
                                            <p className="text-[10px] tracking-[0.2em] uppercase text-black/35 truncate">
                                                {String(i + 1).padStart(2, '0')} · {era.period}
                                            </p>
                                            <p className="mt-0.5 text-[13px] font-bold leading-tight text-black/70 truncate">
                                                {era.title}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* 축선 */}
                            <div className="absolute left-0 right-0 top-[54px] h-px bg-black/30" />

                            {/* 연도 눈금 */}
                            {AXIS_YEARS.map((year) => {
                                const left = ((toMonths(`${year}-01`) - AXIS_FROM) / AXIS_SPAN) * 100;
                                if (left < 0 || left > 100) return null;
                                return (
                                    <div key={year} className="absolute top-[48px]" style={{ left: `${left}%` }}>
                                        <span className="block w-px h-[13px] bg-black/25" />
                                        <span className="block mt-1 -ml-3 text-[10px] tracking-[0.1em] text-black/35">
                                            {year}
                                        </span>
                                    </div>
                                );
                            })}

                            {/* 카드 기간 — 겹치는 구간은 줄을 나눠 표시 */}
                            {lanes.map((lane, laneIndex) =>
                                lane.map((item) => {
                                    const band = toBand(item.start, item.end);
                                    return (
                                        <div
                                            key={`${item.eraId}-${item.index}`}
                                            ref={(node) => {
                                                segmentRefs.current[item.index] = node;
                                            }}
                                            className="absolute"
                                            style={{
                                                left: `${band.left}%`,
                                                width: `${band.width}%`,
                                                top: 86 + laneIndex * 15,
                                            }}
                                        >
                                            {/* 번호는 막대 바깥(왼쪽)에 두어 막대가 정확히 기간만큼만 그려지게 한다 */}
                                            <span className="absolute right-full mr-1.5 -top-[3px] text-[10px] leading-none tracking-[0.1em] text-black/40">
                                                {String(item.index + 1).padStart(2, '0')}
                                            </span>
                                            <span className={`block h-[5px] rounded-full ${BAR_TONE[item.tone] || BAR_TONE.other}`} />
                                        </div>
                                    );
                                })
                            )}
                        </div>
                      </div>

                        {/* 카드 ↔ 기간 시작점 연결선 */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            aria-hidden="true"
                        >
                            {links.map((link) => (
                                <g key={link.key}>
                                    <path
                                        d={`M ${link.x1} ${link.y1} L ${link.x1} ${link.y1 + 12} L ${link.x2} ${link.y2 - 12} L ${link.x2} ${link.y2}`}
                                        fill="none"
                                        stroke="rgba(0,0,0,0.22)"
                                        strokeWidth="1"
                                    />
                                    <circle cx={link.x2} cy={link.y2} r="2" fill="rgba(0,0,0,0.35)" />
                                </g>
                            ))}
                        </svg>

                        {/* 카드 행 */}
                        <div className="flex items-stretch gap-4 pt-8">
                            {prologue && <PrologueCard item={prologue} />}
                            {numberedItems.map((item) => (
                                <TimelineCard
                                    key={`${item.eraId}-${item.index}`}
                                    ref={(node) => {
                                        cardRefs.current[item.index] = node;
                                    }}
                                    item={item}
                                    index={item.index}
                                    labels={cardLabels}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Synthesis */}
            {analysis && (
                <div className="mt-12 md:mt-16 border-t border-black/15 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                        <div className="md:col-span-4">
                            <p className="text-[11px] tracking-[0.3em] uppercase text-black/40">
                                {analysis.label}
                            </p>
                            <h3 className="mt-3 text-xl md:text-2xl font-bold tracking-tight text-black">
                                {analysis.title}
                            </h3>
                        </div>
                        <p className="md:col-span-8 text-sm md:text-[15px] leading-relaxed text-black/60">
                            {analysis.intro}
                        </p>
                    </div>

                    <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
                        {(analysis.lenses || []).map((lens, i) => (
                            <li key={lens.title} className="bg-white/70 backdrop-blur-sm p-6">
                                <p className="text-[11px] tracking-[0.25em] uppercase text-black/35">
                                    {String(i + 1).padStart(2, '0')}
                                    {lens.kicker && (
                                        <span className="ml-2 text-black/50">{lens.kicker}</span>
                                    )}
                                </p>
                                <h4 className="mt-2 text-base md:text-lg font-bold leading-snug text-black">
                                    {lens.title}
                                </h4>
                                <p className="mt-3 text-[13px] md:text-sm leading-relaxed text-black/65">
                                    {lens.body}
                                </p>
                                {lens.points && (
                                    <ul className="mt-4 border-t border-black/10">
                                        {lens.points.map((point) => (
                                            <li
                                                key={point}
                                                className="py-2 border-b border-black/10 text-[12px] md:text-[13px] leading-relaxed text-black/60"
                                            >
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ol>

                    {analysis.closing && (
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                            <h4 className="md:col-span-4 text-[11px] tracking-[0.3em] uppercase text-black/40">
                                {analysis.closingTitle}
                            </h4>
                            <p className="md:col-span-8 text-sm md:text-[15px] leading-relaxed text-black/70">
                                {analysis.closing}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default AboutTimeline;
