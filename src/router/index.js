import $ from 'jquery';
import store from 'store';
import vs from '../vs/vs.all';
import config from '../config';
import * as Theme from '../vs/theme';
import { setEditorValueAndRun, clearEditorStore } from '../vs/editor'
import layout from '../components/layout.vue';
import penSettingDialog from '../components/penSettingDialog.vue';






var title = "无标题的";

//转换模式
var convertMode = store.get("vs-convertMode") || "1";

//主题
var theme = Theme.getTheme();

//图片下载格式
var imgExt = store.get("vs-imgExt") || "png";

//父节点class name
var fatherClassName = store.get("vs-fatherClassName") || "brick";

//子节点class name
var sonClassName = store.get("vs-sonClassName") || "div";

//编辑器字体大小
var fontSize = config.editor.fontSize;

//组件
var components = {

    "layout": layout,
    "penSettingDialog": penSettingDialog


};


//数据
var data = {
    version: vs.version,
    convertMode: convertMode,
    theme: theme,
    imgExt: imgExt,
    fatherClassName: fatherClassName,
    sonClassName: sonClassName,
    Title: title,

    CategoryItemsAll: [],
    CategoryItems: [],
    LabelItems: [],
    LabelItemsAll: [],

    Html: "",
    Css: "",
    Js: "",


    isShowBgMask:false,
    isShowSettingBox: false,
    isShowViewBox: false,
    layoutType: "ly1",
    fontSize: fontSize
};

//方法
var methods = {

    //运行缓存
    runByCache: function () {
      

    },

    //下载图片
    downloadImg: function () {

      downloadImg();
    },

    //运行编辑器
    runEditor: function () {

        vs.doRunByEditor({}, true);
    },

    //设置笔记
    settingsPen: function () {

     
    },

    //保存笔记
    savePen: function () {

       
    },

    //新建笔记
    newPen: function () {

     
    },

    //清空笔记
    clearPen: function () {

        store.set("vs-title", "");
        clearEditorStore();
     
        
    },

    //设置笔记分类
    setCategory: function () {


    },

    //设置笔记标签
    setLabel: function () {


    },

    //快速添加引用
    quickAdd: function () {

      

    },

    //快速添加引用
    quickAdd2: function () {


    },

    hideSettingBox: function () {
        this.isShowBgMask = false;
        this.isShowSettingBox = false;
    },

    hideViewBox: function () {
        this.isShowBgMask = false;
        this.isShowViewBox =false;
    },

    showSettingBox: function () {

        this.isShowBgMask = true;
        this.isShowViewBox = true;
    },

    //设置
    setting: function () {

        this.isShowSettingBox = true;
    },

    //隐藏设置
    setttingBoxHide: function () {
      
        this.isShowSettingBox = false;
    },


    testCreate: function () {


    }
   
};



//vue初始化完成绑定事件
var mounted = function () {

    vs.indexVue = this;
    vs.indexVueData = this._data;
    vs.init();
};

//监听
var watch = {

    convertMode: function (val, oval) {
        store.set("vs-convertMode", val)
    },

    Title: function (val, oval) {
        store.set("vs-title", val)

    },
    fatherClassName: function (val, oval) {
        store.set("vs-fatherClassName", val);
    },

    sonClassName: function (val, oval) {
        store.set("vs-sonClassName", val);
    },
    imgExt: function (val, oval) {
        store.set("vs-imgExt", val);
    },

    theme: function (val,oval) {
        Theme.setTheme(val,oval)
    },

    fontSize: function (val, oval) {
   
        Theme.setFontSize(val)
    }
};


//初始化前
var beforeCreate = function () {

    Theme.setConfigByStore();
};


module.exports = {

    data() {
        return data;
    },

    methods: methods,

    watch: watch,

    mounted: function () {

        mounted.call(this)
    },

    //创建前回调函数
    beforeCreate: function () {

        beforeCreate.call(this);

    },

    components: components
};