/**
 * Created by common on 2015/11/22.
 */

define(function (require) {
    var e = require('../lib/jquery-1.11.2.min'),
        t = !1;
    return function () {
        this.el = t;
        this.checkItems = {};
        this.opts = {};
        var n = this;
        this.init = function (form, checkItems, opts) {
            this.el = form;
            this.checkItems = checkItems;
            this.opts = e.extend(this.opts, opts);
            this.onblurVerify();
            if (opts.errorHighLight) {
                this.errorHighLight();
            }
            return this
        };

        function traverseFunc() {
            for (var itemName in n.checkItems) {
                var input = n.el[itemName];
                var verifyFun = n.checkItems[input.name];
                if (!e.isFunction(verifyFun)) return;
                var verifyResult = verifyFun(input.value);
                if (!verifyResult.code) {
                    n.drewMsg(input, verifyResult.message, "wrong");
                } else {
                    n.drewMsg(input, verifyResult.message, "correct");
                }
            }
        }

        function intervalFunc() {
            for (var itemName in n.checkItems) {
                var input = n.el[itemName];
                if (input.ele) {
                    var verifyFun = n.checkItems[input.name];
                    if (!e.isFunction(verifyFun)) return;
                    var verifyResult = verifyFun(input.value);
                    if (!verifyResult.code) {
                        n.drewMsg(input, verifyResult.message, "wrong");
                    } else {
                        n.drewMsg(input, verifyResult.message, "correct");
                    }
                }
            }
        }

        this.errorHighLight = function () {
            if (!n.el) {
                return false;
            }
            for (var itemName in n.checkItems) {
                e(n.el[itemName]).focus(function (evt) {
                    evt = window.event || evt;
                    var target = evt.srcElement || evt.target;
                    if (target.ele) {
                        e(target.ele).addClass('highlight');
                    }
                });
            }
        };

        this.submitVerify = function () {
            if (!n.el) {
                return false;
            }
            e(n.el).find('[type=submit]').click(function (event) {
                traverseFunc();
                if (!e('.wrong').length && !e('.fv_error').length) {
                    n.el.submit();
                } else {
                    event.preventDefault();
                }
            });
            return n;
        };

        this.intervalVerify = function () {
            setInterval(function () {
                intervalFunc();
            }, 2000);
        };

        this.asyncSubmit = function (ele, url, callback, optParam) {
            if (!n.el) {
                return false;
            }

            e(ele).click(function () {
                var param = {};
                for (var itemName in n.checkItems) {
                    var input = n.el[itemName];
                    var verifyFun = n.checkItems[input.name];
                    if (!e.isFunction(verifyFun)) return;
                    var verifyResult = verifyFun(input.value);
                    if (!verifyResult.code) {
                        n.drewMsg(input, verifyResult.message, "wrong");
                    } else {
                        n.drewMsg(input, verifyResult.message, "correct");
                    }
                    param[itemName] = e(n.el[itemName]).val();
                }
                if (!e('.wrong').length && !e('.fv_error').length) {  //如果有错误
                    if (url) {
                        var extendParams = {};
                        for (paramName in optParam) {
                            var paramFunc = optParam[paramName];
                            if (e.isFunction(paramFunc)) {
                                extendParams[paramName] = paramFunc(e);
                            }
                        }
                        param = e.extend(param, extendParams);
                        e.ajax({
                            type: "POST",
                            url: url,
                            data: param,
                            success: function (data) {
                                e.isFunction(callback) && callback(data, n);
                            }
                        })
                    } else {
                        e.isFunction(callback) && callback();
                    }
                }
            });
            return n;
        };

        this.onblurVerify = function () {
            if (!n.el) {
                return false;
            }

            for (var itemName in n.checkItems) {
                e(n.el[itemName]).blur(function (evt) {
                    evt = window.event || evt;
                    var target = evt.srcElement || evt.target;
                    if (n.opts.errorHighLight && target.ele) {
                        e(target.ele).hasClass('highlight') && e(target.ele).removeClass('highlight');
                    }
                    var value = this.value;
                    var verifyFun = n.checkItems[this.name];
                    if (!e.isFunction(verifyFun)) return;
                    var verifyResult = verifyFun(value);
                    if (!verifyResult.code) {
                        n.drewMsg(target, verifyResult.message, "wrong");
                    } else {
                        n.drewMsg(target, verifyResult.message, "correct");
                    }
                });
            }
        };

        this.drewReturnMsg = function (msg) {
            if (n.opts.errorContainer) {
                var ele = document.createElement('div');
                ele.className = 'fv_error';
                ele.innerHTML = msg;
                e(n.opts.errorContainer).append(ele);
                setTimeout(function () {
                    e(ele).remove();
                }, 3000);
            }
        };

        this.drewMsg = function (obj, msg, type) {
            //function XgetPosition(e) {
            //    var top = 0;
            //    var left = 0;
            //    while (e.offsetParent) {
            //        top += e.offsetTop;
            //        left += e.offsetLeft;
            //        e = e.offsetParent;
            //    }
            //    return {x: left, y: top};
            //}
            function XgetPosition(s, endEle) {
                var top = 0,
                    left = 0;
                while (s.offsetParent) {
                    top += s.offsetTop;
                    left += s.offsetLeft;
                    s = s.offsetParent;
                    if (e(s).attr('id') == endEle.attr('id')) {
                        break;
                    }
                }
                return {x: left, y: top};
            }

            if (n.opts.errorContainer) {
                if (type == 'wrong') {
                    if (!obj.ele) {
                        var ele = document.createElement('div');
                        obj.ele = ele;
                        e(n.opts.errorContainer).append(ele);
                        obj.ele.className = 'fv_error';
                    }
                    obj.ele.innerHTML = msg;
                } else if (type == "correct") {
                    if (obj.ele) {
                        e(obj.ele).remove();
                        obj.ele = undefined;
                    }
                }
            } else {
                var container = n.opts.container;
                if (!obj.ele) {
                    var ele = document.createElement('div');
                    obj.ele = ele;
                    container ? (
                        container.append(ele)
                    ) : (
                        document.body.appendChild(ele)
                    );
                }
                obj.ele.className = type;
                obj.ele.innerHTML = msg == undefined ? "" : msg;
                var xoffset = n.opts.xoffset;
                var yoffset = n.opts.yoffset;
                obj.ele.style.left = (XgetPosition(obj, container).x + (!xoffset ? 0 : xoffset)) + 'px';
                obj.ele.style.top = (XgetPosition(obj, container).y + (!yoffset ? 0 : yoffset)) + 'px';
            }
        }
    };
});
