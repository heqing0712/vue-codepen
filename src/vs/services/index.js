import $ from 'jquery';
import noty from 'noty';



/**
 * 获取一条数据
 * @param {number} 数据id
 * @param {function} 回调函数
 */
export function getModel(id, callback) {

    if (!id) {

        console && console.log("This id is error.");
    }

    $.ajax({
        url: "/Vs/GetModel/" + id,
        type: "GET",
        dataType: "JSON",
        success: data=> {

            if ($.isFunction(callback)) {
                callback(data);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console && console.log(errorThrown);
        }
    })

};



/**
 * 保存model
 * @return {object} model 数据对象
 * @return {function} 回调函数
 */
export function saveModel(datas, callback) {

    if (!datas) return;

    var nt = noty({
        text: "正在保存中...",
        type: "info",
        timeout: 100000
    });

    $.ajax({
        url: "/Vs/DoEdit/",
        type: "POST",
        dataType: "JSON",
        data: { datas: JSON.stringify(datas) },

        success: data=> {

            nt.close();

            if (data.status == 0) {

                noty({
                    text: "保存失败！",
                    type: "error",
                    timeout: 3000
                });

            }
            else if (data.status == 1) {

                noty({
                    text: "保存成功！",
                    type: "success",
                    timeout: 3000
                });
            }

            if ($.isFunction(callback)) {
                callback(data);
            }

        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console && console.log(errorThrown);
        }
    })

};


/*
* 将编辑器上的代码保存为html
*/
export function createRunHtml() {

    var htmlStr = "";
    var pagePath = "";
    var relativePagePath = "";
    var pageName = store.get("vs-pagename");

    if (!pageName) {
        relativePagePath = "tpl/html/" + pageName;
        pagePath = "/VsEditor/" + relativePagePath;
    }

    $.ajax({
        url: "/Vs/CreateRunHtml/",
        type: "POST",
        data: {
            htmlStr: htmlStr,
            pagePath: pagePath
        },
        dataType: "JSON",
        success:data=> {

            console.log(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console && console.log(errorThrown);
        }
    })

};

