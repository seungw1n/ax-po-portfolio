/**
 * 소개 페이지의 가로 스크롤 타임라인 + 종합 분석 데이터.
 * 출처: docs/이력서_정승원.pdf, docs/linkedin-profile.pdf, docs/경력기술서.md
 * 카드 구조: 활동명 / 간단한 내용(왜·뭘·어떻게) / 결과·레슨런
 */
export const timeline = {
    KO: {
        label: "TIMELINE",
        title: "종이 공책에서 지금까지",
        description: "대학 이전의 한 칸에서 시작해, 시각디자인 전공으로 출발해 데이터 프로덕트 오너가 되기까지 여섯 구간의 기록입니다.",
        hint: "가로로 스크롤하거나 드래그하세요",
        cardLabels: {
            result: "결과",
            lesson: "레슨런"
        },
        prologue: {
            eraTitle: "만드는 사람이 되기 전",
            kind: "그 이전",
            tone: "other",
            cardPeriod: "대학 입학 이전",
            title: "종이 공책과 도서관",
            body: [
                "초등학생 때 종이 공책에 게임을 만들었습니다. 세계관과 규칙을 만들고, 쉬는 시간마다 반 친구들이 모여 플레이했습니다. 점심시간, 방과 후 업데이트하여 다음 날 다시 가져갔습니다.",
                "고등학교 3년 동안은 다독왕이었습니다. 개인적으로는 근현대 한국 소설에서 시대적 변화와 인물에 놓인 아이러니한 상황을 재밌게 봤습니다. 자기계발서는 분야를 가리지 않고 제목만 보고 손에 잡히는 대로 읽었습니다. 하나를 깊게 파기보다 얕더라도 여러 분야를 두루 건드리는 쪽이 즐거웠습니다. 매몰비용을 아까워하는 성격이라 한 번 펼친 책은 끝까지 읽었는데, 돌아보면 그 고집이 맥락을 이해하는 역량에 도움이 됐습니다."
            ]
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
                        title: "서울시립대학교 시각디자인 전공",
                        body: "미술사를 공부하다 한 시대의 작품이 철학과 공학, 역사의 성취와 전부 맞물려 있다는 걸 알게 됐습니다. 그때부터 한 분야만 파는 대신 크로스 폴리네이터처럼 여러 분야를 옮겨 다니며 레퍼런스를 벤치마크했고, 한 분야의 문제 해결 방식을 다른 분야에 옮겨 붙여 남들과 다른 관점을 만들어내는 훈련을 했습니다. 그 관점 위에서 다른 작품과 무엇이 다른지를 기준으로 제 작품관과 브랜딩을 세웠습니다. 화면에서는 사용자 관점으로 내려와, 사용자가 무엇을 먼저 보고 어떤 순서로 움직이는지 여정을 따라가고 말로 표현되지 않는 심리적인 반응까지 니즈로 읽어내는 UX·UI 디자인을 배웠습니다.",
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
                        body: "아버지의 영향으로 막연히 갖고 있던 '내 사업'이라는 생각을 실제로 시험해보고 싶었습니다. 15개월간 동아리와 경진대회를 거치며 디자인씽킹을 배워 아이디어부터 내는 대신 문제와 사용자를 먼저 정의하는 순서를 몸에 익혔고, 그 위에 게이미피케이션을 접목해 맛집 공유 SNS를 팀으로 기획했습니다. 사람을 모으는 장치인 게임 규칙을 그대로 서비스 구조에 옮겨, 프로필이 쌓이고 성장하는 재미로 다시 들어오게 만드는 리텐션과 친구 추천으로 퍼지는 바이럴 구조를 처음 다뤄봤습니다.",
                        result: "서울시립대학교 창업경진대회 장려상 (2019.01)",
                        lesson: "사용자가 실제로 하는 행동이 진짜 수요다."
                    },
                    {
                        period: "2019.01 — 2020.09",
                        start: "2019-01",
                        end: "2020-09",
                        kind: "병역",
                        tone: "other",
                        title: "군 복무",
                        body: "포병으로 입대했지만 대대 정훈장교 자리가 공석이 되며 정훈병으로 보직이 바뀌었습니다. 대대의 정신전력 정훈 교육을 맡아 교육을 기획하고 직접 진행했고, 대대 도서관 관리병을 겸하며 책을 정리하는 김에 닥치는 대로 읽었습니다. 그중 『제로 투 원』이 전역 후의 방향을 정해줬습니다. 만들고 싶은 것을 직접 만들려면 비즈니스와 개발이 필요하다고 보고, 창업학 복수전공과 개발을 배우기 위한 교환학생 계획을 복무 중에 세웠습니다.",
                        result: "연대 정훈평가 1등 · 전역 전에 창업학 복수전공과 교환학생 계획 확정",
                        lesson: "질 것 같은 순간에도 끝까지 최선을 다하는 태도, 그게 반복되면 결국 이긴다."
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
                        period: "2021.03 — 2023.08",
                        start: "2021-03",
                        end: "2023-08",
                        kind: "학업",
                        tone: "study",
                        title: "서울시립대학교 창업학 복수전공",
                        body: "잘 만든 화면도 돈이 도는 구조 위에 있지 않으면 오래가지 못한다는 걸 보고, 2021년 1학기부터 창업학을 복수전공했습니다. 수익 전략과 기업가 정신을 배웠습니다. 성장에는 단계가 있어 단계마다 지금 가장 중요한 하나에 집중해야 한다는 것, 어려운 문제일수록 집념으로 끝까지 붙잡는 사람이 결국 답을 만든다는 것. 그리고 기업가 정신이 창업자만의 것이 아니라 미션을 함께 진 구성원 각자에게 필요한 것이라는 걸 이때 알았습니다.",
                        result: "복수전공 이수(2023.08 졸업) · 이후 모든 기획에 수익 구조와 성장 단계를 함께 놓는 기준이 됨",
                        lesson: "혁신은 구성원 각자가 자기 몫의 기업가 정신으로 미션을 붙잡고 창의적으로 풀 때 나온다. 리더십은 그 자리를 이해하는 데서, 그러니까 팔로워십에서 시작된다."
                    },
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
                        body: "원래 개발에 관심이 있어 인터넷 강의를 보며 혼자 익혀왔습니다. 군 복무 중에는 공책에 손으로 코드를 썼습니다. 독학만으로는 기초가 성기다고 느껴 정규 커리큘럼으로 제대로 다져보고 싶었고, 전공을 컴퓨터과학으로 바꿔 교환학생을 갔습니다. 교내 개발자 커뮤니티에 들어가 3개월간 함께 코드를 쓰면서, 같은 문제를 두고도 비즈니스와 디자인, 개발이 각자 다른 관점으로 접근한다는 걸 봤습니다. 그 차이를 알게 된 것이 가장 큰 소득이었습니다.",
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
                        body: "해커톤에서 과제를 냈던 스타트업이 블링커스였고, 그 자리에서 인턴 제안을 받았습니다. 기술이 앞에 서 있는 제품에서 고객이 진짜 사는 것이 무엇인지 확인하고 싶었습니다. 인턴 3개월 뒤 계약직 제안을 받아 6개월을 더 이어가며 웹 P2P NFT 오픈마켓 'Bank of Wine'의 UX/UI를 총괄했고, B2C 300여 명·B2B 60여 개 사를 대상으로 설문과 심층 인터뷰를 진행하고 CES 2023을 포함한 행사 부스를 직접 운영했습니다. 인터뷰에서 얻은 인사이트를 'AI 와인가격 예측'이라는 형태로 화면에 옮겼습니다.",
                        result: "체류시간 48% 증가, 상세페이지 전환율 13% 개선, 온라인 마케팅 채널(디스코드) 가입자 130% 증가",
                        lesson: "눈에 보이는 게 다가 아니다. 고객은 NFT가 아니라 와인을 사고 있었다."
                    },
                    {
                        period: "2022 — 2023",
                        start: "2022-01",
                        end: "2023-12",
                        kind: "대외활동",
                        tone: "activity",
                        title: "해커톤 · 대내외활동",
                        body: "교환학생에서 컴퓨터과학을 배우고 나니 기획과 디자인, 개발이 하나의 흐름으로 보이기 시작했습니다. IT 전반이 눈에 들어온 만큼 실전에서 문제를 최대한 많이 풀어보고 싶었고, UX·UI 디자인을 주력으로 대내외 활동을 이어갔습니다. JUNCTION ASIA 2022 AWS 트랙, GLOBAL FUTURIZER 2022, 기업-학생제안 과정(Google Cloud), 생성형 AI 기획안 과정을 연달아 하며 매번 낯선 팀에서 문제 정의부터 데모까지를 며칠 안에 끝내는 사이클을 반복했습니다.",
                        result: "문제 정의 → 가설 → 데모로 이어지는 실험 스타일이 몸에 붙음 · 과제를 냈던 기업 블링커스에서 인턴 제안을 받음",
                        lesson: "나쁜 기획은 없다. 시간이 많다고 더 좋은 기획이 되지는 않는다."
                    },
                    {
                        period: "2022.02 — 2025.12",
                        start: "2022-02",
                        end: "2025-12",
                        kind: "봉사",
                        tone: "activity",
                        title: "서울런 멘토단 · 동명아동복지센터",
                        body: "평소 아이들에게 관심이 있었고, 그게 자연스럽게 봉사로 이어졌습니다. 서울런 멘토단에서는 영어를 가르쳤습니다. 동명아동복지센터에도 교육 봉사를 하러 갔는데, 교육 봉사자는 이미 많고 정작 선생님들의 가장 큰 고민인 청소는 손이 없다는 이야기를 들었습니다. 그래서 하려던 일을 바꿔 2년 9개월 동안 청소를 맡았습니다.",
                        result: "동명아동복지센터 청소 봉사 2년 9개월 · 내가 하고 싶은 일보다 지금 필요한 일이 먼저라는 기준",
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
                        body: "기획자가 직접 만들 수 있으면 검증 속도 자체가 달라진다는 가설을 시험했습니다. UX·UI 디자인만 맡던 이전 해커톤들과 달리 개발 역할까지 함께 맡은 첫 자리였습니다. 바이브코딩으로 6시간 동안 화장품 온라인 커머스의 아이템 저장 기능 프로토타입을 기획부터 배포까지 혼자 관통했습니다.",
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
                        body: "AI를 쓰는 사람이 아니라 설계하는 사람이 되고 싶었습니다. 자동차 사고 시나리오 예측 모델을 직접 개발하고 Coursera 딥러닝 특화과정을 수료하며, 데이터로 어떻게 모델을 학습시키고, 실질적인 기능이 되는지 확인했습니다.",
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
            title: "결국 남는 네 가지",
            intro: "타임라인을 다 펼쳐놓고 나면 남는 것은 네 가지입니다. 무엇을 중요하게 여기는지, 그 태도가 어디서 왔는지, 지금 무엇을 할 수 있는지, 그리고 팀에서 어떻게 일하는지.",
            lenses: [
                {
                    kicker: "철학",
                    title: "보이지 않는 것을 봅니다",
                    body: "사람이 정말 원하는 것은 드러난 요구 뒤에 숨어 있다고 봅니다. 고객이 산 것은 NFT가 아니라 와인이었고, 필요했던 것은 데이터가 아니라 데이터로 내리는 결정이었습니다. 그래서 요구를 받으면 그대로 만들지 않고 '이 사람이 지금 무엇을 결정하지 못하고 있는가'로 한 번 바꿔 적습니다. 그다음은 늘 같습니다. 가장 작게 만들어 내놓고, 사람들이 실제로 어디서 멈추는지 보고, 규칙을 고칩니다. 판단이 갈릴 때는 제 취향이 아니라 숫자와 사용자의 말을 따릅니다. 좋은 기획은 처음부터 정답을 아는 게 아니라, 틀렸다는 걸 남보다 빨리 아는 구조를 만드는 일이라고 생각합니다."
                },
                {
                    kicker: "배경",
                    title: "디자인·엔지니어링·창업이 한 사람 안에 있습니다",
                    body: "시각디자인으로 시작해 사용자가 심리적 허들을 느끼지 않고 다음 행동으로 전환되도록 화면을 설계하는 법을 배웠습니다. 블링커스에서 온보딩과 정보 구조를 다시 짜 체류시간을 48% 늘린 것이 그 결과입니다. 교환학생으로 컴퓨터과학을 택하면서 만들고 싶은 것을 직접 만들 수 있게 됐고, 창업 동아리와 복수전공, 경진대회를 지나며 그 화면이 회사의 어떤 숫자로 돌아오는지를 보게 됐습니다. 세 갈래를 따로 배운 게 아니라 하나를 하다 막혀서 다음을 배운 순서입니다. 지금은 이 조합 자체가 차별점입니다. 마케팅과 도메인 지식, 콘텐츠, 데이터, 구현을 한 사람이 붙잡고 있으면 넘겨주는 과정에서 새는 것이 없습니다."
                },
                {
                    kicker: "하드스킬",
                    title: "데이터를 설계하고, 분석하고, 화면으로 되돌립니다",
                    body: "지표를 누가 만들어주기를 기다리지 않습니다. 무엇을 볼지 정하고(설계), GA4와 BigQuery에 쌓이게 만들고(구축), 코호트와 퍼널로 읽습니다(분석). 도구는 필요하면 직접 만듭니다. 에이전틱 코딩으로 홈페이지와 자동화 에이전트를 혼자 붙였고, 기획부터 구현과 측정까지 한 사람 안에서 사이클을 돌립니다. 0to1 서비스의 퍼널을 단계별로 이렇게 움직였습니다.",
                    points: [
                        "획득 · 프로그래매틱 SEO로 515만 페이지를 자동 생성해 오가닉 유입 19,000% 증가",
                        "활성 · 유저 저니와 온보딩을 다시 짜고 코호트로 이탈 지점을 특정해 D7 리텐션 65% 증가, 주 평균 분석 건수 45% 증가",
                        "수익 · CTA A/B 테스트를 돌려 3개월간 콘텐츠 → 서비스 전환율 27% 달성"
                    ]
                },
                {
                    kicker: "소프트스킬",
                    title: "끝까지 붙잡되, 혼자 붙잡지 않습니다",
                    body: "일하는 방식의 중심은 집념입니다. 목표가 정해지면 방법이 없다는 이유로 접지 않고, 필요한 수단을 찾아서 되게 만듭니다. 다만 혼자 오래 버티는 집념은 팀에서 민폐가 된다는 것도 배웠습니다. 그래서 신뢰를 먼저 쌓습니다. 동료도 고객이라고 보고, 상대의 맥락에서 한 번 생각한 뒤 말하고, 약속한 것을 계속 지킵니다. 리더십은 팔로워십에서 시작한다고 믿어서 남의 일을 먼저 돕고 필요한 순간에 앞에 섭니다. 그리고 일이 어려워질수록 팀의 온도를 지키려 합니다. 위기일수록 농담 한마디가 다음 시도를 가능하게 하더군요. 사람의 강점은 1:1 대화에서 가장 잘 나온다는 것도 여러 팀을 거치며 확인했습니다."
                }
            ],
            closingTitle: "그리고 지금",
            closing: "지금까지가 0to1을 한 바퀴 돌아본 시간이었습니다. 유입을 만들고, 사용자를 남기고, 전환으로 잇는 흐름을 혼자 설계하고 측정해봤습니다. 다음을 찾는 이유도 여기 있습니다. 같은 루프를 더 큰 사용자 규모와 더 어려운 문제 위에서 돌려보고 싶습니다. 계속 키우고 싶은 역량은 하나입니다. 필요한 수단이 있다면 무엇이든 가져와서 안 되는 일을 되게 만드는 문제 해결력. 데이터든 AI든 직접 짠 코드든 도구는 그때그때 바뀌겠지만, 될 때까지 놓지 않는 방식은 바뀌지 않을 것 같습니다. 언젠가 전 세계 사용자가 매일 쓰는 제품의 문제를 풀고 싶습니다."
        }
    },
    EN: {
        label: "TIMELINE",
        title: "From a paper notebook to now",
        description: "One panel before university, then six chapters from a visual design major to a data product owner.",
        hint: "Scroll or drag horizontally",
        cardLabels: {
            result: "Result",
            lesson: "Lesson"
        },
        prologue: {
            eraTitle: "Before I called it building",
            kind: "Before",
            tone: "other",
            cardPeriod: "Before university",
            title: "A paper notebook and a library",
            body: [
                "In elementary school I built games in a paper notebook — writing the rules, drawing the maps, then pulling classmates in at every break to actually play them. When the reaction was flat, I rewrote the rules that night and brought it back the next day. I had no word for users yet, but building, showing, and revising was already the loop.",
                "Through three years of high school I read more books than anyone in my grade. What I loved was contemporary Korean fiction — the ironies the characters were caught in stayed with me for a long time. Self-help I read across every field, pulling books off the shelf by the title alone; touching many fields shallowly was more fun than digging into one. And because I hate a sunk cost, whatever I opened I finished. Looking back, that stubbornness was worth something."
            ]
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
                        title: "University of Seoul — Visual Design",
                        body: "Studying art history, I saw that the work of any era is interlocked with what philosophy, engineering, and history achieved at the same time. From then on I worked like a cross-pollinator rather than a specialist — moving between fields, benchmarking references, and training myself to graft one field's way of solving a problem onto another until the perspective was one nobody else had. On top of that I built my own point of view and branding around what made the work different from everyone else's. On the screen itself, that became UX and UI design: following the journey — what a user sees first and in what order they move — and reading the reactions they never put into words as needs.",
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
                        body: "My father's work had left me with a vague intention to run my own business, and I wanted to test it for real. The club and the competition taught me design thinking — defining the problem and the user before reaching for an idea — and on top of that I applied gamification to a social network for sharing restaurants that I shaped with a team. Moving the mechanism that gathers people — game rules — directly into the product structure was my first time working with retention built on a profile that visibly grows, and virality built on inviting friends.",
                        result: "Encouragement Award, University of Seoul startup competition (Jan 2019)",
                        lesson: "What users actually do is the real demand."
                    },
                    {
                        period: "Jan 2019 — Sep 2020",
                        start: "2019-01",
                        end: "2020-09",
                        kind: "Service",
                        tone: "other",
                        title: "Military service",
                        body: "I enlisted as an artilleryman, but when the battalion's public affairs officer post fell vacant I was reassigned to it as an enlisted soldier. I took charge of the battalion's values and morale education, planning and delivering the sessions myself, and doubled as the keeper of the battalion library — shelving books and reading whatever passed through my hands. One of them, Zero to One, set the direction for after service: to build what I wanted to build I would need business and engineering, so while still serving I planned a second major in entrepreneurship and an exchange semester to learn to code.",
                        result: "First place in the regimental public affairs evaluation; second major and exchange plan settled before discharge",
                        lesson: "Giving everything to the end even when the loss is already in sight — repeat that and you win."
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
                        period: "Mar 2021 — Aug 2023",
                        start: "2021-03",
                        end: "2023-08",
                        kind: "Study",
                        tone: "study",
                        title: "University of Seoul — double major in Entrepreneurship",
                        body: "A well-made screen does not last unless it sits on a structure where money moves, so from the first semester of 2021 I added entrepreneurship as a second major. I learned revenue strategy and entrepreneurship: growth comes in stages, each stage has exactly one thing that matters most, and on the hard problems it is the person who refuses to let go who ends up with the answer. It was also where I learned that entrepreneurship does not belong to founders alone — it is what every member carrying the mission needs.",
                        result: "Second major completed (graduated Aug 2023); since then every plan carries its revenue structure and growth stage with it",
                        lesson: "Innovation comes when every member holds the mission with their own entrepreneurship and solves it creatively. Leadership begins with understanding that place — with followership."
                    },
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
                        body: "I had been teaching myself to code from online lectures for years — during military service, by hand in a notebook — but self-study left the fundamentals patchy, and I wanted a formal curriculum to set them properly. I went on exchange with computer science as my major, joined the campus developer community, and spent three months writing code alongside them. What I took away most was seeing how differently business, design, and engineering each approach the same problem.",
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
                        body: "BLINKERS was the startup that set the brief at one of those hackathons, and they offered me an internship on the spot. In a product where the technology stood in front, I wanted to find out what customers were actually buying. Three months as an intern turned into a contract offer and six months more, over which I led UX/UI for the P2P NFT marketplace Bank of Wine and ran surveys and in-depth interviews with ~300 B2C users and ~60 B2B companies and worked the booths myself, including CES 2023. The insight from those interviews became an AI wine price forecast on the screen.",
                        result: "Session duration +48%, detail page conversion +13%, Discord marketing channel members +130%",
                        lesson: "What you see is not all there is. Customers were buying wine, not an NFT."
                    },
                    {
                        period: "2022 — 2023",
                        start: "2022-01",
                        end: "2023-12",
                        kind: "Programs",
                        tone: "activity",
                        title: "Hackathons and extracurricular programs",
                        body: "After studying computer science on exchange, planning, design, and engineering finally read as one continuous flow. With IT in view as a whole, I wanted to solve as many real problems as I could, so I kept taking on programs with UX and UI design as my core role: JUNCTION ASIA 2022 AWS track, GLOBAL FUTURIZER 2022, a corporate-student proposal track with Google Cloud, and a generative AI planning course — each time going from problem definition to demo within days, with a team of strangers.",
                        result: "The problem → hypothesis → demo cycle became second nature, and BLINKERS, the company that set one of the briefs, offered me an internship",
                        lesson: "There is no such thing as bad planning. More time does not make a plan better."
                    },
                    {
                        period: "Feb 2022 — Dec 2025",
                        start: "2022-02",
                        end: "2025-12",
                        kind: "Volunteer",
                        tone: "activity",
                        title: "Seoul Learn mentor · Dongmyung Child Welfare Center",
                        body: "I have always been drawn to working with kids, and that turned into volunteering. As a Seoul Learn mentor I taught English. I went to the Dongmyung Child Welfare Center to teach as well, but was told they already had more than enough teaching volunteers — what nobody signed up for was the cleaning that weighed most on the staff. So I switched to that and kept it up for two years and nine months.",
                        result: "Two years and nine months of cleaning at the center — and a rule of thumb: what is needed now comes before what I want to give",
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
                        body: "I tested a hypothesis: when the person planning can also build, the speed of validation changes outright. Unlike every hackathon before it, where I took the UX/UI role, this was the first where I took the engineering role as well. In six hours of vibe coding I took a save-for-later prototype for a cosmetics e-commerce store from plan to deployment on my own.",
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
            title: "Four things that remain",
            intro: "Lay the whole timeline out and four things remain: what I care about, where that came from, what I can do now, and how I work with a team.",
            lenses: [
                {
                    kicker: "Philosophy",
                    title: "Looking past what is visible",
                    body: "What people actually want tends to sit behind what they ask for. Customers were buying wine, not an NFT; what they needed was not data but the decision the data makes possible. So when a request arrives I do not build it as stated — I rewrite it as \"what is this person unable to decide right now?\" After that the motion is always the same: ship the smallest version, watch where people actually stop, revise the rules. When judgment is split, I follow the numbers and the user's words rather than my own taste. Good product work is not knowing the right answer up front; it is building a structure that tells you that you are wrong sooner than anyone else would.",
                },
                {
                    kicker: "Background",
                    title: "Design, engineering, and entrepreneurship in one person",
                    body: "Visual design taught me how to build screens where users move to the next action without hesitating — reworking onboarding and information structure at BLINKERS lifted dwell time 48%. Choosing computer science on exchange let me build what I wanted to build myself, and startup clubs, a second major, and competitions showed me which company numbers those screens come back as. I did not study the three separately; each one came from getting stuck in the last. That combination is now the differentiator: when marketing, domain knowledge, content, data, and implementation live with one person, nothing leaks in the handoffs.",
                },
                {
                    kicker: "Hard skills",
                    title: "Designing data, analyzing it, returning it to the screen",
                    body: "I do not wait for someone else to build the metrics. I decide what to watch (design), make it land in GA4 and BigQuery (build), and read it through cohorts and funnels (analyze). The reading does not stop at a report — it goes back onto the screen in the shape users actually want. When a tool is missing I build it: I put the homepage and the automation agents together myself with agentic coding, and run planning, building, and measurement in one pair of hands. Stage by stage, that is how the 0-to-1 funnel moved.",
                    points: [
                        "Acquisition · 5.15M pages auto-generated with programmatic SEO, organic traffic up 19,000%",
                        "Activation · User journey and onboarding rebuilt, drop-off points located through cohort analysis — D7 retention up 65%, weekly analyses up 45%",
                        "Revenue · CTA A/B tests driving a 27% content-to-service conversion rate over three months",
                        "Referral · Analysis results packaged into shareable content units to create a return path"
                    ]
                },
                {
                    kicker: "Soft skills",
                    title: "Holding on to the end, but not alone",
                    body: "Persistence sits at the center of how I work. Once a goal is set, I do not drop it because there is no obvious method — I find the means and make it work. But I also learned that persistence held alone becomes a burden on a team. So trust comes first: I treat colleagues as customers, think from their context before speaking, and keep doing what I said I would. I believe leadership starts with followership, so I help with other people's work first and step forward when the moment needs it. And the harder things get, the more I try to protect the team's temperature — in a crisis, one joke is often what makes the next attempt possible. Across several teams I also confirmed that people's strengths come out most in one-on-one conversation.",
                }
            ],
            closingTitle: "And now",
            closing: "So far this has been one full lap around 0 to 1 — building acquisition, keeping users, and carrying them to conversion, designed and measured by hand. That is also why I am looking for what comes next: I want to run the same loop at a larger user scale and against harder problems. There is one capability I want to keep growing — taking whatever means the problem requires and making the impossible work. Data, AI, code I wrote myself: the tools will keep changing, but not letting go until it works will not. And the goal at the end of it is clear. Someday, at Google, I want to solve problems in products the world uses every day, in exactly that way."
        }
    }
};

export default timeline;
