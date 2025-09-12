# version2 homepage is made on 250720




Type        키워드	사용 시점
feat	    새로운 기능 추가
fix	        버그 수정
docs	    문서 수정
style	    코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등). 기능 수정이 없는 경우
design	    사용자 UI 디자인 변경 (CSS 등)
test	    테스트 코드, 리팩토링 테스트 코드 추가
refactor	코드 리팩토링
build	    빌드 파일 수정
ci	        CI 설정 파일 수정
perf	    성능 개선
chore	    빌드 업무 수정, 패키지 매니저 수정 (gitignore 수정 등)
rename	    파일 혹은 폴더명을 수정만 한 경우
remove	    파일을 삭제만 한 경우




github log

250720
feat: homepage version 2

Imitating 'LIGHT OF FILM'


250720 - 2
feat: modifying several things 


250720 - 3
feat: finish to make new homepage with 13h (250720_0330 to 250720_1640)

#TODO: 데스크톱에서는 글꼴 아주 마음에 들게 잘 됐는데, 모바일에서 Cormorant가 안 먹는 건 그냥 일반적인 글꼴로 보이는 게 좀 아쉽다. 나중에 해결해보자.

250721
feat: change the mobile font for matching with desktop (just trying. I don't know if it works well) / contact page's name variable adding (there is name section, but it is not deliveried to gmailjs)

250721-2
feat: change the mobile font / contact modifying
- change the mobile font for product, contact, reservation as well (before, only home font is changed)
- contact 
    - year cannot be 6 number, only 4 number.
    - name variable adding (previous version is not working)
    - phone number start with 010 (user can remove)

250721-3
docs: from '그 무수한 우연 속의 너와 나' to '그 무수한 우연 속 너와 나'

250721-4
feat: kakaotalk icon is inserted between insta and youtube

250721-5
feat: modifying kakaotalk address (previous version was wrong)

250725
docs: add 'package' for contact menu

250726
feat: change the contact color and product choice part

250726 - 2
feat: change the variable from standard to standard (1인 3캠)

250730
feat: add context for contract menu & owner option 200,000 won

250730 - 2
feat: mention highlight in contract page

250730 - 3
docs: reduced the contact menu's empty space 

250730 - 4
feat: remove folder of 'thumbnail_only_16to9' because I directly use the youtube thumnail. But, the outer design is perfectly the same with before one.

250730 - 5
docs: reduced the contract hook text.

250731
docs: from 3CAM to 4CAM / contact menu's promotion context is added

250731 - 2
docs: contact form 3CAM, 4CAM to 4CAM, 5CAM

250801
docs: change the text from 'gaseongbee' to '50year' for contract menu

250803
docs: 짝궁할인도 중복 가능하다는 것 뺐다. 악용하는 사람(250927_김도연)이 있어서. 50% 할인으로 판매할 때는 짝궁할인 고객은 40% 할인 가격으로 받도록 한다. 그럼 6만원 할인 및 페이백 해도 4만원 이득.

250805
docs: change the variable name for gmailJS (fix the error of 3can to 4cam, 4cam to 5cam)

250808
fix: rename package option from 'standard' to 'classic' and update corresponding JavaScript variables
- Changed HTML option value from 'standard' to 'classic' in contact form
- Updated JavaScript logic to use 'classic' instead of 'standard' for package text generation
- Maintained correct pricing: Classic (1인 4캠) 495,000원, Premium (2인 5캠) 770,000원

250814
feat: remove 50% discount

250903
docs: adding 2days discount & change the price & remove the additional tax

250903-2
docs: false finishing reservation added (2509, 2604, 2607, 2608, 2610, 2612)

250908
add: 아이티컨벤션수원
feat: remove the thumbnail file name because I don't use this file but directly use the youtube image

250908-2
docs: event set 0913 0914

250912
docs: 스틸컷 한 장 추가