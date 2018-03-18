
(function () {

    var datas = window.top.datas;
    var editorData = window.top.eidtorDatas;

    if (editorData.Html) {
        document.write(editorData.Html);
    }

    if (datas.Js) {
        document.write("<script type='text/javascript'>" + datas.Js + "<\/script>");
    }



}());