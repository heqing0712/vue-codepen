/**
 * 获取URL参数
 * @return {String} name 参数名称
 * @return {string} 返回参数值
 */
export function getParam(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r) {
        return decodeURI(r[2]);
    }
    return null;
};


/*
* 获取head html
*/
export function getHeadHtml(s) {
    return (s || "") && (s = s.match(/<head>([\s\S]*)<\/head>/)) && s[1] || "";
};

/*
* 获取body html
*/
export function getBodyHtml(s) {
    return (s || "") && (s = s.match(/<body[^>]*>([\s\S]*)<\/body>/)) && s[1] || "";
};


/*
*获取页面的文档类型
*/
export function GetDocType(str) {

    if (!str) return null;

    var types = {
        "1": "<!DOCTYPE html>",
        "2": "/strict.dtd",
        "3": "/loose.dtd",
        "4": "/frameset.dtd",
        "5": "/xhtml1-strict.dtd",
        "6": "/xhtml1-transitional.dtd",
        "7": "/xhtml1-frameset.dtd",
        "8": "/xhtml11.dtd"
    };

    for (let s in types) {
        if (str.indexOf(types[s]) > -1)
            return s;
    }

    return null;
};
