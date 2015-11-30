/**
 * Created by common on 2015/7/8.
 */
define(function () {
    function n(n) {
        function r(n) {
            return l(t(h(n), n.length * A))
        }

        function t(n, r) {
            var t, u, a, h, l, v, A, d, g;
            for (n[r >> 5] |= 128 << r % 32, n[(r + 64 >>> 9 << 4) + 14] = r, t = 1732584193, u = -271733879, a = -1732584194, h = 271733878, l = 0; l < n.length; l += 16)v = t, A = u, d = a, g = h, t = e(t, u, a, h, n[l + 0], 7, -680876936), h = e(h, t, u, a, n[l + 1], 12, -389564586), a = e(a, h, t, u, n[l + 2], 17, 606105819), u = e(u, a, h, t, n[l + 3], 22, -1044525330), t = e(t, u, a, h, n[l + 4], 7, -176418897), h = e(h, t, u, a, n[l + 5], 12, 1200080426), a = e(a, h, t, u, n[l + 6], 17, -1473231341), u = e(u, a, h, t, n[l + 7], 22, -45705983), t = e(t, u, a, h, n[l + 8], 7, 1770035416), h = e(h, t, u, a, n[l + 9], 12, -1958414417), a = e(a, h, t, u, n[l + 10], 17, -42063), u = e(u, a, h, t, n[l + 11], 22, -1990404162), t = e(t, u, a, h, n[l + 12], 7, 1804603682), h = e(h, t, u, a, n[l + 13], 12, -40341101), a = e(a, h, t, u, n[l + 14], 17, -1502002290), u = e(u, a, h, t, n[l + 15], 22, 1236535329), t = c(t, u, a, h, n[l + 1], 5, -165796510), h = c(h, t, u, a, n[l + 6], 9, -1069501632), a = c(a, h, t, u, n[l + 11], 14, 643717713), u = c(u, a, h, t, n[l + 0], 20, -373897302), t = c(t, u, a, h, n[l + 5], 5, -701558691), h = c(h, t, u, a, n[l + 10], 9, 38016083), a = c(a, h, t, u, n[l + 15], 14, -660478335), u = c(u, a, h, t, n[l + 4], 20, -405537848), t = c(t, u, a, h, n[l + 9], 5, 568446438), h = c(h, t, u, a, n[l + 14], 9, -1019803690), a = c(a, h, t, u, n[l + 3], 14, -187363961), u = c(u, a, h, t, n[l + 8], 20, 1163531501), t = c(t, u, a, h, n[l + 13], 5, -1444681467), h = c(h, t, u, a, n[l + 2], 9, -51403784), a = c(a, h, t, u, n[l + 7], 14, 1735328473), u = c(u, a, h, t, n[l + 12], 20, -1926607734), t = o(t, u, a, h, n[l + 5], 4, -378558), h = o(h, t, u, a, n[l + 8], 11, -2022574463), a = o(a, h, t, u, n[l + 11], 16, 1839030562), u = o(u, a, h, t, n[l + 14], 23, -35309556), t = o(t, u, a, h, n[l + 1], 4, -1530992060), h = o(h, t, u, a, n[l + 4], 11, 1272893353), a = o(a, h, t, u, n[l + 7], 16, -155497632), u = o(u, a, h, t, n[l + 10], 23, -1094730640), t = o(t, u, a, h, n[l + 13], 4, 681279174), h = o(h, t, u, a, n[l + 0], 11, -358537222), a = o(a, h, t, u, n[l + 3], 16, -722521979), u = o(u, a, h, t, n[l + 6], 23, 76029189), t = o(t, u, a, h, n[l + 9], 4, -640364487), h = o(h, t, u, a, n[l + 12], 11, -421815835), a = o(a, h, t, u, n[l + 15], 16, 530742520), u = o(u, a, h, t, n[l + 2], 23, -995338651), t = f(t, u, a, h, n[l + 0], 6, -198630844), h = f(h, t, u, a, n[l + 7], 10, 1126891415), a = f(a, h, t, u, n[l + 14], 15, -1416354905), u = f(u, a, h, t, n[l + 5], 21, -57434055), t = f(t, u, a, h, n[l + 12], 6, 1700485571), h = f(h, t, u, a, n[l + 3], 10, -1894986606), a = f(a, h, t, u, n[l + 10], 15, -1051523), u = f(u, a, h, t, n[l + 1], 21, -2054922799), t = f(t, u, a, h, n[l + 8], 6, 1873313359), h = f(h, t, u, a, n[l + 15], 10, -30611744), a = f(a, h, t, u, n[l + 6], 15, -1560198380), u = f(u, a, h, t, n[l + 13], 21, 1309151649), t = f(t, u, a, h, n[l + 4], 6, -145523070), h = f(h, t, u, a, n[l + 11], 10, -1120210379), a = f(a, h, t, u, n[l + 2], 15, 718787259), u = f(u, a, h, t, n[l + 9], 21, -343485551), t = i(t, v), u = i(u, A), a = i(a, d), h = i(h, g);
            return Array(t, u, a, h)
        }

        function u(n, r, t, u, e, c) {
            return i(a(i(i(r, n), i(u, c)), e), t)
        }

        function e(n, r, t, e, c, o, f) {
            return u(r & t | ~r & e, n, r, c, o, f)
        }

        function c(n, r, t, e, c, o, f) {
            return u(r & e | t & ~e, n, r, c, o, f)
        }

        function o(n, r, t, e, c, o, f) {
            return u(r ^ t ^ e, n, r, c, o, f)
        }

        function f(n, r, t, e, c, o, f) {
            return u(t ^ (r | ~e), n, r, c, o, f)
        }

        function i(n, r) {
            var t = (65535 & n) + (65535 & r), u = (n >> 16) + (r >> 16) + (t >> 16);
            return u << 16 | 65535 & t
        }

        function a(n, r) {
            return n << r | n >>> 32 - r
        }

        function h(n) {
            var r, t = Array(), u = (1 << A) - 1;
            for (r = 0; r < n.length * A; r += A)t[r >> 5] |= (n.charCodeAt(r / A) & u) << r % 32;
            return t
        }

        function l(n) {
            var r, t = v ? "0123456789ABCDEF" : "0123456789abcdef", u = "";
            for (r = 0; r < 4 * n.length; r++)u += t.charAt(n[r >> 2] >> r % 4 * 8 + 4 & 15) + t.charAt(n[r >> 2] >> r % 4 * 8 & 15);
            return u
        }

        var v = 0, A = 8;
        return r(n)
    }

    return n
});