import vs from '../core';
import $ from 'jquery';
import store from 'store';
import config from '../../config';
import * as utils from '../utils';
import * as services from '../services';
import { resetEditorLayout } from './layout';
export * from './layout';



let staticPath = config.staticPath;

/*
*编辑器对象
*/
let editors = {};

vs.editors = editors;



/*
* 默认配置
*/
let defaults = {
    //编辑器修改更新延时
    updateDelay: 2
};



// load vsEditor
function loadVsEditor(callback) {
    window.require.config(config.requireJsConfig);
    window.require(['vs/editor/editor.main'], () => {
        callback();
    });
};


/*
* 获取所有编辑器的jquery对象
*/
function getEditors() {

    return $(".web-editor:visible .vs-editor");
};

/**
 * 传入数据运行编辑器 
 * @param {object} 运行的数据
 * @param {boolean} 是否刷新
 */
function doRun(data, reload) {

    var runType, headHtml, bodyHtml, runContainer;
    var penSettingVueData = vs.penSettingVueData;
    var runIframe = vs.runIframe;
    var datas = window.top.datas;
    var runHtml = staticPath + "tpl/run1.html";
    var $webEditor = $('.web-editor:visible');

    if (!datas) {

        window.top.datas = datas = {};
    }

    for (var o in penSettingVueData) {
        if (/^(Html|Css|Js).+/.test(o)) {
            if (penSettingVueData[o] != null)
                datas[o] = penSettingVueData[o];
        }
    }


    //console.log(data);
    datas.Html = data.html;
    datas.Css = data.css;
    datas.Js = data.javascript;

    runType = utils.GetDocType(datas.Html);



    if (runType) {

        headHtml = utils.getHeadHtml(datas.Html);
        bodyHtml = utils.getBodyHtml(datas.Html);

        if (!datas.HtmlHeadStuff) {
            datas.HtmlHeadStuff = "";
        }

        if (headHtml) {
            datas.HtmlHeadStuff += headHtml;
        }

        if (bodyHtml) {
            datas.Html = bodyHtml;
        }


    }
    else {
        runType = datas.HtmlDocType;
    }

    /*
    *html 文档类型
    */
    runHtml = staticPath +"tpl/run" + runType + ".html";

    if (runIframe) {
        if (reload) {
            runIframe.src = runHtml + '?t' + (+new Date());
        }
        return;
    }

    runContainer = $(".result-container",$webEditor)[0];
    runIframe = document.createElement('iframe');
    runIframe.id = 'runIframe';
    runIframe.className = 'run-iframe';
    runIframe.style.boxSizing = 'border-box';
    runIframe.style.width = '100%';
    runIframe.frameborder = '0';
    runContainer.appendChild(runIframe);
    vs.runIframe = runIframe;

    var eidtorDatas = window.top.eidtorDatas = {
        Html: datas.Html,
        Css: datas.Css,
        Js: datas.Js
    };

    //绑定框架回调函数
    var $iframe = $(vs.runIframe);
    var HasRunIframeLoadFn = false;
    var iframeLoadFn = function () {
        if (HasRunIframeLoadFn)
            return;
        HasRunIframeLoadFn = true;

        Object.defineProperty(datas, "Css", {
            set: function (val) {
                eidtorDatas.Css = val;
                $iframe.contents().find("#vscss").html(val);
                return val;
            }
        });

        Object.defineProperty(datas, "Html", {

            set: function (val) {
                eidtorDatas.Html = val;
                $iframe.contents().find("body").html(val);
                return val;
            }
        });

        Object.defineProperty(datas, "Js", {

            set: function (val) {
                eidtorDatas.Js = val;
                //$iframe[0].contentWindow.eval(val);
                try {
                    $iframe[0].contentWindow.eval(val);
                }
                catch (err){

                }
                return val;
            }
        });

    };

    $iframe.on("load", function () {

        var $body = $(this.contentWindow.document.body);
        vs.$iframeBody = $body;
        iframeLoadFn();
    })

    vs.$iframe = $iframe;
    runIframe.src = runHtml;
};


/**
 * 直接运行编辑器已有代码 
 * @param {object} 运行的数据
 * @param {boolean} 是否刷新
 */
function doRunByEditor(data, reload) {


    data = data || {};

    for (var o in editors) {
        data[o] = "";
        if (editors[o]) {
            data[o] = editors[o].getValue()
        }
    }

    //运行代码
    doRun(data, reload);

    //设置缓存
    setEditorStore(data);
};

