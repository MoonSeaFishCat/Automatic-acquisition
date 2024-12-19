(() => {
    'use strict';

    let collecting = false; // 变量控制采集是否进行

    // 创建并初始化日志窗口
    const createLogWindow = () => {
        const logWindow = document.createElement('div');
        logWindow.style.position = 'fixed';
        logWindow.style.bottom = '10px';
        logWindow.style.right = '10px';
        logWindow.style.width = '300px';
        logWindow.style.height = '200px';
        logWindow.style.overflowY = 'auto';
        logWindow.style.backgroundColor = '#AEEEEE'; // 淡蓝色
        logWindow.style.border = '1px solid #A0C4E1';
        logWindow.style.padding = '10px';
        logWindow.style.zIndex = '10000'; // 确保在最上层
        logWindow.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        logWindow.style.cursor = 'move'; // 使鼠标变为可移动状态
        document.body.appendChild(logWindow);

        // 创建标题
        const title = document.createElement('h4');
        title.innerText = '辅助采集系统--日志窗口';
        title.style.margin = '0 0 10px';
        logWindow.appendChild(title);

        // 创建日志容器
        const logContainer = document.createElement('pre');
        logContainer.style.whiteSpace = 'pre-wrap'; // 允许换行
        logContainer.style.wordWrap = 'break-word'; // 处理长单词
        logContainer.id = 'logContainer'; // 便于后续获取
        logWindow.appendChild(logContainer);

        // 实现拖拽功能
        logWindow.onmousedown = (e) => {
            const offsetX = e.clientX - logWindow.getBoundingClientRect().left;
            const offsetY = e.clientY - logWindow.getBoundingClientRect().top;

            const mouseMoveHandler = (e) => {
                logWindow.style.left = `${e.clientX - offsetX}px`;
                logWindow.style.top = `${e.clientY - offsetY}px`;
            };

            const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };
    };

    // 日志记录函数，记录到日志窗口
    const logMessage = (message) => {
        const logContainer = document.getElementById('logContainer');
        const timestamp = new Date().toLocaleTimeString();
        logContainer.innerHTML += `\n[${timestamp}] - ${message}`;
        logContainer.scrollTop = logContainer.scrollHeight; // 始终滚动到底部
    };

    // 延迟函数，用于异步等待
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function collectionMethodOne() {
        const productDivs = document.querySelectorAll('div.EKDT7a3v[style*="width:20%"]');
        logMessage(`当前使用方式一采集，共 ${productDivs.length} 项商品...`);
        collecting = true; // 开始采集
        for (const productDiv of productDivs) {
            if (!collecting) break; // 检查是否要停止采集
            const h3Element = productDiv.querySelector('h3');
            logMessage(`点击商品: ${h3Element.innerText}`);

            // 点击商品链接以打开详情页
            h3Element.click();

            // 等待页面加载
            await delay(30000); //考虑到网络问题，等待时间设为30秒

            // 向背景脚本请求在所有temu.com页面中注入inject.js
            chrome.runtime.sendMessage({ action: 'injectScriptToAllTabs' });//目前最佳实践是在background.js中处理所有页面的注入请求，而不是在content.js中处理
            // 等待60秒后继续
            await delay(60000);
        }

        collecting = false; // 结束采集
        alert('商品采集完成！');
    }

    async function collectionMethodTwo() {
        const productDivs = document.querySelectorAll('div.EKDT7a3v[style*="width:20%"]');
        logMessage(`当前使用方式二采集，共 ${productDivs.length} 项商品...`);

        collecting = true; // 开始采集
        for (const productDiv of productDivs) {
            if (!collecting) break; // 检查是否要停止采集
            const h3Element = productDiv.querySelector('h3');
            h3Element.dispatchEvent(new MouseEvent('mouseover', {
                bubbles: true,
                cancelable: true,
                view: window
            }));

            await delay(3000);

            const crawlButton = productDiv.querySelector('button.niu-crawl-btn');
            if (crawlButton) {
                crawlButton.click();
                logMessage(`点击采集按钮: ${h3Element.innerText}`);
            } else {
                logMessage(`未找到采集按钮，跳过商品: ${h3Element.innerText}`);
            }

            h3Element.dispatchEvent(new MouseEvent('mouseout', {
                bubbles: true,
                cancelable: true,
                view: window
            }));

            await delay(60000);
        }

        collecting = false; // 结束采集
        alert('分类采集完成！');
    }

    // 创建日志窗口
    createLogWindow();

    // 根据选择的方式启动采集
    chrome.storage.sync.get('collectionMethod', ({ collectionMethod }) => {
        if (collectionMethod === '方式一') {
            collectionMethodOne();
        } else {
            collectionMethodTwo();
        }
    });

    // 监听停止请求
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "stopCollection") {
            collecting = false; // 修改 flag 停止采集
            logMessage('采集已停止！');
        }
    });
})();