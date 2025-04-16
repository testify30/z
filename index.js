const Oc = function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
    new MutationObserver(n => {
        for (const o of n)
            if (o.type === "childList")
                for (const a of o.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && i(a)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function r(n) {
        const o = {};
        return n.integrity && (o.integrity = n.integrity), n.referrerpolicy && (o.referrerPolicy = n.referrerpolicy), n.crossorigin === "use-credentials" ? o.credentials = "include" : n.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function i(n) {
        if (n.ep) return;
        n.ep = !0;
        const o = r(n);
        fetch(n.href, o)
    }
};
Oc();
const $t = {};

function Mc(t) {
    $t.context = t
}
const Nc = (t, e) => t === e,
    vo = Symbol("solid-proxy"),
    Bc = Symbol("solid-track"),
    Gi = {
        equals: Nc
    };
let ya = Sa;
const Fe = 1,
    ji = 2,
    wa = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    },
    Nn = {};
var It = null;
let mr = null,
    Et = null,
    Nt = null,
    Oe = null,
    mo = 0;

function ri(t, e) {
    const r = Et,
        i = It,
        n = t.length === 0,
        o = n ? wa : {
            owned: null,
            cleanups: null,
            context: null,
            owner: e || i
        },
        a = n ? t : () => t(() => te(() => yo(o)));
    It = o, Et = null;
    try {
        return br(a, !0)
    } finally {
        Et = r, It = i
    }
}

function at(t, e) {
    e = e ? Object.assign({}, Gi, e) : Gi;
    const r = {
            value: t,
            observers: null,
            observerSlots: null,
            comparator: e.equals || void 0
        },
        i = n => (typeof n == "function" && (n = n(r.value)), Ea(r, n));
    return [xa.bind(r), i]
}

function ii(t, e, r) {
    const i = dn(t, e, !0, Fe);
    jr(i)
}

function ct(t, e, r) {
    const i = dn(t, e, !1, Fe);
    jr(i)
}

function gt(t, e, r) {
    ya = Yc;
    const i = dn(t, e, !1, Fe),
        n = Kn && Ta(It, Kn.id);
    n && (i.suspense = n), i.user = !0, Oe ? Oe.push(i) : jr(i)
}

function it(t, e, r) {
    r = r ? Object.assign({}, Gi, r) : Gi;
    const i = dn(t, e, !0, 0);
    return i.observers = null, i.observerSlots = null, i.comparator = r.equals || void 0, jr(i), xa.bind(i)
}

function _o(t, e, r) {
    let i, n, o;
    arguments.length === 2 && typeof e == "object" || arguments.length === 1 ? (i = !0, n = t, o = e || {}) : (i = t, n = e, o = r || {});
    let a = null,
        s = Nn,
        u = null,
        h = !1,
        f = "initialValue" in o,
        v = typeof i == "function" && it(i);
    const S = new Set,
        [b, D] = (o.storage || at)(o.initialValue),
        [_, y] = at(void 0),
        [I, k] = at(void 0, {
            equals: !1
        }),
        [L, p] = at(f ? "ready" : "unresolved");
    if ($t.context) {
        u = `${$t.context.id}${$t.context.count++}`;
        let M;
        o.ssrLoadFrom === "initial" ? s = o.initialValue : $t.load && (M = $t.load(u)) && (s = M[0])
    }

    function O(M, A, x, E) {
        return a === M && (a = null, f = !0, (M === s || A === s) && o.onHydrated && queueMicrotask(() => o.onHydrated(E, {
            value: A
        })), s = Nn, $(A, x)), A
    }

    function $(M, A) {
        br(() => {
            A || D(() => M), p(A ? "errored" : "ready"), y(A);
            for (const x of S.keys()) x.decrement();
            S.clear()
        }, !1)
    }

    function X() {
        const M = Kn,
            A = b(),
            x = _();
        if (x && !a) throw x;
        return Et && !Et.user && M && ii(() => {
            I(), a && (M.resolved || S.has(M) || (M.increment(), S.add(M)))
        }), A
    }

    function N(M = !0) {
        if (M !== !1 && h) return;
        h = !1;
        const A = v ? v() : i;
        if (A == null || A === !1) {
            O(a, te(b));
            return
        }
        const x = s !== Nn ? s : te(() => n(A, {
            value: b(),
            refetching: M
        }));
        return typeof x != "object" || !(x && "then" in x) ? (O(a, x), x) : (a = x, h = !0, queueMicrotask(() => h = !1), br(() => {
            p(f ? "refreshing" : "pending"), k()
        }, !1), x.then(E => O(x, E, void 0, A), E => O(x, void 0, Aa(E))))
    }
    return Object.defineProperties(X, {
        state: {
            get: () => L()
        },
        error: {
            get: () => _()
        },
        loading: {
            get() {
                const M = L();
                return M === "pending" || M === "refreshing"
            }
        },
        latest: {
            get() {
                if (!f) return X();
                const M = _();
                if (M && !a) throw M;
                return b()
            }
        }
    }), v ? ii(() => N(!1)) : N(!1), [X, {
        refetch: N,
        mutate: D
    }]
}

function te(t) {
    const e = Et;
    Et = null;
    try {
        return t()
    } finally {
        Et = e
    }
}

function ee(t, e, r) {
    const i = Array.isArray(t);
    let n, o = r && r.defer;
    return a => {
        let s;
        if (i) {
            s = Array(t.length);
            for (let h = 0; h < t.length; h++) s[h] = t[h]()
        } else s = t();
        if (o) {
            o = !1;
            return
        }
        const u = te(() => e(s, n, a));
        return n = s, u
    }
}

function Uc(t) {
    gt(() => te(t))
}

function Ur(t) {
    return It === null || (It.cleanups === null ? It.cleanups = [t] : It.cleanups.push(t)), t
}

function ba(t) {
    const e = it(t),
        r = it(() => Jn(e()));
    return r.toArray = () => {
        const i = r();
        return Array.isArray(i) ? i : i != null ? [i] : []
    }, r
}
let Kn;

function xa() {
    const t = mr;
    if (this.sources && (this.state || t))
        if (this.state === Fe || t) jr(this);
        else {
            const e = Nt;
            Nt = null, br(() => Qi(this), !1), Nt = e
        } if (Et) {
        const e = this.observers ? this.observers.length : 0;
        Et.sources ? (Et.sources.push(this), Et.sourceSlots.push(e)) : (Et.sources = [this], Et.sourceSlots = [e]), this.observers ? (this.observers.push(Et), this.observerSlots.push(Et.sources.length - 1)) : (this.observers = [Et], this.observerSlots = [Et.sources.length - 1])
    }
    if (typeof this.value === "string" && this.value.length === 7) {
        //console.log(this.value);
		//console.trace();
    }
    return this.value
}

function Ea(t, e, r) {
    let i = t.value;
    return (!t.comparator || !t.comparator(i, e)) && (t.value = e, t.observers && t.observers.length && br(() => {
        for (let n = 0; n < t.observers.length; n += 1) {
            const o = t.observers[n],
                a = mr && mr.running;
            a && mr.disposed.has(o), (a && !o.tState || !a && !o.state) && (o.pure ? Nt.push(o) : Oe.push(o), o.observers && ka(o)), a || (o.state = Fe)
        }
        if (Nt.length > 1e6) throw Nt = [], new Error
    }, !1)), e
}

function jr(t) {
    if (!t.fn) return;
    yo(t);
    const e = It,
        r = Et,
        i = mo;
    Et = It = t, Fc(t, t.value, i), Et = r, It = e
}

function Fc(t, e, r) {
	//console.log(t,e,r)
    let i;
    try {
        i = t.fn(e)
    } catch (n) {
        t.pure && (t.state = Fe), Ca(n)
    }(!t.updatedAt || t.updatedAt <= r) && (t.updatedAt != null && "observers" in t ? Ea(t, i) : t.value = i, t.updatedAt = r)
}

function dn(t, e, r, i = Fe, n) {
    const o = {
        fn: t,
        state: i,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: e,
        owner: It,
        context: null,
        pure: r
    };
    return It === null || It !== wa && (It.owned ? It.owned.push(o) : It.owned = [o]), o
}

function Zi(t) {
    const e = mr;
    if (t.state === 0 || e) return;
    if (t.state === ji || e) return Qi(t);
    if (t.suspense && te(t.suspense.inFallback)) return t.suspense.effects.push(t);
    const r = [t];
    for (;
        (t = t.owner) && (!t.updatedAt || t.updatedAt < mo);)(t.state || e) && r.push(t);
    for (let i = r.length - 1; i >= 0; i--)
        if (t = r[i], t.state === Fe || e) jr(t);
        else if (t.state === ji || e) {
        const n = Nt;
        Nt = null, br(() => Qi(t, r[0]), !1), Nt = n
    }
}

function br(t, e) {
    if (Nt) return t();
    let r = !1;
    e || (Nt = []), Oe ? r = !0 : Oe = [], mo++;
    try {
        const i = t();
        return Hc(r), i
    } catch (i) {
        Nt || (Oe = null), Ca(i)
    }
}

function Hc(t) {
    if (Nt && (Sa(Nt), Nt = null), t) return;
    const e = Oe;
    Oe = null, e.length && br(() => ya(e), !1)
}

function Sa(t) {
    for (let e = 0; e < t.length; e++) Zi(t[e])
}

function Yc(t) {
    let e, r = 0;
    for (e = 0; e < t.length; e++) {
        const i = t[e];
        i.user ? t[r++] = i : Zi(i)
    }
    for ($t.context && Mc(), e = 0; e < r; e++) Zi(t[e])
}

function Qi(t, e) {
    const r = mr;
    t.state = 0;
    for (let i = 0; i < t.sources.length; i += 1) {
        const n = t.sources[i];
        n.sources && (n.state === Fe || r ? n !== e && Zi(n) : (n.state === ji || r) && Qi(n, e))
    }
}

function ka(t) {
    const e = mr;
    for (let r = 0; r < t.observers.length; r += 1) {
        const i = t.observers[r];
        (!i.state || e) && (i.state = ji, i.pure ? Nt.push(i) : Oe.push(i), i.observers && ka(i))
    }
}

function yo(t) {
    let e;
    if (t.sources)
        for (; t.sources.length;) {
            const r = t.sources.pop(),
                i = t.sourceSlots.pop(),
                n = r.observers;
            if (n && n.length) {
                const o = n.pop(),
                    a = r.observerSlots.pop();
                i < n.length && (o.sourceSlots[a] = i, n[i] = o, r.observerSlots[i] = a)
            }
        }
    if (t.owned) {
        for (e = 0; e < t.owned.length; e++) yo(t.owned[e]);
        t.owned = null
    }
    if (t.cleanups) {
        for (e = 0; e < t.cleanups.length; e++) t.cleanups[e]();
        t.cleanups = null
    }
    t.state = 0, t.context = null
}

function Aa(t) {
    return t instanceof Error || typeof t == "string" ? t : new Error("Unknown error")
}

function Ca(t) {
    throw t = Aa(t), t
}

function Ta(t, e) {
    return t ? t.context && t.context[e] !== void 0 ? t.context[e] : Ta(t.owner, e) : void 0
}

function Jn(t) {
    if (typeof t == "function" && !t.length) return Jn(t());
    if (Array.isArray(t)) {
        const e = [];
        for (let r = 0; r < t.length; r++) {
            const i = Jn(t[r]);
            Array.isArray(i) ? e.push.apply(e, i) : e.push(i)
        }
        return e
    }
    return t
}
const zc = Symbol("fallback");

function ts(t) {
    for (let e = 0; e < t.length; e++) t[e]()
}

function Xc(t, e, r = {}) {
    let i = [],
        n = [],
        o = [],
        a = 0,
        s = e.length > 1 ? [] : null;
    return Ur(() => ts(o)), () => {
        let u = t() || [],
            h, f;
        return u[Bc], te(() => {
            let S = u.length,
                b, D, _, y, I, k, L, p, O;
            if (S === 0) a !== 0 && (ts(o), o = [], i = [], n = [], a = 0, s && (s = [])), r.fallback && (i = [zc], n[0] = ri($ => (o[0] = $, r.fallback())), a = 1);
            else if (a === 0) {
                for (n = new Array(S), f = 0; f < S; f++) i[f] = u[f], n[f] = ri(v);
                a = S
            } else {
                for (_ = new Array(S), y = new Array(S), s && (I = new Array(S)), k = 0, L = Math.min(a, S); k < L && i[k] === u[k]; k++);
                for (L = a - 1, p = S - 1; L >= k && p >= k && i[L] === u[p]; L--, p--) _[p] = n[L], y[p] = o[L], s && (I[p] = s[L]);
                for (b = new Map, D = new Array(p + 1), f = p; f >= k; f--) O = u[f], h = b.get(O), D[f] = h === void 0 ? -1 : h, b.set(O, f);
                for (h = k; h <= L; h++) O = i[h], f = b.get(O), f !== void 0 && f !== -1 ? (_[f] = n[h], y[f] = o[h], s && (I[f] = s[h]), f = D[f], b.set(O, f)) : o[h]();
                for (f = k; f < S; f++) f in _ ? (n[f] = _[f], o[f] = y[f], s && (s[f] = I[f], s[f](f))) : n[f] = ri(v);
                n = n.slice(0, a = S), i = u.slice(0)
            }
            return n
        });

        function v(S) {
            if (o[f] = S, s) {
                const [b, D] = at(f);
                return s[f] = D, e(u[f], b)
            }
            return e(u[f])
        }
    }
}

function w(t, e) {
    return te(() => t(e || {}))
}

function $i() {
    return !0
}
const Da = {
    get(t, e, r) {
        return e === vo ? r : t.get(e)
    },
    has(t, e) {
        return t.has(e)
    },
    set: $i,
    deleteProperty: $i,
    getOwnPropertyDescriptor(t, e) {
        return {
            configurable: !0,
            enumerable: !0,
            get() {
                return t.get(e)
            },
            set: $i,
            deleteProperty: $i
        }
    },
    ownKeys(t) {
        return t.keys()
    }
};

function Bn(t) {
    return (t = typeof t == "function" ? t() : t) ? t : {}
}

function de(...t) {
    if (t.some(r => r && (vo in r || typeof r == "function"))) return new Proxy({
        get(r) {
            for (let i = t.length - 1; i >= 0; i--) {
                const n = Bn(t[i])[r];
                if (n !== void 0) return n
            }
        },
        has(r) {
            for (let i = t.length - 1; i >= 0; i--)
                if (r in Bn(t[i])) return !0;
            return !1
        },
        keys() {
            const r = [];
            for (let i = 0; i < t.length; i++) r.push(...Object.keys(Bn(t[i])));
            return [...new Set(r)]
        }
    }, Da);
    const e = {};
    for (let r = t.length - 1; r >= 0; r--)
        if (t[r]) {
            const i = Object.getOwnPropertyDescriptors(t[r]);
            for (const n in i) n in e || Object.defineProperty(e, n, {
                enumerable: !0,
                get() {
                    for (let o = t.length - 1; o >= 0; o--) {
                        const a = (t[o] || {})[n];
                        if (a !== void 0) return a
                    }
                }
            })
        } return e
}

function lr(t, ...e) {
    const r = new Set(e.flat()),
        i = Object.getOwnPropertyDescriptors(t),
        n = vo in t;
    n || e.push(Object.keys(i).filter(a => !r.has(a)));
    const o = e.map(a => {
        const s = {};
        for (let u = 0; u < a.length; u++) {
            const h = a[u];
            !n && !(h in t) || Object.defineProperty(s, h, i[h] ? i[h] : {
                get() {
                    return t[h]
                },
                set() {
                    return !0
                },
                enumerable: !0
            })
        }
        return s
    });
    return n && o.push(new Proxy({
        get(a) {
            return r.has(a) ? void 0 : t[a]
        },
        has(a) {
            return r.has(a) ? !1 : a in t
        },
        keys() {
            return Object.keys(t).filter(a => !r.has(a))
        }
    }, Da)), o
}

function wo(t) {
    const e = "fallback" in t && {
        fallback: () => t.fallback
    };
    return it(Xc(() => t.each, t.children, e || void 0))
}

function cr(t) {
    let e = !1,
        r = !1;
    const i = ba(() => t.children),
        n = it(() => {
            let o = i();
            Array.isArray(o) || (o = [o]);
            for (let a = 0; a < o.length; a++) {
                const s = o[a].when;
                if (s) return r = !!o[a].keyed, [a, s, o[a]]
            }
            return [-1]
        }, void 0, {
            equals: (o, a) => o[0] === a[0] && (e ? o[1] === a[1] : !o[1] == !a[1]) && o[2] === a[2]
        });
    return it(() => {
        const [o, a, s] = n();
        if (o < 0) return t.fallback;
        const u = s.children,
            h = typeof u == "function" && u.length > 0;
        return e = r || h, h ? te(() => u(a)) : u
    })
}

function Mt(t) {
    return t
}
const Vc = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"],
    qc = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Vc]),
    Wc = new Set(["innerHTML", "textContent", "innerText", "children"]),
    Gc = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    es = Object.assign(Object.create(null), {
        class: "className",
        formnovalidate: "formNoValidate",
        ismap: "isMap",
        nomodule: "noModule",
        playsinline: "playsInline",
        readonly: "readOnly"
    }),
    jc = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    Zc = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };

function Qc(t, e, r) {
    let i = r.length,
        n = e.length,
        o = i,
        a = 0,
        s = 0,
        u = e[n - 1].nextSibling,
        h = null;
    for (; a < n || s < o;) {
        if (e[a] === r[s]) {
            a++, s++;
            continue
        }
        for (; e[n - 1] === r[o - 1];) n--, o--;
        if (n === a) {
            const f = o < i ? s ? r[s - 1].nextSibling : r[o - s] : u;
            for (; s < o;) t.insertBefore(r[s++], f)
        } else if (o === s)
            for (; a < n;)(!h || !h.has(e[a])) && e[a].remove(), a++;
        else if (e[a] === r[o - 1] && r[s] === e[n - 1]) {
            const f = e[--n].nextSibling;
            t.insertBefore(r[s++], e[a++].nextSibling), t.insertBefore(r[--o], f), e[n] = r[o]
        } else {
            if (!h) {
                h = new Map;
                let v = s;
                for (; v < o;) h.set(r[v], v++)
            }
            const f = h.get(e[a]);
            if (f != null)
                if (s < f && f < o) {
                    let v = a,
                        S = 1,
                        b;
                    for (; ++v < n && v < o && !((b = h.get(e[v])) == null || b !== f + S);) S++;
                    if (S > f - s) {
                        const D = e[a];
                        for (; s < f;) t.insertBefore(r[s++], D)
                    } else t.replaceChild(r[s++], e[a++])
                } else a++;
            else e[a++].remove()
        }
    }
}
const rs = "_$DX_DELEGATE";

function Kc(t, e, r, i = {}) {
    let n;
    return ri(o => {
        n = o, e === document ? t() : nt(e, t(), e.firstChild ? null : void 0, r)
    }, i.owner), () => {
        n(), e.textContent = ""
    }
}

function F(t, e, r) {
    const i = document.createElement("template");
    i.innerHTML = t;
    let n = i.content.firstChild;
    return r && (n = n.firstChild), n
}

function bo(t, e = window.document) {
    const r = e[rs] || (e[rs] = new Set);
    for (let i = 0, n = t.length; i < n; i++) {
        const o = t[i];
        r.has(o) || (r.add(o), e.addEventListener(o, iu))
    }
}

function Wt(t, e, r) {
    r == null ? t.removeAttribute(e) : t.setAttribute(e, r)
}

function Jc(t, e, r, i) {
    i == null ? t.removeAttributeNS(e, r) : t.setAttributeNS(e, r, i)
}

function st(t, e) {
    e == null ? t.removeAttribute("class") : t.className = e
}

function Ia(t, e, r, i) {
    if (i) Array.isArray(r) ? (t[`$$${e}`] = r[0], t[`$$${e}Data`] = r[1]) : t[`$$${e}`] = r;
    else if (Array.isArray(r)) {
        const n = r[0];
        t.addEventListener(e, r[0] = o => n.call(t, r[1], o))
    } else t.addEventListener(e, r)
}

function tu(t, e, r = {}) {
    const i = Object.keys(e || {}),
        n = Object.keys(r);
    let o, a;
    for (o = 0, a = n.length; o < a; o++) {
        const s = n[o];
        !s || s === "undefined" || e[s] || (is(t, s, !1), delete r[s])
    }
    for (o = 0, a = i.length; o < a; o++) {
        const s = i[o],
            u = !!e[s];
        !s || s === "undefined" || r[s] === u || !u || (is(t, s, !0), r[s] = u)
    }
    return r
}

function pn(t, e, r) {
    if (!e) return r ? Wt(t, "style") : e;
    const i = t.style;
    if (typeof e == "string") return i.cssText = e;
    typeof r == "string" && (i.cssText = r = void 0), r || (r = {}), e || (e = {});
    let n, o;
    for (o in r) e[o] == null && i.removeProperty(o), delete r[o];
    for (o in e) n = e[o], n !== r[o] && (i.setProperty(o, n), r[o] = n);
    return r
}

function pe(t, e = {}, r, i) {
    const n = {};
    return i || ct(() => n.children = Fr(t, e.children, n.children)), ct(() => e.ref && e.ref(t)), ct(() => eu(t, e, r, !0, n, !0)), n
}

function gn(t, e, r) {
    return te(() => t(e, r))
}

function nt(t, e, r, i) {
    if (r !== void 0 && !i && (i = []), typeof e != "function") return Fr(t, e, i, r);
    ct(n => Fr(t, e(), n, r), i)
}

function eu(t, e, r, i, n = {}, o = !1) {
    e || (e = {});
    for (const a in n)
        if (!(a in e)) {
            if (a === "children") continue;
            n[a] = ns(t, a, null, n[a], r, o)
        } for (const a in e) {
        if (a === "children") {
            i || Fr(t, e.children);
            continue
        }
        const s = e[a];
        n[a] = ns(t, a, s, n[a], r, o)
    }
}

function ru(t) {
    return t.toLowerCase().replace(/-([a-z])/g, (e, r) => r.toUpperCase())
}

function is(t, e, r) {
    const i = e.trim().split(/\s+/);
    for (let n = 0, o = i.length; n < o; n++) t.classList.toggle(i[n], r)
}

function ns(t, e, r, i, n, o) {
    let a, s, u;
    if (e === "style") return pn(t, r, i);
    if (e === "classList") return tu(t, r, i);
    if (r === i) return i;
    if (e === "ref") o || r(t);
    else if (e.slice(0, 3) === "on:") {
        const h = e.slice(3);
        i && t.removeEventListener(h, i), r && t.addEventListener(h, r)
    } else if (e.slice(0, 10) === "oncapture:") {
        const h = e.slice(10);
        i && t.removeEventListener(h, i, !0), r && t.addEventListener(h, r, !0)
    } else if (e.slice(0, 2) === "on") {
        const h = e.slice(2).toLowerCase(),
            f = jc.has(h);
        if (!f && i) {
            const v = Array.isArray(i) ? i[0] : i;
            t.removeEventListener(h, v)
        }(f || r) && (Ia(t, h, r, f), f && bo([h]))
    } else if ((u = Wc.has(e)) || !n && (es[e] || (s = qc.has(e))) || (a = t.nodeName.includes("-"))) e === "class" || e === "className" ? st(t, r) : a && !s && !u ? t[ru(e)] = r : t[es[e] || e] = r;
    else {
        const h = n && e.indexOf(":") > -1 && Zc[e.split(":")[0]];
        h ? Jc(t, h, e, r) : Wt(t, Gc[e] || e, r)
    }
    return r
}

function iu(t) {
    const e = `$$${t.type}`;
    let r = t.composedPath && t.composedPath()[0] || t.target;
    for (t.target !== r && Object.defineProperty(t, "target", {
            configurable: !0,
            value: r
        }), Object.defineProperty(t, "currentTarget", {
            configurable: !0,
            get() {
                return r || document
            }
        }), $t.registry && !$t.done && ($t.done = !0, document.querySelectorAll("[id^=pl-]").forEach(i => i.remove())); r !== null;) {
        const i = r[e];
        if (i && !r.disabled) {
            const n = r[`${e}Data`];
            if (n !== void 0 ? i.call(r, n, t) : i.call(r, t), t.cancelBubble) return
        }
        r = r.host && r.host !== r && r.host instanceof Node ? r.host : r.parentNode
    }
}

function Fr(t, e, r, i, n) {
    for ($t.context && !r && (r = [...t.childNodes]); typeof r == "function";) r = r();
    if (e === r) return r;
    const o = typeof e,
        a = i !== void 0;
    if (t = a && r[0] && r[0].parentNode || t, o === "string" || o === "number") {
        if ($t.context) return r;
        if (o === "number" && (e = e.toString()), a) {
            let s = r[0];
            s && s.nodeType === 3 ? s.data = e : s = document.createTextNode(e), r = Dr(t, r, i, s)
        } else r !== "" && typeof r == "string" ? r = t.firstChild.data = e : r = t.textContent = e
    } else if (e == null || o === "boolean") {
        if ($t.context) return r;
        r = Dr(t, r, i)
    } else {
        if (o === "function") return ct(() => {
            let s = e();
            for (; typeof s == "function";) s = s();
            r = Fr(t, s, r, i)
        }), () => r;
        if (Array.isArray(e)) {
            const s = [],
                u = r && Array.isArray(r);
            if (to(s, e, r, n)) return ct(() => r = Fr(t, s, r, i, !0)), () => r;
            if ($t.context) {
                if (!s.length) return r;
                for (let h = 0; h < s.length; h++)
                    if (s[h].parentNode) return r = s
            }
            if (s.length === 0) {
                if (r = Dr(t, r, i), a) return r
            } else u ? r.length === 0 ? os(t, s, i) : Qc(t, r, s) : (r && Dr(t), os(t, s));
            r = s
        } else if (e instanceof Node) {
            if ($t.context && e.parentNode) return r = a ? [e] : e;
            if (Array.isArray(r)) {
                if (a) return r = Dr(t, r, i, e);
                Dr(t, r, null, e)
            } else r == null || r === "" || !t.firstChild ? t.appendChild(e) : t.replaceChild(e, t.firstChild);
            r = e
        }
    }
    return r
}

function to(t, e, r, i) {
    let n = !1;
    for (let o = 0, a = e.length; o < a; o++) {
        let s = e[o],
            u = r && r[o];
        if (s instanceof Node) t.push(s);
        else if (!(s == null || s === !0 || s === !1))
            if (Array.isArray(s)) n = to(t, s, u) || n;
            else if (typeof s == "function")
            if (i) {
                for (; typeof s == "function";) s = s();
                n = to(t, Array.isArray(s) ? s : [s], Array.isArray(u) ? u : [u]) || n
            } else t.push(s), n = !0;
        else {
            const h = String(s);
            u && u.nodeType === 3 && u.data === h ? t.push(u) : t.push(document.createTextNode(h))
        }
    }
    return n
}

function os(t, e, r = null) {
    for (let i = 0, n = e.length; i < n; i++) t.insertBefore(e[i], r)
}

function Dr(t, e, r, i) {
    if (r === void 0) return t.textContent = "";
    const n = i || document.createTextNode("");
    if (e.length) {
        let o = !1;
        for (let a = e.length - 1; a >= 0; a--) {
            const s = e[a];
            if (n !== s) {
                const u = s.parentNode === t;
                !o && !a ? u ? t.replaceChild(n, s) : t.insertBefore(n, r) : u && s.remove()
            } else o = !0
        }
    } else t.insertBefore(n, r);
    return [n]
}
const nu = !1,
    ou = "http://www.w3.org/2000/svg";

function su(t, e = !1) {
    return e ? document.createElementNS(ou, t) : document.createElement(t)
}

function au(t) {
    const {
        useShadow: e
    } = t, r = document.createTextNode(""), i = t.mount || document.body;

    function n() {
        if ($t.context) {
            const [o, a] = at(!1);
            return queueMicrotask(() => a(!0)), () => o() && t.children
        } else return () => t.children
    }
    if (i instanceof HTMLHeadElement) {
        const [o, a] = at(!1), s = () => a(!0);
        ri(u => nt(i, () => o() ? u() : n()(), null)), Ur(() => {
            $t.context ? queueMicrotask(s) : s()
        })
    } else {
        const o = su(t.isSVG ? "g" : "div", t.isSVG),
            a = e && o.attachShadow ? o.attachShadow({
                mode: "open"
            }) : o;
        Object.defineProperty(o, "host", {
            get() {
                return r.parentNode
            },
            configurable: !0
        }), nt(a, n()), i.appendChild(o), t.ref && t.ref(o), Ur(() => i.removeChild(o))
    }
    return r
}
const lu = "_primary_xd2n8_1",
    cu = "_secondary_xd2n8_6",
    uu = "_paper_xd2n8_11",
    hu = "_background_xd2n8_16",
    fu = "_padding_xd2n8_39",
    du = "_margin_xd2n8_43",
    pu = "_pixelated_xd2n8_53";
var ht = {
        primary: lu,
        secondary: cu,
        paper: uu,
        background: hu,
        "scale-hover": "_scale-hover_xd2n8_22",
        "content-box": "_content-box_xd2n8_30",
        "fit-content": "_fit-content_xd2n8_34",
        padding: fu,
        margin: du,
        "small-hide": "_small-hide_xd2n8_48",
        pixelated: pu,
        "long-text": "_long-text_xd2n8_57",
        "pointer-none": "_pointer-none_xd2n8_65",
        "pointer-auto": "_pointer-auto_xd2n8_69",
        "pointer-children": "_pointer-children_xd2n8_73",
        "disable-select": "_disable-select_xd2n8_80"
    },
    gu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {},
    $a = {
        exports: {}
    };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(t) {
    (function() {
        var e = {}.hasOwnProperty;

        function r() {
            for (var i = [], n = 0; n < arguments.length; n++) {
                var o = arguments[n];
                if (!!o) {
                    var a = typeof o;
                    if (a === "string" || a === "number") i.push(o);
                    else if (Array.isArray(o)) {
                        if (o.length) {
                            var s = r.apply(null, o);
                            s && i.push(s)
                        }
                    } else if (a === "object") {
                        if (o.toString !== Object.prototype.toString && !o.toString.toString().includes("[native code]")) {
                            i.push(o.toString());
                            continue
                        }
                        for (var u in o) e.call(o, u) && o[u] && i.push(u)
                    }
                }
            }
            return i.join(" ")
        }
        t.exports ? (r.default = r, t.exports = r) : window.classNames = r
    })()
})($a);
var K = $a.exports;
const vu = "_flex_16o3w_1",
    mu = "_row_16o3w_8",
    _u = "_reverse_16o3w_11",
    yu = "_center_16o3w_14",
    wu = "_top_16o3w_18",
    bu = "_right_16o3w_21",
    xu = "_bottom_16o3w_24",
    Eu = "_left_16o3w_27",
    Su = "_column_16o3w_30";
var Le = {
    flex: vu,
    row: mu,
    reverse: _u,
    center: yu,
    top: wu,
    right: bu,
    bottom: xu,
    left: Eu,
    column: Su
};
const ku = F("<div></div>"),
    j = t => {
        const [e, r] = lr(t, ["row", "reverse", "width", "height", "center", "right", "left", "top", "bottom"]);
        return (() => {
            const i = ku.cloneNode(!0);
            return pe(i, de(r, {
                get class() {
                    return K({
                        [Le.flex]: !0,
                        [Le.row]: e.row,
                        [Le.column]: !e.row,
                        [Le.reverse]: e.reverse,
                        [Le.center]: e.center,
                        [Le.right]: e.right,
                        [Le.left]: e.left,
                        [Le.top]: e.top,
                        [Le.bottom]: e.bottom,
                        ...r.class ? {
                            [r.class]: !0
                        } : {}
                    })
                },
                get style() {
                    return {
                        "max-width": e.width !== void 0 ? `${e.width}` : void 0,
                        "max-height": e.height !== void 0 ? `${e.height}` : void 0,
                        ...r.style
                    }
                }
            }), !1, !0), nt(i, () => r.children), i
        })()
    },
    Au = (t, e = .1) => {
        const r = Math.round(window.innerWidth * devicePixelRatio),
            i = Math.round(window.innerHeight * devicePixelRatio);
        return Math.abs(t.width - r) > e || Math.abs(t.height - i) > e ? (t.width = r, t.height = i, !0) : !1
    },
    Cu = t => t.length === 3,
    Tu = ({
        r: t,
        g: e,
        b: r
    }) => `#${((1<<24)+(t<<16)+(e<<8)+r).toString(16).slice(1)}`,
    xo = t => {
        const e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t)?.slice(1).map(r => parseInt(r, 16));
        if (!e || !Cu(e)) throw new Error(`Cannot convert color ${t} to rbg format.`);
        return {
            r: e[0],
            g: e[1],
            b: e[2]
        }
    },
    Pa = (t, e, {
        r,
        g: i,
        b: n
    }) => {
        t[e + 0] = r, t[e + 1] = i, t[e + 2] = n, t[e + 3] = 255
    },
    Du = (t, e) => ({
        r: t[e + 0],
        g: t[e + 1],
        b: t[e + 2]
    }),
    Iu = (t, e) => {
        const r = document.createElement("canvas");
        return r.width = t, r.height = e, r
    },
    er = (t, e) => {
        const r = t.getContext("2d", e);
        if (r === null) throw new Error("No context found on that canvas.");
        return r
    },
    $u = (t, e) => {
        const r = er(t, {
                willReadFrequently: !0
            }),
            {
                width: i,
                height: n
            } = t,
            o = r.getImageData(0, 0, i, n);
        return e.map(([a, s]) => ({
            index: [a, s],
            value: Du(o.data, (i * s + a) * 4)
        }))
    },
    Pu = (t, e) => {
        const r = er(t),
            {
                width: i,
                height: n
            } = t,
            o = r.getImageData(0, 0, i, n);
        e.forEach(({
            index: a,
            value: s
        }) => {
            const [u, h] = a;
            Pa(o.data, (i * h + u) * 4, s)
        }), r.putImageData(o, 0, 0)
    },
    Lu = t => {
        const e = document.createElement("canvas");
        e.width = t.width, e.height = t.height;
        const r = er(e);
        return r.drawImage(t, 0, 0, t.width, t.height), r.getImageData(0, 0, t.width, t.height)
    },
    Eo = t => it(() => t().map(xo)),
    ui = t => {
        if (t == null) throw new Error("Value is not specified.");
        return t
    };
var Ru = {
    "icon-button": "_icon-button_twptf_1"
};
const Ou = F("<button><div></div></button>"),
    Mu = t => (() => {
        const e = Ou.cloneNode(!0),
            r = e.firstChild;
        return pe(e, de(t, {
            get class() {
                return K(ht.background, ht["content-box"], ht.padding, Ru["icon-button"], t.class)
            }
        }), !1, !0), nt(r, () => t.children), ct(() => st(r, ht["scale-hover"])), e
    })();
var Qt = "top",
    he = "bottom",
    fe = "right",
    Kt = "left",
    So = "auto",
    xi = [Qt, he, fe, Kt],
    Hr = "start",
    hi = "end",
    Nu = "clippingParents",
    La = "viewport",
    Jr = "popper",
    Bu = "reference",
    ss = xi.reduce(function(t, e) {
        return t.concat([e + "-" + Hr, e + "-" + hi])
    }, []),
    Ra = [].concat(xi, [So]).reduce(function(t, e) {
        return t.concat([e, e + "-" + Hr, e + "-" + hi])
    }, []),
    Uu = "beforeRead",
    Fu = "read",
    Hu = "afterRead",
    Yu = "beforeMain",
    zu = "main",
    Xu = "afterMain",
    Vu = "beforeWrite",
    qu = "write",
    Wu = "afterWrite",
    Gu = [Uu, Fu, Hu, Yu, zu, Xu, Vu, qu, Wu];

function De(t) {
    return t ? (t.nodeName || "").toLowerCase() : null
}

function ge(t) {
    if (t == null) return window;
    if (t.toString() !== "[object Window]") {
        var e = t.ownerDocument;
        return e && e.defaultView || window
    }
    return t
}

function xr(t) {
    var e = ge(t).Element;
    return t instanceof e || t instanceof Element
}

function ue(t) {
    var e = ge(t).HTMLElement;
    return t instanceof e || t instanceof HTMLElement
}

function ko(t) {
    if (typeof ShadowRoot > "u") return !1;
    var e = ge(t).ShadowRoot;
    return t instanceof e || t instanceof ShadowRoot
}

function ju(t) {
    var e = t.state;
    Object.keys(e.elements).forEach(function(r) {
        var i = e.styles[r] || {},
            n = e.attributes[r] || {},
            o = e.elements[r];
        !ue(o) || !De(o) || (Object.assign(o.style, i), Object.keys(n).forEach(function(a) {
            var s = n[a];
            s === !1 ? o.removeAttribute(a) : o.setAttribute(a, s === !0 ? "" : s)
        }))
    })
}

function Zu(t) {
    var e = t.state,
        r = {
            popper: {
                position: e.options.strategy,
                left: "0",
                top: "0",
                margin: "0"
            },
            arrow: {
                position: "absolute"
            },
            reference: {}
        };
    return Object.assign(e.elements.popper.style, r.popper), e.styles = r, e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow),
        function() {
            Object.keys(e.elements).forEach(function(i) {
                var n = e.elements[i],
                    o = e.attributes[i] || {},
                    a = Object.keys(e.styles.hasOwnProperty(i) ? e.styles[i] : r[i]),
                    s = a.reduce(function(u, h) {
                        return u[h] = "", u
                    }, {});
                !ue(n) || !De(n) || (Object.assign(n.style, s), Object.keys(o).forEach(function(u) {
                    n.removeAttribute(u)
                }))
            })
        }
}
var Oa = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: ju,
    effect: Zu,
    requires: ["computeStyles"]
};

function Ce(t) {
    return t.split("-")[0]
}
var _r = Math.max,
    Ki = Math.min,
    Yr = Math.round;

function eo() {
    var t = navigator.userAgentData;
    return t != null && t.brands ? t.brands.map(function(e) {
        return e.brand + "/" + e.version
    }).join(" ") : navigator.userAgent
}

function Ma() {
    return !/^((?!chrome|android).)*safari/i.test(eo())
}

function zr(t, e, r) {
    e === void 0 && (e = !1), r === void 0 && (r = !1);
    var i = t.getBoundingClientRect(),
        n = 1,
        o = 1;
    e && ue(t) && (n = t.offsetWidth > 0 && Yr(i.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && Yr(i.height) / t.offsetHeight || 1);
    var a = xr(t) ? ge(t) : window,
        s = a.visualViewport,
        u = !Ma() && r,
        h = (i.left + (u && s ? s.offsetLeft : 0)) / n,
        f = (i.top + (u && s ? s.offsetTop : 0)) / o,
        v = i.width / n,
        S = i.height / o;
    return {
        width: v,
        height: S,
        top: f,
        right: h + v,
        bottom: f + S,
        left: h,
        x: h,
        y: f
    }
}

function Ao(t) {
    var e = zr(t),
        r = t.offsetWidth,
        i = t.offsetHeight;
    return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - i) <= 1 && (i = e.height), {
        x: t.offsetLeft,
        y: t.offsetTop,
        width: r,
        height: i
    }
}

function Na(t, e) {
    var r = e.getRootNode && e.getRootNode();
    if (t.contains(e)) return !0;
    if (r && ko(r)) {
        var i = e;
        do {
            if (i && t.isSameNode(i)) return !0;
            i = i.parentNode || i.host
        } while (i)
    }
    return !1
}

function Ne(t) {
    return ge(t).getComputedStyle(t)
}

function Qu(t) {
    return ["table", "td", "th"].indexOf(De(t)) >= 0
}

function ur(t) {
    return ((xr(t) ? t.ownerDocument : t.document) || window.document).documentElement
}

function vn(t) {
    return De(t) === "html" ? t : t.assignedSlot || t.parentNode || (ko(t) ? t.host : null) || ur(t)
}

function as(t) {
    return !ue(t) || Ne(t).position === "fixed" ? null : t.offsetParent
}

function Ku(t) {
    var e = /firefox/i.test(eo()),
        r = /Trident/i.test(eo());
    if (r && ue(t)) {
        var i = Ne(t);
        if (i.position === "fixed") return null
    }
    var n = vn(t);
    for (ko(n) && (n = n.host); ue(n) && ["html", "body"].indexOf(De(n)) < 0;) {
        var o = Ne(n);
        if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none") return n;
        n = n.parentNode
    }
    return null
}

function Ei(t) {
    for (var e = ge(t), r = as(t); r && Qu(r) && Ne(r).position === "static";) r = as(r);
    return r && (De(r) === "html" || De(r) === "body" && Ne(r).position === "static") ? e : r || Ku(t) || e
}

function Co(t) {
    return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
}

function ni(t, e, r) {
    return _r(t, Ki(e, r))
}

function Ju(t, e, r) {
    var i = ni(t, e, r);
    return i > r ? r : i
}

function Ba() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

function Ua(t) {
    return Object.assign({}, Ba(), t)
}

function Fa(t, e) {
    return e.reduce(function(r, i) {
        return r[i] = t, r
    }, {})
}
var th = function(e, r) {
    return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
        placement: r.placement
    })) : e, Ua(typeof e != "number" ? e : Fa(e, xi))
};

function eh(t) {
    var e, r = t.state,
        i = t.name,
        n = t.options,
        o = r.elements.arrow,
        a = r.modifiersData.popperOffsets,
        s = Ce(r.placement),
        u = Co(s),
        h = [Kt, fe].indexOf(s) >= 0,
        f = h ? "height" : "width";
    if (!(!o || !a)) {
        var v = th(n.padding, r),
            S = Ao(o),
            b = u === "y" ? Qt : Kt,
            D = u === "y" ? he : fe,
            _ = r.rects.reference[f] + r.rects.reference[u] - a[u] - r.rects.popper[f],
            y = a[u] - r.rects.reference[u],
            I = Ei(o),
            k = I ? u === "y" ? I.clientHeight || 0 : I.clientWidth || 0 : 0,
            L = _ / 2 - y / 2,
            p = v[b],
            O = k - S[f] - v[D],
            $ = k / 2 - S[f] / 2 + L,
            X = ni(p, $, O),
            N = u;
        r.modifiersData[i] = (e = {}, e[N] = X, e.centerOffset = X - $, e)
    }
}

function rh(t) {
    var e = t.state,
        r = t.options,
        i = r.element,
        n = i === void 0 ? "[data-popper-arrow]" : i;
    n != null && (typeof n == "string" && (n = e.elements.popper.querySelector(n), !n) || !Na(e.elements.popper, n) || (e.elements.arrow = n))
}
var ih = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: eh,
    effect: rh,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};

function Xr(t) {
    return t.split("-")[1]
}
var nh = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};

function oh(t) {
    var e = t.x,
        r = t.y,
        i = window,
        n = i.devicePixelRatio || 1;
    return {
        x: Yr(e * n) / n || 0,
        y: Yr(r * n) / n || 0
    }
}

function ls(t) {
    var e, r = t.popper,
        i = t.popperRect,
        n = t.placement,
        o = t.variation,
        a = t.offsets,
        s = t.position,
        u = t.gpuAcceleration,
        h = t.adaptive,
        f = t.roundOffsets,
        v = t.isFixed,
        S = a.x,
        b = S === void 0 ? 0 : S,
        D = a.y,
        _ = D === void 0 ? 0 : D,
        y = typeof f == "function" ? f({
            x: b,
            y: _
        }) : {
            x: b,
            y: _
        };
    b = y.x, _ = y.y;
    var I = a.hasOwnProperty("x"),
        k = a.hasOwnProperty("y"),
        L = Kt,
        p = Qt,
        O = window;
    if (h) {
        var $ = Ei(r),
            X = "clientHeight",
            N = "clientWidth";
        if ($ === ge(r) && ($ = ur(r), Ne($).position !== "static" && s === "absolute" && (X = "scrollHeight", N = "scrollWidth")), $ = $, n === Qt || (n === Kt || n === fe) && o === hi) {
            p = he;
            var M = v && $ === O && O.visualViewport ? O.visualViewport.height : $[X];
            _ -= M - i.height, _ *= u ? 1 : -1
        }
        if (n === Kt || (n === Qt || n === he) && o === hi) {
            L = fe;
            var A = v && $ === O && O.visualViewport ? O.visualViewport.width : $[N];
            b -= A - i.width, b *= u ? 1 : -1
        }
    }
    var x = Object.assign({
            position: s
        }, h && nh),
        E = f === !0 ? oh({
            x: b,
            y: _
        }) : {
            x: b,
            y: _
        };
    if (b = E.x, _ = E.y, u) {
        var m;
        return Object.assign({}, x, (m = {}, m[p] = k ? "0" : "", m[L] = I ? "0" : "", m.transform = (O.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + _ + "px)" : "translate3d(" + b + "px, " + _ + "px, 0)", m))
    }
    return Object.assign({}, x, (e = {}, e[p] = k ? _ + "px" : "", e[L] = I ? b + "px" : "", e.transform = "", e))
}

function sh(t) {
    var e = t.state,
        r = t.options,
        i = r.gpuAcceleration,
        n = i === void 0 ? !0 : i,
        o = r.adaptive,
        a = o === void 0 ? !0 : o,
        s = r.roundOffsets,
        u = s === void 0 ? !0 : s,
        h = {
            placement: Ce(e.placement),
            variation: Xr(e.placement),
            popper: e.elements.popper,
            popperRect: e.rects.popper,
            gpuAcceleration: n,
            isFixed: e.options.strategy === "fixed"
        };
    e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, ls(Object.assign({}, h, {
        offsets: e.modifiersData.popperOffsets,
        position: e.options.strategy,
        adaptive: a,
        roundOffsets: u
    })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, ls(Object.assign({}, h, {
        offsets: e.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: u
    })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
        "data-popper-placement": e.placement
    })
}
var ah = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: sh,
        data: {}
    },
    Pi = {
        passive: !0
    };

function lh(t) {
    var e = t.state,
        r = t.instance,
        i = t.options,
        n = i.scroll,
        o = n === void 0 ? !0 : n,
        a = i.resize,
        s = a === void 0 ? !0 : a,
        u = ge(e.elements.popper),
        h = [].concat(e.scrollParents.reference, e.scrollParents.popper);
    return o && h.forEach(function(f) {
            f.addEventListener("scroll", r.update, Pi)
        }), s && u.addEventListener("resize", r.update, Pi),
        function() {
            o && h.forEach(function(f) {
                f.removeEventListener("scroll", r.update, Pi)
            }), s && u.removeEventListener("resize", r.update, Pi)
        }
}
var ch = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: lh,
        data: {}
    },
    uh = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };

function Yi(t) {
    return t.replace(/left|right|bottom|top/g, function(e) {
        return uh[e]
    })
}
var hh = {
    start: "end",
    end: "start"
};

function cs(t) {
    return t.replace(/start|end/g, function(e) {
        return hh[e]
    })
}

function To(t) {
    var e = ge(t),
        r = e.pageXOffset,
        i = e.pageYOffset;
    return {
        scrollLeft: r,
        scrollTop: i
    }
}

function Do(t) {
    return zr(ur(t)).left + To(t).scrollLeft
}

function fh(t, e) {
    var r = ge(t),
        i = ur(t),
        n = r.visualViewport,
        o = i.clientWidth,
        a = i.clientHeight,
        s = 0,
        u = 0;
    if (n) {
        o = n.width, a = n.height;
        var h = Ma();
        (h || !h && e === "fixed") && (s = n.offsetLeft, u = n.offsetTop)
    }
    return {
        width: o,
        height: a,
        x: s + Do(t),
        y: u
    }
}

function dh(t) {
    var e, r = ur(t),
        i = To(t),
        n = (e = t.ownerDocument) == null ? void 0 : e.body,
        o = _r(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0),
        a = _r(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0),
        s = -i.scrollLeft + Do(t),
        u = -i.scrollTop;
    return Ne(n || r).direction === "rtl" && (s += _r(r.clientWidth, n ? n.clientWidth : 0) - o), {
        width: o,
        height: a,
        x: s,
        y: u
    }
}

function Io(t) {
    var e = Ne(t),
        r = e.overflow,
        i = e.overflowX,
        n = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(r + n + i)
}

function Ha(t) {
    return ["html", "body", "#document"].indexOf(De(t)) >= 0 ? t.ownerDocument.body : ue(t) && Io(t) ? t : Ha(vn(t))
}

function oi(t, e) {
    var r;
    e === void 0 && (e = []);
    var i = Ha(t),
        n = i === ((r = t.ownerDocument) == null ? void 0 : r.body),
        o = ge(i),
        a = n ? [o].concat(o.visualViewport || [], Io(i) ? i : []) : i,
        s = e.concat(a);
    return n ? s : s.concat(oi(vn(a)))
}

function ro(t) {
    return Object.assign({}, t, {
        left: t.x,
        top: t.y,
        right: t.x + t.width,
        bottom: t.y + t.height
    })
}

function ph(t, e) {
    var r = zr(t, !1, e === "fixed");
    return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r
}

function us(t, e, r) {
    return e === La ? ro(fh(t, r)) : xr(e) ? ph(e, r) : ro(dh(ur(t)))
}

function gh(t) {
    var e = oi(vn(t)),
        r = ["absolute", "fixed"].indexOf(Ne(t).position) >= 0,
        i = r && ue(t) ? Ei(t) : t;
    return xr(i) ? e.filter(function(n) {
        return xr(n) && Na(n, i) && De(n) !== "body"
    }) : []
}

function vh(t, e, r, i) {
    var n = e === "clippingParents" ? gh(t) : [].concat(e),
        o = [].concat(n, [r]),
        a = o[0],
        s = o.reduce(function(u, h) {
            var f = us(t, h, i);
            return u.top = _r(f.top, u.top), u.right = Ki(f.right, u.right), u.bottom = Ki(f.bottom, u.bottom), u.left = _r(f.left, u.left), u
        }, us(t, a, i));
    return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s
}

function Ya(t) {
    var e = t.reference,
        r = t.element,
        i = t.placement,
        n = i ? Ce(i) : null,
        o = i ? Xr(i) : null,
        a = e.x + e.width / 2 - r.width / 2,
        s = e.y + e.height / 2 - r.height / 2,
        u;
    switch (n) {
        case Qt:
            u = {
                x: a,
                y: e.y - r.height
            };
            break;
        case he:
            u = {
                x: a,
                y: e.y + e.height
            };
            break;
        case fe:
            u = {
                x: e.x + e.width,
                y: s
            };
            break;
        case Kt:
            u = {
                x: e.x - r.width,
                y: s
            };
            break;
        default:
            u = {
                x: e.x,
                y: e.y
            }
    }
    var h = n ? Co(n) : null;
    if (h != null) {
        var f = h === "y" ? "height" : "width";
        switch (o) {
            case Hr:
                u[h] = u[h] - (e[f] / 2 - r[f] / 2);
                break;
            case hi:
                u[h] = u[h] + (e[f] / 2 - r[f] / 2);
                break
        }
    }
    return u
}

function fi(t, e) {
    e === void 0 && (e = {});
    var r = e,
        i = r.placement,
        n = i === void 0 ? t.placement : i,
        o = r.strategy,
        a = o === void 0 ? t.strategy : o,
        s = r.boundary,
        u = s === void 0 ? Nu : s,
        h = r.rootBoundary,
        f = h === void 0 ? La : h,
        v = r.elementContext,
        S = v === void 0 ? Jr : v,
        b = r.altBoundary,
        D = b === void 0 ? !1 : b,
        _ = r.padding,
        y = _ === void 0 ? 0 : _,
        I = Ua(typeof y != "number" ? y : Fa(y, xi)),
        k = S === Jr ? Bu : Jr,
        L = t.rects.popper,
        p = t.elements[D ? k : S],
        O = vh(xr(p) ? p : p.contextElement || ur(t.elements.popper), u, f, a),
        $ = zr(t.elements.reference),
        X = Ya({
            reference: $,
            element: L,
            strategy: "absolute",
            placement: n
        }),
        N = ro(Object.assign({}, L, X)),
        M = S === Jr ? N : $,
        A = {
            top: O.top - M.top + I.top,
            bottom: M.bottom - O.bottom + I.bottom,
            left: O.left - M.left + I.left,
            right: M.right - O.right + I.right
        },
        x = t.modifiersData.offset;
    if (S === Jr && x) {
        var E = x[n];
        Object.keys(A).forEach(function(m) {
            var R = [fe, he].indexOf(m) >= 0 ? 1 : -1,
                H = [Qt, he].indexOf(m) >= 0 ? "y" : "x";
            A[m] += E[H] * R
        })
    }
    return A
}

function mh(t, e) {
    e === void 0 && (e = {});
    var r = e,
        i = r.placement,
        n = r.boundary,
        o = r.rootBoundary,
        a = r.padding,
        s = r.flipVariations,
        u = r.allowedAutoPlacements,
        h = u === void 0 ? Ra : u,
        f = Xr(i),
        v = f ? s ? ss : ss.filter(function(D) {
            return Xr(D) === f
        }) : xi,
        S = v.filter(function(D) {
            return h.indexOf(D) >= 0
        });
    S.length === 0 && (S = v);
    var b = S.reduce(function(D, _) {
        return D[_] = fi(t, {
            placement: _,
            boundary: n,
            rootBoundary: o,
            padding: a
        })[Ce(_)], D
    }, {});
    return Object.keys(b).sort(function(D, _) {
        return b[D] - b[_]
    })
}

function _h(t) {
    if (Ce(t) === So) return [];
    var e = Yi(t);
    return [cs(t), e, cs(e)]
}

function yh(t) {
    var e = t.state,
        r = t.options,
        i = t.name;
    if (!e.modifiersData[i]._skip) {
        for (var n = r.mainAxis, o = n === void 0 ? !0 : n, a = r.altAxis, s = a === void 0 ? !0 : a, u = r.fallbackPlacements, h = r.padding, f = r.boundary, v = r.rootBoundary, S = r.altBoundary, b = r.flipVariations, D = b === void 0 ? !0 : b, _ = r.allowedAutoPlacements, y = e.options.placement, I = Ce(y), k = I === y, L = u || (k || !D ? [Yi(y)] : _h(y)), p = [y].concat(L).reduce(function(ut, vt) {
                return ut.concat(Ce(vt) === So ? mh(e, {
                    placement: vt,
                    boundary: f,
                    rootBoundary: v,
                    padding: h,
                    flipVariations: D,
                    allowedAutoPlacements: _
                }) : vt)
            }, []), O = e.rects.reference, $ = e.rects.popper, X = new Map, N = !0, M = p[0], A = 0; A < p.length; A++) {
            var x = p[A],
                E = Ce(x),
                m = Xr(x) === Hr,
                R = [Qt, he].indexOf(E) >= 0,
                H = R ? "width" : "height",
                Y = fi(e, {
                    placement: x,
                    boundary: f,
                    rootBoundary: v,
                    altBoundary: S,
                    padding: h
                }),
                U = R ? m ? fe : Kt : m ? he : Qt;
            O[H] > $[H] && (U = Yi(U));
            var q = Yi(U),
                W = [];
            if (o && W.push(Y[E] <= 0), s && W.push(Y[U] <= 0, Y[q] <= 0), W.every(function(ut) {
                    return ut
                })) {
                M = x, N = !1;
                break
            }
            X.set(x, W)
        }
        if (N)
            for (var et = D ? 3 : 1, J = function(vt) {
                    var xt = p.find(function(At) {
                        var wt = X.get(At);
                        if (wt) return wt.slice(0, vt).every(function(St) {
                            return St
                        })
                    });
                    if (xt) return M = xt, "break"
                }, Z = et; Z > 0; Z--) {
                var pt = J(Z);
                if (pt === "break") break
            }
        e.placement !== M && (e.modifiersData[i]._skip = !0, e.placement = M, e.reset = !0)
    }
}
var wh = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: yh,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};

function hs(t, e, r) {
    return r === void 0 && (r = {
        x: 0,
        y: 0
    }), {
        top: t.top - e.height - r.y,
        right: t.right - e.width + r.x,
        bottom: t.bottom - e.height + r.y,
        left: t.left - e.width - r.x
    }
}

function fs(t) {
    return [Qt, fe, he, Kt].some(function(e) {
        return t[e] >= 0
    })
}

function bh(t) {
    var e = t.state,
        r = t.name,
        i = e.rects.reference,
        n = e.rects.popper,
        o = e.modifiersData.preventOverflow,
        a = fi(e, {
            elementContext: "reference"
        }),
        s = fi(e, {
            altBoundary: !0
        }),
        u = hs(a, i),
        h = hs(s, n, o),
        f = fs(u),
        v = fs(h);
    e.modifiersData[r] = {
        referenceClippingOffsets: u,
        popperEscapeOffsets: h,
        isReferenceHidden: f,
        hasPopperEscaped: v
    }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
        "data-popper-reference-hidden": f,
        "data-popper-escaped": v
    })
}
var xh = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: bh
};

function Eh(t, e, r) {
    var i = Ce(t),
        n = [Kt, Qt].indexOf(i) >= 0 ? -1 : 1,
        o = typeof r == "function" ? r(Object.assign({}, e, {
            placement: t
        })) : r,
        a = o[0],
        s = o[1];
    return a = a || 0, s = (s || 0) * n, [Kt, fe].indexOf(i) >= 0 ? {
        x: s,
        y: a
    } : {
        x: a,
        y: s
    }
}

function Sh(t) {
    var e = t.state,
        r = t.options,
        i = t.name,
        n = r.offset,
        o = n === void 0 ? [0, 0] : n,
        a = Ra.reduce(function(f, v) {
            return f[v] = Eh(v, e.rects, o), f
        }, {}),
        s = a[e.placement],
        u = s.x,
        h = s.y;
    e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += u, e.modifiersData.popperOffsets.y += h), e.modifiersData[i] = a
}
var kh = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: Sh
};

function Ah(t) {
    var e = t.state,
        r = t.name;
    e.modifiersData[r] = Ya({
        reference: e.rects.reference,
        element: e.rects.popper,
        strategy: "absolute",
        placement: e.placement
    })
}
var Ch = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: Ah,
    data: {}
};

function Th(t) {
    return t === "x" ? "y" : "x"
}

function Dh(t) {
    var e = t.state,
        r = t.options,
        i = t.name,
        n = r.mainAxis,
        o = n === void 0 ? !0 : n,
        a = r.altAxis,
        s = a === void 0 ? !1 : a,
        u = r.boundary,
        h = r.rootBoundary,
        f = r.altBoundary,
        v = r.padding,
        S = r.tether,
        b = S === void 0 ? !0 : S,
        D = r.tetherOffset,
        _ = D === void 0 ? 0 : D,
        y = fi(e, {
            boundary: u,
            rootBoundary: h,
            padding: v,
            altBoundary: f
        }),
        I = Ce(e.placement),
        k = Xr(e.placement),
        L = !k,
        p = Co(I),
        O = Th(p),
        $ = e.modifiersData.popperOffsets,
        X = e.rects.reference,
        N = e.rects.popper,
        M = typeof _ == "function" ? _(Object.assign({}, e.rects, {
            placement: e.placement
        })) : _,
        A = typeof M == "number" ? {
            mainAxis: M,
            altAxis: M
        } : Object.assign({
            mainAxis: 0,
            altAxis: 0
        }, M),
        x = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null,
        E = {
            x: 0,
            y: 0
        };
    if (!!$) {
        if (o) {
            var m, R = p === "y" ? Qt : Kt,
                H = p === "y" ? he : fe,
                Y = p === "y" ? "height" : "width",
                U = $[p],
                q = U + y[R],
                W = U - y[H],
                et = b ? -N[Y] / 2 : 0,
                J = k === Hr ? X[Y] : N[Y],
                Z = k === Hr ? -N[Y] : -X[Y],
                pt = e.elements.arrow,
                ut = b && pt ? Ao(pt) : {
                    width: 0,
                    height: 0
                },
                vt = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Ba(),
                xt = vt[R],
                At = vt[H],
                wt = ni(0, X[Y], ut[Y]),
                St = L ? X[Y] / 2 - et - wt - xt - A.mainAxis : J - wt - xt - A.mainAxis,
                Tt = L ? -X[Y] / 2 + et + wt + At + A.mainAxis : Z + wt + At + A.mainAxis,
                ie = e.elements.arrow && Ei(e.elements.arrow),
                me = ie ? p === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0,
                Zt = (m = x?.[p]) != null ? m : 0,
                ne = U + St - Zt - me,
                Xe = U + Tt - Zt,
                $e = ni(b ? Ki(q, ne) : q, U, b ? _r(W, Xe) : W);
            $[p] = $e, E[p] = $e - U
        }
        if (s) {
            var zt, Ve = p === "x" ? Qt : Kt,
                be = p === "x" ? he : fe,
                Lt = $[O],
                Xt = O === "y" ? "height" : "width",
                kt = Lt + y[Ve],
                Rt = Lt - y[be],
                Pe = [Qt, Kt].indexOf(I) !== -1,
                Vt = (zt = x?.[O]) != null ? zt : 0,
                qe = Pe ? kt : Lt - X[Xt] - N[Xt] - Vt + A.altAxis,
                d = Pe ? Lt + X[Xt] + N[Xt] - Vt - A.altAxis : Rt,
                l = b && Pe ? Ju(qe, Lt, d) : ni(b ? qe : kt, Lt, b ? d : Rt);
            $[O] = l, E[O] = l - Lt
        }
        e.modifiersData[i] = E
    }
}
var Ih = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: Dh,
    requiresIfExists: ["offset"]
};

function $h(t) {
    return {
        scrollLeft: t.scrollLeft,
        scrollTop: t.scrollTop
    }
}

function Ph(t) {
    return t === ge(t) || !ue(t) ? To(t) : $h(t)
}

function Lh(t) {
    var e = t.getBoundingClientRect(),
        r = Yr(e.width) / t.offsetWidth || 1,
        i = Yr(e.height) / t.offsetHeight || 1;
    return r !== 1 || i !== 1
}

function Rh(t, e, r) {
    r === void 0 && (r = !1);
    var i = ue(e),
        n = ue(e) && Lh(e),
        o = ur(e),
        a = zr(t, n, r),
        s = {
            scrollLeft: 0,
            scrollTop: 0
        },
        u = {
            x: 0,
            y: 0
        };
    return (i || !i && !r) && ((De(e) !== "body" || Io(o)) && (s = Ph(e)), ue(e) ? (u = zr(e, !0), u.x += e.clientLeft, u.y += e.clientTop) : o && (u.x = Do(o))), {
        x: a.left + s.scrollLeft - u.x,
        y: a.top + s.scrollTop - u.y,
        width: a.width,
        height: a.height
    }
}

function Oh(t) {
    var e = new Map,
        r = new Set,
        i = [];
    t.forEach(function(o) {
        e.set(o.name, o)
    });

    function n(o) {
        r.add(o.name);
        var a = [].concat(o.requires || [], o.requiresIfExists || []);
        a.forEach(function(s) {
            if (!r.has(s)) {
                var u = e.get(s);
                u && n(u)
            }
        }), i.push(o)
    }
    return t.forEach(function(o) {
        r.has(o.name) || n(o)
    }), i
}

function Mh(t) {
    var e = Oh(t);
    return Gu.reduce(function(r, i) {
        return r.concat(e.filter(function(n) {
            return n.phase === i
        }))
    }, [])
}

function Nh(t) {
    var e;
    return function() {
        return e || (e = new Promise(function(r) {
            Promise.resolve().then(function() {
                e = void 0, r(t())
            })
        })), e
    }
}

function Bh(t) {
    var e = t.reduce(function(r, i) {
        var n = r[i.name];
        return r[i.name] = n ? Object.assign({}, n, i, {
            options: Object.assign({}, n.options, i.options),
            data: Object.assign({}, n.data, i.data)
        }) : i, r
    }, {});
    return Object.keys(e).map(function(r) {
        return e[r]
    })
}
var ds = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};

function ps() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
    return !e.some(function(i) {
        return !(i && typeof i.getBoundingClientRect == "function")
    })
}

function Uh(t) {
    t === void 0 && (t = {});
    var e = t,
        r = e.defaultModifiers,
        i = r === void 0 ? [] : r,
        n = e.defaultOptions,
        o = n === void 0 ? ds : n;
    return function(s, u, h) {
        h === void 0 && (h = o);
        var f = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, ds, o),
                modifiersData: {},
                elements: {
                    reference: s,
                    popper: u
                },
                attributes: {},
                styles: {}
            },
            v = [],
            S = !1,
            b = {
                state: f,
                setOptions: function(I) {
                    var k = typeof I == "function" ? I(f.options) : I;
                    _(), f.options = Object.assign({}, o, f.options, k), f.scrollParents = {
                        reference: xr(s) ? oi(s) : s.contextElement ? oi(s.contextElement) : [],
                        popper: oi(u)
                    };
                    var L = Mh(Bh([].concat(i, f.options.modifiers)));
                    return f.orderedModifiers = L.filter(function(p) {
                        return p.enabled
                    }), D(), b.update()
                },
                forceUpdate: function() {
                    if (!S) {
                        var I = f.elements,
                            k = I.reference,
                            L = I.popper;
                        if (!!ps(k, L)) {
                            f.rects = {
                                reference: Rh(k, Ei(L), f.options.strategy === "fixed"),
                                popper: Ao(L)
                            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(A) {
                                return f.modifiersData[A.name] = Object.assign({}, A.data)
                            });
                            for (var p = 0; p < f.orderedModifiers.length; p++) {
                                if (f.reset === !0) {
                                    f.reset = !1, p = -1;
                                    continue
                                }
                                var O = f.orderedModifiers[p],
                                    $ = O.fn,
                                    X = O.options,
                                    N = X === void 0 ? {} : X,
                                    M = O.name;
                                typeof $ == "function" && (f = $({
                                    state: f,
                                    options: N,
                                    name: M,
                                    instance: b
                                }) || f)
                            }
                        }
                    }
                },
                update: Nh(function() {
                    return new Promise(function(y) {
                        b.forceUpdate(), y(f)
                    })
                }),
                destroy: function() {
                    _(), S = !0
                }
            };
        if (!ps(s, u)) return b;
        b.setOptions(h).then(function(y) {
            !S && h.onFirstUpdate && h.onFirstUpdate(y)
        });

        function D() {
            f.orderedModifiers.forEach(function(y) {
                var I = y.name,
                    k = y.options,
                    L = k === void 0 ? {} : k,
                    p = y.effect;
                if (typeof p == "function") {
                    var O = p({
                            state: f,
                            name: I,
                            instance: b,
                            options: L
                        }),
                        $ = function() {};
                    v.push(O || $)
                }
            })
        }

        function _() {
            v.forEach(function(y) {
                return y()
            }), v = []
        }
        return b
    }
}
var Fh = [ch, Ch, ah, Oa, kh, wh, Ih, ih, xh],
    Hh = Uh({
        defaultModifiers: Fh
    }),
    Yh = "tippy-box",
    za = "tippy-content",
    zh = "tippy-backdrop",
    Xa = "tippy-arrow",
    Va = "tippy-svg-arrow",
    vr = {
        passive: !0,
        capture: !0
    },
    qa = function() {
        return document.body
    };

function Un(t, e, r) {
    if (Array.isArray(t)) {
        var i = t[e];
        return i ?? (Array.isArray(r) ? r[e] : r)
    }
    return t
}

function $o(t, e) {
    var r = {}.toString.call(t);
    return r.indexOf("[object") === 0 && r.indexOf(e + "]") > -1
}

function Wa(t, e) {
    return typeof t == "function" ? t.apply(void 0, e) : t
}

function gs(t, e) {
    if (e === 0) return t;
    var r;
    return function(i) {
        clearTimeout(r), r = setTimeout(function() {
            t(i)
        }, e)
    }
}

function Xh(t) {
    return t.split(/\s+/).filter(Boolean)
}

function Lr(t) {
    return [].concat(t)
}

function vs(t, e) {
    t.indexOf(e) === -1 && t.push(e)
}

function Vh(t) {
    return t.filter(function(e, r) {
        return t.indexOf(e) === r
    })
}

function qh(t) {
    return t.split("-")[0]
}

function Ji(t) {
    return [].slice.call(t)
}

function ms(t) {
    return Object.keys(t).reduce(function(e, r) {
        return t[r] !== void 0 && (e[r] = t[r]), e
    }, {})
}

function si() {
    return document.createElement("div")
}

function mn(t) {
    return ["Element", "Fragment"].some(function(e) {
        return $o(t, e)
    })
}

function Wh(t) {
    return $o(t, "NodeList")
}

function Gh(t) {
    return $o(t, "MouseEvent")
}

function jh(t) {
    return !!(t && t._tippy && t._tippy.reference === t)
}

function Zh(t) {
    return mn(t) ? [t] : Wh(t) ? Ji(t) : Array.isArray(t) ? t : Ji(document.querySelectorAll(t))
}

function Fn(t, e) {
    t.forEach(function(r) {
        r && (r.style.transitionDuration = e + "ms")
    })
}

function _s(t, e) {
    t.forEach(function(r) {
        r && r.setAttribute("data-state", e)
    })
}

function Qh(t) {
    var e, r = Lr(t),
        i = r[0];
    return i != null && (e = i.ownerDocument) != null && e.body ? i.ownerDocument : document
}

function Kh(t, e) {
    var r = e.clientX,
        i = e.clientY;
    return t.every(function(n) {
        var o = n.popperRect,
            a = n.popperState,
            s = n.props,
            u = s.interactiveBorder,
            h = qh(a.placement),
            f = a.modifiersData.offset;
        if (!f) return !0;
        var v = h === "bottom" ? f.top.y : 0,
            S = h === "top" ? f.bottom.y : 0,
            b = h === "right" ? f.left.x : 0,
            D = h === "left" ? f.right.x : 0,
            _ = o.top - i + v > u,
            y = i - o.bottom - S > u,
            I = o.left - r + b > u,
            k = r - o.right - D > u;
        return _ || y || I || k
    })
}

function Hn(t, e, r) {
    var i = e + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function(n) {
        t[i](n, r)
    })
}

function ys(t, e) {
    for (var r = e; r;) {
        var i;
        if (t.contains(r)) return !0;
        r = r.getRootNode == null || (i = r.getRootNode()) == null ? void 0 : i.host
    }
    return !1
}
var Ee = {
        isTouch: !1
    },
    ws = 0;

function Jh() {
    Ee.isTouch || (Ee.isTouch = !0, window.performance && document.addEventListener("mousemove", Ga))
}

function Ga() {
    var t = performance.now();
    t - ws < 20 && (Ee.isTouch = !1, document.removeEventListener("mousemove", Ga)), ws = t
}

function tf() {
    var t = document.activeElement;
    if (jh(t)) {
        var e = t._tippy;
        t.blur && !e.state.isVisible && t.blur()
    }
}

function ef() {
    document.addEventListener("touchstart", Jh, vr), window.addEventListener("blur", tf)
}
var rf = typeof window < "u" && typeof document < "u",
    nf = rf ? !!window.msCrypto : !1,
    of = {
        animateFill: !1,
        followCursor: !1,
        inlinePositioning: !1,
        sticky: !1
    },
    sf = {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999
    },
    ye = Object.assign({
        appendTo: qa,
        aria: {
            content: "auto",
            expanded: "auto"
        },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function() {},
        onBeforeUpdate: function() {},
        onCreate: function() {},
        onDestroy: function() {},
        onHidden: function() {},
        onHide: function() {},
        onMount: function() {},
        onShow: function() {},
        onShown: function() {},
        onTrigger: function() {},
        onUntrigger: function() {},
        onClickOutside: function() {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null
    }, of, sf),
    af = Object.keys(ye),
    lf = function(e) {
        var r = Object.keys(e);
        r.forEach(function(i) {
            ye[i] = e[i]
        })
    };

function ja(t) {
    var e = t.plugins || [],
        r = e.reduce(function(i, n) {
            var o = n.name,
                a = n.defaultValue;
            if (o) {
                var s;
                i[o] = t[o] !== void 0 ? t[o] : (s = ye[o]) != null ? s : a
            }
            return i
        }, {});
    return Object.assign({}, t, r)
}

function cf(t, e) {
    var r = e ? Object.keys(ja(Object.assign({}, ye, {
            plugins: e
        }))) : af,
        i = r.reduce(function(n, o) {
            var a = (t.getAttribute("data-tippy-" + o) || "").trim();
            if (!a) return n;
            if (o === "content") n[o] = a;
            else try {
                n[o] = JSON.parse(a)
            } catch {
                n[o] = a
            }
            return n
        }, {});
    return i
}

function bs(t, e) {
    var r = Object.assign({}, e, {
        content: Wa(e.content, [t])
    }, e.ignoreAttributes ? {} : cf(t, e.plugins));
    return r.aria = Object.assign({}, ye.aria, r.aria), r.aria = {
        expanded: r.aria.expanded === "auto" ? e.interactive : r.aria.expanded,
        content: r.aria.content === "auto" ? e.interactive ? null : "describedby" : r.aria.content
    }, r
}
var uf = function() {
    return "innerHTML"
};

function io(t, e) {
    t[uf()] = e
}

function xs(t) {
    var e = si();
    return t === !0 ? e.className = Xa : (e.className = Va, mn(t) ? e.appendChild(t) : io(e, t)), e
}

function Es(t, e) {
    mn(e.content) ? (io(t, ""), t.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? io(t, e.content) : t.textContent = e.content)
}

function no(t) {
    var e = t.firstElementChild,
        r = Ji(e.children);
    return {
        box: e,
        content: r.find(function(i) {
            return i.classList.contains(za)
        }),
        arrow: r.find(function(i) {
            return i.classList.contains(Xa) || i.classList.contains(Va)
        }),
        backdrop: r.find(function(i) {
            return i.classList.contains(zh)
        })
    }
}

function Za(t) {
    var e = si(),
        r = si();
    r.className = Yh, r.setAttribute("data-state", "hidden"), r.setAttribute("tabindex", "-1");
    var i = si();
    i.className = za, i.setAttribute("data-state", "hidden"), Es(i, t.props), e.appendChild(r), r.appendChild(i), n(t.props, t.props);

    function n(o, a) {
        var s = no(e),
            u = s.box,
            h = s.content,
            f = s.arrow;
        a.theme ? u.setAttribute("data-theme", a.theme) : u.removeAttribute("data-theme"), typeof a.animation == "string" ? u.setAttribute("data-animation", a.animation) : u.removeAttribute("data-animation"), a.inertia ? u.setAttribute("data-inertia", "") : u.removeAttribute("data-inertia"), u.style.maxWidth = typeof a.maxWidth == "number" ? a.maxWidth + "px" : a.maxWidth, a.role ? u.setAttribute("role", a.role) : u.removeAttribute("role"), (o.content !== a.content || o.allowHTML !== a.allowHTML) && Es(h, t.props), a.arrow ? f ? o.arrow !== a.arrow && (u.removeChild(f), u.appendChild(xs(a.arrow))) : u.appendChild(xs(a.arrow)) : f && u.removeChild(f)
    }
    return {
        popper: e,
        onUpdate: n
    }
}
Za.$$tippy = !0;
var hf = 1,
    Li = [],
    Yn = [];

function ff(t, e) {
    var r = bs(t, Object.assign({}, ye, ja(ms(e)))),
        i, n, o, a = !1,
        s = !1,
        u = !1,
        h = !1,
        f, v, S, b = [],
        D = gs(ne, r.interactiveDebounce),
        _, y = hf++,
        I = null,
        k = Vh(r.plugins),
        L = {
            isEnabled: !0,
            isVisible: !1,
            isDestroyed: !1,
            isMounted: !1,
            isShown: !1
        },
        p = {
            id: y,
            reference: t,
            popper: si(),
            popperInstance: I,
            props: r,
            state: L,
            plugins: k,
            clearDelayTimeouts: qe,
            setProps: d,
            setContent: l,
            show: c,
            hide: g,
            hideWithInteractivity: C,
            enable: Pe,
            disable: Vt,
            unmount: P,
            destroy: B
        };
    if (!r.render) return p;
    var O = r.render(p),
        $ = O.popper,
        X = O.onUpdate;
    $.setAttribute("data-tippy-root", ""), $.id = "tippy-" + p.id, p.popper = $, t._tippy = p, $._tippy = p;
    var N = k.map(function(T) {
            return T.fn(p)
        }),
        M = t.hasAttribute("aria-expanded");
    return ie(), et(), U(), q("onCreate", [p]), r.showOnCreate && kt(), $.addEventListener("mouseenter", function() {
        p.props.interactive && p.state.isVisible && p.clearDelayTimeouts()
    }), $.addEventListener("mouseleave", function() {
        p.props.interactive && p.props.trigger.indexOf("mouseenter") >= 0 && R().addEventListener("mousemove", D)
    }), p;

    function A() {
        var T = p.props.touch;
        return Array.isArray(T) ? T : [T, 0]
    }

    function x() {
        return A()[0] === "hold"
    }

    function E() {
        var T;
        return !!((T = p.props.render) != null && T.$$tippy)
    }

    function m() {
        return _ || t
    }

    function R() {
        var T = m().parentNode;
        return T ? Qh(T) : document
    }

    function H() {
        return no($)
    }

    function Y(T) {
        return p.state.isMounted && !p.state.isVisible || Ee.isTouch || f && f.type === "focus" ? 0 : Un(p.props.delay, T ? 0 : 1, ye.delay)
    }

    function U(T) {
        T === void 0 && (T = !1), $.style.pointerEvents = p.props.interactive && !T ? "" : "none", $.style.zIndex = "" + p.props.zIndex
    }

    function q(T, V, G) {
        if (G === void 0 && (G = !0), N.forEach(function(Q) {
                Q[T] && Q[T].apply(Q, V)
            }), G) {
            var tt;
            (tt = p.props)[T].apply(tt, V)
        }
    }

    function W() {
        var T = p.props.aria;
        if (!!T.content) {
            var V = "aria-" + T.content,
                G = $.id,
                tt = Lr(p.props.triggerTarget || t);
            tt.forEach(function(Q) {
                var qt = Q.getAttribute(V);
                if (p.state.isVisible) Q.setAttribute(V, qt ? qt + " " + G : G);
                else {
                    var oe = qt && qt.replace(G, "").trim();
                    oe ? Q.setAttribute(V, oe) : Q.removeAttribute(V)
                }
            })
        }
    }

    function et() {
        if (!(M || !p.props.aria.expanded)) {
            var T = Lr(p.props.triggerTarget || t);
            T.forEach(function(V) {
                p.props.interactive ? V.setAttribute("aria-expanded", p.state.isVisible && V === m() ? "true" : "false") : V.removeAttribute("aria-expanded")
            })
        }
    }

    function J() {
        R().removeEventListener("mousemove", D), Li = Li.filter(function(T) {
            return T !== D
        })
    }

    function Z(T) {
        if (!(Ee.isTouch && (u || T.type === "mousedown"))) {
            var V = T.composedPath && T.composedPath()[0] || T.target;
            if (!(p.props.interactive && ys($, V))) {
                if (Lr(p.props.triggerTarget || t).some(function(G) {
                        return ys(G, V)
                    })) {
                    if (Ee.isTouch || p.state.isVisible && p.props.trigger.indexOf("click") >= 0) return
                } else q("onClickOutside", [p, T]);
                p.props.hideOnClick === !0 && (p.clearDelayTimeouts(), p.hide(), s = !0, setTimeout(function() {
                    s = !1
                }), p.state.isMounted || xt())
            }
        }
    }

    function pt() {
        u = !0
    }

    function ut() {
        u = !1
    }

    function vt() {
        var T = R();
        T.addEventListener("mousedown", Z, !0), T.addEventListener("touchend", Z, vr), T.addEventListener("touchstart", ut, vr), T.addEventListener("touchmove", pt, vr)
    }

    function xt() {
        var T = R();
        T.removeEventListener("mousedown", Z, !0), T.removeEventListener("touchend", Z, vr), T.removeEventListener("touchstart", ut, vr), T.removeEventListener("touchmove", pt, vr)
    }

    function At(T, V) {
        St(T, function() {
            !p.state.isVisible && $.parentNode && $.parentNode.contains($) && V()
        })
    }

    function wt(T, V) {
        St(T, V)
    }

    function St(T, V) {
        var G = H().box;

        function tt(Q) {
            Q.target === G && (Hn(G, "remove", tt), V())
        }
        if (T === 0) return V();
        Hn(G, "remove", v), Hn(G, "add", tt), v = tt
    }

    function Tt(T, V, G) {
        G === void 0 && (G = !1);
        var tt = Lr(p.props.triggerTarget || t);
        tt.forEach(function(Q) {
            Q.addEventListener(T, V, G), b.push({
                node: Q,
                eventType: T,
                handler: V,
                options: G
            })
        })
    }

    function ie() {
        x() && (Tt("touchstart", Zt, {
            passive: !0
        }), Tt("touchend", Xe, {
            passive: !0
        })), Xh(p.props.trigger).forEach(function(T) {
            if (T !== "manual") switch (Tt(T, Zt), T) {
                case "mouseenter":
                    Tt("mouseleave", Xe);
                    break;
                case "focus":
                    Tt(nf ? "focusout" : "blur", $e);
                    break;
                case "focusin":
                    Tt("focusout", $e);
                    break
            }
        })
    }

    function me() {
        b.forEach(function(T) {
            var V = T.node,
                G = T.eventType,
                tt = T.handler,
                Q = T.options;
            V.removeEventListener(G, tt, Q)
        }), b = []
    }

    function Zt(T) {
        var V, G = !1;
        if (!(!p.state.isEnabled || zt(T) || s)) {
            var tt = ((V = f) == null ? void 0 : V.type) === "focus";
            f = T, _ = T.currentTarget, et(), !p.state.isVisible && Gh(T) && Li.forEach(function(Q) {
                return Q(T)
            }), T.type === "click" && (p.props.trigger.indexOf("mouseenter") < 0 || a) && p.props.hideOnClick !== !1 && p.state.isVisible ? G = !0 : kt(T), T.type === "click" && (a = !G), G && !tt && Rt(T)
        }
    }

    function ne(T) {
        var V = T.target,
            G = m().contains(V) || $.contains(V);
        if (!(T.type === "mousemove" && G)) {
            var tt = Xt().concat($).map(function(Q) {
                var qt, oe = Q._tippy,
                    Cr = (qt = oe.popperInstance) == null ? void 0 : qt.state;
                return Cr ? {
                    popperRect: Q.getBoundingClientRect(),
                    popperState: Cr,
                    props: r
                } : null
            }).filter(Boolean);
            Kh(tt, T) && (J(), Rt(T))
        }
    }

    function Xe(T) {
        var V = zt(T) || p.props.trigger.indexOf("click") >= 0 && a;
        if (!V) {
            if (p.props.interactive) {
                p.hideWithInteractivity(T);
                return
            }
            Rt(T)
        }
    }

    function $e(T) {
        p.props.trigger.indexOf("focusin") < 0 && T.target !== m() || p.props.interactive && T.relatedTarget && $.contains(T.relatedTarget) || Rt(T)
    }

    function zt(T) {
        return Ee.isTouch ? x() !== T.type.indexOf("touch") >= 0 : !1
    }

    function Ve() {
        be();
        var T = p.props,
            V = T.popperOptions,
            G = T.placement,
            tt = T.offset,
            Q = T.getReferenceClientRect,
            qt = T.moveTransition,
            oe = E() ? no($).arrow : null,
            Cr = Q ? {
                getBoundingClientRect: Q,
                contextElement: Q.contextElement || m()
            } : t,
            Jo = {
                name: "$$tippy",
                enabled: !0,
                phase: "beforeWrite",
                requires: ["computeStyles"],
                fn: function(Di) {
                    var Tr = Di.state;
                    if (E()) {
                        var Rc = H(),
                            Mn = Rc.box;
                        ["placement", "reference-hidden", "escaped"].forEach(function(Ii) {
                            Ii === "placement" ? Mn.setAttribute("data-placement", Tr.placement) : Tr.attributes.popper["data-popper-" + Ii] ? Mn.setAttribute("data-" + Ii, "") : Mn.removeAttribute("data-" + Ii)
                        }), Tr.attributes.popper = {}
                    }
                }
            },
            dr = [{
                name: "offset",
                options: {
                    offset: tt
                }
            }, {
                name: "preventOverflow",
                options: {
                    padding: {
                        top: 2,
                        bottom: 2,
                        left: 5,
                        right: 5
                    }
                }
            }, {
                name: "flip",
                options: {
                    padding: 5
                }
            }, {
                name: "computeStyles",
                options: {
                    adaptive: !qt
                }
            }, Jo];
        E() && oe && dr.push({
            name: "arrow",
            options: {
                element: oe,
                padding: 3
            }
        }), dr.push.apply(dr, V?.modifiers || []), p.popperInstance = Hh(Cr, $, Object.assign({}, V, {
            placement: G,
            onFirstUpdate: S,
            modifiers: dr
        }))
    }

    function be() {
        p.popperInstance && (p.popperInstance.destroy(), p.popperInstance = null)
    }

    function Lt() {
        var T = p.props.appendTo,
            V, G = m();
        p.props.interactive && T === qa || T === "parent" ? V = G.parentNode : V = Wa(T, [G]), V.contains($) || V.appendChild($), p.state.isMounted = !0, Ve()
    }

    function Xt() {
        return Ji($.querySelectorAll("[data-tippy-root]"))
    }

    function kt(T) {
        p.clearDelayTimeouts(), T && q("onTrigger", [p, T]), vt();
        var V = Y(!0),
            G = A(),
            tt = G[0],
            Q = G[1];
        Ee.isTouch && tt === "hold" && Q && (V = Q), V ? i = setTimeout(function() {
            p.show()
        }, V) : p.show()
    }

    function Rt(T) {
        if (p.clearDelayTimeouts(), q("onUntrigger", [p, T]), !p.state.isVisible) {
            xt();
            return
        }
        if (!(p.props.trigger.indexOf("mouseenter") >= 0 && p.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(T.type) >= 0 && a)) {
            var V = Y(!1);
            V ? n = setTimeout(function() {
                p.state.isVisible && p.hide()
            }, V) : o = requestAnimationFrame(function() {
                p.hide()
            })
        }
    }

    function Pe() {
        p.state.isEnabled = !0
    }

    function Vt() {
        p.hide(), p.state.isEnabled = !1
    }

    function qe() {
        clearTimeout(i), clearTimeout(n), cancelAnimationFrame(o)
    }

    function d(T) {
        if (!p.state.isDestroyed) {
            q("onBeforeUpdate", [p, T]), me();
            var V = p.props,
                G = bs(t, Object.assign({}, V, ms(T), {
                    ignoreAttributes: !0
                }));
            p.props = G, ie(), V.interactiveDebounce !== G.interactiveDebounce && (J(), D = gs(ne, G.interactiveDebounce)), V.triggerTarget && !G.triggerTarget ? Lr(V.triggerTarget).forEach(function(tt) {
                tt.removeAttribute("aria-expanded")
            }) : G.triggerTarget && t.removeAttribute("aria-expanded"), et(), U(), X && X(V, G), p.popperInstance && (Ve(), Xt().forEach(function(tt) {
                requestAnimationFrame(tt._tippy.popperInstance.forceUpdate)
            })), q("onAfterUpdate", [p, T])
        }
    }

    function l(T) {
        p.setProps({
            content: T
        })
    }

    function c() {
        var T = p.state.isVisible,
            V = p.state.isDestroyed,
            G = !p.state.isEnabled,
            tt = Ee.isTouch && !p.props.touch,
            Q = Un(p.props.duration, 0, ye.duration);
        if (!(T || V || G || tt) && !m().hasAttribute("disabled") && (q("onShow", [p], !1), p.props.onShow(p) !== !1)) {
            if (p.state.isVisible = !0, E() && ($.style.visibility = "visible"), U(), vt(), p.state.isMounted || ($.style.transition = "none"), E()) {
                var qt = H(),
                    oe = qt.box,
                    Cr = qt.content;
                Fn([oe, Cr], 0)
            }
            S = function() {
                var dr;
                if (!(!p.state.isVisible || h)) {
                    if (h = !0, $.offsetHeight, $.style.transition = p.props.moveTransition, E() && p.props.animation) {
                        var On = H(),
                            Di = On.box,
                            Tr = On.content;
                        Fn([Di, Tr], Q), _s([Di, Tr], "visible")
                    }
                    W(), et(), vs(Yn, p), (dr = p.popperInstance) == null || dr.forceUpdate(), q("onMount", [p]), p.props.animation && E() && wt(Q, function() {
                        p.state.isShown = !0, q("onShown", [p])
                    })
                }
            }, Lt()
        }
    }

    function g() {
        var T = !p.state.isVisible,
            V = p.state.isDestroyed,
            G = !p.state.isEnabled,
            tt = Un(p.props.duration, 1, ye.duration);
        if (!(T || V || G) && (q("onHide", [p], !1), p.props.onHide(p) !== !1)) {
            if (p.state.isVisible = !1, p.state.isShown = !1, h = !1, a = !1, E() && ($.style.visibility = "hidden"), J(), xt(), U(!0), E()) {
                var Q = H(),
                    qt = Q.box,
                    oe = Q.content;
                p.props.animation && (Fn([qt, oe], tt), _s([qt, oe], "hidden"))
            }
            W(), et(), p.props.animation ? E() && At(tt, p.unmount) : p.unmount()
        }
    }

    function C(T) {
        R().addEventListener("mousemove", D), vs(Li, D), D(T)
    }

    function P() {
        p.state.isVisible && p.hide(), p.state.isMounted && (be(), Xt().forEach(function(T) {
            T._tippy.unmount()
        }), $.parentNode && $.parentNode.removeChild($), Yn = Yn.filter(function(T) {
            return T !== p
        }), p.state.isMounted = !1, q("onHidden", [p]))
    }

    function B() {
        p.state.isDestroyed || (p.clearDelayTimeouts(), p.unmount(), me(), delete t._tippy, p.state.isDestroyed = !0, q("onDestroy", [p]))
    }
}

function Si(t, e) {
    e === void 0 && (e = {});
    var r = ye.plugins.concat(e.plugins || []);
    ef();
    var i = Object.assign({}, e, {
            plugins: r
        }),
        n = Zh(t),
        o = n.reduce(function(a, s) {
            var u = s && ff(s, i);
            return u && a.push(u), a
        }, []);
    return mn(t) ? o[0] : o
}
Si.defaultProps = ye;
Si.setDefaultProps = lf;
Si.currentInput = Ee;
Object.assign({}, Oa, {
    effect: function(e) {
        var r = e.state,
            i = {
                popper: {
                    position: r.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {}
            };
        Object.assign(r.elements.popper.style, i.popper), r.styles = i, r.elements.arrow && Object.assign(r.elements.arrow.style, i.arrow)
    }
});
Si.setDefaultProps({
    render: Za
});
var df = Object.defineProperty,
    Ss = Object.getOwnPropertySymbols,
    pf = Object.prototype.hasOwnProperty,
    gf = Object.prototype.propertyIsEnumerable,
    ks = (t, e, r) => e in t ? df(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : t[e] = r,
    vf = (t, e) => {
        for (var r in e || (e = {})) pf.call(e, r) && ks(t, r, e[r]);
        if (Ss)
            for (var r of Ss(e)) gf.call(e, r) && ks(t, r, e[r]);
        return t
    };

function mf(t, e) {
    let [r, i] = at();
    return gt(() => {
        let n = t();
        if (n) {
            let o = Si(n, te(() => e?.props));
            i(o), ii(() => {
                e != null && e.disabled ? o.disable() : o.enable()
            }), ii(() => {
                e != null && e.hidden ? o.hide() : o.show()
            }), ii(() => {
                var a;
                o.setProps(vf({}, (a = e?.props) != null ? a : {}))
            }), Ur(() => {
                o.destroy()
            })
        }
    }), () => r()
}
var _f = {
    "dropdown-list": "_dropdown-list_1fnq5_1"
};
const Qa = F("<div></div>"),
    yf = t => {
        const [e, r] = lr(t, ["items"]);
        return (() => {
            const i = Qa.cloneNode(!0);
            return pe(i, de(r, {
                get class() {
                    return K(_f["dropdown-list"], r.class)
                }
            }), !1, !0), nt(i, () => e.items), i
        })()
    },
    Ka = t => {
        const [e, r] = lr(t, ["items", "menu"]), [i, n] = at();
        return mf(i, {
            props: {
                theme: "vanilla",
                content: w(yf, de({
                    get items() {
                        return e.items
                    }
                }, r)),
                interactive: !0,
                arrow: !0,
                animation: "shift-away",
                trigger: "mouseenter click",
                placement: "bottom"
            },
            hidden: !0
        }), (() => {
            const o = Qa.cloneNode(!0);
            return gn(n, o), o.style.setProperty("width", "fit-content"), o.style.setProperty("display", "inline"), nt(o, () => e.menu), o
        })()
    },
    wf = F("<button><div></div><span></span></button>"),
    Zr = t => (() => {
        const e = wf.cloneNode(!0),
            r = e.firstChild,
            i = r.nextSibling;
        return pe(e, de(t, {
            onClick: () => t.onClick()
        }), !1, !0), nt(e, () => t.children, r), r.style.setProperty("margin-right", "0.5em"), nt(i, () => t.title), e
    })(),
    bf = F('<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg"></svg>'),
    xf = F("<title></title>");

function Ut(t, e) {
    const r = de(t.a, e);
    return (() => {
        const i = bf.cloneNode(!0);
        return pe(i, r, !0, !0), nt(i, () => nu, null), nt(i, (() => {
            const n = it(() => !!e.title, !0);
            return () => n() && (() => {
                const o = xf.cloneNode(!0);
                return nt(o, () => e.title), o
            })()
        })(), null), ct(n => {
            const o = t.a.stroke,
                a = {
                    ...e.style,
                    overflow: "visible",
                    color: e.color || "currentColor"
                },
                s = e.size || "1em",
                u = e.size || "1em",
                h = t.c;
            return o !== n._v$ && Wt(i, "stroke", n._v$ = o), n._v$2 = pn(i, a, n._v$2), s !== n._v$3 && Wt(i, "height", n._v$3 = s), u !== n._v$4 && Wt(i, "width", n._v$4 = u), h !== n._v$5 && (i.innerHTML = n._v$5 = h), n
        }, {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0
        }), i
    })()
}

function Ef(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M8.7 3h6.6c.3 0 .5.1.7.3L20.7 8c.2.2.3.4.3.7v6.6c0 .3-.1.5-.3.7L16 20.7c-.2.2-.4.3-.7.3H8.7c-.3 0-.5-.1-.7-.3L3.3 16c-.2-.2-.3-.4-.3-.7V8.7c0-.3.1-.5.3-.7L8 3.3c.2-.2.4-.3.7-.3zM12 8v4M12 16h.01"/>'
    }, t)
}

function Sf(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M12 9v2m0 4v.01M5 19h14a2 2 0 001.84-2.75L13.74 4a2 2 0 00-3.5 0l-7.1 12.25A2 2 0 004.89 19"/>'
    }, t)
}

function kf(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>'
    }, t)
}

function Af(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>'
    }, t)
}

function Cf(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M12 6l4 6 5-4-2 10H5L3 8l5 4z"/>'
    }, t)
}

function Ja(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>'
    }, t)
}

function Tf(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M15 21H6a3 3 0 01-3-3v-1h10v2a2 2 0 004 0V5a2 2 0 112 2h-2m2-4H8a3 3 0 00-3 3v11M9 7h4M9 11h4"/>'
    }, t)
}

function Df(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2"/><path d="M7 12h14l-3-3m0 6l3-3"/>'
    }, t)
}

function If(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="11" r="3"/><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>'
    }, t)
}

function $f(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M4 6h16M4 12h16M4 18h16"/>'
    }, t)
}

function Pf(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/>'
    }, t)
}

function Lf(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M9 12l2 2 4-4"/><path d="M12 3a12 12 0 008.5 3A12 12 0 0112 21 12 12 0 013.5 6 12 12 0 0012 3"/>'
    }, t)
}

function Rf(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/>'
    }, t)
}

function Of(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>'
    }, t)
}

function Mf(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85"/>'
    }, t)
}

function Nf(t) {
    return Ut({
        a: {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            viewBox: "0 0 24 24"
        },
        c: '<path stroke="none" d="M0 0h24v24H0z"/><path d="M18 6L6 18M6 6l12 12"/>'
    }, t)
}
const Bf = "_activity_h6joa_11",
    Uf = "_loading_h6joa_1";
var As = {
    "load-wrapper": "_load-wrapper_h6joa_1",
    activity: Bf,
    loading: Uf
};
const Ff = F("<div><div></div></div>"),
    Hf = () => (() => {
        const t = Ff.cloneNode(!0),
            e = t.firstChild;
        return t.style.setProperty("position", "absolute"), ct(r => {
            const i = K(As["load-wrapper"]),
                n = K(As.activity);
            return i !== r._v$ && st(t, r._v$ = i), n !== r._v$2 && st(e, r._v$2 = n), r
        }, {
            _v$: void 0,
            _v$2: void 0
        }), t
    })(),
    Yf = F("<img>"),
    Or = t => {
        const [e, r] = at(!1);
        return w(j, {
            get children() {
                return w(j, {
                    center: !0,
                    style: {
                        position: "relative"
                    },
                    get children() {
                        return [(() => {
                            const i = Yf.cloneNode(!0);
                            return pe(i, de(t, {
                                onLoad: () => r(!0)
                            }), !1, !1), i
                        })(), w(cr, {
                            get fallback() {
                                return w(Hf, {})
                            },
                            get children() {
                                return w(Mt, {
                                    get when() {
                                        return e()
                                    },
                                    get children() {
                                        return []
                                    }
                                })
                            }
                        })]
                    }
                })
            }
        })
    },
    tl = () => {
        const [t, e] = at();
        return [t, e]
    },
    Be = t => {
        let e;
        const r = () => {
            e && e()
        };
        gt(() => {
            r(), e = t()
        }), Ur(r)
    },
    zf = (t, e) => Be(() => {
        const r = t();
        if (!r) return;
        const i = n => {
            r === n.target && e(n)
        };
        return document.addEventListener("click", i), () => document.removeEventListener("click", i)
    }),
    Xf = "_modal_opkvf_1",
    Vf = "_grow_opkvf_1";
var Rr = {
    "modal-overlay": "_modal-overlay_opkvf_1",
    "modal-wrapper": "_modal-wrapper_opkvf_11",
    modal: Xf,
    grow: Vf,
    "modal-body": "_modal-body_opkvf_42",
    "modal-header": "_modal-header_opkvf_48",
    "modal-close-button": "_modal-close-button_opkvf_56"
};
const qf = F('<div><div><div><div><div><h2></h2><button type="button"></button></div></div></div></div></div>'),
    Wf = F("<div></div>"),
    nr = t => {
        const [e, r] = lr(t, ["isShowing", "hide", "title"]), [i, n] = tl();
        return zf(i, () => e.hide()), it((() => {
            const o = it(() => !!e.isShowing);
            return () => o() ? w(au, {
                get children() {
                    return [(() => {
                        const a = qf.cloneNode(!0),
                            s = a.firstChild,
                            u = s.firstChild,
                            h = u.firstChild,
                            f = h.firstChild,
                            v = f.firstChild,
                            S = v.nextSibling;
                        return gn(n, u), nt(v, () => e.title), Ia(S, "click", e.hide, !0), nt(S, w(Nf, {})), nt(h, () => r.children, null), ct(b => {
                            const D = K(ht.paper),
                                _ = K(Rr["modal-overlay"]),
                                y = K(Rr["modal-wrapper"]),
                                I = K(Rr.modal, r.class),
                                k = K(Rr["modal-header"]),
                                L = K(Rr["modal-close-button"]);
                            return D !== b._v$ && st(a, b._v$ = D), _ !== b._v$2 && st(s, b._v$2 = _), y !== b._v$3 && st(u, b._v$3 = y), I !== b._v$4 && st(h, b._v$4 = I), k !== b._v$5 && st(f, b._v$5 = k), L !== b._v$6 && st(S, b._v$6 = L), b
                        }, {
                            _v$: void 0,
                            _v$2: void 0,
                            _v$3: void 0,
                            _v$4: void 0,
                            _v$5: void 0,
                            _v$6: void 0
                        }), a
                    })(), ","]
                }
            }) : []
        })())
    },
    Er = t => (() => {
        const e = Wf.cloneNode(!0);
        return pe(e, de({
            get class() {
                return K(Rr["modal-body"])
            }
        }, t), !1, !0), nt(e, () => t.children), e
    })();
bo(["click"]);
var Cs = {
    "media-button": "_media-button_1sy9q_1"
};
const Gf = F("<h3>What is this website about?</h3>"),
    jf = F("<p>Place pixels with other players online. You receive a pixel every 3 seconds. Ask your friends to help you draw, the more you are, the more pixels you place. Enjoy!! \u2728\u2728\u2728</p>"),
    Zf = F('<a href="https://discord.gg/sdqhRKW"></a>'),
    Qf = F('<a href="https://www.buymeacoffee.com/pixelzone.io" target="_blank"></a>'),
    Kf = () => w(j, {
        get children() {
            return [Gf.cloneNode(!0), jf.cloneNode(!0), w(j, {
                center: !0,
                row: !0,
                get children() {
                    return [w(j, {
                        center: !0,
                        get class() {
                            return Cs["media-button"]
                        },
                        get children() {
                            const t = Zf.cloneNode(!0);
                            return nt(t, w(Or, {
                                src: "/assets/bitmaps/discord_small.png",
                                width: "200px",
                                height: "55px",
                                style: {
                                    "border-radius": "0.625em"
                                }
                            })), t
                        }
                    }), w(j, {
                        center: !0,
                        get class() {
                            return Cs["media-button"]
                        },
                        get children() {
                            const t = Qf.cloneNode(!0);
                            return nt(t, w(Or, {
                                src: "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png",
                                alt: "Buy Me A Coffee",
                                width: "200px",
                                height: "55px",
                                style: {
                                    "border-radius": "0.625em"
                                }
                            })), t
                        }
                    })]
                }
            })]
        }
    }),
    Jf = t => w(nr, {
        get isShowing() {
            return t.isShowing
        },
        get hide() {
            return t.hide
        },
        title: "\u{1F9D9}\u200D\u2642\uFE0F Welcome",
        get children() {
            return w(Kf, {})
        }
    }),
    td = "_term_13fox_1",
    ed = "_part_13fox_5",
    rd = "_foot_13fox_9";
var We = {
    term: td,
    part: ed,
    foot: rd
};
const id = F("<h3>Terms of Use</h3>"),
    nd = F("<h4>1. Object</h4>"),
    od = F("<p>These Terms of Use deal with the access, the consultation and the use of the services offered by this Site.</p>"),
    sd = F("<p>By accessing, using, consulting this Site or services offered by this Site, the User agrees fully, absolutely these Terms of Use. These Terms of Use may be edited, updated at any time, Users are invited to consult them regularly.</p>"),
    ad = F("<h4>2. Data Privacy</h4>"),
    ld = F('<p>Like third party vendors, we use <a target="_blank" rel="noopener noreferrer" href="https://cookies.insites.com/">Cookies</a>. The user can block or delete these Cookies at any time. However, note that the proper functioning of some services may require Cookies.</p>'),
    cd = F('<p>By using our Site, servers gather basic information from your machine such as your <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/IP_address">Internet protocol (IP) address</a>, <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Web_browser">browser type</a>, <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Internet_service_provider">internet service provider (ISP)</a>, <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Operating_system">OS</a>, <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/URL">referring URL</a>.</p>'),
    ud = F("<p>We care about your personal data, it is normal to inform you of what we do with it. Simply, collected information may be stored on your machine (via Cookies and / or local storage) and / or on our servers. We may use the collected information in order to improve, to personalize our Services, to do statistics, to make advertisements more relevant. Saved data is protected as far as possible. However, the hypothesis of a redemption or legal procedure would allow the transmission of such information.</p>"),
    hd = F('<p>If you want to delete any information related to this Site on your machine then clear your browser <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Web_cache">cache</a>, <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Web_storage">local storage</a> and Cookies (<a href="https://www.refreshyourcache.com/en/home/">this</a> is a simple step by step guide).</p>'),
    fd = F("<h4>3. Use of Services</h4>"),
    dd = F("<p>The User agrees to respect all the rules set forth herein in the use of the services of the Site editor. The User accepts the specific conditions of the services they use. This Site is NOT intended for people under 18 years.</p>"),
    pd = F("<p>The User agrees, not to create, send, publish, or allow the publication, broadcast, transmit, communicate or store, by any means whatsoever and whatever the recipient, illegal content or defamatory, abusive, discriminatory, derogatory, which may violate, infringe 3rd parties rights or public order.</p>"),
    gd = F("<p>The User agrees to respect the all Users' privacy and not to infringe the third parties rights. As such, they agree not to divulge or allow any information to be divulged in order to locate or identify individuals.</p>"),
    vd = F("<p>Similarly, the User agrees not to broadcast private correspondence and to pay particular attention to the protection of minors, they agree not to create, broadcast, store, or let broadcast, pornographic content.</p>"),
    md = F("<p>The User agrees to respect intellectual property, and copyright and thus not to reproduce, represent, broadcast, modify, assign in any capacity whatsoever, content for which they have not obtained express authorization from the holders. The contents are understood as being any signs, signals, writings, images, sounds or messages of any kind.</p>"),
    _d = F("<p>The User agrees not to infringe in any way whatsoever the intellectual property rights relating to this Site, as well as its contents and services. In particular, they agree not to reproduce, copy, distribute, communicate, assign or represent on any other site, as well as on any support having a commercial purpose, the elements and contents of this Site and its services. The User is prohibited from broadcasting and / or prospecting for commercial purposes on this Site, they are prohibited to introduce, publish, send content that may be harmful to other Users.</p>"),
    yd = F('<p>The User agrees not to hinder, disrupt, divert and more generally, not to act in any way, which would not be in accordance with the "normally expected" use of this Site. They agree not to use malicious <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Internet_bot">bots</a>, not to generate invasively or automatically content on this Site.</p>'),
    wd = F("<p>The editor of the Site is no way publisher of the content that is sent by Users. These contents are under the full responsibility of Users. The editor of the Site exercises moderation as much as possible.</p>"),
    bd = F("<p>The User agrees that all sent content is accessible for an indefinite duration from this Site. See the Contact section to request a content deletion.</p>"),
    xd = F("<p>The User grants to the editor of the Site a worldwide, non-exclusive, royalty-free, perpetual and irrevocable license to use, commercially or not, to post online and in any media present or future, to create derivative works, to allow downloading and / or the distribution of the contents they have produced on this Site. Any content that the User enters, sends, publishes or transmits may be used even after deleting it.</p>"),
    Ed = F("<p>The User acknowledges the public nature, available to everyone, of the content sent and therefore refrains from distributing any personal data. Users are invited to report any element of illegal content. See the Contact section to report illegal content.</p>"),
    Sd = F("<h4>4. Liability</h4>"),
    kd = F("<p>The editor of the Site sets up the means to ensure quality services. Nevertheless the editor of the Site cannot be held responsible for any damage, direct or indirect of any nature whatsoever, for any unavailability, failure, modification or error occurred when during the use of this Site or its services with the exception of those allegedly due to a breach of its obligations.</p>"),
    Ad = F("<p>The editor of the Site cannot guarantee continuity, accessibility and absolute security of the service, taking into account the risks related to the Internet. In the event a service interruption, all necessary actions to fix it will be taken as soon as possible.</p>"),
    Cd = F("<p>The User expressly acknowledges use of this Site and services at their sole and entire risk. The editor of the Site cannot be held responsible for relations (contractual or other) between advertisers / partners and Users of its sites and services unless the express contractual stipulation.</p>"),
    Td = F("<p>This Site contains an amount of hypertext links to other sites, some of which may be communicated by the Users of this Site by means of pixels. However, the editor of the Site does not have the possibility to check the content of the visited site, and therefore assumes no liability for this fact.</p>"),
    Ts = F("<br>"),
    Dd = F("<h3>Host</h3>"),
    Id = F("<h4>1. Name</h4>"),
    $d = F('<p>The Site is hosted by <a target="_blank" rel="noopener noreferrer" href="https://www.digitalocean.com/company/contact/">DigitalOcean, LLC</a>.</p>'),
    Pd = F("<h4>2. Adresses</h4>"),
    Ld = F("<p>New York, NY <br> 101 6th Ave</p>"),
    Rd = F("<p>Cambridge, MA <br> 485 Massachusetts Ave</p>"),
    Od = F("<p>Bangalore, India <br> 43 Residency Rd</p>"),
    Md = F("<p>Last updated : </p>"),
    Nd = () => w(j, {
        get children() {
            return [(() => {
                const t = id.cloneNode(!0);
                return ct(() => st(t, K(We.term))), t
            })(), (() => {
                const t = nd.cloneNode(!0);
                return ct(() => st(t, K(We.part))), t
            })(), od.cloneNode(!0), sd.cloneNode(!0), (() => {
                const t = ad.cloneNode(!0);
                return ct(() => st(t, K(We.part))), t
            })(), ld.cloneNode(!0), cd.cloneNode(!0), ud.cloneNode(!0), hd.cloneNode(!0), (() => {
                const t = fd.cloneNode(!0);
                return ct(() => st(t, K(We.part))), t
            })(), dd.cloneNode(!0), pd.cloneNode(!0), gd.cloneNode(!0), vd.cloneNode(!0), md.cloneNode(!0), _d.cloneNode(!0), yd.cloneNode(!0), wd.cloneNode(!0), bd.cloneNode(!0), xd.cloneNode(!0), Ed.cloneNode(!0), (() => {
                const t = Sd.cloneNode(!0);
                return ct(() => st(t, K(We.part))), t
            })(), kd.cloneNode(!0), Ad.cloneNode(!0), Cd.cloneNode(!0), Td.cloneNode(!0), Ts.cloneNode(!0), Dd.cloneNode(!0), (() => {
                const t = Id.cloneNode(!0);
                return ct(() => st(t, K(We.part))), t
            })(), $d.cloneNode(!0), (() => {
                const t = Pd.cloneNode(!0);
                return ct(() => st(t, K(We.part))), t
            })(), w(j, {
                row: !0,
                get children() {
                    return [Ld.cloneNode(!0), Rd.cloneNode(!0), Od.cloneNode(!0)]
                }
            }), Ts.cloneNode(!0), (() => {
                const t = Md.cloneNode(!0);
                return t.firstChild, nt(t, () => new Date(1675813997824).toLocaleDateString(), null), ct(() => st(t, K(We.foot))), t
            })()]
        }
    }),
    Bd = t => w(nr, {
        get isShowing() {
            return t.isShowing
        },
        get hide() {
            return t.hide
        },
        title: "\u{1F4DC} Legals",
        get children() {
            return w(Er, {
                get children() {
                    return w(Nd, {})
                }
            })
        }
    }),
    Ud = F("<input>"),
    Fd = (t, e, r) => {
        const i = r - t / (e - t);
        return `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${i}%, #dd006c), color-stop(${i}%, #c7c7d1))`
    },
    Ds = t => {
        const [e, r] = lr(t, ["defaultValue", "min", "max", "style", "onInput"]), [i, n] = at(e.defaultValue), o = it(() => ({
            ...e.style,
            ["background-image"]: Fd(e.min, e.max, i())
        }));
        return (() => {
            const a = Ud.cloneNode(!0);
            return pe(a, de(r, {
                type: "range",
                get value() {
                    return e.defaultValue
                },
                get min() {
                    return e.min
                },
                get max() {
                    return e.max
                },
                get style() {
                    return o()
                },
                onInput: s => {
                    e.onInput && e.onInput(s), n(s.currentTarget.valueAsNumber)
                }
            }), !1, !1), a
        })()
    },
    Hd = "_slider_t4boz_14",
    Yd = "_round_t4boz_37";
var zn = {
    switch: "_switch_t4boz_1",
    slider: Hd,
    round: Yd
};
const zd = F("<label><input><span></span></label>"),
    Is = t => {
        const [e, r] = lr(t, ["checked"]);
        return (() => {
            const i = zd.cloneNode(!0),
                n = i.firstChild,
                o = n.nextSibling;
            return pe(n, de(r, {
                type: "checkbox",
                get checked() {
                    return e.checked
                }
            }), !1, !1), ct(a => {
                const s = K(zn.switch),
                    u = K(zn.slider, zn.round);
                return s !== a._v$ && st(i, a._v$ = s), u !== a._v$2 && st(o, a._v$2 = u), a
            }, {
                _v$: void 0,
                _v$2: void 0
            }), i
        })()
    },
    el = () => {
        const t = () => Boolean(localStorage);
        return t() || console.warn("Your web browser doesn't support local storage. Your gaming experience may be degraded."), {
            set: (r, i) => t() ? (localStorage.setItem(r, JSON.stringify(i)), !0) : !1,
            get: r => {
                if (t()) try {
                    return JSON.parse(localStorage.getItem(r) || "null")
                } catch {
                    console.warn(`Cannot parse item ${r} from local storage.`)
                }
                return null
            },
            canStore: t
        }
    },
    _n = (t, e, r) => {
        const [i, n] = at(r);
        let o = !0;
        gt(ee(i, s => {
            if (o) return o = !1;
            t.set(e, s)
        }));
        const a = t.get(e);
        return a !== null && n(() => a), [i, n]
    },
    yn = el(),
    [Po, Xd] = _n(yn, "pixelzoneNotif", !0),
    [ki, Vd] = _n(yn, "pixelzoneGrid", !0),
    [rl, qd] = _n(yn, "pixelzoneSoundVolume", 50),
    [il, Wd] = _n(yn, "pixelzonePaletteSize", 50),
    nl = new Audio("/assets/sounds/switch-on.mp3"),
    ol = new Audio("/assets/sounds/switch-off.mp3"),
    sl = new Audio("/assets/sounds/bip1.mp3"),
    Gd = new Audio("/assets/sounds/bip2.mp3"),
    al = new Audio("/assets/sounds/bip3.mp3"),
    ll = new Audio("/assets/sounds/bip4.mp3");
gt(ee(rl, t => {
    t /= 100, nl.volume = t, ol.volume = t, sl.volume = t, Gd.volume = t, al.volume = t, ll.volume = t
}));
const jd = "_key_cv0xq_1",
    Zd = "_row_cv0xq_5";
var Ge = {
    key: jd,
    row: Zd
};
const Qd = F("<span>\u{1F514} Notif</span>"),
    Kd = F("<span>\u{1F4D0} Grid</span>"),
    Jd = F("<span>\u{1F50A} Volume</span>"),
    tp = F("<span>\u{1F3A8} Palette</span>"),
    cl = t => {
        let e = !0;
        gt(ee(t, r => {
            if (e) return e = !1;
            (r ? nl : ol).play()
        }))
    };
cl(Po);
cl(ki);
const ep = () => w(j, {
        get children() {
            return [w(j, {
                row: !0,
                center: !0,
                left: !0,
                get class() {
                    return K(Ge.row)
                },
                get children() {
                    return [(() => {
                        const t = Qd.cloneNode(!0);
                        return ct(() => st(t, K(Ge.key))), t
                    })(), w(j, {
                        row: !0,
                        center: !0,
                        right: !0,
                        get children() {
                            return w(Is, {
                                get checked() {
                                    return Po()
                                },
                                onChange: ({
                                    currentTarget: t
                                }) => {
                                    Xd(t.checked)
                                }
                            })
                        }
                    })]
                }
            }), w(j, {
                row: !0,
                center: !0,
                left: !0,
                get class() {
                    return K(Ge.row)
                },
                get children() {
                    return [(() => {
                        const t = Kd.cloneNode(!0);
                        return ct(() => st(t, K(Ge.key))), t
                    })(), w(j, {
                        row: !0,
                        center: !0,
                        right: !0,
                        get children() {
                            return w(Is, {
                                get checked() {
                                    return ki()
                                },
                                onChange: ({
                                    currentTarget: t
                                }) => {
                                    Vd(t.checked)
                                }
                            })
                        }
                    })]
                }
            }), w(j, {
                row: !0,
                center: !0,
                left: !0,
                get class() {
                    return K(Ge.row)
                },
                get children() {
                    return [(() => {
                        const t = Jd.cloneNode(!0);
                        return ct(() => st(t, K(Ge.key))), t
                    })(), w(j, {
                        row: !0,
                        center: !0,
                        right: !0,
                        get children() {
                            return w(Ds, {
                                get defaultValue() {
                                    return rl()
                                },
                                min: 0,
                                max: 100,
                                onChange: ({
                                    currentTarget: t
                                }) => {
                                    qd(t.valueAsNumber)
                                }
                            })
                        }
                    })]
                }
            }), w(j, {
                row: !0,
                center: !0,
                left: !0,
                get class() {
                    return K(Ge.row)
                },
                get children() {
                    return [(() => {
                        const t = tp.cloneNode(!0);
                        return ct(() => st(t, K(Ge.key))), t
                    })(), w(j, {
                        row: !0,
                        center: !0,
                        right: !0,
                        get children() {
                            return w(Ds, {
                                get defaultValue() {
                                    return il()
                                },
                                min: 0,
                                max: 100,
                                onInput: ({
                                    currentTarget: t
                                }) => {
                                    Wd(t.valueAsNumber)
                                }
                            })
                        }
                    })]
                }
            })]
        }
    }),
    rp = t => w(nr, {
        get isShowing() {
            return t.isShowing
        },
        get hide() {
            return t.hide
        },
        title: "\u2699\uFE0F Settings",
        get children() {
            return w(Er, {
                get children() {
                    return w(ep, {})
                }
            })
        }
    }),
    ip = F("<div></div>"),
    np = t => w(Zr, {
        title: "About",
        onClick: () => t.onClick(),
        get children() {
            return w(Ja, {
                size: "1.5em"
            })
        }
    }),
    op = t => w(Zr, {
        title: "Settings",
        onClick: () => t.onClick(),
        get children() {
            return w(Pf, {
                size: "1.5em"
            })
        }
    }),
    sp = t => w(Zr, {
        title: "Legals",
        onClick: () => t.onClick(),
        get children() {
            return w(Tf, {
                size: "1.5em"
            })
        }
    }),
    ap = () => {
        const [t, e] = at(!1), [r, i] = at(!1), [n, o] = at(!1);
        return (() => {
            const a = ip.cloneNode(!0);
            return nt(a, w(Ka, {
                get items() {
                    return [w(np, {
                        onClick: () => e(!0)
                    }), w(op, {
                        onClick: () => i(!0)
                    }), w(sp, {
                        onClick: () => o(!0)
                    })]
                },
                get menu() {
                    return w(Mu, {
                        get children() {
                            return w($f, {
                                size: "auto"
                            })
                        }
                    })
                }
            }), null), nt(a, w(Jf, {
                get isShowing() {
                    return t()
                },
                hide: () => e(!1)
            }), null), nt(a, w(rp, {
                get isShowing() {
                    return r()
                },
                hide: () => i(!1)
            }), null), nt(a, w(Bd, {
                get isShowing() {
                    return n()
                },
                hide: () => o(!1)
            }), null), a
        })()
    },
    lp = F('<canvas tabindex="1"></canvas>'),
    cp = t => (() => {
        const e = lp.cloneNode(!0),
            r = t.ref;
        return typeof r == "function" ? gn(r, e) : t.ref = e, e.style.setProperty("width", "100%"), e.style.setProperty("height", "100%"), e.style.setProperty("position", "absolute"), e
    })(),
    up = "_primary_1c495_1",
    hp = "_secondary_1c495_7",
    fp = "_paper_1c495_13",
    dp = "_background_1c495_19",
    pp = "_padding_1c495_42",
    gp = "_margin_1c495_46",
    vp = "_pixelated_1c495_56";
var mp = {
    primary: up,
    secondary: hp,
    paper: fp,
    background: dp,
    "scale-hover": "_scale-hover_1c495_25",
    "content-box": "_content-box_1c495_33",
    "fit-content": "_fit-content_1c495_37",
    padding: pp,
    margin: gp,
    "small-hide": "_small-hide_1c495_51",
    pixelated: vp,
    "long-text": "_long-text_1c495_60",
    "pointer-none": "_pointer-none_1c495_68",
    "pointer-auto": "_pointer-auto_1c495_72",
    "pointer-children": "_pointer-children_1c495_76",
    "disable-select": "_disable-select_1c495_83"
};
const _p = F("<button></button>"),
    Re = t => {
        const [e, r] = lr(t, ["color"]);
        return (() => {
            const i = _p.cloneNode(!0);
            return pe(i, de(r, {
                get class() {
                    return K(mp[e.color], r.class)
                }
            }), !1, !0), nt(i, () => r.children), i
        })()
    },
    yp = "_background_12bgf_1";
var wp = {
    background: yp
};
const bp = F('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'),
    Lo = t => (() => {
        const e = bp.cloneNode(!0),
            r = e.firstChild,
            i = r.nextSibling,
            n = i.nextSibling,
            o = n.nextSibling;
        return pe(e, t, !1, !0), ct(a => {
            const s = t.dotColor,
                u = t.dotColor,
                h = t.dotColor,
                f = t.dotColor;
            return s !== a._v$ && r.style.setProperty("background-color", a._v$ = s), u !== a._v$2 && i.style.setProperty("background-color", a._v$2 = u), h !== a._v$3 && n.style.setProperty("background-color", a._v$3 = h), f !== a._v$4 && o.style.setProperty("background-color", a._v$4 = f), a
        }, {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0,
            _v$4: void 0
        }), e
    })(),
    xp = t => {
        let e = t.length - 1;
        for (; e > 0 && t[e - 1] >= t[e];) e--;
        if (e <= 0) return !1;
        let r = t.length - 1;
        for (; t[r] <= t[e - 1];) r--;
        let i = t[e - 1];
        for (t[e - 1] = t[r], t[r] = i, r = t.length - 1; e < r;) i = t[e], t[e] = t[r], t[r] = i, e++, r--;
        return !0
    },
    Ep = t => {
        const e = [],
            r = new Map,
            i = [];
        let n = 0;
        for (let o = 0; o < t; o++) i.push(o);
        for (e.push(i.slice(0)), r.set(JSON.stringify(i), n); xp(i);) e.push(i.slice(0)), n++, r.set(JSON.stringify(i), n);
        return {
            indexToPerm: o => e[o],
            permToIndex: o => r.get(JSON.stringify(o))
        }
    };
/**
 * Muuri v0.9.5
 * https://muuri.dev/
 * Copyright (c) 2015-present, Haltu Oy
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/LICENSE.md
 * @license MIT
 *
 * Muuri Packer
 * Copyright (c) 2016-present, Niklas Rämö <inramo@gmail.com>
 * @license MIT
 *
 * Muuri Ticker / Muuri Emitter / Muuri Dragger
 * Copyright (c) 2018-present, Niklas Rämö <inramo@gmail.com>
 * @license MIT
 *
 * Muuri AutoScroller
 * Copyright (c) 2019-present, Niklas Rämö <inramo@gmail.com>
 * @license MIT
 */
var wn = {},
    yr = typeof Map == "function" ? new Map : null,
    ke = "swap",
    Sr = "move",
    Sp = "synchronize",
    or = "layoutStart",
    $s = "layoutEnd",
    Ps = "layoutAbort",
    Ls = "add",
    Rs = "remove",
    kp = "showStart",
    Ap = "showEnd",
    di = "hideStart",
    Cp = "hideEnd",
    Os = "filter",
    Ms = "sort",
    tn = "move",
    en = "send",
    sr = "beforeSend",
    rn = "receive",
    nn = "beforeReceive",
    Tp = "dragInit",
    Dp = "dragStart",
    Ip = "dragMove",
    $p = "dragScroll",
    Pp = "dragEnd",
    Lp = "dragReleaseStart",
    pi = "dragReleaseEnd",
    Rp = "destroy",
    ul = "ontouchstart" in window,
    Ro = !!window.PointerEvent,
    Oo = !!window.navigator.msPointerEnabled,
    Op = 16777216;

function ve() {
    this._events = {}, this._queue = [], this._counter = 0, this._clearOnEmit = !1
}
ve.prototype.on = function(t, e) {
    if (!this._events || !t || !e) return this;
    var r = this._events[t];
    return r || (r = this._events[t] = []), r.push(e), this
};
ve.prototype.off = function(t, e) {
    if (!this._events || !t || !e) return this;
    var r = this._events[t];
    if (!r || !r.length) return this;
    for (var i;
        (i = r.indexOf(e)) !== -1;) r.splice(i, 1);
    return this
};
ve.prototype.clear = function(t) {
    if (!this._events || !t) return this;
    var e = this._events[t];
    return e && (e.length = 0, delete this._events[t]), this
};
ve.prototype.emit = function(t) {
    if (!this._events || !t) return this._clearOnEmit = !1, this;
    var e = this._events[t];
    if (!e || !e.length) return this._clearOnEmit = !1, this;
    var r = this._queue,
        i = r.length,
        n = arguments.length - 1,
        o;
    n > 3 && (o = [], o.push.apply(o, arguments), o.shift()), r.push.apply(r, e), this._clearOnEmit && (e.length = 0, this._clearOnEmit = !1), ++this._counter;
    for (var a = i, s = r.length; a < s; a++)
        if (n === 0 ? r[a]() : n === 1 ? r[a](arguments[1]) : n === 2 ? r[a](arguments[1], arguments[2]) : n === 3 ? r[a](arguments[1], arguments[2], arguments[3]) : r[a].apply(null, o), !this._events) return this;
    return --this._counter, this._counter || (r.length = 0), this
};
ve.prototype.burst = function() {
    return this._events ? (this._clearOnEmit = !0, this.emit.apply(this, arguments), this) : this
};
ve.prototype.countListeners = function(t) {
    if (!this._events) return 0;
    var e = this._events[t];
    return e ? e.length : 0
};
ve.prototype.destroy = function() {
    return this._events ? (this._queue.length = this._counter = 0, this._events = null, this) : this
};
var bn = Ro ? "pointerout" : Oo ? "MSPointerOut" : "",
    Mp = 100;

function hr(t) {
    !bn || (this._dragger = t, this._timeout = null, this._outEvent = null, this._isActive = !1, this._addBehaviour = this._addBehaviour.bind(this), this._removeBehaviour = this._removeBehaviour.bind(this), this._onTimeout = this._onTimeout.bind(this), this._resetData = this._resetData.bind(this), this._onStart = this._onStart.bind(this), this._onOut = this._onOut.bind(this), this._dragger.on("start", this._onStart))
}
hr.prototype._addBehaviour = function() {
    this._isActive || (this._isActive = !0, this._dragger.on("move", this._resetData), this._dragger.on("cancel", this._removeBehaviour), this._dragger.on("end", this._removeBehaviour), window.addEventListener(bn, this._onOut))
};
hr.prototype._removeBehaviour = function() {
    !this._isActive || (this._dragger.off("move", this._resetData), this._dragger.off("cancel", this._removeBehaviour), this._dragger.off("end", this._removeBehaviour), window.removeEventListener(bn, this._onOut), this._resetData(), this._isActive = !1)
};
hr.prototype._resetData = function() {
    window.clearTimeout(this._timeout), this._timeout = null, this._outEvent = null
};
hr.prototype._onStart = function(t) {
    t.pointerType !== "mouse" && this._addBehaviour()
};
hr.prototype._onOut = function(t) {
    !this._dragger._getTrackedTouch(t) || (this._resetData(), this._outEvent = t, this._timeout = window.setTimeout(this._onTimeout, Mp))
};
hr.prototype._onTimeout = function() {
    var t = this._outEvent;
    this._resetData(), this._dragger.isActive() && this._dragger._onCancel(t)
};
hr.prototype.destroy = function() {
    !bn || (this._dragger.off("start", this._onStart), this._removeBehaviour())
};
var Xn = ["", "webkit", "moz", "ms", "o", "Webkit", "Moz", "MS", "O"],
    Ns = {};

function xn(t, e) {
    var r = Ns[e] || "";
    if (r) return r;
    for (var i = e[0].toUpperCase() + e.slice(1), n = 0; n < Xn.length;) {
        if (r = Xn[n] ? Xn[n] + i : e, r in t) return Ns[e] = r, r;
        ++n
    }
    return ""
}

function hl() {
    var t = !1;
    try {
        var e = Object.defineProperty({}, "passive", {
            get: function() {
                t = !0
            }
        });
        window.addEventListener("testPassive", null, e), window.removeEventListener("testPassive", null, e)
    } catch {}
    return t
}
var En = window.navigator.userAgent.toLowerCase(),
    Np = En.indexOf("edge") > -1,
    Bp = En.indexOf("trident") > -1,
    Up = En.indexOf("firefox") > -1,
    Fp = En.indexOf("android") > -1,
    rr = hl() ? {
        passive: !0
    } : !1,
    fl = "touchAction",
    Ri = xn(document.documentElement.style, fl),
    Hp = "auto";

function z(t, e) {
    this._element = t, this._emitter = new ve, this._isDestroyed = !1, this._cssProps = {}, this._touchAction = "", this._isActive = !1, this._pointerId = null, this._startTime = 0, this._startX = 0, this._startY = 0, this._currentX = 0, this._currentY = 0, this._onStart = this._onStart.bind(this), this._onMove = this._onMove.bind(this), this._onCancel = this._onCancel.bind(this), this._onEnd = this._onEnd.bind(this), this._edgeHack = null, (Np || Bp) && (Ro || Oo) && (this._edgeHack = new hr(this)), this.setCssProps(e), this._touchAction || this.setTouchAction(Hp), t.addEventListener("dragstart", z._preventDefault, !1), t.addEventListener(z._inputEvents.start, this._onStart, rr)
}
z._pointerEvents = {
    start: "pointerdown",
    move: "pointermove",
    cancel: "pointercancel",
    end: "pointerup"
};
z._msPointerEvents = {
    start: "MSPointerDown",
    move: "MSPointerMove",
    cancel: "MSPointerCancel",
    end: "MSPointerUp"
};
z._touchEvents = {
    start: "touchstart",
    move: "touchmove",
    cancel: "touchcancel",
    end: "touchend"
};
z._mouseEvents = {
    start: "mousedown",
    move: "mousemove",
    cancel: "",
    end: "mouseup"
};
z._inputEvents = function() {
    return ul ? z._touchEvents : Ro ? z._pointerEvents : Oo ? z._msPointerEvents : z._mouseEvents
}();
z._emitter = new ve;
z._emitterEvents = {
    start: "start",
    move: "move",
    end: "end",
    cancel: "cancel"
};
z._activeInstances = [];
z._preventDefault = function(t) {
    t.preventDefault && t.cancelable !== !1 && t.preventDefault()
};
z._activateInstance = function(t) {
    var e = z._activeInstances.indexOf(t);
    e > -1 || (z._activeInstances.push(t), z._emitter.on(z._emitterEvents.move, t._onMove), z._emitter.on(z._emitterEvents.cancel, t._onCancel), z._emitter.on(z._emitterEvents.end, t._onEnd), z._activeInstances.length === 1 && z._bindListeners())
};
z._deactivateInstance = function(t) {
    var e = z._activeInstances.indexOf(t);
    e !== -1 && (z._activeInstances.splice(e, 1), z._emitter.off(z._emitterEvents.move, t._onMove), z._emitter.off(z._emitterEvents.cancel, t._onCancel), z._emitter.off(z._emitterEvents.end, t._onEnd), z._activeInstances.length || z._unbindListeners())
};
z._bindListeners = function() {
    window.addEventListener(z._inputEvents.move, z._onMove, rr), window.addEventListener(z._inputEvents.end, z._onEnd, rr), z._inputEvents.cancel && window.addEventListener(z._inputEvents.cancel, z._onCancel, rr)
};
z._unbindListeners = function() {
    window.removeEventListener(z._inputEvents.move, z._onMove, rr), window.removeEventListener(z._inputEvents.end, z._onEnd, rr), z._inputEvents.cancel && window.removeEventListener(z._inputEvents.cancel, z._onCancel, rr)
};
z._getEventPointerId = function(t) {
    return typeof t.pointerId == "number" ? t.pointerId : t.changedTouches ? t.changedTouches[0] ? t.changedTouches[0].identifier : null : 1
};
z._getTouchById = function(t, e) {
    if (typeof t.pointerId == "number") return t.pointerId === e ? t : null;
    if (t.changedTouches) {
        for (var r = 0; r < t.changedTouches.length; r++)
            if (t.changedTouches[r].identifier === e) return t.changedTouches[r];
        return null
    }
    return t
};
z._onMove = function(t) {
    z._emitter.emit(z._emitterEvents.move, t)
};
z._onCancel = function(t) {
    z._emitter.emit(z._emitterEvents.cancel, t)
};
z._onEnd = function(t) {
    z._emitter.emit(z._emitterEvents.end, t)
};
z.prototype._reset = function() {
    this._pointerId = null, this._startTime = 0, this._startX = 0, this._startY = 0, this._currentX = 0, this._currentY = 0, this._isActive = !1, z._deactivateInstance(this)
};
z.prototype._createEvent = function(t, e) {
    var r = this._getTrackedTouch(e);
    return {
        type: t,
        srcEvent: e,
        distance: this.getDistance(),
        deltaX: this.getDeltaX(),
        deltaY: this.getDeltaY(),
        deltaTime: t === z._emitterEvents.start ? 0 : this.getDeltaTime(),
        isFirst: t === z._emitterEvents.start,
        isFinal: t === z._emitterEvents.end || t === z._emitterEvents.cancel,
        pointerType: e.pointerType || (e.touches ? "touch" : "mouse"),
        identifier: this._pointerId,
        screenX: r.screenX,
        screenY: r.screenY,
        clientX: r.clientX,
        clientY: r.clientY,
        pageX: r.pageX,
        pageY: r.pageY,
        target: r.target
    }
};
z.prototype._emit = function(t, e) {
    this._emitter.emit(t, this._createEvent(t, e))
};
z.prototype._getTrackedTouch = function(t) {
    return this._pointerId === null ? null : z._getTouchById(t, this._pointerId)
};
z.prototype._onStart = function(t) {
    if (!this._isDestroyed && this._pointerId === null && (this._pointerId = z._getEventPointerId(t), this._pointerId !== null)) {
        var e = this._getTrackedTouch(t);
        this._startX = this._currentX = e.clientX, this._startY = this._currentY = e.clientY, this._startTime = Date.now(), this._isActive = !0, this._emit(z._emitterEvents.start, t), this._isActive && z._activateInstance(this)
    }
};
z.prototype._onMove = function(t) {
    var e = this._getTrackedTouch(t);
    !e || (this._currentX = e.clientX, this._currentY = e.clientY, this._emit(z._emitterEvents.move, t))
};
z.prototype._onCancel = function(t) {
    !this._getTrackedTouch(t) || (this._emit(z._emitterEvents.cancel, t), this._reset())
};
z.prototype._onEnd = function(t) {
    !this._getTrackedTouch(t) || (this._emit(z._emitterEvents.end, t), this._reset())
};
z.prototype.isActive = function() {
    return this._isActive
};
z.prototype.setTouchAction = function(t) {
    this._touchAction = t, Ri && (this._cssProps[Ri] = "", this._element.style[Ri] = t), ul && (this._element.removeEventListener(z._touchEvents.start, z._preventDefault, !0), (this._element.style[Ri] !== t || Up && Fp) && this._element.addEventListener(z._touchEvents.start, z._preventDefault, !0))
};
z.prototype.setCssProps = function(t) {
    if (!!t) {
        var e = this._cssProps,
            r = this._element,
            i, n;
        for (i in e) r.style[i] = e[i], delete e[i];
        for (i in t)
            if (!!t[i]) {
                if (i === fl) {
                    this.setTouchAction(t[i]);
                    continue
                }
                n = xn(r.style, i), n && (e[n] = "", r.style[n] = t[i])
            }
    }
};
z.prototype.getDeltaX = function() {
    return this._currentX - this._startX
};
z.prototype.getDeltaY = function() {
    return this._currentY - this._startY
};
z.prototype.getDistance = function() {
    var t = this.getDeltaX(),
        e = this.getDeltaY();
    return Math.sqrt(t * t + e * e)
};
z.prototype.getDeltaTime = function() {
    return this._startTime ? Date.now() - this._startTime : 0
};
z.prototype.on = function(t, e) {
    this._emitter.on(t, e)
};
z.prototype.off = function(t, e) {
    this._emitter.off(t, e)
};
z.prototype.destroy = function() {
    if (!this._isDestroyed) {
        var t = this._element;
        this._edgeHack && this._edgeHack.destroy(), this._reset(), this._emitter.destroy(), t.removeEventListener(z._inputEvents.start, this._onStart, rr), t.removeEventListener("dragstart", z._preventDefault, !1), t.removeEventListener(z._touchEvents.start, z._preventDefault, !0);
        for (var e in this._cssProps) t.style[e] = this._cssProps[e], delete this._cssProps[e];
        this._element = null, this._isDestroyed = !0
    }
};
var Yp = 1e3 / 60,
    zp = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
        return this.setTimeout(function() {
            t(Date.now())
        }, Yp)
    }).bind(window);

function Sn(t) {
    this._nextStep = null, this._lanes = [], this._stepQueue = [], this._stepCallbacks = {}, this._step = this._step.bind(this);
    for (var e = 0; e < t; e++) this._lanes.push(new Mo)
}
Sn.prototype._step = function(t) {
    var e = this._lanes,
        r = this._stepQueue,
        i = this._stepCallbacks,
        n, o, a, s, u, h;
    for (this._nextStep = null, n = 0; n < e.length; n++) {
        for (s = e[n].queue, u = e[n].callbacks, h = e[n].indices, o = 0; o < s.length; o++) a = s[o], a && (r.push(a), i[a] = u[a], delete u[a], delete h[a]);
        s.length = 0
    }
    for (n = 0; n < r.length; n++) a = r[n], i[a] && i[a](t), delete i[a];
    r.length = 0
};
Sn.prototype.add = function(t, e, r) {
    this._lanes[t].add(e, r), this._nextStep || (this._nextStep = zp(this._step))
};
Sn.prototype.remove = function(t, e) {
    this._lanes[t].remove(e)
};

function Mo() {
    this.queue = [], this.indices = {}, this.callbacks = {}
}
Mo.prototype.add = function(t, e) {
    var r = this.indices[t];
    r !== void 0 && (this.queue[r] = void 0), this.queue.push(t), this.callbacks[t] = e, this.indices[t] = this.queue.length - 1
};
Mo.prototype.remove = function(t) {
    var e = this.indices[t];
    e !== void 0 && (this.queue[e] = void 0, delete this.callbacks[t], delete this.indices[t])
};
var dl = "layoutRead",
    pl = "layoutWrite",
    gl = "visibilityRead",
    vl = "visibilityWrite",
    ml = "dragStartRead",
    _l = "dragStartWrite",
    yl = "dragMoveRead",
    wl = "dragMoveWrite",
    bl = "dragScrollRead",
    xl = "dragScrollWrite",
    El = "dragSortRead",
    Sl = "placeholderLayoutRead",
    kl = "placeholderLayoutWrite",
    Al = "placeholderResizeWrite",
    Cl = "autoScrollRead",
    Tl = "autoScrollWrite",
    Dl = "debounceRead",
    Ft = 0,
    Il = 1,
    Ht = 2,
    ft = new Sn(3);

function Xp(t, e, r) {
    ft.add(Ft, dl + t, e), ft.add(Ht, pl + t, r)
}

function $l(t) {
    ft.remove(Ft, dl + t), ft.remove(Ht, pl + t)
}

function Vp(t, e, r) {
    ft.add(Ft, gl + t, e), ft.add(Ht, vl + t, r)
}

function Pl(t) {
    ft.remove(Ft, gl + t), ft.remove(Ht, vl + t)
}

function qp(t, e, r) {
    ft.add(Ft, ml + t, e), ft.add(Ht, _l + t, r)
}

function Ll(t) {
    ft.remove(Ft, ml + t), ft.remove(Ht, _l + t)
}

function Wp(t, e, r) {
    ft.add(Ft, yl + t, e), ft.add(Ht, wl + t, r)
}

function Rl(t) {
    ft.remove(Ft, yl + t), ft.remove(Ht, wl + t)
}

function Gp(t, e, r) {
    ft.add(Ft, bl + t, e), ft.add(Ht, xl + t, r)
}

function Ol(t) {
    ft.remove(Ft, bl + t), ft.remove(Ht, xl + t)
}

function kn(t, e) {
    ft.add(Il, El + t, e)
}

function jp(t) {
    ft.remove(Il, El + t)
}

function Zp(t, e, r) {
    ft.add(Ft, Sl + t, e), ft.add(Ht, kl + t, r)
}

function Ml(t) {
    ft.remove(Ft, Sl + t), ft.remove(Ht, kl + t)
}

function Qp(t, e) {
    ft.add(Ht, Al + t, e)
}

function Kp(t) {
    ft.remove(Ht, Al + t)
}

function Nl(t, e) {
    ft.add(Ft, Cl, t), ft.add(Ht, Tl, e)
}

function Jp() {
    ft.remove(Ft, Cl), ft.remove(Ht, Tl)
}

function tg(t, e) {
    ft.add(Ft, Dl + t, e)
}

function eg(t) {
    ft.remove(Ft, Dl + t)
}
var bt = 1,
    Ct = 2,
    Qr = 4,
    No = 8,
    gi = bt | No,
    vi = bt | Qr,
    mi = Ct | No,
    on = Ct | Qr,
    rg = "function";

function lt(t) {
    return typeof t === rg
}
var Oi = typeof WeakMap == "function" ? new WeakMap : null;

function Jt(t, e) {
    var r = Oi && Oi.get(t);
    return r || (r = window.getComputedStyle(t, null), Oi && Oi.set(t, r)), r.getPropertyValue(e)
}

function le(t, e) {
    return parseFloat(Jt(t, e)) || 0
}
var kr = document.documentElement,
    ig = document.body,
    Mi = {
        value: 0,
        offset: 0
    };

function Bl(t) {
    return t === window || t === kr || t === ig ? window : t
}

function _i(t) {
    return t === window ? t.pageXOffset : t.scrollLeft
}

function yi(t) {
    return t === window ? t.pageYOffset : t.scrollTop
}

function Ul(t) {
    return t === window ? kr.scrollWidth - kr.clientWidth : t.scrollWidth - t.clientWidth
}

function Fl(t) {
    return t === window ? kr.scrollHeight - kr.clientHeight : t.scrollHeight - t.clientHeight
}

function Hl(t, e) {
    if (e = e || {}, t === window) e.width = kr.clientWidth, e.height = kr.clientHeight, e.left = 0, e.right = e.width, e.top = 0, e.bottom = e.height;
    else {
        var r = t.getBoundingClientRect(),
            i = t.clientLeft || le(t, "border-left-width"),
            n = t.clientTop || le(t, "border-top-width");
        e.width = t.clientWidth, e.height = t.clientHeight, e.left = r.left + i, e.right = e.left + e.width, e.top = r.top + n, e.bottom = e.top + e.height
    }
    return e
}

function Ai(t) {
    return t._drag._getGrid()._settings.dragAutoScroll
}

function ng(t) {
    !t._drag || t._drag._prepareScroll()
}

function og(t) {
    if (!(!t._drag || !t._isActive)) {
        var e = t._drag;
        e._scrollDiffX = e._scrollDiffY = 0, t._setTranslate(e._left, e._top)
    }
}

function oo(t, e, r, i) {
    return Mi.value = Math.min(i / 2, t), Mi.offset = Math.max(0, r + Mi.value * 2 + i * e - i) / 2, Mi
}

function He() {
    this.reset()
}
He.prototype.reset = function() {
    this.isActive && this.onStop(), this.item = null, this.element = null, this.isActive = !1, this.isEnding = !1, this.direction = null, this.value = null, this.maxValue = 0, this.threshold = 0, this.distance = 0, this.speed = 0, this.duration = 0, this.action = null
};
He.prototype.hasReachedEnd = function() {
    return Qr & this.direction ? this.value >= this.maxValue : this.value <= 0
};
He.prototype.computeCurrentScrollValue = function() {
    return this.value === null ? bt & this.direction ? _i(this.element) : yi(this.element) : Math.max(0, Math.min(this.value, this.maxValue))
};
He.prototype.computeNextScrollValue = function(t) {
    var e = this.speed * (t / 1e3),
        r = Qr & this.direction ? this.value + e : this.value - e;
    return Math.max(0, Math.min(r, this.maxValue))
};
He.prototype.computeSpeed = function() {
    var t = {
        direction: null,
        threshold: 0,
        distance: 0,
        value: 0,
        maxValue: 0,
        deltaTime: 0,
        duration: 0,
        isEnding: !1
    };
    return function(e) {
        var r = this.item,
            i = Ai(r).speed;
        return lt(i) ? (t.direction = this.direction, t.threshold = this.threshold, t.distance = this.distance, t.value = this.value, t.maxValue = this.maxValue, t.duration = this.duration, t.speed = this.speed, t.deltaTime = e, t.isEnding = this.isEnding, i(r, this.element, t)) : i
    }
}();
He.prototype.tick = function(t) {
    return this.isActive || (this.isActive = !0, this.onStart()), this.value = this.computeCurrentScrollValue(), this.speed = this.computeSpeed(t), this.value = this.computeNextScrollValue(t), this.duration += t, this.value
};
He.prototype.onStart = function() {
    var t = this.item,
        e = Ai(t).onStart;
    lt(e) && e(t, this.element, this.direction)
};
He.prototype.onStop = function() {
    var t = this.item,
        e = Ai(t).onStop;
    lt(e) && e(t, this.element, this.direction), t._drag && t._drag.sort()
};

function Kr() {
    this.element = null, this.requestX = null, this.requestY = null, this.scrollLeft = 0, this.scrollTop = 0
}
Kr.prototype.reset = function() {
    this.requestX && (this.requestX.action = null), this.requestY && (this.requestY.action = null), this.element = null, this.requestX = null, this.requestY = null, this.scrollLeft = 0, this.scrollTop = 0
};
Kr.prototype.addRequest = function(t) {
    bt & t.direction ? (this.removeRequest(this.requestX), this.requestX = t) : (this.removeRequest(this.requestY), this.requestY = t), t.action = this
};
Kr.prototype.removeRequest = function(t) {
    !t || (this.requestX === t ? (this.requestX = null, t.action = null) : this.requestY === t && (this.requestY = null, t.action = null))
};
Kr.prototype.computeScrollValues = function() {
    this.scrollLeft = this.requestX ? this.requestX.value : _i(this.element), this.scrollTop = this.requestY ? this.requestY.value : yi(this.element)
};
Kr.prototype.scroll = function() {
    var t = this.element;
    !t || (t.scrollTo ? t.scrollTo(this.scrollLeft, this.scrollTop) : (t.scrollLeft = this.scrollLeft, t.scrollTop = this.scrollTop))
};

function wi(t, e) {
    this.pool = [], this.createItem = t, this.releaseItem = e
}
wi.prototype.pick = function() {
    return this.pool.pop() || this.createItem()
};
wi.prototype.release = function(t) {
    this.releaseItem(t), this.pool.indexOf(t) === -1 && this.pool.push(t)
};
wi.prototype.reset = function() {
    this.pool.length = 0
};

function sg(t, e) {
    return !(t.left + t.width <= e.left || e.left + e.width <= t.left || t.top + t.height <= e.top || e.top + e.height <= t.top)
}

function ag(t, e) {
    if (!sg(t, e)) return 0;
    var r = Math.min(t.left + t.width, e.left + e.width) - Math.max(t.left, e.left),
        i = Math.min(t.top + t.height, e.top + e.height) - Math.max(t.top, e.top);
    return r * i
}

function sn(t, e) {
    var r = ag(t, e);
    if (!r) return 0;
    var i = Math.min(t.width, e.width) * Math.min(t.height, e.height);
    return r / i * 100
}
var Yl = {
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    zl = {
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

function dt() {
    this._isDestroyed = !1, this._isTicking = !1, this._tickTime = 0, this._tickDeltaTime = 0, this._items = [], this._actions = [], this._requests = {}, this._requests[bt] = {}, this._requests[Ct] = {}, this._requestOverlapCheck = {}, this._dragPositions = {}, this._dragDirections = {}, this._overlapCheckInterval = 150, this._requestPool = new wi(function() {
        return new He
    }, function(t) {
        t.reset()
    }), this._actionPool = new wi(function() {
        return new Kr
    }, function(t) {
        t.reset()
    }), this._readTick = this._readTick.bind(this), this._writeTick = this._writeTick.bind(this)
}
dt.AXIS_X = bt;
dt.AXIS_Y = Ct;
dt.FORWARD = Qr;
dt.BACKWARD = No;
dt.LEFT = gi;
dt.RIGHT = vi;
dt.UP = mi;
dt.DOWN = on;
dt.smoothSpeed = function(t, e, r) {
    return function(i, n, o) {
        var a = 0;
        if (!o.isEnding)
            if (o.threshold > 0) {
                var s = o.threshold - Math.max(0, o.distance);
                a = t / o.threshold * s
            } else a = t;
        var u = o.speed,
            h = a;
        return u === a ? h : u < a ? (h = u + e * (o.deltaTime / 1e3), Math.min(a, h)) : (h = u - r * (o.deltaTime / 1e3), Math.max(a, h))
    }
};
dt.pointerHandle = function(t) {
    var e = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        },
        r = t || 1;
    return function(i, n, o, a, s, u, h) {
        return e.left = u - r * .5, e.top = h - r * .5, e.width = r, e.height = r, e
    }
};
dt.prototype._readTick = function(t) {
    this._isDestroyed || (t && this._tickTime ? (this._tickDeltaTime = t - this._tickTime, this._tickTime = t, this._updateRequests(), this._updateActions()) : (this._tickTime = t, this._tickDeltaTime = 0))
};
dt.prototype._writeTick = function() {
    this._isDestroyed || (this._applyActions(), Nl(this._readTick, this._writeTick))
};
dt.prototype._startTicking = function() {
    this._isTicking = !0, Nl(this._readTick, this._writeTick)
};
dt.prototype._stopTicking = function() {
    this._isTicking = !1, this._tickTime = 0, this._tickDeltaTime = 0, Jp()
};
dt.prototype._getItemHandleRect = function(t, e, r) {
    var i = t._drag;
    if (e) {
        var n = i._dragMoveEvent || i._dragStartEvent,
            o = e(t, i._clientX, i._clientY, t._width, t._height, n.clientX, n.clientY);
        r.left = o.left, r.top = o.top, r.width = o.width, r.height = o.height
    } else r.left = i._clientX, r.top = i._clientY, r.width = t._width, r.height = t._height;
    return r.right = r.left + r.width, r.bottom = r.top + r.height, r
};
dt.prototype._requestItemScroll = function(t, e, r, i, n, o, a) {
    var s = this._requests[e],
        u = s[t._id];
    u ? (u.element !== r || u.direction !== i) && u.reset() : u = this._requestPool.pick(), u.item = t, u.element = r, u.direction = i, u.threshold = n, u.distance = o, u.maxValue = a, s[t._id] = u
};
dt.prototype._cancelItemScroll = function(t, e) {
    var r = this._requests[e],
        i = r[t._id];
    !i || (i.action && i.action.removeRequest(i), this._requestPool.release(i), delete r[t._id])
};
dt.prototype._checkItemOverlap = function(t, e, r) {
    var i = Ai(t),
        n = lt(i.targets) ? i.targets(t) : i.targets,
        o = i.threshold,
        a = i.safeZone;
    if (!n || !n.length) {
        e && this._cancelItemScroll(t, bt), r && this._cancelItemScroll(t, Ct);
        return
    }
    var s = this._dragDirections[t._id],
        u = s[0],
        h = s[1];
    if (!u && !h) {
        e && this._cancelItemScroll(t, bt), r && this._cancelItemScroll(t, Ct);
        return
    }
    for (var f = this._getItemHandleRect(t, i.handle, Yl), v = zl, S = null, b = null, D = !0, _ = !0, y = 0, I = 0, k = null, L = null, p = 0, O = 0, $ = 0, X = null, N = -1 / 0, M = 0, A = 0, x = null, E = 0, m = 0, R = null, H = -1 / 0, Y = 0, U = 0, q = null, W = 0, et = 0, J = 0; J < n.length; J++) S = n[J], D = e && u && S.axis !== Ct, _ = r && h && S.axis !== bt, I = S.priority || 0, !((!D || I < N) && (!_ || I < H)) && (b = Bl(S.element || S), O = D ? Ul(b) : -1, $ = _ ? Fl(b) : -1, !(!O && !$) && (v = Hl(b, v), y = sn(f, v), !(y <= 0) && (D && I >= N && O > 0 && (I > N || y > A) && (L = null, k = oo(typeof S.threshold == "number" ? S.threshold : o, a, f.width, v.width), u === vi ? (p = v.right + k.offset - f.right, p <= k.value && _i(b) < O && (L = vi)) : u === gi && (p = f.left - (v.left - k.offset), p <= k.value && _i(b) > 0 && (L = gi)), L !== null && (X = b, N = I, M = k.value, A = y, x = L, E = p, m = O)), _ && I >= H && $ > 0 && (I > H || y > U) && (L = null, k = oo(typeof S.threshold == "number" ? S.threshold : o, a, f.height, v.height), h === on ? (p = v.bottom + k.offset - f.bottom, p <= k.value && yi(b) < $ && (L = on)) : h === mi && (p = f.top - (v.top - k.offset), p <= k.value && yi(b) > 0 && (L = mi)), L !== null && (R = b, H = I, Y = k.value, U = y, q = L, W = p, et = $)))));
    e && (X ? this._requestItemScroll(t, bt, X, x, M, E, m) : this._cancelItemScroll(t, bt)), r && (R ? this._requestItemScroll(t, Ct, R, q, Y, W, et) : this._cancelItemScroll(t, Ct))
};
dt.prototype._updateScrollRequest = function(t) {
    for (var e = t.item, r = Ai(e), i = lt(r.targets) ? r.targets(e) : r.targets, n = i && i.length || 0, o = r.threshold, a = r.safeZone, s = this._getItemHandleRect(e, r.handle, Yl), u = zl, h = null, f = null, v = !1, S = null, b = null, D = null, _ = null, y = null, I = null, k = 0; k < n; k++)
        if (h = i[k], f = Bl(h.element || h), f === t.element) {
            if (v = !!(bt & t.direction), v) {
                if (h.axis === Ct) continue
            } else if (h.axis === bt) continue;
            if (y = v ? Ul(f) : Fl(f), y <= 0 || (u = Hl(f, u), S = sn(s, u), S <= 0) || (b = oo(typeof h.threshold == "number" ? h.threshold : o, a, v ? s.width : s.height, v ? u.width : u.height), t.direction === gi ? D = s.left - (u.left - b.offset) : t.direction === vi ? D = u.right + b.offset - s.right : t.direction === mi ? D = s.top - (u.top - b.offset) : D = u.bottom + b.offset - s.bottom, D > b.value) || (_ = v ? _i(f) : yi(f), I = Qr & t.direction ? _ >= y : _ <= 0, I)) break;
            return t.maxValue = y, t.threshold = b.value, t.distance = D, t.isEnding = !1, !0
        } return r.smoothStop === !0 && t.speed > 0 ? (I === null && (I = t.hasReachedEnd()), t.isEnding = !I) : t.isEnding = !1, t.isEnding
};
dt.prototype._updateRequests = function() {
    for (var t = this._items, e = this._requests[bt], r = this._requests[Ct], i, n, o, a, s, u, h, f = 0; f < t.length; f++) i = t[f], a = this._requestOverlapCheck[i._id], s = a > 0 && this._tickTime - a > this._overlapCheckInterval, u = !0, n = e[i._id], n && n.isActive && (u = !this._updateScrollRequest(n), u && (s = !0, this._cancelItemScroll(i, bt))), h = !0, o = r[i._id], o && o.isActive && (h = !this._updateScrollRequest(o), h && (s = !0, this._cancelItemScroll(i, Ct))), s && (this._requestOverlapCheck[i._id] = 0, this._checkItemOverlap(i, u, h))
};
dt.prototype._requestAction = function(t, e) {
    for (var r = this._actions, i = e === bt, n = null, o = 0; o < r.length; o++) {
        if (n = r[o], t.element !== n.element) {
            n = null;
            continue
        }
        if (i ? n.requestX : n.requestY) {
            this._cancelItemScroll(t.item, e);
            return
        }
        break
    }
    n || (n = this._actionPool.pick()), n.element = t.element, n.addRequest(t), t.tick(this._tickDeltaTime), r.push(n)
};
dt.prototype._updateActions = function() {
    var t = this._items,
        e = this._requests,
        r = this._actions,
        i, n, o, a;
    for (a = 0; a < t.length; a++) i = t[a]._id, n = e[bt][i], o = e[Ct][i], n && this._requestAction(n, bt), o && this._requestAction(o, Ct);
    for (a = 0; a < r.length; a++) r[a].computeScrollValues()
};
dt.prototype._applyActions = function() {
    var t = this._actions,
        e = this._items,
        r;
    if (!!t.length) {
        for (r = 0; r < t.length; r++) t[r].scroll(), this._actionPool.release(t[r]);
        for (t.length = 0, r = 0; r < e.length; r++) ng(e[r]);
        for (r = 0; r < e.length; r++) og(e[r])
    }
};
dt.prototype._updateDragDirection = function(t) {
    var e = this._dragPositions[t._id],
        r = this._dragDirections[t._id],
        i = t._drag._left,
        n = t._drag._top;
    if (e.length) {
        var o = e[0],
            a = e[1];
        r[0] = i > o ? vi : i < o ? gi : r[0] || 0, r[1] = n > a ? on : n < a ? mi : r[1] || 0
    }
    e[0] = i, e[1] = n
};
dt.prototype.addItem = function(t) {
    if (!this._isDestroyed) {
        var e = this._items.indexOf(t);
        e === -1 && (this._items.push(t), this._requestOverlapCheck[t._id] = this._tickTime, this._dragDirections[t._id] = [0, 0], this._dragPositions[t._id] = [], this._isTicking || this._startTicking())
    }
};
dt.prototype.updateItem = function(t) {
    this._isDestroyed || !this._dragDirections[t._id] || (this._updateDragDirection(t), this._requestOverlapCheck[t._id] || (this._requestOverlapCheck[t._id] = this._tickTime))
};
dt.prototype.removeItem = function(t) {
    if (!this._isDestroyed) {
        var e = this._items.indexOf(t);
        if (e !== -1) {
            var r = t._id,
                i = this._requests[bt][r];
            i && (this._cancelItemScroll(t, bt), delete this._requests[bt][r]);
            var n = this._requests[Ct][r];
            n && (this._cancelItemScroll(t, Ct), delete this._requests[Ct][r]), delete this._requestOverlapCheck[r], delete this._dragPositions[r], delete this._dragDirections[r], this._items.splice(e, 1), this._isTicking && !this._items.length && this._stopTicking()
        }
    }
};
dt.prototype.isItemScrollingX = function(t) {
    var e = this._requests[bt][t._id];
    return !!(e && e.isActive)
};
dt.prototype.isItemScrollingY = function(t) {
    var e = this._requests[Ct][t._id];
    return !!(e && e.isActive)
};
dt.prototype.isItemScrolling = function(t) {
    return this.isItemScrollingX(t) || this.isItemScrollingY(t)
};
dt.prototype.destroy = function() {
    if (!this._isDestroyed) {
        for (var t = this._items.slice(0), e = 0; e < t.length; e++) this.removeItem(t[e]);
        this._actions.length = 0, this._requestPool.reset(), this._actionPool.reset(), this._isDestroyed = !0
    }
};
var Ir = window.Element.prototype,
    lg = Ir.matches || Ir.matchesSelector || Ir.webkitMatchesSelector || Ir.mozMatchesSelector || Ir.msMatchesSelector || Ir.oMatchesSelector || function() {
        return !1
    };

function An(t, e) {
    return lg.call(t, e)
}

function re(t, e) {
    !e || (t.classList ? t.classList.add(e) : An(t, "." + e) || (t.className += " " + e))
}
var Bs = [],
    cg = "number";

function Bo(t, e, r) {
    var i = typeof r === cg ? r : -1;
    i < 0 && (i = t.length - i + 1), t.splice.apply(t, Bs.concat(i, 0, e)), Bs.length = 0
}

function Vr(t, e, r) {
    var i = Math.max(0, t.length - 1 + (r || 0));
    return e > i ? i : e < 0 ? Math.max(i + e + 1, 0) : e
}

function Xl(t, e, r) {
    if (!(t.length < 2)) {
        var i = Vr(t, e),
            n = Vr(t, r);
        i !== n && t.splice(n, 0, t.splice(i, 1)[0])
    }
}

function Vl(t, e, r) {
    if (!(t.length < 2)) {
        var i = Vr(t, e),
            n = Vr(t, r),
            o;
        i !== n && (o = t[i], t[i] = t[n], t[n] = o)
    }
}
var Te = xn(document.documentElement.style, "transform") || "transform",
    ug = /([A-Z])/g,
    hg = /^(webkit-|moz-|ms-|o-)/,
    fg = /^(-m-s-)/;

function so(t) {
    var e = t.replace(ug, "-$1").toLowerCase();
    return e = e.replace(hg, "-$1"), e = e.replace(fg, "-ms-"), e
}
var ql = so(Te),
    dg = "none",
    pg = "inline",
    gg = "none",
    vg = "display";

function mg(t) {
    var e = Jt(t, ql);
    if (!e || e === dg) return !1;
    var r = Jt(t, vg);
    return !(r === pg || r === gg)
}

function ao(t) {
    for (var e = document, r = t || e; r && r !== e && Jt(r, "position") === "static" && !mg(r);) r = r.parentElement || e;
    return r
}
var Vn = {},
    qn = {},
    pr = {};

function Us(t, e) {
    var r = e || {},
        i;
    return r.left = 0, r.top = 0, t === document || (r.left = window.pageXOffset || 0, r.top = window.pageYOffset || 0, t.self === window.self) || (i = t.getBoundingClientRect(), r.left += i.left, r.top += i.top, r.left += le(t, "border-left-width"), r.top += le(t, "border-top-width")), r
}

function qr(t, e, r) {
    return pr.left = 0, pr.top = 0, t === e || r && (t = ao(t), e = ao(e), t === e) || (Us(t, Vn), Us(e, qn), pr.left = qn.left - Vn.left, pr.top = qn.top - Vn.top), pr
}

function Wn(t) {
    return t === "auto" || t === "scroll" || t === "overlay"
}

function _g(t) {
    return Wn(Jt(t, "overflow")) || Wn(Jt(t, "overflow-x")) || Wn(Jt(t, "overflow-y"))
}

function Fs(t, e) {
    for (e = e || []; t && t !== document;) {
        if (t.getRootNode && t instanceof DocumentFragment) {
            t = t.getRootNode().host;
            continue
        }
        _g(t) && e.push(t), t = t.parentNode
    }
    return e.push(window), e
}
var $r = {},
    yg = "none",
    wg = /^matrix3d/,
    bg = /([^,]*,){4}/,
    xg = /([^,]*,){12}/,
    Eg = /[^,]*,/;

function Ue(t) {
    $r.x = 0, $r.y = 0;
    var e = Jt(t, ql);
    if (!e || e === yg) return $r;
    var r = wg.test(e),
        i = e.replace(r ? xg : bg, ""),
        n = i.replace(Eg, "");
    return $r.x = parseFloat(i) || 0, $r.y = parseFloat(n) || 0, $r
}

function Bt(t, e) {
    !e || (t.classList ? t.classList.remove(e) : An(t, "." + e) && (t.className = (" " + t.className + " ").replace(" " + e + " ", " ").trim()))
}
var Sg = /^(iPad|iPhone|iPod)/.test(window.navigator.platform) || /^Mac/.test(window.navigator.platform) && window.navigator.maxTouchPoints > 1,
    an = 0,
    lo = 1,
    ln = 2,
    Wl = hl() ? {
        passive: !0
    } : !1;

function rt(t) {
    var e = t._element,
        r = t.getGrid(),
        i = r._settings;
    this._item = t, this._gridId = r._id, this._isDestroyed = !1, this._isMigrating = !1, this._startPredicate = lt(i.dragStartPredicate) ? i.dragStartPredicate : rt.defaultStartPredicate, this._startPredicateState = an, this._startPredicateResult = void 0, this._isSortNeeded = !1, this._sortTimer = void 0, this._blockedSortIndex = null, this._sortX1 = 0, this._sortX2 = 0, this._sortY1 = 0, this._sortY2 = 0, this._reset(), this._preStartCheck = this._preStartCheck.bind(this), this._preEndCheck = this._preEndCheck.bind(this), this._onScroll = this._onScroll.bind(this), this._prepareStart = this._prepareStart.bind(this), this._applyStart = this._applyStart.bind(this), this._prepareMove = this._prepareMove.bind(this), this._applyMove = this._applyMove.bind(this), this._prepareScroll = this._prepareScroll.bind(this), this._applyScroll = this._applyScroll.bind(this), this._handleSort = this._handleSort.bind(this), this._handleSortDelayed = this._handleSortDelayed.bind(this), this._handle = i.dragHandle && e.querySelector(i.dragHandle) || e, this._dragger = new z(this._handle, i.dragCssProps), this._dragger.on("start", this._preStartCheck), this._dragger.on("move", this._preStartCheck), this._dragger.on("cancel", this._preEndCheck), this._dragger.on("end", this._preEndCheck)
}
rt.autoScroller = new dt;
rt.defaultStartPredicate = function(t, e, r) {
    var i = t._drag;
    if (e.isFirst && e.srcEvent.button || !Sg && e.isFirst && e.srcEvent.isTrusted === !0 && e.srcEvent.defaultPrevented === !1 && e.srcEvent.cancelable === !1) return !1;
    if (e.isFinal) {
        i._finishStartPredicate(e);
        return
    }
    var n = i._startPredicateData;
    if (!n) {
        var o = r || i._getGrid()._settings.dragStartPredicate || {};
        i._startPredicateData = n = {
            distance: Math.max(o.distance, 0) || 0,
            delay: Math.max(o.delay, 0) || 0
        }
    }
    return n.delay && (n.event = e, n.delayTimer || (n.delayTimer = window.setTimeout(function() {
        n.delay = 0, i._resolveStartPredicate(n.event) && (i._forceResolveStartPredicate(n.event), i._resetStartPredicate())
    }, n.delay))), i._resolveStartPredicate(e)
};
rt.defaultSortPredicate = function() {
    var t = {},
        e = {},
        r = {},
        i = [],
        n = 1,
        o = 100;

    function a(s, u, h) {
        var f = null,
            v = u._settings.dragSort,
            S = -1,
            b, D, _, y, I, k, L, p, O, $;
        if (v === !0 ? (i[0] = u, D = i) : lt(v) && (D = v.call(u, s)), !D || !Array.isArray(D) || !D.length) return f;
        for ($ = 0; $ < D.length; $++)
            if (_ = D[$], !_._isDestroyed) {
                for (_._updateBoundingRect(), k = Math.max(0, _._left), L = Math.max(0, _._top), p = Math.min(window.innerWidth, _._right), O = Math.min(window.innerHeight, _._bottom), y = _._element.parentNode; y && y !== document && y !== document.documentElement && y !== document.body;) {
                    if (y.getRootNode && y instanceof DocumentFragment) {
                        y = y.getRootNode().host;
                        continue
                    }
                    if (Jt(y, "overflow") !== "visible" && (I = y.getBoundingClientRect(), k = Math.max(k, I.left), L = Math.max(L, I.top), p = Math.min(p, I.right), O = Math.min(O, I.bottom)), Jt(y, "position") === "fixed") break;
                    y = y.parentNode
                }
                k >= p || L >= O || (e.left = k, e.top = L, e.width = p - k, e.height = O - L, b = sn(t, e), b > h && b > S && (S = b, f = _))
            } return i.length = 0, f
    }
    return function(s, u) {
        var h = s._drag,
            f = h._getGrid(),
            v = u && typeof u.threshold == "number" ? u.threshold : 50,
            S = u && u.action === ke ? ke : Sr,
            b = u && u.migrateAction === ke ? ke : Sr;
        v = Math.min(Math.max(v, n), o), t.width = s._width, t.height = s._height, t.left = h._clientX, t.top = h._clientY;
        var D = a(s, f, v);
        if (!D) return null;
        var _ = s.getGrid() !== D,
            y = 0,
            I = 0,
            k = 0,
            L = -1,
            p = !1,
            O, $, X;
        for (D === f ? (t.left = h._gridX + s._marginLeft, t.top = h._gridY + s._marginTop) : (D._updateBorders(1, 0, 1, 0), y = D._left + D._borderLeft, I = D._top + D._borderTop), X = 0; X < D._items.length; X++) O = D._items[X], !(!O._isActive || O === s) && (p = !0, e.width = O._width, e.height = O._height, e.left = O._left + O._marginLeft + y, e.top = O._top + O._marginTop + I, $ = sn(t, e), $ > k && (L = X, k = $));
        return _ && k < v && (L = p ? L : 0, k = v), k >= v ? (r.grid = D, r.index = L, r.action = _ ? b : S, r) : null
    }
}();
rt.prototype.stop = function() {
    if (!!this._isActive) {
        if (this._isMigrating) {
            this._finishMigration();
            return
        }
        var t = this._item,
            e = t._id;
        if (rt.autoScroller.removeItem(t), Ll(e), Rl(e), Ol(e), this._cancelSort(), this._isStarted) {
            this._unbindScrollListeners();
            var r = t._element,
                i = this._getGrid(),
                n = i._settings.itemDraggingClass;
            r.parentNode !== i._element && (i._element.appendChild(r), t._setTranslate(this._gridX, this._gridY), n && r.clientWidth), Bt(r, n)
        }
        this._reset()
    }
};
rt.prototype.sort = function(t) {
    var e = this._item;
    this._isActive && e._isActive && this._dragMoveEvent && (t === !0 ? this._handleSort() : kn(e._id, this._handleSort))
};
rt.prototype.destroy = function() {
    this._isDestroyed || (this.stop(), this._dragger.destroy(), rt.autoScroller.removeItem(this._item), this._isDestroyed = !0)
};
rt.prototype._getGrid = function() {
    return wn[this._gridId] || null
};
rt.prototype._reset = function() {
    this._isActive = !1, this._isStarted = !1, this._container = null, this._containingBlock = null, this._dragStartEvent = null, this._dragMoveEvent = null, this._dragPrevMoveEvent = null, this._scrollEvent = null, this._scrollers = [], this._left = 0, this._top = 0, this._gridX = 0, this._gridY = 0, this._clientX = 0, this._clientY = 0, this._scrollDiffX = 0, this._scrollDiffY = 0, this._moveDiffX = 0, this._moveDiffY = 0, this._containerDiffX = 0, this._containerDiffY = 0
};
rt.prototype._bindScrollListeners = function() {
    var t = this._getGrid()._element,
        e = this._container,
        r = this._scrollers,
        i, n;
    if (r.length = 0, Fs(this._item._element.parentNode, r), e !== t)
        for (i = [], Fs(t, i), n = 0; n < i.length; n++) r.indexOf(i[n]) < 0 && r.push(i[n]);
    for (n = 0; n < r.length; n++) r[n].addEventListener("scroll", this._onScroll, Wl)
};
rt.prototype._unbindScrollListeners = function() {
    var t = this._scrollers,
        e;
    for (e = 0; e < t.length; e++) t[e].removeEventListener("scroll", this._onScroll, Wl);
    t.length = 0
};
rt.prototype._resolveStartPredicate = function(t) {
    var e = this._startPredicateData;
    if (!(t.distance < e.distance || e.delay)) return this._resetStartPredicate(), !0
};
rt.prototype._forceResolveStartPredicate = function(t) {
    !this._isDestroyed && this._startPredicateState === lo && (this._startPredicateState = ln, this._onStart(t))
};
rt.prototype._finishStartPredicate = function(t) {
    var e = this._item._element,
        r = Math.abs(t.deltaX) < 2 && Math.abs(t.deltaY) < 2 && t.deltaTime < 200;
    this._resetStartPredicate(), r && kg(e)
};
rt.prototype._resetHeuristics = function(t, e) {
    this._blockedSortIndex = null, this._sortX1 = this._sortX2 = t, this._sortY1 = this._sortY2 = e
};
rt.prototype._checkHeuristics = function(t, e) {
    var r = this._getGrid()._settings.dragSortHeuristics,
        i = r.minDragDistance;
    if (i <= 0) return this._blockedSortIndex = null, !0;
    var n = t - this._sortX2,
        o = e - this._sortY2,
        a = i > 3 && r.minBounceBackAngle > 0;
    if (a || (this._blockedSortIndex = null), Math.abs(n) > i || Math.abs(o) > i) {
        if (a) {
            var s = Math.atan2(n, o),
                u = Math.atan2(this._sortX2 - this._sortX1, this._sortY2 - this._sortY1),
                h = Math.atan2(Math.sin(s - u), Math.cos(s - u));
            Math.abs(h) > r.minBounceBackAngle && (this._blockedSortIndex = null)
        }
        return this._sortX1 = this._sortX2, this._sortY1 = this._sortY2, this._sortX2 = t, this._sortY2 = e, !0
    }
    return !1
};
rt.prototype._resetStartPredicate = function() {
    var t = this._startPredicateData;
    t && (t.delayTimer && (t.delayTimer = window.clearTimeout(t.delayTimer)), this._startPredicateData = null)
};
rt.prototype._handleSort = function() {
    if (!!this._isActive) {
        var t = this._getGrid()._settings;
        if (!t.dragSort || !t.dragAutoScroll.sortDuringScroll && rt.autoScroller.isItemScrolling(this._item)) {
            this._sortX1 = this._sortX2 = this._gridX, this._sortY1 = this._sortY2 = this._gridY, this._isSortNeeded = !0, this._sortTimer !== void 0 && (this._sortTimer = window.clearTimeout(this._sortTimer));
            return
        }
        var e = this._checkHeuristics(this._gridX, this._gridY);
        if (!(!this._isSortNeeded && !e)) {
            var r = t.dragSortHeuristics.sortInterval;
            r <= 0 || this._isSortNeeded ? (this._isSortNeeded = !1, this._sortTimer !== void 0 && (this._sortTimer = window.clearTimeout(this._sortTimer)), this._checkOverlap()) : this._sortTimer === void 0 && (this._sortTimer = window.setTimeout(this._handleSortDelayed, r))
        }
    }
};
rt.prototype._handleSortDelayed = function() {
    this._isSortNeeded = !0, this._sortTimer = void 0, kn(this._item._id, this._handleSort)
};
rt.prototype._cancelSort = function() {
    this._isSortNeeded = !1, this._sortTimer !== void 0 && (this._sortTimer = window.clearTimeout(this._sortTimer)), jp(this._item._id)
};
rt.prototype._finishSort = function() {
    var t = this._getGrid()._settings.dragSort,
        e = t && (this._isSortNeeded || this._sortTimer !== void 0);
    this._cancelSort(), e && this._checkOverlap()
};
rt.prototype._checkOverlap = function() {
    if (!!this._isActive) {
        var t = this._item,
            e = this._getGrid()._settings,
            r, i, n, o, a, s, u, h;
        lt(e.dragSortPredicate) ? r = e.dragSortPredicate(t, this._dragMoveEvent) : r = rt.defaultSortPredicate(t, e.dragSortPredicate), !(!r || typeof r.index != "number") && (u = r.action === ke ? ke : Sr, i = t.getGrid(), o = r.grid || i, h = i !== o, n = i._items.indexOf(t), a = Vr(o._items, r.index, h && u === Sr ? 1 : 0), !(!h && a === this._blockedSortIndex) && (h ? (this._blockedSortIndex = null, s = o._items[a], i._hasListeners(sr) && i._emit(sr, {
            item: t,
            fromGrid: i,
            fromIndex: n,
            toGrid: o,
            toIndex: a
        }), o._hasListeners(nn) && o._emit(nn, {
            item: t,
            fromGrid: i,
            fromIndex: n,
            toGrid: o,
            toIndex: a
        }), t._gridId = o._id, this._isMigrating = t._gridId !== this._gridId, i._items.splice(n, 1), Bo(o._items, t, a), t._sortData = null, i._hasListeners(en) && i._emit(en, {
            item: t,
            fromGrid: i,
            fromIndex: n,
            toGrid: o,
            toIndex: a
        }), o._hasListeners(rn) && o._emit(rn, {
            item: t,
            fromGrid: i,
            fromIndex: n,
            toGrid: o,
            toIndex: a
        }), u === ke && s && s.isActive() && o._items.indexOf(s) > -1 && o.send(s, i, n, {
            appendTo: this._container || document.body,
            layoutSender: !1,
            layoutReceiver: !1
        }), i.layout(), o.layout()) : n !== a && (this._blockedSortIndex = n, (u === ke ? Vl : Xl)(i._items, n, a), i._hasListeners(tn) && i._emit(tn, {
            item: t,
            fromIndex: n,
            toIndex: a,
            action: u
        }), i.layout())))
    }
};
rt.prototype._finishMigration = function() {
    var t = this._item,
        e = t._dragRelease,
        r = t._element,
        i = t._isActive,
        n = t.getGrid(),
        o = n._element,
        a = n._settings,
        s = a.dragContainer || o,
        u = this._getGrid()._settings,
        h = r.parentNode,
        f = i ? u.itemVisibleClass : u.itemHiddenClass,
        v = i ? a.itemVisibleClass : a.itemHiddenClass,
        S, b;
    this._isMigrating = !1, this.destroy(), u.itemClass !== a.itemClass && (Bt(r, u.itemClass), re(r, a.itemClass)), f !== v && (Bt(r, f), re(r, v)), s !== h && (s.appendChild(r), b = qr(h, s, !0), S = Ue(r), S.x -= b.left, S.y -= b.top), t._refreshDimensions(), b = qr(s, o, !0), e._containerDiffX = b.left, e._containerDiffY = b.top, t._drag = a.dragEnabled ? new rt(t) : null, s !== h && t._setTranslate(S.x, S.y), t._visibility.setStyles(i ? a.visibleStyles : a.hiddenStyles), e.start()
};
rt.prototype._preStartCheck = function(t) {
    this._startPredicateState === an && (this._startPredicateState = lo), this._startPredicateState === lo ? (this._startPredicateResult = this._startPredicate(this._item, t), this._startPredicateResult === !0 ? (this._startPredicateState = ln, this._onStart(t)) : this._startPredicateResult === !1 && (this._resetStartPredicate(t), this._dragger._reset(), this._startPredicateState = an)) : this._startPredicateState === ln && this._isActive && this._onMove(t)
};
rt.prototype._preEndCheck = function(t) {
    var e = this._startPredicateState === ln;
    this._startPredicate(this._item, t), this._startPredicateState = an, !(!e || !this._isActive) && (this._isStarted ? this._onEnd(t) : this.stop())
};
rt.prototype._onStart = function(t) {
    var e = this._item;
    !e._isActive || (this._isActive = !0, this._dragStartEvent = t, rt.autoScroller.addItem(e), qp(e._id, this._prepareStart, this._applyStart))
};
rt.prototype._prepareStart = function() {
    if (!!this._isActive) {
        var t = this._item;
        if (!!t._isActive) {
            var e = t._element,
                r = this._getGrid(),
                i = r._settings,
                n = r._element,
                o = i.dragContainer || n,
                a = ao(o),
                s = Ue(e),
                u = e.getBoundingClientRect(),
                h = o !== n;
            if (this._container = o, this._containingBlock = a, this._clientX = u.left, this._clientY = u.top, this._left = this._gridX = s.x, this._top = this._gridY = s.y, this._scrollDiffX = this._scrollDiffY = 0, this._moveDiffX = this._moveDiffY = 0, this._resetHeuristics(this._gridX, this._gridY), h) {
                var f = qr(a, n);
                this._containerDiffX = f.left, this._containerDiffY = f.top
            }
        }
    }
};
rt.prototype._applyStart = function() {
    if (!!this._isActive) {
        var t = this._item;
        if (!!t._isActive) {
            var e = this._getGrid(),
                r = t._element,
                i = t._dragRelease,
                n = t._migrate,
                o = this._container !== e._element;
            t.isPositioning() && t._layout.stop(!0, this._left, this._top), n._isActive && (this._left -= n._containerDiffX, this._top -= n._containerDiffY, this._gridX -= n._containerDiffX, this._gridY -= n._containerDiffY, n.stop(!0, this._left, this._top)), t.isReleasing() && i._reset(), e._settings.dragPlaceholder.enabled && t._dragPlaceholder.create(), this._isStarted = !0, e._emit(Tp, t, this._dragStartEvent), o && (r.parentNode === this._container ? (this._gridX -= this._containerDiffX, this._gridY -= this._containerDiffY) : (this._left += this._containerDiffX, this._top += this._containerDiffY, this._container.appendChild(r), t._setTranslate(this._left, this._top))), re(r, e._settings.itemDraggingClass), this._bindScrollListeners(), e._emit(Dp, t, this._dragStartEvent)
        }
    }
};
rt.prototype._onMove = function(t) {
    var e = this._item;
    if (!e._isActive) {
        this.stop();
        return
    }
    this._dragMoveEvent = t, Wp(e._id, this._prepareMove, this._applyMove), kn(e._id, this._handleSort)
};
rt.prototype._prepareMove = function() {
    if (!!this._isActive) {
        var t = this._item;
        if (!!t._isActive) {
            var e = this._getGrid()._settings,
                r = e.dragAxis,
                i = this._dragMoveEvent,
                n = this._dragPrevMoveEvent || this._dragStartEvent || i;
            if (r !== "y") {
                var o = i.clientX - n.clientX;
                this._left = this._left - this._moveDiffX + o, this._gridX = this._gridX - this._moveDiffX + o, this._clientX = this._clientX - this._moveDiffX + o, this._moveDiffX = o
            }
            if (r !== "x") {
                var a = i.clientY - n.clientY;
                this._top = this._top - this._moveDiffY + a, this._gridY = this._gridY - this._moveDiffY + a, this._clientY = this._clientY - this._moveDiffY + a, this._moveDiffY = a
            }
            this._dragPrevMoveEvent = i
        }
    }
};
rt.prototype._applyMove = function() {
    if (!!this._isActive) {
        var t = this._item;
        !t._isActive || (this._moveDiffX = this._moveDiffY = 0, t._setTranslate(this._left, this._top), this._getGrid()._emit(Ip, t, this._dragMoveEvent), rt.autoScroller.updateItem(t))
    }
};
rt.prototype._onScroll = function(t) {
    var e = this._item;
    if (!e._isActive) {
        this.stop();
        return
    }
    this._scrollEvent = t, Gp(e._id, this._prepareScroll, this._applyScroll), kn(e._id, this._handleSort)
};
rt.prototype._prepareScroll = function() {
    if (!!this._isActive) {
        var t = this._item;
        if (!!t._isActive) {
            var e = t._element,
                r = this._getGrid(),
                i = r._element,
                n = e.getBoundingClientRect();
            if (this._container !== i) {
                var o = qr(this._containingBlock, i);
                this._containerDiffX = o.left, this._containerDiffY = o.top
            }
            var a = this._clientX - this._moveDiffX - n.left;
            this._left = this._left - this._scrollDiffX + a, this._scrollDiffX = a;
            var s = this._clientY - this._moveDiffY - n.top;
            this._top = this._top - this._scrollDiffY + s, this._scrollDiffY = s, this._gridX = this._left - this._containerDiffX, this._gridY = this._top - this._containerDiffY
        }
    }
};
rt.prototype._applyScroll = function() {
    if (!!this._isActive) {
        var t = this._item;
        !t._isActive || (this._scrollDiffX = this._scrollDiffY = 0, t._setTranslate(this._left, this._top), this._getGrid()._emit($p, t, this._scrollEvent))
    }
};
rt.prototype._onEnd = function(t) {
    var e = this._item,
        r = e._element,
        i = this._getGrid(),
        n = i._settings,
        o = e._dragRelease;
    if (!e._isActive) {
        this.stop();
        return
    }
    Ll(e._id), Rl(e._id), Ol(e._id), this._finishSort(), this._unbindScrollListeners(), o._containerDiffX = this._containerDiffX, o._containerDiffY = this._containerDiffY, this._reset(), Bt(r, n.itemDraggingClass), rt.autoScroller.removeItem(e), i._emit(Pp, e, t), this._isMigrating ? this._finishMigration() : o.start()
};

function kg(t) {
    if (t.tagName.toLowerCase() === "a") {
        var e = t.getAttribute("href");
        if (!!e) {
            var r = t.getAttribute("target");
            r && r !== "_self" ? window.open(e, r) : window.location.href = e
        }
    }
}

function Gl(t, e) {
    var r = {},
        i, n;
    if (Array.isArray(e))
        for (n = 0; n < e.length; n++) i = e[n], r[i] = Jt(t, so(i));
    else
        for (i in e) r[i] = Jt(t, so(i));
    return r
}
var Ag = /^(webkit|moz|ms|o|Webkit|Moz|MS|O)(?=[A-Z])/,
    Hs = {};

function Cg(t) {
    var e = Hs[t];
    return e || (e = t.replace(Ag, ""), e !== t && (e = e[0].toLowerCase() + e.slice(1)), Hs[t] = e, e)
}
var Tg = "[native code]";

function Dg(t) {
    var e = window.Symbol;
    return !!(t && lt(e) && lt(e.toString) && e(t).toString().indexOf(Tg) > -1)
}

function Wr(t, e) {
    for (var r in e) t.style[r] = e[r]
}
var Ig = !!(Element && lt(Element.prototype.animate)),
    Ys = !!(Element && Dg(Element.prototype.animate));

function Ie(t) {
    this._element = t, this._animation = null, this._duration = 0, this._easing = "", this._callback = null, this._props = [], this._values = [], this._isDestroyed = !1, this._onFinish = this._onFinish.bind(this)
}
Ie.prototype.start = function(t, e, r) {
    if (!this._isDestroyed) {
        var i = this._element,
            n = r || {};
        if (!Ig) {
            Wr(i, e), this._callback = lt(n.onFinish) ? n.onFinish : null, this._onFinish();
            return
        }
        var o = this._animation,
            a = this._props,
            s = this._values,
            u = n.duration || 300,
            h = n.easing || "ease",
            f = !1,
            v, S, b;
        if (o && (S = 0, (u !== this._duration || h !== this._easing) && (f = !0), !f)) {
            for (v in e)
                if (++S, b = a.indexOf(v), b === -1 || e[v] !== s[b]) {
                    f = !0;
                    break
                } S !== a.length && (f = !0)
        }
        if (f && o.cancel(), this._callback = lt(n.onFinish) ? n.onFinish : null, !(o && !f)) {
            a.length = s.length = 0;
            for (v in e) a.push(v), s.push(e[v]);
            this._duration = u, this._easing = h, this._animation = i.animate([zs(t, Ys), zs(e, Ys)], {
                duration: u,
                easing: h
            }), this._animation.onfinish = this._onFinish, Wr(i, e)
        }
    }
};
Ie.prototype.stop = function() {
    this._isDestroyed || !this._animation || (this._animation.cancel(), this._animation = this._callback = null, this._props.length = this._values.length = 0)
};
Ie.prototype.getCurrentStyles = function() {
    return Gl(element, currentProps)
};
Ie.prototype.isAnimating = function() {
    return !!this._animation
};
Ie.prototype.destroy = function() {
    this._isDestroyed || (this.stop(), this._element = null, this._isDestroyed = !0)
};
Ie.prototype._onFinish = function() {
    var t = this._callback;
    this._animation = this._callback = null, this._props.length = this._values.length = 0, t && t()
};

function zs(t, e) {
    var r = {};
    for (var i in t) r[e ? i : Cg(i)] = t[i];
    return r
}

function ir(t, e) {
    return "translateX(" + t + "px) translateY(" + e + "px)"
}

function Yt(t) {
    this._item = t, this._animation = new Ie, this._element = null, this._className = "", this._didMigrate = !1, this._resetAfterLayout = !1, this._left = 0, this._top = 0, this._transX = 0, this._transY = 0, this._nextTransX = 0, this._nextTransY = 0, this._setupAnimation = this._setupAnimation.bind(this), this._startAnimation = this._startAnimation.bind(this), this._updateDimensions = this._updateDimensions.bind(this), this._onLayoutStart = this._onLayoutStart.bind(this), this._onLayoutEnd = this._onLayoutEnd.bind(this), this._onReleaseEnd = this._onReleaseEnd.bind(this), this._onMigrate = this._onMigrate.bind(this), this._onHide = this._onHide.bind(this)
}
Yt.prototype._updateDimensions = function() {
    !this.isActive() || Wr(this._element, {
        width: this._item._width + "px",
        height: this._item._height + "px"
    })
};
Yt.prototype._onLayoutStart = function(t, e) {
    var r = this._item;
    if (t.indexOf(r) === -1) {
        this.reset();
        return
    }
    var i = r._left,
        n = r._top,
        o = this._left,
        a = this._top;
    if (this._left = i, this._top = n, !(!e && !this._didMigrate && o === i && a === n)) {
        var s = i + r._marginLeft,
            u = n + r._marginTop,
            h = r.getGrid(),
            f = !e && h._settings.layoutDuration > 0;
        if (!f || this._didMigrate) {
            Ml(r._id), this._element.style[Te] = ir(s, u), this._animation.stop(), this._didMigrate && (h.getElement().appendChild(this._element), this._didMigrate = !1);
            return
        }
        this._nextTransX = s, this._nextTransY = u, Zp(r._id, this._setupAnimation, this._startAnimation)
    }
};
Yt.prototype._setupAnimation = function() {
    if (!!this.isActive()) {
        var t = Ue(this._element);
        this._transX = t.x, this._transY = t.y
    }
};
Yt.prototype._startAnimation = function() {
    if (!!this.isActive()) {
        var t = this._animation,
            e = this._transX,
            r = this._transY,
            i = this._nextTransX,
            n = this._nextTransY;
        if (e === i && r === n) {
            t.isAnimating() && (this._element.style[Te] = ir(i, n), t.stop());
            return
        }
        var o = this._item.getGrid()._settings,
            a = {},
            s = {};
        a[Te] = ir(e, r), s[Te] = ir(i, n), t.start(a, s, {
            duration: o.layoutDuration,
            easing: o.layoutEasing,
            onFinish: this._onLayoutEnd
        })
    }
};
Yt.prototype._onLayoutEnd = function() {
    this._resetAfterLayout && this.reset()
};
Yt.prototype._onReleaseEnd = function(t) {
    if (t._id === this._item._id) {
        if (!this._animation.isAnimating()) {
            this.reset();
            return
        }
        this._resetAfterLayout = !0
    }
};
Yt.prototype._onMigrate = function(t) {
    if (t.item === this._item) {
        var e = this._item.getGrid(),
            r = t.toGrid;
        e.off(pi, this._onReleaseEnd), e.off(or, this._onLayoutStart), e.off(sr, this._onMigrate), e.off(di, this._onHide), r.on(pi, this._onReleaseEnd), r.on(or, this._onLayoutStart), r.on(sr, this._onMigrate), r.on(di, this._onHide), this._didMigrate = !0
    }
};
Yt.prototype._onHide = function(t) {
    t.indexOf(this._item) > -1 && this.reset()
};
Yt.prototype.create = function() {
    if (this.isActive()) {
        this._resetAfterLayout = !1;
        return
    }
    var t = this._item,
        e = t.getGrid(),
        r = e._settings,
        i = this._animation;
    this._left = t._left, this._top = t._top;
    var n;
    lt(r.dragPlaceholder.createElement) ? n = r.dragPlaceholder.createElement(t) : n = document.createElement("div"), this._element = n, i._element = n, this._className = r.itemPlaceholderClass || "", this._className && re(n, this._className), Wr(n, {
        position: "absolute",
        left: "0px",
        top: "0px",
        width: t._width + "px",
        height: t._height + "px"
    }), n.style[Te] = ir(t._left + t._marginLeft, t._top + t._marginTop), e.on(or, this._onLayoutStart), e.on(pi, this._onReleaseEnd), e.on(sr, this._onMigrate), e.on(di, this._onHide), lt(r.dragPlaceholder.onCreate) && r.dragPlaceholder.onCreate(t, n), e.getElement().appendChild(n)
};
Yt.prototype.reset = function() {
    if (!!this.isActive()) {
        var t = this._element,
            e = this._item,
            r = e.getGrid(),
            i = r._settings,
            n = this._animation;
        this._resetAfterLayout = !1, Ml(e._id), Kp(e._id), n.stop(), n._element = null, r.off(pi, this._onReleaseEnd), r.off(or, this._onLayoutStart), r.off(sr, this._onMigrate), r.off(di, this._onHide), this._className && (Bt(t, this._className), this._className = ""), t.parentNode.removeChild(t), this._element = null, lt(i.dragPlaceholder.onRemove) && i.dragPlaceholder.onRemove(e, t)
    }
};
Yt.prototype.isActive = function() {
    return !!this._element
};
Yt.prototype.getElement = function() {
    return this._element
};
Yt.prototype.updateDimensions = function() {
    !this.isActive() || Qp(this._item._id, this._updateDimensions)
};
Yt.prototype.destroy = function() {
    this.reset(), this._animation.destroy(), this._item = this._animation = null
};

function fr(t) {
    this._item = t, this._isActive = !1, this._isDestroyed = !1, this._isPositioningStarted = !1, this._containerDiffX = 0, this._containerDiffY = 0
}
fr.prototype.start = function() {
    if (!(this._isDestroyed || this._isActive)) {
        var t = this._item,
            e = t.getGrid(),
            r = e._settings;
        this._isActive = !0, re(t._element, r.itemReleasingClass), r.dragRelease.useDragContainer || this._placeToGrid(), e._emit(Lp, t), e._nextLayoutData || t._layout.start(!1)
    }
};
fr.prototype.stop = function(t, e, r) {
    if (!(this._isDestroyed || !this._isActive)) {
        var i = this._item,
            n = i.getGrid();
        !t && (e === void 0 || r === void 0) && (e = i._left, r = i._top);
        var o = this._placeToGrid(e, r);
        this._reset(o), t || n._emit(pi, i)
    }
};
fr.prototype.isJustReleased = function() {
    return this._isActive && this._isPositioningStarted === !1
};
fr.prototype.destroy = function() {
    this._isDestroyed || (this.stop(!0), this._item = null, this._isDestroyed = !0)
};
fr.prototype._placeToGrid = function(t, e) {
    if (!this._isDestroyed) {
        var r = this._item,
            i = r._element,
            n = r.getGrid()._element,
            o = !1;
        if (i.parentNode !== n) {
            if (t === void 0 || e === void 0) {
                var a = Ue(i);
                t = a.x - this._containerDiffX, e = a.y - this._containerDiffY
            }
            n.appendChild(i), r._setTranslate(t, e), o = !0
        }
        return this._containerDiffX = 0, this._containerDiffY = 0, o
    }
};
fr.prototype._reset = function(t) {
    if (!this._isDestroyed) {
        var e = this._item,
            r = e.getGrid()._settings.itemReleasingClass;
        this._isActive = !1, this._isPositioningStarted = !1, this._containerDiffX = 0, this._containerDiffY = 0, r && (t && e._element.clientWidth, Bt(e._element, r))
    }
};
var Xs = 2;

function Ye(t) {
    var e = t._element,
        r = e.style;
    this._item = t, this._isActive = !1, this._isDestroyed = !1, this._isInterrupted = !1, this._currentStyles = {}, this._targetStyles = {}, this._nextLeft = 0, this._nextTop = 0, this._offsetLeft = 0, this._offsetTop = 0, this._skipNextAnimation = !1, this._animOptions = {
        onFinish: this._finish.bind(this),
        duration: 0,
        easing: 0
    }, r.left = "0px", r.top = "0px", t._setTranslate(0, 0), this._animation = new Ie(e), this._queue = "layout-" + t._id, this._setupAnimation = this._setupAnimation.bind(this), this._startAnimation = this._startAnimation.bind(this)
}
Ye.prototype.start = function(t, e) {
    if (!this._isDestroyed) {
        var r = this._item,
            i = r._dragRelease,
            n = r.getGrid()._settings,
            o = this._isActive,
            a = i.isJustReleased(),
            s = a ? n.dragRelease.duration : n.layoutDuration,
            u = a ? n.dragRelease.easing : n.layoutEasing,
            h = !t && !this._skipNextAnimation && s > 0;
        if (o && ($l(r._id), r._emitter.burst(this._queue, !0, r)), a && (i._isPositioningStarted = !0), lt(e) && r._emitter.on(this._queue, e), this._skipNextAnimation = !1, !h) {
            this._updateOffsets(), r._setTranslate(this._nextLeft, this._nextTop), this._animation.stop(), this._finish();
            return
        }
        this._animation.isAnimating() && (this._animation._animation.onfinish = null), this._isActive = !0, this._animOptions.easing = u, this._animOptions.duration = s, this._isInterrupted = o, Xp(r._id, this._setupAnimation, this._startAnimation)
    }
};
Ye.prototype.stop = function(t, e, r) {
    if (!(this._isDestroyed || !this._isActive)) {
        var i = this._item;
        if ($l(i._id), this._animation.isAnimating()) {
            if (e === void 0 || r === void 0) {
                var n = Ue(i._element);
                e = n.x, r = n.y
            }
            i._setTranslate(e, r), this._animation.stop()
        }
        Bt(i._element, i.getGrid()._settings.itemPositioningClass), this._isActive = !1, t && i._emitter.burst(this._queue, !0, i)
    }
};
Ye.prototype.destroy = function() {
    if (!this._isDestroyed) {
        var t = this._item._element.style;
        this.stop(!0, 0, 0), this._item._emitter.clear(this._queue), this._animation.destroy(), t[Te] = "", t.left = "", t.top = "", this._item = null, this._currentStyles = null, this._targetStyles = null, this._animOptions = null, this._isDestroyed = !0
    }
};
Ye.prototype._updateOffsets = function() {
    if (!this._isDestroyed) {
        var t = this._item,
            e = t._migrate,
            r = t._dragRelease;
        this._offsetLeft = r._isActive ? r._containerDiffX : e._isActive ? e._containerDiffX : 0, this._offsetTop = r._isActive ? r._containerDiffY : e._isActive ? e._containerDiffY : 0, this._nextLeft = this._item._left + this._offsetLeft, this._nextTop = this._item._top + this._offsetTop
    }
};
Ye.prototype._finish = function() {
    if (!this._isDestroyed) {
        var t = this._item,
            e = t._migrate,
            r = t._dragRelease;
        t._tX = this._nextLeft, t._tY = this._nextTop, this._isActive && (this._isActive = !1, Bt(t._element, t.getGrid()._settings.itemPositioningClass)), r._isActive && r.stop(), e._isActive && e.stop(), t._emitter.burst(this._queue, !1, t)
    }
};
Ye.prototype._setupAnimation = function() {
    var t = this._item;
    if (t._tX === void 0 || t._tY === void 0) {
        var e = Ue(t._element);
        t._tX = e.x, t._tY = e.y
    }
};
Ye.prototype._startAnimation = function() {
    var t = this._item,
        e = t.getGrid()._settings,
        r = this._animOptions.duration <= 0;
    this._updateOffsets();
    var i = Math.abs(t._left - (t._tX - this._offsetLeft)),
        n = Math.abs(t._top - (t._tY - this._offsetTop));
    if (r || i < Xs && n < Xs) {
        (i || n || this._isInterrupted) && t._setTranslate(this._nextLeft, this._nextTop), this._animation.stop(), this._finish();
        return
    }
    this._isInterrupted || re(t._element, e.itemPositioningClass), this._currentStyles[Te] = ir(t._tX, t._tY), this._targetStyles[Te] = ir(this._nextLeft, this._nextTop), t._tX = t._tY = void 0, this._animation.start(this._currentStyles, this._targetStyles, this._animOptions)
};

function Ci(t) {
    this._item = t, this._isActive = !1, this._isDestroyed = !1, this._container = !1, this._containerDiffX = 0, this._containerDiffY = 0
}
Ci.prototype.start = function(t, e, r) {
    if (!this._isDestroyed) {
        var i = this._item,
            n = i._element,
            o = i.isActive(),
            a = i.isVisible(),
            s = i.getGrid(),
            u = s._settings,
            h = t._settings,
            f = t._element,
            v = t._items,
            S = s._items.indexOf(i),
            b = r || document.body,
            D, _, y, I, k, L, p, O, $, X;
        if (typeof e == "number") D = Vr(v, e, 1);
        else {
            if (_ = t.getItem(e), !_) return;
            D = v.indexOf(_)
        }(i.isPositioning() || this._isActive || i.isReleasing()) && (L = Ue(n), p = L.x, O = L.y), i.isPositioning() && i._layout.stop(!0, p, O), this._isActive && (p -= this._containerDiffX, O -= this._containerDiffY, this.stop(!0, p, O)), i.isReleasing() && (p -= i._dragRelease._containerDiffX, O -= i._dragRelease._containerDiffY, i._dragRelease.stop(!0, p, O)), i._visibility.stop(!0), i._drag && i._drag.destroy(), s._hasListeners(sr) && s._emit(sr, {
            item: i,
            fromGrid: s,
            fromIndex: S,
            toGrid: t,
            toIndex: D
        }), t._hasListeners(nn) && t._emit(nn, {
            item: i,
            fromGrid: s,
            fromIndex: S,
            toGrid: t,
            toIndex: D
        }), u.itemClass !== h.itemClass && (Bt(n, u.itemClass), re(n, h.itemClass)), $ = a ? u.itemVisibleClass : u.itemHiddenClass, X = a ? h.itemVisibleClass : h.itemHiddenClass, $ !== X && (Bt(n, $), re(n, X)), s._items.splice(S, 1), Bo(v, i, D), i._gridId = t._id, o ? (y = n.parentNode, b !== y && (b.appendChild(n), I = qr(b, y, !0), L || (L = Ue(n), p = L.x, O = L.y), i._setTranslate(p + I.left, O + I.top))) : f.appendChild(n), i._visibility.setStyles(a ? h.visibleStyles : h.hiddenStyles), o && (k = qr(b, f, !0)), i._refreshDimensions(), i._sortData = null, i._drag = h.dragEnabled ? new rt(i) : null, o ? (this._isActive = !0, this._container = b, this._containerDiffX = k.left, this._containerDiffY = k.top) : (this._isActive = !1, this._container = null, this._containerDiffX = 0, this._containerDiffY = 0), s._hasListeners(en) && s._emit(en, {
            item: i,
            fromGrid: s,
            fromIndex: S,
            toGrid: t,
            toIndex: D
        }), t._hasListeners(rn) && t._emit(rn, {
            item: i,
            fromGrid: s,
            fromIndex: S,
            toGrid: t,
            toIndex: D
        })
    }
};
Ci.prototype.stop = function(t, e, r) {
    if (!(this._isDestroyed || !this._isActive)) {
        var i = this._item,
            n = i._element,
            o = i.getGrid(),
            a = o._element,
            s;
        this._container !== a && ((e === void 0 || r === void 0) && (t ? (s = Ue(n), e = s.x - this._containerDiffX, r = s.y - this._containerDiffY) : (e = i._left, r = i._top)), a.appendChild(n), i._setTranslate(e, r)), this._isActive = !1, this._container = null, this._containerDiffX = 0, this._containerDiffY = 0
    }
};
Ci.prototype.destroy = function() {
    this._isDestroyed || (this.stop(!0), this._item = null, this._isDestroyed = !0)
};

function we(t) {
    var e = t._isActive,
        r = t._element,
        i = r.children[0],
        n = t.getGrid()._settings;
    if (!i) throw new Error("No valid child element found within item element.");
    this._item = t, this._isDestroyed = !1, this._isHidden = !e, this._isHiding = !1, this._isShowing = !1, this._childElement = i, this._currentStyleProps = [], this._animation = new Ie(i), this._queue = "visibility-" + t._id, this._finishShow = this._finishShow.bind(this), this._finishHide = this._finishHide.bind(this), r.style.display = e ? "" : "none", re(r, e ? n.itemVisibleClass : n.itemHiddenClass), this.setStyles(e ? n.visibleStyles : n.hiddenStyles)
}
we.prototype.show = function(t, e) {
    if (!this._isDestroyed) {
        var r = this._item,
            i = r._element,
            n = lt(e) ? e : null,
            o = r.getGrid(),
            a = o._settings;
        if (!this._isShowing && !this._isHidden) {
            n && n(!1, r);
            return
        }
        if (this._isShowing && !t) {
            n && r._emitter.on(this._queue, n);
            return
        }
        this._isShowing || (r._emitter.burst(this._queue, !0, r), Bt(i, a.itemHiddenClass), re(i, a.itemVisibleClass), this._isHiding || (i.style.display = "")), n && r._emitter.on(this._queue, n), this._isShowing = !0, this._isHiding = this._isHidden = !1, this._startAnimation(!0, t, this._finishShow)
    }
};
we.prototype.hide = function(t, e) {
    if (!this._isDestroyed) {
        var r = this._item,
            i = r._element,
            n = lt(e) ? e : null,
            o = r.getGrid(),
            a = o._settings;
        if (!this._isHiding && this._isHidden) {
            n && n(!1, r);
            return
        }
        if (this._isHiding && !t) {
            n && r._emitter.on(this._queue, n);
            return
        }
        this._isHiding || (r._emitter.burst(this._queue, !0, r), re(i, a.itemHiddenClass), Bt(i, a.itemVisibleClass)), n && r._emitter.on(this._queue, n), this._isHidden = this._isHiding = !0, this._isShowing = !1, this._startAnimation(!1, t, this._finishHide)
    }
};
we.prototype.stop = function(t) {
    if (!this._isDestroyed && !(!this._isHiding && !this._isShowing)) {
        var e = this._item;
        Pl(e._id), this._animation.stop(), t && e._emitter.burst(this._queue, !0, e)
    }
};
we.prototype.setStyles = function(t) {
    var e = this._childElement,
        r = this._currentStyleProps;
    this._removeCurrentStyles();
    for (var i in t) r.push(i), e.style[i] = t[i]
};
we.prototype.destroy = function() {
    if (!this._isDestroyed) {
        var t = this._item,
            e = t._element,
            r = t.getGrid(),
            i = r._settings;
        this.stop(!0), t._emitter.clear(this._queue), this._animation.destroy(), this._removeCurrentStyles(), Bt(e, i.itemVisibleClass), Bt(e, i.itemHiddenClass), e.style.display = "", this._isHiding = this._isShowing = !1, this._isDestroyed = this._isHidden = !0
    }
};
we.prototype._startAnimation = function(t, e, r) {
    if (!this._isDestroyed) {
        var i = this._item,
            n = this._animation,
            o = this._childElement,
            a = i.getGrid()._settings,
            s = t ? a.visibleStyles : a.hiddenStyles,
            u = t ? a.showDuration : a.hideDuration,
            h = t ? a.showEasing : a.hideEasing,
            f = e || u <= 0,
            v;
        if (!s) {
            r && r();
            return
        }
        if (Pl(i._id), f) {
            Wr(o, s), n.stop(), r && r();
            return
        }
        n.isAnimating() && (n._animation.onfinish = null), Vp(i._id, function() {
            v = Gl(o, s)
        }, function() {
            n.start(v, s, {
                duration: u,
                easing: h,
                onFinish: r
            })
        })
    }
};
we.prototype._finishShow = function() {
    this._isHidden || (this._isShowing = !1, this._item._emitter.burst(this._queue, !1, this._item))
};
we.prototype._finishHide = function() {
    if (!!this._isHidden) {
        var t = this._item;
        this._isHiding = !1, t._layout.stop(!0, 0, 0), t._element.style.display = "none", t._emitter.burst(this._queue, !1, t)
    }
};
we.prototype._removeCurrentStyles = function() {
    for (var t = this._childElement, e = this._currentStyleProps, r = 0; r < e.length; r++) t.style[e[r]] = "";
    e.length = 0
};
var $g = 0;

function jl() {
    return ++$g
}

function yt(t, e, r) {
    var i = t._settings;
    if (yr) {
        if (yr.has(e)) throw new Error("You can only create one Muuri Item per element!");
        yr.set(e, this)
    }
    this._id = jl(), this._gridId = t._id, this._element = e, this._isDestroyed = !1, this._left = 0, this._top = 0, this._width = 0, this._height = 0, this._marginLeft = 0, this._marginRight = 0, this._marginTop = 0, this._marginBottom = 0, this._tX = void 0, this._tY = void 0, this._sortData = null, this._emitter = new ve, e.parentNode !== t._element && t._element.appendChild(e), re(e, i.itemClass), typeof r != "boolean" && (r = Jt(e, "display") !== "none"), this._isActive = r, this._visibility = new we(this), this._layout = new Ye(this), this._migrate = new Ci(this), this._drag = i.dragEnabled ? new rt(this) : null, this._dragRelease = new fr(this), this._dragPlaceholder = new Yt(this)
}
yt.prototype.getGrid = function() {
    return wn[this._gridId]
};
yt.prototype.getElement = function() {
    return this._element
};
yt.prototype.getWidth = function() {
    return this._width
};
yt.prototype.getHeight = function() {
    return this._height
};
yt.prototype.getMargin = function() {
    return {
        left: this._marginLeft,
        right: this._marginRight,
        top: this._marginTop,
        bottom: this._marginBottom
    }
};
yt.prototype.getPosition = function() {
    return {
        left: this._left,
        top: this._top
    }
};
yt.prototype.isActive = function() {
    return this._isActive
};
yt.prototype.isVisible = function() {
    return !!this._visibility && !this._visibility._isHidden
};
yt.prototype.isShowing = function() {
    return !!(this._visibility && this._visibility._isShowing)
};
yt.prototype.isHiding = function() {
    return !!(this._visibility && this._visibility._isHiding)
};
yt.prototype.isPositioning = function() {
    return !!(this._layout && this._layout._isActive)
};
yt.prototype.isDragging = function() {
    return !!(this._drag && this._drag._isActive)
};
yt.prototype.isReleasing = function() {
    return !!(this._dragRelease && this._dragRelease._isActive)
};
yt.prototype.isDestroyed = function() {
    return this._isDestroyed
};
yt.prototype._refreshDimensions = function(t) {
    if (!this._isDestroyed && !(t !== !0 && this._visibility._isHidden)) {
        var e = this._element,
            r = this._dragPlaceholder,
            i = e.getBoundingClientRect();
        this._width = i.width, this._height = i.height, this._marginLeft = Math.max(0, le(e, "margin-left")), this._marginRight = Math.max(0, le(e, "margin-right")), this._marginTop = Math.max(0, le(e, "margin-top")), this._marginBottom = Math.max(0, le(e, "margin-bottom")), r && r.updateDimensions()
    }
};
yt.prototype._refreshSortData = function() {
    if (!this._isDestroyed) {
        var t = this._sortData = {},
            e = this.getGrid()._settings.sortData,
            r;
        for (r in e) t[r] = e[r](this, this._element)
    }
};
yt.prototype._addToLayout = function(t, e) {
    this._isActive !== !0 && (this._isActive = !0, this._left = t || 0, this._top = e || 0)
};
yt.prototype._removeFromLayout = function() {
    this._isActive !== !1 && (this._isActive = !1, this._left = 0, this._top = 0)
};
yt.prototype._canSkipLayout = function(t, e) {
    return this._left === t && this._top === e && !this._migrate._isActive && !this._layout._skipNextAnimation && !this._dragRelease.isJustReleased()
};
yt.prototype._setTranslate = function(t, e) {
    return this._tX === t && this._tY === e ? !1 : (this._tX = t, this._tY = e, this._element.style[Te] = ir(t, e), !0)
};
yt.prototype._destroy = function(t) {
    if (!this._isDestroyed) {
        var e = this._element,
            r = this.getGrid(),
            i = r._settings;
        this._dragPlaceholder.destroy(), this._dragRelease.destroy(), this._migrate.destroy(), this._layout.destroy(), this._visibility.destroy(), this._drag && this._drag.destroy(), this._emitter.destroy(), Bt(e, i.itemClass), t && e.parentNode.removeChild(e), yr && yr.delete(e), this._isActive = !1, this._isDestroyed = !0
    }
};

function Zl(t) {
    var e = 1,
        r = 2,
        i = 4,
        n = 8,
        o = 16,
        a = .001,
        s = .5;

    function u(_) {
        return ((_ * 1e3 + .5 << 0) / 10 << 0) / 100
    }

    function h() {
        this.currentRects = [], this.nextRects = [], this.rectTarget = {}, this.rectStore = [], this.slotSizes = [], this.rectId = 0, this.slotIndex = -1, this.slotData = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        }, this.sortRectsLeftTop = this.sortRectsLeftTop.bind(this), this.sortRectsTopLeft = this.sortRectsTopLeft.bind(this)
    }
    if (h.prototype.computeLayout = function(_, y) {
            var I = _.items,
                k = _.slots,
                L = !!(y & e),
                p = !!(y & r),
                O = !!(y & i),
                $ = !!(y & n),
                X = !!(y & o),
                N = typeof I[0] == "number",
                M, A, x, E, m, R;
            if (!I.length) return _;
            for (A = N ? 2 : 1, M = 0; M < I.length; M += A) N ? (E = I[M], m = I[M + 1]) : (x = I[M], E = x._width + x._marginLeft + x._marginRight, m = x._height + x._marginTop + x._marginBottom), X && (E = u(E), m = u(m)), R = this.computeNextSlot(_, E, m, L, p), p ? R.left + R.width > _.width && (_.width = R.left + R.width) : R.top + R.height > _.height && (_.height = R.top + R.height), k[++this.slotIndex] = R.left, k[++this.slotIndex] = R.top, (O || $) && this.slotSizes.push(R.width, R.height);
            if (O)
                for (M = 0; M < k.length; M += 2) k[M] = _.width - (k[M] + this.slotSizes[M]);
            if ($)
                for (M = 1; M < k.length; M += 2) k[M] = _.height - (k[M] + this.slotSizes[M]);
            return this.slotSizes.length = 0, this.currentRects.length = 0, this.nextRects.length = 0, this.rectStore.length = 0, this.rectId = 0, this.slotIndex = -1, _
        }, h.prototype.computeNextSlot = function(_, y, I, k, L) {
            var p = this.slotData,
                O = this.currentRects,
                $ = this.nextRects,
                X = !1,
                N, M, A, x, E;
            for ($.length = 0, p.left = null, p.top = null, p.width = y, p.height = I, x = 0; x < O.length; x++)
                if (M = O[x], !!M && (N = this.getRect(M), p.width <= N.width + a && p.height <= N.height + a)) {
                    p.left = N.left, p.top = N.top;
                    break
                } if (p.left === null && (L ? (p.left = _.width, p.top = 0) : (p.left = 0, p.top = _.height), k || (X = !0)), !L && p.top + p.height > _.height + a && (p.left > s && $.push(this.addRect(0, _.height, p.left, 1 / 0)), p.left + p.width < _.width - s && $.push(this.addRect(p.left + p.width, _.height, _.width - p.left - p.width, 1 / 0)), _.height = p.top + p.height), L && p.left + p.width > _.width + a && (p.top > s && $.push(this.addRect(_.width, 0, 1 / 0, p.top)), p.top + p.height < _.height - s && $.push(this.addRect(_.width, p.top + p.height, 1 / 0, _.height - p.top - p.height)), _.width = p.left + p.width), !X) {
                for (k && (x = 0); x < O.length; x++)
                    if (M = O[x], !!M)
                        for (N = this.getRect(M), A = this.splitRect(N, p), E = 0; E < A.length; E++) M = A[E], N = this.getRect(M), (L ? N.left + a < _.width - a : N.top + a < _.height - a) && $.push(M)
            }
            return $.length > 1 && this.purgeRects($).sort(L ? this.sortRectsLeftTop : this.sortRectsTopLeft), this.currentRects = $, this.nextRects = O, p
        }, h.prototype.addRect = function(_, y, I, k) {
            var L = ++this.rectId;
            return this.rectStore[L] = _ || 0, this.rectStore[++this.rectId] = y || 0, this.rectStore[++this.rectId] = I || 0, this.rectStore[++this.rectId] = k || 0, L
        }, h.prototype.getRect = function(_, y) {
            return y || (y = this.rectTarget), y.left = this.rectStore[_] || 0, y.top = this.rectStore[++_] || 0, y.width = this.rectStore[++_] || 0, y.height = this.rectStore[++_] || 0, y
        }, h.prototype.splitRect = function() {
            var _ = [],
                y = 0,
                I = 0;
            return function(k, L) {
                return _.length = 0, k.left + k.width <= L.left + a || L.left + L.width <= k.left + a || k.top + k.height <= L.top + a || L.top + L.height <= k.top + a ? (_.push(this.addRect(k.left, k.top, k.width, k.height)), _) : (y = L.left - k.left, y >= s && _.push(this.addRect(k.left, k.top, y, k.height)), y = k.left + k.width - (L.left + L.width), y >= s && _.push(this.addRect(L.left + L.width, k.top, y, k.height)), I = L.top - k.top, I >= s && _.push(this.addRect(k.left, k.top, k.width, I)), I = k.top + k.height - (L.top + L.height), I >= s && _.push(this.addRect(k.left, L.top + L.height, k.width, I)), _)
            }
        }(), h.prototype.isRectAWithinRectB = function(_, y) {
            return _.left + a >= y.left && _.top + a >= y.top && _.left + _.width - a <= y.left + y.width && _.top + _.height - a <= y.top + y.height
        }, h.prototype.purgeRects = function() {
            var _ = {},
                y = {};
            return function(I) {
                for (var k = I.length, L; k--;)
                    if (L = I.length, !!I[k]) {
                        for (this.getRect(I[k], _); L--;)
                            if (!(!I[L] || k === L) && (this.getRect(I[L], y), this.isRectAWithinRectB(_, y))) {
                                I[k] = 0;
                                break
                            }
                    } return I
            }
        }(), h.prototype.sortRectsTopLeft = function() {
            var _ = {},
                y = {};
            return function(I, k) {
                return this.getRect(I, _), this.getRect(k, y), _.top < y.top && _.top + a < y.top ? -1 : _.top > y.top && _.top - a > y.top ? 1 : _.left < y.left && _.left + a < y.left ? -1 : _.left > y.left && _.left - a > y.left ? 1 : 0
            }
        }(), h.prototype.sortRectsLeftTop = function() {
            var _ = {},
                y = {};
            return function(I, k) {
                return this.getRect(I, _), this.getRect(k, y), _.left < y.left && _.left + a < y.left ? -1 : _.left > y.left && _.left - a < y.left ? 1 : _.top < y.top && _.top + a < y.top ? -1 : _.top > y.top && _.top - a > y.top ? 1 : 0
            }
        }(), t) {
        var f = 1,
            v = 2,
            S = 3,
            b = 4,
            D = new h;
        self.onmessage = function(_) {
            var y = new Float32Array(_.data),
                I = y.subarray(b, y.length),
                k = new Float32Array(I.length),
                L = y[S],
                p = {
                    items: I,
                    slots: k,
                    width: y[f],
                    height: y[v]
                };
            D.computeLayout(p, L), y[f] = p.width, y[v] = p.height, y.set(p.slots, b), postMessage(y.buffer, [y.buffer])
        }
    }
    return h
}
var Vs = Zl(),
    Mr = null,
    zi = [];

function Pg(t, e) {
    var r = [];
    if (t > 0) {
        Mr || (Mr = URL.createObjectURL(new Blob(["(" + Zl.toString() + ")(true)"], {
            type: "application/javascript"
        })));
        for (var i = 0, n; i < t; i++) n = new Worker(Mr), e && (n.onmessage = e), r.push(n), zi.push(n)
    }
    return r
}

function Lg(t) {
    for (var e, r, i = 0; i < t.length; i++) e = t[i], e.onmessage = null, e.onerror = null, e.onmessageerror = null, e.terminate(), r = zi.indexOf(e), r > -1 && zi.splice(r, 1);
    Mr && !zi.length && (URL.revokeObjectURL(Mr), Mr = null)
}

function Rg() {
    return !!(window.Worker && window.URL && window.Blob)
}
var qs = 1,
    cn = 2,
    Ws = 4,
    Gs = 8,
    js = 16,
    Ql = 0,
    Kl = 1,
    Jl = 2,
    Og = 3,
    co = 4;

function ze(t, e) {
    if (this._options = 0, this._processor = null, this._layoutQueue = [], this._layouts = {}, this._layoutCallbacks = {}, this._layoutWorkers = {}, this._layoutWorkerData = {}, this._workers = [], this._onWorkerMessage = this._onWorkerMessage.bind(this), this.setOptions(e), t = typeof t == "number" ? Math.max(0, t) : 0, t && Rg()) try {
        this._workers = Pg(t, this._onWorkerMessage)
    } catch {
        this._processor = new Vs
    } else this._processor = new Vs
}
ze.prototype._sendToWorker = function() {
    if (!(!this._layoutQueue.length || !this._workers.length)) {
        var t = this._layoutQueue.shift(),
            e = this._workers.pop(),
            r = this._layoutWorkerData[t];
        delete this._layoutWorkerData[t], this._layoutWorkers[t] = e, e.postMessage(r.buffer, [r.buffer])
    }
};
ze.prototype._onWorkerMessage = function(t) {
    var e = new Float32Array(t.data),
        r = e[Ql],
        i = this._layouts[r],
        n = this._layoutCallbacks[r],
        o = this._layoutWorkers[r];
    i && delete this._layouts[r], n && delete this._layoutCallbacks[r], o && delete this._layoutWorkers[r], i && n && (i.width = e[Kl], i.height = e[Jl], i.slots = e.subarray(co, e.length), this._finalizeLayout(i), n(i)), o && (this._workers.push(o), this._sendToWorker())
};
ze.prototype._finalizeLayout = function(t) {
    var e = t._grid,
        r = t._settings & cn,
        i = e._boxSizing === "border-box";
    return delete t._grid, delete t._settings, t.styles = {}, r ? t.styles.width = (i ? t.width + e._borderLeft + e._borderRight : t.width) + "px" : t.styles.height = (i ? t.height + e._borderTop + e._borderBottom : t.height) + "px", t
};
ze.prototype.setOptions = function(t) {
    if (!!t) {
        var e;
        typeof t.fillGaps == "boolean" ? e = t.fillGaps ? qs : 0 : e = this._options & qs;
        var r;
        typeof t.horizontal == "boolean" ? r = t.horizontal ? cn : 0 : r = this._options & cn;
        var i;
        typeof t.alignRight == "boolean" ? i = t.alignRight ? Ws : 0 : i = this._options & Ws;
        var n;
        typeof t.alignBottom == "boolean" ? n = t.alignBottom ? Gs : 0 : n = this._options & Gs;
        var o;
        typeof t.rounding == "boolean" ? o = t.rounding ? js : 0 : o = this._options & js, this._options = e | r | i | n | o
    }
};
ze.prototype.createLayout = function(t, e, r, i, n, o) {
    if (this._layouts[e]) throw new Error("A layout with the provided id is currently being processed.");
    var a = this._options & cn,
        s = {
            id: e,
            items: r,
            slots: null,
            width: a ? 0 : i,
            height: a ? n : 0,
            _grid: t,
            _settings: this._options
        };
    if (!r.length) {
        s.slots = [], this._finalizeLayout(s), o(s);
        return
    }
    if (this._processor) {
        s.slots = window.Float32Array ? new Float32Array(r.length * 2) : new Array(r.length * 2), this._processor.computeLayout(s, s._settings), this._finalizeLayout(s), o(s);
        return
    }
    var u = new Float32Array(co + r.length * 2);
    u[Ql] = e, u[Kl] = s.width, u[Jl] = s.height, u[Og] = s._settings;
    var h, f, v;
    for (h = 0, f = co - 1, v; h < r.length; h++) v = r[h], u[++f] = v._width + v._marginLeft + v._marginRight, u[++f] = v._height + v._marginTop + v._marginBottom;
    return this._layoutQueue.push(e), this._layouts[e] = s, this._layoutCallbacks[e] = o, this._layoutWorkerData[e] = u, this._sendToWorker(), this.cancelLayout.bind(this, e)
};
ze.prototype.cancelLayout = function(t) {
    var e = this._layouts[t];
    if (!!e && (delete this._layouts[t], delete this._layoutCallbacks[t], this._layoutWorkerData[t])) {
        delete this._layoutWorkerData[t];
        var r = this._layoutQueue.indexOf(t);
        r > -1 && this._layoutQueue.splice(r, 1)
    }
};
ze.prototype.destroy = function() {
    for (var t in this._layoutWorkers) this._workers.push(this._layoutWorkers[t]);
    Lg(this._workers), this._workers.length = 0, this._layoutQueue.length = 0, this._layouts = {}, this._layoutCallbacks = {}, this._layoutWorkers = {}, this._layoutWorkerData = {}
};
var Mg = 0;

function Ng(t, e) {
    var r = ++Mg,
        i = 0,
        n = 0,
        o = !1,
        a = function(s) {
            o || (n && (i -= s - n), n = s, i > 0 ? tg(r, a) : (i = n = 0, t()))
        };
    return function(s) {
        if (!o) {
            if (e <= 0) {
                s !== !0 && t();
                return
            }
            if (s === !0) {
                o = !0, i = n = 0, a = void 0, eg(r);
                return
            }
            i <= 0 ? (i = e, a(0)) : i = e
        }
    }
}
var Bg = "[object HTMLCollection]",
    Ug = "[object NodeList]";

function Uo(t) {
    var e = Object.prototype.toString.call(t);
    return e === Bg || e === Ug
}
var Fg = "object",
    Hg = "[object Object]",
    Yg = Object.prototype.toString;

function Zs(t) {
    return typeof t === Fg && Yg.call(t) === Hg
}

function zg() {}

function Xg(t) {
    return Uo(t) ? Array.prototype.slice.call(t) : Array.prototype.concat(t)
}
var tc = "number",
    Cn = "string",
    ar = "instant",
    Gn = 0;

function ot(t, e) {
    typeof t === Cn && (t = document.querySelector(t));
    var r = t.getRootNode ? t.getRootNode({
        composed: !0
    }) === document : document.body.contains(t);
    if (!r || t === document.documentElement) throw new Error("Container element must be an existing DOM element.");
    var i = Vg(ot.defaultOptions, e);
    i.visibleStyles = Qs(i.visibleStyles), i.hiddenStyles = Qs(i.hiddenStyles), lt(i.dragSort) || (i.dragSort = !!i.dragSort), this._id = jl(), this._element = t, this._settings = i, this._isDestroyed = !1, this._items = [], this._layout = {
        id: 0,
        items: [],
        slots: []
    }, this._isLayoutFinished = !0, this._nextLayoutData = null, this._emitter = new ve, this._onLayoutDataReceived = this._onLayoutDataReceived.bind(this), wn[this._id] = this, re(t, i.containerClass), Wg(this, i.layoutOnResize), this.add(qg(t, i.items), {
        layout: !1
    }), i.layoutOnInit && this.layout(!0)
}
ot.Item = yt;
ot.ItemLayout = Ye;
ot.ItemVisibility = we;
ot.ItemMigrate = Ci;
ot.ItemDrag = rt;
ot.ItemDragRelease = fr;
ot.ItemDragPlaceholder = Yt;
ot.Emitter = ve;
ot.Animator = Ie;
ot.Dragger = z;
ot.Packer = ze;
ot.AutoScroller = dt;
ot.defaultPacker = new ze(2);
ot.defaultOptions = {
    items: "*",
    showDuration: 300,
    showEasing: "ease",
    hideDuration: 300,
    hideEasing: "ease",
    visibleStyles: {
        opacity: "1",
        transform: "scale(1)"
    },
    hiddenStyles: {
        opacity: "0",
        transform: "scale(0.5)"
    },
    layout: {
        fillGaps: !1,
        horizontal: !1,
        alignRight: !1,
        alignBottom: !1,
        rounding: !1
    },
    layoutOnResize: 150,
    layoutOnInit: !0,
    layoutDuration: 300,
    layoutEasing: "ease",
    sortData: null,
    dragEnabled: !1,
    dragContainer: null,
    dragHandle: null,
    dragStartPredicate: {
        distance: 0,
        delay: 0
    },
    dragAxis: "xy",
    dragSort: !0,
    dragSortHeuristics: {
        sortInterval: 100,
        minDragDistance: 10,
        minBounceBackAngle: 1
    },
    dragSortPredicate: {
        threshold: 50,
        action: Sr,
        migrateAction: Sr
    },
    dragRelease: {
        duration: 300,
        easing: "ease",
        useDragContainer: !0
    },
    dragCssProps: {
        touchAction: "none",
        userSelect: "none",
        userDrag: "none",
        tapHighlightColor: "rgba(0, 0, 0, 0)",
        touchCallout: "none",
        contentZooming: "none"
    },
    dragPlaceholder: {
        enabled: !1,
        createElement: null,
        onCreate: null,
        onRemove: null
    },
    dragAutoScroll: {
        targets: [],
        handle: null,
        threshold: 50,
        safeZone: .2,
        speed: dt.smoothSpeed(1e3, 2e3, 2500),
        sortDuringScroll: !0,
        smoothStop: !1,
        onStart: null,
        onStop: null
    },
    containerClass: "muuri",
    itemClass: "muuri-item",
    itemVisibleClass: "muuri-item-shown",
    itemHiddenClass: "muuri-item-hidden",
    itemPositioningClass: "muuri-item-positioning",
    itemDraggingClass: "muuri-item-dragging",
    itemReleasingClass: "muuri-item-releasing",
    itemPlaceholderClass: "muuri-item-placeholder"
};
ot.prototype.on = function(t, e) {
    return this._emitter.on(t, e), this
};
ot.prototype.off = function(t, e) {
    return this._emitter.off(t, e), this
};
ot.prototype.getElement = function() {
    return this._element
};
ot.prototype.getItem = function(t) {
    if (this._isDestroyed || !t && t !== 0) return null;
    if (typeof t === tc) return this._items[t > -1 ? t : this._items.length + t] || null;
    if (t instanceof yt) return t._gridId === this._id ? t : null;
    if (yr) {
        var e = yr.get(t);
        return e && e._gridId === this._id ? e : null
    } else
        for (var r = 0; r < this._items.length; r++)
            if (this._items[r]._element === t) return this._items[r];
    return null
};
ot.prototype.getItems = function(t) {
    if (this._isDestroyed || t === void 0) return this._items.slice(0);
    var e = [],
        r, i;
    if (Array.isArray(t) || Uo(t))
        for (r = 0; r < t.length; r++) i = this.getItem(t[r]), i && e.push(i);
    else i = this.getItem(t), i && e.push(i);
    return e
};
ot.prototype.refreshItems = function(t, e) {
    if (this._isDestroyed) return this;
    var r = t || this._items,
        i, n, o, a;
    if (e === !0)
        for (a = [], i = 0; i < r.length; i++) n = r[i], !n.isVisible() && !n.isHiding() && (o = n.getElement().style, o.visibility = "hidden", o.display = "", a.push(o));
    for (i = 0; i < r.length; i++) r[i]._refreshDimensions(e);
    if (e === !0) {
        for (i = 0; i < a.length; i++) o = a[i], o.visibility = "", o.display = "none";
        a.length = 0
    }
    return this
};
ot.prototype.refreshSortData = function(t) {
    if (this._isDestroyed) return this;
    for (var e = t || this._items, r = 0; r < e.length; r++) e[r]._refreshSortData();
    return this
};
ot.prototype.synchronize = function() {
    if (this._isDestroyed) return this;
    var t = this._items;
    if (!t.length) return this;
    for (var e, r, i = 0; i < t.length; i++) r = t[i]._element, r.parentNode === this._element && (e = e || document.createDocumentFragment(), e.appendChild(r));
    return e ? (this._element.appendChild(e), this._emit(Sp), this) : this
};
ot.prototype.layout = function(t, e) {
    if (this._isDestroyed) return this;
    var r = this._nextLayoutData;
    r && lt(r.cancel) && r.cancel(), Gn = Gn % Op + 1;
    var i = Gn;
    this._nextLayoutData = {
        id: i,
        instant: t,
        onFinish: e,
        cancel: null
    };
    for (var n = this._items, o = [], a = 0; a < n.length; a++) n[a]._isActive && o.push(n[a]);
    this._refreshDimensions();
    var s = this._width - this._borderLeft - this._borderRight,
        u = this._height - this._borderTop - this._borderBottom,
        h = this._settings.layout,
        f;
    return lt(h) ? f = h(this, i, o, s, u, this._onLayoutDataReceived) : (ot.defaultPacker.setOptions(h), f = ot.defaultPacker.createLayout(this, i, o, s, u, this._onLayoutDataReceived)), lt(f) && this._nextLayoutData && this._nextLayoutData.id === i && (this._nextLayoutData.cancel = f), this
};
ot.prototype.add = function(t, e) {
    if (this._isDestroyed || !t) return [];
    var r = Xg(t);
    if (!r.length) return r;
    var i = e || {},
        n = i.layout ? i.layout : i.layout === void 0,
        o = this._items,
        a = !1,
        s, u, h, f;
    for (f = 0; f < r.length; f++) u = r[f], u.parentNode !== this._element && (s = s || document.createDocumentFragment(), s.appendChild(u));
    for (s && this._element.appendChild(s), f = 0; f < r.length; f++) u = r[f], h = r[f] = new yt(this, u, i.active), h._isActive && (a = !0, h._layout._skipNextAnimation = !0);
    for (f = 0; f < r.length; f++) h = r[f], h._refreshDimensions(), h._refreshSortData();
    return Bo(o, r, i.index), this._hasListeners(Ls) && this._emit(Ls, r.slice(0)), a && n && this.layout(n === ar, lt(n) ? n : void 0), r
};
ot.prototype.remove = function(t, e) {
    if (this._isDestroyed || !t.length) return [];
    var r = e || {},
        i = r.layout ? r.layout : r.layout === void 0,
        n = !1,
        o = this.getItems(),
        a = [],
        s = [],
        u, h, f;
    for (f = 0; f < t.length; f++) h = t[f], !h._isDestroyed && (u = this._items.indexOf(h), u !== -1 && (h._isActive && (n = !0), a.push(h), s.push(o.indexOf(h)), h._destroy(r.removeElements), this._items.splice(u, 1)));
    return this._hasListeners(Rs) && this._emit(Rs, a.slice(0), s), n && i && this.layout(i === ar, lt(i) ? i : void 0), a
};
ot.prototype.show = function(t, e) {
    return !this._isDestroyed && t.length && this._setItemsVisibility(t, !0, e), this
};
ot.prototype.hide = function(t, e) {
    return !this._isDestroyed && t.length && this._setItemsVisibility(t, !1, e), this
};
ot.prototype.filter = function(t, e) {
    if (this._isDestroyed || !this._items.length) return this;
    var r = [],
        i = [],
        n = typeof t === Cn,
        o = lt(t),
        a = e || {},
        s = a.instant === !0,
        u = a.syncWithLayout,
        h = a.layout ? a.layout : a.layout === void 0,
        f = lt(a.onFinish) ? a.onFinish : null,
        v = -1,
        S = zg,
        b, D;
    if (f && (S = function() {
            ++v && f(r.slice(0), i.slice(0))
        }), o || n)
        for (D = 0; D < this._items.length; D++) b = this._items[D], (o ? t(b) : An(b._element, t)) ? r.push(b) : i.push(b);
    return r.length ? this.show(r, {
        instant: s,
        syncWithLayout: u,
        onFinish: S,
        layout: !1
    }) : S(), i.length ? this.hide(i, {
        instant: s,
        syncWithLayout: u,
        onFinish: S,
        layout: !1
    }) : S(), (r.length || i.length) && (this._hasListeners(Os) && this._emit(Os, r.slice(0), i.slice(0)), h && this.layout(h === ar, lt(h) ? h : void 0)), this
};
ot.prototype.sort = function() {
    var t, e, r, i;

    function n(a, s) {
        for (var u = 0, h, f, v, S, b = 0; b < t.length; b++)
            if (h = t[b][0], f = t[b][1], v = (a._sortData ? a : a._refreshSortData())._sortData[h], S = (s._sortData ? s : s._refreshSortData())._sortData[h], f === "desc" || !f && e ? u = S < v ? -1 : S > v ? 1 : 0 : u = v < S ? -1 : v > S ? 1 : 0, u) return u;
        return u || (i || (i = Ks(r)), u = e ? Ni(i, s, a) : Ni(i, a, s)), u
    }

    function o(a, s) {
        var u = e ? -t(a, s) : t(a, s);
        return u || (i || (i = Ks(r)), u = e ? Ni(i, s, a) : Ni(i, a, s)), u
    }
    return function(a, s) {
        if (this._isDestroyed || this._items.length < 2) return this;
        var u = this._items,
            h = s || {},
            f = h.layout ? h.layout : h.layout === void 0;
        if (e = !!h.descending, r = u.slice(0), i = null, lt(a)) t = a, u.sort(o);
        else if (typeof a === Cn) t = a.trim().split(" ").filter(function(v) {
            return v
        }).map(function(v) {
            return v.split(":")
        }), u.sort(n);
        else if (Array.isArray(a)) u.length = 0, u.push.apply(u, a);
        else throw t = e = r = i = null, new Error("Invalid comparer argument provided.");
        return this._hasListeners(Ms) && this._emit(Ms, u.slice(0), r), f && this.layout(f === ar, lt(f) ? f : void 0), t = e = r = i = null, this
    }
}();
ot.prototype.move = function(t, e, r) {
    if (this._isDestroyed || this._items.length < 2) return this;
    var i = this._items,
        n = r || {},
        o = n.layout ? n.layout : n.layout === void 0,
        a = n.action === ke,
        s = a ? ke : Sr,
        u = this.getItem(t),
        h = this.getItem(e),
        f, v;
    return u && h && u !== h && (f = i.indexOf(u), v = i.indexOf(h), a ? Vl(i, f, v) : Xl(i, f, v), this._hasListeners(tn) && this._emit(tn, {
        item: u,
        fromIndex: f,
        toIndex: v,
        action: s
    }), o && this.layout(o === ar, lt(o) ? o : void 0)), this
};
ot.prototype.send = function(t, e, r, i) {
    if (this._isDestroyed || e._isDestroyed || this === e) return this;
    if (t = this.getItem(t), !t) return this;
    var n = i || {},
        o = n.appendTo || document.body,
        a = n.layoutSender ? n.layoutSender : n.layoutSender === void 0,
        s = n.layoutReceiver ? n.layoutReceiver : n.layoutReceiver === void 0;
    return t._migrate.start(e, r, o), t._migrate._isActive && t._isActive && (a && this.layout(a === ar, lt(a) ? a : void 0), s && e.layout(s === ar, lt(s) ? s : void 0)), this
};
ot.prototype.destroy = function(t) {
    if (this._isDestroyed) return this;
    var e = this._element,
        r = this._items.slice(0),
        i = this._layout && this._layout.styles || {},
        n, o;
    for (Gg(this), n = 0; n < r.length; n++) r[n]._destroy(t);
    this._items.length = 0, Bt(e, this._settings.containerClass);
    for (o in i) e.style[o] = "";
    return this._emit(Rp), this._emitter.destroy(), delete wn[this._id], this._isDestroyed = !0, this
};
ot.prototype._emit = function() {
    this._isDestroyed || this._emitter.emit.apply(this._emitter, arguments)
};
ot.prototype._hasListeners = function(t) {
    return this._isDestroyed ? !1 : this._emitter.countListeners(t) > 0
};
ot.prototype._updateBoundingRect = function() {
    var t = this._element,
        e = t.getBoundingClientRect();
    this._width = e.width, this._height = e.height, this._left = e.left, this._top = e.top, this._right = e.right, this._bottom = e.bottom
};
ot.prototype._updateBorders = function(t, e, r, i) {
    var n = this._element;
    t && (this._borderLeft = le(n, "border-left-width")), e && (this._borderRight = le(n, "border-right-width")), r && (this._borderTop = le(n, "border-top-width")), i && (this._borderBottom = le(n, "border-bottom-width"))
};
ot.prototype._refreshDimensions = function() {
    this._updateBoundingRect(), this._updateBorders(1, 1, 1, 1), this._boxSizing = Jt(this._element, "box-sizing")
};
ot.prototype._onLayoutDataReceived = function() {
    var t = [];
    return function(e) {
        if (!(this._isDestroyed || !this._nextLayoutData || this._nextLayoutData.id !== e.id)) {
            var r = this,
                i = this._nextLayoutData.instant,
                n = this._nextLayoutData.onFinish,
                o = e.items.length,
                a = o,
                s, u, h, f;
            for (this._nextLayoutData = null, !this._isLayoutFinished && this._hasListeners(Ps) && this._emit(Ps, this._layout.items.slice(0)), this._layout = e, t.length = 0, f = 0; f < o; f++) {
                if (s = e.items[f], !s) {
                    --a;
                    continue
                }
                if (u = e.slots[f * 2], h = e.slots[f * 2 + 1], s._canSkipLayout(u, h)) {
                    --a;
                    continue
                }
                s._left = u, s._top = h, s.isActive() && !s.isDragging() ? t.push(s) : --a
            }
            if (e.styles && Wr(this._element, e.styles), !(this._hasListeners(or) && (this._emit(or, e.items.slice(0), i === !0), this._layout.id !== e.id))) {
                var v = function() {
                    if (!(--a > 0)) {
                        var S = r._layout.id !== e.id,
                            b = lt(i) ? i : n;
                        S || (r._isLayoutFinished = !0), lt(b) && b(e.items.slice(0), S), !S && r._hasListeners($s) && r._emit($s, e.items.slice(0))
                    }
                };
                if (!t.length) return v(), this;
                for (this._isLayoutFinished = !1, f = 0; f < t.length && this._layout.id === e.id; f++) t[f]._layout.start(i === !0, v);
                return this._layout.id === e.id && (t.length = 0), this
            }
        }
    }
}();
ot.prototype._setItemsVisibility = function(t, e, r) {
    var i = this,
        n = t.slice(0),
        o = r || {},
        a = o.instant === !0,
        s = o.onFinish,
        u = o.layout ? o.layout : o.layout === void 0,
        h = n.length,
        f = e ? kp : di,
        v = e ? Ap : Cp,
        S = e ? "show" : "hide",
        b = !1,
        D = [],
        _ = [],
        y, I;
    if (!h) {
        lt(s) && s(n);
        return
    }
    for (I = 0; I < n.length; I++) y = n[I], (e && !y._isActive || !e && y._isActive) && (b = !0), y._layout._skipNextAnimation = !!(e && !y._isActive), e && y._visibility._isHidden && _.push(y), e ? y._addToLayout() : y._removeFromLayout();
    _.length && (this.refreshItems(_, !0), _.length = 0);

    function k() {
        for (b && o.syncWithLayout !== !1 && i.off(or, k), i._hasListeners(f) && i._emit(f, n.slice(0)), I = 0; I < n.length; I++) {
            if (n[I]._gridId !== i._id) {
                --h < 1 && (lt(s) && s(D.slice(0)), i._hasListeners(v) && i._emit(v, D.slice(0)));
                continue
            }
            n[I]._visibility[S](a, function(L, p) {
                L || D.push(p), --h < 1 && (lt(s) && s(D.slice(0)), i._hasListeners(v) && i._emit(v, D.slice(0)))
            })
        }
    }
    b && o.syncWithLayout !== !1 ? this.on(or, k) : k(), b && u && this.layout(u === ar, lt(u) ? u : void 0)
};

function Vg(t, e) {
    var r = ai({}, t);
    return e && (r = ai(r, e)), e && e.visibleStyles ? r.visibleStyles = e.visibleStyles : t && t.visibleStyles && (r.visibleStyles = t.visibleStyles), e && e.hiddenStyles ? r.hiddenStyles = e.hiddenStyles : t && t.hiddenStyles && (r.hiddenStyles = t.hiddenStyles), r
}

function ai(t, e) {
    var r = Object.keys(e),
        i = r.length,
        n, o, a;
    for (a = 0; a < i; a++) {
        if (o = r[a], n = Zs(e[o]), Zs(t[o]) && n) {
            t[o] = ai(ai({}, t[o]), e[o]);
            continue
        }
        if (n) {
            t[o] = ai({}, e[o]);
            continue
        }
        if (Array.isArray(e[o])) {
            t[o] = e[o].slice(0);
            continue
        }
        t[o] = e[o]
    }
    return t
}

function qg(t, e) {
    if (e === "*") return t.children;
    if (typeof e === Cn) {
        for (var r = [], i = t.children, n = 0; n < i.length; n++) An(i[n], e) && r.push(i[n]);
        return r
    }
    return Array.isArray(e) || Uo(e) ? e : []
}

function Wg(t, e) {
    typeof e !== tc && (e = e === !0 ? 0 : -1), e >= 0 && (t._resizeHandler = Ng(function() {
        t.refreshItems().layout()
    }, e), window.addEventListener("resize", t._resizeHandler))
}

function Gg(t) {
    t._resizeHandler && (t._resizeHandler(!0), window.removeEventListener("resize", t._resizeHandler), t._resizeHandler = null)
}

function Qs(t) {
    var e = {},
        r = document.documentElement.style,
        i, n;
    for (i in t) !t[i] || (n = xn(r, i), n && (e[n] = t[i]));
    return e
}

function Ks(t) {
    for (var e = {}, r = 0; r < t.length; r++) e[t[r]._id] = r;
    return e
}

function Ni(t, e, r) {
    var i = t[e._id],
        n = t[r._id];
    return i - n
}
var Ar = (t => (t[t.SUCCESS = 0] = "SUCCESS", t[t.FAILURE = 1] = "FAILURE", t[t.NOT_REQUESTED = 2] = "NOT_REQUESTED", t))(Ar || {});
const _e = 6,
    mt = 32 / 6 * _e,
    [jg, Tn] = at(!1),
    Zg = () => {
        Ho(0), rc(void 0)
    },
    Qg = () => Ho(1),
    [Fo, Ho] = at(0),
    [ec, rc] = at();
gt(ee(ec, t => {
    t && Ho(2)
}));
const uo = [
        [255, 255, 255],
        [170, 170, 160],
        [85, 85, 105],
        [0, 0, 30]
    ],
    Kg = t => uo[Jg(t)],
    Jg = t => ((t >= uo.length || t < 0) && (t = Math.abs(t % uo.length), console.error("ERROR Color : unknown id !")), t),
    tv = "_grid_1l8cr_1",
    ev = "_item_1l8cr_9",
    rv = "_draggable_1l8cr_15",
    iv = "_illustration_1l8cr_39";
var Qe = {
    grid: tv,
    item: ev,
    draggable: rv,
    "not-allowed": "_not-allowed_1l8cr_22",
    "item-content": "_item-content_1l8cr_33",
    illustration: iv,
    "text-white-border": "_text-white-border_1l8cr_49",
    "box-white-border": "_box-white-border_1l8cr_53",
    "captcha-examples": "_captcha-examples_1l8cr_1",
    "captcha-ex1": "_captcha-ex1_1l8cr_1",
    "captcha-ex2": "_captcha-ex2_1l8cr_1"
};
class nv {
    constructor(e = 32) {
        this.width = e, this.captchaData = new Uint8Array(e * e / 4)
    }
    setCaptchaData(e) {
        this.captchaData = e
    }
    getCaptchaData() {
        return this.captchaData
    }
    setColorId(e, r, i) {
        if (e < 0 || r < 0 || e >= this.width || r >= this.width || i < 0 || i >= 4) return;
        const n = this.width * r + e,
            o = 2 * (n % 4);
        this.captchaData[n >> 2] = this.captchaData[n >> 2] & ~(3 << o) | i << o
    }
    getColorId(e, r) {
        const i = this.width * r + e,
            n = 2 * (i % 4);
        return (this.captchaData[i >> 2] & 3 << n) >> n
    }
}
this.nv = nv;
const ov = F("<div></div>"),
    sv = F("<div>Loading...</div>"),
    av = F("<div><div><canvas></canvas></div></div>"),
    lv = Ep(_e),
    cv = 64,
    uv = 5,
    Js = cv + uv,
    ta = t => {
        const e = new Array(_e).fill(null);
        Uc(() => {
            const i = document.createElement("canvas");
            i.width = _e * mt, i.height = mt;
            const n = er(i),
                o = it(() => new ot(`#${t.gridId}`, {
                    layoutOnResize: !0,
                    layout: (u, h, f, v, S, b) => {
                        const D = v,
                            _ = D / (_e * Js),
                            y = {
                                id: h,
                                items: f,
                                slots: new Array(_e).fill(null).map((I, k) => [k * _ * Js, 0]).flat(),
                                setWidth: !0,
                                setHeight: !0
                            };
                        b(y)
                    },
                    dragEnabled: t.dragEnabled,
                    dragSortPredicate: {
                        threshold: 40,
                        action: "swap"
                    }
                }));
            Be(() => {
                const u = o(),
                    h = f => {
                        const v = [];
                        for (let S = 0; S < f.length; S++) v.push(parseInt(f[S].getElement().getAttribute("data-id")));
                        t.onPermutation && t.onPermutation(lv.permToIndex(v))
                    };
                return u.on("layoutEnd", h), () => u.off("layoutEnd", h)
            });
            this.nv = nv;
            const a = u => {
                    const h = new Uint8Array(u);
                    for (let v = 0; v < _e; v++) {
                        let S, b;
                        const D = n.getImageData(v * mt, 0, mt, mt),
                            _ = D.data,
                            y = new nv(mt);
                        y.setCaptchaData(h.subarray(v * mt * mt / 4, (v + 1) * mt * mt / 4));
                        for (let I = 0; I < mt; I++)
                            for (let k = 0; k < mt; k++) b = (mt * k + I) * 4, S = Kg(y.getColorId(I, k)), _[b + 0] = S[0], _[b + 1] = S[1], _[b + 2] = S[2], _[b + 3] = 255;
                        n.putImageData(D, v * mt, 0)
                    }
                    const f = [];
                    for (let v = 0; v < _e; v++) f.push(n.getImageData(v * mt, 0, mt, mt)), er(e[v]).putImageData(f[v], 0, 0)
                },
                s = () => {
                    let u;
                    t.onPermutation && t.onPermutation(0), o().sort((h, f) => parseInt(h.getElement().getAttribute("data-id")) - parseInt(f.getElement().getAttribute("data-id")));
                    for (let h = 0; h < e.length; h++) u = e[h], er(u).clearRect(0, 0, u.width, u.height)
                };
            gt(ee(() => t.captchaData, u => {
                s(), a(u)
            })), setTimeout(() => {
                o().layout(), o().refreshItems()
            }, 500)
        });
        const r = {
            width: "100%",
            height: "100%"
        };
        return (() => {
            const i = ov.cloneNode(!0);
            return nt(i, w(wo, {
                each: e,
                get fallback() {
                    return sv.cloneNode(!0)
                },
                children: (n, o) => (() => {
                    const a = av.cloneNode(!0),
                        s = a.firstChild,
                        u = s.firstChild;
                    return gn(h => e[o()] = h, u), Wt(u, "width", mt), Wt(u, "height", mt), pn(u, r), ct(h => {
                        const f = K({
                                [Qe.item]: !0,
                                [Qe.draggable]: t.dragEnabled,
                                [Qe["not-allowed"]]: !t.dragEnabled
                            }),
                            v = o(),
                            S = Qe["item-content"],
                            b = `captcha-item-${o()}`,
                            D = K(ht.pixelated, Qe["box-white-border"]);
                        return f !== h._v$3 && st(a, h._v$3 = f), v !== h._v$4 && Wt(a, "data-id", h._v$4 = v), S !== h._v$5 && st(s, h._v$5 = S), b !== h._v$6 && Wt(u, "id", h._v$6 = b), D !== h._v$7 && st(u, h._v$7 = D), h
                    }, {
                        _v$3: void 0,
                        _v$4: void 0,
                        _v$5: void 0,
                        _v$6: void 0,
                        _v$7: void 0
                    }), a
                })()
            })), ct(n => {
                const o = t.gridId,
                    a = K(Qe.grid);
                return o !== n._v$ && Wt(i, "id", n._v$ = o), a !== n._v$2 && st(i, n._v$2 = a), n
            }, {
                _v$: void 0,
                _v$2: void 0
            }), i
        })()
    },
    hv = F("<div></div>"),
    fv = F("<h3>\u{1F449} Place these symbols :</h3>"),
    dv = F("<h3>\u{1F481}\u200D\u2642\uFE0F following this sequence :</h3>"),
    pv = t => it((() => {
        const e = it(() => !!t.question);
        return () => e() ? w(j, {
            left: !0,
            get children() {
                return [(() => {
                    const r = hv.cloneNode(!0);
                    return r.style.setProperty("width", "100vw"), r
                })(), (() => {
                    const r = fv.cloneNode(!0);
                    return ct(() => st(r, K(Qe["text-white-border"]))), r
                })(), w(ta, {
                    gridId: "captcha-data",
                    get captchaData() {
                        return t.question.data
                    },
                    dragEnabled: !0,
                    onPermutation: r => t.onPermutation(r)
                }), (() => {
                    const r = dv.cloneNode(!0);
                    return ct(() => st(r, K(Qe["text-white-border"]))), r
                })(), w(ta, {
                    gridId: "captcha-model",
                    get captchaData() {
                        return t.question.model
                    },
                    dragEnabled: !1
                })]
            }
        }) : w(j, {
            center: !0,
            get children() {
                return w(Lo, {
                    dotColor: "#bcc1c9"
                })
            }
        })
    })());
var Bi = {
    "captcha-examples": "_captcha-examples_zdjzg_1",
    "captcha-example-1": "_captcha-example-1_zdjzg_5",
    "captcha-example-2": "_captcha-example-2_zdjzg_15"
};
const gv = F("<h3>How does it work?</h3>"),
    vv = F("<p>If you are here, you probably didn't understand something, let's start from the beginning.</p>"),
    Ui = F("<br>"),
    mv = F("<p>Q: What is a captcha?</p>"),
    _v = F("<p>A: It's a simple test. The captcha theoretically allows the site to differentiate between bots and humans through a challenge.</p>"),
    yv = F("<p>Q: What is the challenge of this captcha?</p>"),
    wv = F("<p>A: The challenge of this captcha challenge is to put tiles correctly (you can move them with your mouse or finger).</p>"),
    bv = F('<p>Q: What is the "correct" way to put tiles?</p>'),
    xv = F('<p>A: The "correct" way to place the tiles is to arrange them in the order shown below.</p>'),
    Ev = F("<h3>Examples</h3>"),
    Sv = F("<p>Here's an example of a correct combination:</p>"),
    ea = F("<div><div><div></div></div></div>"),
    kv = F("<p>Here's an example of a wrong combination:</p>"),
    Av = () => [gv.cloneNode(!0), vv.cloneNode(!0), Ui.cloneNode(!0), mv.cloneNode(!0), _v.cloneNode(!0), Ui.cloneNode(!0), yv.cloneNode(!0), wv.cloneNode(!0), Ui.cloneNode(!0), bv.cloneNode(!0), xv.cloneNode(!0), Ui.cloneNode(!0), Ev.cloneNode(!0), Sv.cloneNode(!0), (() => {
        const t = ea.cloneNode(!0),
            e = t.firstChild,
            r = e.firstChild;
        return t.style.setProperty("text-align", "center"), ct(i => {
            const n = K(Bi["captcha-examples"]),
                o = K(Bi["captcha-example-1"]);
            return n !== i._v$ && st(e, i._v$ = n), o !== i._v$2 && st(r, i._v$2 = o), i
        }, {
            _v$: void 0,
            _v$2: void 0
        }), t
    })(), kv.cloneNode(!0), (() => {
        const t = ea.cloneNode(!0),
            e = t.firstChild,
            r = e.firstChild;
        return t.style.setProperty("text-align", "center"), ct(i => {
            const n = K(Bi["captcha-examples"]),
                o = K(Bi["captcha-example-2"]);
            return n !== i._v$3 && st(e, i._v$3 = n), o !== i._v$4 && st(r, i._v$4 = o), i
        }, {
            _v$3: void 0,
            _v$4: void 0
        }), t
    })()],
    Cv = t => {
        let e = 0;
        const [r, i] = at(!1);
        return [w(nr, {
            get isShowing() {
                return jg()
            },
            hide: () => Tn(!1),
            title: "\u{1F9E9} Captcha",
            get class() {
                return wp.background
            },
            get children() {
                return [w(Er, {
                    get children() {
                        return w(pv, {
                            onPermutation: n => e = n,
                            get question() {
                                return ec()
                            }
                        })
                    }
                }), w(j, {
                    row: !0,
                    right: !0,
                    style: {
                        "flex-shrink": 0
                    },
                    get children() {
                        return [w(Re, {
                            color: "paper",
                            onClick: () => i(!0),
                            children: "Help"
                        }), w(Re, {
                            color: "primary",
                            onClick: () => t.onSend(e),
                            children: "Send"
                        })]
                    }
                })]
            }
        }), w(nr, {
            get isShowing() {
                return r()
            },
            hide: () => i(!1),
            title: "\u2753 Help",
            get children() {
                return [w(Er, {
                    get children() {
                        return w(Av, {})
                    }
                }), w(j, {
                    row: !0,
                    right: !0,
                    style: {
                        "flex-shrink": 0
                    },
                    get children() {
                        return w(Re, {
                            color: "primary",
                            onClick: () => i(!1),
                            children: "OK"
                        })
                    }
                })]
            }
        })]
    };

function Tv(t) {
    return {
        all: t = t || new Map,
        on: function(e, r) {
            var i = t.get(e);
            i ? i.push(r) : t.set(e, [r])
        },
        off: function(e, r) {
            var i = t.get(e);
            i && (r ? i.splice(i.indexOf(r) >>> 0, 1) : t.set(e, []))
        },
        emit: function(e, r) {
            var i = t.get(e);
            i && i.slice().map(function(n) {
                n(r);
            }), (i = t.get("*")) && i.slice().map(function(n) {
                n(e, r);
            })
        }
    }
}
const Yo = t => {
        const e = t || new Map;
        return {
            ...Tv(e),
            clear: () => e.clear()
        }
    },
    zo = () => {
        const t = Yo();
        return Ur(() => t.clear()), t
    },
    Dt = (t, e) => t.map((r, i) => r + e[i]),
    Me = (t, e) => t.map((r, i) => r - e[i]),
    jt = (t, e) => t.map(r => e * r),
    Dv = (t, e) => t = t.map(r => (r % e + e) % e),
    wr = (t, e) => t = t.map(e),
    ic = (t, e) => t.map((r, i) => r * e[i]),
    Je = t => [...t],
    Gr = (t, e) => {
        for (let r = 0; r < t.length; r++)
            if (t[r] !== e[r]) return !1;
        return !0
    },
    Iv = ([t, e]) => [t.map((r, i) => r > e[i] ? (t[i] + e[i]) / 2 : r), e.map((r, i) => r < t[i] ? (t[i] + e[i]) / 2 : r)],
    nc = t => t.reduce((e, r) => e + r * r, 0),
    $v = (t, e) => {
        const r = new Map;
        return t.forEach(i => {
            const n = e(i),
                o = r.get(n);
            o ? o.push(i) : r.set(n, [i])
        }), r
    },
    ra = (t, e) => Array.from($v(t, e)),
    bi = (t, e, r) => e < t ? t : e > r ? r : e,
    Pv = (t, e, r, i, n) => {
        const {
            on: o,
            off: a,
            clear: s,
            emit: u
        } = zo();
        return it(() => {
            const f = e(),
                v = r(),
                S = i();
            let b = [];
            const D = new Map,
                _ = new Map,
                y = M => M.join(":"),
                I = M => Dv(M, f),
                k = M => wr(jt(M, 1 / f), Math.floor),
                L = M => {
                    ra(M, ({
                        index: A
                    }) => y(k(A))).filter(([A]) => _.has(A)).forEach(([A, x]) => {
                        Pu(ui(_.get(A)).canvas, x.map(({
                            value: E,
                            index: m
                        }) => ({
                            value: E,
                            index: I(m)
                        })))
                    }), u("pixels", M), n && n()
                },
                p = M => ra(M, A => y(k(A))).filter(([A]) => _.has(A)).map(([A, x]) => $u(ui(_.get(A)).canvas, x.map(E => I(E))).map(({
                    value: E
                }, m) => ({
                    value: E,
                    index: x[m]
                }))).flat(),
                O = (M = b) => {
                    const A = Date.now();
                    M = M.filter(E => !_.has(y(E))).filter(E => {
                        const m = D.get(y(E));
                        return m === void 0 || A - m > 2e4
                    }), S(M).forEach((E, m) => {
                        const R = y(M[m]);
                        D.set(R, A), E.then(H => {
                            const Y = Iu(f, f),
                                U = er(Y, {
                                    willReadFrequently: !0
                                });
                            H instanceof ImageData ? (U.imageSmoothingEnabled = !1, U.putImageData(H, 0, 0)) : U.drawImage(H, 0, 0), _.set(R, {
                                canvas: Y,
                                loaded: Date.now()
                            }), n && n(), u("loaded", M[m])
                        }).catch(H => console.error("Could not laod tile.", H))
                    })
                },
                $ = (M, A = b) => {
                    const x = M.globalAlpha;
                    A.forEach(([E, m]) => {
                        const R = _.get(y([E, m]));
                        R && R.canvas && (M.globalAlpha *= bi(0, (Date.now() - R.loaded) / 200, 1), M.drawImage(R.canvas, E * f, m * f), n && M.globalAlpha < 1 && n(), M.globalAlpha = x)
                    })
                };
            let X = null,
                N = null;
			window.getPixels = p;
            return gt(() => {
                const [M, A] = t(), x = wr(M, Y => Math.floor(Y / f)), E = wr(A, Y => Math.ceil(Y / f));
                if (X && N && Gr(x, X) && Gr(E, N)) return;
                const [m, R] = v, H = [];
                for (let Y = x[0]; Y < E[0]; Y++)
                    for (let U = x[1]; U < E[1]; U++) Y >= -m / 2 && Y < m / 2 && U >= -R / 2 && U < R / 2 && H.push([Y, U]);
                b = H, O(), X = x, N = E
            }), {
                getViewRectangle: t,
                getTileSize: e,
                getTileBounds: r,
                setPixels: L,
                getPixels: p,
                loadTiles: O,
                draw: $,
                on: o,
                off: a,
                clear: s
            }
        })
    },
    Lv = (t, e) => it(() => {
        const i = t(),
            [n, o] = e();
        return wr(i, (a, s) => bi(n[s], a, o[s]))
    }),
    Rv = (t, e) => it(() => {
        const i = t(),
            [n, o] = e();
        return bi(n, i, o)
    }),
    Ov = (t, e, r) => {
        const [i, n] = at([
            [0, 0],
            [0, 0]
        ]);
        return gt(() => {
            const o = t(),
                a = e(),
                s = r();
            n([Dt(o, jt(s, -1 / (2 * a))), Dt(o, jt(s, 1 / (2 * a)))])
        }), i
    },
    Mv = (t, e, r) => {
        const [i, n] = at([
            [0, 0],
            [0, 0]
        ]);
        return gt(() => {
            const o = t(),
                a = e(),
                s = r();
            n(Iv([Dt(o[0], jt(s, 1 / (2 * a))), Dt(o[1], jt(s, -1 / (2 * a)))]))
        }), i
    },
    Nv = (t, e, r, i, n) => {
        const o = Rv(e, n),
            a = Mv(i, o, r),
            s = Lv(t, a),
            u = Ov(s, o, r);
        return () => ({
            getBounds: r,
            getPositionLimits: i,
            getZoomLimits: n,
            getPosition: s,
            getZoom: o,
            getRectangle: u
        })
    },
    oc = () => {
        let t = !1;
        return (e => {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
        })(navigator.userAgent || navigator.vendor), t
    },
    Bv = () => {
        let t = !1;
        return (e => {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
        })(navigator.userAgent || navigator.vendor), t
    };
oc();
Bv();
const ia = 2,
    sc = t => {
        const {
            on: e,
            off: r,
            clear: i,
            emit: n
        } = zo();
        return Be(() => {
            const o = t(),
                a = oc();
            let s = window.innerWidth / 2,
                u = window.innerHeight / 2,
                h, f, v, S, b, D;
            if (a) {
                let N = !1,
                    M;
                const A = m => {
                        M = (m.touches[0].pageX - m.touches[1].pageX) * (m.touches[0].pageX - m.touches[1].pageX) + (m.touches[0].pageY - m.touches[1].pageY) * (m.touches[0].pageY - m.touches[1].pageY), n("touchscalestart", m)
                    },
                    x = m => {
                        const R = ((m.touches[0].pageX - m.touches[1].pageX) * (m.touches[0].pageX - m.touches[1].pageX) + (m.touches[0].pageY - m.touches[1].pageY) * (m.touches[0].pageY - m.touches[1].pageY)) / M,
                            H = [(m.touches[0].pageX + m.touches[1].pageX) / 2, (m.touches[0].pageY + m.touches[1].pageY) / 2];
                        n("touchscalemove", {
                            domEvent: m,
                            extra: {
                                ratio: R,
                                mid: H
                            }
                        })
                    },
                    E = m => {
                        n("touchscaleend", m)
                    };
                h = m => {
                    m.touches.length === 2 ? (N = !0, A(m)) : (n("dragstart", m), s = m.touches[0].pageX, u = m.touches[0].pageY)
                }, f = m => {
                    if (m.preventDefault(), N) x(m);
                    else {
                        const R = m.touches[0].pageX - s,
                            H = m.touches[0].pageY - u;
                        s = m.touches[0].pageX, u = m.touches[0].pageY, n("dragmove", {
                            domEvent: m,
                            extra: {
                                dx: R,
                                dy: H
                            }
                        })
                    }
                }, v = m => {
                    N ? (E(m), N = !1, s = m.touches[0].pageX, u = m.touches[0].pageY) : n("dragend", m)
                }, o.addEventListener("touchstart", h, !1), o.addEventListener("touchmove", f, !1), o.addEventListener("touchend", v, !1)
            } else S = N => {
                N.target.matches("input") || n("keydown", N)
            }, b = N => {
                N.target.matches("input") || n("keypress", N)
            }, D = N => {
                N.target.matches("input") || n("keyup", N)
            }, document.addEventListener("keydown", S), document.addEventListener("keypress", b), document.addEventListener("keyup", D);
            let _ = 0,
                y = !1,
                I = !1;
            const k = N => {
                    // console.log(n)
                    I = !1, y && n("dragend", N), y = !1, n("docmouseup", N)
                    // console.log(N)
                },
                L = N => {
                    I = !1, _ < ia && n("click", N)
                },
                p = () => {
                    I = !0, _ = 0
                },
                O = N => {
                    n("mousewheel", {
                        domEvent: N,
                        extra: {
                            delta: N.deltaY,
                            lastMouseX: s,
                            lastMouseY: u
                        }
                    })
                },
                $ = N => {
                    n("dbclick", {
                        domEvent: N,
                        extra: {
                            lastMouseX: s,
                            lastMouseY: u
                        }
                    })
                },
                X = N => {
                    if (N === void 0) return;
                    const M = N.x - s,
                        A = N.y - u;
                    I && (_ += 1, _ > ia && (y ? n("dragmove", {
                        domEvent: N,
                        extra: {
                            dx: M,
                            dy: A
                        }
                    }) : (y = !0, n("dragstart", {
                        ...N,
                        lastMouseX: s,
                        lastMouseY: u,
                        isMouseDown: I,
                        dx: M,
                        dy: A
                    })))), n("docmousemove", N), y && (N.stopPropagation && N.stopPropagation(), N.preventDefault && N.preventDefault(), N.cancelBubble = !0, N.returnValue = !1, window.getSelection()?.removeAllRanges()), s = N.x, u = N.y
                };
            return document.addEventListener("mouseup", k, !1), o.addEventListener("mouseup", L, !1), o.addEventListener("mousedown", p, !1), o.addEventListener("wheel", O, {
                passive: !0
            }), o.addEventListener("dblclick", $), document.addEventListener("mousemove", X, !1), () => {
                a ? (o.removeEventListener("touchstart", h), o.removeEventListener("touchmove", f), o.removeEventListener("touchend", v)) : (document.removeEventListener("keydown", S), document.removeEventListener("keydown", b), document.removeEventListener("keyup", D)), document.removeEventListener("mouseup", k), o.removeEventListener("mouseup", L), o.removeEventListener("mousedown", p), o.removeEventListener("wheel", O), o.removeEventListener("dblclick", $), document.removeEventListener("mousemove", X)
            }
        }), {
            on: e,
            off: r,
            clear: i
        }
    },
    ac = t => {
        let e = !1;
        const r = () => {
            t(), e && requestAnimationFrame(r)
        };
        return {
            start: () => {
                e || (e = !0, r())
            },
            stop: () => {
                e = !1
            }
        }
    },
    ho = (t, e, r, i) => {
        let n = 0,
            o = r,
            a = r,
            s = r;
        const {
            start: u,
            stop: h
        } = ac(() => {
            const v = (Date.now() - n) / (i * 1e3);
            v > 1 && h(), t(o = e(a, s, v))
        });
        return {
            stop: h,
            smooth: (v, S = o) => {
                s === v && S === o || (s = v, a = S, n = Date.now(), u())
            }
        }
    },
    fo = (t, e, r, i) => {
        let n = 0,
            o = Je(r),
            a = Je(r),
            s = Je(r);
        const {
            start: u,
            stop: h
        } = ac(() => {
            const v = (Date.now() - n) / (i * 1e3);
            v > 1 && h(), t(o = e(a, s, v))
        });
        return {
            smooth: (v, S = o) => {
                Gr(s, v) && Gr(S, o) || (s = Je(v), a = Je(S), n = Date.now(), u())
            },
            stop: h
        }
    },
    Uv = (t, e, r) => r < 0 ? t : r > 1 ? e : Dt(t, jt(Me(e, t), r)),
    un = t => (e, r, i) => i < 0 ? e : i > 1 ? r : e + (1 - (1 - i) ** t) * (r - e),
    po = t => {
        const e = un(t);
        return (r, i, n) => Uv(r, i, e(0, 1, n))
    },
    lc = (t = 1, e = 1, r = 0, i = 0) => {
        let n = Date.now();
        return {
            limit: () => {
                const u = Date.now(),
                    h = (u - n) * .001,
                    f = Math.max(0, i - h * t),
                    v = Math.max((f - e + 1) / t, r - h, 0);
                return v > 0 ? v : (n = u, i = f + 1, 0)
            },
            getScore: () => Math.max(0, i - (Date.now() - n) * .001 * t),
            setScore: u => i = u
        }
    },
    je = 30,
    Fv = (t, e) => {
        const {
            on: r,
            off: i,
            clear: n,
            emit: o
        } = zo(), a = () => document.activeElement === t(), s = O => o("setPosition", Dt(e().getPosition(), O)), u = sc(t), h = .5, f = 20;
        let v = [0, 0];
        const {
            smooth: S,
            stop: b
        } = fo(s, po(3), [0, 0], 1), {
            smooth: D
        } = fo(s, po(3), [0, 0], .5), _ = lc(20);
        let y = e().getZoom(),
            I = [.5, .5];
        const k = O => {
                const $ = e(),
                    X = $.getZoom(),
                    N = $.getBounds(),
                    M = ic(N, Me(I, [.5, .5])),
                    A = (O - X) / (O * X);
                o("setZoom", O), s(jt(M, A))
            },
            {
                smooth: L
            } = ho(k, un(3), e().getZoom(), .25);
        u.on("dragstart", () => {
            t().classList.add("move"), b()
        }), u.on("dragmove", ({
            extra: O
        }) => {
            t().classList.add("move");
            const X = e().getZoom(),
                N = [-O.dx * devicePixelRatio / X, -O.dy * devicePixelRatio / X];
            v = Dt(jt(v, h), jt(N, 1 - h)), s(N)
        }), u.on("dragend", () => {
            t().classList.remove("move");
            const O = e().getZoom();
            nc(v) > f / O ** 2 && S([0, 0], v), v = [0, 0]
        }), u.on("keydown", O => {
            if (!a()) return;
            const $ = e().getZoom();
            switch (O.code) {
                case "ArrowLeft":
                    D([0, 0], v = [-je / $, 0]);
                    break;
                case "KeyA":
                    D([0, 0], v = [-je / $, 0]);
                    break;
                case "ArrowUp":
                    D([0, 0], v = [0, -je / $]);
                    break;
                case "KeyW":
                    D([0, 0], v = [0, -je / $]);
                    break;
                case "ArrowRight":
                    D([0, 0], v = [je / $, 0]);
                    break;
                case "KeyD":
                    D([0, 0], v = [je / $, 0]);
                    break;
                case "ArrowDown":
                    D([0, 0], v = [0, je / $]);
                    break;
                case "KeyS":
                    D([0, 0], v = [0, je / $]);
                    break
            }
        }), u.on("mousewheel", ({
            domEvent: O,
            extra: $
        }) => {
            if (!_.limit()) try {
                const [X, N] = e().getZoomLimits();
                y = bi(X, ($.delta < 0 ? 2 : .5) * y, N);
                const M = O.currentTarget,
                    {
                        width: A,
                        height: x
                    } = M.getBoundingClientRect();
                I = [$.lastMouseX / A, $.lastMouseY / x], L(y)
            } catch (X) {
                console.error("Cannot zoom, invalid element", X)
            }
        });
        let p = e().getZoom();
        return u.on("touchscalestart", () => {
            p = e().getZoom()
        }), u.on("touchscalemove", ({
            domEvent: O,
            extra: $
        }) => {
            const [X, N] = e().getZoomLimits(), M = Math.log(p * $.ratio) / Math.log(2), A = Math.round(M);
            y = 2 ** (Math.abs(M - A) < .1 ? A : M), y = bi(X, y, N);
            const x = O.currentTarget,
                {
                    width: E,
                    height: m
                } = x.getBoundingClientRect();
            I = [$.mid[0] / E, $.mid[1] / m], k(y)
        }), u.on("dbclick", ({
            domEvent: O,
            extra: $
        }) => {
            try {
                y = 64;
                const X = O.currentTarget,
                    {
                        width: N,
                        height: M
                    } = X.getBoundingClientRect();
                I = [$.lastMouseX / N, $.lastMouseY / M], L(y)
            } catch (X) {
                console.error("Cannot zoom, invalid element", X)
            }
        }), {
            on: r,
            off: i,
            clear: n
        }
    },
    Hv = t => {
        const [e, r] = at(!1);
        return t.on("dragstart", () => r(!0)), t.on("dragmove", () => r(!0)), t.on("dragend", () => r(!1)), e
    },
    cc = (t, e) => {
        const [r, i] = t.getBounds(), [n, o] = t.getPosition(), a = t.getZoom();
        e.translate(Math.round(r / 2), Math.round(i / 2)), e.scale(a, a), e.translate(-n, -o)
    },
    Yv = (t = devicePixelRatio) => {
        const [e, r] = at([0, 0]);
        return Be(() => {
            const i = () => r([Math.floor(window.innerWidth * t), Math.floor(window.innerHeight * t)]);
            return i(), window.addEventListener("resize", i), screen?.orientation && screen.orientation.addEventListener("change", i), () => {
                window.removeEventListener("resize", i), screen?.orientation && screen.orientation.removeEventListener("change", i)
            }
        }), e
    },
    zv = () => {
        const t = new Map;
        return {
            mockAction: (n, o, a) => t.set(n, setTimeout(() => {
                a(), t.delete(n)
            }, o)),
            validateAction: n => {
                const o = t.get(n);
                o && clearTimeout(o), t.delete(n)
            },
            clear: () => {
                Array.from(t.values()).forEach(n => clearTimeout(n)), t.clear()
            }
        }
    },
    Xv = t => it(() => er(t())),
    Vv = (t, e) => {
        const r = Xv(t);
        return it(() => {
            const n = e(),
                o = r();
            let a = !1,
                s = !1;
            const u = () => {
                const h = () => {
                    n(o), s ? requestAnimationFrame(h) : a = !1, s = !1
                };
                s = a, s || (requestAnimationFrame(h), a = !0)
            };
            return u(), {
                mkDirty: u
            }
        })
    },
    qv = (t, e, r) => it(() => {
        const n = e(),
            o = r();
        return a => {
            const {
                canvas: s
            } = a;
            Au(s), a.imageSmoothingEnabled = !1, a.fillStyle = "#000000", a.clearRect(0, 0, s.width, s.height);
            const u = t();
            a.save(), cc(u, a), n.forEach(h => h(a)), a.restore(), o.forEach(h => h(a))
        }
    }),
    Wv = (t, e, r, i, n) => {
        const o = Vv(t, qv(e, r, i));
        return gt(ee(ki, n)), gt(ee(() => e().getRectangle(), n)), o
    },
    Pt = 256,
    uc = (t, e) => {
        const r = 32 - Math.clz32(Math.max(t, e));
        let i = 0,
            n = 1;
        for (let o = 0; o < r; o++) i += (t & n) + 2 * (e & n) << o, n = n << 1;
        return i
    },
    na = t => {
        const e = 32 - Math.clz32(t);
        let r = 0,
            i = 1;
        for (let n = 0; n <= e; n++) r += t & i ? 2 ** n : 0, i = i << 2;
        return r
    },
    Dn = t => [na(t), na(t >> 1)],
    Gv = t => {
        let e = 0;
        for (; 4 ** e <= t;) e++;
        return e
    },
    ti = (t, e = Gv(t), r = [0, 0]) => {
        if (t === 0) return [];
        const i = e - 1,
            n = 2 ** i;
        switch (t >> 2 * i) {
            case 0:
                return ti(t & 4 ** i - 1, i, r);
            case 1:
                return [
                    [r, Dt(r, [n, n])], ...ti(t & 4 ** i - 1, i, Dt(r, [n, 0]))
                ];
            case 2:
                return [
                    [r, Dt(r, [2 * n, n])], ...ti(t & 4 ** i - 1, i, Dt(r, [0, n]))
                ];
            case 3:
                return [
                    [r, Dt(r, [2 * n, n])],
                    [Dt(r, [0, n]), Dt(r, [n, 2 * n])], ...ti(t & 4 ** i - 1, i, Dt(r, [n, n]))
                ];
            default:
                throw new Error("Cannot compute grid rectangles.")
        }
    },
    li = 1,
    jv = (t, e, [r, i]) => {
        const n = e.getZoom();
        if (n <= 32) return;
        const [o, a] = e.getRectangle(), [s, u] = e.getBounds(), [h, f] = r, [v, S] = i, b = li * n, D = li * n;
        let _ = -n * (o[0] - h),
            y = -n * (o[1] - f);
        const I = s,
            k = u;
        _ = _ < 0 ? _ % b : _, y = y < 0 ? y % D : y, t.lineWidth = 3, t.strokeStyle = "#0c0c0e80", t.beginPath();
        const L = y,
            p = Math.min(I, I - n * (a[0] - v)),
            O = Math.min(k, k - n * (a[1] - S));
        for (; y < O;) t.moveTo(_, y), t.lineTo(p, y), y += D;
        for (y = L; _ < p;) t.moveTo(_, y), t.lineTo(_, O), _ += b;
        t.stroke()
    },
    Zv = (t, e, r) => {
        const i = ti(r),
            [n, o] = e.getPositionLimits(),
            a = jt(Me(o, n), .5 / li),
            s = (u, h) => Math.max(Math.min(u, o[h]), n[h]);
        i.forEach(([u, h]) => jv(t, e, [wr(jt(Me(u, a), li), s), wr(jt(Me(h, a), li), s)]))
    },
    Qv = (t, e) => it(() => {
        const i = t(),
            n = e();
        return o => {
            ki() && Zv(o, n, (i * Pt) ** 2)
        }
    }),
    Kv = (t, e, r, i) => {
        const a = [0, 0],
            s = .1,
            u = .2,
            h = .1;
        let f = Je(a);
        const {
            smooth: v
        } = fo(k => {
            f = Je(k), i()
        }, po(3), a, s);
        let S = 1;
        const {
            smooth: b
        } = ho(k => {
            S = k, i()
        }, un(3), 1, h);
        let D = .1;
        const {
            smooth: _
        } = ho(k => {
            D = k, i()
        }, un(3), .1, u);
        return gt(k => {
            const L = t();
            return Gr(k, L) || (nc(Me(k, L)) > 2 ? f = L : v(L, k)), Je(L)
        }, [0, 0]), gt(() => b(e() ? 1 : 0)), {
            click: () => _(.1, 5 * .1),
            draw: k => {
                k.beginPath(), k.lineWidth = D, k.globalAlpha = S, k.strokeStyle = r(), k.rect(f[0], f[1], 1, 1), k.closePath(), k.stroke(), k.globalAlpha = 1
            }
        }
    },
    Jv = t => it(() => {
		const r = t();
		//console.log(r); pixel at
        if (!r) return "#ccc";
        const {
            r: i,
            g: n,
            b: o
        } = xo(r);
        return i + n + o < 128 ? "#ccc" : "#111"
    }),
    oa = {}.VITE_SERVER_ADDRESS || `${window.location.origin}/server`,
    tm = {}.VITE_TILES_ADDRESS || `${window.location.origin}/tiles`,
    em = {}.VITE_ZONES_ADDRESS || `${window.location.origin}/zones`,
    Nr = {}.VITE_USERS_ADDRESS || `${window.location.origin}/users`,
    rm = {}.VITE_OVERLAYS_ADDRESS || `${window.location.origin}/overlays`;
var sa = {},
    im = function(t, e, r, i, n) {
        var o = new Worker(sa[e] || (sa[e] = URL.createObjectURL(new Blob([t + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'], {
            type: "text/javascript"
        }))));
        return o.onmessage = function(a) {
            var s = a.data,
                u = s.$e$;
            if (u) {
                var h = new Error(u[0]);
                h.code = u[1], h.stack = u[2], n(h, null)
            } else n(null, s)
        }, o.postMessage(r, i), o
    },
    Gt = Uint8Array,
    tr = Uint16Array,
    Xo = Uint32Array,
    Vo = new Gt([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
    qo = new Gt([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
    hc = new Gt([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    fc = function(t, e) {
        for (var r = new tr(31), i = 0; i < 31; ++i) r[i] = e += 1 << t[i - 1];
        for (var n = new Xo(r[30]), i = 1; i < 30; ++i)
            for (var o = r[i]; o < r[i + 1]; ++o) n[o] = o - r[i] << 5 | i;
        return [r, n]
    },
    dc = fc(Vo, 2),
    Wo = dc[0],
    nm = dc[1];
Wo[28] = 258, nm[258] = 28;
var om = fc(qo, 0),
    pc = om[0],
    hn = new tr(32768);
for (var _t = 0; _t < 32768; ++_t) {
    var Ze = (_t & 43690) >>> 1 | (_t & 21845) << 1;
    Ze = (Ze & 52428) >>> 2 | (Ze & 13107) << 2, Ze = (Ze & 61680) >>> 4 | (Ze & 3855) << 4, hn[_t] = ((Ze & 65280) >>> 8 | (Ze & 255) << 8) >>> 1
}
var Br = function(t, e, r) {
        for (var i = t.length, n = 0, o = new tr(e); n < i; ++n) t[n] && ++o[t[n] - 1];
        var a = new tr(e);
        for (n = 0; n < e; ++n) a[n] = a[n - 1] + o[n - 1] << 1;
        var s;
        if (r) {
            s = new tr(1 << e);
            var u = 15 - e;
            for (n = 0; n < i; ++n)
                if (t[n])
                    for (var h = n << 4 | t[n], f = e - t[n], v = a[t[n] - 1]++ << f, S = v | (1 << f) - 1; v <= S; ++v) s[hn[v] >>> u] = h
        } else
            for (s = new tr(i), n = 0; n < i; ++n) t[n] && (s[n] = hn[a[t[n] - 1]++] >>> 15 - t[n]);
        return s
    },
    Ti = new Gt(288);
for (var _t = 0; _t < 144; ++_t) Ti[_t] = 8;
for (var _t = 144; _t < 256; ++_t) Ti[_t] = 9;
for (var _t = 256; _t < 280; ++_t) Ti[_t] = 7;
for (var _t = 280; _t < 288; ++_t) Ti[_t] = 8;
var gc = new Gt(32);
for (var _t = 0; _t < 32; ++_t) gc[_t] = 5;
var vc = Br(Ti, 9, 1),
    mc = Br(gc, 5, 1),
    Xi = function(t) {
        for (var e = t[0], r = 1; r < t.length; ++r) t[r] > e && (e = t[r]);
        return e
    },
    se = function(t, e, r) {
        var i = e / 8 | 0;
        return (t[i] | t[i + 1] << 8) >> (e & 7) & r
    },
    Vi = function(t, e) {
        var r = e / 8 | 0;
        return (t[r] | t[r + 1] << 8 | t[r + 2] << 16) >> (e & 7)
    },
    _c = function(t) {
        return (t + 7) / 8 | 0
    },
    yc = function(t, e, r) {
        (e == null || e < 0) && (e = 0), (r == null || r > t.length) && (r = t.length);
        var i = new(t.BYTES_PER_ELEMENT == 2 ? tr : t.BYTES_PER_ELEMENT == 4 ? Xo : Gt)(r - e);
        return i.set(t.subarray(e, r)), i
    },
    wc = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"],
    Ot = function(t, e, r) {
        var i = new Error(e || wc[t]);
        if (i.code = t, Error.captureStackTrace && Error.captureStackTrace(i, Ot), !r) throw i;
        return i
    },
    In = function(t, e, r) {
        var i = t.length;
        if (!i || r && r.f && !r.l) return e || new Gt(0);
        var n = !e || r,
            o = !r || r.i;
        r || (r = {}), e || (e = new Gt(i * 3));
        var a = function(xt) {
                var At = e.length;
                if (xt > At) {
                    var wt = new Gt(Math.max(At * 2, xt));
                    wt.set(e), e = wt
                }
            },
            s = r.f || 0,
            u = r.p || 0,
            h = r.b || 0,
            f = r.l,
            v = r.d,
            S = r.m,
            b = r.n,
            D = i * 8;
        do {
            if (!f) {
                s = se(t, u, 1);
                var _ = se(t, u + 1, 3);
                if (u += 3, _)
                    if (_ == 1) f = vc, v = mc, S = 9, b = 5;
                    else if (_ == 2) {
                    var L = se(t, u, 31) + 257,
                        p = se(t, u + 10, 15) + 4,
                        O = L + se(t, u + 5, 31) + 1;
                    u += 14;
                    for (var $ = new Gt(O), X = new Gt(19), N = 0; N < p; ++N) X[hc[N]] = se(t, u + N * 3, 7);
                    u += p * 3;
                    for (var M = Xi(X), A = (1 << M) - 1, x = Br(X, M, 1), N = 0; N < O;) {
                        var E = x[se(t, u, A)];
                        u += E & 15;
                        var y = E >>> 4;
                        if (y < 16) $[N++] = y;
                        else {
                            var m = 0,
                                R = 0;
                            for (y == 16 ? (R = 3 + se(t, u, 3), u += 2, m = $[N - 1]) : y == 17 ? (R = 3 + se(t, u, 7), u += 3) : y == 18 && (R = 11 + se(t, u, 127), u += 7); R--;) $[N++] = m
                        }
                    }
                    var H = $.subarray(0, L),
                        Y = $.subarray(L);
                    S = Xi(H), b = Xi(Y), f = Br(H, S, 1), v = Br(Y, b, 1)
                } else Ot(1);
                else {
                    var y = _c(u) + 4,
                        I = t[y - 4] | t[y - 3] << 8,
                        k = y + I;
                    if (k > i) {
                        o && Ot(0);
                        break
                    }
                    n && a(h + I), e.set(t.subarray(y, k), h), r.b = h += I, r.p = u = k * 8, r.f = s;
                    continue
                }
                if (u > D) {
                    o && Ot(0);
                    break
                }
            }
            n && a(h + 131072);
            for (var U = (1 << S) - 1, q = (1 << b) - 1, W = u;; W = u) {
                var m = f[Vi(t, u) & U],
                    et = m >>> 4;
                if (u += m & 15, u > D) {
                    o && Ot(0);
                    break
                }
                if (m || Ot(2), et < 256) e[h++] = et;
                else if (et == 256) {
                    W = u, f = null;
                    break
                } else {
                    var J = et - 254;
                    if (et > 264) {
                        var N = et - 257,
                            Z = Vo[N];
                        J = se(t, u, (1 << Z) - 1) + Wo[N], u += Z
                    }
                    var pt = v[Vi(t, u) & q],
                        ut = pt >>> 4;
                    pt || Ot(3), u += pt & 15;
                    var Y = pc[ut];
                    if (ut > 3) {
                        var Z = qo[ut];
                        Y += Vi(t, u) & (1 << Z) - 1, u += Z
                    }
                    if (u > D) {
                        o && Ot(0);
                        break
                    }
                    n && a(h + 131072);
                    for (var vt = h + J; h < vt; h += 4) e[h] = e[h - Y], e[h + 1] = e[h + 1 - Y], e[h + 2] = e[h + 2 - Y], e[h + 3] = e[h + 3 - Y];
                    h = vt
                }
            }
            r.l = f, r.p = W, r.b = h, r.f = s, f && (s = 1, r.m = S, r.d = v, r.n = b)
        } while (!s);
        return h == e.length ? e : yc(e, 0, h)
    },
    sm = new Gt(0),
    am = function(t, e) {
        var r = {};
        for (var i in t) r[i] = t[i];
        for (var i in e) r[i] = e[i];
        return r
    },
    aa = function(t, e, r) {
        for (var i = t(), n = t.toString(), o = n.slice(n.indexOf("[") + 1, n.lastIndexOf("]")).replace(/\s+/g, "").split(","), a = 0; a < i.length; ++a) {
            var s = i[a],
                u = o[a];
            if (typeof s == "function") {
                e += ";" + u + "=";
                var h = s.toString();
                if (s.prototype)
                    if (h.indexOf("[native code]") != -1) {
                        var f = h.indexOf(" ", 8) + 1;
                        e += h.slice(f, h.indexOf("(", f))
                    } else {
                        e += h;
                        for (var v in s.prototype) e += ";" + u + ".prototype." + v + "=" + s.prototype[v].toString()
                    }
                else e += h
            } else r[u] = s
        }
        return [e, r]
    },
    Fi = [],
    lm = function(t) {
        var e = [];
        for (var r in t) t[r].buffer && e.push((t[r] = new t[r].constructor(t[r])).buffer);
        return e
    },
    cm = function(t, e, r, i) {
        var n;
        if (!Fi[r]) {
            for (var o = "", a = {}, s = t.length - 1, u = 0; u < s; ++u) n = aa(t[u], o, a), o = n[0], a = n[1];
            Fi[r] = aa(t[s], o, a)
        }
        var h = am({}, Fi[r][1]);
        return im(Fi[r][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + e.toString() + "}", r, h, lm(h), i)
    },
    Go = function() {
        return [Gt, tr, Xo, Vo, qo, hc, Wo, pc, vc, mc, hn, wc, Br, Xi, se, Vi, _c, yc, Ot, In, Sc, $n, jo]
    },
    um = function() {
        return [bc, xc]
    },
    hm = function() {
        return [Ec]
    },
    $n = function(t) {
        return postMessage(t, [t.buffer])
    },
    jo = function(t) {
        return t && t.size && new Gt(t.size)
    },
    Zo = function(t, e, r, i, n, o) {
        var a = cm(r, i, n, function(s, u) {
            a.terminate(), o(s, u)
        });
        return a.postMessage([t, e], e.consume ? [t.buffer] : []),
            function() {
                a.terminate()
            }
    },
    bc = function(t) {
        (t[0] != 31 || t[1] != 139 || t[2] != 8) && Ot(6, "invalid gzip data");
        var e = t[3],
            r = 10;
        e & 4 && (r += t[10] | (t[11] << 8) + 2);
        for (var i = (e >> 3 & 1) + (e >> 4 & 1); i > 0; i -= !t[r++]);
        return r + (e & 2)
    },
    xc = function(t) {
        var e = t.length;
        return (t[e - 4] | t[e - 3] << 8 | t[e - 2] << 16 | t[e - 1] << 24) >>> 0
    },
    Ec = function(t) {
        ((t[0] & 15) != 8 || t[0] >>> 4 > 7 || (t[0] << 8 | t[1]) % 31) && Ot(6, "invalid zlib data"), t[1] & 32 && Ot(6, "invalid zlib data: preset dictionaries not supported")
    };

function fm(t, e, r) {
    return r || (r = e, e = {}), typeof r != "function" && Ot(7), Zo(t, e, [Go], function(i) {
        return $n(Sc(i.data[0], jo(i.data[1])))
    }, 1, r)
}

function Sc(t, e) {
    return In(t, e)
}

function dm(t, e, r) {
    return r || (r = e, e = {}), typeof r != "function" && Ot(7), Zo(t, e, [Go, um, function() {
        return [la]
    }], function(i) {
        return $n(la(i.data[0]))
    }, 3, r)
}

function la(t, e) {
    return In(t.subarray(bc(t), -8), e || new Gt(xc(t)))
}

function pm(t, e, r) {
    return r || (r = e, e = {}), typeof r != "function" && Ot(7), Zo(t, e, [Go, hm, function() {
        return [ca]
    }], function(i) {
        return $n(ca(i.data[0], jo(i.data[1])))
    }, 5, r)
}

function ca(t, e) {
    return In((Ec(t), t.subarray(2, -4)), e)
}

function gm(t, e, r) {
    return r || (r = e, e = {}), typeof r != "function" && Ot(7), t[0] == 31 && t[1] == 139 && t[2] == 8 ? dm(t, e, r) : (t[0] & 15) != 8 || t[0] >> 4 > 7 || (t[0] << 8 | t[1]) % 31 ? fm(t, e, r) : pm(t, e, r)
}
var vm = typeof TextDecoder < "u" && new TextDecoder,
    mm = 0;
try {
    vm.decode(sm, {
        stream: !0
    }), mm = 1
} catch {}
const jn = new Map,
    _m = t => {
        if (jn.get(t) === void 0) {
            const [e, r] = Dn(t);
            jn.set(t, 4 * (r * Pt + e))
        }
        return jn.get(t)
    },
    ym = t => new Promise((e, r) => {
        gm(new Uint8Array(t), (i, n) => {
            i ? (console.error("Error during tile buffer decompression."), r(i)) : e(n)
        })
    }),
    wm = (t, e) => {
        const r = new Uint8ClampedArray(4 * Pt ** 2);
        for (let i = 0; i < Pt ** 2; i++) Pa(r, _m(i), e[i % 2 === 0 ? t[i >> 1] >> 4 : t[i >> 1] & 15]);
        return r
    },
    bm = (t, e) => ym(t).then(r => wm(r, e));

function ua() {
    return new Worker("/assets/imageData.worker.0f4f7f46.js", {
        type: "module"
    })
}
const go = new Map,
    fn = window.Worker && ua ? new ua : void 0;
fn ? fn.addEventListener("message", ({
    data: t
}) => {
    const e = go.get(t.id);
    e ? (e(t.data), go.delete(t.id)) : console.warn(`Promised image data ${t.id} not found.`)
}) : console.warn("WebWorkers are not supported, performances may be degraded.");
const xm = t => it(() => {
        const {
            id: r,
            size: i,
            colors: n
        } = t(), o = n.map(xo);
        return a => a.map(([s, u]) => fetch(`${tm}/buffer/${r}/${uc(s+i/2,u+i/2)}`).then(h => h.arrayBuffer()).then(h => {
            if (fn) {
                const f = `${s}:${u}`;
                return fn.postMessage({
                    id: f,
                    data: h,
                    rgbColors: o
                }), new Promise(v => go.set(f, v))
            }
            return bm(h, o)
        }).then(h => new ImageData(h, Pt, Pt)))
    }),
    Qo = (t, e) => Be(() => {
        const r = e(),
            i = setInterval(t, r);
        return () => clearInterval(i)
    }),
    Em = () => {
        const t = [0, 0, 1];
        try {
            const e = new URLSearchParams(window.location.search).get("p"),
                r = window.location.hash.slice(1);
            (e || r).split(",").filter(i => /^-?\d+$/.test(i)).map(i => Number(i)).forEach((i, n) => t[n] = i)
        } catch (e) {
            console.error("Cannot deduce X, Y, zoom from URL.", e)
        }
        return t
    },
    Sm = (t, e) => {
        const r = ([i, n], o) => {
            const a = (o === 1 ? [i, n] : [i, n, o]).map(s => s.toFixed(0)).join(",");
            window.location.hash.slice(1) !== a && (window.location.hash = a)
        };
        Qo(() => r(t(), e()), () => 1e3)
    },
    km = t => it(() => {
        const r = t();
        return [jt(r, -Pt / 2), jt(r, Pt / 2)]
    }),
    Am = () => it(() => [1, 64]),
    Cm = t => {
        const e = r => {
            t.send({
                type: "captchaResponse",
                payload: r
            })
        };
        return t.on("captchaQuestion", r => {
            rc(r), Tn(!0)
        }), t.on("captchaStatus", r => {
            r === Ar.SUCCESS ? Zg() : Qg()
        }), e
    };
let ha = !0;
const Tm = () => gt(ee(Fo, t => {
    if (ha) return ha = !1;
    t === Ar.SUCCESS ? ll.play() : t === Ar.FAILURE && al.play()
}));
var ce = (t => (t[t.INFO = 0] = "INFO", t[t.WARN = 1] = "WARN", t[t.SUCCESS = 2] = "SUCCESS", t[t.FAILURE = 3] = "FAILURE", t))(ce || {});
const [Ke, Ae] = at({
    type: 0,
    title: "Welcome",
    description: "Welcome to our website \u{1F44B}",
    visibility: !1
});
let fa = !0;
const Dm = () => gt(ee(Fo, t => {
        if (fa) return fa = !1;
        t === Ar.SUCCESS ? (Ae({
            type: ce.SUCCESS,
            title: "Captcha Success",
            description: "You successfully passed the captcha.",
            visibility: !0
        }), setTimeout(() => Ae({
            ...Ke(),
            visibility: !1
        }), 2e3)) : t === Ar.FAILURE && (Ae({
            type: ce.FAILURE,
            title: "Captcha Failure",
            description: "Wrong captcha answer, retry in 15s...",
            visibility: !0
        }), setTimeout(() => Ae({
            ...Ke(),
            visibility: !1
        }), 2e3))
    })),
    Im = t => {
        const [e, r] = at(0);
        return t.on("playerCount", i => r(i)), e
    },
    $m = () => new Promise(t => {
        Notification.permission === "default" ? Notification.requestPermission(t) : t(Notification.permission)
    }),
    Pm = (t, e, r) => {
        if (!("Notification" in window)) return Promise.resolve("denied");
        const i = () => {
            const n = new Notification(t, {
                icon: e,
                body: r
            });
            n.onclick = function() {
                window.focus(), this.close()
            }
        };
        return $m().then(n => (n === "granted" && i(), n))
    },
    Lm = (t, e, r) => {
        const [i, n] = at(0);
        return Qo(() => {
            const o = i();
            o < e() && n(o + 1)
        }, r), t.on("pixelCount", o => n(o)), gt(ee(i, o => {
            o === e() && document.hidden && Po() && Pm("pixelzone.io", "assets/icons/pixelzone_64.png", "Your pixel supply is now full \u{1F4AF}")
        })), [i, () => n(o => o - 1)]
    },
    Rm = (t, e, r, i, n, o) => it(() => e() <= 0 || r() > 0 || i() === n() || o() ? !1 : t() >= 16),
    Om = (t, e, r, i) => {
        const n = Eo(() => r().colors);
        t.on("pixelBatch", o => te(() => {
            const {
                size: a
            } = r(), s = n();
            i().setPixels(o.map(({
                value: h,
                index: f
            }) => ({
                value: s[h],
                index: Me(Dn(f), [Pt * a >> 1, Pt * a >> 1])
            }))), o.forEach(({
                value: h,
                index: f
            }) => e.validateAction(`${f}:${h}`))
        }))
    },
    Mm = (t, e) => {
        const [r, i] = at(!0), n = it(() => {
            r();
			window.getPixelAt = function(_x, _y) {
				const {
					r: R,
					g: G,
					b: B
				} = t().getPixels([[_x,_y]])[0].value;
				return `[${R}, ${G}, ${B}]`
			}
            const o = t().getPixels([e()]).map(({
                value: a
            }) => a);
            return o.length ? Tu(o[0]) : void 0
        });
        return Be(() => {
            const o = t(),
                a = () => i(s => !s);
            return o.on("*", a), () => o.off("*", a)
        }), n
    },
    Nm = (t, e) => it(() => {
		// console.log(e);
        const i = e(); //pixel color at current coordinates
		// console.log(i);
        return i ? t().colors.indexOf(i) : void 0
    }),
    Bm = () => fetch(`${Nr}/profile/me`, {
        method: "GET",
        credentials: "include"
    }).then(t => t.json()).catch(t => {
        console.warn("You are not logged in. You cannot place pixels.", t)
    }),
    Um = () => _o(Bm),
    [Fm, kc] = at(!1),
    Pn = Um(),
    Hm = (t, e, r, i, n, o, a, s, u, h, f) => {
        window.paint = (_x, _y, color) => {
            const {
                size: y
            } = i();
            const I = [_x,_y]
            if (color === void 0) return;
            const [L, p] = Dt(I, [Pt * y >> 1, Pt * y >> 1]), O = uc(L, p);
            e.send({
                type: "pixel",
                payload: {
                    index: O,
                    value: color
                }
            });
            const $ = S(),
            X = s();
            if (X === void 0) return;
            const N = `${O}:${color}`;
            n().setPixels([{
                index: I,
                value: $[color]
            }]), r.mockAction(N, 5e3, () => {
				window.changeFavicon("http://localhost:5000/on-captcha.ico");
                window.disconnected = true;
                console.warn(`Did not receive pixel confirmation for ${N}`), n().setPixels([{
                    index: I,
                    value: $[X]
                }])
            })
        }
        const [v] = Pn, S = Eo(() => i().colors), b = () => {
			const {
                size: y
            } = i(), I = a(), k = u();
            //I: coords, k: color
            if (k === void 0) return;
            const [L, p] = Dt(I, [Pt * y >> 1, Pt * y >> 1]), O = uc(L, p);
            e.send({
                type: "pixel",
                payload: {
                    index: O,
                    value: k
                }
            });
            const $ = S(),
                X = s();
            if (X === void 0) return;
            const N = `${O}:${k}`;
            n().setPixels([{
                index: I,
                value: $[k]
            }]), r.mockAction(N, 5e3, () => {
                console.warn(`Did not receive pixel confirmation for ${N}`), n().setPixels([{
                    index: I,
                    value: $[X]
                }])
            })
        }, D = () => {
            if (!!o()) { //game pixel color
                if (v() === void 0) return kc(!0);
                Fo() !== Ar.SUCCESS && Tn(!0), h(), f(), sl.play(), b()
            }
        };
        t.on("click", () => {
            te(() => D()), _ = !1
        });
        let _ = !1;
        t.on("keydown", ({
            shiftKey: y
        }) => {
            y && (_ = !0, D())
        }), t.on("keyup", () => {
            _ = !1
        }), gt(() => {
            a(), _ && te(() => D())
        })
    },
    Ym = (t, e) => Dt(t.getPosition(), jt(ic(t.getBounds(), Me(e, [.5, .5])), 1 / t.getZoom())),
    zm = (t, e, r) => {
        const [i, n] = at([0, 0]);
        return t.on("docmousemove", ({
            clientX: o,
            clientY: a
        }) => {
            if (r && r()) return;
            const s = wr(Ym(e(), [o / window.innerWidth, a / window.innerHeight]), Math.floor),
                u = i();
            Gr(u, s) || n(s)
        }), i
    },
    Xm = (t, e) => zm(t, e),
    Vm = t => {
        const [e, r] = at(0);
        return Qo(() => {
            const i = e();
            i > 0 && r(i - 1)
        }, () => 1e3), t.on("penality", i => r(i)), e
    },
    da = 5e3,
    qm = (t, e) => {
        let r = !1,
            i = !1,
            n = !1,
            o = null;
        const {
            emit: a,
            ...s
        } = Yo(), u = v => {
            if (r || i) {
                console.error("Socket is already opened");
                return
            }
            r = !0, o = new WebSocket(v), o.binaryType = "arraybuffer", o.onopen = () => {
                r = !1, i = !0, n = !1, a("open"), console.log("Connected!")
            }, o.onerror = S => {
                console.error("Socket error, closing socket", S), o?.close()
            }, o.onmessage = ({
                data: S
            }) => {
                try {
                    if (typeof S == "string") {
                        if (!S) return;
                        const {
                            type: b,
                            payload: D
                        } = JSON.parse(S);
                        a(b, D)
                    } else {
                        if (S.byteLength === 0) return;
                        const b = new DataView(new Uint8Array(S).buffer),
                            D = t(b);
                        D !== null && a(D.type, D.payload)
                    }
                } catch (b) {
                    console.error(`Socket parsing error, message ${S}`, b)
                }
            }, o.onclose = S => {
                o = null, r = !1, i = !1, a("close", S.reason);
                const b = (da / 1e3).toFixed(0);
                console.warn(`Connection closed, try to reconnect in ${b}s.`, "Reason :", S), setTimeout(() => {
                    n || (a("reconnect"), u(v))
                }, da)
            }
        };
        return {
            ...s,
            open: u,
            close: () => {
                o?.close(), n = !0
            },
            send: v => {
                o?.send(e(v))
            }
        }
    },
    Wm = t => gt(() => {
        let e = !1;
        t.on("reconnect", () => e = !0), t.on("open", () => {
            !e || (Ae({
                type: ce.INFO,
                title: "Reconnected",
                description: "You are currently connected",
                visibility: !0
            }), e = !1)
        }), t.on("close", () => {
			window.changeFavicon("http://localhost:5000/on-captcha.ico");
            window.disconnected = true;
			Ae({
				type: ce.WARN,
				title: "Connection lost",
				description: "You are currently disconnected",
				visibility: !0
			});
		});
    }),
    Gm = t => {
        switch (t.type) {
            case "someOtherEventType": {
                const e = new ArrayBuffer(1);
                return new DataView(e).setUint8(0, 0), e
            }
            case "pixel": {
                const {
                    index: e,
                    value: r
                } = t.payload, i = new ArrayBuffer(6), n = new DataView(i);
                return n.setUint8(0, 0), n.setUint8(1, e & 255), n.setUint8(2, e >> 8 & 255), n.setUint8(3, e >> 16 & 255), n.setUint8(4, e >> 24 & 3), n.setUint8(5, r), i
            }
            case "captchaResponse": {
                const e = t.payload,
                    r = new ArrayBuffer(3),
                    i = new DataView(r);
                return i.setUint8(0, 1), i.setUint16(1, e), r
            }
            default:
                throw new Error(`Unkown hydrated message ${JSON.stringify(t)}.`)
        }
    },
    jm = t => {
        const e = t.getUint8(0);
        switch (e) {
            case 0:
                return {
                    type: "someEventType", payload: {
                        someNumber: t.getUint8(1)
                    }
                };
            case 1:
                return {
                    type: "playerCount", payload: t.getUint8(1) + (t.getUint8(2) << 8) + (t.getUint8(3) << 16)
                };
            case 2:
                return {
                    type: "pixelBatch", payload: new Array(Math.floor((t.byteLength - 1) / 5)).fill(null).map((r, i) => ({
                        index: t.getUint8(5 * i + 1) + (t.getUint8(5 * i + 2) << 8) + (t.getUint8(5 * i + 3) << 16) + (t.getUint8(5 * i + 4) << 24),
                        value: t.getUint8(5 * i + 5)
                    }))
                };
            case 3:
                return {
                    type: "pixelCount", payload: t.getUint8(1)
                };
            case 4:
                return {
                    type: "captchaQuestion", payload: {
                        data: new Uint8Array(t.buffer).slice(1, _e * mt * mt / 4 + 1),
                        model: new Uint8Array(t.buffer).slice(_e * mt * mt / 4 + 1, _e * mt * mt / 2 + 1)
                    }
                };
            case 5:
                return {
                    type: "captchaStatus", payload: t.getUint8(1)
                };
            case 6:
                return {
                    type: "penality", payload: t.getUint8(1)
                };
            default:
                throw new Error(`Unknown type code ${e} received from binary message`)
        }
    },
    Zm = t => {
        const e = qm(jm, Gm);
        return Be(() => (e.open(t()), () => e.close())), Wm(e), e
    },
    Qm = async t => {
        try {
            return await fetch(`${rm}/${t}`, {
                method: "GET"
            }).then(e => e.json())
        } catch {
            return console.warn("An error occured. Please, try again later."), Promise.resolve([])
        }
    }, Ac = t => _o(t(), Qm), Km = (t, e) => {
        const [r, i] = at();
        return gt(() => {
            const n = e();
            if (n === void 0) return;
            const o = n.map(({
                index: a,
                image: s
            }) => {
                let [u, h] = Dn(a);
                const f = document.createElement("img");
                return u -= Pt * t() / 2, h -= Pt * t() / 2, f.src = s, {
                    delta: [u, h],
                    image: f
                }
            }) || [];
            return Promise.all(o.map(({
                image: a
            }) => new Promise(s => a.onload = s))).then(() => i(o))
        }), r
    }, Jm = t => r => t().forEach(({
        delta: i,
        image: n
    }) => r.drawImage(n, i[0] - n.width / 2, i[1] - n.height / 2, n.width, n.height)), t_ = (t, e) => {
        const [r] = Ac(() => t().id), [i, n] = at([]);
        gt(() => {
            const s = r(),
                {
                    size: u
                } = t();
            Promise.all(s?.map(({
                index: h,
                image: f
            }) => new Promise(v => {
                const S = document.createElement("img");
                S.src = f, S.crossOrigin = "anonymous", S.onload = () => {
                    v({
                        data: Lu(S).data,
                        width: S.width,
                        delta: Me(Dn(h), [(Pt * u + S.width) / 2, (Pt * u + S.height) / 2])
                    })
                }
            })) || []).then(h => n(h))
        });
        const o = ([s, u]) => {
            for (const {
                    data: h,
                    width: f,
                    delta: v
                }
                of i())
                if (s -= v[0], u -= v[1], h[4 * (u * f + s) + 3] > 0) return !0;
            return !1
        };
        return it(() => o(e()))
    }, e_ = t => {
        const [e, r] = tl(), i = () => o.emit("mkdirty"), n = sc(e), o = Yo(), a = it(() => {
            const {
                size: Z
            } = t();
            return [Z, Z]
        }), s = it(() => Pt), [u, h, f] = Em(), [v, S] = at([u, h]), [b, D] = at(f), _ = Nv(v, b, Yv(), km(a), Am()), y = Fv(e, _);
        y.on("setPosition", S), y.on("setZoom", D);
        const I = it(() => _().getRectangle());
        Hv(n), Sm(v, b);
        const k = Pv(I, s, a, xm(t), i),
            [L] = Ac(() => t().id),
            p = Km(() => t().size, L),
            O = Jm(() => p() || []);
        if (typeof oa != "string") throw new Error("Environment variable API address is not a string.");
        const $ = Zm(() => `${oa.replace("http","ws")}/${t().id}`),
            X = Im($),
            N = Cm($);
        Dm(), Tm();
        const [M, A] = at(0), x = Xm(n, _), E = Mm(k, x), m = Nm(t, E), R = t_(t, x), [H, Y] = Lm($, () => t().pixelCapacity, () => 1e3 * t().pixelCooldown), U = Vm($), q = Rm(b, H, U, m, M, R), W = zv();
        Om($, W, t, k), Hm(n, $, W, t, k, q, x, m, M, Y, () => et.click()), gt(() => {
            R() ? e().classList.add("not-allowed") : e().classList.remove("not-allowed")
        });
        const et = Kv(x, q, Jv(E), i),
            J = Qv(() => t().size, _);
        return gt(ee([e], ([Z]) => {
            if (Z === void 0) return;
            const pt = Wv(e, _, () => [p() === void 0 ? () => !1 : k().draw, et.draw], () => [J(), ut => {
                ut.save(), cc(_(), ut), O(ut), ut.restore()
            }], i);
            gt(ee(ki, i)), gt(ee(I, i)), Be(() => (Z.addEventListener("change", i), () => Z.removeEventListener("change", i))), Be(() => {
                const ut = pt();
                if (!ut) return;
                const vt = () => ut.mkDirty();
                return o.on("mkdirty", vt), () => o.off("mkdirty", vt)
            })
        })), {
            setCanvas: r,
            getPixelCount: H,
            getPixelPenality: U,
            getPixelPosition: x,
            getPlayerCount: X,
            setPaletteColorID: A,
            getPaletteColorID: M,
            sendCaptchaResponse: N
        }
    }, r_ = "_snack_kmobk_1", i_ = "_grow_kmobk_1";
var gr = {
    snack: r_,
    grow: i_,
    "snack-icon": "_snack-icon_kmobk_6",
    "snack-title": "_snack-title_kmobk_12",
    "snack-description": "_snack-description_kmobk_17"
};
const pa = F("<p></p>"),
    n_ = t => it((() => {
        const e = it(() => !!t.isShowing);
        return () => e() ? w(j, {
            center: !0,
            row: !0,
            get class() {
                return K(gr.snack, ht.background, ht.padding, ht.margin, ht["fit-content"], ht["pointer-auto"])
            },
            get children() {
                return [w(cr, {
                    get children() {
                        return [w(Mt, {
                            get when() {
                                return t.type === ce.INFO
                            },
                            get children() {
                                return w(Ja, {
                                    color: "#0f66ce",
                                    get class() {
                                        return K(gr["snack-icon"])
                                    }
                                })
                            }
                        }), w(Mt, {
                            get when() {
                                return t.type === ce.WARN
                            },
                            get children() {
                                return w(Sf, {
                                    color: "#e58900",
                                    get class() {
                                        return K(gr["snack-icon"])
                                    }
                                })
                            }
                        }), w(Mt, {
                            get when() {
                                return t.type === ce.SUCCESS
                            },
                            get children() {
                                return w(Af, {
                                    color: "#00be00",
                                    get class() {
                                        return K(gr["snack-icon"])
                                    }
                                })
                            }
                        }), w(Mt, {
                            get when() {
                                return t.type === ce.FAILURE
                            },
                            get children() {
                                return w(Ef, {
                                    color: "#e50000",
                                    get class() {
                                        return K(gr["snack-icon"])
                                    }
                                })
                            }
                        })]
                    }
                }), w(j, {
                    get children() {
                        return w(j, {
                            row: !0,
                            center: !0,
                            get children() {
                                return [w(j, {
                                    center: !0,
                                    left: !0,
                                    style: {
                                        "padding-top": "0.5em",
                                        "padding-bottom": "0.5em"
                                    },
                                    get children() {
                                        return [(() => {
                                            const r = pa.cloneNode(!0);
                                            return nt(r, () => t.title), ct(() => st(r, K(gr["snack-title"]))), r
                                        })(), (() => {
                                            const r = pa.cloneNode(!0);
                                            return nt(r, () => t.description), ct(() => st(r, K(gr["snack-description"]))), r
                                        })()]
                                    }
                                }), it(() => t.children)]
                            }
                        })
                    }
                })]
            }
        }) : []
    })()),
    o_ = F('<span>Love what you see? <a href="https://www.buymeacoffee.com/pixelzone.io" target="_blank">Buy the dev a coffee</a> and support the development of PixelZone.</span>'),
    s_ = F("<span>Got it</span>"),
    a_ = t => {
        const e = el();
        return gt(() => {
            e.get("pixelzoneCookies") ? (!e.get("pixelzoneSupport") || Math.random() < .05) && Ae({
                type: ce.INFO,
                title: "\u2615 Support PixelZone",
                description: o_.cloneNode(!0),
                visibility: !0
            }) : Ae({
                type: ce.INFO,
                title: "\u{1F36A} Cookies",
                description: "This site uses cookies to ensure you get the best experience on our site.",
                visibility: !0
            })
        }), w(j, {
            center: !0,
            top: !0,
            get class() {
                return ht["pointer-children"]
            },
            style: {
                position: "fixed"
            },
            get children() {
                return w(cr, {
                    get fallback() {
                        return t.children
                    },
                    get children() {
                        return w(Mt, {
                            get when() {
                                return Ke().visibility
                            },
                            get children() {
                                return w(n_, {
                                    get isShowing() {
                                        return Ke().visibility
                                    },
                                    get title() {
                                        return Ke().title
                                    },
                                    get description() {
                                        return Ke().description
                                    },
                                    get type() {
                                        return Ke().type
                                    },
                                    get children() {
                                        return w(Re, {
                                            color: "paper",
                                            style: {
                                                "white-space": "nowrap",
                                                margin: "0.456em"
                                            },
                                            onClick: () => {
                                                const r = Ke();
                                                Ae({
                                                    ...r,
                                                    visibility: !1
                                                }), r.title === "\u{1F36A} Cookies" && e.set("pixelzoneCookies", !0), r.title === "\u2615 Support PixelZone" && e.set("pixelzoneSupport", !0)
                                            },
                                            get children() {
                                                return s_.cloneNode(!0)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    l_ = t => w(j, {
        row: !0,
        top: !0,
        height: "5em",
        get children() {
            return t.children
        }
    }),
    c_ = () => w(j, {
        center: !0,
        style: {
            position: "fixed",
            height: "100%"
        },
        get children() {
            return w(Lo, {
                dotColor: "#bcc1c9"
            })
        }
    }),
    u_ = "_note_9gyhg_1";
var h_ = {
    note: u_
};
const Cc = t => w(j, {
        row: !0,
        center: !0,
        get class() {
            return K(ht.background, ht.padding, ht.margin, ht["fit-content"], h_.note)
        },
        get children() {
            return t.children
        }
    }),
    f_ = F('<span class="notranslate"></span>'),
    d_ = t => w(Cc, {
        get children() {
            return [w(If, {
                style: {
                    width: "1.65em",
                    height: "1.65em",
                    "margin-right": "0.3em"
                }
            }), (() => {
                const e = f_.cloneNode(!0);
                return nt(e, () => `x:${t.position[0]} y:${t.position[1]}`), e
            })()]
        }
    }),
    p_ = F('<span class="notranslate"></span>'),
    g_ = t => w(Cc, {
        get children() {
            return [(() => {
                const e = p_.cloneNode(!0);
                return e.style.setProperty("font-size", "1.2em"), nt(e, () => `${t.playerCount}`), e
            })(), w(Mf, {
                style: {
                    width: "1.5em",
                    height: "1.5em",
                    "margin-left": "0.3em"
                }
            })]
        }
    }),
    Tc = "6em",
    v_ = t => w(j, {
        bottom: !0,
        right: !0,
        width: Tc,
        get class() {
            return ht["small-hide"]
        },
        style: {
            position: "fixed",
            right: 0,
            bottom: 0
        },
        get children() {
            return t.children
        }
    }),
    m_ = t => w(j, {
        bottom: !0,
        left: !0,
        width: Tc,
        get class() {
            return ht["small-hide"]
        },
        style: {
            position: "fixed",
            left: 0,
            bottom: 0
        },
        get children() {
            return t.children
        }
    }),
    __ = "_pop_vadgf_12",
    y_ = "_shake_vadgf_30",
    w_ = "_move_vadgf_1";
var Hi = {
    pop: __,
    shake: y_,
    "rainbow-text": "_rainbow-text_vadgf_40",
    move: w_
};
const b_ = F("<span></span>"),
    x_ = F("<span>/ </span>"),
    E_ = F('<img alt="pixels">'),
    S_ = t => {
        const e = it(() => t.getPixelCapacity() >= 100),
            r = it(() => {
                const o = t.getPixelCount();
                return o === t.getPixelCapacity() ? "/assets/icons/pixels-full.svg" : o === 0 ? "/assets/icons/pixels-0.svg" : `/assets/icons/pixels.svg#${o}`
            }),
            [i, n] = at(!1);
        return gt(o => {
            const a = t.getPixelCount();
            return a > o && (n(!0), setTimeout(() => n(!1), 200)), a
        }, -1), w(j, {
            row: !0,
            top: !0,
            center: !0,
            get class() {
                return K({
                    [Hi.shake]: t.getPixelCount() === t.getPixelCapacity(),
                    [Hi.pop]: i(),
                    [ht.background]: !0,
                    [ht["fit-content"]]: !0,
                    [ht.padding]: !0,
                    [ht.margin]: !0
                })
            },
            get children() {
                return w(j, {
                    row: !0,
                    center: !0,
                    get style() {
                        return {
                            "font-size": "1.425em",
                            "text-align": "center",
                            ...t.getPixelCount() === 0 ? {
                                opacity: .25
                            } : {}
                        }
                    },
                    get children() {
                        return [(() => {
                            const o = b_.cloneNode(!0);
                            return o.style.setProperty("color", "white"), nt(o, () => t.getPixelCount()), ct(a => {
                                const s = {
                                        ["font-size"]: e() ? "1.2em" : "1em"
                                    },
                                    u = K({
                                        [Hi["rainbow-text"]]: e(),
                                        notranslate: !0
                                    });
                                return a._v$ = pn(o, s, a._v$), u !== a._v$2 && st(o, a._v$2 = u), a
                            }, {
                                _v$: void 0,
                                _v$2: void 0
                            }), o
                        })(), (() => {
                            const o = x_.cloneNode(!0);
                            return o.firstChild, o.style.setProperty("font-weight", "bold"), o.style.setProperty("margin-left", "0.2em"), o.style.setProperty("color", "#b4b4b4"), nt(o, () => t.getPixelCapacity(), null), ct(a => {
                                const s = e() ? "1em" : "0.8em",
                                    u = K({
                                        [Hi["rainbow-text"]]: e(),
                                        notranslate: !0
                                    });
                                return s !== a._v$3 && o.style.setProperty("font-size", a._v$3 = s), u !== a._v$4 && st(o, a._v$4 = u), a
                            }, {
                                _v$3: void 0,
                                _v$4: void 0
                            }), o
                        })(), (() => {
                            const o = E_.cloneNode(!0);
                            return o.style.setProperty("width", "1.4em"), o.style.setProperty("height", "1.4em"), o.style.setProperty("font-size", "1.3em"), o.style.setProperty("margin", "-.5em"), o.style.setProperty("margin-bottom", "-.25em"), o.style.setProperty("margin-left", "0em"), o.style.setProperty("margin-right", "-.3em"), ct(() => Wt(o, "src", r())), o
                        })()]
                    }
                })
            }
        })
    },
    k_ = "_ratio_1owdq_1";
var A_ = {
    ratio: k_
};
const C_ = F("<div><div></div></div>"),
    T_ = t => {
        const [e, r] = lr(t, ["ratio", "style"]);
        return (() => {
            const i = C_.cloneNode(!0),
                n = i.firstChild;
            return pe(i, de(r, {
                get class() {
                    return A_.ratio
                },
                get style() {
                    return {
                        "padding-bottom": `${100/e.ratio}%`,
                        ...e.style
                    }
                }
            }), !1, !0), nt(n, () => r.children), i
        })()
    },
    D_ = "3em",
    I_ = "16em";
var ei = {
    boxSize: D_,
    threshold: I_,
    "palette-1": "_palette-1_lvpfz_6",
    "scale-24": "_scale-24_lvpfz_24",
    "scale-16": "_scale-16_lvpfz_58",
    "scale-8": "_scale-8_lvpfz_92",
    "palette-2": "_palette-2_lvpfz_127",
    "palette-3": "_palette-3_lvpfz_248",
    "palette-4": "_palette-4_lvpfz_369",
    "palette-5": "_palette-5_lvpfz_490",
    "color-box": "_color-box_lvpfz_611"
};
const $_ = F("<div></div>"),
    P_ = F("<div>Loading...</div>"),
    ga = "3em",
    L_ = t => {
        const e = it(() => {
                const {
                    r: i,
                    g: n,
                    b: o
                } = t.color;
                return i + n + o > 128 ? `rgb(${i/4}, ${n/4}, ${o/4})` : "#ccc"
            }),
            r = it(() => {
                const {
                    r: i,
                    g: n,
                    b: o
                } = t.color;
                return `rgb(${i}, ${n}, ${o})`
            });
        return w(j, {
            width: ga,
            height: ga,
            get class() {
                return K(ei["color-box"], ht["scale-hover"])
            },
            get children() {
                const i = $_.cloneNode(!0);
                return i.$$click = n => t.onClick(n), nt(i, () => t.highlighted), ct(n => {
                    const o = r(),
                        a = `${e()} solid ${t.highlighted?.3:0}em`;
                    return o !== n._v$ && i.style.setProperty("background-color", n._v$ = o), a !== n._v$2 && i.style.setProperty("border", n._v$2 = a), n
                }, {
                    _v$: void 0,
                    _v$2: void 0
                }), i
            }
        })
    },
    R_ = t => {
        const e = ba(() => t.children),
            r = it(() => {
                const i = e()?.length || 0;
                return K(ht.margin, ht["pointer-auto"], {
                    [ei["scale-16"]]: i !== 8 && i !== 24,
                    [ei["scale-24"]]: i === 24,
                    [ei["scale-8"]]: i === 8
                }, ei[`palette-${Math.round(4*il()/100+1)}`])
            });
        return w(j, {
            row: !0,
            bottom: !0,
            center: !0,
            style: {
                position: "fixed",
                bottom: "0.3em"
            },
            get children() {
                return w(j, {
                    get class() {
                        return r()
                    },
                    get children() {
                        return w(T_, {
                            ratio: 1,
                            get children() {
                                return w(j, {
                                    row: !0,
                                    center: !0,
                                    get class() {
                                        return ht.background
                                    },
                                    style: {
                                        padding: "0.15em"
                                    },
                                    get children() {
                                        return t.children
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    O_ = t => {
        const e = it(() => w(wo, {
            get each() {
                return t.rgbColors
            },
            get fallback() {
                return P_.cloneNode(!0)
            },
            children: (r, i) => w(L_, {
                color: r,
                get highlighted() {
                    return i() === t.colorID
                },
                onClick: () => t.setColorID(i())
            })
        }));
        return w(R_, {
            get children() {
                return e()
            }
        })
    };
bo(["click"]);
const M_ = "_penality_1z0l6_1";
var N_ = {
    penality: M_
};
const B_ = F('<span class="notranslate"><span class="notranslate">s</span></span>'),
    U_ = F('<svg id="hourglass-wrapper" width="1.2em" height="1.2em" viewBox="0 0 73 88" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="hourglass"><path d="M63.8761664,86 C63.9491436,84.74063 64,83.4707791 64,82.1818182 C64,65.2090455 57.5148507,50.6237818 48.20041,44 C57.5148507,37.3762182 64,22.7909545 64,5.81818182 C64,4.52922091 63.9491436,3.25937 63.8761664,2 L10.1238336,2 C10.0508564,3.25937 10,4.52922091 10,5.81818182 C10,22.7909545 16.4851493,37.3762182 25.79959,44 C16.4851493,50.6237818 10,65.2090455 10,82.1818182 C10,83.4707791 10.0508564,84.74063 10.1238336,86 L63.8761664,86 Z" id="glass" fill="#fff"></path><rect id="top-plate" fill="#0a0a0a" x="10" y="0" width="54" height="8" rx="0"></rect><rect id="bottom-plate" fill="#0a0a0a" x="10" y="80" width="54" height="8" rx="0"></rect><g id="top-sand" transform="translate(18, 21)"><clipPath id="top-clip-path"><rect x="0" y="0" width="38" height="21"></rect></clipPath><path fill="#e58900" clip-path="url(#top-clip-path)" d="M38,0 C36.218769,7.51704545 24.818769,21 19,21 C13.418769,21 1.9,7.63636364 0,0 L38,0 Z"></path></g><g id="bottom-sand" transform="translate(18, 55)"><clipPath id="bottom-clip-path"><rect x="0" y="0" width="38" height="21"></rect></clipPath><g clip-path="url(#bottom-clip-path)"><path fill="#e58900" d="M0,21 L38,21 C36.1,13.3636364 24.581231,0 19,0 C13.181231,0 1.781231,13.4829545 0,21 Z"></path></g></g></g></svg>'),
    F_ = t => w(j, {
        row: !0,
        top: !0,
        center: !0,
        get class() {
            return K({
                [N_.penality]: !0,
                [ht.background]: !0,
                [ht["fit-content"]]: !0,
                [ht.padding]: !0,
                [ht.margin]: !0
            })
        },
        get children() {
            return w(j, {
                row: !0,
                center: !0,
                style: {
                    "font-size": "1.425em",
                    "text-align": "center"
                },
                get children() {
                    return [(() => {
                        const e = B_.cloneNode(!0),
                            r = e.firstChild;
                        return e.style.setProperty("font-size", "1em"), e.style.setProperty("margin-right", "0.2em"), e.style.setProperty("color", "white"), nt(e, () => t.getPenality(), r), r.style.setProperty("color", "#666"), e
                    })(), U_.cloneNode(!0)]
                }
            })
        }
    }),
    Dc = (t, e, r, i = location.pathname) => {
        const n = new Date;
        n.setTime(n.getTime() + r * 60 * 1e3), document.cookie = `${t}=${e};path=${i};expires=${n.toUTCString()}`
    },
    H_ = t => {
        const e = document.cookie.match("(^|;) ?" + t + "=([^;]*)(;|$)");
        return e ? e[2] : null
    },
    Y_ = (t, e = location.pathname) => {
        const r = H_(t);
        r && Dc(t, r, -1, e)
    },
    z_ = "_background_1134a_1";
var qi = {
    background: z_,
    "icon-wrapper": "_icon-wrapper_1134a_11"
};
const X_ = F("<p>Please, login to place pixels on the canvas:</p>"),
    Zn = F("<a></a>"),
    V_ = F("<span></span>"),
    q_ = () => (Y_("zone"), Dc("zone", `${location.pathname}${location.hash}`, 60, "/"), w(j, {
        get children() {
            return [X_.cloneNode(!0), w(j, {
                center: !0,
                row: !0,
                style: {
                    "margin-top": "0.625em"
                },
                get children() {
                    return [w(j, {
                        center: !0,
                        get class() {
                            return qi["icon-wrapper"]
                        },
                        get children() {
                            const t = Zn.cloneNode(!0);
                            return Wt(t, "href", `${Nr}/auth/google`), nt(t, w(Or, {
                                src: "/assets/icons/google.svg",
                                width: "50px",
                                height: "50px",
                                style: {
                                    "background-color": "#fff"
                                }
                            })), t
                        }
                    }), w(j, {
                        center: !0,
                        get class() {
                            return qi["icon-wrapper"]
                        },
                        get children() {
                            const t = Zn.cloneNode(!0);
                            return Wt(t, "href", `${Nr}/auth/discord`), nt(t, w(Or, {
                                src: "/assets/icons/discord.svg",
                                width: "50px",
                                height: "50px",
                                style: {
                                    "background-color": "#3f4eec"
                                }
                            })), t
                        }
                    }), w(j, {
                        center: !0,
                        get class() {
                            return qi["icon-wrapper"]
                        },
                        get children() {
                            const t = Zn.cloneNode(!0);
                            return Wt(t, "href", `${Nr}/auth/facebook`), nt(t, w(Or, {
                                src: "/assets/icons/facebook.svg",
                                width: "50px",
                                height: "50px",
                                style: {
                                    "background-color": "#1778f2"
                                }
                            })), t
                        }
                    })]
                }
            })]
        }
    })),
    W_ = () => (() => {
        const t = V_.cloneNode(!0);
        return nt(t, w(nr, {
            get isShowing() {
                return Fm()
            },
            hide: () => kc(!1),
            title: "\u{1F464} Login",
            get class() {
                return qi.background
            },
            get children() {
                return w(Er, {
                    get children() {
                        return w(q_, {})
                    }
                })
            }
        })), t
    })(),
    G_ = () => {
        const [, {
            mutate: t
        }] = Pn;
        return fetch(`${Nr}/auth/logout`, {
            method: "DELETE",
            credentials: "include"
        }).then(e => {
            if (!e.ok) throw new Error(`Sorry, something went wrong. ${e.statusText}`);
            t(void 0)
        })
    };

function j_() {
    const t = document.cookie.split(";");
    for (let e = 0; e < t.length; e++) {
        const r = t[e],
            i = r.indexOf("="),
            n = i > -1 ? r.substr(0, i) : r;
        document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}
const Z_ = () => {
        const [, {
            mutate: t
        }] = Pn;
        return fetch(`${Nr}/profile/me`, {
            method: "DELETE",
            credentials: "include"
        }).then(e => {
            if (!e.ok) throw new Error(`Sorry, something went wrong. ${e.statusText}`);
            j_(), t(void 0)
        })
    },
    Q_ = F("<h3>Deleting your account will do the following:</h3>"),
    K_ = F("<ul><li>Permanently delete all of your account information</li><li>Take effect within the next minute and log you out</li></ul>"),
    J_ = F("<p>Account information includes (but is not limited to) emails, usernames, avatars, pixel counter and registration date. However, pixels you have placed will NOT be earased \u{1F917}</p>"),
    t0 = F("<h3>Deleting your account...</h3>"),
    e0 = F("<h3>Your account is deleted.</h3>"),
    r0 = F("<p>Thanks for playing pixelzone \u2728</p>"),
    i0 = F("<h3>Sorry, something went wrong.</h3>"),
    n0 = F("<p>An error occurred while sending the deletion request \u{1F625}</p>");
var xe;
(function(t) {
    t[t.NOT_REQUESTED = 0] = "NOT_REQUESTED", t[t.PENDING = 1] = "PENDING", t[t.DELETED = 2] = "DELETED", t[t.ERROR = 3] = "ERROR"
})(xe || (xe = {}));
const o0 = t => {
        const [e, r] = at(xe.NOT_REQUESTED), i = async () => {
            try {
                r(xe.PENDING), await Z_(), r(xe.DELETED)
            } catch (n) {
                console.error(n), r(xe.ERROR)
            }
        };
        return w(cr, {
            get children() {
                return [w(Mt, {
                    get when() {
                        return e() === xe.NOT_REQUESTED
                    },
                    get children() {
                        return w(j, {
                            get children() {
                                return [Q_.cloneNode(!0), K_.cloneNode(!0), J_.cloneNode(!0), w(j, {
                                    bottom: !0,
                                    right: !0,
                                    row: !0,
                                    style: {
                                        padding: "1em",
                                        "box-sizing": "border-box"
                                    },
                                    get children() {
                                        return [w(Re, {
                                            color: "paper",
                                            onClick: () => t.onCancel(),
                                            children: "Cancel"
                                        }), w(Re, {
                                            color: "primary",
                                            onClick: i,
                                            children: "Delete"
                                        })]
                                    }
                                })]
                            }
                        })
                    }
                }), w(Mt, {
                    get when() {
                        return e() === xe.PENDING
                    },
                    get children() {
                        return w(j, {
                            style: {
                                "min-width": "28em",
                                "min-height": "11em"
                            },
                            get children() {
                                return [t0.cloneNode(!0), w(j, {
                                    center: !0,
                                    get children() {
                                        return w(Lo, {
                                            dotColor: "#bcc1c9"
                                        })
                                    }
                                })]
                            }
                        })
                    }
                }), w(Mt, {
                    get when() {
                        return e() === xe.DELETED
                    },
                    get children() {
                        return w(j, {
                            style: {
                                "min-width": "28em",
                                "min-height": "11em"
                            },
                            get children() {
                                return [e0.cloneNode(!0), r0.cloneNode(!0), w(j, {
                                    bottom: !0,
                                    right: !0,
                                    row: !0,
                                    style: {
                                        padding: "1em",
                                        "box-sizing": "border-box"
                                    },
                                    get children() {
                                        return w(Re, {
                                            color: "primary",
                                            onClick: () => t.onGoodBye(),
                                            children: "\u{1F44B} Good Bye"
                                        })
                                    }
                                })]
                            }
                        })
                    }
                }), w(Mt, {
                    get when() {
                        return e() === xe.ERROR
                    },
                    get children() {
                        return w(j, {
                            style: {
                                "min-width": "28em",
                                "min-height": "11em"
                            },
                            get children() {
                                return [i0.cloneNode(!0), n0.cloneNode(!0), w(j, {
                                    bottom: !0,
                                    right: !0,
                                    row: !0,
                                    style: {
                                        padding: "1em",
                                        "box-sizing": "border-box"
                                    },
                                    get children() {
                                        return [w(Re, {
                                            color: "paper",
                                            onClick: () => t.onCancel(),
                                            children: "Cancel"
                                        }), w(Re, {
                                            color: "primary",
                                            onClick: i,
                                            children: "Try again"
                                        })]
                                    }
                                })]
                            }
                        })
                    }
                })]
            }
        })
    },
    s0 = t => w(nr, {
        get isShowing() {
            return t.isShowing
        },
        get hide() {
            return t.hide
        },
        title: "\u{1F5D1}\uFE0F Account Deletion",
        get children() {
            return w(Er, {
                get children() {
                    return w(o0, {
                        onCancel: () => t.hide(),
                        onGoodBye: () => t.hide()
                    })
                }
            })
        }
    });
var va = {
    "user-button": "_user-button_1056s_1",
    "user-avatar": "_user-avatar_1056s_10"
};
const a0 = (t, e) => {
        const r = [{
                value: 1,
                symbol: ""
            }, {
                value: 1e3,
                symbol: "k"
            }, {
                value: 1e6,
                symbol: "M"
            }, {
                value: 1e9,
                symbol: "G"
            }, {
                value: 1e12,
                symbol: "T"
            }, {
                value: 1e15,
                symbol: "P"
            }, {
                value: 1e18,
                symbol: "E"
            }],
            i = /\.0+$|(\.[0-9]*[1-9])0+$/,
            n = r.slice().reverse().find(function(o) {
                return t >= o.value
            });
        return n ? (t / n.value).toFixed(e).replace(i, "$1") + n.symbol : "0"
    },
    l0 = "_avatar_1d2pw_1",
    c0 = "_details_1d2pw_7",
    u0 = "_role_1d2pw_11",
    h0 = "_roles_1d2pw_21";
var Wi = {
    avatar: l0,
    details: c0,
    role: u0,
    roles: h0
};
const ci = F("<div></div>"),
    f0 = F("<br>"),
    ma = F("<span></span>"),
    d0 = F("<span>Placed pixels</span>"),
    p0 = F("<span>Member since</span>"),
    g0 = t => t.replace("s96-c", "s200-c"),
    Ln = {};
Ln.administrator = "staff";
Ln.moderator = "staff";
Ln["faction leader"] = "leader";
const v0 = t => w(j, {
        center: !0,
        row: !0,
        get class() {
            return Wi.role
        },
        get children() {
            return [it(() => w(cr, {
                get children() {
                    return [w(Mt, {
                        get when() {
                            return t.kind === "leader"
                        },
                        get children() {
                            return [w(Cf, {}), (() => {
                                const e = ci.cloneNode(!0);
                                return e.style.setProperty("margin-left", ".2em"), e
                            })()]
                        }
                    }), w(Mt, {
                        get when() {
                            return t.kind === "staff"
                        },
                        get children() {
                            return [w(Lf, {}), (() => {
                                const e = ci.cloneNode(!0);
                                return e.style.setProperty("margin-left", ".2em"), e
                            })()]
                        }
                    }), w(Mt, {
                        get when() {
                            return t.kind === "tiktok"
                        },
                        get children() {
                            return [w(kf, {}), (() => {
                                const e = ci.cloneNode(!0);
                                return e.style.setProperty("margin-left", ".2em"), e
                            })()]
                        }
                    })]
                }
            })), it(() => t.name)]
        }
    }),
    m0 = t => w(j, {
        center: !0,
        get children() {
            return [w(j, {
                center: !0,
                get class() {
                    return Wi.details
                },
                get children() {
                    return [w(Or, {
                        get src() {
                            return g0(t.user.avatar)
                        },
                        referrerpolicy: "no-referrer",
                        width: "160px",
                        height: "160px",
                        get class() {
                            return Wi.avatar
                        }
                    }), it(() => it(() => t.user.roles.length > 0)() ? w(j, {
                        center: !0,
                        row: !0,
                        get class() {
                            return Wi.roles
                        },
                        get children() {
                            return w(wo, {
                                get each() {
                                    return t.user.roles.map(e => [Ln[e], e])
                                },
                                get fallback() {
                                    return ci.cloneNode(!0)
                                },
                                children: ([e, r]) => w(v0, {
                                    kind: e,
                                    name: r
                                })
                            })
                        }
                    }) : ci.cloneNode(!0))]
                }
            }), f0.cloneNode(!0), w(j, {
                row: !0,
                get children() {
                    return [w(j, {
                        center: !0,
                        style: {
                            "box-sizing": "border-box",
                            width: "10em",
                            height: "auto"
                        },
                        get children() {
                            const e = ma.cloneNode(!0);
                            return e.style.setProperty("font-size", "1.5em"), e.style.setProperty("font-weight", "bolder"), nt(e, () => a0(t.user.pixels, 1)), e
                        }
                    }), w(j, {
                        center: !0,
                        style: {
                            "box-sizing": "border-box",
                            width: "10em",
                            height: "auto"
                        },
                        get children() {
                            const e = ma.cloneNode(!0);
                            return e.style.setProperty("font-size", "1.125em"), e.style.setProperty("font-weight", "bolder"), nt(e, () => new Date(t.user.createdAt).toLocaleDateString()), e
                        }
                    })]
                }
            }), w(j, {
                row: !0,
                style: {
                    "padding-bottom": "1em",
                    color: "#aaa",
                    "text-align": "center"
                },
                get children() {
                    return [w(j, {
                        center: !0,
                        style: {
                            width: "10em"
                        },
                        get children() {
                            return d0.cloneNode(!0)
                        }
                    }), w(j, {
                        center: !0,
                        style: {
                            width: "10em"
                        },
                        get children() {
                            return p0.cloneNode(!0)
                        }
                    })]
                }
            })]
        }
    }),
    _a = ["\u{1F9F8}", "\u{1F9DA}", "\u{1F468}\u200D\u{1F3A8}", "\u{1F9D9}", "\u{1F409}", "\u{1F6F8}"],
    _0 = t => _a[Math.min(_a.length - 1, Math.max(0, Math.log10(t) - 2) | 0)],
    y0 = t => w(nr, {
        get isShowing() {
            return t.isShowing
        },
        get hide() {
            return t.hide
        },
        get title() {
            return `${_0(t.user.pixels)} ${t.user.name}`
        },
        get children() {
            return w(Er, {
                get children() {
                    return w(m0, {
                        get user() {
                            return t.user
                        }
                    })
                }
            })
        }
    }),
    w0 = F('<img referrerpolicy="no-referrer" width="33.6px" height="33.6px">'),
    b0 = F("<div></div>"),
    x0 = t => w(Zr, {
        title: "Profile",
        onClick: () => t.onClick(),
        get children() {
            return w(Of, {
                size: "1.5em"
            })
        }
    }),
    E0 = t => w(Zr, {
        title: "Logout",
        onClick: () => t.onClick(),
        get children() {
            return w(Df, {
                size: "1.5em"
            })
        }
    }),
    S0 = t => w(Zr, {
        title: "Delete",
        onClick: () => t.onClick(),
        style: {
            background: "#f0e5e5"
        },
        get children() {
            return w(Rf, {
                size: "1.5em"
            })
        }
    }),
    k0 = t => w(j, {
        center: !0,
        get class() {
            return K(va["user-button"])
        },
        get children() {
            const e = w0.cloneNode(!0);
            return ct(r => {
                const i = K(va["user-avatar"]),
                    n = t.user.avatar;
                return i !== r._v$ && st(e, r._v$ = i), n !== r._v$2 && Wt(e, "src", r._v$2 = n), r
            }, {
                _v$: void 0,
                _v$2: void 0
            }), e
        }
    }),
    A0 = () => {
        const [t] = Pn, [e, r] = at(!1), [i, n] = at(!1);
        return w(cr, {
            get children() {
                return [w(Mt, {
                    get when() {
                        return t() !== void 0
                    },
                    get children() {
                        const o = b0.cloneNode(!0);
                        return nt(o, w(Ka, {
                            get items() {
                                return [w(x0, {
                                    onClick: () => r(!0)
                                }), w(E0, {
                                    onClick: () => G_().catch(a => {
                                        console.error("Error during logout:", a), Ae({
                                            type: ce.FAILURE,
                                            title: "Failed to logout",
                                            description: "Something went wrong when logging out.",
                                            visibility: !0
                                        })
                                    })
                                }), w(S0, {
                                    onClick: () => n(!0)
                                })]
                            },
                            get menu() {
                                return w(k0, {
                                    get user() {
                                        return ui(t())
                                    }
                                })
                            }
                        }), null), nt(o, w(y0, {
                            get user() {
                                return ui(t())
                            },
                            get isShowing() {
                                return e()
                            },
                            hide: () => r(!1)
                        }), null), o
                    }
                }), w(s0, {
                    get isShowing() {
                        return i()
                    },
                    hide: () => n(!1)
                })]
            }
        })
    },
    C0 = t => fetch(`${em}/${t}`).then(e => e.json()).catch(e => {
        console.warn(`Zone ${t} not found.`, e)
    }),
    T0 = t => _o(t, C0),
    D0 = () => window.location.pathname.slice(1) || "main",
    I0 = T0(D0),
    $0 = F("<div><div></div></div>"),
    P0 = t => {
        const {
            setCanvas: e,
            getPixelCount: r,
            getPixelPenality: i,
            getPixelPosition: n,
            getPlayerCount: o,
            setPaletteColorID: a,
            getPaletteColorID: s,
            sendCaptchaResponse: u
        } = e_(() => t.getZone()), h = Eo(() => t.getZone().colors);
        return (() => {
            const f = $0.cloneNode(!0),
                v = f.firstChild;
            return f.style.setProperty("width", "100%"), f.style.setProperty("height", "100%"), f.style.setProperty("position", "absolute"), nt(f, w(cp, {
                ref: e
            }), v), v.style.setProperty("width", "100%"), v.style.setProperty("height", "100%"), v.style.setProperty("position", "absolute"), nt(v, w(j, {
                center: !0,
                bottom: !0,
                get children() {
                    return [w(l_, {
                        get children() {
                            return [w(j, {
                                row: !0,
                                width: "100%",
                                get class() {
                                    return K(ht["pointer-children"], ht["disable-select"])
                                },
                                get children() {
                                    return w(ap, {})
                                }
                            }), w(a_, {
                                get children() {
                                    return w(cr, {
                                        get fallback() {
                                            return w(S_, {
                                                getPixelCount: r,
                                                getPixelCapacity: () => t.getZone().pixelCapacity
                                            })
                                        },
                                        get children() {
                                            return w(Mt, {
                                                get when() {
                                                    return i() > 0
                                                },
                                                get children() {
                                                    return w(F_, {
                                                        getPenality: i
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            }), w(j, {
                                row: !0,
                                right: !0,
                                width: "100%",
                                get class() {
                                    return K(ht["pointer-children"], ht["disable-select"])
                                },
                                get children() {
                                    return w(A0, {})
                                }
                            })]
                        }
                    }), w(j, {
                        row: !0,
                        get children() {
                            return [w(m_, {
                                get children() {
                                    return [w(g_, {
                                        get playerCount() {
                                            return o()
                                        }
                                    }), w(d_, {
                                        get position() {
                                            return n()
                                        }
                                    })]
                                }
                            }), w(O_, {
                                get rgbColors() {
                                    return h()
                                },
                                get colorID() {
                                    return s()
                                },
                                setColorID: a
                            }), w(v_, {})]
                        }
                    }), w(Cv, {
                        onSend: S => {
                            Tn(!1), u(S)
                        }
                    }), w(W_, {})]
                }
            })), ct(() => st(v, ht["pointer-none"])), f
        })()
    },
    L0 = () => {
        const [t] = I0;
        return w(cr, {
            get fallback() {
                return w(c_, {})
            },
            get children() {
                return w(Mt, {
                    get when() {
                        return t() !== void 0
                    },
                    get children() {
                        return w(P0, {
                            getZone: () => ui(t())
                        })
                    }
                })
            }
        })
    };
var R0 = {
    exports: {}
};
(function(t) {
    (function() {
        function e(A) {
            if (A = A || {}, this.method = A.method || 2, this.colors = A.colors || 256, this.initColors = A.initColors || 4096, this.initDist = A.initDist || .01, this.distIncr = A.distIncr || .005, this.hueGroups = A.hueGroups || 10, this.satGroups = A.satGroups || 10, this.lumGroups = A.lumGroups || 10, this.minHueCols = A.minHueCols || 0, this.hueStats = this.minHueCols ? new r(this.hueGroups, this.minHueCols) : null, this.boxSize = A.boxSize || [64, 64], this.boxPxls = A.boxPxls || 2, this.palLocked = !1, this.dithKern = A.dithKern || null, this.dithSerp = A.dithSerp || !1, this.dithDelta = A.dithDelta || 0, this.histogram = {}, this.idxrgb = A.palette ? A.palette.slice(0) : [], this.idxi32 = [], this.i32idx = {}, this.i32rgb = {}, this.useCache = A.useCache !== !1, this.cacheFreq = A.cacheFreq || 10, this.reIndex = A.reIndex || this.idxrgb.length == 0, this.colorDist = A.colorDist == "manhattan" ? b : v, this.idxrgb.length > 0) {
                var x = this;
                this.idxrgb.forEach(function(E, m) {
                    var R = (-16777216 | E[2] << 16 | E[1] << 8 | E[0]) >>> 0;
                    x.idxi32[m] = R, x.i32idx[R] = m, x.i32rgb[R] = E
                })
            }
        }
        e.prototype.sample = function(x, E) {
            if (this.palLocked) throw "Cannot sample additional images, palette already assembled.";
            var m = $(x, E);
            switch (this.method) {
                case 1:
                    this.colorStats1D(m.buf32);
                    break;
                case 2:
                    this.colorStats2D(m.buf32, m.width);
                    break
            }
        }, e.prototype.reduce = function(x, E, m, R) {
            if (this.palLocked || this.buildPal(), m = m || this.dithKern, R = typeof R < "u" ? R : this.dithSerp, E = E || 1, m) var H = this.dither(x, m, R);
            else
                for (var Y = $(x), U = Y.buf32, q = U.length, H = new Uint32Array(q), W = 0; W < q; W++) {
                    var et = U[W];
                    H[W] = this.nearestColor(et)
                }
            if (E == 1) return new Uint8Array(H.buffer);
            if (E == 2) {
                for (var J = [], q = H.length, W = 0; W < q; W++) {
                    var et = H[W];
                    J[W] = this.i32idx[et]
                }
                return J
            }
        }, e.prototype.dither = function(A, x, E) {
            var m = {
                FloydSteinberg: [
                    [.4375, 1, 0],
                    [.1875, -1, 1],
                    [.3125, 0, 1],
                    [.0625, 1, 1]
                ],
                FalseFloydSteinberg: [
                    [.375, 1, 0],
                    [.375, 0, 1],
                    [.25, 1, 1]
                ],
                Stucki: [
                    [.19047619047619047, 1, 0],
                    [.09523809523809523, 2, 0],
                    [.047619047619047616, -2, 1],
                    [.09523809523809523, -1, 1],
                    [.19047619047619047, 0, 1],
                    [.09523809523809523, 1, 1],
                    [.047619047619047616, 2, 1],
                    [.023809523809523808, -2, 2],
                    [.047619047619047616, -1, 2],
                    [.09523809523809523, 0, 2],
                    [.047619047619047616, 1, 2],
                    [.023809523809523808, 2, 2]
                ],
                Atkinson: [
                    [.125, 1, 0],
                    [.125, 2, 0],
                    [.125, -1, 1],
                    [.125, 0, 1],
                    [.125, 1, 1],
                    [.125, 0, 2]
                ],
                Jarvis: [
                    [.14583333333333334, 1, 0],
                    [.10416666666666667, 2, 0],
                    [.0625, -2, 1],
                    [.10416666666666667, -1, 1],
                    [.14583333333333334, 0, 1],
                    [.10416666666666667, 1, 1],
                    [.0625, 2, 1],
                    [.020833333333333332, -2, 2],
                    [.0625, -1, 2],
                    [.10416666666666667, 0, 2],
                    [.0625, 1, 2],
                    [.020833333333333332, 2, 2]
                ],
                Burkes: [
                    [.25, 1, 0],
                    [.125, 2, 0],
                    [.0625, -2, 1],
                    [.125, -1, 1],
                    [.25, 0, 1],
                    [.125, 1, 1],
                    [.0625, 2, 1]
                ],
                Sierra: [
                    [.15625, 1, 0],
                    [.09375, 2, 0],
                    [.0625, -2, 1],
                    [.125, -1, 1],
                    [.15625, 0, 1],
                    [.125, 1, 1],
                    [.0625, 2, 1],
                    [.0625, -1, 2],
                    [.09375, 0, 2],
                    [.0625, 1, 2]
                ],
                TwoSierra: [
                    [.25, 1, 0],
                    [.1875, 2, 0],
                    [.0625, -2, 1],
                    [.125, -1, 1],
                    [.1875, 0, 1],
                    [.125, 1, 1],
                    [.0625, 2, 1]
                ],
                SierraLite: [
                    [.5, 1, 0],
                    [.25, -1, 1],
                    [.25, 0, 1]
                ]
            };
            if (!x || !m[x]) throw "Unknown dithering kernel: " + x;
            var R = m[x],
                H = $(A),
                Y = H.buf32,
                U = H.width,
                q = H.height;
            Y.length;
            for (var W = E ? -1 : 1, et = 0; et < q; et++) {
                E && (W = W * -1);
                for (var J = et * U, Z = W == 1 ? 0 : U - 1, pt = W == 1 ? U : 0; Z !== pt; Z += W) {
                    var ut = J + Z,
                        vt = Y[ut],
                        xt = vt & 255,
                        At = (vt & 65280) >> 8,
                        wt = (vt & 16711680) >> 16,
                        St = this.nearestColor(vt),
                        Tt = St & 255,
                        ie = (St & 65280) >> 8,
                        me = (St & 16711680) >> 16;
                    if (Y[ut] = 255 << 24 | me << 16 | ie << 8 | Tt, this.dithDelta) {
                        var Zt = this.colorDist([xt, At, wt], [Tt, ie, me]);
                        if (Zt < this.dithDelta) continue
                    }
                    for (var ne = xt - Tt, Xe = At - ie, $e = wt - me, zt = W == 1 ? 0 : R.length - 1, Ve = W == 1 ? R.length : 0; zt !== Ve; zt += W) {
                        var be = R[zt][1] * W,
                            Lt = R[zt][2],
                            Xt = Lt * U;
                        if (be + Z >= 0 && be + Z < U && Lt + et >= 0 && Lt + et < q) {
                            var kt = R[zt][0],
                                Rt = ut + (Xt + be),
                                Pe = Y[Rt] & 255,
                                Vt = (Y[Rt] & 65280) >> 8,
                                qe = (Y[Rt] & 16711680) >> 16,
                                d = Math.max(0, Math.min(255, Pe + ne * kt)),
                                l = Math.max(0, Math.min(255, Vt + Xe * kt)),
                                c = Math.max(0, Math.min(255, qe + $e * kt));
                            Y[Rt] = 255 << 24 | c << 16 | l << 8 | d
                        }
                    }
                }
            }
            return Y
        }, e.prototype.buildPal = function(x) {
            if (!(this.palLocked || this.idxrgb.length > 0 && this.idxrgb.length <= this.colors)) {
                var E = this.histogram,
                    m = M(E, !0);
                if (m.length == 0) throw "Nothing has been sampled, palette cannot be built.";
                switch (this.method) {
                    case 1:
                        for (var R = this.initColors, H = m[R - 1], Y = E[H], W = m.slice(0, R), U = R, q = m.length; U < q && E[m[U]] == Y;) W.push(m[U++]);
                        this.hueStats && this.hueStats.inject(W);
                        break;
                    case 2:
                        var W = m;
                        break
                }
                W = W.map(function(et) {
                    return +et
                }), this.reducePal(W), !x && this.reIndex && this.sortPal(), this.useCache && this.cacheHistogram(W), this.palLocked = !0
            }
        }, e.prototype.palette = function(x, E) {
            return this.buildPal(E), x ? this.idxrgb : new Uint8Array(new Uint32Array(this.idxi32).buffer)
        }, e.prototype.prunePal = function(x) {
            for (var E, m = 0; m < this.idxrgb.length; m++) x[m] || (E = this.idxi32[m], this.idxrgb[m] = null, this.idxi32[m] = null, delete this.i32idx[E]);
            if (this.reIndex) {
                for (var R = [], H = [], Y = {}, m = 0, U = 0; m < this.idxrgb.length; m++) this.idxrgb[m] && (E = this.idxi32[m], R[U] = this.idxrgb[m], Y[E] = U, H[U] = E, U++);
                this.idxrgb = R, this.idxi32 = H, this.i32idx = Y
            }
        }, e.prototype.reducePal = function(x) {
            if (this.idxrgb.length > this.colors) {
                for (var E = x.length, m = {}, R = 0, H, Y = !1, U = 0; U < E; U++) R == this.colors && !Y && (this.prunePal(m), Y = !0), H = this.nearestIndex(x[U]), R < this.colors && !m[H] && (m[H] = !0, R++);
                Y || (this.prunePal(m), Y = !0)
            } else {
                var q = x.map(function(St) {
                        return [St & 255, (St & 65280) >> 8, (St & 16711680) >> 16]
                    }),
                    E = q.length,
                    W = E,
                    et = this.initDist;
                if (W > this.colors) {
                    for (; W > this.colors;) {
                        for (var J = [], U = 0; U < E; U++) {
                            var Z = q[U];
                            if (x[U], !!Z)
                                for (var pt = U + 1; pt < E; pt++) {
                                    var ut = q[pt],
                                        vt = x[pt];
                                    if (!!ut) {
                                        var xt = this.colorDist(Z, ut);
                                        xt < et && (J.push([pt, ut, vt, xt]), delete q[pt], W--)
                                    }
                                }
                        }
                        et += W > this.colors * 3 ? this.initDist : this.distIncr
                    }
                    if (W < this.colors) {
                        L.call(J, function(St, Tt) {
                            return Tt[3] - St[3]
                        });
                        for (var At = 0; W < this.colors;) q[J[At][0]] = J[At][1], W++, At++
                    }
                }
                for (var E = q.length, U = 0; U < E; U++) !q[U] || (this.idxrgb.push(q[U]), this.idxi32.push(x[U]), this.i32idx[x[U]] = this.idxi32.length - 1, this.i32rgb[x[U]] = q[U])
            }
        }, e.prototype.colorStats1D = function(x) {
            for (var E = this.histogram, m, R = x.length, H = 0; H < R; H++) m = x[H], (m & 4278190080) >> 24 != 0 && (this.hueStats && this.hueStats.check(m), m in E ? E[m]++ : E[m] = 1)
        }, e.prototype.colorStats2D = function(x, E) {
            var m = this.boxSize[0],
                R = this.boxSize[1],
                H = m * R,
                Y = X(E, x.length / E, m, R),
                U = this.histogram,
                q = this;
            Y.forEach(function(W) {
                var et = Math.max(Math.round(W.w * W.h / H) * q.boxPxls, 2),
                    J = {},
                    Z;
                N(W, E, function(pt) {
                    Z = x[pt], (Z & 4278190080) >> 24 != 0 && (q.hueStats && q.hueStats.check(Z), Z in U ? U[Z]++ : Z in J ? ++J[Z] >= et && (U[Z] = J[Z]) : J[Z] = 1)
                })
            }), this.hueStats && this.hueStats.inject(U)
        }, e.prototype.sortPal = function() {
            var x = this;
            this.idxi32.sort(function(E, m) {
                var R = x.i32idx[E],
                    H = x.i32idx[m],
                    Y = x.idxrgb[R],
                    U = x.idxrgb[H],
                    q = D(Y[0], Y[1], Y[2]),
                    W = D(U[0], U[1], U[2]),
                    et = Y[0] == Y[1] && Y[1] == Y[2] ? -1 : _(q.h, x.hueGroups),
                    J = U[0] == U[1] && U[1] == U[2] ? -1 : _(W.h, x.hueGroups),
                    Z = J - et;
                if (Z) return -Z;
                var pt = +W.l.toFixed(2) - +q.l.toFixed(2);
                if (pt) return -pt;
                var ut = +W.s.toFixed(2) - +q.s.toFixed(2);
                if (ut) return -ut
            }), this.idxi32.forEach(function(E, m) {
                x.idxrgb[m] = x.i32rgb[E], x.i32idx[E] = m
            })
        }, e.prototype.nearestColor = function(x) {
            var E = this.nearestIndex(x);
            return E === null ? 0 : this.idxi32[E]
        }, e.prototype.nearestIndex = function(x) {
            if ((x & 4278190080) >> 24 == 0) return null;
            if (this.useCache && "" + x in this.i32idx) return this.i32idx[x];
            for (var E = 1e3, m, R = [x & 255, (x & 65280) >> 8, (x & 16711680) >> 16], H = this.idxrgb.length, Y = 0; Y < H; Y++)
                if (!!this.idxrgb[Y]) {
                    var U = this.colorDist(R, this.idxrgb[Y]);
                    U < E && (E = U, m = Y)
                } return m
        }, e.prototype.cacheHistogram = function(x) {
            for (var E = 0, m = x[E]; E < x.length && this.histogram[m] >= this.cacheFreq; m = x[E++]) this.i32idx[m] = this.nearestIndex(m)
        };

        function r(A, x) {
            this.numGroups = A, this.minCols = x, this.stats = {};
            for (var E = -1; E < A; E++) this.stats[E] = {
                num: 0,
                cols: []
            };
            this.groupsFull = 0
        }
        r.prototype.check = function(x) {
            this.groupsFull == this.numGroups + 1 && (this.check = function() {});
            var E = x & 255,
                m = (x & 65280) >> 8,
                R = (x & 16711680) >> 16,
                H = E == m && m == R ? -1 : _(D(E, m, R).h, this.numGroups),
                Y = this.stats[H],
                U = this.minCols;
            Y.num++, !(Y.num > U) && (Y.num == U && this.groupsFull++, Y.num <= U && this.stats[H].cols.push(x))
        }, r.prototype.inject = function(x) {
            for (var E = -1; E < this.numGroups; E++)
                if (this.stats[E].num <= this.minCols) switch (k(x)) {
                    case "Array":
                        this.stats[E].cols.forEach(function(m) {
                            x.indexOf(m) == -1 && x.push(m)
                        });
                        break;
                    case "Object":
                        this.stats[E].cols.forEach(function(m) {
                            x[m] ? x[m]++ : x[m] = 1
                        });
                        break
                }
        };
        var i = .2126,
            n = .7152,
            o = .0722;

        function a(A, x, E) {
            return Math.sqrt(i * A * A + n * x * x + o * E * E)
        }
        var s = 255,
            u = 255,
            h = 255,
            f = Math.sqrt(i * s * s + n * u * u + o * h * h);

        function v(A, x) {
            var E = x[0] - A[0],
                m = x[1] - A[1],
                R = x[2] - A[2];
            return Math.sqrt(i * E * E + n * m * m + o * R * R) / f
        }
        var S = i * s + n * u + o * h;

        function b(A, x) {
            var E = Math.abs(x[0] - A[0]),
                m = Math.abs(x[1] - A[1]),
                R = Math.abs(x[2] - A[2]);
            return (i * E + n * m + o * R) / S
        }

        function D(A, x, E) {
            var m, R, H, Y, U, q;
            if (A /= 255, x /= 255, E /= 255, m = Math.max(A, x, E), R = Math.min(A, x, E), U = (m + R) / 2, m == R) H = Y = 0;
            else {
                switch (q = m - R, Y = U > .5 ? q / (2 - m - R) : q / (m + R), m) {
                    case A:
                        H = (x - E) / q + (x < E ? 6 : 0);
                        break;
                    case x:
                        H = (E - A) / q + 2;
                        break;
                    case E:
                        H = (A - x) / q + 4;
                        break
                }
                H /= 6
            }
            return {
                h: H,
                s: Y,
                l: a(A, x, E)
            }
        }

        function _(A, x) {
            var E = 1 / x,
                m = E / 2;
            if (A >= 1 - m || A <= m) return 0;
            for (var R = 1; R < x; R++) {
                var H = R * E;
                if (A >= H - m && A <= H + m) return R
            }
        }

        function y(A) {
            return A
        }

        function I(A) {
            return A
        }

        function k(A) {
            return Object.prototype.toString.call(A).slice(8, -1)
        }
        var L = O() ? Array.prototype.sort : p;

        function p(A) {
            var x = k(this[0]);
            if (x == "Number" || x == "String") {
                for (var E = {}, m = this.length, R, H = 0; H < m; H++) R = this[H], !(E[R] || E[R] === 0) && (E[R] = H);
                return this.sort(function(Y, U) {
                    return A(Y, U) || E[Y] - E[U]
                })
            } else {
                var E = this.map(function(U) {
                    return U
                });
                return this.sort(function(U, q) {
                    return A(U, q) || E.indexOf(U) - E.indexOf(q)
                })
            }
        }

        function O() {
            var A = "abcdefghijklmnopqrstuvwxyz";
            return A.split("").sort(function(x, E) {
                return ~~(A.indexOf(E) / 2.3) - ~~(A.indexOf(x) / 2.3)
            }).join("") == "xyzvwtursopqmnklhijfgdeabc"
        }

        function $(A, x) {
            var E, m, R, H, Y, U;
            switch (k(A)) {
                case "HTMLImageElement":
                    E = document.createElement("canvas"), E.width = A.naturalWidth, E.height = A.naturalHeight, m = E.getContext("2d"), m.drawImage(A, 0, 0);
                case "Canvas":
                case "HTMLCanvasElement":
                    E = E || A, m = m || E.getContext("2d");
                case "CanvasRenderingContext2D":
                    m = m || A, E = E || m.canvas, R = m.getImageData(0, 0, E.width, E.height);
                case "ImageData":
                    R = R || A, x = R.width, k(R.data) == "CanvasPixelArray" ? H = new Uint8Array(R.data) : H = R.data;
                case "Array":
                case "CanvasPixelArray":
                    H = H || new Uint8Array(A);
                case "Uint8Array":
                case "Uint8ClampedArray":
                    H = H || A, Y = new Uint32Array(H.buffer);
                case "Uint32Array":
                    Y = Y || A, H = H || new Uint8Array(Y.buffer), x = x || Y.length, U = Y.length / x
            }
            return {
                can: E,
                ctx: m,
                imgd: R,
                buf8: H,
                buf32: Y,
                width: x,
                height: U
            }
        }

        function X(A, x, E, m) {
            for (var R = A % E, H = x % m, Y = A - R, U = x - H, q = [], W = 0; W < x; W += m)
                for (var et = 0; et < A; et += E) q.push({
                    x: et,
                    y: W,
                    w: et == Y ? R : E,
                    h: W == U ? H : m
                });
            return q
        }

        function N(A, x, E) {
            var m = A,
                R = m.y * x + m.x,
                H = (m.y + m.h - 1) * x + (m.x + m.w - 1),
                Y = 0,
                U = x - m.w + 1,
                q = R;
            do E.call(this, q), q += ++Y % m.w == 0 ? U : 1; while (q <= H)
        }

        function M(A, x) {
            var E = [];
            for (var m in A) E.push(m);
            return L.call(E, function(R, H) {
                return x ? A[H] - A[R] : A[R] - A[H]
            })
        }
        this.RgbQuant = e, t.exports && (t.exports = e)
    }).call(gu)
})(R0);
const Ic = (t, e) => {
    const {
        concurrency: r,
        limiter: i
    } = e, n = Array.from({
        length: r || 1
    }, () => []), o = () => i ? new Promise(f => setTimeout(f, 1e3 * i.limit())) : Promise.resolve(), a = () => {
        let f = n[0];
        return n.forEach(v => {
            v.length < f.length && (f = v)
        }), f
    }, s = f => {
        f.length === 1 && f[0]().finally(async () => {
            f.shift(), await o(), u(f)
        })
    }, u = f => {
        f.length !== 0 && f[0]().finally(async () => {
            f.shift(), await o(), u(f)
        })
    };
    return {
        queues: n,
        insert: f => {
            const v = a();
            return v.length > t ? Promise.reject("Bottleneck is congested.") : new Promise((S, b) => {
                v.push(() => f().then(S).catch(b)), s(v)
            })
        }
    }
};
var O0 = {},
    Rn = {};
Rn.byteLength = B0;
Rn.toByteArray = F0;
Rn.fromByteArray = z0;
var Se = [],
    ae = [],
    M0 = typeof Uint8Array < "u" ? Uint8Array : Array,
    Qn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Pr = 0, N0 = Qn.length; Pr < N0; ++Pr) Se[Pr] = Qn[Pr], ae[Qn.charCodeAt(Pr)] = Pr;
ae["-".charCodeAt(0)] = 62;
ae["_".charCodeAt(0)] = 63;

function $c(t) {
    var e = t.length;
    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var r = t.indexOf("=");
    r === -1 && (r = e);
    var i = r === e ? 0 : 4 - r % 4;
    return [r, i]
}

function B0(t) {
    var e = $c(t),
        r = e[0],
        i = e[1];
    return (r + i) * 3 / 4 - i
}

function U0(t, e, r) {
    return (e + r) * 3 / 4 - r
}

function F0(t) {
    var e, r = $c(t),
        i = r[0],
        n = r[1],
        o = new M0(U0(t, i, n)),
        a = 0,
        s = n > 0 ? i - 4 : i,
        u;
    for (u = 0; u < s; u += 4) e = ae[t.charCodeAt(u)] << 18 | ae[t.charCodeAt(u + 1)] << 12 | ae[t.charCodeAt(u + 2)] << 6 | ae[t.charCodeAt(u + 3)], o[a++] = e >> 16 & 255, o[a++] = e >> 8 & 255, o[a++] = e & 255;
    return n === 2 && (e = ae[t.charCodeAt(u)] << 2 | ae[t.charCodeAt(u + 1)] >> 4, o[a++] = e & 255), n === 1 && (e = ae[t.charCodeAt(u)] << 10 | ae[t.charCodeAt(u + 1)] << 4 | ae[t.charCodeAt(u + 2)] >> 2, o[a++] = e >> 8 & 255, o[a++] = e & 255), o
}

function H0(t) {
    return Se[t >> 18 & 63] + Se[t >> 12 & 63] + Se[t >> 6 & 63] + Se[t & 63]
}

function Y0(t, e, r) {
    for (var i, n = [], o = e; o < r; o += 3) i = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (t[o + 2] & 255), n.push(H0(i));
    return n.join("")
}

function z0(t) {
    for (var e, r = t.length, i = r % 3, n = [], o = 16383, a = 0, s = r - i; a < s; a += o) n.push(Y0(t, a, a + o > s ? s : a + o));
    return i === 1 ? (e = t[r - 1], n.push(Se[e >> 2] + Se[e << 4 & 63] + "==")) : i === 2 && (e = (t[r - 2] << 8) + t[r - 1], n.push(Se[e >> 10] + Se[e >> 4 & 63] + Se[e << 2 & 63] + "=")), n.join("")
}
var Ko = {}; /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
Ko.read = function(t, e, r, i, n) {
    var o, a, s = n * 8 - i - 1,
        u = (1 << s) - 1,
        h = u >> 1,
        f = -7,
        v = r ? n - 1 : 0,
        S = r ? -1 : 1,
        b = t[e + v];
    for (v += S, o = b & (1 << -f) - 1, b >>= -f, f += s; f > 0; o = o * 256 + t[e + v], v += S, f -= 8);
    for (a = o & (1 << -f) - 1, o >>= -f, f += i; f > 0; a = a * 256 + t[e + v], v += S, f -= 8);
    if (o === 0) o = 1 - h;
    else {
        if (o === u) return a ? NaN : (b ? -1 : 1) * (1 / 0);
        a = a + Math.pow(2, i), o = o - h
    }
    return (b ? -1 : 1) * a * Math.pow(2, o - i)
};
Ko.write = function(t, e, r, i, n, o) {
    var a, s, u, h = o * 8 - n - 1,
        f = (1 << h) - 1,
        v = f >> 1,
        S = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        b = i ? 0 : o - 1,
        D = i ? 1 : -1,
        _ = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = f) : (a = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), a + v >= 1 ? e += S / u : e += S * Math.pow(2, 1 - v), e * u >= 2 && (a++, u /= 2), a + v >= f ? (s = 0, a = f) : a + v >= 1 ? (s = (e * u - 1) * Math.pow(2, n), a = a + v) : (s = e * Math.pow(2, v - 1) * Math.pow(2, n), a = 0)); n >= 8; t[r + b] = s & 255, b += D, s /= 256, n -= 8);
    for (a = a << n | s, h += n; h > 0; t[r + b] = a & 255, b += D, a /= 256, h -= 8);
    t[r + b - D] |= _ * 128
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(t) {
    const e = Rn,
        r = Ko,
        i = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    t.Buffer = s, t.SlowBuffer = k, t.INSPECT_MAX_BYTES = 50;
    const n = 2147483647;
    t.kMaxLength = n, s.TYPED_ARRAY_SUPPORT = o(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");

    function o() {
        try {
            const d = new Uint8Array(1),
                l = {
                    foo: function() {
                        return 42
                    }
                };
            return Object.setPrototypeOf(l, Uint8Array.prototype), Object.setPrototypeOf(d, l), d.foo() === 42
        } catch {
            return !1
        }
    }
    Object.defineProperty(s.prototype, "parent", {
        enumerable: !0,
        get: function() {
            if (!!s.isBuffer(this)) return this.buffer
        }
    }), Object.defineProperty(s.prototype, "offset", {
        enumerable: !0,
        get: function() {
            if (!!s.isBuffer(this)) return this.byteOffset
        }
    });

    function a(d) {
        if (d > n) throw new RangeError('The value "' + d + '" is invalid for option "size"');
        const l = new Uint8Array(d);
        return Object.setPrototypeOf(l, s.prototype), l
    }

    function s(d, l, c) {
        if (typeof d == "number") {
            if (typeof l == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
            return v(d)
        }
        return u(d, l, c)
    }
    s.poolSize = 8192;

    function u(d, l, c) {
        if (typeof d == "string") return S(d, l);
        if (ArrayBuffer.isView(d)) return D(d);
        if (d == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof d);
        if (kt(d, ArrayBuffer) || d && kt(d.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (kt(d, SharedArrayBuffer) || d && kt(d.buffer, SharedArrayBuffer))) return _(d, l, c);
        if (typeof d == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
        const g = d.valueOf && d.valueOf();
        if (g != null && g !== d) return s.from(g, l, c);
        const C = y(d);
        if (C) return C;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof d[Symbol.toPrimitive] == "function") return s.from(d[Symbol.toPrimitive]("string"), l, c);
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof d)
    }
    s.from = function(d, l, c) {
        return u(d, l, c)
    }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);

    function h(d) {
        if (typeof d != "number") throw new TypeError('"size" argument must be of type number');
        if (d < 0) throw new RangeError('The value "' + d + '" is invalid for option "size"')
    }

    function f(d, l, c) {
        return h(d), d <= 0 ? a(d) : l !== void 0 ? typeof c == "string" ? a(d).fill(l, c) : a(d).fill(l) : a(d)
    }
    s.alloc = function(d, l, c) {
        return f(d, l, c)
    };

    function v(d) {
        return h(d), a(d < 0 ? 0 : I(d) | 0)
    }
    s.allocUnsafe = function(d) {
        return v(d)
    }, s.allocUnsafeSlow = function(d) {
        return v(d)
    };

    function S(d, l) {
        if ((typeof l != "string" || l === "") && (l = "utf8"), !s.isEncoding(l)) throw new TypeError("Unknown encoding: " + l);
        const c = L(d, l) | 0;
        let g = a(c);
        const C = g.write(d, l);
        return C !== c && (g = g.slice(0, C)), g
    }

    function b(d) {
        const l = d.length < 0 ? 0 : I(d.length) | 0,
            c = a(l);
        for (let g = 0; g < l; g += 1) c[g] = d[g] & 255;
        return c
    }

    function D(d) {
        if (kt(d, Uint8Array)) {
            const l = new Uint8Array(d);
            return _(l.buffer, l.byteOffset, l.byteLength)
        }
        return b(d)
    }

    function _(d, l, c) {
        if (l < 0 || d.byteLength < l) throw new RangeError('"offset" is outside of buffer bounds');
        if (d.byteLength < l + (c || 0)) throw new RangeError('"length" is outside of buffer bounds');
        let g;
        return l === void 0 && c === void 0 ? g = new Uint8Array(d) : c === void 0 ? g = new Uint8Array(d, l) : g = new Uint8Array(d, l, c), Object.setPrototypeOf(g, s.prototype), g
    }

    function y(d) {
        if (s.isBuffer(d)) {
            const l = I(d.length) | 0,
                c = a(l);
            return c.length === 0 || d.copy(c, 0, 0, l), c
        }
        if (d.length !== void 0) return typeof d.length != "number" || Rt(d.length) ? a(0) : b(d);
        if (d.type === "Buffer" && Array.isArray(d.data)) return b(d.data)
    }

    function I(d) {
        if (d >= n) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n.toString(16) + " bytes");
        return d | 0
    }

    function k(d) {
        return +d != d && (d = 0), s.alloc(+d)
    }
    s.isBuffer = function(l) {
        return l != null && l._isBuffer === !0 && l !== s.prototype
    }, s.compare = function(l, c) {
        if (kt(l, Uint8Array) && (l = s.from(l, l.offset, l.byteLength)), kt(c, Uint8Array) && (c = s.from(c, c.offset, c.byteLength)), !s.isBuffer(l) || !s.isBuffer(c)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (l === c) return 0;
        let g = l.length,
            C = c.length;
        for (let P = 0, B = Math.min(g, C); P < B; ++P)
            if (l[P] !== c[P]) {
                g = l[P], C = c[P];
                break
            } return g < C ? -1 : C < g ? 1 : 0
    }, s.isEncoding = function(l) {
        switch (String(l).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
        }
    }, s.concat = function(l, c) {
        if (!Array.isArray(l)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (l.length === 0) return s.alloc(0);
        let g;
        if (c === void 0)
            for (c = 0, g = 0; g < l.length; ++g) c += l[g].length;
        const C = s.allocUnsafe(c);
        let P = 0;
        for (g = 0; g < l.length; ++g) {
            let B = l[g];
            if (kt(B, Uint8Array)) P + B.length > C.length ? (s.isBuffer(B) || (B = s.from(B)), B.copy(C, P)) : Uint8Array.prototype.set.call(C, B, P);
            else if (s.isBuffer(B)) B.copy(C, P);
            else throw new TypeError('"list" argument must be an Array of Buffers');
            P += B.length
        }
        return C
    };

    function L(d, l) {
        if (s.isBuffer(d)) return d.length;
        if (ArrayBuffer.isView(d) || kt(d, ArrayBuffer)) return d.byteLength;
        if (typeof d != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof d);
        const c = d.length,
            g = arguments.length > 2 && arguments[2] === !0;
        if (!g && c === 0) return 0;
        let C = !1;
        for (;;) switch (l) {
            case "ascii":
            case "latin1":
            case "binary":
                return c;
            case "utf8":
            case "utf-8":
                return zt(d).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return c * 2;
            case "hex":
                return c >>> 1;
            case "base64":
                return Lt(d).length;
            default:
                if (C) return g ? -1 : zt(d).length;
                l = ("" + l).toLowerCase(), C = !0
        }
    }
    s.byteLength = L;

    function p(d, l, c) {
        let g = !1;
        if ((l === void 0 || l < 0) && (l = 0), l > this.length || ((c === void 0 || c > this.length) && (c = this.length), c <= 0) || (c >>>= 0, l >>>= 0, c <= l)) return "";
        for (d || (d = "utf8");;) switch (d) {
            case "hex":
                return W(this, l, c);
            case "utf8":
            case "utf-8":
                return R(this, l, c);
            case "ascii":
                return U(this, l, c);
            case "latin1":
            case "binary":
                return q(this, l, c);
            case "base64":
                return m(this, l, c);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return et(this, l, c);
            default:
                if (g) throw new TypeError("Unknown encoding: " + d);
                d = (d + "").toLowerCase(), g = !0
        }
    }
    s.prototype._isBuffer = !0;

    function O(d, l, c) {
        const g = d[l];
        d[l] = d[c], d[c] = g
    }
    s.prototype.swap16 = function() {
        const l = this.length;
        if (l % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let c = 0; c < l; c += 2) O(this, c, c + 1);
        return this
    }, s.prototype.swap32 = function() {
        const l = this.length;
        if (l % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let c = 0; c < l; c += 4) O(this, c, c + 3), O(this, c + 1, c + 2);
        return this
    }, s.prototype.swap64 = function() {
        const l = this.length;
        if (l % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let c = 0; c < l; c += 8) O(this, c, c + 7), O(this, c + 1, c + 6), O(this, c + 2, c + 5), O(this, c + 3, c + 4);
        return this
    }, s.prototype.toString = function() {
        const l = this.length;
        return l === 0 ? "" : arguments.length === 0 ? R(this, 0, l) : p.apply(this, arguments)
    }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(l) {
        if (!s.isBuffer(l)) throw new TypeError("Argument must be a Buffer");
        return this === l ? !0 : s.compare(this, l) === 0
    }, s.prototype.inspect = function() {
        let l = "";
        const c = t.INSPECT_MAX_BYTES;
        return l = this.toString("hex", 0, c).replace(/(.{2})/g, "$1 ").trim(), this.length > c && (l += " ... "), "<Buffer " + l + ">"
    }, i && (s.prototype[i] = s.prototype.inspect), s.prototype.compare = function(l, c, g, C, P) {
        if (kt(l, Uint8Array) && (l = s.from(l, l.offset, l.byteLength)), !s.isBuffer(l)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof l);
        if (c === void 0 && (c = 0), g === void 0 && (g = l ? l.length : 0), C === void 0 && (C = 0), P === void 0 && (P = this.length), c < 0 || g > l.length || C < 0 || P > this.length) throw new RangeError("out of range index");
        if (C >= P && c >= g) return 0;
        if (C >= P) return -1;
        if (c >= g) return 1;
        if (c >>>= 0, g >>>= 0, C >>>= 0, P >>>= 0, this === l) return 0;
        let B = P - C,
            T = g - c;
        const V = Math.min(B, T),
            G = this.slice(C, P),
            tt = l.slice(c, g);
        for (let Q = 0; Q < V; ++Q)
            if (G[Q] !== tt[Q]) {
                B = G[Q], T = tt[Q];
                break
            } return B < T ? -1 : T < B ? 1 : 0
    };

    function $(d, l, c, g, C) {
        if (d.length === 0) return -1;
        if (typeof c == "string" ? (g = c, c = 0) : c > 2147483647 ? c = 2147483647 : c < -2147483648 && (c = -2147483648), c = +c, Rt(c) && (c = C ? 0 : d.length - 1), c < 0 && (c = d.length + c), c >= d.length) {
            if (C) return -1;
            c = d.length - 1
        } else if (c < 0)
            if (C) c = 0;
            else return -1;
        if (typeof l == "string" && (l = s.from(l, g)), s.isBuffer(l)) return l.length === 0 ? -1 : X(d, l, c, g, C);
        if (typeof l == "number") return l = l & 255, typeof Uint8Array.prototype.indexOf == "function" ? C ? Uint8Array.prototype.indexOf.call(d, l, c) : Uint8Array.prototype.lastIndexOf.call(d, l, c) : X(d, [l], c, g, C);
        throw new TypeError("val must be string, number or Buffer")
    }

    function X(d, l, c, g, C) {
        let P = 1,
            B = d.length,
            T = l.length;
        if (g !== void 0 && (g = String(g).toLowerCase(), g === "ucs2" || g === "ucs-2" || g === "utf16le" || g === "utf-16le")) {
            if (d.length < 2 || l.length < 2) return -1;
            P = 2, B /= 2, T /= 2, c /= 2
        }

        function V(tt, Q) {
            return P === 1 ? tt[Q] : tt.readUInt16BE(Q * P)
        }
        let G;
        if (C) {
            let tt = -1;
            for (G = c; G < B; G++)
                if (V(d, G) === V(l, tt === -1 ? 0 : G - tt)) {
                    if (tt === -1 && (tt = G), G - tt + 1 === T) return tt * P
                } else tt !== -1 && (G -= G - tt), tt = -1
        } else
            for (c + T > B && (c = B - T), G = c; G >= 0; G--) {
                let tt = !0;
                for (let Q = 0; Q < T; Q++)
                    if (V(d, G + Q) !== V(l, Q)) {
                        tt = !1;
                        break
                    } if (tt) return G
            }
        return -1
    }
    s.prototype.includes = function(l, c, g) {
        return this.indexOf(l, c, g) !== -1
    }, s.prototype.indexOf = function(l, c, g) {
        return $(this, l, c, g, !0)
    }, s.prototype.lastIndexOf = function(l, c, g) {
        return $(this, l, c, g, !1)
    };

    function N(d, l, c, g) {
        c = Number(c) || 0;
        const C = d.length - c;
        g ? (g = Number(g), g > C && (g = C)) : g = C;
        const P = l.length;
        g > P / 2 && (g = P / 2);
        let B;
        for (B = 0; B < g; ++B) {
            const T = parseInt(l.substr(B * 2, 2), 16);
            if (Rt(T)) return B;
            d[c + B] = T
        }
        return B
    }

    function M(d, l, c, g) {
        return Xt(zt(l, d.length - c), d, c, g)
    }

    function A(d, l, c, g) {
        return Xt(Ve(l), d, c, g)
    }

    function x(d, l, c, g) {
        return Xt(Lt(l), d, c, g)
    }

    function E(d, l, c, g) {
        return Xt(be(l, d.length - c), d, c, g)
    }
    s.prototype.write = function(l, c, g, C) {
        if (c === void 0) C = "utf8", g = this.length, c = 0;
        else if (g === void 0 && typeof c == "string") C = c, g = this.length, c = 0;
        else if (isFinite(c)) c = c >>> 0, isFinite(g) ? (g = g >>> 0, C === void 0 && (C = "utf8")) : (C = g, g = void 0);
        else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        const P = this.length - c;
        if ((g === void 0 || g > P) && (g = P), l.length > 0 && (g < 0 || c < 0) || c > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        C || (C = "utf8");
        let B = !1;
        for (;;) switch (C) {
            case "hex":
                return N(this, l, c, g);
            case "utf8":
            case "utf-8":
                return M(this, l, c, g);
            case "ascii":
            case "latin1":
            case "binary":
                return A(this, l, c, g);
            case "base64":
                return x(this, l, c, g);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return E(this, l, c, g);
            default:
                if (B) throw new TypeError("Unknown encoding: " + C);
                C = ("" + C).toLowerCase(), B = !0
        }
    }, s.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    };

    function m(d, l, c) {
        return l === 0 && c === d.length ? e.fromByteArray(d) : e.fromByteArray(d.slice(l, c))
    }

    function R(d, l, c) {
        c = Math.min(d.length, c);
        const g = [];
        let C = l;
        for (; C < c;) {
            const P = d[C];
            let B = null,
                T = P > 239 ? 4 : P > 223 ? 3 : P > 191 ? 2 : 1;
            if (C + T <= c) {
                let V, G, tt, Q;
                switch (T) {
                    case 1:
                        P < 128 && (B = P);
                        break;
                    case 2:
                        V = d[C + 1], (V & 192) === 128 && (Q = (P & 31) << 6 | V & 63, Q > 127 && (B = Q));
                        break;
                    case 3:
                        V = d[C + 1], G = d[C + 2], (V & 192) === 128 && (G & 192) === 128 && (Q = (P & 15) << 12 | (V & 63) << 6 | G & 63, Q > 2047 && (Q < 55296 || Q > 57343) && (B = Q));
                        break;
                    case 4:
                        V = d[C + 1], G = d[C + 2], tt = d[C + 3], (V & 192) === 128 && (G & 192) === 128 && (tt & 192) === 128 && (Q = (P & 15) << 18 | (V & 63) << 12 | (G & 63) << 6 | tt & 63, Q > 65535 && Q < 1114112 && (B = Q))
                }
            }
            B === null ? (B = 65533, T = 1) : B > 65535 && (B -= 65536, g.push(B >>> 10 & 1023 | 55296), B = 56320 | B & 1023), g.push(B), C += T
        }
        return Y(g)
    }
    const H = 4096;

    function Y(d) {
        const l = d.length;
        if (l <= H) return String.fromCharCode.apply(String, d);
        let c = "",
            g = 0;
        for (; g < l;) c += String.fromCharCode.apply(String, d.slice(g, g += H));
        return c
    }

    function U(d, l, c) {
        let g = "";
        c = Math.min(d.length, c);
        for (let C = l; C < c; ++C) g += String.fromCharCode(d[C] & 127);
        return g
    }

    function q(d, l, c) {
        let g = "";
        c = Math.min(d.length, c);
        for (let C = l; C < c; ++C) g += String.fromCharCode(d[C]);
        return g
    }

    function W(d, l, c) {
        const g = d.length;
        (!l || l < 0) && (l = 0), (!c || c < 0 || c > g) && (c = g);
        let C = "";
        for (let P = l; P < c; ++P) C += Pe[d[P]];
        return C
    }

    function et(d, l, c) {
        const g = d.slice(l, c);
        let C = "";
        for (let P = 0; P < g.length - 1; P += 2) C += String.fromCharCode(g[P] + g[P + 1] * 256);
        return C
    }
    s.prototype.slice = function(l, c) {
        const g = this.length;
        l = ~~l, c = c === void 0 ? g : ~~c, l < 0 ? (l += g, l < 0 && (l = 0)) : l > g && (l = g), c < 0 ? (c += g, c < 0 && (c = 0)) : c > g && (c = g), c < l && (c = l);
        const C = this.subarray(l, c);
        return Object.setPrototypeOf(C, s.prototype), C
    };

    function J(d, l, c) {
        if (d % 1 !== 0 || d < 0) throw new RangeError("offset is not uint");
        if (d + l > c) throw new RangeError("Trying to access beyond buffer length")
    }
    s.prototype.readUintLE = s.prototype.readUIntLE = function(l, c, g) {
        l = l >>> 0, c = c >>> 0, g || J(l, c, this.length);
        let C = this[l],
            P = 1,
            B = 0;
        for (; ++B < c && (P *= 256);) C += this[l + B] * P;
        return C
    }, s.prototype.readUintBE = s.prototype.readUIntBE = function(l, c, g) {
        l = l >>> 0, c = c >>> 0, g || J(l, c, this.length);
        let C = this[l + --c],
            P = 1;
        for (; c > 0 && (P *= 256);) C += this[l + --c] * P;
        return C
    }, s.prototype.readUint8 = s.prototype.readUInt8 = function(l, c) {
        return l = l >>> 0, c || J(l, 1, this.length), this[l]
    }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(l, c) {
        return l = l >>> 0, c || J(l, 2, this.length), this[l] | this[l + 1] << 8
    }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(l, c) {
        return l = l >>> 0, c || J(l, 2, this.length), this[l] << 8 | this[l + 1]
    }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(l, c) {
        return l = l >>> 0, c || J(l, 4, this.length), (this[l] | this[l + 1] << 8 | this[l + 2] << 16) + this[l + 3] * 16777216
    }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(l, c) {
        return l = l >>> 0, c || J(l, 4, this.length), this[l] * 16777216 + (this[l + 1] << 16 | this[l + 2] << 8 | this[l + 3])
    }, s.prototype.readBigUInt64LE = Vt(function(l) {
        l = l >>> 0, Zt(l, "offset");
        const c = this[l],
            g = this[l + 7];
        (c === void 0 || g === void 0) && ne(l, this.length - 8);
        const C = c + this[++l] * 2 ** 8 + this[++l] * 2 ** 16 + this[++l] * 2 ** 24,
            P = this[++l] + this[++l] * 2 ** 8 + this[++l] * 2 ** 16 + g * 2 ** 24;
        return BigInt(C) + (BigInt(P) << BigInt(32))
    }), s.prototype.readBigUInt64BE = Vt(function(l) {
        l = l >>> 0, Zt(l, "offset");
        const c = this[l],
            g = this[l + 7];
        (c === void 0 || g === void 0) && ne(l, this.length - 8);
        const C = c * 2 ** 24 + this[++l] * 2 ** 16 + this[++l] * 2 ** 8 + this[++l],
            P = this[++l] * 2 ** 24 + this[++l] * 2 ** 16 + this[++l] * 2 ** 8 + g;
        return (BigInt(C) << BigInt(32)) + BigInt(P)
    }), s.prototype.readIntLE = function(l, c, g) {
        l = l >>> 0, c = c >>> 0, g || J(l, c, this.length);
        let C = this[l],
            P = 1,
            B = 0;
        for (; ++B < c && (P *= 256);) C += this[l + B] * P;
        return P *= 128, C >= P && (C -= Math.pow(2, 8 * c)), C
    }, s.prototype.readIntBE = function(l, c, g) {
        l = l >>> 0, c = c >>> 0, g || J(l, c, this.length);
        let C = c,
            P = 1,
            B = this[l + --C];
        for (; C > 0 && (P *= 256);) B += this[l + --C] * P;
        return P *= 128, B >= P && (B -= Math.pow(2, 8 * c)), B
    }, s.prototype.readInt8 = function(l, c) {
        return l = l >>> 0, c || J(l, 1, this.length), this[l] & 128 ? (255 - this[l] + 1) * -1 : this[l]
    }, s.prototype.readInt16LE = function(l, c) {
        l = l >>> 0, c || J(l, 2, this.length);
        const g = this[l] | this[l + 1] << 8;
        return g & 32768 ? g | 4294901760 : g
    }, s.prototype.readInt16BE = function(l, c) {
        l = l >>> 0, c || J(l, 2, this.length);
        const g = this[l + 1] | this[l] << 8;
        return g & 32768 ? g | 4294901760 : g
    }, s.prototype.readInt32LE = function(l, c) {
        return l = l >>> 0, c || J(l, 4, this.length), this[l] | this[l + 1] << 8 | this[l + 2] << 16 | this[l + 3] << 24
    }, s.prototype.readInt32BE = function(l, c) {
        return l = l >>> 0, c || J(l, 4, this.length), this[l] << 24 | this[l + 1] << 16 | this[l + 2] << 8 | this[l + 3]
    }, s.prototype.readBigInt64LE = Vt(function(l) {
        l = l >>> 0, Zt(l, "offset");
        const c = this[l],
            g = this[l + 7];
        (c === void 0 || g === void 0) && ne(l, this.length - 8);
        const C = this[l + 4] + this[l + 5] * 2 ** 8 + this[l + 6] * 2 ** 16 + (g << 24);
        return (BigInt(C) << BigInt(32)) + BigInt(c + this[++l] * 2 ** 8 + this[++l] * 2 ** 16 + this[++l] * 2 ** 24)
    }), s.prototype.readBigInt64BE = Vt(function(l) {
        l = l >>> 0, Zt(l, "offset");
        const c = this[l],
            g = this[l + 7];
        (c === void 0 || g === void 0) && ne(l, this.length - 8);
        const C = (c << 24) + this[++l] * 2 ** 16 + this[++l] * 2 ** 8 + this[++l];
        return (BigInt(C) << BigInt(32)) + BigInt(this[++l] * 2 ** 24 + this[++l] * 2 ** 16 + this[++l] * 2 ** 8 + g)
    }), s.prototype.readFloatLE = function(l, c) {
        return l = l >>> 0, c || J(l, 4, this.length), r.read(this, l, !0, 23, 4)
    }, s.prototype.readFloatBE = function(l, c) {
        return l = l >>> 0, c || J(l, 4, this.length), r.read(this, l, !1, 23, 4)
    }, s.prototype.readDoubleLE = function(l, c) {
        return l = l >>> 0, c || J(l, 8, this.length), r.read(this, l, !0, 52, 8)
    }, s.prototype.readDoubleBE = function(l, c) {
        return l = l >>> 0, c || J(l, 8, this.length), r.read(this, l, !1, 52, 8)
    };

    function Z(d, l, c, g, C, P) {
        if (!s.isBuffer(d)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (l > C || l < P) throw new RangeError('"value" argument is out of bounds');
        if (c + g > d.length) throw new RangeError("Index out of range")
    }
    s.prototype.writeUintLE = s.prototype.writeUIntLE = function(l, c, g, C) {
        if (l = +l, c = c >>> 0, g = g >>> 0, !C) {
            const T = Math.pow(2, 8 * g) - 1;
            Z(this, l, c, g, T, 0)
        }
        let P = 1,
            B = 0;
        for (this[c] = l & 255; ++B < g && (P *= 256);) this[c + B] = l / P & 255;
        return c + g
    }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(l, c, g, C) {
        if (l = +l, c = c >>> 0, g = g >>> 0, !C) {
            const T = Math.pow(2, 8 * g) - 1;
            Z(this, l, c, g, T, 0)
        }
        let P = g - 1,
            B = 1;
        for (this[c + P] = l & 255; --P >= 0 && (B *= 256);) this[c + P] = l / B & 255;
        return c + g
    }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 1, 255, 0), this[c] = l & 255, c + 1
    }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 2, 65535, 0), this[c] = l & 255, this[c + 1] = l >>> 8, c + 2
    }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 2, 65535, 0), this[c] = l >>> 8, this[c + 1] = l & 255, c + 2
    }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 4, 4294967295, 0), this[c + 3] = l >>> 24, this[c + 2] = l >>> 16, this[c + 1] = l >>> 8, this[c] = l & 255, c + 4
    }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 4, 4294967295, 0), this[c] = l >>> 24, this[c + 1] = l >>> 16, this[c + 2] = l >>> 8, this[c + 3] = l & 255, c + 4
    };

    function pt(d, l, c, g, C) {
        me(l, g, C, d, c, 7);
        let P = Number(l & BigInt(4294967295));
        d[c++] = P, P = P >> 8, d[c++] = P, P = P >> 8, d[c++] = P, P = P >> 8, d[c++] = P;
        let B = Number(l >> BigInt(32) & BigInt(4294967295));
        return d[c++] = B, B = B >> 8, d[c++] = B, B = B >> 8, d[c++] = B, B = B >> 8, d[c++] = B, c
    }

    function ut(d, l, c, g, C) {
        me(l, g, C, d, c, 7);
        let P = Number(l & BigInt(4294967295));
        d[c + 7] = P, P = P >> 8, d[c + 6] = P, P = P >> 8, d[c + 5] = P, P = P >> 8, d[c + 4] = P;
        let B = Number(l >> BigInt(32) & BigInt(4294967295));
        return d[c + 3] = B, B = B >> 8, d[c + 2] = B, B = B >> 8, d[c + 1] = B, B = B >> 8, d[c] = B, c + 8
    }
    s.prototype.writeBigUInt64LE = Vt(function(l, c = 0) {
        return pt(this, l, c, BigInt(0), BigInt("0xffffffffffffffff"))
    }), s.prototype.writeBigUInt64BE = Vt(function(l, c = 0) {
        return ut(this, l, c, BigInt(0), BigInt("0xffffffffffffffff"))
    }), s.prototype.writeIntLE = function(l, c, g, C) {
        if (l = +l, c = c >>> 0, !C) {
            const V = Math.pow(2, 8 * g - 1);
            Z(this, l, c, g, V - 1, -V)
        }
        let P = 0,
            B = 1,
            T = 0;
        for (this[c] = l & 255; ++P < g && (B *= 256);) l < 0 && T === 0 && this[c + P - 1] !== 0 && (T = 1), this[c + P] = (l / B >> 0) - T & 255;
        return c + g
    }, s.prototype.writeIntBE = function(l, c, g, C) {
        if (l = +l, c = c >>> 0, !C) {
            const V = Math.pow(2, 8 * g - 1);
            Z(this, l, c, g, V - 1, -V)
        }
        let P = g - 1,
            B = 1,
            T = 0;
        for (this[c + P] = l & 255; --P >= 0 && (B *= 256);) l < 0 && T === 0 && this[c + P + 1] !== 0 && (T = 1), this[c + P] = (l / B >> 0) - T & 255;
        return c + g
    }, s.prototype.writeInt8 = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 1, 127, -128), l < 0 && (l = 255 + l + 1), this[c] = l & 255, c + 1
    }, s.prototype.writeInt16LE = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 2, 32767, -32768), this[c] = l & 255, this[c + 1] = l >>> 8, c + 2
    }, s.prototype.writeInt16BE = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 2, 32767, -32768), this[c] = l >>> 8, this[c + 1] = l & 255, c + 2
    }, s.prototype.writeInt32LE = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 4, 2147483647, -2147483648), this[c] = l & 255, this[c + 1] = l >>> 8, this[c + 2] = l >>> 16, this[c + 3] = l >>> 24, c + 4
    }, s.prototype.writeInt32BE = function(l, c, g) {
        return l = +l, c = c >>> 0, g || Z(this, l, c, 4, 2147483647, -2147483648), l < 0 && (l = 4294967295 + l + 1), this[c] = l >>> 24, this[c + 1] = l >>> 16, this[c + 2] = l >>> 8, this[c + 3] = l & 255, c + 4
    }, s.prototype.writeBigInt64LE = Vt(function(l, c = 0) {
        return pt(this, l, c, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    }), s.prototype.writeBigInt64BE = Vt(function(l, c = 0) {
        return ut(this, l, c, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
    });

    function vt(d, l, c, g, C, P) {
        if (c + g > d.length) throw new RangeError("Index out of range");
        if (c < 0) throw new RangeError("Index out of range")
    }

    function xt(d, l, c, g, C) {
        return l = +l, c = c >>> 0, C || vt(d, l, c, 4), r.write(d, l, c, g, 23, 4), c + 4
    }
    s.prototype.writeFloatLE = function(l, c, g) {
        return xt(this, l, c, !0, g)
    }, s.prototype.writeFloatBE = function(l, c, g) {
        return xt(this, l, c, !1, g)
    };

    function At(d, l, c, g, C) {
        return l = +l, c = c >>> 0, C || vt(d, l, c, 8), r.write(d, l, c, g, 52, 8), c + 8
    }
    s.prototype.writeDoubleLE = function(l, c, g) {
        return At(this, l, c, !0, g)
    }, s.prototype.writeDoubleBE = function(l, c, g) {
        return At(this, l, c, !1, g)
    }, s.prototype.copy = function(l, c, g, C) {
        if (!s.isBuffer(l)) throw new TypeError("argument should be a Buffer");
        if (g || (g = 0), !C && C !== 0 && (C = this.length), c >= l.length && (c = l.length), c || (c = 0), C > 0 && C < g && (C = g), C === g || l.length === 0 || this.length === 0) return 0;
        if (c < 0) throw new RangeError("targetStart out of bounds");
        if (g < 0 || g >= this.length) throw new RangeError("Index out of range");
        if (C < 0) throw new RangeError("sourceEnd out of bounds");
        C > this.length && (C = this.length), l.length - c < C - g && (C = l.length - c + g);
        const P = C - g;
        return this === l && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(c, g, C) : Uint8Array.prototype.set.call(l, this.subarray(g, C), c), P
    }, s.prototype.fill = function(l, c, g, C) {
        if (typeof l == "string") {
            if (typeof c == "string" ? (C = c, c = 0, g = this.length) : typeof g == "string" && (C = g, g = this.length), C !== void 0 && typeof C != "string") throw new TypeError("encoding must be a string");
            if (typeof C == "string" && !s.isEncoding(C)) throw new TypeError("Unknown encoding: " + C);
            if (l.length === 1) {
                const B = l.charCodeAt(0);
                (C === "utf8" && B < 128 || C === "latin1") && (l = B)
            }
        } else typeof l == "number" ? l = l & 255 : typeof l == "boolean" && (l = Number(l));
        if (c < 0 || this.length < c || this.length < g) throw new RangeError("Out of range index");
        if (g <= c) return this;
        c = c >>> 0, g = g === void 0 ? this.length : g >>> 0, l || (l = 0);
        let P;
        if (typeof l == "number")
            for (P = c; P < g; ++P) this[P] = l;
        else {
            const B = s.isBuffer(l) ? l : s.from(l, C),
                T = B.length;
            if (T === 0) throw new TypeError('The value "' + l + '" is invalid for argument "value"');
            for (P = 0; P < g - c; ++P) this[P + c] = B[P % T]
        }
        return this
    };
    const wt = {};

    function St(d, l, c) {
        wt[d] = class extends c {
            constructor() {
                super(), Object.defineProperty(this, "message", {
                    value: l.apply(this, arguments),
                    writable: !0,
                    configurable: !0
                }), this.name = `${this.name} [${d}]`, this.stack, delete this.name
            }
            get code() {
                return d
            }
            set code(C) {
                Object.defineProperty(this, "code", {
                    configurable: !0,
                    enumerable: !0,
                    value: C,
                    writable: !0
                })
            }
            toString() {
                return `${this.name} [${d}]: ${this.message}`
            }
        }
    }
    St("ERR_BUFFER_OUT_OF_BOUNDS", function(d) {
        return d ? `${d} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
    }, RangeError), St("ERR_INVALID_ARG_TYPE", function(d, l) {
        return `The "${d}" argument must be of type number. Received type ${typeof l}`
    }, TypeError), St("ERR_OUT_OF_RANGE", function(d, l, c) {
        let g = `The value of "${d}" is out of range.`,
            C = c;
        return Number.isInteger(c) && Math.abs(c) > 2 ** 32 ? C = Tt(String(c)) : typeof c == "bigint" && (C = String(c), (c > BigInt(2) ** BigInt(32) || c < -(BigInt(2) ** BigInt(32))) && (C = Tt(C)), C += "n"), g += ` It must be ${l}. Received ${C}`, g
    }, RangeError);

    function Tt(d) {
        let l = "",
            c = d.length;
        const g = d[0] === "-" ? 1 : 0;
        for (; c >= g + 4; c -= 3) l = `_${d.slice(c-3,c)}${l}`;
        return `${d.slice(0,c)}${l}`
    }

    function ie(d, l, c) {
        Zt(l, "offset"), (d[l] === void 0 || d[l + c] === void 0) && ne(l, d.length - (c + 1))
    }

    function me(d, l, c, g, C, P) {
        if (d > c || d < l) {
            const B = typeof l == "bigint" ? "n" : "";
            let T;
            throw P > 3 ? l === 0 || l === BigInt(0) ? T = `>= 0${B} and < 2${B} ** ${(P+1)*8}${B}` : T = `>= -(2${B} ** ${(P+1)*8-1}${B}) and < 2 ** ${(P+1)*8-1}${B}` : T = `>= ${l}${B} and <= ${c}${B}`, new wt.ERR_OUT_OF_RANGE("value", T, d)
        }
        ie(g, C, P)
    }

    function Zt(d, l) {
        if (typeof d != "number") throw new wt.ERR_INVALID_ARG_TYPE(l, "number", d)
    }

    function ne(d, l, c) {
        throw Math.floor(d) !== d ? (Zt(d, c), new wt.ERR_OUT_OF_RANGE(c || "offset", "an integer", d)) : l < 0 ? new wt.ERR_BUFFER_OUT_OF_BOUNDS : new wt.ERR_OUT_OF_RANGE(c || "offset", `>= ${c?1:0} and <= ${l}`, d)
    }
    const Xe = /[^+/0-9A-Za-z-_]/g;

    function $e(d) {
        if (d = d.split("=")[0], d = d.trim().replace(Xe, ""), d.length < 2) return "";
        for (; d.length % 4 !== 0;) d = d + "=";
        return d
    }

    function zt(d, l) {
        l = l || 1 / 0;
        let c;
        const g = d.length;
        let C = null;
        const P = [];
        for (let B = 0; B < g; ++B) {
            if (c = d.charCodeAt(B), c > 55295 && c < 57344) {
                if (!C) {
                    if (c > 56319) {
                        (l -= 3) > -1 && P.push(239, 191, 189);
                        continue
                    } else if (B + 1 === g) {
                        (l -= 3) > -1 && P.push(239, 191, 189);
                        continue
                    }
                    C = c;
                    continue
                }
                if (c < 56320) {
                    (l -= 3) > -1 && P.push(239, 191, 189), C = c;
                    continue
                }
                c = (C - 55296 << 10 | c - 56320) + 65536
            } else C && (l -= 3) > -1 && P.push(239, 191, 189);
            if (C = null, c < 128) {
                if ((l -= 1) < 0) break;
                P.push(c)
            } else if (c < 2048) {
                if ((l -= 2) < 0) break;
                P.push(c >> 6 | 192, c & 63 | 128)
            } else if (c < 65536) {
                if ((l -= 3) < 0) break;
                P.push(c >> 12 | 224, c >> 6 & 63 | 128, c & 63 | 128)
            } else if (c < 1114112) {
                if ((l -= 4) < 0) break;
                P.push(c >> 18 | 240, c >> 12 & 63 | 128, c >> 6 & 63 | 128, c & 63 | 128)
            } else throw new Error("Invalid code point")
        }
        return P
    }

    function Ve(d) {
        const l = [];
        for (let c = 0; c < d.length; ++c) l.push(d.charCodeAt(c) & 255);
        return l
    }

    function be(d, l) {
        let c, g, C;
        const P = [];
        for (let B = 0; B < d.length && !((l -= 2) < 0); ++B) c = d.charCodeAt(B), g = c >> 8, C = c % 256, P.push(C), P.push(g);
        return P
    }

    function Lt(d) {
        return e.toByteArray($e(d))
    }

    function Xt(d, l, c, g) {
        let C;
        for (C = 0; C < g && !(C + c >= l.length || C >= d.length); ++C) l[C + c] = d[C];
        return C
    }

    function kt(d, l) {
        return d instanceof l || d != null && d.constructor != null && d.constructor.name != null && d.constructor.name === l.name
    }

    function Rt(d) {
        return d !== d
    }
    const Pe = function() {
        const d = "0123456789abcdef",
            l = new Array(256);
        for (let c = 0; c < 16; ++c) {
            const g = c * 16;
            for (let C = 0; C < 16; ++C) l[g + C] = d[c] + d[C]
        }
        return l
    }();

    function Vt(d) {
        return typeof BigInt > "u" ? qe : d
    }

    function qe() {
        throw new Error("BigInt not supported")
    }
})(O0);
const Pc = 4096,
    Lc = () => ({
        concurrency: 3,
        limiter: lc(3)
    });
Ic(Pc, Lc());
Ic(Pc, Lc());
Kc(() => w(L0, {}), document.getElementById("root"));
