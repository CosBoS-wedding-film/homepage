document.addEventListener('DOMContentLoaded', () => {
  // 1) 비디오 정보 배열: filename, videoId, title
  const videos = [
    // videoId는 'https://youtu.be/' 다음 부분입니다
    { filename: "edit_name_crop_W250309C_1240_여의_한혜지_더파티움.jpg",         videoId: "j2WsRI5N_kU?si=-sF3OK3fks7ibZXt", title: "더파티움" },
    { filename: "edit_name_crop_W240921B_1800_한강_임성호_오엔레스토랑.jpg",     videoId: "RdbtJ32zGZ4?si=Ex20hqd6tisZqWHV",  title: "오엔리버스테이션" },
    { filename: "edit_name_crop_W241006B_1200_명동_지정훈_문학의집서울.jpg",     videoId: "32cQcd3VDDk?si=qDdvl0Hxpa6ruGNE", title: "문학의집서울" },
    { filename: "edit_name_crop_W241208C_1100_송파_권예솔_서울웨딩타워.jpg",     videoId: "37y5O8go_kA?si=iQp5eEyGww8sEraP", title: "서울웨딩타워" },
    { filename: "edit_name_crop_W241013B_1300_강남_강호연_노블발렌티삼성.jpg",    videoId: "9tz5zY8I0uc?si=ZGcwiggL1afVjC6Q", title: "노블발렌티삼성" },
    { filename: "edit_name_crop_W240922C_1100_국회_성진경_국회의사당소통관.jpg", videoId: "F2FS99Y__NY?si=BEZJaqc8Z0Nleqz2",  title: "국회의사당소통관" },
    { filename: "edit_name_crop_W241012B_1810_신도림_박성미_웨스턴베니비스.jpg", videoId: "gQetB18IjM4?si=u7APclEfER4K-DG7", title: "웨스턴베니비스 신도림" },
    { filename: "edit_name_crop_W240928b_1100_종로_임관우_운현궁종로.jpg",       videoId: "kHBawgSwiTs?si=8CRtclvlIBqQtzBA", title: "운현궁" },
    { filename: "edit_name_crop_W241123C_1130_금천_신소영_마벨리에시흥.jpg",     videoId: "DBzug7cqiAc?si=Ra65k2wVSVc2pc_M", title: "마벨리에평촌" },
    { filename: "edit_name_crop_W241117B_1120_강변_박지선_테크노마트.jpg",       videoId: "JoakP9JVMug?si=UMCdaiwSEaNnRiBg", title: "웨딩스퀘어" },
    { filename: "edit_name_crop_W240921B_1130_청담_곽지근_빌라드지디청담.jpg",   videoId: "huEyQnu7yrw?si=mrDEtK3drA4NtPnt",  title: "빌라드지디청담" },
    { filename: "edit_name_crop_W241116C_1640_문래_김희윤_규수당문래.jpg",       videoId: "fzVY8NnXiyA?si=M3FA7LA4wG-bwGnJ", title: "규수당문래" },
    { filename: "edit_name_crop_W241110B_1430_공덕_이예림_아펠가모공덕.jpg",       videoId: "xIwOblT1OkA?si=OhApC2TG386CK6qO", title: "아펠가모공덕" },
    { filename: "edit_name_crop_W241103B_1200_노량_조주연_63빌딩워킹온더클라우드.jpg", videoId: "vznJ9wjJqYI?si=xyG-H8xeZg_JtZxh", title: "워킹온더클라우드63빌딩" },
    { filename: "edit_name_crop_W241207B_1730_오목_김효은_로프트가든.jpg",       videoId: "gwcb0621ojk?si=qu9eDIjewCHDOe5A", title: "로프트가든344" },
    { filename: "edit_name_crop_W241020a_1200_구로_지연_제이오스티엘.jpg",        videoId: "gorjlh0ZLBI?si=uHeJx8SoIrhdE--J", title: "제이오스티엘" },
    { filename: "edit_name_crop_W250308B_1620_신도_김수진_웨딩시티.jpg",        videoId: "HX72gexmhrc?si=_rhCb20Fiz-4MwvE", title: "웨딩시티" },
    { filename: "edit_name_crop_W241020B_1230_강남_박나연_세인트메리엘논현.jpg", videoId: "oD3JL1xdNfE?si=t4e0hX8eejYtg89L", title: "세인트메리엘" },
    { filename: "edit_name_crop_W241012b_1200_강남_노세련_슈슈몽드.jpg",         videoId: "Af-9kppRnTY?si=O7UBOBEikMGwib9X", title: "슈슈몽드" },
    { filename: "edit_name_crop_W241012B_1200_구로_이지수_제이오스티엘.jpg",     videoId: "STMvVZDO0nc?si=AD0IyHdme9s7BT1f", title: "제이오스티엘" },
    { filename: "edit_name_crop_W241006B_1400_영등_윤여일_공군회관.jpg",        videoId: "yJpyp4BasOE?si=ERYFnLaYLRtqSzMe", title: "공군호텔" },
    { filename: "edit_name_crop_W241005B_1200_영등_이현구_일떼라쪼당산.jpg",     videoId: "hH2GZWvwF_M?si=ENBMpx95vfBEK_Ag", title: "일떼라쪼" },
    { filename: "edit_name_crop_W240928B_1200_올공_곽문화_올림픽파크텔잠실.jpg", videoId: "r038FlVxtMU?si=-3_L-ZCNbxrEPug0",  title: "올림픽파크텔" },
    { filename: "edit_name_crop_W240908B_1120_여의_김진희_더파티움.jpg",         videoId: "FAhmX7Z0N4M?si=wrPt6sc7T-DcGxiq",  title: "더파티움" },
    { filename: "edit_name_crop_W240907B_1100_서초_민세미_더리버사이드호텔.jpg", videoId: "etRgbiFYu3Y?si=RR69dINekgV9sybF",  title: "더리버사이드호텔" },
    { filename: "edit_name_crop_W240907A_1900_논현_조안나_더채플앳논현.jpg",     videoId: "JaTsX9HIXWA?si=xUe9heD5tz7jEbII",  title: "더채플앳논현" },
    { filename: "edit_name_crop_W240602C_1200_영등_김동일_JK아트컨벤션.jpg",     videoId: "s71nrYbB3Qg?si=3TZEiWurGiAceQSZ",  title: "JK아트컨벤션" }
  ];

  // 돌잔치 전용 비디오 정보
  const dolVideoInfo = {
    filename: "edit_name_crop_W240810E_1500_서초_이지인_w페스타.jpg",
    videoId: "_LtYqUqYQK0?si=Xbjy8z3PldtZwJq0",
    title: "더블유페스타"
  };

  // DOMContentLoaded 이벤트에서 forceInit 플래그 확인
  const forceInit = localStorage.getItem('forceInit');
  if (forceInit === 'true') {
    // 저장된 activeSection이 돌잔치인지 확인
    const activeSection = localStorage.getItem('activeSection');
    if (activeSection === '돌잔치' || activeSection === '+SNAP') {
      // 페이지 로드 후 약간 지연시켜 돌잔치 섹션 재설정
      setTimeout(() => {
        if (activeSection === '돌잔치') {
          const dolSection = document.querySelector('#돌잔치');
          if (dolSection) {
            setupDoljanchiContent(dolSection);
          }
        }
      }, 100);
    }
    localStorage.removeItem('forceInit');
  }

  // 모든 섹션 초기화
  initializeSections();

  // 페이지네이션 설정
  const itemsPerPage = 12;
  let currentPage = 1;
  const totalPages = Math.ceil(videos.length / itemsPerPage);

  // 2) photoGrid 가져오기
  const photoGrid = document.querySelector('#gallery .photo-grid');
  
  // 페이지네이션 버튼 생성 함수
  function createPagination() {
    // 기존 페이지네이션 버튼 삭제
    const existingPagination = document.querySelector('.pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
    
    // 새 페이지네이션 컨테이너 생성
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    
    // 페이지 버튼 생성
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      
      pageButton.addEventListener('click', () => {
        currentPage = i;
        fbq('track', 'ViewContent');
        renderGalleryItems();
        createPagination();
      });
      
      paginationContainer.appendChild(pageButton);
    }
    
    // 페이지네이션 추가
    const gallerySection = document.querySelector('#gallery');
    gallerySection.appendChild(paginationContainer);
  }
  
  // 갤러리 아이템 렌더링 함수
  function renderGalleryItems() {
    // 기존 아이템 삭제
    photoGrid.innerHTML = '';
    
    // 현재 페이지에 맞는 비디오 목록 가져오기
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, videos.length);
    const currentVideos = videos.slice(startIndex, endIndex);
    
    // 아이템 생성
    createGalleryItems(photoGrid, currentVideos);
    
    // 애니메이션 적용
    animateGalleryItemsIn('#gallery');
  }
  
  // 초기 갤러리 렌더링
  renderGalleryItems();
  createPagination();
  
  // 모든 섹션 초기 설정 함수
  function initializeSections() {
    // 돌잔치 섹션 설정
    setupDoljanchiSection();
  }
  
  // 돌잔치 섹션 이미지 설정 함수
  function setupDoljanchiSection() {
    const dolSection = document.querySelector('#돌잔치');
    if (!dolSection) return;
    
    setupDoljanchiContent(dolSection);
  }
  
  // 돌잔치 콘텐츠 설정 헬퍼 함수
  function setupDoljanchiContent(section) {
    // 포토그리드 요소 확인
    let dolPhotoGrid = section.querySelector('.photo-grid');
    if (!dolPhotoGrid) {
      dolPhotoGrid = document.createElement('div');
      dolPhotoGrid.className = 'photo-grid';
      section.appendChild(dolPhotoGrid);
    } else {
      // 기존 내용 비우기
      dolPhotoGrid.innerHTML = '';
    }
    
    // 돌잔치 아이템 생성 (배열로 처리하여 메인 갤러리와 동일한 로직 사용)
    createGalleryItems(dolPhotoGrid, [dolVideoInfo]);
  }
  
  // 갤러리 아이템 생성 공통 함수
  function createGalleryItems(container, items) {
    items.forEach(({ filename, videoId, title }) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'gallery-item';
  
      // (a) 썸네일
      const img = document.createElement('img');
      img.src = `./thumbnail_only_16to9/${filename}`;
      img.alt = title;
      wrapper.appendChild(img);
  
      // (b) 오버레이 제목
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.textContent = title;
      wrapper.appendChild(overlay);
  
      // (c) 클릭 시 video.html 에 ID와 제목 넘겨서 열기
      wrapper.addEventListener('click', () => {
        fbq('track', 'ViewContent');
        const url = `video.html?videoId=${encodeURIComponent(videoId)}&title=${encodeURIComponent(title)}`;
        window.open(url, '_blank');
      });
  
      container.appendChild(wrapper);
    });
  }

  // SNAP 섹션의 갤러리 아이템에 클릭 이벤트 추가
  const snapSection = document.getElementById('+SNAP');
  if (snapSection) {
    const galleryItems = snapSection.querySelectorAll('.gallery-item');
    if (galleryItems.length >= 2) {
      // 스냅 앨범 샘플 비디오 (첫 번째 gallery-item)
      galleryItems[0].addEventListener('click', () => {
        const videoId = "jbw3xXqPROI?si=ujZRc5b7CJSS2Cqz";
        const title = "스냅 앨범 샘플";
        fbq('track', 'ViewContent');
        const url = `video.html?videoId=${encodeURIComponent(videoId)}&title=${encodeURIComponent(title)}`;
        window.open(url, '_blank');
      });
      
      // 원판 앨범 샘플 비디오 (두 번째 gallery-item)
      galleryItems[1].addEventListener('click', () => {
        const videoId = "kRNCfCSpcbc?si=N6Dp3MBR8vKY9uCO";
        const title = "원판 앨범 샘플";
        fbq('track', 'ViewContent');
        const url = `video.html?videoId=${encodeURIComponent(videoId)}&title=${encodeURIComponent(title)}`;
        window.open(url, '_blank');
      });
      
      // 애니메이션 적용
      galleryItems.forEach(item => {
        setTimeout(() => {
          item.style.opacity = 1;
          item.classList.add('show');
        }, 100);
      });
    }
  }

}); // DOMContentLoaded 이벤트 종료

