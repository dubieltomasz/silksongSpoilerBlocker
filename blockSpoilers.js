const content = document.getElementById('contents') || document.body;
const youtubeVideoClasses = "ytd-rich-item-renderer, .yt-lockup-view-model, ytd-video-renderer, ytm-shorts-lockup-view-model-v2, .ytp-videowall-still, shortsLockupViewModelHost, .ytGridShelfViewModelGridShelfItem";
let blacklist = [];

blacklist = JSON.parse(localStorage.getItem('blacklist'));
if(!blacklist) {
    blacklist = ['hollow knight', 'silksong', 'team cherry', 'hornet', 'nail', 'moss mother', 'carmelita', 'lace', 'sharpe', 'seth', 'trobbio', 'last judge', 'bell beast'];
}

const callback = (mutationList) => {
    for(const mutation of mutationList) {
        for(const node of mutation.addedNodes) {
            if(!(node instanceof HTMLElement) || !node.matches?.(youtubeVideoClasses)) {
                continue;
            }

            const text = node.textContent?.toLowerCase();
            if(!text) {
                continue;
            }

            if(blacklist.some(bl => text.includes(bl))) {
                let images = node.querySelectorAll('img, yt-image, .ytp-videowall-still-image, .ytCoreImageHost');
                if(images) images.forEach(img => {
                    img.style.filter = 'blur(100px)';
                });

                let title = node.querySelector('span.yt-core-attributed-string, .ytp-videowall-still-info-title');
                if(title) {
                    title.textContent = 'SPOILER';
                }

                let description = node.querySelectorAll('yt-formatted-string.ytd-video-renderer, yt-formatted-string.ytd-expandable-metadata-renderer, yt-formatted-string.ytd-rich-grid-media');
                if(description) description.forEach(txt => {
                    txt.textContent = 'SPOILER';
                });
            }
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(content, {childList: true, subtree: true});