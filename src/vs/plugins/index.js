import vs from '../core';
import $ from 'jquery';
import dialog from 'dialog';
import noty from 'noty';


/*
* Tab 模块切换组件
*/
export function tab(options) {

    options = $.extend({
        navs: null,
        cts: null,
        activeCls: "active",
        startIndex: 0,
        clickFn: null,
        initFn: null

    }, options || {});

    var fn = options.clickFn,
        cls = options.activeCls || "active";

    options.navs.bind("click", function () {
        var $that = $(this),
            index = $that.index();

        $that.addClass(cls).siblings().removeClass(cls);
        options.cts.eq(index).addClass(cls).siblings().removeClass(cls);

        if ($.isFunction(fn)) {
            if (!fn.call($that, index))
                return false;
        }
    });

    if (options.startIndex > 0) {
        options.navs.eq(options.startIndex).trigger("click");
    }

    if ($.isFunction(options.initFn)) {
        options.initFn();
    }


};


//成功提示
export function alertSuccess(txt) {

    noty({
        text: txt,
        type: "success",
        timeout: 3000
    });
};


//失败提示
export function alertFail(txt) {
    noty({
        text: txt,
        type: "error",
        timeout: 3000
    });
};

/*
* 绑定 noty提示
*/
if ($.noty) {

    $.extend(true, $.noty.defaults, {
        type: "alert",
        timeout: 60000,
        custom: $(window.top.document).find('body'),
        layout: "topCenter",
        maxVisible: 5,
        animation: {
            open: {
                height: "toggle"
            },
            close: {
                height: "toggle"
            },
            easing: "swing",
            speed: 200
        }
    })
}
