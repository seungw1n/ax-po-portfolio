# CMS 스키마 가이드 (`project`)

`docs/projects/*.md` 문서를 CMS에 옮길 때 참고하는 양식 정의서입니다.

- **단일 소스(원본):** `portfolio-cms-studio/schemaTypes/project.ts`
- 사전 정의값은 이 파일의 각 필드 `options.list`에 하드코딩돼 있습니다. 값을 바꾸면 `cd portfolio-cms-studio && npx sanity schema deploy`로 재배포해야 CMS에 반영됩니다.
- 아래 표의 **저장값(value)** = 실제 문서에 저장되고 프론트엔드가 읽는 값. **라벨(title)** = CMS 편집 화면에 보이는 글자.

---

## 상단 필드 (문서 레벨)

| 필드명 | 라벨 | 타입 | 필수 | 비고 |
|--------|------|------|:----:|------|
| `title` | 프로젝트 제목 | string | ✅ | |
| `summary` | 요약 (Summary) | text(3줄) | | 목록 카드에 표시될 짧은 설명 |
| `period` | 기간 | string | | 자유 입력. 예: `2024.01 - 2024.03`, `3개월` |
| `role` | 직무 | string · 단일 드롭다운 | | 아래 사전 정의값 |
| `organization` | 소속 | string · 단일 드롭다운 | | 아래 사전 정의값 |
| `contributions` | 기여 | string[] · 다중 선택 | | 아래 사전 정의값 |
| `productTypes` | 제품 유형 | string[] · 다중 선택 | | 아래 사전 정의값 |
| `experienceType` | 경험 구분 | string · 단일 드롭다운 | | 아래 사전 정의값 |
| `thumbnail` | 대표 썸네일 이미지 | image | ✅ | hotspot 지원 |
| `sections` | 본문 섹션 | array | | 섹션 단위 본문 (아래 참조) |

---

## 사전 정의값 (드롭다운/체크박스)

### 직무 — `role` (단일 선택)
| 라벨 | 저장값 |
|------|--------|
| PO | `PO` |
| 서비스 기획 | `서비스기획` |
| 프로덕트 디자이너 | `프로덕트 디자이너` |

### 소속 — `organization` (단일 선택)
| 라벨 | 저장값 |
|------|--------|
| 빅밸류 (BigValue) | `빅밸류` |
| 휴맥스모빌리티 (HUMAX mobility) | `휴맥스모빌리티` |
| 블링커스 (Blinkers) | `블링커스` |
| 인터보이드 (intervoid) | `인터보이드` |

### 기여 — `contributions` (다중 선택)
| 라벨 = 저장값 |
|---------------|
| `문제 정의` |
| `유저 리서치` |
| `화면 설계` |
| `프로토타입` |
| `FE 개발` |
| `1인 개발` |

### 제품 유형 — `productTypes` (다중 선택)
| 라벨 = 저장값 |
|---------------|
| `웹` |
| `모바일` |
| `키오스크` |
| `코어` |
| `에이전트` |

### 경험 구분 — `experienceType` (단일 선택)
| 라벨 = 저장값 |
|---------------|
| `실무` |
| `개인` |
| `창업` |
| `해커톤` |

---

## 본문 섹션 — `sections[]`

각 섹션은 아래 필드를 가진 오브젝트입니다.

| 필드명 | 라벨 | 타입 | 필수 | 비고 |
|--------|------|------|:----:|------|
| `sectionTitle` | 섹션 제목 | string | ✅ | |
| `sectionType` | 섹션 타입 | string · 단일 드롭다운 | | 아래 사전 정의값 |
| `sectionImage` | 섹션 이미지 | image | | hotspot 지원 |
| `body` | 본문 | array | | 리치 텍스트(`block`) + 이미지(설명 캡션 포함) |

### 섹션 타입 — `sectionType` (단일 선택)
| 라벨 = 저장값 |
|---------------|
| `배경` |
| `문제` |
| `실험` |
| `시스템 설계` |
| `화면 설계` |
| `A/B 테스트` |
| `결과/회고` |

> `docs/projects/*.md`에서 각 `## n.` 절의 대괄호 값(예: `[배경]`)은 이 `sectionType` 저장값과 정확히 일치시켜야 합니다.

---

## 값 추가/수정 방법

1. `portfolio-cms-studio/schemaTypes/project.ts`에서 해당 필드의 `options.list` 배열을 수정
2. `cd portfolio-cms-studio && npx sanity schema deploy`
3. (CMS 스튜디오 UI에도 반영하려면) 스튜디오 재배포/재실행
4. 이 문서(`docs/cms-schema.md`)의 표도 함께 갱신
