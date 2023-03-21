// 转发popup指令  popup => content script => inject script
chrome.extension.onMessage.addListener(
    function (request) {
        if (request.action == "CHANGE_POPUP_ALLOW_DOWNLOAD") {
            // popup 告诉页面可以开始收集并下载数据了
            window.postMessage({ action: 'CHANGE_POPUP_ALLOW_DOWNLOAD', popupAllowDownload: true, filename: request.filename }, '*');
        }
    }
);