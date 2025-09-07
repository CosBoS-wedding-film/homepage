document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded 이벤트 발생');

  // 즉시 showSection 함수 정의
  window.showSection = function(sectionId) {
    console.log('섹션 전환 시도:', sectionId);
    
    // 대상 섹션 미리 찾기
    const targetSection = document.getElementById(sectionId);
    // 이미 표시 중이라면 추가 처리 없이 스크롤만 보장하고 종료
    if (targetSection && targetSection.classList.contains('show')) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    
    // 강제 스크롤 최상단 이동 (여러 방법으로 보장)
    document.body.scrollTop = 0; // Safari용
    document.documentElement.scrollTop = 0; // Chrome, Firefox용
    window.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // 모든 섹션 숨기기 (display와 show 클래스 모두 처리)
    document.querySelectorAll('.content-section').forEach(section => {
      // Flicker 방지를 위해 films 섹션의 그리드를 미리 비움
      if (section.id === 'films') {
        const grid = document.getElementById('films-grid');
        if (grid) grid.innerHTML = '';
      }
      section.style.display = 'none';
      section.classList.remove('show');
    });
    
    // 대상 섹션 보이기
    if (targetSection) {
      // display를 먼저 block으로 설정
      targetSection.style.display = 'block';
      
      // 다시 한 번 스크롤 보장
      setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0);
      }, 5);
      
      // 약간의 지연 후 show 클래스 추가 (CSS 애니메이션을 위해)
      requestAnimationFrame(() => {
        targetSection.classList.add('show');
        console.log('섹션 표시 성공:', sectionId);
        
        // 마지막으로 스크롤 보장
        setTimeout(() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          window.scrollTo(0, 0);
        }, 50);
      });
      
      // Films 섹션이면 갤러리 렌더링 (지연 없이 즉시 실행)
      if (sectionId === 'films') {
        currentPage = 1; // 항상 첫 페이지부터 시작
        renderGalleryItems();
        // 갤러리 렌더링 후에도 스크롤 보장
        setTimeout(() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          window.scrollTo(0, 0);
        }, 50);
      }
    } else {
      console.error('섹션을 찾을 수 없음:', sectionId);
    }
    
    // 모바일 메뉴 닫기
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
      mobileNav.classList.remove('active');
    }
    
    // URL 해시 업데이트
    if (window.location.hash !== '#' + sectionId) {
      window.location.hash = sectionId;
    }
  };

  // 비디오 정보 배열 (원본 homepage 전체 목록)
  const videos = [
    {videoId: "UzJ8p8m5M64?si=9Fn6Pk85tyXXt5io", title: "아이티컨벤션수원"},
    {videoId: "j2WsRI5N_kU?si=-sF3OK3fks7ibZXt", title: "더파티움"},
    {videoId: "RdbtJ32zGZ4?si=Ex20hqd6tisZqWHV", title: "오엔리버스테이션"},
    {videoId: "32cQcd3VDDk?si=qDdvl0Hxpa6ruGNE", title: "문학의집서울"},
    {videoId: "37y5O8go_kA?si=iQp5eEyGww8sEraP", title: "서울웨딩타워"},
    {videoId: "9tz5zY8I0uc?si=ZGcwiggL1afVjC6Q", title: "노블발렌티삼성"},
    {videoId: "F2FS99Y__NY?si=BEZJaqc8Z0Nleqz2", title: "국회의사당소통관"},
    {videoId: "gQetB18IjM4?si=u7APclEfER4K-DG7", title: "웨스턴베니비스 신도림"},
    {videoId: "kHBawgSwiTs?si=8CRtclvlIBqQtzBA", title: "운현궁"},
    {videoId: "DBzug7cqiAc?si=Ra65k2wVSVc2pc_M", title: "마벨리에평촌"},
    {videoId: "JoakP9JVMug?si=UMCdaiwSEaNnRiBg", title: "웨딩스퀘어"},
    {videoId: "huEyQnu7yrw?si=mrDEtK3drA4NtPnt", title: "빌라드지디청담"},
    {videoId: "fzVY8NnXiyA?si=M3FA7LA4wG-bwGnJ", title: "규수당문래"},
    {videoId: "xIwOblT1OkA?si=OhApC2TG386CK6qO", title: "아펠가모공덕"},
    {videoId: "vznJ9wjJqYI?si=xyG-H8xeZg_JtZxh", title: "워킹온더클라우드63빌딩"},
    {videoId: "gwcb0621ojk?si=qu9eDIjewCHDOe5A", title: "로프트가든344"},
    {videoId: "gorjlh0ZLBI?si=uHeJx8SoIrhdE--J", title: "제이오스티엘"},
    {videoId: "HX72gexmhrc?si=_rhCb20Fiz-4MwvE", title: "웨딩시티"},
    {videoId: "oD3JL1xdNfE?si=t4e0hX8eejYtg89L", title: "세인트메리엘"},
    {videoId: "Af-9kppRnTY?si=O7UBOBEikMGwib9X", title: "슈슈몽드"},
    {videoId: "STMvVZDO0nc?si=AD0IyHdme9s7BT1f", title: "제이오스티엘"},
    {videoId: "yJpyp4BasOE?si=ERYFnLaYLRtqSzMe", title: "공군호텔"},
    {videoId: "hH2GZWvwF_M?si=ENBMpx95vfBEK_Ag", title: "일떼라쪼"},
    {videoId: "r038FlVxtMU?si=-3_L-ZCNbxrEPug0", title: "올림픽파크텔"},
    {videoId: "FAhmX7Z0N4M?si=wrPt6sc7T-DcGxiq", title: "더파티움"},
    {videoId: "etRgbiFYu3Y?si=RR69dINekgV9sybF", title: "더리버사이드호텔"},
    {videoId: "JaTsX9HIXWA?si=xUe9heD5tz7jEbII", title: "더채플앳논현"},
    {videoId: "s71nrYbB3Qg?si=3TZEiWurGiAceQSZ", title: "JK아트컨벤션"}
  ];

  console.log('비디오 배열:', videos);

  // 페이지네이션 설정
  const itemsPerPage = 12;
  let currentPage = 1;
  const totalPages = Math.ceil(videos.length / itemsPerPage);

  // DOM 요소 확인
  console.log('모든 content-section:', document.querySelectorAll('.content-section'));
  console.log('films 섹션:', document.getElementById('films'));
  console.log('films-grid:', document.getElementById('films-grid'));

  // 갤러리 아이템 생성 함수
  function createGalleryItems(container, items) {
    console.log('갤러리 아이템 생성 시작, 아이템 수:', items.length);
    
    items.forEach(({ filename, videoId, title }, index) => {
      console.log(`아이템 ${index + 1} 생성:`, title);
      
      const wrapper = document.createElement('div');
      wrapper.className = 'gallery-item';

      // videoId에서 ?si= 파라미터 제거
      const cleanVideoId = videoId.split('?')[0];

      // 유튜브 썸네일 이미지
      const img = document.createElement('img');
      img.src = `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;
      img.alt = title;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      wrapper.appendChild(img);

      // 오버레이 제목
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.textContent = title;
      wrapper.appendChild(overlay);

      // 클릭 이벤트 - 비디오 재생
      wrapper.addEventListener('click', () => {
        console.log('클릭됨:', title);
        const url = `video.html?videoId=${encodeURIComponent(videoId)}&title=${encodeURIComponent(title)}`;
        window.open(url, '_blank');
      });

      container.appendChild(wrapper);
      console.log(`아이템 ${index + 1} 추가 완료`);
    });
    
    console.log('모든 갤러리 아이템 생성 완료');
  }

  // 갤러리 렌더링 함수
  function renderGalleryItems() {
    console.log('renderGalleryItems 시작');
    
    // photoGrid 가져오기
    const photoGrid = document.getElementById('films-grid');
    if (!photoGrid) {
      console.error('films-grid를 찾을 수 없습니다');
      return;
    }
    
    console.log('photoGrid 찾음:', photoGrid);
    
    // 기존 아이템 삭제
    photoGrid.innerHTML = '';
    
    // 현재 페이지에 맞는 비디오 목록 가져오기
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, videos.length);
    const currentVideos = videos.slice(startIndex, endIndex);
    
    console.log('현재 페이지 비디오:', currentVideos.length, '개');
    
    // 아이템 생성
    createGalleryItems(photoGrid, currentVideos);
    
    // 렌더 직후 스크롤을 한 번 더 최상단으로
    setTimeout(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.scrollTo(0, 0);
    }, 0);
    
    // 애니메이션 적용
    setTimeout(() => {
      const items = photoGrid.querySelectorAll('.gallery-item');
      console.log('애니메이션 적용할 아이템 수:', items.length);
      
      items.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('visible');
          console.log(`아이템 ${i + 1} 애니메이션 적용`);
        }, i * 100);
      });
    }, 100);
  }

  // 페이지네이션 생성 함수
  function createPagination() {
    if (totalPages <= 1) return;
    
    // 기존 페이지네이션 제거
    const existingPagination = document.querySelector('.pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
    
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      
      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderGalleryItems();
        createPagination();
        // 스크롤을 맨 위로 이동
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      
      paginationContainer.appendChild(pageButton);
    }
    
    const gallerySection = document.querySelector('#films');
    if (gallerySection) {
      gallerySection.appendChild(paginationContainer);
    }
  }

  // 모바일 메뉴 토글
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }

  // 테스트 함수 추가 (브라우저 콘솔에서 사용 가능)
  window.testFilms = function() {
    console.log('Films 테스트 시작');
    window.showSection('films');
  };
  
  window.testShowSection = function(sectionId) {
    console.log('섹션 테스트:', sectionId);
    window.showSection(sectionId);
  };

  // 초기화
  createPagination();
  document.body.classList.add('loaded');

  // 해시 처리 함수
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    console.log('해시 변경 감지:', hash);
    
    // 강제 스크롤 최상단 이동 (여러 방법으로 보장)
    document.body.scrollTop = 0; // Safari용
    document.documentElement.scrollTop = 0; // Chrome, Firefox용
    window.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    if (hash && hash !== '') {
      window.showSection(hash);
    } else {
      window.showSection('home');
    }
  }

  // 초기 해시 처리
  handleHashChange();
  
  // 해시 변경 이벤트 리스너
  window.addEventListener('hashchange', handleHashChange);

  // 페이지 로드 완료 후 해시로 인한 기본 스크롤 동작을 무력화하기 위해 한 번 더 스크롤을 최상단으로 이동
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.scrollTo(0, 0);
    }, 20);
  });

  // 네비게이션 이벤트 처리
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault();
      const sectionId = e.target.getAttribute('href').substring(1);
      console.log('네비게이션 클릭:', sectionId);
      window.showSection(sectionId);
    }
  });
});

// 전역 함수들
function navigateToHomePage() {
  if (window.showSection) {
    window.showSection('home');
  } else {
    window.location.href = 'index.html';
  }
}
