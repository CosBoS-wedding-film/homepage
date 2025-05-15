github



250514

feat: remove 'PRODUCT' VAT, add '+SNAP' section, fix all Meta Pixel events to 'ViewContent', Fix video web page
- remove 'PRODUCT' VAT
- add '+SNAP' section
    - Created '+SNAP' section for snap & group album services
    - Implemented 1x3 layout for sample photos and 1x2 for videos
- fix all Meta Pixel events to 'ViewContent'
    - Standardized all Meta Pixel events to 'ViewContent' (removed all 'Purchase')
    - Added tracking code to all clickable elements including pagination
- Fix video web page
    - Before this commit, there are no texts above 5 icon.
    - I added the texts for making the same with the other pages.