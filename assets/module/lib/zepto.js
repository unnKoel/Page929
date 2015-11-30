/**
 * Created by common on 2015/7/8.
 */
define(function () {
    var t, n;
    return function (t) {
        String.prototype.trim === t && (String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, "")
        }),
        Array.prototype.reduce === t && (Array.prototype.reduce = function (n) {
            if (void 0 === this || null === this) throw new TypeError;
            var e, i = Object(this),
                r = i.length >>> 0,
                o = 0;
            if ("function" != typeof n) throw new TypeError;
            if (0 == r && 1 == arguments.length) throw new TypeError;
            if (arguments.length >= 2) e = arguments[1];
            else for (; ;) {
                if (o in i) {
                    e = i[o++];
                    break
                }
                if (++o >= r) throw new TypeError
            }
            for (; r > o;) o in i && (e = n.call(t, e, i[o], o, i)),
                o++;
            return e
        })
    }(),
        t = function () {
            function t(t) {
                return null == t ? String(t) : J[G.call(t)] || "object"
            }

            function n(n) {
                return "function" == t(n)
            }

            function e(t) {
                return null != t && t == t.window
            }

            function i(t) {
                return null != t && t.nodeType == t.DOCUMENT_NODE
            }

            function r(n) {
                return "object" == t(n)
            }

            function o(t) {
                return r(t) && !e(t) && t.__proto__ == Object.prototype
            }

            function a(t) {
                return t instanceof Array
            }

            function s(t) {
                return "number" == typeof t.length
            }

            function u(t) {
                return P.call(t,
                    function (t) {
                        return null != t
                    })
            }

            function c(t) {
                return t.length > 0 ? S.fn.concat.apply([], t) : t
            }

            function l(t) {
                return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            }

            function f(t) {
                return t in D ? D[t] : D[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
            }

            function h(t, n) {
                return "number" != typeof n || _[l(t)] ? n : n + "px"
            }

            function p(t) {
                var n, e;
                return M[t] || (n = k.createElement(t), k.body.appendChild(n), e = R(n, "").getPropertyValue("display"), n.parentNode.removeChild(n), "none" == e && (e = "block"), M[t] = e),
                    M[t]
            }

            function d(t) {
                return "children" in t ? O.call(t.children) : S.map(t.childNodes,
                    function (t) {
                        return 1 == t.nodeType ? t : void 0
                    })
            }

            function m(t, n, e) {
                for (E in n) e && (o(n[E]) || a(n[E])) ? (o(n[E]) && !o(t[E]) && (t[E] = {}), a(n[E]) && !a(t[E]) && (t[E] = []), m(t[E], n[E], e)) : n[E] !== T && (t[E] = n[E])
            }

            function g(t, n) {
                return n === T ? S(t) : S(t).filter(n)
            }

            function v(t, e, i, r) {
                return n(e) ? e.call(t, i, r) : e
            }

            function y(t, n, e) {
                null == e ? t.removeAttribute(n) : t.setAttribute(n, e)
            }

            function b(t, n) {
                var e = t.className,
                    i = e && e.baseVal !== T;
                return n === T ? i ? e.baseVal : e : void(i ? e.baseVal = n : t.className = n)
            }

            function x(t) {
                var n;
                try {
                    return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : isNaN(n = Number(t)) ? /^[\[\{]/.test(t) ? S.parseJSON(t) : t : n) : t
                } catch (e) {
                    return t
                }
            }

            function w(t, n) {
                n(t);
                for (var e in t.childNodes) w(t.childNodes[e], n)
            }

            var T, E, S, j, A, N, C = [],
                O = C.slice,
                P = C.filter,
                k = window.document,
                M = {},
                D = {},
                R = k.defaultView.getComputedStyle,
                _ = {
                    "column-count": 1,
                    columns: 1,
                    "font-weight": 1,
                    "line-height": 1,
                    opacity: 1,
                    "z-index": 1,
                    zoom: 1
                },
                $ = /^\s*<(\w+|!)[^>]*>/,
                z = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                L = /^(?:body|html)$/i,
                q = ["val", "css", "html", "text", "data", "width", "height", "offset"],
                I = ["after", "prepend", "before", "append"],
                B = k.createElement("table"),
                F = k.createElement("tr"),
                U = {
                    tr: k.createElement("tbody"),
                    tbody: B,
                    thead: B,
                    tfoot: B,
                    td: F,
                    th: F,
                    "*": k.createElement("div")
                },
                Z = /complete|loaded|interactive/,
                H = /^\.([\w-]+)$/,
                V = /^#([\w-]*)$/,
                X = /^[\w-]+$/,
                J = {},
                G = J.toString,
                W = {},
                Y = k.createElement("div");
            return W.matches = function (t, n) {
                var e, i, r, o;
                return t && 1 === t.nodeType ? (e = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector) ? e.call(t, n) : (r = t.parentNode, o = !r, o && (r = Y).appendChild(t), i = ~W.qsa(r, n).indexOf(t), o && Y.removeChild(t), i) : !1
            },
                A = function (t) {
                    return t.replace(/-+(.)?/g,
                        function (t, n) {
                            return n ? n.toUpperCase() : ""
                        })
                },
                N = function (t) {
                    return P.call(t,
                        function (n, e) {
                            return t.indexOf(n) == e
                        })
                },
                W.fragment = function (t, n, e) {
                    t.replace && (t = t.replace(z, "<$1></$2>")),
                    n === T && (n = $.test(t) && RegExp.$1),
                    n in U || (n = "*");
                    var i, r, a = U[n];
                    return a.innerHTML = "" + t,
                        r = S.each(O.call(a.childNodes),
                            function () {
                                a.removeChild(this)
                            }),
                    o(e) && (i = S(r), S.each(e,
                        function (t, n) {
                            q.indexOf(t) > -1 ? i[t](n) : i.attr(t, n)
                        })),
                        r
                },
                W.Z = function (t, n) {
                    return t = t || [],
                        t.__proto__ = S.fn,
                        t.selector = n || "",
                        t
                },
                W.isZ = function (t) {
                    return t instanceof W.Z
                },
                W.init = function (t, e) {
                    if (t) {
                        if (n(t)) return S(k).ready(t);
                        if (W.isZ(t)) return t;
                        var i;
                        if (a(t)) i = u(t);
                        else if (r(t)) i = [o(t) ? S.extend({},
                            t) : t],
                            t = null;
                        else if ($.test(t)) i = W.fragment(t.trim(), RegExp.$1, e),
                            t = null;
                        else {
                            if (e !== T) return S(e).find(t);
                            i = W.qsa(k, t)
                        }
                        return W.Z(i, t)
                    }
                    return W.Z()
                },
                S = function (t, n) {
                    return W.init(t, n)
                },
                S.extend = function (t) {
                    var n, e = O.call(arguments, 1);
                    return "boolean" == typeof t && (n = t, t = e.shift()),
                        e.forEach(function (e) {
                            m(t, e, n)
                        }),
                        t
                },
                W.qsa = function (t, n) {
                    var e;
                    return i(t) && V.test(n) ? (e = t.getElementById(RegExp.$1)) ? [e] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : O.call(H.test(n) ? t.getElementsByClassName(RegExp.$1) : X.test(n) ? t.getElementsByTagName(n) : t.querySelectorAll(n))
                },
                S.contains = function (t, n) {
                    return t !== n && t.contains(n)
                },
                S.type = t,
                S.isFunction = n,
                S.isWindow = e,
                S.isArray = a,
                S.isPlainObject = o,
                S.isEmptyObject = function (t) {
                    var n;
                    for (n in t) return !1;
                    return !0
                },
                S.inArray = function (t, n, e) {
                    return C.indexOf.call(n, t, e)
                },
                S.camelCase = A,
                S.trim = function (t) {
                    return t.trim()
                },
                S.uuid = 0,
                S.support = {},
                S.expr = {},
                S.map = function (t, n) {
                    var e, i, r, o = [];
                    if (s(t)) for (i = 0; i < t.length; i++) e = n(t[i], i),
                    null != e && o.push(e);
                    else for (r in t) e = n(t[r], r),
                    null != e && o.push(e);
                    return c(o)
                },
                S.each = function (t, n) {
                    var e, i;
                    if (s(t)) {
                        for (e = 0; e < t.length; e++) if (n.call(t[e], e, t[e]) === !1) return t
                    } else for (i in t) if (n.call(t[i], i, t[i]) === !1) return t;
                    return t
                },
                S.grep = function (t, n) {
                    return P.call(t, n)
                },
            window.JSON && (S.parseJSON = JSON.parse),
                S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
                    function (t, n) {
                        J["[object " + n + "]"] = n.toLowerCase()
                    }),
                S.fn = {
                    forEach: C.forEach,
                    reduce: C.reduce,
                    push: C.push,
                    sort: C.sort,
                    indexOf: C.indexOf,
                    concat: C.concat,
                    map: function (t) {
                        return S(S.map(this,
                            function (n, e) {
                                return t.call(n, e, n)
                            }))
                    },
                    slice: function () {
                        return S(O.apply(this, arguments))
                    },
                    ready: function (t) {
                        return Z.test(k.readyState) ? t(S) : k.addEventListener("DOMContentLoaded",
                            function () {
                                t(S)
                            },
                            !1),
                            this
                    },
                    get: function (t) {
                        return t === T ? O.call(this) : this[t >= 0 ? t : t + this.length]
                    },
                    toArray: function () {
                        return this.get()
                    },
                    size: function () {
                        return this.length
                    },
                    remove: function () {
                        return this.each(function () {
                            null != this.parentNode && this.parentNode.removeChild(this)
                        })
                    },
                    each: function (t) {
                        return C.every.call(this,
                            function (n, e) {
                                return t.call(n, e, n) !== !1
                            }),
                            this
                    },
                    filter: function (t) {
                        return n(t) ? this.not(this.not(t)) : S(P.call(this,
                            function (n) {
                                return W.matches(n, t)
                            }))
                    },
                    add: function (t, n) {
                        return S(N(this.concat(S(t, n))))
                    },
                    is: function (t) {
                        return this.length > 0 && W.matches(this[0], t)
                    },
                    not: function (t) {
                        var e, i = [];
                        return n(t) && t.call !== T ? this.each(function (n) {
                            t.call(this, n) || i.push(this)
                        }) : (e = "string" == typeof t ? this.filter(t) : s(t) && n(t.item) ? O.call(t) : S(t), this.forEach(function (t) {
                            e.indexOf(t) < 0 && i.push(t)
                        })),
                            S(i)
                    },
                    has: function (t) {
                        return this.filter(function () {
                            return r(t) ? S.contains(this, t) : S(this).find(t).size()
                        })
                    },
                    eq: function (t) {
                        return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
                    },
                    first: function () {
                        var t = this[0];
                        return t && !r(t) ? t : S(t)
                    },
                    last: function () {
                        var t = this[this.length - 1];
                        return t && !r(t) ? t : S(t)
                    },
                    find: function (t) {
                        var n, e = this;
                        return n = "object" == typeof t ? S(t).filter(function () {
                            var t = this;
                            return C.some.call(e,
                                function (n) {
                                    return S.contains(n, t)
                                })
                        }) : 1 == this.length ? S(W.qsa(this[0], t)) : this.map(function () {
                            return W.qsa(this, t)
                        })
                    },
                    closest: function (t, n) {
                        var e = this[0],
                            r = !1;
                        for ("object" == typeof t && (r = S(t)); e && !(r ? r.indexOf(e) >= 0 : W.matches(e, t));) e = e !== n && !i(e) && e.parentNode;
                        return S(e)
                    },
                    parents: function (t) {
                        for (var n = [], e = this; e.length > 0;) e = S.map(e,
                            function (t) {
                                return (t = t.parentNode) && !i(t) && n.indexOf(t) < 0 ? (n.push(t), t) : void 0
                            });
                        return g(n, t)
                    },
                    parent: function (t) {
                        return g(N(this.pluck("parentNode")), t)
                    },
                    children: function (t) {
                        return g(this.map(function () {
                            return d(this)
                        }), t)
                    },
                    contents: function () {
                        return this.map(function () {
                            return O.call(this.childNodes)
                        })
                    },
                    siblings: function (t) {
                        return g(this.map(function (t, n) {
                            return P.call(d(n.parentNode),
                                function (t) {
                                    return t !== n
                                })
                        }), t)
                    },
                    empty: function () {
                        return this.each(function () {
                            this.innerHTML = ""
                        })
                    },
                    pluck: function (t) {
                        return S.map(this,
                            function (n) {
                                return n[t]
                            })
                    },
                    show: function () {
                        return this.each(function () {
                            "none" == this.style.display && (this.style.display = null),
                            "none" == R(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName))
                        })
                    },
                    replaceWith: function (t) {
                        return this.before(t).remove()
                    },
                    wrap: function (t) {
                        var e, i, r = n(t);
                        return this[0] && !r && (e = S(t).get(0), i = e.parentNode || this.length > 1),
                            this.each(function (n) {
                                S(this).wrapAll(r ? t.call(this, n) : i ? e.cloneNode(!0) : e)
                            })
                    },
                    wrapAll: function (t) {
                        if (this[0]) {
                            S(this[0]).before(t = S(t));
                            for (var n; (n = t.children()).length;) t = n.first();
                            S(t).append(this)
                        }
                        return this
                    },
                    wrapInner: function (t) {
                        var e = n(t);
                        return this.each(function (n) {
                            var i = S(this),
                                r = i.contents(),
                                o = e ? t.call(this, n) : t;
                            r.length ? r.wrapAll(o) : i.append(o)
                        })
                    },
                    unwrap: function () {
                        return this.parent().each(function () {
                            S(this).replaceWith(S(this).children())
                        }),
                            this
                    },
                    clone: function () {
                        return this.map(function () {
                            return this.cloneNode(!0)
                        })
                    },
                    hide: function () {
                        return this.css("display", "none")
                    },
                    toggle: function (t) {
                        return this.each(function () {
                            var n = S(this);
                            (t === T ? "none" == n.css("display") : t) ? n.show() : n.hide()
                        })
                    },
                    prev: function (t) {
                        return S(this.pluck("previousElementSibling")).filter(t || "*")
                    },
                    next: function (t) {
                        return S(this.pluck("nextElementSibling")).filter(t || "*")
                    },
                    html: function (t) {
                        return t === T ? this.length > 0 ? this[0].innerHTML : null : this.each(function (n) {
                            var e = this.innerHTML;
                            S(this).empty().append(v(this, t, n, e))
                        })
                    },
                    text: function (t) {
                        return t === T ? this.length > 0 ? this[0].textContent : null : this.each(function () {
                            this.textContent = t
                        })
                    },
                    attr: function (t, n) {
                        var e;
                        return "string" == typeof t && n === T ? 0 == this.length || 1 !== this[0].nodeType ? T : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(e = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : e : this.each(function (e) {
                            if (1 === this.nodeType) if (r(t)) for (E in t) y(this, E, t[E]);
                            else y(this, t, v(this, n, e, this.getAttribute(t)))
                        })
                    },
                    removeAttr: function (t) {
                        return this.each(function () {
                            1 === this.nodeType && y(this, t)
                        })
                    },
                    prop: function (t, n) {
                        return n === T ? this[0] && this[0][t] : this.each(function (e) {
                            this[t] = v(this, n, e, this[t])
                        })
                    },
                    data: function (t, n) {
                        var e = this.attr("data-" + l(t), n);
                        return null !== e ? x(e) : T
                    },
                    val: function (t) {
                        return t === T ? this[0] && (this[0].multiple ? S(this[0]).find("option").filter(function () {
                            return this.selected
                        }).pluck("value") : this[0].value) : this.each(function (n) {
                            this.value = v(this, t, n, this.value)
                        })
                    },
                    offset: function (t) {
                        if (t) return this.each(function (n) {
                            var e = S(this),
                                i = v(this, t, n, e.offset()),
                                r = e.offsetParent().offset(),
                                o = {
                                    top: i.top - r.top,
                                    left: i.left - r.left
                                };
                            "static" == e.css("position") && (o.position = "relative"),
                                e.css(o)
                        });
                        if (0 == this.length) return null;
                        var n = this[0].getBoundingClientRect();
                        return {
                            left: n.left + window.pageXOffset,
                            top: n.top + window.pageYOffset,
                            width: Math.round(n.width),
                            height: Math.round(n.height)
                        }
                    },
                    css: function (n, e) {
                        if (arguments.length < 2 && "string" == typeof n) return this[0] && (this[0].style[A(n)] || R(this[0], "").getPropertyValue(n));
                        var i = "";
                        if ("string" == t(n)) e || 0 === e ? i = l(n) + ":" + h(n, e) : this.each(function () {
                            this.style.removeProperty(l(n))
                        });
                        else for (E in n) n[E] || 0 === n[E] ? i += l(E) + ":" + h(E, n[E]) + ";" : this.each(function () {
                            this.style.removeProperty(l(E))
                        });
                        return this.each(function () {
                            this.style.cssText += ";" + i
                        })
                    },
                    index: function (t) {
                        return t ? this.indexOf(S(t)[0]) : this.parent().children().indexOf(this[0])
                    },
                    hasClass: function (t) {
                        return C.some.call(this,
                            function (t) {
                                return this.test(b(t))
                            },
                            f(t))
                    },
                    addClass: function (t) {
                        return this.each(function (n) {
                            j = [];
                            var e = b(this),
                                i = v(this, t, n, e);
                            i.split(/\s+/g).forEach(function (t) {
                                    S(this).hasClass(t) || j.push(t)
                                },
                                this),
                            j.length && b(this, e + (e ? " " : "") + j.join(" "))
                        })
                    },
                    removeClass: function (t) {
                        return this.each(function (n) {
                            return t === T ? b(this, "") : (j = b(this), v(this, t, n, j).split(/\s+/g).forEach(function (t) {
                                j = j.replace(f(t), " ")
                            }), void b(this, j.trim()))
                        })
                    },
                    toggleClass: function (t, n) {
                        return this.each(function (e) {
                            var i = S(this),
                                r = v(this, t, e, b(this));
                            r.split(/\s+/g).forEach(function (t) {
                                (n === T ? !i.hasClass(t) : n) ? i.addClass(t) : i.removeClass(t)
                            })
                        })
                    },
                    scrollTop: function () {
                        return this.length ? "scrollTop" in this[0] ? this[0].scrollTop : this[0].scrollY : void 0
                    },
                    position: function () {
                        if (this.length) {
                            var t = this[0],
                                n = this.offsetParent(),
                                e = this.offset(),
                                i = L.test(n[0].nodeName) ? {
                                    top: 0,
                                    left: 0
                                } : n.offset();
                            return e.top -= parseFloat(S(t).css("margin-top")) || 0,
                                e.left -= parseFloat(S(t).css("margin-left")) || 0,
                                i.top += parseFloat(S(n[0]).css("border-top-width")) || 0,
                                i.left += parseFloat(S(n[0]).css("border-left-width")) || 0,
                            {
                                top: e.top - i.top,
                                left: e.left - i.left
                            }
                        }
                    },
                    offsetParent: function () {
                        return this.map(function () {
                            for (var t = this.offsetParent || k.body; t && !L.test(t.nodeName) && "static" == S(t).css("position");) t = t.offsetParent;
                            return t
                        })
                    }
                },
                S.fn.detach = S.fn.remove,
                ["width", "height"].forEach(function (t) {
                    S.fn[t] = function (n) {
                        var r, o = this[0],
                            a = t.replace(/./,
                                function (t) {
                                    return t[0].toUpperCase()
                                });
                        return n === T ? e(o) ? o["inner" + a] : i(o) ? o.documentElement["offset" + a] : (r = this.offset()) && r[t] : this.each(function (e) {
                            o = S(this),
                                o.css(t, v(this, n, e, o[t]()))
                        })
                    }
                }),
                I.forEach(function (n, e) {
                    var i = e % 2;
                    S.fn[n] = function () {
                        var n, r, o = S.map(arguments,
                                function (e) {
                                    return n = t(e),
                                        "object" == n || "array" == n || null == e ? e : W.fragment(e)
                                }),
                            a = this.length > 1;
                        return o.length < 1 ? this : this.each(function (t, n) {
                            r = i ? n : n.parentNode,
                                n = 0 == e ? n.nextSibling : 1 == e ? n.firstChild : 2 == e ? n : null,
                                o.forEach(function (t) {
                                    if (a) t = t.cloneNode(!0);
                                    else if (!r) return S(t).remove();
                                    w(r.insertBefore(t, n),
                                        function (t) {
                                            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                                        })
                                })
                        })
                    },
                        S.fn[i ? n + "To" : "insert" + (e ? "Before" : "After")] = function (t) {
                            return S(t)[n](this),
                                this
                        }
                }),
                W.Z.prototype = S.fn,
                W.uniq = N,
                W.deserializeValue = x,
                S.zepto = W,
                S
        }(),
        window.Zepto = t,
    "$" in window || (window.$ = t),
        function (t) {
            function n(t) {
                var n = this.os = {},
                    e = this.browser = {},
                    i = t.match(/WebKit\/([\d.]+)/),
                    r = t.match(/(Android)\s+([\d.]+)/),
                    o = t.match(/(iPad).*OS\s([\d_]+)/),
                    a = !o && t.match(/(iPhone\sOS)\s([\d_]+)/),
                    s = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                    u = s && t.match(/TouchPad/),
                    c = t.match(/Kindle\/([\d.]+)/),
                    l = t.match(/Silk\/([\d._]+)/),
                    f = t.match(/(BlackBerry).*Version\/([\d.]+)/),
                    h = t.match(/(BB10).*Version\/([\d.]+)/),
                    p = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
                    d = t.match(/PlayBook/),
                    m = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
                    g = t.match(/Firefox\/([\d.]+)/),
                    v = t.match(/MicroMessenger\/([\d\.]+)\s/);
                (e.webkit = !!i) && (e.version = i[1]),
                r && (n.android = !0, n.version = r[2]),
                a && (n.ios = n.iphone = !0, n.version = a[2].replace(/_/g, ".")),
                o && (n.ios = n.ipad = !0, n.version = o[2].replace(/_/g, ".")),
                s && (n.webos = !0, n.version = s[2]),
                u && (n.touchpad = !0),
                f && (n.blackberry = !0, n.version = f[2]),
                h && (n.bb10 = !0, n.version = h[2]),
                p && (n.rimtabletos = !0, n.version = p[2]),
                d && (e.playbook = !0),
                c && (n.kindle = !0, n.version = c[1]),
                l && (e.silk = !0, e.version = l[1]),
                !l && n.android && t.match(/Kindle Fire/) && (e.silk = !0),
                m && (e.chrome = !0, e.version = m[1]),
                g && (e.firefox = !0, e.version = g[1]),
                v && (n.wx = !0, n.wxversion = v[1]),
                    n.tablet = !!(o || d || r && !t.match(/Mobile/) || g && t.match(/Tablet/)),
                    n.phone = !(n.tablet || !(r || a || s || f || h || m && t.match(/Android/) || m && t.match(/CriOS\/([\d.]+)/) || g && t.match(/Mobile/)))
            }

            n.call(t, navigator.userAgent),
                t.__detect = n
        }(t),
        function (t) {
            function n(t) {
                return t._zid || (t._zid = v++)
            }

            function e(t, e, o, a) {
                if (e = i(e), e.ns) var s = r(e.ns);
                return (g[n(t)] || []).filter(function (t) {
                    return !(!t || e.e && t.e != e.e || e.ns && !s.test(t.ns) || o && n(t.fn) !== n(o) || a && t.sel != a)
                })
            }

            function i(t) {
                var n = ("" + t).split(".");
                return {
                    e: n[0],
                    ns: n.slice(1).sort().join(" ")
                }
            }

            function r(t) {
                return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
            }

            function o(n, e, i) {
                "string" != t.type(n) ? t.each(n, i) : n.split(/\s/).forEach(function (t) {
                    i(t, e)
                })
            }

            function a(t, n) {
                return t.del && ("focus" == t.e || "blur" == t.e) || !!n
            }

            function s(t) {
                return b[t] || t
            }

            function u(e, r, u, c, l, f) {
                var h = n(e),
                    p = g[h] || (g[h] = []);
                o(r, u,
                    function (n, r) {
                        var o, u = i(n);
                        u.fn = r,
                            u.sel = c,
                        u.e in b && (r = function (n) {
                            var e = n.relatedTarget;
                            return !e || e !== this && !t.contains(this, e) ? u.fn.apply(this, arguments) : void 0
                        }),
                            u.del = l && l(r, n),
                            o = u.del || r,
                            u.proxy = function (t) {
                                var n = o.apply(e, [t].concat(t.data));
                                return n === !1 && (t.preventDefault(), t.stopPropagation()),
                                    n
                            },
                            u.i = p.length,
                            p.push(u),
                            e.addEventListener(s(u.e), u.proxy, a(u, f))
                    })
            }

            function c(t, i, r, u, c) {
                var l = n(t);
                o(i || "", r,
                    function (n, i) {
                        e(t, n, i, u).forEach(function (n) {
                            delete g[l][n.i],
                                t.removeEventListener(s(n.e), n.proxy, a(n, c))
                        })
                    })
            }

            function l(n) {
                var e, i = {
                    originalEvent: n
                };
                for (e in n) d.test(e) || void 0 === n[e] || (i[e] = n[e]);
                return t.each(m,
                    function (t, e) {
                        i[t] = function () {
                            return this[e] = h,
                                n[t].apply(n, arguments)
                        },
                            i[e] = p
                    }),
                    i
            }

            function f(t) {
                if (!("defaultPrevented" in t)) {
                    t.defaultPrevented = !1;
                    var n = t.preventDefault;
                    t.preventDefault = function () {
                        this.defaultPrevented = !0,
                            n.call(this)
                    }
                }
            }

            var h, p, d, m, g = (t.zepto.qsa, {}),
                v = 1,
                y = {},
                b = {
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                };
            y.click = y.mousedown = y.mouseup = y.mousemove = "MouseEvents",
                t.event = {
                    add: u,
                    remove: c
                },
                t.proxy = function (e, i) {
                    if (t.isFunction(e)) {
                        var r = function () {
                            return e.apply(i, arguments)
                        };
                        return r._zid = n(e),
                            r
                    }
                    if ("string" == typeof i) return t.proxy(e[i], e);
                    throw new TypeError("expected function")
                },
                t.fn.bind = function (t, n) {
                    return this.each(function () {
                        u(this, t, n)
                    })
                },
                t.fn.unbind = function (t, n) {
                    return this.each(function () {
                        c(this, t, n)
                    })
                },
                t.fn.one = function (t, n) {
                    return this.each(function (e, i) {
                        u(this, t, n, null,
                            function (t, n) {
                                return function () {
                                    var e = t.apply(i, arguments);
                                    return c(i, n, t),
                                        e
                                }
                            })
                    })
                },
                h = function () {
                    return !0
                },
                p = function () {
                    return !1
                },
                d = /^([A-Z]|layer[XY]$)/,
                m = {
                    preventDefault: "isDefaultPrevented",
                    stopImmediatePropagation: "isImmediatePropagationStopped",
                    stopPropagation: "isPropagationStopped"
                },
                t.fn.delegate = function (n, e, i) {
                    return this.each(function (r, o) {
                        u(o, e, i, n,
                            function (e) {
                                return function (i) {
                                    var r, a = t(i.target).closest(n, o).get(0);
                                    return a ? (r = t.extend(l(i), {
                                        currentTarget: a,
                                        liveFired: o
                                    }), e.apply(a, [r].concat([].slice.call(arguments, 1)))) : void 0
                                }
                            })
                    })
                },
                t.fn.undelegate = function (t, n, e) {
                    return this.each(function () {
                        c(this, n, e, t)
                    })
                },
                t.fn.live = function (n, e) {
                    return t(document.body).delegate(this.selector, n, e),
                        this
                },
                t.fn.die = function (n, e) {
                    return t(document.body).undelegate(this.selector, n, e),
                        this
                },
                t.fn.on = function (n, e, i) {
                    return !e || t.isFunction(e) ? this.bind(n, e || i) : this.delegate(e, n, i)
                },
                t.fn.off = function (n, e, i) {
                    return !e || t.isFunction(e) ? this.unbind(n, e || i) : this.undelegate(e, n, i)
                },
                t.fn.trigger = function (n, e) {
                    return ("string" == typeof n || t.isPlainObject(n)) && (n = t.Event(n)),
                        f(n),
                        n.data = e,
                        this.each(function () {
                            "dispatchEvent" in this && this.dispatchEvent(n)
                        })
                },
                t.fn.triggerHandler = function (n, i) {
                    var r, o;
                    return this.each(function (a, s) {
                        r = l("string" == typeof n ? t.Event(n) : n),
                            r.data = i,
                            r.target = s,
                            t.each(e(s, n.type || n),
                                function (t, n) {
                                    return o = n.proxy(r),
                                        r.isImmediatePropagationStopped() ? !1 : void 0
                                })
                    }),
                        o
                },
                "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (n) {
                    t.fn[n] = function (t) {
                        return t ? this.bind(n, t) : this.trigger(n)
                    }
                }),
                ["focus", "blur"].forEach(function (n) {
                    t.fn[n] = function (t) {
                        return t ? this.bind(n, t) : this.each(function () {
                            try {
                                this[n]()
                            } catch (t) {
                            }
                        }),
                            this
                    }
                }),
                t.Event = function (t, n) {
                    var e, i, r;
                    if ("string" != typeof t && (n = t, t = n.type), e = document.createEvent(y[t] || "Events"), i = !0, n) for (r in n)"bubbles" == r ? i = !!n[r] : e[r] = n[r];
                    return e.initEvent(t, i, !0, null, null, null, null, null, null, null, null, null, null, null, null),
                        e.isDefaultPrevented = function () {
                            return this.defaultPrevented
                        },
                        e
                }
        }(t),
        function (t) {
            function n(n, e, i) {
                var r = t.Event(e);
                return t(n).trigger(r, i),
                    !r.defaultPrevented
            }

            function e(t, e, i, r) {
                return t.global ? n(e || b, i, r) : void 0
            }

            function i(n) {
                n.global && 0 === t.active++ && e(n, null, "ajaxStart")
            }

            function r(n) {
                n.global && !--t.active && e(n, null, "ajaxStop")
            }

            function o(t, n) {
                var i = n.context;
                return n.beforeSend.call(i, t, n) === !1 || e(n, i, "ajaxBeforeSend", [t, n]) === !1 ? !1 : void e(n, i, "ajaxSend", [t, n])
            }

            function a(t, n, i) {
                var r = i.context,
                    o = "success";
                i.success.call(r, t, o, n),
                    e(i, r, "ajaxSuccess", [n, i, t]),
                    u(o, n, i)
            }

            function s(t, n, i, r) {
                var o = r.context;
                r.error.call(o, i, n, t),
                    e(r, o, "ajaxError", [i, r, t]),
                    u(n, i, r)
            }

            function u(t, n, i) {
                var o = i.context;
                i.complete.call(o, n, t),
                    e(i, o, "ajaxComplete", [n, i]),
                    r(i)
            }

            function c() {
            }

            function l(t) {
                return t && (t = t.split(";", 2)[0]),
                t && (t == S ? "html" : t == E ? "json" : w.test(t) ? "script" : T.test(t) && "xml") || "text"
            }

            function f(t, n) {
                return (t + "&" + n).replace(/[&?]{1,2}/, "?")
            }

            function h(n) {
                n.processData && n.data && "string" != t.type(n.data) && (n.data = t.param(n.data, n.traditional)),
                !n.data || n.type && "GET" != n.type.toUpperCase() || (n.url = f(n.url, n.data))
            }

            function p(n, e, i, r) {
                var o = !t.isFunction(e);
                return {
                    url: n,
                    data: o ? e : void 0,
                    success: o ? t.isFunction(i) ? i : void 0 : e,
                    dataType: o ? r || i : i
                }
            }

            function d(n, e, i, r) {
                var o, a = t.isArray(e);
                t.each(e,
                    function (e, s) {
                        o = t.type(s),
                        r && (e = i ? r : r + "[" + (a ? "" : e) + "]"),
                            !r && a ? n.add(s.name, s.value) : "array" == o || !i && "object" == o ? d(n, s, i, e) : n.add(e, s)
                    })
            }

            var m, g, v, y = 0,
                b = window.document,
                x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                w = /^(?:text|application)\/javascript/i,
                T = /^(?:text|application)\/xml/i,
                E = "application/json",
                S = "text/html",
                j = /^\s*$/;
            t.active = 0,
                t.ajaxJSONP = function (n) {
                    if (!("type" in n)) return t.ajax(n);
                    var e, i = "jsonp" + ++y,
                        r = b.createElement("script"),
                        u = function () {
                            clearTimeout(e),
                                t(r).remove(),
                                delete window[i]
                        },
                        l = function (t) {
                            u(),
                            t && "timeout" != t || (window[i] = c),
                                s(null, t || "abort", f, n)
                        },
                        f = {
                            abort: l
                        };
                    return o(f, n) === !1 ? (l("abort"), !1) : (window[i] = function (t) {
                        u(),
                            a(t, f, n)
                    },
                        r.onerror = function () {
                            l("error")
                        },
                        r.src = n.url.replace(/=\?/, "=" + i), t("head").append(r), n.timeout > 0 && (e = setTimeout(function () {
                            l("timeout")
                        },
                        n.timeout)), f)
                },
                t.ajaxSettings = {
                    type: "GET",
                    beforeSend: c,
                    success: c,
                    error: c,
                    complete: c,
                    context: null,
                    global: !0,
                    xhr: function (t) {
                        return t = t || window,
                            new t.XMLHttpRequest
                    },
                    accepts: {
                        script: "text/javascript, application/javascript",
                        json: E,
                        xml: "application/xml, text/xml",
                        html: S,
                        text: "text/plain"
                    },
                    crossDomain: !1,
                    timeout: 0,
                    processData: !0,
                    cache: !0
                },
                t.ajax = function (n) {
                    var e, r, u, p, d, v, y, b, x, w, T = t.extend({},
                        n || {});
                    for (m in t.ajaxSettings) void 0 === T[m] && (T[m] = t.ajaxSettings[m]);
                    if (e = t("<a />").attr("href", T.url)[0].host, !arguments[1] && e && e != location.host) return r = t("<iframe />"),
                        r.attr({
                            src: "http://" + e + "/ajaxproxy.html",
                            frameBorder: 0,
                            width: 0,
                            height: 0
                        }).appendTo("body"),
                        r[0].onload = function () {
                            var n = T.success ||
                                    function () {
                                    },
                                e = T.error ||
                                    function () {
                                    },
                                i = T.complete ||
                                    function () {
                                    };
                            T.success = function () {
                                n.apply(this, arguments),
                                    r.remove()
                            },
                                T.error = function () {
                                    e.apply(this, arguments),
                                        r.remove()
                                },
                                T.complate = function () {
                                    i.apply(this, arguments),
                                        r.remove()
                                },
                                t.ajax(T, this.contentWindow)
                        },
                        "����������Ҫ��ʱ����AJAX����,�޷�ʵʱ���ش������";
                    if (i(T), T.crossDomain || (T.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(T.url) && RegExp.$2 != window.location.host), T.url || (T.url = window.location.toString()), h(T), T.cache === !1 && (T.url = f(T.url, "_=" + Date.now())), u = T.dataType, p = /=\?/.test(T.url), "jsonp" == u || p) return p || (T.url = f(T.url, "callback=?")),
                        t.ajaxJSONP(T);
                    d = T.accepts[u],
                        v = {},
                        y = /^([\w-]+:)\/\//.test(T.url) ? RegExp.$1 : window.location.protocol,
                        b = T.xhr(),
                    arguments[1] && (b = T.xhr(arguments[1])),
                    T.crossDomain || (v["X-Requested-With"] = "XMLHttpRequest"),
                    d && (v.Accept = d, d.indexOf(",") > -1 && (d = d.split(",", 2)[0]), b.overrideMimeType && b.overrideMimeType(d)),
                    (T.contentType || T.contentType !== !1 && T.data && "GET" != T.type.toUpperCase()) && (v["Content-Type"] = T.contentType || "application/x-www-form-urlencoded"),
                        T.headers = t.extend(v, T.headers || {}),
                        b.onreadystatechange = function () {
                            if (4 == b.readyState) {
                                b.onreadystatechange = c,
                                    clearTimeout(x);
                                var n, e = !1;
                                if (b.status >= 200 && b.status < 300 || 304 == b.status || 0 == b.status && "file:" == y) {
                                    u = u || l(b.getResponseHeader("content-type")),
                                        n = b.responseText;
                                    try {
                                        "script" == u ? (1, eval)(n) : "xml" == u ? n = b.responseXML : "json" == u && (n = j.test(n) ? null : t.parseJSON(n))
                                    } catch (i) {
                                        e = i
                                    }
                                    e ? s(e, "parsererror", b, T) : a(n, b, T)
                                } else s(null, b.status ? "error" : "abort", b, T)
                            }
                        },
                        w = "async" in T ? T.async : !0,
                        b.open(T.type, T.url, w);
                    for (g in T.headers) b.setRequestHeader(g, T.headers[g]);
                    return o(b, T) === !1 ? (b.abort(), !1) : (T.timeout > 0 && (x = setTimeout(function () {
                            b.onreadystatechange = c,
                                b.abort(),
                                s(null, "timeout", b, T)
                        },
                        T.timeout)), b.send(T.data ? T.data : null), b)
                },
                t.get = function () {
                    return t.ajax(p.apply(null, arguments))
                },
                t.post = function () {
                    var n = p.apply(null, arguments);
                    return n.type = "POST",
                        t.ajax(n)
                },
                t.getJSON = function () {
                    var n = p.apply(null, arguments);
                    return n.dataType = "json",
                        t.ajax(n)
                },
                t.fn.load = function (n, e, i) {
                    if (!this.length) return this;
                    var r, o = this,
                        a = n.split(/\s/),
                        s = p(n, e, i),
                        u = s.success;
                    return a.length > 1 && (s.url = a[0], r = a[1]),
                        s.success = function (n) {
                            o.html(r ? t("<div>").html(n.replace(x, "")).find(r) : n),
                            u && u.apply(o, arguments)
                        },
                        t.ajax(s),
                        this
                },
                v = encodeURIComponent,
                t.param = function (t, n) {
                    var e = [];
                    return e.add = function (t, n) {
                        this.push(v(t) + "=" + v(n))
                    },
                        d(e, t, n),
                        e.join("&").replace(/%20/g, "+")
                }
        }(t),
        function (t) {
            t.fn.serializeArray = function () {
                var n, e = [];
                return t(Array.prototype.slice.call(this.get(0).elements)).each(function () {
                    n = t(this);
                    var i = n.attr("type");
                    "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && e.push({
                        name: n.attr("name"),
                        value: n.val()
                    })
                }),
                    e
            },
                t.fn.serialize = function () {
                    var t = [];
                    return this.serializeArray().forEach(function (n) {
                        t.push(encodeURIComponent(n.name) + "=" + encodeURIComponent(n.value))
                    }),
                        t.join("&")
                },
                t.fn.submit = function (n) {
                    if (n) this.bind("submit", n);
                    else if (this.length) {
                        var e = t.Event("submit");
                        this.eq(0).trigger(e),
                        e.defaultPrevented || this.get(0).submit()
                    }
                    return this
                }
        }(t),
        function (t, n) {
            function e(t) {
                return i(t.replace(/([a-z])([A-Z])/, "$1-$2"))
            }

            function i(t) {
                return t.toLowerCase()
            }

            function r(t) {
                return o ? o + t : i(t)
            }

            var o, a, s, u, c, l, f, h, p = "",
                d = {
                    Webkit: "webkit",
                    Moz: "",
                    O: "o",
                    ms: "MS"
                },
                m = window.document,
                g = m.createElement("div"),
                v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
                y = {};
            t.each(d,
                function (t, e) {
                    return g.style[t + "TransitionProperty"] !== n ? (p = "-" + i(t) + "-", o = e, !1) : void 0
                }),
                a = p + "transform",
                y[s = p + "transition-property"] = y[u = p + "transition-duration"] = y[c = p + "transition-timing-function"] = y[l = p + "animation-name"] = y[f = p + "animation-duration"] = y[h = p + "animation-timing-function"] = "",
                t.fx = {
                    off: o === n && g.style.transitionProperty === n,
                    speeds: {
                        _default: 400,
                        fast: 200,
                        slow: 600
                    },
                    cssPrefix: p,
                    transitionEnd: r("TransitionEnd"),
                    animationEnd: r("AnimationEnd")
                },
                t.fn.animate = function (n, e, i, r) {
                    return t.isPlainObject(e) && (i = e.easing, r = e.complete, e = e.duration),
                    e && (e = ("number" == typeof e ? e : t.fx.speeds[e] || t.fx.speeds._default) / 1e3),
                        this.anim(n, e, i, r)
                },
                t.fn.anim = function (i, r, o, p) {
                    var d, m, g, b = {},
                        x = "",
                        w = this,
                        T = t.fx.transitionEnd;
                    if (r === n && (r = .4), t.fx.off && (r = 0), "string" == typeof i) b[l] = i,
                        b[f] = r + "s",
                        b[h] = o || "linear",
                        T = t.fx.animationEnd;
                    else {
                        m = [];
                        for (d in i) v.test(d) ? x += d + "(" + i[d] + ") " : (b[d] = i[d], m.push(e(d)));
                        x && (b[a] = x, m.push(a)),
                        r > 0 && "object" == typeof i && (b[s] = m.join(", "), b[u] = r + "s", b[c] = o || "linear")
                    }
                    return g = function (n) {
                        if ("undefined" != typeof n) {
                            if (n.target !== n.currentTarget) return;
                            t(n.target).unbind(T, g)
                        }
                        t(this).css(y),
                        p && p.call(this)
                    },
                    r > 0 && this.bind(T, g),
                    this.size() && this.get(0).clientLeft,
                        this.css(b),
                    0 >= r && setTimeout(function () {
                            w.each(function () {
                                g.call(this)
                            })
                        },
                        0),
                        this
                },
                g = null
        }(t),
        function (t, n) {
            function e(e, i, r, o, a) {
                "function" != typeof i || a || (a = i, i = n);
                var s = {
                    opacity: r
                };
                return o && (s.scale = o, e.css(t.fx.cssPrefix + "transform-origin", "0 0")),
                    e.animate(s, i, null, a)
            }

            function i(n, i, r, o) {
                return e(n, i, 0, r,
                    function () {
                        a.call(t(this)),
                        o && o.call(this)
                    })
            }

            var r = window.document,
                o = (r.documentElement, t.fn.show),
                a = t.fn.hide,
                s = t.fn.toggle;
            t.fn.show = function (t, i) {
                return o.call(this),
                    t === n ? t = 0 : this.css("opacity", 0),
                    e(this, t, 1, "1,1", i)
            },
                t.fn.hide = function (t, e) {
                    return t === n ? a.call(this) : i(this, t, "0,0", e)
                },
                t.fn.toggle = function (e, i) {
                    return e === n || "boolean" == typeof e ? s.call(this, e) : this.each(function () {
                        var n = t(this);
                        n["none" == n.css("display") ? "show" : "hide"](e, i)
                    })
                },
                t.fn.fadeTo = function (t, n, i) {
                    return e(this, t, n, null, i)
                },
                t.fn.fadeIn = function (t, n) {
                    var e = this.css("opacity");
                    return e > 0 ? this.css("opacity", 0) : e = 1,
                        o.call(this).fadeTo(t, e, n)
                },
                t.fn.fadeOut = function (t, n) {
                    return i(this, t, null, n)
                },
                t.fn.fadeToggle = function (n, e) {
                    return this.each(function () {
                        var i = t(this);
                        i[0 == i.css("opacity") || "none" == i.css("display") ? "fadeIn" : "fadeOut"](n, e)
                    })
                }
        }(t),
        function (t) {
            function n(n, i) {
                var u, c = n[s],
                    l = c && r[c];
                if (void 0 === i) return l || e(n);
                if (l) {
                    if (i in l) return l[i];
                    if (u = a(i), u in l) return l[u]
                }
                return o.call(t(n), i)
            }

            function e(n, e, o) {
                var u = n[s] || (n[s] = ++t.uuid),
                    c = r[u] || (r[u] = i(n));
                return void 0 !== e && (c[a(e)] = o),
                    c
            }

            function i(n) {
                var e = {};
                return t.each(n.attributes,
                    function (n, i) {
                        0 == i.name.indexOf("data-") && (e[a(i.name.replace("data-", ""))] = t.zepto.deserializeValue(i.value))
                    }),
                    e
            }

            var r = {},
                o = t.fn.data,
                a = t.camelCase,
                s = t.expando = "Zepto" + +new Date;
            t.fn.data = function (i, r) {
                return void 0 === r ? t.isPlainObject(i) ? this.each(function (n, r) {
                    t.each(i,
                        function (t, n) {
                            e(r, t, n)
                        })
                }) : 0 == this.length ? void 0 : n(this[0], i) : this.each(function () {
                    e(this, i, r)
                })
            },
                t.fn.removeData = function (n) {
                    return "string" == typeof n && (n = n.split(/\s+/)),
                        this.each(function () {
                            var e = this[s],
                                i = e && r[e];
                            i && t.each(n,
                                function () {
                                    delete i[a(this)]
                                })
                        })
                }
        }(t),
        function (t) {
            var n, e = [];
            t.fn.remove = function () {
                return this.each(function () {
                    this.parentNode && ("IMG" === this.tagName && (e.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", n && clearTimeout(n), n = setTimeout(function () {
                            e = []
                        },
                        6e4)), this.parentNode.removeChild(this))
                })
            }
        }(t),
        function (t) {
            function n(n) {
                return n = t(n),
                !(!n.width() && !n.height()) && "none" !== n.css("display")
            }

            function e(t, n) {
                var e, i, r, o;
                return t = t.replace(/=#\]/g, '="#"]'),
                    r = s.exec(t),
                r && r[2] in a && (e = a[r[2]], i = r[3], t = r[1], i && (o = Number(i), i = isNaN(o) ? i.replace(/^["']|["']$/g, "") : o)),
                    n(t, e, i)
            }

            var i = t.zepto,
                r = i.qsa,
                o = i.matches,
                a = t.expr[":"] = {
                    visible: function () {
                        return n(this) ? this : void 0
                    },
                    hidden: function () {
                        return n(this) ? void 0 : this
                    },
                    selected: function () {
                        return this.selected ? this : void 0
                    },
                    checked: function () {
                        return this.checked ? this : void 0
                    },
                    parent: function () {
                        return this.parentNode
                    },
                    first: function (t) {
                        return 0 === t ? this : void 0
                    },
                    last: function (t, n) {
                        return t === n.length - 1 ? this : void 0
                    },
                    eq: function (t, n, e) {
                        return t === e ? this : void 0
                    },
                    contains: function (n, e, i) {
                        return t(this).text().indexOf(i) > -1 ? this : void 0
                    },
                    has: function (t, n, e) {
                        return i.qsa(this, e).length ? this : void 0
                    }
                },
                s = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),
                u = /^\s*>/,
                c = "Zepto" + +new Date;
            i.qsa = function (n, o) {
                return e(o,
                    function (e, a, s) {
                        var l, f;
                        try {
                            !e && a ? e = "*" : u.test(e) && (l = t(n).addClass(c), e = "." + c + " " + e),
                                f = r(n, e)
                        } catch (h) {
                            throw console.error("error performing selector: %o", o),
                                h
                        } finally {
                            l && l.removeClass(c)
                        }
                        return a ? i.uniq(t.map(f,
                            function (t, n) {
                                return a.call(t, n, f, s)
                            })) : f
                    })
            },
                i.matches = function (t, n) {
                    return e(n,
                        function (n, e, i) {
                            return !(n && !o(t, n) || e && e.call(t, null, i) !== t)
                        })
                }
        }(t),
        function (t) {
            function n(t) {
                return "tagName" in t ? t : t.parentNode
            }

            function e(t, n, e, i) {
                var r = Math.abs(t - n),
                    o = Math.abs(e - i);
                return r >= o ? t - n > 0 ? "Left" : "Right" : e - i > 0 ? "Up" : "Down"
            }

            function i() {
                c = null,
                l.last && (l.el.trigger("longTap"), l = {})
            }

            function r() {
                c && clearTimeout(c),
                    c = null
            }

            function o() {
                a && clearTimeout(a),
                s && clearTimeout(s),
                u && clearTimeout(u),
                c && clearTimeout(c),
                    a = s = u = c = null,
                    l = {}
            }

            var a, s, u, c, l = {},
                f = 750;
            t(document).ready(function () {
                var h, p;
                t(document.body).bind("touchstart",
                    function (e) {
                        h = Date.now(),
                            p = h - (l.last || h),
                            l.el = t(n(e.touches[0].target)),
                        a && clearTimeout(a),
                            l.x1 = e.touches[0].pageX,
                            l.y1 = e.touches[0].pageY,
                        p > 0 && 250 >= p && (l.isDoubleTap = !0),
                            l.last = h,
                            c = setTimeout(i, f)
                    }).bind("touchmove",
                    function (t) {
                        r(),
                            l.x2 = t.touches[0].pageX,
                            l.y2 = t.touches[0].pageY,
                        Math.abs(l.x1 - l.x2) > 10 && t.preventDefault()
                    }).bind("touchend",
                    function () {
                        r(),
                            l.x2 && Math.abs(l.x1 - l.x2) > 30 || l.y2 && Math.abs(l.y1 - l.y2) > 30 ? u = setTimeout(function () {
                                    l.el.trigger("swipe"),
                                        l.el.trigger("swipe" + e(l.x1, l.x2, l.y1, l.y2)),
                                        l = {}
                                },
                                0) : "last" in l && (s = setTimeout(function () {
                                    var n = t.Event("tap");
                                    n.cancelTouch = o,
                                        l.el.trigger(n),
                                        l.isDoubleTap ? (l.el.trigger("doubleTap"), l = {}) : a = setTimeout(function () {
                                                a = null,
                                                    l.el.trigger("singleTap"),
                                                    l = {}
                                            },
                                            250)
                                },
                                0))
                    }).bind("touchcancel", o),
                    t(window).bind("scroll", o)
            }),
                ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (n) {
                    t.fn[n] = function (t) {
                        return this.bind(n, t)
                    }
                })
        }(t),
        n = {
            String: {
                md5: function (t) {
                    function n(t) {
                        return f(e(l(t), t.length * p))
                    }

                    function e(t, n) {
                        var e, i, c, l, f, h, p, d, m;
                        for (t[n >> 5] |= 128 << n % 32, t[(n + 64 >>> 9 << 4) + 14] = n, e = 1732584193, i = -271733879, c = -1732584194, l = 271733878, f = 0; f < t.length; f += 16) h = e,
                            p = i,
                            d = c,
                            m = l,
                            e = r(e, i, c, l, t[f + 0], 7, -680876936),
                            l = r(l, e, i, c, t[f + 1], 12, -389564586),
                            c = r(c, l, e, i, t[f + 2], 17, 606105819),
                            i = r(i, c, l, e, t[f + 3], 22, -1044525330),
                            e = r(e, i, c, l, t[f + 4], 7, -176418897),
                            l = r(l, e, i, c, t[f + 5], 12, 1200080426),
                            c = r(c, l, e, i, t[f + 6], 17, -1473231341),
                            i = r(i, c, l, e, t[f + 7], 22, -45705983),
                            e = r(e, i, c, l, t[f + 8], 7, 1770035416),
                            l = r(l, e, i, c, t[f + 9], 12, -1958414417),
                            c = r(c, l, e, i, t[f + 10], 17, -42063),
                            i = r(i, c, l, e, t[f + 11], 22, -1990404162),
                            e = r(e, i, c, l, t[f + 12], 7, 1804603682),
                            l = r(l, e, i, c, t[f + 13], 12, -40341101),
                            c = r(c, l, e, i, t[f + 14], 17, -1502002290),
                            i = r(i, c, l, e, t[f + 15], 22, 1236535329),
                            e = o(e, i, c, l, t[f + 1], 5, -165796510),
                            l = o(l, e, i, c, t[f + 6], 9, -1069501632),
                            c = o(c, l, e, i, t[f + 11], 14, 643717713),
                            i = o(i, c, l, e, t[f + 0], 20, -373897302),
                            e = o(e, i, c, l, t[f + 5], 5, -701558691),
                            l = o(l, e, i, c, t[f + 10], 9, 38016083),
                            c = o(c, l, e, i, t[f + 15], 14, -660478335),
                            i = o(i, c, l, e, t[f + 4], 20, -405537848),
                            e = o(e, i, c, l, t[f + 9], 5, 568446438),
                            l = o(l, e, i, c, t[f + 14], 9, -1019803690),
                            c = o(c, l, e, i, t[f + 3], 14, -187363961),
                            i = o(i, c, l, e, t[f + 8], 20, 1163531501),
                            e = o(e, i, c, l, t[f + 13], 5, -1444681467),
                            l = o(l, e, i, c, t[f + 2], 9, -51403784),
                            c = o(c, l, e, i, t[f + 7], 14, 1735328473),
                            i = o(i, c, l, e, t[f + 12], 20, -1926607734),
                            e = a(e, i, c, l, t[f + 5], 4, -378558),
                            l = a(l, e, i, c, t[f + 8], 11, -2022574463),
                            c = a(c, l, e, i, t[f + 11], 16, 1839030562),
                            i = a(i, c, l, e, t[f + 14], 23, -35309556),
                            e = a(e, i, c, l, t[f + 1], 4, -1530992060),
                            l = a(l, e, i, c, t[f + 4], 11, 1272893353),
                            c = a(c, l, e, i, t[f + 7], 16, -155497632),
                            i = a(i, c, l, e, t[f + 10], 23, -1094730640),
                            e = a(e, i, c, l, t[f + 13], 4, 681279174),
                            l = a(l, e, i, c, t[f + 0], 11, -358537222),
                            c = a(c, l, e, i, t[f + 3], 16, -722521979),
                            i = a(i, c, l, e, t[f + 6], 23, 76029189),
                            e = a(e, i, c, l, t[f + 9], 4, -640364487),
                            l = a(l, e, i, c, t[f + 12], 11, -421815835),
                            c = a(c, l, e, i, t[f + 15], 16, 530742520),
                            i = a(i, c, l, e, t[f + 2], 23, -995338651),
                            e = s(e, i, c, l, t[f + 0], 6, -198630844),
                            l = s(l, e, i, c, t[f + 7], 10, 1126891415),
                            c = s(c, l, e, i, t[f + 14], 15, -1416354905),
                            i = s(i, c, l, e, t[f + 5], 21, -57434055),
                            e = s(e, i, c, l, t[f + 12], 6, 1700485571),
                            l = s(l, e, i, c, t[f + 3], 10, -1894986606),
                            c = s(c, l, e, i, t[f + 10], 15, -1051523),
                            i = s(i, c, l, e, t[f + 1], 21, -2054922799),
                            e = s(e, i, c, l, t[f + 8], 6, 1873313359),
                            l = s(l, e, i, c, t[f + 15], 10, -30611744),
                            c = s(c, l, e, i, t[f + 6], 15, -1560198380),
                            i = s(i, c, l, e, t[f + 13], 21, 1309151649),
                            e = s(e, i, c, l, t[f + 4], 6, -145523070),
                            l = s(l, e, i, c, t[f + 11], 10, -1120210379),
                            c = s(c, l, e, i, t[f + 2], 15, 718787259),
                            i = s(i, c, l, e, t[f + 9], 21, -343485551),
                            e = u(e, h),
                            i = u(i, p),
                            c = u(c, d),
                            l = u(l, m);
                        return Array(e, i, c, l)
                    }

                    function i(t, n, e, i, r, o) {
                        return u(c(u(u(n, t), u(i, o)), r), e)
                    }

                    function r(t, n, e, r, o, a, s) {
                        return i(n & e | ~n & r, t, n, o, a, s)
                    }

                    function o(t, n, e, r, o, a, s) {
                        return i(n & r | e & ~r, t, n, o, a, s)
                    }

                    function a(t, n, e, r, o, a, s) {
                        return i(n ^ e ^ r, t, n, o, a, s)
                    }

                    function s(t, n, e, r, o, a, s) {
                        return i(e ^ (n | ~r), t, n, o, a, s)
                    }

                    function u(t, n) {
                        var e = (65535 & t) + (65535 & n),
                            i = (t >> 16) + (n >> 16) + (e >> 16);
                        return i << 16 | 65535 & e
                    }

                    function c(t, n) {
                        return t << n | t >>> 32 - n
                    }

                    function l(t) {
                        var n, e = Array(),
                            i = (1 << p) - 1;
                        for (n = 0; n < t.length * p; n += p) e[n >> 5] |= (t.charCodeAt(n / p) & i) << n % 32;
                        return e
                    }

                    function f(t) {
                        var n, e = h ? "0123456789ABCDEF" : "0123456789abcdef",
                            i = "";
                        for (n = 0; n < 4 * t.length; n++) i += e.charAt(t[n >> 2] >> n % 4 * 8 + 4 & 15) + e.charAt(t[n >> 2] >> n % 4 * 8 & 15);
                        return i
                    }

                    var h = 0,
                        p = 8;
                    return n(t)
                },
                getQuery: function (t, n) {
                    var e, i, r;
                    for (n = n || window.location.href + "", -1 !== n.indexOf("#") && (n = n.substring(0, n.indexOf("#"))), e = [], r = new RegExp("(^|\\?|&)" + t + "=([^&]*)(?=&|#|$)", "g"); null != (i = r.exec(n));) e.push(decodeURIComponent(i[2]));
                    return 0 == e.length ? null : 1 == e.length ? e[0] : e
                },
                encryptMobile: function (t, e) {
                    var i, r;
                    return t && e && (e = e.split("").sort().join("") + t, i = n.String.md5(e).substring(4, 12), e = e.split("").sort().join(""), r = n.String.md5(e), n.Cookie.set(i, r, !1, "/", "liepin.com")),
                        this
                }
            },
            Object: {
                isString: function (t) {
                    return "string" == typeof t
                },
                isNumber: function (t) {
                    return "number" == typeof t
                }
            },
            Cookie: {
                set: function (t, e, i, r, o, a) {
                    var s, u;
                    n.Object.isNumber(i) ? (u = new Date, u.setTime(u.getTime() + 24 * i * 60 * 60 * 1e3), s = u.toGMTString()) : s = n.Object.isString(i) ? i : !1,
                        document.cookie = t + "=" + encodeURIComponent(e) + (s ? ";expires=" + s : "") + (r ? ";path=" + r : "") + (o ? ";domain=" + o : "") + (a ? ";secure" : "")
                }
            }
        },
        t.ajaxSettings.complete = function (t) {
            var n = "";
            t && (n = t.getResponseHeader("LP_LOGIN_FORWARD") || "", n && (location.href = decodeURIComponent(n)))
        },
        t.ajaxSettings.beforeSend = function (t, e) {
            var i = e.url,
                r = e.data || "",
                o = "__mn__",
                a = "",
                s = "";
            -1 !== i.indexOf(o) && (a = n.String.getQuery(o, i), "" !== a && (s = "GET" === e.type.toUpperCase() ? n.String.getQuery(a, i) || "" : n.String.getQuery(a, r) || "", "" !== s && n.String.encryptMobile(a, s)))
        },
        t
});