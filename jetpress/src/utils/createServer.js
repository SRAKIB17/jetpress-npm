"use strict"; var _CreateServer_instances, _CreateServer_responseHandler, _CreateServer_handleRequest, _CreateServer_commonMiddlewareCall, _CreateServer_notFoundHandler, __createBinding = this && this.__createBinding || (Object.create ? function (e, t, n, l) { void 0 === l && (l = n); var r = Object.getOwnPropertyDescriptor(t, n); (!r || ("get" in r ? !t.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function () { return t[n] } }), Object.defineProperty(e, l, r) } : function (e, t, n, l) { void 0 === l && (l = n), e[l] = t[n] }), __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (e, t) { Object.defineProperty(e, "default", { enumerable: !0, value: t }) } : function (e, t) { e.default = t }), __importStar = this && this.__importStar || function (e) { if (e && e.__esModule) return e; var t = {}; if (null != e) for (var n in e) "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && __createBinding(t, e, n); return __setModuleDefault(t, e), t }, __awaiter = this && this.__awaiter || function (e, t, n, l) { return new (n || (n = Promise))(function (r, i) { function a(e) { try { o(l.next(e)) } catch (t) { i(t) } } function s(e) { try { o(l.throw(e)) } catch (t) { i(t) } } function o(e) { var t; e.done ? r(e.value) : ((t = e.value) instanceof n ? t : new n(function (e) { e(t) })).then(a, s) } o((l = l.apply(e, t || [])).next()) }) }, __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (e, t, n, l) { if ("a" === n && !l) throw TypeError("Private accessor was defined without a getter"); if ("function" == typeof t ? e !== t || !l : !t.has(e)) throw TypeError("Cannot read private member from an object whose class did not declare it"); return "m" === n ? l : "a" === n ? l.call(e) : l ? l.value : t.get(e) }, __rest = this && this.__rest || function (e, t) { var n = {}; for (var l in e) Object.prototype.hasOwnProperty.call(e, l) && 0 > t.indexOf(l) && (n[l] = e[l]); if (null != e && "function" == typeof Object.getOwnPropertySymbols) for (var r = 0, l = Object.getOwnPropertySymbols(e); r < l.length; r++)0 > t.indexOf(l[r]) && Object.prototype.propertyIsEnumerable.call(e, l[r]) && (n[l[r]] = e[l[r]]); return n }, __importDefault = this && this.__importDefault || function (e) { return e && e.__esModule ? e : { default: e } }; Object.defineProperty(exports, "__esModule", { value: !0 }), exports.CreateServer = void 0, exports.getLocalFileContents = getLocalFileContents; const fs_1 = __importStar(require("fs")), http_1 = require("http"), https_1 = require("https"), path_1 = __importDefault(require("path")), __1 = require(".."); function getLocalFileContents(e) { return __awaiter(this, void 0, void 0, function* () { return (0, fs_1.readFileSync)(path_1.default.resolve(`./${e}`), { encoding: "utf8" }) }) } function walkSync(e, t = e, n, l) { let r = (0, fs_1.readdirSync)(e, { withFileTypes: !0 }); for (let i of r) { let a = e === t ? i.name : e.replace(t, "").replace(/\\/g, "/") + "/" + i.name; if (i.isDirectory()) walkSync(`${e}/${i.name}`, t, n, l); else { let s = `${n}/${a.startsWith("/") ? a.slice(1) : a}`, o = `${e}/${i.name}`.replace(/\\/g, "/"); l.push({ method: "GET", path: s, callback: (e, t) => t.sendFile(o) }) } } } class CreateServer {
    constructor(e = { enableSsl: !1 }) {
        if (_CreateServer_instances.add(this),//! Create a route array
            this._routes = [], this._config = [], e.enableSsl) { let { enableSsl: t } = e, n = __rest(e, ["enableSsl"]), l = __classPrivateFieldGet(this, _CreateServer_instances, "m", _CreateServer_handleRequest).bind(this); this.server = (0, https_1.createServer)(n, l) } else { let { enableSsl: r } = e, i = __rest(e, ["enableSsl"]), a = __classPrivateFieldGet(this, _CreateServer_instances, "m", _CreateServer_handleRequest).bind(this); this.server = (0, http_1.createServer)(i, a) }
    } static_serve(...e) { let t = (null == e ? void 0 : e.length) == 2 ? e[0] : null, n = (null == e ? void 0 : e.length) == 2 ? e[1] : null == e ? void 0 : e[0]; t && (null == t ? void 0 : t.endsWith("/")) && (null == t ? void 0 : t.lastIndexOf("/")) > 0 && (t = null == t ? void 0 : t.slice(0, -1)), n && (null == n ? void 0 : n.endsWith("/")) && (null == n ? void 0 : n.lastIndexOf("/")) > 0 && (n = null == n ? void 0 : n.slice(0, -1)); try { walkSync(n, n, t, this._routes) } catch (l) { let r = `\x1b[1;31m${null == l ? void 0 : l.message}\x1b[0m`; console.log(r) } } route_middleware_handler(e, t, ...n) { let l = Array.isArray(n[0]) ? n[0] : "function" == typeof n[0] ? [n[0]] : [], r = "function" == typeof n[n.length - 1] ? n[n.length - 1] : void 0; if (!r) { console.error(Error("Route callback function is missing.")); return } let i = this.createHandler(l, r); this._routes.push({ path: t, method: e, callback: i }) } createHandler(e, t) { return (n, l) => { let r = 0, i = () => { r < e.length ? e[r++](n, l, i) : t(n, l) }; i() } }
} exports.CreateServer = CreateServer, _CreateServer_instances = new WeakSet, _CreateServer_responseHandler = function e(t, n, l) { let r = 0; l.status = e => (r = e, l), l.json = (e, t, n) => { let i = r || (null == t ? void 0 : t.status) || 200; l.writeHead(i, Object.assign(Object.assign({}, n), { "Content-Type": "application/json" })), l.end(JSON.stringify(e)) }, l.deleteCookie = (e, t) => { (0, __1.deleteCookie)(l, e, t) }, l.setCookie = (e, t, n) => { (0, __1.setCookie)(l, e, t, n) }, l.buffer = (e, t, n) => { let i = r || (null == t ? void 0 : t.status) || 200, a = {}; (null == t ? void 0 : t.contentType) && (a = { "Content-Type": null == t ? void 0 : t.contentType }), l.writeHead(i, Object.assign(Object.assign({}, n), a)), l.end(e) }, l.send = (e, t, n) => { if ("object" == typeof e) l.json(e, t, n); else { let i = r || (null == t ? void 0 : t.status) || 200, a = { "Content-Type": __1.ContentType.PlainText }; (null == t ? void 0 : t.contentType) && (a = { "Content-Type": null == t ? void 0 : t.contentType }), l.writeHead(i, Object.assign(Object.assign({}, n), a)), l.end(e) } }, l.text = (e, t, n) => { let i = r || (null == t ? void 0 : t.status) || 200; l.writeHead(i, Object.assign(Object.assign({}, n), { "Content-Type": "text/plain" })), l.end(e) }, l.html = (e, t, n) => { let i = r || (null == t ? void 0 : t.status) || 200; l.writeHead(i, Object.assign(Object.assign({}, n), { "Content-Type": "text/html" })), l.end(e) }, l.xml = (e, t, n) => { let i = r || (null == t ? void 0 : t.status) || 200; l.writeHead(i, Object.assign(Object.assign({}, n), { "Content-Type": "application/xml" })), l.end(e) }, l.redirect = (e, t, n) => { let i = r || (null == t ? void 0 : t.status) || 302; l.writeHead(i, {}), l.writeHead(i, Object.assign(Object.assign({}, n), { Location: e })), l.end() }, l.sendFile = e => { if ((0, fs_1.existsSync)(e)) { let t = fs_1.default.createReadStream(e); t.pipe(l) } else __classPrivateFieldGet(this, _CreateServer_instances, "m", _CreateServer_notFoundHandler).call(this, n, l) }, l.error = (e, t, n) => { l.writeHead(r || e, Object.assign(Object.assign({}, n), { "Content-Type": "application/json" })), l.end(t) }, __classPrivateFieldGet(this, _CreateServer_instances, "m", _CreateServer_commonMiddlewareCall).call(this, n, l, () => { t.callback(n, l) }) }, _CreateServer_handleRequest = function e(t, n) { let l = new __1.Url(t.url || "").urlParse, r = null == l ? void 0 : l.path; r && (null == r ? void 0 : r.endsWith("/")) && (null == r ? void 0 : r.lastIndexOf("/")) > 0 && (r = null == r ? void 0 : r.slice(0, -1)); let i = this._routes.find(e => { var n, i; let a = null == e ? void 0 : e.path; a && (null == a ? void 0 : a.endsWith("/")) && (null == a ? void 0 : a.lastIndexOf("/")) > 0 && (a = null == a ? void 0 : a.slice(0, -1)); let s = (0, __1.getParams)(a, null == e ? void 0 : e.path); t.params = s, t.query = null == l ? void 0 : l.query, t.cookies = (0, __1.parseCookies)((null === (n = null == t ? void 0 : t.headers) || void 0 === n ? void 0 : n.cookie) || ""), t.location = l; let o = a === r || (null === (i = null == Object ? void 0 : Object.values(s)) || void 0 === i ? void 0 : i.length); return o && (e.method === t.method || (null == e ? void 0 : e.method) === "ALL") }); if (i) __classPrivateFieldGet(this, _CreateServer_instances, "m", _CreateServer_responseHandler).call(this, i, t, n); else { let a = `\x1b[1;31m404 Not Found\x1b[0m \x1b[1;32m${r}\x1b[0m`; console.log(a), __classPrivateFieldGet(this, _CreateServer_instances, "m", _CreateServer_notFoundHandler).call(this, t, n) } }, _CreateServer_commonMiddlewareCall = function e(t, n, l) { let r = this._config, i = 0, a = () => { if (i < (null == r ? void 0 : r.length)) { let e = r[i++]; if (3 == e.length) e(t, n, a); else { let s = `\x1b[1;31mNext middleware function or the final request handler is missing.\x1b[0m`; console.log(Error(s)) } } else l() }; a() }, _CreateServer_notFoundHandler = function e(t, n) {
    var l; let r = this._routes.find(e => "*" == e.path && (e.method === t.method || (null == e ? void 0 : e.method) == "ALL")); if (r) __classPrivateFieldGet(this, _CreateServer_instances, "m", _CreateServer_responseHandler).call(this, r, t, n); else {
        n.writeHead(404, { "Content-Type": "text/plain" }); let { path: i } = (l = new __1.Url((null == t ? void 0 : t.url) || "")).urlParse; n.end(`${null == t ? void 0 : t.method}: '${i}' could not find
`)
    }
};