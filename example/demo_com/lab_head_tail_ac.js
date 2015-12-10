/**
 * Created by common on 2015/12/3.
 */
define(function (require) {
    var $ = require('../lib/jquery-1.11.2'),
        head_tail = function () {
            this.html = require('./lab_head_tail_ac.html');
            this.css = require('./lab_head_tail_ac.css');
            this.interactComs = {};
            this.head_html = this.html;
            this.tail_html = !1;
        };
    /**
     * 头尾绘画
     * @param main
     * @returns {head_tail}
     */
    head_tail.prototype.drew = function (main) {
        var html = this.html;
        head_index = html.indexOf('<div class="head">'),
            tail_index = html.indexOf('<div class="tail">');
        this.head_html = html.substring(head_index, tail_index);
        this.tail_html = html.substring(tail_index);
        $(main).before(this.head_html).after(this.tail_html);
        return this;
    };

    head_tail.prototype.setInteractComs = function (interactComs) {
        this.interactComs = interactComs;
        this.bind();
    };

    head_tail.prototype.bind = function () {
        var login_dialog = this.interactComs.lab_login;
        $('.sign-in').on('click', function () {
            login_dialog.open();
        })
    };

    /**
     * 修改导航栏用户状态
     * @param user_name
     */
    head_tail.prototype.mod_user_status = function (user_name) {
        var base = require('../lib/uc_base.js');
        $('.header').append('<span class="lgOut_span"><em></em>' + user_name + '<a href="javascript:void(0);" class="lgOut">[退出]</a></span>');
        $('.header .sign-in').css('display', 'none');
        $('.lgOut').on('click', function () {
            $.ajax({
                    url: base.domain + "/hh/user/logout",
                    type: "POST",
                    dataType: "json",
                    cache: !1,
                    success: function (result) {
                        if (0 == result.code) {
                            void(0 == result.code && (
                                    //window.location.reload(),
                                    //com.login_dialog.open()
                                    $('.header .lgOut_span').remove()
                                )
                            )
                            $('.sign-in').show();
                        } else {
                            alert('退出失败');
                        }
                    }
                }
            )
        })
    };
    return head_tail;
});