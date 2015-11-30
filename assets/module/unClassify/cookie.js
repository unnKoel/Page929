/**
 * Created by common on 2015/7/8.
 */
define(function () {
    var e = {
        get: function (e) {
            var t, n, i, o = e + "=",
                r = document.cookie.split(";");
            for (t = 0; t < r.length; t++) {
                for (n = r[t];
                     " " == n.charAt(0);) n = n.substring(1, n.length);
                if (0 == n.indexOf(o)) {
                    try {
                        i = decodeURIComponent(n.substring(o.length, n.length))
                    } catch (u) {
                        i = unescape(n.substring(o.length, n.length))
                    }
                    return i
                }
            }
            return null
        },
        set: function (e, t, n, i, o, r) {
            var u, c;
            "number" == typeof n ? (c = new Date, c.setTime(c.getTime() + 24 * n * 60 * 60 * 1e3), u = c.toGMTString()) : u = "string" == typeof n ? n : !1,
                document.cookie = e + "=" + encodeURIComponent(t) + (u ? ";expires=" + u : "") + (i ? ";path=" + i : "") + (o ? ";domain=" + o : "") + (r ? ";secure" : "")
        },
        del: function (e, t, n, i) {
            this.set(e, "", -1, t, n, i)
        },
        isLogin: function () {
            return null != this.get("user_id")
        }
    };
    return e
});