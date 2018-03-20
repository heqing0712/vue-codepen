import store from 'store';
var config = {};
var storeToken = "vs-";

config.staticPath = "./static/";

//为了发布到 github 可以预览打包的路径
//config.staticPath = "./dist/static/";

config.storeToken = storeToken;

//Vs Editor Url
config.vsEditorUrl = 'https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.10.1/min';


//loaderJs config
config.requireJsConfig = {

    baseUrl:config.staticPath,

    paths: {
        vs: config.vsEditorUrl + '/vs'
    },

    'vs/nls': {
        availableLanguages: {
            '*': 'zh-cn'
        }
    }
};

//loader JS url
config.loaderJsUrl = `${config.requireJsConfig.paths.vs}/loader.js`;

//requirejs
config.requireJsUrl = 'https://cdn.bootcss.com/require.js/2.3.5/require.min.js';

//编辑器配置
config.editor = {
    fontFamily: 'Monoid,Droid Sans Mono,"Microsoft YaHei",Helvetia,"lucida Grande",Verdana,Arial',
    fontSize: 20,
    theme: "vs" //vs-dark
};

//主题配置
config.themes = {

   "theme-gray":{
       "theme":"vs"
   },
   "theme-black":{
       "theme":"vs-dark"
   },
   "theme-blue":{
       "theme":"vs"
   }
};

//默认主题
config.defaultTheme =  "theme-blue";



//上传配置
config.upload = {
    serverUrl: "/cdn/common/ueditor/net/controller.ashx?action=uploadpsd&fileFieldName=file&psd=true&t=",
    webuploaderUrl: "libs/webuploader/webuploader.html5only"
};

//下载配置
config.download = {
 BLOB_URL : "libs/download/Blob",
 FILESAVER_URL : "libs/download/FileSaver",
 JSZIP :  "libs/download/jszip.min"
};


module.exports = config;