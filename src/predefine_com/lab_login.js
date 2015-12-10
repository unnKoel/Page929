/**
 * Created by common on 2015/11/12.
 */
define(function (require) {
    var $ = require('../lib/jquery-1.11.2'),
        base = require('../lib/uc_base');
    return function () {

        this.html = require('./lab_login.html');
        this.css = require('./lab_login.css');
        this.interactComs = {};
        this.lg_dialog = !1;
        this.top_ele = !1;

        /**
         * 绘画登陆弹出框
         * @param container
         */
        this.drew = function (container) {
            var dialog = require("../com/dialog");
            $(container).append(this.html);
            var lgForm = this.top_ele = $('#page929_login');
            lgForm.css('left', ($(window).width() - lgForm.width()) / 2);
            this.lg_dialog = new dialog().init("#page929_login", $(container));
            this.decorate();
            return this;
        };

        /**
         *设置交互组件
         * @param interactComs
         */
        this.setInteractComs = function (interactComs) {
            this.interactComs = interactComs;
            this.bind_submit();
        };

        /**
         * ui装饰
         */
        this.decorate = function () {
            base.ieCompatibility.JPlaceHolder.init();
            var supportPlaceHodler = base.ieCompatibility.JPlaceHolder._check(),
                self = this;
            if (!supportPlaceHodler) {  //如果ie，清空登陆输入框
                setTimeout(function () {
                    self.top_ele.find('#loginname').val('');
                    self.top_ele.find('#nloginpwd').val('');
                }, 1);
            }
            self.top_ele.find('input').each(function () {
                $(this).keyup(function () {
                    var val = $(this).val(),
                        input = $(this),
                        closeEle = undefined;
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
                    self.top_ele.find('.msg-error').addClass('hide'),
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
        this.bind_submit = function () {
            var self = this;
            $(document).keyup(function (event) {
                if (event.keyCode == 13) {
                    self.top_ele.find('#loginsubmit').click();
                }
            });
            self.top_ele.find('#loginsubmit').click(function () {
                var account = self.top_ele.find("#loginname").val(),
                    pwd = self.top_ele.find("#nloginpwd").val(),
                    autoLogin = self.top_ele.find('#autoLogin').is(':checked') ? 1 : 0;
                return 0 == $.trim(account).length && 0 == $.trim(pwd).length ? (
                    self.top_ele.find('.item-fore2').addClass('item-error'),
                        self.top_ele.find('.item-fore1').addClass('item-error'),
                        self.top_ele.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
                ) : (
                    0 == $.trim(account).length ? (
                        self.top_ele.find('.item-fore1').addClass('item-error'),
                            self.top_ele.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
                    ) : ( 0 == $.trim(pwd).length ? (
                            self.top_ele.find('.item-fore2').addClass('item-error'),
                                self.top_ele.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
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
                                                        self.interactComs.lab_head_tail.mod_user_status(result.data.name, self),
                                                        self.interactComs.lgCallback(result.data)  //登陆回调
                                                )
                                            ) : self.top_ele.find('.msg-error').removeClass('hide').html('<b></b>账户名与密码不匹配，请重新输入');
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
