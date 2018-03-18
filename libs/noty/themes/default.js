//set noty layout
; (function ($) {
    $.noty.layouts.top = {
        name: 'top',
        options: {},
        container: {
            object: '<ul id="noty_top_layout_container"/>',
            selector: 'ul#noty_top_layout_container',
            style: function () {
                $(this).css({
                    top: 20,
                    left: '5%',
                    position: 'fixed',
                    width: '40%',
                    height: 'auto',
                    margin: 0,
                    padding: 0,
                    minWidth: '300px',
                    boxShadow: '0px 1px 5px rgba(0,0,0,0.1)',
                    listStyleType: 'none',
                    zIndex: 9999999
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


    $.noty.layouts.topCenter = {
        name: 'topCenter',
        options: { // overrides options

        },
        container: {
            object: '<ul id="noty_topCenter_layout_container" />',
            selector: 'ul#noty_topCenter_layout_container',
            style: function () {
                $(this).css({
                    top: 20,
                    left: 0,
                    position: 'fixed',
                    width: '310px',
                    height: 'auto',
                    margin: 0,
                    padding: 0,
                    listStyleType: 'none',
                    zIndex: 10000000
                });

                $(this).css({
                    left: ($(window).width() - $(this).outerWidth(false)) / 2 + 'px'
                });
            }
        },
        parent: {
            object: '<li />',
            selector: 'li',
            css: {}
        },
        css: {
            display: 'none',
            width: '310px'
        },
        addClass: ''
    };

})(jQuery);

//set noty theme
; (function ($) {
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
                                'border-top-left-radius':
                                '2px',
                                'border-top-right-radius': '2px'
                            });
                            $(selector).last().css({
                                'border-bottom-left-radius': '2px',
                                'border-bottom-right-radius': '2px'
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
                fontSize: '13px',
                lineHeight: '16px',
                textAlign: 'center',
                padding: '8px 10px 9px',
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
                        '2px',
                        border: '1px solid #eee',
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    this.$message.css({
                        fontSize: '13px',
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
                        '2px',
                        border: '1px solid #eee',
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    this.$message.css({
                        fontSize: '13px',
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
                    this.$bar.css({
                        backgroundColor:
                        '#FAA732',
                        borderColor: 'rgb(95, 66, 0)',
                        color: 'rgb(77, 53, 3)',
                        'text-shadow': '0 1px 0 rgba(255, 255, 255, 0.41)'
                    });
                    this.$buttons.css({
                        borderTop: '1px solid #FFC237'
                    });
                    break;
                case 'error':
                    this.$bar.css({
                        backgroundColor:
                        '#d2322d',
                        borderColor: '#ac2925',
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
                        borderColor: 'rgb(8, 76, 102)',
                        color: '#FFF'
                    });
                    this.$buttons.css({
                        borderTop: '1px solid #0B90C4'
                    });
                    break;
                case 'success':
                    //background-color: #47a447;
                    //border-color: #398439;
                    this.$bar.css({
                        backgroundColor:
                        ' #47a447',
                        borderColor: '#398439',
                        color: '#fff',
                        'text-shadow': '0 1px 0 rgba(0, 0, 0, 0.44)'
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
})(jQuery);