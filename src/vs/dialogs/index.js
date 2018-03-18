
import vs from '../core';
import $ from 'jquery';
import dialog from 'dialog';

export function bindPageDialog() {

    var indexVue = vs.indexVue;

    $(document).bind("click", function (e) {

        var $target;

        if (indexVue.isShowViewBox) {

            $target = $(e.target);

            if (!$target.closest("#view-box").length &&
                !$target.hasClass("view-btn")) {
                indexVue.hideViewBox();
            }
        }
    })
};


