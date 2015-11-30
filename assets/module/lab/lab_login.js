/**
 * Created by common on 2015/11/12.
 */
define(function (require) {
    var $ = require('../lib/jquery-1.11.2.min'),
        base = require('../lib/uc_base');
    //React = require('react');
    return function () {

        this.html = require('./lab_login.html');
        this.css = require('./lab_login.css');
        this.lg_dialog = !1;

        /**
         * 绘画登陆弹出框
         * @param container
         */
        this.drew = function (container) {
            var dialog = require("../comp/dialog");
            //container.append('<div id="lab_login"></div>');
            //React.render(
            //    this.html({class: 'msg-error hide', label: 'asdf'}), document.getElementById('lab_login')
            //);

            $(container).append(this.html);
            var lgForm = $('.login-form');
            lgForm.css('left', ($(window).width() - lgForm.width()) / 2);
            this.lg_dialog = new dialog().init(".login-form", $(container));
            this.decorate();
            return this;
        };

        this.decorate = function () {
            base.ieCompatibility.JPlaceHolder.init();

            $("#formlogin input").each(function () {
                $(this).keyup(function () {
                    var val = $(this).val(),
                        input = $(this),
                        closeEle = undefined,
                        supportPlaceHodler = base.ieCompatibility.JPlaceHolder._check();
                    if (!supportPlaceHodler) {   //不兼容placeHolder的ie浏览器
                        closeEle = $(this).parent().next('.clear-btn')
                    } else {
                        closeEle = $(this).next('.clear-btn')
                    }
                    var display = closeEle.css('display');
                    if (val && display != 'inline') {
                        closeEle.css('display', 'inline').click(function () {
                            supportPlaceHodler ? void(0) : input.next('span').show();
                            input.val(''),
                                $(this).css('display', 'none')
                        });
                        return;
                    }
                    if (!val) {
                        closeEle.css('display', 'none');
                    }
                });

                $(this).focus(function () {
                    $('.msg-error').addClass('hide'),
                        $(this).parents('.highlight').removeClass('item-error').addClass('item-focus');
                }).blur(function () {
                    $(this).parents('.highlight').removeClass('item-focus');
                });
            });
        };

        /**
         * 登陆弹窗打开
         */
        this.open = function () {
            this.lg_dialog.open();
        };

        /**
         * 绑定提交事件
         * @param opts
         */
        this.bind_submit = function (opts) {
            $(document).keyup(function (event) {
                if (event.keyCode == 13) {
                    $('#loginsubmit').click();
                }
            });
            var self = this;
            $('#loginsubmit').click(function () {
                var account = $("#loginname").val(),
                    pwd = $("#nloginpwd").val(),
                    autoLogin = $('#autoLogin').is(':checked') ? 1 : 0;
                return 0 == $.trim(account).length && 0 == $.trim(pwd).length ? (
                    $('.item-fore2').addClass('item-error'),
                        $('.item-fore1').addClass('item-error'),
                        $('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
                    //React.render(
                    //    self.html({class: 'msg-error', label: '请输入账户名和密码'}), document.getElementById('lab_login')
                    //)
                ) : (
                    0 == $.trim(account).length ? (
                        $('.item-fore1').addClass('item-error'),
                            $('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
                    ) : ( 0 == $.trim(pwd).length ? (
                            $('.item-fore2').addClass('item-error'),
                                $('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
                        ) : (
                            $.ajax({
                                    url: base.domain + "/hh/user/login",
                                    type: "POST",
                                    dataType: "json",
                                    cache: !1,
                                    data: {
                                        account: account,
                                        password: pwd,
                                        rememberMe: autoLogin
                                    },
                                    success: function (result) {
                                        0 == result.code ?
                                            void(0 == result.code && (
                                                    base.cookieOperate.setCookie('caiker_uid', result.data.id, 20),
                                                        self.lg_dialog.close(),
                                                        opts.lab_head_tail.mod_user_status(result.data.name, self),
                                                        opts.lg_callback(result.data)  //登陆回调
                                                )
                                            ) : $('.msg-error').removeClass('hide').html('<b></b>账户名与密码不匹配，请重新输入');
                                    }
                                }
                            )
                        )
                    )
                )
            });
        }
    };
});

