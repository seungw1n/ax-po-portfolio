# 포트폴리오 프로젝트 진행 상황

## 프로젝트 개요
- **스택**: Vite + React + Three.js (React Three Fiber) + Zustand + Framer Motion + Wouter
- **CMS**: Sanity (portfolio-cms-studio/)
- **배포**: Vercel

---

## 완료된 작업

### 1. 호버 인터랙션 수정
- 행성 히트박스에 `stopPropagation()` 적용하여 잘못된 호버 문제 해결
- 히트박스 반경을 3.2 → 1.2로 단계적 축소 (노드 간 겹침 방지)
- 호버 시 다른 행성 및 텍스트에 투명도(0.3) 적용

### 2. 배경 그리드 축 색상
- Three.js 표준: X=빨강, Y=초록, Z=파랑 → 사용자 요청으로 Y=노란색으로 변경
- 원점 평면(x=0, y=0, z=0) 위의 모든 선 제거

### 3. 싱글 행성 스크롤 네비게이션 (대규모 리디자인)
**이전**: 여러 행성이 3D 공간에 흩어져 있고 OrbitControls로 회전
**이후**: 하나의 행성이 우측 중앙에 고정, 스크롤로 섹션 전환

#### 변경된 파일
| 파일 | 변경 내용 |
|------|-----------|
| `src/store/useStore.js` | `currentSection`, `SECTIONS` 배열, `setCurrentSection` 추가 |
| `src/components/canvas/SinglePlanet.jsx` | **신규** - 단일 행성 컴포넌트, 섹션별 파티클 형태 모핑 |
| `src/components/canvas/Scene.jsx` | OrbitControls 제거, 스크롤 기반 섹션 전환 (쿨다운 600ms) |
| `src/components/overlay/SectionPanel.jsx` | **신규** - 좌측 고정 패널 (섹션명, 도트 네비, 자세히 보기) |
| `src/components/overlay/Layout.jsx` | SectionPanel 통합 |
| `src/App.jsx` | 라우팅과 섹션 인덱스 동기화 |

#### 섹션별 행성 형태
| 섹션 | 형태 | 회전 속도 |
|------|------|-----------|
| about | sphere (구) | 0.06 |
| projects | cube (큐브) | 0.1 |
| resume | ring (링) | 0.04 |
| study | spiral (나선) | 0.08 |
| peer | double (이중 클러스터) | 0.07 |
| library | column (기둥) | 0.05 |
| articles | cloud (구름) | 0.09 |

#### 스크롤 동작
- `wheel` 이벤트 감지 → 누적량이 threshold(50) 초과 시 섹션 전환
- 600ms 쿨다운으로 연속 입력 방지
- 모달(activeNode) 열려있을 때는 스크롤 네비게이션 비활성

### 4. 배경 그리드 리디자인
**이전**: 규칙적인 XYZ 축 격자
**현재**: 3D 원통형 와이어프레임 그리드 (건축 설계도 스타일)

- 원통 축: Y축 (수직)
- 반경: 8, 길이: 80 (-40 ~ +40)
- 종축선 32개 + 원형 링 24개
- 유기적 wobble로 손 스케치 느낌
- 카메라를 Z=20으로 이동하여 원통 바깥에서 관측
- 배경색: `#F5F3F0` (텍스처 종이 느낌)
- fog: 15~55 범위

### 5. 기타
- 행성 위 텍스트 라벨 제거 (SectionPanel로 대체)
- 행성 내부 정육면체 프레임 제거
- 초기 랜딩 `/projects` 리다이렉트 추가 후 제거 (현재 `/`로 시작)
- Sanity CMS 스튜디오 폴더명 변경 (`ax-po-portfolio` → `portfolio-cms-studio`)

---

## 현재 아키텍처

```
src/
├── App.jsx                    # 라우팅 (RouteHandler) + 메인 레이아웃
├── store/useStore.js          # Zustand 상태관리
├── components/
│   ├── canvas/
│   │   ├── Scene.jsx          # Canvas + 스크롤 컨트롤러
│   │   ├── SinglePlanet.jsx   # 단일 행성 (파티클 모핑)
│   │   ├── Environment.jsx    # 원통형 3D 그리드 배경
│   │   └── Lights.jsx         # 조명
│   ├── overlay/
│   │   ├── Layout.jsx         # 오버레이 레이아웃
│   │   ├── SectionPanel.jsx   # 좌측 섹션 패널
│   │   ├── Modal.jsx          # 콘텐츠 모달
│   │   ├── Header.jsx         # 헤더
│   │   ├── ProjectList.jsx    # 프로젝트 목록
│   │   ├── ProjectDetail.jsx  # 프로젝트 상세
│   │   └── GenericContent.jsx # 일반 콘텐츠
│   └── common/
│       └── ErrorBoundary.jsx
├── data/translations.js       # 다국어 (KO, EN, CN, JP, ES)
├── utils/
│   ├── layout.js              # 노드 데이터 (레거시, 현재 미사용)
│   └── sanity.ts              # Sanity 클라이언트
└── hooks/useAnalytics.js
```

## 미사용/레거시 파일
- `src/components/canvas/Node.jsx` - 기존 다중 행성 노드 (SinglePlanet으로 대체)
- `src/components/canvas/Network.jsx` - 기존 네트워크 레이아웃 (제거됨)
- `src/components/canvas/CameraController.jsx` - 기존 카메라 컨트롤러 (미사용)
- `src/components/canvas/ScrollRotator.jsx` - 기존 스크롤 회전 (Scene에 통합)
- `src/utils/layout.js` - getNodesLayout() 더 이상 호출되지 않음

---

## 커밋 이력
| 해시 | 메시지 |
|------|--------|
| `813f1e3` | 싱글 행성 스크롤 네비게이션으로 리디자인 |
| `155db62` | UI 개선: 호버 수정, 그리드 축 색상, 초기 랜딩 변경 |
| `1d2abbc` | 진행 중 |
| `eda30bb` | Initial commit: Vite + React portfolio project |
