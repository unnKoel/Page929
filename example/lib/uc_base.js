/**
 * Created by common on 2015/9/6.
 */
define(function (require) {

    var base64 = require('../lib/base64'),
        base = {
            jump: 1,

            domain: "http://lb.51caiker.com",  //域名

            dateTransfer: {  //时间转换
                dateToMillisecond: function (dateStr) {  //日期字符串转成毫秒
                    return new Date(dateStr).getTime();
                }
            },

            file: {
                loadCssFile: function (filename) {
                    var oCss = document.createElement("link");
                    oCss.setAttribute("rel", "stylesheet");
                    oCss.setAttribute("type", "text/css");
                    oCss.setAttribute("href", filename);

                    document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
                }
            },

            position: {
                getElementOffset: function (e) {
                    var top = e.offsetTop;
                    var left = e.offsetLeft;

                    while (e = e.offsetParent) {
                        top += e.offsetTop;
                        left += e.offsetLeft;
                    }
                    return {
                        top: top,
                        left: left
                    }
                }
            },

            date: {
                clockon: function () {
                    var now = new Date();
                    var year = now.getFullYear(); //getFullYear getYear
                    var month = now.getMonth();
                    var date = now.getDate();
                    var day = now.getDay();
                    var hour = now.getHours();
                    var minu = now.getMinutes();
                    var sec = now.getSeconds();
                    var week;
                    month = month + 1;
                    if (month < 10) month = "0" + month;
                    if (date < 10) date = "0" + date;
                    if (hour < 10) hour = "0" + hour;
                    if (minu < 10) minu = "0" + minu;
                    if (sec < 10) sec = "0" + sec;
                    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
                    week = arr_week[day];
                    return year + "年" + month + "月" + date + "日" + " " + week;
                }
            },

            browser: {
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {//移动终端浏览器版本信息
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            },

            url: {   //url相关common操作
                forward: function (goUrl, key, value) {  //带参跳转到某个url
                    if (base.jump && base.url.getParam('debug') == 1) return;
                    var url = goUrl;
                    var newUrl = "";

                    if (key && value) {
                        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
                        var tmp = key + "=" + value;
                        if (url.match(reg) != null) {
                            newUrl = url.replace(eval(reg), tmp);
                        }
                        else {
                            if (url.match("[\?]")) {
                                newUrl = url + "&" + tmp;
                            }
                            else {
                                newUrl = url + "?" + tmp;
                            }
                        }
                        window.location.href = newUrl;
                        window.event.returnValue = false;
                    } else {
                        window.location.href = goUrl;
                        window.event.returnValue = false;
                    }
                },

                forwardWidthMulParam: function (goUrl, keyValues) {
                    function addParam(url, key, value) {
                        var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)"),
                            newUrl = '',
                            tmp = key + "=" + value;
                        if (url.match(reg) != null) {
                            newUrl = url.replace(eval(reg), tmp);
                        }
                        else {
                            if (url.match("[\?]")) {
                                newUrl = url + "&" + tmp;
                            }
                            else {
                                newUrl = url + "?" + tmp;
                            }
                        }
                        return newUrl;
                    }

                    if (base.jump && base.url.getParam('debug') == 1) return;
                    var generateUrl = goUrl;
                    if (keyValues) {
                        for (var key in keyValues) {
                            var value = keyValues[key];
                            generateUrl = addParam(generateUrl, key, value);
                        }
                        window.location.href = generateUrl;
                        window.event.returnValue = false;
                    } else {
                        window.location.href = goUrl;
                        window.event.returnValue = false;
                    }
                },

                getParam: function (item, decode) {  //从当前url获取参数
                    var sValue = window.location.href.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i")),
                        paramValue = sValue ? sValue[1] : sValue,
                        isDecode = (decode == undefined ? false : decode);
                    return paramValue ? (isDecode ? base64.decode(paramValue) : paramValue) : paramValue;
                },

                delParam: function (ref) {  //从当前url删除参数
                    var str = "";
                    if (window.location.href.indexOf('?') != -1) {
                        str = window.location.href.substr(window.location.href.indexOf('?') + 1);
                    }
                    else {
                        return window.location.href;
                    }
                    var arr = "";
                    var returnurl = "";
                    var setparam = "";
                    if (str.indexOf('&') != -1) {
                        arr = str.split('&');
                        for (i in arr) {
                            if (arr[i].split('=')[0] != ref) {
                                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                            }
                        }
                        return window.location.href.substr(0, window.location.href.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
                    }
                    else {
                        arr = str.split('=');
                        if (arr[0] == ref) {
                            return window.location.href.substr(0, window.location.href.indexOf('?'));
                        }
                        else {
                            return window.location.href;
                        }
                    }
                }
            },

            toLogin: {  //跳转到登陆页
                setBackTo: function (forwardUrl, loginUrl) {  //设置登陆页登陆完，返回url，命名backUrl(base64加密)
                    base.url.forward(loginUrl, 'go', base64.encode(forwardUrl))
                },

                backTo: function () {  //调用此方法，返回到backUrl
                    base.url.forward(base64.decode(base.url.getParam('go')));
                },

                isBack: function () {  //判断是否设置了backUrl
                    return base.url.getParam('go') ? true : false;
                }
            },

            cookieOperate: {  //前端cookie操作
                setCookie: function (c_name, value, expireMinutes) {  //设置cookie值
                    var exdate = new Date();
                    //exdate.setDate(exdate.getDate() + expiredays);
                    exdate.setTime(exdate.getTime() + expireMinutes * 60 * 1000);
                    document.cookie = c_name + "=" + escape(value) + ((expireMinutes == null) ? "" : ";expires=" + exdate.toGMTString());
                },
                getCookie: function (name) {  //获取cookie值
                    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                    if (arr = document.cookie.match(reg))
                        return (arr[2]);
                    else
                        return null;
                },
                clearCookie: function (name) {  //清楚cookie
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    var cval = this.getCookie(name);
                    if (cval != null)
                        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
                }
            },
            //ie兼容性
            ieCompatibility: {
                JPlaceHolder: {   //文本框placeholder在ie下兼容
                    //检测
                    _check: function () {
                        return 'placeholder' in document.createElement('input');
                    },
                    //初始化
                    init: function () {
                        if (!this._check()) {
                            this.fix();
                        }
                    },
                    //修复
                    fix: function () {
                        $(':input[placeholder]').each(function (index, element) {
                            var self = $(this), txt = self.attr('placeholder'),
                                floatValue = self.css('float');
                            self.wrap($('<div></div>').css({
                                position: 'relative',
                                zoom: '1',
                                border: 'none',
                                background: 'none',
                                padding: 'none',
                                float: floatValue,
                                margin: 'none',
                                zIndex: '1'
                            }));
                            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
                            var holder = $('<span></span>').text(txt).css({
                                position: 'absolute',
                                left: pos.left,
                                top: '0',
                                height: h,
                                'line-height': h + 'px',
                                paddingLeft: paddingleft,
                                'font-size': '14px',
                                'font-family': "宋体",
                                color: '#757575',
                                zIndex: '2'
                            }).appendTo(self.parent());
                            self.focusin(function (e) {
                                holder.hide();
                            }).focusout(function (e) {
                                if (!self.val()) {
                                    holder.show();
                                }
                            });
                            holder.click(function (e) {
                                holder.hide();
                                self.focus();
                            });
                        });
                    }
                }
            }
        },
        $ = require('./jquery-1.11.2');
    return base;
});
