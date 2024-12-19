(function inject() {
    const crawlButton = Array.from(document.querySelectorAll('button')).find(btn => btn.innerText.includes("采集此商品"));
    if (crawlButton) {
        crawlButton.click(); // 点击采集按钮
        console.log('当前商品已采集。');
        window.localStorage.setItem('productAcquired', 'true');

        // 设置延迟60秒后关闭当前标签页
        setTimeout(() => {
            window.close(); // 关闭当前标签页
        }, 60000);
    } else {
        console.log('未找到采集按钮。');
    }
    window.localStorage.setItem('acquireProduct', 'false'); // 重置状态
})();