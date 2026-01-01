# CosBoS Wedding Film Homepage

코스보스 웨딩필름 홈페이지

## 사이트 주소
https://cosbos-wedding-film.github.io/homepage/

---

## AI 챗봇 설정

### API 키 보안 (GitHub Secrets + Actions)
- **API 키 저장**: GitHub Secrets (repo 코드에 없음)
- **빌드 시**: `__GEMINI_API_KEY__` → 실제 키로 치환됨
- **Google 스캔**: repo에 키 없으니 revoke 안 함 ✅

### GitHub Actions란?
GitHub에서 코드를 push하면 자동으로 실행되는 빌드/배포 시스템

**왜 사용하나?**
- GitHub Pages = 정적 호스팅 (코드 그대로 배포)
- API 키를 코드에 넣으면 → GitHub에 노출 → Google이 감지해서 키 막음
- **해결책**: GitHub Secrets에 키 저장 → Actions가 빌드할 때 키 주입 → 배포

**작동 방식:**
```
[GitHub Secrets] ← API 키 저장 (코드에 없음)
    ↓ push하면 Actions 실행
[chatbot.js] ← __GEMINI_API_KEY__ → 실제 키로 치환
    ↓ 
[GitHub Pages] ← 배포된 파일에만 키 있음
```

### GitHub Pages 설정
- Settings → Pages → Source: **GitHub Actions** 선택 필수!
- "Deploy from a branch" 선택하면 키 주입 안 됨

### API 키 변경 방법
1. [Google AI Studio](https://aistudio.google.com/apikey)에서 새 키 발급
2. GitHub repo → Settings → Secrets and variables → Actions
3. GEMINI_API_KEY 수정
4. 다시 push하면 자동 배포

### GitHub Secrets 설정
1. GitHub repo → Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `GEMINI_API_KEY`
4. Value: (API 키)

### 대화 기록 (Google Sheets)
- 매 대화마다 Google Sheets로 자동 저장
- 스프레드시트: `AI챗봇 대화기록`
- **세션 ID 기반**: 같은 대화창이면 같은 행에 누적, 새 대화창이면 새 행 추가
- 스프레드시트 헤더: `세션ID | 타임스탬프 | 이름 | 예식일 | 예식장 | 상품 | 연락처 | 대화내역`

### Google Apps Script 수정 시
1. 스프레드시트 → 확장 프로그램 → Apps Script
2. 코드 수정 후 저장
3. **배포 → 배포 관리 → 연필 아이콘 → 새 버전 → 배포**
4. URL 바뀌면 `chatbot.js`의 `SHEETS_URL` 업데이트 필요

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
│   ├── index.html      # 문의 폼 + 챗봇
│   ├── chatbot.css     # 챗봇 스타일
│   └── chatbot.js      # 챗봇 로직 (__GEMINI_API_KEY__ 플레이스홀더)
├── product/
│   └── index.html      # 상품 페이지
├── reservation/
│   └── index.html      # 예약 현황
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions (빌드 시 키 주입 + 배포)
├── commit_log.md       # 커밋 기록
└── README.md           # 이 파일
```

