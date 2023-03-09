window.addEventListener('DOMContentLoaded', function() {
    juzi();
});
// 封装Ajax
var Ajax = {
    get: function(url, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据 
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    }
};

function copy() {
    var text = document.querySelector('#text');
    const range = document.createRange();
    range.selectNode(text);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    console.log(selection);
    document.execCommand('copy');
    selection.removeAllRanges();
    alert("复制成功");
};

function juzi() {
    try {
        Ajax.get('https://v1.hitokoto.cn/?encode=text', (e) => {
            console.log(e, typeof e);
            document.querySelector('#text').innerText = e;
        })
    } catch (error) {
        juzi();
    }

};