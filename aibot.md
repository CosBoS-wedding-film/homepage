# AI 챗봇 설정 정보

## API 키 보안
- **Gemini API 키**: `chatbot.js` 5번째 줄
- **도메인 제한**: `https://cosbos-wedding-film.github.io/*` 에서만 작동
- 키 노출되어도 다른 사이트에서 사용 불가

## 키 관리
- [Google Cloud Console](https://console.cloud.google.com/apis/credentials) 에서 관리
- 키 이름: `aibot`

## 대화 기록
- 챗봇 닫을 때 Google Sheets로 자동 저장
- 스프레드시트: `AI챗봇 대화기록`
- Apps Script URL: 배포 → 배포 관리에서 확인

## 파일 구조
```
contact/
├── index.html    # 챗봇 HTML
├── chatbot.css   # 스타일
├── chatbot.js    # 로직 + API 키
└── aibot.md      # 이 파일
```

