//injected脚本并不能直接通过配置添加到页面中，需要通过content执行js代码动态插入到dom中
setTimeout(() => {
    const pageScript = document.createElement('script');
    pageScript.setAttribute('type', 'text/javascript');
    pageScript.setAttribute('src', chrome.extension.getURL("/js/inject/page.js"));
    document.head.appendChild(pageScript);

    const networkScript = document.createElement('script');
    networkScript.setAttribute('type', 'text/javascript');
    networkScript.setAttribute('src', chrome.extension.getURL('/js/inject/network.js'));
    document.head.appendChild(networkScript);

    const excelScript = document.createElement('script');
    excelScript.setAttribute('type', 'text/javascript');
    excelScript.setAttribute('src', chrome.extension.getURL("/js/inject/pikazExcel.js"));
    document.head.appendChild(excelScript);

    const jqueryScript = document.createElement('script');
    jqueryScript.setAttribute('type', 'text/javascript');
    jqueryScript.setAttribute('src', chrome.extension.getURL("/js/inject/jquery-1.11.3.min.js"));
    document.head.appendChild(jqueryScript);
});
