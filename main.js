promptSelectedHTML = function(){
	
	chrome.tabs.query({ currentWindow: true, active: true }, getTabs);
}

function getTabs(tabs) {
	
	chrome.tabs.executeScript(null, { file: "injected.js" });
	
	var HTMLText = getSelectionHTML(win);
  
	window.prompt("Copy to clipboard: Ctrl+C, Enter", HTMLText);
}

function getSelectionHTML(curWindows) {
    var html = "";
    if (typeof curWindows.getSelection != "undefined") {
        var sel = curWindows.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}


chrome.contextMenus.create({
    title: "Get Selected HTML",
    contexts: ["selection"],
    onclick: promptSelectedHTML
});