// ============================================
// 코스보스 AI 챗봇 설정
// ============================================

// API 키는 Cloudflare Workers에 저장 (코드에 노출 X)
const CHAT_API_URL = 'https://chatbot.cosbos-wedding-film-88f.workers.dev';

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
   - 하이라이트 + 풀영상
   - 풀영상은 챕터별 영상 3편으로, 'Before Ceremony', 'Wedding Ceremony', 'After Ceremony' 챕터로 구성됩니다.
   
2. Premium (2인 4캠)
   - 촬영감독 2인 (메인 1인 3캠 + 서브 1인 1캠)
   - 4K 시네마 카메라 4대
   - 하이라이트 + 풀영상
   - 풀영상은 챕터별 영상 3편으로, 'Before Ceremony', 'Wedding Ceremony', 'After Ceremony' 챕터로 구성됩니다.

계약 안내:
- 계약금: 9만원 (계약 체결 후 반환 불가, 천재지변/예식장 폐쇄 제외)
- 계좌: 토스뱅크 1000-4705-1036 조**
- 잔금: 예식 3일 전까지 완납

계약서 주요 내용:
- 영상 납품: 예식일 기준 100일 이내
- 영상 보존: 전달일 기준 1개월 후 자동 삭제
- 촬영 시간: 본식 1시간 30분 전 ~ 원판
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
- 블로그/웨딩카페 후기 작성시 전체 원본 무료 (추후 가이드라인 전송)

연락처:
- 이메일: cosbos.wedding.film@gmail.com
- 인스타그램: @cosbos.wedding.film (홈페이지 하단 아이콘 클릭)
- 카카오톡 채널 운영 중 (홈페이지 하단 아이콘 클릭)

응대 스타일:
- 따뜻하고 친근하게 응대
- 간결하고 명확한 답변 (2-3문장)
- 계약서 작성을 자연스럽게 유도
- 복잡한 질문은 "대표님께서 연락드릴 때 자세히 안내드릴게요" 라고 안내
- 할인 관해서는 없다고 말씀드리며, 대신 가격을 최소의 가격을 미리 공지드린 거라서 퀄리티가 유사한 다른 업체에서 할인 받은 가격보다도 쌀 거라고 안내


아래는 계약서 전문 (바뀔 떄 마다 변경할 것)
제1조 【계약의 목적】
본 계약은 “신랑,신부”님께서 진행하시는 결혼예식의 웨딩촬영을 "코스보스 웨딩필름"에게 위탁하고 "코스보스 웨딩필름"이 관련 작업을 수행하는 것을 규율함을 목적으로 합니다.

제2조 【대금 지불】
계약금은 9만 원이며 계약 체결 후 반환은 불가합니다. 예식일 변경 시에도 동일하게 적용됩니다(천재지변이나 예식장 폐쇄의 경우 환불 가능합니다). 계약금 외 잔금은 촬영 1주일 전에 안내드리는 계좌번호로 예식 3일 전까지 완납해 주시는 것을 원칙으로 합니다. 현금영수증, 세금계산서를 원하실 경우 VAT(부가세)는 별도입니다.

제3조 【영상 납품】
촬영된 영상의 최종본 납품 기한은 예식일 기준 100일 이내 제작 완료를 원칙으로 하며, 불가피한 사정에 의해 납품이 늦어질 경우 양해를 구할 수 있습니다.

제4조 【영상 보존】
원본 및 편집 영상은 고용량의 영상으로 저장 공간의 한계가 있어, 영상 전달일 기준 1개월 이후, 저장 공간 제한으로 인해 원본 및 편집본은 자동 삭제됩니다.

제5조 【수정 작업】
사전에 확인하신 샘플 영상과 유사한 촬영 및 편집 스타일에 동의한 것으로 보고, 납품한 영상의 수정 요청에 관한 수락은 상품 제작상의 문제로 영상의 재생이 불가하거나, 상품의 불량 상태가 제3자가 보아도 명확한 경우(영상의 재생 오류 또는 명백한 편집상의 문제로 확인되는 경우)에만 진행 가능합니다. 또한, 수정에 대한 결정은 상품을 전송 받으신 기점으로 3일 이내에 요청해주셔야 합니다.

제6조 【촬영 관련】
본식 영상의 음성은 메인 카메라 장착 샷건 마이크 및 서브 카메라의 마이크로 수음되며, 고음질 녹음기 두대는 하이라이트 영상에 나레이션으로 사용할 경우에만 활용되고 식장 상황에 따라 활용되지 않을 수도 있으며 원본은 별도로 보관하지 않습니다. 메인 카메라는 모노포드를 사용하여 식 전반을 촬영하고, 서브 카메라 한 대는 본식을 끊김없이 촬영하기 위해 식장 전방에 삼각대로 고정 배치하며 나머지 서브 카메라 한 대는 단상을 향하게 배치합니다. 오즈모 짐벌 카메라는 식장 사이드에 고정 배치하여 사용되지만, 식장 여건과 촬영자의 판단에 따라 사용되지 않을 수도 있으며, 양가 부모님 및 하객 인터뷰는 촬영 거부를 제외하고 항상 촬영합니다. 2인 4캠 상품은 메인 촬영자가 1인 3캠을 운용하며, 서브 촬영자가 1인 1캠을 운용합니다. '인터뷰' 옵션은 전용 무선 마이크를 통해 선명하고 고품질의 음성으로 신랑·신부 양가 부모님과 각 측 지인 한 팀씩의 인터뷰를 촬영합니다. 단, 현장 상황이나 인터뷰 거부 등으로 인해 촬영 인원은 유동적으로 조정될 수 있습니다. 

