import $ from 'jquery';
import store from 'store';
import vs from '../core';
import * as editor from '../editor';
import AMDLoader from '../common/AMDLoader';
import {bindPageDialog} from '../dialogs';

vs.init = function () {

    //页面弹窗事件
    bindPageDialog();

    //页面编辑器布局事件
    editor.bindLayout();

    //AMD 模块化js载入后在绑定的事件
    AMDLoader(function () {

        //绑定AMD模式下的jquery
        window.define('jquery', function () {
            return $;
        })

        editor.bindEditor();
      
    });

};