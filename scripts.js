document.addEventListener('DOMContentLoaded', () => {
  // 1) 비디오 정보 배열: filename, videoId, title
  const videos = [
    // videoId is after part of 'https://youtu.be/'
    { filename: "edit_name_crop_W240602C_1200_영등_김동일_JK아트컨벤션.jpg",     videoId: "s71nrYbB3Qg?si=3TZEiWurGiAceQSZ",  title: "JK art convention (JK아트컨벤션)" },
    { filename: "edit_name_crop_W240810E_1500_서초_이지인_w페스타.jpg",          videoId: "_LtYqUqYQK0?si=Xbjy8z3PldtZwJq0",  title: "W festa (더블유페스타)" },
    { filename: "edit_name_crop_W240907A_1900_논현_조안나_더채플앳논현.jpg",     videoId: "JaTsX9HIXWA?si=xUe9heD5tz7jEbII",  title: "The Chapel At Nonhyeon (더채플앳논현)" },
    { filename: "edit_name_crop_W240907B_1100_서초_민세미_더리버사이드호텔.jpg", videoId: "etRgbiFYu3Y?si=RR69dINekgV9sybF",  title: "The Riverside Hotel (더리버사이드호텔)" },
    { filename: "edit_name_crop_W240908B_1120_여의_김진희_더파티움.jpg",         videoId: "FAhmX7Z0N4M?si=wrPt6sc7T-DcGxiq",  title: "The Partyum (더파티움)" },
    { filename: "edit_name_crop_W240921B_1130_청담_곽지근_빌라드지디청담.jpg",   videoId: "huEyQnu7yrw?si=mrDEtK3drA4NtPnt",  title: "Villa de GD Cheongdam (빌라드지디청담)" },
    { filename: "edit_name_crop_W240921B_1800_한강_임성호_오엔레스토랑.jpg",     videoId: "RdbtJ32zGZ4?si=Ex20hqd6tisZqWHV",  title: "ON River Station (오엔리버스테이션)" },
    { filename: "edit_name_crop_W240922C_1100_국회_성진경_국회의사당소통관.jpg", videoId: "F2FS99Y__NY?si=BEZJaqc8Z0Nleqz2",  title: "National Assembly Communication Building (국회의사당소통관)" },
    { filename: "edit_name_crop_W240928B_1200_올공_곽문화_올림픽픽스텔잠실.jpg", videoId: "r038FlVxtMU?si=-3_L-ZCNbxrEPug0",  title: "Olympic Parktel (올림픽파크텔)" },
    { filename: "edit_name_crop_W240928b_1100_종로_임관우_운현궁종로.jpg",       videoId: "kHBawgSwiTs?si=8CRtclvlIBqQtzBA", title: "Unhyeongung (운현궁)" },
    { filename: "edit_name_crop_W241005B_1200_영등_이현구_일떼라쪼당산.jpg",     videoId: "hH2GZWvwF_M?si=ENBMpx95vfBEK_Ag", title: "Il Terrazzo (일떼라쪼)" },
    { filename: "edit_name_crop_W241006B_1200_명동_지정훈_문학의집서울.jpg",     videoId: "32cQcd3VDDk?si=qDdvl0Hxpa6ruGNE", title: "Literature House Seoul (문학의집서울)" },
    { filename: "edit_name_crop_W241006B_1400_영등_윤여일_공군회관.jpg",        videoId: "yJpyp4BasOE?si=ERYFnLaYLRtqSzMe", title: "Air Force Hotel (공군호텔)" },
    { filename: "edit_name_crop_W241012B_1200_구로_이지수_제이오스티엘.jpg",     videoId: "STMvVZDO0nc?si=AD0IyHdme9s7BT1f", title: "J-Ostier (제이오스티엘)" },
    { filename: "edit_name_crop_W241012B_1810_신도림_박성미_웨스턴베니비스.jpg", videoId: "gQetB18IjM4?si=u7APclEfER4K-DG7", title: "Western Bennevis Sindorim (웨스턴베니비스 신도림)" },
    { filename: "edit_name_crop_W241012b_1200_강남_노세련_슈슈몽드.jpg",         videoId: "Af-9kppRnTY?si=O7UBOBEikMGwib9X", title: "Chouchou Monde (슈슈몽드)" },
    { filename: "edit_name_crop_W241013B_1300_강남_강호연_노블발렌티삼성.jpg",    videoId: "9tz5zY8I0uc?si=ZGcwiggL1afVjC6Q", title: "Noble Valenti Samsung (노블발렌티삼성)" },
    { filename: "edit_name_crop_W241020B_1230_강남_박나연_세인트메리엘논현.jpg", videoId: "oD3JL1xdNfE?si=t4e0hX8eejYtg89L", title: "Saint Meriel (세인트메리엘)" },
    { filename: "edit_name_crop_W241020a_1200_구로_지연_제이오스티엘.jpg",        videoId: "gorjlh0ZLBI?si=uHeJx8SoIrhdE--J", title: "J-Ostiel (제이오스티엘)" },
    { filename: "edit_name_crop_W241103B_1200_노량_조주연_63빌딩워킹온더클라우드.jpg", videoId: "vznJ9wjJqYI?si=xyG-H8xeZg_JtZxh", title: "Walking On The Cloud 63 Building (워킹온더클라우드63빌딩)" },
    { filename: "edit_name_crop_W241110B_1430_공덕_이예림_아펠가모공덕.jpg",       videoId: "xIwOblT1OkA?si=OhApC2TG386CK6qO", title: "Apelgamo Gongdeok (아펠가모공덕)" },
    { filename: "edit_name_crop_W241116C_1640_문래_김희윤_규수당문래.jpg",       videoId: "fzVY8NnXiyA?si=M3FA7LA4wG-bwGnJ", title: "Kyusoodang Mullae (규수당문래)" },
    { filename: "edit_name_crop_W241117B_1120_강변_박지선_테크노마트.jpg",       videoId: "JoakP9JVMug?si=UMCdaiwSEaNnRiBg", title: "Wedding Square (웨딩스퀘어)" },
    { filename: "edit_name_crop_W241123C_1130_금천_신소영_마벨리에시흥.jpg",     videoId: "DBzug7cqiAc?si=Ra65k2wVSVc2pc_M", title: "Marvelier Pyeongchon (마벨리에평촌)" },
    { filename: "edit_name_crop_W241207B_1730_오목_김효은_로프트가든.jpg",       videoId: "gwcb0621ojk?si=qu9eDIjewCHDOe5A", title: "Loftgarden 344 (로프트가든344)" },
    { filename: "edit_name_crop_W241208C_1100_송파_권예솔_서울웨딩타워.jpg",     videoId: "37y5O8go_kA?si=iQp5eEyGww8sEraP", title: "Seoul Wedding Tower (서울웨딩타워)" },
    { filename: "edit_name_crop_W250308B_1620_신도_김수진_웨딩시티.jpg",        videoId: "HX72gexmhrc?si=_rhCb20Fiz-4MwvE", title: "Wedding City (웨딩시티)" },
    { filename: "edit_name_crop_W250309C_1240_여의_한현_더파티움.jpg",         videoId: "j2WsRI5N_kU?si=-sF3OK3fks7ibZXt", title: "The Partyum (더파티움)" }
  ];

  // 2) photoGrid 가져오기 (이건 삭제하지 말고 그대로 두세요)
  const photoGrid = document.querySelector('.photo-grid');

  // 3) videos 배열로 반복: filename, videoId, title 사용
  videos.forEach(({ filename, videoId, title }, idx) => {
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
      const url = `video.html?videoId=${encodeURIComponent(videoId)}&title=${encodeURIComponent(title)}`;
      window.open(url, '_blank');
    });

    photoGrid.appendChild(wrapper);
  });

  // 4) (기존) 애니메이션 함수 다시 실행
  animateGalleryItems();
}); // ← DOMContentLoaded 끝

// ---------------------------
// 전역 함수 정의
// ---------------------------
function animateGalleryItems() {
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.style.opacity = 0;
    item.classList.remove('show');
    setTimeout(() => {
      item.style.opacity = 1;
      item.classList.add('show');
    }, i * 100);
  });
}

function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(sec => {
    if (sec.id === sectionId) {
      sec.style.display = 'block';
      setTimeout(() => sec.classList.add('show'), 0);
    } else {
      sec.classList.remove('show');
      setTimeout(() => sec.style.display = 'none', 100);
    }
  });
  if (sectionId === 'gallery') animateGalleryItems();
}

function navigateToHomePage() {
  showSection('gallery');
}
