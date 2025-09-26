const tags = document.getElementById('tags');
const tagInput = document.getElementById('tagInput');
let blacklist = [];

function loadBlacklist() {
    blacklist = JSON.parse(localStorage.getItem('blacklist'));
    if(!blacklist) {
        blacklist = ['hollow knight', 'silksong', 'team cherry', 'hornet', 'moss mother', 'carmelita', 'lace', 'sharpe', 'seth', 'trobbio', 'last judge', 'bell beast'];
    }
}

function addToBlacklist() {
    const value = tagInput.value;
    if(!value) {
        return;
    }

    blacklist.push(value.toLowerCase());
    blacklist.sort();
    localStorage.setItem('blacklist', JSON.stringify(blacklist));
    sync();
}

function removeFromBlacklist() {
    const value = tagInput.value;
    if(!value) {
        return;
    }

    const index = blacklist.indexOf(value.toLowerCase());
    if(index === -1) {
        return;
    }

    blacklist.splice(index, 1);
    localStorage.setItem('blacklist', JSON.stringify(blacklist));
    sync();
}

function removeSelfFromBlacklist(tag) {
    const index = blacklist.indexOf(tag);
    if(index === -1) {
        return;
    }

    blacklist.splice(index, 1);
    localStorage.setItem('blacklist', JSON.stringify(blacklist));
    sync();
}

function showBlacklist() {
    tags.innerHTML = "";

    blacklist.forEach(tag => {
        const newDiv = document.createElement('div');
        const newForm = document.createElement('form');
        const button = document.createElement('button');
        newForm.classList.add('selfDelete');
        button.classList.add('selfDelete');
        newDiv.appendChild(document.createTextNode(tag));
        newDiv.appendChild(newForm);
        newForm.appendChild(button);
        button.innerText = '❌';
        button.title = 'Delete this tag from the list';
        button.addEventListener("click", function() {removeSelfFromBlacklist(tag);});
        tags.appendChild(newDiv);
    });
}

function sync() {
    const data = JSON.stringify(blacklist);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "setBlacklist", data: data });
    });
}

document.getElementById('buttonAdd').addEventListener("click", addToBlacklist);
document.getElementById('buttonRem').addEventListener("click", removeFromBlacklist);
document.getElementById('buttonSend').addEventListener("click", sync);

loadBlacklist();
showBlacklist();