/**
 * Created by common on 2015/10/23.
 */
define(function (require) {
    var caikerLogger = require('./tools/caiker_logger'),
        $ = require('./lib/jquery-1.11.2.min'),
        base = require('./lib/uc_base'),
        shim = require('./lib/es5-shim'),
        /**
         * 页面框架对象
         * @type {{prepareCom: {}, allCom: {}, user: {type: {counselor: number, company: number}}, load: Function}}
         */
        page = {
            prepareCom: {},  //预备组件
            allCom: {}, //所有组件
            user: {
                type: {  //用户类型
                    counselor: 1,  //顾问
                    company: 2   //企业
                }
            },

            /**
             * 页面加载
             */
            load: function () {
                function requireLogin() {
                    return page.config.user.lgCallback != undefined || page.config.user.unLgCallback != undefined;
                }

                var allCom = page.allCom;  //allCom组件收集
                allCom.lgCallback = page.config.user.lgCallback;
                allCom.unLgCallback = page.config.user.unLgCallback;
                page.nativeCom_create(allCom);  //创建原生组件
                page.prepareCom_create(allCom); //创建预备组件
                page.set_comInteract();   //配置组件间的交互关系
                page.config.date_gather();//数据收集

                page.config.common ? page.config.common() : !1,
                    page.config.requireLogin && requireLogin() ? (
                        $.ajax({
                            url: base.domain + "/hh/user/isLogin",
                            type: "GET",
                            dataType: "json",
                            cache: !1,
                            success: function (result) {
                                var user,
                                    allCom = page.allCom;
                                0 == result.code ?
                                    void(0 == result.code && (   //登陆回调
                                        user = result.data,   //获取用户信息
                                            page.config.user.user_type ? (  //如果页面要求用户类型才可访问
                                                page.config.user.user_type == user.userType ?
                                                    ( allCom.lab_head_tail.mod_user_status(user.name, allCom.lab_login),
                                                        page.config.user.lgCallback(user)
                                                    ) :
                                                    base.url.forward('/404.html')
                                            ) : (
                                                allCom.lab_head_tail.mod_user_status(user.name, allCom.lab_login),
                                                    page.config.user.lgCallback(user)
                                            )
                                    )
                                    ) : (
                                    page.config.user.unLgCallback ? page.config.user.unLgCallback() :   //未登陆回调
                                        allCom.lab_login.open()
                                )
                            }
                        })) : !1;
            }
        };

    /**
     * 页面配置
     * @type {{requireLogin: boolean, common: undefined, user: {user_type: undefined, lgCallback: undefined, unLgCallback: undefined}, date_gather: Function}}
     */
    page.config = {  //页面配置
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
    };

    /**
     * 页面预备组件配置
     * @type {{prompt_dialog: {path: string, site: string, interactCom: {}}, affirm_dialog: {path: string, site: string, interactCom: {}}}}
     */
    page.config.prepareCom = {
        prompt_dialog: {
            path: './lab/lab_prompt_dialog',
            site: '.page',
            interactCom: {}
        },
        affirm_dialog: {
            path: './lab/lab_affirm_dialog',
            site: '.page',
            interactCom: {}
        }
    };

    /**
     * 页面原生组件配置
     * @type {{head_tail: {name: string, path: string, site: string, interactCom: string[]}, login: {path: string, site: string, interactCom: string[]}}}
     */
    page.config.nativeCom = {
        head_tail: {
            name: 'lab_head_tail',
            path: './lab/lab_head_tail',
            site: '.page',
            interactCom: ['lab_login']
        },
        login: {
            path: './lab/lab_login',
            site: 'body',
            interactCom: ['lab_head_tail', 'lgCallback']
        }
    };

    /**
     *  创建原生组件
     */
    page.nativeCom_create = function (allCom) {
        var nativeComItems = page.config.nativeCom;
        for (var i in nativeComItems) {
            var nativeComItem = nativeComItems[i],
                path = nativeComItem.path,
                nativeCom = require('' + path),
                nativeComObj = new nativeCom().drew($(nativeComItem.site));
            var comName = nativeComItem.name;
            if (comName) {
                allCom['' + comName] = nativeComObj;
            } else {
                comName = path.substring(path.lastIndexOf('/') + 1);
                allCom['' + comName] = nativeComObj;
            }
            nativeComItems[i].obj = nativeComObj;
        }
    };

    /**
     *  创建预备组件
     */
    page.prepareCom_create = function (allCom) {
        var prepareComItems = page.config.prepareCom;
        for (var i in prepareComItems) {
            var prepareComItem = prepareComItems[i],
                path = prepareComItem.path,
                prepareCom = require('' + path),
                prepareComObj = new prepareCom().drew($(prepareComItem.site));
            var comName = prepareComItem.name;
            if (comName) {
                page.prepareCom['' + comName] = prepareComObj;
                allCom['' + comName] = prepareComObj;
            } else {
                comName = path.substring(path.lastIndexOf('/') + 1);
                page.prepareCom['' + comName] = prepareComObj;
                allCom['' + comName] = prepareComObj;
            }
            prepareComItems[i].obj = prepareComObj;
        }
    };

    /**
     * 配置组件之间的交互关系
     * */
    page.set_comInteract = function () {
        var prepareComItems = page.config.prepareCom,
            nativeComItems = page.config.nativeCom;
        for (var i in nativeComItems) {
            var interactComNames = nativeComItems[i].interactCom,
                interactComs = {};
            for (var j = 0; j < interactComNames.length; j++) {
                var interactComName = '' + interactComNames[j];
                interactComs[interactComName] = page.allCom[interactComName];
            }
            nativeComItems[i].obj.setInteractComs(interactComs);
        }
        for (var i in prepareComItems) {
            var prepareComNames = prepareComItems[i].interactCom,
                prepareComs = {};
            for (var j = 0; j < prepareComNames.length; j++) {
                var prepareComName = '' + prepareComNames[j];
                prepareComs[prepareComName] = page.allCom[prepareComName];
            }
            prepareComItems[i].obj.setInteractComs(prepareComs);
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

    return page;
});