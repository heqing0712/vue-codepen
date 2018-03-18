import $ from 'jquery';

/**
* 可调整布局组件 resizer 在box 右边
* @param {object} options 配置对象
*/
export function rzLayout(options) {

    //默认配置
    var defaults = {

        //调整的父容器
        boxes: null,

        //调整的子容器className
        boxClassName: "box",

        //按下进行调整的容器 className
        resizerClassName: "resizer",

        //列表显示方式 默认列 方式 col(列) or row（行）
        dir: "col",

        //初始化回调函数
        init: null,

        //开始移动 鼠标按下回调函数
        mousedown: null,

        //调整过程中 回调函数
        mousemove: null,

        //调整完毕 鼠标弹起回调函数
        mouseup: null

    };

    //合并配置
    options = $.extend(defaults, options || {});


    if (!options.boxes || !options.boxes.length) return;

    var size = options.dir == "col" ? "width" : "height";
    var axis = options.dir == "col" ? "clientX" : "clientY";

    var $doc = $(document);
    var $body = $("body");
    var $boxes = options.boxes;
    var $boxs = $("." + options.boxClassName, $boxes);
    var $resizers = $("." + options.resizerClassName, $boxes);
    var minSize = $resizers.eq(0)[size]();
    var startIndex = 0;
    var lastIndex = $boxs.length - 1;
    var moving = false;
    var moveS = 0;
    var $boxThis;
    var $boxThat;
    var boxesSize;
    var info = {};
    var setInfo = function (e) {
        info.startS = e[axis];
        info.thisS = $boxThis[size]();
        info.thatS = $boxThat[size]();
        info.totalS = info.thisS + info.thatS;
    };

    $resizers.bind("mousedown", function (e) {

        moving = true;
        moveS = e[axis];
        $boxThis = $(this).closest("." + options.boxClassName);
        $boxThat = $boxThis.next();
        startIndex = $boxs.index($boxThis);
        boxesSize = $boxes[size]();
        setInfo(e);

        if (typeof options.mousedown === "function") {
            options.mousedown();
        }

        $body.addClass("resizing");

        return false;
    })

    $doc.bind("mousemove", function (e) {

        if (!moving) return;

        var moveDir = e[axis] - moveS;
        var thisSize = $boxThis[size]();
        var thatSize = $boxThat[size]();
        var thisIndex = $boxs.index($boxThis);
        var thatIndex = $boxs.index($boxThat);

        //右移动或者下移动
        if (moveDir > 0) {

            if (thatSize == minSize) {

                if (thatIndex != lastIndex) {
                    $boxThat = $boxThat.next();
                    setInfo(e);
                }
            }

            if (startIndex != thisIndex) {
                $boxThis = $boxThat.prev();
                setInfo(e);
            }
        }

        //左移动或者上移动
        if (moveDir < 0) {

            if (thisSize == minSize) {

                if (thisIndex != 0) {
                    $boxThis = $boxThis.prev();
                    setInfo(e);
                }
            }

            if (startIndex + 1 != thatIndex) {
                $boxThat = $boxThis.next();
                setInfo(e);
            }

        }

        thisIndex = $boxs.index($boxThis);
        thatIndex = $boxs.index($boxThat);

        //移动的距离
        var moveDis = (e[axis] - info.startS);

        //最大尺寸
        var maxSize = thatIndex != lastIndex ?
            info.totalS - minSize :
            info.totalS;

        var thisSize = Math.max(minSize, Math.min(maxSize, (info.thisS + moveDis)));
        var thatSize = info.totalS - thisSize;

        if (thisSize != minSize) {
            thisSize = (thisSize / boxesSize * 100).toFixed(6) + "%";
        }

        if (thatSize != minSize) {
            thatSize = (thatSize / boxesSize * 100).toFixed(6) + "%";
        }

        $boxThis[size](thisSize);
        $boxThat[size](thatSize);

        moveS = e[axis];

        if (typeof options.mousemove === "function") {
            options.mousemove();
        }

    })

    $doc.bind("mouseup", function () {

        if (!moving) return;
        moving = false;

        if (typeof options.mouseup === "function") {
            options.mouseup();
        }

        $body.removeClass("resizing");
    })

    if (typeof options.init === "function") {
        options.init();
    }



};

