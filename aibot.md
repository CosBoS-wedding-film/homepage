# AI 챗봇 설정 정보

## API 키 보안 (GitHub Secrets + Actions)
- **API 키 저장**: GitHub Secrets (repo 코드에 없음)
- **빌드 시**: `__GEMINI_API_KEY__` → 실제 키로 치환됨
- **Google 스캔**: repo에 키 없으니 revoke 안 함 ✅

## 작동 방식
```
[GitHub Secrets]
    ↓ 빌드 시 키 주입
[chatbot.js] ← __GEMINI_API_KEY__ → 실제 키로 치환
    ↓ 배포
[GitHub Pages] ← 배포된 파일에만 키 있음
```

## 키 변경 방법
1. [Google AI Studio](https://aistudio.google.com/apikey)에서 새 키 발급
2. GitHub repo → Settings → Secrets and variables → Actions
3. GEMINI_API_KEY 수정
4. 다시 push하면 자동 배포

## GitHub Secrets 설정
1. GitHub repo → Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `GEMINI_API_KEY`
4. Value: (API 키)

## 대화 기록
- 챗봇 닫을 때 Google Sheets로 자동 저장
- 스프레드시트: `AI챗봇 대화기록`

## 파일 구조
```
contact/
├── index.html    # 챗봇 HTML
├── chatbot.css   # 스타일
├── chatbot.js    # 로직 (__GEMINI_API_KEY__ 플레이스홀더)
.github/
└── workflows/
    └── deploy.yml  # 빌드 시 키 주입 + 배포
```
