//micro.js
(() => {
    if (document.getElementById('mic-popup')) return;
    const style = document.createElement('style');
    style.textContent = `#mic-popup{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:999999;font-family:sans-serif}#mic-popup-box{background:#1e1e1e;color:#fff;padding:24px 28px;border-radius:16px;text-align:center;min-width:300px}#mic-popup-box button{background:#fff;color:#000;border:none;padding:8px 18px;border-radius:20px;cursor:pointer;font-weight:600}`;
    document.head.appendChild(style);
    const div = document.createElement('div');
    div.id = 'mic-popup';
    div.innerHTML = `<div id="mic-popup-box"><h2>Microphone is not supported in the Windows app</h2><button onclick="this.closest('#mic-popup').remove()">OK</button></div>`;
    document.body.appendChild(div);
})();