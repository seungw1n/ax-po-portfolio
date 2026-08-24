/**
 * 소개 페이지의 가로 스크롤 타임라인 + 종합 분석 데이터.
 * 출처: docs/이력서_정승원.pdf, docs/linkedin-profile.pdf, docs/경력기술서.md
 * 카드 구조: 활동명 / 간단한 내용(왜·뭘·어떻게) / 결과·레슨런
 */
export const timeline = {
    KO: {
        label: "TIMELINE",
        title: "스무 살부터 지금까지",
        description: "시각디자인 전공으로 시작해 데이터 프로덕트 오너가 되기까지, 여섯 구간의 기록입니다.",
        hint: "가로로 스크롤하거나 드래그하세요",
        cardLabels: {
            result: "결과",
            lesson: "레슨런"
        },
        eras: [
            {
                id: "explore",
                period: "2017 — 2020",
                start: "2017-01",
                end: "2020-12",
                title: "만들 세계를 정하다",
                inflection: "작품으로 세계를 짓겠다는 충동이 '사업'이라는 형태를 만난 구간",
                items: [
                    {
                        period: "2017.03 — 2023.08",
                        start: "2017-03",
                        end: "2023-08",
                        kind: "학업",
                        tone: "study",
                        title: "서울시립대학교 시각디자인 · 창업학 복수전공",
                        body: "초등학생 때 종이 공책으로 게임을 만들어 반 친구들을 유저로 모으던 습관을, 전공이라는 형태로 이어가고 싶었습니다. 남들과 다른 작품관을 갖기 위해 해부학·빛·역사처럼 전공 밖 개념을 끌어와 연결하는 훈련을 반복했고, 사용자 편의만이 아니라 비즈니스 성장까지 보기 위해 창업학을 복수전공했습니다.",
                        result: "학점우수장학(2021.02), 졸업 프로젝트 헬스케어 마이데이터 공유 플랫폼 'DATO' 외 2건",
                        lesson: "창의는 없던 것을 만드는 일이 아니라, 멀리 있는 두 개념 사이에서 연결을 찾아내는 일이다."
                    },
                    {
                        period: "2018 — 2019.01",
                        start: "2018-01",
                        end: "2019-01",
                        kind: "창업",
                        tone: "activity",
                        title: "SK LOOKIE 창업동아리 · 교내 창업경진대회",
                        body: "아버지의 영향으로 막연히 갖고 있던 '내 사업'이라는 생각을 실제로 시험해보고 싶었습니다. 15개월간 동아리에서 아이디어를 굴리며 게이미피케이션 기반 맛집 공유 SNS를 팀으로 기획했고, 사람을 모으는 장치인 게임 규칙을 그대로 서비스 구조에 옮겨봤습니다.",
                        result: "서울시립대학교 창업경진대회 장려상 (2019.01)",
                        lesson: "아이디어는 발표 자료가 아니라, 사람이 실제로 하는 행동으로 증명된다."
                    },
                    {
                        period: "2019.01 — 2020.09",
                        start: "2019-01",
                        end: "2020-09",
                        kind: "병역",
                        tone: "other",
                        title: "군복무",
                        body: "경진대회 직후 입대해 19개월을 보냈습니다. 내 역할보다 남의 역할을 먼저 이해해야 조직의 일이 굴러간다는 걸 매일 확인했고, 소심한 성격이 낯선 사람들과 부대끼며 조금씩 바뀌었습니다.",
                        result: "복무 기간 동안 제품·창업이라는 방향을 굳히고 복학",
                        lesson: "리더십은 팔로워십에서 시작된다."
                    }
                ]
            },
            {
                id: "expand",
                period: "2021",
                start: "2021-01",
                end: "2021-12",
                title: "전공 밖으로 나가다",
                inflection: "디자인의 언어만으로는 만들고 싶은 것을 다 만들 수 없다는 자각",
                items: [
                    {
                        period: "2021.06 — 2021.07",
                        start: "2021-06",
                        end: "2021-07",
                        kind: "현장실습",
                        tone: "study",
                        title: "intervoid — UX/UI 디자이너",
                        body: "현장실습 수업으로 참여한 인턴십에서, 학교 밖 실제 사용자가 쓰는 화면을 처음 만들었습니다. 시각장애인을 위한 촉각 패드 기반 배리어프리 키오스크의 UX/UI를 맡아, 화면을 볼 수 없는 사용자를 전제로 시각 정보를 촉각과 순서로 번역하는 설계를 했습니다. 소셜벤처·한국문화재재단 협업 프로젝트의 UX/UI도 전담했습니다.",
                        result: "2022 한국유니버설디자인 제품 부문 대상, DDP 유니버설디자인플랫폼 전시, 제10회 스마트테크 코리아 부스 운영",
                        lesson: "기술은 없는 듯이 경험에 자연스럽게 녹아들어야 한다."
                    },
                    {
                        period: "2021.08 — 2021.12",
                        start: "2021-08",
                        end: "2021-12",
                        kind: "학업",
                        tone: "study",
                        title: "샌프란시스코 주립대 교환학생 — 컴퓨터과학",
                        body: "디자인 전공자가 개발의 언어를 모르면, 만들 수 있는 것의 한계가 남이 정해준 대로 정해진다고 느꼈습니다. 전공을 컴퓨터과학으로 바꿔 교환학생을 갔고, 교내 개발자 커뮤니티에 들어가 3개월간 함께 코드를 쓰며 기획·디자인·구현이 어디서 어긋나는지 관찰했습니다.",
                        result: "이후 모든 프로젝트를 구현 가능성 위에서 기획하게 됨. 훗날 에이전틱 코딩을 빠르게 받아들이는 기반",
                        lesson: "다른 직군의 언어를 배우면 협업이 아니라 설계 자체가 달라진다."
                    }
                ]
            },
            {
                id: "research",
                period: "2022 — 2023.02",
                start: "2022-01",
                end: "2023-02",
                title: "사용자와 마주하다",
                inflection: "인터뷰에서 '만들고 싶은 것'과 '고객이 원하는 것'의 간극을 처음 정면으로 본 구간",
                items: [
                    {
                        period: "2022.06 — 2023.02",
                        start: "2022-06",
                        end: "2023-02",
                        kind: "실무",
                        tone: "work",
                        title: "BLINKERS — 프로덕트 디자이너",
                        body: "기술이 앞에 서 있는 제품에서 고객이 진짜 사는 것이 무엇인지 확인하고 싶었습니다. 인턴 3개월을 거쳐 계약직 6개월로 이어가며 웹 P2P NFT 오픈마켓 'Bank of Wine'의 UX/UI를 총괄했고, B2C 300여 명·B2B 60여 개 사를 대상으로 설문과 심층 인터뷰를 진행하고 CES 2023을 포함한 행사 부스를 직접 운영했습니다. 인터뷰에서 얻은 인사이트를 'AI 와인가격 예측'이라는 형태로 화면에 옮겼습니다.",
                        result: "체류시간 48% 증가, 상세페이지 전환율 13% 개선, 온라인 마케팅 채널(디스코드) 가입자 130% 증가",
                        lesson: "눈에 보이는 게 다가 아니다. 고객은 NFT가 아니라 와인을 사고 있었다."
                    },
                    {
                        period: "2021 — 2023",
                        start: "2021-01",
                        end: "2023-12",
                        kind: "대외활동",
                        tone: "activity",
                        title: "해커톤 · 공모전 · 기업 제안 과정",
                        body: "소심한 성격을 바꾸고, 짧은 시간에 문제를 정의해 파는 훈련을 반복하고 싶었습니다. 실전창업캠프(2021), JUNCTION ASIA 2022 AWS 트랙, GLOBAL FUTURIZER 2022, 기업-학생제안 과정(Google Cloud), 생성형 AI 기획안 과정을 연달아 하며, 매번 낯선 팀에서 문제 정의부터 데모까지를 며칠 안에 끝내는 사이클을 반복했습니다.",
                        result: "발표와 설득에 대한 두려움 극복. 문제 정의 → 가설 → 데모로 이어지는 실험 스타일이 몸에 붙음",
                        lesson: "나쁜 기획은 없다. 시간이 많다고 더 좋은 기획이 되지는 않는다."
                    },
                    {
                        period: "2022.02 — 2025.12",
                        start: "2022-02",
                        end: "2025-12",
                        kind: "봉사",
                        tone: "activity",
                        title: "서울런 멘토단 · 동명아동복지센터",
                        body: "일과 무관한 자리에서도 사람을 계속 만나고 싶었습니다. 서울런 멘토단으로 영어 교육을, 동명아동복지센터에서 정기 봉사를 3년 넘게 이어갔습니다. 이벤트가 아니라 반복으로 관계를 만드는 방식이었습니다.",
                        result: "꾸준함이 신뢰가 되는 경험. 1:1 대화에서 강점이 나온다는 자기 이해",
                        lesson: "오래 남는 관계는 이벤트가 아니라 반복에서 온다."
                    }
                ]
            },
            {
                id: "ownership",
                period: "2023",
                start: "2023-03",
                end: "2023-12",
                title: "화면에서 지표로",
                inflection: "디자이너에서 PO로. 판단의 단위가 화면이 아니라 지표가 된 구간",
                items: [
                    {
                        period: "2023.01 — 2023.09",
                        start: "2023-01",
                        end: "2023-09",
                        kind: "동아리",
                        tone: "activity",
                        title: "UOSLIFE 프로덕트실 — PO ('시대생')",
                        body: "학내 개발 동아리에서 슈퍼앱을 유지가 아니라 성장시키는 역할을 맡고 싶었습니다. 캠퍼스라이프 슈퍼앱 '시대생'의 프로덕트 개발과 유저 리서치를 총괄하며, 이탈률이 높은 상세 화면에서 사용자가 최종적으로 원하는 정보를 홈 화면 앞에 배치했습니다. 아토믹 디자인 시스템을 Figma와 Storybook으로 연동해 구축하고 리브랜딩을 주도했습니다.",
                        result: "Day 7 리텐션 14% 증가, 단기 미팅 서비스 '시대팅' 런칭 및 대학 상권 제휴 프로모션으로 해당 기간 DAU 490% 증가",
                        lesson: "동료도 고객이다. 팀 내부의 마찰을 풀지 않으면 사용자 문제도 풀리지 않는다."
                    },
                    {
                        period: "2023.06",
                        start: "2023-06",
                        end: "2023-06",
                        kind: "수상",
                        tone: "activity",
                        title: "AI School 해커톤 1위",
                        body: "기획자가 직접 만들 수 있으면 검증 속도 자체가 달라진다는 가설을 시험했습니다. 바이브코딩으로 6시간 동안 화장품 온라인 커머스의 아이템 저장 기능 프로토타입을 기획부터 배포까지 혼자 관통했습니다.",
                        result: "1위 수상. 이후 '직접 만들어 검증한다'가 기본 작업 방식이 됨",
                        lesson: "만들 수 있는 사람이 기획하면, 가설의 크기가 아니라 개수가 늘어난다."
                    },
                    {
                        period: "2023.12 — 2024.02",
                        start: "2023-12",
                        end: "2024-02",
                        kind: "교육",
                        tone: "study",
                        title: "현대자동차그룹 소프티어 부트캠프",
                        body: "도메인이 완전히 다른 산업에서 제품 기획이 어떻게 도는지 보고 싶었습니다. 개인화 모빌리티 서비스를 제안하며, 서비스와 차량 Raw 데이터를 분석해 추천 시스템을 설계했습니다.",
                        result: "팀 평가 1위 선정",
                        lesson: "데이터는 결론을 내릴 때보다, 질문을 만들 때 더 쓸모 있다."
                    }
                ]
            },
            {
                id: "business",
                period: "2024",
                start: "2024-01",
                end: "2024-08",
                title: "비즈니스의 언어를 얹다",
                inflection: "사용자 편의 위에 '비즈니스가 성장하는가'를 얹어 판단하기 시작한 구간",
                items: [
                    {
                        period: "2024.05 — 2024.07",
                        start: "2024-05",
                        end: "2024-07",
                        kind: "직무교육",
                        tone: "study",
                        title: "휴맥스모빌리티 — 서비스 플래너",
                        body: "일경험 직무교육 과정으로 들어가, 여러 사업부를 가진 회사에서 시너지를 만드는 기획을 경험했습니다. 사업 간 시너지를 위한 AI 서비스로 '주차장 혼잡 예측'과 'AI 사고처리 챗봇'의 상위·상세 기획안을 제안했고, MECE와 로직 트리로 CS를 분해했습니다. 글로벌 모빌리티 트렌드와 여객자동차 운수사업법 규제를 함께 검토했습니다.",
                        result: "AI 서비스 상위/상세 기획안 제안, 카셰어링·대리운전 규제 데스크 리서치 정리",
                        lesson: "좋은 기획은 기술이 아니라 제약(규제와 사업 구조) 위에서 설계된다."
                    },
                    {
                        period: "2024.07 — 2024.10",
                        start: "2024-07",
                        end: "2024-10",
                        kind: "교육",
                        tone: "study",
                        title: "구글 머신러닝 부트캠프",
                        body: "AI를 쓰는 사람이 아니라 설계에 넣는 사람이 되고 싶었습니다. 자동차 사고 시나리오 예측 모델을 직접 개발하고 Coursera 딥러닝 특화과정을 수료하며, 데이터의 어떤 성질이 성능이 되는지 확인했습니다.",
                        result: "딥러닝 특화과정 수료. 제품에 AI를 얹을지 판단하는 기준이 생김",
                        lesson: "기술을 알수록 기술을 덜 보여주게 된다."
                    },
                    {
                        period: "2024.04 — 2025.06",
                        start: "2024-04",
                        end: "2025-06",
                        kind: "사이드",
                        tone: "activity",
                        title: "토론철 — PO / 대표",
                        body: "파편화된 소셜 데이터와 의견을 객관적인 여론으로 구조화하고 싶었습니다. 6명의 팀원과 7회 스프린트를 주관해 채팅 기반 실시간 토론 앱을 출시·운영했고, TEDx 강연 현장에서는 4시간 동안 가설 3개를 연속으로 검증했습니다.",
                        result: "구글 플레이·앱스토어 출시 및 운영. 현장 실험에서 회원가입 23%·토론방 입장 88% 달성, '실시간'이 아니라 '강연 후 후기'에 수요가 있다는 인사이트로 문제 재정의",
                        lesson: "정의한 문제가 틀렸더라도, 실험 과정 자체가 다음 전략의 근거가 된다."
                    },
                    {
                        period: "2024.07 — 현재",
                        start: "2024-07",
                        end: "2026-09",
                        kind: "커뮤니티",
                        tone: "activity",
                        title: "사픈 — 대표",
                        body: "혼자 만드는 사람들이 서로의 실패를 공유할 자리가 없다고 느꼈습니다. 300명 규모의 프로덕트 빌더·솔로프러너 네트워크를 운영하며 매일 1개의 IT 인사이트를 공유하고, 분기별 오프라인 워크샵과 세미나를 주관합니다. 구성원이 자발적으로 여는 챌린지와 스터디를 지원하고, 오픈소스 AI 기획 에이전트 'SoloSquad'를 메인테이너로 관리합니다.",
                        result: "누적 인사이트 450개 이상, 재참여율 81%, 구성원 주도 모임 8회 성료, 사내 교육 초청",
                        lesson: "신뢰는 이벤트가 아니라 꾸준함과 재미로 쌓인다. 내가 끌고 가는 판보다 사람들이 스스로 여는 판이 오래간다."
                    }
                ]
            },
            {
                id: "now",
                period: "2024.09 — 현재",
                start: "2024-09",
                end: "2026-09",
                title: "데이터를 의사결정으로",
                inflection: "에이전틱 코딩으로 기획·구현·측정 사이클을 스스로 돌리게 된 구간",
                items: [
                    {
                        period: "2024.09 — 현재",
                        start: "2024-09",
                        end: "2026-09",
                        kind: "실무",
                        tone: "work",
                        title: "빅밸류 — 그로스 PO",
                        body: "데이터가 눈앞에 있는데도 고객이 판단하지 못하는 이유를 풀고 싶었습니다. 공간데이터 SaaS의 유입(SEO/GEO)–콘텐츠–도메인 지표–온보딩을 하나의 여정으로 설계합니다. 프로그래매틱 SEO로 전국 515만 페이지를 자동 생성하고, 상권·부동산 도메인 지표와 이를 설명하는 콘텐츠를 만들고, GA4·BigQuery로 코호트와 A/B 테스트를 돌리며, Claude Code로 홈페이지와 자동화 에이전트를 직접 구현합니다.",
                        result: "월 평균 오가닉 검색 유입 19,000%·인바운드 리드 34% 증가, 3개월간 콘텐츠→서비스 전환율 27% 달성·주 평균 분석 건수 45%·D7 리텐션 65% 증가, Figma 플러그인 자체 개발로 화면설계 초안 작성 90% 절감",
                        lesson: "데이터를 소비하려는 고객에게 필요한 것은 데이터가 아니라, 데이터로 얻을 수 있는 가치다."
                    }
                ]
            }
        ],
        analysis: {
            label: "SYNTHESIS",
            title: "구간을 관통하는 네 가지",
            intro: "여섯 구간은 서로 다른 일처럼 보이지만, 같은 동작이 반경만 넓히며 반복된 기록에 가깝습니다. 전환점마다 무엇이 바뀌었고 무엇이 그대로였는지를 정리했습니다.",
            lenses: [
                {
                    title: "하나의 루프, 커지는 반경",
                    body: "세계를 정하고 → 사람을 모으고 → 반응을 보고 규칙을 고친다. 이 루프는 종이 공책 게임으로 반 친구들을 모으던 초등학생 때 이미 완성돼 있었습니다. 이후 바뀐 것은 반경뿐입니다. 반 친구 수십 명 → 인터뷰 300명·B2B 60개 사 → 커뮤니티 300명 → 검색으로 만나는 515만 페이지. 직무명이 디자이너에서 PO로 바뀌는 동안에도 동작은 한 번도 바뀌지 않았습니다."
                },
                {
                    title: "다양성은 취향이 아니라 방법론의 결과",
                    body: "관련 없어 보이는 개념 사이에서 연결과 비유를 찾는 사고법은 필연적으로 전공 밖으로 사람을 밀어냅니다. 시각디자인 → 창업학 복수전공 → 컴퓨터과학 교환학생 → 머신러닝 부트캠프 → 에이전틱 코딩이라는 경로는 산만함이 아니라 같은 방법론의 반복입니다. 그리고 2024년 9월, 마케팅(SEO)·도메인 지식(상권/부동산)·콘텐츠·데이터·구현이 한 사람에게 동시에 필요한 자리를 만나며 그 조각들이 처음으로 하나의 직무와 정확히 겹쳤습니다."
                },
                {
                    title: "겸손이 먼저, 주도성이 나중",
                    body: "순서가 중요했습니다. UX 리서치에서 경청과 겸손을 먼저 배웠고(2021–2022), 창업 활동과 해커톤에서 주도성과 집념을 나중에 얻었습니다(2022–2024). 반대 순서였다면 '만들고 싶은 것'이 사용자를 이겼을 것입니다. 만들고 싶은 것과 사용자 니즈 사이의 간극을 견디는 일이 곧 PO의 일이고, 그래서 직무 전환이 단절이 아니라 연장이 됐습니다."
                },
                {
                    title: "추상화 레벨이 한 칸씩 올라간다",
                    body: "화면(2021) → 여정(2022) → 지표(2023) → 퍼널과 유입(2024) → 도메인의 언어(2025–). '보이지 않는 것을 보자'는 원칙이 매 구간 한 단계 위에서 반복됐습니다. 고객이 사는 것은 NFT가 아니라 와인이었고, 고객이 필요로 하는 것은 데이터가 아니라 데이터로 얻는 가치였습니다. 같은 문장이 다른 높이에서 두 번 증명된 셈입니다."
                }
            ],
            closingTitle: "그리고 지금",
            closing: "협업에서 지키는 것은 신뢰·집념·재미 세 가지입니다. 역지사지하고 경청하며 꾸준한 모습으로 신뢰를 쌓고, 목표가 생기면 끝날 때까지 문제를 놓지 않으며, 위기에는 유머로 팀의 온도를 지킵니다. 1:1 대화에서 강점이 가장 잘 나온다는 것도 여러 팀을 거치며 확인했습니다. 실험의 주기는 계속 짧아지고 있습니다. 4시간에 가설 3개를 검증하던 방식이 에이전틱 코딩을 만나 기획·구현·측정을 혼자 관통하는 사이클이 됐습니다. 다음 구간의 질문은 하나입니다. 넓이를 어떻게 깊이로 증명할 것인가. 지금은 상권과 부동산이라는 한 도메인 안에서 그 답을 만들고 있습니다."
        }
    },
    EN: {
        label: "TIMELINE",
        title: "From twenty to now",
        description: "Six chapters, from a visual design major to a data product owner.",
        hint: "Scroll or drag horizontally",
        cardLabels: {
            result: "Result",
            lesson: "Lesson"
        },
        eras: [
            {
                id: "explore",
                period: "2017 — 2020",
                start: "2017-01",
                end: "2020-12",
                title: "Choosing a world to build",
                inflection: "The urge to build a world through artwork meets the shape of a business",
                items: [
                    {
                        period: "Mar 2017 — Aug 2023",
                        start: "2017-03",
                        end: "2023-08",
                        kind: "Study",
                        tone: "study",
                        title: "University of Seoul — Visual Design, double major in Entrepreneurship",
                        body: "As a kid I built games in paper notebooks and recruited classmates as players; I wanted to carry that habit into a discipline. To develop a point of view of my own, I kept pulling in ideas from outside the major — anatomy, light, history — and looking for the connections. I added entrepreneurship as a second major to see business growth, not just user convenience.",
                        result: "Academic excellence scholarship (Feb 2021); capstone project DATO, a healthcare MyData sharing platform, plus two others",
                        lesson: "Creativity is not inventing from nothing. It is finding the link between two distant ideas."
                    },
                    {
                        period: "2018 — Jan 2019",
                        start: "2018-01",
                        end: "2019-01",
                        kind: "Startup",
                        tone: "activity",
                        title: "SK LOOKIE startup club · University startup competition",
                        body: "My father's work had left me with a vague intention to run my own business, and I wanted to test it for real. Over 15 months in the club I shaped a gamified social network for sharing restaurants, moving the mechanism that gathers people — game rules — directly into the product structure.",
                        result: "Encouragement Award, University of Seoul startup competition (Jan 2019)",
                        lesson: "An idea is proven by what people actually do, not by the deck."
                    },
                    {
                        period: "Jan 2019 — Sep 2020",
                        start: "2019-01",
                        end: "2020-09",
                        kind: "Service",
                        tone: "other",
                        title: "Military service",
                        body: "I enlisted right after the competition and served 19 months. Every day confirmed that an organization moves only when you understand other people's roles before your own, and a shy temperament slowly changed through constant contact with strangers.",
                        result: "Left service certain that product and entrepreneurship were the direction",
                        lesson: "Leadership begins with followership."
                    }
                ]
            },
            {
                id: "expand",
                period: "2021",
                start: "2021-01",
                end: "2021-12",
                title: "Stepping outside the major",
                inflection: "Realizing the language of design alone caps what I can build",
                items: [
                    {
                        period: "Jun 2021 — Jul 2021",
                        start: "2021-06",
                        end: "2021-07",
                        kind: "Field course",
                        tone: "study",
                        title: "intervoid — UX/UI Designer",
                        body: "Through a field-course internship I shipped my first screen for real users outside school. I took the UX/UI of a barrier-free kiosk built on a tactile pad for blind users, translating visual information into touch and sequence for people who cannot see the screen. I also owned the UX/UI of a collaboration project with a social venture and the Korea Cultural Heritage Foundation.",
                        result: "Grand Prize, 2022 Korea Universal Design Awards (product); exhibited at the DDP Universal Design Platform; ran the booth at the 10th SmartTech Korea",
                        lesson: "Technology should dissolve into the experience as if it were not there."
                    },
                    {
                        period: "Aug 2021 — Dec 2021",
                        start: "2021-08",
                        end: "2021-12",
                        kind: "Study",
                        tone: "study",
                        title: "San Francisco State University — Exchange student, Computer Science",
                        body: "A designer who does not speak the language of engineering lets someone else set the ceiling on what they can make. I went on exchange with computer science as my major, joined the campus developer community, and spent three months writing code alongside them, watching exactly where planning, design, and implementation fall out of sync.",
                        result: "Every project since has been planned on top of what is actually buildable — the ground that later made agentic coding easy to adopt",
                        lesson: "Learn another discipline's language and it changes your design, not just your collaboration."
                    }
                ]
            },
            {
                id: "research",
                period: "2022 — Feb 2023",
                start: "2022-01",
                end: "2023-02",
                title: "Facing the user",
                inflection: "First time seeing head-on the gap between what I wanted to build and what customers wanted",
                items: [
                    {
                        period: "Jun 2022 — Feb 2023",
                        start: "2022-06",
                        end: "2023-02",
                        kind: "Work",
                        tone: "work",
                        title: "BLINKERS — Product Designer",
                        body: "In a product where the technology stood in front, I wanted to find out what customers were actually buying. Hired for a three-month internship that continued as a six-month contract, I led UX/UI for the P2P NFT marketplace Bank of Wine and ran surveys and in-depth interviews with ~300 B2C users and ~60 B2B companies and worked the booths myself, including CES 2023. The insight from those interviews became an AI wine price forecast on the screen.",
                        result: "Session duration +48%, detail page conversion +13%, Discord marketing channel members +130%",
                        lesson: "What you see is not all there is. Customers were buying wine, not an NFT."
                    },
                    {
                        period: "2021 — 2023",
                        start: "2021-01",
                        end: "2023-12",
                        kind: "Programs",
                        tone: "activity",
                        title: "Hackathons, competitions, corporate proposal tracks",
                        body: "I wanted to break my shyness and rehearse defining a problem and selling it under time pressure. I ran a startup camp (2021), JUNCTION ASIA 2022 AWS track, GLOBAL FUTURIZER 2022, a corporate-student proposal track with Google Cloud, and a generative AI planning course back to back — each time going from problem definition to demo within days, with a team of strangers.",
                        result: "Lost the fear of presenting and persuading; the problem → hypothesis → demo cycle became second nature",
                        lesson: "There is no such thing as bad planning. More time does not make a plan better."
                    },
                    {
                        period: "Feb 2022 — Dec 2025",
                        start: "2022-02",
                        end: "2025-12",
                        kind: "Volunteer",
                        tone: "activity",
                        title: "Seoul Learn mentor · Dongmyung Child Welfare Center",
                        body: "I wanted to keep meeting people in places unrelated to work. I taught English as a Seoul Learn mentor and volunteered regularly at the Dongmyung Child Welfare Center for over three years — building relationships by repetition rather than by events.",
                        result: "Learned first-hand that consistency becomes trust, and that my strengths show up most in one-on-one conversation",
                        lesson: "Relationships that last come from repetition, not from events."
                    }
                ]
            },
            {
                id: "ownership",
                period: "2023",
                start: "2023-03",
                end: "2023-12",
                title: "From screens to metrics",
                inflection: "Designer to PO — the unit of judgment became a metric, not a screen",
                items: [
                    {
                        period: "Jan 2023 — Sep 2023",
                        start: "2023-01",
                        end: "2023-09",
                        kind: "Club",
                        tone: "activity",
                        title: "UOSLIFE Product Team — PO (Sidaesaeng)",
                        body: "In the university's student developer club I wanted to grow the campus super app rather than maintain it. Owning product development and user research for Sidaesaeng, I found that the information users ultimately wanted sat behind a high-drop-off detail screen, and moved it to the front of the home screen. I built an atomic design system linking Figma and Storybook, and led the rebranding.",
                        result: "Day 7 retention +14%; launched the short-meeting service Sidaeting and ran a campus-district partnership promotion, lifting DAU 490% over that period",
                        lesson: "Colleagues are customers too. Unresolved friction inside the team leaves user problems unsolved."
                    },
                    {
                        period: "Jun 2023",
                        start: "2023-06",
                        end: "2023-06",
                        kind: "Award",
                        tone: "activity",
                        title: "1st place, AI School Hackathon",
                        body: "I tested a hypothesis: when the person planning can also build, the speed of validation changes outright. In six hours of vibe coding I took a save-for-later prototype for a cosmetics e-commerce store from plan to deployment on my own.",
                        result: "First place — and from then on, building it myself became the default way to validate",
                        lesson: "When builders plan, it is not the size of hypotheses that grows but their number."
                    },
                    {
                        period: "Dec 2023 — Feb 2024",
                        start: "2023-12",
                        end: "2024-02",
                        kind: "Program",
                        tone: "study",
                        title: "Hyundai Motor Group Softeer Bootcamp",
                        body: "I wanted to see how product planning runs in an industry with a completely different domain. Proposing a personalized mobility service, I analyzed raw service and vehicle data and designed a recommendation system.",
                        result: "Ranked 1st in team evaluation",
                        lesson: "Data is more useful for forming questions than for closing arguments."
                    }
                ]
            },
            {
                id: "business",
                period: "2024",
                start: "2024-01",
                end: "2024-08",
                title: "Adding the language of business",
                inflection: "Judging by whether the business grows, on top of whether users are served",
                items: [
                    {
                        period: "May 2024 — Jul 2024",
                        start: "2024-05",
                        end: "2024-07",
                        kind: "Training",
                        tone: "study",
                        title: "HUMAXmobility — Service Planner",
                        body: "Joining through a job-experience training program, I planned for synergy inside a company with several business units. I proposed high-level and detailed specs for two AI services — parking congestion forecasting and an AI accident-handling chatbot — decomposing customer service with MECE and logic trees, and reviewed global mobility trends alongside passenger transport regulation.",
                        result: "Delivered high-level and detailed AI service proposals plus desk research on car-sharing and chauffeur-service regulation",
                        lesson: "Good planning is designed on top of constraints — regulation and business structure — not on top of technology."
                    },
                    {
                        period: "Jul 2024 — Oct 2024",
                        start: "2024-07",
                        end: "2024-10",
                        kind: "Program",
                        tone: "study",
                        title: "Google Machine Learning Bootcamp",
                        body: "I wanted to be someone who designs AI into a product, not someone who merely uses it. I built a vehicle accident scenario prediction model and completed the Coursera deep learning specialization, seeing for myself which properties of data turn into performance.",
                        result: "Completed the deep learning specialization and gained a basis for deciding when a product should carry AI at all",
                        lesson: "The more you understand a technology, the less of it you show."
                    },
                    {
                        period: "Apr 2024 — Jun 2025",
                        start: "2024-04",
                        end: "2025-06",
                        kind: "Side project",
                        tone: "activity",
                        title: "Toronchul — PO / Founder",
                        body: "I wanted to structure fragmented social data and opinions into a readable view of public sentiment. With six teammates over seven sprints I launched and operated a chat-based real-time discussion app, and at a TEDx event I validated three hypotheses back to back in four hours.",
                        result: "Shipped on Google Play and the App Store; the field experiment hit 23% sign-up and 88% room entry and redefined the problem — demand was for post-talk reflection, not real-time chat",
                        lesson: "Even when the problem you defined is wrong, the experiment itself becomes the basis for the next strategy."
                    },
                    {
                        period: "Jul 2024 — Present",
                        start: "2024-07",
                        end: "2026-09",
                        kind: "Community",
                        tone: "activity",
                        title: "Sapeun — Founder",
                        body: "People building alone had nowhere to share their failures. I run a 300-member network of product builders and solopreneurs, sharing one IT insight every day and hosting quarterly offline workshops and seminars. I support the challenges and study groups members start themselves, and maintain SoloSquad, an open-source AI planning agent.",
                        result: "450+ cumulative insights, 81% return rate, eight member-led programs completed, invited to run in-house training",
                        lesson: "Trust is built by consistency and fun, not by events — and the room others open themselves outlasts the one I pull along."
                    }
                ]
            },
            {
                id: "now",
                period: "Sep 2024 — Present",
                start: "2024-09",
                end: "2026-09",
                title: "Turning data into decisions",
                inflection: "Agentic coding put the whole plan–build–measure cycle in my own hands",
                items: [
                    {
                        period: "Sep 2024 — Present",
                        start: "2024-09",
                        end: "2026-09",
                        kind: "Work",
                        tone: "work",
                        title: "BigValue — Growth PO",
                        body: "I wanted to solve why customers cannot decide even with the data right in front of them. I design acquisition (SEO/GEO), content, domain metrics, and onboarding as a single journey for a spatial data SaaS: 5.15M pages auto-generated with programmatic SEO, domain metrics for commercial districts and real estate with content that explains them, cohort and A/B analysis in GA4 and BigQuery, and the homepage and automation agents built directly with Claude Code.",
                        result: "Monthly organic search traffic +19,000% and inbound leads +34%; 27% content-to-service conversion over three months with weekly analyses +45% and D7 retention +65%; a self-built Figma plugin cut first-draft wireframing by 90%",
                        lesson: "Customers who come for data do not need the data. They need the value it gives them."
                    }
                ]
            }
        ],
        analysis: {
            label: "SYNTHESIS",
            title: "Four things that run through every chapter",
            intro: "The six chapters look like different jobs, but they read more like one motion repeating at a wider radius. Here is what changed at each turning point, and what never did.",
            lenses: [
                {
                    title: "One loop, a widening radius",
                    body: "Choose a world → gather people → watch what they do → revise the rules. That loop was already complete in elementary school, gathering classmates around a game drawn in a paper notebook. Only the radius changed: dozens of classmates → 300 interviewees and 60 B2B companies → a 300-person community → 5.15M pages people meet through search. The title moved from designer to PO; the motion never moved at all."
                },
                {
                    title: "The breadth is a method, not a taste",
                    body: "A mind that works by finding links and analogies between unrelated ideas is pushed outside its major by necessity. Visual design → entrepreneurship → computer science on exchange → a machine learning bootcamp → agentic coding is not scatter; it is the same method repeating. And in September 2024 those pieces finally lined up with a single role, one that needs marketing (SEO), domain knowledge (commercial districts, real estate), content, data, and implementation from the same person."
                },
                {
                    title: "Humility first, initiative second",
                    body: "The order mattered. Listening and humility came first, from UX research (2021–2022); initiative and persistence came later, from startup work and hackathons (2022–2024). In the reverse order, the wish to build would have beaten the user. Holding the gap between what you want to build and what users need is precisely the PO's job, which is why the career change read as continuation rather than a break."
                },
                {
                    title: "The level of abstraction climbs one step at a time",
                    body: "Screens (2021) → journeys (2022) → metrics (2023) → funnels and acquisition (2024) → the language of a domain (2025–). The principle of looking past what is visible repeated one level higher each chapter. Customers were buying wine, not an NFT; customers needed value, not data. The same sentence, proven twice at different altitudes."
                }
            ],
            closingTitle: "And now",
            closing: "In collaboration I hold to three things: trust, persistence, and fun. Trust comes from putting myself in others' position, listening, and showing up consistently; persistence means not letting go of a problem until it is finished; and in a crisis humor keeps the team's temperature up. Across several teams I confirmed that my strengths come out most in one-on-one conversation. The experiment cycle keeps getting shorter — validating three hypotheses in four hours became, with agentic coding, a cycle where planning, building, and measuring run through one pair of hands. The next chapter has a single question: how do I prove breadth as depth? Right now I am working out the answer inside one domain — commercial districts and real estate."
        }
    }
};

export default timeline;