/**
* 可调整布局组件  resizer在box 左边
* @param {object} options 配置对象
*/
export function rzLayoutx(options) {

    //默认配置
    var defaults = {

        //调整的父容器
        boxes: null,

        //调整的子容器className
        boxClassName: "box",

        //按下进行调整的容器 className
        resizerClassName: "resizer",

        //列表显示方式 默认列 方式 col(列) or row（行）
        dir: "col",

        //初始化回调函数
        init: null,

        //开始移动 鼠标按下回调函数
        mousedown: null,

        //调整过程中 回调函数
        mousemove: null,

        //调整完毕 鼠标弹起回调函数
        mouseup: null

    };

    //合并配置
    options = $.extend(defaults, options || {});


    if (!options.boxes || !options.boxes.length) return;

    var size = options.dir == "col" ? "width" : "height";
    var axis = options.dir == "col" ? "clientX" : "clientY";

    var $doc = $(document);
    var $body = $("body");
    var $boxes = options.boxes;
    var $boxs = $("." + options.boxClassName, $boxes);
    var $resizers = $("." + options.resizerClassName, $boxes);
    var minSize = $resizers.eq(0)[size]();
    var startIndex = 0;
    var lastIndex = $boxs.length - 1;
    var moving = false;
    var moveS = 0;
    var thisIndex;
    var thatIndex;
    var $boxThis;
    var $boxThat;
    var boxesSize;
    var info = {};
    var setInfo = function (e) {
        info.startS = e[axis];
        info.thisS = $boxThis[size]();
        info.thatS = $boxThat[size]();
        info.totalS = info.thisS + info.thatS;
        thisIndex = $boxs.index($boxThis);
        thatIndex = $boxs.index($boxThat);

    };
    var isLeft = true;
    $resizers.bind("mousedown", function (e) {

        var $that = $(this);
        moving = true;
        moveS = e[axis];
        $boxThis = $(this).closest("." + options.boxClassName);
        $boxThat = $boxThis.prev();


        startIndex = $boxs.index($boxThis);
        boxesSize = $boxes[size]();
        setInfo(e);

        if (typeof options.mousedown === "function") {
            options.mousedown();
        }

        $body.addClass("resizing");

        return false;
    })

    $doc.bind("mousemove", function (e) {

        if (!moving) return;

        var moveDir = e[axis] - moveS;
        var thisSize = $boxThis[size]();
        var thatSize = $boxThat[size]();
        var thisIndex = $boxs.index($boxThis);
        var thatIndex = $boxs.index($boxThat);

        //右移动或者下移动
        if (moveDir > 0) {

            if (thisSize == minSize) {

                if (thisIndex != lastIndex) {
                    $boxThis = $boxThis.next();
                    setInfo(e);
                }
            }

            if (startIndex - 1 != thatIndex) {
                $boxThat = $boxThat.next();
                setInfo(e);
            }

        }

        //左移动或者上移动
        if (moveDir < 0) {

            if (thatSize == minSize && thatIndex != 0) {
                $boxThat = $boxThat.prev();
                setInfo(e);
            }

            if (startIndex != thisIndex) {
                $boxThis = $boxThis.prev();
                setInfo(e);
            }


        }


        //移动的距离
        var moveDis = e[axis] - info.startS;


        //最大尺寸
        var maxSize = thatIndex != lastIndex ?
            info.totalS - minSize :
            info.totalS;



        var thisSize = Math.max(minSize, Math.min(maxSize, (info.thisS - moveDis)));
        var thatSize = info.totalS - thisSize;
        //console.log(thatSize)

        if (thisSize != minSize) {
            thisSize = (thisSize / boxesSize * 100).toFixed(6) + "%";
        }

        if (thatSize != minSize) {
            thatSize = (thatSize / boxesSize * 100).toFixed(6) + "%";
        }

        $boxThis[size](thisSize);
        $boxThat[size](thatSize);

        moveS = e[axis];

        if (typeof options.mousemove === "function") {
            options.mousemove();
        }

    })

    $doc.bind("mouseup", function () {

        if (!moving) return;
        moving = false;

        if (typeof options.mouseup === "function") {
            options.mouseup();
        }

        $body.removeClass("resizing");
    })

    if (typeof options.init === "function") {
        options.init();
    }



};

