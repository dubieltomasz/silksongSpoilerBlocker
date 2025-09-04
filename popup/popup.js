const tags = document.getElementById('tags');
const newTag = document.getElementById('newTag');
const remTag = document.getElementById('remTag');
let blacklist = [];

function loadBlacklist() {
    blacklist = JSON.parse(localStorage.getItem('blacklist'));
    if(!blacklist) {
        blacklist = ['hollow knight', 'silksong', 'team cherry', 'hornet', 'nail', 'moss mother', 'carmelita', 'lace', 'sharpe', 'seth', 'trobbio', 'last judge', 'bell beast'];
    }
}

function addToBlacklist() {
    const value = newTag.value;
    if(!value) {
        return;
    }

    blacklist.push(value.toLowerCase());
    blacklist.sort();
    localStorage.setItem('blacklist', JSON.stringify(blacklist));
}

function removeFromBlacklist() {
    const value = remTag.value;
    if(!value) {
        return;
    }

    const index = blacklist.indexOf(value.toLowerCase());
    if(index === -1) {
        return;
    }

    blacklist.splice(index, 1);
    localStorage.setItem('blacklist', JSON.stringify(blacklist));
}

function showBlacklist() {
    tags.innerHTML = "";

    blacklist.forEach(tag => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = tag;
        tags.appendChild(newDiv);
    });
}

function fun() {
    const data = JSON.stringify(blacklist);

    browser.tabs.executeScript({
        code: `localStorage.setItem('blacklist', JSON.stringify(${data}));`
    });
}

document.getElementById('buttonAdd').addEventListener("click", addToBlacklist);
document.getElementById('buttonRem').addEventListener("click", removeFromBlacklist);
document.getElementById('buttonSend').addEventListener("click", fun);

loadBlacklist();
showBlacklist();