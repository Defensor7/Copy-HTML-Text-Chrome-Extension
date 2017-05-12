promptSelectedHTML = function(){
	chrome.tabs.query({ currentWindow: true, active: true }, getTabs);
}

function getTabs(tabs) {
	chrome.tabs.executeScript(null, { file: "injected.js" }, function(result){
        if (result){  
	        window.prompt("Copy to clipboard: Ctrl+C, Enter", result);
        }
    });
}

chrome.contextMenus.create({
    title: "Get Selected HTML",
    contexts: ["selection"],
    onclick: promptSelectedHTML
});