/**
 * Created by CI7512 on 2015/10/23.
 */
define(function (require) {
    var caikerLogger = require('./tools/caiker_logger'),
        $ = require('./lib/jquery-1.11.2.min'),
        lab_prompt_dialog = require("./lab/lab_prompt_dialog"),
        base = require('./lib/uc_base'),
        shim = require('./lib/es5-shim'),
        page = {
            prepareCom: {},  //预备组件
            user: {
                type: {  //用户类型
                    counselor: 1,  //顾问
                    company: 2   //企业
                }
            },

            config: {  //页面配置
                requireLogin: true,
                common: undefined,   //页面不涉及用户的公共函数  例如：common:function(data){void(0);}
                user: {
                    user_type: undefined,
                    lgCallback: undefined,  //例如：登陆回调，lgCallback:function(user,data){void(0);}
                    unLgCallback: undefined //例如：没登录回调,unLgCallback:function(data){void(0);}
                },
                date_gather: function () {  //数据收集
                    var uid = base.cookieOperate.getCookie('caiker_uid');
                    caikerLogger.memId = uid ? uid : 0;
                    caikerLogger.tracking();
                }
            },

            load: function () {
                function requireLogin() {
                    return page.config.user.lgCallback != undefined || page.config.user.unLgCallback != undefined;
                }

                page.head_end();  //初始化页面头尾组件
                page.login_popup();  //初始化登陆弹窗组件
                page.prompt_dialog(); //初始化提示框组件
                page.affirm_dialog();  //初始化确认框组件
                page.config.date_gather();//数据收集

                page.config.common ? page.config.common() : !1,
                    page.config.requireLogin && requireLogin() ? (
                        $.ajax({
                            url: base.domain + "/hh/user/isLogin",
                            type: "GET",
                            dataType: "json",
                            cache: !1,
                            success: function (result) {
                                var user;
                                0 == result.code ?
                                    void(0 == result.code && (   //登陆回调
                                            user = result.data,   //获取用户信息
                                                page.config.user.user_type ? (  //如果页面要求用户类型才可访问
                                                    page.config.user.user_type == user.userType ?
                                                        (  page.lab_head_tail.mod_user_status(user.name, page.lab_login),
                                                                page.config.user.lgCallback(user)
                                                        ) :
                                                        base.url.forward('/404.html')
                                                ) : (
                                                    page.lab_head_tail.mod_user_status(user.name, page.lab_login),
                                                        page.config.user.lgCallback(user)
                                                )
                                        )
                                    ) : (
                                    page.config.user.unLgCallback ? page.config.user.unLgCallback() :   //未登陆回调
                                        page.lab_login.open()
                                )
                            }
                        })) : !1;
            }
        };

    /**
     * 页面ajax请求处理
     * @param ajax_back
     * @param success_callback
     * @param opts
     */
    page.ajax_output = function (ajax_back, success_callback, opts) {
        var back_code = ajax_back.code;
        if (back_code == 0) {
            success_callback ? (
                $.isFunction(success_callback) ? success_callback(ajax_back.data) : !1
            ) : (
                page.lab_prompt_dialog.open(lab_prompt_dialog.type.succeed, ajax_back.msg)
            )
        } else if (back_code == 5112) {
            this.lab_login.open();
        } else if (opts) {
            for (var code in opts) {
                back_code == code ? $.isFunction(opts[code]) ? opts[code](ajax_back) : !1 : !1;
            }
        } else {
            page.lab_prompt_dialog.open(lab_prompt_dialog.type.error, ajax_back.msg)
        }
    };

    /**
     *页面头、尾
     */
    page.head_end = function () {
        var lab_head_tail = require("./lab/lab_head_tail");
        this.lab_head_tail = new lab_head_tail().drew($('.page'));
    };
    /**
     * 登陆弹窗
     */
    page.login_popup = function () {
        var lab_login = require("./lab/lab_login"),
            lab_head_tail = this.lab_head_tail;
        this.lab_login = new lab_login().drew($('body'));
        this.lab_login.bind_submit({lab_head_tail: lab_head_tail, lg_callback: page.config.user.lgCallback});
    };

    /**
     * 提示对话框
     */
    page.prompt_dialog = function () {
        this.prepareCom.lab_prompt_dialog = new lab_prompt_dialog().drew($('.page'));
    };

    /**
     * 确认对话框
     */
    page.affirm_dialog = function () {
        var lab_affirm_dialog = require('./lab/lab_affirm_dialog');
        this.prepareCom.lab_affirm_dialog = new lab_affirm_dialog().drew($('.page'));
    };
    return page;
});
