import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        // 1. 제목
        defineField({
            name: 'title',
            title: '프로젝트 제목',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        // 2. 서브타이틀
        defineField({
            name: 'subtitle',
            title: '서브타이틀',
            type: 'string',
            description: '표지에서 제목 아래에 표시되는 한 줄 부제입니다.',
        }),

        // 3. 요약
        defineField({
            name: 'summary',
            title: '요약 (Summary)',
            type: 'text',
            rows: 3,
            description: '프로젝트 목록 카드 설명 + 표지 개요 본문으로 쓰입니다.',
        }),

        // 3. 기간
        defineField({
            name: 'period',
            title: '기간',
            type: 'string',
            description: '예: 2024.01 - 2024.03, 또는 3개월',
        }),

        // 4. 직무
        defineField({
            name: 'role',
            title: '직무',
            type: 'string',
            options: {
                list: [
                    { title: 'PO', value: 'PO' },
                    { title: '서비스 기획', value: '서비스기획' },
                    { title: '프로덕트 디자이너', value: '프로덕트 디자이너' },
                ],
                layout: 'dropdown',
            },
        }),

        // 5. 소속
        defineField({
            name: 'organization',
            title: '소속',
            type: 'string',
            options: {
                list: [
                    { title: '빅밸류 (BigValue)', value: '빅밸류' },
                    { title: '휴맥스모빌리티 (HUMAX mobility)', value: '휴맥스모빌리티' },
                    { title: '블링커스 (Blinkers)', value: '블링커스' },
                    { title: '인터보이드 (intervoid)', value: '인터보이드' },
                ],
                layout: 'dropdown',
            },
        }),

        // 6. 기여
        defineField({
            name: 'contributions',
            title: '기여',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'list',
                list: [
                    { title: '문제 정의', value: '문제 정의' },
                    { title: '유저 리서치', value: '유저 리서치' },
                    { title: '화면 설계', value: '화면 설계' },
                    { title: '프로토타입', value: '프로토타입' },
                    { title: 'FE 개발', value: 'FE 개발' },
                    { title: '1인 개발', value: '1인 개발' },
                ],
            },
        }),

        // 7. 제품 유형 (구: 도메인 태그)
        defineField({
            name: 'productTypes',
            title: '제품 유형',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'list',
                list: [
                    { title: '웹', value: '웹' },
                    { title: '모바일', value: '모바일' },
                    { title: '키오스크', value: '키오스크' },
                    { title: '코어', value: '코어' },
                    { title: '에이전트', value: '에이전트' },
                ],
            },
        }),

        // 8. 경험 구분 (구: 소속 태그)
        defineField({
            name: 'experienceType',
            title: '경험 구분',
            type: 'string',
            options: {
                list: [
                    { title: '실무', value: '실무' },
                    { title: '개인', value: '개인' },
                    { title: '창업', value: '창업' },
                    { title: '해커톤', value: '해커톤' },
                ],
                layout: 'dropdown',
            },
        }),

        // 9. 대표 썸네일 이미지
        defineField({
            name: 'thumbnail',
            title: '대표 썸네일 이미지',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),

        // 10. 섹션 단위 본문
        defineField({
            name: 'sections',
            title: '본문 섹션',
            description: '섹션 별로 제목, 타입, 이미지, 본문을 각각 입력하세요.',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'section',
                    title: '섹션',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'sectionTitle',
                            title: '섹션 제목',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'sectionType',
                            title: '섹션 타입',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '배경', value: '배경' },
                                    { title: '실험', value: '실험' },
                                    { title: '문제', value: '문제' },
                                    { title: '화면 설계', value: '화면 설계' },
                                    { title: '시스템 설계', value: '시스템 설계' },
                                    { title: 'A/B 테스트', value: 'A/B 테스트' },
                                    { title: '결과/회고', value: '결과/회고' },
                                ],
                                layout: 'dropdown',
                            },
                        }),
                        defineField({
                            name: 'sectionImage',
                            title: '섹션 이미지',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: 'body',
                            title: '본문',
                            type: 'array',
                            of: [
                                defineArrayMember({ type: 'block' }),
                                defineArrayMember({
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [
                                        defineField({ name: 'caption', type: 'string', title: '이미지 설명' }),
                                    ],
                                }),
                            ],
                        }),
                        defineField({
                            name: 'highlights',
                            title: '항목 박스 (라벨:값)',
                            description: '본문 아래에 박스로 표시될 핵심 항목입니다. 예) 라벨="타깃", 값="B2B 의사결정자"',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    name: 'highlight',
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'label', title: '라벨', type: 'string', validation: (Rule) => Rule.required() }),
                                        defineField({ name: 'value', title: '값', type: 'string', validation: (Rule) => Rule.required() }),
                                    ],
                                    preview: { select: { title: 'label', subtitle: 'value' } },
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'sectionTitle',
                            subtitle: 'sectionType',
                            media: 'sectionImage',
                        },
                    },
                }),
            ],
        }),
    ],
})
