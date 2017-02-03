/**
https://s3.amazonaws.com/fs.clippingmagic.com/p/images2/167/577/220/drawCommands.json?AWSAccessKeyId=AKIAIE5JSQ2FKZL2FJ4Q&Expires=1485388800&Signature=RusSQ%2FeQlgbGn22iEVwzgW0shHU%3D
userMask是重点对象
*/
function yoWorkerPostMessage(t, e) {
	try {
		self.postMessage(t, e)
	} catch (e) {
		self.postMessage(t)
	}
}
function Downsampler() {
	function t() {
		p.push(Date.now())
	}
	function e(t) {
		Date.now() - p.pop()
	}
	function o(t, e, o, i, r) {
		var s = new l(t, e, o, i, r);
		return s.shrink()
	}
	function i(i) {
		t();
		var r = o(i.dataIn, i.wIn, i.hIn, i.wOut, i.hOut);
		return e("Downsampler.shrink"),
		r
	}
	var r = 0,
	s = 1,
	n = 2,
	a = 3,
	l = function () {
		function t(t, e, o, i, r) {
			this.dataIn = t,
			this.wIn = e,
			this.hIn = o,
			this.wOut = i,
			this.hOut = r,
			this.dataOut = new Uint8ClampedArray(i * r * 4),
			this.outToInX = this.wIn / this.wOut,
			this.outToInY = this.hIn / this.hOut
		}
		return t.prototype.reset = function () {
			this.rSum = 0,
			this.gSum = 0,
			this.bSum = 0,
			this.wSum = 0
		},
		t.prototype.accumulate = function (t, e, o) {
			var i = 4 * (t + this.wIn * e);
			this.rSum += this.dataIn[i + r] * o,
			this.gSum += this.dataIn[i + s] * o,
			this.bSum += this.dataIn[i + n] * o,
			this.wSum += o
		},
		t.prototype.populate = function (t, e) {
			this.reset();
			var o = t * this.outToInX,
			i = e * this.outToInY,
			l = Math.min(o + this.outToInX, this.wIn),
			p = Math.min(i + this.outToInY, this.hIn),
			c = Math.floor(o),
			u = Math.floor(i),
			d = Math.ceil(l) - 1,
			h = Math.ceil(p) - 1,
			g = Math.ceil(o),
			f = Math.ceil(i),
			w = d,
			S = h,
			m = g - o,
			C = f - i,
			y = l - w,
			v = p - S;
			this.accumulate(c, u, m * C),
			this.accumulate(c, h, m * v);
			for (var b = g; b < w; b++)
				this.accumulate(b, u, C),
				this.accumulate(b, h, v);
			this.accumulate(d, u, y * C),
			this.accumulate(d, h, y * v);
			for (var M = f; M < S; M++) {
				this.accumulate(c, M, m);
				for (var b = g; b < w; b++)
					this.accumulate(b, M, 1);
				this.accumulate(d, M, y)
			}
			var k = 4 * (t + e * this.wOut);
			this.dataOut[k + r] = this.rSum / this.wSum,
			this.dataOut[k + s] = this.gSum / this.wSum,
			this.dataOut[k + n] = this.bSum / this.wSum,
			this.dataOut[k + a] = 255
		},
		t.prototype.shrink = function () {
			for (var t = 0, e = 0; t < this.hOut; t++)
				for (var o = 0; o < this.wOut; o++,
					e++)
					this.populate(o, t);
			return this.dataOut
		},
		t
	}
	(),
	p = [];
	self.addEventListener("message", function (t) {
		try {
			var e = t.data,
			o = i(e),
			r = {
				canvasId: e.canvasId,
				success: !0,
				wOut: e.wOut,
				hOut: e.hOut,
				dataOut: o
			};
			yoWorkerPostMessage(r, [o.buffer])
		} catch (t) {
			var r = {
				canvasId: e.canvasId,
				success: !1,
				wOut: 0,
				hOut: 0,
				dataOut: null
			};
			self.postMessage(r)
		}
	})
}
var __extends = this && this.__extends || function (t, e) {
	function o() {
		this.constructor = t
	}
	for (var i in e)
		e.hasOwnProperty(i) && (t[i] = e[i]);
	t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype,
			new o)
}, CssSelector = function () {
	function t(t) {
		this._css = t
	}
	return t.prototype.css = function () {
		return this._css
	},
	t.prototype.$ = function (t) {
		return !t && this._cache || (this._cache = $(this._css))
	},
	t.prototype.join = function (e, o) {
		return void 0 === o && (o = " "),
		new t(this._css + o + e._css)
	},
	t.prototype.exists = function (t) {
		return this.$(t).length > 0
	},
	t
}
(), CssClass = function (t) {
	function e(e) {
		t.call(this, "." + e),
		this._name = e
	}
	return __extends(e, t),
	e.prototype.name = function () {
		return this._name
	},
	e
}
(CssSelector), CssId = function (t) {
	function e(e) {
		t.call(this, "#" + e),
		this._name = e
	}
	return __extends(e, t),
	e.prototype.name = function () {
		return this._name
	},
	e.prototype.el = function () {
		return document.getElementById(this._name)
	},
	e
}
(CssSelector), Css;
!function (t) {
	t.empty = new CssSelector(""),
	t.html = new CssSelector("html"),
	t.body = new CssSelector("body"),
	t.htmlBody = new CssSelector("html, body"),
	t.$window = $(window)
}
(Css || (Css = {}));
var Tr;
!function (t) {
	function e(t, e) {
		window.I18nPhrases[t] = t;
		var o = {
			en: t,
			args: e
		};
		$.ajax({
			url: "/logMissingI18nPhrase",
			method: "POST",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(o)
		});
		var i = window.I18nPhrases || {},
		r = 0;
		for (var s in i)
			i.hasOwnProperty(s) && r++;
		Util.gaTrack("Tr.ts", "LogMissingPhrase", t, r)
	}
	function o(t) {
		for (var o = [], i = 1; i < arguments.length; i++)
			o[i - 1] = arguments[i];
		for (var r = t, l = t.length, p = 0; p < l && r.charCodeAt(p) <= s; )
			p++;
		for (; p < l && r.charCodeAt(l - 1) <= s; )
			l--;
		var c = 0 == p ? "" : r.substring(0, p);
		t = 0 == p && l == r.length ? r : r.substring(p, l);
		var u = l == r.length ? "" : r.substring(l, r.length),
		d = window.I18nPhrases[t];
		return "undefined" == typeof d && (e(t, o),
			d = t),
		o.length > 0 && (d = d.replace(n, function (t, e, i) {
					return "''" == e && (e = "'"),
					e + o[parseInt(i, 10)]
				}),
			d = d.replace(a, function (t, e, i, r, s, n) {
					"''" == e && (e = "'");
					var a = o[parseInt(i, 10)],
					l = e;
					return l += "1" == a ? s || n : n
				})),
		c && (d = c + d),
		u && (d += u),
		d
	}
	function i(t) {
		try {
			return new Intl.NumberFormat(t, {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2
			})
		} catch (t) {
			return l
		}
	}
	function r(t, e) {
		var o = p[e] || (p[e] = i(e));
		return o.format(t / 100)
	}
	var s = 32,
	n = /(''|[^']|^)\{(\d+)\}/g,
	a = /(''|[^']|^)\{(\d+),plural,\s*(one\s*\{([^}]*)\}\s*)?other\s*\{([^}]*)\}\s*\}/g;
	t.s = o;
	var l;
	!function (t) {
		function e(t) {
			return "$" + t.toFixed(2)
		}
		t.format = e
	}
	(l || (l = {}));
	var p = {};
	t.dollars = r
}
(Tr || (Tr = {}));
var Unsafe;
!function (t) {
	function e(t, e) {
		return t[e]
	}
	function o(t, o, i) {
		var r = e(t, o);
		return void 0 === r ? i : r
	}
	function i(t, e, o) {
		return t[e] = o
	}
	function r(t) {
		return t
	}
	t.get = e,
	t.getOrElse = o,
	t.set = i,
	t.cast = r
}
(Unsafe || (Unsafe = {}));
var Base64;
!function (t) {
	function e(t, e) {
		return a[0 | t.charCodeAt(e)]
	}
	function o(t) {
		return n[63 & t]
	}
	function i(t) {
		function o(t) {
			a[p++] = 255 & t
		}
		if (t.length % 4 > 0)
			throw new Error("Invalid string. Length must be a multiple of 4. ");
		var i,
		r,
		s = t.length,
		n = "=" === t.charAt(s - 2) ? 2 : "=" === t.charAt(s - 1) ? 1 : 0,
		a = new Uint8Array(3 * t.length / 4 - n),
		l = n > 0 ? t.length - 4 : t.length,
		p = 0;
		for (i = 0; i < l; i += 4)
			r = e(t, i) << 18 | e(t, i + 1) << 12 | e(t, i + 2) << 6 | e(t, i + 3),
			o(r >> 16),
			o(r >> 8),
			o(r);
		return 2 === n ? (r = e(t, i) << 2 | e(t, i + 1) >> 4,
			o(r)) : 1 === n && (r = e(t, i) << 10 | e(t, i + 1) << 4 | e(t, i + 2) >> 2,
			o(r >> 8),
			o(r)),
		a
	}
	function r(t, e) {
		e = e || t.length;
		for (var i, r = e % 3, s = "", n = e - r, a = 0; a < n; a += 3)
			i = (t[a] << 16) + (t[a + 1] << 8) + t[a + 2],
			s += o(i >> 18),
			s += o(i >> 12),
			s += o(i >> 6),
			s += o(i);
		return 1 == r ? (i = t[n],
			s += o(i >> 2),
			s += o(i << 4),
			s += "==") : 2 == r && (i = (t[n] << 8) + t[n + 1],
			s += o(i >> 10),
			s += o(i >> 4),
			s += o(i << 2),
			s += "="),
		s.replace(/\!/, "!")
	}
	for (var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = [], a = new Uint8Array(256), l = 0; l < s.length; l++)
		n[l] = s.charAt(l),
		a[s.charCodeAt(l)] = l;
	a["-".charCodeAt(0)] = 62,
	a["_".charCodeAt(0)] = 63,
	t.decode = i,
	t.encode = r
}
(Base64 || (Base64 = {}));
var Util;
!function (t) {
	function e() {
		X.push(Date.now())
	}
	function o(t) {
		Date.now() - X.pop()
	}
	function i(t, e) {
		return t.toFixed(e).replace(/\.?0+$/, "")
	}
	function r(t) {
		return i(t.w, 3) + ":" + i(t.h, 3)
	}
	function s(t, e) {
		return ("000000000" + t.toString(16)).substr(-e)
	}
	function n(t, e) {
		for (var o = t.w / t.h, i = 0; i < e.length; i++) {
			var r = e[i],
			s = r.w / r.h;
			if (Math.abs((o - s) / s) < .01)
				return r
		}
		return t.w > t.h ? {
			w: t.w / t.h,
			h: 1
		}
		 : {
			w: 1,
			h: t.h / t.w
		}
	}
	function a(t, e) {
		return parseFloat(t.toFixed(e))
	}
	function l() {}
	function p(t, e, o) {
		return Math.max(e, Math.min(o, t))
	}
	function c(t, e, o) {
		var i = parseInt(t, e);
		return isNaN(i) ? o : i
	}
	function u(t, e) {
		return (t % e + e) % e
	}
	function d(t, e) {
		return (t % e - e) % e
	}
	function h(t, e) {
		var o = u(t, e),
		i = d(t, e);
		return Math.abs(o) <= Math.abs(i) ? o : i
	}
	function g(t, e) {
		return 0 == t.lastIndexOf(e, 0)
	}
	function f(t, e) {
		return t.indexOf(e, t.length - e.length) >= 0
	}
	function w(t, e, o) {
		var i = new FileReader;
		i.onerror = i.onabort = o,
		i.onloadend = function (t) {
			e(Unsafe.cast(i.result))
		},
		i.readAsArrayBuffer(t)
	}
	function S(t) {
		if (!t)
			return null;
		var e = t.match(/data:(.*?)(;base64)?,(.*)/);
		if (!e)
			return null;
		var o = e[1] || "text/plain",
		i = !!e[2],
		r = decodeURIComponent(e[3].trim());
		if (i) {
			var s = Base64.decode(r),
			n = new Blob([s], {
					type: o
				});
			return n.size != s.length && (n = new Blob([s.buffer], {
						type: o
					})),
			n
		}
		return new Blob([r], {
			type: o
		})
	}
	function m(t, e) {
		return C(S(t), e)
	}
	function C(t, e, o) {
		var i = t;
		return i.name = e,
		i.lastModifiedDate = o || Date.now(),
		Unsafe.cast(i)
	}
	function y(t) {
		return Math.min.apply(null, t)
	}
	function v(t) {
		return Math.max.apply(null, t)
	}
	function b(t) {
		return 0 == t ? "0" : t > 0 ? "+" + t : "" + t
	}
	function M(t, e, o) {
		var i = new Image;
		i.onload = function () {
			URL.revokeObjectURL(i.src),
			o(i)
		},
		i.onerror = e,
		i.src = t
	}
	function k(t, e, o) {
		M(URL.createObjectURL(t), e, o)
	}
	function T(t) {
		var e = t.split(".");
		return e.pop(),
		e.join(".")
	}
	function x(t) {
		try {
			return parseInt(t)
		} catch (t) {
			return 0
		}
	}
	function A(t) {
		return "rgba(" + t.join(",") + ")"
	}
	function P(t) {
		return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0]
	}
	function _(t) {
		return t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3]
	}
	function D(t, e, o) {
		for (var i, r = 0; (i = t.indexOf(e, r)) >= 0; )
			o(t.substring(r, i)),
			r = i + e.length;
		r < t.length - 1 && o(t.substring(r, t.length))
	}
	function R(t) {
		if ("undefined" == typeof t)
			return "undefined";
		if (null == t)
			return "null";
		if (t.hasOwnProperty("message"))
			return t.message || "[No message]";
		if ("string" == typeof t)
			return t;
		try {
			return JSON.stringify(t)
		} catch (e) {
			return t.toString()
		}
	}
	function E(t, e) {
		return t.map(function (t) {
			return (0 | t).toString(16)
		}).join(e)
	}
	function F(t) {
		for (var e = "", o = 0; o < t.byteLength; o++)
			e += String.fromCharCode(t[o]);
		return e
	}
	function z(t, e, o, i) {
		ga("send", "event", t, e, o, i, {
			nonInteraction: !0
		})
	}
	function B(t) {
		return Math.floor(Math.random() * t)
	}
	function U(t, e) {
		if (t && t.length >= e) {
			var o = Math.floor((e - 4) / 2);
			return t.substring(0, o) + "..." + t.substring(t.length - o)
		}
		return t
	}
	function O(t, e) {
		return t && t.length >= e ? t.substring(0, e - 3) + "..." : t
	}
	function I(t) {
		return t * t
	}
	function L(t, e) {
		for (var o = 0; o < t.length; o++)
			if (e(t[o]))
				return t[o];
		return null
	}
	function V(t, e, o) {
		void 0 === e && (e = !1),
		void 0 === o && (o = !1);
		var i = "string" == typeof t ? $(t) : t.$();
		e ? i.modal({
			backdrop: !o,
			keyboard: !0
		}) : i.modal({
			backdrop: "static",
			keyboard: !1
		});
		var r = $(".modal-backdrop"),
		s = 1040 + 2 * (r.length - 1);
		r.last().css("z-index", s),
		i.css("z-index", s + 1)
	}
	function G(t, e, o) {
		function i() {
			s.fadeIn(e, r)
		}
		function r() {
			--o > 0 && s.fadeOut(e, i)
		}
		void 0 === e && (e = 200),
		void 0 === o && (o = 3);
		var s = "string" == typeof t ? $(t) : t.$();
		s.fadeOut(e, i)
	}
	function H(t, e) {
		var o = $(document.createElement(t));
		return o.text(e),
		o
	}
	function W(e, o) {
		if (0 === e.status)
			return Tr.s("Failed to connect to the server.") + "\n" + Tr.s("Please verify your network connection.") + "\n";
		var i = t.elide(e.responseText.toString(), 50);
		return e.status < 200 || 299 < e.status ? e.statusText + " [" + e.status + "]\n" + i : "parsererror" === o ? Tr.s("Failed to parse JSON response.") + " [" + o + "]\n" + i : "timeout" === o ? Tr.s("Request time out.") + " [" + o + "]" : "abort" === o ? Tr.s("Request aborted by the server.") + " [" + o + "]" : Tr.s("Unknown error.") + "\n" + i
	}
	var X = [];
	t.tic = e,
	t.toc = o,
	t.toFixed = i,
	t.formatAspectRatio = r,
	t.hex = s,
	t.fuzzyAspectRatioEx = n,
	t.roundTo = a,
	t.empty = l,
	t.clamp = p,
	t.parseIntWithAlt = c,
	t.posMod = u,
	t.negMod = d,
	t.minMod = h,
	t.startsWith = g,
	t.endsWith = f,
	t.blobToArrayBuffer = w,
	t.dataUrlToBlob = S,
	t.dataUrlToFile = m,
	t.blobToFile = C,
	t.min = y,
	t.max = v,
	t.signedNumber = b,
	t.loadImageFromDataUrl = M,
	t.loadImageFromBlob = k,
	t.dropExtension = T,
	t.parsePx = x,
	t.colorBytesToRgbaCss = A,
	t.colorBytesToAbgr32 = P,
	t.colorBytesToRgba32 = _,
	t.spliterate = D,
	t.stringify = R,
	t.join16 = E,
	t.uint8ArrayToString = F,
	t.gaTrack = z,
	t.randomInt = B,
	t.centerElide = U,
	t.elide = O,
	t.sqr = I,
	t.find = L,
	t.modal = V,
	t.blink = G,
	t.makeElement = H,
	t.formatXhrError = W
}
(Util || (Util = {}));
var UploadFromWeb;
!function (t) {
	function e(t, e) {
		function o(t) {
			var o = t.$().val();
			o && e(o)
		}
		t.show_dialog.$().click(function () {
			return Util.modal(t.Dialog, !0),
			t.DialogInput.$().focus(),
			!1
		}),
		t.DialogInput.$().keypress(function (e) {
			return 13 != e.keyCode || (t.DialogButton.$().click(),
				!1)
		}),
		t.DialogButton.$().click(function (e) {
			o(t.DialogInput)
		}),
		t.MainButton.$().click(function (e) {
			return o(t.MainInput),
			!1
		})
	}
	t.initialize = e
}
(UploadFromWeb || (UploadFromWeb = {}));
var Const;
!function (t) {
	t.BrowserChromeUrl = "https://www.google.com/chrome/browser/desktop/",
	t.BrowserFirefoxUrl = "https://www.mozilla.org/en-US/firefox/new/",
	t.BrowserMicrosoftEdgeUrl = "https://www.microsoft.com/en-us/windows/microsoft-edge",
	t.DefaultMaxNumMegapixels = 4
}
(Const || (Const = {}));
var HashMap = function () {
	function t(t) {
		if (this.store = {},
			t)
			for (var e in t) {
				var o = e.toString();
				t.hasOwnProperty(o) && this.put(Unsafe.cast(o), t[o])
			}
	}
	return t.from = function (e) {
		for (var o = new t, i = 0; i < e.length; i++) {
			var r = e[i];
			if (2 == r.length) {
				var s = r[0],
				n = r[1];
				o.put(s, n)
			}
		}
		return o
	},
	t.prototype.getOrElse = function (t, e) {
		return this.contains(t) ? this.get(t) : e
	},
	t.prototype.get = function (t) {
		return this.store[t.toString()]
	},
	t.prototype.put = function (t, e) {
		return this.store[t.toString()] = e
	},
	t.prototype.contains = function (t) {
		return this.store.hasOwnProperty(t.toString())
	},
	t.prototype.remove = function (t) {
		return !!this.contains(t) && (delete this.store[t.toString()],
			!0)
	},
	t
}
(), HashSet = function () {
	function t(t) {
		if (this.store = {},
			t)
			for (var e = 0; e < t.length; e++)
				this.add(t[e])
	}
	return t.prototype.add = function (t) {
		return !this.contains(t) && (this.store[t.toString()] = !0)
	},
	t.prototype.remove = function (t) {
		return !!this.contains(t) && (delete this.store[t.toString()],
			!0)
	},
	t.prototype.contains = function (t) {
		return this.store.hasOwnProperty(t.toString())
	},
	t
}
(), Callbacks;
!function (t) {}
(Callbacks || (Callbacks = {}));
var Debug;
!function (t) {
	function e() {
		r.push(Date.now())
	}
	function o(t) {
		Date.now() - r.pop()
	}
	function i(t) {
		var e = Date.now();
		if (s.contains(t)) {
			e - s.get(t)
		}
		s.put(t, e)
	}
	var r = [],
	s = new HashMap;
	t.tic = e,
	t.toc = o,
	t.ping = i
}
(Debug || (Debug = {}));
var Const;
!function (t) {
	t.MaskVersion = 2,
	t.MouseButtonLeft = 1,
	t.LoupeRadius = 120,
	t.ScreenshotMode = window.Globals.isDev && !1,
	t.IncludeOriginal = !1,
	t.LightProgress = "light-progress",
	t.LightConnecting = "light-connecting",
	t.LightUpdating = "light-updating",
	t.LightUpdated = "light-updated",
	t.SaveSave = "Save",
	t.SaveSaving = "Saving...",
	t.SaveSaved = "Saved",
	t.Noop = "Noop",
	t.SetTool = "SetTool",
	t.SetGlobal = "SetGlobal",
	t.SetUserMask = "SetUserMask",
	t.SetHairMask = "SetHairMask",
	t.SetHairPalette = "SetHairPalette",
	t.SetClientRgbHistogram = "SetClientRgbHistogram",
	t.ServerRgbHistogramResponse = "ServerRgbHistogramResponse",
	t.RequestFullServerMask = "RequestFullServerMask",
	t.GenerateResult = "GenerateResult",
	t.DrawSquare = "DrawSquare",
	t.DrawLine = "DrawLine",
	t.Meta = "Meta",
	t.StatusCheck = "StatusCheck",
	t.EngineInitialized = "EngineInitialized",
	t.Panic = "Panic",
	t.Message = "Message",
	t.SaveServerMask = "SaveServerMask",
	t.SetSwords = "SetSwords",
	t.SetActiveSwords = "SetActiveSwords",
	t.SetSwordIntersections = "SetSwordIntersections",
	t.SetDetectedCorners = "SetDetectedCorners",
	t.SetClientShadows = "SetClientShadows",
	t.DirtiesDrawCommandsSet = new HashSet(["SetGlobal", "SetUserMask", "SetHairMask", "SetHairPalette", "DrawSquare", "DrawLine", "SetSwords", "SetClientShadows"]),
	t.Skip = "Skip",
	t.Exiting = "Exiting",
	t.Exit = "Exit",
	t.Error = "Error",
	t.MaybeSaved = "MaybeSaved",
	t.DocumentReady = "DocumentReady",
	t.Booted = "Booted",
	t.SavedAndResultReady = "SavedAndResultReady",
	t.ServerMaskReset = "ServerMaskReset",
	t.ServerMask = "ServerMask",
	t.ServerMaskDone = "ServerMaskDone",
	t.BezierSet = "BezierSet",
	t.BezierSetDone = "BezierSetDone",
	t.UpdateComplete = "UpdateComplete",
	t.ResultReady = "ResultReady",
	t.ResultPending = "ResultPending",
	t.BoundingRect = "BoundingRect",
	t.MaskCounts = "MaskCounts",
	t.Highlighting = "Highlighting",
	t.CropUnconstrained = "CropUnconstrained",
	t.CropLockedAspectRatio = "CropLockedAspectRatio",
	t.CropTargetSize = "CropTargetSize",
	t.CropMarginPixels = "CropMarginPixels",
	t.CropMarginPercent = "CropMarginPercent",
	t.CropSizeSmall = "CropSizeSmall",
	t.CropSizeMedium = "CropSizeMedium",
	t.CropSizeLarge = "CropSizeLarge",
	t.CropAlignmentTop = "CropAlignmentTop",
	t.CropAlignmentMiddle = "CropAlignmentMiddle",
	t.CropAlignmentBottom = "CropAlignmentBottom",
	t.CropShadowsIgnore = "CropShadowsIgnore",
	t.CropShadowsPad = "CropShadowsPad",
	t.CropShadowsTight = "CropShadowsTight",
	t.ColorSpaceSrgb = "ColorSpaceSrgb",
	t.ColorSpaceAdobeRgb = "ColorSpaceAdobeRgb",
	t.ColorSpaceAppleRgb = "ColorSpaceAppleRgb",
	t.ColorSpaceColorMatchRgb = "ColorSpaceColorMatchRgb",
	t.OpaqueFileFormatJpeg = "OpaqueFileFormatJpeg",
	t.OpaqueFileFormatPng = "OpaqueFileFormatPng",
	t.JpegModeNone = "JpegModeNone",
	t.JpegModeMoz = "JpegModeMoz",
	t.PngModeNone = "PngModeNone",
	t.PngModeLossless = "PngModeLossless",
	t.PngModeLossy = "PngModeLossy",
	t.ViewPanesBoth = "ViewPanesBoth",
	t.ViewPanesMarks = "ViewPanesMarks",
	t.ViewPanesPreview = "ViewPanesPreview",
	t.EllipseShadowFactoryDefaults = {
		strength: .5,
		core: .25
	},
	t.DropShadowFactoryDefaults = {
		enabled: !1,
		cropEnabled: !1,
		opacity: 75,
		blurRadius: 25,
		offsetX: 30,
		offsetY: 30
	},
	t.MirrorShadowFactoryDefaults = {
		enabled: !1,
		opacity: 50,
		height: 200,
		mutated: !1
	},
	t.PerspectiveShadowFactoryDefaults = {
		enabled: !1,
		opacity: 25,
		opacityScale: 50,
		blurRadius: 10,
		blurRadiusScale: 400,
		mutated: !1
	},
	t.FactoryDefaults = {
		autoLevels: Unsafe.cast(!1),
		brushSize: window.Globals.BrushSize,
		globalSmoothingLevel: 1,
		globalBlurLevel: 1,
		globalOffset: 0,
		rotateAngleDeg: 0,
		straightenAngleDeg: 0,
		brightness: 0,
		shadows: 0,
		highlights: 0,
		temperature: 0,
		saturation: 0,
		removeColorCast: !1,
		castColor: 16777215,
		colorCastForegroundProtection: 4,
		whiteBalanceEnabled: !1,
		whiteBalanceGrayColor: 16777215,
		useBrush: !0,
		useCornerDetection: !0,
		useLocalBlur: !0,
		useLocalSmoothing: !0,
		backgroundColor: null,
		cropMode: t.CropUnconstrained,
		cropMarginUnits: t.CropMarginPercent,
		cropObjectSize: t.CropSizeLarge,
		cropVerticalAlignment: t.CropAlignmentMiddle,
		cropShadows: t.CropShadowsPad,
		cropAspectRatio: null,
		cropTargetSize: null,
		cropAllowEnlarging: !1,
		cropFitToResult: !1,
		cropPaddingMils: 50,
		cropPaddingPixels: 25,
		cropRect_o: null,
		outputDpi: 72,
		outputColorSpace: t.ColorSpaceSrgb,
		jpegQuality: 92,
		pngMode: t.PngModeNone,
		jpegMode: t.JpegModeNone,
		opaqueFileFormat: t.OpaqueFileFormatJpeg,
		maxNumMegapixels: t.DefaultMaxNumMegapixels,
		preCropEnabled: !1,
		preCropLockAspectRatio: !1,
		viewPanesMode: t.ViewPanesBoth,
		ellipseShadow: t.EllipseShadowFactoryDefaults,
		dropShadow: t.DropShadowFactoryDefaults,
		mirrorShadow: t.MirrorShadowFactoryDefaults,
		perspectiveShadow: t.PerspectiveShadowFactoryDefaults
	},
	t.AspectRatios = [{
			w: 1,
			h: 1
		}, {
			w: 5,
			h: 4
		}, {
			w: 4,
			h: 3
		}, {
			w: 3,
			h: 2
		}, {
			w: 1.618,
			h: 1
		}, {
			w: 16,
			h: 9
		}
	],
	t.LineOuterWidth = 3.5,
	t.LineInnerWidth = 2
}
(Const || (Const = {}));
var Css;
!function (t) {
	function e(t) {
		return new CssId(t)
	}
	function o(t) {
		return new CssClass(t)
	}
	t.AppContent = e("AppContent"),
	t.AppView = e("AppView"),
	t.AppWrapper = e("AppWrapper"),
	t.BulkLoadingErrorMessage = e("BulkLoadingErrorMessage"),
	t.BulkStatus = e("BulkStatus"),
	t.CastColorSwatch = e("CastColorSwatch"),
	t.ColorsAppTab = e("ColorsAppTab"),
	t.ColorsAppTabLink = e("ColorsAppTabLink"),
	t.ConnectionReceiveIndicator = e("ConnectionReceiveIndicator"),
	t.ConnectionSendIndicator = e("ConnectionSendIndicator"),
	t.ConnectionState = e("ConnectionState"),
	t.CropAppTab = e("CropAppTab"),
	t.CropAppTabLink = e("CropAppTabLink"),
	t.EditAppSidebar = e("EditAppSidebar"),
	t.EditAppTab = e("EditAppTab"),
	t.EditAppTabLink = e("EditAppTabLink"),
	t.GuideLightbox = e("GuideLightbox"),
	t.GuideLightboxOuter = e("GuideLightboxOuter"),
	t.HelpButton = e("HelpButton"),
	t.HelpPopover = e("HelpPopover"),
	t.ImageColorCorrectionNotification = e("ImageColorCorrectionNotification"),
	t.ImageMutationNotification = o("ImageMutationNotification"),
	t.ImageResizeNotification = e("ImageResizeNotification"),
	t.ShadowAppDropShadowCropEnabled = e("ShadowAppDropShadowCropEnabled"),
	t.ShadowAppDropShadowEnabled = e("ShadowAppDropShadowEnabled"),
	t.ShadowAppDropShadowUpdatingIndicator = e("ShadowAppDropShadowUpdatingIndicator"),
	t.ShadowAppMirrorShadowEnabled = e("ShadowAppMirrorShadowEnabled"),
	t.ShadowAppMirrorShadowUpdatingIndicator = e("ShadowAppMirrorShadowUpdatingIndicator"),
	t.ShadowAppPerspectiveShadowEnabled = e("ShadowAppPerspectiveShadowEnabled"),
	t.ShadowAppPerspectiveShadowUpdatingIndicator = e("ShadowAppPerspectiveShadowUpdatingIndicator"),
	t.ShadowAppPreviewButton = e("ShadowAppPreviewButton"),
	t.ShadowAppResetButton = e("ShadowAppResetButton"),
	t.ShadowAppSidebar = e("ShadowAppSidebar"),
	t.ShadowAppTab = e("ShadowAppTab"),
	t.ShadowAppTabLink = e("ShadowAppTabLink"),
	t.StickySettingsLightbox = e("StickySettingsLightbox"),
	t.SubappLightbox = e("subapp-lightbox"),
	t.TutorialLightboxOuter = e("TutorialLightboxOuter"),
	t.WhiteBalanceSwatch = e("WhiteBalanceSwatch"),
	t.brush_size_button = o("brush_size_button"),
	t.bulk_download_button = o("bulk_download_button"),
	t.bulk_status_display = o("bulk_status_display"),
	t.cancel_upload = o("cancel_upload"),
	t.clear_all_edits = o("clear_all_edits"),
	t.clear_hair_mask_tool = o("clear_hair_mask_tool"),
	t.clear_user_mask_tool = o("clear_user_mask_tool"),
	t.colors_app_color_cast_controls = o("colors_app_color_cast_controls"),
	t.colors_app_white_balance_controls = o("colors_app_white_balance_controls"),
	t.connection_active = o("connection_active"),
	t.connection_connected = o("connection_connected"),
	t.connection_connecting = o("connection_connecting"),
	t.connection_disconnected = o("connection_disconnected"),
	t.connection_error = o("connection_error"),
	t.connection_inactive = o("connection_inactive"),
	t.copy_mask_tool = o("copy_mask_tool"),
	t.download = o("download"),
	t.drop_ready = o("drop_ready"),
	t.editMenu = o("editMenu"),
	t.exclusive_group = o("exclusive-group"),
	t.exit_app = o("exit_app"),
	t.eyedropper_color_swatch = o("eyedropper_color_swatch"),
	t.force_exit = o("force_exit"),
	t.guide_next_button = o("guide_next_button"),
	t.help_button = o("help_button"),
	t.not_shop_image_content = o("not_shop_image_content"),
	t.paste_mask_tool = o("paste_mask_tool"),
	t.popover_button = o("popover-button"),
	t.popover_button_label = o("popover-button-label"),
	t.popover_toolbar_no_auto_dismiss = o("popover_toolbar_no_auto_dismiss"),
	t.pre_crop_enabled_checkbox = o("pre_crop_enabled_checkbox"),
	t.redo = o("redo"),
	t.save = o("save"),
	t.scroll_crop = o("scroll_crop"),
	t.shadow_app_close_button = o("shadow_app_close_button"),
	t.shadow_app_drop_shadow_controls = o("shadow_app_drop_shadow_controls"),
	t.shadow_app_drop_shadow_crop_enabled = o("shadow_app_drop_shadow_crop_enabled"),
	t.shadow_app_drop_shadow_crop_enabled_display = o("shadow_app_drop_shadow_crop_enabled_display"),
	t.shadow_app_drop_shadow_offset_display = o("shadow_app_drop_shadow_offset_display"),
	t.shadow_app_drop_shadow_offset_down = o("shadow_app_drop_shadow_offset_down"),
	t.shadow_app_drop_shadow_offset_down_left = o("shadow_app_drop_shadow_offset_down_left"),
	t.shadow_app_drop_shadow_offset_down_right = o("shadow_app_drop_shadow_offset_down_right"),
	t.shadow_app_mirror_shadow_controls = o("shadow_app_mirror_shadow_controls"),
	t.shadow_app_perspective_shadow_controls = o("shadow_app_perspective_shadow_controls"),
	t.shop_image_content = o("shop_image_content"),
	t.show_colors_app_button = o("show_colors_app_button"),
	t.show_crop_app_button = o("show_crop_app_button"),
	t.show_edit_app_button = o("show_edit_app_button"),
	t.show_shadow_app_button = o("show_shadow_app_button"),
	t.single_pane_view = o("single_pane_view"),
	t.skip = o("skip"),
	t.startup_lightbox_content = o("startup_lightbox_content"),
	t.sticky_outline = o("sticky_outline"),
	t.sticky_outline_active = o("sticky_outline_active"),
	t.sticky_settings = o("sticky_settings"),
	t.sticky_settings_close = o("sticky_settings_close"),
	t.subapp_sidebar = o("subapp-sidebar"),
	t.subapp_tab = o("subapp_tab"),
	t.subapp_zoom_in = o("subapp_zoom_in"),
	t.subapp_zoom_out = o("subapp_zoom_out"),
	t.subapp_zoom_to_fit = o("subapp_zoom_to_fit"),
	t.undo = o("undo"),
	t.video_green_lightbox = e("video_green_lightbox"),
	t.viewport_set = o("viewport_set"),
	t.zoom_in = o("zoom_in"),
	t.zoom_out = o("zoom_out"),
	t.zoom_to_fit = o("zoom_to_fit");
	var i;
	!function (t) {
		t.container = o("BrushSize-container"),
		t.decrease = o("BrushSize-decrease"),
		t.display = o("BrushSize-display"),
		t.increase = o("BrushSize-increase"),
		t.reset = o("BrushSize-reset")
	}
	(i || (i = {})),
	t.BrushSize = i;
	var r;
	!function (t) {
		var i;
		!function (t) {
			var i;
			!function (t) {
				t.Dialog = e("Bulk-Download-Dialog-Dialog"),
				t.DownloadLink = e("Bulk-Download-Dialog-DownloadLink"),
				t.Empty = e("Bulk-Download-Dialog-Empty"),
				t.Error = e("Bulk-Download-Dialog-Error"),
				t.ErrorMsg = e("Bulk-Download-Dialog-ErrorMsg"),
				t.Progress = e("Bulk-Download-Dialog-Progress"),
				t.Ready = e("Bulk-Download-Dialog-Ready"),
				t.Single = e("Bulk-Download-Dialog-Single"),
				t.SingleDownloadLink = e("Bulk-Download-Dialog-SingleDownloadLink"),
				t.Waiting = e("Bulk-Download-Dialog-Waiting"),
				t.state = o("Bulk-Download-Dialog-state")
			}
			(i = t.Dialog || (t.Dialog = {}))
		}
		(i = t.Download || (t.Download = {}));
		var r;
		!function (t) {
			t.Dialog = e("Bulk-Upload-Dialog"),
			t.DialogBodyHeader = e("Bulk-Upload-DialogBodyHeader"),
			t.StartClippingButton = e("Bulk-Upload-StartClippingButton")
		}
		(r = t.Upload || (t.Upload = {}))
	}
	(r = t.Bulk || (t.Bulk = {}));
	var s;
	!function (t) {
		t.ColorCastRemovalEnabled = e("ColorsApp-ColorCastRemovalEnabled"),
		t.Sidebar = e("ColorsApp-Sidebar"),
		t.WhiteBalanceEnabled = e("ColorsApp-WhiteBalanceEnabled"),
		t.close_button = o("ColorsApp-close_button"),
		t.color_levels_auto = o("ColorsApp-color_levels_auto"),
		t.color_levels_reset = o("ColorsApp-color_levels_reset"),
		t.reset_button = o("ColorsApp-reset_button");
		var i;
		!function (t) {
			t.AdobeRgb = o("ColorsApp-ColorSpace-AdobeRgb"),
			t.AppleRgb = o("ColorsApp-ColorSpace-AppleRgb"),
			t.ColorMatchRgb = o("ColorsApp-ColorSpace-ColorMatchRgb"),
			t.SRgb = o("ColorsApp-ColorSpace-SRgb"),
			t.button = o("ColorsApp-ColorSpace-button"),
			t.display = o("ColorsApp-ColorSpace-display")
		}
		(i = t.ColorSpace || (t.ColorSpace = {}));
		var r;
		!function (t) {
			t.container = o("ColorsApp-brightness-container"),
			t.decrease = o("ColorsApp-brightness-decrease"),
			t.display = o("ColorsApp-brightness-display"),
			t.increase = o("ColorsApp-brightness-increase"),
			t.reset = o("ColorsApp-brightness-reset")
		}
		(r || (r = {})),
		t.brightness = r;
		var s;
		!function (t) {
			t.container = o("ColorsApp-highlights-container"),
			t.decrease = o("ColorsApp-highlights-decrease"),
			t.display = o("ColorsApp-highlights-display"),
			t.increase = o("ColorsApp-highlights-increase"),
			t.reset = o("ColorsApp-highlights-reset")
		}
		(s || (s = {})),
		t.highlights = s;
		var n;
		!function (t) {
			t.container = o("ColorsApp-saturation-container"),
			t.decrease = o("ColorsApp-saturation-decrease"),
			t.display = o("ColorsApp-saturation-display"),
			t.increase = o("ColorsApp-saturation-increase"),
			t.reset = o("ColorsApp-saturation-reset")
		}
		(n || (n = {})),
		t.saturation = n;
		var a;
		!function (t) {
			t.container = o("ColorsApp-shadows-container"),
			t.decrease = o("ColorsApp-shadows-decrease"),
			t.display = o("ColorsApp-shadows-display"),
			t.increase = o("ColorsApp-shadows-increase"),
			t.reset = o("ColorsApp-shadows-reset")
		}
		(a || (a = {})),
		t.shadows = a;
		var l;
		!function (t) {
			t.container = o("ColorsApp-temperature-container"),
			t.decrease = o("ColorsApp-temperature-decrease"),
			t.display = o("ColorsApp-temperature-display"),
			t.increase = o("ColorsApp-temperature-increase"),
			t.reset = o("ColorsApp-temperature-reset"),
			t.swatch = o("ColorsApp-temperature-swatch")
		}
		(l || (l = {})),
		t.temperature = l
	}
	(s = t.ColorsApp || (t.ColorsApp = {}));
	var n;
	!function (t) {
		t.FitToResultButton = e("CropApp-FitToResultButton"),
		t.Sidebar = e("CropApp-Sidebar"),
		t.allow_enlarging_result = o("CropApp-allow_enlarging_result"),
		t.close_button = o("CropApp-close_button"),
		t.fit_to_result_comment = o("CropApp-fit_to_result_comment"),
		t.fit_to_result_controls = o("CropApp-fit_to_result_controls"),
		t.locked_aspect_ratio_display = o("CropApp-locked_aspect_ratio_display"),
		t.output_size_display = o("CropApp-output_size_display"),
		t.reset_button = o("CropApp-reset_button"),
		t.target_size_display = o("CropApp-target_size_display");
		var i;
		!function (t) {
			t.H = e("CropApp-AspectRatio-H"),
			t.HFg = e("CropApp-AspectRatio-HFg"),
			t.Lightbox = e("CropApp-AspectRatio-Lightbox"),
			t.List = e("CropApp-AspectRatio-List"),
			t.OkButton = e("CropApp-AspectRatio-OkButton"),
			t.W = e("CropApp-AspectRatio-W"),
			t.WFg = e("CropApp-AspectRatio-WFg")
		}
		(i = t.AspectRatio || (t.AspectRatio = {}));
		var r;
		!function (t) {
			t.container = o("CropApp-Dpi-container"),
			t.decrease = o("CropApp-Dpi-decrease"),
			t.display = o("CropApp-Dpi-display"),
			t.increase = o("CropApp-Dpi-increase"),
			t.reset = o("CropApp-Dpi-reset")
		}
		(r || (r = {})),
		t.Dpi = r;
		var s;
		!function (t) {
			t.preset300 = o("CropApp-DpiPresets-preset300"),
			t.preset72 = o("CropApp-DpiPresets-preset72"),
			t.preset96 = o("CropApp-DpiPresets-preset96")
		}
		(s = t.DpiPresets || (t.DpiPresets = {}));
		var n;
		!function (t) {
			t.Percent = o("CropApp-MarginUnits-Percent"),
			t.Pixels = o("CropApp-MarginUnits-Pixels"),
			t.group = o("CropApp-MarginUnits-group")
		}
		(n = t.MarginUnits || (t.MarginUnits = {}));
		var a;
		!function (t) {
			t.LockedAspectRatio = o("CropApp-Mode-LockedAspectRatio"),
			t.TargetSize = o("CropApp-Mode-TargetSize"),
			t.Unconstrained = o("CropApp-Mode-Unconstrained"),
			t.group = o("CropApp-Mode-group")
		}
		(a = t.Mode || (t.Mode = {}));
		var l;
		!function (t) {
			t.Large = o("CropApp-ObjectSize-Large"),
			t.Medium = o("CropApp-ObjectSize-Medium"),
			t.Small = o("CropApp-ObjectSize-Small"),
			t.group = o("CropApp-ObjectSize-group")
		}
		(l = t.ObjectSize || (t.ObjectSize = {}));
		var p;
		!function (t) {
			t.container = o("CropApp-PaddingPercent-container"),
			t.decrease = o("CropApp-PaddingPercent-decrease"),
			t.display = o("CropApp-PaddingPercent-display"),
			t.increase = o("CropApp-PaddingPercent-increase"),
			t.reset = o("CropApp-PaddingPercent-reset")
		}
		(p || (p = {})),
		t.PaddingPercent = p;
		var c;
		!function (t) {
			t.container = o("CropApp-PaddingPixels-container"),
			t.decrease = o("CropApp-PaddingPixels-decrease"),
			t.display = o("CropApp-PaddingPixels-display"),
			t.increase = o("CropApp-PaddingPixels-increase"),
			t.reset = o("CropApp-PaddingPixels-reset")
		}
		(c || (c = {})),
		t.PaddingPixels = c;
		var u;
		!function (t) {
			t.container = o("CropApp-RotateSpinner-container"),
			t.decrease = o("CropApp-RotateSpinner-decrease"),
			t.display = o("CropApp-RotateSpinner-display"),
			t.increase = o("CropApp-RotateSpinner-increase"),
			t.reset = o("CropApp-RotateSpinner-reset")
		}
		(u || (u = {})),
		t.RotateSpinner = u;
		var d;
		!function (t) {
			t.Ignore = o("CropApp-Shadows-Ignore"),
			t.Pad = o("CropApp-Shadows-Pad"),
			t.Tight = o("CropApp-Shadows-Tight"),
			t.group = o("CropApp-Shadows-group")
		}
		(d = t.Shadows || (t.Shadows = {}));
		var h;
		!function (t) {
			t.container = o("CropApp-StraightenSpinner-container"),
			t.decrease = o("CropApp-StraightenSpinner-decrease"),
			t.display = o("CropApp-StraightenSpinner-display"),
			t.increase = o("CropApp-StraightenSpinner-increase"),
			t.reset = o("CropApp-StraightenSpinner-reset")
		}
		(h || (h = {})),
		t.StraightenSpinner = h;
		var g;
		!function (t) {
			t.H = e("CropApp-TargetSize-H"),
			t.HFg = e("CropApp-TargetSize-HFg"),
			t.Lightbox = e("CropApp-TargetSize-Lightbox"),
			t.List = e("CropApp-TargetSize-List"),
			t.OkButton = e("CropApp-TargetSize-OkButton"),
			t.W = e("CropApp-TargetSize-W"),
			t.WFg = e("CropApp-TargetSize-WFg")
		}
		(g = t.TargetSize || (t.TargetSize = {}));
		var f;
		!function (t) {
			t.Bottom = o("CropApp-VerticalAlignment-Bottom"),
			t.Middle = o("CropApp-VerticalAlignment-Middle"),
			t.Top = o("CropApp-VerticalAlignment-Top"),
			t.group = o("CropApp-VerticalAlignment-group")
		}
		(f = t.VerticalAlignment || (t.VerticalAlignment = {}))
	}
	(n = t.CropApp || (t.CropApp = {}));
	var a;
	!function (t) {
		var e;
		!function (t) {
			t.group = o("ExportOptions-JpegOptimization-group"),
			t.moz = o("ExportOptions-JpegOptimization-moz"),
			t.none = o("ExportOptions-JpegOptimization-none")
		}
		(e = t.JpegOptimization || (t.JpegOptimization = {}));
		var i;
		!function (t) {
			t.container = o("ExportOptions-JpgQuality-container"),
			t.decrease = o("ExportOptions-JpgQuality-decrease"),
			t.display = o("ExportOptions-JpgQuality-display"),
			t.increase = o("ExportOptions-JpgQuality-increase"),
			t.reset = o("ExportOptions-JpgQuality-reset")
		}
		(i || (i = {})),
		t.JpgQuality = i;
		var r;
		!function (t) {
			t.preset100 = o("ExportOptions-JpgQualityPresets-preset100"),
			t.preset25 = o("ExportOptions-JpgQualityPresets-preset25"),
			t.preset50 = o("ExportOptions-JpgQualityPresets-preset50"),
			t.preset75 = o("ExportOptions-JpgQualityPresets-preset75"),
			t.preset92 = o("ExportOptions-JpgQualityPresets-preset92")
		}
		(r = t.JpgQualityPresets || (t.JpgQualityPresets = {}));
		var s;
		!function (t) {
			t.group = o("ExportOptions-OpaqueFormat-group"),
			t.jpg = o("ExportOptions-OpaqueFormat-jpg"),
			t.png = o("ExportOptions-OpaqueFormat-png")
		}
		(s = t.OpaqueFormat || (t.OpaqueFormat = {}));
		var n;
		!function (t) {
			t.group = o("ExportOptions-PngOptimization-group"),
			t.lossless = o("ExportOptions-PngOptimization-lossless"),
			t.lossy = o("ExportOptions-PngOptimization-lossy"),
			t.none = o("ExportOptions-PngOptimization-none")
		}
		(n = t.PngOptimization || (t.PngOptimization = {}))
	}
	(a = t.ExportOptions || (t.ExportOptions = {}));
	var l;
	!function (t) {
		t.Field = e("FileInput-Field"),
		t.PasteTarget = e("FileInput-PasteTarget");
		var i;
		!function (t) {
			t.Dialog = e("FileInput-UploadFromWeb-Dialog"),
			t.DialogButton = e("FileInput-UploadFromWeb-DialogButton"),
			t.DialogInput = e("FileInput-UploadFromWeb-DialogInput"),
			t.MainButton = e("FileInput-UploadFromWeb-MainButton"),
			t.MainInput = e("FileInput-UploadFromWeb-MainInput"),
			t.show_dialog = o("FileInput-UploadFromWeb-show_dialog")
		}
		(i = t.UploadFromWeb || (t.UploadFromWeb = {}))
	}
	(l = t.FileInput || (t.FileInput = {}));
	var p;
	!function (t) {
		t.container = o("MaxNumMegapixels-container"),
		t.decrease = o("MaxNumMegapixels-decrease"),
		t.display = o("MaxNumMegapixels-display"),
		t.increase = o("MaxNumMegapixels-increase"),
		t.reset = o("MaxNumMegapixels-reset")
	}
	(p || (p = {})),
	t.MaxNumMegapixels = p;
	var c;
	!function (t) {
		t.App = e("PreCrop-App"),
		t.ViewContainer = e("PreCrop-ViewContainer");
		var i;
		!function (t) {
			t.cancel_button = o("PreCrop-Sidebar-cancel_button"),
			t.crop_button = o("PreCrop-Sidebar-crop_button"),
			t.cropped_image_aspect_ratio_display = o("PreCrop-Sidebar-cropped_image_aspect_ratio_display"),
			t.cropped_image_megapixels_display = o("PreCrop-Sidebar-cropped_image_megapixels_display"),
			t.cropped_image_size_display = o("PreCrop-Sidebar-cropped_image_size_display"),
			t.cropped_image_success = o("PreCrop-Sidebar-cropped_image_success"),
			t.cropped_image_warning = o("PreCrop-Sidebar-cropped_image_warning"),
			t.input_image_aspect_ratio_display = o("PreCrop-Sidebar-input_image_aspect_ratio_display"),
			t.input_image_megapixels_display = o("PreCrop-Sidebar-input_image_megapixels_display"),
			t.input_image_size_display = o("PreCrop-Sidebar-input_image_size_display"),
			t.lock_aspect_ratio_button = o("PreCrop-Sidebar-lock_aspect_ratio_button");
			var e;
			!function (t) {
				t.container = o("PreCrop-Sidebar-MaxNumMegapixels-container"),
				t.decrease = o("PreCrop-Sidebar-MaxNumMegapixels-decrease"),
				t.display = o("PreCrop-Sidebar-MaxNumMegapixels-display"),
				t.increase = o("PreCrop-Sidebar-MaxNumMegapixels-increase"),
				t.reset = o("PreCrop-Sidebar-MaxNumMegapixels-reset")
			}
			(e || (e = {})),
			t.MaxNumMegapixels = e
		}
		(i = t.Sidebar || (t.Sidebar = {}))
	}
	(c = t.PreCrop || (t.PreCrop = {}));
	var u;
	!function (t) {
		t.DefaultSettingsTab = e("PreferencesDialog-DefaultSettingsTab"),
		t.ExportOptionsTab = e("PreferencesDialog-ExportOptionsTab"),
		t.ImportOptionsTab = e("PreferencesDialog-ImportOptionsTab"),
		t.open = o("PreferencesDialog-open"),
		t.openExportOptions = o("PreferencesDialog-openExportOptions"),
		t.openImportOptions = o("PreferencesDialog-openImportOptions")
	}
	(u = t.PreferencesDialog || (t.PreferencesDialog = {}));
	var d;
	!function (t) {
		t.Body = e("RetryDialog-Body"),
		t.Countdown = e("RetryDialog-Countdown"),
		t.Dialog = e("RetryDialog-Dialog"),
		t.RetryNowButton = e("RetryDialog-RetryNowButton")
	}
	(d = t.RetryDialog || (t.RetryDialog = {}));
	var h;
	!function (t) {
		t.backward = o("ReviewSpinner-backward"),
		t.forward = o("ReviewSpinner-forward")
	}
	(h = t.ReviewSpinner || (t.ReviewSpinner = {}));
	var g;
	!function (t) {
		var e;
		!function (t) {
			t.displayCurrent = o("Settings-BackgroundColor-displayCurrent"),
			t.displayDefault = o("Settings-BackgroundColor-displayDefault"),
			t.displayFactory = o("Settings-BackgroundColor-displayFactory"),
			t.setCurrentAndStickyToFactory = o("Settings-BackgroundColor-setCurrentAndStickyToFactory"),
			t.setCurrentToDefault = o("Settings-BackgroundColor-setCurrentToDefault"),
			t.setStickyToCurrent = o("Settings-BackgroundColor-setStickyToCurrent")
		}
		(e || (e = {})),
		t.BackgroundColor = e;
		var i;
		!function (t) {
			t.displayCurrent = o("Settings-BrushSize-displayCurrent"),
			t.displayDefault = o("Settings-BrushSize-displayDefault"),
			t.displayFactory = o("Settings-BrushSize-displayFactory"),
			t.setCurrentAndStickyToFactory = o("Settings-BrushSize-setCurrentAndStickyToFactory"),
			t.setCurrentToDefault = o("Settings-BrushSize-setCurrentToDefault"),
			t.setStickyToCurrent = o("Settings-BrushSize-setStickyToCurrent")
		}
		(i || (i = {})),
		t.BrushSize = i;
		var r;
		!function (t) {
			var e;
			!function (t) {
				t.displayCurrent = o("Settings-Colors-AutoLevels-displayCurrent"),
				t.displayDefault = o("Settings-Colors-AutoLevels-displayDefault"),
				t.displayFactory = o("Settings-Colors-AutoLevels-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Colors-AutoLevels-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Colors-AutoLevels-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Colors-AutoLevels-setStickyToCurrent")
			}
			(e || (e = {})),
			t.AutoLevels = e;
			var i;
			!function (t) {
				t.displayCurrent = o("Settings-Colors-ColorSpace-displayCurrent"),
				t.displayDefault = o("Settings-Colors-ColorSpace-displayDefault"),
				t.displayFactory = o("Settings-Colors-ColorSpace-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Colors-ColorSpace-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Colors-ColorSpace-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Colors-ColorSpace-setStickyToCurrent")
			}
			(i || (i = {})),
			t.ColorSpace = i
		}
		(r = t.Colors || (t.Colors = {}));
		var s;
		!function (t) {
			var e;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-AllowEnlarging-displayCurrent"),
				t.displayDefault = o("Settings-Crop-AllowEnlarging-displayDefault"),
				t.displayFactory = o("Settings-Crop-AllowEnlarging-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-AllowEnlarging-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-AllowEnlarging-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-AllowEnlarging-setStickyToCurrent")
			}
			(e || (e = {})),
			t.AllowEnlarging = e;
			var i;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-AspectRatio-displayCurrent"),
				t.displayDefault = o("Settings-Crop-AspectRatio-displayDefault"),
				t.displayFactory = o("Settings-Crop-AspectRatio-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-AspectRatio-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-AspectRatio-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-AspectRatio-setStickyToCurrent")
			}
			(i || (i = {})),
			t.AspectRatio = i;
			var r;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-Dpi-displayCurrent"),
				t.displayDefault = o("Settings-Crop-Dpi-displayDefault"),
				t.displayFactory = o("Settings-Crop-Dpi-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-Dpi-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-Dpi-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-Dpi-setStickyToCurrent")
			}
			(r || (r = {})),
			t.Dpi = r;
			var s;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-FitToResult-displayCurrent"),
				t.displayDefault = o("Settings-Crop-FitToResult-displayDefault"),
				t.displayFactory = o("Settings-Crop-FitToResult-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-FitToResult-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-FitToResult-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-FitToResult-setStickyToCurrent")
			}
			(s || (s = {})),
			t.FitToResult = s;
			var n;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-MarginUnits-displayCurrent"),
				t.displayDefault = o("Settings-Crop-MarginUnits-displayDefault"),
				t.displayFactory = o("Settings-Crop-MarginUnits-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-MarginUnits-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-MarginUnits-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-MarginUnits-setStickyToCurrent")
			}
			(n || (n = {})),
			t.MarginUnits = n;
			var a;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-Mode-displayCurrent"),
				t.displayDefault = o("Settings-Crop-Mode-displayDefault"),
				t.displayFactory = o("Settings-Crop-Mode-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-Mode-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-Mode-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-Mode-setStickyToCurrent")
			}
			(a || (a = {})),
			t.Mode = a;
			var l;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-ObjectSize-displayCurrent"),
				t.displayDefault = o("Settings-Crop-ObjectSize-displayDefault"),
				t.displayFactory = o("Settings-Crop-ObjectSize-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-ObjectSize-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-ObjectSize-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-ObjectSize-setStickyToCurrent")
			}
			(l || (l = {})),
			t.ObjectSize = l;
			var p;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-PaddingMils-displayCurrent"),
				t.displayDefault = o("Settings-Crop-PaddingMils-displayDefault"),
				t.displayFactory = o("Settings-Crop-PaddingMils-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-PaddingMils-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-PaddingMils-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-PaddingMils-setStickyToCurrent")
			}
			(p || (p = {})),
			t.PaddingMils = p;
			var c;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-PaddingPixels-displayCurrent"),
				t.displayDefault = o("Settings-Crop-PaddingPixels-displayDefault"),
				t.displayFactory = o("Settings-Crop-PaddingPixels-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-PaddingPixels-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-PaddingPixels-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-PaddingPixels-setStickyToCurrent")
			}
			(c || (c = {})),
			t.PaddingPixels = c;
			var u;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-Shadows-displayCurrent"),
				t.displayDefault = o("Settings-Crop-Shadows-displayDefault"),
				t.displayFactory = o("Settings-Crop-Shadows-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-Shadows-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-Shadows-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-Shadows-setStickyToCurrent")
			}
			(u || (u = {})),
			t.Shadows = u;
			var d;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-TargetSize-displayCurrent"),
				t.displayDefault = o("Settings-Crop-TargetSize-displayDefault"),
				t.displayFactory = o("Settings-Crop-TargetSize-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-TargetSize-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-TargetSize-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-TargetSize-setStickyToCurrent")
			}
			(d || (d = {})),
			t.TargetSize = d;
			var h;
			!function (t) {
				t.displayCurrent = o("Settings-Crop-VerticalAlignment-displayCurrent"),
				t.displayDefault = o("Settings-Crop-VerticalAlignment-displayDefault"),
				t.displayFactory = o("Settings-Crop-VerticalAlignment-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Crop-VerticalAlignment-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Crop-VerticalAlignment-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Crop-VerticalAlignment-setStickyToCurrent")
			}
			(h || (h = {})),
			t.VerticalAlignment = h
		}
		(s = t.Crop || (t.Crop = {}));
		var n;
		!function (t) {
			var e;
			!function (t) {
				t.displayCurrent = o("Settings-Edge-BlurLevel-displayCurrent"),
				t.displayDefault = o("Settings-Edge-BlurLevel-displayDefault"),
				t.displayFactory = o("Settings-Edge-BlurLevel-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Edge-BlurLevel-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Edge-BlurLevel-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Edge-BlurLevel-setStickyToCurrent")
			}
			(e || (e = {})),
			t.BlurLevel = e;
			var i;
			!function (t) {
				t.displayCurrent = o("Settings-Edge-Offset-displayCurrent"),
				t.displayDefault = o("Settings-Edge-Offset-displayDefault"),
				t.displayFactory = o("Settings-Edge-Offset-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Edge-Offset-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Edge-Offset-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Edge-Offset-setStickyToCurrent")
			}
			(i || (i = {})),
			t.Offset = i;
			var r;
			!function (t) {
				t.displayCurrent = o("Settings-Edge-SmoothingLevel-displayCurrent"),
				t.displayDefault = o("Settings-Edge-SmoothingLevel-displayDefault"),
				t.displayFactory = o("Settings-Edge-SmoothingLevel-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Edge-SmoothingLevel-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Edge-SmoothingLevel-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Edge-SmoothingLevel-setStickyToCurrent")
			}
			(r || (r = {})),
			t.SmoothingLevel = r;
			var s;
			!function (t) {
				t.displayCurrent = o("Settings-Edge-UseCornerDetection-displayCurrent"),
				t.displayDefault = o("Settings-Edge-UseCornerDetection-displayDefault"),
				t.displayFactory = o("Settings-Edge-UseCornerDetection-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Edge-UseCornerDetection-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Edge-UseCornerDetection-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Edge-UseCornerDetection-setStickyToCurrent")
			}
			(s || (s = {})),
			t.UseCornerDetection = s;
			var n;
			!function (t) {
				t.displayCurrent = o("Settings-Edge-UseLocalBlur-displayCurrent"),
				t.displayDefault = o("Settings-Edge-UseLocalBlur-displayDefault"),
				t.displayFactory = o("Settings-Edge-UseLocalBlur-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Edge-UseLocalBlur-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Edge-UseLocalBlur-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Edge-UseLocalBlur-setStickyToCurrent")
			}
			(n || (n = {})),
			t.UseLocalBlur = n;
			var a;
			!function (t) {
				t.displayCurrent = o("Settings-Edge-UseLocalSmoothing-displayCurrent"),
				t.displayDefault = o("Settings-Edge-UseLocalSmoothing-displayDefault"),
				t.displayFactory = o("Settings-Edge-UseLocalSmoothing-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-Edge-UseLocalSmoothing-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-Edge-UseLocalSmoothing-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-Edge-UseLocalSmoothing-setStickyToCurrent")
			}
			(a || (a = {})),
			t.UseLocalSmoothing = a
		}
		(n = t.Edge || (t.Edge = {}));
		var a;
		!function (t) {
			var e;
			!function (t) {
				t.displayCurrent = o("Settings-ExportOptions-JpegMode-displayCurrent"),
				t.displayDefault = o("Settings-ExportOptions-JpegMode-displayDefault"),
				t.displayFactory = o("Settings-ExportOptions-JpegMode-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-ExportOptions-JpegMode-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-ExportOptions-JpegMode-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-ExportOptions-JpegMode-setStickyToCurrent")
			}
			(e || (e = {})),
			t.JpegMode = e;
			var i;
			!function (t) {
				t.displayCurrent = o("Settings-ExportOptions-JpegQuality-displayCurrent"),
				t.displayDefault = o("Settings-ExportOptions-JpegQuality-displayDefault"),
				t.displayFactory = o("Settings-ExportOptions-JpegQuality-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-ExportOptions-JpegQuality-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-ExportOptions-JpegQuality-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-ExportOptions-JpegQuality-setStickyToCurrent")
			}
			(i || (i = {})),
			t.JpegQuality = i;
			var r;
			!function (t) {
				t.displayCurrent = o("Settings-ExportOptions-OpaqueFileFormat-displayCurrent"),
				t.displayDefault = o("Settings-ExportOptions-OpaqueFileFormat-displayDefault"),
				t.displayFactory = o("Settings-ExportOptions-OpaqueFileFormat-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-ExportOptions-OpaqueFileFormat-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-ExportOptions-OpaqueFileFormat-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-ExportOptions-OpaqueFileFormat-setStickyToCurrent")
			}
			(r || (r = {})),
			t.OpaqueFileFormat = r;
			var s;
			!function (t) {
				t.displayCurrent = o("Settings-ExportOptions-PngMode-displayCurrent"),
				t.displayDefault = o("Settings-ExportOptions-PngMode-displayDefault"),
				t.displayFactory = o("Settings-ExportOptions-PngMode-displayFactory"),
				t.setCurrentAndStickyToFactory = o("Settings-ExportOptions-PngMode-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("Settings-ExportOptions-PngMode-setCurrentToDefault"),
				t.setStickyToCurrent = o("Settings-ExportOptions-PngMode-setStickyToCurrent")
			}
			(s || (s = {})),
			t.PngMode = s
		}
		(a = t.ExportOptions || (t.ExportOptions = {}));
		var l;
		!function (t) {
			t.displayCurrent = o("Settings-MaxNumMegapixels-displayCurrent"),
			t.displayDefault = o("Settings-MaxNumMegapixels-displayDefault"),
			t.displayFactory = o("Settings-MaxNumMegapixels-displayFactory"),
			t.setCurrentAndStickyToFactory = o("Settings-MaxNumMegapixels-setCurrentAndStickyToFactory"),
			t.setCurrentToDefault = o("Settings-MaxNumMegapixels-setCurrentToDefault"),
			t.setStickyToCurrent = o("Settings-MaxNumMegapixels-setStickyToCurrent")
		}
		(l || (l = {})),
		t.MaxNumMegapixels = l;
		var p;
		!function (t) {
			var e;
			!function (t) {
				var e;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Drop-BlurRadius-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Drop-BlurRadius-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Drop-BlurRadius-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Drop-BlurRadius-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Drop-BlurRadius-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Drop-BlurRadius-setStickyToCurrent")
				}
				(e || (e = {})),
				t.BlurRadius = e;
				var i;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Drop-CropEnabled-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Drop-CropEnabled-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Drop-CropEnabled-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Drop-CropEnabled-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Drop-CropEnabled-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Drop-CropEnabled-setStickyToCurrent")
				}
				(i || (i = {})),
				t.CropEnabled = i;
				var r;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Drop-Enabled-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Drop-Enabled-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Drop-Enabled-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Drop-Enabled-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Drop-Enabled-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Drop-Enabled-setStickyToCurrent")
				}
				(r || (r = {})),
				t.Enabled = r;
				var s;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Drop-OffsetX-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Drop-OffsetX-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Drop-OffsetX-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Drop-OffsetX-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Drop-OffsetX-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Drop-OffsetX-setStickyToCurrent")
				}
				(s || (s = {})),
				t.OffsetX = s;
				var n;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Drop-OffsetY-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Drop-OffsetY-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Drop-OffsetY-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Drop-OffsetY-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Drop-OffsetY-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Drop-OffsetY-setStickyToCurrent")
				}
				(n || (n = {})),
				t.OffsetY = n;
				var a;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Drop-Opacity-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Drop-Opacity-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Drop-Opacity-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Drop-Opacity-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Drop-Opacity-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Drop-Opacity-setStickyToCurrent")
				}
				(a || (a = {})),
				t.Opacity = a
			}
			(e = t.Drop || (t.Drop = {}));
			var i;
			!function (t) {
				var e;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Ellipse-Core-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Ellipse-Core-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Ellipse-Core-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Ellipse-Core-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Ellipse-Core-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Ellipse-Core-setStickyToCurrent")
				}
				(e || (e = {})),
				t.Core = e;
				var i;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Ellipse-Strength-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Ellipse-Strength-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Ellipse-Strength-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Ellipse-Strength-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Ellipse-Strength-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Ellipse-Strength-setStickyToCurrent")
				}
				(i || (i = {})),
				t.Strength = i
			}
			(i = t.Ellipse || (t.Ellipse = {}));
			var r;
			!function (t) {
				var e;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Mirror-Enabled-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Mirror-Enabled-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Mirror-Enabled-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Mirror-Enabled-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Mirror-Enabled-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Mirror-Enabled-setStickyToCurrent")
				}
				(e || (e = {})),
				t.Enabled = e;
				var i;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Mirror-Height-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Mirror-Height-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Mirror-Height-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Mirror-Height-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Mirror-Height-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Mirror-Height-setStickyToCurrent")
				}
				(i || (i = {})),
				t.Height = i;
				var r;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Mirror-Opacity-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Mirror-Opacity-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Mirror-Opacity-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Mirror-Opacity-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Mirror-Opacity-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Mirror-Opacity-setStickyToCurrent")
				}
				(r || (r = {})),
				t.Opacity = r
			}
			(r = t.Mirror || (t.Mirror = {}));
			var s;
			!function (t) {
				var e;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Perspective-BlurRadius-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Perspective-BlurRadius-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Perspective-BlurRadius-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Perspective-BlurRadius-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Perspective-BlurRadius-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Perspective-BlurRadius-setStickyToCurrent")
				}
				(e || (e = {})),
				t.BlurRadius = e;
				var i;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Perspective-BlurRadiusScale-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Perspective-BlurRadiusScale-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Perspective-BlurRadiusScale-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Perspective-BlurRadiusScale-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Perspective-BlurRadiusScale-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Perspective-BlurRadiusScale-setStickyToCurrent")
				}
				(i || (i = {})),
				t.BlurRadiusScale = i;
				var r;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Perspective-Enabled-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Perspective-Enabled-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Perspective-Enabled-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Perspective-Enabled-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Perspective-Enabled-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Perspective-Enabled-setStickyToCurrent")
				}
				(r || (r = {})),
				t.Enabled = r;
				var s;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Perspective-Opacity-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Perspective-Opacity-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Perspective-Opacity-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Perspective-Opacity-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Perspective-Opacity-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Perspective-Opacity-setStickyToCurrent")
				}
				(s || (s = {})),
				t.Opacity = s;
				var n;
				!function (t) {
					t.displayCurrent = o("Settings-Shadows-Perspective-OpacityScale-displayCurrent"),
					t.displayDefault = o("Settings-Shadows-Perspective-OpacityScale-displayDefault"),
					t.displayFactory = o("Settings-Shadows-Perspective-OpacityScale-displayFactory"),
					t.setCurrentAndStickyToFactory = o("Settings-Shadows-Perspective-OpacityScale-setCurrentAndStickyToFactory"),
					t.setCurrentToDefault = o("Settings-Shadows-Perspective-OpacityScale-setCurrentToDefault"),
					t.setStickyToCurrent = o("Settings-Shadows-Perspective-OpacityScale-setStickyToCurrent")
				}
				(n || (n = {})),
				t.OpacityScale = n
			}
			(s = t.Perspective || (t.Perspective = {}))
		}
		(p = t.Shadows || (t.Shadows = {}))
	}
	(g = t.Settings || (t.Settings = {}));
	var f;
	!function (t) {
		var e;
		!function (t) {
			t.button = o("SettingsGroups-All-button"),
			t.menu = o("SettingsGroups-All-menu"),
			t.outline = o("SettingsGroups-All-outline"),
			t.setCurrentAndStickyToFactory = o("SettingsGroups-All-setCurrentAndStickyToFactory"),
			t.setCurrentToDefault = o("SettingsGroups-All-setCurrentToDefault"),
			t.setStickyToCurrent = o("SettingsGroups-All-setStickyToCurrent")
		}
		(e || (e = {})),
		t.All = e;
		var i;
		!function (t) {
			t.button = o("SettingsGroups-BackgroundColor-button"),
			t.menu = o("SettingsGroups-BackgroundColor-menu"),
			t.outline = o("SettingsGroups-BackgroundColor-outline"),
			t.setCurrentAndStickyToFactory = o("SettingsGroups-BackgroundColor-setCurrentAndStickyToFactory"),
			t.setCurrentToDefault = o("SettingsGroups-BackgroundColor-setCurrentToDefault"),
			t.setStickyToCurrent = o("SettingsGroups-BackgroundColor-setStickyToCurrent")
		}
		(i || (i = {})),
		t.BackgroundColor = i;
		var r;
		!function (t) {
			t.button = o("SettingsGroups-BrushSize-button"),
			t.menu = o("SettingsGroups-BrushSize-menu"),
			t.outline = o("SettingsGroups-BrushSize-outline"),
			t.setCurrentAndStickyToFactory = o("SettingsGroups-BrushSize-setCurrentAndStickyToFactory"),
			t.setCurrentToDefault = o("SettingsGroups-BrushSize-setCurrentToDefault"),
			t.setStickyToCurrent = o("SettingsGroups-BrushSize-setStickyToCurrent")
		}
		(r || (r = {})),
		t.BrushSize = r;
		var s;
		!function (t) {
			var e;
			!function (t) {
				t.button = o("SettingsGroups-Colors-AutoLevels-button"),
				t.menu = o("SettingsGroups-Colors-AutoLevels-menu"),
				t.outline = o("SettingsGroups-Colors-AutoLevels-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-Colors-AutoLevels-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-Colors-AutoLevels-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-Colors-AutoLevels-setStickyToCurrent")
			}
			(e || (e = {})),
			t.AutoLevels = e;
			var i;
			!function (t) {
				t.button = o("SettingsGroups-Colors-ColorSpace-button"),
				t.menu = o("SettingsGroups-Colors-ColorSpace-menu"),
				t.outline = o("SettingsGroups-Colors-ColorSpace-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-Colors-ColorSpace-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-Colors-ColorSpace-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-Colors-ColorSpace-setStickyToCurrent")
			}
			(i || (i = {})),
			t.ColorSpace = i
		}
		(s = t.Colors || (t.Colors = {}));
		var n;
		!function (t) {
			var e;
			!function (t) {
				t.button = o("SettingsGroups-Crop-Dpi-button"),
				t.menu = o("SettingsGroups-Crop-Dpi-menu"),
				t.outline = o("SettingsGroups-Crop-Dpi-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-Crop-Dpi-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-Crop-Dpi-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-Crop-Dpi-setStickyToCurrent")
			}
			(e || (e = {})),
			t.Dpi = e;
			var i;
			!function (t) {
				t.button = o("SettingsGroups-Crop-FitToResult-button"),
				t.menu = o("SettingsGroups-Crop-FitToResult-menu"),
				t.outline = o("SettingsGroups-Crop-FitToResult-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-Crop-FitToResult-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-Crop-FitToResult-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-Crop-FitToResult-setStickyToCurrent")
			}
			(i || (i = {})),
			t.FitToResult = i;
			var r;
			!function (t) {
				t.button = o("SettingsGroups-Crop-Mode-button"),
				t.menu = o("SettingsGroups-Crop-Mode-menu"),
				t.outline = o("SettingsGroups-Crop-Mode-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-Crop-Mode-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-Crop-Mode-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-Crop-Mode-setStickyToCurrent")
			}
			(r || (r = {})),
			t.Mode = r
		}
		(n = t.Crop || (t.Crop = {}));
		var a;
		!function (t) {
			t.button = o("SettingsGroups-Edges-button"),
			t.menu = o("SettingsGroups-Edges-menu"),
			t.outline = o("SettingsGroups-Edges-outline"),
			t.setCurrentAndStickyToFactory = o("SettingsGroups-Edges-setCurrentAndStickyToFactory"),
			t.setCurrentToDefault = o("SettingsGroups-Edges-setCurrentToDefault"),
			t.setStickyToCurrent = o("SettingsGroups-Edges-setStickyToCurrent")
		}
		(a || (a = {})),
		t.Edges = a;
		var l;
		!function (t) {
			var e;
			!function (t) {
				t.button = o("SettingsGroups-ExportOptions-JpegMode-button"),
				t.menu = o("SettingsGroups-ExportOptions-JpegMode-menu"),
				t.outline = o("SettingsGroups-ExportOptions-JpegMode-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-ExportOptions-JpegMode-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-ExportOptions-JpegMode-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-ExportOptions-JpegMode-setStickyToCurrent")
			}
			(e || (e = {})),
			t.JpegMode = e;
			var i;
			!function (t) {
				t.button = o("SettingsGroups-ExportOptions-JpegQuality-button"),
				t.menu = o("SettingsGroups-ExportOptions-JpegQuality-menu"),
				t.outline = o("SettingsGroups-ExportOptions-JpegQuality-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-ExportOptions-JpegQuality-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-ExportOptions-JpegQuality-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-ExportOptions-JpegQuality-setStickyToCurrent")
			}
			(i || (i = {})),
			t.JpegQuality = i;
			var r;
			!function (t) {
				t.button = o("SettingsGroups-ExportOptions-OpaqueFileFormat-button"),
				t.menu = o("SettingsGroups-ExportOptions-OpaqueFileFormat-menu"),
				t.outline = o("SettingsGroups-ExportOptions-OpaqueFileFormat-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-ExportOptions-OpaqueFileFormat-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-ExportOptions-OpaqueFileFormat-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-ExportOptions-OpaqueFileFormat-setStickyToCurrent")
			}
			(r || (r = {})),
			t.OpaqueFileFormat = r;
			var s;
			!function (t) {
				t.button = o("SettingsGroups-ExportOptions-PngMode-button"),
				t.menu = o("SettingsGroups-ExportOptions-PngMode-menu"),
				t.outline = o("SettingsGroups-ExportOptions-PngMode-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-ExportOptions-PngMode-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-ExportOptions-PngMode-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-ExportOptions-PngMode-setStickyToCurrent")
			}
			(s || (s = {})),
			t.PngMode = s
		}
		(l = t.ExportOptions || (t.ExportOptions = {}));
		var p;
		!function (t) {
			t.button = o("SettingsGroups-MaxNumMegapixels-button"),
			t.menu = o("SettingsGroups-MaxNumMegapixels-menu"),
			t.outline = o("SettingsGroups-MaxNumMegapixels-outline"),
			t.setCurrentAndStickyToFactory = o("SettingsGroups-MaxNumMegapixels-setCurrentAndStickyToFactory"),
			t.setCurrentToDefault = o("SettingsGroups-MaxNumMegapixels-setCurrentToDefault"),
			t.setStickyToCurrent = o("SettingsGroups-MaxNumMegapixels-setStickyToCurrent")
		}
		(p || (p = {})),
		t.MaxNumMegapixels = p;
		var c;
		!function (t) {
			var e;
			!function (t) {
				t.button = o("SettingsGroups-Shadows-Drop-button"),
				t.menu = o("SettingsGroups-Shadows-Drop-menu"),
				t.outline = o("SettingsGroups-Shadows-Drop-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-Shadows-Drop-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-Shadows-Drop-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-Shadows-Drop-setStickyToCurrent")
			}
			(e || (e = {})),
			t.Drop = e;
			var i;
			!function (t) {
				t.button = o("SettingsGroups-Shadows-Ellipse-button"),
				t.menu = o("SettingsGroups-Shadows-Ellipse-menu"),
				t.outline = o("SettingsGroups-Shadows-Ellipse-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-Shadows-Ellipse-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-Shadows-Ellipse-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-Shadows-Ellipse-setStickyToCurrent")
			}
			(i || (i = {})),
			t.Ellipse = i;
			var r;
			!function (t) {
				t.button = o("SettingsGroups-Shadows-Mirror-button"),
				t.menu = o("SettingsGroups-Shadows-Mirror-menu"),
				t.outline = o("SettingsGroups-Shadows-Mirror-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-Shadows-Mirror-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-Shadows-Mirror-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-Shadows-Mirror-setStickyToCurrent")
			}
			(r || (r = {})),
			t.Mirror = r;
			var s;
			!function (t) {
				t.button = o("SettingsGroups-Shadows-Perspective-button"),
				t.menu = o("SettingsGroups-Shadows-Perspective-menu"),
				t.outline = o("SettingsGroups-Shadows-Perspective-outline"),
				t.setCurrentAndStickyToFactory = o("SettingsGroups-Shadows-Perspective-setCurrentAndStickyToFactory"),
				t.setCurrentToDefault = o("SettingsGroups-Shadows-Perspective-setCurrentToDefault"),
				t.setStickyToCurrent = o("SettingsGroups-Shadows-Perspective-setStickyToCurrent")
			}
			(s || (s = {})),
			t.Perspective = s
		}
		(c = t.Shadows || (t.Shadows = {}))
	}
	(f = t.SettingsGroups || (t.SettingsGroups = {}));
	var w;
	!function (t) {
		var i;
		!function (t) {
			var e;
			!function (t) {
				t.down = o("ShadowApp-DropShadow-ArrowControl-down"),
				t.left = o("ShadowApp-DropShadow-ArrowControl-left"),
				t.right = o("ShadowApp-DropShadow-ArrowControl-right"),
				t.up = o("ShadowApp-DropShadow-ArrowControl-up"),
				t.zero = o("ShadowApp-DropShadow-ArrowControl-zero")
			}
			(e = t.ArrowControl || (t.ArrowControl = {}))
		}
		(i = t.DropShadow || (t.DropShadow = {}));
		var r;
		!function (t) {
			t.Container = e("ShadowApp-EllipseShadow-Container");
			var i;
			!function (t) {
				t.container = o("ShadowApp-EllipseShadow-Core-container"),
				t.decrease = o("ShadowApp-EllipseShadow-Core-decrease"),
				t.display = o("ShadowApp-EllipseShadow-Core-display"),
				t.increase = o("ShadowApp-EllipseShadow-Core-increase"),
				t.reset = o("ShadowApp-EllipseShadow-Core-reset")
			}
			(i || (i = {})),
			t.Core = i;
			var r;
			!function (t) {
				t.container = o("ShadowApp-EllipseShadow-Strength-container"),
				t.decrease = o("ShadowApp-EllipseShadow-Strength-decrease"),
				t.display = o("ShadowApp-EllipseShadow-Strength-display"),
				t.increase = o("ShadowApp-EllipseShadow-Strength-increase"),
				t.reset = o("ShadowApp-EllipseShadow-Strength-reset")
			}
			(r || (r = {})),
			t.Strength = r
		}
		(r = t.EllipseShadow || (t.EllipseShadow = {}));
	}
	(w = t.ShadowApp || (t.ShadowApp = {}));
	var S;
	!function (t) {
		t.container = o("ShadowAppDropShadowBlurRadius-container"),
		t.decrease = o("ShadowAppDropShadowBlurRadius-decrease"),
		t.display = o("ShadowAppDropShadowBlurRadius-display"),
		t.increase = o("ShadowAppDropShadowBlurRadius-increase"),
		t.reset = o("ShadowAppDropShadowBlurRadius-reset")
	}
	(S || (S = {})),
	t.ShadowAppDropShadowBlurRadius = S;
	var m;
	!function (t) {
		t.container = o("ShadowAppDropShadowOpacity-container"),
		t.decrease = o("ShadowAppDropShadowOpacity-decrease"),
		t.display = o("ShadowAppDropShadowOpacity-display"),
		t.increase = o("ShadowAppDropShadowOpacity-increase"),
		t.reset = o("ShadowAppDropShadowOpacity-reset")
	}
	(m || (m = {})),
	t.ShadowAppDropShadowOpacity = m;
	var C;
	!function (t) {
		t.container = o("ShadowAppMirrorShadowHeight-container"),
		t.decrease = o("ShadowAppMirrorShadowHeight-decrease"),
		t.display = o("ShadowAppMirrorShadowHeight-display"),
		t.increase = o("ShadowAppMirrorShadowHeight-increase"),
		t.reset = o("ShadowAppMirrorShadowHeight-reset")
	}
	(C || (C = {})),
	t.ShadowAppMirrorShadowHeight = C;
	var y;
	!function (t) {
		t.container = o("ShadowAppMirrorShadowOpacity-container"),
		t.decrease = o("ShadowAppMirrorShadowOpacity-decrease"),
		t.display = o("ShadowAppMirrorShadowOpacity-display"),
		t.increase = o("ShadowAppMirrorShadowOpacity-increase"),
		t.reset = o("ShadowAppMirrorShadowOpacity-reset")
	}
	(y || (y = {})),
	t.ShadowAppMirrorShadowOpacity = y;
	var v;
	!function (t) {
		t.container = o("ShadowAppPerspectiveShadowBlurRadius-container"),
		t.decrease = o("ShadowAppPerspectiveShadowBlurRadius-decrease"),
		t.display = o("ShadowAppPerspectiveShadowBlurRadius-display"),
		t.increase = o("ShadowAppPerspectiveShadowBlurRadius-increase"),
		t.reset = o("ShadowAppPerspectiveShadowBlurRadius-reset")
	}
	(v || (v = {})),
	t.ShadowAppPerspectiveShadowBlurRadius = v;
	var b;
	!function (t) {
		t.container = o("ShadowAppPerspectiveShadowBlurRadiusScale-container"),
		t.decrease = o("ShadowAppPerspectiveShadowBlurRadiusScale-decrease"),
		t.display = o("ShadowAppPerspectiveShadowBlurRadiusScale-display"),
		t.increase = o("ShadowAppPerspectiveShadowBlurRadiusScale-increase"),
		t.reset = o("ShadowAppPerspectiveShadowBlurRadiusScale-reset")
	}
	(b || (b = {})),
	t.ShadowAppPerspectiveShadowBlurRadiusScale = b;
	var M;
	!function (t) {
		t.container = o("ShadowAppPerspectiveShadowOpacity-container"),
		t.decrease = o("ShadowAppPerspectiveShadowOpacity-decrease"),
		t.display = o("ShadowAppPerspectiveShadowOpacity-display"),
		t.increase = o("ShadowAppPerspectiveShadowOpacity-increase"),
		t.reset = o("ShadowAppPerspectiveShadowOpacity-reset")
	}
	(M || (M = {})),
	t.ShadowAppPerspectiveShadowOpacity = M;
	var k;
	!function (t) {
		t.container = o("ShadowAppPerspectiveShadowOpacityScale-container"),
		t.decrease = o("ShadowAppPerspectiveShadowOpacityScale-decrease"),
		t.display = o("ShadowAppPerspectiveShadowOpacityScale-display"),
		t.increase = o("ShadowAppPerspectiveShadowOpacityScale-increase"),
		t.reset = o("ShadowAppPerspectiveShadowOpacityScale-reset")
	}
	(k || (k = {})),
	t.ShadowAppPerspectiveShadowOpacityScale = k;
	var T;
	!function (t) {
		t.iframe = o("TutorialScreenshots-iframe"),
		t.wrapper = o("TutorialScreenshots-wrapper")
	}
	(T = t.TutorialScreenshots || (t.TutorialScreenshots = {}));
	var x;
	!function (t) {
		t.both = o("ViewPanes-both"),
		t.group = o("ViewPanes-group"),
		t.marks = o("ViewPanes-marks"),
		t.preview = o("ViewPanes-preview")
	}
	(x = t.ViewPanes || (t.ViewPanes = {}));
	var A;
	!function (t) {
		t.hide_for_shop_images = o("bulkClip-hide_for_shop_images"),
		t.show_for_shop_images = o("bulkClip-show_for_shop_images")
	}
	(A = t.bulkClip || (t.bulkClip = {}));
	var P;
	!function (t) {
		t.container = o("colorCastForegroundProtection-container"),
		t.decrease = o("colorCastForegroundProtection-decrease"),
		t.display = o("colorCastForegroundProtection-display"),
		t.increase = o("colorCastForegroundProtection-increase"),
		t.reset = o("colorCastForegroundProtection-reset")
	}
	(P || (P = {})),
	t.colorCastForegroundProtection = P;
	var _;
	!function (t) {
		t.Lightbox = e("contextMenu-Lightbox"),
		t.ToolbarColorsApp = e("contextMenu-ToolbarColorsApp"),
		t.ToolbarMark = e("contextMenu-ToolbarMark"),
		t.ToolbarShadowApp = e("contextMenu-ToolbarShadowApp"),
		t.toolbar = o("contextMenu-toolbar")
	}
	(_ = t.contextMenu || (t.contextMenu = {}));
	var D;
	!function (t) {
		var e;
		!function (t) {
			t.container = o("edge-featheringRadius-container"),
			t.decrease = o("edge-featheringRadius-decrease"),
			t.display = o("edge-featheringRadius-display"),
			t.increase = o("edge-featheringRadius-increase"),
			t.reset = o("edge-featheringRadius-reset")
		}
		(e || (e = {})),
		t.featheringRadius = e;
		var i;
		!function (t) {
			t.container = o("edge-offset-container"),
			t.decrease = o("edge-offset-decrease"),
			t.display = o("edge-offset-display"),
			t.increase = o("edge-offset-increase"),
			t.reset = o("edge-offset-reset")
		}
		(i || (i = {})),
		t.offset = i;
		var r;
		!function (t) {
			t.container = o("edge-smoothing-container"),
			t.decrease = o("edge-smoothing-decrease"),
			t.display = o("edge-smoothing-display"),
			t.increase = o("edge-smoothing-increase"),
			t.reset = o("edge-smoothing-reset")
		}
		(r || (r = {})),
		t.smoothing = r
	}
	(D = t.edge || (t.edge = {}));
	var R;
	!function (t) {
		t.connecting = o("lightState-connecting"),
		t.progress = o("lightState-progress"),
		t.updated = o("lightState-updated"),
		t.updating = o("lightState-updating")
	}
	(R = t.lightState || (t.lightState = {}));
	var E;
	!function (t) {
		t.AcceptTerms = e("merchant-AcceptTerms"),
		t.AcceptTermsWrapper = e("merchant-AcceptTermsWrapper"),
		t.CardCvc = e("merchant-CardCvc"),
		t.CardExpiration = e("merchant-CardExpiration"),
		t.CardName = e("merchant-CardName"),
		t.CardNumber = e("merchant-CardNumber"),
		t.CardZip = e("merchant-CardZip"),
		t.DefaultPaymentMethod = e("merchant-DefaultPaymentMethod"),
		t.FailedToLoadStripeJs = e("merchant-FailedToLoadStripeJs"),
		t.InitializingIndicator = e("merchant-InitializingIndicator"),
		t.PaymentError = e("merchant-PaymentError"),
		t.PaymentForm = e("merchant-PaymentForm"),
		t.PaymentMethodForm = e("merchant-PaymentMethodForm"),
		t.PaymentMethodFormSubmit = e("merchant-PaymentMethodFormSubmit"),
		t.RadioStripe = e("paymentMethod_stripe"),
		t.ShowWhenCreatingPm = e("merchant-ShowWhenCreatingPm"),
		t.ShowWhenMinibrowsing = e("merchant-ShowWhenMinibrowsing"),
		t.ShowWhenSubmitting = e("merchant-ShowWhenSubmitting"),
		t.StreamlexPaymentToken = e("merchant-StreamlexPaymentToken"),
		t.StripePaymentError = e("merchant-StripePaymentError"),
		t.StripePaymentMethodForm = e("merchant-StripePaymentMethodForm"),
		t.SubmitSection = e("merchant-SubmitSection"),
		t.has_error = o("has-error"),
		t.radio_paymentMethod = o("radio_paymentMethod")
	}
	(E = t.merchant || (t.merchant = {}));
	var F;
	!function (t) {
		t.Error = e("resultDialog-Error"),
		t.ErrorMsg = e("resultDialog-ErrorMsg"),
		t.Pushed = e("resultDialog-Pushed"),
		t.Ready = e("resultDialog-Ready"),
		t.ReadyDownloadImage = e("resultDialog-ReadyDownloadImage"),
		t.ReadyDownloadLink = e("resultDialog-ReadyDownloadLink"),
		t.ReadyShareLink = e("resultDialog-ReadyShareLink"),
		t.Waiting = e("resultDialog-Waiting"),
		t.WaitingBar = e("resultDialog-WaitingBar"),
		t.WaitingMsg = e("resultDialog-WaitingMsg"),
		t.pushed = o("resultDialog-pushed"),
		t.state = o("resultDialog-state");
		var i;
		!function (t) {
			t.row = e("resultDialog-SettingsSummary-row");
			var o;
			!function (t) {
				t.Key = e("resultDialog-SettingsSummary-ColorsApp-Key"),
				t.Value = e("resultDialog-SettingsSummary-ColorsApp-Value")
			}
			(o || (o = {})),
			t.ColorsApp = o;
			var i;
			!function (t) {
				t.Key = e("resultDialog-SettingsSummary-CropApp-Key"),
				t.Value = e("resultDialog-SettingsSummary-CropApp-Value")
			}
			(i || (i = {})),
			t.CropApp = i;
			var r;
			!function (t) {
				t.Key = e("resultDialog-SettingsSummary-ExportOptions-Key"),
				t.Value = e("resultDialog-SettingsSummary-ExportOptions-Value")
			}
			(r || (r = {})),
			t.ExportOptions = r;
			var s;
			!function (t) {
				t.Key = e("resultDialog-SettingsSummary-ShadowsApp-Key"),
				t.Value = e("resultDialog-SettingsSummary-ShadowsApp-Value")
			}
			(s || (s = {})),
			t.ShadowsApp = s
		}
		(i = t.SettingsSummary || (t.SettingsSummary = {}))
	}
	(F = t.resultDialog || (t.resultDialog = {}));
	var z;
	!function (t) {
		var i;
		!function (t) {
			t.Id = e("video-erase-Id"),
			t.Tool = e("erase-tool"),
			t.show = o("video-erase-show")
		}
		(i || (i = {})),
		t.erase = i;
		var r;
		!function (t) {
			t.Id = e("video-green-Id"),
			t.Tool = e("green-tool"),
			t.show = o("video-green-show")
		}
		(r || (r = {})),
		t.green = r
	}
	(z = t.video || (t.video = {}))
}
(Css || (Css = {}));
var MouseDownRepeater = function () {
	function t(t, e, o, i, r, s) {
		var n = this;
		this.btn = t,
		this.action = e,
		this.delay = o,
		this.firstDelayMultiplier = i,
		this.ondown = r,
		this.onup = s,
		this.t = void 0,
		this.repeat = function () {
			n.action(),
			n.t = setTimeout(n.repeat, n.delay)
		},
		this.startHandler = function (t) {
			window.addEventListener("touchend", n.endHandler),
			n.btn.on("mouseup mouseout", n.endHandler),
			n.ondown && n.ondown(),
			n.action(),
			n.t = setTimeout(n.repeat, n.delay * n.firstDelayMultiplier),
			t.preventDefault()
		},
		this.endHandler = function (t) {
			window.removeEventListener("touchend", n.endHandler),
			n.btn.off("mouseup mouseout", n.endHandler),
			n.onup && n.onup(),
			clearTimeout(n.t),
			n.t = void 0,
			t.preventDefault()
		},
		t.each(function (t, e) {
			e.addEventListener("touchstart", this.startHandler)
		}),
		t.mousedown(this.startHandler)
	}
	return t
}
(), Util;
!function (t) {
	function e(t, e, o) {
		t.each(function (t, i) {
			i.addEventListener(e, o)
		})
	}
	function o(e) {
		return t.fuzzyAspectRatioEx(e, Const.AspectRatios)
	}
	function i(t) {
		return null != t && 0 != t.width() && 0 != t.height()
	}
	function r(e) {
		n(!1),
		a(!1),
		s(t.stringify(e))
	}
	function s(e) {
		window.Globals.Bulk.isIframe || window.Globals.Bulk.isApi ? window.checkPostMessage({
			command: Const.Error,
			error: {
				code: 2e3,
				status: 400,
				message: e
			}
		}) : ($("#fatal-error-p").text(e),
			t.modal("#fatal-error")),
		t.gaTrack("ErrorShown", "Fatal", e)
	}
	function n(e) {
		e ? t.modal("#spinner-lightbox") : $("#spinner-lightbox").modal("hide")
	}
	function a(e) {
		e ? t.modal("#progress-lightbox") : $("#progress-lightbox").modal("hide")
	}
	function l(t) {
		$("#progress-lightbox-bar").attr("style", "width:" + t + "%")
	}
	function p(e) {
		e ? t.modal("#save-and-exit-lightbox") : $("#save-and-exit-lightbox").modal("hide")
	}
	function c(t, e, o, i, r, s) {
		new MouseDownRepeater(t, e, o, i, r, s)
	}
	function u(e, o) {
		var i = {
			cache: !1,
			dataType: "json",
			error: function (e, o, i) {
				t.fatalErrorStr(t.formatXhrError(e, o))
			},
			success: o,
			type: "GET"
		};
		$.ajax(e, i)
	}
	t.addEventListener = e,
	t.fuzzyAspectRatio = o,
	t.imageIsReady = i,
	t.fatalError = r,
	t.fatalErrorStr = s,
	t.spinner = n,
	t.progress = a,
	t.progressUpdate = l,
	t.saveAndExit = p,
	t.mouseDownRepeater = c,
	t.LittleEndian = function () {
		try {
			var t = new ArrayBuffer(2);
			return new DataView(t).setInt16(0, 256, !0),
			256 === new Int16Array(t)[0]
		} catch (t) {
			return !0
		}
	}
	(),
	t.fetchJson = u
}
(Util || (Util = {}));
var CropRect = function () {
	function t(t, e, o, i) {
		void 0 === t && (t = 0),
		void 0 === e && (e = 0),
		void 0 === o && (o = 0),
		void 0 === i && (i = 0),
		this.top0 = t,
		this.right0 = e,
		this.bottom0 = o,
		this.left0 = i
	}
	return t.from = function (e) {
		return new t(e.top0, e.right0, e.bottom0, e.left0)
	},
	t.prototype.dup = function () {
		return t.from(this)
	},
	t.prototype.centerX = function () {
		return (this.left0 + this.right0) / 2
	},
	t.prototype.centerY = function () {
		return (this.top0 + this.bottom0) / 2
	},
	t.prototype.width = function () {
		return this.right0 - this.left0
	},
	t.prototype.height = function () {
		return this.bottom0 - this.top0
	},
	t.prototype.isEmpty = function () {
		return 0 == this.top0 && 0 == this.right0 && 0 == this.bottom0 && 0 == this.left0
	},
	t.prototype.clear = function () {
		this.top0 = 0,
		this.right0 = 0,
		this.bottom0 = 0,
		this.left0 = 0
	},
	t.prototype.equals = function (t) {
		return null != t && this.top0 == t.top0 && this.right0 == t.right0 && this.bottom0 == t.bottom0 && this.left0 == t.left0
	},
	t.prototype.softEquals = function (t, e) {
		return void 0 === e && (e = .001),
		Math.abs(this.top0 - t.top0) < e && Math.abs(this.right0 - t.right0) < e && Math.abs(this.bottom0 - t.bottom0) < e && Math.abs(this.left0 - t.left0) < e
	},
	t.prototype.set = function (t, e, o, i) {
		this.left0 = t,
		this.top0 = e,
		this.right0 = o,
		this.bottom0 = i
	},
	t.prototype.setFrom = function (t) {
		this.top0 = t.top0,
		this.right0 = t.right0,
		this.bottom0 = t.bottom0,
		this.left0 = t.left0,
		this.normalize()
	},
	t.prototype.normalize = function () {
		var t;
		this.top0 > this.bottom0 && (t = this.top0,
			this.top0 = this.bottom0,
			this.bottom0 = t),
		this.left0 > this.right0 && (t = this.left0,
			this.left0 = this.right0,
			this.right0 = t)
	},
	t.prototype.rotate = function (t, e, o) {
		var i = t * Math.PI / 180,
		r = Math.round(Math.cos(i)),
		s = Math.round(Math.sin(i)),
		n = this.left0 - e,
		a = this.top0 - o,
		l = this.right0 - e,
		p = this.bottom0 - o,
		c = r * n + s * a + e,
		u = -s * n + r * a + o,
		d = r * l + s * p + e,
		h = -s * l + r * p + o;
		this.left0 = Math.min(c, d),
		this.top0 = Math.min(u, h),
		this.right0 = Math.max(c, d),
		this.bottom0 = Math.max(u, h)
	},
	t.prototype.y2x = function () {
		return this.width() / this.height()
	},
	t
}
(), Anchor;
!function (t) {
	t[t.TopLeft = 0] = "TopLeft",
	t[t.Top = 1] = "Top",
	t[t.TopRight = 2] = "TopRight",
	t[t.Right = 3] = "Right",
	t[t.BottomRight = 4] = "BottomRight",
	t[t.Bottom = 5] = "Bottom",
	t[t.BottomLeft = 6] = "BottomLeft",
	t[t.Left = 7] = "Left",
	t[t.Center = 8] = "Center"
}
(Anchor || (Anchor = {}));
var Anchor;
!function (t) {
	function e(e) {
		switch (e) {
		case t.TopLeft:
			return t.BottomRight;
		case t.Top:
			return t.Bottom;
		case t.TopRight:
			return t.BottomLeft;
		case t.Right:
			return t.Left;
		case t.BottomRight:
			return t.TopLeft;
		case t.Bottom:
			return t.Top;
		case t.BottomLeft:
			return t.TopRight;
		case t.Left:
			return t.Right;
		case t.Center:
			return t.Center
		}
		return t.Center
	}
	t.opposite = e
}
(Anchor || (Anchor = {}));
// 坐标点
var Point = function () {
	function t(t, e) {
		this.x = t,
		this.y = e
	}
	return t.empty = function () {
		return new t(0, 0)
	},
	t.nan = function () {
		return new t(Number.NaN, Number.NaN)
	},
	t.from = function (e) {
		return new t(e.x, e.y)
	},
	// 无穷大
	t.prototype.inFinite = function () {
		return isFinite(this.x) && isFinite(this.y)
	},
	// 插值
	t.prototype.interpolate = function (e, o) {
		return new t(this.x * (1 - o) + e.x * o, this.y * (1 - o) + e.y * o)
	},
	t.prototype.distanceSqrTo = function (t) {
		var e = this.x - t.x,
		o = this.y - t.y;
		return e * e + o * o
	},
	// 平方根
	t.prototype.distanceTo = function (t) {
		return Math.sqrt(this.distanceSqrTo(t))
	},
	t.prototype.offset = function (e, o) {
		return new t(this.x + e, this.y + o)
	},
	t.prototype.set = function (t) {
		return this.x = t.x,
		this.y = t.y,
		this
	},
	t.prototype.setXy = function (t, e) {
		return this.x = t,
		this.y = e,
		this
	},
	t.prototype.setNan = function () {
		return this.setXy(Number.NaN, Number.NaN)
	},
	t.prototype.rotateInPlace = function (t, e) {
		var o = Math.sin(t),
		i = Math.cos(t),
		r = this.x - e.x,
		s = this.y - e.y;
		return this.setXy(e.x + i * r - o * s, e.y + o * r + i * s),
		this
	},
	t.prototype.rotateInto = function (t, e, o, i, r) {
		var s = this.x - o,
		n = this.y - i;
		r.setXy(o + t * s - e * n, i + e * s + t * n)
	},
	t.prototype.rotate = function (e, o) {
		var i = Math.sin(e),
		r = Math.cos(e),
		s = this.x - o.x,
		n = this.y - o.y;
		return new t(o.x + r * s - i * n, o.y + i * s + r * n)
	},
	t.prototype.plusEquals = function (t) {
		return this.x += t.x,
		this.y += t.y,
		this
	},
	t.prototype.equals = function (t) {
		return this.x == t.x && this.y == t.y
	},
	t.prototype.notEquals = function (t) {
		return !this.equals(t)
	},
	t.prototype.minusEquals = function (t) {
		return this.x -= t.x,
		this.y -= t.y,
		this
	},
	t.prototype.minusXyEquals = function (t, e) {
		return this.x -= t,
		this.y -= e,
		this
	},
	t.prototype.minus = function (e) {
		return new t(this.x - e.x, this.y - e.y)
	},
	t.prototype.plus = function (e) {
		return new t(this.x + e.x, this.y + e.y)
	},
	t.prototype.times = function (e) {
		return new t(e * this.x, e * this.y)
	},
	t.prototype.timesEquals = function (t) {
		return this.x *= t,
		this.y *= t,
		this
	},
	t.prototype.cross = function (t) {
		return this.x * t.y - this.y * t.x
	},
	t.prototype.ortho = function () {
		return new t(this.y, -this.x)
	},
	t.prototype.dot = function (t) {
		return this.x * t.x + this.y * t.y
	},
	t.prototype.length = function () {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	},
	t.prototype.lengthSqr = function () {
		return this.x * this.x + this.y * this.y
	},
	t.prototype.normalize = function () {
		var t = this.length();
		return 0 != t && (this.x /= t,
			this.y /= t),
		this
	},
	t.prototype.dup = function () {
		return t.from(this)
	},
	t
}
(), Quad = function () {
	function t(t, e, o, i) {
		this.p0 = t,
		this.p1 = e,
		this.p2 = o,
		this.p3 = i,
		this.points = [],
		this.points.push(t, e, o, i)
	}
	return t.empty = function () {
		return new t(Point.empty(), Point.empty(), Point.empty(), Point.empty())
	},
	t.prototype.set = function (t) {
		return this.p0.set(t.p0),
		this.p1.set(t.p1),
		this.p2.set(t.p2),
		this.p3.set(t.p3),
		this
	},
	t.prototype.dup = function () {
		return new t(this.p0.dup(), this.p1.dup(), this.p2.dup(), this.p3.dup())
	},
	t.prototype.contains = function (t, e) {
		for (var o = !1, i = this.points.length, r = 0; r < i; r++) {
			var s = this.points[r],
			n = this.points[(r + 1) % i];
			(n.y < e && s.y >= e || s.y < e && n.y >= e) && n.x + (e - n.y) / (s.y - n.y) * (s.x - n.x) < t && (o = !o)
		}
		return o
	},
	t.prototype.isConvex = function () {
		function t(t) {
			return t < 0 ? -1 : t > 0 ? 1 : 0
		}
		var e = this.p1.minus(this.p0),
		o = this.p2.minus(this.p1),
		i = this.p3.minus(this.p2),
		r = this.p0.minus(this.p3),
		s = t(e.cross(o)),
		n = t(o.cross(i)),
		a = t(i.cross(r)),
		l = t(r.cross(e));
		return s == n && s == a && s == l
	},
	t.prototype.rotateInPlace = function (t, e) {
		return this.p0.rotateInPlace(t, e),
		this.p1.rotateInPlace(t, e),
		this.p2.rotateInPlace(t, e),
		this.p3.rotateInPlace(t, e),
		this
	},
	t.prototype.rotate = function (t, e) {
		return this.dup().rotateInPlace(t, e)
	},
	t
}
(), Rect = function () {
	function t(t, e, o, i) {
		this.left = t,
		this.top = e,
		this.right = o,
		this.bottom = i
	}
	return t.empty = function () {
		return new t(0, 0, 0, 0)
	},
	t.fromBoundingRect = function (e) {
		return new t(e[0], e[1], e[2], e[3])
	},
	t.fromCropRect = function (e) {
		return new t(e.left0, e.top0, e.right0, e.bottom0)
	},
	t.fromPoints = function (e) {
		if (0 == e.length)
			return null;
		for (var o = e[0], i = new t(o.x, o.y, o.x, o.y), r = 1; r < e.length; r++)
			i.addPoint(e[r]);
		return i
	},
	t.fromQuad = function (e) {
		return t.fromPoints(e.points)
	},
	t.prototype.dup = function () {
		return new t(this.left, this.top, this.right, this.bottom)
	},
	t.prototype.setNull = function () {
		return this.set(null, null, null, null)
	},
	t.prototype.setFrom = function (t) {
		return this.left = t.left,
		this.top = t.top,
		this.right = t.right,
		this.bottom = t.bottom,
		this
	},
	t.prototype.set = function (t, e, o, i) {
		return this.left = t,
		this.top = e,
		this.right = o,
		this.bottom = i,
		this
	},
	t.prototype.fromCropRect = function (t) {
		return this.set(t.left0, t.top0, t.right0, t.bottom0)
	},
	t.prototype.intersectionWith = function (t) {
		return this.left = Math.max(this.left, t.left),
		this.top = Math.max(this.top, t.top),
		this.right = Math.min(this.right, t.right),
		this.bottom = Math.min(this.bottom, t.bottom),
		this
	},
	t.prototype.leftCenter = function () {
		return new Point(this.left, .5 * (this.top + this.bottom))
	},
	t.prototype.topLeft = function () {
		return new Point(this.left, this.top)
	},
	t.prototype.topCenter = function () {
		return new Point(.5 * (this.left + this.right), this.top)
	},
	t.prototype.topRight = function () {
		return new Point(this.right, this.top)
	},
	t.prototype.rightCenter = function () {
		return new Point(this.right, .5 * (this.top + this.bottom))
	},
	t.prototype.bottomLeft = function () {
		return new Point(this.left, this.bottom)
	},
	t.prototype.bottomCenter = function () {
		return new Point(.5 * (this.left + this.right), this.bottom)
	},
	t.prototype.bottomRight = function () {
		return new Point(this.right, this.bottom)
	},
	t.prototype.center = function () {
		return new Point(.5 * (this.left + this.right), .5 * (this.top + this.bottom))
	},
	t.prototype.translate = function (t, e) {
		return this.top += e,
		this.bottom += e,
		this.left += t,
		this.right += t,
		this
	},
	t.prototype.moveAnchor = function (t, e) {
		switch (t) {
		case Anchor.TopLeft:
			this.left = Math.min(this.left + e.x, this.right),
			this.top = Math.min(this.top + e.y, this.bottom);
			break;
		case Anchor.Top:
			this.top = Math.min(this.top + e.y, this.bottom);
			break;
		case Anchor.TopRight:
			this.top = Math.min(this.top + e.y, this.bottom),
			this.right = Math.max(this.right + e.x, this.left);
			break;
		case Anchor.Right:
			this.right = Math.max(this.right + e.x, this.left);
			break;
		case Anchor.BottomRight:
			this.right = Math.max(this.right + e.x, this.left),
			this.bottom = Math.max(this.bottom + e.y, this.top);
			break;
		case Anchor.Bottom:
			this.bottom = Math.max(this.bottom + e.y, this.top);
			break;
		case Anchor.BottomLeft:
			this.left = Math.min(this.left + e.x, this.right),
			this.bottom = Math.max(this.bottom + e.y, this.top);
			break;
		case Anchor.Left:
			this.left = Math.min(this.left + e.x, this.right);
			break;
		case Anchor.Center:
			this.left += e.x,
			this.top += e.y,
			this.right += e.x,
			this.bottom += e.y
		}
		return this
	},
	t.prototype.moveAnchorToMinSize = function (t, e, o) {
		var i = Math.max(0, e - this.width()),
		r = Math.max(0, o - this.height());
		switch (t) {
		case Anchor.TopLeft:
			this.left -= i,
			this.top -= r;
			break;
		case Anchor.Top:
			this.top -= r;
			break;
		case Anchor.TopRight:
			this.top -= r,
			this.right += i;
			break;
		case Anchor.Right:
			this.right += i;
			break;
		case Anchor.BottomRight:
			this.right += i,
			this.bottom += r;
			break;
		case Anchor.Bottom:
			this.bottom += r;
			break;
		case Anchor.BottomLeft:
			this.left -= i,
			this.bottom += r;
			break;
		case Anchor.Left:
			this.left -= i;
			break;
		case Anchor.Center:
			i *= .5,
			r *= .5,
			this.left -= i,
			this.right += i,
			this.top -= r,
			this.bottom += r
		}
		return this
	},
	t.prototype.forceAspectRatio = function (t, e) {
		var o = t * this.width(),
		i = 0,
		r = 0;
		e == Anchor.TopLeft || e == Anchor.TopRight || e == Anchor.BottomRight || e == Anchor.BottomLeft ? o > this.height() ? i = o - this.height() : r = this.height() / t - this.width() : e == Anchor.Top || e == Anchor.Bottom ? r = this.height() / t - this.width() : i = o - this.height();
		var s = .5 * r,
		n = .5 * i;
		switch (e) {
		case Anchor.Top:
			this.bottom += i,
			this.left -= s,
			this.right += s;
			break;
		case Anchor.Left:
			this.right += r,
			this.top -= n,
			this.bottom += n;
			break;
		case Anchor.Bottom:
			this.top -= i,
			this.left -= s,
			this.right += s;
			break;
		case Anchor.Right:
			this.left -= r,
			this.top -= n,
			this.bottom += n;
			break;
		case Anchor.TopLeft:
			this.bottom += i,
			this.right += r;
			break;
		case Anchor.TopRight:
			this.bottom += i,
			this.left -= r;
			break;
		case Anchor.BottomRight:
			this.top -= i,
			this.left -= r;
			break;
		case Anchor.BottomLeft:
			this.top -= i,
			this.right += r;
			break;
		case Anchor.Center:
			this.top -= n,
			this.bottom += n,
			this.left -= s,
			this.right += s
		}
		return this
	},
	t.prototype.interpolate = function (t, e) {
		return new Point(this.left * (1 - t) + t * this.right, this.top * (1 - e) + e * this.bottom)
	},
	t.prototype.sampleGrid = function (t, e) {
		for (var o = [], i = 0; i < e; i++)
			for (var r = i / (e - 1), s = 0; s < t; s++)
				o.push(this.interpolate(s / (t - 1), r));
		return o
	},
	t.prototype.setHorizontal = function (t) {
		return this.left = t.left,
		this.right = t.right,
		this
	},
	t.prototype.padToFit = function (t) {
		var e = 0,
		o = 0;
		return e = Math.max(e, this.left - t.left),
		e = Math.max(e, t.right - this.right),
		o = Math.max(o, this.top - t.top),
		o = Math.max(o, t.bottom - this.bottom),
		this.left -= e,
		this.right += e,
		this.top = Math.min(this.top, t.top),
		this.bottom = Math.max(this.bottom, t.bottom),
		this
	},
	t.prototype.addRect = function (t) {
		return this.left = Math.min(this.left, t.left),
		this.right = Math.max(this.right, t.right),
		this.top = Math.min(this.top, t.top),
		this.bottom = Math.max(this.bottom, t.bottom),
		this
	},
	t.prototype.addPoint = function (t) {
		this.left = Math.min(this.left, t.x),
		this.top = Math.min(this.top, t.y),
		this.right = Math.max(this.right, t.x),
		this.bottom = Math.max(this.bottom, t.y)
	},
	t.prototype.addPointSafe = function (t) {
		t && (null == this.left ? (this.left = t.x,
				this.top = t.y,
				this.right = t.x,
				this.bottom = t.y) : this.addPoint(t))
	},
	t.prototype.width = function () {
		return this.right - this.left
	},
	t.prototype.height = function () {
		return this.bottom - this.top
	},
	t.prototype.pad = function (t) {
		return this.left -= t,
		this.top -= t,
		this.right += t,
		this.bottom += t,
		this
	},
	t.prototype.padBottom = function (t) {
		return this.bottom += t,
		this
	},
	t.prototype.toQuad = function () {
		return new Quad(this.topLeft(), this.topRight(), this.bottomRight(), this.bottomLeft())
	},
	t.prototype.snap = function () {
		return this.left = Math.floor(this.left),
		this.top = Math.floor(this.top),
		this.right = Math.ceil(this.right),
		this.bottom = Math.ceil(this.bottom),
		this
	},
	t.prototype.round = function () {
		return this.left = Math.round(this.left),
		this.top = Math.round(this.top),
		this.right = Math.round(this.right),
		this.bottom = Math.round(this.bottom),
		this
	},
	t.prototype.normalize = function () {
		var t = Math.min(this.left, this.right),
		e = Math.max(this.left, this.right),
		o = Math.min(this.top, this.bottom),
		i = Math.max(this.top, this.bottom);
		return this.left = t,
		this.right = e,
		this.top = o,
		this.bottom = i,
		this
	},
	t
}
(), PerspectiveTransform = function () {
	function t() {
		this.a11 = 1,
		this.a12 = 0,
		this.a13 = 0,
		this.a21 = 0,
		this.a22 = 1,
		this.a23 = 0,
		this.a31 = 0,
		this.a32 = 0,
		this.a33 = 1
	}
	return t.from = function (e) {
		var o = new t;
		return o.set(e.a11, e.a21, e.a31, e.a12, e.a22, e.a32, e.a13, e.a23, e.a33),
		o
	},
	t.prototype.pretty = function () {
		return "\n[" + this.a11.toFixed(3) + ", " + this.a21.toFixed(3) + ", " + this.a31.toFixed(3) + "]\n[" + this.a12.toFixed(3) + ", " + this.a22.toFixed(3) + ", " + this.a32.toFixed(3) + "]\n[" + this.a13.toExponential(3) + ", " + this.a23.toExponential(3) + ", " + this.a33.toFixed(3) + "]\n"
	},
	t.prototype.set = function (t, e, o, i, r, s, n, a, l) {
		this.a11 = t,
		this.a12 = i,
		this.a13 = n,
		this.a21 = e,
		this.a22 = r,
		this.a23 = a,
		this.a31 = o,
		this.a32 = s,
		this.a33 = l
	},
	t.prototype.timesEquals = function (t) {
		this.set(this.a11 * t.a11 + this.a21 * t.a12 + this.a31 * t.a13, this.a11 * t.a21 + this.a21 * t.a22 + this.a31 * t.a23, this.a11 * t.a31 + this.a21 * t.a32 + this.a31 * t.a33, this.a12 * t.a11 + this.a22 * t.a12 + this.a32 * t.a13, this.a12 * t.a21 + this.a22 * t.a22 + this.a32 * t.a23, this.a12 * t.a31 + this.a22 * t.a32 + this.a32 * t.a33, this.a13 * t.a11 + this.a23 * t.a12 + this.a33 * t.a13, this.a13 * t.a21 + this.a23 * t.a22 + this.a33 * t.a23, this.a13 * t.a31 + this.a23 * t.a32 + this.a33 * t.a33)
	},
	t.prototype.adjointSelf = function () {
		this.set(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21)
	},
	t.prototype.normalize = function () {
		var t = 1 / this.a33;
		this.a11 *= t,
		this.a12 *= t,
		this.a13 *= t,
		this.a21 *= t,
		this.a22 *= t,
		this.a23 *= t,
		this.a31 *= t,
		this.a32 *= t,
		this.a33 = 1
	},
	t.prototype.apply = function (t, e) {
		var o = t.x,
		i = t.y,
		r = this.a13 * o + this.a23 * i + this.a33;
		e.x = (this.a11 * o + this.a21 * i + this.a31) / r,
		e.y = (this.a12 * o + this.a22 * i + this.a32) / r
	},
	t.prototype.applyWithGuard = function (t, e) {
		var o = t.x,
		i = t.y,
		r = this.a13 * o + this.a23 * i + this.a33;
		return r > 0 && (e.x = (this.a11 * o + this.a21 * i + this.a31) / r,
			e.y = (this.a12 * o + this.a22 * i + this.a32) / r,
			!0)
	},
	t.prototype.applyToQuad = function (t, e) {
		this.apply(t.p0, e.p0),
		this.apply(t.p1, e.p1),
		this.apply(t.p2, e.p2),
		this.apply(t.p3, e.p3)
	},
	t.prototype.setSquareToQuadrilateral = function (t, e, o, i, r, s, n, a) {
		var l = t - o + r - n,
		p = e - i + s - a;
		if (0 == l && 0 == p)
			this.set(o - t, r - o, t, i - e, s - i, e, 0, 0, 1);
		else {
			var c = o - r,
			u = n - r,
			d = i - s,
			h = a - s,
			g = c * h - u * d,
			f = (l * h - u * p) / g,
			w = (c * p - l * d) / g;
			this.set(o - t + f * o, n - t + w * n, t, i - e + f * i, a - e + w * a, e, f, w, 1)
		}
	},
	t.prototype.setQuadrilateralToSquare = function (t, e, o, i, r, s, n, a) {
		this.setSquareToQuadrilateral(t, e, o, i, r, s, n, a),
		this.adjointSelf()
	},
	t.prototype.setQuadrilateralToQuadrilateral = function (t, e) {
		this.setQuadrilateralToQuadrilateralRaw(t.p0.x, t.p0.y, t.p1.x, t.p1.y, t.p2.x, t.p2.y, t.p3.x, t.p3.y, e.p0.x, e.p0.y, e.p1.x, e.p1.y, e.p2.x, e.p2.y, e.p3.x, e.p3.y)
	},
	t.prototype.setQuadrilateralToQuadrilateralRaw = function (e, o, i, r, s, n, a, l, p, c, u, d, h, g, f, w) {
		t.dummy.setQuadrilateralToSquare(e, o, i, r, s, n, a, l),
		this.setSquareToQuadrilateral(p, c, u, d, h, g, f, w),
		this.timesEquals(t.dummy),
		this.normalize()
	},
	t.prototype.setRotationAbout = function (t, e) {
		var o = e.x,
		i = e.y,
		r = Math.cos(t),
		s = Math.sin(t);
		this.set(r, -s, o * (1 - r) + i * s, s, r, i * (1 - r) - o * s, 0, 0, 1)
	},
	t.dummy = new t,
	t
}
(), Line = function () {
	function t(t, e) {
		this.p0 = t,
		this.p1 = e
	}
	return t.prototype.lengthSqr = function () {
		return this.p0.distanceSqrTo(this.p1)
	},
	t.prototype.direction = function () {
		return this.p1.minus(this.p0)
	},
	t.prototype.interpolate = function (t) {
		return this.p0.interpolate(this.p1, t)
	},
	t.prototype.snapTo = function (t) {
		var e = Util.clamp(t.minus(this.p0).dot(this.direction()) / this.lengthSqr(), 0, 1),
		o = this.interpolate(e);
		return {
			pp: o,
			t: e,
			distance: o.distanceTo(t)
		}
	},
	t
}
(), PolyLine = function () {
	function t(t) {
		this.points = t
	}
	return t.prototype.head = function () {
		return this.points[0]
	},
	t.prototype.last = function () {
		return this.points[this.points.length - 1]
	},
	t.prototype.bounds = function () {
		return Rect.fromPoints(this.points)
	},
	t.prototype.snapTo = function (t) {
		var e = this.points.length;
		if (0 == e)
			return null;
		if (1 == e)
			return {
				pp: this.points[0].dup(),
				t: 0,
				distance: this.points[0].distanceTo(t)
			};
		for (var o = null, i = new Line(null, null), r = 0; r < e - 1; r++) {
			i.p0 = this.points[r],
			i.p1 = this.points[r + 1];
			var s = i.snapTo(t);
			(null == o || s.distance < o.distance) && (o = s)
		}
		return o
	},
	t.prototype.rotate = function (e, o) {
		var i = Math.sin(e),
		r = Math.cos(e);
		return new t(this.points.map(function (t) {
				var e = t.x - o.x,
				s = t.y - o.y;
				return new Point(o.x + r * e - i * s, o.y + i * e + r * s)
			}))
	},
	t.prototype.nonEmpty = function () {
		return this.points.length > 0
	},
	t.prototype.isEmpty = function () {
		return 0 == this.points.length
	},
	t
}
(), Polygon = function () {
	function t(t) {
		this.loops = t
	}
	return t.prototype.contains = function (t, e) {
		for (var o = !1, i = 0; i < this.loops.length; i++)
			o = this.loops[i].contains(t, e, o);
		return o
	},
	t
}
(), PolyLoop = function () {
	function t(t) {
		this.points = t
	}
	return t.prototype.contains = function (t, e, o) {
		void 0 === o && (o = !1);
		for (var i = o, r = this.points.length, s = 0; s < r; s++) {
			var n = this.points[s],
			a = this.points[(s + 1) % r];
			(a.y < e && n.y >= e || n.y < e && a.y >= e) && a.x + (e - a.y) / (n.y - a.y) * (n.x - a.x) < t && (i = !i)
		}
		return i
	},
	t
}
(), Bezier = function () {
	function t(t, e, o) {
		this.p0 = t,
		this.p1 = e,
		this.p2 = o,
		this.mp = this.eval(.5),
		this.updateIsLine()
	}
	return t.line = function (e, o) {
		return new t(e, e.interpolate(o, .5), o)
	},
	t.prototype.reverse = function () {
		var e = new t(this.p2.dup(), this.p1.dup(), this.p0.dup());
		return e.mp.set(this.mp),
		e.isLine = this.isLine,
		e
	},
	t.prototype.set = function (t) {
		this.p0.set(t.p0),
		this.p1.set(t.p1),
		this.p2.set(t.p2),
		this.mp.set(t.mp),
		this.isLine = t.isLine
	},
	t.prototype.step = function (t, e, o, i) {
		this.p0.set(this.p2),
		this.p1.setXy(t, e),
		this.p2.setXy(o, i),
		this.mp = this.eval(.5)
	},
	t.prototype.eval = function (t) {
		return new Point(this.p2.x * t * t + 2 * this.p1.x * (1 - t) * t + this.p0.x * (1 - t) * (1 - t), this.p2.y * t * t + 2 * this.p1.y * (1 - t) * t + this.p0.y * (1 - t) * (1 - t))
	},
	t.prototype.getPoint = function (t) {
		switch (t) {
		case 0:
			return this.p0;
		case 1:
			return this.mp;
		case 2:
			return this.p2;
		default:
			return
		}
	},
	t.prototype.updateIsLine = function () {
		var t = this.p2.minus(this.p0).ortho().normalize(),
		e = Math.abs(t.dot(this.p1.minus(this.p0)));
		this.isLine = e < .001 && t.length() > 0
	},
	t.prototype.updateP1FromMp = function () {
		this.p1.x = 2 * this.mp.x - .5 * (this.p0.x + this.p2.x),
		this.p1.y = 2 * this.mp.y - .5 * (this.p0.y + this.p2.y),
		this.updateIsLine()
	},
	t.prototype.move = function (t, e, o) {
		if (o) {
			var i = this.getPoint(t),
			r = i.dup();
			o.move(0 == t ? 2 : 0, e),
			i.set(r),
			this.move(t, e)
		} else {
			var s = 0 == t ? this.p0 : this.p2,
			n = 0 == t ? this.p2 : this.p0;
			switch (t) {
			case 2:
			case 0:
				this.isLine ? (s.set(e),
					this.p1.set(s.interpolate(n, .5))) : (s.set(e),
					this.updateP1FromMp()),
				this.mp.set(this.eval(.5));
				break;
			case 1:
				this.mp.set(e),
				this.updateP1FromMp()
			}
			this.updateIsLine()
		}
	},
	t
}
(), PolyBezier = function () {
	function t(t) {
		void 0 === t && (t = []),
		this.active = !1,
		this.beziers = t
	}
	return t.prototype.reverse = function () {
		for (var e = [], o = this.beziers.length, i = o - 1; i >= 0; i--)
			e.push(this.beziers[i].reverse());
		return new t(e)
	},
	t.prototype.getFirstPoint = function () {
		return this.beziers[0].p0
	},
	t.prototype.getLastPoint = function () {
		return this.beziers[this.beziers.length - 1].p2
	},
	t.prototype.isClosed = function () {
		return this.getFirstPoint() == this.getLastPoint()
	},
	t.prototype.reverseInPlace = function () {
		for (var t = this.reverse(), e = this.beziers.length, o = 0; o < e; o++)
			this.beziers[o].set(t.beziers[o])
	},
	t
}
(), PolyBezierSet = function () {
	function t() {
		this.polyBeziers = []
	}
	return t.decode = function (t, e) {
		var o,
		i;
		e.polyBeziers.length = 0;
		try {
			if (t && t.swords) {
				var r = [];
				for (o = 0; o < t.points.length; o++)
					r.push(Point.from(t.points[o]));
				var s = t.swords;
				for (o = 0; o < s.length; o++) {
					var n = s[o],
					a = [];
					for (i = 0; i < n.length; i++) {
						var l = n[i];
						a.push(new Bezier(r[l[0]], r[l[1]], r[l[2]]))
					}
					a.length > 0 && e.polyBeziers.push(new PolyBezier(a))
				}
			}
		} catch (t) {}
	},
	t.prototype.encode = function () {
		function t(t) {
			var i = o.indexOf(t);
			return i < 0 && (o.push(t),
				e.points.push({
					x: t.x,
					y: t.y
				}),
				i = e.points.length - 1),
			i
		}
		for (var e = new EncodedPolyBezierSet, o = [], i = 0; i < this.polyBeziers.length; i++) {
			var r = this.polyBeziers[i],
			s = [];
			e.swords.push(s);
			for (var n = 0; n < r.beziers.length; n++) {
				var a = r.beziers[n];
				s.push([t(a.p0), t(a.p1), t(a.p2)])
			}
		}
		return e
	},
	t
}
(), EncodedPolyBezierSet = function () {
	function t() {
		this.points = [],
		this.swords = []
	}
	return t
}
(), ArgbFloat = function () {
	function t(t, e, o, i) {
		void 0 === t && (t = 0),
		void 0 === e && (e = 0),
		void 0 === o && (o = 0),
		void 0 === i && (i = 0),
		this.rf = t,
		this.gf = e,
		this.bf = o,
		this.af = i
	}
	return t.empty = function () {
		return new t(0, 0, 0, 0)
	},
	t.fromInts = function (e, o, i, r) {
		return (new t).fromInts(e, o, i, r)
	},
	t.fromInt = function (e) {
		return (new t).fromInt(e)
	},
	t.prototype.fromInts = function (e, o, i, r) {
		return this.af = (255 & e) * t.IntToFloat,
		this.rf = (255 & o) * t.IntToFloat,
		this.gf = (255 & i) * t.IntToFloat,
		this.bf = (255 & r) * t.IntToFloat,
		this
	},
	t.prototype.fromInt = function (t) {
		return this.fromInts(t >> 24, t >> 16, t >> 8, t)
	},
	t.prototype.dup = function () {
		return (new t).setArgb(this)
	},
	t.prototype.aInt = function () {
		// t.FloatToInt = 1 / 255
		return Math.floor(this.af * t.FloatToInt)
	},
	t.prototype.rInt = function () {
		return Math.floor(this.rf * t.FloatToInt)
	},
	t.prototype.gInt = function () {
		return Math.floor(this.gf * t.FloatToInt)
	},
	t.prototype.bInt = function () {
		return Math.floor(this.bf * t.FloatToInt)
	},
	t.prototype.toInt = function () {
		return (255 & this.aInt()) << 24 | (255 & this.rInt()) << 16 | (255 & this.gInt()) << 8 | 255 & this.bInt()
	},
	t.prototype.toRgbCss = function () {
		return "rgb(" + this.rInt() + "," + this.gInt() + "," + this.bInt() + ")"
	},
	t.prototype.toRgbaCss = function () {
		return "rgba(" + this.rInt() + "," + this.gInt() + "," + this.bInt() + "," + this.af + ")"
	},
	t.prototype.clamp = function () {
		return this.af = Math.max(0, Math.min(1, this.af)),
		this.rf = Math.max(0, Math.min(1, this.rf)),
		this.gf = Math.max(0, Math.min(1, this.gf)),
		this.bf = Math.max(0, Math.min(1, this.bf)),
		this
	},
	t.prototype.scale = function (t) {
		return this.af *= t,
		this.rf *= t,
		this.gf *= t,
		this.bf *= t,
		this
	},
	t.prototype.normalize = function () {
		var t = this.norm();
		return t > 0 && this.scale(1 / t),
		t
	},
	t.prototype.normalized = function () {
		var t = this.norm();
		return t > 0 && this.scale(1 / t),
		this
	},
	t.prototype.normSqr = function () {
		return this.af * this.af + this.rf * this.rf + this.gf * this.gf + this.bf * this.bf
	},
	t.prototype.norm = function () {
		return Math.sqrt(this.af * this.af + this.rf * this.rf + this.gf * this.gf + this.bf * this.bf);
	},
	t.prototype.setArgb = function (t) {
		return this.af = t.af,
		this.rf = t.rf,
		this.gf = t.gf,
		this.bf = t.bf,
		this
	},
	t.prototype.set = function (t, e, o, i) {
		return this.af = t,
		this.rf = e,
		this.gf = o,
		this.bf = i,
		this
	},
	t.prototype.plusEquals = function (t) {
		return this.af += t.af,
		this.rf += t.rf,
		this.gf += t.gf,
		this.bf += t.bf,
		this
	},
	t.prototype.minusEquals = function (t) {
		return this.af -= t.af,
		this.rf -= t.rf,
		this.gf -= t.gf,
		this.bf -= t.bf,
		this
	},
	t.prototype.timesEquals = function (t) {
		return this.af *= t,
		this.rf *= t,
		this.gf *= t,
		this.bf *= t,
		this
	},
	t.prototype.dot = function (t) {
		return this.af * t.af + this.rf * t.rf + this.gf * t.gf + this.bf * t.bf
	},
	t.prototype.grayscale = function () {
		return .299 * this.rf + .587 * this.gf + .114 * this.bf
	},
	t.prototype.desaturate = function () {
		var t = this.grayscale();
		return this.rf = this.gf = this.bf = t,
		this
	},
	t.prototype.desaturateEvenly = function () {
		var t = (this.rf + this.gf + this.bf) / 3;
		return this.rf = this.gf = this.bf = t,
		this
	},
	t.prototype.mixWith = function (t, e) {
		if (this.af + t.af == 0)
			this.set(0, 0, 0, 0);
		else {
			var o = this.af * e + t.af * (1 - e);
			this.rf = (this.rf * this.af * e + t.rf * t.af * (1 - e)) / o,
			this.gf = (this.gf * this.af * e + t.gf * t.af * (1 - e)) / o,
			this.bf = (this.bf * this.af * e + t.bf * t.af * (1 - e)) / o,
			this.af = o
		}
		return this
	},
	t.FloatToInt = 255,
	t.IntToFloat = 1 / t.FloatToInt,
	t
}
(), ColorMatrix = function () {
	function t(t, e, o, i, r, s, n, a, l) {
		this.a00 = t,
		this.a01 = e,
		this.a02 = o,
		this.a10 = i,
		this.a11 = r,
		this.a12 = s,
		this.a20 = n,
		this.a21 = a,
		this.a22 = l
	}
	return t.empty = function () {
		return new t(1, 0, 0, 0, 1, 0, 0, 0, 1)
	},
	t.diag = function (e, o, i) {
		return new t(o, 0, 0, 0, o, 0, 0, 0, i)
	},
	t.buildWhiteBalancerFromGrayColorSampleBradford = function (e) {
		var o = t.SrgbToBradford.times(e),
		i = t.SrgbToBradford.times(e.dup().desaturate()),
		r = t.diag((i.rf + t.Epsilon) / (o.rf + t.Epsilon), (i.gf + t.Epsilon) / (o.gf + t.Epsilon), (i.bf + t.Epsilon) / (o.bf + t.Epsilon));
		return t.bradfordToSrgb.dup().timesEquals(r).timesEquals(t.SrgbToBradford)
	},
	t.buildWhiteBalancerFromGrayColorSampleXyz = function (e) {
		var o = t.SrgbToXyz.times(e),
		i = t.SrgbToXyz.times(e.dup().desaturate()),
		r = t.diag(i.rf / o.rf, i.gf / o.gf, i.bf / o.bf);
		return t.bradfordToSrgb.dup().timesEquals(r).timesEquals(t.SrgbToBradford)
	},
	t.prototype.dup = function () {
		return new t(this.a00, this.a01, this.a02, this.a10, this.a11, this.a12, this.a20, this.a21, this.a22)
	},
	t.prototype.set = function (t, e, o, i, r, s, n, a, l) {
		this.a00 = t,
		this.a01 = e,
		this.a02 = o,
		this.a10 = i,
		this.a11 = r,
		this.a12 = s,
		this.a20 = n,
		this.a21 = a,
		this.a22 = l
	},
	t.prototype.matrixMatrixMultiply = function (t, e) {
		e.set(this.a00 * t.a00 + this.a01 * t.a10 + this.a02 * t.a20, this.a00 * t.a01 + this.a01 * t.a11 + this.a02 * t.a21, this.a00 * t.a02 + this.a01 * t.a12 + this.a02 * t.a22, this.a10 * t.a00 + this.a11 * t.a10 + this.a12 * t.a20, this.a10 * t.a01 + this.a11 * t.a11 + this.a12 * t.a21, this.a10 * t.a02 + this.a11 * t.a12 + this.a12 * t.a22, this.a20 * t.a00 + this.a21 * t.a10 + this.a22 * t.a20, this.a20 * t.a01 + this.a21 * t.a11 + this.a22 * t.a21, this.a20 * t.a02 + this.a21 * t.a12 + this.a22 * t.a22)
	},
	t.prototype.timesMatrix = function (e) {
		var o = t.empty();
		return this.matrixMatrixMultiply(e, o),
		o
	},
	t.prototype.timesEquals = function (t) {
		return this.matrixMatrixMultiply(t, this),
		this
	},
	t.prototype.matrixVectorMultiply = function (t, e) {
		e.rf = this.a00 * t.rf + this.a01 * t.gf + this.a02 * t.bf,
		e.gf = this.a10 * t.rf + this.a11 * t.gf + this.a12 * t.bf,
		e.bf = this.a20 * t.rf + this.a21 * t.gf + this.a22 * t.bf
	},
	t.prototype.times = function (t) {
		var e = ArgbFloat.empty();
		return this.matrixVectorMultiply(t, e),
		e
	},
	t.SrgbToXyz = new t(.4124564, .3575761, .1804375, .2126729, .7151522, .072175, .0193339, .119192, .9503041),
	t.XyzTosRgb = new t(3.2404542, -1.5371385,  - .4985314,  - .969266, 1.8760108, .041556, .0556434,  - .2040259, 1.0572252),
	t.BradfordMa = new t(.8951, .2664,  - .1614,  - .7502, 1.7135, .0367, .0389,  - .0685, 1.0296),
	t.BradfordMaInv = new t(.9869929,  - .1470543, .1599627, .4323053, .5183603, .0492912,  - .0085287, .0400428, .9684867),
	t.SrgbToBradford = t.BradfordMa.timesMatrix(t.SrgbToXyz),
	t.bradfordToSrgb = t.XyzTosRgb.timesMatrix(t.BradfordMaInv),
	t.Epsilon = 1e-6,
	t
}
(), RadioItem = function () {
	function t(t, e) {
		this.id = t,
		this.value = e
	}
	return t
}
(), RadioGroup = function () {
	function t(t) {
		this.items = t
	}
	return t.prototype.update = function (t) {
		for (var e = 0; e < this.items.length; e++) {
			var o = this.items[e];
			o.value == t && o.id.$().button("toggle")
		}
	},
	t
}
(), RadioModule;
!function (t) {
	function e(t, e) {
		t.id.$().click(function () {
			e(t.value)
		})
	}
	function o(t, o) {
		for (var i = 0; i < t.items.length; i++)
			e(t.items[i], o)
	}
	t.registerRadioGroup = o
}
(RadioModule || (RadioModule = {}));
var KeyRepeater = function () {
	function t(t, e, o, i, r) {
		void 0 === i && (i = function () {}),
		void 0 === r && (r = function () {}),
		this.action = t,
		this.delay = e,
		this.firstDelayMultiplier = o,
		this.ondown = i,
		this.onup = r,
		this.timer = -1
	}
	return t.prototype.repeat = function () {
		var t = this;
		this.action(),
		this.timer = setTimeout(function () {
				t.repeat()
			}, this.delay)
	},
	t.prototype.up = function () {
		this.timer != -1 && (this.onup && this.onup(),
			clearTimeout(this.timer),
			this.timer = -1)
	},
	t.prototype.down = function () {
		var t = this;
		this.timer == -1 && (this.ondown && this.ondown(),
			this.action(),
			this.timer = setTimeout(function () {
					t.repeat()
				}, this.delay * this.firstDelayMultiplier))
	},
	t
}
(), FileDropper;
!function (t) {
	function e(t) {
		function e() {
			r = !1,
			h.monitor_drag && h.hover_class_on && h.hover_class && h.monitor_drag.$().off(i),
			h.monitor_file_input && h.monitor_file_input.$().off(i),
			h.monitor_paste && h.monitor_paste.$().off(i),
			h.focusPasteOnCtrlV && $(window).off(i)
		}
		function s(t, o) {
			r && (null === t || void 0 === t || 0 === t.length ? h.error(Tr.s(o + " a non-file input")) : (h.drop.call(this, t),
					h.dropOnce && e()))
		}
		function n(t) {
			return a(t, !1),
			s(t.originalEvent.dataTransfer.files, "Dropped"),
			!1
		}
		function a(t, e) {
			clearTimeout(o),
			t.stopImmediatePropagation(),
			t.preventDefault(),
			h.hover_class_on.$().toggleClass(h.hover_class.name(), e)
		}
		function l(t) {
			a(t, !0)
		}
		function p(t) {
			a(t, !0),
			t.originalEvent.dataTransfer.dropEffect = r ? "copy" : "none"
		}
		function c(t) {
			o = setTimeout(function () {
					a(t, !1)
				}, 100)
		}
		function u(t) {
			if (r) {
				var e = t.originalEvent,
				o = e.clipboardData;
				if (o && o.files && o.files.length > 0)
					s(o.files, "Pasted");
				else if (o && !o.items)
					h.error(Tr.s("Terribly sorry, it seems like your browser doesn't fully support pasting of images yet?") + "\n\n" + Tr.s("Paste should work in at least Chrome and Microsoft Edge, with Firefox working on it. "));
				else if (o && o.items && o.items.length > 0 && o.types && o.types.length == o.items.length) {
					for (var i = [], n = 0, a = 0; a < o.items.length; a++)
						if ("Files" == o.types[a]) {
							var l = o.items[a];
							i[n] = l.getAsFile(),
							Unsafe.set(i[n], "name", "Pasted_" + Date.now()),
							n++
						}
					n > 0 ? s(i, "Pasted") : h.error(Tr.s("Pasted something that wasn't an image?"))
				} else
					h.error(Tr.s("Pasted something that wasn't an image?"));
				d && (d = !1,
					h.monitor_paste.$().blur()),
				t.preventDefault()
			}
		}
		var d = !1,
		h = $.extend({}, {
				hover_class_on: t.monitor_drag,
				focusPasteOnCtrlV: !!t.monitor_paste
			}, t);
		return h.monitor_drag && h.hover_class_on && h.hover_class && h.monitor_drag.$().on("drop" + i, n).on("dragenter" + i, l).on("dragover" + i, p).on("dragleave" + i, c),
		h.monitor_file_input && h.monitor_file_input.$().on("change" + i, function (t) {
			s(t.originalEvent.target.files, "Picked")
		}),
		h.monitor_paste && (h.monitor_paste.$().on("paste" + i, u),
			h.focusPasteOnCtrlV && $(window).on("keydown" + i, function (t) {
				t.ctrlKey && 86 == t.keyCode && ($(document.activeElement).is("input") || (h.monitor_paste.$().focus(),
						d = !0))
			})), {
			disable: e
		}
	}
	var o,
	i = ".FileDropper",
	r = !0;
	t.initialize = e;
	try {
		XMLHttpRequest.prototype.hasOwnProperty("sendAsBinary") || Unsafe.set(XMLHttpRequest.prototype, "sendAsBinary", function (t) {
			function e(t) {
				return 255 & t.charCodeAt(0)
			}
			var o = Array.prototype.map.call(t, e),
			i = new Uint8Array(o);
			this.send(i.buffer)
		})
	} catch (t) {}
}
(FileDropper || (FileDropper = {}));
var RetryState;
!function (t) {
	t[t.Trying = 0] = "Trying",
	t[t.Success = 1] = "Success",
	t[t.FailureSilent = 2] = "FailureSilent",
	t[t.FailureShown = 3] = "FailureShown",
	t[t.Stopped = 4] = "Stopped"
}
(RetryState || (RetryState = {}));
var RetryInstance = function () {
	function t(t) {
		var e = this;
		this.opts = t,
		this.tries = 0,
		this.triesEver = 0,
		this.lastErrorMessage = "",
		this.isTrying = !1,
		this.state = RetryState.Trying,
		this.timeout = 0,
		this.executionStopped = function () {
			e.state = RetryState.Stopped,
			e.isTrying = !1,
			e.tries = 0,
			e.lastErrorMessage = "",
			RetryDialog.deregister(e)
		},
		this.executionSuccess = function () {
			e.state = RetryState.Success,
			e.isTrying = !1,
			e.tries = 0,
			e.lastErrorMessage = "",
			e.opts.success(),
			RetryDialog.deregister(e)
		},
		this.executionError = function (t) {
			e.isTrying = !1,
			e.lastErrorMessage = t.substr(0, 200),
			e.tries < e.opts.numberOfSilentRetriesBeforeShowingErrorToUser ? (e.state = RetryState.FailureSilent,
				e.clearTimeout(),
				e.timeout = setTimeout(e.tryExecute, e.opts.millisBetweenSilentRetries)) : e.opts.giveUpAfterSilentRetries ? e.state = RetryState.FailureSilent : (e.state = RetryState.FailureShown,
					RetryDialog.register(e))
		},
		this.executionPunt = function () {
			e.isTrying = !1,
			e.state = RetryState.FailureSilent,
			e.clearTimeout(),
			e.timeout = setTimeout(e.tryExecute, 100)
		},
		this.tryExecute = function () {
			if (e.clearTimeout(),
				!e.isTrying) {
				e.state = RetryState.Trying,
				e.isTrying = !0,
				e.tries += 1,
				e.triesEver += 1;
				try {
					e.opts.execute(e.executionSuccess, e.executionError)
				} catch (t) {
					e.tries = Math.max(e.tries, e.opts.numberOfSilentRetriesBeforeShowingErrorToUser),
					setTimeout(function () {
						e.executionError(t.toString())
					}, 0)
				}
				return !0
			}
			return !1
		},
		this.timeout = setTimeout(this.tryExecute, 0)
	}
	return t.prototype.clearTimeout = function () {
		this.timeout && (clearTimeout(this.timeout),
			this.timeout = 0)
	},
	t.prototype.makeHtmlRow = function () {
		var t = $(document.createElement("tr"));
		return t.append(Util.makeElement("td", this.opts.label)),
		t.append(Util.makeElement("td", this.lastErrorMessage)),
		t
	},
	t.prototype.toString = function () {
		return "RetryInstance(" + this.opts.label + ", tries: " + this.tries + " (" + this.triesEver + "), err: '" + this.lastErrorMessage + "', isTrying: " + this.isTrying + ", state: " + RetryState[this.state] + ")"
	},
	t
}
(), RetryDialog;
!function (t) {
	function e() {
		var t = Css.RetryDialog.Body.$();
		t.empty();
		var e = $(document.createElement("tr"));
		e.append(Util.makeElement("th", Tr.s("Task"))),
		e.append(Util.makeElement("th", Tr.s("Error"))),
		t.append(e);
		for (var o = 0; o < n.length; o++)
			t.append(n[o].makeHtmlRow())
	}
	function o() {
		c = Date.now(),
		null != p && (clearInterval(p),
			p = null),
		u *= 2,
		u > l && (u = l),
		Css.RetryDialog.Countdown.$().text(Tr.s("Retrying now..."));
		for (var t = 0; t < n.length; t++)
			n[t].tryExecute()
	}
	function i() {
		var t = Date.now(),
		i = Math.round((c + u - t) / 1e3);
		i <= 0 ? o() : Css.RetryDialog.Countdown.$().text(Tr.s("Retrying in {0} seconds...", i.toString())),
		e()
	}
	function r(t) {
		n.indexOf(t) < 0 && (Util.gaTrack("ErrorShown", t.opts.label, t.lastErrorMessage, null),
			n.push(t),
			e()),
		Util.modal(Css.RetryDialog.Dialog.css()),
		d = !0,
		null == p && (c = Date.now(),
			p = setInterval(i, 1e3))
	}
	function s(t) {
		var o = n.indexOf(t);
		o >= 0 && (n.splice(o, 1),
			e()),
		u = a,
		c = Date.now(),
		0 == n.length && d && Css.RetryDialog.Dialog.$().modal("hide")
	}
	var n = [],
	a = 5e3,
	l = 36e5,
	p = null,
	c = 0,
	u = a,
	d = !1;
	t.register = r,
	t.deregister = s,
	$(function () {
		Css.RetryDialog.RetryNowButton.$().click(function () {
			o(),
			u = a
		})
	})
}
(RetryDialog || (RetryDialog = {}));
var FileUploader;
!function (t) {
	function e(t, e, o) {
		var i = $.extend({}, s, e),
		r = new XMLHttpRequest,
		n = r.upload,
		a = new FormData;
		$.each(i.headers, function (t, e) {
			r.setRequestHeader(t, e)
		}),
		$.each(i.data, function (t, e) {
			a.append(t, e)
		}),
		a.append(i.paramname, t);
		var l = 0;
		n.onprogress = function (t) {
			if (t.lengthComputable) {
				var e = Math.round(100 * t.loaded / t.total);
				l !== e && (l = e,
					i.progress(l))
			}
		},
		n.onerror = function (t) {
			o.errorHandler(Util.formatXhrError(r, void 0))
		},
		n.onabort = function (t) {
			o.errorHandler(Util.formatXhrError(r, "abort"))
		},
		n.onload = function () {},
		r.withCredentials = !!i.withCredentials,
		r.onload = function () {
			r.responseText && (r.status < 200 || r.status > 299 ? o.errorHandler(r.status + " - " + r.statusText) : (i.progress(100),
					o.successHandler(r.responseText)))
		},
		r.open("POST", i.url, !0),
		r.send(a)
	}
	function o(t, o, i, r) {
		i.data = {
			key: o.key,
			AWSAccessKeyId: o.accessKeyId,
			acl: "private",
			success_action_status: 201,
			policy: o.policy,
			signature: o.signature,
			"Content-Type": t.type,
			"Cache-Control": i.maxAge ? "max-age=" + i.maxAge : "no-cache"
		},
		e(t, i, r)
	}
	function i(t, e, i) {
		var r = $.extend({}, s, i);
		new RetryInstance({
			label: r.label,
			execute: function (i, s) {
				o(t, e, r, {
					errorHandler: s,
					successHandler: i
				})
			},
			success: function () {
				r.success()
			},
			numberOfSilentRetriesBeforeShowingErrorToUser: r.tries,
			millisBetweenSilentRetries: 1e3,
			giveUpAfterSilentRetries: r.giveUpAfterSilentRetries
		})
	}
	function r(t, e, o) {
		i(new Blob([JSON.stringify(t)], {
				type: "application/json"
			}), e, o)
	}
	var s = {
		label: "Unknown",
		url: "",
		tries: 3,
		paramname: "file",
		withCredentials: !1,
		data: {},
		headers: {},
		progress: function (t) {},
		success: function () {},
		giveUpAfterSilentRetries: !1
	};
	t.uploadS3WithRetry = i,
	t.uploadS3JsonWithRetry = r
}
(FileUploader || (FileUploader = {}));
var CanvasModule;
!function (t) {
	function e(t) {
		var e = t.naturalWidth,
		o = t.naturalHeight,
		i = new CanvasEx(e, o);
		return i.wasShrunk = !1,
		i.context().setGlobalAlpha(1),
		i.context().setFillStyle("rgb(255,255,255)"),
		i.context().fillRect(0, 0, e, o),
		i.context().context.drawImage(t, 0, 0, e, o),
		i
	}
	t.flattenImage = e
}
(CanvasModule || (CanvasModule = {}));
var CanvasContextEx = function () {
	function t(t) {
		this.context = t,
		this.largeFont = "bold 18px 'Helvetica Neue', Helvetica, Arial, sans-serif",
		this.smallFont = "bold 12px 'Helvetica Neue', Helvetica, Arial, sans-serif",
		this.context.msImageSmoothingEnabled = !1,
		this.context.mozImageSmoothingEnabled = !1,
		this.context.webkitImageSmoothingEnabled = !1,
		this.context.imageSmoothingEnabled = !1
	}
	return t.prototype.createPattern = function (t, e) {
		return this.context.createPattern(t, e)
	},
	t.prototype.setStrokeStyle = function (t) {
		this.context.strokeStyle = t
	},
	t.prototype.setLineWidth = function (t) {
		this.context.lineWidth = t
	},
	t.prototype.setLineJoin = function (t) {
		this.context.lineJoin = t
	},
	t.prototype.setLineCap = function (t) {
		this.context.lineCap = t
	},
	t.prototype.strokeText = function (t, e, o) {
		this.context.strokeText(t, e, o)
	},
	t.prototype.fillText = function (t, e, o) {
		this.context.fillText(t, e, o)
	},
	t.prototype.measureText = function (t) {
		return this.context.measureText(t)
	},
	t.prototype.setFont = function (t) {
		this.context.font = t
	},
	t.prototype.save = function () {
		this.context.save()
	},
	t.prototype.stroke = function () {
		this.context.stroke()
	},
	t.prototype.strokeRect = function (t, e, o, i) {
		this.context.strokeRect(t, e, o, i)
	},
	t.prototype.createRadialGradient = function (t, e, o, i, r, s) {
		return this.context.createRadialGradient(t, e, o, i, r, s)
	},
	t.prototype.createLinearGradient = function (t, e, o, i) {
		return this.context.createLinearGradient(t, e, o, i)
	},
	t.prototype.scale = function (t, e) {
		this.context.scale(t, e)
	},
	t.prototype.translate = function (t, e) {
		this.context.translate(t, e)
	},
	t.prototype.moveTo = function (t, e) {
		this.context.moveTo(t, e)
	},
	t.prototype.lineTo = function (t, e) {
		this.context.lineTo(t, e)
	},
	t.prototype.quadraticCurveTo = function (t, e, o, i) {
		this.context.quadraticCurveTo(t, e, o, i)
	},
	t.prototype.rotate = function (t) {
		this.context.rotate(t)
	},
	// 重点，画路径的时候调用了这里
	t.prototype.beginPath = function () {
		this.context.beginPath()
	},
	t.prototype.closePath = function () {
		this.context.closePath()
	},
	t.prototype.arc = function (t, e, o, i, r, s) {
		this.context.arc(t, e, o, i, r, s)
	},
	t.prototype.rect = function (t, e, o, i) {
		this.context.rect(t, e, o, i)
	},
	t.prototype.clip = function () {
		this.context.clip()
	},
	t.prototype.clipBlock = function (t, e, o, i, r, s) {
		t ? (this.save(),
			this.beginPath(),
			this.rect(e, o, i - e, r - o),
			this.clip(),
			s(),
			this.restore()) : s()
	},
	t.prototype.rotatedFrame = function (t, e, o) {
		0 != t && (this.save(),
			this.translate(e.x, e.y),
			this.rotate(t),
			this.translate(-e.x, -e.y)),
		o(),
		0 != t && this.restore()
	},
	t.prototype.restore = function () {
		this.context.restore()
	},
	t.prototype.setFillStyle = function (t) {
		this.context.fillStyle = t
	},
	t.prototype.setGlobalAlpha = function (t) {
		this.context.globalAlpha = t
	},
	t.prototype.clearRect = function (t, e, o, i) {
		this.context.clearRect(t, e, o, i)
	},
	t.prototype.createImageData = function (t, e) {
		return this.context.createImageData(t, e)
	},
	t.prototype.getImageData = function (t, e, o, i) {
		return this.context.getImageData(t, e, o, i)
	},
	t.prototype.getImageDataFull = function () {
		return this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height)
	},
	t.prototype.putImageData = function (t, e, o) {
		this.context.putImageData(t, e, o)
	},
	t.prototype.putImageData2 = function (t, e, o, i, r, s, n) {
		this.context.putImageData(t, e, o, i, r, s, n)
	},
	t.prototype.fillRect = function (t, e, o, i) {
		this.context.fillRect(t, e, o, i)
	},
	t.prototype.drawImage = function (t, e, o) {
		this.context.drawImage(t, e, o)
	},
	t.prototype.drawImage2 = function (t, e, o, i, r) {
		this.context.drawImage(t, e, o, i, r)
	},
	t.prototype.drawImage3 = function (t, e, o, i, r, s, n, a, l) {
		this.context.drawImage(t, e, o, i, r, s, n, a, l)
	},
	t.prototype.drawCanvasEx = function (t, e, o) {
		this.context.drawImage(t.element, e, o)
	},
	t.prototype.drawCanvasEx2 = function (t, e, o, i, r) {
		this.context.drawImage(t.element, e, o, i, r)
	},
	t.prototype.drawCanvasEx3 = function (t, e, o, i, r, s, n, a, l) {
		this.context.drawImage(t.element, e, o, i, r, s, n, a, l)
	},
	t.prototype.circle = function (t, e, o) {
		this.context.beginPath(),
		this.context.arc(t, e, o, 0, 2 * Math.PI, !0)
	},
	t.prototype.fillCircle = function (t, e, o, i) {
		i && (this.context.fillStyle = i),
		this.circle(t, e, o),
		this.context.fill()
	},
	t.prototype.fillSquare = function (t, e, o, i) {
		i && (this.context.fillStyle = i),
		this.context.fillRect(t - o, e - o, 2 * o, 2 * o)
	},
	t.prototype.strokeCircle = function (t, e, o, i) {
		i && (this.context.strokeStyle = i),
		this.circle(t, e, o),
		this.context.stroke()
	},
	t.prototype.strokeLine = function (t, e, o, i, r, s) {
		r && (this.context.lineWidth = r),
		s && (this.context.strokeStyle = s),
		this.context.beginPath(),
		this.context.moveTo(t, e),
		this.context.lineTo(o, i),
		this.context.stroke()
	},
	t.prototype.triangle = function (t, e, o, i, r, s) {
		var n = 120 * Math.PI / 180;
		r = r ? r : i,
		s = s ? s : r,
		this.context.moveTo(t + i * Math.cos(o), e + i * Math.sin(o)),
		this.context.lineTo(t + r * Math.cos(o + n), e + r * Math.sin(o + n)),
		this.context.lineTo(t + s * Math.cos(o + 2 * n), e + s * Math.sin(o + 2 * n)),
		this.context.closePath()
	},
	t.prototype.strokeEx = function (t, e, o, i) {
		o && (this.context.lineJoin = o),
		i && (this.context.lineCap = i),
		this.context.lineWidth = t,
		this.context.strokeStyle = e,
		this.context.stroke()
	},
	t.prototype.fillEx = function (t) {
		this.context.fillStyle = t,
		this.context.fill()
	},
	t.prototype.drawCenteredText = function (t, e) {
		var o = t,
		i = t.length;
		this.setGlobalAlpha(1),
		this.setFont(this.largeFont);
		var r = this.measureText(t).width,
		s = this.context.canvas.width,
		n = s - 20;
		r > n && (this.setFont(this.smallFont),
			r = this.measureText(t).width,
			r > n && (t = Util.centerElide(o, .75 * i),
				r = this.measureText(t).width,
				r > n && (t = Util.centerElide(o, .5 * i),
					r = this.measureText(t).width,
					r > n && (t = Util.centerElide(o, .25 * i),
						r = this.measureText(t).width))));
		var a = (s - r) / 2;
		this.setStrokeStyle("#FFFFFF"),
		this.setLineWidth(3),
		this.setLineJoin("bevel"),
		this.strokeText(t, a, e),
		this.setFillStyle("#444444"),
		this.fillText(t, a, e)
	},
	t
}
(), CanvasEx = function () {
	function t(t, e, o) {
		void 0 === o && (o = !1),
		this.w = t,
		this.h = e,
		this.highDpiRatio = 1,
		this.element = document.createElement("canvas"),
		this.$element = $(this.element),
		this.setSize(t, e),
		this.wasShrunk = !1,
		this.contextCache = null
	}
	return t.prototype.empty = function () {},
	t.prototype.width = function () {
		return this.w
	},
	t.prototype.height = function () {
		return this.h
	},
	t.prototype.context = function () {
		return null == this.contextCache && (this.contextCache = new CanvasContextEx(this.element.getContext("2d")),
			1 != this.highDpiRatio && this.contextCache.scale(this.highDpiRatio, this.highDpiRatio)),
		this.contextCache
	},
	t.prototype.checkSetSize = function (t, e) {
		return (this.w != t || this.h != e) && (this.setSize(t, e),
			!0)
	},
	t.prototype.setSize = function (t, e) {
		t > 0 && e > 0 && (this.w = t,
			this.h = e,
			this.element.style.width = t + "px",
			this.element.style.height = e + "px",
			this.element.width = this.w * this.highDpiRatio,
			this.element.height = this.h * this.highDpiRatio,
			this.contextCache = null)
	},
	t.prototype.clearAll = function () {
		this.context().clearRect(0, 0, this.width(), this.height())
	},
	t.prototype.toDataURL = function (t, e) {
		return this.element.toDataURL(t, e)
	},
	t.prototype.toBlob = function (t, e) {
		return Util.dataUrlToBlob(this.toDataURL(t, e))
	},
	t.prototype.toFile = function (t, e, o) {
		return Util.blobToFile(this.toBlob(t, e), o)
	},
	t.prototype.fillAliasedCircle = function (t, e, o, i) {
		for (var r = this.context().getImageData(0, 0, this.width(), this.height()), s = o * o, n = Math.max(0, Math.floor(t - o)), a = Math.min(this.width() - 1, Math.ceil(t + o)), l = Math.max(0, Math.floor(e - o)), p = Math.min(this.height() - 1, Math.ceil(e + o)), c = l; c <= p; c++)
			for (var u = n; u <= a; u++)
				if ((u + .5 - t) * (u + .5 - t) + (c + .5 - e) * (c + .5 - e) <= s) {
					var d = 4 * (c * this.width() + u);
					r.data[d] = i[0],
					r.data[d + 1] = i[1],
					r.data[d + 2] = i[2],
					r.data[d + 3] = i[3]
				}
		this.context().putImageData(r, 0, 0)
	},
	t
}
(), YoWorker = function () {
	function t(t, e) {
		this.name = t,
		this.workerFunction = e
	}
	return t.getBasics = function () {
		return yoWorkerPostMessage.toString()
	},
	t.prototype.ensureWorker = function (e) {
		var o = this.workerFunction.toString(),
		i = new Blob(["'use strict';\n" + t.getBasics() + ";\n(" + o + ")();"], {
				type: "text/javascript"
			}),
		r = URL.createObjectURL(i);
		this.worker = new Worker(r),
		this.worker.addEventListener("error", function (t) {
			Util.gaTrack("YoWorker", "Error", t.filename + ":" + t.lineno + ":" + t.colno + ", '" + t.message + "', '" + t.error + "'")
		}),
		this.worker.addEventListener("message", e)
	},
	t.prototype.postMessage = function (t, e, o) {
		try {
			this.worker || this.ensureWorker(t);
			try {
				this.worker.postMessage(e, o)
			} catch (t) {
				this.worker.postMessage(e)
			}
		} catch (t) {
			throw Util.gaTrack("YoWorker", "Exception", "'" + t + "', '" + t.stack + "'"),
			t
		}
	},
	t
}
(), CanvasShrinker;
!function (t) {
	function e(t) {
		var e = t.data;
		s.contains(e.canvasId) && s.get(e.canvasId).shrinkWithWorkerResultHandler(e)
	}
	function o(t) {
		var e = new n("cs_" + r++, t);
		s.put(e.canvasId, e),
		e.process()
	}
	var i = !0,
	r = 0,
	s = new HashMap,
	n = function () {
		function t(t, e) {
			if (this.canvasId = t,
				this.spec = e,
				this.failSafeTimeout = void 0,
				this.croppedCanvas = this.spec.inputCanvas,
				this.spec.crop) {
				var o = this.spec.crop,
				i = o.right - o.left,
				r = o.bottom - o.top;
				if (0 != o.top || 0 != o.left || i != this.spec.inputCanvas.width() || r != this.spec.inputCanvas.height()) {
					var s = new CanvasEx(i, r);
					s.context().drawCanvasEx3(this.spec.inputCanvas, o.left, o.top, s.width(), s.height(), 0, 0, s.width(), s.height()),
					this.croppedCanvas = s
				}
			}
			var n = this.croppedCanvas.width(),
			a = this.croppedCanvas.height();
			this.wOut = n,
			this.hOut = a;
			var l = n * a;
			l > this.spec.maxNumPixels && (this.hOut = Math.floor(Math.sqrt(this.spec.maxNumPixels * a / n)),
				this.wOut = Math.floor(this.spec.maxNumPixels / this.hOut))
		}
		return t.prototype.needsReencodingAsPng = function () {
			var t = this.spec.inputFile.type;
			return Util.endsWith(t, "gif") || Util.endsWith(t, "bmp") || Util.endsWith(t, "tiff")
		},
		t.prototype.reencodeAsPng = function () {
			return this.croppedCanvas.toFile("image/png", 1, Util.dropExtension(this.spec.inputFile.name) + ".png")
		},
		t.prototype.shrinkingNeeded = function () {
			return this.wOut != this.croppedCanvas.width() || this.hOut != this.croppedCanvas.height()
		},
		t.prototype.createOutputCanvas = function () {
			return new CanvasEx(this.wOut, this.hOut)
		},
		t.prototype.shrinkWithWorker = function () {
			var t = this;
			try {
				var o = this.croppedCanvas.context().getImageData(0, 0, this.croppedCanvas.width(), this.croppedCanvas.height()).data,
				i = {
					canvasId: this.canvasId,
					wIn: this.croppedCanvas.width(),
					hIn: this.croppedCanvas.height(),
					dataIn: o,
					wOut: this.wOut,
					hOut: this.hOut
				};
				this.failSafeTimeout = setTimeout(function () {
						return t.shrinkWithWorkerFailSafe("fail-safe timeout reached")
					}, 1e4),
				this.spec.worker.postMessage(e, i, [o.buffer])
			} catch (t) {
				this.shrinkWithWorkerFailSafe("exception in spawning worker or sending work message")
			}
		},
		t.prototype.shrinkWithWorkerResultHandler = function (t) {
			if (t.success && t.wOut == this.wOut && t.hOut == this.hOut && null != t.dataOut && t.dataOut.length > 0) {
				Util.gaTrack("WebWorker", "Downsample", "Succeeded", 1);
				var e = this.createOutputCanvas(),
				o = e.context().createImageData(e.width(), e.height());
				o.data.set(t.dataOut),
				e.context().putImageData(o, 0, 0),
				e.wasShrunk = !0,
				this.completed(e)
			} else
				this.shrinkWithWorkerFailSafe("Worker reports failure")
		},
		t.prototype.shrinkWithWorkerFailSafe = function (t) {
			Util.gaTrack("WebWorker", "Downsample", "Failed", 0),
			i = !1,
			this.shrinkWithoutWorker()
		},
		t.prototype.shrinkWithoutWorker = function () {
			var t = this.createOutputCanvas();
			t.context().drawCanvasEx2(this.croppedCanvas, 0, 0, t.width(), t.height()),
			t.wasShrunk = !0,
			this.completed(t)
		},
		t.prototype.produceThumbnail = function (t) {
			if (this.spec.thumbnailSize) {
				var e = this.spec.thumbnailSize.w,
				o = this.spec.thumbnailSize.h,
				i = new CanvasEx(e, o);
				i.context().setFillStyle("rgb(255,255,255)"),
				i.context().fillRect(0, 0, e, o);
				var r = e / t.width(),
				s = o / t.height();
				if (r < s) {
					var n = s * t.width(),
					a =  - (n - e) / 2,
					l = 0;
					i.context().context.drawImage(t.element, a, l, n, o)
				} else {
					var p = r * t.height(),
					l = (p - o) / 2;
					i.context().context.drawImage(t.element, 0, -l, e, p)
				}
				return i.toBlob("image/jpeg", .9)
			}
			return null
		},
		t.prototype.completed = function (t, e) {
			e || (e = t.toFile("image/jpeg", .95, Util.dropExtension(this.spec.inputFile.name) + ".jpeg")),
			clearTimeout(this.failSafeTimeout),
			this.failSafeTimeout = void 0,
			s.remove(this.canvasId),
			this.spec.completed(e, t, this.produceThumbnail(t))
		},
		t.prototype.process = function () {
			if (this.shrinkingNeeded())
				i && this.spec.worker ? this.shrinkWithWorker() : this.shrinkWithoutWorker();
			else {
				var t = this.spec.inputFile;
				this.spec.inputCanvas == this.croppedCanvas ? this.needsReencodingAsPng() && (t = this.reencodeAsPng()) : t = this.needsReencodingAsPng() ? this.reencodeAsPng() : this.croppedCanvas.toFile(this.spec.inputFile.type, .95, this.spec.inputFile.name),
				this.completed(this.croppedCanvas, t)
			}
		},
		t
	}
	();
	t.process = o
}
(CanvasShrinker || (CanvasShrinker = {}));
// 重要  
// 来自：https://clippingmagic.com/api/images/22775761/bifotfkbdl12vvh69rmvtm0h54mo59n0n8nckpba332r7v46epk4?_=1484895144700
// drawCommands.json：
// https://s3.amazonaws.com/fs.clippingmagic.com/p/images2/167/577/220/drawCommands.json?AWSAccessKeyId=AKIAIE5JSQ2FKZL2FJ4Q&Expires=1485388800&Signature=RusSQ%2FeQlgbGn22iEVwzgW0shHU%3D
var MaskEncoderBinary = function () {
	function t() {
		this.ary = new Uint8Array(1024),
		this.pos = 0
	}
	return t.prototype.resize = function (t) {
		for (var e = new Uint8Array(Math.max(t, 2 * this.ary.length)), o = 0; o < this.pos; o++)
			e[o] = this.ary[o];
		this.ary = e
	},
	t.prototype.reset = function () {
		this.pos = 0
	},
	t.prototype.push = function (t, e) {
		this.ary.length < this.pos + 4 && this.resize(this.pos + 4),
		e -= 1;
		var o = 7 & t | (15 & e) << 4;
		e >>= 4,
		e < 256 ? (this.ary[this.pos++] = o,
			this.ary[this.pos++] = e) : (this.ary[this.pos++] = 8 | o,
			this.ary[this.pos++] = 255 & e,
			e >>= 8,
			this.ary[this.pos++] = 255 & e,
			e >>= 8,
			this.ary[this.pos++] = 255 & e)
	},
	t.prototype.toString = function () {
		return Base64.encode(this.ary, this.pos)
	},
	t.decode = function (t, e) {
		try {
			for (var o, i, r, s, n = Base64.decode(t), a = 0; a < n.length; )
				o = n[a++],
				i = 7 & o,
				s = 8 & o,
				r = o >> 4 & 15,
				r += n[a++] << 4,
				0 != s && (r += n[a++] << 12,
					r += n[a++] << 20),
				r += 1,
				e(i, r)
		} catch (t) {}
	},
	t
}
(), MaskEncoderString = function () {
	function t() {
		this.ary = []
	}
	return t.prototype.reset = function () {
		this.ary.length = 0
	},
	t.prototype.push = function (t, e) {
		this.ary.push("" + t + ":" + e)
	},
	t.prototype.toString = function () {
		return this.ary.join(";")
	},
	t.decode = function (t, e) {
		Util.spliterate(t, ";", function (t) {
			var o = t.split(":"),
			i = 0 | parseInt(o[0]),
			r = 0 | parseInt(o[1]);
			e(i, r)
		})
	},
	t
}
(), PreCrop;
!function (t) {
	function e(e) {
		t.initialized || (t.initialized = !0,
			W = e,
			X = W.inputCanvas.width(),
			N = W.inputCanvas.height(),
			Y.setXy(.5 * X, .5 * N),
			ht.set(0, 0, X, N),
			q = N / X,
			t.lockAspectRatio = !!W.lockAspectRatio,
			t.maxNumMegapixels = W.maxNumMegapixels,
			J = Css.PreCrop.ViewContainer.$(),
			j = new CanvasEx(J.outerWidth(), J.outerHeight()),
			J.append(j.element),
			$(j.element).mousedown(C).mouseup(v).mousemove(w).hover(k, M),
			j.element.addEventListener("touchstart", h),
			j.element.addEventListener("touchmove", g),
			j.element.addEventListener("touchend", f),
			Css.PreCrop.Sidebar.crop_button.$().click(p),
			Css.PreCrop.Sidebar.cancel_button.$().click(l),
			Css.PreCrop.Sidebar.lock_aspect_ratio_button.$().click(s),
			W.maxMaxNumMegapixels ? (Css.PreCrop.Sidebar.MaxNumMegapixels.decrease.$().click(a),
				Css.PreCrop.Sidebar.MaxNumMegapixels.increase.$().click(n)) : (Css.PreCrop.Sidebar.MaxNumMegapixels.decrease.$().hide(),
				Css.PreCrop.Sidebar.MaxNumMegapixels.increase.$().hide()),
			o(X, N, Css.PreCrop.Sidebar.input_image_size_display, Css.PreCrop.Sidebar.input_image_aspect_ratio_display, Css.PreCrop.Sidebar.input_image_megapixels_display),
			$(window).resize(T),
			i(),
			Css.PreCrop.App.$().show(),
			setTimeout(T, 0))
	}
	function o(t, e, o, i, r) {
		o.$().text(t.toFixed(0) + " x " + e.toFixed(0) + " px"),
		i.$().text(Util.formatAspectRatio(Util.fuzzyAspectRatioEx({
					w: t,
					h: e
				}, W.aspectRatios))),
		r.$().text((t * e / B).toFixed(1))
	}
	function i() {
		Css.PreCrop.Sidebar.MaxNumMegapixels.display.$().text(t.maxNumMegapixels + " megapixels"),
		o(Math.round(ht.width()), Math.round(ht.height()), Css.PreCrop.Sidebar.cropped_image_size_display, Css.PreCrop.Sidebar.cropped_image_aspect_ratio_display, Css.PreCrop.Sidebar.cropped_image_megapixels_display),
		Css.PreCrop.Sidebar.lock_aspect_ratio_button.$().prop("checked", t.lockAspectRatio);
		var e = ht.width() * ht.height() / B,
		i = e > t.maxNumMegapixels;
		Css.PreCrop.Sidebar.cropped_image_warning.$().toggle(i),
		Css.PreCrop.Sidebar.cropped_image_success.$().toggle(!i),
		Css.PreCrop.Sidebar.cropped_image_megapixels_display.$().attr("style", i ? "color:red;" : "")
	}
	function r() {
		Css.PreCrop.App.$().hide()
	}
	function s() {
		t.lockAspectRatio = !t.lockAspectRatio,
		m(),
		i()
	}
	function n() {
		t.maxNumMegapixels = Math.min(t.maxNumMegapixels + 1, W.maxMaxNumMegapixels),
		i()
	}
	function a() {
		t.maxNumMegapixels = Math.max(1, t.maxNumMegapixels - 1),
		i()
	}
	function l() {
		$(window).off("beforeunload"),
		location.reload(!0)
	}
	function p() {
		var t = ht.width(),
		e = ht.height();
		t > 0 && e > 0 && null != W.completed && (W.completed(ht),
			r())
	}
	function c(t, e) {
		if (null != t && null != e) {
			nt.set(lt),
			at.set(pt);
			var o = $(j.element).offset();
			return lt.setXy(t - o.left, e - o.top),
			_(lt, pt),
			nt.notEquals(lt) || at.notEquals(pt)
		}
		return !1
	}
	function u() {
		var t = O * it,
		e = Math.abs(pt.x - ht.left) < t,
		o = Math.abs(pt.y - ht.top) < t,
		i = Math.abs(pt.x - ht.right) < t,
		r = Math.abs(pt.y - ht.bottom) < t,
		s = ht.center(),
		n = Math.abs(pt.x - s.x) < t && Math.abs(pt.y - s.y) < t,
		a = pt.x > ht.left - t && pt.x < ht.right + t && pt.y > ht.top - t && pt.y < ht.bottom + t,
		l = null;
		a && (e ? l = o ? Mt : r ? vt : bt : i ? l = o ? St : r ? Ct : mt : o ? l = wt : r ? l = yt : n && (l = kt)),
		d(l)
	}
	function d(t) {
		ft = t,
		null == t ? $(j.element).attr("class", "canvas-view") : $(j.element).attr("class", ft.key + "-tool canvas-view"),
		z()
	}
	function h(t) {
		var e = t.touches.item(0);
		S(e.pageX, e.pageY),
		y(e.pageX, e.pageY),
		t.preventDefault()
	}
	function g(t) {
		var e = t.touches.item(0);
		S(e.pageX, e.pageY),
		t.preventDefault()
	}
	function f(t) {
		b(-1e5, -1e5),
		t.preventDefault()
	}
	function w(t) {
		S(t.pageX, t.pageY)
	}
	function S(t, e) {
		var o = c(t, e);
		if (ct) {
			if (null != ft && o) {
				ht.setFrom(dt),
				ht.moveAnchor(ft.anchor, pt.minus(ut)),
				ht.normalize(),
				ht.left = Math.max(ht.left, 0),
				ht.top = Math.max(ht.top, 0),
				ht.right = Math.min(ht.right, X),
				ht.bottom = Math.min(ht.bottom, N),
				ht.round();
				Math.round(Math.max(0, I - ht.width())),
				Math.round(Math.max(0, I - ht.height()));
				ht.moveAnchorToMinSize(ft.anchor, I, I),
				ht.round(),
				m(),
				i(),
				z()
			}
		} else
			u()
	}
	function m() {
		if (t.lockAspectRatio) {
			var e = Anchor.Center;
			if (null != ft && (e = ft.oppositeAnchor),
				ht.forceAspectRatio(q, e),
				ht.width() > X || ht.height() > N)
				ht.set(0, 0, X, N);
			else {
				var o = Math.max(0, -ht.left) + Math.min(0, X - ht.right),
				i = Math.max(0, -ht.top) + Math.min(0, N - ht.bottom);
				ht.translate(o, i)
			}
			ht.round(),
			z()
		}
	}
	function C(t) {
		y(t.pageX, t.pageY),
		$(window).on("mouseup", v),
		$(window).on("mousemove", w)
	}
	function y(t, e) {
		ct = !0,
		ut.set(pt),
		dt.setFrom(ht),
		c(t, e)
	}
	function v(t) {
		b(t.pageX, t.pageY),
		$(window).off("mouseup", v),
		$(window).off("mousemove", w)
	}
	function b(t, e) {
		ct = !1,
		$(window).off("mouseup", v),
		$(window).off("mousemove", w),
		c(t, e),
		u()
	}
	function M(t) {
		ct || d(null)
	}
	function k(t) {
		ct || (c(t.pageX, t.pageY),
			u())
	}
	function T() {
		null != J && null != j && (Q = J.outerWidth(),
			K = J.outerHeight(),
			j.width() == Q && j.height() == K || j.setSize(Q, K),
			Z = Q - 2 * U,
			tt = K - 2 * U,
			tt / Z > N / X ? (et.left = U,
				rt = Z,
				st = N / X * rt,
				et.top = U + .5 * (tt - st)) : (et.top = U,
				st = tt,
				rt = X / N * st,
				et.left = U + .5 * (Z - rt)),
			et.right = et.left + rt,
			et.bottom = et.top + st,
			ot = rt / X,
			it = 1 / ot),
		i(),
		z()
	}
	function x(t) {
		return et.left + t * ot
	}
	function A(t) {
		return et.top + t * ot
	}
	function P(t) {
		return new Point(et.left + t.x * ot, et.top + t.y * ot)
	}
	function _(t, e) {
		return e.setXy((t.x - et.left) * it, (t.y - et.top) * it)
	}
	function D(t, e, o, i, r) {
		var s = ft == r,
		n = P(e);
		t.setFillStyle("#ffffff"),
		t.fillRect(n.x + o, n.y + i, o * L, i * V),
		t.fillRect(n.x + o, n.y + i, o * V, i * L),
		t.setFillStyle(s ? "#ff0000" : "#000000"),
		t.fillRect(n.x + 2 * o, n.y + 2 * i, o * G, i * H),
		t.fillRect(n.x + 2 * o, n.y + 2 * i, o * H, i * G)
	}
	function R(t, e, o, i) {
		var r = ft == i,
		s = P(e);
		t.setFillStyle("#ffffff"),
		t.fillRect(s.x + o, s.y - L / 2, o * V, L),
		t.setFillStyle(r ? "#ff0000" : "#000000"),
		t.fillRect(s.x + 2 * o, s.y - G / 2, o * H, G)
	}
	function E(t, e, o, i) {
		var r = ft == i,
		s = P(e);
		t.setFillStyle("#ffffff"),
		t.fillRect(s.x - L / 2, s.y + o, L, o * V),
		t.setFillStyle(r ? "#ff0000" : "#000000"),
		t.fillRect(s.x - G / 2, s.y + 2 * o, G, o * H)
	}
	function F(t, e, o) {
		var i = O / 2,
		r = 1.75 * i,
		s = 2,
		n = 1 * s,
		a = 2.5 * n,
		l = ft == o,
		p = l ? "#ff0000" : "#000000",
		c = P(e);
		t.beginPath(),
		t.triangle(c.x, c.y - r, -Math.PI / 2, n, a),
		t.triangle(c.x, c.y + r, Math.PI / 2, n, a),
		t.triangle(c.x - r, c.y, Math.PI, n, a),
		t.triangle(c.x + r, c.y, 0, n, a),
		t.strokeEx(2, "#FFF"),
		t.fillEx(p);
		var u = i + 2;
		t.fillCircle(c.x, c.y, u, "#FFFFFF"),
		t.fillCircle(c.x, c.y, u - 1, p)
	}
	function z() {
		if (null != W.inputCanvas && null != j && 0 != Q && 0 != K) {
			var t = j.context();
			t.clearRect(0, 0, Q, K),
			t.drawCanvasEx2(W.inputCanvas, et.left, et.top, rt, st),
			t.setStrokeStyle("#000000"),
			t.setGlobalAlpha(.4),
			t.setLineWidth(1);
			var e = Math.round(x(ht.left)) + .5,
			o = Math.round(A(ht.top)) + .5,
			i = Math.round(ht.width() * ot) - 1,
			r = Math.round(ht.height() * ot) - 1;
			t.strokeRect(e, o, i, r),
			t.setGlobalAlpha(1),
			D(t, ht.topLeft(), 1, 1, Mt),
			D(t, ht.topRight(), -1, 1, St),
			D(t, ht.bottomRight(), -1, -1, Ct),
			D(t, ht.bottomLeft(), 1, -1, vt),
			R(t, ht.leftCenter(), 1, bt),
			R(t, ht.rightCenter(), -1, mt),
			E(t, ht.topCenter(), 1, wt),
			E(t, ht.bottomCenter(), -1, yt),
			F(t, ht.center(), kt)
		}
	}
	var B = 1048576,
	U = 10,
	O = 20,
	I = 100,
	L = 20,
	V = 6,
	G = L - 2,
	H = V - 2;
	t.initialized = !1;
	var W = null;
	t.lockAspectRatio = !1,
	t.maxNumMegapixels = 4;
	var X = 0,
	N = 0,
	Y = Point.empty(),
	q = 1,
	J = null,
	j = null,
	Q = 0,
	K = 0,
	Z = 0,
	tt = 0,
	et = Rect.empty(),
	ot = 1,
	it = 1,
	rt = 0,
	st = 0,
	nt = Point.empty(),
	at = Point.empty(),
	lt = Point.empty(),
	pt = Point.empty(),
	ct = !1,
	ut = Point.empty(),
	dt = Rect.empty(),
	ht = Rect.empty(),
	gt = function () {
		function t(t, e) {
			this.key = t,
			this.anchor = e,
			this.oppositeAnchor = Anchor.opposite(this.anchor)
		}
		return t
	}
	(),
	ft = null,
	wt = new gt("resize-top", Anchor.Top),
	St = new gt("resize-top-right", Anchor.TopRight),
	mt = new gt("resize-right", Anchor.Right),
	Ct = new gt("resize-bottom-right", Anchor.BottomRight),
	yt = new gt("resize-bottom", Anchor.Bottom),
	vt = new gt("resize-bottom-left", Anchor.BottomLeft),
	bt = new gt("resize-left", Anchor.Left),
	Mt = new gt("resize-top-left", Anchor.TopLeft),
	kt = new gt("resize-move", Anchor.Center);
	t.show = e
}
(PreCrop || (PreCrop = {}));
var CanvasMod;
!function (t) {
	function e(t, e, i, r, s) {
		Util.loadImageFromBlob(e, i, function (i) {
			function n(t) {
				CanvasShrinker.process({
					inputFile: e,
					inputCanvas: p,
					crop: t,
					maxNumPixels: a,
					thumbnailSize: {
						w: 210,
						h: 145
					},
					worker: s ? o : void 0,
					completed: r
				})
			}
			var a = M.getMaxNumPixels(),
			l = i.naturalWidth * i.naturalHeight > a,
			p = CanvasModule.flattenImage(i);
			if (i = null,
				l && M.stickySettings.preCropEnabled && !t) {
				var c = window.GlobalsEx.MaxMaxNumMegapixels || Const.FactoryDefaults.maxNumMegapixels;
				PreCrop.show({
					inputFile: e,
					inputCanvas: p,
					lockAspectRatio: M.stickySettings.preCropLockAspectRatio,
					maxNumMegapixels: M.stickySettings.maxNumMegapixels || c,
					maxMaxNumMegapixels: c,
					aspectRatios: Const.AspectRatios,
					completed: function (t) {
						a = 1024 * PreCrop.maxNumMegapixels * 1024,
						n(t)
					}
				})
			} else
				n()
		})
	}
	var o = new YoWorker("Downsampler", Downsampler);
	t.loadImageShrinkAndThumbnail = e
}
(CanvasMod || (CanvasMod = {}));
var BrushArray = function () {
	function t() {
		this.array = []
	}
	return t.prototype.addBrush = function (t, e) {
		this.array[t - 1] = e
	},
	t.prototype.getBrush = function (t) {
		return this.array[t - 1]
	},
	t
}
(), CanvasMask = function (t) {
	// 画布遮罩  endian ：字节存储次序，元组排列顺序
	function e(e, o, i) {
		t.call(this, e, o),
		this.levelToEndian32 = i,
		this.endian32ToLevel = new HashMap,
		this.maskEncoder = 2 == Const.MaskVersion ? new MaskEncoderBinary : new MaskEncoderString;
		for (var r = 0; r < this.levelToEndian32.length; r++)
			this.endian32ToLevel.put(0 | this.levelToEndian32[r], r);
		this.resetLast()
	}
	return __extends(e, t),
	e.prototype.clearAll = function () {
		this.context().clearRect(0, 0, this.width(), this.height()),
		this.encodeCache = null
	},
	e.prototype.clearSquare = function (t, e, o) {
		this.clearSquarePrivate(t, e, o),
		this.setLast(t, e, o)
	},
	e.prototype.drawBrush = function (t, e, o, i) {
		this.currentBrush = i,
		this.drawBrushPrivate(t, e, o),
		this.setLast(t, e, o)
	},
	e.prototype.drawSquare = function (t, e, o, i) {
		this.context().setFillStyle(i),
		this.drawSquarePrivate(t, e, o),
		this.setLast(t, e, o)
	},
	e.prototype.drawLine = function (t, e, o, i) {
		this.context().setFillStyle(i),
		this.drawOrClearLine(t, e, o, this.drawSquarePrivate),
		this.setLast(t, e, o)
	},
	e.prototype.drawBrushLine = function (t, e, o, i) {
		this.currentBrush = i,
		this.drawOrClearLine(t, e, o, this.drawBrushPrivate),
		this.setLast(t, e, o)
	},
	e.prototype.clearLine = function (t, e, o) {
		this.drawOrClearLine(t, e, o, this.clearSquarePrivate),
		this.setLast(t, e, o)
	},
	e.prototype.resetLast = function () {
		this.setLast(null, null, null)
	},
	e.prototype.putImageData = function (t) {
		t && t.width == this.width() && t.height == this.height() && (this.context().putImageData(t, 0, 0),
			this.encodeCache = null)
	},
	e.prototype.encode = function () {
		var t = this;
		if (null != this.encodeCache)
			return this.encodeCache;
		var e = this.context().getImageData(0, 0, this.width(), this.height()),
		o = e.data,
		i = new Int32Array(o.buffer),
		r = i[0],
		s = 0 | this.endian32ToLevel.get(r),
		n = 1,
		a = o.length / 4,
		l = 1;
		this.maskEncoder.reset();
		for (var p = function (e, o) {
			for (var a = e; a < o; a++) {
				var l = i[a];
				if (r == l)
					n++;
				else {
					r = l;
					var p = 0 | t.endian32ToLevel.get(r);
					p == s ? n++ : (t.maskEncoder.push(s, n),
						n = 1,
						s = p)
				}
			}
		}; l < a - 4 + 1; l += 4)
			r == i[l] && r == i[l + 1] && r == i[l + 2] && r == i[l + 3] ? n += 4 : p(l, l + 4);
		return p(l, a),
		this.maskEncoder.push(s, n),
		this.encodeCache = this.maskEncoder.toString(),
		this.encodeCache
	},
	e.prototype.decode = function (t, e) {
		2 === e ? this.decodeInner(t, MaskEncoderBinary.decode) : this.decodeInner(t, MaskEncoderString.decode)
	},
	e.prototype.decodeInner = function (t, e) {
		var o = this,
		i = this.context().getImageData(0, 0, this.width(), this.height()),
		r = i.data,
		s = new Uint32Array(r.buffer),
		n = 0;
		e(t, function (t, e) {
			for (var i = 0 | o.levelToEndian32[t], r = 0; r < e && n < s.length; r++,
				n++)
				s[n] = i
		}),
		this.context().putImageData(i, 0, 0),
		this.encodeCache = null
	},
	e.prototype.setLast = function (t, e, o) {
		this.lastX = t,
		this.lastY = e,
		this.lastD = o,
		this.encodeCache = null
	},
	e.prototype.clearSquarePrivate = function (t, e, o) {
		var i = Math.floor(o / 2);
		this.context().clearRect(t - i, e - i, o, o)
	},
	e.prototype.drawSquarePrivate = function (t, e, o) {
		var i = Math.floor(o / 2);
		this.context().fillRect(t - i, e - i, o, o)
	},
	e.prototype.drawBrushPrivate = function (t, e, o) {
		var i = Math.floor(o / 2);
		this.context().drawCanvasEx(this.currentBrush, t - i, e - i)
	},
	e.prototype.drawOrClearLine = function (t, e, o, i) {
		var r = null == this.lastX ? t : this.lastX,
		s = null == this.lastY ? e : this.lastY,
		n = t - r,
		a = e - s,
		l = Math.abs(n),
		p = Math.abs(a),
		c = Math.max(l, p);
		if (0 == c)
			i.call(this, t, e, o);
		else
			for (var u = 0; u <= c; u++) {
				var d = Math.round(r + u * n / c),
				h = Math.round(s + u * a / c);
				i.call(this, d, h, o)
			}
	},
	e
}
(CanvasEx), ToolModeEx = function () { //重点 工具栏
	function t(e, o, i, r, s, n, a, l, p) {
		void 0 === n && (n = !1),
		void 0 === a && (a = !1),
		void 0 === l && (l = t.DefaultCursorSpec),
		void 0 === p && (p = 1),
		this.key = e,
		this.colorBytesRgba = o,
		this.isEraser = i,
		this.needBrushes = r,
		this.isEyeDropper = s,
		this.isDeselectable = n,
		this.serverCares = a,
		this.cursorSpec = l,
		this.diameterScale = p,
		this.cssClass = e + "-tool",
		this.buttonSelector = "label." + e + "-tool",
		this.cursorSpec = l,
		this.elems = null,
		this.needsHover = i || r,
		this.mask = null,
		this.brushCache = new HashMap,
		this.cssColor = Util.colorBytesToRgbaCss(o),
		this.abgr32 = Util.colorBytesToAbgr32(o),
		this.rgba32 = Util.colorBytesToRgba32(o),
		this.endian32 = Util.LittleEndian ? this.abgr32 : this.rgba32,
		ToolMode.addMode(this)
	}
	return t.createBrush = function (t, e) {
		var o = new CanvasEx(t, t),
		i = t / 2;
		return o.fillAliasedCircle(i, i, i, e),
		o
	},
	// 重点
	t.simple = function (e, o) {
		return void 0 === o && (o = t.DefaultCursorSpec),
		new t(e, [0, 0, 0], !1, !1, !1, !1, !1, o)
	},
	t.deselectable = function (e, o) {
		return new t(e, [0, 0, 0], !1, !1, !1, o)
	},
	t.prototype.elements = function () {
		var t = this;
		return null == this.elems && (this.elems = $(this.buttonSelector),
			this.elems.click(function () {
				t.pick()
			})),
		this.elems
	},
	t.prototype.pick = function () {
		ToolMode.select(this)
	},
	t.prototype.getBrush = function (e) {
		return this.needBrushes ? this.brushCache.get(e) || this.brushCache.put(e, t.createBrush(e, this.colorBytesRgba)) : t.EmptyBrush
	},
	t.prototype.drawSquare = function (t, e, o) {
		this.isEraser ? this.mask && this.mask.clearSquare(t, e, o) : this.mask && this.mask.drawBrush(t, e, o, this.getBrush(o))
	},
	// 重要
	t.prototype.drawLine = function (t, e, o) {
		this.isEraser ? this.mask && this.mask.clearLine(t, e, o) : this.mask && this.mask.drawBrushLine(t, e, o, this.getBrush(o))
	},
	t.prototype.getCursor = function () {
		return Const.ScreenshotMode ? (this.cursorSpec.img || (this.cursorSpec.img = new Image,
				this.cursorSpec.src || (this.cursorSpec.src = this.key + "-tool-icon.png"),
				this.cursorSpec.img.src = "/assets/images/" + this.cursorSpec.src),
			this.cursorSpec) : null
	},
	t.DefaultCursorSpec = {
		x: 0,
		y: 0,
		src: "arrow-cursor.png"
	},
	t.EmptyBrush = new CanvasEx(1, 1),
	t
}
(), ToolMode;
!function (t) {
	function e(t) {
		v.push(t),
		b.put(t.key, t)
	}
	function o(t) {
		return b.get(t)
	}
	function i(e, o) {
		return new CanvasMask(e, o, [0, t.Background.endian32, t.Foreground.endian32])
	}
	function r(e, o) {
		return new CanvasMask(e, o, [0].concat(t.PaintHairs.map(function (t) {
					return t.endian32
				})))
	}
	function s(t) {
		Callbacks.App.toolModeChangeHandler(t)
	}
	function n(t) {
		return Callbacks.App.toolModeValidate(t)
	}
	function a() {
		for (var t = 0; t < v.length; t++)
			v[t].elements()
	}
	function l() {
		return k
	}
	function p() {
		return M
	}
	function c() {
		return T
	}
	function u() {
		return x || T || k
	}
	function d(t) {
		void 0 === t && (t = !1),
		(M != u() || t) && (null != M && (t ? $(".tool-radio-button").removeClass("active") : M.elements().removeClass("active")),
			M = u(),
			M.elements().button("toggle"),
			null != s && s(M))
	}
	function h(e) {
		k ? k.key : null;
		k == e && k.isDeselectable ? (h(t.Grab),
			setTimeout(d, 0, !0)) : n(e) ? (T = null,
			k = e,
			e.mask && e.mask.resetLast(),
			d()) : setTimeout(d, 0, !0)
	}
	function g(t) {
		return u() == t
	}
	function f(t) {
		return u() != t
	}
	function w(t) {
		T = t,
		d()
	}
	function S() {
		w(null)
	}
	function m() {
		x = u()
	}
	function C() {
		x && (x = null,
			d())
	}
	function y(t, e, o) {
		k = t,
		T = e,
		x = o,
		d()
	}
	var v = [],
	b = new HashMap;
	t.addMode = e,
	t.getMode = o,
	t.Background = new ToolModeEx("red", [255, 0, 0, 255], !1, !0, !1, !1, !0, {
			x: 0,
			y: 0
		}),
	t.Foreground = new ToolModeEx("green", [0, 255, 0, 255], !1, !0, !1, !1, !0, {
			x: 0,
			y: 0
		}),
	t.MaskEraser = new ToolModeEx("erase", [0, 0, 255, 255], !0, !1, !1, !1, !0, {
			x: 0,
			y: 0
		}, 1.5),
	t.HairEraser = new ToolModeEx("hair-erase", [0, 255, 255, 255], !0, !1, !1, !1, !0, {
			x: 0,
			y: 0
		}, 1.5),
	t.ForegroundEyeDropper = new ToolModeEx("eyedropper-fg", [128, 0, 255, 255], !1, !1, !0, !1, !1, {
			x: 0,
			y: 13
		}),
	t.BackgroundEyeDropper = new ToolModeEx("eyedropper-bg", [255, 0, 128, 255], !1, !1, !0, !1, !1, {
			x: 0,
			y: 13
		}),
	t.GrayEyeDropper = new ToolModeEx("eyedropper-gray", [128, 128, 128, 255], !1, !1, !0, !1, !1, {
			x: 0,
			y: 13
		}),
	t.Grab = ToolModeEx.simple("pan"),
	t.ContextMenu = ToolModeEx.simple("context-menu"),
	t.ResizeTop = ToolModeEx.simple("resize-top"),
	t.ResizeTopRight = ToolModeEx.simple("resize-top-right"),
	t.ResizeRight = ToolModeEx.simple("resize-right"),
	t.ResizeBottomRight = ToolModeEx.simple("resize-bottom-right"),
	t.ResizeBottom = ToolModeEx.simple("resize-bottom"),
	t.ResizeBottomLeft = ToolModeEx.simple("resize-bottom-left"),
	t.ResizeLeft = ToolModeEx.simple("resize-left"),
	t.ResizeTopLeft = ToolModeEx.simple("resize-top-left"),
	t.ResizeMove = ToolModeEx.simple("resize-move"),
	t.Sword = ToolModeEx.simple("sword", {
			x: 1,
			y: 1
		}),
	t.ShadowArrow = ToolModeEx.simple("shadow-arrow"),
	t.ShadowEllipse = ToolModeEx.simple("shadow-ellipse", {
			x: 3,
			y: 3,
			src: "shadow-ellipse-tool-cursor.png"
		}),
	t.ShadowMove = ToolModeEx.deselectable("shadow-move", !1),
	t.ShadowMirror = ToolModeEx.simple("shadow-mirror"),
	t.PaintHair1 = new ToolModeEx("hair-1", window.Globals.HairColors[0], !1, !0, !1, !1, !0),
	t.PaintHair2 = new ToolModeEx("hair-2", window.Globals.HairColors[1], !1, !0, !1, !1, !0),
	t.PaintHair3 = new ToolModeEx("hair-3", window.Globals.HairColors[2], !1, !0, !1, !1, !0),
	t.PaintHair4 = new ToolModeEx("hair-4", window.Globals.HairColors[3], !1, !0, !1, !1, !0),
	t.PaintHairs = [],
	t.PaintHairs.push(t.PaintHair1, t.PaintHair2, t.PaintHair3, t.PaintHair4);
	var M = t.Grab,
	k = t.Grab,
	T = null,
	x = null;
	t.buildUserMask = i,
	t.buildHairMask = r,
	t.initialize = a,
	t.getSelectedMode = l,
	t.getVisibleMode = p,
	t.getTempMode = c,
	t.getActiveMode = u,
	t.update = d,
	t.select = h,
	t.is = g,
	t.isNot = f,
	t.setTempSelect = w,
	t.releaseTempSelect = S,
	t.mouseDown = m,
	t.mouseUp = C,
	t.forceSelection = y
}
(ToolMode || (ToolMode = {}));
var Sword;
!function (t) {
	function e(t) {
		var e = t.bezier.eval(.25),
		o = t.bezier.eval(.75),
		i = Bezier.line(t.point, t.bezier.p2);
		t.bezier.mp = e,
		t.bezier.p2 = t.point,
		t.bezier.updateP1FromMp(),
		i.mp = o,
		i.updateP1FromMp(),
		t.sword.beziers.splice(t.iBezier + 1, 0, i),
		s()
	}
	function o(e, o) {
		0 == e.iPoint && e.sword.reverseInPlace(),
		2 == o.iPoint && o.sword.reverseInPlace(),
		e.sword.beziers[e.sword.beziers.length - 1].p2 = o.sword.beziers[0].p0;
		var i = new PolyBezier(e.sword.beziers.concat(o.sword.beziers));
		t.swords.polyBeziers.splice(e.iSword, 1, i),
		t.swords.polyBeziers.splice(o.iSword, 1),
		s()
	}
	function i(e) {
		switch (Undo.push(),
			e.pointType) {
		case 0:
			var o = e.sword.beziers.slice(0, e.iBezier),
			i = e.sword.beziers.slice(e.iBezier + 1);
			e.sword.isClosed() ? t.swords.polyBeziers[e.iSword] = new PolyBezier(i.concat(o)) : (t.swords.polyBeziers.splice(e.iSword, 1),
					i.length > 0 && t.swords.polyBeziers.splice(e.iSword, 0, new PolyBezier(i)),
					o.length > 0 && t.swords.polyBeziers.splice(e.iSword, 0, new PolyBezier(o)));
			break;
		case 1:
			var r = 0 == e.iPoint ? -1 : 1,
			n = (e.iBezier + r + e.sword.beziers.length) % e.sword.beziers.length,
			a = e.sword.beziers[n];
			e.sword.beziers.splice(n, 1),
			0 == e.iPoint ? e.bezier.p0 = a.p0 : e.bezier.p2 = a.p2,
			e.bezier.mp.set(e.point),
			e.bezier.updateP1FromMp();
			break;
		case 2:
			e.sword.beziers.splice(e.iBezier, 1),
			0 == e.sword.beziers.length && t.swords.polyBeziers.splice(e.iSword, 1)
		}
		s()
	}
	function r(e, o) {
		var i = e.dup(),
		r = o.dup();
		t.swords.polyBeziers.push(new PolyBezier([Bezier.line(i, r)])),
		n(t.swords.polyBeziers.length - 1, 0, 2, o, R),
		t.inProgress.downState = $.extend({}, t.hoverState),
		w()
	}
	function s() {
		n(-1, -1, -1, new Point(0, 0), R)
	}
	function n(e, o, i, r, s) {
		function n() {
			if (1 == i)
				return 0;
			var e = t.hoverState.sword;
			return e.isClosed() || t.hoverState.point != e.getFirstPoint() && t.hoverState.point != e.getLastPoint() ? 1 : 2
		}
		function a() {
			var e = t.hoverState.point.distanceTo(r),
			o = Math.sqrt(2),
			i = l * o * 1.2;
			switch (t.hoverState.pointType) {
			case 0:
				return t.hoverState.deletePoint = t.hoverState.point.offset(i, -i),
				t.hoverState.plusPoint = t.hoverState.point.offset(i, i),
				e <= l ? 0 : t.hoverState.deletePoint.distanceTo(r) <= l ? 2 : t.hoverState.plusPoint.distanceTo(r) <= l ? 3 : null;
			case 1:
				return t.hoverState.deletePoint = t.hoverState.point.offset(i, -i),
				e <= l ? 0 : t.hoverState.deletePoint.distanceTo(r) <= l ? 2 : null;
			case 2:
				return t.hoverState.deletePoint = t.hoverState.point.offset(2 * l * o, 2 * -l * o),
				e <= l ? 0 : e <= l * t.ExtendMultiplier ? 1 : t.hoverState.deletePoint.distanceTo(r) <= l ? 2 : null;
			default:
				return null
			}
		}
		var l = s * _;
		t.hoverState.iSword = e,
		t.hoverState.iBezier = o,
		t.hoverState.iPoint = i,
		t.hoverState.deletePoint = null,
		t.hoverState.plusPoint = null,
		t.hoverState.IR_i = l,
		t.hoverState.active = e >= 0,
		t.hoverState.active ? (t.hoverState.sword = t.swords.polyBeziers[t.hoverState.iSword],
			t.hoverState.bezier = t.hoverState.sword.beziers[t.hoverState.iBezier],
			t.hoverState.point = t.hoverState.bezier.getPoint(t.hoverState.iPoint),
			t.hoverState.pointType = n(),
			t.hoverState.zone = a()) : (t.hoverState.pointType = null,
			t.hoverState.zone = null,
			t.hoverState.sword = null,
			t.hoverState.bezier = null,
			t.hoverState.point = null)
	}
	function a(e, o) {
		function i(t, i, r) {
			n(t, i, r, e, o)
		}
		var r = Util.sqr(o),
		a = r * Util.sqr(3.4 / 5);
		if (t.hoverState.active && t.hoverState.point.distanceSqrTo(e) < (2 == t.hoverState.pointType ? r : a))
			return void n(t.hoverState.iSword, t.hoverState.iBezier, t.hoverState.iPoint, e, o);
		for (var l = t.swords.polyBeziers.length - 1; l >= 0; l--)
			for (var p = t.swords.polyBeziers[l], c = p.beziers.length - 1; c >= 0; c--) {
				var u = p.beziers[c],
				d = c == p.beziers.length - 1,
				h = 0 == c;
				if (u.p2.distanceSqrTo(e) < (d ? r : a))
					return i(l, c, 2);
				if (u.mp.distanceSqrTo(e) < a)
					return i(l, c, 1);
				if (u.p0.distanceSqrTo(e) < (h ? r : a))
					return i(l, c, 0)
			}
		s()
	}
	function l(e, o) {
		function i(o, i, n) {
			var c = t.swords.polyBeziers[o].beziers[i].getPoint(n),
			u = c.distanceSqrTo(e);
			c != s.point && u < r && (a = o,
				l = i,
				p = n,
				r = u)
		}
		var r = Util.sqr(.6 * o),
		s = t.inProgress.downState,
		a = -1,
		l = -1,
		p = -1;
		if (s)
			for (var c = t.swords.polyBeziers.length - 1; c >= 0; c--)
				if (c != s.iSword) {
					var u = t.swords.polyBeziers[c];
					u.isClosed() || (i(c, 0, 0),
						i(c, u.beziers.length - 1, 2))
				}
		n(a, l, p, e, o),
		t.hoverState.zone = 4
	}
	function p() {
		var e = t.inProgress.downState,
		o = t.hoverState;
		return e && e.active && (0 == e.zone || 1 == e.zone) && 2 == e.pointType && 2 == o.pointType && e.sword != o.sword && e.bezier != o.bezier && e.point != o.point
	}
	function c(e) {
		g(),
		t.inProgress.v0 = e,
		t.inProgress.downState = $.extend({}, t.hoverState)
	}
	function u(t, e) {
		d(t, e)
	}
	function d(e, o) {
		var i = T(o),
		s = t.inProgress.downState;
		if (s) {
			if (0 == s.zone ? l(e, i) : a(e, i),
				t.inProgress.v2 = p() ? t.hoverState.point : e,
				s.active) {
				if (0 == s.zone) {
					switch (s.pointType) {
					case 0:
						t.inProgress.firstMove && Undo.push(),
						s.bezier.move(s.iPoint, t.inProgress.v2);
						break;
					case 1:
						var c = (s.iBezier + (0 == s.iPoint ? -1 : 1) + s.sword.beziers.length) % s.sword.beziers.length;
						s.bezier.move(s.iPoint, t.inProgress.v2, s.sword.beziers[c]);
						break;
					case 2:
						t.inProgress.firstMove && Undo.push(),
						s.bezier.move(s.iPoint, t.inProgress.v2)
					}
					s.sword.active = !1,
					w()
				} else if (1 == s.zone) {
					if (t.inProgress.firstMove && Undo.push(),
						0 == s.iPoint) {
						var u = t.inProgress.v2.dup(),
						d = s.point;
						s.sword.beziers.unshift(Bezier.line(u, d)),
						n(s.iSword, 0, 0, t.inProgress.v0, R)
					} else {
						var u = s.point,
						d = t.inProgress.v2.dup();
						s.sword.beziers.push(Bezier.line(u, d)),
						n(s.iSword, s.sword.beziers.length - 1, 2, t.inProgress.v2, R)
					}
					s.sword.active = !1,
					t.inProgress.downState = $.extend({}, t.hoverState),
					w()
				}
			} else
				t.inProgress.v0 && t.inProgress.v2 && (t.inProgress.firstMove && Undo.push(),
					r(t.inProgress.v0, t.inProgress.v2),
					w());
			t.inProgress.firstMove = !1
		} else
			a(e, i)
	}
	function h(r) {
		var s = t.inProgress.downState,
		n = t.hoverState;
		s && n.zone == s.zone && s.point == n.point && (2 == s.zone ? (Undo.push(),
				i(s),
				s.sword.active = !1,
				w()) : 3 == s.zone && (Undo.push(),
				e(s),
				s.sword.active = !1,
				w())),
		p() && (o(s, n),
			w()),
		g(),
		f()
	}
	function g() {
		t.inProgress.v0 = null,
		t.inProgress.v2 = null,
		t.inProgress.downState = null,
		t.inProgress.firstMove = !0
	}
	function f() {
		F && (F = !1,
			z = Callbacks.M.sendSetSword())
	}
	function w() {
		E = null,
		F = !0
	}
	function S() {
		t.swords.polyBeziers.length > 0 && (t.swords.polyBeziers.length = 0,
			w(),
			f())
	}
	function m() {
		return null == E && (E = t.swords.encode()),
		E
	}
	function C(e) {
		E = e,
		PolyBezierSet.decode(e, t.swords),
		s()
	}
	function y(e) {
		t.swordIntersections.length = 0;
		for (var o = 0; o < e.length; o++)
			t.swordIntersections.push(e[o])
	}
	function v(e, o) {
		if (o >= z && !F && e.length == t.swords.polyBeziers.length)
			for (var i = 0; i < t.swords.polyBeziers.length; i++)
				t.swords.polyBeziers[i].active = !!e[i]
	}
	function b(t) {
		return Util.clamp(D * Math.log(t), 4, 8)
	}
	function M(t) {
		return b(t) * P
	}
	function k(t) {
		return b(t) / t
	}
	function T(t) {
		return M(t) / t
	}
	function x() {
		return t.swords.polyBeziers.length > 0
	}
	function A() {
		for (var e = 0; e < t.swords.polyBeziers.length; e++)
			t.swords.polyBeziers[e].reverseInPlace()
	}
	var P = 5,
	_ = 1 / P,
	D = 6,
	R = D * P;
	t.ExtendMultiplier = 3,
	t.swords = new PolyBezierSet,
	t.inProgress = {
		v0: null,
		v2: null,
		downState: null,
		firstMove: !1
	},
	t.hoverState = {
		iSword: -1,
		iBezier: -1,
		iPoint: -1,
		zone: null,
		pointType: null,
		active: !1,
		sword: null,
		bezier: null,
		point: null,
		deletePoint: null,
		plusPoint: null,
		IR_i: null
	},
	t.swordIntersections = [];
	var E = null,
	F = !1,
	z = 0;
	t.mouseDown = c,
	t.mouseWheel = u,
	t.mouseMove = d,
	t.mouseUp = h,
	t.mouseCancel = g,
	t.clear = S,
	t.encode = m,
	t.decode = C,
	t.setSwordIntersections = y,
	t.setActiveSwords = v,
	t.computeInnerRadius_c = b,
	t.computeOuterRadius_c = M,
	t.computeInnerRadius_i = k,
	t.computeOuterRadius_i = T,
	t.hasSomeSwords = x,
	t.reverseAll = A
}
(Sword || (Sword = {}));
var YoWebSocketState;
!function (t) {
	t[t.Disconnected = 0] = "Disconnected",
	t[t.Connecting = 1] = "Connecting",
	t[t.Connected = 2] = "Connected",
	t[t.Error = 3] = "Error"
}
(YoWebSocketState || (YoWebSocketState = {}));
// websocket
var YoWebSocket = function () {
	function t(t) {
		var e = this;
		this.state = YoWebSocketState.Disconnected,
		this.websocket = null,
		this.arraybuffer = null,
		this.receivedMessage = !1,
		this.closeReason = null,
		this.lastDebugUrl = "unknown",
		this.opts = $.extend({
				numberOfSilentRetriesBeforeShowingErrorToUser: 3,
				millisBetweenSilentRetries: 1e3
			}, t),
		this.eventHandlers = {
			open: function (t) {
				e.onOpen()
			},
			close: function (t) {
				e.onClose(t)
			},
			message: function (t) {
				e.onMessage(t)
			},
			heartbeater: function () {
				e.opts.heartbeat && null != e.websocket && e.websocket.readyState == WebSocket.OPEN && e.websocket.send(JSON.stringify(e.opts.heartbeat.message))
			}
		},
		this.retryable = new RetryInstance({
				label: this.opts.label,
				execute: function (t, o) {
					e.clearWebSocket(YoWebSocketState.Connecting),
					e.receivedMessage = !1,
					e.closeReason = null;
					var i = e.opts.url();
					e.lastDebugUrl = i,
					e.websocket = new WebSocket(i),
					e.websocket.binaryType = "arraybuffer",
					e.websocket.addEventListener("open", e.eventHandlers.open),
					e.websocket.addEventListener("close", e.eventHandlers.close),
					e.websocket.addEventListener("message", e.eventHandlers.message)
				},
				success: function () {
					e.opts.connectedToNewServer()
				},
				numberOfSilentRetriesBeforeShowingErrorToUser: this.opts.numberOfSilentRetriesBeforeShowingErrorToUser,
				millisBetweenSilentRetries: this.opts.millisBetweenSilentRetries
			})
	}
	return t.prototype.clearWebSocket = function (t) {
		this.state = t,
		null != this.websocket && (this.websocket.removeEventListener("open", this.eventHandlers.open),
			this.websocket.removeEventListener("close", this.eventHandlers.close),
			this.websocket.removeEventListener("message", this.eventHandlers.message),
			this.websocket.close(),
			this.websocket = null),
		this.arraybuffer = null,
		this.heartbeatTimer && (clearTimeout(this.heartbeatTimer),
			this.heartbeatTimer = void 0)
	},
	t.prototype.onOpen = function () {
		Util.gaTrack("WebSocket", this.lastDebugUrl, "connected", 1),
		this.opts.sendOnOpen ? this.send(this.opts.sendOnOpen) : this.eventHandlers.heartbeater(),
		this.opts.heartbeat && (this.heartbeatTimer = setInterval(this.eventHandlers.heartbeater, this.opts.heartbeat.millis))
	},
	t.prototype.onClose = function (t) {
		this.clearWebSocket(YoWebSocketState.Disconnected);
		var e = t.reason;
		if (this.closeReason && !e && (e = this.closeReason.code.toString()),
			e) {
			if (this.opts.puntOnCloseReason && this.opts.puntOnCloseReason(e))
				return void this.retryable.executionPunt();
			var o = this.opts.closeReasonToMessage(e);
			if (o)
				return this.onError(o)
		} else if (!this.receivedMessage)
			return this.onError(this.opts.unableToConnectMessage);
		this.opts.disconnectedFromServer() ? this.onError(this.opts.unexpectedCloseMessage) : this.retryable.executionStopped()
	},
	t.prototype.onError = function (t) {
		Util.gaTrack("WebSocket", this.lastDebugUrl, "error", 0),
		this.opts.customOnError && !this.opts.customOnError(t) || this.retryable.executionError(t)
	},
	// 重要，左边canvas画完后，消息通知
	t.prototype.onMessage = function (t) {
		if ("string" == typeof t.data) {
			var e = JSON.parse(t.data);
			if (e.closeReason)
				return this.closeReason = e.closeReason,
				void this.websocket.close();
			this.receivedMessage || (this.receivedMessage = !0,
				this.state = YoWebSocketState.Connected,
				this.retryable.executionSuccess()),
			null != this.arraybuffer && (e.arraybuffer = this.arraybuffer,
				this.arraybuffer = null),
			this.opts.newMessageFromServer(e)
		} else
			this.arraybuffer = t.data
	},
	t.prototype.send = function (t) {
		if (null == this.websocket || this.websocket.readyState != WebSocket.OPEN)
			return null == this.websocket && this.retryable.tryExecute(),
			!1;
		try {
			return this.websocket.send(JSON.stringify(t)),
			!0
		} catch (t) {
			return this.clearWebSocket(YoWebSocketState.Error),
			this.onError(this.opts.sendFailedMessage),
			!1
		}
	},
	t.prototype.getState = function () {
		return this.state
	},
	t
}
(), WorkerApi;
!function (t) {
	function e() {
		return r.getState() == YoWebSocketState.Connected
	}
	function o(t) {
		r = new YoWebSocket({
				url: function () {
					return WebApi.getWorkerUrl("/api/websocket", {
						imageId: t.imageId.toString(),
						secret: t.secret
					})
				},
				connectedToNewServer: t.connectedToNewServer,
				disconnectedFromServer: t.disconnectedFromServer,
				newMessageFromServer: t.newMessageFromServer,
				heartbeat: {
					millis: 2e4,
					message: {
						command: Const.StatusCheck
					}
				},
				label: Tr.s("Connect to worker"),
				closeReasonToMessage: function (t) {
					switch (t) {
					case "2":
						return Tr.s("Unknown image - it may have been deleted, or you may not have the necessary credentials to access it");
					case "-3":
						return Tr.s("Workers overloaded. Additional workers are being spawned - they should be online in a couple of minutes. ");
					case "-4":
						return;
					default:
						return t
					}
				},
				unableToConnectMessage: Tr.s("Unable to connect to the worker. Is your firewall or proxy blocking WebSockets?"),
				unexpectedCloseMessage: Tr.s("Unexpected worker disconnection. Should be temporary - keep trying. "),
				sendFailedMessage: Tr.s("Failed to send message to worker, closing connection and retrying. ")
			})
	}
	function i(t) {
		return r.send(t)
	}
	var r;
	t.isConnected = e,
	t.initialize = o,
	t.send = i
}
(WorkerApi || (WorkerApi = {}));
var ContextMenu;
!function (t) {
	function e(t) {
		return void 0 === t && (t = null),
		n && (n = !1,
			Css.contextMenu.Lightbox.$().modal("hide"),
			null != t && t.preventDefault(),
			Css.contextMenu.toolbar.$().hide(),
			ToolMode.releaseTempSelect()),
		!1
	}
	function o(t, e) {
		return n = !0,
		Util.modal(Css.contextMenu.Lightbox.css(), !0, !0),
		ToolMode.setTempSelect(ToolMode.ContextMenu),
		t.preventDefault(),
		e.$().show().offset({
			left: t.clientX,
			top: t.clientY - 30
		}),
		!1
	}
	function i(t) {
		return o(t, Css.contextMenu.ToolbarMark)
	}
	function r(t) {
		return o(t, Css.contextMenu.ToolbarShadowApp)
	}
	function s(t) {
		return o(t, Css.contextMenu.ToolbarColorsApp)
	}
	var n = !1;
	t.dismiss = e,
	t.showMain = i,
	t.showShadowApp = r,
	t.showColorsApp = s,
	$(function () {
		Css.contextMenu.Lightbox.$().on("click", e).on("contextmenu", e)
	})
}
(ContextMenu || (ContextMenu = {}));
var Undo;
!function (t) {
	function e(e) {
		e = e || t.sourceFunction(),
		a.push(e),
		a.length > p && a.shift(),
		l.length = 0,
		u = Date.now() + c,
		t.stateUpdated()
	}
	function o() {
		var e = a.pop();
		return l.push(t.sourceFunction()),
		t.stateUpdated(),
		e
	}
	function i() {
		var e = l.pop();
		return a.push(t.sourceFunction()),
		t.stateUpdated(),
		e
	}
	function r() {
		return a.length > 0
	}
	function s() {
		return l.length > 0
	}
	function n() {
		Date.now() > u && e()
	}
	var a = [],
	l = [];
	t.sourceFunction = Util.empty,
	t.stateUpdated = Util.empty;
	var p = 100,
	c = 2e3,
	u = 0;
	t.push = e,
	t.undo = o,
	t.redo = i,
	t.canUndo = r,
	t.canRedo = s,
	t.schedulePush = n
}
(Undo || (Undo = {}));
var SavedMask;
!function (t) {
	function e() {
		return window.GlobalsEx.hasSavedMask
	}
	function o() {
		return null != t.savedMask
	}
	function i() {
		return o() ? (null != S && S.width() == t.savedMask.width && S.height() == t.savedMask.height || (S = ToolMode.buildUserMask(t.savedMask.width, t.savedMask.height),
				S.decode(t.savedMask.userMask, t.savedMask.maskVersion)),
			0 != m && clearTimeout(m),
			m = setTimeout(r, 1e4),
			S) : null
	}
	function r() {
		m = -1,
		S = null
	}
	function s(e, o) {
		w || (g = e,
			f = o,
			Css.copy_mask_tool.$().click(d),
			Css.paste_mask_tool.$().click(h),
			Css.paste_mask_tool.$().hover(function () {
				t.pasteButtonIsHovered = !0,
				Callbacks.App.refreshAllViews()
			}, function () {
				t.pasteButtonIsHovered = !1,
				Callbacks.App.refreshAllViews()
			}),
			w = !0)
	}
	function n() {
		a(),
		window.GlobalsEx.hasSavedMask ? $.ajax(window.GlobalsEx.savedMaskS3Spec.url, {
			cache: !1,
			dataType: "json",
			error: function (t, e, o) {
				p(o)
			},
			success: c,
			type: "GET"
		}) : l()
	}
	function a() {
		o() ? Css.paste_mask_tool.$().removeAttr("disabled") : Css.paste_mask_tool.$().attr("disabled", "disabled")
	}
	function l() {
		var t = 50,
		e = Math.floor(t * f / g),
		o = ToolMode.buildUserMask(t, e),
		i = Math.floor(.8 * e);
		o.context().setFillStyle(ToolMode.Background.cssColor),
		o.context().fillRect(0, 0, 1, i),
		o.context().fillRect(0, 0, t, 1),
		o.context().fillRect(t - 1, 0, 1, i),
		c({
			userMask: o.encode(),
			maskVersion: Const.MaskVersion,
			width: t,
			height: e,
			toolModeKey: ToolMode.Foreground.key
		})
	}
	function p(t) {
		l()
	}
	function c(e) {
		t.savedMask = e,
		r(),
		a()
	}
	function u() {
		null != window.GlobalsEx.savedMaskS3Spec && FileUploader.uploadS3JsonWithRetry(t.savedMask, window.GlobalsEx.savedMaskS3Spec, {
			url: window.Globals.s3_url,
			label: Tr.s("Storing Copied Mask"),
			maxAge: 0,
			success: function () {
				window.GlobalsEx.hasSavedMask = !0,
				Callbacks.M.sendSetGlobal()
			},
			giveUpAfterSilentRetries: !0
		})
	}
	// 重要：userMask，drawcommand.json中的key
	function d() {
		var t = Callbacks.M.userMask;
		c({
			userMask: t.encode(),
			maskVersion: Const.MaskVersion,
			width: t.width(),
			height: t.height(),
			toolModeKey: ToolMode.getSelectedMode().key
		}),
		u()
	}
	function h() {
		var e = i();
		if (null != e) {
			for (var o = e.width(), r = e.height(), s = e.context().getImageData(0, 0, o, r).data, n = Callbacks.M.userMask, a = n.context().getImageData(0, 0, g, f), l = a.data, p = o / g, c = r / f, u = 0, d = 0; u < f; u++)
				for (var h = Math.floor(u * c), w = 0; w < g; w++,
					d += 4)
					for (var S = Math.floor(w * p), m = 4 * (S + o * h), C = 0; C < 3; C++) {
						var y = s[m + C];
						0 != y && (l[d + C] = y,
							l[d + 3] = 255)
					}
			Undo.push(),
			n.putImageData(a),
			setTimeout(function () {
				Callbacks.M.sendSetUserMask(!0),
				Callbacks.App.refreshAllViews()
			})
		}
		t.pasteButtonIsHovered = !1,
		Callbacks.App.refreshAllViews()
	}
	t.hasSavedMaskS3 = e,
	t.hasSavedMaskClient = o;
	var g = -1,
	f = -1,
	w = !1,
	S = null,
	m = -1;
	t.savedMask = null,
	t.pasteButtonIsHovered = !1,
	t.getMask = i,
	t.initializeUi = s,
	t.checkFetch = n
}
(SavedMask || (SavedMask = {}));
var ViewPortAnimation = function () {
	function t() {
		this.startOffsetX = null,
		this.startOffsetY = null,
		this.startZoom = null,
		this.targetOffsetX = null,
		this.targetOffsetY = null,
		this.targetZoom = null,
		this.startTime = null,
		this.id = null,
		this.ignoreClear = !1
	}
	return t
}
(), ViewPortCanvasEx = function (t) {
	function e() {
		t.apply(this, arguments)
	}
	return __extends(e, t),
	e
}
(CanvasEx), ViewPortEx = function () {
	function t(e) {
		var o = this;
		this.name = e,
		this.initialized = !1,
		this.opts = null,
		this.canvases = [],
		this.imageWidth = null,
		this.imageHeight = null,
		this.imageCenterX_i = 0,
		this.imageCenterY_i = 0,
		this.imageCenter_i = new Point(0, 0),
		this.imageCenterX_o = null,
		this.imageCenterY_o = null,
		this.zoomScale = null,
		this.animation = new ViewPortAnimation,
		this.mouseX_i = t.OffScreen,
		this.mouseY_i = t.OffScreen,
		this.mouseX_ii = t.OffScreen,
		this.mouseY_ii = t.OffScreen,
		this.mouseX_c = 0,
		this.mouseY_c = 0,
		this.mouseX_o = 0,
		this.mouseY_o = 0,
		this.imageLeft_c = 0,
		this.imageTop_c = 0,
		this.imageWidth_c = 0,
		this.imageHeight_c = 0,
		this.imageCenterX_c = 0,
		this.imageCenterY_c = 0,
		this.crop_c = new CropRect,
		this.mouseIsDown = !1,
		this.mouseButton = null,
		this.shiftIsDown = !1,
		this.overPanCanvas = !1,
		this.clickX_c = null,
		this.clickY_c = null,
		this.clickImageCenterX_o = null,
		this.clickImageCenterY_o = null,
		this.pinchIsActive = !1,
		this.pinchInitialDistance = 1,
		this.pinchInitialZoom = 1,
		this.currentApp = null,
		this.activeCanvas = null,
		this.hoveredCanvas = null,
		this.repeaterDelay = t.animationDuration / 2,
		this.showing = !1,
		this.mouseIsOver = !1,
		this.contextMenuHandler = function (t) {
			return o.canvases[0].config && o.canvases[0].config.contextMenuHandler ? o.canvases[0].config.contextMenuHandler(t) : (t.preventDefault(),
				!1)
		},
		this.keyDownHandler = function (t) {
			switch (t.keyCode) {
			case 16:
				return o.shiftIsDown || (o.shiftIsDown = !0,
					o.updatePanTempSelect()),
				!0;
			case 37:
				return o.moveLeft(t.shiftKey),
				!0;
			case 38:
				return o.moveUp(t.shiftKey),
				!0;
			case 39:
				return o.moveRight(t.shiftKey),
				!0;
			case 40:
				return o.moveDown(t.shiftKey),
				!0;
			case 33:
				return o.animateZoomInAboutCenter(),
				!0;
			case 34:
				return o.animateZoomOutAboutCenter(),
				!0;
			case 36:
				return o.animateZoomToFit(),
				!0;
			case 89:
				return Callbacks.M.tryRedo(),
				!0;
			case 90:
				return t.shiftKey ? Callbacks.M.tryRedo() : Callbacks.M.tryUndo(),
				!0;
			case 81:
				return Const.ScreenshotMode && o.takeScreenShot(),
				!0;
			case 80:
				if (Const.ScreenshotMode) {
					var e = o.opts.canvasDiv,
					i = e.css("width"),
					r = ["687px", "748px", "1138px", "auto"],
					s = (r.indexOf(i) + 1) % r.length;
					e.css({
						width: r[s]
					}),
					o.updateSize()
				}
				return !0
			}
			return !1
		},
		this.keyUpHandler = function (t) {
			switch (t.keyCode) {
			case 16:
				return o.shiftIsDown && (o.shiftIsDown = !1,
					o.updatePanTempSelect()),
				!0
			}
			return !1
		},
		this.touchStartHandler = function (e) {
			var i = e.touches.item(0);
			o.activeCanvas = t.canvasFromEventTargetOrNull(e.srcElement),
			o.mouseInImpl(e.srcElement),
			o.mouseMoveImpl(o.activeCanvas, i.pageX, i.pageY, Const.MouseButtonLeft),
			o.mouseDownImpl(o.activeCanvas, i.pageX, i.pageY, Const.MouseButtonLeft),
			o.touchCheckPinch(e),
			e.preventDefault()
		},
		this.touchMoveHandler = function (t) {
			var e = t.touches.item(0);
			o.mouseMoveImpl(o.activeCanvas, e.pageX, e.pageY, Const.MouseButtonLeft),
			o.touchCheckPinch(t),
			t.preventDefault()
		},
		this.touchEndHandler = function (t) {
			var e = o.activeCanvas;
			o.mouseUpImpl(),
			o.mouseOutImpl(e),
			o.updateCoords(-1e5, -1e5, e),
			o.currentApp.touchEndHandler(),
			o.pinchIsActive = !1,
			o.refreshAllViews(),
			t.preventDefault()
		},
		this.mouseDownHandler = function (e) {
			null != e && o.mouseDownImpl(t.canvasFromEventTargetOrNull(e.target), e.pageX, e.pageY, e.which)
		},
		this.mouseDownImpl = function (t, e, i, r) {
			ToolMode.mouseDown(),
			Callbacks.App.toggleAllCanvasViewsClass("drag", !0),
			o.clearAnimation(),
			o.activeCanvas = t,
			o.clickX_c = e,
			o.clickY_c = i,
			o.clickImageCenterX_o = o.imageCenterX_o,
			o.clickImageCenterY_o = o.imageCenterY_o,
			o.mouseIsDown = !0,
			o.mouseButton = r,
			$(window).on("mouseup", o.mouseUpHandler),
			$(window).on("mousemove", o.mouseMoveHandlerWindow),
			o.updateCoords(e, i, o.activeCanvas),
			o.currentApp.mouseDownHandler(o.mouseButton),
			o.refreshAllViews()
		},
		this.mouseUpHandler = function (t) {
			null != t && o.mouseUpImpl()
		},
		this.mouseUpImpl = function () {
			ToolMode.mouseUp(),
			Callbacks.App.toggleAllCanvasViewsClass("drag", !1),
			o.clearAnimation(),
			o.mouseIsDown = !1,
			$(window).off("mouseup", o.mouseUpHandler),
			$(window).off("mousemove", o.mouseMoveHandlerWindow),
			o.currentApp.mouseUpHandler(o.mouseButton),
			o.activeCanvas = null,
			o.refreshAllViews()
		},
		this.mouseClickHandler = function (e) {
			null != e && o.updateCoords(e.pageX, e.pageY, t.canvasFromEventTargetOrNull(e.target))
		},
		this.mouseDblClickHandler = function () {
			ToolMode.is(ToolMode.Grab) && o.animateZoomToFit()
		},
		this.mouseMoveHandlerCanvas = function (t) {
			null == o.activeCanvas && o.mouseMoveHandler(t),
			o.mouseIsOver = !0
		},
		this.mouseMoveHandlerWindow = function (t) {
			o.mouseMoveHandler(t)
		},
		this.mouseMoveHandler = function (t) {
			var e = o.activeCanvas,
			i = o.viewportCanvasFromEventOrNull(t.target);
			null == e && null != i && (e = i.element),
			null != t && o.mouseMoveImpl(e, t.pageX, t.pageY, t.which)
		},
		// 重点！
		this.mouseMoveImpl = function (t, e, i, r) {
			if (o.updateCoords(e, i, t || o.activeCanvas),
				o.currentApp.mouseMoveHandler(e, i, o.mouseButton),
				o.mouseIsDown && (o.clearAnimation(),
					ToolMode.is(ToolMode.Grab))) {
				var s = o.clickImageCenterX_o - (e - o.clickX_c) / o.zoomScale,
				n = o.clickImageCenterY_o - (i - o.clickY_c) / o.zoomScale;
				o.setView(s, n, null),
				Callbacks.M.Review.reset() // 轮廓回顾
			}
			o.refreshAllViews()
		},
		this.mouseWheelHandler = function (e) {
			if (!o.mouseIsDown && null != e) {
				o.clearAnimation();
				var i = Math.pow(1.2, e.deltaY * e.deltaFactor / 100),
				r = t.canvasFromEventTargetOrNull(e.target);
				o.updateCoords(e.pageX, e.pageY, r),
				o.zoomAboutBy(o.mouseX_c, o.mouseY_c, i),
				o.updateCoords(e.pageX, e.pageY, r),
				o.currentApp.mouseWheelHandler(e),
				Callbacks.M.Review.reset(),
				o.refreshAllViews()
			}
			return !1
		},
		this.mouseInImpl = function (t) {
			var e = o.viewportCanvasFromEventOrNull(t);
			null != e && e.config.panModeOnly && !o.overPanCanvas && (o.overPanCanvas = !0,
				o.updatePanTempSelect()),
			o.mouseIsOver = !0
		},
		this.mouseInHandler = function (t) {
			o.mouseInImpl(t.target)
		},
		this.mouseOutImpl = function (e) {
			var i = o.viewportCanvasFromEventOrNull(e);
			null != i && i.config.panModeOnly && o.overPanCanvas && (o.overPanCanvas = !1,
				o.updatePanTempSelect()),
			o.mouseX_i = o.mouseY_i = o.mouseX_ii = o.mouseY_ii = t.OffScreen,
			o.mouseIsOver = !1,
			o.refreshAllViews()
		},
		this.mouseOutHandler = function (t) {
			o.mouseOutImpl(t.target)
		},
		this.refreshAllViews = function () {
			if (o.canvases)
				for (var t = 0; t < o.canvases.length; t++)
					o.canvases[t].config.isVisible && o.refreshView(o.canvases[t])
		},
		this.animateZoomInAboutCenter = function () {
			o.animate(0, 0, t.zoomStep)
		},
		this.animateZoomOutAboutCenter = function () {
			o.animate(0, 0, t.inverseZoomStep)
		},
		this.updateSize = function () {
			if (o.opts) {
				for (var t = o.opts.canvasDiv.outerWidth(), e = o.numVisibleCanvases(), i = Math.floor(t / e), r = o.opts.canvasDiv.outerHeight(), s = !1, n = 0, a = 0; n < o.canvases.length; n++) {
					var l = o.canvases[n];
					if (l.config.isVisible) {
						s = !0,
						l.setSize(i, r);
						var p = a * i;
						$(l.element).css("left", p),
						l.left = p,
						l.top = 0,
						a++
					}
					o.updateCoords(null, null, l.element)
				}
				return o.refreshAllViews(),
				s
			}
			return !1
		},
		setInterval(function () {
			o.updateSize()
		}, 2e3)
	}
	return t.prototype.isInitialized = function () {
		return this.initialized
	},
	t.prototype.initialize = function (t) {
		var e = this;
		this.initialized = !0,
		this.opts = t,
		this.imageWidth = this.opts.image.width(),
		this.imageHeight = this.opts.image.height(),
		this.imageCenterX_i = this.imageWidth / 2,
		this.imageCenterY_i = this.imageHeight / 2,
		this.imageCenter_i.setXy(this.imageCenterX_i, this.imageCenterY_i),
		this.imageCenterX_o = this.imageWidth / 2,
		this.imageCenterY_o = this.imageHeight / 2,
		this.currentApp = this.opts.app,
		this.zoomScale = 1;
		for (var o = 0; o < this.opts.viewConfigs.length; o++) {
			var i = new ViewPortCanvasEx(1, 1, !0);
			i.config = this.opts.viewConfigs[o],
			this.canvases[o] = i,
			this.opts.canvasDiv.append(i.element);
			var r = $(i.element);
			r.mousedown(this.mouseDownHandler).mouseup(this.mouseUpHandler).mousemove(this.mouseMoveHandlerCanvas).hover(this.mouseInHandler, this.mouseOutHandler).click(this.mouseClickHandler).dblclick(this.mouseDblClickHandler).mousewheel(this.mouseWheelHandler),
			i.element.addEventListener("touchstart", this.touchStartHandler),
			i.element.addEventListener("touchmove", this.touchMoveHandler),
			i.element.addEventListener("touchend", this.touchEndHandler)
		}
		this.hoveredCanvas = this.canvases[0].element,
		this.canvases.length >= 2 && (this.canvases[1].element.toDataURL = function (t) {
			return e.canvases[0].element.toDataURL(t)
		});
		for (var o = 0; o < this.opts.viewConfigs.length; o++)
			$(this.canvases[o].element).on("contextmenu", this.contextMenuHandler);
		$(window).resize(function () {
			e.updateSize()
		})
	},
	t.prototype.setViewConfigAndShow = function (t, e) {
		this.currentApp = e,
		this.canvases[0].config = t,
		this.updateSize(),
		this.zoomToFit(!0),
		this.showing = !0,
		this.refreshAllViews()
	},
	t.prototype.getScreenShotCanvas = function () {
		if (1 == this.numVisibleCanvases())
			return this.canvases[0];
		for (var t = this.opts.canvasDiv.outerWidth(), e = this.opts.canvasDiv.outerHeight(), o = new CanvasEx(t, e), i = o.context(), r = 0, s = 0; r < this.canvases.length; r++) {
			var n = this.canvases[r];
			n.config.isVisible && (i.drawCanvasEx2(n, n.left, n.top, n.width(), n.height()),
				s++)
		}
		return o
	},
	t.prototype.takeScreenShot = function () {
		var t = this.getScreenShotCanvas();
		WorkerApi.send({
			command: "ScreenShot",
			index: -1,
			screenShot: t.element.toDataURL("png")
		})
	},
	t.canvasFromEventTargetOrNull = function (t) {
		return t && "canvas" == t.tagName.toLowerCase() ? t : null
	},
	t.prototype.viewportCanvasFromEventOrNull = function (e) {
		var o = t.canvasFromEventTargetOrNull(e);
		return null == o ? null : Util.find(this.canvases, function (t) {
			return t.element == o
		})
	},
	t.touchDistance = function (t, e) {
		return Math.sqrt(Util.sqr(t.pageX - e.pageX) + Util.sqr(t.pageY - e.pageY))
	},
	t.prototype.touchCheckPinch = function (e) {
		if (e.touches.length > 1) {
			var o = Math.max(1, t.touchDistance(e.touches.item(0), e.touches.item(1)));
			if (this.pinchIsActive) {
				var i = o / this.pinchInitialDistance;
				this.setView(this.imageCenterX_o, this.imageCenterY_o, this.pinchInitialZoom * i)
			} else
				this.pinchInitialDistance = o,
				this.pinchInitialZoom = this.zoomScale,
				this.pinchIsActive = !0
		} else
			this.pinchIsActive = !1
	},
	t.prototype.releaseTempSelectIfMouseNotDown = function () {
		this.mouseIsDown || ToolMode.releaseTempSelect()
	},
	t.prototype.updatePanTempSelect = function () {
		this.shiftIsDown || this.overPanCanvas ? ToolMode.setTempSelect(ToolMode.Grab) : ToolMode.releaseTempSelect()
	},
	t.prototype.o2cX = function (t) {
		return this.imageLeft_c + t * this.zoomScale
	},
	t.prototype.o2cY = function (t) {
		return this.imageTop_c + t * this.zoomScale
	},
	t.prototype.updateCoords = function (t, e, o) {
		if (null != o) {
			var i = Callbacks.M.totalRotationAngleRad_o2i();
			if (null != t && null != e) {
				var r = $(o).offset();
				this.mouseX_c = t - r.left,
				this.mouseY_c = e - r.top
			}
			this.mouseX_o = (this.mouseX_c - o.width / 2) / this.zoomScale + this.imageCenterX_o,
			this.mouseY_o = (this.mouseY_c - o.height / 2) / this.zoomScale + this.imageCenterY_o;
			var s = this.mouseX_o - this.imageCenterX_i,
			n = this.mouseY_o - this.imageCenterY_i;
			this.mouseX_i = s * Math.cos(i) - n * Math.sin(i) + this.imageCenterX_i,
			this.mouseY_i = s * Math.sin(i) + n * Math.cos(i) + this.imageCenterY_i,
			this.mouseX_ii = Math.floor(this.mouseX_i),
			this.mouseY_ii = Math.floor(this.mouseY_i),
			this.updateCanvasCoords(o),
			this.hoveredCanvas = o
		}
	},
	t.prototype.tx_i2o = function (t, e) {
		var o = Callbacks.M.totalRotationAngleRad_i2o();
		t.rotateInto(Math.cos(o), Math.sin(o), this.imageCenterX_i, this.imageCenterY_i, e)
	},
	t.prototype.getViewCenter_i = function () {
		if (null != this.imageCenterX_o) {
			var t = this.imageCenterX_o - this.imageCenterX_i,
			e = this.imageCenterY_o - this.imageCenterY_i,
			o = Callbacks.M.totalRotationAngleRad_o2i(),
			i = t * Math.cos(o) - e * Math.sin(o) + this.imageCenterX_i,
			r = t * Math.sin(o) + e * Math.cos(o) + this.imageCenterY_i;
			return new Point(i, r)
		}
		return null
	},
	t.prototype.updateCanvasCoords = function (t) {
		this.imageLeft_c = t.width / 2 - this.imageCenterX_o * this.zoomScale,
		this.imageTop_c = t.height / 2 - this.imageCenterY_o * this.zoomScale,
		this.imageWidth_c = this.imageWidth * this.zoomScale,
		this.imageHeight_c = this.imageHeight * this.zoomScale,
		this.imageCenterX_c = this.imageLeft_c + this.imageWidth_c / 2,
		this.imageCenterY_c = this.imageTop_c + this.imageHeight_c / 2;
		var e = Callbacks.M.getCrop_o();
		this.crop_c.left0 = Math.floor(this.o2cX(e.left0)),
		this.crop_c.right0 = Math.ceil(this.o2cX(e.right0)),
		this.crop_c.top0 = Math.floor(this.o2cY(e.top0)),
		this.crop_c.bottom0 = Math.ceil(this.o2cY(e.bottom0))
	},
	t.prototype.getCrop_c = function () {
		return this.crop_c
	},
	t.prototype.getMouse_c = function () {
		return new Point(this.mouseX_c, this.mouseY_c)
	},
	t.prototype.getClick_c = function () {
		return new Point(this.clickX_c, this.clickY_c)
	},
	t.prototype.getMouse_i = function () {
		return new Point(this.mouseX_i, this.mouseY_i)
	},
	t.prototype.getMouse_ii = function () {
		return new Point(this.mouseX_ii, this.mouseY_ii)
	},
	t.prototype.getImageCenter_c = function () {
		return new Point(this.imageCenterX_c, this.imageCenterY_c)
	},
	t.prototype.getImageCenter_i = function () {
		return new Point(this.imageCenterX_i, this.imageCenterY_i)
	},
	t.prototype.getMouseIsDown = function () {
		return this.mouseIsDown
	},
	t.prototype.getZoomScale = function () {
		return this.zoomScale
	},
	t.prototype.getShiftIsDown = function () {
		return this.shiftIsDown
	},
	t.prototype.diameter = function () {
		return Util.clamp(Math.floor(ToolMode.getVisibleMode().diameterScale * Callbacks.M.settings.brushSize / this.zoomScale), 1, window.Globals.MaxBrushDiameter)
	},
	t.prototype.rotationCropUpdated = function (t, e) {
		var o = new Point(this.imageCenterX_o, this.imageCenterY_o);
		o.rotateInPlace(e - t, this.imageCenter_i),
		this.setView(o.x, o.y, this.zoomScale, !0)
	},
	t.prototype.setView = function (e, o, i, r, s) {
		void 0 === r && (r = !1),
		void 0 === s && (s = !1),
		null == i && (i = this.zoomScale);
		var n = Callbacks.M.getCrop_o(),
		a = Util.clamp(e, n.left0, n.right0),
		l = Util.clamp(o, n.top0, n.bottom0),
		p = Util.clamp(i, t.minZoomScale, t.maxZoomScale);
		a == this.imageCenterX_o && l == this.imageCenterY_o && p == this.zoomScale || (this.imageCenterX_o = a,
			this.imageCenterY_o = l,
			this.zoomScale = p,
			s || this.updateCoords(null, null, this.hoveredCanvas),
			r || this.refreshAllViews(),
			Const.ScreenshotMode && $("#viewport-setting").val(this.toString()))
	},
	t.prototype.toString = function () {
		return "" + this.imageCenterX_o + "," + this.imageCenterY_o + "," + this.zoomScale
	},
	t.prototype.fromString = function (t) {
		try {
			var e = t.split(",");
			this.setView(parseFloat(e[0]), parseFloat(e[1]), parseFloat(e[2]))
		} catch (t) {}
	},
	t.prototype.moveLeft = function (e) {
		this.animate( - (e ? 1 : t.moveStep) / this.zoomScale, 0, 1)
	},
	t.prototype.moveRight = function (e) {
		this.animate((e ? 1 : t.moveStep) / this.zoomScale, 0, 1)
	},
	t.prototype.moveUp = function (e) {
		this.animate(0,  - (e ? 1 : t.moveStep) / this.zoomScale, 1)
	},
	t.prototype.moveDown = function (e) {
		this.animate(0, (e ? 1 : t.moveStep) / this.zoomScale, 1)
	},
	t.prototype.animateZoomToFit = function () {
		this.clearAnimation(),
		this.animation.ignoreClear = !0;
		var e = Callbacks.M.getCrop_o(),
		o = Math.min(this.canvases[0].width() / e.width(), this.canvases[0].height() / e.height()) * t.zoomToFitBackOff / this.zoomScale;
		this.animate(e.centerX() - this.imageCenterX_o, e.centerY() - this.imageCenterY_o, o)
	},
	t.prototype.zoomAboutBy = function (t, e, o) {
		this.zoomAboutTo(t, e, this.zoomScale * o)
	},
	t.prototype.zoomToFit = function (e) {
		if (void 0 === e && (e = !0),
			this.initialized) {
			var o = Callbacks.M.getCrop_o(),
			i = Math.min(this.canvases[0].width() / o.width(), this.canvases[0].height() / o.height()) * t.zoomToFitBackOff;
			this.setView(o.centerX(), o.centerY(), i),
			e && this.refreshAllViews()
		}
	},
	t.prototype.zoomToFitTight = function (t) {
		void 0 === t && (t = !0);
		var e = Callbacks.M.getCrop_o(),
		o = Math.max(this.canvases[0].width() / e.width(), this.canvases[0].height() / e.height());
		this.setView(e.centerX(), e.centerY(), o),
		t && this.refreshAllViews()
	},
	t.prototype.numVisibleCanvases = function () {
		for (var t = 0, e = 0; e < this.canvases.length; e++)
			this.canvases[e].config.isVisible && t++;
		return t
	},
	t.prototype.setVisible = function (t, e) {
		if (t >= 0 && t < this.canvases.length) {
			var o = this.canvases[t];
			o.config.isVisible = e,
			$(o.element).toggle(e)
		}
	},
	t.prototype.setBorderRight = function (t, e) {
		t >= 0 && t < this.canvases.length && (this.canvases[t].config.borderRight = e)
	},
	t.prototype.setBorderLeft = function (t, e) {
		t >= 0 && t < this.canvases.length && (this.canvases[t].config.borderLeft = e)
	},
	t.prototype.zoomAboutTo = function (e, o, i) {
		if (i !== this.zoomScale) {
			i = Util.clamp(i, t.minZoomScale, t.maxZoomScale);
			var r = e - this.canvases[0].width() / 2,
			s = o - this.canvases[0].height() / 2,
			n = this.imageCenterX_o + r / this.zoomScale - r / i,
			a = this.imageCenterY_o + s / this.zoomScale - s / i;
			this.setView(n, a, i)
		}
	},
	t.prototype.animate = function (e, o, i) {
		var r = this,
		s = r.animation;
		s.startOffsetX = r.imageCenterX_o,
		s.startOffsetY = r.imageCenterY_o,
		s.startZoom = r.zoomScale,
		s.startTime = Date.now(),
		null == s.id && (s.targetOffsetX = r.imageCenterX_o,
			s.targetOffsetY = r.imageCenterY_o,
			s.targetZoom = r.zoomScale,
			s.id = setInterval(function () {
					r.offsetAnimationStep()
				}, t.animationInterval)),
		s.targetOffsetX += e,
		s.targetOffsetY += o,
		s.targetZoom *= i,
		Callbacks.M.Review.reset()
	},
	t.prototype.animateTo_o = function (e, o, i) {
		var r = this,
		s = r.animation;
		s.startOffsetX = r.imageCenterX_o,
		s.startOffsetY = r.imageCenterY_o,
		s.startZoom = r.zoomScale,
		s.startTime = Date.now(),
		null == s.id && (s.targetOffsetX = r.imageCenterX_o,
			s.targetOffsetY = r.imageCenterY_o,
			s.targetZoom = r.zoomScale,
			s.id = setInterval(function () {
					r.offsetAnimationStep()
				}, t.animationInterval)),
		s.targetOffsetX = e,
		s.targetOffsetY = o,
		s.targetZoom = i
	},
	t.prototype.animateTo_i = function (t, e) {
		var o = Point.empty();
		this.tx_i2o(t, o),
		this.animateTo_o(o.x, o.y, Math.max(e, this.zoomScale))
	},
	t.prototype.offsetAnimationStep = function () {
		var e = this,
		o = e.animation,
		i = Date.now(),
		r = (i - o.startTime) / t.animationDuration,
		s = Util.clamp(r, 0, 1),
		n = o.startOffsetX + s * (o.targetOffsetX - o.startOffsetX),
		a = o.startOffsetY + s * (o.targetOffsetY - o.startOffsetY),
		l = Math.exp(Math.log(o.startZoom) + s * (Math.log(o.targetZoom) - Math.log(o.startZoom)));
		s >= 1 && e.clearAnimation(!0),
		e.setView(n, a, l, !1, e.mouseX_ii == t.OffScreen)
	},
	t.prototype.clearAnimation = function (t) {
		void 0 === t && (t = !1);
		var e = this,
		o = e.animation;
		!t && o.ignoreClear || (o.id && clearInterval(o.id),
			o.startOffsetX = null,
			o.startOffsetY = null,
			o.startZoom = null,
			o.targetOffsetX = null,
			o.targetOffsetY = null,
			o.targetZoom = null,
			o.startTime = null,
			o.id = null,
			o.ignoreClear = !1)
	},
	// 绘制边缘的起始
	t.prototype.refreshView = function (t) {
		function e(t, e, o, r) {
			i.beginPath(),
			i.moveTo(Math.floor(t) + .5, Math.floor(e) + .5),
			i.lineTo(Math.floor(o) + .5, Math.floor(r) + .5),
			i.stroke()
		}
		var o = this;
		if (t && this.showing) {
			var i = t.context(),
			r = t.config;
			if (i.setGlobalAlpha(1),
				i.clearRect(0, 0, t.width(), t.height()),
				Util.imageIsReady(this.opts.image)) {
				this.updateCanvasCoords(t.element),
				i.setFillStyle(i.createPattern(ViewPort.checkerPng, "repeat")),
				i.fillRect(0, 0, t.width(), t.height()),
				i.setGlobalAlpha(1),
				r.showBackground && Callbacks.M.settings.backgroundColor && "" != Callbacks.M.settings.backgroundColor && Callbacks.M.settings.backgroundColor != window.Globals.BackgroundColors[0] && (i.setFillStyle(Callbacks.M.settings.backgroundColor),
					i.fillRect(this.crop_c.left0, this.crop_c.top0, this.crop_c.width(), this.crop_c.height()));
				var s = this.getCrop_c();
				if (i.clipBlock(r.clip, s.left0, s.top0, s.right0, s.bottom0, function () {
						o.drawClipped(t, i, r)
					}),
					!r.showFrame && 0 == Callbacks.M.settings.straightenAngleDeg || Const.ScreenshotMode || (i.setStrokeStyle("#000000"),
						i.setGlobalAlpha(.4),
						i.setLineWidth(1),
						i.strokeRect(this.crop_c.left0 + .5, this.crop_c.top0 + .5, this.crop_c.width() - 1, this.crop_c.height() - 1)),
					this.currentApp.drawOver_c(t, i),
					r.title && !Const.ScreenshotMode && i.drawCenteredText(r.title, 20),
					r.filename && !Const.ScreenshotMode && i.drawCenteredText(r.filename, t.height() - 20),
					this.opts.showGrid && this.opts.showGrid()) {
					i.setGlobalAlpha(.2),
					i.setStrokeStyle("#000000"),
					i.setLineWidth(1);
					for (var n = t.width(), a = t.height(), l = 100, p = 0; p < n / 2; p += l)
						e(n / 2 + p, 0, n / 2 + p, a),
						e(n / 2 - p, 0, n / 2 - p, a);
					for (var c = 0; c < a / 2; c += l)
						e(0, a / 2 + c, n, a / 2 + c),
						e(0, a / 2 - c, n, a / 2 - c)
				}
				var u = t.height(),
				d = "#222",
				h = "#777",
				g = "#bbb",
				f = 1,
				w = 1;
				if (i.setGlobalAlpha(1),
					r.borderLeft && (i.setFillStyle(h),
						i.fillRect(0, 0, w, u),
						i.setFillStyle(d),
						i.fillRect(w, 0, f, u)),
					r.borderRight) {
					var S = t.width() - f - w;
					i.setFillStyle(h),
					i.fillRect(S + f, 0, w, u),
					i.setFillStyle(g),
					i.fillRect(S, 0, f, u)
				}
				if (Const.ScreenshotMode && (r.showHoverTool || 1 == this.canvases.length)) {
					var m = ToolMode.getActiveMode().getCursor();
					m && (i.setGlobalAlpha(1),
						i.drawImage(m.img, this.mouseX_c - m.x, this.mouseY_c - m.y))
				}
			}
		}
	},
	// 绘制路径的初始方法
	t.prototype.drawClipped = function (t, e, o) {
		function i(t, o, i, s) {
			if (t) {
				e.setGlobalAlpha(o);
				var n = t.width(),
				a = t.height();
				e.drawCanvasEx3(t, 0, 0, n, a, r.imageLeft_c + i * r.zoomScale, r.imageTop_c + s * r.zoomScale, n * r.zoomScale, a * r.zoomScale)
			}
		}
		var r = this;
		o.showPreview && ViewPort.ShadowApp && ViewPort.ShadowApp.drawUnder_c(t, e, this, i),
		e.rotatedFrame(-Callbacks.M.totalRotationAngleRad_o2i(), this.getImageCenter_c(), function () {
			r.drawRotated(t, e, o)
		})
	},
	// 重点，画路径的时候调用了这里
	// 就是这个方法！！！！！！ 黄色的路径就是这里绘制的，终于让老子找到了，太不容易了
	t.prototype.drawRotated = function (t, e, o) {
		function i(t, o) {
			e.setGlobalAlpha(o),
			e.drawCanvasEx3(t, 0, 0, h.imageWidth, h.imageHeight, h.imageLeft_c, h.imageTop_c, h.imageWidth_c, h.imageHeight_c)
		}
		function r(t, o, i, r) {
			if (t) {
				e.setGlobalAlpha(o);
				var s = t.width(),
				n = t.height();
				e.drawCanvasEx3(t, 0, 0, s, n, h.imageLeft_c + i * h.zoomScale, h.imageTop_c + r * h.zoomScale, s * h.zoomScale, n * h.zoomScale)
			}
		}
		function s(t, o) {
			e.setStrokeStyle(t),
			e.setLineWidth(o),
			e.stroke()
		}
		function n(t, o) {
			e.setGlobalAlpha(o ? .25 : .125);
			var i = m * Sword.ExtendMultiplier,
			r = h.o2cX(t.x),
			n = h.o2cY(t.y);
			e.fillCircle(r, n, i, "#FFFFFF"),
			s("#000000", C)
		}
		function a(t, o) {
			e.setGlobalAlpha(1);
			var i = m,
			r = .8 * i / Math.sqrt(2),
			n = h.o2cX(t.x),
			a = h.o2cY(t.y);
			e.fillCircle(n, a, i, o ? ViewPort.SwordActiveRed : ViewPort.SwordInactiveRed),
			e.beginPath(),
			e.moveTo(n - r, a - r),
			e.lineTo(n + r, a + r),
			e.moveTo(n - r, a + r),
			e.lineTo(n + r, a - r),
			s(o ? "#FFFFFF" : "#DDDDDD", C)
		}
		function l(t, o) {
			e.setGlobalAlpha(1);
			var i = m,
			r = .8 * i,
			n = h.o2cX(t.x),
			a = h.o2cY(t.y);
			e.fillCircle(n, a, i, o ? ViewPort.SwordActiveGreen : ViewPort.SwordInactiveGreen),
			e.beginPath(),
			e.moveTo(n - r, a),
			e.lineTo(n + r, a),
			e.moveTo(n, a + r),
			e.lineTo(n, a - r),
			s(o ? "#FFFFFF" : "#DDDDDD", C)
		}
		function p(t, o, i) {
			void 0 === i && (i = !1),
			e.setGlobalAlpha(1),
			i ? (e.fillSquare(h.o2cX(t.x), h.o2cY(t.y), m - 2, "#000000"),
				e.fillSquare(h.o2cX(t.x), h.o2cY(t.y), m - 3, o)) : (e.fillCircle(h.o2cX(t.x), h.o2cY(t.y), m, "#000000"),
				e.fillCircle(h.o2cX(t.x), h.o2cY(t.y), m - 1, o))
		}
		function c(t, o) {
			e.setGlobalAlpha(1),
			e.beginPath(),
			e.moveTo(h.o2cX(t.p0.x), h.o2cY(t.p0.y)),
			t.isLine ? e.lineTo(h.o2cX(t.p2.x), h.o2cY(t.p2.y)) : e.quadraticCurveTo(h.o2cX(t.p1.x), h.o2cY(t.p1.y), h.o2cX(t.p2.x), h.o2cY(t.p2.y)),
			s("#000000", Const.LineOuterWidth),
			s(o, Const.LineInnerWidth)
		}
		function u(t) {
			return t.active ? ViewPort.SwordPointActiveColor : ViewPort.SwordPointInactiveColor
		}
		function d(t) {
			return t.active ? ViewPort.SwordMidpointActiveColor : ViewPort.SwordMidpointInactiveColor
		}
		var h = this;
		if (o.showPreview && ViewPort.ShadowApp && ViewPort.ShadowApp.drawUnder_i(t, e, this, r),
			o.showOriginal && i(h.opts.image, 1),
			o.showPreview && i(Callbacks.M.previewCanvas, 1),
			o.showUserMask && i(Callbacks.M.userMask, window.Globals.ClientMaskAlphaFloat),
			o.showHairMask && i(Callbacks.M.hairMask, window.Globals.ClientMaskAlphaFloat),
			o.showBeziers) {
			e.setGlobalAlpha(1),
			e.setLineJoin("bevel");
			for (var g = 0; g < Callbacks.M.bezierSet.length; g++) {
				var f = Callbacks.M.bezierSet[g];
				e.beginPath(),
				e.moveTo(h.o2cX(f[0]), h.o2cY(f[1]));
				for (var w = 2; w < f.length; w += 4)
					e.quadraticCurveTo(h.o2cX(f[w]), h.o2cY(f[w + 1]), h.o2cX(f[w + 2]), h.o2cY(f[w + 3]));
				s("#000000", Const.LineOuterWidth),
				s("#FFFF66", Const.LineInnerWidth)
			}
			e.setFillStyle("#000");
			for (var g = 0; g < Callbacks.M.detectedCorners.length; g++) {
				var S = Callbacks.M.detectedCorners[g];
				e.fillCircle(h.o2cX(S.x), h.o2cY(S.y), Const.LineOuterWidth / 2)
			}
		}
		if (o.showSword) {
			for (var m = Sword.computeInnerRadius_c(h.zoomScale), C = m / 3, g = 0; g < Sword.swords.polyBeziers.length; g++) {
				var y = Sword.swords.polyBeziers[g];
				e.setGlobalAlpha(1),
				e.beginPath(),
				e.moveTo(h.o2cX(y.beziers[0].p0.x), h.o2cY(y.beziers[0].p0.y));
				for (var v = 0; v < y.beziers.length; v++) {
					var b = y.beziers[v];
					b.isLine ? e.lineTo(h.o2cX(b.p2.x), h.o2cY(b.p2.y)) : e.quadraticCurveTo(h.o2cX(b.p1.x), h.o2cY(b.p1.y), h.o2cX(b.p2.x), h.o2cY(b.p2.y))
				}
				s("#000000", Const.LineOuterWidth),
				s(y.active ? ViewPort.SwordActiveColor : ViewPort.SwordInactiveColor, Const.LineInnerWidth)
			}
			if (ToolMode.getSelectedMode() == ToolMode.Sword)
				for (var g = 0; g < Sword.swords.polyBeziers.length; g++)
					for (var y = Sword.swords.polyBeziers[g], M = u(y), k = d(y), v = 0; v < y.beziers.length; v++) {
						var b = y.beziers[v];
						p(b.p0, M),
						p(b.p2, M),
						p(b.mp, k, !0)
					}
			if (ToolMode.getActiveMode() == ToolMode.Sword) {
				var T = Sword.hoverState;
				if (T.active) {
					var x = 0 == T.zone,
					A = x ? ViewPort.SwordMoveColor : T.sword.active ? ViewPort.SwordPointActiveSelectedColor : ViewPort.SwordPointInactiveSelectedColor,
					P = 2 == T.zone,
					_ = 3 == T.zone,
					D = 1 == T.zone;
					switch (T.pointType) {
					case 0:
						P ? (c(T.bezier, ViewPort.SwordActiveRed),
							p(T.bezier.p0, 0 == T.iBezier ? ViewPort.SwordActiveRed : u(T.sword)),
							p(T.bezier.p2, T.iBezier == T.sword.beziers.length - 1 ? ViewPort.SwordActiveRed : u(T.sword))) : _ && (p(T.bezier.eval(.25), ViewPort.SwordActiveGreen, !0),
							p(T.bezier.eval(.75), ViewPort.SwordActiveGreen, !0)),
						p(T.point, P ? ViewPort.SwordActiveRed : A, !_),
						a(T.deletePoint, P),
						l(T.plusPoint, _);
						break;
					case 2:
						if (P) {
							c(T.bezier, ViewPort.SwordActiveRed),
							p(T.bezier.mp, ViewPort.SwordActiveRed, !0);
							var R = T.bezier.getPoint(0 == T.iPoint ? 2 : 0);
							p(R, 1 == T.sword.beziers.length ? ViewPort.SwordActiveRed : u(T.sword))
						} else
							D && (e.setGlobalAlpha(1),
								e.beginPath(),
								e.moveTo(h.o2cX(T.point.x), h.o2cY(T.point.y)),
								e.lineTo(h.o2cX(h.mouseX_i), h.o2cY(h.mouseY_i)),
								s("#000000", Const.LineOuterWidth),
								s(ViewPort.SwordActiveGreen, Const.LineInnerWidth));
						n(T.point, D),
						p(T.point, P ? ViewPort.SwordActiveRed : A),
						a(T.deletePoint, P);
						break;
					case 1:
						if (P) {
							var E = T.sword.beziers[T.iBezier + (0 == T.iPoint ? -1 : 1)];
							c(E, ViewPort.SwordActiveRed),
							c(T.bezier, ViewPort.SwordActiveRed),
							p(T.bezier.mp, ViewPort.SwordActiveRed, !0),
							p(E.mp, ViewPort.SwordActiveRed, !0);
							var F = new Bezier(E.getPoint(T.iPoint), new Point(0, 0), T.bezier.getPoint(0 == T.iPoint ? 2 : 0));
							F.mp.set(T.point),
							F.updateP1FromMp(),
							c(F, ViewPort.SwordActiveGreen),
							p(F.p0, u(T.sword)),
							p(F.mp, d(T.sword), !0),
							p(F.p2, u(T.sword))
						}
						p(T.point, A),
						a(T.deletePoint, P)
					}
				}
				var z = Sword.inProgress.downState;
				z && z.point && 0 == z.zone && p(z.point, ViewPort.SwordMoveColor, 0 == z.pointType)
			}
			if (Sword.swords.polyBeziers.length > 0)
				for (var g = 0; g < Sword.swordIntersections.length; g++) {
					var S = Sword.swordIntersections[g],
					B = h.o2cX(S.x),
					U = h.o2cY(S.y),
					O = 1.5 * m;
					e.strokeCircle(B, U, O, "#FF0000"),
					e.strokeCircle(B, U, O - 1, "#880000")
				}
		}
		if (o.showReviewCursor) {
			var I = Callbacks.M.Review.currentCenter_i;
			if (isFinite(I.x) && isFinite(I.y)) {
				var B = h.o2cX(I.x),
				U = h.o2cY(I.y);
				e.fillCircle(B, U, Const.LineOuterWidth, "#F00")
			}
		}
		if (o.showEyeDropperLoupe && ToolMode.getActiveMode().isEyeDropper && h.hoveredCanvas == t.element || o.showHairEraserLoupe && ToolMode.getActiveMode() == ToolMode.HairEraser && h.hoveredCanvas == t.element) {
			e.setGlobalAlpha(1);
			var $ = Math.round(Const.LoupeRadius / h.zoomScale),
			L = Math.max(0, h.mouseX_ii - $),
			V = Math.min(h.imageWidth, h.mouseX_ii + $) - L,
			G = Math.max(0, h.mouseY_ii - $),
			H = Math.min(h.imageHeight, h.mouseY_ii + $) - G;
			H > 0 && V > 0 && (e.drawCanvasEx3(h.opts.image, L, G, V, H, h.o2cX(L), h.o2cY(G), V * h.zoomScale, H * h.zoomScale),
				e.beginPath(),
				e.rect(h.o2cX(L), h.o2cY(G), V * h.zoomScale, H * h.zoomScale),
				s("#FFFF66", 2))
		}
		if (ToolMode.isNot(ToolMode.Grab) && o.showHoverTool) {
			var W = ToolMode.getActiveMode();
			if (W.needsHover) {
				e.setGlobalAlpha(.4),
				e.setFillStyle(W.cssColor);
				var X = h.diameter(),
				N = Math.floor(X / 2),
				Y = X - N,
				q = Math.round(h.imageLeft_c + (h.mouseX_ii - N) * h.zoomScale),
				J = Math.round(h.imageTop_c + (h.mouseY_ii - N) * h.zoomScale),
				j = Math.round(h.imageLeft_c + (h.mouseX_ii + Y) * h.zoomScale),
				Q = Math.round(h.imageTop_c + (h.mouseY_ii + Y) * h.zoomScale);
				if (W.isEraser)
					e.fillRect(q, J, j - q, Q - J);
				else {
					var K = W.getBrush(X);
					e.drawCanvasEx2(K, q, J, j - q, Q - J)
				}
			}
		}
		if (o.showUserMask && SavedMask.pasteButtonIsHovered) {
			var Z = SavedMask.getMask();
			null != Z && (e.setGlobalAlpha(.5 * window.Globals.ClientMaskAlphaFloat),
				e.drawCanvasEx3(Z, 0, 0, Z.width(), Z.height(), h.imageLeft_c, h.imageTop_c, h.imageWidth_c, h.imageHeight_c))
		}
		h.currentApp.drawOver_i(t, e)
	},
	t.OffScreen = -1e4,
	t.animationInterval = 10,
	t.animationDuration = 100,
	t.moveStep = 50,
	t.zoomStep = 1.2,
	t.inverseZoomStep = 1 / t.zoomStep,
	t.zoomToFitBackOff = .9,
	t.maxZoomScale = 64,
	t.minZoomScale = 1 / 16,
	t
}
(), ViewPort;
!function (t) {
	function e() {
		t.main.refreshAllViews(),
		t.subViewPort.refreshAllViews()
	}
	t.SwordActiveGreen = "#00cc00",
	t.SwordInactiveGreen = "rgb(60,120,60)",
	t.SwordActiveRed = "#cc0000",
	t.SwordInactiveRed = "rgb(120,60,60)",
	t.SwordMoveColor = "#FFFFFF",
	t.SwordMidpointInactiveColor = "#444444",
	t.SwordMidpointActiveColor = "#995200",
	t.SwordInactiveColor = "#888888",
	t.SwordActiveColor = "#FF8800",
	t.SwordPointInactiveSelectedColor = "#bbbbbb",
	t.SwordPointActiveSelectedColor = "#FFB866",
	t.SwordPointActiveColor = "#E67A00",
	t.SwordPointInactiveColor = "#888888",
	t.checkerPng = new Image,
	t.checkerPng.src = "data:image/gif;base64,R0lGODdhEAAQAIAAAP///8zMzCwAAAAAEAAQAAACH4RvoauIzNyBSyYaLMDZcv15HAaSIlWiJ5Sya/RWVgEAOw==",
	t.main = new ViewPortEx("main"),
	t.subViewPort = new ViewPortEx("subapp"),
	t.ShadowApp = null,
	t.refreshAllViews = e
}
(ViewPort || (ViewPort = {}));
var BufferWriter = function () {
	function t(t) {
		void 0 === t && (t = 32),
		this.pos = 0,
		this.data = new Uint8Array(t)
	}
	return t.prototype.ensure = function (t) {
		if (t > this.data.length) {
			for (var e = new Uint8Array(Math.max(t, 2 * this.data.length)), o = 0; o < this.pos; o++)
				e[o] = this.data[o];
			this.data = e
		}
	},
	t.prototype.size = function () {
		return this.pos
	},
	t.prototype.reset = function () {
		this.pos = 0
	},
	t.prototype.writeUintVariableLength = function (e) {
		e &= t.MaskInput,
		e <= t.Size0 ? this.writeUint8(t.Code0 | t.MaskLower & e) : e <= t.Size1 ? (this.writeUint8(t.Code1 | t.MaskLower & e >>> 8),
			this.writeUint8(e)) : e <= t.Size2 ? (this.writeUint8(t.Code2 | t.MaskLower & e >>> 16),
			this.writeUint8(e >>> 8),
			this.writeUint8(e)) : e <= t.Size3 ? (this.writeUint8(t.Code3 | t.MaskLower & e >>> 24),
			this.writeUint8(e >>> 16),
			this.writeUint8(e >>> 8),
			this.writeUint8(e)) : Util.fatalErrorStr("BufferWriter.writeUintVariableLength: unexpectedly large value " + e)
	},
	t.prototype.writeUint8 = function (t) {
		this.ensure(this.pos + 1),
		this.data[this.pos++] = 255 & t
	},
	t.prototype.writeUint16 = function (t) {
		this.ensure(this.pos + 2),
		this.writeUint8(255 & t >> 8),
		this.writeUint8(255 & t)
	},
	t.prototype.writeUint24 = function (t) {
		this.ensure(this.pos + 3),
		this.writeUint8(255 & t >> 16),
		this.writeUint8(255 & t >> 8),
		this.writeUint8(255 & t)
	},
	t.prototype.writeUint32 = function (t) {
		this.ensure(this.pos + 4),
		this.writeUint8(255 & t >> 24),
		this.writeUint8(255 & t >> 16),
		this.writeUint8(255 & t >> 8),
		this.writeUint8(255 & t)
	},
	t.prototype.toBase64 = function () {
		return Base64.encode(this.data, this.pos)
	},
	t.Size0 = 63,
	t.Size1 = 16383,
	t.Size2 = 4194303,
	t.Size3 = 1073741823,
	t.Code0 = 0,
	t.Code1 = 64,
	t.Code2 = 128,
	t.Code3 = 192,
	t.MaskLower = 63,
	t.MaskInput = 1073741823,
	t
}
(), RgbHistogram = function () { // rgb直方图，websocket中传输，并不清楚有什么卵用
	function t() {
		this.data = new Float32Array(t.NumBins)
	}
	return t.clamp = function (e) {
		return Math.max(0, Math.min(e, t.LinearSize - 1))
	},
	t.prototype.addWeight = function (e, o, i, r) {
		var s = t.clamp(e) * t.SquaredSize + t.clamp(o) * t.LinearSize + t.clamp(i);
		this.data[s] = this.data[s] + r
	},
	t.prototype.add = function (e, o, i) {
		var r = e / t.BinWidth,
		s = o / t.BinWidth,
		n = i / t.BinWidth,
		a = Math.floor(r - .5),
		l = Math.floor(s - .5),
		p = Math.floor(n - .5),
		c = r - (a + .5),
		u = s - (l + .5),
		d = n - (p + .5);
		this.addWeight(a, l, p, (1 - c) * (1 - u) * (1 - d)),
		this.addWeight(a, l, p + 1, (1 - c) * (1 - u) * d),
		this.addWeight(a, l + 1, p, (1 - c) * u * (1 - d)),
		this.addWeight(a, l + 1, p + 1, (1 - c) * u * d),
		this.addWeight(a + 1, l, p, c * (1 - u) * (1 - d)),
		this.addWeight(a + 1, l, p + 1, c * (1 - u) * d),
		this.addWeight(a + 1, l + 1, p, c * u * (1 - d)),
		this.addWeight(a + 1, l + 1, p + 1, c * u * d)
	},
	t.prototype.findMaxBinCenter = function () {
		for (var e = -1, o = -1, i = -1, r = -1, s = 0, n = 0; s < t.LinearSize; s++)
			for (var a = 0; a < t.LinearSize; a++)
				for (var l = 0; l < t.LinearSize; l++,
					n++)
					this.data[n] > r && (r = this.data[n],
						e = s,
						o = a,
						i = l);
		var p = (e + .5) * t.BinWidth,
		c = (o + .5) * t.BinWidth,
		u = (i + .5) * t.BinWidth;
		return 255 << 24 | (255 & p) << 16 | (255 & c) << 8 | 255 & u
	},
	t.prototype.printStats = function () {
		for (var t = 0, e = 0; e < this.data.length; e++)
			t += this.data[e]
	},
	t.prototype.encode = function () {
		for (var t = new BufferWriter, e = this.data, o = 0, i = 0, r = 0, s = ""; i < e.length; ) {
			for (; i < e.length && 0 == Math.floor(e[i]); )
				i++;
			if (i != e.length) {
				var n = i - o,
				a = Math.floor(e[i]);
				s += n + "," + a + ";",
				t.writeUintVariableLength(n),
				t.writeUintVariableLength(a),
				o = i,
				r++,
				i++
			}
		}
		var l = t.toBase64();
		return l
	},
	t.NumBitsKept = 4,
	t.NumBitsCleared = 8 - t.NumBitsKept,
	t.BinWidth = 1 << t.NumBitsCleared,
	t.LinearSize = 1 << t.NumBitsKept,
	t.SquaredSize = t.LinearSize * t.LinearSize,
	t.CubedSize = t.SquaredSize * t.LinearSize,
	t.NumBins = t.CubedSize,
	t
}
(), BufferReader = function () {
	function t(t) {
		this.data = new Uint8Array(t),
		this.offsetCount = 0
	}
	return t.prototype.length = function () {
		return this.data.length
	},
	t.prototype.hasMore = function () {
		return this.offsetCount < this.data.length
	},
	t.prototype.skip = function (t) {
		this.offsetCount += t
	},
	t.prototype.nonEmpty = function () {
		return this.data.length > 0
	},
	t.prototype.readInt8 = function () {
		return this.data[this.offsetCount++]
	},
	t.prototype.readInt8s = function (t) {
		var e = this.data.slice(this.offsetCount, this.offsetCount + t);
		return this.offsetCount += t,
		e
	},
	t.prototype.readInt16 = function () {
		return 256 * this.data[this.offsetCount++] + this.data[this.offsetCount++]
	},
	t.prototype.readInt24 = function () {
		return 256 * this.data[this.offsetCount++] * 256 + 256 * this.data[this.offsetCount++] + this.data[this.offsetCount++]
	},
	t.prototype.readInt32 = function () {
		return 256 * this.data[this.offsetCount++] * 256 * 256 + 256 * this.data[this.offsetCount++] * 256 + 256 * this.data[this.offsetCount++] + this.data[this.offsetCount++]
	},
	t.prototype.readSignedInt16 = function () {
		var t = this.readInt16();
		return t >= 32768 && (t -= 65536),
		t
	},
	t
}
(), HairPalette = function () {
	function t() {
		this.foregroundPalette = [],
		this.backgroundPalette = []
	}
	return t.prototype.get = function (t) {
		return t ? this.foregroundPalette : this.backgroundPalette
	},
	t
}
(), HairPalettes;
!function (t) {
	function e(t, e, o) {
		$("#hair-palette-swatch-" + t + "-" + e).click(function () {
			h(e, o)
		})
	}
	function o() {
		for (var o = 0; o < t.MaxNumColors; o++)
			e("fg", o, !0),
			e("bg", o, !1)
	}
	function i(t) {
		"undefined" == typeof t && (t = b);
		var e = y[t];
		return Util.join16(e.foregroundPalette, ",") + ";" + Util.join16(e.backgroundPalette, ",")
	}
	function r() {
		for (var e = "", o = 0; o < t.NumPalettes; o++)
			o > 0 && (e += "|"),
			e += i(o);
		return e
	}
	function s(t) {
		return parseInt(t, 16)
	}
	function n(t) {
		return !isNaN(t)
	}
	function a(t) {
		return t.split(",").map(s).filter(n)
	}
	function l(t, e) {
		"undefined" == typeof e && (e = b);
		var o = y[e];
		try {
			var i = t.split(";");
			o.foregroundPalette = a(i[0]),
			o.backgroundPalette = a(i[1])
		} catch (t) {
			o.foregroundPalette = [],
			o.backgroundPalette = []
		}
	}
	function p(e) {
		var o = 0;
		try {
			for (var i = e.split("|"), r = Math.min(i.length, t.NumPalettes); o < r; o++)
				l(i[o], o);
			for (; o < t.NumPalettes; o++)
				l(null, o)
		} catch (e) {
			for (o = 0; o < t.NumPalettes; o++)
				l(null, o)
		}
		S()
	}
	function c(t) {
		return (255 & t[0]) << 16 | (255 & t[1]) << 8 | 255 & t[2]
	}
	function u(t, e) {
		var o = t[0] - (e >> 16 & 255),
		i = t[1] - (e >> 8 & 255),
		r = t[2] - (255 & e);
		return o * o + i * i + r * r
	}
	function d(e, o) {
		for (var i = y[b].get(o), r = 0; r < i.length; r++)
			if (u(e, i[r]) < t.MinDistanceSqr)
				return !1;
		return Undo.push(),
		i.splice(t.MaxNumColors - 1, i.length),
		i.push(c(e)),
		S(),
		Callbacks.M.sendSetHairPalette(b),
		!0
	}
	function h(t, e) {
		var o = y[b].get(e);
		o.length > t && (Undo.push(),
			o.splice(t, 1),
			S(),
			Callbacks.M.sendSetHairPalette(b))
	}
	function g(t) {
		return t = 0 | t,
		"rgb(" + (t >> 16 & 255) + "," + (t >> 8 & 255) + ", " + (255 & t) + ")"
	}
	function f(t, e, o, i) {
		$("#hair-palette-swatch-" + t + "-" + e).css("background-color", o).toggleClass("can-delete", i)
	}
	function w(e, o) {
		for (var i = 0, r = Math.min(t.MaxNumColors, o.length); i < r; i++)
			f(e, i, g(o[i]), !0);
		for (; i < t.MaxNumColors; i++)
			f(e, i, "rgba(0,0,0,0)", !1);
		$("#hair-palette-" + e + "-message").toggle(0 == r)
	}
	function S() {
		var t = y[b];
		w("fg", t.foregroundPalette),
		w("bg", t.backgroundPalette)
	}
	function m(t) {
		var e = ToolMode.PaintHairs.indexOf(t);
		e >= 0 && (b = e,
			$("#hair-palette-popover-arrow").css("left", 44 * (e + .5) + "px"),
			S())
	}
	function C() {
		return b
	}
	t.NumPalettes = window.Globals.HairColors.length,
	t.MaxNumColors = window.Globals.HairMaxNumColors,
	t.MinDistance = 6,
	t.MinDistanceSqr = t.MinDistance * t.MinDistance;
	for (var y = [], v = 0; v < t.NumPalettes; v++)
		y[v] = new HairPalette;
	var b = 0;
	t.initialize = o,
	t.pickle = i,
	t.pickleAll = r,
	t.parse = l,
	t.parseAll = p,
	t.tryAddColor = d,
	t.updatePaletteIndex = m,
	t.getPaletteIndex = C
}
(HairPalettes || (HairPalettes = {}));
var Router;
!function (t) {
	function e(t, e) {
		return "/images/" + t + "/download/" + e
	}
	function o(t, e) {
		return "/images/" + t + "/" + e
	}
	function i(t, e) {
		return "/survey?id=" + t + "&secret=" + e
	}
	function r(t, e, o) {
		return "/internal/redirect?url=" + encodeURIComponent(t) + "&kind=" + encodeURIComponent(e) + "&message=" + encodeURIComponent(o)
	}
	function s(t) {
		return "/api/fetchUrl?url=" + encodeURIComponent(t)
	}
	t.downloadUrl = e,
	t.shareUrl = o,
	t.surveyUrl = i,
	t.redirectUrl = r,
	t.fetchUrl = s
}
(Router || (Router = {}));
var AutoLevels;
!function (t) {
	function e(t) {
		for (var e = t.length / 4, r = Math.min(3e4, e), s = r * o, n = new Uint32Array(1e3), a = 0; a < r; a++) {
			var l = 4 * Util.randomInt(e),
			p = t[l] / 255,
			c = t[l + 1] / 255,
			u = t[l + 2] / 255,
			d = Util.clamp(Math.floor((.2126 * p + .7152 * c + .0722 * u) * n.length), 0, n.length - 1);
			n[d]++
		}
		for (var h = 0, g = 0; h < n.length && (g += n[h],
				!(g >= s)); h++);
		var f = 0;
		for (g = 0; f < n.length && (g += n[n.length - f - 1],
				!(g >= s)); f++);
		h /= n.length,
		f = 1 - f / n.length;
		var w = 1 / f,
		S = 1 / (1 - h / f);
		return w = Util.clamp(Math.floor(100 * (w - 1)), 0, i),
		S = Util.clamp(Math.floor(100 * (S - 1)), 0, i), {
			highlights: w,
			shadows: S
		}
	}
	var o = .05,
	i = 10;
	t.run = e
}
(AutoLevels || (AutoLevels = {}));
var WebApi;
!function (t) {
	function e(t) {
		return function (e, o, i) {
			t(Util.formatXhrError(e, o))
		}
	}
	function o(t, e) {
		return function (o, i, r) {
			o.error ? t(o.error) : e(o)
		}
	}
	function i(t, i, r, s) {
		$.ajax("/api/images", {
			cache: !1,
			data: {
				originalFilename: t.name,
				contentType: t.type,
				w: i.width(),
				h: i.height(),
				sizePixels: i.width() * i.height(),
				sizeBytes: t.size
			},
			dataType: "json",
			error: e(r),
			success: o(r, s),
			type: "POST"
		})
	}
	function r(t, i, r, s) {
		$.ajax("/api/images/" + t + "/" + i, {
			cache: !1,
			dataType: "json",
			error: e(r),
			success: o(r, s),
			type: "GET"
		})
	}
	function s(t, i, r, s, n) {
		$.ajax("/api/images/" + t + "/" + i, {
			cache: !1,
			data: r,
			dataType: "json",
			error: e(s),
			success: o(s, n),
			type: "POST"
		})
	}
	function n(t, i, r, s, n, a, l) {
		$.ajax("/api/imagesEx/" + t, {
			cache: !1,
			data: {
				minId: i,
				maxId: r,
				ids: s,
				q: n
			},
			dataType: "json",
			error: e(a),
			success: o(a, l),
			type: "GET"
		})
	}
	function a(t, i, r) {
		$.ajax("/api/setStickySettings?stickySettings=" + encodeURIComponent(t), {
			cache: !1,
			data: {},
			dataType: "json",
			error: e(i),
			success: o(i, r),
			type: "POST"
		})
	}
	function l(t, e) {
		var o = window.Globals.WorkerUrl;
		o += t,
		o += "?" + window.GlobalsEx.LocaleParameter;
		for (var i in e)
			e.hasOwnProperty(i) && (o += "&" + i + "=" + e[i]);
		return o
	}
	t.createUserImageSpec = i,
	t.readUserImageSpec = r,
	t.updateMetaData = s,
	t.listImagesEx = n,
	t.setStickySettings = a,
	t.getWorkerUrl = l
}
(WebApi || (WebApi = {}));
var HtmlHistory;
!function (t) {
	function e() {
		return location.href.split("#")[0]
	}
	function o() {
		s = e(),
		window.onpopstate = function (t) {
			if (t.state) {
				var o = t.state;
				window.resumeUserImage(o.id, o.secret)
			} else
				Callbacks.M.appHasAlreadyRun && s != e() && location.replace(location.href);
			s = e()
		}
	}
	function i(o) {
		var i = location,
		r = i.pathname,
		n = "/images/" + o.id + "/edit/" + o.secret,
		a = 0 === r.lastIndexOf(n, 0);
		a ? t.exitHref = i.protocol + "//" + i.host : (t.exitHref = i.href,
				history.pushState(o, "", n),
				s = e())
	}
	function r() {
		location.href = t.exitHref
	}
	var s = null;
	t.exitHref = "/bulk",
	t.initialize = o,
	t.goTo = i,
	t.exit = r
}
(HtmlHistory || (HtmlHistory = {}));
var StartupProgress;
!function (t) {
	function e() {
		$("#startup-lightbox-outer").attr("style", "background:none; pointer-events:none;"),
		Css.startup_lightbox_content.$().addClass(Css.single_pane_view.name())
	}
	function o() {
		t.hiddenShadowPane = !0,
		t.visible && e()
	}
	function i() {
		t.visible = !0,
		$("#startup-lightbox-outer").show(),
		t.hiddenShadowPane && e()
	}
	function r() {
		t.visible && (t.visible = !1,
			t.hiddenShadowPane ? $("#startup-lightbox-outer").hide() : $("#startup-lightbox-outer").fadeOut(),
			$("#startup-lightbox").hide())
	}
	t.visible = !1,
	t.hiddenShadowPane = !1,
	t.hideShadowPane = o,
	t.show = i,
	t.hide = r
}
(StartupProgress || (StartupProgress = {}));
var Tutorial;
!function (t) {
	function e() {
		return s ? r() : i(),
		!1
	}
	function o() {
		Css.help_button.$().click(e),
		n = Css.video_green_lightbox.el(),
		window.GlobalsEx.showGuide && t.show()
	}
	function i() {
		s || ($("html").addClass("help-showing").removeClass("help-hidden"),
			Css.HelpButton.$().addClass("active"),
			Css.HelpPopover.$().slideDown(),
			Css.TutorialLightboxOuter.$().fadeIn(),
			n && n.play(),
			s = !0)
	}
	function r() {
		return !!s && ($("html").removeClass("help-showing").addClass("help-hidden"),
			Css.HelpButton.$().removeClass("active"),
			Css.HelpPopover.$().slideUp(),
			Css.TutorialLightboxOuter.$().fadeOut(),
			n && n.pause(),
			s = !1,
			!0)
	}
	var s = !1,
	n = null;
	t.toggle = e,
	t.initialize = o,
	t.show = i,
	t.hide = r
}
(Tutorial || (Tutorial = {}));
var Guide;
!function (t) {
	function e(t) {
		M = !0,
		p(),
		l(t),
		Css.GuideLightboxOuter.$().show()
	}
	function o() {
		M && (M = !1,
			Css.GuideLightboxOuter.$().hide())
	}
	function i(t) {
		var e = t.$(),
		o = e.offset(),
		i = e.outerWidth();
		return Math.max(0, i / 2 + o.left - 20) + "px"
	}
	function r(t) {
		Css.GuideLightbox.$().removeClass(f).addClass(t.name())
	}
	function s(t) {
		var e = i(t);
		Css.GuideLightbox.$().css({
			left: e,
			top: "0px"
		})
	}
	function n() {
		S && (S.pause(),
			S = null)
	}
	function a(t) {
		n(),
		S = t.Id.el(),
		S && S.play()
	}
	function l(t) {
		r(t.show),
		s(t.Tool),
		a(t)
	}
	function p() {
		w || (w = !0,
			Css.guide_next_button.$().click(t.hide))
	}
	function c() {
		window.GlobalsEx.showHints && !m && (m = !0,
			e(Css.video.erase))
	}
	function u() {
		window.GlobalsEx.showHints && !b && (y >= C && 0 == v || 0 == y && v >= C) && (b = !0,
			e(Css.video.green))
	}
	function d() {
		y++,
		u()
	}
	function h() {
		v++,
		u()
	}
	function g() {
		y++,
		v++
	}
	var f = Css.video.green.show.name() + " " + Css.video.erase.show.name(),
	w = !1,
	S = null,
	m = !1,
	C = 5,
	y = 0,
	v = 0,
	b = !1,
	M = !1;
	t.hide = o,
	t.checkShowHighlighting = c,
	t.strokeGreen = d,
	t.strokeRed = h,
	t.strokeResume = g
}
(Guide || (Guide = {}));
var ShadowApp;
!function (t) {
	function e() {
		return eo.length
	}
	function o() {
		return null == to ? $.extend({}, i()) : to
	}
	function i() {
		return Callbacks.M.defaultSettings.ellipseShadow
	}
	function r() {
		return Callbacks.M.defaultSettings.dropShadow
	}
	function s() {
		return Callbacks.M.defaultSettings.mirrorShadow
	}
	function n() {
		return Callbacks.M.defaultSettings.perspectiveShadow
	}
	function a() {
		Oo = p(Ee),
		Io = p(Fe),
		$o = p(ze),
		Lo = p(Be),
		Vo = p(Ue),
		Go = p(Oe),
		Ho = p(Ie),
		Wo = p($e),
		Xo = p(Le)
	}
	function l(t) {
		return t * ViewPort.subViewPort.getZoomScale()
	}
	function p(t) {
		return t / ViewPort.subViewPort.getZoomScale()
	}
	function c(t, e, o, i, r, s, n) {
		var a = l(o),
		p = l(i);
		t.fillCircle(a, p, n * Ee, "#000"),
		t.fillCircle(a, p, n * Ee - 1, e ? s : r)
	}
	function u(t, e, o, i, r, s, n) {
		var a = l(o),
		p = l(i);
		t.fillSquare(a, p, n * Ee, "#000"),
		t.fillSquare(a, p, n * Ee - 1, e ? s : r)
	}
	function d() {
		function e(t, e, o, r, s) {
			void 0 === s && (s = null),
			Util.mouseDownRepeater(t.$(), o, i, 5, Undo.push, function () {
				s && s(),
				Se()
			}),
			Util.mouseDownRepeater(e.$(), r, i, 5, Undo.push, function () {
				s && s(),
				Se()
			})
		}
		function o(t, o, i, r, s) {
			void 0 === s && (s = null),
			e(t.decrease, t.increase, i, r, s),
			o && t.reset.$().click(o)
		}
		if (!_o) {
			_o = !0,
			t.dropShadow = $.extend(!0, {}, r()),
			t.mirrorShadow = $.extend(!0, {}, s()),
			t.perspectiveShadow = $.extend(!0, {}, n()),
			Ro = 0 | Callbacks.M.imageSize.w,
			Eo = 0 | Callbacks.M.imageSize.h,
			Fo = Ro * Eo,
			So = new Qo,
			Mo = new Jo,
			oo = new je,
			wo = Css.ShadowAppDropShadowUpdatingIndicator.$(),
			Css.shadow_app_close_button.$().click(Ht),
			Css.ShadowAppResetButton.$().click(we),
			Util.addEventListener(Css.ShadowAppPreviewButton.$(), "touchstart", function (t) {
				zo = !0,
				ViewPort.subViewPort.refreshAllViews(),
				t.preventDefault()
			}),
			Util.addEventListener(Css.ShadowAppPreviewButton.$(), "touchend", function (t) {
				zo = !1,
				ViewPort.subViewPort.refreshAllViews(),
				t.preventDefault()
			}),
			Css.ShadowAppPreviewButton.$().hover(function () {
				zo = !0,
				ViewPort.subViewPort.refreshAllViews()
			}, function () {
				zo = !1,
				ViewPort.subViewPort.refreshAllViews()
			}),
			Css.ShadowAppPreviewButton.$().hide();
			var i = 50;
			o(Css.ShadowApp.EllipseShadow.Core, y, v, b),
			o(Css.ShadowApp.EllipseShadow.Strength, w, S, m),
			o(Css.ShadowAppDropShadowOpacity, A, P, _),
			o(Css.ShadowAppDropShadowBlurRadius, E, F, z, j),
			Css.ShadowAppDropShadowEnabled.$().click(function () {
				M(!t.dropShadow.enabled, !0)
			}),
			Css.shadow_app_drop_shadow_offset_down_left.$().click(function () {
				N(-2 * t.dropShadow.blurRadius, 2 * t.dropShadow.blurRadius),
				Se(),
				ViewPort.refreshAllViews()
			}),
			Css.shadow_app_drop_shadow_offset_down.$().click(function () {
				N(0, 2 * t.dropShadow.blurRadius),
				Se(),
				ViewPort.refreshAllViews()
			}),
			Css.shadow_app_drop_shadow_offset_down_right.$().click(function () {
				N(2 * t.dropShadow.blurRadius, 2 * t.dropShadow.blurRadius),
				Se(),
				ViewPort.refreshAllViews()
			}),
			Css.ShadowApp.DropShadow.ArrowControl.zero.$().click(function () {
				N(0, 0),
				Se(),
				ViewPort.refreshAllViews()
			}),
			e(Css.ShadowApp.DropShadow.ArrowControl.up, Css.ShadowApp.DropShadow.ArrowControl.down, W, X),
			e(Css.ShadowApp.DropShadow.ArrowControl.left, Css.ShadowApp.DropShadow.ArrowControl.right, I, L),
			Css.shadow_app_drop_shadow_crop_enabled.$().click(function () {
				return k(!t.dropShadow.cropEnabled, !0),
				!1
			}),
			o(Css.ShadowAppMirrorShadowOpacity, it, rt, st),
			o(Css.ShadowAppMirrorShadowHeight, lt, pt, ct, ht),
			Css.ShadowAppMirrorShadowEnabled.$().click(function () {
				tt(!t.mirrorShadow.enabled, !0)
			}),
			o(Css.ShadowAppPerspectiveShadowOpacity, yt, vt, bt),
			o(Css.ShadowAppPerspectiveShadowOpacityScale, Tt, xt, At, Lt),
			o(Css.ShadowAppPerspectiveShadowBlurRadius, Dt, Rt, Et, Lt),
			o(Css.ShadowAppPerspectiveShadowBlurRadiusScale, Bt, Ut, Ot, Lt),
			Css.ShadowAppPerspectiveShadowEnabled.$().click(function () {
				St(!t.perspectiveShadow.enabled, !0)
			}),
			Z(),
			wt(),
			j(),
			ht(),
			Lt()
		}
	}
	function h() {
		var t = qt();
		Css.ShadowAppPreviewButton.$().toggle(t.length > 0)
	}
	function g() {
		ToolMode.Grab.pick(),
		Css.subapp_sidebar.$().hide(),
		Css.ShadowAppSidebar.$().show(),
		Css.subapp_tab.$().removeClass("active"),
		Css.ShadowAppTab.$().addClass("active"),
		Util.modal(Css.SubappLightbox.css()),
		ViewPort.subViewPort.setViewConfigAndShow(Ze, t),
		Do = !0,
		Yt(),
		ViewPort.refreshAllViews()
	}
	function f(t, e) {
		return t = Util.clamp(parseFloat(t.toFixed(2)), 0, 1),
		null != to && t != to.strength && (e && Undo.push(),
			to.strength = t,
			Wt(),
			Kt(),
			ViewPort.subViewPort.refreshAllViews(),
			e && Se(),
			!0)
	}
	function w() {
		f(i().strength, !0)
	}
	function S() {
		null != to && f(to.strength - .01, !1)
	}
	function m() {
		null != to && f(to.strength + .01, !1)
	}
	function C(t, e) {
		return t = Util.clamp(parseFloat(t.toFixed(2)), 0, 1),
		null != to && t != to.core && (e && Undo.push(),
			to.core = t,
			Wt(),
			Kt(),
			e && Se(),
			ViewPort.subViewPort.refreshAllViews(),
			!0)
	}
	function y() {
		C(i().core, !0)
	}
	function v() {
		null != to && C(to.core - .01, !1)
	}
	function b() {
		null != to && C(to.core + .01, !1)
	}
	function M(e, o) {
		return e != t.dropShadow.enabled && (o && Undo.push(),
			t.dropShadow.enabled = e,
			Wt(),
			q(),
			j(),
			o && Se(),
			!0)
	}
	function k(e, o) {
		return e != t.dropShadow.cropEnabled && (o && Undo.push(),
			t.dropShadow.cropEnabled = e,
			e && (io.isEmpty() && io.fromRect(Callbacks.M.getCrop_o()),
				t.dropShadow.enabled || (t.dropShadow.enabled = !0),
				ToolMode.Grab.pick()),
			Wt(),
			q(),
			j(),
			o && Se(),
			!0)
	}
	function T(e, o) {
		var i = Math.round(Util.clamp(e, 0, 100));
		return i != t.dropShadow.opacity && (o && Undo.push(),
			t.dropShadow.opacity = i,
			Wt(),
			q(),
			o && Se(),
			!0)
	}
	function x(e) {
		T(t.dropShadow.opacity + e | 0, !1),
		ViewPort.subViewPort.refreshAllViews()
	}
	function A() {
		var e = r();
		t.dropShadow.opacity != e.opacity && (T(e.opacity, !0),
			ViewPort.subViewPort.refreshAllViews())
	}
	function P() {
		x(-1)
	}
	function _() {
		x(1)
	}
	function D(e, o) {
		var i = Math.round(Util.clamp(e, 0, Ve));
		return i != t.dropShadow.blurRadius && (o && Undo.push(),
			t.dropShadow.blurRadius = i,
			Wt(),
			q(),
			o && (j(),
				Se()),
			!0)
	}
	function R(e) {
		D(t.dropShadow.blurRadius + e | 0, !1)
	}
	function E() {
		var e = r();
		t.dropShadow.blurRadius != e.blurRadius && D(e.blurRadius, !0)
	}
	function F() {
		R(-1)
	}
	function z() {
		R(1)
	}
	function B(e, o) {
		var i = Math.round(e);
		return i != t.dropShadow.offsetX && (o && Undo.push(),
			t.dropShadow.offsetX = i,
			Wt(),
			q(),
			o && Se(),
			!0)
	}
	function U(e) {
		B(t.dropShadow.offsetX + e | 0, !1),
		ViewPort.refreshAllViews()
	}
	function O() {
		var e = r();
		t.dropShadow.offsetX != e.offsetX && B(e.offsetX, !0)
	}
	function I() {
		U(-1)
	}
	function L() {
		U(1)
	}
	function V(e, o) {
		var i = Math.round(e);
		return i != t.dropShadow.offsetY && (o && Undo.push(),
			t.dropShadow.offsetY = i,
			Wt(),
			q(),
			o && Se(),
			!0)
	}
	function G(e) {
		V(t.dropShadow.offsetY + e | 0, !1),
		ViewPort.refreshAllViews()
	}
	function H() {
		var e = r();
		t.dropShadow.offsetY != e.offsetY && V(e.offsetY, !0)
	}
	function W() {
		G(-1)
	}
	function X() {
		G(1)
	}
	function N(e, o) {
		e |= 0,
		o |= 0,
		e == t.dropShadow.offsetX && o == t.dropShadow.offsetY || (t.dropShadow.offsetX = e,
			t.dropShadow.offsetY = o,
			Wt(),
			q())
	}
	function Y() {
		var e = r();
		t.dropShadow.offsetX == e.offsetX && t.dropShadow.offsetY == e.offsetY || (Undo.push(),
			N(e.offsetX, e.offsetY),
			Se())
	}
	function q() {
		var e = r();
		Css.ShadowAppDropShadowEnabled.$().prop("checked", t.dropShadow.enabled),
		Css.ShadowAppDropShadowCropEnabled.$().html(t.dropShadow.cropEnabled ? Tr.s("Disable") : Tr.s("Enable")),
		Css.shadow_app_drop_shadow_controls.$().toggle(t.dropShadow.enabled),
		Css.shadow_app_drop_shadow_crop_enabled_display.$().html(t.dropShadow.cropEnabled ? Tr.s("On") : Tr.s("Off"));
		var o = t.dropShadow.opacity == e.opacity;
		Css.ShadowAppDropShadowOpacity.display.$().html("" + t.dropShadow.opacity + "%"),
		Css.ShadowAppDropShadowOpacity.reset.$().toggleClass("disabled", o);
		var i = t.dropShadow.blurRadius == e.blurRadius;
		Css.ShadowAppDropShadowBlurRadius.display.$().html("" + t.dropShadow.blurRadius + "px"),
		Css.ShadowAppDropShadowBlurRadius.reset.$().toggleClass("disabled", i),
		Css.shadow_app_drop_shadow_offset_display.$().html("" + Util.signedNumber(0 | t.dropShadow.offsetX) + ", " + Util.signedNumber(0 | t.dropShadow.offsetY)),
		h()
	}
	function J() {
		uo || Ro == -1 || (ao = new Worker(window.Globals.webWorkers.dropshadow_js),
			ao.addEventListener("message", K),
			lo = Ro + 2 * Ge,
			po = Eo + 2 * Ge,
			co = lo * po,
			uo = new CanvasEx(lo, po),
			ho = uo.context().getImageData(0, 0, lo, po),
			go = ho.data,
			fo = new Uint8Array(co))
	}
	function j() {
		Ro != -1 && (t.dropShadow.enabled ? (J(),
				Q()) : uo && (uo.clearAll(),
				ViewPort.refreshAllViews()))
	}
	function Q() {
		if (fo) {
			wo.show();
			var e = new Uint8ClampedArray(Callbacks.M.previewCanvasData),
			o = {
				w: lo,
				h: po,
				blurRadius: t.dropShadow.blurRadius,
				result: e,
				alphas: fo,
				polygonPoints: t.dropShadow.cropEnabled ? io.getPolygonPoints() : []
			};
			try {
				ao.postMessage(o, [fo.buffer, e.buffer])
			} catch (t) {
				ao.postMessage(o)
			}
			fo = null,
			e = null
		}
	}
	function K(e) {
		var o = e.data;
		if (o.exception)
			throw o.exception;
		if (fo = o.alphas) {
			for (var i = 0, r = 3; i < co; i++,
				r += 4)
				go[r] = fo[i];
			uo.context().putImageData(ho, 0, 0)
		}
		wo.hide(),
		ViewPort.refreshAllViews(),
		o.blurRadius != t.dropShadow.blurRadius && Q()
	}
	function Z(e) {
		if (void 0 === e && (e = !1),
			t.mirrorShadow.enabled && (!t.mirrorShadow.mutated || So.isEmpty() || e)) {
			var o = Callbacks.M.getBoundingRect_o(),
			i = new Point((o.left + o.right) / 2, o.bottom);
			i.rotateInPlace(Callbacks.M.totalRotationAngleRad_o2i(), ViewPort.main.getImageCenter_i()),
			So.clear(),
			So.add(i),
			Wt(),
			Se()
		}
	}
	function tt(e, o) {
		return e != t.mirrorShadow.enabled && (o && Undo.push(),
			t.mirrorShadow.enabled = e,
			Z(),
			Wt(),
			ut(),
			ht(),
			o && Se(),
			!0)
	}
	function et(e, o) {
		var i = Math.round(Util.clamp(e, 0, 100));
		return i != t.mirrorShadow.opacity && (o && Undo.push(),
			t.mirrorShadow.opacity = i,
			Wt(),
			ut(),
			o && Se(),
			!0)
	}
	function ot(e) {
		et(t.mirrorShadow.opacity + e | 0, !1),
		ViewPort.subViewPort.refreshAllViews()
	}
	function it() {
		var e = s();
		t.mirrorShadow.opacity != e.opacity && (et(e.opacity, !0),
			ViewPort.subViewPort.refreshAllViews())
	}
	function rt() {
		ot(-1)
	}
	function st() {
		ot(1)
	}
	function nt(e, o) {
		var i = Math.round(Util.clamp(e, 0, He));
		return i != t.mirrorShadow.height && (o && Undo.push(),
			t.mirrorShadow.height = i,
			Wt(),
			ut(),
			o && Se(),
			!0)
	}
	function at(e) {
		nt(t.mirrorShadow.height + e | 0, !1)
	}
	function lt() {
		var e = s();
		t.mirrorShadow.height != e.height && (nt(e.height, !0),
			ht())
	}
	function pt() {
		at(-1)
	}
	function ct() {
		at(1)
	}
	function ut() {
		var e = s();
		So.updatePolyLine(),
		Css.ShadowAppMirrorShadowEnabled.$().prop("checked", t.mirrorShadow.enabled),
		Css.shadow_app_mirror_shadow_controls.$().toggle(t.mirrorShadow.enabled);
		var o = t.mirrorShadow.opacity == e.opacity;
		Css.ShadowAppMirrorShadowOpacity.display.$().html("" + t.mirrorShadow.opacity + "%"),
		Css.ShadowAppMirrorShadowOpacity.reset.$().toggleClass("disabled", o);
		var i = t.mirrorShadow.height == e.height;
		Css.ShadowAppMirrorShadowHeight.display.$().html("" + t.mirrorShadow.height + "px"),
		Css.ShadowAppMirrorShadowHeight.reset.$().toggleClass("disabled", i),
		h()
	}
	function dt() {
		mo || Ro == -1 || (mo = new Worker(window.Globals.webWorkers.mirrorshadow_js),
			mo.addEventListener("message", ft)),
		So.updatePolyLine();
		var e = Callbacks.M.getRotationCrop_o().pad(Xe),
		o = So.getPolyLine_o(),
		i = o.bounds().padBottom(t.mirrorShadow.height);
		if (Co = i.dup().setHorizontal(e).snap(),
			!yo || yo.width() < Co.width() || yo.height() < Co.height()) {
			var r = Math.ceil(Co.width() * We),
			s = Math.ceil(Co.height() * We);
			yo = new CanvasEx(r, s)
		}
	}
	function ht() {
		Ro != -1 && (t.mirrorShadow.enabled && So.nonEmpty() ? (dt(),
				gt()) : yo && (yo.clearAll(),
				ViewPort.refreshAllViews()))
	}
	function gt() {
		if (yo && So && So.nonEmpty())
			if (vo.outOfSync())
				vo.callFor();
			else {
				vo.incrementIndexSentAndShowIndicator();
				var e = So.getPolyLine_o(),
				o = {
					w: Co.width(),
					h: Co.height()
				},
				i = {
					imageSize: {
						w: Ro,
						h: Eo
					},
					imageCenter: {
						x: Ro / 2,
						y: Eo / 2
					},
					bufferSize: o,
					result: new Uint8ClampedArray(Callbacks.M.previewCanvasImageDataSmart().data),
					bounds_o: Co,
					points: e.points,
					angleRad: Callbacks.M.totalRotationAngleRad_o2i(),
					height: t.mirrorShadow.height,
					index: vo.indexSent
				};
				try {
					mo.postMessage(i, [i.result.buffer])
				} catch (t) {
					mo.postMessage(i)
				}
			}
	}
	function ft(t) {
		var e = t.data;
		if (e.exception)
			throw e.exception;
		vo.setIndexReceived(e.index);
		for (var o = yo.context().createImageData(e.bufferSize.w, e.bufferSize.h), i = 0; i < e.buffer.length; i++)
			o.data[i] = e.buffer[i];
		yo.clearAll(),
		yo.context().putImageData(o, 0, 0),
		ViewPort.refreshAllViews(),
		vo.readyToResubmit() && (vo.resetCalledFor(),
			gt())
	}
	function wt(e) {
		void 0 === e && (e = !1),
		!t.perspectiveShadow.enabled || t.perspectiveShadow.mutated && Mo.isInitialized && !e || (Mo.initialize(e),
			Wt(),
			Se())
	}
	function St(e, o) {
		return e != t.perspectiveShadow.enabled && (o && Undo.push(),
			t.perspectiveShadow.enabled = e,
			wt(),
			Wt(),
			It(),
			Lt(),
			o && Se(),
			!0)
	}
	function mt(e, o) {
		var i = Math.round(Util.clamp(e, 0, 100));
		return i != t.perspectiveShadow.opacity && (o && Undo.push(),
			t.perspectiveShadow.opacity = i,
			Wt(),
			It(),
			o && Se(),
			!0)
	}
	function Ct(e) {
		mt(t.perspectiveShadow.opacity + e | 0, !1)
	}
	function yt() {
		mt(n().opacity, !0)
	}
	function vt() {
		Ct(-1)
	}
	function bt() {
		Ct(1)
	}
	function Mt(e, o) {
		var i = Math.round(Util.clamp(e, 0, 100));
		return i != t.perspectiveShadow.opacityScale && (o && Undo.push(),
			t.perspectiveShadow.opacityScale = i,
			Wt(),
			It(),
			o && (Se(),
				Lt()),
			!0)
	}
	function kt(e) {
		Mt(t.perspectiveShadow.opacityScale + e | 0, !1),
		ViewPort.subViewPort.refreshAllViews()
	}
	function Tt() {
		Mt(n().opacityScale, !0)
	}
	function xt() {
		kt(-1)
	}
	function At() {
		kt(1)
	}
	function Pt(e, o) {
		var i = Math.round(Util.clamp(e, 0, Ve));
		return i != t.perspectiveShadow.blurRadius && (o && Undo.push(),
			t.perspectiveShadow.blurRadius = i,
			Wt(),
			It(),
			o && (Se(),
				Lt()),
			!0)
	}
	function _t(e) {
		Pt(t.perspectiveShadow.blurRadius + e | 0, !1),
		ViewPort.subViewPort.refreshAllViews()
	}
	function Dt() {
		Pt(n().blurRadius, !0)
	}
	function Rt() {
		_t(-1)
	}
	function Et() {
		_t(1)
	}
	function Ft(e, o) {
		var i = Math.round(Util.clamp(e, 0, Ye));
		return i != t.perspectiveShadow.blurRadiusScale && (o && Undo.push(),
			t.perspectiveShadow.blurRadiusScale = i,
			Wt(),
			It(),
			o && (Se(),
				Lt()),
			!0)
	}
	function zt(e) {
		Ft(t.perspectiveShadow.blurRadiusScale + e | 0, !1),
		ViewPort.subViewPort.refreshAllViews()
	}
	function Bt() {
		Ft(n().blurRadiusScale, !0)
	}
	function Ut() {
		zt(-10)
	}
	function Ot() {
		zt(10)
	}
	function It() {
		var e = n();
		Mo.updateGeometry(),
		Css.ShadowAppPerspectiveShadowEnabled.$().prop("checked", t.perspectiveShadow.enabled),
		Css.shadow_app_perspective_shadow_controls.$().toggle(t.perspectiveShadow.enabled);
		var o = t.perspectiveShadow.opacity == e.opacity;
		Css.ShadowAppPerspectiveShadowOpacity.display.$().html("" + t.perspectiveShadow.opacity + "%"),
		Css.ShadowAppPerspectiveShadowOpacity.reset.$().toggleClass("disabled", o);
		var i = t.perspectiveShadow.opacityScale == e.opacityScale;
		Css.ShadowAppPerspectiveShadowOpacityScale.display.$().html("" + t.perspectiveShadow.opacityScale + "%"),
		Css.ShadowAppPerspectiveShadowOpacityScale.reset.$().toggleClass("disabled", i);
		var r = t.perspectiveShadow.blurRadius == e.blurRadius;
		Css.ShadowAppPerspectiveShadowBlurRadius.display.$().html("" + t.perspectiveShadow.blurRadius + "px"),
		Css.ShadowAppPerspectiveShadowBlurRadius.reset.$().toggleClass("disabled", r);
		var s = t.perspectiveShadow.blurRadiusScale == e.blurRadiusScale;
		Css.ShadowAppPerspectiveShadowBlurRadiusScale.display.$().html("" + t.perspectiveShadow.blurRadiusScale + "%"),
		Css.ShadowAppPerspectiveShadowBlurRadiusScale.reset.$().toggleClass("disabled", s),
		h()
	}
	function $t() {
		bo || Ro == -1 || (bo = new Worker(window.Globals.webWorkers.perspectiveshadow_js),
			bo.addEventListener("message", Gt),
			ko = Ro + 2 * Ge,
			To = Eo + 2 * Ge);
		var t = Mo.canvasRect_o;
		(!xo || xo.width() < t.width() || xo.height() < t.height()) && (xo = new CanvasEx(t.width() + 100, t.height() + 100))
	}
	function Lt() {
		t.perspectiveShadow.enabled && Mo && Mo.geometryIsValid ? (Mo.updateGeometry(),
			$t(),
			Vt(),
			ViewPort.subViewPort.refreshAllViews()) : xo && (xo.clearAll(),
			ViewPort.subViewPort.refreshAllViews())
	}
	function Vt() {
		if (bo && Mo)
			if (Po.outOfSync())
				Po.callFor();
			else {
				Po.incrementIndexSentAndShowIndicator();
				var e = new Uint8ClampedArray(Callbacks.M.previewCanvasData),
				o = {
					w_i: Ro,
					h_i: Eo,
					angleRad_i2o: Callbacks.M.totalRotationAngleRad_i2o(),
					cropRect_o: Mo.cropRect_o,
					canvasRect_o: Mo.canvasRect_o,
					transformDstToSrc_o: Mo.transformDstToSrc_o,
					blurRadiusStart: t.perspectiveShadow.blurRadius,
					blurRadiusEnd: Math.min(t.perspectiveShadow.blurRadius * t.perspectiveShadow.blurRadiusScale / 100, Ve),
					opacityEnd: t.perspectiveShadow.opacityScale / 100,
					result: e,
					clipPoints_i: Mo.quadSrcClip_i.points,
					clipRect_o: Mo.clipBoundsSrc_o,
					index: Po.indexSent
				};
				try {
					bo.postMessage(o, [o.result.buffer])
				} catch (t) {
					bo.postMessage(o)
				}
				e = null
			}
	}
	function Gt(t) {
		var e = t.data;
		if (e.exception)
			throw e.exception;
		if (Po.setIndexReceived(e.index),
			Ao.setFrom(e.dstRect),
			0 != Ao.width() && 0 != Ao.height()) {
			xo.clearAll();
			for (var o = xo.context().createImageData(Ao.width(), Ao.height()), i = 0, r = 3; i < e.alphas.length; i++,
				r += 4)
				o.data[r] = e.alphas[i];
			xo.context().putImageData(o, 0, 0)
		}
		ViewPort.refreshAllViews(),
		Po.readyToResubmit() && (Po.resetCalledFor(),
			Vt())
	}
	function Ht() {
		Css.ShadowAppSidebar.$().hide(),
		Css.SubappLightbox.$().modal("hide"),
		Do = ViewPort.subViewPort.showing = !1,
		t.onhide(),
		Callbacks.App.subAppHidden()
	}
	function Wt() {
		Bo = null,
		Uo = !0
	}
	function Xt(t) {
		if (t.ctrlKey || t.altKey || t.metaKey)
			return !1;
		switch (t.keyCode) {
		case 27:
			if (StickySettings.hide())
				break;
			Ht();
			break;
		case 69:
			ToolMode.select(ToolMode.ShadowEllipse)
		}
		return !0
	}
	function Nt(t) {
		return !(t.ctrlKey || t.altKey || t.metaKey) && (t.keyCode,
			!0)
	}
	function Yt() {
		Do && (q(),
			ut(),
			It(),
			Kt(),
			h())
	}
	function qt() {
		var e = [].concat(eo);
		return t.dropShadow.enabled && (e = e.concat(io.loops),
			e.push(oo)),
		t.perspectiveShadow.enabled && e.push(Mo),
		t.mirrorShadow.enabled && e.push(So),
		e
	}
	function Jt() {
		a();
		var t = ViewPort.subViewPort.getMouse_i(),
		e = ToolMode.getSelectedMode();
		if (e == ToolMode.Grab) {
			for (var o = [], i = qt(), r = 0; r < i.length; r++) {
				var s = i[r];
				s.hitShadow(t) && o.push(s)
			}
			var n = null,
			l = null;
			for (r = 0; r < o.length; r++)
				if (s = o[r],
					l = s.hitHandle()) {
					n = s;
					break
				}
			var p = so.shadows.filter(function (t) {
					return t instanceof No
				}).reverse();
			return Zt(o, n, l, p.length > 0 ? Unsafe.cast(p[0]) : null),
			l || null == So.candidatePoint ? l ? l.getToolMode() : null : ToolMode.ShadowMirror
		}
		return te(),
		null
	}
	function jt(t) {
		to = t,
		Kt()
	}
	function Qt(t, e, o, i, r) {
		t.decrease.$().toggleClass("disabled", e == i),
		t.increase.$().toggleClass("disabled", e == r),
		t.reset.$().toggleClass("disabled", e == o)
	}
	function Kt() {
		var t = i(),
		e = to,
		o = null != e;
		Css.ShadowApp.EllipseShadow.Container.$().toggle(o),
		o && (Qt(Css.ShadowApp.EllipseShadow.Strength, e.strength, t.strength, 0, 1),
			Qt(Css.ShadowApp.EllipseShadow.Core, e.core, t.core, 0, 1),
			Css.ShadowApp.EllipseShadow.Strength.display.$().text((100 * e.strength).toFixed(0) + "%"),
			Css.ShadowApp.EllipseShadow.Core.display.$().text((100 * e.core).toFixed(0) + "%"))
	}
	function Zt(t, e, o, i) {
		so.shadows = t,
		so.shadow = e,
		so.handle = o,
		so.ellipse = i
	}
	function te() {
		Zt([], null, null, null)
	}
	function ee() {
		ro.downState = $.extend({}, so),
		ro.downState.toolMode = ToolMode.getActiveMode()
	}
	function oe(e) {
		var o = ViewPort.subViewPort.getMouse_i();
		if (ae(),
			ToolMode.isNot(ToolMode.Grab) && e == Const.MouseButtonLeft)
			if (pi = !1,
				ro.v0 = o,
				ee(),
				ro.downState && ro.downState.handle)
				ro.downState.handle.mouseDown(o);
			else if (null != So.candidatePoint) {
				var i = So.add(o);
				t.mirrorShadow.mutated = !0,
				ro.downState.handle = i,
				ro.downState.toolMode = ToolMode.ShadowArrow,
				ToolMode.forceSelection(ToolMode.Grab, ToolMode.ShadowArrow, null),
				So.candidatePoint = null,
				so.handle = i,
				i.mouseDown(o)
			}
		ToolMode.is(ToolMode.Grab) && jt(so.ellipse)
	}
	function ie(t, e, o) {
		var r = ViewPort.subViewPort.getMouse_i();
		if (ViewPort.subViewPort.getMouseIsDown()) {
			if (ToolMode.is(ToolMode.ShadowEllipse)) {
				ro.firstMove && Undo.push();
				var s = new No(new Point(0, 0), 0, 0, Callbacks.M.totalRotationAngleRad_o2i(), i().strength, i().core);
				s.setRect(ro.v0, r),
				eo.push(s),
				jt(s),
				Wt(),
				ToolMode.forceSelection(ToolMode.Grab, ToolMode.ShadowArrow, null),
				Zt([s], s, s.bottomRight, s),
				ee()
			} else if (ro.downState && ro.downState.handle && ToolMode.is(ro.downState.handle.getToolMode())) {
				ro.firstMove && Undo.push();
				var n = ro.downState;
				n.handle.mouseDrag(r),
				Wt()
			}
			ro.firstMove = !1
		} else if (!ViewPort.subViewPort.getShiftIsDown()) {
			var a = Jt();
			ToolMode.setTempSelect(a)
		}
		ViewPort.subViewPort.refreshAllViews()
	}
	function re(t) {
		var e = ViewPort.subViewPort.getMouse_i();
		pi && Callbacks.M.sendSetGlobal(),
		ro.downState && ro.downState.handle instanceof ei && j(),
		ro.downState && ro.downState.handle instanceof Ko && ht(),
		ro.downState && ro.downState.handle instanceof jo && Lt(),
		ro.downState && ro.downState.handle && ro.downState.handle.mouseUp(e),
		ae(),
		Se()
	}
	function se() {
		ToolMode.setTempSelect(Jt())
	}
	function ne(t) {
		ie(t.pageX, t.pageY, t.which)
	}
	function ae() {
		ro.v0 = null,
		ro.v2 = null,
		ro.downState = null,
		ro.firstMove = !0
	}
	function le(e, o, i) {
		function r(t, i, r, s) {
			e.save(),
			e.translate(o.o2cX(i), o.o2cY(r)),
			e.rotate(t),
			s(),
			e.restore()
		}
		var s = ToolMode.getSelectedMode();
		if (s == ToolMode.Grab || s == ToolMode.ShadowEllipse) {
			t.mirrorShadow.enabled && r(0, 0, 0, function () {
				i(So)
			}),
			t.perspectiveShadow.enabled && r(0, 0, 0, function () {
				i(Mo)
			});
			for (var n = 0; n < eo.length; n++) {
				var a = eo[n];
				r(a.angleRad, a.center.x, a.center.y, function () {
					i(a)
				})
			}
			if (t.dropShadow.enabled && (r(0, 0, 0, function () {
						i(oo)
					}),
					t.dropShadow.cropEnabled))
				for (var n = 0; n < io.loops.length; n++) {
					var l = io.loops[n];
					r(0, 0, 0, function () {
						i(l)
					})
				}
		}
	}
	function pe(e, o, i, r) {
		t.mirrorShadow.enabled && yo && Co && vo.inSync() && r(yo, t.mirrorShadow.opacity / 100, Co.left, Co.top),
		Mo && t.perspectiveShadow.enabled && r(xo, t.perspectiveShadow.opacity / 100, Ao.left, Ao.top)
	}
	function ce(t, e) {}
	function ue(e, o, i, r) {
		le(o, i, function (t) {
			t.drawShadow(o, i)
		}),
		t.dropShadow.enabled && r(uo, t.dropShadow.opacity / 100, t.dropShadow.offsetX - Ge, t.dropShadow.offsetY - Ge)
	}
	function de(t, e) {
		zo || le(e, ViewPort.subViewPort, function (t) {
			t.drawControls(e)
		})
	}
	function he() {
		if (null != Bo)
			return Bo;
		for (var e = [], o = 0; o < eo.length; o++)
			e[o] = eo[o].encode();
		var i = io.encode();
		return Bo = {
			ellipses: e,
			dropShadow: {
				offsetX: t.dropShadow.offsetX,
				offsetY: t.dropShadow.offsetY,
				opacity: 0 | t.dropShadow.opacity,
				blurRadius: 0 | t.dropShadow.blurRadius,
				enabled: t.dropShadow.enabled,
				cropEnabled: t.dropShadow.cropEnabled,
				dropShadowClipPolygon: i
			},
			mirrorShadow: {
				enabled: t.mirrorShadow.enabled,
				opacity: t.mirrorShadow.opacity,
				height: t.mirrorShadow.height,
				mutated: t.mirrorShadow.mutated,
				points: So.encode()
			},
			perspectiveShadow: {
				enabled: t.perspectiveShadow.enabled,
				opacity: t.perspectiveShadow.opacity,
				opacityScale: t.perspectiveShadow.opacityScale,
				blurRadius: t.perspectiveShadow.blurRadius,
				blurRadiusScale: t.perspectiveShadow.blurRadiusScale,
				mutated: t.perspectiveShadow.mutated,
				geometry: Mo.encode()
			}
		}
	}
	function ge(t, e) {
		return void 0 == t ? e : t
	}
	function fe(e) {
		var o = r(),
		i = s(),
		a = n();
		Bo = e,
		eo.length = 0;
		try {
			if (e) {
				if (e.ellipses) {
					for (var l = 0; l < e.ellipses.length; l++) {
						var p = e.ellipses[l];
						eo.push(new No(new Point(p.centerX_i, p.centerY_i), p.radiusX_i, p.radiusY_i, p.angleRad, p.strength, p.core))
					}
					jt(null),
					Kt()
				}
				if (e.dropShadow) {
					var c = e.dropShadow,
					u = t.dropShadow.blurRadius,
					d = t.dropShadow.cropEnabled;
					t.dropShadow.offsetX = ge(c.offsetX, o.offsetX),
					t.dropShadow.offsetY = ge(c.offsetY, o.offsetY),
					t.dropShadow.opacity = ge(c.opacity, o.opacity),
					t.dropShadow.blurRadius = ge(c.blurRadius, o.blurRadius),
					t.dropShadow.enabled = ge(c.enabled, o.enabled),
					t.dropShadow.cropEnabled = ge(c.cropEnabled, o.cropEnabled),
					c.dropShadowClipPolygon && io.decode(c.dropShadowClipPolygon),
					q(),
					u == c.blurRadius && d == c.cropEnabled || j()
				}
				if (e.mirrorShadow) {
					var h = e.mirrorShadow;
					t.mirrorShadow.enabled = ge(h.enabled, i.enabled),
					t.mirrorShadow.opacity = ge(h.opacity, i.opacity),
					t.mirrorShadow.height = ge(h.height, i.height),
					t.mirrorShadow.mutated = ge(h.mutated, t.mirrorShadow.enabled),
					So.decode(h.points)
				}
				if (ut(),
					ht(),
					e.perspectiveShadow) {
					var g = e.perspectiveShadow;
					t.perspectiveShadow.enabled = ge(g.enabled, a.enabled),
					t.perspectiveShadow.opacity = ge(g.opacity, a.opacity),
					t.perspectiveShadow.opacityScale = ge(g.opacityScale, a.opacityScale),
					t.perspectiveShadow.blurRadius = ge(g.blurRadius, a.blurRadius),
					t.perspectiveShadow.blurRadiusScale = ge(g.blurRadiusScale, a.blurRadiusScale),
					t.perspectiveShadow.mutated = ge(g.mutated, t.perspectiveShadow.enabled),
					Mo.decode(g.geometry)
				}
				It(),
				Lt()
			}
		} catch (t) {}
		te()
	}
	function we(e) {
		void 0 === e && (e = !0);
		var o = r(),
		i = s(),
		a = n(),
		l = eo.length > 0 || t.dropShadow.offsetX != o.offsetX || t.dropShadow.offsetY != o.offsetY || t.dropShadow.opacity != o.opacity || t.dropShadow.blurRadius != o.blurRadius || t.dropShadow.enabled != o.enabled || t.dropShadow.cropEnabled != o.cropEnabled || t.mirrorShadow.enabled != i.enabled || t.mirrorShadow.opacity != i.opacity || t.mirrorShadow.height != i.height || So.nonEmpty() || t.perspectiveShadow.enabled != a.enabled || t.perspectiveShadow.opacity != a.opacity || t.perspectiveShadow.opacityScale != a.opacityScale || t.perspectiveShadow.blurRadius != a.blurRadius || t.perspectiveShadow.blurRadiusScale != a.blurRadiusScale;
		l && e && Undo.push(),
		eo.length > 0 && (eo.length = 0),
		t.dropShadow.offsetX = o.offsetX,
		t.dropShadow.offsetY = o.offsetY,
		t.dropShadow.opacity = o.opacity,
		t.dropShadow.blurRadius = o.blurRadius,
		t.dropShadow.enabled = o.enabled,
		t.dropShadow.cropEnabled = o.cropEnabled,
		io.clear(),
		t.mirrorShadow.enabled = i.enabled,
		t.mirrorShadow.opacity = i.opacity,
		t.mirrorShadow.height = i.height,
		t.mirrorShadow.mutated = !1,
		So.clear(),
		t.perspectiveShadow.enabled = a.enabled,
		t.perspectiveShadow.opacity = a.opacity,
		t.perspectiveShadow.opacityScale = a.opacityScale,
		t.perspectiveShadow.blurRadius = a.blurRadius,
		t.perspectiveShadow.blurRadiusScale = a.blurRadiusScale,
		t.perspectiveShadow.mutated = !1,
		Mo.clear(),
		l && (Wt(),
			Se(),
			q(),
			ut(),
			It(),
			j(),
			ht(),
			Lt()),
		t.mirrorShadow.enabled && Z(!0),
		t.perspectiveShadow.enabled && wt(!0),
		ToolMode.Grab.pick()
	}
	function Se() {
		Uo && (Uo = !1,
			Callbacks.M.sendSetShadows())
	}
	var me = .999,
	Ce = "#FF0",
	ye = "#FD0",
	ve = "#FB0",
	be = "#F80",
	Me = "#0FF",
	ke = "#08F",
	Te = "#0FF",
	xe = "#08F",
	Ae = "#F0F",
	Pe = "#80F",
	_e = "#0F0",
	De = "#F00",
	Re = "#080",
	Ee = 6,
	Fe = Ee,
	ze = Ee,
	Be = 14,
	Ue = 60,
	Oe = 3 * Ee + Fe + Ee,
	Ie = 4 * Ee + Ee,
	$e = ze + Be + Ee,
	Le = Ee + Ee,
	Ve = 75,
	Ge = 225,
	He = 400,
	We = 1.2,
	Xe = 20,
	Ne = 2 * Ve,
	Ye = 1e3,
	qe = 10,
	Je = function () {
		function t() {
			this.handles = [],
			this.xr = 0,
			this.yr = 0
		}
		return t.prototype.updateLocalCoords = function (t) {
			this.xr = t.x,
			this.yr = t.y
		},
		t.prototype.autoHideControls = function () {
			return !1
		},
		t.prototype.hitShadow = function (t) {
			return this.updateLocalCoords(t),
			!0
		},
		t.prototype.hitHandle = function () {
			for (var t = 0; t < this.handles.length; t++)
				if (this.handles[t].hitTest())
					return this.handles[t];
			return null
		},
		// 重点，可能是画路径的方法
		t.prototype.drawHandles = function (t) {
			if (!this.autoHideControls() || so && so.shadows && so.shadows.indexOf(this) >= 0)
				for (var e = so.handle, o = this.handles.length - 1; o >= 0; o--) {
					var i = this.handles[o];
					i.drawWrapper(t, i == e)
				}
		},
		t.prototype.drawShadow = function (t, e) {},
		t.prototype.drawControls = function (t) {},
		t
	}
	(),
	je = function (t) {
		function e() {
			t.call(this),
			this.handles.push(new ti(this))
		}
		return __extends(e, t),
		e.prototype.drawControls = function (t) {
			this.drawHandles(t)
		},
		e
	}
	(Je),
	Qe = function () {
		function t() {
			this.loops = []
		}
		return t.prototype.nonEmpty = function () {
			return this.loops.length > 0
		},
		t.prototype.isEmpty = function () {
			return 0 == this.loops.length
		},
		t.prototype.clear = function () {
			this.loops.length = 0
		},
		t.prototype.fromRect = function (t) {
			this.clear(),
			this.loops.push(new Ke([new Point(t.left0, t.top0), new Point(t.right0, t.top0), new Point(t.right0, t.bottom0), new Point(t.left0, t.bottom0)]))
		},
		t.prototype.decode = function (t) {
			var e = this;
			this.clear(),
			t && t.loops && t.loops.forEach(function (t) {
				return e.loops.push(new Ke(t.points))
			})
		},
		t.prototype.getPolygon = function () {
			return new Polygon(this.loops.map(function (t, e, o) {
					return t.getPolyLoop()
				}))
		},
		t.prototype.getPolygonPoints = function () {
			return this.loops.map(function (t, e, o) {
				return t.getPolyLoop().points
			})
		},
		t.prototype.encode = function () {
			return {
				loops: this.loops.map(function (t) {
					return t.encode()
				})
			}
		},
		t
	}
	(),
	Ke = function (t) {
		function e(e) {
			t.call(this);
			for (var o = 0; o < e.length; o++)
				this.handles.push(new ei(Point.from(e[o]), this))
		}
		return __extends(e, t),
		e.fromRect = function (t) {
			return new e([new Point(t.left0, t.top0), new Point(t.right0, t.top0), new Point(t.right0, t.bottom0), new Point(t.left0, t.bottom0)])
		},
		e.decode = function (t) {
			return new e(t.points)
		},
		e.prototype.getPolyLoop = function () {
			return new PolyLoop(this.handles.map(function (t, e, o) {
					return t.getV()
				}))
		},
		e.prototype.drawControls = function (t) {
			t.setGlobalAlpha(1),
			t.setLineWidth(4),
			t.setStrokeStyle("#000"),
			t.beginPath(),
			t.moveTo(l(this.handles[0].getX()), l(this.handles[0].getY())),
			this.handles.forEach(function (e, o, i) {
				return t.lineTo(l(e.getX()), l(e.getY()))
			}),
			t.closePath(),
			t.stroke(),
			t.setLineWidth(2),
			t.setStrokeStyle(Me),
			t.stroke(),
			this.drawHandles(t)
		},
		e.prototype.encode = function () {
			return {
				points: this.getPolyLoop().points
			}
		},
		e
	}
	(Je),
	Ze = {
		title: "",
		isVisible: !0,
		showPreview: !0,
		showFrame: !0,
		showBackground: !0,
		borderRight: !1,
		borderLeft: !1,
		clip: !1,
		contextMenuHandler: ContextMenu.showShadowApp
	};
	ViewPort.ShadowApp = t;
	var to = null,
	eo = [],
	oo = null,
	io = new Qe,
	ro = {
		v0: null,
		v2: null,
		downState: null,
		firstMove: !1
	},
	so = {
		shadows: [],
		shadow: null,
		handle: null,
		ellipse: null
	};
	t.getNumEllipseShadows = e,
	t.getSelectedEllipseShadow = o;
	var no = function () {
		function t(t) {
			this.indicatorId = t,
			this.indexSent = 0,
			this.indexReceived = 0,
			this.calledFor = !1
		}
		return t.prototype.incrementIndexSentAndShowIndicator = function () {
			this.indexSent++,
			this.indicatorId.$().show()
		},
		t.prototype.setIndexReceived = function (t) {
			this.indexReceived = t,
			this.indicatorId.$().hide()
		},
		t.prototype.readyToResubmit = function () {
			return this.inSync() && this.calledFor
		},
		t.prototype.inSync = function () {
			return this.indexSent == this.indexReceived
		},
		t.prototype.outOfSync = function () {
			return !this.inSync()
		},
		t.prototype.callFor = function () {
			this.calledFor = !0
		},
		t.prototype.resetCalledFor = function () {
			this.calledFor = !1
		},
		t
	}
	(),
	ao = null;
	t.dropShadow = null;
	var lo = -1,
	po = -1,
	co = -1,
	uo = null,
	ho = null,
	go = null,
	fo = null,
	wo = null,
	So = null;
	t.mirrorShadow = null;
	var mo = null,
	Co = null,
	yo = null,
	vo = new no(Css.ShadowAppMirrorShadowUpdatingIndicator),
	bo = null,
	Mo = null;
	t.perspectiveShadow = null;
	var ko = -1,
	To = -1,
	xo = null,
	Ao = Rect.empty(),
	Po = new no(Css.ShadowAppPerspectiveShadowUpdatingIndicator),
	_o = !1,
	Do = !1,
	Ro = -1,
	Eo = -1,
	Fo = -1,
	zo = !1,
	Bo = null,
	Uo = !1,
	Oo = 0,
	Io = 0,
	$o = 0,
	Lo = 0,
	Vo = 0,
	Go = 0,
	Ho = 0,
	Wo = 0,
	Xo = 0;
	t.onhide = Util.empty;
	var No = function (t) {
		function e(e, o, r, s, n, a) {
			t.call(this),
			this.sin = 0,
			this.cos = 1,
			this.shadowType = "ellipse",
			this.center = e.dup(),
			this.radiusX_i = Math.abs(o),
			this.radiusY_i = Math.abs(r),
			this.angleRad = s,
			this.strength = n,
			this.core = 0 === a || a ? a : i().core,
			this.sin = Math.sin(this.angleRad),
			this.cos = Math.cos(this.angleRad),
			this.topLeft = new ii(this, "topLeft", -1, -1),
			this.topRight = new ii(this, "topRight", 1, -1),
			this.bottomRight = new ii(this, "bottomRight", 1, 1),
			this.bottomLeft = new ii(this, "bottomLeft", -1, 1),
			this.sliderCore = new ri(this),
			this.move = new si(this),
			this.remove = new ni(this),
			this.rotator = new ai(this),
			this.sliderStrength = new li(this),
			this.handles = [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft, this.sliderCore, this.move, this.remove, this.sliderStrength, this.rotator]
		}
		return __extends(e, t),
		e.prototype.color = function () {
			return to == this ? ve : so.ellipse == this ? ye : Ce
		},
		e.prototype.oppositeCorner = function (t) {
			switch (t.name) {
			case "topLeft":
				return this.bottomRight;
			case "topRight":
				return this.bottomLeft;
			case "bottomRight":
				return this.topLeft;
			case "bottomLeft":
				return this.topRight
			}
			return null
		},
		e.prototype.radiusX_c = function () {
			return l(this.radiusX_i)
		},
		e.prototype.radiusY_c = function () {
			return l(this.radiusY_i)
		},
		e.prototype.angleDeg = function () {
			return 180 * this.angleRad / Math.PI
		},
		e.prototype.rotateX = function (t, e) {
			return t * this.cos + e * this.sin
		},
		e.prototype.rotateY = function (t, e) {
			return -t * this.sin + e * this.cos
		},
		e.prototype.derotateX = function (t, e) {
			return t * this.cos - e * this.sin
		},
		e.prototype.derotateY = function (t, e) {
			return t * this.sin + e * this.cos
		},
		e.prototype.setAngleRad = function (t) {
			this.angleRad = t,
			this.sin = Math.sin(t),
			this.cos = Math.cos(t)
		},
		e.prototype.autoHideControls = function () {
			return !0
		},
		e.prototype.hitCircle = function (t, e, o) {
			return Util.sqr(this.xr - t) + Util.sqr(this.yr - e) < o * o
		},
		e.prototype.setRect = function (t, e) {
			this.center.x = (t.x + e.x) / 2,
			this.center.y = (t.y + e.y) / 2;
			var o = (e.x - t.x) / 2,
			i = (e.y - t.y) / 2;
			this.radiusX_i = Math.max(qe, Math.abs(this.rotateX(o, i))),
			this.radiusY_i = Math.max(qe, Math.abs(this.rotateY(o, i)))
		},
		e.prototype.updateLocalCoords = function (t) {
			var e = t.x - this.center.x,
			o = t.y - this.center.y;
			this.xr = this.rotateX(e, o),
			this.yr = this.rotateY(e, o);
		},
		e.prototype.hitShadow = function (t) {
			this.updateLocalCoords(t);
			var e = -this.radiusX_i - Xo,
			o = +this.radiusX_i + Ho,
			i = -this.radiusY_i - Go,
			r = +this.radiusY_i + Wo;
			return e <= this.xr && this.xr <= o && i <= this.yr && this.yr <= r
		},
		e.prototype.drawShadow = function (t, e) {
			if (this.radiusX_i > 0 && this.radiusY_i > 0) {
				var o = 1,
				i = this.radiusY_i / this.radiusX_i,
				r = e.getZoomScale() * this.radiusX_i,
				s = t.createRadialGradient(0, 0, 0, 0, 0, r);
				s.addColorStop(0, "rgba(0,0,0," + this.strength.toFixed(3) + ")"),
				s.addColorStop(this.core, "rgba(0,0,0," + this.strength.toFixed(3) + ")");
				for (var n = 0; n <= 10; n++) {
					var a = n / 10,
					l = 1 - a,
					p = Util.clamp(this.strength * (-2 * l * l * l + 3 * l * l), 0, 1);
					s.addColorStop(this.core + a * (1 - this.core), "rgba(0,0,0," + p.toFixed(3) + ")")
				}
				t.setGlobalAlpha(1),
				t.setFillStyle(s),
				t.scale(o, i),
				t.fillCircle(0, 0, r)
			}
		},
		e.prototype.drawControls = function (t) {
			t.setGlobalAlpha(1),
			t.setLineWidth(4),
			t.setStrokeStyle("#000"),
			t.strokeRect(-l(this.radiusX_i), -l(this.radiusY_i), l(2 * this.radiusX_i), l(2 * this.radiusY_i)),
			t.setLineWidth(2),
			t.setStrokeStyle(this.color()),
			t.strokeRect(-l(this.radiusX_i), -l(this.radiusY_i), l(2 * this.radiusX_i), l(2 * this.radiusY_i)),
			this.drawHandles(t)
		},
		e.prototype.encode = function () {
			return {
				centerX_i: this.center.x,
				centerY_i: this.center.y,
				radiusX_i: this.radiusX_i,
				radiusY_i: this.radiusY_i,
				angleRad: this.angleRad,
				strength: this.strength,
				core: this.core
			}
		},
		e
	}
	(Je),
	Yo = function () {
		function t(t, e) {
			void 0 === e && (e = 1),
			this.container = t,
			this.handleRadiusScale = e,
			this.isVisible = !0
		}
		return t.prototype.getToolMode = function () {
			return ToolMode.ShadowArrow
		},
		t.prototype.getX = function () {
			return 0
		},
		t.prototype.getY = function () {
			return 0
		},
		t.prototype.getV = function () {
			return new Point(this.getX(), this.getY())
		},
		t.prototype.getHitRadius_i = function () {
			return this.handleRadiusScale * Oo
		},
		t.prototype.hitTest = function () {
			var t = this.getHitRadius_i();
			return Util.sqr(this.container.xr - this.getX()) + Util.sqr(this.container.yr - this.getY()) < t * t
		},
		// 重点，可能是画路径的方法
		t.prototype.drawWrapper = function (t, e) {
			this.isVisible && this.draw(t, e, this.getX(), this.getY())
		},
		t.prototype.draw = function (t, e, o, i) {},
		// 重要 
		t.prototype.drawTranslateHandle = function (t, e, o, i, r, s) {
			var n = l(o),
			a = l(i),
			p = 1.75 * Ee,
			u = 2,
			d = 1 * u,
			h = 2.5 * d;
			t.beginPath(),
			t.triangle(n, a - p, -Math.PI / 2, d, h),
			t.triangle(n, a + p, Math.PI / 2, d, h),
			t.triangle(n - p, a, Math.PI, d, h),
			t.triangle(n + p, a, 0, d, h),
			t.strokeEx(2, "#000"),
			t.fillEx(e ? s : r),
			c(t, e, o, i, r, s, 1)
		},
		t.prototype.mouseDrag = function (t) {},
		t.prototype.mouseDown = function (t) {},
		t.prototype.mouseUp = function (t) {},
		t
	}
	(),
	qo = function (t) {
		function e(e, o, i) {
			void 0 === i && (i = 1),
			t.call(this, o, i),
			this.p_i = e,
			this.dp_i = new Point(0, 0)
		}
		return __extends(e, t),
		e.prototype.getX = function () {
			return this.p_i.x
		},
		e.prototype.getY = function () {
			return this.p_i.y
		},
		e.prototype.mouseDrag = function (t) {
			this.p_i.set(t).plusEquals(this.dp_i)
		},
		e.prototype.mouseDown = function (t) {
			this.mouseDownPos_i = t.dup(),
			this.mouseDownTime = Date.now(),
			this.dp_i = this.p_i.minus(t)
		},
		e.prototype.mouseUp = function (t) {
			var e = Date.now() - this.mouseDownTime,
			o = this.mouseDownPos_i.distanceTo(t);
			o < 1 && e < 1e3 && this.click(t)
		},
		e.prototype.click = function (t) {},
		e
	}
	(Yo),
	Jo = function (e) {
		function o() {
			e.call(this),
			this.isInitialized = !1,
			this.geometryIsValid = !1,
			this.c1 = new jo(new Point(10, 0), this, !0, [], .7),
			this.p1 = new jo(new Point(0, 0), this, !1, [this.c1]),
			this.c0 = new jo(new Point(0, 0), this, !0, [], .7),
			this.p0 = new jo(new Point(10, 0), this, !1, [this.p1, this.c0]),
			this.quadDst_i = Quad.empty(),
			this.quadSrc_o = Quad.empty(),
			this.quadDst_o = Quad.empty(),
			this.quadSrcClip_i = Quad.empty(),
			this.quadSrcClip_o = Quad.empty(),
			this.quadDstClip_o = Quad.empty(),
			this.transformSrcToDst_o = new PerspectiveTransform,
			this.transformDstToSrc_o = new PerspectiveTransform,
			this.transformDstToSrc_o2i = new PerspectiveTransform,
			this.clipBoundsSrc_o = Rect.empty(),
			this.clipBoundsSrcPad_o = Rect.empty(),
			this.clipBoundsDstPad_o = Rect.empty(),
			this.canvasRect_o = Rect.empty(),
			this.cropRect_o = Rect.empty(),
			this.handles.push(this.p0, this.c0, this.p1, this.c1)
		}
		return __extends(o, e),
		o.prototype.clear = function () {
			this.initialize(!0)
		},
		o.prototype.initialize = function (e) {
			if (void 0 === e && (e = !1),
				!t.perspectiveShadow.mutated || !this.isInitialized || e) {
				this.isInitialized = !0;
				var o = Callbacks.M.getBoundingRect_o(),
				i = Callbacks.M.totalRotationAngleRad_o2i(),
				r = ViewPort.main.getImageCenter_i();
				o && (this.p0.p_i.set(o.bottomLeft().rotateInPlace(i, r)),
					this.c0.p_i.set(o.bottomRight().rotateInPlace(i, r)),
					this.p1.p_i.set(o.interpolate(1, .4).rotateInPlace(i, r)),
					this.c1.p_i.set(o.interpolate(1.75, .4).rotateInPlace(i, r)),
					this.updateGeometry())
			}
		},
		o.prototype.computeQuadsRayShoot = function (t, e, o) {
			var i = Callbacks.M.getBoundingRect_o().pad(t),
			r = Callbacks.M.totalRotationAngleRad_i2o(),
			s = ViewPort.main.getImageCenter_i(),
			n = this.p0.p_i.rotate(r, s),
			a = this.c0.p_i.rotate(r, s),
			l = this.p1.p_i.rotate(r, s),
			p = this.c1.p_i.rotate(r, s),
			c = (a.y - n.y) / (a.x - n.x),
			u = n.y + c * (i.left - n.x),
			d = n.y + c * (i.right - n.x);
			e.p0.setXy(i.left, i.top),
			e.p1.setXy(i.right, i.top),
			e.p2.setXy(i.right, d),
			e.p3.setXy(i.left, u),
			o && (o.p0.set(l),
				o.p1.set(p),
				o.p2.setXy(i.right, d),
				o.p3.setXy(i.left, u))
		},
		o.prototype.computeQuads = function (t, e, o) {
			var i = Callbacks.M.getBoundingRect_o().pad(t),
			r = Callbacks.M.totalRotationAngleRad_i2o(),
			s = ViewPort.main.getImageCenter_i(),
			n = this.p0.p_i.rotate(r, s),
			a = this.c0.p_i.rotate(r, s),
			l = this.p1.p_i.rotate(r, s),
			p = this.c1.p_i.rotate(r, s);
			e.p0.setXy(n.x, i.top),
			e.p1.setXy(a.x, i.top),
			e.p2.set(a),
			e.p3.set(n),
			o.p0.set(l),
			o.p1.set(p),
			o.p2.set(a),
			o.p3.set(n)
		},
		o.prototype.isValid = function () {
			return this.quadDst_i.p0.set(this.p1.p_i),
			this.quadDst_i.p1.set(this.c1.p_i),
			this.quadDst_i.p2.set(this.c0.p_i),
			this.quadDst_i.p3.set(this.p0.p_i),
			this.quadDst_i.isConvex() && this.cropRect_o.width() > 0 && this.cropRect_o.height() > 0
		},
		o.prototype.updateGeometry = function () {
			if (this.isInitialized) {
				this.computeQuads(0, this.quadSrc_o, this.quadDst_o),
				this.computeQuadsRayShoot(0, this.quadSrcClip_o, null),
				this.quadSrcClip_i.set(this.quadSrcClip_o).rotateInPlace(Callbacks.M.totalRotationAngleRad_o2i(), ViewPort.main.getImageCenter_i()),
				this.transformSrcToDst_o.setQuadrilateralToQuadrilateral(this.quadSrc_o, this.quadDst_o),
				this.transformDstToSrc_o.setQuadrilateralToQuadrilateral(this.quadDst_o, this.quadSrc_o),
				this.transformDstToSrc_o2i.setRotationAbout(Callbacks.M.totalRotationAngleRad_o2i(), ViewPort.main.getImageCenter_i()),
				this.transformDstToSrc_o2i.timesEquals(this.transformDstToSrc_o),
				this.transformSrcToDst_o.applyToQuad(this.quadSrcClip_o, this.quadDstClip_o),
				this.clipBoundsSrc_o.setFrom(Rect.fromQuad(this.quadSrcClip_o)),
				this.clipBoundsSrcPad_o.setFrom(this.clipBoundsSrc_o).pad(Ne),
				this.clipBoundsDstPad_o.setNull();
				for (var t = this.clipBoundsSrcPad_o.sampleGrid(10, 10), e = Point.empty(), o = 0; o < t.length; o++)
					this.transformSrcToDst_o.applyWithGuard(t[o], e) && this.clipBoundsDstPad_o.addPointSafe(e);
				this.cropRect_o.fromCropRect(Callbacks.M.getCrop_o()).snap(),
				this.canvasRect_o.setFrom(this.cropRect_o).pad(200).intersectionWith(this.clipBoundsDstPad_o).snap(),
				this.geometryIsValid = this.isValid()
			}
		},
		// 重点，可能是画路径的方法
		o.prototype.drawControls = function (t) {
			function e(e, o) {
				void 0 === o && (o = "#0f0"),
				t.setStrokeStyle(o),
				t.setGlobalAlpha(1),
				t.setLineWidth(.25),
				t.beginPath(),
				t.moveTo(l(e.p0.x), l(e.p0.y)),
				t.lineTo(l(e.p1.x), l(e.p1.y)),
				t.lineTo(l(e.p2.x), l(e.p2.y)),
				t.lineTo(l(e.p3.x), l(e.p3.y)),
				t.closePath(),
				t.stroke()
			}
			var o = ViewPort.main.getImageCenter_i(),
			i = Callbacks.M.totalRotationAngleRad_o2i();
			e(this.quadDstClip_o.rotate(i, o)),
			t.beginPath();
			this.p0.p_i.interpolate(this.c0.p_i, .5),
			this.p1.p_i.interpolate(this.c1.p_i, .5);
			t.moveTo(l(this.p0.p_i.x), l(this.p0.p_i.y)),
			t.lineTo(l(this.c0.p_i.x), l(this.c0.p_i.y)),
			t.moveTo(l(this.p1.p_i.x), l(this.p1.p_i.y)),
			t.lineTo(l(this.c1.p_i.x), l(this.c1.p_i.y)),
			t.setGlobalAlpha(1),
			t.setLineWidth(4),
			t.setStrokeStyle("#000"),
			t.stroke(),
			t.setLineWidth(2),
			t.setStrokeStyle(this.geometryIsValid ? _e : De),
			t.stroke(),
			this.drawHandles(t)
		},
		o.prototype.decode = function (t) {
			t && (t.p0 && this.p0.p_i.set(t.p0),
				t.c0 && this.c0.p_i.set(t.c0),
				t.p1 && this.p1.p_i.set(t.p1),
				t.c1 && this.c1.p_i.set(t.c1),
				t.isInitialized && (this.isInitialized = !0),
				this.updateGeometry())
		},
		o.prototype.encode = function () {
			return {
				isInitialized: this.isInitialized,
				p0: this.p0.p_i.dup(),
				c0: this.c0.p_i.dup(),
				p1: this.p1.p_i.dup(),
				c1: this.c1.p_i.dup()
			}
		},
		o
	}
	(Je),
	jo = function (e) {
		function o(t, o, i, r, s) {
			void 0 === s && (s = 1),
			e.call(this, t, o, s),
			this.p_i = t,
			this.perspective = o,
			this.isControlPoint = i,
			this.children = r
		}
		return __extends(o, e),
		o.prototype.draw = function (t, e, o, i) {
			this.isControlPoint ? u(t, e, this.getX(), this.getY(), _e, Re, this.handleRadiusScale) : c(t, e, this.getX(), this.getY(), _e, Re, this.handleRadiusScale)
		},
		o.prototype.translate = function (e) {
			t.perspectiveShadow.mutated = !0,
			this.p_i.plusEquals(e);
			for (var o = 0; o < this.children.length; o++)
				this.children[o].translate(e);
			this.perspective.updateGeometry()
		},
		o.prototype.mouseDrag = function (t) {
			this.translate(t.dup().plusEquals(this.dp_i).minus(this.p_i))
		},
		o
	}
	(qo),
	Qo = function (t) {
		function e() {
			t.apply(this, arguments),
			this.polyLine = new PolyLine([]),
			this.candidatePoint = null
		}
		return __extends(e, t),
		e.prototype.getPolyLine_o = function () {
			return this.polyLine.rotate(-Callbacks.M.totalRotationAngleRad_o2i(), ViewPort.main.getImageCenter_i())
		},
		e.prototype.isEmpty = function () {
			return 0 == this.handles.length
		},
		e.prototype.nonEmpty = function () {
			return this.handles.length > 0
		},
		e.prototype.clear = function () {
			this.handles.length = 0,
			this.updatePolyLine()
		},
		e.prototype.hitShadow = function (t) {
			this.updateLocalCoords(t);
			var o = this.polyLine.snapTo(t);
			return null != o && (this.candidatePoint = l(o.distance) < e.MaxDistance_c ? o : null),
			!0
		},
		e.prototype.add = function (t) {
			var e = new Ko(t, this);
			return this.handles.push(e, e.deleteHandle),
			this.updatePolyLine(),
			ht(),
			e
		},
		e.prototype.remove = function (t) {
			var e = this.handles.indexOf(t);
			e != -1 && (Undo.push(),
				this.handles.splice(e, 2)),
			this.isEmpty() && tt(!1, !0),
			this.updatePolyLine(),
			ht()
		},
		e.prototype.getMirrorHandles = function () {
			return this.handles.filter(function (t) {
				return t instanceof Ko
			})
		},
		e.prototype.updatePolyLine = function () {
			if (this.handles.length > 0) {
				var t = -Callbacks.M.totalRotationAngleRad_o2i(),
				e = ViewPort.subViewPort.getImageCenter_i(),
				o = Math.sin(t),
				i = Math.cos(t),
				r = new HashMap,
				s = [];
				this.getMirrorHandles().forEach(function (t) {
					var e = t.getV();
					r.contains(e.x) || (s.push(e),
						r.put(e.x, e))
				}),
				s.sort(function (t, e) {
					return i * t.x - o * t.y - (i * e.x - o * e.y)
				});
				var n = Callbacks.M.getCrop_o(),
				a = s[0],
				l = s[s.length - 1],
				p = a.rotate(t, e),
				c = l.rotate(t, e);
				p.x = n.left0,
				c.x = n.right0,
				s.unshift(p.rotate(-t, e)),
				s.push(c.rotate(-t, e)),
				this.polyLine.points = s
			} else
				this.polyLine.points = []
		},
		e.prototype.drawControls = function (t) {
			if (this.polyLine.nonEmpty()) {
				t.setGlobalAlpha(1),
				t.setLineWidth(4),
				t.setStrokeStyle("#000"),
				t.beginPath();
				var e = this.polyLine.head();
				t.moveTo(l(e.x), l(e.y)),
				this.polyLine.points.forEach(function (e) {
					return t.lineTo(l(e.x), l(e.y))
				}),
				t.stroke(),
				t.setLineWidth(2),
				t.setStrokeStyle(Ae),
				t.stroke()
			}
			if (this.drawHandles(t),
				null == so.handle && null != this.candidatePoint) {
				var o = this.candidatePoint;
				t.setGlobalAlpha(.4),
				c(t, !1, o.pp.x, o.pp.y, Ae, Ae, 1),
				t.setGlobalAlpha(1)
			}
		},
		e.prototype.decode = function (t) {
			var e = this;
			this.clear(),
			t && t.forEach(function (t) {
				return e.add(Point.from(t))
			})
		},
		e.prototype.encode = function () {
			return this.getMirrorHandles().map(function (t) {
				return t.getV()
			})
		},
		e.MaxDistance_c = 6,
		e
	}
	(Je),
	Ko = function (e) {
		function o(t, o, i) {
			void 0 === i && (i = 1),
			e.call(this, t, o, i),
			this.p_i = t,
			this.mirror = o,
			this.deleteHandle = new Zo(this)
		}
		return __extends(o, e),
		o.prototype.hitTest = function () {
			var t = this.getHitRadius_i(),
			e = Math.sqrt(Util.sqr(this.container.xr - this.getX()) + Util.sqr(this.container.yr - this.getY()));
			return this.deleteHandle.isVisible = e < 3.5 * t,
			e < t
		},
		o.prototype.draw = function (t, e, o, i) {
			c(t, e, this.getX(), this.getY(), Ae, Pe, this.handleRadiusScale)
		},
		o.prototype.mouseDrag = function (o) {
			e.prototype.mouseDrag.call(this, o),
			t.mirrorShadow.mutated = !0,
			this.mirror.updatePolyLine()
		},
		o
	}
	(qo),
	Zo = function (t) {
		function e(e, o) {
			void 0 === o && (o = 1),
			t.call(this, e.container, o),
			this.parentHandle = e,
			this.isVisible = !1
		}
		return __extends(e, t),
		e.prototype.getX = function () {
			return this.parentHandle.getX() + 1.7 * this.getHitRadius_i()
		},
		e.prototype.getY = function () {
			return this.parentHandle.getY() - 1.7 * this.getHitRadius_i()
		},
		e.prototype.draw = function (t, e, o, i) {
			var r = l(this.getX()),
			s = l(this.getY());
			t.fillCircle(r, s, Ee, e ? ViewPort.SwordActiveRed : ViewPort.SwordInactiveRed);
			var n = .8 * Ee / Math.sqrt(2);
			t.strokeLine(r - n, s - n, r + n, s + n, 1, e ? "#FFF" : "#DDD"),
			t.strokeLine(r + n, s - n, r - n, s + n)
		},
		e.prototype.mouseDown = function (t) {
			this.parentHandle.mirror.remove(this.parentHandle)
		},
		e
	}
	(Yo),
	ti = function (e) {
		function o(t, o) {
			void 0 === o && (o = 2),
			e.call(this, t, o),
			this.dp_i = new Point(0, 0)
		}
		return __extends(o, e),
		o.prototype.getX = function () {
			return Ro / 2 + t.dropShadow.offsetX
		},
		o.prototype.getY = function () {
			return Eo / 2 + t.dropShadow.offsetY
		},
		o.prototype.mouseDrag = function (t) {
			var e = new Point(t.x - Ro / 2, t.y - Eo / 2).plusEquals(this.dp_i);
			N(e.x, e.y)
		},
		o.prototype.mouseDown = function (t) {
			this.mouseDownPos_i = t.dup(),
			this.mouseDownTime = Date.now(),
			this.dp_i = this.getV().minus(t)
		},
		o.prototype.mouseUp = function (t) {
			var e = Date.now() - this.mouseDownTime,
			o = this.mouseDownPos_i.distanceTo(t);
			o < 1 && e < 1e3 && this.click(t)
		},
		o.prototype.click = function (t) {},
		o.prototype.draw = function (t, e, o, i) {
			this.drawTranslateHandle(t, e, o, i, Te, xe)
		},
		o
	}
	(Yo),
	ei = function (t) {
		function e(e, o, i) {
			void 0 === i && (i = 1),
			t.call(this, e, o, i),
			this.p_i = e,
			this.polygon = o
		}
		return __extends(e, t),
		e.prototype.draw = function (t, e, o, i) {
			c(t, e, this.getX(), this.getY(), Me, ke, this.handleRadiusScale)
		},
		e
	}
	(qo),
	oi = function (t) {
		function e(e, o, i) {
			void 0 === i && (i = 1),
			t.call(this, e, i),
			this.ellipse = e,
			this.name = o,
			this.dp_i = new Point(0, 0)
		}
		return __extends(e, t),
		e.prototype.getV = function () {
			var t = this.getX(),
			e = this.getY();
			return new Point(this.ellipse.center.x + this.ellipse.derotateX(t, e), this.ellipse.center.y + this.ellipse.derotateY(t, e))
		},
		e.prototype.hitTest = function () {
			return this.ellipse.hitCircle(this.getX(), this.getY(), this.getHitRadius_i())
		},
		e.prototype.mouseDown = function (t) {
			jt(this.ellipse),
			this.dp_i = this.getV().minus(t)
		},
		e
	}
	(Yo),
	ii = function (t) {
		function e(e, o, i, r) {
			t.call(this, e, o, 1),
			this.sx = i,
			this.sy = r
		}
		return __extends(e, t),
		e.prototype.getX = function () {
			return this.sx * this.ellipse.radiusX_i
		},
		e.prototype.getY = function () {
			return this.sy * this.ellipse.radiusY_i
		},
		e.prototype.draw = function (t, e, o, i) {
			c(t, e, this.getX(), this.getY(), this.ellipse.color(), be, this.handleRadiusScale)
		},
		e.prototype.mouseDrag = function (t) {
			this.ellipse.setRect(t.plus(this.dp_i), this.ellipse.oppositeCorner(this).getV())
		},
		e
	}
	(oi),
	ri = function (t) {
		function e(e) {
			t.call(this, e, "sliderCore", 1)
		}
		return __extends(e, t),
		e.prototype.getX = function () {
			return this.ellipse.radiusX_i * this.ellipse.core
		},
		e.prototype.getY = function () {
			return 0
		},
		e.prototype.hitTest = function () {
			var t = this.getX() - Oo,
			e = t + 2 * Oo,
			o = 1.5 * -Oo,
			i = 1.5 * +Oo;
			return t <= this.ellipse.xr && this.ellipse.xr <= e && o <= this.ellipse.yr && this.ellipse.yr <= i
		},
		e.prototype.draw = function (t, e, o, i) {
			t.setGlobalAlpha(1),
			t.strokeLine(0, 0, this.ellipse.radiusX_c() * me, 0, 4, "#000"),
			t.strokeLine(1, 0, this.ellipse.radiusX_c() * me - 1, 0, 2, "#FFF");
			var r = l(this.getX()) - Ee,
			s = 2 * Ee,
			n = 1.5 * -Ee,
			a = 2 * Ee * 1.5;
			t.setFillStyle("#000"),
			t.fillRect(r, n, s, a),
			t.setFillStyle(e ? be : this.ellipse.color()),
			t.fillRect(r + 1, n + 1, s - 2, a - 2)
		},
		e.prototype.mouseDrag = function (t) {
			if (this.ellipse.radiusX_i > 0) {
				var e = t.plus(this.dp_i),
				o = this.ellipse.rotateX(e.x - this.ellipse.center.x, e.y - this.ellipse.center.y);
				this.ellipse.core = Util.clamp(Util.roundTo(o / this.ellipse.radiusX_i, 2), 0, me),
				Kt()
			}
		},
		e
	}
	(oi),
	si = function (t) {
		function e(e) {
			t.call(this, e, "move", 2)
		}
		return __extends(e, t),
		e.prototype.getX = function () {
			return 0
		},
		e.prototype.getY = function () {
			return -this.ellipse.radiusY_i - (Io + Oo)
		},
		e.prototype.draw = function (t, e, o, i) {
			this.drawTranslateHandle(t, e, o, i, this.ellipse.color(), be)
		},
		e.prototype.mouseDrag = function (t) {
			var e = this.getV(),
			o = t.plus(this.dp_i);
			this.ellipse.center.x += o.x - e.x,
			this.ellipse.center.y += o.y - e.y
		},
		e
	}
	(oi),
	ni = function (t) {
		function e(e) {
			t.call(this, e, "remove", 1)
		}
		return __extends(e, t),
		e.prototype.getX = function () {
			return +this.ellipse.radiusX_i + 1.7 * Oo
		},
		e.prototype.getY = function () {
			return -this.ellipse.radiusY_i - 1.7 * Oo
		},
		e.prototype.draw = function (t, e, o, i) {
			var r = l(o),
			s = l(i);
			t.fillCircle(r, s, Ee, e ? ViewPort.SwordActiveRed : ViewPort.SwordInactiveRed);
			var n = .8 * Ee / Math.sqrt(2);
			t.strokeLine(r - n, s - n, r + n, s + n, 1, e ? "#FFF" : "#DDD"),
			t.strokeLine(r + n, s - n, r - n, s + n)
		},
		e.prototype.mouseDown = function (t) {
			var e = eo.indexOf(this.ellipse);
			e >= 0 && (Undo.push(),
				to == this.ellipse && jt(null),
				eo.splice(e, 1),
				Wt(),
				ae())
		},
		e
	}
	(oi),
	ai = function (t) {
		function e(e) {
			t.call(this, e, "rotator", 2)
		}
		return __extends(e, t),
		e.prototype.getX = function () {
			return this.ellipse.radiusX_i + (Io + Oo)
		},
		e.prototype.getY = function () {
			return 0
		},
		e.prototype.draw = function (t, e, o, i) {
			var r = e ? be : this.ellipse.color(),
			s = l(o),
			n = l(i),
			a = 2 * Ee,
			p = Math.PI / 3;
			t.beginPath(),
			t.arc(s, n, a, -p, p),
			t.strokeEx(4, "#000"),
			t.beginPath();
			var u = s + a * Math.cos(p),
			d = a * Math.sin(p);
			t.triangle(u, n + d, p + Math.PI / 2, 4, 4),
			t.triangle(u, n - d, -p - Math.PI / 2, 4, 4),
			t.strokeEx(2, "#000"),
			t.fillEx(r),
			t.beginPath(),
			t.arc(s, n, a, -p, p),
			t.strokeEx(2, r),
			c(t, e, o, i, this.ellipse.color(), be, 1)
		},
		e.prototype.mouseDrag = function (t) {
			var e = t.plus(this.dp_i);
			this.ellipse.setAngleRad(Math.atan2(e.y - this.ellipse.center.y, e.x - this.ellipse.center.x))
		},
		e
	}
	(oi),
	li = function (t) {
		function e(e) {
			t.call(this, e, "sliderStrength", 1)
		}
		return __extends(e, t),
		e.prototype.hitTest = function () {
			var t = this.minX_i(),
			e = t + Vo,
			o = this.ellipse.radiusY_i + Io,
			i = o + Lo;
			return t <= this.ellipse.xr && e >= this.ellipse.xr && o <= this.ellipse.yr && i >= this.ellipse.yr
		},
		e.prototype.minX_i = function () {
			return this.ellipse.radiusX_i - Vo - Oo
		},
		e.prototype.minX_c = function () {
			return this.ellipse.radiusX_c() - Ue - Ee
		},
		e.prototype.draw = function (t, e, o, i) {
			var r = this.minX_c(),
			s = this.ellipse.radiusY_c() + Fe;
			t.setFillStyle("#000"),
			t.setGlobalAlpha(1),
			t.fillRect(r - 1, s - 1, Ue + 2, Be + 2);
			var n = t.createLinearGradient(r, 0, r + Ue, 0);
			n.addColorStop(0, "#FFF"),
			n.addColorStop(1, "#000"),
			t.setFillStyle(n),
			t.fillRect(r, s, Ue, Be);
			var a = r + Ue * this.ellipse.strength;
			t.strokeLine(a, s - 2, a, s + Be + 2, 2, "#C00")
		},
		e.prototype.mouseDrag = function (t) {
			this.ellipse.updateLocalCoords(t),
			this.ellipse.strength = Util.clamp(Util.roundTo((this.ellipse.xr - this.minX_i()) / Vo, 2), 0, 1),
			Kt(),
			Wt()
		},
		e.prototype.mouseDown = function (t) {
			jt(this.ellipse),
			this.mouseDrag(t)
		},
		e
	}
	(oi);
	t.initialize = d,
	t.show = g,
	t.setEllipseShadowStrength = f,
	t.setEllipseShadowCore = C,
	t.setDropShadowEnabled = M,
	t.setDropShadowCropEnabled = k,
	t.setDropShadowOpacity = T,
	t.dropShadowOpacityReset = A,
	t.dropShadowOpacityDecrement = P,
	t.dropShadowOpacityIncrement = _,
	t.setDropShadowBlurRadius = D,
	t.dropShadowBlurRadiusReset = E,
	t.dropShadowBlurRadiusDecrement = F,
	t.dropShadowBlurRadiusIncrement = z,
	t.setDropShadowOffsetX = B,
	t.dropShadowOffsetXReset = O,
	t.dropShadowOffsetXDecrement = I,
	t.dropShadowOffsetXIncrement = L,
	t.setDropShadowOffsetY = V,
	t.dropShadowOffsetYReset = H,
	t.dropShadowOffsetYDecrement = W,
	t.dropShadowOffsetYIncrement = X,
	t.setDropShadowOffset = N,
	t.dropShadowOffsetReset = Y,
	t.updateDropShadowCanvas = j,
	t.initializeMirrorShadow = Z,
	t.setMirrorShadowEnabled = tt,
	t.setMirrorShadowOpacity = et,
	t.mirrorShadowOpacityReset = it,
	t.mirrorShadowOpacityDecrement = rt,
	t.mirrorShadowOpacityIncrement = st,
	t.setMirrorShadowHeight = nt,
	t.mirrorShadowHeightReset = lt,
	t.mirrorShadowHeightDecrement = pt,
	t.mirrorShadowHeightIncrement = ct,
	t.updateMirrorShadowCanvas = ht,
	t.initializePerspectiveShadow = wt,
	t.setPerspectiveShadowEnabled = St,
	t.setPerspectiveShadowOpacity = mt,
	t.perspectiveShadowOpacityReset = yt,
	t.perspectiveShadowOpacityDecrement = vt,
	t.perspectiveShadowOpacityIncrement = bt,
	t.setPerspectiveShadowOpacityScale = Mt,
	t.perspectiveShadowOpacityScaleReset = Tt,
	t.perspectiveShadowOpacityScaleDecrement = xt,
	t.perspectiveShadowOpacityScaleIncrement = At,
	t.setPerspectiveShadowBlurRadius = Pt,
	t.perspectiveShadowBlurRadiusReset = Dt,
	t.perspectiveShadowBlurRadiusDecrement = Rt,
	t.perspectiveShadowBlurRadiusIncrement = Et,
	t.setPerspectiveShadowBlurRadiusScale = Ft,
	t.perspectiveShadowBlurRadiusScaleReset = Bt,
	t.perspectiveShadowBlurRadiusScaleDecrement = Ut,
	t.perspectiveShadowBlurRadiusScaleIncrement = Ot,
	t.updatePerspectiveShadowCanvas = Lt,
	t.keyDownHandler = Xt,
	t.keyUpHandler = Nt,
	t.updateDisplay = Yt;
	var pi = !1;
	t.mouseDownHandler = oe,
	t.mouseMoveHandler = ie,
	t.mouseUpHandler = re,
	t.touchEndHandler = se,
	t.mouseWheelHandler = ne,
	t.drawUnder_c = pe,
	t.drawOver_c = ce,
	t.drawUnder_i = ue,
	t.drawOver_i = de,
	t.encode = he,
	t.decode = fe,
	t.clear = we
}
(ShadowApp || (ShadowApp = {}));
var ControlByteDecoder;
!function (t) {
	function e(t, e, o) {}
	function o(t, o, p, c) {
		for (var u = new Uint8Array(t), d = 0, h = 0, g = 0; d < u.length; ) {
			var f = d,
			w = u[d++],
			S = w & a,
			m = 0 == (w & l),
			C = (w >> 3 & 31) + 1;
			if (m ? S == n || (C += u[d++] << 5) : C += S == n ? u[d++] << 5 : (u[d++] << 5) + (u[d++] << 13) + (u[d++] << 21),
				e(S, C, d - f),
				S == i)
				h += C;
			else if (S == r)
				for (g = 0; g < C; g++,
					h++)
					o(4 * h);
			else if (S == s)
				for (g = 0; g < C; g++,
					h++)
					p(4 * h);
			else
				for (g = 0; g < C; g++,
					h++)
					c(4 * h, u[d++], u[d++], u[d++], u[d++])
		}
	}
	var i = 0,
	r = 1,
	s = 2,
	n = 3,
	a = 3,
	l = 4;
	t.decode = o
}
(ControlByteDecoder || (ControlByteDecoder = {}));
var M;
!function (t) {
	function e() {
		return !!window.GlobalsEx.email
	}
	function o() {
		ur && !n() && s(!0),
		ti(),
		ai({
			command: Const.MaybeSaved
		})
	}
	function i() {
		$(window).off("beforeunload")
	}
	function r() {
		Tutorial.hide() || (window.Globals.Bulk.isIframe && ai({
				command: Const.Exiting
			}),
			n() ? (Util.saveAndExit(!0),
				ur = !0,
				f()) : (window.Globals.Bulk.isIframe && !window.Globals.Bulk.isApiSingle && Util.saveAndExit(!0),
				s(!0)))
	}
	function s(t) {
		return void 0 === t && (t = !1),
		i(),
		window.Globals.Bulk.isIframe ? ai({
			command: Const.Exit,
			isNice: !!t
		}) : HtmlHistory.exit(),
		!1
	}
	function n() {
		return Oi || Wi || 0 == pr.hasImage || 0 == pr.hasThumbnail || pr.hasDrawCommands != t.hasDrawCommands
	}
	function a() {
		return pr.hasImage >= t.hasImage && pr.hasThumbnail >= t.hasThumbnail && pr.hasDrawCommands >= t.hasDrawCommands
	}
	function l() {
		t.appHasAlreadyRun = !0,
		window.Globals.Bulk.isIframe || HtmlHistory.goTo(ji),
		$(window).on("beforeunload", function () {
			return t.hasUnsavedChanges() ? Tr.s("There are unsaved changes.") : void 0
		}),
		Css.force_exit.$().click(s),
		Css.exit_app.$().click(r).removeAttr("disabled")
	}
	function p(t, e, o, i, r) {
		t.decrease.$().toggleClass("disabled", e == o),
		t.increase.$().toggleClass("disabled", e == i),
		t.reset.$().toggleClass("disabled", e == r)
	}
	function c(t) {
		return t.w.toFixed(0) + " x " + t.h.toFixed(0) + "px (" + Util.formatAspectRatio(Util.fuzzyAspectRatio(t)) + ")"
	}
	function u(t, e, o, i) {
		Css.bulk_status_display.$().text(i + " left").attr("title", t + " total, " + e + " done, " + i + " remaining, " + o + " skipped")
	}
	function d() {
		var e = t.getCrop_o(),
		o = t.getCropTargetSize(),
		i = null;
		i = c(t.settings.cropMode == Const.CropTargetSize && null != o && (t.settings.cropAllowEnlarging || o.w < e.width() || o.h < e.height()) ? o : {
				w: e.width(),
				h: e.height()
			}),
		Css.CropApp.output_size_display.$().text(i);
		var r = t.settings.backgroundColor != t.TransparentColor && null != t.settings.backgroundColor,
		s = r ? t.settings.opaqueFileFormat == Const.OpaqueFileFormatPng ? "PNG" : "JPEG" : "PNG";
		"JPEG" == s && (s += " (" + Tr.s("quality level") + " " + t.settings.jpegQuality + ")");
		var n = io() + " " + Tr.s("color space"),
		a = t.settings.outputDpi + " DPI",
		l = Tr.s("not web optimized");
		"PNG" == s ? t.settings.pngMode == Const.PngModeLossy ? l = Tr.s("lossy optimization") : t.settings.pngMode == Const.PngModeLossless && (l = Tr.s("lossless optimization")) : t.settings.jpegMode == Const.JpegModeMoz && (l = Tr.s("web optimized")),
		l != Tr.s("not web optimized") && (n = Tr.s("default color space"),
			a = Tr.s("default DPI")),
		Css.resultDialog.SettingsSummary.ExportOptions.Value.$().text(s + ", " + l + ", " + n + ", " + a);
		var p = Tr.s("brightness") + " " + Util.signedNumber(t.settings.brightness),
		u = Tr.s("shadows") + " " + Util.signedNumber(t.settings.shadows),
		d = Tr.s("highlights") + " " + Util.signedNumber(t.settings.highlights),
		h = Tr.s("temperature") + " " + Util.signedNumber(t.settings.temperature),
		g = Tr.s("saturation") + " " + Util.signedNumber(t.settings.saturation),
		f = Tr.s("white balance") + " " + (t.settings.whiteBalanceEnabled ? Tr.s("enabled") : Tr.s("disabled")),
		w = Tr.s("color cast removal") + " " + (t.settings.removeColorCast ? Tr.s("enabled") : Tr.s("disabled"));
		Css.resultDialog.SettingsSummary.ColorsApp.Value.$().text(p + ", " + u + ", " + d + ", " + h + ", " + g + ", " + f + ", " + w);
		var S = Tr.s("unconstrained");
		t.settings.cropMode == Const.CropLockedAspectRatio ? S = Tr.s("locked aspect ratio") + ": " + Util.formatAspectRatio(pe()) : t.settings.cropMode == Const.CropTargetSize && (S = Tr.s("fixed size") + ": " + c(ue()));
		var m = t.settings.cropFitToResult ? Tr.s("fit to result") : Tr.s("manual crop"),
		C = m + ", " + S;
		t.settings.cropFitToResult && (C += t.settings.cropMarginUnits == Const.CropMarginPercent ? ", " + StickySettings.Settings.Crop.PaddingMils.getCurrentDisplay().toLowerCase() + " " + Tr.s("margin") : ", " + StickySettings.Settings.Crop.PaddingPixels.getCurrentDisplay().toLowerCase() + " " + Tr.s("margin"),
			C += ", " + StickySettings.Settings.Crop.ObjectSize.getCurrentDisplay().toLowerCase() + " " + Tr.s("object"),
			C += ", " + StickySettings.Settings.Crop.VerticalAlignment.getCurrentDisplay().toLowerCase() + " " + Tr.s("alignment"),
			C += ", " + StickySettings.Settings.Crop.Shadows.getCurrentDisplay().toLowerCase() + " " + Tr.s("shadows")),
		C += ", " + Tr.s("rotated") + " " + Util.signedNumber(t.settings.rotateAngleDeg) + "£",
		C += ", " + Tr.s("straightened") + " " + Util.signedNumber(Util.roundTo(t.settings.straightenAngleDeg, 1)) + "£",
		Css.resultDialog.SettingsSummary.CropApp.Value.$().text(C);
		var y = ShadowApp.getNumEllipseShadows(),
		v = Tr.s("no oval shadows");
		1 == y ? v = Tr.s("1 oval shadow") : y > 1 && (v = y + " " + Tr.s("oval shadows"));
		var b = StickySettings.Settings.Shadows,
		M = Tr.s("drop shadow disabled"),
		k = ShadowApp.dropShadow;
		if (k.enabled) {
			var T = b.Drop;
			M = Tr.s("drop shadow enabled") + " (" + T.BlurRadius.getCurrentDisplay() + " " + Tr.s("blur radius") + ", " + T.Opacity.getCurrentDisplay() + " " + Tr.s("opacity") + ", " + Tr.s("clipping") + " " + (k.cropEnabled ? Tr.s("enabled") : Tr.s("disabled")) + ")"
		}
		var x = Tr.s("reflection disabled"),
		A = ShadowApp.mirrorShadow;
		if (A.enabled) {
			var P = b.Mirror;
			x = Tr.s("reflection enabled") + " (" + P.Opacity.getCurrentDisplay() + " " + Tr.s("opacity") + ", " + P.Height.getCurrentDisplay() + " " + Tr.s("height") + ")"
		}
		var _ = Tr.s("cast shadow disabled"),
		D = ShadowApp.perspectiveShadow;
		if (D.enabled) {
			var R = b.Perspective;
			_ = Tr.s("cast shadow enabled") + " (" + R.Opacity.getCurrentDisplay() + " " + Tr.s("opacity") + ", " + R.OpacityScale.getCurrentDisplay() + " " + Tr.s("opacity scale") + ", " + R.BlurRadius.getCurrentDisplay() + " " + Tr.s("blur radius") + ", " + R.BlurRadiusScale.getCurrentDisplay() + " " + Tr.s("blur scale") + ")"
		}
		Css.resultDialog.SettingsSummary.ShadowsApp.Value.$().text(v + ", " + M + ", " + x + ", " + _)
	}
	function h() {
		var e;
		e = 0 == t.hasThumbnail || 0 == t.hasImage ? Const.LightProgress : Ji == qi ? Const.LightUpdated : WorkerApi.isConnected() ? Const.LightUpdating : Const.LightConnecting,
		Yi != e && (Yi = e,
			Callbacks.App.setLightState(e))
	}
	function g() {
		var t;
		t = Wi || Xi ? Const.SaveSaving : Oi ? Const.SaveSave : Const.SaveSaved,
		Ni != t && (Ni = t,
			Callbacks.App.setSaveState(t))
	}
	function f() {
		function e() {
			clearTimeout(Vi),
			Vi = setTimeout(t.checkSaveDrawCommands, Gi),
			g(),
			o()
		}
		if (clearTimeout(Vi),
			Wi)
			Xi = !0;
		else if (Oi) {
			Oi = !1;
			var i = S();
			if (Hi != i) {
				Wi = !0,
				g();
				var r = new Blob([i], {
						type: "application/json"
					});
				FileUploader.uploadS3WithRetry(r, ji.drawCommands, {
					url: window.Globals.s3_url,
					label: Tr.s("Saving edits"),
					maxAge: 0,
					success: function () {
						Hi = i,
						Wi = !1,
						0 == t.hasDrawCommands && (t.hasDrawCommands = 1,
							Lo()),
						Xi ? (Xi = !1,
							f()) : e()
					}
				})
			} else
				e()
		} else
			e()
	}
	function w() {
		var e = {
			userMask: t.userMask.encode(),
			maskVersion: Const.MaskVersion,
			hairPalettes: HairPalettes.pickleAll(),
			sword: Sword.encode(),
			shadowApp: ShadowApp.encode()
		};
		window.Globals.UseHair && (e.hairMask = t.hairMask.encode());
		var o = $.extend(!0, e, t.settings);
		return t.settings.cropFitToResult ? delete o.cropRect_o : o.cropRect_o = t.settings.cropRect_o.dup(),
		o
	}
	function S() {
		return JSON.stringify(w())
	}
	function m(e, o, i, r, s, n) {
		StartupProgress.show(),
		n ? t.entryPoint = "create" : t.entryPoint = "duplicate",
		t.hasImage = 0,
		t.hasThumbnail = 0,
		t.hasDrawCommands = 0,
		FileUploader.uploadS3WithRetry(e, r.image, {
			url: window.Globals.s3_url,
			label: Tr.s("Uploading original image"),
			maxAge: 31536e3,
			success: function () {
				t.hasImage = o.wasShrunk ? 2 : 1,
				h(),
				Lo()
			}
		}),
		FileUploader.uploadS3WithRetry(i, r.thumbnail, {
			url: window.Globals.s3_url,
			label: Tr.s("Uploading thumbnail"),
			maxAge: 31536e3,
			success: function () {
				t.hasThumbnail = 1,
				h(),
				Lo()
			}
		}),
		i = null,
		o.wasShrunk && y(),
		T(o, r, s)
	}
	function C(e, o, i) {
		StartupProgress.show(),
		Guide.strokeResume(),
		t.entryPoint = "resume",
		pr.hasImage = t.hasImage = o.hasImage,
		pr.hasThumbnail = t.hasThumbnail = 1,
		pr.hasDrawCommands = t.hasDrawCommands = o.hasDrawCommands,
		Hi = JSON.stringify(i),
		T(e, o, i)
	}
	function y() {
		Css.ImageResizeNotification.$().show().click(function () {
			$(this).hide()
		}),
		setTimeout(function () {
			Css.ImageResizeNotification.$().hide()
		}, 2e4)
	}
	function v() {
		Css.ImageColorCorrectionNotification.$().show().click(function () {
			$(this).hide()
		}),
		setTimeout(function () {
			Css.ImageColorCorrectionNotification.$().hide()
		}, 2e4)
	}
	function b(t) {
		function e() {
			var t = o.position();
			i.css({
				bottom: o.outerHeight() + t.top + 6,
				left: t.left + (o.outerWidth() - i.outerWidth()) / 2
			}).show()
		}
		var o = $("#color-picker-color"),
		i = $("#color-picker-ui-popover");
		sr = $.farbtastic("#color-picker-ui", "#color-picker-color", function (e) {
				$("#background-color-swatch-button-custom").data("color", e),
				$("#background-color-swatch-button-custom .swatch").css("background-color", e),
				nr && !t && (clearTimeout(ar),
					ar = setTimeout(function () {
							st(e, !0)
						}, 100))
			}),
		o.blur(function () {
			i.hide()
		}).focus(e).keydown(function (t) {
			t.stopPropagation()
		}),
		t && e(),
		window.Globals.BackgroundColors.push("#000"),
		M(window.myLocalStorage.customColor || "#338855")
	}
	function M(t) {
		nr = !1,
		sr.setColor(t),
		nr = !0,
		window.Globals.BackgroundColors[window.Globals.BackgroundColors.length - 1] = t
	}
	function k(e, o) {
		if ("string" == typeof e)
			try {
				e = JSON.parse(e),
				"object" != typeof e && (e = {})
			} catch (t) {
				e = {}
			}
		o && WebApi.setStickySettings(JSON.stringify(e), function (t) {
			alert(Tr.s("Sorry, failed to save your sticky settings:") + " " + t + "\n\n" + Tr.s("Please try again and let us know if the error persists!"))
		}, function () {}),
		t.stickySettings = $.extend({
				dropShadow: {},
				mirrorShadow: {},
				perspectiveShadow: {},
				ellipseShadow: {}
			}, e),
		t.defaultSettings = $.extend(!0, {}, Const.FactoryDefaults, t.stickySettings),
		t.defaultSettings.ellipseShadow = $.extend(!0, {}, Const.FactoryDefaults.ellipseShadow, t.stickySettings.ellipseShadow),
		t.defaultSettings.dropShadow = $.extend(!0, {}, Const.FactoryDefaults.dropShadow, t.stickySettings.dropShadow),
		t.defaultSettings.mirrorShadow = $.extend(!0, {}, Const.FactoryDefaults.mirrorShadow, t.stickySettings.mirrorShadow),
		t.defaultSettings.perspectiveShadow = $.extend(!0, {}, Const.FactoryDefaults.perspectiveShadow, t.stickySettings.perspectiveShadow),
		nt(),
		_t(),
		Wt(),
		Zt(),
		ro(),
		N(),
		j(),
		tt(),
		it(),
		CropApp.updateDisplay(),
		ShadowApp.updateDisplay()
	}
	function T(e, o, i) {
		b(!1),
		Ii = !1,
		Qi = !1,
		xi = e.width(),
		Ai = e.height(),
		Ui.right0 = xi,
		Ui.bottom0 = Ai,
		t.imageSize = {
			w: xi,
			h: Ai
		},
		t.imageAspectRatio = Util.fuzzyAspectRatio(t.imageSize),
		Pi = xi / 2,
		_i = Ai / 2,
		Di.setXy(Pi, _i),
		t.imageCanvas = e,
		ji = o,
		t.previewCanvas = new CanvasEx(xi, Ai),
		t.previewCanvas.context().drawCanvasEx(t.imageCanvas, 0, 0),
		Ki = t.previewCanvas.context().getImageData(0, 0, xi, Ai),
		t.previewCanvasData = Ki.data,
		Zi = Ki,
		tr = t.previewCanvasData,
		ir = t.imageCanvas.context().getImageData(0, 0, xi, Ai),
		rr = ir.data,
		l(),
		WorkerApi.initialize({
			imageId: ji.id,
			secret: ji.secret,
			newMessageFromServer: Po,
			connectedToNewServer: _o,
			disconnectedFromServer: Do
		}),
		Ji = 0,
		qi = 0,
		// 重要
		t.userMask = ToolMode.buildUserMask(t.imageCanvas.width(), t.imageCanvas.height()),
		t.hairMask = ToolMode.buildHairMask(t.imageCanvas.width(), t.imageCanvas.height()),
		ji.isShopImage ? Css.not_shop_image_content.$().remove() : Css.shop_image_content.$().remove(),
		ShadowApp.initialize(),
		R(i, !1),
		"duplicate" == t.entryPoint ? (Oi = !0,
			Hi = null) : (Oi = !1,
			Hi = S()),
		f(),
		Ii = !0,
		HairPalettes.initialize(),
		Callbacks.App.imageUpdated(),
		h(),
		!o.hasDrawCommands && t.defaultSettings.autoLevels && vo(),
		SavedMask.checkFetch(),
		PreCrop.initialized && null != PreCrop.maxNumMegapixels && (PreCrop.maxNumMegapixels == t.stickySettings.maxNumMegapixels && PreCrop.lockAspectRatio == t.stickySettings.preCropLockAspectRatio || (J(PreCrop.maxNumMegapixels, !1),
				t.stickySettings.preCropLockAspectRatio = PreCrop.lockAspectRatio,
				StickySettings.commitSticky(!0))),
		it(),
		ai({
			command: Const.Booted
		})
	}
	function x(e) {
		Util.loadImageFromDataUrl(e, function (t) {}, function (e) {
			e.width == t.imageCanvas.width() && e.height == t.imageCanvas.height() && A(e)
		})
	}
	function A(e) {
		var o = t.imageCanvas.context();
		o.drawImage(e, 0, 0),
		ir = o.getImageData(0, 0, xi, Ai),
		rr = ir.data;
		for (var i = 0; i < t.previewCanvasData.length; i += 4)
			255 == t.previewCanvasData[i + ui] && (t.previewCanvasData[i + li] = rr[i + li],
				t.previewCanvasData[i + pi] = rr[i + pi],
				t.previewCanvasData[i + ci] = rr[i + ci]);
		$o(),
		Eo(),
		v(),
		ei({
			command: Const.RequestFullServerMask
		}),
		ViewPort.refreshAllViews()
	}
	function P(t) {
		return "undefined" == typeof t || null === t
	}
	function _(t) {
		return !P(t)
	}
	function D(t, e, o) {
		return _(t) ? t : _(e) ? e : o
	}
	function R(e, o) {
		// 重要
		e.hasOwnProperty("userMask") && t.userMask.decode(e.userMask, e.maskVersion),
		e.hasOwnProperty("hairMask") && t.hairMask.decode(e.hairMask, e.maskVersion),
		HairPalettes.parseAll(e.hairPalettes);
		var i = t.defaultSettings;
		G(D(e.brushSize, i.brushSize), !1),
		st(D(e.backgroundColor, i.backgroundColor), !1),
		ht(D(e.globalBlurLevel, i.globalBlurLevel), !1),
		ct(D(e.globalSmoothingLevel, i.globalSmoothingLevel), !1),
		wt(D(e.globalOffset, i.globalOffset), !1),
		St(D(e.useCornerDetection, i.useCornerDetection), !1),
		mt(D(e.useLocalBlur, i.useLocalBlur), !1),
		Ct(D(e.useLocalSmoothing, i.useLocalSmoothing), !1),
		ge(D(e.rotateAngleDeg, 0), !1),
		ye(D(e.straightenAngleDeg, 0)),
		Li = !0,
		Re(D(e.brightness, 0)),
		Ue(D(e.shadows, 0)),
		Ve(D(e.highlights, 0)),
		Ne(D(e.temperature, 0)),
		Qe(D(e.saturation, 0)),
		po(D(e.removeColorCast, i.removeColorCast), !1),
		uo(D(e.castColor, i.castColor), !1),
		go(D(e.colorCastForegroundProtection, i.colorCastForegroundProtection)),
		so(D(e.whiteBalanceEnabled, i.whiteBalanceEnabled), !1),
		ao(D(e.whiteBalanceGrayColor, i.whiteBalanceGrayColor), !1),
		oo(D(e.outputColorSpace, i.outputColorSpace), !1),
		Li = !1,
		$i = !0,
		e.cropRect_o && bt(CropRect.from(e.cropRect_o), !1),
		Mt(D(e.cropMode, i.cropMode), !1),
		kt(D(e.cropMarginUnits, i.cropMarginUnits), !1),
		Tt(D(e.cropObjectSize, i.cropObjectSize), !1),
		xt(D(e.cropVerticalAlignment, i.cropVerticalAlignment), !1),
		At(D(e.cropShadows, i.cropShadows), !1),
		ce(D(e.cropAspectRatio, i.cropAspectRatio, t.settings.cropAspectRatio), !1, !1),
		de(D(e.cropTargetSize, i.cropTargetSize, t.settings.cropTargetSize), !1, !1),
		Pt(D(e.cropPaddingMils, i.cropPaddingMils), !1),
		zt(D(e.cropPaddingPixels, i.cropPaddingPixels), !1),
		ne(D(e.cropFitToResult, i.cropFitToResult), !1),
		ae(D(e.cropAllowEnlarging, i.cropAllowEnlarging), !1, !1),
		$t(D(e.outputDpi, i.outputDpi), !1),
		Xt(D(e.jpegQuality, i.jpegQuality), !1),
		jt(D(e.opaqueFileFormat, i.opaqueFileFormat), !1),
		Qt(D(e.pngMode, i.pngMode), !1),
		Kt(D(e.jpegMode, i.jpegMode), !1),
		$i = !1,
		De(Pe()),
		re(),
		ko(),
		e.sword && Sword.decode(e.sword),
		e.shadowApp && ShadowApp.decode(e.shadowApp),
		o && (Go(!0),
			Yo(),
			Ko(),
			Zo(),
			Xo(),
			Ho(!0),
			Wo(!0),
			ViewPort.main.refreshAllViews()),
		Callbacks.StickySettings.updateDisplay()
	}
	function E() {
		Undo.canUndo() && R(Undo.undo(), !0)
	}
	function F() {
		Undo.canRedo() && R(Undo.redo(), !0)
	}
	function z(e, o) {
		if (e = Math.floor(e),
			o = Math.floor(o),
			e >= 0 && e < xi && e >= 0 && o < Ai) {
			var i = t.imageCanvas.context().getImageData(e, o, 1, 1).data;
			return (255 & i[0]) << 16 | (255 & i[1]) << 8 | 255 & i[2]
		}
		return null
	}
	function B(e, o) {
		HairPalettes.tryAddColor(t.imageCanvas.context().getImageData(e, o, 1, 1).data, ToolMode.getActiveMode() == ToolMode.ForegroundEyeDropper)
	}
	function U(t, e, o) {
		var i = ToolMode.getActiveMode();
		i.isEyeDropper ? B(t, e) : (Undo.schedulePush(),
			i.drawSquare(t, e, o),
			qo(Const.DrawSquare, t, e, 0, 0, o))
	}
	function O(t, e, o) {
		var i = ToolMode.getActiveMode();
		if (i.isEyeDropper)
			B(t, e);
		else if (i.mask)
			if (Undo.schedulePush(),
				null == i.mask.lastX || null == i.mask.lastY)
				i.drawSquare(t, e, o),
				qo(Const.DrawSquare, t, e, 0, 0, o);
			else {
				var r = i.mask.lastX,
				s = i.mask.lastY;
				i.drawLine(t, e, o),
				qo(Const.DrawLine, r, s, t, e, o)
			}
	}
	function I() {
		Undo.push(),
		L(!1),
		V(!1),
		he(!1),
		ShadowApp.clear(!1),
		yo(!1),
		R(t.defaultSettings, !0)
	}
	function L(e) {
		void 0 === e && (e = !0),
		e && Undo.push(),
		// 重要
		t.userMask.clearAll(),
		setTimeout(function () {
			Ho(!0),
			Sword.clear(),
			ViewPort.main.refreshAllViews()
		}, 0)
	}
	function V(e) {
		void 0 === e && (e = !0),
		e && Undo.push(),
		t.hairMask.clearAll(),
		setTimeout(function () {
			Wo(!0),
			ViewPort.main.refreshAllViews()
		}, 0)
	}
	function G(e, o) {
		return e = Util.clamp(e, 1, 40),
		e != t.settings.brushSize && (o && Undo.push(),
			t.settings.brushSize = e,
			Css.BrushSize.display.$().text(e + "px"),
			p(Css.BrushSize, e, 1, 40, 0),
			ViewPort.main.refreshAllViews(),
			!0)
	}
	function H() {
		G(t.settings.brushSize - 1, !1)
	}
	function W() {
		G(t.settings.brushSize + 1, !1)
	}
	function X(e, o) {
		e != t.stickySettings.preCropEnabled && (t.stickySettings.preCropEnabled = e,
			N(),
			o && StickySettings.commitSticky(!0))
	}
	function N() {
		Css.pre_crop_enabled_checkbox.$().prop("checked", t.stickySettings.preCropEnabled)
	}
	function Y() {
		X(!t.stickySettings.preCropEnabled, !0)
	}
	function q() {
		var e = t.stickySettings.maxNumMegapixels || Const.FactoryDefaults.maxNumMegapixels;
		J(e, !1)
	}
	function J(e, o) {
		return e = Util.clamp(e, 1, window.GlobalsEx.MaxMaxNumMegapixels),
		e != t.stickySettings.maxNumMegapixels && (t.stickySettings.maxNumMegapixels = e,
			j(),
			o && StickySettings.commitSticky(!0),
			ViewPort.main.refreshAllViews(),
			!0)
	}
	function j() {
		Css.MaxNumMegapixels.display.$().text((t.stickySettings.maxNumMegapixels || Const.FactoryDefaults.maxNumMegapixels) + " megapixels"),
		p(Css.MaxNumMegapixels, t.stickySettings.maxNumMegapixels, 1, window.GlobalsEx.MaxMaxNumMegapixels, 4)
	}
	function Q() {
		var e = t.stickySettings.maxNumMegapixels || Const.FactoryDefaults.maxNumMegapixels;
		return 1024 * e * 1024
	}
	function K(e) {
		J(t.stickySettings.maxNumMegapixels + e, !0)
	}
	function Z() {
		J(Const.FactoryDefaults.maxNumMegapixels, !0)
	}
	function tt() {
		"" == dr && ot(t.stickySettings.viewPanesMode, !1)
	}
	function et(t) {
		t && dr == Const.ViewPanesMarks ? ot(Const.ViewPanesPreview, !1) : t || dr != Const.ViewPanesPreview || ot(Const.ViewPanesMarks, !1)
	}
	function ot(e, o) {
		if (void 0 === o && (o = !0),
			dr != e) {
			dr = e;
			ViewPort.main;
			it(),
			o && (t.stickySettings.viewPanesMode = e,
				StickySettings.commitSticky(!0))
		}
	}
	function it() {
		var t = ViewPort.main;
		if (null != t && t.isInitialized()) {
			switch (App.ViewPanesGroup.update(dr),
				dr) {
			case Const.ViewPanesMarks:
				t.setVisible(0, !0),
				t.setVisible(1, !1),
				t.setBorderRight(0, !1),
				Css.ViewPanes.preview.$().show(),
				StartupProgress.hideShadowPane();
				break;
			case Const.ViewPanesBoth:
				Css.ViewPanes.preview.$().hide(),
				t.setBorderRight(0, !0),
				t.setBorderLeft(1, !0),
				t.setVisible(0, !0),
				t.setVisible(1, !0);
				break;
			case Const.ViewPanesPreview:
				Css.ViewPanes.preview.$().show(),
				StartupProgress.hideShadowPane(),
				t.setBorderLeft(1, !1),
				t.setVisible(0, !0),
				t.setVisible(1, !1),
				t.updateSize(),
				t.setVisible(0, !1),
				t.setVisible(1, !0)
			}
			t.updateSize(),
			t.refreshAllViews()
		}
	}
	function rt(e) {
		var o = window.Globals.BackgroundColors.indexOf(t.settings.backgroundColor);
		o < 0 && (o = 0);
		var i = window.Globals.BackgroundColors.length;
		o = e ? (o + i - 1) % i : (o + 1) % i,
		st(window.Globals.BackgroundColors[o], !0)
	}
	function st(e, o) {
		e = e || t.TransparentColor;
		var i = $('.background-color-swatch-button[data-color="' + e + '"]');
		0 == i.length && (i = $("#background-color-swatch-button-custom"),
			o ? (window.myLocalStorage.customColor = e,
				window.Globals.BackgroundColors[window.Globals.BackgroundColors.length - 1] = e) : M(e)),
		i.button("toggle");
		var r = $("#background-color-current-swatch");
		return r.css("background-color", e),
		e != t.settings.backgroundColor && (o && Undo.push(),
			t.settings.backgroundColor = e,
			o && (Yo(),
				ViewPort.main.refreshAllViews()),
			!0)
	}
	function nt() {
		Css.edge.smoothing.reset.$().toggleClass("disabled", t.settings.globalSmoothingLevel == t.defaultSettings.globalSmoothingLevel),
		Css.edge.featheringRadius.reset.$().toggleClass("disabled", t.settings.globalBlurLevel == t.defaultSettings.globalBlurLevel),
		Css.edge.offset.reset.$().toggleClass("disabled", t.settings.globalOffset == t.defaultSettings.globalOffset)
	}
	function at(t, e, o, i, r, s, n) {
		return e = Util.clamp(Util.roundTo(e, n), i, r),
		t.display.$().text(e + o),
		p(t, e, i, r, s),
		e
	}
	function lt() {
		ct(t.defaultSettings.globalSmoothingLevel, !0)
	}
	function pt(e) {
		ct(t.settings.globalSmoothingLevel + e, !0)
	}
	function ct(e, o) {
		return e = at(Css.edge.smoothing, e, "", 0, window.Globals.MaxSmoothingLevel, t.defaultSettings.globalSmoothingLevel, 1),
		e != t.settings.globalSmoothingLevel && (o && Undo.push(),
			t.settings.globalSmoothingLevel = e,
			yt(),
			o && Yo(),
			!0)
	}
	function ut() {
		ht(t.defaultSettings.globalBlurLevel, !0)
	}
	function dt(e) {
		ht(t.settings.globalBlurLevel + e, !0)
	}
	function ht(e, o) {
		return e = at(Css.edge.featheringRadius, e, "px", 0, window.Globals.MaxBlurLevel, t.defaultSettings.globalBlurLevel, 1),
		e != t.settings.globalBlurLevel && (o && Undo.push(),
			t.settings.globalBlurLevel = e,
			yt(),
			o && Yo(),
			!0)
	}
	function gt() {
		wt(t.defaultSettings.globalOffset, !0)
	}
	function ft(e) {
		wt(t.settings.globalOffset + e, !0)
	}
	function wt(e, o) {
		return e = at(Css.edge.offset, e, "px", 0, window.Globals.MaxOffset, t.defaultSettings.globalOffset, 2),
		e != t.settings.globalOffset && (o && Undo.push(),
			t.settings.globalOffset = e,
			yt(),
			o && Yo(),
			!0)
	}
	function St(e, o) {
		return $("#use-corner-detection-button-" + e).button("toggle"),
		e != t.settings.useCornerDetection && (o && Undo.push(),
			t.settings.useCornerDetection = e,
			o && Yo(),
			!0)
	}
	function mt(e, o) {
		return $("#use-local-blur-button-" + e).button("toggle"),
		e != t.settings.useLocalBlur && (o && Undo.push(),
			t.settings.useLocalBlur = e,
			o && Yo(),
			!0)
	}
	function Ct(e, o) {
		return $("#use-local-smoothing-button-" + e).button("toggle"),
		e != t.settings.useLocalSmoothing && (o && Undo.push(),
			t.settings.useLocalSmoothing = e,
			o && Yo(),
			!0)
	}
	function yt() {
		var e = " " + t.settings.globalSmoothingLevel + ", " + t.settings.globalBlurLevel + ", " + t.settings.globalOffset;
		$("#blur-offset-smooth-button-label").text(e)
	}
	function vt() {
		return (t.settings.cropRect_o.isEmpty() ? Ui : t.settings.cropRect_o).dup()
	}
	function bt(e, o) {
		if (null != e || t.settings.cropRect_o.isEmpty()) {
			if (null != e && !t.settings.cropRect_o.equals(e))
				return o && Undo.push(),
				t.settings.cropRect_o.setFrom(e),
				re(),
				ShadowApp.updatePerspectiveShadowCanvas(),
				o && Yo(),
				!0
		} else
			o && Undo.push(),
			t.settings.cropRect_o.set(0, 0, 0, 0),
			re(),
			ShadowApp.updatePerspectiveShadowCanvas(),
			o && Yo();
		return !1
	}
	function Mt(e, o) {
		return e != t.settings.cropMode && (o && Undo.push(),
			t.settings.cropMode = e,
			re(),
			o && Yo(),
			!0)
	}
	function kt(e, o) {
		return e != t.settings.cropMarginUnits && (o && Undo.push(),
			t.settings.cropMarginUnits = e,
			re(),
			o && Yo(),
			!0)
	}
	function Tt(e, o) {
		return e != t.settings.cropObjectSize && (o && Undo.push(),
			t.settings.cropObjectSize = e,
			re(),
			o && Yo(),
			!0)
	}
	function xt(e, o) {
		return e != t.settings.cropVerticalAlignment && (o && Undo.push(),
			t.settings.cropVerticalAlignment = e,
			re(),
			o && Yo(),
			!0)
	}
	function At(e, o) {
		return e != t.settings.cropShadows && (o && Undo.push(),
			t.settings.cropShadows = e,
			re(),
			o && Yo(),
			!0)
	}
	function Pt(e, o) {
		return e = Math.round(Util.clamp(e, 0, fi)),
		e != t.settings.cropPaddingMils && (o && Undo.push(),
			t.settings.cropPaddingMils = e,
			_t(),
			re(),
			o && Yo(),
			!0)
	}
	function _t() {
		p(Css.CropApp.PaddingPercent, t.settings.cropPaddingMils, 0, fi, t.defaultSettings.cropPaddingMils),
		p(Css.CropApp.PaddingPixels, t.settings.cropPaddingPixels, 0, wi, t.defaultSettings.cropPaddingPixels)
	}
	function Dt(e) {
		Pt(t.settings.cropPaddingMils + e, !1)
	}
	function Rt() {
		Dt(-gi)
	}
	function Et() {
		Dt(gi)
	}
	function Ft() {
		Pt(t.defaultSettings.cropPaddingMils, !1)
	}
	function zt(e, o) {
		return e = Math.round(Util.clamp(e, 0, wi)),
		e != t.settings.cropPaddingPixels && (o && Undo.push(),
			t.settings.cropPaddingPixels = e,
			_t(),
			re(),
			o && Yo(),
			!0)
	}
	function Bt(e) {
		zt(t.settings.cropPaddingPixels + e, !1)
	}
	function Ut() {
		Bt(-hi)
	}
	function Ot() {
		Bt(hi)
	}
	function It() {
		zt(t.defaultSettings.cropPaddingPixels, !1)
	}
	function $t(e, o) {
		return e = Math.round(Util.clamp(e, Ci, yi)),
		e != t.settings.outputDpi && (o && Undo.push(),
			t.settings.outputDpi = e,
			Wt(),
			Zt(),
			o && Yo(),
			!0)
	}
	function Lt(e) {
		$t(t.settings.outputDpi + e, !1)
	}
	function Vt() {
		Lt(-vi)
	}
	function Gt() {
		Lt(vi)
	}
	function Ht() {
		$t(t.defaultSettings.outputDpi, !1)
	}
	function Wt() {
		Css.CropApp.Dpi.display.$().text(t.settings.outputDpi + " DPI"),
		p(Css.CropApp.Dpi, t.settings.outputDpi, Ci, yi, t.defaultSettings.outputDpi)
	}
	function Xt(e, o) {
		return e = Math.round(Util.clamp(e, bi, Mi)),
		e != t.settings.jpegQuality && (o && Undo.push(),
			t.settings.jpegQuality = e,
			Zt(),
			o && Yo(),
			!0)
	}
	function Nt(e) {
		Xt(t.settings.jpegQuality + e, !1)
	}
	function Yt() {
		Nt(-ki)
	}
	function qt() {
		Nt(ki)
	}
	function Jt() {
		Xt(t.defaultSettings.jpegQuality, !1)
	}
	function jt(e, o) {
		return e != t.settings.opaqueFileFormat && (o && Undo.push(),
			t.settings.opaqueFileFormat = e,
			Zt(),
			o && Yo(),
			!0)
	}
	function Qt(e, o) {
		return e != t.settings.pngMode && (o && Undo.push(),
			t.settings.pngMode = e,
			Zt(),
			o && Yo(),
			!0)
	}
	function Kt(e, o) {
		return e != t.settings.jpegMode && (o && Undo.push(),
			t.settings.jpegMode = e,
			Zt(),
			o && Yo(),
			!0)
	}
	function Zt() {
		Css.ExportOptions.JpgQuality.display.$().text(t.settings.jpegQuality),
		p(Css.ExportOptions.JpgQuality, t.settings.jpegQuality, bi, Mi, t.defaultSettings.jpegQuality),
		t.OpaqueFileFormatGroup.update(t.settings.opaqueFileFormat),
		t.PngModeGroup.update(t.settings.pngMode),
		t.JpegModeGroup.update(t.settings.jpegMode)
	}
	function te(e, o) {
		return Math.abs(e - o) <= 1 + t.settings.globalOffset
	}
	function ee() {
		return Rect.fromCropRect(Ui)
	}
	function oe() {
		var e = t.boundingRect;
		return null != e ? new Rect(e[0], e[1], e[2], e[3]) : ee()
	}
	function ie(t) {
		return oe().pad(t).toQuad().rotateInPlace(Ae(), Di)
	}
	function re() {
		if (!$i) {
			var e = t.settings.cropRect_o.dup();
			if (t.settings.cropFitToResult && t.boundingRect) {
				var o = Rect.fromBoundingRect(t.boundingRect),
				i = Rect.fromBoundingRect(t.shadowsRect),
				r = Rect.empty();
				t.settings.cropShadows != Const.CropShadowsIgnore && (r.left = Math.max(0, o.left - i.left),
					r.top = Math.max(0, o.top - i.top),
					r.right = Math.max(0, i.right - o.right),
					r.bottom = Math.max(0, i.bottom - o.bottom),
					t.settings.cropShadows == Const.CropShadowsPad && (r.left = r.right = Math.max(r.left, r.right))),
				r.left = Math.min(r.left, t.imageSize.w),
				r.top = Math.min(r.top, t.imageSize.h),
				r.right = Math.min(r.right, t.imageSize.w),
				r.bottom = Math.min(r.bottom, t.imageSize.h);
				var s = o.width(),
				n = o.height(),
				a = 0,
				l = 0;
				t.settings.cropMarginUnits == Const.CropMarginPercent ? (a = s * t.settings.cropPaddingMils * .001,
					l = n * t.settings.cropPaddingMils * .001) : (a = t.settings.cropPaddingPixels,
					l = a);
				var p = new Rect(te(o.left, Ui.left0) ? 0 : a, te(o.top, Ui.top0) ? 0 : l, te(o.right, Ui.right0) ? 0 : a, te(o.bottom, Ui.bottom0) ? 0 : l);
				p.left = Math.max(p.left, r.left),
				p.top = Math.max(p.top, r.top),
				p.right = Math.max(p.right, r.right),
				p.bottom = Math.max(p.bottom, r.bottom);
				var c = 0,
				u = 0;
				switch (t.settings.cropObjectSize) {
				case Const.CropSizeSmall:
					c = n * mi,
					u = s * mi * .5;
					break;
				case Const.CropSizeMedium:
					c = n * Si,
					u = s * Si * .5;
					break;
				case Const.CropSizeLarge:
				}
				switch (t.settings.cropVerticalAlignment) {
				case Const.CropAlignmentTop:
					p.left += u,
					p.right += u,
					p.bottom += c;
					break;
				case Const.CropAlignmentMiddle:
					p.left += u,
					p.top += .5 * c,
					p.right += u,
					p.bottom += .5 * c;
					break;
				case Const.CropAlignmentBottom:
					p.left += u,
					p.top += c,
					p.right += u
				}
				t.settings.cropRect_o.left0 = o.left - p.left,
				t.settings.cropRect_o.right0 = o.right + p.right,
				t.settings.cropRect_o.top0 = o.top - p.top,
				t.settings.cropRect_o.bottom0 = o.bottom + p.bottom
			}
			t.settings.cropMode == Const.CropLockedAspectRatio ? se(pe()) : t.settings.cropMode == Const.CropTargetSize && se(ue());
			var d = !e.softEquals(t.settings.cropRect_o, .001);
			!t.settings.cropFitToResult && d && oi(),
			d && ShadowApp.updatePerspectiveShadowCanvas(),
			CropApp.updateDisplay(),
			ViewPort.refreshAllViews()
		}
	}
	function se(e) {
		var o = e.w / e.h,
		i = t.settings.cropRect_o;
		i.isEmpty() && (i.right0 = t.imageSize.w,
			i.bottom0 = t.imageSize.h);
		var r = i.width(),
		s = i.height(),
		n = r / s;
		if (o > n) {
			var a = (s * o - r) / 2;
			t.settings.cropRect_o.left0 -= a,
			t.settings.cropRect_o.right0 += a
		} else {
			var l = (r / o - s) / 2;
			switch (t.settings.cropVerticalAlignment) {
			case Const.CropAlignmentTop:
				t.settings.cropRect_o.bottom0 += 2 * l;
				break;
			case Const.CropAlignmentMiddle:
				t.settings.cropRect_o.top0 -= l,
				t.settings.cropRect_o.bottom0 += l;
				break;
			case Const.CropAlignmentBottom:
				t.settings.cropRect_o.top0 -= 2 * l
			}
		}
	}
	function ne(e, o) {
		return e != t.settings.cropFitToResult && (o && Undo.push(),
			t.settings.cropFitToResult = e,
			re(),
			o && Yo(),
			!0)
	}
	function ae(e, o, i) {
		return !!(e != t.settings.cropAllowEnlarging || i && t.settings.cropMode != Const.CropTargetSize) && (o && Undo.push(),
			t.settings.cropAllowEnlarging = e,
			i && (t.settings.cropMode = Const.CropTargetSize),
			re(),
			o && Yo(),
			!0)
	}
	function le(t, e) {
		return null == t ? null == e : null != e && (t.h == e.h && t.w == e.w)
	}
	function pe() {
		return null != t.settings.cropAspectRatio ? t.settings.cropAspectRatio : {
			w: t.imageAspectRatio.w,
			h: t.imageAspectRatio.h
		}
	}
	function ce(e, o, i) {
		return !(le(pe(), e) && (!i || t.settings.cropMode == Const.CropLockedAspectRatio)) && (o && Undo.push(),
			e ? t.settings.cropAspectRatio = {
				w: e.w,
				h: e.h
			}
			 : t.settings.cropAspectRatio = null,
			i && (t.settings.cropMode = Const.CropLockedAspectRatio),
			re(),
			o && Yo(),
			!0)
	}
	function ue() {
		return null != t.settings.cropTargetSize ? t.settings.cropTargetSize : {
			w: xi,
			h: Ai
		}
	}
	function de(e, o, i) {
		return !(le(ue(), e) && (!i || t.settings.cropMode == Const.CropTargetSize)) && (o && Undo.push(),
			e ? t.settings.cropTargetSize = {
				w: e.w,
				h: e.h
			}
			 : t.settings.cropTargetSize = null,
			i && (t.settings.cropMode = Const.CropTargetSize),
			re(),
			o && Yo(),
			!0)
	}
	function he(e) {
		void 0 === e && (e = !0);
		var o = Undo.sourceFunction(),
		i = t.defaultSettings,
		r = ne(i.cropFitToResult, !1),
		s = Mt(i.cropMode, !1),
		n = ae(i.cropAllowEnlarging, !1, !1),
		a = Pt(i.cropPaddingMils, !1),
		l = zt(i.cropPaddingPixels, !1),
		p = !i.cropFitToResult && bt(i.cropRect_o, !1),
		c = kt(i.cropMarginUnits, !1),
		u = Tt(i.cropObjectSize, !1),
		d = xt(i.cropVerticalAlignment, !1),
		h = At(i.cropShadows, !1);
		(r || s || n || a || l || p || c || u || d || h) && (e && Undo.push(o),
			Yo())
	}
	function ge(e, o) {
		var i = Pe();
		e = Util.minMod(e, 360),
		t.settings.rotateAngleDeg != e && (o && Undo.push(),
			t.settings.rotateAngleDeg = e,
			De(i),
			o && Yo(),
			re(),
			ViewPort.subViewPort.refreshAllViews())
	}
	function fe(e) {
		var o = Pe();
		Undo.push(),
		t.settings.rotateAngleDeg = Util.minMod(t.settings.rotateAngleDeg + e, 360),
		De(o),
		t.settings.cropMode != Const.CropUnconstrained || t.settings.cropFitToResult || t.settings.cropRect_o.isEmpty() || (t.settings.cropRect_o.rotate(e, Pi, _i),
			re()),
		Yo()
	}
	function we() {
		fe(-90)
	}
	function Se() {
		fe(90)
	}
	function me() {
		ge(t.defaultSettings.rotateAngleDeg, !0)
	}
	function Ce() {
		return t.settings.rotateAngleDeg * Math.PI / 180
	}
	function ye(e) {
		var o = Pe();
		t.settings.straightenAngleDeg != e && (t.settings.straightenAngleDeg = parseFloat(e.toFixed(1)),
			De(o, !1))
	}
	function ve(e) {
		ye(Util.clamp(t.settings.straightenAngleDeg + e, -45, 45))
	}
	function be() {
		ve( - .1)
	}
	function Me() {
		ve(.1)
	}
	function ke() {
		0 != t.settings.straightenAngleDeg && (Undo.push(),
			ye(0),
			Yo(),
			ShadowApp.updateMirrorShadowCanvas(),
			ShadowApp.updatePerspectiveShadowCanvas())
	}
	function Te() {
		return t.settings.straightenAngleDeg * Math.PI / 180
	}
	function xe() {
		ShadowApp.updateMirrorShadowCanvas(),
		ShadowApp.updatePerspectiveShadowCanvas(),
		t.sendSetGlobal()
	}
	function Ae() {
		return (t.settings.rotateAngleDeg + t.settings.straightenAngleDeg) * Math.PI / 180
	}
	function Pe() {
		return -Ae()
	}
	function _e() {
		return Ai > xi
	}
	function De(e, o) {
		void 0 === o && (o = !0);
		var i = Te(),
		r = xi,
		s = Ai,
		n = _e();
		n && (s = xi,
			r = Ai);
		var a = Math.sqrt(r * r + s * s),
		l = s / a,
		p = Math.acos(l),
		c = p - Math.abs(i),
		u = Math.cos(c) / l,
		d = r * u,
		h = s * u,
		g = (r - d) / 2,
		f = (s - h) / 2,
		w = g,
		S = f,
		m = g + d,
		C = f + h;
		n && (w = f,
			S = g,
			m = f + h,
			C = g + d);
		var y = Ce(),
		v = Math.sin(y),
		b = Math.cos(y),
		M = w - Pi,
		k = S - _i,
		T = m - Pi,
		x = C - _i,
		A = b * M - v * k + Pi,
		P = v * M + b * k + _i,
		_ = b * T - v * x + Pi,
		D = v * T + b * x + _i;
		Ui.left0 = Math.min(A, _),
		Ui.right0 = Math.max(A, _),
		Ui.top0 = Math.min(P, D),
		Ui.bottom0 = Math.max(P, D),
		Css.CropApp.StraightenSpinner.reset.$().toggleClass("disabled", 0 == t.settings.straightenAngleDeg),
		Css.CropApp.RotateSpinner.reset.$().toggleClass("disabled", 0 == t.settings.rotateAngleDeg),
		Css.CropApp.StraightenSpinner.display.$().text(t.settings.straightenAngleDeg.toFixed(1) + "£"),
		Css.CropApp.RotateSpinner.display.$().text(t.settings.rotateAngleDeg + "£"),
		o && ShadowApp.updateMirrorShadowCanvas(),
		ViewPort.main.rotationCropUpdated(e, Pe()),
		ViewPort.subViewPort.rotationCropUpdated(e, Pe()),
		ViewPort.refreshAllViews()
	}
	function Re(e) {
		t.settings.brightness = Math.round(Util.clamp(e, -100, 100)),
		Mo()
	}
	function Ee(e) {
		Re(t.settings.brightness + e)
	}
	function Fe() {
		0 != t.settings.brightness && (Undo.push(),
			Re(0),
			ko(),
			Yo())
	}
	function ze() {
		Ee(-1)
	}
	function Be() {
		Ee(1)
	}
	function Ue(e) {
		t.settings.shadows = Math.round(Util.clamp(e, -100, 100)),
		Mo()
	}
	function Oe(e) {
		Ue(t.settings.shadows + e)
	}
	function Ie() {
		0 != t.settings.shadows && (Undo.push(),
			Ue(0),
			ko(),
			Yo())
	}
	function $e() {
		Oe(-1)
	}
	function Le() {
		Oe(1)
	}
	function Ve(e) {
		t.settings.highlights = Math.round(Util.clamp(e, -100, 100)),
		Mo()
	}
	function Ge(e) {
		Ve(t.settings.highlights + e)
	}
	function He() {
		0 != t.settings.highlights && (Undo.push(),
			Ve(0),
			ko(),
			Yo())
	}
	function We() {
		Ge(-1)
	}
	function Xe() {
		Ge(1)
	}
	function Ne(e) {
		t.settings.temperature = Math.round(Util.clamp(e, -100, 100)),
		Mo()
	}
	function Ye(e) {
		Ne(t.settings.temperature + e)
	}
	function qe() {
		0 != t.settings.temperature && (Undo.push(),
			Ne(0),
			ko(),
			Yo())
	}
	function Je() {
		Ye(-1)
	}
	function je() {
		Ye(1)
	}
	function Qe(e) {
		t.settings.saturation = Math.round(Util.clamp(e, -100, 100)),
		Mo()
	}
	function Ke(e) {
		Qe(t.settings.saturation + e)
	}
	function Ze() {
		0 != t.settings.saturation && (Undo.push(),
			Qe(0),
			ko(),
			Yo())
	}
	function to() {
		Ke(-1)
	}
	function eo() {
		Ke(1)
	}
	function oo(e, o) {
		return t.settings.outputColorSpace != e && (o && Undo.push(),
			t.settings.outputColorSpace = e,
			ro(),
			Zt(),
			o && Yo(),
			!0)
	}
	function io() {
		var e = "sRGB";
		switch (t.settings.outputColorSpace) {
		case Const.ColorSpaceSrgb:
			e = "sRGB";
			break;
		case Const.ColorSpaceAdobeRgb:
			e = "Adobe RGB (1998)";
			break;
		case Const.ColorSpaceAppleRgb:
			e = "Apple RGB";
			break;
		case Const.ColorSpaceColorMatchRgb:
			e = "ColorMatch RGB"
		}
		return e
	}
	function ro() {
		Css.ColorsApp.ColorSpace.display.$().text(io())
	}
	function so(e, o) {
		t.settings.whiteBalanceEnabled != e && (o && Undo.push(),
			t.settings.whiteBalanceEnabled = e,
			ko(),
			o && Yo())
	}
	function no() {
		so(!t.settings.whiteBalanceEnabled, !0)
	}
	function ao(e, o, i) {
		void 0 === i && (i = !1),
		t.settings.whiteBalanceGrayColor != e && (o && Undo.push(),
			t.settings.whiteBalanceGrayColor = e,
			i && !t.settings.whiteBalanceEnabled && (t.settings.whiteBalanceEnabled = !0),
			ko(),
			o && Yo()),
		ko()
	}
	function lo() {
		t.settings.whiteBalanceGrayColor != t.defaultSettings.whiteBalanceGrayColor && ao(t.defaultSettings.whiteBalanceGrayColor, !0)
	}
	function po(e, o) {
		if (t.settings.removeColorCast != e) {
			if (o && Undo.push(),
				t.settings.removeColorCast = e,
				e && t.settings.castColor == Const.FactoryDefaults.castColor && t.userMask) {
				for (var i = ToolMode.Background.colorBytesRgba, r = new RgbHistogram, s = t.userMask.context().getImageData(0, 0, xi, Ai).data, n = 0, a = 0; a < rr.length; a += 4)
					s[a + li] == i[li] && s[a + pi] == i[pi] && s[a + ci] == i[ci] && s[a + ui] == i[ui] && (r.add(rr[a + li], rr[a + pi], rr[a + ci]),
						n++);
				n > 0 && uo(r.findMaxBinCenter(), !1)
			}
			ko(),
			o && Yo()
		}
	}
	function co() {
		po(!t.settings.removeColorCast, !0)
	}
	function uo(e, o, i) {
		void 0 === i && (i = !1),
		t.settings.castColor != e && (o && Undo.push(),
			t.settings.castColor = e,
			i && !t.settings.removeColorCast && (t.settings.removeColorCast = !0),
			ko(),
			o && Yo()),
		ko()
	}
	function ho() {
		t.settings.castColor != t.defaultSettings.castColor && uo(t.defaultSettings.castColor, !0)
	}
	function go(e) {
		t.settings.colorCastForegroundProtection = Util.roundTo(Util.clamp(e, 0, di), 1),
		Mo()
	}
	function fo(e) {
		go(t.settings.colorCastForegroundProtection + e)
	}
	function wo() {
		t.settings.colorCastForegroundProtection != t.defaultSettings.colorCastForegroundProtection && (Undo.push(),
			go(t.defaultSettings.colorCastForegroundProtection),
			ko(),
			Yo())
	}
	function So() {
		fo( - .1)
	}
	function mo() {
		fo(.1)
	}
	function Co() {
		0 == t.settings.brightness && 0 == t.settings.shadows && 0 == t.settings.highlights && 0 == t.settings.temperature && 0 == t.settings.saturation || (Undo.push(),
			t.settings.brightness = 0,
			t.settings.shadows = 0,
			t.settings.highlights = 0,
			t.settings.temperature = 0,
			t.settings.saturation = 0,
			ko(),
			Yo())
	}
	function yo(e) {
		void 0 === e && (e = !0),
		0 == t.settings.brightness && 0 == t.settings.shadows && 0 == t.settings.highlights && 0 == t.settings.temperature && 0 == t.settings.saturation && t.settings.castColor == t.defaultSettings.castColor && t.settings.colorCastForegroundProtection == t.defaultSettings.colorCastForegroundProtection && t.settings.removeColorCast == t.defaultSettings.removeColorCast && t.settings.whiteBalanceEnabled == t.defaultSettings.whiteBalanceEnabled && t.settings.whiteBalanceGrayColor == t.defaultSettings.whiteBalanceGrayColor || (e && Undo.push(),
			t.settings.brightness = 0,
			t.settings.shadows = 0,
			t.settings.highlights = 0,
			t.settings.temperature = 0,
			t.settings.saturation = 0,
			t.settings.castColor = t.defaultSettings.castColor,
			t.settings.colorCastForegroundProtection = t.defaultSettings.colorCastForegroundProtection,
			t.settings.removeColorCast = t.defaultSettings.removeColorCast,
			t.settings.whiteBalanceEnabled = t.defaultSettings.whiteBalanceEnabled,
			t.settings.whiteBalanceGrayColor = t.defaultSettings.whiteBalanceGrayColor,
			ko(),
			Yo())
	}
	function vo() {
		null == lr && (lr = AutoLevels.run(rr)),
		t.settings.highlights == lr.highlights && t.settings.shadows == lr.shadows || (Undo.push(),
			t.settings.shadows = lr.shadows,
			t.settings.highlights = lr.highlights,
			ko(),
			Yo())
	}
	function bo() {
		return er ? Zi : Ki
	}
	function Mo() {
		function e(t, e, o, i, r) {
			p(t, e, o, i, r),
			t.display.$().html(Util.signedNumber(e))
		}
		xo(),
		e(Css.ColorsApp.brightness, t.settings.brightness, -100, 100, 0),
		e(Css.ColorsApp.shadows, t.settings.shadows, -100, 100, 0),
		e(Css.ColorsApp.highlights, t.settings.highlights, -100, 100, 0),
		e(Css.ColorsApp.temperature, t.settings.temperature, -100, 100, 0),
		e(Css.ColorsApp.saturation, t.settings.saturation, -100, 100, 0),
		e(Css.colorCastForegroundProtection, t.settings.colorCastForegroundProtection, 0, di, t.defaultSettings.colorCastForegroundProtection),
		Css.ColorsApp.temperature.swatch.$().css("background-color", ArgbFloat.fromInts(255, Ei, Fi, zi).toRgbaCss()),
		Css.ColorsApp.ColorCastRemovalEnabled.$().prop("checked", t.settings.removeColorCast),
		Css.CastColorSwatch.$().css("background-color", ArgbFloat.fromInt(t.settings.castColor).toRgbCss()),
		Css.colors_app_color_cast_controls.$().toggle(t.settings.removeColorCast),
		Css.ColorsApp.WhiteBalanceEnabled.$().prop("checked", t.settings.whiteBalanceEnabled),
		Css.WhiteBalanceSwatch.$().css("background-color", ArgbFloat.fromInt(t.settings.whiteBalanceGrayColor).toRgbCss()),
		Css.colors_app_white_balance_controls.$().toggle(t.settings.whiteBalanceEnabled);
		var o = 0 == t.settings.brightness,
		i = 0 == t.settings.shadows,
		r = 0 == t.settings.highlights,
		s = 0 == t.settings.temperature,
		n = 0 == t.settings.saturation,
		a = !t.settings.removeColorCast,
		l = !t.settings.whiteBalanceEnabled;
		er = !(o && i && r && s && n && a && l),
		Css.ColorsApp.color_levels_reset.$().toggleClass("disabled", o && i && r && s && n)
	}
	function ko() {
		Li || (Mo(),
			er && tr == t.previewCanvasData && (Zi = t.previewCanvas.context().getImageData(0, 0, xi, Ai),
				tr = Zi.data),
			or = Ao(),
			$o(),
			Eo(),
			ShadowApp.updateMirrorShadowCanvas(),
			ViewPort.refreshAllViews())
	}
	function To(t) {
		return Math.floor(Math.max(0, Math.min(t, 255)))
	}
	function xo() {
		var e = -t.settings.temperature / 100,
		o = (e < 0 ? 6600 + 5100 * e : 6600 + 8400 * e) / 100;
		Ri = Util.clamp(Math.abs(e), 0, .5),
		Ei = 255,
		Fi = 255,
		zi = 255,
		o < 66 ? (Fi = Util.clamp(99.4708025861 * Math.log(o) - 161.1195681661, 0, 255),
			zi = o <= 19 ? 0 : Util.clamp(138.5177312231 * Math.log(o - 10) - 305.0447927307, 0, 255)) : o > 66 && (Ei = Util.clamp(329.698727446 * Math.pow(o - 60,  - .1332047592), 0, 255),
			Fi = Util.clamp(288.1221695283 * Math.pow(o - 60,  - .0755148492), 0, 255)),
		Bi = .299 * Ei + .587 * Fi + .114 * zi
	}
	function Ao() {
		for (var e = t.settings.brightness, o = 1 + t.settings.shadows / 100, i = 1 + t.settings.highlights / 100, r = -t.settings.saturation / 100, s = t.settings.removeColorCast, n = t.settings.colorCastForegroundProtection, a = 0; a < 256; a++)
			hr[a] = 255 - (255 - (a + e) * i) * o;
		var l = null,
		p = t.settings.whiteBalanceEnabled;
		p && (l = ColorMatrix.buildWhiteBalancerFromGrayColorSampleBradford(ArgbFloat.fromInt(t.settings.whiteBalanceGrayColor)));
		var c = ArgbFloat.fromInt(t.settings.castColor),
		u = c.dup().desaturateEvenly().minusEquals(c).normalized(),
		d = new ArgbFloat,
		h = new ArgbFloat,
		g = new ArgbFloat,
		f = new ArgbFloat;
		return function (t, e, o, i, a) {
			if (p && (d.fromInts(e, o, i, a),
					l.matrixVectorMultiply(d, h),
					h.clamp(),
					o = h.rInt(),
					i = h.gInt(),
					a = h.bInt()),
				s) {
				d.fromInts(e, o, i, a),
				g.setArgb(d).desaturateEvenly();
				var c = f.setArgb(g).minusEquals(d).normalize(),
				w = f.dot(u);
				if (w > 0) {
					var S = Util.clamp(w, 0, 1) * Util.clamp(1 - n * c * c, 0, 1);
					g.mixWith(d, S),
					o = g.rInt(),
					i = g.gInt(),
					a = g.bInt()
				}
			}
			if (0 != r) {
				var m = .299 * o + .587 * i + .114 * a;
				o = To(r * m + (1 - r) * o),
				i = To(r * m + (1 - r) * i),
				a = To(r * m + (1 - r) * a)
			}
			if (o = hr[o],
				i = hr[i],
				a = hr[a],
				0 != Ri) {
				var C = (.299 * o + .587 * i + .114 * a) / Bi;
				o = (1 - Ri) * o + Ri * Ei * C,
				i = (1 - Ri) * i + Ri * Fi * C,
				a = (1 - Ri) * a + Ri * zi * C
			}
			tr[t] = o,
			tr[t + 1] = i,
			tr[t + 2] = a,
			tr[t + 3] = e
		}
	}
	function Po(e) { // 重要
		switch (e.response) {
		case Const.ServerMaskReset:
			Io(),
			$o();
			break;
		case Const.ServerMask:
			Ro(e);
			break;
		case Const.ServerMaskDone:
			ShadowApp.updateDropShadowCanvas(),
			ShadowApp.updateMirrorShadowCanvas(),
			ShadowApp.updatePerspectiveShadowCanvas(),
			Eo();
			break;
		case Const.MaskCounts:
			t.serverMaskCounts = e;
			break;
		case Const.BezierSet:
			Fo(e);
			break;
		case Const.BezierSetDone:
			zo();
			break;
		case Const.BoundingRect:
			var i = t.boundingRect;
			if (t.boundingRect = e.boundingRect,
				t.shadowsRect = e.shadowsRect,
				re(),
				i && 4 == i.length && t.boundingRect && 4 == t.boundingRect.length) {
				for (var r = 0, n = 0; n < t.boundingRect.length; n++)
					r = Math.max(r, Math.abs(t.boundingRect[n] - i[n]));
				r > .1 && (ShadowApp.updatePerspectiveShadowCanvas(),
					ShadowApp.initializeMirrorShadow(),
					ShadowApp.initializePerspectiveShadow())
			} else
				ShadowApp.updatePerspectiveShadowCanvas(),
				ShadowApp.initializeMirrorShadow(),
				ShadowApp.initializePerspectiveShadow();
			break;
		case Const.UpdateComplete:
			ViewPort.main.refreshAllViews();
			break;
		case Const.EngineInitialized:
			StartupProgress.hide();
			break;
		case Const.SetActiveSwords:
			Sword.setActiveSwords(e.activeSwords, e.index);
			break;
		case Const.SetSwordIntersections:
			Sword.setSwordIntersections(e.swordIntersections);
			break;
		case Const.SetDetectedCorners:
			t.detectedCorners = e.detectedCorners;
			break;
		case Const.ResultPending:
			Callbacks.App.resultPending(e.msg, e.percent);
			break;
		case Const.ResultReady:
			Qi = !1,
			t.result.ready = !0,
			t.result.shown = !1,
			t.result.posted = !1,
			t.result.success = e.success,
			t.result.noCreditsLeft = !!e.noCreditsLeft,
			t.result.msg = e.msg,
			t.result.filename = e.resultFilename,
			ti();
			break;
		case Const.Meta:
			pr = e.meta,
			o();
			break;
		case Const.ServerRgbHistogramResponse:
			t.hasServerRgbHistogramResponse = !0,
			e.dataUrl && x(e.dataUrl);
			break;
		case Const.Panic:
			Util.gaTrack("ErrorShown", "Panic", e.message),
			alert(Tr.s("Terribly sorry, but an unrecoverable server error has occurred:") + "\n\n" + e.message + "\n\n" + Tr.s("Please try again, or try another image.")),
			s();
			break;
		case Const.Message:
			alert(e.message);
			break;
		case Const.Highlighting:
			Guide.checkShowHighlighting();
			break;
		case Const.Noop:
			break;
		default:
			Util.fatalErrorStr("Received unknown server response: '" + e.response + "'. ")
		}
		e.hasOwnProperty("index") && (Ji = e.index),
		h()
	}
	function _o() {
		Ii = !1,
		Go(!0),
		Yo(),
		Ko(),
		Zo(),
		Xo(),
		Ho(!1),
		Wo(!1),
		Lo(),
		Vo(),
		Qi && Jo(),
		h(),
		Ii = !0
	}
	function Do() {
		return h(),
		qi != Ji || Qi || StartupProgress.visible || !a()
	}
	// 重要
	function Ro(t) {
		"ControlByte" == t.mode ? ControlByteDecoder.decode(t.arraybuffer, function (t) {
			Bo(t, 0)
		}, function (t) {
			Uo(t, 255, rr[t], rr[t + 1], rr[t + 2])
		}, Uo) : Util.fatalErrorStr("Received unknown server response type: '" + t.mode + "'. ")
	}
	function Eo() {
		t.previewCanvas.context().putImageData(bo(), 0, 0)
	}
	function Fo(t) {
		var e = new BufferReader(t.arraybuffer),
		o = (e.length() - 10) / 2 + 2,
		i = new Float32Array(o),
		r = e.readInt16(),
		s = e.readInt32() / r,
		n = e.readInt32() / r,
		a = 0;
		for (i[a++] = s,
			i[a++] = n; a < o; a += 2)
			s = i[a] = e.readSignedInt16() / r + s,
			n = i[a + 1] = e.readSignedInt16() / r + n;
		Ti.push(i)
	}
	function zo() {
		t.bezierSet = Ti,
		Ti = [],
		fr.reset()
	}
	function Bo(e, o) {
		t.previewCanvasData[e + 3] = o,
		er && (tr[e + 3] = o)
	}
	function Uo(e, o, i, r, s) {
		t.previewCanvasData[e] = i,
		t.previewCanvasData[e + 1] = r,
		t.previewCanvasData[e + 2] = s,
		t.previewCanvasData[e + 3] = o,
		er && or(e, o, i, r, s)
	}
	function Oo(t, e, o, i, r) {
		tr[t] = o,
		tr[t + 1] = i,
		tr[t + 2] = r,
		tr[t + 3] = e
	}
	function Io() {
		if ("undefined" == typeof t.previewCanvasData.set)
			for (var e = 0, o = rr.length; e < o; e++)
				t.previewCanvasData[e] = rr[e];
		else
			t.previewCanvasData.set(rr, 0)
	}
	function $o() {
		if (er) {
			for (var e = 0, o = t.previewCanvasData.length; e < o; e += 4) {
				var i = t.previewCanvasData[e + 3];
				0 == i ? tr[e + 3] = 0 : or(e, i, t.previewCanvasData[e], t.previewCanvasData[e + 1], t.previewCanvasData[e + 2])
			}
			ShadowApp.updateMirrorShadowCanvas()
		}
	}
	function Lo() {
		ei({
			command: Const.Meta,
			hasImage: t.hasImage,
			hasThumbnail: t.hasThumbnail,
			hasDrawCommands: t.hasDrawCommands,
			w: xi,
			h: Ai
		})
	}
	function Vo() {
		if (!t.hasServerRgbHistogramResponse) {
			for (var e = new RgbHistogram, o = 0; o < rr.length; o += 4)
				e.add(rr[o + li], rr[o + pi], rr[o + ci]);
			ei({
				command: Const.SetClientRgbHistogram,
				data: e.encode()
			})
		}
	}
	function Go(t) {
		void 0 === t && (t = !1);
		var e = ToolMode.getActiveMode();
		(t || e.serverCares && e != gr) && (gr = e,
			ei({
				command: Const.SetTool,
				toolMode: e.key
			}))
	}
	function Ho(e) {
		ei({
			command: Const.SetUserMask,
			data: t.userMask.encode(),
			version: Const.MaskVersion,
			isDirtying: e
		})
	}
	function Wo(e) {
		ei({
			command: Const.SetHairMask,
			data: t.hairMask.encode(),
			version: Const.MaskVersion,
			isDirtying: e
		})
	}
	function Xo() {
		for (var t = 0; t < HairPalettes.NumPalettes; t++)
			No(t)
	}
	function No(t) {
		ei({
			command: Const.SetHairPalette,
			paletteIndex: t + 1,
			paletteContents: HairPalettes.pickle(t)
		})
	}
	function Yo() {
		ei($.extend({
				command: Const.SetGlobal,
				serverCropRect_o: vt(),
				hasSavedMask: SavedMask.hasSavedMaskS3()
			}, t.settings, {
				cropTargetSize: ue(),
				cropAspectRatio: pe()
			}))
	}
	// 重要
	function qo(t, e, o, i, r, s) {
		ei({
			command: t,
			x0: e,
			y0: o,
			x1: i,
			y1: r,
			d: s
		})
	}
	function Jo() {
		ai({
			command: Const.GenerateResult
		});
		var e = S();
		e == cr && t.result.ready && t.result.success ? Po({
			response: Const.ResultReady,
			success: !0,
			msg: null,
			resultFilename: t.result.filename
		}) : (cr = e,
			t.result.ready = !1,
			Yo(),
			ei({
				command: Const.GenerateResult
			})),
		f()
	}
	function jo() {
		ai({
			command: Const.Skip
		}),
		f()
	}
	function Qo() {
		ei({
			command: Const.SaveServerMask
		})
	}
	function Ko() {
		return ei({
			command: Const.SetSwords,
			swords: Sword.encode()
		}),
		qi
	}
	function Zo() {
		return ei({
			command: Const.SetClientShadows,
			shadows: ShadowApp.encode()
		}),
		qi
	}
	function ti() {
		var e = n();
		t.result.ready && (t.result.posted || e || (t.result.posted = !0,
				ai({
					command: Const.SavedAndResultReady,
					success: t.result.success,
					msg: t.result.msg
				})),
			t.result.shown || (t.result.shown = !0,
				t.result.noCreditsLeft ? top.location.href = ii(!1) : t.result.success ? window.Globals.Bulk.isApi || (ji.isPaid || window.GlobalsEx.hasCreditsLeft ? window.Globals.Bulk.isIframe || Callbacks.App.resultReady(t.result.success, t.result.msg, ji.isShopImage) : top.location.href = ii(!1)) : Callbacks.App.resultReady(t.result.success, t.result.msg, ji.isShopImage)));
	}
	function ei(t) {
		var e = !!Const.DirtiesDrawCommandsSet.contains(t.command);
		e && qi++,
		e && Ii && (t.command != Const.SetUserMask && t.command != Const.SetHairMask || t.isDirtying) && (Oi = !0),
		t.index = qi,
		WorkerApi.send(t),
		t.command == Const.GenerateResult && (Qi = !0),
		e && (g(),
			h())
	}
	function oi() {
		Oi = !0,
		g(),
		h()
	}
	function ii(e) {
		return Router.downloadUrl(ji.id, ji.secret) + (e && t.result.filename ? "/" + t.result.filename : "")
	}
	function ri() {
		return Router.shareUrl(ji.id, ji.secret)
	}
	function si() {
		return Router.surveyUrl(ji.id, ji.secret)
	}
	function ni() {
		return ji.originalFilename || "Unknown Filename"
	}
	function ai(t) {
		t.image = {
			id: ji.id,
			secret: ji.secret
		},
		t.saved = !n(),
		window.checkPostMessage(t)
	}
	Undo.sourceFunction = w,
	t.TransparentColor = "rgba(255,255,255,0.000000)";
	var li = 0,
	pi = 1,
	ci = 2,
	ui = 3,
	di = 20,
	hi = 1,
	gi = 1,
	fi = 250,
	wi = 250,
	Si = .1,
	mi = .2,
	Ci = 1,
	yi = 4e3,
	vi = 1,
	bi = 1,
	Mi = 100,
	ki = 1;
	t.hasServerRgbHistogramResponse = !1,
	t.appHasAlreadyRun = !1,
	t.imageCanvas = null,
	t.previewCanvas = null,
	t.userMask = null,
	t.hairMask = null,
	t.settings = {
		autoLevels: null,
		brushSize: window.Globals.BrushSize,
		globalSmoothingLevel: 0,
		globalBlurLevel: 1,
		globalOffset: 0,
		rotateAngleDeg: 0,
		straightenAngleDeg: 0,
		brightness: 0,
		shadows: 0,
		highlights: 0,
		temperature: 0,
		removeColorCast: !1,
		castColor: 16777215,
		colorCastForegroundProtection: 4,
		whiteBalanceEnabled: !1,
		whiteBalanceGrayColor: 16777215,
		useBrush: !0,
		useCornerDetection: !0,
		useLocalBlur: !0,
		useLocalSmoothing: !0,
		backgroundColor: null,
		cropMode: Const.CropUnconstrained,
		cropMarginUnits: Const.CropMarginPercent,
		cropObjectSize: Const.CropSizeLarge,
		cropVerticalAlignment: Const.CropAlignmentMiddle,
		cropShadows: Const.CropShadowsPad,
		cropAspectRatio: null,
		cropTargetSize: null,
		cropAllowEnlarging: !1,
		cropFitToResult: !1,
		cropPaddingMils: 50,
		cropPaddingPixels: 25,
		cropRect_o: new CropRect,
		outputDpi: 72,
		outputColorSpace: Const.ColorSpaceSrgb,
		jpegQuality: 92,
		pngMode: Const.PngModeNone,
		jpegMode: Const.JpegModeNone,
		opaqueFileFormat: Const.OpaqueFileFormatJpeg,
		maxNumMegapixels: null,
		preCropEnabled: !1,
		preCropLockAspectRatio: !1,
		viewPanesMode: Const.ViewPanesBoth
	},
	t.entryPoint = null,
	t.boundingRect = null,
	t.shadowsRect = null,
	t.result = {
		ready: !1,
		success: !1,
		noCreditsLeft: !1,
		msg: null,
		shown: !1,
		posted: !1
	},
	t.imageSize = null,
	t.imageAspectRatio = null,
	t.stickySettings = null,
	t.defaultSettings = null,
	t.serverMaskCounts = {
		countForeground: 0,
		countBackground: 0
	},
	// 设置路径的地方，贝塞尔曲线点集合
	t.bezierSet = [];
	var Ti = [];
	t.detectedCorners = [];
	var xi = 0,
	Ai = 0,
	Pi = 0,
	_i = 0,
	Di = Point.empty(),
	Ri = 0,
	Ei = 255,
	Fi = 255,
	zi = 255,
	Bi = 255,
	Ui = new CropRect,
	Oi = !1,
	Ii = !1,
	$i = !1,
	Li = !1,
	Vi = null,
	Gi = 1e4,
	Hi = null,
	Wi = !1,
	Xi = !1,
	Ni = null,
	Yi = null,
	qi = 0,
	Ji = 0,
	ji = null,
	Qi = !1,
	Ki = null;
	t.previewCanvasData = null;
	var Zi = null,
	tr = null,
	er = !1,
	or = function (t, e, o, i, r) {
		Oo(t, e, o, i, r)
	},
	ir = null,
	rr = null,
	sr = null,
	nr = !0,
	ar = null,
	lr = null,
	pr = {
		hasImage: 0,
		hasThumbnail: 0,
		hasDrawCommands: 0
	};
	t.hasUser = e;
	var cr = null,
	ur = !1;
	t.unhookBeforeunload = i,
	t.hasUnsavedChanges = n,
	t.formatTargetSize = c,
	t.setBulkImagesRemaining = u,
	t.updateSettingsSummary = d,
	t.checkSaveDrawCommands = f,
	t.create = m,
	t.resume = C,
	t.initializeFarbtastic = b,
	t.setStickySettings = k,
	t.tryUndo = E,
	t.tryRedo = F,
	t.getOriginalPixel = z,
	t.hairEyeDrop = B,
	t.drawSquare = U,
	t.drawLine = O,
	t.clearAllEdits = I,
	t.clearUserMask = L,
	t.clearHairMask = V,
	t.setBrushSize = G,
	t.decrementBrushSize = H,
	t.incrementBrushSize = W,
	t.setEnablePreCrop = X,
	t.toggleEnablePreCrop = Y,
	t.initializeMaxNumMegapixels = q,
	t.setMaxNumMegapixels = J,
	t.getMaxNumPixels = Q,
	t.incrementMaxNumMegapixels = K,
	t.resetMaxNumMegapixels = Z;
	var dr = "";
	t.initializeViewPanesMode = tt,
	t.tempPreviewViewPaneToggle = et,
	t.setViewPanesMode = ot,
	t.updateViewPanesModeDisplay = it,
	t.stepBackgroundColor = rt,
	t.setBackgroundColor = st,
	t.resetGlobalSmoothingLevel = lt,
	t.stepGlobalSmoothingLevel = pt,
	t.setGlobalSmoothingLevel = ct,
	t.resetGlobalBlurLevel = ut,
	t.stepGlobalBlurLevel = dt,
	t.setGlobalBlurLevel = ht,
	t.resetGlobalOffset = gt,
	t.stepGlobalOffset = ft,
	t.setGlobalOffset = wt,
	t.setUseCornerDetection = St,
	t.setUseLocalBlur = mt,
	t.setUseLocalSmoothing = Ct,
	t.getCrop_o = vt,
	t.setCrop_o = bt,
	t.setCropMode = Mt,
	t.setCropMarginUnits = kt,
	t.setCropObjectSize = Tt,
	t.setCropVerticalAlignment = xt,
	t.setCropShadows = At,
	t.setCropPadding = Pt,
	t.updateCropPaddingResetEnabled = _t,
	t.cropPaddingDecrease = Rt,
	t.cropPaddingIncrease = Et,
	t.cropPaddingReset = Ft,
	t.setCropPaddingPixels = zt,
	t.cropPaddingPixelsDecrease = Ut,
	t.cropPaddingPixelsIncrease = Ot,
	t.cropPaddingPixelsReset = It,
	t.setOutputDpi = $t,
	t.outputDpiDecrease = Vt,
	t.outputDpiIncrease = Gt,
	t.outputDpiReset = Ht,
	t.setJpegQuality = Xt,
	t.jpegQualityDecrease = Yt,
	t.jpegQualityIncrease = qt,
	t.jpegQualityReset = Jt,
	t.OpaqueFileFormatGroup = new RadioGroup([new RadioItem(Css.ExportOptions.OpaqueFormat.jpg, Const.OpaqueFileFormatJpeg), new RadioItem(Css.ExportOptions.OpaqueFormat.png, Const.OpaqueFileFormatPng)]),
	t.setOpaqueFileFormat = jt,
	t.PngModeGroup = new RadioGroup([new RadioItem(Css.ExportOptions.PngOptimization.none, Const.PngModeNone), new RadioItem(Css.ExportOptions.PngOptimization.lossless, Const.PngModeLossless), new RadioItem(Css.ExportOptions.PngOptimization.lossy, Const.PngModeLossy)]),
	t.JpegModeGroup = new RadioGroup([new RadioItem(Css.ExportOptions.JpegOptimization.none, Const.JpegModeNone), new RadioItem(Css.ExportOptions.JpegOptimization.moz, Const.JpegModeMoz)]),
	t.setPngMode = Qt,
	t.setJpegMode = Kt,
	t.getRotationCrop_o = ee,
	t.getBoundingRect_o = oe,
	t.getBoundingQuad_i = ie,
	t.updateCrop = re,
	t.setCropFitToResult = ne,
	t.setCropAllowEnlarging = ae,
	t.getCropAspectRatio = pe,
	t.setCropAspectRatio = ce,
	t.getCropTargetSize = ue,
	t.setCropTargetSize = de,
	t.resetCrop = he,
	t.setRotateAngleDeg = ge,
	t.incrementRotateAngleDeg = fe,
	t.rotateClockwise = we,
	t.rotateCounterclockwise = Se,
	t.rotateReset = me,
	t.rotateAngleRad = Ce,
	t.setStraightenAngleDeg = ye,
	t.straightenClockwise = be,
	t.straightenCounterclockwise = Me,
	t.straightenReset = ke,
	t.straightenAngleRad = Te,
	t.straightenCommit = xe,
	t.totalRotationAngleRad_o2i = Ae,
	t.totalRotationAngleRad_i2o = Pe,
	t.setBrightness = Re,
	t.brightnessReset = Fe,
	t.brightnessDecrement = ze,
	t.brightnessIncrement = Be,
	t.setShadows = Ue,
	t.shadowsReset = Ie,
	t.shadowsDecrement = $e,
	t.shadowsIncrement = Le,
	t.setHighlights = Ve,
	t.highlightsReset = He,
	t.highlightsDecrement = We,
	t.highlightsIncrement = Xe,
	t.setTemperature = Ne,
	t.temperatureReset = qe,
	t.temperatureDecrement = Je,
	t.temperatureIncrement = je,
	t.setSaturation = Qe,
	t.saturationReset = Ze,
	t.saturationDecrement = to,
	t.saturationIncrement = eo,
	t.setOutputColorSpace = oo,
	t.setWhiteBalanceEnabled = so,
	t.toggleWhiteBalanceEnabled = no,
	t.setWhiteBalanceGrayColor = ao,
	t.whiteBalanceGrayColorReset = lo,
	t.setRemoveColorCast = po,
	t.toggleColorCast = co,
	t.setCastColor = uo,
	t.castColorReset = ho,
	t.setColorCastForegroundProtection = go,
	t.colorCastForegroundProtectionReset = wo,
	t.colorCastForegroundProtectionDecrement = So,
	t.colorCastForegroundProtectionIncrement = mo,
	t.colorLevelsResetLevels = Co,
	t.colorLevelsResetAll = yo,
	t.colorLevelsAuto = vo,
	t.previewCanvasImageDataSmart = bo, // 右侧预览画布图片
	t.updateColorLevels = ko;
	var hr = new Float32Array(256);
	t.sendImageHistogram = Vo;
	var gr = null;
	t.sendSetTool = Go,
	t.sendSetUserMask = Ho,
	t.sendSetHairPalette = No,
	t.sendSetGlobal = Yo,
	t.sendGenerateResult = Jo,
	t.skip = jo,
	t.sendSaveServerMask = Qo,
	t.sendSetSword = Ko,
	t.sendSetShadows = Zo,
	t.downloadUrl = ii,
	t.shareUrl = ri,
	t.surveyUrl = si,
	t.getFilename = ni;
	var fr;
	!function (e) {
		function o() {
			function o(t, o, i) {
				var l = r.distanceSqrTo(t);
				l < s && (s = l,
					n = o,
					a = i,
					e.currentCenter_i.set(t))
			}
			function i(t, e, i) {
				o(t.p0, e, i)
			}
			var r = ViewPort.main.getViewCenter_i();
			if (null != r) {
				var s = 1e9;
				n = -1,
				a = -1;
				for (var p = 0; p < t.bezierSet.length; p++) {
					var c = t.bezierSet[p];
					if (c.length >= 6) {
						l.p2.setXy(c[0], c[1]);
						for (var u = 0; u < c.length - 5; u += 4)
							l.step(c[u + 2], c[u + 3], c[u + 4], c[u + 5]),
							i(l, p, u)
					}
				}
				n != -1 && a != -1 && ViewPort.main.animateTo_i(e.currentCenter_i, 4)
			}
		}
		function i() {
			n = -1,
			a = -1,
			e.currentCenter_i.setNan()
		}
		function r() {
			if (n != -1 && a != -1) {
				var i = t.bezierSet[n];
				a > 4 ? a -= 4 : (n = (n + t.bezierSet.length - 1) % t.bezierSet.length,
					i = t.bezierSet[n],
					a = Math.max(0, i.length - 2)),
				e.currentCenter_i.setXy(i[a], i[a + 1]),
				ViewPort.main.animateTo_i(e.currentCenter_i, 4)
			} else
				o()
		}
		function s() {
			if (n != -1 && a != -1) {
				var i = t.bezierSet[n];
				a < i.length - 5 ? a += 4 : (n = (n + 1) % t.bezierSet.length,
					i = t.bezierSet[n],
					a = 0),
				e.currentCenter_i.setXy(i[a], i[a + 1]),
				ViewPort.main.animateTo_i(e.currentCenter_i, 4)
			} else
				o()
		}
		var n = -1,
		a = -1;
		e.currentCenter_i = Point.nan();
		var l = new Bezier(Point.empty(), Point.empty(), Point.empty());
		e.start = o,
		e.reset = i,
		e.back = r,
		e.forward = s
	}
	(fr = t.Review || (t.Review = {}))
}
(M || (M = {}));
var CropApp;
!function (t) {
	function e() {
		return V
	}
	function o() {
		V = !1,
		i(),
		ViewPort.subViewPort.refreshAllViews()
	}
	function i() {
		0 != G && (clearTimeout(G),
			G = 0)
	}
	function r() {
		i(),
		G = setTimeout(o, 1e4)
	}
	function s(t) {
		t.$().hover(function () {
			V = !0,
			i(),
			ViewPort.subViewPort.refreshAllViews()
		}, function () {
			r()
		})
	}
	function n(t, e, o, i) {
		Util.mouseDownRepeater(t.decrease.$(), function () {
			e(),
			ViewPort.subViewPort.zoomToFit()
		}, O, 5, Undo.schedulePush, M.sendSetGlobal),
		Util.mouseDownRepeater(t.increase.$(), function () {
			o(),
			ViewPort.subViewPort.zoomToFit()
		}, O, 5, Undo.schedulePush, M.sendSetGlobal),
		t.reset.$().click(function () {
			i(),
			ViewPort.subViewPort.zoomToFit()
		})
	}
	function a() {
		if (!I) {
			I = !0,
			Css.CropApp.close_button.$().click(y),
			Css.CropApp.Mode.Unconstrained.$().click(function () {
				f(Const.CropUnconstrained)
			}),
			Css.CropApp.Mode.LockedAspectRatio.$().click(function () {
				f(Const.CropLockedAspectRatio)
			}),
			Css.CropApp.Mode.TargetSize.$().click(function () {
				f(Const.CropTargetSize)
			}),
			RadioModule.registerRadioGroup(H, w),
			RadioModule.registerRadioGroup(W, S),
			RadioModule.registerRadioGroup(X, m),
			RadioModule.registerRadioGroup(N, C),
			n(Css.CropApp.PaddingPercent, M.cropPaddingDecrease, M.cropPaddingIncrease, M.cropPaddingReset),
			n(Css.CropApp.PaddingPixels, M.cropPaddingPixelsDecrease, M.cropPaddingPixelsIncrease, M.cropPaddingPixelsReset),
			n(Css.CropApp.Dpi, M.outputDpiDecrease, M.outputDpiIncrease, M.outputDpiReset),
			Css.CropApp.DpiPresets.preset72.$().click(function () {
				return M.setOutputDpi(72, !0)
			}),
			Css.CropApp.DpiPresets.preset96.$().click(function () {
				return M.setOutputDpi(96, !0)
			}),
			Css.CropApp.DpiPresets.preset300.$().click(function () {
				return M.setOutputDpi(300, !0)
			}),
			s(Css.CropApp.StraightenSpinner.decrease),
			s(Css.CropApp.StraightenSpinner.increase),
			Css.CropApp.FitToResultButton.$().click(function () {
				M.setCropFitToResult(!M.settings.cropFitToResult, !0),
				ViewPort.subViewPort.animateZoomToFit()
			}),
			Css.CropApp.reset_button.$().click(function () {
				M.resetCrop(),
				ViewPort.subViewPort.animateZoomToFit()
			}),
			Css.CropApp.allow_enlarging_result.$().click(function () {
				M.setCropAllowEnlarging(!M.settings.cropAllowEnlarging, !0, !0),
				ViewPort.subViewPort.animateZoomToFit()
			});
			var t = Css.CropApp.AspectRatio.List.$();
			t.empty();
			for (var e = 0; e < Const.AspectRatios.length; e++)
				d(t, Const.AspectRatios[e]);
			var o = Util.fuzzyAspectRatio(M.imageSize);
			Const.AspectRatios.indexOf(o) < 0 && (p(t),
				d(t, o)),
			p(t),
			u(t),
			Css.CropApp.AspectRatio.OkButton.$().click(function () {
				var t = {
					w: parseFloat(Css.CropApp.AspectRatio.W.$().val()),
					h: parseFloat(Css.CropApp.AspectRatio.H.$().val())
				},
				e = t.w <= 0 || isNaN(t.w),
				o = t.h <= 0 || isNaN(t.h);
				o || e || (t.h / t.w > 10 || t.w / t.h > 10) && (e = o = !0),
				Css.CropApp.AspectRatio.WFg.$().toggleClass("has-error", e),
				Css.CropApp.AspectRatio.HFg.$().toggleClass("has-error", o),
				e || o || (M.setCropAspectRatio(t, !0, !0),
					Css.CropApp.AspectRatio.Lightbox.$().modal("hide"),
					ViewPort.subViewPort.animateZoomToFit())
			});
			var i = Css.CropApp.TargetSize.List.$();
			i.empty(),
			g(i, M.imageSize),
			p(i),
			h(i),
			Css.CropApp.TargetSize.OkButton.$().click(function () {
				var t = {
					w: parseInt(Css.CropApp.TargetSize.W.$().val()),
					h: parseInt(Css.CropApp.TargetSize.H.$().val())
				},
				e = t.w < 1 || isNaN(t.w) || t.w > window.Globals.MaxOutputWidth,
				o = t.h < 1 || isNaN(t.h) || t.h > window.Globals.MaxOutputWidth;
				Css.CropApp.TargetSize.WFg.$().toggleClass("has-error", e),
				Css.CropApp.TargetSize.HFg.$().toggleClass("has-error", o),
				e || o || (M.setCropTargetSize(t, !0, !0),
					Css.CropApp.TargetSize.Lightbox.$().modal("hide"),
					ViewPort.subViewPort.animateZoomToFit())
			})
		}
	}
	function l() {
		a(),
		ToolMode.Grab.pick(),
		Css.subapp_sidebar.$().hide(),
		Css.CropApp.Sidebar.$().show(),
		Css.subapp_tab.$().removeClass("active"),
		Css.CropAppTab.$().addClass("active"),
		Util.modal(Css.SubappLightbox.css()),
		ViewPort.subViewPort.setViewConfigAndShow(B, t),
		L = !0,
		k()
	}
	function p(t) {
		var e = $(document.createElement("li"));
		e.addClass("divider"),
		t.append(e)
	}
	function c(t, e, o) {
		var i = $(document.createElement("li")),
		r = $(document.createElement("a"));
		return r.attr("href", "#"),
		r.text(e),
		r.click(function (t) {
			o(),
			ViewPort.subViewPort.animateZoomToFit(),
			t.preventDefault()
		}),
		i.append(r),
		t.append(i),
		r
	}
	function u(t) {
		c(t, Tr.s("Custom"), function () {
			Util.modal(Css.CropApp.AspectRatio.Lightbox.css())
		})
	}
	function d(t, e) {
		c(t, Util.formatAspectRatio(e), function () {
			M.setCropAspectRatio(e, !0, !0)
		})
	}
	function h(t) {
		c(t, Tr.s("Custom"), function () {
			Util.modal(Css.CropApp.TargetSize.Lightbox.css())
		})
	}
	function g(t, e) {
		c(t, M.formatTargetSize(e), function () {
			M.setCropTargetSize(e, !0, !0)
		})
	}
	function f(t) {
		M.setCropMode(t, !0),
		ViewPort.subViewPort.zoomToFit()
	}
	function w(t) {
		M.setCropMarginUnits(t, !0),
		ViewPort.subViewPort.zoomToFit()
	}
	function S(t) {
		M.setCropObjectSize(t, !0),
		ViewPort.subViewPort.zoomToFit()
	}
	function m(t) {
		M.setCropVerticalAlignment(t, !0),
		ViewPort.subViewPort.zoomToFit()
	}
	function C(t) {
		M.setCropShadows(t, !0),
		ViewPort.subViewPort.zoomToFit()
	}
	function y() {
		Css.CropApp.Sidebar.$().hide(),
		Css.SubappLightbox.$().modal("hide"),
		L = ViewPort.subViewPort.showing = !1,
		Callbacks.App.subAppHidden(),
		V = !1
	}
	function v(t) {
		if (t.ctrlKey || t.altKey || t.metaKey)
			return !1;
		switch (t.keyCode) {
		case 27:
			if (StickySettings.hide())
				break;
			y();
			break;
		case 82:
			t.shiftKey ? Callbacks.App.straightenCounterclockwiseRepeater.down() : M.rotateCounterclockwise();
			break;
		case 84:
			t.shiftKey ? Callbacks.App.straightenClockwiseRepeater.down() : M.rotateClockwise()
		}
		return !0
	}
	function b(t) {
		if (t.ctrlKey || t.altKey || t.metaKey)
			return !1;
		switch (t.keyCode) {
		case 82:
			Callbacks.App.straightenCounterclockwiseRepeater.up();
			break;
		case 84:
			Callbacks.App.straightenClockwiseRepeater.up()
		}
		return !0
	}
	function k() {
		if (L) {
			var t = M.getCropAspectRatio();
			Css.CropApp.locked_aspect_ratio_display.$().text(Util.formatAspectRatio(t));
			var e = M.getCropTargetSize();
			Css.CropApp.target_size_display.$().text(M.formatTargetSize(e));
			var o = M.settings.cropMode;
			o == Const.CropUnconstrained ? Css.CropApp.Mode.Unconstrained.$().prop("checked", !0) : o == Const.CropLockedAspectRatio ? Css.CropApp.Mode.LockedAspectRatio.$().prop("checked", !0) : o == Const.CropTargetSize && Css.CropApp.Mode.TargetSize.$().prop("checked", !0),
			H.update(M.settings.cropMarginUnits),
			W.update(M.settings.cropObjectSize),
			X.update(M.settings.cropVerticalAlignment),
			N.update(M.settings.cropShadows);
			var i = M.settings.cropMarginUnits == Const.CropMarginPercent;
			Css.CropApp.PaddingPercent.container.$().toggle(i),
			Css.CropApp.PaddingPixels.container.$().toggle(!i),
			Css.CropApp.PaddingPercent.display.$().text("" + (.1 * M.settings.cropPaddingMils).toFixed(1) + "%"),
			Css.CropApp.PaddingPixels.display.$().text("" + M.settings.cropPaddingPixels.toFixed(0) + "px"),
			Css.CropApp.FitToResultButton.$().prop("checked", M.settings.cropFitToResult),
			Css.CropApp.fit_to_result_controls.$().toggle(M.settings.cropFitToResult),
			Css.CropApp.fit_to_result_comment.$().toggle(!M.settings.cropFitToResult);
			var r = M.getCrop_o(),
			s = M.getCropTargetSize(),
			n = null;
			n = M.settings.cropMode == Const.CropTargetSize && null != s && (M.settings.cropAllowEnlarging || s.w < r.width() || s.h < r.height()) ? M.formatTargetSize(s) : M.formatTargetSize({
					w: r.width(),
					h: r.height()
				}),
			Css.CropApp.output_size_display.$().text(n),
			Css.CropApp.allow_enlarging_result.$().prop("checked", M.settings.cropAllowEnlarging)
		}
	}
	function T() {
		var t = ViewPort.subViewPort.getMouse_c(),
		e = ViewPort.subViewPort.getCrop_c();
		if (Math.abs(e.centerX() - t.x) <= U && Math.abs(e.centerY() - t.y) <= U)
			return ToolMode.ResizeMove;
		if (t.x > e.left0 - U && t.x < e.right0 + U && t.y > e.top0 - U && t.y < e.bottom0 + U) {
			var o = t.x < e.left0 + U,
			i = t.x > e.right0 - U,
			r = t.y < e.top0 + U,
			s = t.y > e.bottom0 - U;
			if (o)
				return r ? ToolMode.ResizeTopLeft : s ? ToolMode.ResizeBottomLeft : ToolMode.ResizeLeft;
			if (i)
				return r ? ToolMode.ResizeTopRight : s ? ToolMode.ResizeBottomRight : ToolMode.ResizeRight;
			if (r)
				return ToolMode.ResizeTop;
			if (s)
				return ToolMode.ResizeBottom
		}
		return ToolMode.Grab
	}
	function x(t) {
		ToolMode.isNot(ToolMode.Grab) && t == Const.MouseButtonLeft && (J = !1,
			Y = M.getCrop_o())
	}
	function A(t, e, o) {
		var i = null;
		if (ViewPort.subViewPort.getMouseIsDown() ? i = ToolMode.getActiveMode() : (i = T(),
					ToolMode.setTempSelect(i)),
			ToolMode.isNot(ToolMode.Grab) && ViewPort.subViewPort.getMouseIsDown() && o == Const.MouseButtonLeft) {
			J || (J = !0,
				M.settings.cropFitToResult ? M.setCropFitToResult(!1, !0) : Undo.push());
			var r = ViewPort.subViewPort.getZoomScale(),
			s = ViewPort.subViewPort.getClick_c(),
			n = (t - s.x) / r,
			a = (e - s.y) / r;
			if (q.setFrom(Y),
				i == ToolMode.ResizeMove)
				q.left0 += n,
				q.right0 += n,
				q.top0 += a,
				q.bottom0 += a;
			else {
				var l = null;
				M.settings.cropMode == Const.CropLockedAspectRatio ? l = M.getCropAspectRatio() : M.settings.cropMode == Const.CropTargetSize && (l = M.getCropTargetSize());
				var p = l ? l.w / l.h : 0,
				c = l ? l.h / l.w : 0;
				i == ToolMode.ResizeTop ? (q.top0 = Y.top0 + a,
					l && (q.left0 = Y.left0 + a * p / 2,
						q.right0 = Y.right0 - a * p / 2)) : i == ToolMode.ResizeTopRight ? (q.top0 = Y.top0 + a,
					q.right0 = Y.right0 + n,
					l && (q.y2x() > p ? q.top0 = Y.top0 - n * c : q.right0 = Y.right0 - a * p)) : i == ToolMode.ResizeRight ? (q.right0 = Y.right0 + n,
					l && (q.top0 = Y.top0 - n * c / 2,
						q.bottom0 = Y.bottom0 + n * c / 2)) : i == ToolMode.ResizeBottomRight ? (q.bottom0 = Y.bottom0 + a,
					q.right0 = Y.right0 + n,
					l && (q.y2x() > p ? q.bottom0 = Y.bottom0 + n * c : q.right0 = Y.right0 + a * p)) : i == ToolMode.ResizeBottom ? (q.bottom0 = Y.bottom0 + a,
					l && (q.left0 = Y.left0 - a * p / 2,
						q.right0 = Y.right0 + a * p / 2)) : i == ToolMode.ResizeBottomLeft ? (q.bottom0 = Y.bottom0 + a,
					q.left0 = Y.left0 + n,
					l && (q.y2x() > p ? q.bottom0 = Y.bottom0 - n * c : q.left0 = Y.left0 - a * p)) : i == ToolMode.ResizeLeft ? (q.left0 = Y.left0 + n,
					l && (q.top0 = Y.top0 + n * c / 2,
						q.bottom0 = Y.bottom0 - n * c / 2)) : i == ToolMode.ResizeTopLeft && (q.top0 = Y.top0 + a,
					q.left0 = Y.left0 + n,
					l && (q.y2x() > p ? q.top0 = Y.top0 + n * c : q.left0 = Y.left0 + a * p))
			}
			q.width() <= window.Globals.MaxOutputWidth && M.setCrop_o(q, !1),
			ViewPort.subViewPort.refreshAllViews()
		}
	}
	function P(t) {
		J && M.sendSetGlobal()
	}
	function _() {
		ToolMode.setTempSelect(T())
	}
	function D(t) {}
	function R(t, e) {}
	function E(t, e, o, i) {}
	function F(t, e, o, i) {}
	function z(t, e) {
		function o(t, o, i, r, s) {
			var n = ToolMode.is(s);
			e.setFillStyle("#ffffff"),
			e.fillRect(t + i, o + r, i * j, r * Q),
			e.fillRect(t + i, o + r, i * Q, r * j),
			e.setFillStyle(n ? "#ff0000" : "#000000"),
			e.fillRect(t + 2 * i, o + 2 * r, i * K, r * Z),
			e.fillRect(t + 2 * i, o + 2 * r, i * Z, r * K)
		}
		function i(t, o, i, r) {
			var s = ToolMode.is(r);
			e.setFillStyle("#ffffff"),
			e.fillRect(t + i, o - j / 2, i * Q, j),
			e.setFillStyle(s ? "#ff0000" : "#000000"),
			e.fillRect(t + 2 * i, o - K / 2, i * Z, K)
		}
		function r(t, o, i, r) {
			var s = ToolMode.is(r);
			e.setFillStyle("#ffffff"),
			e.fillRect(t - j / 2, o + i, j, i * Q),
			e.setFillStyle(s ? "#ff0000" : "#000000"),
			e.fillRect(t - K / 2, o + 2 * i, K, i * Z)
		}
		function s(t, o, i) {
			var r = U / 2,
			s = 1.75 * r,
			n = 2,
			a = 1 * n,
			l = 2.5 * a,
			p = ToolMode.is(i),
			c = p ? "#ff0000" : "#000000";
			e.beginPath(),
			e.triangle(t, o - s, -Math.PI / 2, a, l),
			e.triangle(t, o + s, Math.PI / 2, a, l),
			e.triangle(t - s, o, Math.PI, a, l),
			e.triangle(t + s, o, 0, a, l),
			e.strokeEx(2, "#FFF"),
			e.fillEx(c);
			var u = r + 2;
			e.fillCircle(t, o, u, "#FFFFFF"),
			e.fillCircle(t, o, u - 1, c)
		}
		t.empty(),
		e.setGlobalAlpha(1),
		e.setLineJoin("miter"),
		e.setLineCap("square");
		var n = ViewPort.subViewPort.getCrop_c();
		o(n.left0, n.top0, 1, 1, ToolMode.ResizeTopLeft),
		o(n.right0, n.top0, -1, 1, ToolMode.ResizeTopRight),
		o(n.right0, n.bottom0, -1, -1, ToolMode.ResizeBottomRight),
		o(n.left0, n.bottom0, 1, -1, ToolMode.ResizeBottomLeft),
		i(n.left0, Math.round(n.centerY()), 1, ToolMode.ResizeLeft),
		i(n.right0, Math.round(n.centerY()), -1, ToolMode.ResizeRight),
		r(Math.round(n.centerX()), n.top0, 1, ToolMode.ResizeTop),
		r(Math.round(n.centerX()), n.bottom0, -1, ToolMode.ResizeBottom),
		s(Math.round(n.centerX()), Math.round(n.centerY()), ToolMode.ResizeMove)
	}
	var B = {
		isVisible: !0,
		showPreview: !0,
		showFrame: !0,
		showBackground: !0,
		title: ""
	},
	U = 20,
	O = 60,
	I = !1,
	L = !1,
	V = !1,
	G = 0,
	H = new RadioGroup([new RadioItem(Css.CropApp.MarginUnits.Pixels, Const.CropMarginPixels), new RadioItem(Css.CropApp.MarginUnits.Percent, Const.CropMarginPercent)]),
	W = new RadioGroup([new RadioItem(Css.CropApp.ObjectSize.Small, Const.CropSizeSmall), new RadioItem(Css.CropApp.ObjectSize.Medium, Const.CropSizeMedium), new RadioItem(Css.CropApp.ObjectSize.Large, Const.CropSizeLarge)]),
	X = new RadioGroup([new RadioItem(Css.CropApp.VerticalAlignment.Top, Const.CropAlignmentTop), new RadioItem(Css.CropApp.VerticalAlignment.Middle, Const.CropAlignmentMiddle), new RadioItem(Css.CropApp.VerticalAlignment.Bottom, Const.CropAlignmentBottom)]),
	N = new RadioGroup([new RadioItem(Css.CropApp.Shadows.Ignore, Const.CropShadowsIgnore), new RadioItem(Css.CropApp.Shadows.Pad, Const.CropShadowsPad), new RadioItem(Css.CropApp.Shadows.Tight, Const.CropShadowsTight)]);
	t.showGrid = e,
	t.initialize = a,
	t.show = l,
	t.keyDownHandler = v,
	t.keyUpHandler = b,
	t.updateDisplay = k;
	var Y = null,
	q = new CropRect,
	J = !1;
	t.mouseDownHandler = x,
	t.mouseMoveHandler = A,
	t.mouseUpHandler = P,
	t.touchEndHandler = _,
	t.mouseWheelHandler = D;
	var j = 20,
	Q = 6,
	K = j - 2,
	Z = Q - 2;
	t.drawOver_i = R,
	t.drawUnder_i = E,
	t.drawUnder_c = F,
	t.drawOver_c = z
}
(CropApp || (CropApp = {}));
var EditApp;
!function (t) {
	function e() {
		try {
			f || (f = !0,
				$("#edit-app-close-button").click(o),
				$("#edit-app-bottom-close-button").click(o)),
			ToolMode.Grab.pick(),
			Css.subapp_sidebar.$().hide(),
			Css.EditAppSidebar.$().show(),
			Util.modal(Css.SubappLightbox.css()),
			ViewPort.subViewPort.setViewConfigAndShow(g, t),
			w = !0
		} catch (t) {}
	}
	function o() {
		Css.EditAppSidebar.$().hide(),
		Css.SubappLightbox.$().modal("hide"),
		w = ViewPort.subViewPort.showing = !1,
		Callbacks.App.subAppHidden()
	}
	function i(t) {
		if (t.ctrlKey || t.altKey || t.metaKey)
			return !1;
		switch (t.keyCode) {
		case 27:
			if (StickySettings.hide())
				break;
			o()
		}
		return !0
	}
	function r(t) {
		return !(t.ctrlKey || t.altKey || t.metaKey) && (t.keyCode,
			!0)
	}
	function s(t) {}
	function n(t, e, o) {}
	function a(t) {}
	function l() {}
	function p(t) {}
	function c(t, e, o, i) {}
	function u(t, e) {}
	function d(t, e, o, i) {}
	function h(t, e) {}
	var g = {
		isVisible: !0,
		showPreview: !0,
		showFrame: !0,
		showBackground: !1,
		title: ""
	},
	f = !1,
	w = !1;
	t.show = e,
	t.keyDownHandler = i,
	t.keyUpHandler = r,
	t.mouseDownHandler = s,
	t.mouseMoveHandler = n,
	t.mouseUpHandler = a,
	t.touchEndHandler = l,
	t.mouseWheelHandler = p,
	t.drawUnder_c = c,
	t.drawOver_i = u,
	t.drawUnder_i = d,
	t.drawOver_c = h
}
(EditApp || (EditApp = {}));
var ColorsApp;
!function (t) {
	function e() {
		w || (w = !0,
			Css.ColorsApp.close_button.$().click(i),
			Css.ColorsApp.ColorSpace.SRgb.$().click(function () {
				return M.setOutputColorSpace(Const.ColorSpaceSrgb, !0)
			}),
			Css.ColorsApp.ColorSpace.AdobeRgb.$().click(function () {
				return M.setOutputColorSpace(Const.ColorSpaceAdobeRgb, !0)
			}),
			Css.ColorsApp.ColorSpace.AppleRgb.$().click(function () {
				return M.setOutputColorSpace(Const.ColorSpaceAppleRgb, !0)
			}),
			Css.ColorsApp.ColorSpace.ColorMatchRgb.$().click(function () {
				return M.setOutputColorSpace(Const.ColorSpaceColorMatchRgb, !0)
			}))
	}
	function o() {
		try {
			e(),
			ToolMode.Grab.pick(),
			Css.subapp_sidebar.$().hide(),
			Css.ColorsApp.Sidebar.$().show(),
			Css.SubappLightbox.$().show(),
			Css.subapp_tab.$().removeClass("active"),
			Css.ColorsAppTab.$().addClass("active"),
			Util.modal("#subapp-lightbox"),
			ViewPort.subViewPort.setViewConfigAndShow(f, t),
			S = !0
		} catch (t) {}
	}
	function i() {
		Css.ColorsApp.Sidebar.$().hide(),
		Css.SubappLightbox.$().modal("hide"),
		S = ViewPort.subViewPort.showing = !1,
		Callbacks.App.subAppHidden()
	}
	function r(t) {
		if (t.ctrlKey || t.altKey || t.metaKey)
			return !1;
		switch (t.keyCode) {
		case 27:
			if (StickySettings.hide())
				break;
			i()
		}
		return !0
	}
	function s(t) {
		return !(t.ctrlKey || t.altKey || t.metaKey) && (t.keyCode,
			!0)
	}
	function n(t) {
		var e = ToolMode.getVisibleMode();
		if (e.isEyeDropper && t == Const.MouseButtonLeft) {
			var o = ViewPort.subViewPort.getMouse_ii(),
			i = M.getOriginalPixel(o.x, o.y);
			e == ToolMode.BackgroundEyeDropper ? M.setCastColor(i, !0, !0) : e == ToolMode.GrayEyeDropper && M.setWhiteBalanceGrayColor(i, !0, !0)
		}
	}
	function a(t, e, o) {}
	function l(t) {
		ToolMode.getSelectedMode().isEyeDropper && ToolMode.Grab.pick()
	}
	function p() {}
	function c(t) {}
	function u(t, e, o, i) {}
	function d(t, e) {}
	function h(t, e, o, i) {}
	function g(t, e) {}
	var f = {
		isVisible: !0,
		showPreview: !0,
		showFrame: !0,
		showBackground: !0,
		showEyeDropperLoupe: !0,
		title: "",
		contextMenuHandler: ContextMenu.showColorsApp
	},
	w = !1,
	S = !1;
	t.initialize = e,
	t.show = o,
	t.keyDownHandler = r,
	t.keyUpHandler = s,
	t.mouseDownHandler = n,
	t.mouseMoveHandler = a,
	t.mouseUpHandler = l,
	t.touchEndHandler = p,
	t.mouseWheelHandler = c,
	t.drawUnder_c = u,
	t.drawOver_i = d,
	t.drawUnder_i = h,
	t.drawOver_c = g
}
(ColorsApp || (ColorsApp = {}));
var StickySettings;
!function (t) {
	function e(t) {
		return '<div class="background-color-swatch-container"><span class="background-color-swatch swatch popover-button-label checker-svg" style="position:absolute;"></span><span class="background-color-swatch swatch popover-button-label" id="background-color-current-swatch" style="position: relative; background-color: ' + t + ';"></span></div>'
	}
	function o() {
		if (!d) {
			Css.PreferencesDialog.DefaultSettingsTab.$().on("show.bs.tab", a);
			for (var t = 0; t < m.List.length; t++)
				r(m.List[t]);
			for (var t = 0; t < C.length; t++)
				s(C[t]);
			a(),
			d = !0
		}
	}
	function i(t, e) {
		var o = t.$(),
		i = o.parent();
		o.click(function () {
			i.hasClass("disabled") || e()
		})
	}
	function r(t) {
		i(t.css.setStickyToCurrent, function () {
			return t.setStickyToCurrent()
		}),
		i(t.css.setCurrentToDefault, function () {
			return t.setCurrentToDefault()
		}),
		i(t.css.setCurrentAndStickyToFactory, function () {
			return t.setCurrentAndStickyToFactory()
		}),
		t.css.button.$().click(function () {
			a()
		}),
		t.css.button.$().hover(function () {
			t.css.outline.$().addClass(Css.sticky_outline_active.name())
		}, function () {
			t.css.outline.$().removeClass(Css.sticky_outline_active.name())
		}),
		M.hasUser() || (t.css.setCurrentAndStickyToFactory.$().toggleClass("disabled", !0),
			t.css.setCurrentToDefault.$().toggleClass("disabled", !0),
			t.css.setStickyToCurrent.$().toggleClass("disabled", !0))
	}
	function s(t) {
		t.css.setStickyToCurrent.$().click(function () {
			return t.setSticky(t.getCurrent(), !0)
		}),
		t.css.setCurrentToDefault.$().click(function () {
			return t.setCurrent(t.getDefault(), !0)
		}),
		t.css.setCurrentAndStickyToFactory.$().click(function () {
			return t.setCurrentAndStickyToFactory(!0)
		})
	}
	function n(t) {
		M.hasUser() && M.setStickySettings($.extend({}, M.stickySettings), t),
		a()
	}
	function a() {
		for (var t = !1, e = !1, o = !M.hasUser(), i = 0; i < C.length; i++) {
			var r = C[i],
			s = r.getCurrent(),
			n = r.getSticky(),
			a = r.getDefault(),
			l = r.getFactory(),
			p = r.display(s),
			c = r.display(l),
			u = r.display(n),
			d = r.display(a);
			r.currentEqualFactory = p == c,
			r.currentEqualSticky = p == u,
			r.stickyEqualFactory = u == c,
			r.defaultEqualFactory = d == c,
			r.currentEqualDefault = p == d,
			r.cachedCurrent != p && r.css.displayCurrent.$().html(p),
			r.cachedSticky != u && r.css.displayDefault.$().html(d),
			r.cachedFactory != c && r.css.displayFactory.$().html(c),
			r.cachedCurrent = p,
			r.cachedSticky = u,
			r.cachedFactory = c;
			var h = r.currentEqualDefault || o,
			g = r.currentEqualFactory && r.defaultEqualFactory || o;
			t = t || !h,
			e = e || !g,
			r.css.setStickyToCurrent.$().toggleClass("disabled", h),
			r.css.setCurrentToDefault.$().toggleClass("disabled", h),
			r.css.displayCurrent.$().toggleClass("disabled", h),
			r.css.setCurrentAndStickyToFactory.$().toggleClass("disabled", g),
			r.css.displayFactory.$().toggleClass("disabled", g)
		}
		for (var i = 0; i < m.List.length; i++) {
			for (var f = m.List[i], w = !0, S = !0, y = !0, v = !0, b = !0, k = !0, T = 0; T < f.children.length; T++) {
				var r = f.children[T];
				w = w && r.currentEqualFactory,
				S = S && r.currentEqualSticky,
				y = y && r.stickyEqualFactory,
				v = v && r.defaultEqualFactory,
				b = b && r.currentEqualDefault,
				k = k && "" == r.cachedSticky
			}
			f.css.setCurrentAndStickyToFactory.$().parent().toggleClass("disabled", w && v || o),
			f.css.setCurrentToDefault.$().parent().toggleClass("disabled", b || o),
			f.css.setStickyToCurrent.$().parent().toggleClass("disabled", b || o)
		}
	}
	function l() {
		return k
	}
	function p(t) {
		return void 0 === t && (t = Css.PreferencesDialog.DefaultSettingsTab),
		k = !0,
		ColorsApp.initialize(),
		CropApp.initialize(),
		o(),
		a(),
		Util.modal(Css.StickySettingsLightbox.css()),
		null != t && t.$().tab("show"),
		!1
	}
	function c() {
		return !!k && (k = !1,
			Css.StickySettingsLightbox.$().modal("hide"),
			!0)
	}
	Callbacks.StickySettings = t;
	var u,
	d = !1;
	!function (t) {
		t[t.Main = 0] = "Main",
		t[t.EllipseShadow = 1] = "EllipseShadow",
		t[t.DropShadow = 2] = "DropShadow",
		t[t.MirrorShadow = 3] = "MirrorShadow",
		t[t.PerspectiveShadow = 4] = "PerspectiveShadow"
	}
	(u || (u = {}));
	var h;
	!function (t) {
		t[t.None = 0] = "None",
		t[t.Px = 1] = "Px",
		t[t.Megapixel = 2] = "Megapixel",
		t[t.OnOff = 3] = "OnOff",
		t[t.Percent = 4] = "Percent",
		t[t.Mils = 5] = "Mils",
		t[t.Enum = 6] = "Enum",
		t[t.AspectRatio = 7] = "AspectRatio",
		t[t.Size = 8] = "Size",
		t[t.BackgroundColor = 9] = "BackgroundColor",
		t[t.Fraction = 10] = "Fraction",
		t[t.Dpi = 11] = "Dpi"
	}
	(h || (h = {})),
	t.backgroundSwatch = e;
	var g,
	f = function () {
		function t(t, e, o, i, r, s, n) {
			void 0 === o && (o = h.None),
			void 0 === r && (r = []),
			void 0 === s && (s = !1),
			void 0 === n && (n = u.Main),
			this.key = t,
			this.css = e,
			this.format = o,
			this.setter = i,
			this.translateEnum = s,
			this.settingsContainer = n,
			this.cachedCurrent = null,
			this.cachedSticky = null,
			this.cachedFactory = null,
			this.currentEqualSticky = !1,
			this.currentEqualFactory = !1,
			this.currentEqualDefault = !1,
			this.stickyEqualFactory = !1,
			this.defaultEqualFactory = !1,
			this.hash = HashMap.from(r)
		}
		return t.prototype.main = function () {
			switch (this.settingsContainer) {
			case u.Main:
				return M.settings;
			case u.EllipseShadow:
				return ShadowApp.getSelectedEllipseShadow();
			case u.DropShadow:
				return ShadowApp.dropShadow;
			case u.MirrorShadow:
				return ShadowApp.mirrorShadow;
			case u.PerspectiveShadow:
				return ShadowApp.perspectiveShadow
			}
		},
		t.prototype.consolidated = function (t) {
			switch (this.settingsContainer) {
			case u.Main:
				return t;
			case u.EllipseShadow:
				return t.ellipseShadow;
			case u.DropShadow:
				return t.dropShadow;
			case u.MirrorShadow:
				return t.mirrorShadow;
			case u.PerspectiveShadow:
				return t.perspectiveShadow
			}
		},
		t.prototype.default = function () {
			return this.consolidated(M.defaultSettings)
		},
		t.prototype.sticky = function () {
			return this.consolidated(M.stickySettings)
		},
		t.prototype.factory = function () {
			return this.consolidated(Const.FactoryDefaults)
		},
		t.prototype.display = function (t) {
			return void 0 == t || null == t ? this.format == h.Size || this.format == h.AspectRatio ? Tr.s("Unchanged") : this.format == h.BackgroundColor ? this.displayInner(t) : "" : this.displayInner(t)
		},
		t.prototype.displayInner = function (t) {
			switch (this.format) {
			case h.None:
				return "" + t;
			case h.Px:
				return "" + t + "px";
			case h.Megapixel:
				return "" + t + " megapixels";
			case h.Dpi:
				return "" + t + " DPI";
			case h.OnOff:
				return t ? Tr.s("On") : Tr.s("Off");
			case h.Fraction:
				return "" + (100 * Unsafe.cast(t)).toFixed(0) + "%";
			case h.Percent:
				return "" + t + "%";
			case h.Mils:
				var o = parseInt("" + t);
				return "" + o / 10 + "%";
			case h.Enum:
				var i = this.hash.getOrElse(t, "");
				return this.translateEnum && (i = Tr.s(i)),
				i;
			case h.AspectRatio:
				var r = Unsafe.cast(t);
				return Util.toFixed(r.w, 3) + ":" + Util.toFixed(r.h, 3);
			case h.Size:
				var s = Unsafe.cast(t);
				return s.w.toFixed(0) + " x " + s.h.toFixed(0) + "px";
			case h.BackgroundColor:
				var n = t ? t.toString() : M.TransparentColor;
				return e(n);
			default:
				return "" + t
			}
		},
		t.prototype.getCurrentDisplay = function () {
			return this.display(this.getCurrent())
		},
		t.prototype.getFrom = function (t) {
			return Unsafe.get(t, this.key)
		},
		t.prototype.getCurrent = function () {
			return this.getFrom(this.main())
		},
		t.prototype.getDefault = function () {
			return this.getFrom(this.default())
			},
			t.prototype.getSticky = function () {
				return this.getFrom(this.sticky())
			},
			t.prototype.getFactory = function () {
				return this.getFrom(this.factory())
			},
			t.prototype.setIn = function (t, e) {
				Unsafe.set(t, this.key, e)
			},
			t.prototype.setCurrent = function (t, e) {
				var o = this.getCurrent();
				return t != o && (this.setCurrentInner(t, e),
					a(),
					!0)
			},
			t.prototype.setCurrentInner = function (t, e) {
				null != this.setter && this.setter(t, e)
			},
			t.prototype.setStickyFromCurrent = function (t) {
				this.setSticky(this.getCurrent(), t)
			},
			t.prototype.setSticky = function (t, e) {
				void 0 != t && this.getFactory() == t ? this.clearSticky(e) : (this.setIn(this.sticky(), t),
					n(e)),
				a()
			},
			t.prototype.clearSticky = function (t) {
				this.setSticky(void 0, t),
				a()
			},
			t.prototype.setCurrentAndStickyToFactory = function (t) {
				this.setCurrent(this.getFactory(), t),
				this.clearSticky(t),
				a()
			},
			t
		}
		(),
		w = function () {
			function t(t, e) {
				this.css = t,
				this.children = e
			}
			return t.prototype.setStickyToCurrent = function () {
				for (var t = 0; t < this.children.length; t++) {
					var e = this.children[t];
					e.setSticky(e.getCurrent(), !1)
				}
				n(!0),
				a()
			},
			t.prototype.setCurrentToDefault = function () {
				Undo.push();
				for (var t = 0; t < this.children.length; t++) {
					var e = this.children[t];
					e.setCurrent(e.getDefault(), !1)
				}
				n(!0),
				M.sendSetGlobal(),
				M.sendSetShadows(),
				a()
			},
			t.prototype.setCurrentAndStickyToFactory = function () {
				Undo.push();
				for (var t = 0; t < this.children.length; t++) {
					var e = this.children[t];
					e.clearSticky(!1),
					e.setCurrent(e.getDefault(), !1)
				}
				n(!0),
				M.sendSetGlobal(),
				M.sendSetShadows(),
				a()
			},
			t
		}
		(),
		S = function (t) {
			function e() {
				t.call(this, "autoLevels", Css.Settings.Colors.AutoLevels, h.OnOff, null)
			}
			return __extends(e, t),
			e.prototype.getCurrent = function () {
				return !0
			},
			e
		}
		(f);
		!function (t) {
			t.BrushSize = new f("brushSize", Css.Settings.BrushSize, h.Px, M.setBrushSize),
			t.MaxNumMegapixels = new f("maxNumMegapixels", Css.Settings.MaxNumMegapixels, h.Megapixel, M.setMaxNumMegapixels),
			t.BackgroundColor = new f("backgroundColor", Css.Settings.BackgroundColor, h.BackgroundColor, M.setBackgroundColor);
			var e;
			!function (t) {
				t.AutoLevels = new S,
				t.OutputColorSpace = new f("outputColorSpace", Css.Settings.Colors.ColorSpace, h.Enum, M.setOutputColorSpace, [[Const.ColorSpaceSrgb, "sRGB"], [Const.ColorSpaceAdobeRgb, "Adobe RGB (1998)"], [Const.ColorSpaceAppleRgb, "Apple RGB"], [Const.ColorSpaceColorMatchRgb, "ColorMatch RGB"]]);
			}
			(e = t.Colors || (t.Colors = {}));
			var o;
			!function (t) {
				t.JpegQuality = new f("jpegQuality", Css.Settings.ExportOptions.JpegQuality, h.None, M.setJpegQuality),
				t.OpaqueFileFormat = new f("opaqueFileFormat", Css.Settings.ExportOptions.OpaqueFileFormat, h.Enum, M.setOpaqueFileFormat, [[Const.OpaqueFileFormatJpeg, "JPEG"], [Const.OpaqueFileFormatPng, "PNG"]]),
				t.PngMode = new f("pngMode", Css.Settings.ExportOptions.PngMode, h.Enum, M.setPngMode, [[Const.PngModeNone, "None"], [Const.PngModeLossless, "Lossless"], [Const.PngModeLossy, "Lossy"]], !0),
				t.JpegMode = new f("jpegMode", Css.Settings.ExportOptions.JpegMode, h.Enum, M.setJpegMode, [[Const.JpegModeNone, "None"], [Const.JpegModeMoz, "Enabled"]], !0)
			}
			(o = t.ExportOptions || (t.ExportOptions = {}));
			var i;
			!function (t) {
				t.Mode = new f("cropMode", Css.Settings.Crop.Mode, h.Enum, M.setCropMode, [[Const.CropUnconstrained, "Unconstrained"], [Const.CropLockedAspectRatio, "Aspect Ratio"], [Const.CropTargetSize, "Target Size"]], !0),
				t.AspectRatio = new f("cropAspectRatio", Css.Settings.Crop.AspectRatio, h.AspectRatio, M.setCropAspectRatio),
				t.TargetSize = new f("cropTargetSize", Css.Settings.Crop.TargetSize, h.Size, M.setCropTargetSize),
				t.AllowEnlarging = new f("cropAllowEnlarging", Css.Settings.Crop.AllowEnlarging, h.OnOff, M.setCropAllowEnlarging),
				t.FitToResult = new f("cropFitToResult", Css.Settings.Crop.FitToResult, h.OnOff, M.setCropFitToResult),
				t.PaddingMils = new f("cropPaddingMils", Css.Settings.Crop.PaddingMils, h.Mils, M.setCropPadding),
				t.PaddingPixels = new f("cropPaddingPixels", Css.Settings.Crop.PaddingPixels, h.Px, M.setCropPaddingPixels),
				t.MarginUnits = new f("cropMarginUnits", Css.Settings.Crop.MarginUnits, h.Enum, M.setCropMarginUnits, [[Const.CropMarginPixels, "Pixels"], [Const.CropMarginPercent, "Percent"]], !0),
				t.ObjectSize = new f("cropObjectSize", Css.Settings.Crop.ObjectSize, h.Enum, M.setCropObjectSize, [[Const.CropSizeLarge, "Large"], [Const.CropSizeMedium, "Medium"], [Const.CropSizeSmall, "Small"]], !0),
				t.VerticalAlignment = new f("cropVerticalAlignment", Css.Settings.Crop.VerticalAlignment, h.Enum, M.setCropVerticalAlignment, [[Const.CropAlignmentTop, "Top"], [Const.CropAlignmentMiddle, "Middle"], [Const.CropAlignmentBottom, "Bottom"]], !0),
				t.Shadows = new f("cropShadows", Css.Settings.Crop.Shadows, h.Enum, M.setCropShadows, [[Const.CropShadowsIgnore, "Ignore"], [Const.CropShadowsPad, "Pad"], [Const.CropShadowsTight, "Tight"]], !0),
				t.OutputDpi = new f("outputDpi", Css.Settings.Crop.Dpi, h.Dpi, M.setOutputDpi)
			}
			(i = t.Crop || (t.Crop = {}));
			var r;
			!function (t) {
				t.BlurLevel = new f("globalBlurLevel", Css.Settings.Edge.BlurLevel, h.Px, M.setGlobalBlurLevel),
				t.SmoothingLevel = new f("globalSmoothingLevel", Css.Settings.Edge.SmoothingLevel, h.None, M.setGlobalSmoothingLevel),
				t.Offset = new f("globalOffset", Css.Settings.Edge.Offset, h.Px, M.setGlobalOffset),
				t.UseCornerDetection = new f("useCornerDetection", Css.Settings.Edge.UseCornerDetection, h.OnOff, M.setUseCornerDetection),
				t.UseLocalBlur = new f("useLocalBlur", Css.Settings.Edge.UseLocalBlur, h.OnOff, M.setUseLocalBlur),
				t.UseLocalSmoothing = new f("useLocalSmoothing", Css.Settings.Edge.UseLocalSmoothing, h.OnOff, M.setUseLocalSmoothing)
			}
			(r = t.Edge || (t.Edge = {}));
			var s;
			!function (t) {
				var e;
				!function (t) {
					t.Strength = new f("strength", Css.Settings.Shadows.Ellipse.Strength, h.Fraction, ShadowApp.setEllipseShadowStrength, [], !1, u.EllipseShadow),
					t.Core = new f("core", Css.Settings.Shadows.Ellipse.Core, h.Fraction, ShadowApp.setEllipseShadowCore, [], !1, u.EllipseShadow)
				}
				(e = t.Ellipse || (t.Ellipse = {}));
				var o;
				!function (t) {
					t.Enabled = new f("enabled", Css.Settings.Shadows.Drop.Enabled, h.OnOff, ShadowApp.setDropShadowEnabled, [], !1, u.DropShadow),
					t.CropEnabled = new f("cropEnabled", Css.Settings.Shadows.Drop.CropEnabled, h.OnOff, ShadowApp.setDropShadowCropEnabled, [], !1, u.DropShadow),
					t.Opacity = new f("opacity", Css.Settings.Shadows.Drop.Opacity, h.Percent, ShadowApp.setDropShadowOpacity, [], !1, u.DropShadow),
					t.BlurRadius = new f("blurRadius", Css.Settings.Shadows.Drop.BlurRadius, h.Px, ShadowApp.setDropShadowBlurRadius, [], !1, u.DropShadow),
					t.OffsetX = new f("offsetX", Css.Settings.Shadows.Drop.OffsetX, h.Px, ShadowApp.setDropShadowOffsetX, [], !1, u.DropShadow),
					t.OffsetY = new f("offsetY", Css.Settings.Shadows.Drop.OffsetY, h.Px, ShadowApp.setDropShadowOffsetY, [], !1, u.DropShadow)
				}
				(o = t.Drop || (t.Drop = {}));
				var i;
				!function (t) {
					t.Enabled = new f("enabled", Css.Settings.Shadows.Mirror.Enabled, h.OnOff, ShadowApp.setMirrorShadowEnabled, [], !1, u.MirrorShadow),
					t.Opacity = new f("opacity", Css.Settings.Shadows.Mirror.Opacity, h.Percent, ShadowApp.setMirrorShadowOpacity, [], !1, u.MirrorShadow),
					t.Height = new f("height", Css.Settings.Shadows.Mirror.Height, h.Px, ShadowApp.setMirrorShadowHeight, [], !1, u.MirrorShadow)
				}
				(i = t.Mirror || (t.Mirror = {}));
				var r;
				!function (t) {
					t.Enabled = new f("enabled", Css.Settings.Shadows.Perspective.Enabled, h.OnOff, ShadowApp.setPerspectiveShadowEnabled, [], !1, u.PerspectiveShadow),
					t.Opacity = new f("opacity", Css.Settings.Shadows.Perspective.Opacity, h.Percent, ShadowApp.setPerspectiveShadowOpacity, [], !1, u.PerspectiveShadow),
					t.OpacityScale = new f("opacityScale", Css.Settings.Shadows.Perspective.OpacityScale, h.Percent, ShadowApp.setPerspectiveShadowOpacityScale, [], !1, u.PerspectiveShadow),
					t.BlurRadius = new f("blurRadius", Css.Settings.Shadows.Perspective.BlurRadius, h.Px, ShadowApp.setPerspectiveShadowBlurRadius, [], !1, u.PerspectiveShadow),
					t.BlurRadiusScale = new f("blurRadiusScale", Css.Settings.Shadows.Perspective.BlurRadiusScale, h.Percent, ShadowApp.setPerspectiveShadowBlurRadiusScale, [], !1, u.PerspectiveShadow)
				}
				(r = t.Perspective || (t.Perspective = {}))
			}
			(s = t.Shadows || (t.Shadows = {}))
		}
		(g = t.Settings || (t.Settings = {}));
		var m;
		!function (t) {
			t.BrushSize = new w(Css.SettingsGroups.BrushSize, [g.BrushSize]),
			t.MaxNumMegapixels = new w(Css.SettingsGroups.MaxNumMegapixels, [g.MaxNumMegapixels]),
			t.BackgroundColor = new w(Css.SettingsGroups.BackgroundColor, [g.BackgroundColor]),
			t.CropMode = new w(Css.SettingsGroups.Crop.Mode, [g.Crop.Mode, g.Crop.AspectRatio, g.Crop.TargetSize, g.Crop.AllowEnlarging]),
			t.CropFitToResult = new w(Css.SettingsGroups.Crop.FitToResult, [g.Crop.FitToResult, g.Crop.PaddingMils, g.Crop.PaddingPixels, g.Crop.MarginUnits, g.Crop.ObjectSize, g.Crop.VerticalAlignment, g.Crop.Shadows]),
			t.OutputDpi = new w(Css.SettingsGroups.Crop.Dpi, [g.Crop.OutputDpi]),
			t.Colors = new w(Css.SettingsGroups.Colors.AutoLevels, [g.Colors.AutoLevels]),
			t.OutputColorSpace = new w(Css.SettingsGroups.Colors.ColorSpace, [g.Colors.OutputColorSpace]),
			t.JpegQuality = new w(Css.SettingsGroups.ExportOptions.JpegQuality, [g.ExportOptions.JpegQuality]),
			t.OpaqueFileFormat = new w(Css.SettingsGroups.ExportOptions.OpaqueFileFormat, [g.ExportOptions.OpaqueFileFormat]),
			t.PngMode = new w(Css.SettingsGroups.ExportOptions.PngMode, [g.ExportOptions.PngMode]),
			t.JpegMode = new w(Css.SettingsGroups.ExportOptions.JpegMode, [g.ExportOptions.JpegMode]),
			t.Edges = new w(Css.SettingsGroups.Edges, [g.Edge.BlurLevel, g.Edge.SmoothingLevel, g.Edge.Offset, g.Edge.UseCornerDetection, g.Edge.UseLocalBlur, g.Edge.UseLocalSmoothing]);
			var e;
			!function (t) {
				t.Ellipse = new w(Css.SettingsGroups.Shadows.Ellipse, [g.Shadows.Ellipse.Strength, g.Shadows.Ellipse.Core]),
				t.Drop = new w(Css.SettingsGroups.Shadows.Drop, [g.Shadows.Drop.Enabled, g.Shadows.Drop.CropEnabled, g.Shadows.Drop.Opacity, g.Shadows.Drop.BlurRadius, g.Shadows.Drop.OffsetX, g.Shadows.Drop.OffsetY]),
				t.Mirror = new w(Css.SettingsGroups.Shadows.Mirror, [g.Shadows.Mirror.Enabled, g.Shadows.Mirror.Opacity, g.Shadows.Mirror.Height]),
				t.Perspective = new w(Css.SettingsGroups.Shadows.Perspective, [g.Shadows.Perspective.Enabled, g.Shadows.Perspective.Opacity, g.Shadows.Perspective.OpacityScale, g.Shadows.Perspective.BlurRadius, g.Shadows.Perspective.BlurRadiusScale])
			}
			(e = t.Shadows || (t.Shadows = {})),
			t.List = [t.BrushSize, t.MaxNumMegapixels, t.BackgroundColor, t.CropMode, t.CropFitToResult, t.OutputDpi, t.JpegQuality, t.OpaqueFileFormat, t.PngMode, t.JpegMode, t.Colors, t.OutputColorSpace, t.Edges, e.Ellipse, e.Drop, e.Mirror, e.Perspective];
			var o = [];
			t.List.forEach(function (t) {
				return o = o.concat(t.children)
			}),
			t.All = new w(Css.SettingsGroups.All, o),
			t.List.push(t.All)
		}
		(m = t.Groups || (t.Groups = {}));
		for (var C = [], y = 0; y < m.List.length; y++)
			for (var v = m.List[y], b = 0; b < v.children.length; b++)
				C.push(v.children[b]);
		t.ensureInitialized = o,
		t.commitSticky = n,
		t.updateDisplay = a;
		var k = !1;
		t.isVisible = l,
		t.show = p,
		t.hide = c
	}
	(StickySettings || (StickySettings = {}));
	var DragUrl;
	!function (t) {
		function e(t, e) {
			t.off("dragstart.DragUrl").on("dragstart.DragUrl", function (t) {
				var o = e();
				o && t.originalEvent.dataTransfer.setData("DownloadURL", o + ":" + this.href)
			})
		}
		function o() {
			$("a[data-dragurl]").on("dragstart", function (t) {
				var e = $(this).data("dragurl");
				e && t.originalEvent.dataTransfer.setData("DownloadURL", e)
			})
		}
		t.attachToLink = e,
		t.attachDecorated = o
	}
	(DragUrl || (DragUrl = {}));
	var App;
	!function (t) {
		function e() {
			$(".navbar").hide(),
			$(".footer").hide(),
			$(".container >").hide(),
			Css.AppWrapper.$().show(),
			$("html").addClass("html-app-mode"),
			ViewPort.main.showing = !0
		}
		function o(t, e, o, i, r) {
			t.reset.$().click(e),
			Util.mouseDownRepeater(t.decrease.$(), o, Y, 5, Undo.push, r),
			Util.mouseDownRepeater(t.increase.$(), i, Y, 5, Undo.push, r)
		}
		function i(t, e, o, i) {
			t.reset.$().click(e),
			t.decrease.$().click(function () {
				o(-i)
			}),
			t.increase.$().click(function () {
				o(i)
			})
		}
		function r(t, e, i, r) {
			o(t, e, i, r, function () {
				M.updateColorLevels(),
				M.sendSetGlobal()
			})
		}
		function s() {
			$("#result-dialog").modal("hide")
		}
		function n() {
			H = ColorsApp,
			d(),
			ColorsApp.show()
		}
		function a() {
			H = CropApp,
			d(),
			CropApp.show()
		}
		function l() {
			H = ShadowApp,
			d(),
			ShadowApp.show()
		}
		function p() {
			H = EditApp,
			d(),
			EditApp.show()
		}
		function c() {
			var c = {
				title: Tr.s("Original"),
				isVisible: !0,
				showOriginal: !0,
				borderRight: !0,
				contextMenuHandler: ContextMenu.showMain
			},
			u = {
				title: Tr.s("Original + Marks"),
				isVisible: !0,
				showOriginal: !0,
				showUserMask: !0,
				showHairMask: window.Globals.UseHair,
				showEyeDropperLoupe: window.Globals.UseHair,
				showSword: !0,
				showBeziers: !0,
				borderRight: !0,
				borderLeft: Const.IncludeOriginal,
				showHoverTool: !0,
				showReviewCursor: !0,
				contextMenuHandler: ContextMenu.showMain
			},
			d = {
				title: Tr.s("Result"),
				isVisible: !0,
				showPreview: !0,
				showFrame: !0,
				showBackground: !0,
				showHairEraserLoupe: window.Globals.UseHair,
				borderLeft: !0,
				clip: !0,
				panModeOnly: !0,
				showHoverTool: !Const.ScreenshotMode,
				showReviewCursor: !0,
				contextMenuHandler: ContextMenu.showMain
			},
			g = [u, d];
			Const.IncludeOriginal && g.unshift(c),
			e(),
			u.filename = M.getFilename(),
			L = M.imageCanvas,
			V = L.width(),
			G = L.height(),
			W = $(".canvas-view"),
			Const.IncludeOriginal && Css.AppView.$().css("width", "1138px"),
			Const.ScreenshotMode && ($("#viewport-debug-group").show(),
				Css.viewport_set.$().click(function () {
					ViewPort.main.fromString($("#viewport-setting").val())
				})),
			ViewPort.main.initialize({
				image: L,
				canvasDiv: Css.AppView.$(),
				viewConfigs: g,
				app: t
			}),
			$("#app-toolbar, #app-bottom-toolbar").mouseover(function () {
				ViewPort.main.releaseTempSelectIfMouseNotDown()
			}),
			$(window).keydown(v),
			$(window).keyup(y);
			var f = ViewPort.main.repeaterDelay;
			Util.mouseDownRepeater(Css.zoom_in.$(), ViewPort.main.animateZoomInAboutCenter, f, 1),
			Util.mouseDownRepeater(Css.zoom_out.$(), ViewPort.main.animateZoomOutAboutCenter, f, 1),
			Css.zoom_to_fit.$().mousedown(function (t) {
				t.shiftKey ? ViewPort.main.zoomToFitTight() : ViewPort.main.animateZoomToFit()
			}),
			Util.mouseDownRepeater(Css.subapp_zoom_in.$(), ViewPort.subViewPort.animateZoomInAboutCenter, f, 1),
			Util.mouseDownRepeater(Css.subapp_zoom_out.$(), ViewPort.subViewPort.animateZoomOutAboutCenter, f, 1),
			Css.subapp_zoom_to_fit.$().mousedown(function (t) {
				t.shiftKey ? ViewPort.subViewPort.zoomToFitTight() : ViewPort.subViewPort.animateZoomToFit()
			}),
			Css.clear_user_mask_tool.$().click(function () {
				M.clearUserMask(),
				ToolMode.is(ToolMode.Sword) && ToolMode.Grab.pick()
			}),
			Css.clear_all_edits.$().click(function () {
				M.clearAllEdits(),
				ToolMode.Grab.pick()
			}),
			Css.clear_hair_mask_tool.$().click(M.clearHairMask);
			for (var S = ["brush-size", "background-color", "blur-offset-smooth", "hair-handling", "rotate", "color-levels", "review-controls"], m = 0; m < S.length; m++) {
				var C = "#" + S[m] + "-button";
				$(C).click(w(C, "#" + S[m] + "-popover"))
			}
			Css.save.$().click(M.checkSaveDrawCommands),
			Css.download.$().click(function () {
				z(),
				M.sendGenerateResult(),
				M.updateSettingsSummary(),
				!window.Globals.Bulk.isIframe && !window.Globals.Bulk.isApi || window.Globals.Bulk.isApiSingle ? Util.modal("#result-dialog") : setTimeout(Util.modal, 500, "#result-dialog")
			}),
			Css.skip.$().click(M.skip),
			Css.undo.$().click(M.tryUndo),
			Css.redo.$().click(M.tryRedo),
			Css.resultDialog.SettingsSummary.ExportOptions.Key.$().click(function () {
				return s(),
				StickySettings.show(Css.PreferencesDialog.ExportOptionsTab),
				!1
			}),
			Css.resultDialog.SettingsSummary.ColorsApp.Key.$().click(function () {
				s(),
				n()
			}),
			Css.resultDialog.SettingsSummary.CropApp.Key.$().click(function () {
				s(),
				a()
			}),
			Css.resultDialog.SettingsSummary.ShadowsApp.Key.$().click(function () {
				s(),
				l()
			}),
			M.hasUser() ? (Css.pre_crop_enabled_checkbox.$().click(M.toggleEnablePreCrop),
				i(Css.MaxNumMegapixels, M.resetMaxNumMegapixels, M.incrementMaxNumMegapixels, 1)) : (Css.pre_crop_enabled_checkbox.$().parent().toggleClass("gray", !0),
				Css.pre_crop_enabled_checkbox.$().toggleClass("disabled", !0).attr("disabled", "disabled"),
				Css.MaxNumMegapixels.increase.$().toggleClass("disabled", !0),
				Css.MaxNumMegapixels.decrease.$().toggleClass("disabled", !0),
				Css.MaxNumMegapixels.reset.$().toggleClass("disabled", !0)),
			i(Css.CropApp.RotateSpinner, M.rotateReset, M.incrementRotateAngleDeg, -90),
			o(Css.CropApp.StraightenSpinner, M.straightenReset, M.straightenCounterclockwise, M.straightenClockwise, M.straightenCommit),
			t.straightenClockwiseRepeater = new KeyRepeater(M.straightenClockwise, 30, 5, Undo.push, M.straightenCommit),
			t.straightenCounterclockwiseRepeater = new KeyRepeater(M.straightenCounterclockwise, 30, 5, Undo.push, M.straightenCommit),
			Css.ColorsApp.ColorCastRemovalEnabled.$().click(M.toggleColorCast),
			Css.colors_app_color_cast_controls.$().toggle(M.settings.removeColorCast),
			Css.ColorsApp.WhiteBalanceEnabled.$().click(M.toggleWhiteBalanceEnabled),
			Css.colors_app_white_balance_controls.$().toggle(M.settings.whiteBalanceEnabled),
			r(Css.ColorsApp.brightness, M.brightnessReset, M.brightnessDecrement, M.brightnessIncrement),
			r(Css.ColorsApp.shadows, M.shadowsReset, M.shadowsDecrement, M.shadowsIncrement),
			r(Css.ColorsApp.highlights, M.highlightsReset, M.highlightsDecrement, M.highlightsIncrement),
			r(Css.ColorsApp.temperature, M.temperatureReset, M.temperatureDecrement, M.temperatureIncrement),
			r(Css.ColorsApp.saturation, M.saturationReset, M.saturationDecrement, M.saturationIncrement),
			r(Css.colorCastForegroundProtection, M.colorCastForegroundProtectionReset, M.colorCastForegroundProtectionDecrement, M.colorCastForegroundProtectionIncrement),
			i(Css.edge.smoothing, M.resetGlobalSmoothingLevel, M.stepGlobalSmoothingLevel, .5),
			i(Css.edge.featheringRadius, M.resetGlobalBlurLevel, M.stepGlobalBlurLevel, .5),
			i(Css.edge.offset, M.resetGlobalOffset, M.stepGlobalOffset, .25),
			o(Css.ExportOptions.JpgQuality, M.jpegQualityReset, M.jpegQualityDecrease, M.jpegQualityIncrease, M.sendSetGlobal),
			Css.ExportOptions.JpgQualityPresets.preset25.$().click(function () {
				return M.setJpegQuality(25, !0)
			}),
			Css.ExportOptions.JpgQualityPresets.preset50.$().click(function () {
				return M.setJpegQuality(50, !0)
			}),
			Css.ExportOptions.JpgQualityPresets.preset75.$().click(function () {
				return M.setJpegQuality(75, !0)
			}),
			Css.ExportOptions.JpgQualityPresets.preset92.$().click(function () {
				return M.setJpegQuality(92, !0)
			}),
			Css.ExportOptions.JpgQualityPresets.preset100.$().click(function () {
				return M.setJpegQuality(100, !0)
			}),
			RadioModule.registerRadioGroup(M.OpaqueFileFormatGroup, function (t) {
				return M.setOpaqueFileFormat(t, !0)
			}),
			RadioModule.registerRadioGroup(M.PngModeGroup, function (t) {
				return M.setPngMode(t, !0)
			}),
			RadioModule.registerRadioGroup(M.JpegModeGroup, function (t) {
				return M.setJpegMode(t, !0)
			}),
			Css.PreferencesDialog.openExportOptions.$().click(function () {
				return StickySettings.show(Css.PreferencesDialog.ExportOptionsTab),
				!1
			}),
			Css.PreferencesDialog.openImportOptions.$().click(function () {
				return StickySettings.show(Css.PreferencesDialog.ImportOptionsTab),
				!1
			}),
			Css.ColorsApp.color_levels_auto.$().click(M.colorLevelsAuto),
			Css.ColorsApp.reset_button.$().click(M.colorLevelsResetAll),
			Css.ColorsApp.color_levels_reset.$().click(M.colorLevelsResetLevels),
			Util.mouseDownRepeater(Css.ReviewSpinner.backward.$(), M.Review.back, 30, 2, Util.empty, Util.empty),
			Util.mouseDownRepeater(Css.ReviewSpinner.forward.$(), M.Review.forward, 30, 2, Util.empty, Util.empty),
			Css.PreferencesDialog.open.$().click(function () {
				return StickySettings.show(null)
			}),
			Css.sticky_settings.$().click(function () {
				return StickySettings.show()
			}),
			Css.sticky_settings_close.$().click(StickySettings.hide),
			Css.show_crop_app_button.$().click(a),
			Css.show_shadow_app_button.$().click(l),
			Css.show_edit_app_button.$().click(p),
			Css.show_colors_app_button.$().click(n),
			h(),
			ToolMode.Background.mask = M.userMask,
			ToolMode.Foreground.mask = M.userMask,
			ToolMode.MaskEraser.mask = M.userMask,
			ToolMode.HairEraser.mask = M.hairMask;
			for (var b = 0; b < ToolMode.PaintHairs.length; b++)
				ToolMode.PaintHairs[b].mask = M.hairMask;
			"create" == M.entryPoint ? ToolMode.Foreground.pick() : (ToolMode.Grab.pick(),
				ToolMode.update(!0)),
			HairPalettes.updatePaletteIndex(ToolMode.PaintHair1),
			ViewPort.main.zoomToFit(!1),
			ViewPort.main.updateSize(),
			ViewPort.main.zoomToFit(!0);
			var k = 30;
			Css.brush_size_button.$().click(function (t) {
				M.setBrushSize(parseInt($(t.currentTarget).data("size")), !0)
			}),
			Util.mouseDownRepeater(Css.BrushSize.decrease.$(), M.decrementBrushSize, k, 5, Undo.push),
			Util.mouseDownRepeater(Css.BrushSize.increase.$(), M.incrementBrushSize, k, 5, Undo.push),
			O = new KeyRepeater(M.decrementBrushSize, 30, 5, Undo.push),
			I = new KeyRepeater(M.incrementBrushSize, 30, 5, Undo.push),
			$(".global-smoothing-level-button").click(function (t) {
				M.setGlobalSmoothingLevel(parseInt($(t.currentTarget).data("level")), !0)
			}),
			$(".global-blur-level-button").click(function (t) {
				M.setGlobalBlurLevel(parseInt($(t.currentTarget).data("level")), !0)
			}),
			$(".background-color-swatch-button").click(function (t) {
				M.setBackgroundColor($(t.currentTarget).data("color"), !0)
			}),
			$(".global-offset-button").click(function (t) {
				M.setGlobalOffset(parseFloat($(t.currentTarget).data("offset")), !0)
			}),
			$(".use-corner-detection-button").click(function (t) {
				M.setUseCornerDetection($(t.currentTarget).data("usecornerdetection"), !0)
			}),
			$(".use-local-blur-button").click(function (t) {
				M.setUseLocalBlur($(t.currentTarget).data("uselocalblur"), !0)
			}),
			$(".use-local-smoothing-button").click(function (t) {
				M.setUseLocalSmoothing($(t.currentTarget).data("uselocalsmoothing"), !0)
			}),
			RadioModule.registerRadioGroup(t.ViewPanesGroup, M.setViewPanesMode),
			Util.addEventListener(Css.ViewPanes.preview.$(), "touchstart", function (t) {
				M.tempPreviewViewPaneToggle(!0),
				t.preventDefault()
			}),
			Util.addEventListener(Css.ViewPanes.preview.$(), "touchend", function (t) {
				M.tempPreviewViewPaneToggle(!1),
				t.preventDefault()
			}),
			Css.ViewPanes.preview.$().hover(function () {
				M.tempPreviewViewPaneToggle(!0)
			}, function () {
				M.tempPreviewViewPaneToggle(!1)
			}),
			M.setBrushSize(M.defaultSettings.brushSize, !1),
			SavedMask.initializeUi(V, G),
			Tutorial.initialize(),
			StickySettings.ensureInitialized()
		}
		function u() {
			ToolMode.releaseTempSelect(),
			ToolMode.Grab.pick(),
			H = null
		}
		function d() {
			if (!X) {
				var t = {
					title: Tr.s("Result"),
					isVisible: !0,
					showPreview: !0,
					showFrame: !0,
					showBackground: !0,
					showHairEraserLoupe: window.Globals.UseHair,
					borderLeft: !0,
					clip: !0,
					panModeOnly: !0,
					showHoverTool: !Const.ScreenshotMode,
					contextMenuHandler: ContextMenu.showMain
				};
				X = !0,
				ViewPort.subViewPort.initialize({
					image: L,
					canvasDiv: $("#subapp-view"),
					showGrid: CropApp.showGrid,
					viewConfigs: [t]
				})
			}
		}
		function h() {
			Undo.canUndo() ? Css.undo.$().removeAttr("disabled") : Css.undo.$().attr("disabled", "disabled"),
			Undo.canRedo() ? Css.redo.$().removeAttr("disabled") : Css.redo.$().attr("disabled", "disabled")
		}
		function g() {
			$(window).on(q, function () {
				N || f(),
				N = !1
			}),
			Css.AppContent.$().on(q, function () {
				ToolMode.getActiveMode() == ToolMode.Grab && (N = !0)
			}),
			Css.popover_toolbar_no_auto_dismiss.$().on(q, function () {
				N = !0
			})
		}
		function f() {
			$(".popover-button").removeClass("active"),
			$(".exclusive-group.popover").hide(),
			N = !1,
			$(window).off(q),
			Css.AppContent.$().off(q),
			Css.popover_toolbar_no_auto_dismiss.$().off(q)
		}
		function w(t, e) {
			return function () {
				var o = $(t),
				i = $(e),
				r = o.hasClass("active");
				return f(),
				r || (o.addClass("active"),
					i.show(),
					"#hair-handling-button" != t && g()),
				ViewPort.main.refreshAllViews(),
				!1
			}
		}
		function S(t) {
			return t != ToolMode.Sword || (M.serverMaskCounts.countForeground > 0 && M.serverMaskCounts.countBackground > 0 || (Util.modal("#red-green-before-sword-dialog", !0),
					!1))
		}
		function m(t, e) {
			W.toggleClass(t, e)
		}
		function C(t) {
			W.removeClass(J).addClass(J = t.cssClass),
			HairPalettes.updatePaletteIndex(t),
			ViewPort.main.refreshAllViews(),
			M.sendSetTool()
		}
		function y(e) {
			if (H)
				return ViewPort.subViewPort.keyUpHandler(e) ? void 0 : (H.keyUpHandler(e),
					void 0);
			switch (ViewPort.main.keyUpHandler(e),
				e.keyCode) {
			case 82:
				t.straightenCounterclockwiseRepeater.up();
				break;
			case 84:
				t.straightenClockwiseRepeater.up();
				break;
			case 87:
				M.tempPreviewViewPaneToggle(!1);
				break;
			case 219:
				O.up();
				break;
			case 221:
				I.up()
			}
		}
		function v(e) {
			if (!e.altKey && !e.metaKey) {
				if (H) {
					if (ViewPort.subViewPort.keyDownHandler(e))
						return;
					if (H.keyDownHandler(e))
						return
				}
				if (!ViewPort.main.keyDownHandler(e) && !e.ctrlKey)
					switch (e.keyCode) {
					case 27:
						ContextMenu.dismiss(),
						f(),
						Sword.mouseCancel(),
						ViewPort.refreshAllViews(),
						Tutorial.hide(),
						Guide.hide(),
						StickySettings.hide(),
						M.Review.reset();
						break;
					case 49:
						M.setViewPanesMode(Const.ViewPanesMarks);
						break;
					case 50:
						M.setViewPanesMode(Const.ViewPanesBoth);
						break;
					case 68:
						M.Review.back();
						break;
					case 70:
						M.Review.forward();
						break;
					case 112:
						Tutorial.toggle(),
						e.preventDefault();
						break;
					case 32:
						ToolMode.select(ToolMode.getSelectedMode() == ToolMode.Background ? ToolMode.Foreground : ToolMode.Background),
						e.preventDefault();
						break;
					case 88:
						ToolMode.select(ToolMode.getSelectedMode() == ToolMode.MaskEraser ? ToolMode.Grab : ToolMode.MaskEraser);
						break;
					case 66:
						M.stepBackgroundColor(e.shiftKey);
						break;
					case 67:
						window.Globals.UseHair && ToolMode.select(ToolMode.getSelectedMode() == ToolMode.HairEraser ? ToolMode.Grab : ToolMode.HairEraser);
						break;
					case 69:
						window.Globals.UseHair && ToolMode.select(ToolMode.getSelectedMode() == ToolMode.ForegroundEyeDropper ? ToolMode.BackgroundEyeDropper : ToolMode.ForegroundEyeDropper);
						break;
					case 86:
						if (window.Globals.UseHair) {
							var o = ToolMode.PaintHairs.indexOf(ToolMode.getSelectedMode());
							if (o >= 0) {
								var i = ToolMode.PaintHairs.length;
								o = e.shiftKey ? (o + i - 1) % i : (o + 1) % i
							} else
								o = HairPalettes.getPaletteIndex();
							ToolMode.select(ToolMode.PaintHairs[o])
						}
						break;
					case 82:
						e.shiftKey ? t.straightenCounterclockwiseRepeater.down() : M.rotateCounterclockwise();
						break;
					case 84:
						e.shiftKey ? t.straightenClockwiseRepeater.down() : M.rotateClockwise();
						break;
					case 87:
						M.tempPreviewViewPaneToggle(!0);
						break;
					case 219:
						O.down();
						break;
					case 221:
						I.down();
						break;
					case 83:
						ToolMode.select(ToolMode.getSelectedMode() == ToolMode.Sword ? ToolMode.Grab : ToolMode.Sword)
					}
			}
		}
		function b(t) {
			if (ToolMode.isNot(ToolMode.Grab) && t == Const.MouseButtonLeft)
				if (ToolMode.is(ToolMode.Sword))
					Sword.mouseDown(ViewPort.main.getMouse_i());
				else {
					var e = ViewPort.main.getMouse_ii();
					M.drawSquare(e.x, e.y, ViewPort.main.diameter())
				}
			ToolMode.is(ToolMode.Foreground) && Guide.strokeGreen(),
			ToolMode.is(ToolMode.Background) && Guide.strokeRed()
		}
		function k(t) {
			ToolMode.is(ToolMode.Sword) && t == Const.MouseButtonLeft && Sword.mouseUp(ViewPort.main.getMouse_i())
		}
		function T() {}
		function x(t, e, o) {
			if (ToolMode.isNot(ToolMode.Grab) && ToolMode.isNot(ToolMode.Sword) && ViewPort.main.getMouseIsDown() && o == Const.MouseButtonLeft) {
				var i = ViewPort.main.getMouse_ii();
				M.drawLine(i.x, i.y, ViewPort.main.diameter())
			}
			ToolMode.is(ToolMode.Sword) && Sword.mouseMove(ViewPort.main.getMouse_i(), ViewPort.main.getZoomScale())
		}
		function A(t) {
			ToolMode.is(ToolMode.Sword) && Sword.mouseWheel(ViewPort.main.getMouse_i(), ViewPort.main.getZoomScale())
		}
		function P(t, e, o, i) {}
		function _(t, e) {}
		function D(t, e) {}
		function R(t, e, o, i) {}
		function E(t) {
			var e = $("#save");
			t == Const.SaveSave ? e.removeClass("disabled").addClass("btn-info") : t == Const.SaveSaving ? e.addClass("disabled").addClass("btn-info") : t == Const.SaveSaved && e.addClass("disabled").removeClass("btn-info")
		}
		function F(t) {
			t == Const.LightUpdated ? Css.download.$().removeAttr("disabled") : Css.download.$().attr("disabled", "disabled"),
			Css.lightState.progress.$().toggle(t == Const.LightProgress),
			Css.lightState.connecting.$().toggle(t == Const.LightConnecting),
			Css.lightState.updating.$().toggle(t == Const.LightUpdating),
			Css.lightState.updated.$().toggle(t == Const.LightUpdated),
			Css.AppView.$().toggleClass("busy", t != Const.LightUpdated)
		}
		function z(t, e) {
			void 0 === t && (t = "Requesting result generation. "),
			void 0 === e && (e = 5),
			Css.resultDialog.WaitingMsg.$().text(t),
			Css.resultDialog.WaitingBar.$().css("width", e + "%"),
			Css.resultDialog.state.$().hide(),
			Css.resultDialog.Waiting.$().show()
		}
		function B(t, e, o) {
			if (Css.resultDialog.state.$().hide(),
				t)
				if (o)
					Css.resultDialog.pushed.$().show();
				else {
					var i = Css.resultDialog.ReadyDownloadLink.$().attr("href", M.downloadUrl(!1));
					DragUrl.attachToLink(i, function () {
						var t = M.result.filename;
						return t ? "image/" + t.substr(t.lastIndexOf(".") + 1) + ":" + t : null
					}),
					Css.resultDialog.ReadyDownloadImage.$().attr("src", M.downloadUrl(!0)),
					Css.resultDialog.ReadyShareLink.$().attr("href", M.shareUrl()),
					Css.resultDialog.Ready.$().show()
				}
			else
				Css.resultDialog.ErrorMsg.$().text(e),
				Css.resultDialog.Error.$().show()
		}
		function U() {
			ViewPort.refreshAllViews()
		}
		var O,
		I,
		L = null,
		V = 0,
		G = 0,
		H = null,
		W = null,
		X = !1,
		N = !1;
		t.ViewPanesGroup = new RadioGroup([new RadioItem(Css.ViewPanes.marks, Const.ViewPanesMarks), new RadioItem(Css.ViewPanes.both, Const.ViewPanesBoth)]);
		var Y = 30;
		t.imageUpdated = c,
		t.subAppHidden = u,
		t.updateUndoRedoState = h,
		Undo.stateUpdated = h;
		var q = "mousedown.popoverToolbar",
		J = "";
		t.toolModeValidate = S,
		t.toggleAllCanvasViewsClass = m,
		t.toolModeChangeHandler = C,
		t.keyUpHandler = y,
		t.keyDownHandler = v,
		t.mouseDownHandler = b,
		t.mouseUpHandler = k,
		t.touchEndHandler = T,
		t.mouseMoveHandler = x,
		t.mouseWheelHandler = A,
		t.drawUnder_c = P,
		t.drawOver_c = _,
		t.drawOver_i = D,
		t.drawUnder_i = R,
		t.setSaveState = E,
		t.setLightState = F,
		t.resultPending = z,
		t.resultReady = B,
		t.refreshAllViews = U
	}
	(App || (App = {}));
	var ContentDisposition;
	!function (t) {
		function e(t) {
			var e = c.exec(t);
			if (!e)
				throw new TypeError("invalid extended field value");
			var r,
			a = e[1].toLowerCase(),
			l = e[2],
			p = l.replace(n, s);
			switch (a) {
			case "iso-8859-1":
				r = o(p);
				break;
			case "utf-8":
				r = i(p);
				break;
			default:
				throw new TypeError("unsupported charset in extended field")
			}
			return r
		}
		function o(t) {
			return String(t).replace(a, "?")
		}
		function i(t) {
			return decodeURIComponent(escape(t))
		}
		function r(t) {
			if (t && "string" == typeof t) {
				var o = u.exec(t);
				if (o) {
					var i,
					r,
					s = o[0].length,
					n = (o[1].toLowerCase(),
						[]),
					a = {};
					try {
						for (s = p.lastIndex = ";" === o[0].substr(-1) ? s - 1 : s; o = p.exec(t); ) {
							if (o.index !== s)
								throw new TypeError("invalid parameter format");
							if (s += o[0].length,
								i = o[1].toLowerCase(),
								r = o[2],
								n.indexOf(i) !== -1)
								throw new TypeError("invalid duplicate parameter");
							n.push(i),
							i.indexOf("*") + 1 !== i.length ? "string" != typeof a[i] && ('"' === r[0] && (r = r.substr(1, r.length - 2).replace(l, "$1")),
								a[i] = r) : (i = i.slice(0, -1),
								r = e(r),
								a[i] = r)
						}
						if (s !== -1 && s !== t.length)
							throw new TypeError("invalid parameter format")
					} catch (t) {}
					return a.filename
				}
			}
		}
		function s(t, e) {
			return String.fromCharCode(parseInt(e, 16))
		}
		var n = /%([0-9A-Fa-f]{2})/g,
		a = /[^\x20-\x7e\xa0-\xff]/g,
		l = /\\([\u0000-\u007f])/g,
		p = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g,
		c = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+\-\.^_`|~])+)$/,
		u = /^([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *(?:$|;)/;
		t.parse = r
	}
	(ContentDisposition || (ContentDisposition = {}));
	var FileDownloader;
	!function (t) {
		function e(t, e) {
			return Util.blobToFile(t, e || "FetchedFromUrl_" + Date.now())
		}
		function o(t) {
			var o = $.extend({}, i, t),
			r = Util.dataUrlToBlob(o.url) || Util.dataUrlToBlob(o.displayUrl);
			if (r)
				setTimeout(function () {
					o.success(e(r))
				}, 0);
			else {
				var s = new XMLHttpRequest,
				n = 0;
				o.progress != Util.empty && (s.onprogress = function (t) {
					if (t.lengthComputable) {
						var e = Math.round(100 * t.loaded / t.total);
						n !== e && (n = e,
							o.progress(n))
					}
				}),
				s.onerror = function (t) {
					o.error(Util.formatXhrError(s, void 0))
				},
				s.onabort = function (t) {
					o.error(Util.formatXhrError(s, "abort"))
				},
				s.withCredentials = !!o.withCredentials,
				s.onload = function (t) {
					if (s.response)
						if (s.status < 200 || s.status > 299) {
							var i = String.fromCharCode.apply(null, new Uint8Array(s.response));
							o.error(Tr.s('Failed to fetch "{0}"', o.displayUrl || o.url) + "\n" + i)
						} else {
							var r = o.contentType || s.getResponseHeader("Content-Type"),
							n = ContentDisposition.parse(s.getResponseHeader("Content-Disposition")),
							a = s.response,
							l = e(new Blob([a], {
										type: r
									}), n);
							o.success(l)
						}
				},
				s.open("GET", o.url, !0),
				s.responseType = "arraybuffer",
				s.send()
			}
		}
		var i = {
			url: "",
			progress: Util.empty,
			error: Util.empty,
			success: Util.empty,
			withCredentials: !1,
			contentType: null
		};
		t.download = o
	}
	(FileDownloader || (FileDownloader = {}));
	var BulkUpload;
	!function (t) {
		function e(t) {
			u || (u = !0,
				Util.modal(Css.Bulk.Upload.Dialog),
				$(document).off("focusin.bs.modal"),
				$(window).on("beforeunload", o),
				w = Css.Bulk.Upload.StartClippingButton.$().attr("href"));
			for (var e = 0, i = 0; i < t.length; i++) {
				var l = t[i],
				p = r(l),
				c = l.name + "_" + l.size;
				window.Globals.SupportedContentTypes.indexOf(l.type) < 0 ? a(p, Tr.s("Unsupported file type: {0}", l.type), !1) : f.add(c) ? (g.push(p),
					e++) : n(p)
			}
			e > 0 && Util.gaTrack("bulk", "upload", null, e),
			s()
		}
		function o() {
			return h.length > 0 || g.length > 0 ? "Uploads still in progress - closing the page will abort them." : void 0
		}
		function i(t, e) {
			var o = r(t);
			o.statusEl.attr("class", "uploading").text(Tr.s("Uploading...")),
			o.progressEl.attr("style", "width: " + e + "%;"),
			100 == e && l(o)
		}
		function r(t) {
			var e = $(document.createElement("tr")),
			o = $(document.createElement("td")),
			i = $(document.createElement("div"));
			i.attr({
				style: "margin-bottom: 0;",
				class: "progress progress-striped"
			}),
			o.append(i);
			var r = $(document.createElement("div"));
			r.attr({
				style: "width: 0;",
				class: "progress-bar"
			}),
			i.append(r);
			var s = $(document.createElement("td"));
			return e.append($(document.createElement("td")).text(t.name)),
			e.append(o),
			e.append(s),
			Css.Bulk.Upload.DialogBodyHeader.$().after(e),
			s.attr("class", "pending").text(Tr.s("Pending...")), {
				file: t,
				tr: e,
				progressContainerEl: o,
				progressEl: r,
				statusEl: s
			}
		}
		function s() {
			if (g.length > 0 && h.length < d) {
				var t = g.shift();
				h.push(t),
				c(t),
				s()
			}
		}
		function n(t) {
			t.progressContainerEl.empty().text(Tr.s("Already queued, ignored")),
			t.statusEl.text(Tr.s("Duplicate")).attr("class", "hair b")
		}
		function a(t, e, o) {
			if (t.progressContainerEl.empty().text(e),
				o) {
				var i = "<span class='bg b'>" + Tr.s("Error") + "</span> <small class='i'>(<a href='#'>" + Tr.s("Retry") + "</a>)</small>";
				t.statusEl.html(i).click(function () {
					return t.statusEl.off("click"),
					t.tr.remove(),
					g.push(r(t.file)),
					s(),
					!1
				}),
				p(t)
			} else
				t.statusEl.text(Tr.s("Error")).attr("class", "bg b")
		}
		function l(t) {
			t.statusEl.text(Tr.s("Ok")).attr("class", "fg b"),
			Css.Bulk.Upload.StartClippingButton.$().attr("class", "btn btn-primary"),
			p(t)
		}
		function p(t) {
			var e = h.indexOf(t);
			e >= 0 && h.splice(e, 1),
			s()
		}
		function c(t) {
			function e(e) {
				a(t, e, !0)
			}
			t.statusEl.attr("class", "uploading").text(Tr.s("Uploading..."));
			var o = t.file;
			CanvasMod.loadImageShrinkAndThumbnail(!0, o, function (e) {
				a(t, e.message || Tr.s("Couldn't read the file"), !1)
			}, function (o, i, r) {
				WebApi.createUserImageSpec(o, i, e, function (s) {
					function n() {
						var e = Math.ceil(.9 * u + .1 * d);
						t.progressEl.attr("style", "width: " + e + "%;")
					}
					function a() {
						if (0 != p && 0 != c) {
							var o = {
								hasImage: p,
								hasThumbnail: c,
								hasDrawCommands: 0
							};
							WebApi.updateMetaData(s.id, s.secret, o, e, function () {
								l(t)
							})
						}
					}
					i = null,
					S < 0 && (S = s.id + 1),
					s.id < S && (S = s.id,
						Css.Bulk.Upload.StartClippingButton.$().attr("href", w + "?minId=" + S));
					var p = 0,
					c = 0,
					u = 0,
					d = 0;
					FileUploader.uploadS3WithRetry(o, s.image, {
						url: window.Globals.s3_url,
						label: Tr.s("Uploading original image"),
						maxAge: 31536e3,
						progress: function (t) {
							u = t,
							n()
						},
						success: function () {
							o = null,
							p = 1,
							a()
						}
					}),
					FileUploader.uploadS3WithRetry(r, s.thumbnail, {
						url: window.Globals.s3_url,
						label: Tr.s("Uploading thumbnail"),
						maxAge: 31536e3,
						progress: function (t) {
							d = t,
							n()
						},
						success: function () {
							r = null,
							c = 1,
							a()
						}
					})
				})
			}, !1)
		}
		var u = !1,
		d = 3,
		h = [],
		g = [],
		f = new HashSet,
		w = null,
		S = -1;
		t.handleNewFiles = e,
		t.simulateEntry = i
	}
	(BulkUpload || (BulkUpload = {}));
	var BulkClip;
	!function (t) {
		function e() {
			k || v.el.contentWindow.focus()
		}
		function o() {
			if (!window.Globals.Bulk.isApi) {
				for (var t = 0, e = 0; e < w.length; e++)
					w[e].hasImage && t++;
				t <= 3 && s()
			}
		}
		function i(t) {
			Css.BulkLoadingErrorMessage.$().text(t),
			h("error")
		}
		function r(t) {
			var e = 0;
			w.length;
			w = w.concat(t.images).sort(function (t, e) {
					return t.id - e.id
				}).filter(function (t) {
					var o = t.id != e;
					return e = t.id,
					o
				}),
			l(!1),
			c(),
			h("ready")
		}
		function s() {
			window.Globals.Bulk.isApi || (h("loading"),
				S.length > 0 && (WebApi.listImagesEx("createdOrUploaded", void 0, void 0, S, window.Globals.Bulk.q, i, r),
					S = [],
					c()),
				WebApi.listImagesEx("createdOrUploaded", P + 1, void 0, [], window.Globals.Bulk.q, i, r))
		}
		function n(t) {
			var e = t.originalEvent;
			e.origin != window.Globals.targetOrigin && "*" != window.Globals.targetOrigin || v.checkHandleEvent(e) || b.checkHandleEvent(e)
		}
		function a() {
			for (; ; ) {
				var t = w.shift();
				if (c(),
					null == t)
					return null;
				if (!A.contains(t.id)) {
					if (t.isShopImage || (_ = !1),
						t.hasImage)
						return t.id > P && (P = t.id),
						A.add(t.id),
						t;
					S.push(t.id),
					c()
				}
			}
		}
		function l(t) {
			v.readyForNextImage && v.setImage(a()),
			b.readyForNextImage && b.setImage(a()),
			t && o(),
			f()
		}
		function p() {
			var t = b;
			b = v,
			v = t,
			u($(b.el)),
			o(),
			f()
		}
		function c() {
			v.updatImagesRemaining(),
			b.updatImagesRemaining()
		}
		function u(t) {
			t.css("z-index", 0)
		}
		function d(t) {
			t.css("z-index", 1001)
		}
		function h(t) {
			if (k) {
				M.toggleClass("loading", "loading" == t),
				M.toggleClass("error", "error" == t);
				var e = "ready" == t && !b.readyForNextImage;
				M.toggleClass("generating", e),
				e ? x.attr("disabled", "true") : x.removeAttr("disabled")
			}
			T = t
		}
		function g() {
			R || (window.checkPostMessage({
					command: Const.Exit
				}),
				R = !0)
		}
		function f() {
			if (v.readyForNextImage && !b.readyForNextImage && b.hasGenerateError)
				return void p();
			if (v.readyForNextImage && b.readyForNextImage && g(),
				v.readyForNextImage)
				u($(v.el)),
				k = !0,
				h(T),
				_ ? Css.bulkClip.hide_for_shop_images.$().hide() : Css.bulkClip.show_for_shop_images.$().hide(),
				d(M),
				M.focus();
			else {
				var t = "/bulk/clip?minId=" + v.getId();
				window.Globals.Bulk.q && (t += "&q=" + window.Globals.Bulk.q),
				history.replaceState({}, "", t),
				d($(v.el)),
				k = !1,
				e(),
				setTimeout(e, 100),
				u(M)
			}
		}
		var w = null,
		S = [],
		m = 0,
		C = 0,
		y = 0,
		v = null,
		b = null,
		M = null,
		k = !0,
		T = null,
		x = null,
		A = new HashSet,
		P = 0,
		_ = !0,
		D = function () {
			function t(t) {
				this.elemId = t,
				this.numRemaining = 0,
				this.other = null,
				this.el = document.getElementById(t),
				this.contentWindow = this.el.contentWindow,
				this.image = {
					id: -1,
					secret: "unknown"
				},
				this.readyForNextImage = !0,
				this.wantsStep = !1,
				this.hasGenerated = !1,
				this.hasSaved = !1,
				this.hasGenerateError = !1,
				this.exitOnSave = !1
			}
			return t.prototype.checkHandleEvent = function (t) {
				if (t.source == this.contentWindow) {
					var o = JSON.parse(t.data);
					switch (o.command) {
					case Const.DocumentReady:
					case Const.Booted:
						e();
						break;
					case Const.Skip:
						y++,
						this.wantsStep = !0,
						this.hasGenerated = !0,
						this.hasGenerateError = !1,
						this.hasSaved = o.saved,
						p(),
						this.checkStepImageForThisIframe();
						break;
					case Const.GenerateResult:
						C++,
						this.wantsStep = !0,
						this.hasGenerated = !1,
						this.hasGenerateError = !1,
						this.hasSaved = o.saved,
						p();
						break;
					case Const.MaybeSaved:
						this.hasSaved = o.saved,
						this.checkStepImageForThisIframe(),
						this.hasSaved && this.exitOnSave && this.doExit();
						break;
					case Const.SavedAndResultReady:
						window.checkPostMessage(o),
						this.hasGenerated = o.success,
						this.hasSaved = o.saved,
						this.hasGenerateError = !o.success,
						this.checkStepImageForThisIframe();
						break;
					case Const.Exiting:
						this.other.contentWindow.M && this.other.contentWindow.M.checkSaveDrawCommands();
						break;
					case Const.Exit:
						o.isNice && this.other.contentWindow.M && this.other.contentWindow.M.hasUnsavedChanges() ? this.other.exitOnSave = !0 : this.doExit()
					}
					return (o.error || o.command == Const.Error) && (window.checkPostMessage(o),
						this.wantsStep = this.hasGenerated = this.hasSaved = !1,
						this.readyForNextImage = !0,
						this.checkStepImageForThisIframe()),
					!0
				}
				return !1
			},
			t.prototype.doExit = function () {
				this.contentWindow.M.unhookBeforeunload(),
				this.other.contentWindow.M && this.other.contentWindow.M.unhookBeforeunload(),
				window.Globals.Bulk.isApi ? g() : HtmlHistory.exit()
			},
			t.prototype.checkStepImageForThisIframe = function () {
				this.wantsStep && this.hasGenerated && this.hasSaved ? (this.wantsStep = this.hasGenerated = this.hasSaved = !1,
					this.readyForNextImage = !0,
					l(!1)) : this.hasGenerateError && f()
			},
			t.prototype.setImage = function (t) {
				t && (this.wantsStep = !1,
					this.readyForNextImage = !1,
					this.hasGenerateError = !1,
					this.image = t,
					this.contentWindow.location.replace(this.getUrl()),
					this.updatImagesRemaining())
			},
			t.prototype.getId = function () {
				return this.image.id
			},
			t.prototype.getUrl = function () {
				return "/bulk/iframe/" + this.image.id + "/" + this.image.secret + (window.Globals.Bulk.isApi ? "?api=true" : "")
			},
			t.prototype.updatImagesRemaining = function () {
				this.contentWindow && this.contentWindow.M && this.contentWindow.M.setBulkImagesRemaining(m, C, y, m - C - y)
			},
			t
		}
		();
		$(document).ready(function () {
			if (window.Globals.Bulk.isClip) {
				$(window).on("message", n),
				w = window.Globals.Bulk.ClipImages,
				m = w.length,
				setInterval(c, 2e3),
				v = new D("bulk-iframe-0"),
				b = new D("bulk-iframe-1"),
				b.other = v,
				v.other = b,
				M = Css.BulkStatus.$(),
				x = Css.bulk_download_button.$(),
				P = window.Globals.Bulk.MinId,
				l(!1);
				var t = "/bulk";
				window.Globals.Bulk.q && (t += "?q=" + window.Globals.Bulk.q),
				HtmlHistory.exitHref = t,
				$("html").addClass("html-app-mode")
			}
		});
		var R = !1;
		window.bulkUpdateImages = s
	}
	(BulkClip || (BulkClip = {}));
	var BulkDownload;
	!function (t) {
		function e() {
			Css.Bulk.Download.Dialog.state.$().hide(),
			Css.Bulk.Download.Dialog.Progress.$().css("width", "70%"),
			Css.Bulk.Download.Dialog.Waiting.$().show()
		}
		function o() {
			Css.Bulk.Download.Dialog.state.$().hide(),
			Css.Bulk.Download.Dialog.Ready.$().show()
		}
		function i(t, e, o) {
			function i(t) {
				r.toggle("waiting" == t),
				a.toggle("ready" == t),
				l.toggle("error" == t),
				s.toggle("empty" == t),
				d.toggle("single" == t)
			}
			if (!window.GlobalsEx.Bulk_isAllowed)
				return void alert(Tr.s("Please subscribe to a Bulk Clipping plan first, thanks!"));
			window.Globals.Bulk.MinId = t;
			var r = Css.Bulk.Download.Dialog.Waiting.$(),
			s = Css.Bulk.Download.Dialog.Empty.$(),
			n = Css.Bulk.Download.Dialog.Progress.$(),
			a = Css.Bulk.Download.Dialog.Ready.$(),
			l = Css.Bulk.Download.Dialog.Error.$(),
			p = Css.Bulk.Download.Dialog.ErrorMsg.$(),
			c = null,
			u = Css.Bulk.Download.Dialog.DownloadLink.$();
			DragUrl.attachToLink(u, function () {
				return c ? "application/zip:" + c : null
			});
			var d = Css.Bulk.Download.Dialog.Single.$(),
			h = Css.Bulk.Download.Dialog.SingleDownloadLink.$(),
			g = null,
			f = !1;
			n.css("width", "0%"),
			i("waiting"),
			Util.modal(Css.Bulk.Download.Dialog.Dialog.css()),
			WebApi.listImagesEx(e ? "generated" : "generatedButNotDownloaded", t, e, [], o, function (t) {
				p.text(t),
				i("error")
			}, function (t) {
				function e() {
					return WebApi.getWorkerUrl("/bulk/websocket", {})
				}
				function o() {
					var t = e();
					g = new YoWebSocket({
							url: function () {
								return t
							},
							connectedToNewServer: Util.empty,
							disconnectedFromServer: function () {
								return !0
							},
							newMessageFromServer: s,
							sendOnOpen: {
								email: window.GlobalsEx.email,
								images: a
							},
							label: Tr.s("Connect to worker"),
							closeReasonToMessage: function (t) {
								switch (t) {
								case "3":
									return Tr.s("Invalid input");
								case "-1":
									return Tr.s("Internal server error");
								default:
									return Tr.s("Timeout or worker termination")
								}
							},
							unableToConnectMessage: Tr.s("Unable to connect to the worker. Is your firewall or proxy blocking WebSockets?"),
							unexpectedCloseMessage: Tr.s("Download server closed connection prematurely."),
							sendFailedMessage: Tr.s("Failed to send message to worker, closing connection and retrying. "),
							customOnError: function (t) {
								return r(t),
								!1
							}
						})
				}
				function r(t) {
					f || (p.text(t),
						i("error"))
				}
				function s(t) {
					t.error ? r(t.error.message) : t.progress ? n.css("width", t.progress + "%") : t.url ? (u.attr("href", t.url),
						c = t.filename,
						i("ready"),
						f = !0,
						Util.gaTrack("bulk", "download", null, a.length)) : t.redirectUrl ? (location.href = Router.redirectUrl(t.redirectUrl, t.kind, t.message),
						f = !0) : t.empty && (i("empty"),
						f = !0)
				}
				var a = t.images;
				if (0 == a.length)
					i("empty");
				else if (1 == a.length) {
					Util.gaTrack("bulk", "download", null, a.length);
					var l = a[0];
					h.attr("href", Router.downloadUrl(l.id, l.secret)),
					i("single")
				} else
					o()
			})
		}
		t.simulateProgress = e,
		t.simulateReady = o,
		$(document).ready(function () {
			Css.bulk_download_button.$().click(function () {
				i(window.Globals.Bulk.MinId, void 0, window.Globals.Bulk.q)
			})
		}),
		window.bulkDownload = i
	}
	(BulkDownload || (BulkDownload = {}));
	var ScrollCrop;
	!function (t) {
		function e() {
			0 !== Css.scroll_crop.$().length && (Css.scroll_crop.$().each(function () {
					var t = $(this);
					t.css("clip", o(t, 0))
				}),
				$(window).on("resize.ScrollCrop scroll.ScrollCrop", r),
				r())
		}
		function o(t, e) {
			return "rect(0px, " + (t.width() + 1) + "px, " + e + "px, 0px)"
		}
		function i(t) {
			function e() {
				var r = Date.now(),
				l = Util.clamp((r - i) / s, 0, 1),
				p = t.height() * l,
				c = l < 1 ? o(t, p) : "";
				t.css("clip", c),
				a && (l < 1 ? a.css("top", p + "px") : a.hide()),
				l < 1 && setTimeout(e, n)
			}
			t.removeClass(Css.scroll_crop.name());
			var i = Date.now(),
			r = t.data("scroll-crop-companion"),
			a = r ? $(r) : null;
			a && a.show(),
			setTimeout(e, n)
		}
		function r() {
			var t = $(document).scrollTop() + .7 * $(window).height(),
			e = Css.scroll_crop.$(!0);
			0 == e.length ? $(window).off(".ScrollCrop") : e.each(function () {
				var e = $(this);
				t > e.offset().top && i(e)
			})
		}
		t.checkInit = e;
		var s = 350,
		n = 16
	}
	(ScrollCrop || (ScrollCrop = {}));
	var Streamlex2;
	!function (t) {
		function e(t) {
			function e(t, e) {
				i.push(encodeURIComponent(t) + "=" + encodeURIComponent(e))
			}
			function o(t, i) {
				if ($.isArray(i))
					$.each(i, function (e, i) {
						o(t + "[" + e + "]", i)
					});
				else if ("object" == $.type(i))
					for (var r in i)
						i.hasOwnProperty(r) && o(t + "." + r, i[r]);
				else
					e(t, i)
			}
			var i = [];
			e(merchantJs.localeQueryParameter, merchantJs.locale);
			for (var r in t)
				t.hasOwnProperty(r) && o(r, t[r]);
			return i.join("&").replace(" ", "+")
		}
		function o(t) {
			return function (e, o, i) {
				t({
					error: {
						message: Util.formatXhrError(e, o)
					}
				})
			}
		}
		function i() {
			return merchantJs.settings.host + "/payments/v0/preapprovals/" + merchantJs.settings.wud + "/"
		}
		function r(t, r) {
			var s = i() + "payment_method?" + e(t);
			$.ajax(s, {
				dataType: "jsonp",
				timeout: 15e3,
				success: function (t) {
					r(t)
				},
				error: o(r)
			})
		}
		function s(t, e, o, i) {
			i.error ? e(i) : (o(),
				r({
					processor: "stripe",
					processorToken: i,
					preapprovalSpec: t
				}, e))
		}
		function n(t, e, o, i) {
			Stripe.setPublishableKey(merchantJs.settings.stripePublishableKey),
			Stripe.createToken(t, function (t, r) {
				s(e, o, i, r)
			})
		}
		function a(t, e) {
			r({
				processor: "invoice",
				preapprovalSpec: t
			}, e)
		}
		function l() {
			Css.merchant.PaymentError.$().hide(),
			Css.merchant.StripePaymentError.$().hide(),
			Css.merchant.PaymentMethodFormSubmit.$().attr("disabled", "disabled")
		}
		function p() {
			Css.merchant.PaymentMethodFormSubmit.$().removeAttr("disabled")
		}
		function c(t) {
			Css.merchant.PaymentError.$().html(t).show(),
			p()
		}
		function u() {
			Css.merchant.StripePaymentError.$().show(),
			p()
		}
		function d() {
			Css.merchant.ShowWhenMinibrowsing.$().modal("hide"),
			Css.merchant.ShowWhenCreatingPm.$().modal("show")
		}
		function h(t) {
			Css.merchant.ShowWhenMinibrowsing.$().modal("hide"),
			Css.merchant.ShowWhenCreatingPm.$().modal("hide"),
			null === t ? c("Got a null response from the server") : t.error ? c(t.error.message) : (Css.merchant.ShowWhenSubmitting.$().modal("show"),
				M({
					streamlexPaymentToken: t.paymentMethod.streamlexPaymentToken,
					defaultPaymentMethod: b
				}))
		}
		function g(t, e, o) {
			t.$().payment(e).change(function () {
				var e = $(this).val(),
				i = !e && v.allowEmpty,
				r = o(e);
				$(t.css() + "-group").toggleClass("has-success", r && !i).toggleClass("has-error", !r && !i),
				v[t.css()] = r
			}).change()
		}
		function f() {
			if (v.allowEmpty = !1,
				Css.merchant.CardNumber.$().change(),
				Css.merchant.CardExpiration.$().change(),
				Css.merchant.CardCvc.$().change(),
				v.allowEmpty = !0,
				v[Css.merchant.CardNumber.css()] && v[Css.merchant.CardExpiration.css()] && v[Css.merchant.CardCvc.css()]) {
				var t = $.payment.cardExpiryVal(Css.merchant.CardExpiration.$().val());
				n({
					name: Css.merchant.CardName.$().val(),
					number: Css.merchant.CardNumber.$().val(),
					cvc: Css.merchant.CardCvc.$().val(),
					exp_month: t.month,
					exp_year: t.year,
					address_zip: Css.merchant.CardZip.$().val()
				}, merchantJs.preapprovalSpec, h, d),
				Css.merchant.ShowWhenCreatingPm.$().modal("show")
			} else
				v[Css.merchant.CardNumber.css()] ? v[Css.merchant.CardExpiration.css()] ? Css.merchant.CardCvc.$().focus() : Css.merchant.CardExpiration.$().focus() : Css.merchant.CardNumber.$().focus(),
				setTimeout(u, 100)
		}
		function w(t) {
			M = t;
			var e = $("input[type=radio][name=paymentMethod]");
			e.change(function () {
				Css.merchant.StripePaymentMethodForm.$().toggle(Css.merchant.RadioStripe.$().prop("checked"))
			}),
			$("#paymentMethod_" + merchantJs.defaultPaymentMethod).prop("checked", !0).change(),
			Css.merchant.AcceptTermsWrapper.$().removeClass(Css.merchant.has_error.name()),
			Css.merchant.InitializingIndicator.$().hide(),
			Css.merchant.SubmitSection.$().show(),
			g(Css.merchant.CardNumber, "formatCardNumber", $.payment.validateCardNumber),
			g(Css.merchant.CardExpiration, "formatCardExpiry", function (t) {
				return $.payment.validateCardExpiry($.payment.cardExpiryVal(t))
			}),
			g(Css.merchant.CardCvc, "formatCardCVC", function (t) {
				return $.payment.validateCardCVC(t, $.payment.cardType(Css.merchant.CardNumber.$().val()))
			}),
			Css.merchant.PaymentMethodForm.$().submit(function () {
				if (!Css.merchant.AcceptTerms.$().prop("checked"))
					return Css.merchant.AcceptTermsWrapper.$().addClass(Css.merchant.has_error.name()),
					!1;
				switch (Css.merchant.AcceptTermsWrapper.$().removeClass(Css.merchant.has_error.name()),
					l(),
					b = $("input[type=radio][name=paymentMethod]:checked").val() || "stripe") {
				case "stripe":
					f();
					break;
				case "paypal":
					Css.merchant.ShowWhenMinibrowsing.$().modal("show"),
					C(merchantJs.preapprovalSpec, h, d);
					break;
				case "invoice":
					Css.merchant.ShowWhenSubmitting.$().modal("show"),
					a(merchantJs.preapprovalSpec, h);
					break;
				case "fake":
					merchantJs.settings.isTesting && (Css.merchant.ShowWhenMinibrowsing.$().modal("show"),
						y(merchantJs.preapprovalSpec, h, d));
					break;
				default:
					Css.merchant.ShowWhenSubmitting.$().modal("show"),
					t({
						streamlexPaymentToken: b,
						defaultPaymentMethod: b
					})
				}
				return !1
			}),
			"undefined" == typeof Stripe ? (l(),
				Css.merchant.FailedToLoadStripeJs.$().show()) : p()
		}
		var S;
		!function (t) {
			t[t.paypal = 0] = "paypal",
			t[t.fake = 1] = "fake"
		}
		(S || (S = {}));
		var m;
		!function (t) {
			function s() {
				c && (u && (clearInterval(u),
						u = null),
					c.close(),
					c = null)
			}
			function n() {
				s(),
				c = window.open("", "_blank"),
				c.document.write("<h3>Loading...</h3>")
			}
			function a(t, r, s) {
				n();
				var a = i() + S[t] + "?" + e(r);
				$.ajax(a, {
					dataType: "jsonp",
					timeout: 15e3,
					success: function (t) {
						s(t)
					},
					error: o(s)
				})
			}
			function l(t, e) {
				c && (c.location.href = t,
					c.focus(),
					u = setInterval(function () {
							c.closed && (clearInterval(u),
								u = null,
								e())
						}, 100))
			}
			function p(t) {
				return function (e, o, i) {
					a(t, e, function (t) {
						!t || t.error ? (s(),
							o(t)) : l(t.preapproval.processorToken.url, function () {
							i(),
							r(t.preapproval, o)
						})
					})
				}
			}
			var c = null,
			u = null;
			t.handler = p
		}
		(m || (m = {}));
		var C = m.handler(S.paypal),
		y = m.handler(S.fake),
		v = {
			allowEmpty: !0
		},
		b = "stripe",
		M = null;
		$(function () {
			"undefined" != typeof merchantJs && (w(function (t) {
					Css.merchant.StreamlexPaymentToken.$().val(t.streamlexPaymentToken),
					Css.merchant.DefaultPaymentMethod.$().val(t.defaultPaymentMethod),
					Css.merchant.PaymentForm.$().submit()
				}),
				$(window).load(function () {
					(new Image).src = "https://api.stripe.com/healthcheck",
					(new Image).src = "https://www.paypal.com/home"
				}))
		})
	}
	(Streamlex2 || (Streamlex2 = {}));
	var MissingFeatures;
	!function (t) {
		function e() {
			function t(t, e) {
				t || a.push(e)
			}
			function e(e, o) {
				try {
					t(e(), o)
				} catch (e) {
					t(!1, o)
				}
			}
			function o() {
				var t = document.createElement("canvas");
				return !(!t.getContext || !t.getContext("2d"))
			}
			function i() {
				var t = document.createElement("div");
				return "draggable" in t || "ondragstart" in t && "ondrop" in t
			}
			function r() {
				return "undefined" != typeof Uint32Array && "undefined" != typeof Uint8Array && "undefined" != typeof new Uint8Array(2).set
			}
			function s() {
				var t = document.createElement("canvas");
				t.width = 1,
				t.height = 1;
				var e = t.getContext("2d").getImageData(0, 0, 1, 1).data,
				o = new Int32Array(e.buffer);
				return o.length > 0
			}
			function n() {
				return !!new Blob
			}
			var a = [];
			return e(o, "HTML5 Canvas"),
			t("undefined" != typeof WebSocket, "WebSockets"),
			e(i, "HTML5 Drag-and-Drop"),
			t("undefined" != typeof URL, "window.URL Support"),
			t("undefined" != typeof XMLHttpRequest, "XML Http Requests"),
			e(r, "Native Type Arrays"),
			e(s, "ImageData.data is not a Uint8ClampedArray"),
			t(!(!window.history || !window.history.pushState), "HTML5 History"),
			t("undefined" != typeof Worker, "Web Workers"),
			t(!!Date.now, "Date.now()"),
			e(n, "Blob and/or Blob Constructor"),
			a.sort(),
			a
		}
		t.list = e
	}
	(MissingFeatures || (MissingFeatures = {}));
	var TutorialScreenshots;
	!function (t) {
		function e() {
			for (var t = 0; t < o.length; t++)
				o[t].update()
		}
		var o = [],
		i = function () {
			function t(t) {
				var e = this;
				this.iframe = t,
				this.initialized = !1,
				this.$iframe = $(t),
				this.$iframe.load(function () {
					e.initialize(),
					setTimeout(function () {
						e.initialize()
					}, 100)
				})
			}
			return t.prototype.initialize = function () {
				this.oh = this.iframe.contentDocument.body.offsetHeight,
				this.ow = this.iframe.contentDocument.body.offsetWidth;
				var t = 100 * this.oh / this.ow + "%";
				this.$iframe.parent().css({
					paddingBottom: t
				}),
				this.initialized = !0,
				this.update()
			},
			t.prototype.update = function () {
				if (this.initialized) {
					var t = (this.$iframe.width() / this.ow).toString(),
					e = "scale(" + t + ")";
					this.iframe.contentWindow.document.body.style.transform = e
				}
			},
			t
		}
		();
		$(function () {
			Css.TutorialScreenshots.iframe.$().each(function () {
				o.push(new i(this))
			}),
			o.length > 0 && $(window).resize(e)
		})
	}
	(TutorialScreenshots || (TutorialScreenshots = {}));
	var Main;
	!function (t) {
		function e() {
			var t = !window.Globals.Bulk.isUpload || window.GlobalsEx.Bulk_isAllowed;
			if (null == l) {
				if (l = MissingFeatures.list(),
					l.length > 0) {
					for (var e = "<h1>" + Tr.s("Unsupported Browser") + "</h1><p>" + Tr.s("Terribly sorry, but your browser appears to be missing key feature(s) required to use this website:") + "</p><ul>", o = 0; o < l.length; o++)
						e += "<li>" + l[o] + "</li>";
					e += "</ul>",
					e += "<div>" + Tr.s("Please try the latest version of one of these browsers instead: <b>{0}, {1}, {2}</b>.", '<a href="' + Const.BrowserChromeUrl + '">Chrome</a>', '<a href="' + Const.BrowserFirefoxUrl + '">Firefox</a>', '<a href="' + Const.BrowserMicrosoftEdgeUrl + '">Microsoft Edge</a>') + "</div>",
					$("#modernizr-alert").html(e).slideDown(500)
				}
				0 == l.length && t || ($("body").addClass("cannot-run-app"),
					$(".app-starter").attr("disabled", "disabled").addClass("disabled"))
			} else
				l.length > 0 && ($("html, body").scrollTop(0),
					Util.blink("#modernizr-alert"));
			return 0 == l.length && t && $("#app").length > 0
		}
		function o(t, e, o) {
			M.appHasAlreadyRun || (n(),
				window.Globals.SupportedContentTypes.indexOf(t.type.toLowerCase()) < 0 ? Util.fatalErrorStr(Tr.s('Sorry, only {0} files are supported - the browser categorized your file as "{1}".', window.Globals.SupportedExtensions.join(", "), t.type)) : (Util.gaTrack("image", "uploaded"),
					Util.spinner(!0),
					CanvasMod.loadImageShrinkAndThumbnail(!1, t, function (e) {
						Util.fatalErrorStr(Tr.s('Failed to read image file with name: "{0}", and type: "{1}".', t.name, t.type))
					}, function (t, i, r) {
						WebApi.createUserImageSpec(t, i, Util.fatalError, function (s) {
							Util.spinner(!1),
							M.create(t, i, r, s, e, o),
							p()
						})
					}, !0)))
		}
		function i() {
			return $(window).off("beforeunload"),
			location.reload(!0),
			!1
		}
		function r(t, i, r, s) {
			function a() {
				l && c && (Util.progress(!1),
					o(l, c, p))
			}
			if (!M.appHasAlreadyRun && e()) {
				n(),
				Util.gaTrack("image", "fromUrl", t),
				Util.progress(!0);
				var l = null,
				p = !1,
				c = null;
				r ? Util.fetchJson(r, function (t) {
					c = t || {},
					a()
				}) : (p = !0,
					c = {}),
				FileDownloader.download({
					url: t,
					displayUrl: s,
					progress: Util.progressUpdate,
					error: Util.fatalErrorStr,
					success: function (t) {
						i && Unsafe.set(t, "name", i),
						l = t,
						a()
					}
				})
			}
		}
		function s(t, o) {
			!M.appHasAlreadyRun && e() && (n(),
				Util.gaTrack("image", "resumed"),
				Util.progress(!0),
				WebApi.readUserImageSpec(t, o, Util.fatalErrorStr, function (t) {
					function e() {
						o && i && (Util.progress(!1),
							M.resume(o, t, i),
							p())
					}
					var o = null,
					i = null;
					t.hasDrawCommands > 0 ? Util.fetchJson(t.drawCommands.url, function (t) {
						i = t || {},
						e()
					}) : i = {},
					FileDownloader.download({
						url: t.image.url,
						progress: Util.progressUpdate,
						error: Util.fatalErrorStr,
						success: function (t) {
							Util.loadImageFromBlob(t, Util.fatalError, function (t) {
								o = CanvasModule.flattenImage(t),
								e()
							})
						}
					})
				}))
		}
		function n() {
			clearTimeout(window.webShopRefetch)
		}
		function a(t) {
			window != window.top && window.parent && window.parent.postMessage(JSON.stringify(t), window.Globals.targetOrigin)
		}
		try {
			window.myLocalStorage = window.localStorage || {}
		} catch (t) {
			window.myLocalStorage = {}
		}
		window.M = M,
		Callbacks.M = Unsafe.cast(M),
		Callbacks.App = App,
		M.appHasAlreadyRun = !1;
		var l = null,
		p = null;
		$(document).ready(function () {
			var t = e();
			if (M.setStickySettings(window.GlobalsEx.stickySettings, !1),
				M.initializeMaxNumMegapixels(),
				Css.cancel_upload.$().click(i),
				a(window.Globals.err ? window.Globals.err : {
					command: Const.DocumentReady,
					canRun: t
				}),
				t) {
				ToolMode.initialize();
				var n = FileDropper.initialize({
						monitor_file_input: Css.FileInput.Field,
						monitor_paste: Css.FileInput.PasteTarget,
						monitor_drag: Css.body,
						hover_class: Css.drop_ready,
						error: function (t) {
							alert(t)
						},
						drop: function (t) {
							window.Globals.Bulk.isUpload ? BulkUpload.handleNewFiles(t) : o(t[0], {}, !0)
						},
						dropOnce: !window.Globals.Bulk.isUpload
					});
				p = n.disable,
				HtmlHistory.initialize(),
				"undefined" != typeof window.ResumeImage && s(window.ResumeImage.id, window.ResumeImage.secret),
				UploadFromWeb.initialize(Css.FileInput.UploadFromWeb, function (t) {
					r(Router.fetchUrl(t), void 0, void 0, t)
				}),
				DragUrl.attachDecorated()
			}
		}),
		$(window).load(function () {
			ScrollCrop.checkInit()
		}),
		window.checkPostMessage = a,
		window.resumeUserImage = s,
		window.newImageFromUrl = r
	}
	(Main || (Main = {}));
