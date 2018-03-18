import vs from '../core';
import $ from 'jquery';
import store from 'store';
import { tab } from '../plugins';
import * as  layoutViews from './layoutViews';

let gearSvg = '<svg class="icon-gear" width="10" height="10"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#gear"></use></svg >';


let editorBinds = {};


//动态模板时 svg 标签影响vue编译 现在通过动态添加解决
function addSvgIcon() {

    //设置svg
    $(".setting-nub").append(gearSvg);
};


/*
*设置视图
*/
function setLayout() {
   
    var data = {};
    var $pageWrap, $webEditor;
    var indexVue = vs.indexVue;
    var layoutVue = vs.layoutVue;
    var layoutType = getLayoutType();
    var editorIndex = layoutType.replace('ly', '');

    $pageWrap = $("#page-wrap");
    $webEditor = $(".web-editor:visible", $pageWrap);


    //缓存旧节点属性
    $(".j_rp", $webEditor).each(function () {
        var $that = $(this),
            key = $that.attr("id") || $that.data("type");
        data[key] = $that;
    });

    clearLayoutStore();

    layoutVue.domChangeFns.layoutTypeChange = function () {

  
        var $webEditorNews = $("." + layoutType.replace("ly", "web-editor"));

        //将就节点属性 替换为 新节点属性
        $(".j_rp", $webEditorNews).each(function () {
            var $that = $(this);
            var key = $that.attr("id") || $that.data("type");
            var obj = data[key];

            if (obj) {
                $that.append(obj.children(":first").detach());
            }

        });

        bindLayout();

        resetEditorLayout();
   
    };

    //设置布局类型
    layoutVue.layoutType = layoutType;

}



/*
* 清除视图缓存
*/
function clearLayoutStore() {

    for (let i = 1; i <= 8; i++) {

        store.set("web-editor" + i + "-boxs-col", null);
        store.set("web-editor" + i + "-boxs-row", null);
    }
}



/*
*重置编辑器布局
*/
export function resetEditorLayout() {

    let editors = vs.editors;
    for (let o in editors) {
        if (editors[o]) {
            editors[o].layout();
        }       
    }
}


/*
* 绑定布局
*/
export function bindLayout() {

    var layoutVue = vs.layoutVue;
    var layoutType = layoutVue.layoutType;
    var editorClassName = "web-editor" + layoutType.replace('ly', '');
    var $webEditor = $('.' + editorClassName);
    var $tab = $webEditor.find('.tab');

    layoutViews[layoutType]();

     //选项卡
    if ($tab.length) {
       
        tab({
            navs: $(".tab-menu", $tab),
            cts: $(".tab-ct", $tab),
            activeCls: "active",
            startIndex: store.get("startIndex") || 0,
            clickFn: function (index) {
                store.set("startIndex", index)
            }
        });
    }
   
    editorBinds[layoutType] = true;

    addSvgIcon();



}



/*
*切换布局
*/
export function bindLayoutChange() {

    var
        layoutVue = vs.layoutVue,
        defaultLayoutType = getLayoutType(),
        $viewBox = $("#view-box"),
        $views = $(".view-list .s-view", $viewBox);

    $views.each(function () {
        var $that = $(this),
            index = $views.index($that),
            layoutType = "ly" + (index + 1);

        if (defaultLayoutType == layoutType) {
            $that.addClass("selected").siblings().removeClass("selected");
            return false;
        }

    });


    $views.bind("click", function () {

        var $that = $(this),
            index = $views.index($that),
            layoutType = "ly" + (index + 1),
            nowLayoutType = store.get("layoutType");

        if (layoutType == nowLayoutType) return;

        $that.addClass("selected").siblings().removeClass("selected");
        $("body").removeClass(nowLayoutType).addClass(layoutType);
        store.set("layoutType", layoutType);

        setLayout();

        return false;
    })
}


//获取布局类型
export function getLayoutType() {

    return store.get("layoutType") || "ly1";
};
