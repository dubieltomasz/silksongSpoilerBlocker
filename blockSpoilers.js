const blacklist = ['hollow knight', 'silksong', 'team cherry', 'path of pain', 'hornet'];

function blockSpoilers(){
    const elements = document.querySelectorAll(".ytd-rich-item-renderer:not(.ytd-rich-item-renderer .ytd-rich-item-renderer), ytd-video-renderer, ytm-shorts-lockup-view-model-v2");

    const matches = Array.from(elements).filter(el =>
        blacklist.some(kw => el.innerText?.toLowerCase().includes(kw))
    );

    matches.forEach(el => {
        let images = el.querySelectorAll('img, yt-image');
        if(images) images.forEach(img => {
            img.style.filter = 'blur(100px)';
        });

        let title = el.querySelector('.yt-core-attributed-string');
        if(title) title.innerText = 'SPOILER';

        let description = el.querySelectorAll('yt-formatted-string.ytd-video-renderer, yt-formatted-string.ytd-expandable-metadata-renderer');
        if(description) description.forEach(txt => {
            txt.innerHTML = 'SPOILER';
        });

        el.style.border = '1px yellow solid';
        el.style.borderRadius = '12px';
    });
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    blockSpoilers();
                }
            });
        }
    });
});

observer.observe(document.body, {childList: true, subtree: true});