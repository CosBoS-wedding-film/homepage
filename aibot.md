# AI 챗봇 설정 정보

## API 키 보안 (Cloudflare Workers)
- **API 키 저장**: Cloudflare Workers 환경변수 (코드에 노출 X)
- **Worker URL**: `https://chatbot.cosbos-wedding-film-88f.workers.dev`
- **관리**: [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → chatbot → Settings → Variables

## Cloudflare란?
- 무료 서버리스 함수 서비스
- GitHub Pages에서 API 키를 숨기기 위해 사용
- 클라이언트 → Cloudflare → Gemini API (API 키는 Cloudflare에만 저장)

## 키 변경 방법
1. [Google AI Studio](https://aistudio.google.com/apikey)에서 새 키 발급
2. Cloudflare Dashboard → chatbot → Settings → Variables
3. GEMINI_API_KEY 수정 → Save

## 대화 기록
- 챗봇 닫을 때 Google Sheets로 자동 저장
- 스프레드시트: `AI챗봇 대화기록`

## 파일 구조
```
contact/
├── index.html    # 챗봇 HTML
├── chatbot.css   # 스타일
├── chatbot.js    # 로직 (API 키 없음, Cloudflare URL만)
```
