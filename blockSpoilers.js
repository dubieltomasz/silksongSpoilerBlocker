const content = document.getElementById('contents') || document.body;
const youtubeVideoClasses = "ytd-rich-item-renderer, .yt-lockup-view-model, ytd-video-renderer, ytm-shorts-lockup-view-model-v2, .ytp-videowall-still, .shortsLockupViewModelHost, .ytGridShelfViewModelGridShelfItem";
let blacklist = [];

blacklist = JSON.parse(localStorage.getItem('blacklist'));
if(!blacklist) {
    blacklist = ['hollow knight', 'silksong', 'team cherry', 'hornet', 'nail', 'moss mother', 'carmelita', 'lace', 'sharpe', 'seth', 'trobbio', 'last judge', 'bell beast'];
}

const callback = (mutationList, observer) => {
    for(const mutation of mutationList) {
        if(mutation.type === "childList") {
            mutation.addedNodes.forEach(node => {
                if(node.matches?.(youtubeVideoClasses)) {
                    if(blacklist.some(bl => node.textContent?.toLowerCase().includes(bl))) {
                        let images = node.querySelectorAll('img, yt-image, .ytp-videowall-still-image, .ytCoreImageHost');
                        if(images) images.forEach(img => {
                            img.style.filter = 'blur(100px)';
                        });

                        let title = node.querySelectorAll('.yt-core-attributed-string, .ytp-videowall-still-info-title');
                        if(title) title.forEach(txt => {
                            txt.innerHTML = 'SPOILER';
                        });

                        let description = node.querySelectorAll('yt-formatted-string.ytd-video-renderer, yt-formatted-string.ytd-expandable-metadata-renderer');
                        if(description) description.forEach(txt => {
                            txt.innerHTML = 'SPOILER';
                        });
                    }
                }
            });
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(content, {childList: true, subtree: true});