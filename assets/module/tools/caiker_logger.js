/**
 * Created by common on 2015/10/23.
 */
define(function (require) {
    var c = {
            jsName: "caiker_track_online",
            defaultVer: 20150720,
            getVersion: function () {
                var p = this.jsName;
                var l = new RegExp(p + "(\\?(.*))?$");
                var o = b.getElementsByTagName("script");
                for (var n = 0; n < o.length; n++) {
                    var m = o[n];
                    if (m.src && m.src.match(l)) {
                        var k = m.src.match(l)[2];
                        if (k && (/^[a-zA-Z0-9]+$/).test(k)) {
                            return k
                        }
                    }
                }
                return this.defaultVer
            },
            getCookie: function (j) {
                var i = b.cookie.match(new RegExp("(^| )" + j + "=([^;]*)(;|$)"));
                return (i != null) ? unescape(i[2]) : "-"
            },
            setCookie: function (n, k, o, m, j, l) {
                var i = new Date;
                o = typeof o == "undefined" ? "" : ";expires=" + new Date(i.getTime() + (o * 24 * 60 * 60 * 1000)).toUTCString();
                b.cookie = n + "=" + k + o + ((j == null) ? "" : ("; domain=" + j)) + ((m == null) ? "" : ("; path=" + m)) + ((l == true) ? "; secure" : "")
            },
            parseError: function (k) {
                var l = "";
                for (var j in k) {
                    l += j + "=" + k[j] + ";"
                }
                return l
            },
            getRand: function () {
                var k = new Date,
                    i = function (p, q, n) {
                        p = p.toString(36).split("");
                        q = q / 4 | 0;
                        n = n / 4 | 0;
                        for (var o = q; o <= n; o++) {
                            !p[o] && (p[o] = 0)
                        }
                        return p.slice(q, n + 1).join("")
                    },
                    j = function (n) {
                        return Math.random() * (n + 1) | 0
                    },
                    m = function (q) {
                        q = q.replace(/./g,
                            function (p) {
                                return p.charCodeAt()
                            }).split("");
                        var s = 16777619,
                            r = 2166136261,
                            n = q.length;
                        for (var o = 0; o < n; o++) {
                            r = (r ^ q[o]) * s
                        }
                        r += r << 13;
                        r ^= r >> 7;
                        r += r << 3;
                        r ^= r >> 17;
                        r += r << 5;
                        r = r & 2147483647;
                        r = r.toString(36);
                        r.length < 6 && (r += (n % 36).toString(36));
                        return r
                    },
                    l = [screen.width, screen.height, navigator.plugins.length, navigator.javaEnabled(), screen.colorDepth, location.href, navigator.userAgent].join("");
                return function () {
                    var q = new Date,
                        p = ( +q + 631152000000).toString(36),
                        n = i(j(4095), 0, 7) + i(j(8191), 0, 7) + i(j(8191), 0, 8),
                        r = Math.random() * (251) + 50 | 0,
                        o = [];
                    p.length < 9 && (p += (q % 36).toString(36));
                    for (; r--;) {
                        o.push(Math.random())
                    }
                    return m(l) + m([b.documentElement.offsetWidth, b.documentElement.offsetHeight, history.length, new Date - k].join("")) + p + n + m(o.slice(0, 10).join("")) + m(o.slice(r - 9).join(""))
                }
            }(),
            getParam: function (m) {
                var i = null;
                if (m) {
                    if (c.isString(m) || c.isNumber(m)) {
                        i = m
                    } else {
                        if (c.isObject(m)) {
                            var n = "";
                            for (var l in m) {
                                if (m[l] != null && m[l] != h) {
                                    var j = m[l];
                                    if (c.isArray(j)) {
                                        j = j.join(",")
                                    } else {
                                        if (c.isDate(j)) {
                                            j = j.getTime()
                                        }
                                    }
                                    n += l + "=" + j + "&"
                                }
                            }
                            n = n.substring(0, n.length - 1);
                            i = n
                        } else {
                            if (c.isArray(m)) {
                                if (m.length & m.length > 0) {
                                    i = m.join(",")
                                }
                            } else {
                                i = m.toString()
                            }
                        }
                    }
                }
                if (!i) {
                    i = "-"
                }
                return i
            },
            caiker_encode: function (q) {
                var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var m, o, j;
                var p, n, l;
                j = q.length;
                o = 0;
                m = "";
                while (o < j) {
                    p = q.charCodeAt(o++) & 255;
                    if (o == j) {
                        m += k.charAt(p >> 2);
                        m += k.charAt((p & 3) << 4);
                        m += "==";
                        break
                    }
                    n = q.charCodeAt(o++);
                    if (o == j) {
                        m += k.charAt(p >> 2);
                        m += k.charAt(((p & 3) << 4) | ((n & 240) >> 4));
                        m += k.charAt((n & 15) << 2);
                        m += "=";
                        break
                    }
                    l = q.charCodeAt(o++);
                    m += k.charAt(p >> 2);
                    m += k.charAt(((p & 3) << 4) | ((n & 240) >> 4));
                    m += k.charAt(((n & 15) << 2) | ((l & 192) >> 6));
                    m += k.charAt(l & 63)
                }
                return m
            },
            isString: function (i) {
                return (i != null) && (i != h) && (typeof i == "string") && (i.constructor == String)
            },
            isNumber: function (i) {
                return (typeof i == "number") && (i.constructor == Number)
            },
            isDate: function (i) {
                return i && (typeof i == "object") && i.constructor == Date
            },
            isArray: function (i) {
                return i && (typeof i == "object") && (i.constructor == Array)
            },
            isObject: function (i) {
                return i && (typeof i == "object") && (i.constructor == Object)
            }
        },
        a,
        b = document,
        g = window,
        h = undefined,
        d = function () {
            var i = [];
            return function (k) {
                var j = i.push(new Image) - 1;
                i[j].src = k
            }
        }(),
        e = isNaN(e = +c.getCookie("vc_ol")) ? 1 : e + 1;
    c.setCookie("vc_ol", e);
    return {
        beaconUrl: "tc.51caiker.com/s.gif",
        errorUrl: "tc.51caiker.com/e.gif",
        clickUrl: "tc.51caiker.com/c.gif",
        pageId: typeof _beacon_pageid != "undefined" ? _beacon_pageid : (_beacon_pageid = c.getRand()),
        protocol: function () {
            var i = location.protocol;
            if ("file:" === i) {
                i = "http:"
            }
            return i + "//"
        }(),
        tracking: function () {
            this.beaconLog()
        },
        beaconLog: function () {
            try {
                var q = this;
                a = c.getParam(this.getRefer());
                if (a.length > 251) {
                    a = a.substring(0, 250)
                }
                a = "{" + c.caiker_encode(a) + "}";
                q.userDataObj = {};
                var j = c.getCookie("b_t_s_o");
                var m = j.split(":");
                var n = 1;
                if (m.length == 4) {
                    n = 0
                }
                var i = q.memId;
                if (!i) {
                    i = 0
                }
                q.userDataObj.memId = i;
                q.userDataObj.subIsNew = n;
                q.userDataObj.uvId = j;
                var k = q.pageId;
                var l = b.charset || b.characterSet;
                var p = ["pId=" + k, "eId=0", "isNew=" + q.userDataObj.subIsNew, "memId=" + q.userDataObj.memId, "vc=" + e, "sr=" + g.screen.width + "*" + g.screen.height, "charset=" + l];
                q.sendRequest(q.beaconUrl, p)
            } catch (o) {
                this.sendError(o)
            }
        },
        getRefer: function () {
            var i = b.referrer;
            i == location.href && (i = "");
            try {
                i = "" == i ? opener.location : i;
                i = "" == i ? "-" : i
            } catch (j) {
                i = "-"
            }
            return i
        },
        clickLog: function (k) {
            try {
                var n = this;
                var i = n.pageId;
                if (!i) {
                    return
                }
                var j = n.memId;
                if (!j) {
                    j = 0
                }
                if (!k) {
                    k = 0
                }
                var m = ["pId=" + i, "eId=" + k, "isNew=" + n.userDataObj.subIsNew, "memId=" + j, "vc=0", "sr=-", "charset=-"];
                a = "{-}";
                this.sendRequest(this.clickUrl, m)
            } catch (l) {
                this.sendError(l)
            }
        },
        sendError: function (k) {
            var j = c.parseError(k);
            var i = this.errorUrl + "?type=send&exception=" + encodeURIComponent(j.toString());
            var l = new Image();
            l.onload = function () {
                l = null
            };
            l.src = this.protocol + i
        },
        sendRequest: function (j, l) {
            var u = "";
            var w = new Date();
            var p = w.getTime();
            var t = "";
            var r = 0;
            var m = 0;
            var k = 0;
            var s = "";
            if (!this.userDataObj.subIsNew) {
                var n = this.userDataObj.uvId.split(":");
                t = n[0];
                r = n[1];
                m = n[2];
                k = n[3];
                var v = p - r;
                if (v >= 1800000) {
                    m = p;
                    k = 1;
                    this.userDataObj.uvId = t + ":" + r + ":" + m + ":" + k
                }
            } else {
                t = c.getRand();
                m = p;
                if ("-" == c.getCookie("vc_ol")) {
                    k = 0
                } else {
                    k = 1
                }
                this.userDataObj.uvId = t + ":0" + ":" + m + ":" + k
            }
            s = t + ":" + p + ":" + m + ":" + (parseInt(k) + 1);
            l.push("uvId=" + this.userDataObj.uvId);
            l = l.join("&");
            try {
                if (l) {
                    u = c.getParam(l);
                    var i = Math.random();
                    var x = 1 + Math.round(i * 8);
                    u = "r={" + x + c.caiker_encode(u) + "}&ref=" + a
                }
                var q = "&ver=" + c.getVersion() + "&time=" + p;
                j = this.protocol + j + "?" + u + q;
                c.setCookie("b_t_s_f_o", s, 10000, "/", ".51caiker.com");
                d(j);
                this.userDataObj.subIsNew = 0;
                this.userDataObj.uvId = s
            } catch (o) {
                this.sendError(o)
            }
        }
    };
});