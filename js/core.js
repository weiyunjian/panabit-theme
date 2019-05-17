/** 北京派网 core.js 2016-03-23 **/
!window.console && (window.console = { log: function () {
    }, warn: function () {
    }, error: function () {
    } });
var $ = window.Simple = function (t) {
    return "string" == typeof t ? document.getElementById(t) : t;
};
$.cookie = { get: function (t) {
        var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return e ? decodeURIComponent(e[2]) : "";
    }, getOrigin: function (t) {
        var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return e ? e[2] : "";
    }, set: function (t, e, i, n, o) {
        var r = new Date;
        o ? (r.setTime(r.getTime() + 36e5 * o), document.cookie = t + "=" + e + "; expires=" + r.toGMTString() + "; path=" + (n ? n : "/") + "; " + (i ? "domain=" + i + ";" : "")) : document.cookie = t + "=" + e + "; path=" + (n ? n : "/") + "; " + (i ? "domain=" + i + ";" : "");
    }, del: function (t, e, i) {
        document.cookie = t + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (i ? i : "/") + "; " + (e ? "domain=" + e + ";" : "");
    }, uin: function () {
        var t = $.cookie.get("uin");
        return t ? parseInt(t.substring(1, t.length), 10) : null;
} }, $.http = { getXHR: function () {
        return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;
    }, ajax: function (url, para, cb, method, type) {
        var xhr = $.http.getXHR();
		xhr.open(method, url);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=gb2312");
		xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml, */*"); 
        return xhr.onreadystatechange = function () {
            if(4 == xhr.readyState) {
				if(xhr.status >= 200 && xhr.status < 300 || 304 === xhr.status || 404 === xhr.status || 1223 === xhr.status  || 0 === xhr.status) {
					if("undefined" == typeof type && xhr.responseText) {
						try  {
							cb(eval("(" + xhr.responseText + ")"));
						} catch (e) {
							cb(xhr.responseText);
						}
					}
					else
						cb(xhr.responseText);
				}
				xhr = null;
			} 
        }, xhr.send(para), xhr;
    }, post: function (t, e, i, n) {
        var o = "";
        for (var r in e)
            o += "&" + r + "=" + e[r];
        return $.http.ajax(t, o.substr(1), i, "POST", n);
    }, get: function (t, e, i, n) {
        var o = [];
        for (var r in e)
            o.push(r + "=" + e[r]);
        return -1 == t.indexOf("?") && (t += "?"), t += o.join("&"), $.http.ajax(t, null, i, "GET", n);
    }, jsonp: function (t) {
        var e = document.createElement("script");
        e.src = t, document.getElementsByTagName("head")[0].appendChild(e);
    }, loadScript: function (t, e) {
        var i = document.createElement("script");
        i.onload = i.onreadystatechange = function () {
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || ("function" == typeof e && e(), i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i));
        }, i.src = t, document.getElementsByTagName("head")[0].appendChild(i);
    }, preload: function (t) {
        var e = document.createElement("img");
        e.src = t, e = null;
} }, $.get = $.http.get, $.post = $.http.post, $.jsonp = $.http.jsonp, $.browser = function (t) {
    if ("undefined" == typeof $.browser.info) {
        var e = { type: "" }, i = navigator.userAgent.toLowerCase();
        /webkit/.test(i) ? e = { type: "webkit", version: /webkit[\/ ]([\w.]+)/ } : /opera/.test(i) ? e = { type: "opera", version: /version/.test(i) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/ } : /msie/.test(i) ? e = { type: "msie", version: /msie ([\w.]+)/ } : /mozilla/.test(i) && !/compatible/.test(i) && (e = { type: "ff", version: /rv:([\w.]+)/ }), e.version = (e.version && e.version.exec(i) || [0, "0"])[1], $.browser.info = e;
    }
    return $.browser.info[t];
}, $.browser.conf = {
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}()
}, $.e = { _counter: 0, _uid: function () {
        return "h" + $.e._counter++;
    }, add: function (t, e, i) {
        if ("object" != typeof t && (t = $(t)), document.addEventListener)
            t.addEventListener(e, i, !1);
        else if (document.attachEvent) {
            if (-1 != $.e._find(t, e, i))
                return;
            var n = function (e) {
                e || (e = window.event);
                var n = { _event: e, type: e.type, target: e.srcElement, currentTarget: t, relatedTarget: e.fromElement ? e.fromElement : e.toElement, eventPhase: e.srcElement == t ? 2 : 3, clientX: e.clientX, clientY: e.clientY, screenX: e.screenX, screenY: e.screenY, altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, keyCode: e.keyCode, data: e.data, origin: e.origin, stopPropagation: function () {
                        this._event.cancelBubble = !0;
                    }, preventDefault: function () {
                        this._event.returnValue = !1;
                    } };
                Function.prototype.call ? i.call(t, n) : (t._currentHandler = i, t._currentHandler(n), t._currentHandler = null);
            };
            t.attachEvent("on" + e, n);
            var o = { element: t, eventType: e, handler: i, wrappedHandler: n }, r = t.document || t, p = r.parentWindow, a = $.e._uid();
            p._allHandlers || (p._allHandlers = {}), p._allHandlers[a] = o, t._handlers || (t._handlers = []), t._handlers.push(a), p._onunloadHandlerRegistered || (p._onunloadHandlerRegistered = !0, p.attachEvent("onunload", $.e._removeAllHandlers));
        }
    }, remove: function (t, e, i) {
        if (document.addEventListener)
            t.removeEventListener(e, i, !1);
        else if (document.attachEvent) {
            var n = $.e._find(t, e, i);
            if (-1 == n)
                return;
            var o = t.document || t, r = o.parentWindow, p = t._handlers[n], a = r._allHandlers[p];
            t.detachEvent("on" + e, a.wrappedHandler), t._handlers.splice(n, 1), delete r._allHandlers[p];
        }
    }, _find: function (t, e, i) {
        var n = t._handlers;
        if (!n)
            return -1;
        for (var o = t.document || t, r = o.parentWindow, p = n.length - 1; p >= 0; p--) {
            var a = n[p], s = r._allHandlers[a];
            if (s.eventType == e && s.handler == i)
                return p;
        }
        return -1;
    }, _removeAllHandlers: function () {
        var t = this;
        for (id in t._allHandlers) {
            var e = t._allHandlers[id];
            e.element.detachEvent("on" + e.eventType, e.wrappedHandler), delete t._allHandlers[id];
        }
    }, src: function (t) {
        return t ? t.target : event.srcElement;
    }, stopPropagation: function (t) {
        t ? t.stopPropagation() : event.cancelBubble = !0;
    }, trigger: function (t, e) {
        var i = { HTMLEvents: "abort,blur,change,error,focus,load,reset,resize,scroll,select,submit,unload", UIEevents: "keydown,keypress,keyup", MouseEvents: "click,mousedown,mousemove,mouseout,mouseover,mouseup" };
        if (document.createEvent) {
            var n = "";
            "mouseleave" == e && (e = "mouseout"), "mouseenter" == e && (e = "mouseover");
            for (var o in i)
                if (i[o].indexOf(e)) {
                    n = o;
                    break;
                }
            var r = document.createEvent(n);
            r.initEvent(e, !0, !1), t.dispatchEvent(r);
        } else
            document.createEventObject && t.fireEvent("on" + e);
} }, $.bom = { query: function (t) {
        var e = window.location.search.match(new RegExp("(\\?|&)" + t + "=([^&]*)(&|$)"));
        return e ? decodeURIComponent(e[2]) : "";
    }, getHash: function (t) {
        var e = window.location.hash.match(new RegExp("(#|&)" + t + "=([^&]*)(&|$)"));
        return e ? decodeURIComponent(e[2]) : "";
} }, $.winName = { set: function (t, e) {
        var i = window.name || "";
        window.name = i.match(new RegExp(";" + t + "=([^;]*)(;|$)")) ? i.replace(new RegExp(";" + t + "=([^;]*)"), ";" + t + "=" + e) : i + ";" + t + "=" + e;
    }, get: function (t) {
        var e = window.name || "", i = e.match(new RegExp(";" + t + "=([^;]*)(;|$)"));
        return i ? i[1] : "";
    }, clear: function (t) {
        var e = window.name || "";
        window.name = e.replace(new RegExp(";" + t + "=([^;]*)"), "");
} }, $.localData = function () {
    function t() {
        var t = document.createElement("link");
        return t.style.display = "none", t.id = o, document.getElementsByTagName("head")[0].appendChild(t), t.addBehavior("#default#userdata"), t;
    }
    function e() {
        if ("undefined" == typeof n)
            if (window.localStorage)
                n = localStorage;
            else
                try  {
                    n = t(), n.load(o);
                } catch (e) {
                    return n = !1, !1;
                }
        return !0;
    }
    function i(t) {
        return "string" != typeof t ? !1 : r.test(t);
    }
    var n, o = "www.panabit.com", r = /^[0-9A-Za-z_-]*$/;
    return { set: function (t, r) {
            var p = !1;
            if (i(t) && e())
                try  {
                    r += "", window.localStorage ? (n.setItem(t, r), p = !0) : (n.setAttribute(t, r), n.save(o), p = n.getAttribute(t) === r);
                } catch (a) {
                }
            return p;
        }, get: function (t) {
            if (i(t) && e())
                try  {
                    return window.localStorage ? n.getItem(t) : n.getAttribute(t);
                } catch (o) {
                }
            return null;
        }, remove: function (t) {
            if (i(t) && e())
                try  {
                    return window.localStorage ? n.removeItem(t) : n.removeAttribute(t), !0;
                } catch (o) {
                }
            return !1;
        } };
}(), $.str = function () {
    var htmlDecodeDict = { quot: '"', lt: "<", gt: ">", amp: "&", nbsp: " ", "#34": '"', "#60": "<", "#62": ">", "#38": "&", "#160": " " }, htmlEncodeDict = { '"': "#34", "<": "#60", ">": "#62", "&": "#38", " ": "#160" };
    return { decodeHtml: function (t) {
            return t += "", t.replace(/&(quot|lt|gt|amp|nbsp);/gi, function (t, e) {
                return htmlDecodeDict[e];
            }).replace(/&#u([a-f\d]{4});/gi, function (t, e) {
                return String.fromCharCode(parseInt("0x" + e));
            }).replace(/&#(\d+);/gi, function (t, e) {
                return String.fromCharCode(+e);
            });
        }, encodeHtml: function (t) {
            return t += "", t.replace(/["<>& ]/g, function (t) {
                return "&" + htmlEncodeDict[t] + ";";
            });
        }, trim: function (t) {
            t += "";
            for (var t = t.replace(/^\s+/, ""), e = /\s/, i = t.length; e.test(t.charAt(--i));)
                ;
            return t.slice(0, i + 1);
        }, uin2hex: function (str) {
            var maxLength = 16;
            str = parseInt(str);
            for (var hex = str.toString(16), len = hex.length, i = len; maxLength > i; i++)
                hex = "0" + hex;
            for (var arr = [], j = 0; maxLength > j; j += 2)
                arr.push("\\x" + hex.substr(j, 2));
            var result = arr.join("");
            return eval('result="' + result + '"'), result;
        }, bin2String: function (t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t.charCodeAt(i).toString(16);
                1 == o.length && (o = "0" + o), e.push(o);
            }
            return e = "0x" + e.join(""), e = parseInt(e, 16);
        }, str2bin: function (str) {
            for (var arr = [], i = 0; i < str.length; i += 2)
                arr.push(eval("'\\x" + str.charAt(i) + str.charAt(i + 1) + "'"));
            return arr.join("");
        }, utf8ToUincode: function (t) {
            var e = "";
            try  {
                var n = t.length, o = [];
                for (i = 0; i < n; i += 2)
                    o.push("%" + t.substr(i, 2));
                e = decodeURIComponent(o.join("")), e = $.str.decodeHtml(e);
            } catch (r) {
                e = "";
            }
            return e;
        }, json2str: function (t) {
            var e = "";
            if ("undefined" != typeof JSON)
                e = JSON.stringify(t);
            else {
                var i = [];
                for (var n in t)
                    i.push('"' + n + '":"' + t[n] + '"');
                e = "{" + i.join(",") + "}";
            }
            return e;
        }, time33: function (t) {
            for (var e = 0, i = 0, n = t.length; n > i; i++)
                e = (33 * e + t.charCodeAt(i)) % 4294967296;
            return e;
        } };
}(), $.css = function () {
    var t = document.documentElement;
    return { getPageScrollTop: function () {
            return window.pageYOffset || t.scrollTop || document.body.scrollTop || 0;
        }, getPageScrollLeft: function () {
            return window.pageXOffset || t.scrollLeft || document.body.scrollLeft || 0;
        }, getOffsetPosition: function (e) {
            e = $(e);
            var i = 0, n = 0;
            if (t.getBoundingClientRect && e.getBoundingClientRect) {
                var o = e.getBoundingClientRect(), r = t.clientTop || document.body.clientTop || 0, p = t.clientLeft || document.body.clientLeft || 0;
                i = o.top + this.getPageScrollTop() - r, n = o.left + this.getPageScrollLeft() - p;
            } else
                do
                    i += e.offsetTop || 0, n += e.offsetLeft || 0, e = e.offsetParent; while(e);
            return { left: n, top: i };
        }, getWidth: function (t) {
            return $(t).offsetWidth;
        }, getHeight: function (t) {
            return $(t).offsetHeight;
        }, show: function (t) {
            t.style.display = "block";
        }, hide: function (t) {
            t.style.display = "none";
        }, hasClass: function (t, e) {
            if (!t.className)
                return !1;
            for (var i = t.className.split(" "), n = 0, o = i.length; o > n; n++)
                if (e == i[n])
                    return !0;
            return !1;
        }, addClass: function (t, e) {
            $.css.updateClass(t, e, !1);
        }, removeClass: function (t, e) {
            $.css.updateClass(t, !1, e);
        }, updateClass: function (t, e, i) {
            for (var n = t.className.split(" "), o = {}, r = 0, p = n.length; p > r; r++)
                n[r] && (o[n[r]] = !0);
            if (e) {
                var a = e.split(" ");
                for (r = 0, p = a.length; p > r; r++)
                    a[r] && (o[a[r]] = !0);
            }
            if (i) {
                var s = i.split(" ");
                for (r = 0, p = s.length; p > r; r++)
                    s[r] && delete o[s[r]];
            }
            var l = [];
            for (var c in o)
                l.push(c);
            t.className = l.join(" ");
        }, setClass: function (t, e) {
            t.className = e;
        } };
}(), $.animate = { fade: function (t, e, i, n, o) {
        if (t = $(t)) {
            t.effect || (t.effect = {});
            var r = Object.prototype.toString.call(e), p = 100;
            isNaN(e) ? "[object Object]" == r && e && e.to && (isNaN(e.to) || (p = e.to), isNaN(e.from) || (t.style.opacity = e.from / 100, t.style.filter = "alpha(opacity=" + e.from + ")")) : p = e, "undefined" == typeof t.effect.fade && (t.effect.fade = 0), window.clearInterval(t.effect.fade);
            var i = i || 1, n = n || 20, a = window.navigator.userAgent.toLowerCase(), s = function (t) {
                var e;
                if (-1 != a.indexOf("msie")) {
                    var i = (t.currentStyle || {}).filter || "";
                    e = i.indexOf("opacity") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) + "" : "100";
                } else {
                    var n = t.ownerDocument.defaultView;
                    n = n && n.getComputedStyle, e = 100 * (n && n(t, null).opacity || 1);
                }
                return parseFloat(e);
            }, l = s(t), c = p > l ? 1 : -1;
            -1 != a.indexOf("msie") && 15 > n && (i = Math.floor(15 * i / n), n = 15);
            var u = function () {
                l += i * c, (Math.round(l) - p) * c >= 0 ? (t.style.opacity = p / 100, t.style.filter = "alpha(opacity=" + p + ")", window.clearInterval(t.effect.fade), "function" == typeof o && o(t)) : (t.style.opacity = l / 100, t.style.filter = "alpha(opacity=" + l + ")");
            };
            t.effect.fade = window.setInterval(u, n);
        }
    }, animate: function (t, e, i, n, o) {
        if (t = $(t)) {
            t.effect || (t.effect = {}), "undefined" == typeof t.effect.animate && (t.effect.animate = 0);
            for (var r in e)
                e[r] = parseInt(e[r]) || 0;
            window.clearInterval(t.effect.animate);
            var i = i || 10, n = n || 20, p = function (t) {
                var e = { left: t.offsetLeft, top: t.offsetTop };
                return e;
            }, a = p(t), s = { width: t.clientWidth, height: t.clientHeight, left: a.left, top: a.top }, l = [], c = window.navigator.userAgent.toLowerCase();
            if (-1 == c.indexOf("msie") || "BackCompat" != document.compatMode) {
                var u = document.defaultView ? document.defaultView.getComputedStyle(t, null) : t.currentStyle, g = e.width || 0 == e.width ? parseInt(e.width) : null, d = e.height || 0 == e.height ? parseInt(e.height) : null;
                "number" == typeof g && (l.push("width"), e.width = g - u.paddingLeft.replace(/\D/g, "") - u.paddingRight.replace(/\D/g, "")), "number" == typeof d && (l.push("height"), e.height = d - u.paddingTop.replace(/\D/g, "") - u.paddingBottom.replace(/\D/g, "")), 15 > n && (i = Math.floor(15 * i / n), n = 15);
            }
            var h = e.left || 0 == e.left ? parseInt(e.left) : null, m = e.top || 0 == e.top ? parseInt(e.top) : null;
            "number" == typeof h && (l.push("left"), t.style.position = "absolute"), "number" == typeof m && (l.push("top"), t.style.position = "absolute");
            for (var f = [], _ = l.length, r = 0; _ > r; r++)
                f[l[r]] = s[l[r]] < e[l[r]] ? 1 : -1;
            var v = t.style, w = function () {
                for (var n = !0, r = 0; _ > r; r++)
                    s[l[r]] = s[l[r]] + f[l[r]] * Math.abs(e[l[r]] - s[l[r]]) * i / 100, (Math.round(s[l[r]]) - e[l[r]]) * f[l[r]] >= 0 ? (n = n && !0, v[l[r]] = e[l[r]] + "px") : (n = n && !1, v[l[r]] = s[l[r]] + "px");
                n && (window.clearInterval(t.effect.animate), "function" == typeof o && o(t));
            };
            t.effect.animate = window.setInterval(w, n);
        }
} }, $.check = { isHttps: function () {
        return "https:" == document.location.protocol;
    }, isSsl: function () {
        var t = document.location.host;
        return /^ssl./i.test(t);
    }, isIpad: function () {
        var t = navigator.userAgent.toLowerCase();
        return /ipad/i.test(t);
    }, isQQ: function (t) {
        return /^[1-9]{1}\d{4,9}$/.test(t);
    }, isQQMail: function (t) {
        return /^[1-9]{1}\d{4,9}@qq\.com$/.test(t);
    }, isNullQQ: function (t) {
        return /^\d{1,4}$/.test(t);
    }, isNick: function (t) {
        return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(t);
    }, isName: function (t) {
        return "" == t ? !1 : /^[a-zA-Z0-9_]{1,16}$/.test(t); ; // /[\u4E00-\u9FA5]{1,8}/.test(t);
    }, isPhone: function (t) {
        return /^(?:86|886|)1\d{10}\s*$/.test(t);
    }, isDXPhone: function (t) {
        return /^(?:86|886|)1(?:33|53|80|81|89)\d{8}$/.test(t);
    }, isSeaPhone: function (t) {
        return /^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(t);
    }, isMail: function (t) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t);
    }, isPassword: function (t) {
        return t && t.length >= 0; // 16
    }, isForeignPhone: function (t) {
        return /^00\d{7,}/.test(t);
    }, is_weibo_appid: function (t) {
        return 46000101 == t || 607000101 == t || 558032501 == t ? !0 : !1;
}}
