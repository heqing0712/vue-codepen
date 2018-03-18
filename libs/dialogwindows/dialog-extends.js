/*!
*------------------------------------------------
* 对话框其它功能扩展模块（可选外置模块）
*------------------------------------------------
*/
; (function ($, dialog, undefined) {

    var _zIndex = function () {
        return dialog.setting.zIndex;
    };

    /**
    * 警告
    * @param	{String}	消息内容
    */
    dialog.alert = function (content, callback, parent) {
        return dialog({
            title: '警告',
            id: 'Alert',
            zIndex: _zIndex() + 10,
            icon: 'alert.gif',
            fixed: true,
            lock: true,
            content: content,
            ok: true,
            resize: false,
            close: callback,
            parent: parent || null
        });
    };


    /**
   * 警告
   * @param	{String}	消息内容
   */
    dialog.alertx = function (content, time, callback, parent) {
        time = time || 2;
        return dialog({
            title: '警告',
            id: 'Alert',
            zIndex: _zIndex() + 10,
            icon: 'alert.gif',
            fixed: true,
            lock: true,
            content: content,
            ok: true,
            resize: false,
            time: time,
            close: callback,
            parent: parent || null
        });
    };


    /**
    * 确认
    * @param	{String}	消息内容
    * @param	{Function}	确定按钮回调函数
    * @param	{Function}	取消按钮回调函数
    */
    dialog.confirm = function (content, yes, no, parent) {

        return dialog({
            title: '确认',
            id: 'confirm.gif',
            zIndex: _zIndex() + 10,
            icon: 'confirm.gif',
            fixed: true,
            lock: true,
            content: content,
            resize: false,
            parent: parent || null,
            ok: function (here) {
                return yes.call(this, here);
            },
            cancel: function (here) {
                return no && no.call(this, here);
            }
        });
    };



    /**
    * 提问
    * @param	{String}	提问内容
    * @param	{Function}	回调函数. 接收参数：输入值
    * @param	{String}	默认值
    */
    dialog.prompt = function (content, yes, value, parent) {
        value = value || '';
        var input;

        return dialog({
            title: '提问',
            id: 'Prompt',
            zIndex: _zIndex(),
            icon: 'prompt.gif',
            fixed: true,
            lock: true,
            parent: parent || null,
            content: [
                '<div style="margin-bottom:5px;font-size:12px">',
                content,
                '</div>',
                '<div>',
                '<input value="',
                value,
                '" style="width:18em;padding:6px 4px" />',
                '</div>'
            ].join(''),
            init: function () {
                input = this.DOM.content[0].getElementsByTagName('input')[0];
                input.select();
                input.focus();
            },
            ok: function (here) {
                return yes && yes.call(this, input.value, here);
            },
            cancel: true
        });
    };

    /**
    * 短暂提示
    * @param	{String}	提示内容
    * @param   {Number}    显示时间 (默认1.5秒)
    * @param	{String}	提示图标 (注意要加扩展名)
    * @param   {Function}  提示关闭时执行的回调函数
    */
    dialog.tips = function (content, time, icon, callback) {

        var reIcon = icon ? function () {
            this.DOM.icon[0].innerHTML = '<img src="' + this.config.path + 'skins/icons/' + icon + '" class="ui_icon_bg"/>';
            this.DOM.icon[0].style.display = '';
            if (callback) this.config.close = callback;
        } : function () {
            this.DOM.icon[0].style.display = 'none';
            if (callback) this.config.close = callback;
        };

        return dialog({
            id: 'Tips',
            zIndex: _zIndex(),
            title: false,
            cancel: false,
            fixed: true,
            lock: false,
            resize: false
        })
            .content(content)
            .time(time || 1.5, reIcon);
    };

    // $.dialog = dialog = dialog;

})(this.jQuery || this.dialog);