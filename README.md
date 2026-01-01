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

### 대화 기록
- 챗봇 닫을 때 Google Sheets로 자동 저장
- 스프레드시트: `AI챗봇 대화기록`

---

## 커스텀 도메인 설정

### 도메인 구매
1. [Namecheap](https://namecheap.com), [GoDaddy](https://godaddy.com), [가비아](https://gabia.com) 등에서 도메인 구매
2. 예: `cosbos.com` (연 1-2만원)

### GitHub Pages에 연결
1. 도메인 DNS 설정에서 CNAME 레코드 추가:
   - Host: `www`
   - Value: `cosbos-wedding-film.github.io`
2. A 레코드 추가 (GitHub IP):
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. GitHub repo → Settings → Pages → Custom domain에 도메인 입력
4. Enforce HTTPS 체크

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

