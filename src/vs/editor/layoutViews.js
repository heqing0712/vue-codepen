import vs from '../core';
import $ from 'jquery';
import store from 'store';
import {resetEditorLayout} from './layout'
import {rzLayout,rzLayoutx } from './resizeLayout'

//获取布局类型
function getLayoutType() {

    return store.get("layoutType") || "ly1";
};

function getActiveWebEditor() {
    var lyType = getLayoutType();
    var webEditorClassName = "web-editor" + lyType.replace('ly', '');

    return $('.' + webEditorClassName);
}


export function ly1() {

    var $webEditor = getActiveWebEditor();
    var editorType = $webEditor.data("type");
    var storeName = editorType + "-boxs-row";
    var $dragConver = $(".drag-cover", $webEditor);
    var $boxes = $(".boxes-row", $webEditor);
    var $boxs = $(".box-row", $boxes);
    var storeName2 = editorType + "-boxs-col";
    var $boxes2 = $(".boxes-col", $webEditor);
    var $boxs2 = $(".box-col", $boxes2);


    //可调整布局绑定
    rzLayout({

        boxes: $boxes,
        boxClassName: "box-row",
        resizerClassName: "resizer-row",
        dir: "row",
        init: function () {
    
            var i, length, height,
                boxs = vs.getStore(storeName);
         
            if (!boxs) {

                boxs = [];
                length = $boxs.length;
                height = (1 / length * 100).toFixed(6) + "%";

                for (i = 0; i < length; i++) {
                    boxs.push({
                        height: height
                    });
                }

                vs.setStore(storeName, boxs);
            }

            $boxs.each(function (i) {

                var $that = $(this),
                    box = boxs[i];
                if (box && box.height != undefined) {
                    $that.height(box.height);
                }

            });

         
        },

        mousedown: function () {

            $dragConver.show();
        },

        mousemove: function () {

            resetEditorLayout();
       
        },

        mouseup: function () {


            var boxs = [],
                boxesHeight = $boxes.height();

            $dragConver.hide();
            $boxs.each(function () {

                var $that = $(this);
                boxs.push({
                    height: ($that.height() / boxesHeight * 100).toFixed(6) + "%"
                });
            });

            vs.setStore(storeName, boxs);


        }
    });


    //可调整布局绑定
    rzLayout({
        boxes: $boxes2,
        boxClassName: "box-col",
        resizerClassName: "resizer-col",
        dir: "col",

        init: function () {

            var i, length, length2, width,
                boxs = vs.getStore(storeName2);

            if (!boxs) {

                boxs = [];
                length = $boxs2.length;
                width = (1 / length * 100).toFixed(6) + "%";

                for (i = 0; i < length; i++) {
                    boxs.push({
                        width: width
                    });
                }

                vs.setStore(storeName2, boxs);
            }

       

            if (boxs) {

                $boxs2.each(function (i) {
                    var $that = $(this),
                        box = boxs[i];

                    if (box && box.width != undefined) {
                        $that.width(box.width);
                    }

                });
            }


        },

        mousedown: function () {

        },

        mousemove: function () {
  
           resetEditorLayout();
        },

        mouseup: function () {

            var boxs = [],
                boxesWidth = $boxes2.width();
            $boxs2.each(function () {
                var $that = $(this);
                boxs.push({
                    width: ($that.width() / boxesWidth * 100).toFixed(6) + "%"
                });
            });

            vs.setStore(storeName2, boxs);

        }
    });

};