// ---------------------------
// 전역 함수 정의
// ---------------------------
// 특정 섹션의 갤러리 아이템에 애니메이션 적용
function animateGalleryItemsIn(sectionSelector) {
  const items = document.querySelector(sectionSelector).querySelectorAll('.gallery-item');
  items.forEach((item, i) => {
    item.style.opacity = 0;
    item.classList.remove('show');
    setTimeout(() => {
      item.style.opacity = 1;
      item.classList.add('show');
    }, i * 70); // 애니메이션 속도 조정 (더 느리게)
  });
}

// 모든 갤러리 아이템에 애니메이션 적용
function animateGalleryItems() {
  // 모든 갤러리 아이템에 애니메이션 적용 (기존 show 클래스 유무 관계없이)
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.style.opacity = 0;
    item.classList.remove('show');
    setTimeout(() => {
      item.style.opacity = 1;
      item.classList.add('show');
    }, i * 70); // 애니메이션 속도 조정 (더 느리게)
  });
}

function showSection(sectionId) {
  // 모든 섹션 즉시 숨기기
  document.querySelectorAll('.content-section').forEach(sec => {
    if (sec.id !== sectionId) {
      sec.style.display = 'none';
      sec.classList.remove('show');
    }
  });
  
  // 선택한 섹션 표시
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    // 돌잔치 섹션일 경우, 항상 내용을 확인하고 필요시 재설정
    if (sectionId === '돌잔치') {
      const dolItem = targetSection.querySelector('.gallery-item');
      // 아이템이 없으면 돌잔치 섹션 다시 설정
      if (!dolItem) {
        const dolVideoInfo = {
          filename: "edit_name_crop_W240810E_1500_서초_이지인_w페스타.jpg",
          videoId: "_LtYqUqYQK0?si=Xbjy8z3PldtZwJq0",
          title: "더블유페스타"
        };
        
        // 돌잔치 콘텐츠 다시 생성
        let photoGrid = targetSection.querySelector('.photo-grid');
        if (!photoGrid) {
          photoGrid = document.createElement('div');
          photoGrid.className = 'photo-grid';
          targetSection.appendChild(photoGrid);
        } else {
          photoGrid.innerHTML = '';
        }
        
        // 아이템 생성
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-item';
    
        // (a) 썸네일
        const img = document.createElement('img');
        img.src = `./thumbnail_only_16to9/${dolVideoInfo.filename}`;
        img.alt = dolVideoInfo.title;
        wrapper.appendChild(img);
    
        // (b) 오버레이 제목
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.textContent = dolVideoInfo.title;
        wrapper.appendChild(overlay);
    
        // (c) 클릭 시 video.html 에 ID와 제목 넘겨서 열기
        wrapper.addEventListener('click', () => {
          fbq('track', 'ViewContent');
          const url = `video.html?videoId=${encodeURIComponent(dolVideoInfo.videoId)}&title=${encodeURIComponent(dolVideoInfo.title)}`;
          window.open(url, '_blank');
        });
    
        photoGrid.appendChild(wrapper);
      }
    }
    
    targetSection.style.display = 'block';
    // 애니메이션을 즉시 적용하여 지연 없이 표시
    targetSection.classList.add('show');
  }
  
  // 갤러리 또는 돌잔치 섹션 모두에 애니메이션 적용
  if (sectionId === 'gallery' || sectionId === '돌잔치') {
    // 해당 섹션에만 애니메이션 적용
    animateGalleryItemsIn('#' + sectionId);
  }
  
  // 페이지 상단으로 스크롤
  window.scrollTo(0, 0);
}

function navigateToHomePage() {
  showSection('gallery');
  window.scrollTo(0, 0);
}

// 사진 클릭 시 모달로 확대해서 보여주는 함수
function openModal(element) {
  const imgSrc = element.querySelector('img').src;
  const imgAlt = element.querySelector('img').alt;
  
  // 기존 모달 요소 가져오기
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const captionText = document.getElementById('caption');
  
  // 모달 설정
  modal.style.display = 'block';
  modalImg.src = imgSrc;
  captionText.innerHTML = imgAlt;
  
  // 이벤트 추적
  fbq('track', 'ViewContent');
  
  // 모달 닫기 버튼 이벤트
  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }
  
  // 모달 바깥 클릭 시 닫기
  modal.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }
}