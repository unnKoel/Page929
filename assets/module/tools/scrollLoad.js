/**
 * Created by common on 2015/9/29.
 */

define(function (require) {
    var a = require('../lib/jquery-1.11.2.min');
    return function (s, b) {
        var c = {
            attr: 'data-url',
            container: a(window),
            callback: a.noop
        };
        var d = a.extend({}, c, b || {});
        d.cache = [];
        a(s).each(function () {
            var h = this.nodeName.toLowerCase(),
                g = a(this).attr(d.attr);
            var i = {
                obj: a(this),
                tag: h,
                url: g
            };
            d.cache.push(i)
        });
        var f = function (g) {
            if (a.isFunction(d.callback)) {
                d.callback.call(g.get(0))
            }
        };
        var e = function () {
            var g = d.container.height();
            if (d.container.get(0) === window) {
                contop = a(window).scrollTop()
            } else {
                contop = d.container.offset().top
            }
            a.each(d.cache, function (m, n) {
                var p = n.obj,
                    j = n.tag,
                    k = n.url,
                    l,
                    h;
                if (p) {
                    l = p.offset().top - contop,
                        h = l + p.height();
                    if ((l >= 0 && l < g) || (h > 0 && h <= g)) {
                        if (k) {
                            if (j === 'img') {
                                f(p.attr('src', k))
                            } else {
                                p.load(k, {}, function () {
                                    f(p)
                                })
                            }
                        } else {
                            f(p)
                        }
                        n.obj = null
                    }
                }
            })
        };
        e();
        d.container.bind('scroll', e)
    }
});