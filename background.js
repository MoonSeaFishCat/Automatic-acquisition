chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'createTab') {
        chrome.tabs.create({ url: request.url, active: false }, (tab) => {
            sendResponse({ tabId: tab.id });
        });
        return true;  // 保持消息通道打开，等待异步响应
    }

    if (request.action === 'injectScriptToAllTabs') {
        // 查询所有适合的标签页
        chrome.tabs.query({ url: "*://www.temu.com/*" }, (tabs) => {
            tabs.forEach(tab => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['inject.js']
                }, () => {
                   console.log(`已注入 inject.js 到标签: ${tab.id}`);
                });
            });
        });
    }
    if (request.action === "stopCollection") {
        console.log("停止采集请求已接收到");
        // 发送消息到每个活动的标签页，告知它们停止采集
        activeTabs.forEach(tabId => {
            chrome.tabs.sendMessage(tabId, { action: "stopCollection" }, response => {
                if (chrome.runtime.lastError) {
                    console.error(`发送消息到标签 ${tabId} 失败: ${chrome.runtime.lastError.message}`);
                } else {
                    console.log(`成功向标签 ${tabId} 发送停止消息`);
                }
            });
        });
    }
}
);