export function ly2() {


    var $webEditor = getActiveWebEditor();
    var editorType = $webEditor.data("type");
    var storeName = editorType + "-boxs-row";
    var $dragConver = $(".drag-cover", $webEditor);
    var $boxes = $(".boxes-row", $webEditor);
    var $boxs = $(".box-row", $boxes);
    var storeName2 = editorType + "-boxs-col";
    var $boxes2 = $(".boxes-col", $webEditor);
    var $boxs2 = $(".box-col", $boxes2);


    //可调整布局绑定
    rzLayout({
        boxes: $boxes,
        boxClassName: "box-row",
        resizerClassName: "resizer-row",
        dir: "row",

        init: function () {

            var i, length, height,
                boxs = vs.getStore(storeName);

            if (!boxs) {

                boxs = [];
                length = $boxs.length;
                height = (1 / length * 100).toFixed(6) + "%";

                for (i = 0; i < length; i++) {
                    boxs.push({
                        height: height
                    });
                }

                vs.setStore(storeName, boxs);
            }

            if (boxs) {

                $boxs.each(function (i) {
                    var $that = $(this),
                        box = boxs[i];
                    if (box && box.height != undefined) {
                        $that.height(box.height);
                    }
                });
            }

        },

        mousedown: function () {
            $dragConver.show();
        },

        mousemove: function () {
            resetEditorLayout();
        },

        mouseup: function () {

            var boxs = [],
                boxesHeight = $boxes.height();

            $dragConver.hide();
            $boxs.each(function () {

                var $that = $(this);

                boxs.push({

                    height: ($t.height() / boxesHeight * 100).toFixed(6) + "%"
                });
            });

            vs.setStore(storeName, boxs)
        }
    });

    //可调整布局绑定
    rzLayout({
        boxes: $boxes2 ,
        boxClassName: "box-col",
        resizerClassName: "resizer-col",
        dir: "col",

        init: function () {

            var i, length, width,
                boxs = vs.getStore(storeName2);

            if (!boxs) {

                boxs = [];
                length = $boxs2.length;
                width = (1 / length * 100).toFixed(6) + "%";

                for (i = 0; i < length; i++) {
                    boxs.push({
                        width: width
                    });
                }

                vs.setStore(storeName2, boxs);
            }


            if (boxs) {

                $boxs2.each(function (i) {

                    var $that = $(this),
                        box = boxs[i];
                    if (box && box.width != undefined) {
                        $that.width(box.width);
                    }

                });
            }

           
        },

        mousedown: function () {

        },

        mousemove: function () {
            resetEditorLayout();
        },

        mouseup: function () {

            var boxs = [],
                boxesWidth = $boxes2.width();

            $boxs2.each(function () {

                var $that = $(this);
                boxs.push({
                    width: ($that.width() / boxesWidth * 100).toFixed(6) + "%"
                });
            });

            vs.setStore(storeName2, boxs)

        }
    });

};

export function ly3() {


};

export function ly4() {

    var $webEditor = getActiveWebEditor();
    var editorType = $webEditor.data("type");
    var storeName = editorType + "-boxs";
    var $dragConver = $(".drag-cover", $webEditor);
    var $boxes = $(".boxes", $webEditor);
    var $boxs = $(".boxes .box", $webEditor);

    //可调整布局绑定
    rzLayout({
        boxes: $boxes,
        boxClassName: "box",
        resizerClassName: "resizer",
        dir: "row",
        init: function () {

            var i, length, height,
                boxs = vs.getStore(storeName);

            if (!boxs) {
                boxs = [];
                length = $boxs.length;
                height = (1 / length * 100).toFixed(6) + "%";
                for (i = 0; i < length; i++) {
                    boxs.push({
                        height: height
                    });
                }
                vs.setStore(storeName, boxs);
            }

            if (boxs) {

                $boxs.each(function (i) {
                    var $that = $(this),
                        box = boxs[i];
                    $that.height(box.height);
                });
            }

        },

        mousedown: function () {
            $dragConver.show();
        },

        mousemove: function () {
            resetEditorLayout();
        },

        mouseup: function () {

            $dragConver.hide();
            var boxs = [],
                boxesHeight = $boxes.height();
            $boxs.each(function () {

                var $that = $(this);
                boxs.push({
                    height: ($that.height() / boxesHeight * 100).toFixed(6) + "%"
                });
            });

            vs.setStore(storeName, boxs)

        }
    });


};

