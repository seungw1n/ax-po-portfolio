// URL: /about-me — 소개 페이지 (커버 · 임팩트 지표 · 일하는 원칙 · 스택)
// 같은 페이지 하단의 경험 타임라인 섹션 데이터는 ./timeline.js 에 있다.
export const aboutMe = {
    KO: {
        kicker: "About Me",
        greeting: "안녕하세요,",
        name: "정승원",
        tagline: "데이터를 도메인의 언어로 번역해, 사용자의 의사결정을 돕는 Growth PO입니다.",
        intro: "시각디자인과 창업학을 전공하고, 공간·상권 데이터 서비스 빅밸류의 Growth PO로 일하고 있습니다. 데이터가 익숙하지 않은 사용자도 스스로 판단을 내릴 수 있도록 도메인 지표 설계부터 특화 콘텐츠, 검색 유입(SEO/GEO), 온보딩까지 하나의 여정으로 잇습니다.",
        highlights: [
            { value: "19,000%", label: "월 평균 오가닉 검색 유입 증가" },
            { value: "27%", label: "콘텐츠 → 서비스 전환율" },
            { value: "45%", label: "주 평균 분석 건수 증가" }
        ],
        principlesLabel: "How I Work",
        principles: [
            "데이터 자체보다, 데이터로 얻을 수 있는 가치를 먼저 전달합니다.",
            "큰 문제를 퍼널 단위로 쪼개고, 실험으로 하나씩 검증합니다.",
            "반복되는 발굴과 제작은 AI 에이전트로 자동화하고, 남은 시간을 판단에 씁니다."
        ],
        stackLabel: "STACK",
        skills: [
            { category: "Product", items: ["문제 정의", "가설 수립", "A/B 테스트", "온보딩 개선"] },
            { category: "Growth", items: ["퍼널 전환 설계", "SEO / GEO", "프로그래매틱 SEO", "리드 제너레이션"] },
            { category: "Data", items: ["이벤트 로그 설계", "Google Analytics 4", "BigQuery", "Looker Studio"] },
            { category: "Design", items: ["Figma", "UX 리서치", "디자인 시스템", "플러그인 개발"] },
            { category: "AI / Build", items: ["Claude Code", "에이전틱 워크플로우 자동화"] },
            { category: "Business", items: ["비즈니스 모델", "시장 조사", "벤치마킹", "KPI 수립"] }
        ],
        meta: {
            location: "서울, 대한민국",
            availability: "PM / PO / Growth",
            contact: "tmddnjs1411@gmail.com"
        }
    },
    EN: {
        kicker: "About Me",
        greeting: "Hello,",
        name: "Seungwon Jeong",
        tagline: "A growth PO who translates data into the language of a domain, so people can decide for themselves.",
        intro: "I studied visual design and entrepreneurship, and now work as a growth PO at BigValue, a spatial and commercial-district data SaaS. For small business owners and real estate brokers who are not used to working with data, I connect the whole journey — organic acquisition (SEO/GEO), domain metric design, content, and onboarding — into one path toward a confident decision.",
        highlights: [
            { value: "19,000%", label: "Monthly organic search traffic" },
            { value: "27%", label: "Content to service conversion" },
            { value: "45%", label: "Weekly analyses run" }
        ],
        principlesLabel: "How I Work",
        principles: [
            "Lead with the value data unlocks, not the data itself.",
            "Break a big problem into funnel-sized pieces and validate them one experiment at a time.",
            "Automate repetitive discovery and production with AI agents, and spend the time saved on judgment."
        ],
        stackLabel: "STACK",
        skills: [
            { category: "Product", items: ["Problem framing", "Funnel design", "A/B testing", "Onboarding"] },
            { category: "Growth", items: ["SEO / GEO", "Programmatic SEO", "Content strategy", "Lead generation"] },
            { category: "Data", items: ["GA4", "BigQuery", "Looker Studio", "SQL"] },
            { category: "Design", items: ["Figma", "Design systems", "Plugin development", "FigJam"] },
            { category: "AI / Build", items: ["Claude Code", "Workflow automation", "Prompt design"] },
            { category: "Business", items: ["Market research", "Benchmarking", "Financial modeling", "KPI analysis"] }
        ],
        meta: {
            location: "Seoul, KR",
            availability: "Open to PM / PO roles and collaboration",
            contact: "tmddnjs1411@gmail.com"
        }
    },
    CN: {
        kicker: "About Me",
        greeting: "你好,",
        name: "郑承元",
        tagline: "把数据翻译成行业语言，帮助用户自主决策的增长 PO。",
        intro: "我主修视觉设计并辅修创业学，现在在空间与商圈数据 SaaS 公司 BigValue 担任增长 PO。为了让不熟悉数据的小微商户和房产中介也能自己做判断，我把搜索获客（SEO/GEO）、行业指标设计、内容与新手引导串成一条完整的决策路径。",
        highlights: [
            { value: "19,000%", label: "月均自然搜索流量增长" },
            { value: "27%", label: "内容到服务的转化率" },
            { value: "45%", label: "周均分析次数增长" }
        ],
        principlesLabel: "How I Work",
        principles: [
            "先讲清楚数据能带来的价值，而不是数据本身。",
            "把大问题拆成漏斗单元，用实验逐个验证。",
            "把重复的挖掘与生产交给 AI 智能体，把时间留给判断。"
        ],
        stackLabel: "STACK",
        skills: [
            { category: "Product", items: ["问题定义", "漏斗设计", "A/B 测试", "新手引导优化"] },
            { category: "Growth", items: ["SEO / GEO", "程序化 SEO", "内容策略", "线索获取"] },
            { category: "Data", items: ["GA4", "BigQuery", "Looker Studio", "SQL"] },
            { category: "Design", items: ["Figma", "设计系统", "插件开发", "FigJam"] },
            { category: "AI / Build", items: ["Claude Code", "工作流自动化", "提示词设计"] },
            { category: "Business", items: ["市场调研", "对标分析", "财务建模", "KPI 分析"] }
        ],
        meta: {
            location: "首尔, 韩国",
            availability: "欢迎 PM / PO 职位与合作邀约",
            contact: "tmddnjs1411@gmail.com"
        }
    },
    JP: {
        kicker: "About Me",
        greeting: "はじめまして,",
        name: "チョン・スンウォン",
        tagline: "データをドメインの言葉に翻訳し、ユーザー自身の意思決定を支えるグロースPOです。",
        intro: "ビジュアルデザインを専攻し、起業学を副専攻しました。現在は空間・商圏データSaaSのBigValueでグロースPOとして働いています。データに不慣れな個人事業主や不動産仲介者が自ら判断できるよう、検索流入（SEO/GEO）からドメイン指標の設計、コンテンツ、オンボーディングまでを一つの体験としてつないでいます。",
        highlights: [
            { value: "19,000%", label: "月平均オーガニック検索流入の増加" },
            { value: "27%", label: "コンテンツ→サービス転換率" },
            { value: "45%", label: "週平均分析件数の増加" }
        ],
        principlesLabel: "How I Work",
        principles: [
            "データそのものより、データから得られる価値を先に伝えます。",
            "大きな課題をファネル単位に分解し、実験で一つずつ検証します。",
            "繰り返しの発掘と制作はAIエージェントに任せ、空いた時間を判断に使います。"
        ],
        stackLabel: "STACK",
        skills: [
            { category: "Product", items: ["課題定義", "ファネル設計", "A/Bテスト", "オンボーディング改善"] },
            { category: "Growth", items: ["SEO / GEO", "プログラマティックSEO", "コンテンツ戦略", "リード獲得"] },
            { category: "Data", items: ["GA4", "BigQuery", "Looker Studio", "SQL"] },
            { category: "Design", items: ["Figma", "デザインシステム", "プラグイン開発", "FigJam"] },
            { category: "AI / Build", items: ["Claude Code", "ワークフロー自動化", "プロンプト設計"] },
            { category: "Business", items: ["市場調査", "ベンチマーキング", "財務モデリング", "KPI分析"] }
        ],
        meta: {
            location: "ソウル, 韓国",
            availability: "PM / PO ポジション・協業のご相談歓迎",
            contact: "tmddnjs1411@gmail.com"
        }
    },
    ES: {
        kicker: "About Me",
        greeting: "Hola,",
        name: "Seungwon Jeong",
        tagline: "Un growth PO que traduce los datos al lenguaje del sector para que cada persona decida por sí misma.",
        intro: "Estudié diseño visual con una segunda titulación en emprendimiento y hoy trabajo como growth PO en BigValue, un SaaS de datos espaciales y de zonas comerciales. Para que pequeños comercios y agentes inmobiliarios sin hábito de usar datos puedan decidir por su cuenta, conecto todo el recorrido: adquisición orgánica (SEO/GEO), diseño de métricas del sector, contenido y onboarding.",
        highlights: [
            { value: "19,000%", label: "Tráfico orgánico mensual" },
            { value: "27%", label: "Conversión de contenido a servicio" },
            { value: "45%", label: "Análisis semanales realizados" }
        ],
        principlesLabel: "How I Work",
        principles: [
            "Primero el valor que desbloquean los datos, no los datos en sí.",
            "Divido el problema grande en tramos del embudo y valido uno a uno con experimentos.",
            "Automatizo con agentes de IA lo repetitivo y dedico el tiempo ganado al criterio."
        ],
        stackLabel: "STACK",
        skills: [
            { category: "Product", items: ["Definición del problema", "Diseño de embudo", "Test A/B", "Onboarding"] },
            { category: "Growth", items: ["SEO / GEO", "SEO programático", "Estrategia de contenido", "Generación de leads"] },
            { category: "Data", items: ["GA4", "BigQuery", "Looker Studio", "SQL"] },
            { category: "Design", items: ["Figma", "Sistemas de diseño", "Desarrollo de plugins", "FigJam"] },
            { category: "AI / Build", items: ["Claude Code", "Automatización de flujos", "Diseño de prompts"] },
            { category: "Business", items: ["Investigación de mercado", "Benchmarking", "Modelado financiero", "Análisis de KPI"] }
        ],
        meta: {
            location: "Seúl, Corea del Sur",
            availability: "Abierto a puestos de PM / PO y colaboraciones",
            contact: "tmddnjs1411@gmail.com"
        }
    }
};

export default aboutMe;
