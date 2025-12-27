// ============================================
// 코스보스 AI 챗봇 설정
// ============================================

const GEMINI_API_KEY = 'AIzaSyBUdm2klisyS0jyoXlA6FIn-nyMBrd97oI';

// AI 시스템 프롬프트 (챗봇이 알고 있을 정보)
const SYSTEM_PROMPT = `당신은 코스보스(CosBoS) 웨딩필름의 친절한 상담 AI입니다.

코스보스 정보:
- 시네마틱 웨딩 영상 전문 업체
- 슬로건: "50년이 지나도 아름답게 기억될 시네마틱 영상"
- 4대의 4K 카메라로 본식의 모든 부분을 빠짐없이 촬영

상품 구성:
1. Classic (1인 4캠)
   - 촬영감독 1인
   - 4K 시네마 카메라 4대
   - 하이라이트 + 풀무비
   
2. Premium (2인 4캠)
   - 촬영감독 2인 (메인 1인 3캠 + 서브 1인 1캠)
   - 4K 시네마 카메라 4대
   - 하이라이트 + 풀무비 + 원본

계약 안내:
- 계약금: 10만원 (계약 체결 후 반환 불가, 천재지변/예식장 폐쇄 제외)
- 계좌: 토스뱅크 1000-4705-1036 조**
- 잔금: 예식 3일 전까지 완납

계약서 주요 내용:
- 영상 납품: 예식일 기준 100일 이내
- 영상 보존: 전달일 기준 1개월 후 자동 삭제
- 촬영 시간: 본식 1시간 전 ~ 신랑신부 퇴장
- 수정 요청: 재생 오류/명백한 편집 문제 시에만 가능, 전송 후 3일 이내

출장비:
- 무료: 서울, 수도권(분당/수원/부천/일산/안양/광명/의정부), 인천/송도
- 5만원: 파주/포천/강화/양평/동두천/여주/이천/화성/안성/평택/오산/가평
- 15만원: 원주/횡성/철원/화천/춘천/홍천
- 20만원: 강릉/속초, 충청지역
- 30만원: 전북/경북
- 35만원: 전남/경남
- 40만원: 제주

이벤트:
- 원본 무료: 카톡 후기(200자 이상) 작성시 메인캠 원본 무료
- 블로그/웨딩카페 후기 작성시 전체 원본 무료

연락처:
- 이메일: cosbos.wedding.film@gmail.com
- 인스타그램: @cosbos.wedding.film
- 카카오톡 채널 운영 중

응대 스타일:
- 따뜻하고 친근하게 응대
- 간결하고 명확한 답변 (2-3문장)
- 계약서 작성을 자연스럽게 유도
- 복잡한 질문은 "대표님께서 연락드릴 때 자세히 안내드릴게요" 라고 안내`;

