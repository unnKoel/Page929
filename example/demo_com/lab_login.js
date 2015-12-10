/**
 * Created by common on 2015/12/9.
 */
define(function (require) {
    var $ = require('../lib/jquery-1.11.2'),
        base = require('../lib/uc_base');
    return function () {

        this.html = require('./lab_login.html');
        this.css = require('./lab_login.css');
        this.interactComs = {};
        this.topLevelEle = !1;

        /**
         * 绘画登陆弹出框
         * @param container
         */
        this.drew = function (container) {
            $(container).append(this.html);
            this.topLevelEle = $('#lg-form');
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
                    self.topLevelEle.find('#loginname').val('');
                    self.topLevelEle.find('#nloginpwd').val('');
                }, 1);
            }
            self.topLevelEle.find('input').each(function () {
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
                    self.topLevelEle.find('.msg-error').addClass('hide'),
                        $(this).parents('.highlight').removeClass('item-error').addClass('item-focus');
                }).blur(function () {
                    $(this).parents('.highlight').removeClass('item-focus');
                });
            });
        };

        /**
         * 绑定提交事件
         * @param opts
         */
        this.bind_submit = function () {
            var self = this;
            $(document).keyup(function (event) {
                if (event.keyCode == 13) {
                    self.topLevelEle.find('#loginsubmit').click();
                }
            });
            self.topLevelEle.find('#loginsubmit').click(function () {
                var account = self.topLevelEle.find("#loginname").val(),
                    pwd = self.topLevelEle.find("#nloginpwd").val(),
                    autoLogin = self.topLevelEle.find('#autoLogin').is(':checked') ? 1 : 0;
                return 0 == $.trim(account).length && 0 == $.trim(pwd).length ? (
                    self.topLevelEle.find('.item-fore2').addClass('item-error'),
                        self.topLevelEle.find('.item-fore1').addClass('item-error'),
                        self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
                ) : (
                    0 == $.trim(account).length ? (
                        self.topLevelEle.find('.item-fore1').addClass('item-error'),
                            self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
                    ) : ( 0 == $.trim(pwd).length ? (
                            self.topLevelEle.find('.item-fore2').addClass('item-error'),
                                self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
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
                                                    base.toLogin.backTo()
                                                )
                                            ) : self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>账户名与密码不匹配，请重新输入');
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