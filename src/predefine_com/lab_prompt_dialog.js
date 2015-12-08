/**
 * Created by common on 2015/11/13.
 */
define(function (require) {
    var $ = require('../lib/jquery-1.11.2'),
        prompt_dialog = function () {
            this.html = require('./lab_prompt_dialog.html');
            this.css = require('./lab_prompt_dialog.css');
            this.interactComs = {};
            this.prompt_dialog = !1;
        };

    /**
     * 绘制提示框
     * @param container
     * @returns {prompt_dialog}
     */
    prompt_dialog.prototype.drew = function (container) {
        var dialog = require("../com/dialog");
        $(container).append(this.html);
        var prompt_dialog = $('.prompt');
        prompt_dialog.css('left', ($(container).width() - prompt_dialog.width()) / 2);
        this.prompt_dialog = new dialog().init(".prompt", $(container));
        return this;
    };

    prompt_dialog.prototype.setInteractComs = function (interactComs) {
        this.interactComs = interactComs;
    };

    /**
     * 提示框打开
     * @param type
     * @param msg
     * @returns {prompt_dialog}
     */
    prompt_dialog.prototype.open = function (type, msg) {
        $('.msg .icon').addClass(type),
            $('.msg .word').html(msg),
            this.prompt_dialog.open();
        return this;
    };

    prompt_dialog.prototype.type = {
        'error': 'error',
        'succeed': 'succeed'
    };

    //提示框类型
    prompt_dialog.type = {
        'error': 'error',
        'succeed': 'succeed'
    };

    return prompt_dialog;
});
