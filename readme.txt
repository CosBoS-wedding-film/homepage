github

250514

feat: remove 'PRICE' VAT, add '+SNAP' section, fix all Meta Pixel events to 'ViewContent', Fix video web page
- remove 'PRICE' VAT
- add '+SNAP' section
    - Created '+SNAP' section for snap & group album services
    - Implemented 1x3 layout for sample photos and 1x2 for videos
- fix all Meta Pixel events to 'ViewContent'
    - Standardized all Meta Pixel events to 'ViewContent' (removed all 'Purchase')
    - Added tracking code to all clickable elements including pagination
- Fix video web page
    - Before this commit, there are no texts above 5 icon.
    - I added the texts for making the same with the other pages.

250529

feat: integrate Google Tag Manager (GTM-KTZXF9S6) & change snap price to 550,000

- Added GTM script to <head> and noscript iframe to <body> in index.html, video.html
- Changed snap price display: 770,000 → 550,000
- Placement follows Meta Pixel code for proper load order
- No other files modified

250529-2

feat: refine Meta Pixel events (Lead, Purchase mapping) / menu change (카톡 상담, 계약서 작성 box) / +etc to 스냅 / add event3 / menu font size gets larger / remove below kakao icon among 5

- Set 'Lead' event only on 카톡 상담 button (index.html, video.html)
- Set 'Purchase' event only on 계약서 작성 button (index.html, video.html)
- All other clicks remain 'ViewContent'
- Updated documentation in readme_metapixel_googlepixel.txt

250529-3

docs: adding EVENT (discount of 200,000 won by adding channel)

250529-4

docs: change the ABOUT part (sentence and linktree composition)

250530-5

docs: adding meta pixel to linktree

250604

docs: Integrating EVENT 3 and 4 to EVENT 3 / Make Default Discount for 2025 wedding with 33% but I increased the original price from 770,000 to 880,000.

250607

docs: change the price and event sentences

250607 - 2

docs: adding some text for making within 3days event

250614

docs: remove the SNAP and 1yearVideo / Move picture certification from snap to about

250614 - 2

docs: devide the option free event as two for adding fast contract / change sending video event from 3Day to 5Day

250616

docs: move contract from main page to product (advise by g)

250619

docs: remove time limit event (PRDUCT & EVENT area)

250619 - 2

docs: change PRODUCT option menu (adding original video & change the jimber coverage)

250628

docs: main price change from 880,000 to 770,000

250706

docs: fast making option change from 5 days to 10 days because I only do the cosbos mainly in weekend so it has high probability to make the next weekend.

250707

docs: whole change for high-end wedding video mimicking The First Day

250707 - 2

docs: remove blog review & adding event of 10% discount when the day contract

250707 - 3

docs: change from 1p2cam to 1p3cam