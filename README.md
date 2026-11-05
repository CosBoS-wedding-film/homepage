# CosBoS Wedding Film Homepage

코스보스 웨딩필름 홈페이지

## 사이트 주소
https://cosbos-wedding-film.github.io/homepage/

---

## 일정 확인과 상담

Contact 폼은 예식일, 예식 시각, 장소를 입력하면 제출 전에 `가능`, `불가`, `확인 필요`를 보여 줍니다. `불가`와 `확인 필요`는 제출할 수 없습니다.

가능 여부는 같은 날 기존 일정과 촬영 시간이 겹치는지만 봅니다.

- 촬영 시간: 예식 시작 90분 전 ~ 예식 시작 60분 후
- 그 날짜 행의 `촬영 시간` 칸에 값이 있으면, 그 칸의 시작과 끝을 사용
- 겹치면 `불가`, 겹치지 않으면 `가능`
- 하루에 이미 몇 건이 있든 상관없음
- 이동 시간은 계산하지 않음. Kakao Mobility는 호출하지 않음

응답에는 판정과 짧은 이유만 있습니다. 다른 예식의 이름, 연락처, 장소, 시각은 브라우저로 내려가지 않습니다.

상담 칸은 `상담출처` 탭에 있는 문장만 보여 주고, 답변마다 탭 이름과 제목(또는 행 번호)을 붙입니다. 탭이 없거나 질문의 제목이 없으면 `상담출처에 없는 내용입니다.`라고만 합니다. 상담 문장은 이 저장소에 넣지 않습니다. 탭은 직접 만들고, 1행 헤더는 `제목`, `내용`으로 둡니다. 질문 안에 제목이 들어 있거나 제목 안에 질문이 들어 있을 때만 그 행을 보여 줍니다.

### 시트를 읽는 서버

GitHub Pages는 정적 사이트라 시트를 읽지 못합니다. `node server/index.js`가 페이지와 API를 함께 제공합니다. 이 서버로 열지 않으면 일정 확인이 실패하고 문의는 제출되지 않습니다.

서버만 아래 스프레드시트를 읽습니다.

- 스프레드시트 ID: `1Z5K9otbS1go4NcKSQyOJ3lSTt8y7bNYsUYFkdxU8qIE`
- 일정: 문의 달의 `YYYY.MM` 탭만. 예: `2026.11`. 그 탭이 없으면 그 달은 일정이 없는 날로 봅니다.
- 그 탭에서 읽는 열: `일시` (`YYMMDD_HHMM`, 예: `261107_1100`), `촬영 시간`
- 상담: `상담출처` 탭만

### 넣어 주셔야 하는 인증

서비스 계정 키 JSON 전체를 환경변수 `GOOGLE_SERVICE_ACCOUNT_JSON`에 한 줄로 넣습니다. 키의 `client_email`을 위 스프레드시트에 뷰어로 공유합니다. 키가 없으면 가능으로 답하지 않고 `확인 필요`를 반환합니다.

```
export GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","client_email":"...","private_key":"..."}'
node server/index.js
```

기본 주소는 http://127.0.0.1:8787 입니다. 페이지와 API를 서로 다른 주소에 둘 때만 `contact/index.html`의 `COSBOS_API_BASE`를 서버 오리진으로 바꿉니다.

---

## 커스텀 도메인 설정

### 도메인 구매 내역
- **도메인**: `cosbos-wedding-film.com`
- **구매처**: [가비아](https://gabia.com)
- **가격**: 19,800원/년 (부가세 1,800원 포함)
- **구매일**: 2026.01.01 19:30
- **만료일**: 2027.01.01 (갱신 필요)

### 가비아 DNS 설정 (완료)
**A 레코드 4개:**
| 타입 | 호스트 | 값 | TTL |
|------|--------|-----|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

**CNAME 레코드 1개:**
| 타입 | 호스트 | 값 | TTL |
|------|--------|-----|-----|
| CNAME | www | cosbos-wedding-film.github.io. | 600 |

### GitHub Pages 설정
1. Settings → Pages → Custom domain: `cosbos-wedding-film.com`
2. Enforce HTTPS 체크 ✅

---

## 파일 구조
```
homepage/
├── index.html          # 메인 페이지
├── contact/
│   └── index.html      # 문의 폼 + 출처 상담
├── server/
│   ├── index.js        # 정적 파일과 /api/availability, /api/consult
│   ├── availability.js # 같은 날 시간 겹침
│   ├── consult.js      # 상담출처 인용
│   └── sheets.js       # 시트에서 필요한 열만 읽기
├── product/
│   └── index.html      # 상품 페이지
├── reservation/
│   └── index.html      # 예약 현황
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions 정적 배포
├── commit_log.md       # 커밋 기록
└── README.md           # 이 파일
```

