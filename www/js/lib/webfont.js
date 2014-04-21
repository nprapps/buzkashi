/*
 * Copyright 2013 Small Batch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
;
(function(window, document, undefined) {
    var j = !0,
        k = null,
        l = !1;

    function p(a) {
        return function() {
            return this[a]
        }
    }
    var aa = this;

    function q(a, b) {
        var c = a.split("."),
            d = aa;
        !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());)!c.length && void 0 !== b ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
    }

    function ba(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ca(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function s(a, b, c) {
        s = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ba : ca;
        return s.apply(k, arguments)
    }
    var da = Date.now || function() {
            return +new Date
        };

    function ea(a, b) {
        this.G = a;
        this.u = b || a;
        this.z = this.u.document
    }
    ea.prototype.createElement = function(a, b, c) {
        a = this.z.createElement(a);
        if (b)
            for (var d in b) b.hasOwnProperty(d) && ("style" == d ? a.style.cssText = b[d] : a.setAttribute(d, b[d]));
        c && a.appendChild(this.z.createTextNode(c));
        return a
    };

    function fa(a, b, c) {
        a = a.z.getElementsByTagName(b)[0];
        a || (a = document.documentElement);
        a && a.lastChild && a.insertBefore(c, a.lastChild)
    }

    function t(a, b) {
        for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
            if (c[d] == b) return;
        c.push(b);
        a.className = c.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
    }

    function u(a, b) {
        for (var c = a.className.split(/\s+/), d = [], e = 0, f = c.length; e < f; e++) c[e] != b && d.push(c[e]);
        a.className = d.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
    }

    function ga(a, b) {
        for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
            if (c[d] == b) return j;
        return l
    }

    function v(a) {
        var b = a.u.location.protocol;
        "about:" == b && (b = a.G.location.protocol);
        return "https:" == b ? "https:" : "http:"
    }

    function w(a, b) {
        var c = a.createElement("link", {
            rel: "stylesheet",
            href: b
        }),
            d = l;
        c.onload = function() {
            d || (d = j)
        };
        c.onerror = function() {
            d || (d = j)
        };
        fa(a, "head", c)
    }

    function x(a, b, c, d) {
        var e = a.z.getElementsByTagName("head")[0];
        if (e) {
            var f = a.createElement("script", {
                src: b
            }),
                g = l;
            f.onload = f.onreadystatechange = function() {
                if (!g && (!this.readyState || "loaded" == this.readyState || "complete" == this.readyState)) g = j, c && c(k), f.onload = f.onreadystatechange = k, "HEAD" == f.parentNode.tagName && e.removeChild(f)
            };
            e.appendChild(f);
            window.setTimeout(function() {
                g || (g = j, c && c(Error("Script load timeout")))
            }, d || 5E3);
            return f
        }
        return k
    };

    function y(a, b, c) {
        this.w = a;
        this.S = b;
        this.za = c
    }
    q("webfont.BrowserInfo", y);
    y.prototype.pa = p("w");
    y.prototype.hasWebFontSupport = y.prototype.pa;
    y.prototype.qa = p("S");
    y.prototype.hasWebKitFallbackBug = y.prototype.qa;
    y.prototype.ra = p("za");
    y.prototype.hasWebKitMetricsBug = y.prototype.ra;

    function z(a, b, c, d) {
        this.e = a != k ? a : k;
        this.o = b != k ? b : k;
        this.aa = c != k ? c : k;
        this.f = d != k ? d : k
    }
    var ha = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
    z.prototype.toString = function() {
        return [this.e, this.o || "", this.aa || "", this.f || ""].join("")
    };

    function A(a) {
        a = ha.exec(a);
        var b = k,
            c = k,
            d = k,
            e = k;
        a && (a[1] !== k && a[1] && (b = parseInt(a[1], 10)), a[2] !== k && a[2] && (c = parseInt(a[2], 10)), a[3] !== k && a[3] && (d = parseInt(a[3], 10)), a[4] !== k && a[4] && (e = /^[0-9]+$/.test(a[4]) ? parseInt(a[4], 10) : a[4]));
        return new z(b, c, d, e)
    };

    function B(a, b, c, d, e, f, g, h, m, n, r) {
        this.J = a;
        this.Fa = b;
        this.ya = c;
        this.fa = d;
        this.Da = e;
        this.ea = f;
        this.wa = g;
        this.Ea = h;
        this.va = m;
        this.da = n;
        this.k = r
    }
    q("webfont.UserAgent", B);
    B.prototype.getName = p("J");
    B.prototype.getName = B.prototype.getName;
    B.prototype.oa = p("ya");
    B.prototype.getVersion = B.prototype.oa;
    B.prototype.ka = p("fa");
    B.prototype.getEngine = B.prototype.ka;
    B.prototype.la = p("ea");
    B.prototype.getEngineVersion = B.prototype.la;
    B.prototype.ma = p("wa");
    B.prototype.getPlatform = B.prototype.ma;
    B.prototype.na = p("va");
    B.prototype.getPlatformVersion = B.prototype.na;
    B.prototype.ja = p("da");
    B.prototype.getDocumentMode = B.prototype.ja;
    B.prototype.ia = p("k");
    B.prototype.getBrowserInfo = B.prototype.ia;

    function C(a, b) {
        this.a = a;
        this.H = b
    }
    var ia = new B("Unknown", new z, "Unknown", "Unknown", new z, "Unknown", "Unknown", new z, "Unknown", void 0, new y(l, l, l));
    C.prototype.parse = function() {
        var a;
        if (-1 != this.a.indexOf("MSIE")) {
            a = D(this);
            var b = E(this),
                c = A(b),
                d = F(this.a, /MSIE ([\d\w\.]+)/, 1),
                e = A(d);
            a = new B("MSIE", e, d, "MSIE", e, d, a, c, b, G(this.H), new y("Windows" == a && 6 <= e.e || "Windows Phone" == a && 8 <= c.e, l, l))
        } else if (-1 != this.a.indexOf("Opera")) a: {
            a = "Unknown";
            var b = F(this.a, /Presto\/([\d\w\.]+)/, 1),
                c = A(b),
                d = E(this),
                e = A(d),
                f = G(this.H);
            c.e !== k ? a = "Presto" : (-1 != this.a.indexOf("Gecko") && (a = "Gecko"), b = F(this.a, /rv:([^\)]+)/, 1), c = A(b));
            if (-1 != this.a.indexOf("Opera Mini/")) {
                var g =
                    F(this.a, /Opera Mini\/([\d\.]+)/, 1),
                    h = A(g);
                a = new B("OperaMini", h, g, a, c, b, D(this), e, d, f, new y(l, l, l))
            } else {
                if (-1 != this.a.indexOf("Version/") && (g = F(this.a, /Version\/([\d\.]+)/, 1), h = A(g), h.e !== k)) {
                    a = new B("Opera", h, g, a, c, b, D(this), e, d, f, new y(10 <= h.e, l, l));
                    break a
                }
                g = F(this.a, /Opera[\/ ]([\d\.]+)/, 1);
                h = A(g);
                a = h.e !== k ? new B("Opera", h, g, a, c, b, D(this), e, d, f, new y(10 <= h.e, l, l)) : new B("Opera", new z, "Unknown", a, c, b, D(this), e, d, f, new y(l, l, l))
            }
        } else /OPR\/[\d.]+/.test(this.a) ? a = ja(this) : /AppleWeb(K|k)it/.test(this.a) ?
            a = ja(this) : -1 != this.a.indexOf("Gecko") ? (a = "Unknown", b = new z, c = "Unknown", d = E(this), e = A(d), f = l, -1 != this.a.indexOf("Firefox") ? (a = "Firefox", c = F(this.a, /Firefox\/([\d\w\.]+)/, 1), b = A(c), f = 3 <= b.e && 5 <= b.o) : -1 != this.a.indexOf("Mozilla") && (a = "Mozilla"), g = F(this.a, /rv:([^\)]+)/, 1), h = A(g), f || (f = 1 < h.e || 1 == h.e && 9 < h.o || 1 == h.e && 9 == h.o && 2 <= h.aa || g.match(/1\.9\.1b[123]/) != k || g.match(/1\.9\.1\.[\d\.]+/) != k), a = new B(a, b, c, "Gecko", h, g, D(this), e, d, G(this.H), new y(f, l, l))) : a = ia;
        return a
    };

    function D(a) {
        var b = F(a.a, /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/, 1);
        if ("" != b) return /BB\d{2}/.test(b) && (b = "BlackBerry"), b;
        a = F(a.a, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/, 1);
        return "" != a ? ("Mac_PowerPC" == a && (a = "Macintosh"), a) : "Unknown"
    }

    function E(a) {
        var b = F(a.a, /(OS X|Windows NT|Android) ([^;)]+)/, 2);
        if (b || (b = F(a.a, /Windows Phone( OS)? ([^;)]+)/, 2)) || (b = F(a.a, /(iPhone )?OS ([\d_]+)/, 2))) return b;
        if (b = F(a.a, /(?:Linux|CrOS) ([^;)]+)/, 1))
            for (var b = b.split(/\s/), c = 0; c < b.length; c += 1)
                if (/^[\d\._]+$/.test(b[c])) return b[c];
        return (a = F(a.a, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2)) ? a : "Unknown"
    }

    function ja(a) {
        var b = D(a),
            c = E(a),
            d = A(c),
            e = F(a.a, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1),
            f = A(e),
            g = "Unknown",
            h = new z,
            m = "Unknown",
            n = l;
        /OPR\/[\d.]+/.test(a.a) ? g = "Opera" : -1 != a.a.indexOf("Chrome") || -1 != a.a.indexOf("CrMo") || -1 != a.a.indexOf("CriOS") ? g = "Chrome" : /Silk\/\d/.test(a.a) ? g = "Silk" : "BlackBerry" == b || "Android" == b ? g = "BuiltinBrowser" : -1 != a.a.indexOf("PhantomJS") ? g = "PhantomJS" : -1 != a.a.indexOf("Safari") ? g = "Safari" : -1 != a.a.indexOf("AdobeAIR") && (g = "AdobeAIR");
        "BuiltinBrowser" == g ? m = "Unknown" : "Silk" == g ? m = F(a.a,
            /Silk\/([\d\._]+)/, 1) : "Chrome" == g ? m = F(a.a, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2) : -1 != a.a.indexOf("Version/") ? m = F(a.a, /Version\/([\d\.\w]+)/, 1) : "AdobeAIR" == g ? m = F(a.a, /AdobeAIR\/([\d\.]+)/, 1) : "Opera" == g ? m = F(a.a, /OPR\/([\d.]+)/, 1) : "PhantomJS" == g && (m = F(a.a, /PhantomJS\/([\d.]+)/, 1));
        h = A(m);
        n = "AdobeAIR" == g ? 2 < h.e || 2 == h.e && 5 <= h.o : "BlackBerry" == b ? 10 <= d.e : "Android" == b ? 2 < d.e || 2 == d.e && 1 < d.o : 526 <= f.e || 525 <= f.e && 13 <= f.o;
        return new B(g, h, m, "AppleWebKit", f, e, b, d, c, G(a.H), new y(n, 536 > f.e || 536 == f.e && 11 > f.o, "iPhone" ==
            b || "iPad" == b || "iPod" == b || "Macintosh" == b))
    }

    function F(a, b, c) {
        return (a = a.match(b)) && a[c] ? a[c] : ""
    }

    function G(a) {
        if (a.documentMode) return a.documentMode
    };

    function ka(a) {
        this.ua = a || "-"
    }
    ka.prototype.f = function(a) {
        for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
        return b.join(this.ua)
    };

    function H(a, b) {
        this.J = a;
        this.T = 4;
        this.K = "n";
        var c = (b || "n4").match(/^([nio])([1-9])$/i);
        c && (this.K = c[1], this.T = parseInt(c[2], 10))
    }
    H.prototype.getName = p("J");

    function I(a) {
        return a.K + a.T
    }

    function la(a) {
        var b = 4,
            c = "n",
            d = k;
        a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
        return c + b
    };

    function ma(a, b, c) {
        this.c = a;
        this.h = b;
        this.M = c;
        this.j = "wf";
        this.g = new ka("-")
    }

    function na(a) {
        t(a.h, a.g.f(a.j, "loading"));
        J(a, "loading")
    }

    function K(a) {
        u(a.h, a.g.f(a.j, "loading"));
        ga(a.h, a.g.f(a.j, "active")) || t(a.h, a.g.f(a.j, "inactive"));
        J(a, "inactive")
    }

    function J(a, b, c) {
        if (a.M[b])
            if (c) a.M[b](c.getName(), I(c));
            else a.M[b]()
    };

    function L(a, b) {
        this.c = a;
        this.C = b;
        this.s = this.c.createElement("span", {
            "aria-hidden": "true"
        }, this.C)
    }

    function M(a, b) {
        var c;
        c = [];
        for (var d = b.J.split(/,\s*/), e = 0; e < d.length; e++) {
            var f = d[e].replace(/['"]/g, ""); - 1 == f.indexOf(" ") ? c.push(f) : c.push("'" + f + "'")
        }
        c = c.join(",");
        d = "normal";
        e = b.T + "00";
        "o" === b.K ? d = "oblique" : "i" === b.K && (d = "italic");
        a.s.style.cssText = "position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + c + ";" + ("font-style:" + d + ";font-weight:" + e + ";")
    }

    function N(a) {
        fa(a.c, "body", a.s)
    }
    L.prototype.remove = function() {
        var a = this.s;
        a.parentNode && a.parentNode.removeChild(a)
    };

    function oa(a, b, c, d, e, f, g, h) {
        this.U = a;
        this.sa = b;
        this.c = c;
        this.q = d;
        this.C = h || "BESbswy";
        this.k = e;
        this.F = {};
        this.R = f || 5E3;
        this.Y = g || k;
        this.B = this.A = k;
        a = new L(this.c, this.C);
        N(a);
        for (var m in O) O.hasOwnProperty(m) && (M(a, new H(O[m], I(this.q))), this.F[O[m]] = a.s.offsetWidth);
        a.remove()
    }
    var O = {
        Ca: "serif",
        Ba: "sans-serif",
        Aa: "monospace"
    };
    oa.prototype.start = function() {
        this.A = new L(this.c, this.C);
        N(this.A);
        this.B = new L(this.c, this.C);
        N(this.B);
        this.xa = da();
        M(this.A, new H(this.q.getName() + ",serif", I(this.q)));
        M(this.B, new H(this.q.getName() + ",sans-serif", I(this.q)));
        qa(this)
    };

    function ra(a, b, c) {
        for (var d in O)
            if (O.hasOwnProperty(d) && b === a.F[O[d]] && c === a.F[O[d]]) return j;
        return l
    }

    function qa(a) {
        var b = a.A.s.offsetWidth,
            c = a.B.s.offsetWidth;
        b === a.F.serif && c === a.F["sans-serif"] || a.k.S && ra(a, b, c) ? da() - a.xa >= a.R ? a.k.S && ra(a, b, c) && (a.Y === k || a.Y.hasOwnProperty(a.q.getName())) ? P(a, a.U) : P(a, a.sa) : setTimeout(s(function() {
            qa(this)
        }, a), 25) : P(a, a.U)
    }

    function P(a, b) {
        a.A.remove();
        a.B.remove();
        b(a.q)
    };

    function R(a, b, c, d) {
        this.c = b;
        this.t = c;
        this.N = 0;
        this.ba = this.X = l;
        this.R = d;
        this.k = a.k
    }

    function sa(a, b, c, d, e) {
        if (0 === b.length && e) K(a.t);
        else {
            a.N += b.length;
            e && (a.X = e);
            for (e = 0; e < b.length; e++) {
                var f = b[e],
                    g = c[f.getName()],
                    h = a.t,
                    m = f;
                t(h.h, h.g.f(h.j, m.getName(), I(m).toString(), "loading"));
                J(h, "fontloading", m);
                (new oa(s(a.ga, a), s(a.ha, a), a.c, f, a.k, a.R, d, g)).start()
            }
        }
    }
    R.prototype.ga = function(a) {
        var b = this.t;
        u(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "loading"));
        u(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "inactive"));
        t(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "active"));
        J(b, "fontactive", a);
        this.ba = j;
        ta(this)
    };
    R.prototype.ha = function(a) {
        var b = this.t;
        u(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "loading"));
        ga(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "active")) || t(b.h, b.g.f(b.j, a.getName(), I(a).toString(), "inactive"));
        J(b, "fontinactive", a);
        ta(this)
    };

    function ta(a) {
        0 == --a.N && a.X && (a.ba ? (a = a.t, u(a.h, a.g.f(a.j, "loading")), u(a.h, a.g.f(a.j, "inactive")), t(a.h, a.g.f(a.j, "active")), J(a, "active")) : K(a.t))
    };

    function S(a, b, c) {
        this.G = a;
        this.V = b;
        this.a = c;
        this.O = this.P = 0
    }

    function T(a, b) {
        U.V.Z[a] = b
    }
    S.prototype.load = function(a) {
        var b = a.context || this.G;
        this.c = new ea(this.G, b);
        b = new ma(this.c, b.document.documentElement, a);
        if (this.a.k.w) {
            var c = this.V,
                d = this.c,
                e = [],
                f;
            for (f in a)
                if (a.hasOwnProperty(f)) {
                    var g = c.Z[f];
                    g && e.push(g(a[f], d))
                }
            a = a.timeout;
            this.O = this.P = e.length;
            a = new R(this.a, this.c, b, a);
            f = 0;
            for (c = e.length; f < c; f++) d = e[f], d.v(this.a, s(this.ta, this, d, b, a))
        } else K(b)
    };
    S.prototype.ta = function(a, b, c, d) {
        var e = this;
        d ? a.load(function(a, d, h) {
            var m = 0 == --e.P;
            m && na(b);
            setTimeout(function() {
                sa(c, a, d || {}, h || k, m)
            }, 0)
        }) : (a = 0 == --this.P, this.O--, a && (0 == this.O ? K(b) : na(b)), sa(c, [], {}, k, a))
    };
    var ua = window,
        va = (new C(navigator.userAgent, document)).parse(),
        U = ua.WebFont = new S(window, new function() {
            this.Z = {}
        }, va);
    U.load = U.load;

    function V(a, b) {
        this.c = a;
        this.d = b
    }
    V.prototype.load = function(a) {
        var b, c, d = this.d.urls || [],
            e = this.d.families || [];
        b = 0;
        for (c = d.length; b < c; b++) w(this.c, d[b]);
        d = [];
        b = 0;
        for (c = e.length; b < c; b++) {
            var f = e[b].split(":");
            if (f[1])
                for (var g = f[1].split(","), h = 0; h < g.length; h += 1) d.push(new H(f[0], g[h]));
            else d.push(new H(f[0]))
        }
        a(d)
    };
    V.prototype.v = function(a, b) {
        return b(a.k.w)
    };
    T("custom", function(a, b) {
        return new V(b, a)
    });

    function W(a, b) {
        this.c = a;
        this.d = b;
        this.m = []
    }
    W.prototype.D = function(a) {
        return v(this.c) + (this.d.api || "//f.fontdeck.com/s/css/js/") + (this.c.u.location.hostname || this.c.G.location.hostname) + "/" + a + ".js"
    };
    W.prototype.v = function(a, b) {
        var c = this.d.id,
            d = this.c.u,
            e = this;
        c ? (d.__webfontfontdeckmodule__ || (d.__webfontfontdeckmodule__ = {}), d.__webfontfontdeckmodule__[c] = function(a, c) {
            for (var d = 0, m = c.fonts.length; d < m; ++d) {
                var n = c.fonts[d];
                e.m.push(new H(n.name, la("font-weight:" + n.weight + ";font-style:" + n.style)))
            }
            b(a)
        }, x(this.c, this.D(c), function(a) {
            a && b(l)
        })) : b(l)
    };
    W.prototype.load = function(a) {
        a(this.m)
    };
    T("fontdeck", function(a, b) {
        return new W(b, a)
    });

    function wa(a, b, c) {
        this.L = a ? a : b + xa;
        this.p = [];
        this.Q = [];
        this.ca = c || ""
    }
    var xa = "//fonts.googleapis.com/css";
    wa.prototype.f = function() {
        if (0 == this.p.length) throw Error("No fonts to load !");
        if (-1 != this.L.indexOf("kit=")) return this.L;
        for (var a = this.p.length, b = [], c = 0; c < a; c++) b.push(this.p[c].replace(/ /g, "+"));
        a = this.L + "?family=" + b.join("%7C");
        0 < this.Q.length && (a += "&subset=" + this.Q.join(","));
        0 < this.ca.length && (a += "&text=" + encodeURIComponent(this.ca));
        return a
    };

    function ya(a) {
        this.p = a;
        this.$ = [];
        this.I = {}
    }
    var za = {
        latin: "BESbswy",
        cyrillic: "&#1081;&#1103;&#1046;",
        greek: "&#945;&#946;&#931;",
        khmer: "&#x1780;&#x1781;&#x1782;",
        Hanuman: "&#x1780;&#x1781;&#x1782;"
    }, Aa = {
            thin: "1",
            extralight: "2",
            "extra-light": "2",
            ultralight: "2",
            "ultra-light": "2",
            light: "3",
            regular: "4",
            book: "4",
            medium: "5",
            "semi-bold": "6",
            semibold: "6",
            "demi-bold": "6",
            demibold: "6",
            bold: "7",
            "extra-bold": "8",
            extrabold: "8",
            "ultra-bold": "8",
            ultrabold: "8",
            black: "9",
            heavy: "9",
            l: "3",
            r: "4",
            b: "7"
        }, Ba = {
            i: "i",
            italic: "i",
            n: "n",
            normal: "n"
        }, Ca = RegExp("^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$");
    ya.prototype.parse = function() {
        for (var a = this.p.length, b = 0; b < a; b++) {
            var c = this.p[b].split(":"),
                d = c[0].replace(/\+/g, " "),
                e = ["n4"];
            if (2 <= c.length) {
                var f;
                var g = c[1];
                f = [];
                if (g)
                    for (var g = g.split(","), h = g.length, m = 0; m < h; m++) {
                        var n;
                        n = g[m];
                        if (n.match(/^[\w]+$/)) {
                            n = Ca.exec(n.toLowerCase());
                            var r = void 0;
                            if (n == k) r = "";
                            else {
                                r = void 0;
                                r = n[1];
                                if (r == k || "" == r) r = "4";
                                else var pa = Aa[r],
                                r = pa ? pa : isNaN(r) ? "4" : r.substr(0, 1);
                                r = [n[2] == k || "" == n[2] ? "n" : Ba[n[2]], r].join("")
                            }
                            n = r
                        } else n = "";
                        n && f.push(n)
                    }
                0 < f.length && (e = f);
                3 == c.length &&
                    (c = c[2], f = [], c = !c ? f : c.split(","), 0 < c.length && (c = za[c[0]]) && (this.I[d] = c))
            }
            this.I[d] || (c = za[d]) && (this.I[d] = c);
            for (c = 0; c < e.length; c += 1) this.$.push(new H(d, e[c]))
        }
    };

    function X(a, b, c) {
        this.a = a;
        this.c = b;
        this.d = c
    }
    var Da = {
        Arimo: j,
        Cousine: j,
        Tinos: j
    };
    X.prototype.v = function(a, b) {
        b(a.k.w)
    };
    X.prototype.load = function(a) {
        var b = this.c;
        if ("MSIE" == this.a.getName() && this.d.blocking != j) {
            var c = s(this.W, this, a),
                d = function() {
                    b.z.body ? c() : setTimeout(d, 0)
                };
            d()
        } else this.W(a)
    };
    X.prototype.W = function(a) {
        for (var b = this.c, c = new wa(this.d.api, v(b), this.d.text), d = this.d.families, e = d.length, f = 0; f < e; f++) {
            var g = d[f].split(":");
            3 == g.length && c.Q.push(g.pop());
            var h = "";
            2 == g.length && "" != g[1] && (h = ":");
            c.p.push(g.join(h))
        }
        d = new ya(d);
        d.parse();
        w(b, c.f());
        a(d.$, d.I, Da)
    };
    T("google", function(a, b) {
        var c = (new C(navigator.userAgent, document)).parse();
        return new X(c, b, a)
    });

    function Y(a, b) {
        this.c = a;
        this.d = b
    }
    var Ea = {
        regular: "n4",
        bold: "n7",
        italic: "i4",
        bolditalic: "i7",
        r: "n4",
        b: "n7",
        i: "i4",
        bi: "i7"
    };
    Y.prototype.v = function(a, b) {
        return b(a.k.w)
    };
    Y.prototype.load = function(a) {
        w(this.c, v(this.c) + "//webfonts.fontslive.com/css/" + this.d.key + ".css");
        for (var b = this.d.families, c = [], d = 0, e = b.length; d < e; d++) c.push.apply(c, Fa(b[d]));
        a(c)
    };

    function Fa(a) {
        var b = a.split(":");
        a = b[0];
        if (b[1]) {
            for (var c = b[1].split(","), b = [], d = 0, e = c.length; d < e; d++) {
                var f = c[d];
                if (f) {
                    var g = Ea[f];
                    b.push(g ? g : f)
                }
            }
            c = [];
            for (d = 0; d < b.length; d += 1) c.push(new H(a, b[d]));
            return c
        }
        return [new H(a)]
    }
    T("ascender", function(a, b) {
        return new Y(b, a)
    });

    function Z(a, b, c) {
        this.a = a;
        this.c = b;
        this.d = c;
        this.m = []
    }
    Z.prototype.v = function(a, b) {
        var c = this,
            d = c.d.projectId,
            e = c.d.version;
        if (d) {
            var f = c.c.u;
            x(this.c, c.D(d, e), function(e) {
                if (e) b(l);
                else {
                    if (f["__mti_fntLst" + d] && (e = f["__mti_fntLst" + d]()))
                        for (var h = 0; h < e.length; h++) c.m.push(new H(e[h].fontfamily));
                    b(a.k.w)
                }
            }).id = "__MonotypeAPIScript__" + d
        } else b(l)
    };
    Z.prototype.D = function(a, b) {
        var c = v(this.c),
            d = (this.d.api || "fast.fonts.com/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
        return c + "//" + d + "/" + a + ".js" + (b ? "?v=" + b : "")
    };
    Z.prototype.load = function(a) {
        a(this.m)
    };
    T("monotype", function(a, b) {
        var c = (new C(navigator.userAgent, document)).parse();
        return new Z(c, b, a)
    });

    function $(a, b) {
        this.c = a;
        this.d = b;
        this.m = []
    }
    $.prototype.D = function(a) {
        var b = v(this.c);
        return (this.d.api || b + "//use.typekit.net") + "/" + a + ".js"
    };
    $.prototype.v = function(a, b) {
        var c = this.d.id,
            d = this.d,
            e = this.c.u,
            f = this;
        c ? (e.__webfonttypekitmodule__ || (e.__webfonttypekitmodule__ = {}), e.__webfonttypekitmodule__[c] = function(c) {
            c(a, d, function(a, c, d) {
                for (var e = 0; e < c.length; e += 1) {
                    var g = d[c[e]];
                    if (g)
                        for (var Q = 0; Q < g.length; Q += 1) f.m.push(new H(c[e], g[Q]));
                    else f.m.push(new H(c[e]))
                }
                b(a)
            })
        }, x(this.c, this.D(c), function(a) {
            a && b(l)
        }, 2E3)) : b(l)
    };
    $.prototype.load = function(a) {
        a(this.m)
    };
    T("typekit", function(a, b) {
        return new $(b, a)
    });
    window.WebFontConfig && U.load(window.WebFontConfig);
})(this, document);