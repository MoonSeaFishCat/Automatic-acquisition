document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    let isCollecting = false; // 添加变量以跟踪采集状态

    startButton.addEventListener('click', () => {
        const selectedMethod = document.querySelector('input[name="collectionMethod"]:checked');
        if (!selectedMethod) {
            alert("请先选择采集方式！");
            return;
        }
        const method = selectedMethod.value;
        chrome.storage.sync.set({ 'collectionMethod': method }, () => {
            console.log(`选择的采集方式: ${method}`); // 确保这条日志能够在控制台输出
        });
        isCollecting = true; // 开始采集

        chrome.tabs.query({ url: "*://www.temu.com/*" }, (tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js']
                }, () => {
                    console.log(`已在标签 ${tab.id} 注入 content.js`); // 确保在这里输出注入的成功信息
                });
            });
        });
    });

    stopButton.addEventListener('click', () => {
        console.log('已停止采集 ...');
        isCollecting = false; // 更新采集状态

        // 通知 content.js 停止采集
        chrome.runtime.sendMessage({ action: "stopCollection" }, response => {
            console.log('已发送停止采集的请求'); // 确保发送停止请求时输出这条信息
        });
    });
});