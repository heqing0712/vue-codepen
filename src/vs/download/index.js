
import vs from '../core';
import $ from 'jquery';
import config from '../../config'
var downloadConfig = config.download;

var BLOB_URL = downloadConfig .BLOB_URL;
var FILESAVER_URL = downloadConfig .FILESAVER_UR;
var JSZIP = downloadConfig.JSZIP;



/**
 * 通过图片路径和高宽和获取canvas
 * @param {object} 图片 jquery 对象
 */
function getImgCanvas($img) {

    var cavs = document.createElement("canvas");
    var ctx = cavs.getContext("2d");
    var width = $img.width();
    var height = $img.height();
    cavs.width = width;
    cavs.height = height;
    ctx.drawImage($img.get(0), 0, 0, width, height);

    return c;
}

/**
 * 输出压缩包
 * @param {string} 压缩包名称
 * @param {function} 压缩函数
 */
function exportZip(projectName, addZipFn) {

    var zip, content;

    if (!JSZip.support.blob) {
        console.log("Your Browser didn't support One Key Export, pleace use Firefox or Chrome Browser");
        return;
    }

    zip = new JSZip();
    addZipFn(zip);
    content = zip.generate({
        type: "blob"
    });

    if (projectName.length == 0) {
        projectName = "myproject";
    }

    window.saveAs(content, projectName + ".zip");

    return true;
}



/**
 * 下载图片
 * @param {string} 压缩包名称
 * @param {function} 图片 jquery 对象
 */
function _donwloadImg (projectName, $imgs) {


    if (!$imgs || !$imgs.length) {
        return;
    }

    exportZip(projectName, function (zip) {

        $imgs.each(function () {
            var imgData;
            var $that = $(this);
            var width = $that.width();
            var height = $that.height();
            var src = $that.attr("src").split('?')[0];
            var ext = src.split(".").pop().toLowerCase();
            var name = $that.data("name") || src.split("/").pop();
            var canvas = getImgCanvas($that);
            var zipVal = ext == "png" ? 0.92 : 0.95;

            if (ext == "jpg") {
                ext = "jpeg";
            }

            imgData = canvas.toDataURL("image/" + ext, zipVal).split(',')[1];

            zip.file(name, imgData, {
                base64: true
            });
        });

    });
}


/*
* 下载图片
*/
export function downloadImg() {
    var $floors;
    var $iframeBody = vs.$iframeBody;

    if ($iframeBody && $iframeBody.length){
        $floors = $iframeBody.find(".floor");
    }


    //获取 楼层序号
    var getFloorNum = function (classs) {
        var floorNum;
        var classA = classs.split(" ");
        classA.forEach(function (cls) {
            if (floorNum) return;
            if (/[a-zA-Z]+(\d+)$/.test(cls)) {
                var num = cls.replace(/[a-zA-Z]/g, "");
                if (num) floorNum = num;
            }
        });

        return floorNum || 1;
    };


    if ($floors && $floors.length) {

        $floors.each(function () {
            var $floor = $(this);
            var floorNum = getFloorNum($floor.attr("class"));
            var $imgs = $floor.find(".brick img");
            var imgn = "c" + floorNum + "_";
            $imgs.each(function (i) {
                var $img = $(this);
                var ext = $img.attr("src").split(".").pop();
                var num = i + 1;
                var name = imgn;
                name += (num < 10 ? "0" + num : num);
                name += "." + ext;
                $img.data("name", name);
            });
        });
    }

    if ($iframeBody && $iframeBody.length) {

        var $imgs = $iframeBody.find("img");

        if ($imgs.length) {
            _downloadImg("img", $imgs);
        }
    }
   
    

}



//绑定下载图片
export function bindDownload () {

    window.require([BLOB_URL, FILESAVER_URL, JSZIP], function (Blob, FileSaver, JSZip) {

        window.JSZip = JSZip;
      
    })

};