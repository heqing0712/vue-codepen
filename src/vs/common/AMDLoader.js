import config from '../../config';

/*
* AMD 模块化加载
*/
module.exports = function (callback) {

    if (typeof window.require === 'undefined') {
        const loaderScript = window.document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = config.requireJsUrl;
        loaderScript.addEventListener('load', callback);
        window.document.body.appendChild(loaderScript);
       
    } else {
        callback();
    }
};