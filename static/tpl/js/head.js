(function () {
    var list;
    var datas = window.top.datas;
    var editorData = window.top.eidtorDatas;
    var cssBases = [
        "",
        "https://necolas.github.io/normalize.css/7.0.0/normalize.css",
        "http://meyerweb.com/eric/tools/css/reset/reset200802.css"
    ];

    if (datas.HtmlClassName) {
       
        document.getElementsByTagName("html")[0].className = datas.HtmlClassName;
    }

    if (datas.HtmlHeadStuff) {
        document.write(datas.HtmlHeadStuff);
    }

    if (datas.cssBase && cssBase[datas.cssBase]) {

        document.write("<link href=\"" + cssBases[datas.cssBase] + "\" rel=\"stylesheet\" />");
    }


    document.write(" <style id=\"vscss\" type=\"text/css\">" + editorData.Css + "</style>");

    if (datas.CssExternal) {
        list = datas.CssExternal.split("\n");
        for (var i = 0; i < list.length; i++) {
            document.write("<link href=\"" + list[i] + "\" rel=\"stylesheet\" />");
        }
    }

    if (datas.JsExternal) {
  
        list = datas.JsExternal.split("\n");
        for (var i = 0; i < list.length; i++) {
            document.write("<script src=\"" + list[i] + "\" type=\"text/javascript\" ><\/script>");
        }

    }

}());