/**
 * Created by common on 2015/12/7.
 */
define(function (require) {
    var caikerLogger = require('./tools/caiker_logger'),
        $ = require('./lib/jquery-1.11.2.min'),
        base = require('./lib/uc_base'),
        shim = require('./lib/es5-shim'),

        /**
         * 页面框架对象
         * @type {{comVessel: {}, user: {user_type: undefined, lgCallback: undefined, unLgCallback: undefined}, build: Function, load: Function}}
         */
        page = {
            comVessel: {}, //页面组件容器

            user: function (loadConfig) {
                var config = page.config;
                config.common = loadConfig.common;
                config.user.lgCallback = loadConfig.lgCallback;
                config.user.unLgCallback = loadConfig.unLgCallback;
                config.user.user_type = loadConfig.user_type;
                config.user.requireLogin = loadConfig.requireLogin != undefined ? loadConfig.requireLogin : true;
            },

            /**
             * 页面构建
             * @param _com
             */
            build: function (_com) {
                var comVessel = page.comVessel;  //组件容器
                page._com_create(comVessel);  //创建默认组件
                comVessel.lgCallback = page.config.user.lgCallback;
                comVessel.unLgCallback = page.config.user.unLgCallback;
                comVessel.ajax_output = page._ajax_output;
                if (_com) {
                    var comItems = _com;
                    for (var name in comItems) {
                        var comItem = comItems[name],
                            com = comItem.load(),
                            comObj = new com();
                        comVessel['' + name] = comObj;
                        comItems[name].obj = comObj;
                    }
                }
                var mergeComItems = $.extend({}, page.config.com, _com);
                page._com_interact(mergeComItems, comVessel); //组件交互
                this.load();
            },

            /**
             * 页面加载
             */
            load: function () {
                function requireLogin() {
                    return page.config.user.lgCallback != undefined || page.config.user.unLgCallback != undefined;
                }

                page.config._data_gather();//数据收集

                page.config.common ? page.config.common() : !1,
                    requireLogin() ? (
                        $.ajax({
                            url: base.domain + "/hh/user/isLogin",
                            type: "GET",
                            dataType: "json",
                            cache: false,
                            success: function (result) {
                                var user,
                                    comVessel = page.comVessel;
                                0 == result.code ?
                                    void(0 == result.code && (   //登陆回调
                                            user = result.data,   //获取用户信息
                                                page.config.user.user_type ? (  //如果页面要求用户类型才可访问
                                                    page.config.user.user_type == user.userType ?
                                                        ( comVessel.lab_head_tail.mod_user_status(user.name, comVessel.lab_login),
                                                                page.config.user.lgCallback(user)
                                                        ) :
                                                        base.url.forward('/404.html')
                                                ) : (
                                                    comVessel.lab_head_tail.mod_user_status(user.name, comVessel.lab_login),
                                                        page.config.user.lgCallback(user)
                                                )
                                        )
                                    ) : (
                                    page.config.user.unLgCallback ? page.config.user.unLgCallback() :   //未登陆回调
                                        page.config.user.requireLogin ? comVessel.lab_login.open() : !1
                                )
                            }
                        })) : !1;
            },

            /**
             * 创建页面组件
             * @param comVessel 组件容器
             */
            _com_create: function (comVessel) {
                var comItems = page.config.com;
                for (var name in comItems) {
                    var comItem = comItems[name],
                        com = comItem.load(),
                        comObj = new com();
                    comVessel['' + name] = comObj;
                    comItems[name].obj = comObj;
                }
            },

            /**
             * 处理组件交互
             */
            _com_interact: function (mergeComItems, comVessel) {
                var comItems = mergeComItems;
                for (var i in comItems) {
                    var comItem = comItems[i],
                        comNames = comItem.interactCom,
                        interactComs = {};
                    comItem.obj.drew($(comItem.site));
                    for (var j = 0; j < comNames.length; j++) {
                        var comName = '' + comNames[j];
                        interactComs[comName] = comVessel[comName];
                    }
                    interactComs.ajax_output = page._ajax_output;
                    comItems[i].obj.setInteractComs(interactComs);
                }
            },

            /**
             * 页面ajax请求处理
             * @param ajax_back
             * @param success_callback
             * @param opts
             */
            _ajax_output: function (ajax_back, success_callback, opts) {
                var back_code = ajax_back.code,
                    lab_prompt_dialog = page.comVessel.lab_prompt_dialog,
                    lab_login = page.comVessel.lab_login;
                if (back_code == 0) {
                    success_callback ? (
                        $.isFunction(success_callback) ? success_callback(ajax_back.data) : !1
                    ) : (
                        lab_prompt_dialog.open(lab_prompt_dialog.type.succeed, ajax_back.data ? ajax_back.data : ajax_back.msg)
                    )
                } else if (back_code == 5112) {
                    lab_login.open();
                } else if (opts) {
                    for (var code in opts) {
                        back_code == code ? $.isFunction(opts[code]) ? opts[code](ajax_back) : !1 : !1;
                    }
                } else {
                    lab_prompt_dialog.open(lab_prompt_dialog.type.error, ajax_back.data ? ajax_back.data : ajax_back.msg)
                }
            }
        };

    /**
     * 页面配置
     * @type {{common: undefined, user: {requireLogin: boolean, user_type: undefined, lgCallback: undefined, unLgCallback: undefined}, data_gather: Function}}
     */
    page.config = {  //页面配置
        common: undefined,   //页面不涉及用户的公共函数  例如：common:function(data){void(0);}
        user: {
            requireLogin: true,
            user_type: undefined,
            lgCallback: undefined,  //例如：登陆回调，lgCallback:function(user,data){void(0);}
            unLgCallback: undefined //例如：没登录回调,unLgCallback:function(data){void(0);}
        },
        _data_gather: function () {  //数据收集
            var uid = base.cookieOperate.getCookie('caiker_uid');
            caikerLogger.memId = uid ? uid : 0;
            caikerLogger.tracking();
        }
    };

    /**
     * 页面组件配置
     * @type {{prompt_dialog: {name: string, load: Function, site: string, interactCom: Array}, affirm_dialog: {name: string, load: Function, site: string, interactCom: Array}, head_tail: {name: string, load: Function, site: string, interactCom: string[]}, login: {name: string, load: Function, site: string, interactCom: string[]}}}
     */
    page.config.com = {
        lab_prompt_dialog: {
            load: function () {
                return require('./lab/lab_prompt_dialog')
            },
            site: '.page',
            interactCom: []
        },
        lab_affirm_dialog: {
            load: function () {
                return require('./lab/lab_affirm_dialog')
            },
            site: '.page',
            interactCom: []
        },
        lab_head_tail: {
            load: function () {
                return require('./lab/lab_head_tail')
            },
            site: '.page',
            interactCom: ['lab_login']
        },
        lab_login: {
            load: function () {
                return require('./lab/lab_login')
            },
            site: 'body',
            interactCom: ['lab_head_tail', 'lgCallback']
        }
    };

    return page;
});