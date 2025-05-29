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