제7조 【출장비 관련】
● 출장비가 발생하지 않는 지역
서울
수도권지역(분당/수원/부천/일산/안양/광명/의정부)
경인지역일부(인천/송도)
● 출장비가 발생하는 지역
경인지역일부(파주/포천/강화/양평/동두천/여주/이천/화성/안성/평택/오산/가평) - 5만원 
강원지역(원주/횡성/철원/화천/춘천/홍천) - 15만원 
강원지역 (강릉,속초) - 20 만원 
충청지역 -  20만원
전북,경북 - 30만원 
전남,경남 - 35만원 
제주지역 -  40만원

제8조 【저작권 및 초상권】
의뢰된 영상의 저작권은 코스보스 웨딩필름이 소유하게 되며, 해당 상품에 모든 인물의 초상권은 신랑, 신부님의 권한입니다. 다만, 코스보스 웨딩필름은 해당 상품의 영상/사진을 온라인 게시 및 각종 마케팅에 활용할 수 있으며, 해당 활용에 동의하지 않으실 경우, 촬영 이전에 반드시 사전 고지를 하셔야 하며 스틸 컷은 마케팅 동의 시에만 제공됩니다. 촬영 이후에는 마케팅 동의 철회가 불가합니다.

제9조 【보상 규정】
소비자피해보상규정에 의거하여 촬영 원본의 멸실 및 재해로 인한 사고 발생 시 전액을 환불합니다. 심각한 부상(골절 등) 또는 기타 사정으로 인해 촬영이 불가할 시 다른 촬영자로 대체할 수 있으며, 촬영자로 대체 촬영을 못하였을 경우 전액을 환불합니다. 유료 대표 지정 옵션이 실장 촬영으로 변경될 경우 해당 옵션 비용을 환불하며, 무료 업그레이드 혜택 건은 별도의 보상 없이 변경될 수 있습니다. 단, 무료 업그레이드 적용 건에 한하여 대표 지정 변경을 사유로 계약 해지를 원하실 경우 계약금 전액을 반환합니다. 단순변심이나 영상의 스타일이 마음에 안 들거나 불가피한 촬영 현장 (예식장, 제 3자 인물 방해, 장비 관련 및 오디오 녹음(주파수) 영상의 씽크 등) 문제로 발생한 모든 내용은 환불 및 기타 보상 대상 건에서 제외합니다. 하이라이트의 영상 길이는 보통 3분에서 6분 내이며, 예식마다 풀영상 및 하이라이트 영상의 길이는 달라질 수 있기 때문에 영상 길이에 관한 컴플레인 및 보상 요청은 받지 않습니다. 이외에 별도의 피해보상은 결과물에 대한 내용이 전무한 경우에 대해서만 최대 상품가만큼 배상할 수 있습니다.

제10조 【이벤트 규정】
  ● 원본 무료 제공
      영상을 받아보신 이후 카톡으로 간단한 후기(공백 제외 200자 이상)를 작성해주시면 5만 원 상당의 메인캠 본식 영상의 원본이 무료로 제공됩니다. 전체 예식의 메인캠 및 서브캠 원본은 15만 원(혹은 카톡 후기 + 10만 원)에 제공되며, 블로그 또는 웨딩 카페 후기를 작성해주시면 무료로 제공됩니다. 단, 편집된 영상을 받아보신 다음에 작성해주셔야 하며, 편집 영상 제공 시 보내드리는 후기 작성 가이드라인을 따라야합니다.

제11조 【계약의 효력】
본 계약은 “신랑,신부”님이 계약금 이체를 완료하고, 이에 따라 "코스보스 웨딩필름"으로부터 계약확정 통보를 받은 시점부터 효력을 가집니다. "신랑신부님"과 "코스보스 웨딩필름"은 위 내용을 충분히 이해하였으며 서면 상으로 서명을 하지 않더라도 본 계약서의 효력이 발생함을 인정합니다.




`;

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
    // 대화 내역 있으면 이메일 전송
    if (conversationLog.length > 0) {
      sendChatLog();
    }
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
  
  // iOS 키보드 대응 - 챗봇 열면 body 스크롤 막기
  function lockBody() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
  }
  
  function unlockBody() {
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
  
  // 챗봇 열릴 때 body 고정
  const observer = new MutationObserver(() => {
    if (chatbotWindow.classList.contains('open')) {
      lockBody();
    } else {
      unlockBody();
    }
  });
  observer.observe(chatbotWindow, { attributes: true, attributeFilter: ['class'] });
  
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
  
  // Gemini API 호출 (Netlify Function 경유 - API 키 보호)
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
      // Netlify Function 호출 (API 키는 서버에서 처리)
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
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
    
    // 매 대화마다 저장
    sendChatLog();
  }
  
  // Google Sheets로 대화 기록 저장
  const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwPCY-453V9h6fZtApd00TMcv2YzoBHCl-oK8j0It9CiIWnzGbSxBIg_pXxiDvE79Pwdw/exec';
  
  function sendChatLog() {
    // 폼 데이터 없으면 저장 안 함
    if (!customerData || conversationLog.length === 0) return;
    
    const logText = conversationLog.map(m => `[${m.time}] ${m.role}: ${m.text}`).join('\n');
    
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: customerData.name,
        date: customerData.date,
        venue: customerData.venue,
        package: customerData.package,
        contact: customerData.contact,
        chatLog: logText
      })
    }).catch(err => console.log('Chat log send failed:', err));
  }
  
  // 이벤트 리스너
  chatbotSend.addEventListener('click', handleSend);
  
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
      <span style="color:#dc2626;">예식 일자가 겹친다면 계약서를 작성하신 분에게 우선권이 부여됩니다.</span><br>
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
