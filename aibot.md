# AI 챗봇 설정 정보

## API 키 보안 (Cloudflare Workers)
- **API 키 저장**: Cloudflare Workers 환경변수 (코드에 노출 X)
- **Worker URL**: `https://chatbot.cosbos-wedding-film-88f.workers.dev`
- **관리**: [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → chatbot → Settings → Variables

## Cloudflare Workers란?
GitHub Pages는 정적 파일(HTML/CSS/JS)만 서빙 가능 → API 키를 코드에 넣으면 노출됨

**해결책: Cloudflare Workers**
- 무료 서버 (직접 서버 관리 안 해도 됨)
- API 키를 Cloudflare에만 저장 → 코드에 없으니 GitHub에서 노출 안 됨

**작동 방식:**
```
[사용자 브라우저] 
    ↓ 채팅 메시지 전송
[Cloudflare Workers] ← API 키 여기에만 있음
    ↓ Gemini API 호출
[Google Gemini]
    ↓ AI 응답
[Cloudflare Workers]
    ↓ 응답 전달
[사용자 브라우저]
```

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
