# 메타 픽셀 구현 문서

## 개요
- 페이스북 Meta Pixel 코드가 사이트 전체에 구현되어 사용자 행동을 추적합니다.
- 기본 PageView 이벤트 외에 ViewContent 이벤트를 다양한 사용자 액션에 설정했습니다.

## 파일별 구현 내역

### 1. index.html

#### 기본 Meta Pixel 코드 (head 섹션)
- 라인 6-20: 기본 Meta Pixel 초기화 스크립트 (ID: 1183820826758072)
- 페이지 로드 시 자동으로 'PageView' 이벤트 추적

#### 네비게이션 메뉴
- 라인 93-101: 각 섹션 링크 클릭 시 'ViewContent' 이벤트 추적
  - ABOUT, PRODUCT, EVENT, RESERVATION, REVIEWS, +SNAP, 돌잔치 섹션 모두 포함

#### 로고 클릭
- 라인 90: 로고 클릭 시 'ViewContent' 이벤트 추적

#### 돌잔치 섹션
- 라인 61-65: 돌잔치 갤러리 아이템 클릭 시 'ViewContent' 이벤트 추적

#### RESERVATION 섹션
- 라인 170-172: 카카오톡 상담 버튼 클릭 시 'ViewContent' 이벤트 추적
- 라인 178-180: 계약서 작성 버튼 클릭 시 'ViewContent' 이벤트 추적

#### REVIEWS 섹션
- 라인 192-194: 숨고 리뷰 링크 클릭 시 'ViewContent' 이벤트 추적
- 라인 198-200: 블로그/카페 후기 링크 클릭 시 'ViewContent' 이벤트 추적

#### 푸터 소셜 아이콘
- 라인 217-221: 모든 소셜 미디어 아이콘에 이벤트 추적
  - 인스타그램, 유튜브, 링크트리, 숨고, 카카오톡: 'ViewContent' 이벤트

#### +SNAP 섹션
- 새로 추가된 스냅 & 원판 서비스 정보 섹션
- 메뉴 클릭 시 'ViewContent' 이벤트 추적
- 스냅 앨범 및 원판 앨범 샘플 영상 클릭 시 'ViewContent' 이벤트 추적
- 샘플 사진 클릭 시 모달 확대 및 'ViewContent' 이벤트 추적

### 2. scripts.js

#### 메인 갤러리 영상 클릭
- 라인 177-181: 모든 갤러리 영상 클릭 시 'ViewContent' 이벤트 추적

#### 페이지네이션
- 라인 78-82: 페이지네이션 버튼 클릭 시 'ViewContent' 이벤트 추적

#### 돌잔치 섹션 갤러리 아이템
- 라인 258-262: 돌잔치 섹션의 갤러리 아이템 클릭 시 'ViewContent' 이벤트 추적

#### 네비게이션 메뉴
- 라인 57-62: 각 메뉴 클릭 시 'ViewContent' 이벤트 추적
  - ABOUT, PRODUCT, EVENT, RESERVATION, REVIEWS, +SNAP, 돌잔치 섹션 모두 포함

### 3. video.html

#### 기본 Meta Pixel 코드 (head 섹션)
- 라인 7-21: 기본 Meta Pixel 초기화 스크립트 (ID: 1183820826758072)
- 페이지 로드 시 자동으로 'PageView' 이벤트 추적

#### 비디오 로드 시
- 라인 100-103: 비디오 로드 시 상세 정보가 포함된 'ViewContent' 이벤트 추적
  - 컨텐츠 이름, ID 포함

#### 네비게이션 메뉴
- 라인 57-62: 각 메뉴 클릭 시 'ViewContent' 이벤트 추적
  - ABOUT, PRODUCT, EVENT, RESERVATION, REVIEWS, +SNAP, 돌잔치 섹션 모두 포함

#### 푸터 소셜 아이콘
- 라인 83-87: 모든 소셜 미디어 아이콘에 이벤트 추적
  - 인스타그램, 유튜브, 링크트리, 숨고, 카카오톡: 'ViewContent' 이벤트

### 4. styles.css
- Meta Pixel 관련 직접적인 코드 없음
- 모든 이벤트 추적은 HTML 및 JavaScript 파일에서 처리됨

## 이벤트 유형 요약

### ViewContent 이벤트
- 모든 섹션 탐색
- 모든 갤러리 이미지 클릭
- 영상 시청
- 소셜 미디어 링크 클릭
- 후기 페이지 방문
- 카카오톡 상담 버튼 클릭
- 계약서 작성 버튼 클릭

------------

# 구글 태그 매니저(GTM) 구현 문서

## 개요
- 사이트 전체에 Google Tag Manager 컨테이너(GTM-KTZXF9S6)를 추가해 Meta Pixel 외의 추가 스크립트를 중앙집중식으로 관리할 수 있도록 함.
- 모든 페이지에 `<head>` 스크립트와 `<body>` 시작 직후 `noscript` iframe 을 삽입.
- 삽입 위치는 Meta Pixel 코드 바로 아래로 통일해 로딩 순서를 보장.

## 파일별 구현 내역

### 1. index.html
- `<head>`: GTM 초기화 스크립트 추가 (라인 번호 약 22~29)
- `<body>`: GTM noscript iframe 추가 (라인 번호 약 60~62)

### 2. video.html
- `<head>`: GTM 초기화 스크립트 추가 (라인 번호 약 24~31)
- `<body>`: GTM noscript iframe 추가 (라인 번호 약 47~49)

## 주의 사항 & 향후 작업
- 새로운 태그(GA4, 전환 추적 등)는 GTM 인터페이스에서 설정 가능.
- GTM 배포(Submit) 후 변경 사항을 반드시 'Publish' 해야 실서버 반영.
- Meta Pixel과 중복되는 이벤트 설정 시 이중 전송 여부 확인 필요.

------------

# Meta Pixel 이벤트 구조 개선 (2024-05-29)

## 변경 개요
- 기존: 모든 클릭 이벤트를 ViewContent 로 통합
- 변경 후: 3단계 이벤트 체계
  1) ViewContent  : 메뉴, 갤러리 썸네일, 페이지네이션 등 모든 일반 클릭
  2) Lead          : "카톡 상담" 버튼 클릭 (id nav-btn 1)
  3) Purchase      : "계약서 작성" 버튼 클릭 (id nav-btn 2)

## 구현 위치

| 파일 | 위치 | 이벤트 |
|------|------|---------|
| index.html | nav > 카톡 상담 버튼 `onclick="fbq('track', 'Lead')"` | Lead |
| index.html | nav > 계약서 작성 버튼 `onclick="fbq('track', 'Purchase')"` | Purchase |
| index.html | 그 외 모든 `onclick` 호출 | ViewContent |
| video.html | nav > 동일 두 버튼 | Lead / Purchase |
| scripts.js | 동영상 썸네일·페이지네이션 등 동적 요소 | ViewContent |

## QA 체크리스트
- [x] 카톡 상담 클릭 시 Pixel Debugger 에 'Lead' 확인
- [x] 계약서 작성 클릭 시 'Purchase' 확인
- [x] 기타 메뉴 및 썸네일 클릭 시 'ViewContent' 전달
- [x] ID 1183820826758072 로 전송 확인

## 추가 참고
- 캠페인 전환목표: Lead (리드 수집) / Purchase (계약 완료) 별도 운영 가능
- **Conversions API** 도입 시 동일 이벤트 네임 사용해 서버사이드 전송 권장