/**
 * Created by common on 2015/12/4.
 */
define(function (require) {
        var $ = require('../lib/jquery-1.11.2.min'),
            base = require('../lib/uc_base');
        return function () {

            this.html = require('./lab_ac_apply.html');
            this.css = require('./lab_ac_apply.css');
            this.interactComs = {};
            this.apply_dialog = !1;
            this.topLevelEle = !1;

            /**
             * 绘画登陆弹出框
             * @param container
             */
            this.drew = function (container) {
                var dialog = require("../comp/dialog");
                $(container).append(this.html);
                this.topLevelEle = $('#apply-form');
                var applyForm = this.topLevelEle;
                applyForm.css('left', ($(window).width() - applyForm.width()) / 2);
                this.apply_dialog = new dialog().init("#apply-form", $(container));
                this.decorate();
                return this;
            };

            /**
             *设置交互组件
             * @param interactComs
             */
            this.setInteractComs = function (interactComs) {
                this.interactComs = interactComs;
                this.isReg();
            };

            /**
             * ui装饰
             */
            this.decorate = function () {
                base.ieCompatibility.JPlaceHolder.init();
                var supportPlaceHodler = base.ieCompatibility.JPlaceHolder._check(),
                    topLevelEle = this.topLevelEle;
                if (!supportPlaceHodler) {  //如果ie，清空登陆输入框
                    setTimeout(function () {
                        topLevelEle.find('#loginname').val('');
                        topLevelEle.find('#nloginpwd').val('');
                    }, 1);
                }
                topLevelEle.find("#formlogin input").each(function () {
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
                        topLevelEle.find('.msg-error').addClass('hide'),
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
                this.apply_dialog.open();
            };

            /**
             * 是否注册
             */
            this.isReg = function () {
                var self = this;
                self.topLevelEle.find('#apply').bind('click', function () {
                        var account = $("#loginname").val();
                        return 0 == $.trim(account).length ? (
                            self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>请输入手机号')
                        ) : (!/^0?(13|15|18|14|17)[0-9]{9}$/.test($.trim(account)) ? (
                                self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>手机号码格式有误')
                            ) :
                                $.ajax({
                                        url: base.domain + "/hh/user/isRegister",
                                        type: "POST",
                                        dataType: "json",
                                        cache: !1,
                                        data: {
                                            account: account
                                        },
                                        success: function (result) {
                                            0 == result.code ? (
                                                self.topLevelEle.find('#reName').removeClass('hide'),
                                                    self.topLevelEle.find('#apply').html('立即报名'),
                                                    self.regApply()
                                            ) : (
                                                result.code == 5005 ? (
                                                    self.topLevelEle.find('#entry').removeClass('hide'),
                                                        self.topLevelEle.find('#apply').html('立即报名'),
                                                        self.lgApply()
                                                ) :
                                                    $('.msg-error').removeClass('hide').html('<b></b>' + result.msg)
                                            )
                                        }
                                    }
                                )
                        )
                    }
                )
            };

            /**
             * 登陆报名
             */
            this.lgApply = function () {
                var self = this;
                self.topLevelEle.find('#apply').unbind('click').bind('click', function () {
                    var account = $("#loginname").val(),
                        pwd = $("#nloginpwd").val();
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
                                    $self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和密码')
                            ) : (
                                $.ajax({
                                        url: base.domain + "/hh/user/login",
                                        type: "POST",
                                        dataType: "json",
                                        cache: !1,
                                        data: {
                                            account: account,
                                            password: pwd
                                        },
                                        success: function (result) {
                                            0 == result.code ?
                                                void(0 == result.code && (
                                                        base.cookieOperate.setCookie('caiker_uid', result.data.id, 20),
                                                            self.interactComs.lab_head_tail.mod_user_status(result.data.name, self),
                                                            self.interactComs.lgCallback(result.data),  //登陆回调
                                                            self.apply(account)
                                                    )
                                                ) :
                                                $('.msg-error').removeClass('hide').html('<b></b>账户名与密码不匹配，请重新输入');
                                        }
                                    }
                                )
                            )
                        )
                    )
                })
            };

            /**
             * 注册报名
             */
            this.regApply = function () {
                var self = this;
                self.topLevelEle.find('#apply').unbind('click').bind('click', function () {
                    var account = $("#loginname").val(),
                        username = $("#user_name").val();
                    return 0 == $.trim(account).length && 0 == $.trim(username).length ? (
                        self.topLevelEle.find('.item-fore2').addClass('item-error'),
                            self.topLevelEle.find('.item-fore1').addClass('item-error'),
                            self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和姓名')
                    ) : (
                        0 == $.trim(account).length ? (
                            self.topLevelEle.find('.item-fore1').addClass('item-error'),
                                self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和姓名')
                        ) : ( 0 == $.trim(username).length ? (
                                self.topLevelEle.find('.item-fore2').addClass('item-error'),
                                    $self.topLevelEle.find('.msg-error').removeClass('hide').html('<b></b>请输入账户名和姓名')
                            ) : (
                                $.ajax({
                                        url: base.domain + "/hh/user/register",
                                        type: "POST",
                                        dataType: "json",
                                        cache: !1,
                                        data: {
                                            phone: account,
                                            name: username
                                        },
                                        success: function (result) {
                                            0 == result.code ?
                                                void(0 == result.code && (
                                                        self.apply(account)
                                                    )
                                                ) :
                                                $('.msg-error').removeClass('hide').html('<b></b>手机号和姓名格式有误，请重新输入');
                                        }
                                    }
                                )
                            )
                        )
                    )
                });
            };

            this.apply = function (account) {
                var self = this;
                $.ajax({
                        url: base.domain + "/hh/activity/apply",
                        type: "POST",
                        dataType: "json",
                        cache: !1,
                        data: {
                            phone: account,
                            actid: base.url.getParam('actid')
                        },
                        success: function (result) {
                            var prompt_dialog = self.interactComs.lab_prompt_dialog;
                            self.apply_dialog.close(),
                                0 == result.code ?
                                    prompt_dialog.open(prompt_dialog.type.succeed, '报名成功')
                                    :
                                    result.code == 5006 ?
                                        prompt_dialog.open(prompt_dialog.type.error, '报名失败') : prompt_dialog.open(prompt_dialog.type.error, '已经报名')
                        }
                    }
                )
            };
        };
    }
);
