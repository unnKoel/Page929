/**
 * Created by common on 2015/11/30.
 */
define(function (require) {
    var $ = require('../lib/jquery-1.11.2.min'),
        affirm_dialog = function () {
            this.html = require('./lab_affirm_dialog.html');
            this.css = require('./lab_affirm_dialog.css');
            this.affirm_dialog = !1;
        };

    /**
     * 绘制确认框
     * @param container
     * @returns {prompt_dialog}
     */
    affirm_dialog.prototype.drew = function (container) {
        var dialog = require("../comp/dialog");
        $(container).append(this.html);
        var affirm_dialog = $('.affirm');
        affirm_dialog.css('left', ($(container).width() - affirm_dialog.width()) / 2);
        this.affirm_dialog = new dialog().init(".affirm", $(container));
        return this;
    };

    /**
     * 确认框打开
     * @param msg
     * @returns {affirm_dialog}
     */
    affirm_dialog.prototype.open = function (msg, sureCallback) {
        var self = this;
        $('.affirm .word').html(msg),
            $('.affirm .sure').on('click', function () {
                sureCallback();
                self.affirm_dialog.close();
            }),
            $('.affirm .cancel').on('click', function () {
                $('.affirm .ks-overlay-close').click();
            });
        self.affirm_dialog.open();
        return this;
    };

    return affirm_dialog;
});
