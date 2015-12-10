/**
 * Created by common on 2015/11/30.
 */
define(function (require) {
    var $ = require('../lib/jquery-1.11.2'),
        affirm_dialog = function () {
            this.html = require('./lab_affirm_dialog.html');
            this.css = require('./lab_affirm_dialog.css');
            this.interactComs = {};
            this.top_ele = !1;
            this.affirm_dialog = !1;
        };

    /**
     * 绘制确认框
     * @param container
     * @returns {prompt_dialog}
     */
    affirm_dialog.prototype.drew = function (container) {
        var dialog = require("../com/dialog");
        $(container).append(this.html);
        var affirm_dialog = this.top_ele = $('#page929_affirm');
        affirm_dialog.css('left', ($(container).width() - affirm_dialog.width()) / 2);
        this.affirm_dialog = new dialog().init("#page929_affirm", $(container));
        return this;
    };

    /**
     * 设置交互组件
     */
    affirm_dialog.prototype.setInteractComs = function (interactComs) {
        this.interactComs = interactComs;
    };

    /**
     * 确认框打开
     * @param msg
     * @returns {affirm_dialog}
     */
    affirm_dialog.prototype.open = function (msg, sureCallback) {
        var self = this;
        self.top_ele.find('.word').html(msg),
            self.top_ele.find('.sure').on('click', function () {
                sureCallback();
                self.affirm_dialog.close();
            }),
            self.top_ele.find('.cancel').on('click', function () {
                self.top_ele.find('.ks-overlay-close').click();
            });
        self.affirm_dialog.open();
        return this;
    };

    return affirm_dialog;
});