export function ly5() {

    var $webEditor = getActiveWebEditor();
    var editorType = $webEditor.data("type");
    var storeName = editorType + "-boxs";
    var $dragConver = $(".drag-cover", $webEditor);
    var $boxes = $(".boxes", $webEditor);
    var $boxs = $(".boxes .box", $webEditor);


    //可调整布局绑定
    rzLayout({

        boxes: $boxes,
        boxClassName: "box",
        resizerClassName: "resizer",
        dir: "col",
        init: function () {

            var i, length, width,
                boxs = vs.getStore(storeName);

            if (!boxs) {

                boxs = [];
                length = $boxs.length;
                width = (1 / length * 100).toFixed(6) + "%";

                for (i = 0; i < length; i++) {
                    boxs.push({
                        width: width
                    });
                }

                vs.setStore(storeName, boxs);
            }

            if (boxs) {

                $boxs.each(function (i) {
                    var $that = $(this),
                        box = boxs[i];

                    $that.width(box.width);
                });
            }

        },

        mousedown: function () {
            $dragConver.show();
        },

        mousemove: function () {
            resetEditorLayout();
        },

        mouseup: function () {

            $dragConver.hide();
            $boxes.each(function () {
                var boxs = [],
                    boxesWidth = $boxes.width();

                $boxs.each(function () {
                    var $that = $(this);

                    boxs.push({
                        width: ($that.width() / boxesWidth * 100).toFixed(6) + "%"
                    });
                });

                vs.setStore(storeName, boxs)
            });
        }
    });


};

export function ly6() {

    var $webEditor = getActiveWebEditor();
    var editorType = $webEditor.data("type");
    var storeName = editorType + "-boxs";
    var $dragConver = $(".drag-cover", $webEditor);
    var $boxes = $(".boxes", $webEditor);
    var $boxs = $(".boxes .box", $webEditor);

    //可调整布局绑定
    rzLayout({
        boxes: $boxes,
        boxClassName: "box",
        resizerClassName: "resizer",
        dir: "col",

        init: function () {
            var boxs = vs.getStore(storeName);

            if (!boxs) {

                boxs = [];
                var length = $boxs.length;
                var width = (1 / length * 100).toFixed(6) + "%";

                for (var i = 0; i < length; i++) {
                    boxs.push({
                        width: width
                    });
                }

                vs.setStore(storeName, boxs);
            }

            if (boxs) {

                $boxs.each(function (i) {
                    var $that = $(this);
                    var box = boxs[i];
                    $that.width(box.width);
                });
            }

        },

        mousedown: function () {
            $dragConver.show();
        },

        mousemove: function () {
            resetEditorLayout();
        },

        mouseup: function () {

            $dragConver.hide();

            $boxs.each(function () {

                var boxs = [],
                    boxesWidth = $boxes.width();

                $boxs.each(function () {

                    var $that = $(this);
                    boxs.push({
                        width: ($that.width() / boxesWidth * 100).toFixed(6) + "%"
                    });
                });

                vs.setStore(storeName, boxs)
            });

        }
    });

    //重置编辑器布局
    $(window).bind("resize", function () {
        resetEditorLayout();
    })

};

export function ly7() {

    var $webEditor = getActiveWebEditor();
    var editorType = $webEditor.data("type");
    var storeName = editorType + "-boxs-col";
    var $dragConver = $(".drag-cover", $webEditor);
    var $boxes = $(".boxes-col", $webEditor);
    var $boxs = $(".box-col", $boxes);
    var storeName2 = editorType + "-boxs-row";
    var $boxes2 = $(".boxes-row", $webEditor);
    var $boxs2 = $(".box-row", $boxes2);

  
    //可调整布局绑定
    rzLayout({
        boxes: $boxes,
        boxClassName: "box-col",
        resizerClassName: "resizer-col",
        dir: "col",

        init: function () {

          
            var i, length, width,
                boxs = vs.getStore(storeName);
        
            if (!boxs) {

                boxs = [];
                length = $boxs.length;
                width = (1 / length * 100).toFixed(6) + "%";

                for (i = 0; i < length; i++) {
                    boxs.push({
                        width: width
                    });
                }

                vs.setStore(storeName, boxs);
            }

            if (boxs) {
                $boxs.each(function (i) {
                    var $that = $(this),
                        box = boxs[i];
                    if (box && box.width != undefined) {
                        $that.width(box.width);
                    }
                });
            }

        },

        mousedown: function () {
            $dragConver.show();
        },

        mousemove: function () {
            resetEditorLayout();
        },

        mouseup: function () {

            var boxs = [],
                boxesWidth = $boxes.width();

            $dragConver.hide();
            $boxs.each(function () {
                var $that = $(this);
                boxs.push({
                    width: ($that.width() / boxesWidth * 100).toFixed(6) + "%"
                });
            });

            vs.setStore(storeName, boxs)
        }
    });


    //可调整布局绑定
    rzLayoutx({
        boxes: $boxes2,
        boxClassName: "box-row",
        resizerClassName: "resizer-row",
        dir: "row",

        init: function () {
         
            var i, length, height,
                boxs = vs.getStore(storeName2);
        
            if (!boxs) {

                boxs = [];
                length = $boxs2.length;
                height = (1 / length * 100).toFixed(6) + "%";

                for (i = 0; i < length; i++) {
                    boxs.push({
                        height: height
                    });
                }

                vs.setStore(storeName2, boxs);
            }

            if (boxs) {

                $boxs2.each(function (i) {
                    var $that = $(this),
                        box = boxs[i];

                    if (box && box.height != undefined) {
                        $that.height(box.height);
                    }

                });
            }
        },

        mousedown: function () {

        },

        mousemove: function () {
            resetEditorLayout();
        },

        mouseup: function () {

            var boxs = [],
                boxesHeight = $boxes2.height();

            $boxs2.each(function () {
                var $that = $(this);
                boxs.push({
                    height: ($that.height() / boxesHeight * 100).toFixed(6) + "%"
                });
            });

            vs.setStore(storeName2, boxs)

        }
    });

    //重置编辑器布局
    $(window).bind("resize", function () {
        resetEditorLayout();
    })
};