// ============================================
// 챗봇 초기화
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSend = document.getElementById('chatbotSend');
  
  const chatbotClose = document.getElementById('chatbotClose');
  
  if (!chatbotToggle) return;
  
  let chatHistory = [];
  let conversationLog = []; // 대화 내역 저장 (이메일용)
  let customerData = null;
  
  // 챗봇 닫기 함수
  function closeChatbot() {
    chatbotToggle.classList.remove('active');
    chatbotWindow.classList.remove('open');
  }
  
  // 토글 버튼 클릭
  chatbotToggle.addEventListener('click', () => {
    chatbotToggle.classList.toggle('active');
    chatbotWindow.classList.toggle('open');
    if (chatbotWindow.classList.contains('open')) {
      chatbotInput.focus();
    }
  });
  
  // 헤더 X 버튼 클릭
  if (chatbotClose) {
    chatbotClose.addEventListener('click', closeChatbot);
  }
  
  // 메시지 추가 함수
  function addMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    msg.textContent = text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // 대화 내역 저장
    conversationLog.push({
      role: isUser ? '고객' : 'AI',
      text: text,
      time: new Date().toLocaleTimeString('ko-KR')
    });
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
    
    // 고객 정보가 있으면 시스템 프롬프트에 추가
    let contextPrompt = SYSTEM_PROMPT;
    if (customerData) {
      contextPrompt += `\n\n현재 상담 중인 고객 정보:
- 이름: ${customerData.name}
- 예식일: ${customerData.date} ${customerData.time}
- 예식장: ${customerData.venue}
- 선택상품: ${customerData.package}
- 할인가: ${customerData.price}원
- 연락처: ${customerData.contact}`;
    }
    
    const requestBody = {
      contents: [
        { role: 'user', parts: [{ text: contextPrompt }] },
        { role: 'model', parts: [{ text: '네, 코스보스 웨딩필름 상담 AI로서 친절하게 도와드리겠습니다.' }] },
        ...chatHistory
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    };
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'API 오류');
      }
      
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || '죄송합니다, 답변을 생성하지 못했습니다.';
      
      chatHistory.push({ role: 'model', parts: [{ text: botReply }] });
      return botReply;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return '연결 오류가 발생했어요. 카카오톡으로 문의해 주세요!';
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
    
    // 대화 5회 이상이면 이메일 전송 (한 번만)
    if (conversationLog.length >= 10 && !window.chatLogSent) {
      sendChatLog();
    }
  }
  
  // 대화 내역 이메일 전송
  function sendChatLog() {
    if (!customerData || window.chatLogSent) return;
    window.chatLogSent = true;
    
    const logText = conversationLog.map(m => `[${m.time}] ${m.role}: ${m.text}`).join('\n');
    
    emailjs.send('cosbos250720', 'template_cxupggi', {
      name: customerData.name + ' (AI상담내역)',
      date: customerData.date,
      time: customerData.time,
      venue: customerData.venue,
      package: customerData.package,
      price: customerData.price,
      contact: customerData.contact,
      discount_percent: '40',
      chat_log: logText
    }).catch(err => console.log('Chat log send failed:', err));
  }
  
  // 이벤트 리스너
  chatbotSend.addEventListener('click', handleSend);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
  
  // 외부에서 AI 상담 시작 (폼 제출 후 호출)
  window.startAiConsult = function() {
    customerData = window.customerData;
    
    // 챗봇 열기
    chatbotToggle.classList.add('active');
    chatbotWindow.classList.add('open');
    
    // 기존 메시지 초기화
    chatbotMessages.innerHTML = '';
    chatHistory = [];
    conversationLog = [];
    window.chatLogSent = false;
    
    // 예약 안내 고정 메시지
    const notice = document.createElement('div');
    notice.className = 'chat-notice';
    notice.innerHTML = `
      <span style="color:#dc2626;">⚠️ 계약금 10만원 입금 시 예약 확정</span><br>
      <span style="font-size:11px;color:#6b7280;">토스뱅크 1000-4705-1036 조**</span>
    `;
    chatbotMessages.appendChild(notice);
    
    // AI 인사 메시지
    if (customerData) {
      const greeting = `${customerData.name}님, ${customerData.date} ${customerData.venue}에서 ${customerData.package}로 문의해 주셨네요! ✧ 궁금하신 점 편하게 물어보세요.`;
      addMessage(greeting, false);
    } else {
      addMessage('안녕하세요! 코스보스 웨딩필름입니다 ✧ 궁금하신 점 있으시면 편하게 물어보세요.', false);
    }
    
    // 빠른 응답 버튼 추가
    addQuickReplies();
    
    chatbotInput.focus();
  };
  
  // 빠른 응답 버튼
  function addQuickReplies() {
    const quickReplies = [
      '(예시) 상품 구성이 궁금해요.',
      '(예시) 대표님께 남기고 싶은 말이 있어요.',
    ];
    
    const container = document.createElement('div');
    container.className = 'quick-replies';
    
    quickReplies.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply-btn';
      btn.textContent = text;
      btn.addEventListener('click', async () => {
        // 버튼 컨테이너 제거
        container.remove();
        
        // 메시지 전송
        addMessage(text, true);
        chatbotSend.disabled = true;
        showTyping();
        const reply = await sendToGemini(text);
        hideTyping();
        addMessage(reply, false);
        chatbotSend.disabled = false;
      });
      container.appendChild(btn);
    });
    
    chatbotMessages.appendChild(container);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});
