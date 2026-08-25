// URL / 페이지 위계별로 분리된 콘텐츠를 하나의 translations 객체로 조립한다.
// 실제 텍스트는 src/data/pages/** 에 있으니 수정은 그쪽에서 한다.
//
//   (전역)         common.js            (header, nodes — 모든 URL 공통 크롬)
//   /about-me      pages/about-me/      (index.js: 커버 / timeline.js: 경험 타임라인)
//   /projects      pages/projects/      (목록 + /project/:id 상세)
//   /resume        pages/resume.js
//   /study         pages/study.js
//   /peer          pages/peer.js
//   /library       pages/library.js
//   /articles      pages/articles.js
import common from './pages/common';
import aboutMe from './pages/about-me';
import projects from './pages/projects';
import resume from './pages/resume';
import study from './pages/study';
import peer from './pages/peer';
import library from './pages/library';
import articles from './pages/articles';

export const LANGUAGES = ['KO', 'EN', 'CN', 'JP', 'ES'];

// modal 키는 URL 세그먼트와 1:1로 대응한다. (SECTIONS in src/store/useStore.js)
const PAGES = {
    projects,
    'about-me': aboutMe,
    resume,
    study,
    peer,
    library,
    articles,
};

export const translations = Object.fromEntries(
    LANGUAGES.map((lang) => [
        lang,
        {
            header: common[lang].header,
            nodes: common[lang].nodes,
            modal: Object.fromEntries(
                Object.entries(PAGES).map(([url, page]) => [url, page[lang]])
            ),
        },
    ])
);

export default translations;