export function ly8() {

    var $webEditor = getActiveWebEditor();
    var editorType = $webEditor.data("type");
    var storeName = editorType + "-boxs-col";
    var $dragConver = $(".drag-cover", $webEditor);
    var $boxes = $(".boxes-col", $webEditor);
    var $boxs = $(".box-col", $boxes);
    var storeName2 = editorType + "-boxs-row";
    var $boxes2 = $(".boxes-row", $webEditor);
    var $boxs2 = $(".box-row", $boxes2);


    //可调整布局绑定
    rzLayout({
        boxes: $boxes,
        boxClassName: "box-col",
        resizerClassName: "resizer-col",
        dir: "col",

        init: function () {

            var boxs = vs.getStore(storeName);

            if (!boxs) {

                boxs = [];
                var length = $boxs.length;
                var width = (1 / length * 100).toFixed(6) + "%";

                for (var i = 0; i < length; i++) {
                    boxs.push({
                        width: width
                    });
                }

                vs.setStore(storeName, boxs);
            }
            if (boxs) {

                $boxs.each(function (i) {
                    var $t = $(this);
                    var box = boxs[i];
                    if (box && box.width != undefined) {
                        $t.width(box.width);
                    }

                });
            }

        },

        mousedown: function () {
            $dragConver.show();
        },

        mousemove: function () {
            resetEditorLayout();
        },

        mouseup: function () {

            $dragConver.hide();

            var boxesWidth = $boxes.width();
            var boxs = [];

            $boxs.each(function () {

                var $t = $(this);
                boxs.push({
                    width: ($t.width() / boxesWidth * 100).toFixed(6) + "%"
                });
            });

            vs.setStore(storeName, boxs)
        }
    });


    //可调整布局绑定
    rzLayoutx({
        boxes: $boxes2 ,
        boxClassName: "box-row",
        resizerClassName: "resizer-row",
        dir: "row",

        init: function () {

            var i, length, height,
                boxs = vs.getStore(storeName2);

            if (!boxs) {

                boxs = [];
                length = $boxs2.length;
                height = (1 / length * 100).toFixed(6) + "%";

                for (i = 0; i < length; i++) {
                    boxs.push({
                        height: height
                    });
                }

                vs.setStore(storeName2, boxs);
                //console.log(boxs);
                //console.log(vs.setStore(storeName2));
            }
            if (boxs) {
                $boxs2.each(function (i) {
                    var $that = $(this),
                        box = boxs[i];
                    if (box && box.height != undefined) {
                        $that.height(box.height);
                    }

                });
            }
        },

        mousedown: function () {

        },

        mousemove: function () {
            resetEditorLayout();
        },

        mouseup: function () {

            var boxs = [],
                boxesHeight = $boxes2.height();

            $boxs2.each(function () {
                var $that = $(this);
                boxs.push({
                    height: ($that.height() / boxesHeight * 100).toFixed(6) + "%"
                });
            });
    
        vs.setStore(storeName2, boxs)

        }
    });

    //重置编辑器布局
    $(window).bind("resize", function () {

        resetEditorLayout();
    })
};





