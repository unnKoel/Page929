/**
 * Created by common on 2015/11/12.
 */
define(function (require) {
    var $ = require('../lib/jquery-1.11.2'),
        head_tail = function () {
            this.html = require('./lab_head_tail.html');
            this.css = require('./lab_head_tail.css');
            this.interactComs = {};
            this.head_html = !1;
            this.top_ele_head = !1;
            this.tail_html = !1;
        };

    /**
     * 头尾绘画
     * @param main
     * @returns {head_tail}
     */
    head_tail.prototype.drew = function (main) {
        var html = this.html,
            base = require('../lib/uc_base.js'),
            head_index = html.indexOf('<div class="head" id="page929_head">'),
            tail_index = html.indexOf('<div class="tail" id="page929_tail">');
        this.head_html = html.substring(head_index, tail_index);
        this.tail_html = html.substring(tail_index);
        $(main).before(this.head_html).after(this.tail_html);
        this.top_ele_head = $('#page929_head');
        this.top_ele_head.find('.now_time').html(base.date.clockon());
        return this;
    };

    /**
     * 设置交互组件
     */
    head_tail.prototype.setInteractComs = function (interactComs) {
        this.interactComs = interactComs;
    };

    /**
     * 修改导航栏用户状态
     * @param user_name
     */
    head_tail.prototype.mod_user_status = function (user_name) {
        var base = require('../lib/uc_base.js'),
            login_dialog = this.interactComs.lab_login,
            self = this;
        self.top_ele_head.find('.user').html('<em></em>' + user_name + '<a href="javascript:void(0);" class="lgOut">[退出]</a>');
        self.top_ele_head.find('.lgOut').on('click', function () {
            $.ajax({
                    url: base.domain + "/hh/user/logout",
                    type: "POST",
                    dataType: "json",
                    cache: !1,
                    success: function (result) {
                        0 == result.code ?
                            void(0 == result.code && (
                                    self.top_ele_head.find('.user').html(''),
                                        window.location.reload(),
                                        login_dialog.open()
                                )
                            ) : alert('退出失败');
                    }
                }
            )
        })
    };
    return head_tail;
});