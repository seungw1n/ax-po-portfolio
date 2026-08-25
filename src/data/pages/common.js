// 전역 크롬 — 모든 URL에서 공통으로 노출된다.
// header: 좌상단 타이틀 / subtitle
// nodes:  3D 씬의 섹션 노드 라벨. 각 키가 그대로 하위 URL 이 된다. (projects → /projects)
export const common = {
    KO: {
        header: {
            title: "포트폴리오",
            subtitle: "데이터 & AI 프로덕트 오너"
        },
        nodes: {
            projects: "프로젝트",
            'about-me': "소개",
            resume: "이력서",
            study: "학습 아카이브",
            peer: "동료 평가",
            library: "서재",
            articles: "아티클"
        }
    },
    EN: {
        header: {
            title: "PORTFOLIO",
            subtitle: "Data & AI Product Owner"
        },
        nodes: {
            projects: "Projects",
            'about-me': "About Me",
            resume: "Resume",
            study: "Study Archive",
            peer: "Peer Review",
            library: "Library",
            articles: "Articles"
        }
    },
    CN: {
        header: {
            title: "作品集",
            subtitle: "数据与人工智能产品负责人"
        },
        nodes: {
            projects: "项目",
            'about-me': "关于我",
            resume: "简历",
            study: "学习档案",
            peer: "同行评审",
            library: "图书馆",
            articles: "文章"
        }
    },
    JP: {
        header: {
            title: "ポートフォリオ",
            subtitle: "データ & AI プロダクトオーナー"
        },
        nodes: {
            projects: "プロジェクト",
            'about-me': "自己紹介",
            resume: "履歴書",
            study: "学習アーカイブ",
            peer: "他己評価",
            library: "ライブラリ",
            articles: "記事"
        }
    },
    ES: {
        header: {
            title: "PORTAFOLIO",
            subtitle: "Dueño de Producto de Datos e IA"
        },
        nodes: {
            projects: "Proyectos",
            'about-me': "Sobre Mí",
            resume: "Currículum",
            study: "Archivo",
            peer: "Reseñas",
            library: "Biblioteca",
            articles: "Artículos"
        }
    }
};

export default common;