vs.doRunByEditor = doRunByEditor;

/*
*通过缓存执行代码
*/
function doRunByStore() {

    //运行代码
    doRun(getEditorStore());
};


/**
 * 设置编辑器缓存
 * @param {object} 编辑器数据对象
 */
function setEditorStore (data) {

    for (var o in data) {
        store.set(o, data[o]);
    }
};

/*
* 获取编辑器缓存
*/
function getEditorStore() {

    var data = {};

   getEditors().each(function () {
         var type = $(this).data("type");
        data[type] = store.get(type);
    });

    return data;
};


/*
*设置编辑器内容
*/
function setEditorValue(data) {

    var editor;

    for (var o in data) {
        editor = editors[o];
        if (editor) {
            editor.setValue(data[o]);
        }
    }

    setEditorStore(data);
};



/*
*清空编辑器存储的数据
*/
export function clearEditorStore() {

    var data = {};

    getEditors().each(function () {
        data[$(this).data("type")] = "";
    });

    setEditorValueAndRun(data);
};


/**
 * 设置编辑器内容并执行内容
 * @param {object} 运行的数据对象
 */
export function setEditorValueAndRun(data) {
    setEditorValue(data);
    doRunByEditor(data);
};

vs.setEditorValueAndRun = setEditorValueAndRun;

/*
*初始化编辑器
*@param {object} 编辑器 jquery dom节点对象
*/
export function initEditor($editors) {

    var timer;
    var editorConfig = config.editor;

    $editors.each(function (i) {
        var editor,
            options, type, defaultVal, editorInner,
            $editor = $(this);

        if ($editor.data("bind")) return;

        type = $editor.data("type");
        defaultVal = store.get(type) || "";
        editorInner = $("<div class='inner'/>")[0];

        $editor.append(editorInner);

        options = $.extend({
            language: $editor.data("type"),
            value: defaultVal,
        }, editorConfig);

        editor = window.monaco.editor.create(editorInner, options);
 
        //鼠标移上绑定事件
        editor.onMouseLeave(function (e) {

            var val = editor.getValue() || "";
            store.set(type, val);
        });

        //编辑器 keyup 运行代码
        editor.onKeyUp(function () {

            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                doRunByEditor();
                timer = null;
            }, defaults.updateDelay);

        })

        editors[type] = editor;
        $editor.data("bind", true);

    });
};


/*
*绑定编辑器
*/
export function bindEditor() {

    //获取参数
    var data,
        isAllEmpty = true,
        id = utils.getParam("id"),
        $editors = getEditors();

    function hasDataCallback() {
        //初始化编辑器
        initEditor($editors);

        //设置编辑器缓存
        setEditorStore(editorData);

        //执行编辑器内容
        doRun(editorData);
    }

    function noDataCallback() {
        //初始化编辑器
        initEditor($editors);

        //内容不为空 执行编辑器
        if (!isAllEmpty) {
            doRunByStore();
        }
    }


    //初始化 从缓存中 设置编辑器默认内容
    $editors.each(function (i) {
        var $this = $(this),
            index = $editors.index(this),
            type = $this.data("type"),
            value = store.get(type) || "";

        if (isAllEmpty && value) {
            isAllEmpty = false;
        }
    });


    if (id > 0) {

        clearEditorStore();

        isAllEmpty = true;

        services.getModel(id, function (data) {


            var m = data.results;
            var categoryItems = m.CategoryItems;
            var labelItems = m.LabelItems;
            var editorData = {
                css: m.Css,
                html: m.Html,
                javascript: m.Js
            };


            if (data.status == 0) {
                return;
            }

            if (categoryItems && categoryItems.length) {

                for (var i in categoryItems) {
                    categoryItems[i].selected = 1;
                }
                VueData.CategoryItemsAll = vs.mergeItems(categoryItems, VueData.CategoryItemsAll);
            }

            if (labelItems && labelItems.length) {

                for (var i in labelItems) {
                    labelItems[i].selected = 1;
                }
                VueData.LabelItemsAll = vs.mergeItems(labelItems, VueData.LabelItemsAll);
            }

            for (var i in m) {
                if (VueData[i] !== undefined && m[i] != null) {
                    VueData[i] = m[i];
                }
            }

            loadVsEditor(hasDataCallback);
        })
    }
    else {

        loadVsEditor(noDataCallback);
    }


    $(window).bind("resize", function () {
        resetEditorLayout();
    })

};


