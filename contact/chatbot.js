// ============================================
// 코스보스 AI 챗봇 설정
// ============================================

// API 키는 config.js에서 로드됩니다 (config.js는 .gitignore에 추가됨)

// AI 시스템 프롬프트 (챗봇이 알고 있을 정보)
const SYSTEM_PROMPT = `당신은 코스보스(CosBoS) 웨딩필름의 친절한 상담 AI입니다.

코스보스 정보:
- 시네마틱 웨딩 영상 전문 업체
- 슬로건: "50년이 지나도 아름답게 기억될 시네마틱 영상"
- 4대의 4K 카메라 원본 무료 제공

상품 구성:
1. Classic (1인 4캠): 정가 99만원
   - 4K 시네마 카메라 4대
   - 하이라이트 + 풀무비 + 원본
   
2. Premium (2인 5캠): 정가 154만원
   - 촬영감독 2인
   - 4K 시네마 카메라 5대
   - 하이라이트 + 풀무비 + 원본

현재 프로모션: 40% 할인 이벤트 진행중
- Classic: 59.4만원
- Premium: 92.4만원
- 추가 옵션 2가지 무료 (대표지정, 인터뷰)

연락처:
- 이메일: cosbos.wedding.film@gmail.com
- 인스타그램: @cosbos.wedding.film
- 카카오톡 채널 운영 중

예약 안내:
- 이 페이지의 예약 폼을 작성하시면 문자로 예약 가능 여부를 안내드립니다.

응대 스타일:
- 따뜻하고 친근하게 응대
- 간결하고 명확한 답변
- 필요시 예약 폼 작성을 안내
- 모르는 질문은 카카오톡이나 이메일로 문의 안내`;

// ============================================
// 챗봇 초기화 (페이지 로드 시 자동 실행)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSend = document.getElementById('chatbotSend');
  
  if (!chatbotToggle) return; // 챗봇 요소가 없으면 종료
  
  let chatHistory = [];
  
  // 토글 버튼 클릭
  chatbotToggle.addEventListener('click', () => {
    chatbotToggle.classList.toggle('active');
    chatbotWindow.classList.toggle('open');
    if (chatbotWindow.classList.contains('open')) {
      chatbotInput.focus();
    }
  });
  
  // 메시지 추가 함수
  function addMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    msg.textContent = text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // 타이핑 표시
  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-message bot typing';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatbotMessages.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }
  
  // Gemini API 호출
  async function sendToGemini(userMessage) {
    chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });
    
    const requestBody = {
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: '네, 코스보스 웨딩필름 상담 AI로서 친절하게 도와드리겠습니다.' }] },
        ...chatHistory
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    };
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      );
      
      const data = await response.json();
      console.log('API Response:', data); // 디버깅용
      
      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.error?.message || 'API 오류');
      }
      
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || '죄송합니다, 답변을 생성하지 못했습니다.';
      
      chatHistory.push({ role: 'model', parts: [{ text: botReply }] });
      return botReply;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return `오류: ${error.message}`;
    }
  }
  
  // 전송 처리
  async function handleSend() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    chatbotInput.value = '';
    chatbotSend.disabled = true;
    
    showTyping();
    const reply = await sendToGemini(message);
    hideTyping();
    
    addMessage(reply, false);
    chatbotSend.disabled = false;
  }
  
  // 이벤트 리스너
  chatbotSend.addEventListener('click', handleSend);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
});

