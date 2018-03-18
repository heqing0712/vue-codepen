
var $ = require("jquery");

    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
            function F() {
            }

            F.prototype = o;
            return new F();
        };
    }



    var NotyObject = {

        init: function (options) {

            // Mix in the passed in options with the default options
            this.options = $.extend({}, $.noty.defaults, options);

            //this.options.layout = (this.options.custom)
            //    ? $.noty.layouts['inline']
            //    : $.noty.layouts[this.options.layout];
            this.options.layout = $.noty.layouts[this.options.layout];
            if ($.noty.themes[this.options.theme])
                this.options.theme = $.noty.themes[this.options.theme];
            else
                options.themeClassName = this.options.theme;

            delete options.layout;
            delete options.theme;

            this.options = $.extend({}, this.options, this.options.layout.options);
            this.options.id = 'noty_' + (new Date().getTime() * Math.floor(Math.random() * 1000000));

            this.options = $.extend({}, this.options, options);

            // Build the noty dom initial structure
            this._build();

            // return this so we can chain/use the bridge with less code.
            return this;
        }, // end init

        _build: function () {

            // Generating noty bar
            var $bar = $('<div class="noty_bar noty_type_' + this.options.type + '"></div>').attr('id', this.options.id);
            $bar.append(this.options.template).find('.noty_text').html(this.options.text);

            this.$bar = (this.options.layout.parent.object !== null) ? $(this.options.layout.parent.object).css(this.options.layout.parent.css).append($bar) : $bar;

            if (this.options.themeClassName)
                this.$bar.addClass(this.options.themeClassName).addClass('noty_container_type_' + this.options.type);

            // Set buttons if available
            if (this.options.buttons) {

                // If we have button disable closeWith & timeout options
                this.options.closeWith = [];
                this.options.timeout = false;

                var $buttons = $('<div/>').addClass('noty_buttons');

                (this.options.layout.parent.object !== null) ? this.$bar.find('.noty_bar').append($buttons) : this.$bar.append($buttons);

                var self = this;

                $.each(this.options.buttons, function (i, button) {
                    var $button = $('<button/>').addClass((button.addClass) ? button.addClass : 'gray').html(button.text).attr('id', button.id ? button.id : 'button-' + i)
                        .appendTo(self.$bar.find('.noty_buttons'))
                        .bind('click', function () {
                            if ($.isFunction(button.onClick)) {
                                button.onClick.call($button, self);
                            }
                        });
                });
            }

            // For easy access
            this.$message = this.$bar.find('.noty_message');
            this.$closeButton = this.$bar.find('.noty_close');
            this.$buttons = this.$bar.find('.noty_buttons');

            $.noty.store[this.options.id] = this; // store noty for api

        }, // end _build

        show: function () {

            var $sl,
                self = this,
                opt = self.options,
                sl = opt.layout.container.selector;
            $sl = opt.custom ? opt.custom.find(sl) : $(sl);
            $sl.append(self.$bar);

            if (opt.theme && opt.theme.style)
                opt.theme.style.apply(self);

            ($.type(opt.layout.css) === 'function') ? this.options.layout.css.apply(self.$bar) : self.$bar.css(this.options.layout.css || {});

            self.$bar.addClass(opt.layout.addClass);

            self.options.layout.container.style.apply($sl);

            if (!self.hasBindResize) {
                $(window).resize(function () {
                    self.options.layout.container.style.apply($sl);
                })
                self.hasBindResize = true;
            }

            self.showing = true;

            if (self.options.theme && self.options.theme.style)
                self.options.theme.callback.onShow.apply(this);

            if ($.inArray('click', self.options.closeWith) > -1)
                self.$bar.css('cursor', 'pointer').one('click', function (evt) {
                    self.stopPropagation(evt);
                    if (self.options.callback.onCloseClick) {
                        self.options.callback.onCloseClick.apply(self);
                    }
                    self.close();
                });

            if ($.inArray('hover', self.options.closeWith) > -1)
                self.$bar.one('mouseenter', function () {
                    self.close();
                });

            if ($.inArray('button', self.options.closeWith) > -1)
                self.$closeButton.one('click', function (evt) {
                    self.stopPropagation(evt);
                    self.close();
                });

            if ($.inArray('button', self.options.closeWith) == -1)
                self.$closeButton.remove();

            if (self.options.callback.onShow)
                self.options.callback.onShow.apply(self);

            self.$bar.animate(
                self.options.animation.open,
                self.options.animation.speed,
                self.options.animation.easing,
                function () {
                    if (self.options.callback.afterShow) self.options.callback.afterShow.apply(self);
                    self.showing = false;
                    self.shown = true;


                });

            // If noty is have a timeout option
            if (self.options.timeout)
                self.$bar.delay(self.options.timeout).promise().done(function () {
                    self.close();
                });

            return this;

        }, // end show

        close: function () {

            this.showing = false;
            this.shown = true;

            if (this.closed) return;
            if (this.$bar && this.$bar.hasClass('i-am-closing-now')) return;

            var self = this;

            if (this.showing) {

                self.$bar.queue(

                    function () {

                        self.close.apply(self);
                    }
                )

                return;
            }

            if (!this.shown && !this.showing) { // If we are still waiting in the queue just delete from queue
                var queue = [];
                $.each($.noty.queue, function (i, n) {
                    if (n.options.id != self.options.id) {
                        queue.push(n);
                    }
                });
                $.noty.queue = queue;
                return;
            }

            self.$bar.addClass('i-am-closing-now');

            if (self.options.callback.onClose) {
                self.options.callback.onClose.apply(self);
            }

            self.$bar.clearQueue().stop().animate(
                self.options.animation.close,
                self.options.animation.speed,
                self.options.animation.easing,
                function () {
                    if (self.options.callback.afterClose) self.options.callback.afterClose.apply(self);
                })
                .promise().done(function () {

                    // Modal Cleaning
                    if (self.options.modal) {
                        $.notyRenderer.setModalCount(-1);
                        if ($.notyRenderer.getModalCount() == 0) $('.noty_modal').fadeOut('fast', function () {
                            $(this).remove();
                        });
                    }

                    // Layout Cleaning
                    $.notyRenderer.setLayoutCountFor(self, -1);
                    if ($.notyRenderer.getLayoutCountFor(self) == 0) $(self.options.layout.container.selector).remove();

                    // Make sure self.$bar has not been removed before attempting to remove it
                    if (typeof self.$bar !== 'undefined' && self.$bar !== null) {
                        self.$bar.remove();
                        self.$bar = null;
                        self.closed = true;
                    }

                    delete $.noty.store[self.options.id]; // deleting noty from store

                    if (self.options.theme.callback && self.options.theme.callback.onClose) {
                        self.options.theme.callback.onClose.apply(self);
                    }

                    if (!self.options.dismissQueue) {
                        // Queue render
                        $.noty.ontap = true;

                        $.notyRenderer.render();
                    }

                    if (self.options.maxVisible > 0 && self.options.dismissQueue) {
                        $.notyRenderer.render();
                    }
                })



        }, // end close

        setText: function (text) {
            if (!this.closed) {
                this.options.text = text;
                this.$bar.find('.noty_text').html(text);
            }
            return this;
        },

        setType: function (type) {
            if (!this.closed) {
                this.options.type = type;
                this.options.theme.style.apply(this);
                this.options.theme.callback.onShow.apply(this);
            }
            return this;
        },

        setTimeout: function (time) {
            if (!this.closed) {
                var self = this;
                this.options.timeout = time;
                self.$bar.delay(self.options.timeout).promise().done(function () {
                    self.close();
                });
            }
            return this;
        },

        stopPropagation: function (evt) {
            evt = evt || window.event;
            if (typeof evt.stopPropagation !== "undefined") {
                evt.stopPropagation();
            } else {
                evt.cancelBubble = true;
            }
        },

        closed: false,

        showing: false,

        shown: false

    }; // end NotyObject



    $.notyRenderer = {};

    $.notyRenderer.init = function (options) {

        // Renderer creates a new noty
        var notification = Object.create(NotyObject).init(options);

        if (notification.options.killer)
            $.noty.closeAll();

        (notification.options.force) ? $.noty.queue.unshift(notification) : $.noty.queue.push(notification);

        $.notyRenderer.render();

        return ($.noty.returns == 'object') ? notification : notification.options.id;
    };

    $.notyRenderer.render = function () {

        var instance = $.noty.queue[0];

        if ($.type(instance) === 'object') {
            if (instance.options.dismissQueue) {
                if (instance.options.maxVisible > 0) {
                    if ($(instance.options.layout.container.selector + ' li').length < instance.options.maxVisible) {
                        $.notyRenderer.show($.noty.queue.shift());
                    } else {

                    }
                } else {
                    $.notyRenderer.show($.noty.queue.shift());
                }
            } else {
                if ($.noty.ontap) {
                    $.notyRenderer.show($.noty.queue.shift());
                    $.noty.ontap = false;
                }
            }
        } else {
            $.noty.ontap = true; // Queue is over
        }

    };

    $.notyRenderer.show = function (notification) {
        var npt = notification.options;

        if (npt.modal) {
            $.notyRenderer.createModalFor(notification);
            $.notyRenderer.setModalCount(+1);
        }

        // Where is the container?
        if (npt.custom) {
            if (npt.custom.find(npt.layout.container.selector).length == 0) {
                npt.custom.append($(npt.layout.container.object).addClass('i-am-new'));
            } else {
                npt.custom.find(npt.layout.container.selector).removeClass('i-am-new');
            }
        } else {
            if ($(npt.layout.container.selector).length == 0) {

                $('body').append($(npt.layout.container.object).addClass('i-am-new'));

            } else {
                $(npt.layout.container.selector).removeClass('i-am-new');
            }
        }

        $.notyRenderer.setLayoutCountFor(notification, +1);

        notification.show();
    };

    $.notyRenderer.createModalFor = function (notification) {
        if ($('.noty_modal').length == 0) {
            var modal = $('<div/>').addClass('noty_modal').addClass(notification.options.theme).data('noty_modal_count', 0);

            if (notification.options.theme.modal && notification.options.theme.modal.css)
                modal.css(notification.options.theme.modal.css);

            modal.prependTo($('body')).fadeIn('fast');
        }
    };

    $.notyRenderer.getLayoutCountFor = function (notification) {
        return $(notification.options.layout.container.selector).data('noty_layout_count') || 0;
    };

    $.notyRenderer.setLayoutCountFor = function (notification, arg) {
        return $(notification.options.layout.container.selector).data('noty_layout_count', $.notyRenderer.getLayoutCountFor(notification) + arg);
    };

    $.notyRenderer.getModalCount = function () {
        return $('.noty_modal').data('noty_modal_count') || 0;
    };

    $.notyRenderer.setModalCount = function (arg) {
        return $('.noty_modal').data('noty_modal_count', $.notyRenderer.getModalCount() + arg);
    };

    // This is for custom container
    $.fn.noty = function (options) {
        options.custom = $(this);
        return $.notyRenderer.init(options);
    };

    $.noty = {};
    $.noty.queue = [];
    $.noty.ontap = true;
    $.noty.layouts = {};
    $.noty.themes = {};
    $.noty.returns = 'object';
    $.noty.store = {};

    $.noty.get = function (id) {
        return $.noty.store.hasOwnProperty(id) ? $.noty.store[id] : false;
    };

    $.noty.close = function (id) {
        return $.noty.get(id) ? $.noty.get(id).close() : false;
    };

    $.noty.setText = function (id, text) {
        return $.noty.get(id) ? $.noty.get(id).setText(text) : false;
    };

    $.noty.setType = function (id, type) {
        return $.noty.get(id) ? $.noty.get(id).setType(type) : false;
    };

    $.noty.clearQueue = function () {
        $.noty.queue = [];
    };

    $.noty.closeAll = function () {
        $.noty.clearQueue();
        $.each($.noty.store, function (id, noty) {
            noty.close();
        });
    };

    var windowAlert = window.alert;

    $.noty.consumeAlert = function (options) {
        window.alert = function (text) {
            if (options)
                options.text = text;
            else
                options = { text: text };

            $.notyRenderer.init(options);
        };
    };

    $.noty.stopConsumeAlert = function () {
        window.alert = windowAlert;
    };

    //$(window).resize(function () {
    //    $.each($.noty.layouts, function (index, layout) {
    //        layout.container.style.apply($(layout.container.selector));
    //    });
    //});

    $.noty.defaults = {
        layout: 'top',
        theme: 'defaultTheme',
        type: 'alert',
        text: '',
        dismissQueue: true,
        template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
        animation: {
            open: { height: 'toggle' },
            close: { height: 'toggle' },
            easing: 'swing',
            speed: 500
        },
        timeout: false,
        force: false,
        modal: false,
        maxVisible: 5,
        killer: false,
        closeWith: ['click'],
        callback: {
            onShow: function () {
            },
            afterShow: function () {
            },
            onClose: function () {
            },
            afterClose: function () {
            },
            onCloseClick: function () {
            }
        },
        buttons: false
    };




    // Helpers
    window.noty = function noty(options) {

        return $.notyRenderer.init(options);
    };




    //set noty theme
    $.noty.layouts.topCenter = {
        name: 'topCenter',
        options: { // overrides options

        },
        container: {
            object: '<ul id="noty_topCenter_layout_container" />',
            selector: 'ul#noty_topCenter_layout_container',
            style: function () {
                $(this).css({
                    top: 25,
                    left: 0,
                    position: 'fixed',
                    width: '240px',
                    height: 'auto',
                    margin: 0,
                    padding: 0,
                    listStyleType: 'none',
                    zIndex: 10000000
                });

                $(this).css({
                    left: ($(top.window).width() - $(this).outerWidth(false)) / 2 + 'px'
                });
            }
        },
        parent: {
            object: '<li />',
            selector: 'li',
            css: {}
        },
        css: {
            display: 'none'

        },
        addClass: ''
    };

    $.noty.themes.defaultTheme = {
        name: 'defaultTheme',
        helpers: {
            borderFix: function () {
                if (this.options.dismissQueue) {
                    var selector = this.options.layout.container.selector + ' ' + this.options.layout.parent.selector;
                    switch (this.options.layout.name) {
                        case 'top':
                            $(selector).css({
                                borderRadius:
                                '0px 0px 0px 0px'
                            });
                            $(selector).last().css({
                                borderRadius:
                                '0px 0px 2px 2px'
                            });
                            break;
                        case 'topCenter':
                        case 'topLeft':
                        case 'topRight':
                        case 'bottomCenter':
                        case 'bottomLeft':
                        case 'bottomRight':
                        case 'center':
                        case 'centerLeft':
                        case 'centerRight':
                        case 'inline':
                            $(selector).css({
                                borderRadius:
                                '0px 0px 0px 0px'
                            });
                            $(selector).first().css({
                                'border-top-left-radius': '3px',
                                'border-top-right-radius': '3px'
                            });
                            $(selector).last().css({
                                'border-bottom-left-radius': '3px',
                                'border-bottom-right-radius': '3px'
                            });
                            break;
                        case 'bottom':
                            $(selector).css({
                                borderRadius:
                                '0px 0px 0px 0px'
                            });
                            $(selector).first().css({
                                borderRadius:
                                '2px 2px 0px 0px'
                            });
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        modal: {
            css: {
                position: 'fixed',
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                zIndex: 15000,
                opacity: 0.6,
                display: 'none',
                left: 0,
                top: 0
            }
        },
        style: function () {
            this.$bar.css({
                overflow: 'hidden',
                background: "#fff"
            });

            this.$message.css({
                fontSize: '16px',
                "font-family": "Microsoft YaHei",
                lineHeight: '16px',
                textAlign: 'center',
                padding: '5px 30px 5px',
                width: 'auto',
                position: 'relative'
            });

            this.$closeButton.css({
                position: 'absolute',
                top: 4,
                right: 4,
                width: 10,
                height: 10,
                background: "#fff",
                display: 'none',
                cursor: 'pointer'
            });
            this.$buttons.css({
                padding: 5,
                textAlign: 'right',
                borderTop: '1px solid #ccc',
                backgroundColor: '#fff'
            });
            this.$buttons.find('button').css({
                marginLeft: 5
            });
            this.$buttons.find('button:first').css({
                marginLeft: 0
            });
            this.$bar.bind({
                mouseenter: function () {
                    $(this).find('.noty_close').stop().fadeTo('normal', 1);
                },
                mouseleave: function () {
                    $(this).find('.noty_close').stop().fadeTo('normal', 0);
                }
            });
            switch (this.options.layout.name) {
                case 'top':
                    this.$bar.css({
                        borderRadius:
                        '0',
                        border: '1px solid #eee',
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    break;
                case 'topCenter':
                case 'center':
                case 'bottomCenter':
                case 'inline':
                    this.$bar.css({
                        borderRadius:
                        '3px',
                        border: '1px solid #eee',
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    this.$message.css({

                        textAlign: 'center'
                    });
                    break;
                case 'topLeft':
                case 'topRight':
                case 'bottomLeft':
                case 'bottomRight':
                case 'centerLeft':
                case 'centerRight':
                    this.$bar.css({
                        borderRadius:
                        '3px',
                        border: '1px solid #eee',
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    this.$message.css({

                        textAlign: 'left'
                    });
                    break;
                case 'bottom':
                    this.$bar.css({
                        borderRadius:
                        '2px 2px 0px 0px',
                        borderTop: '2px solid #eee',
                        borderLeft: '2px solid #eee',
                        borderRight: '2px solid #eee',
                        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    break;
                default:
                    this.$bar.css({
                        border:
                        '2px solid #eee',
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    break;
            }
            switch (this.options.type) {
                case 'alert':
                case 'notification':
                    this.$bar.css({
                        backgroundColor:
                        '#FFF',
                        borderColor: '#CCC',
                        color: '#444'
                    });
                    break;
                case 'warning':
                    /* 'text-shadow': '0 1px 0 rgba(255, 255, 255, 0.41)'*/
                    this.$bar.css({
                        backgroundColor:
                        '#FAA732',
                        borderColor: '#D79604',
                        color: '#4D3503'

                    });
                    this.$buttons.css({
                        borderTop: '1px solid #FFC237'
                    });
                    break;
                case 'error':
                    this.$bar.css({
                        backgroundColor:
                        '#d2322d',
                        borderColor: '#B5201B',
                        color: '#FFF'
                    });
                    //background-color: #d2322d;
                    // border-color: #ac2925;
                    this.$message.css({
                        fontWeight: 'bold'
                    });
                    this.$buttons.css({
                        borderTop: '1px solid darkred'
                    });
                    break;
                case 'information':
                    this.$bar.css({
                        backgroundColor:
                        '#3993C6',
                        borderColor: '#0B7299',
                        color: '#FFF'
                    });
                    this.$buttons.css({
                        borderTop: '1px solid #0B90C4'
                    });
                    break;
                case 'success':
                    //background-color: #47a447;
                    //border-color: #398439;
                    //'text-shadow': '0 1px 0 rgba(0, 0, 0, 0.44)'
                    this.$bar.css({
                        backgroundColor:
                        ' #78C805',
                        borderColor: '#6BAB0E',
                        color: '#fff'

                    });
                    this.$buttons.css({
                        borderTop: '1px solid #50C24E'
                    });
                    break;
                default:
                    this.$bar.css({
                        backgroundColor:
                        '#FFF',
                        borderColor: '#CCC',
                        color: '#444'
                    });
                    break;
            }
        },
        callback: {
            onShow: function () {
                $.noty.themes.defaultTheme.helpers.borderFix.apply(this);
            },
            onClose: function () {
                $.noty.themes.defaultTheme.helpers.borderFix.apply(this);
            }
        }
    };

    module.exports = noty;