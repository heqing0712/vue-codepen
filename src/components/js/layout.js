import $ from 'jquery';
import store from 'store';
import vs from '../../vs/core';
import { bindLayoutChange, getLayoutType} from '../../vs/editor'
import * as dialogs from '../../vs/dialogs'
import { tab } from '../../vs/plugins';
import Dialog from 'dialog'

var settingDialog;
var layoutType = getLayoutType();

function showPenSettingDialog(fn) {

    var that = this;
    var settings = $("#form-settings").serializeArray();

    if (!settingDialog) {
      
        settingDialog = Dialog({

            title: "笔记设置",
            width: 700,
            height: 350,
            content: $("#pen-settings"),
            lock: true,
            padding: "20px 30px ",
            className: "dialog-settings",
            showClassName:"dialog-show",
            ok: function () {

                //判断设置是否变更 而是否需要更新编辑器内容
                var newSettings = $("#form-settings").serializeArray();

                for (var o in settings) {
                    if (settings[o].value != newSettings[o].value) {
                        vs.doRunByEditor(null, true);
                        break;
                    }
                }

                ////选择的标签
                //VueData.CategoryItems = getSelecedTag(VueData.CategoryItemsAll);

                ////选择的标签
                //VueData.LabelItems = getSelecedTag(VueData.LabelItemsAll);

                settingDialog.hide();

                return false;
            },

            close: function () {

                settingDialog.hide();
                return false;
            }
        });

        //选项卡
        tab({
            navs: $("#pen-settings .tab-menus a"),
            cts: $("#pen-settings .tab-ct"),
            activeCls: "active",
            startIndex: 0,
            clickFn: function (index) {
                //store.set("startIndex", index)
            }
        });
    } else {
        settingDialog.show();
    }

    fn();
}

function layoutChangeEvents() {

    var that = this;
    //动态条件模板 vue事件绑定有BUG 暂用jquery来绑定
    $(".setting-nub").on("click", function (e) {
        //console.log(e);
        that.penSetting($(this).data('type'), e);
    })
}


module.exports = {


    data() {

        return {
          
            layoutType: layoutType,
            domChangeFns: {
                finish: function () {
                    layoutChangeEvents.call(this);
                },
                layoutTypeChange:null           
            }
        }
    },

    methods: {

        test: function () {
          
        },

        penSetting: function (actionType,event) {
            var setType = "html";
     
            if (typeof actionType!='string'){
                event = actionType;
            }

            var $set = $(event.target);
             
            if ('html css js'.indexOf(actionType) > -1) {
                setType = actionType;
            } else if (actionType == 'tab') {

                setType = $set.closest('.tab-menus').find('.active').text();
                setType = $.trim(setType).toLowerCase();
                if (setType == 'result') {
                    setType = 'html';
                }
            }
           
            setType = $.trim(setType).toLowerCase();

            showPenSettingDialog.call(this,() => {
                $("#" + setType + "-menu").trigger("click");
            });
           
        }


    },

    watch: {

        layoutType: function (val) {

            var that = this;
            this.$nextTick(()=>{
                var domChangeFns = that.domChangeFns;
                for (var o in domChangeFns) {
                    if (typeof domChangeFns[o] === "function") {
                        domChangeFns[o].call(this);
                    }
                }
            });
           
        }
    },

    created() {
        //console.log("has created");
        var that = this;
    },
    mounted() {

        var that = this;
        vs.layoutVue = this;
        bindLayoutChange();
        //console.log("has mouted.");

        layoutChangeEvents.call(this);

    }
}