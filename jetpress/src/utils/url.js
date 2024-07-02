"use strict"; var _Url_url, _Url_urlString, __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (l, t, e, r, i) { if ("m" === r) throw TypeError("Private method is not writable"); if ("a" === r && !i) throw TypeError("Private accessor was defined without a setter"); if ("function" == typeof t ? l !== t || !i : !t.has(l)) throw TypeError("Cannot write private member to an object whose class did not declare it"); return "a" === r ? i.call(l, e) : i ? i.value = e : t.set(l, e), e }, __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (l, t, e, r) { if ("a" === e && !r) throw TypeError("Private accessor was defined without a getter"); if ("function" == typeof t ? l !== t || !r : !t.has(l)) throw TypeError("Cannot read private member from an object whose class did not declare it"); return "m" === e ? r : "a" === e ? r.call(l) : r ? r.value : t.get(l) }; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.Url = void 0; class Url { constructor(l) { var t, e; _Url_url.set(this, void 0), _Url_urlString.set(this, void 0), __classPrivateFieldSet(this, _Url_url, l, "f"); let { protocol: r, hash: i, hostname: s, origin: n, password: a, path: u, port: o, query: d, username: v } = this.urlParse, c = null === (e = null === (t = null == Object ? void 0 : Object.entries(d)) || void 0 === t ? void 0 : t.map(l => `${null == l ? void 0 : l[0]}=${null == l ? void 0 : l[1]}`)) || void 0 === e ? void 0 : e.join("&"); __classPrivateFieldSet(this, _Url_urlString, `${r ? `${r}://` : ""}${v || ""}${a ? `:${a}@` : v ? "@" : ""}${s || ""}:${o || ""}${u || ""}${c ? `?${c}` : ""}${i ? `#${i}` : ""}`, "f") } get urlParse() { var l; let t = __classPrivateFieldGet(this, _Url_url, "f"), e = /\?([^#]*)/, r = t.match(/^(?:(\w+):\/\/)?(?:([^:]+)(?::([^@]+))?@)?([a-zA-Z0-9.-]+|(?:\d{1,3}\.){3}\d{1,3}|\[[a-fA-F0-9:]+\])(?::(\d+))?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/), i = t.match(/#([^]*)/), s = i && i[1] || null, n = r && r[1] || null, a = r && r[2] || null, u = r && r[3] || null, o = r && r[4] || null, d = r && r[5] || null, v = (null === (l = null == t ? void 0 : t.match(/(?:^[^:]+:\/\/[^/]+)?(\/[^?#]*)/)) || void 0 === l ? void 0 : l[1]) || null, c = r && (o ? n ? `${n}://${o}${d ? `:${d}` : ""}` : `${o}${d ? `:${d}` : ""}` : null) || null; return { path: v, hash: s, protocol: n, origin: c, username: a, password: u, hostname: o, href: t, port: d, query: function l() { let r = t.match(e); if (!r || !r[1]) return {}; { let i = decodeURIComponent(r[1]), s = i.split("&"), n = null == s ? void 0 : s.map(l => { let [t, e] = l.split("="); return { [t]: e } }); return n.reduce(function (l, t) { return Object.assign(Object.assign({}, l), t) }, {}) } }() } } get(l) { return this.urlParse[l] } toString() { return __classPrivateFieldGet(this, _Url_urlString, "f") } set(l, t) { var e, r; let i = Object.assign(Object.assign({}, this.urlParse), { [l]: t }), { protocol: s, hash: n, hostname: a, origin: u, password: o, path: d, port: v, query: c, username: h } = i, $ = null === (r = null === (e = null == Object ? void 0 : Object.entries(c)) || void 0 === e ? void 0 : e.map(l => `${null == l ? void 0 : l[0]}=${null == l ? void 0 : l[1]}`)) || void 0 === r ? void 0 : r.join("&"); __classPrivateFieldSet(this, _Url_urlString, `${s ? `${s}://` : ""}${h || ""}${o ? `:${o}@` : h ? "@" : ""}${a || ""}:${v || ""}${d || ""}${$ ? `?${$}` : ""}${n ? `#${n}` : ""}`, "f") } } exports.Url = Url, _Url_url = new WeakMap, _Url_urlString = new WeakMap;