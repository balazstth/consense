window.Modernizr=function(e,t,n){function i(e){p.cssText=e}function r(e,t){return typeof e===t}var o,a,s,l="2.8.3",u={},c=!0,f=t.documentElement,d="modernizr",h=t.createElement(d),p=h.style,g=({}.toString,{}),m=[],v=m.slice,y={}.hasOwnProperty;s=r(y,"undefined")||r(y.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(e,t){return y.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=v.call(arguments,1),i=function(){if(this instanceof i){var r=function(){};r.prototype=t.prototype;var o=new r,a=t.apply(o,n.concat(v.call(arguments)));return Object(a)===a?a:o}return t.apply(e,n.concat(v.call(arguments)))};return i});for(var b in g)s(g,b)&&(a=b.toLowerCase(),u[a]=g[b](),m.push((u[a]?"":"no-")+a));return u.addTest=function(e,t){if("object"==typeof e)for(var i in e)s(e,i)&&u.addTest(i,e[i]);else{if(e=e.toLowerCase(),u[e]!==n)return u;t="function"==typeof t?t():t,"undefined"!=typeof c&&c&&(f.className+=" "+(t?"":"no-")+e),u[e]=t}return u},i(""),h=o=null,function(e,t){function n(e,t){var n=e.createElement("p"),i=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function r(e){var t=v[e[g]];return t||(t={},m++,e[g]=m,v[m]=t),t}function o(e,n,i){if(n||(n=t),c)return n.createElement(e);i||(i=r(n));var o;return o=i.cache[e]?i.cache[e].cloneNode():p.test(e)?(i.cache[e]=i.createElem(e)).cloneNode():i.createElem(e),!o.canHaveChildren||h.test(e)||o.tagUrn?o:i.frag.appendChild(o)}function a(e,n){if(e||(e=t),c)return e.createDocumentFragment();n=n||r(e);for(var o=n.frag.cloneNode(),a=0,s=i(),l=s.length;l>a;a++)o.createElement(s[a]);return o}function s(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?o(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var i=r(e);return!y.shivCSS||u||i.hasCSS||(i.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),c||s(e,i),e}var u,c,f="3.7.0",d=e.html5||{},h=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",m=0,v={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,c=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,c=!0}}();var y={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:f,shivCSS:d.shivCSS!==!1,supportsUnknownElements:c,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:l,createElement:o,createDocumentFragment:a};e.html5=y,l(t)}(this,t),u._version=l,f.className=f.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(c?" js "+m.join(" "):""),u}(this,this.document),function(e,t,n){function i(e){return"[object Function]"==m.call(e)}function r(e){return"string"==typeof e}function o(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function s(){var e=v.shift();y=1,e?e.t?p(function(){("c"==e.t?d.injectCss:d.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),s()):y=0}function l(e,n,i,r,o,l,u){function c(t){if(!h&&a(f.readyState)&&(b.r=h=1,!y&&s(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&p(function(){w.removeChild(f)},50);for(var i in k[n])k[n].hasOwnProperty(i)&&k[n][i].onload()}}var u=u||d.errorTimeout,f=t.createElement(e),h=0,m=0,b={t:i,s:n,e:o,a:l,x:u};1===k[n]&&(m=1,k[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){c.call(this,m)},v.splice(r,0,b),"img"!=e&&(m||2===k[n]?(w.insertBefore(f,x?null:g),p(c,u)):k[n].push(f))}function u(e,t,n,i,o){return y=0,t=t||"j",r(e)?l("c"==t?T:C,e,t,this.i++,n,i,o):(v.splice(this.i++,0,e),1==v.length&&s()),this}function c(){var e=d;return e.loader={load:u,i:0},e}var f,d,h=t.documentElement,p=e.setTimeout,g=t.getElementsByTagName("script")[0],m={}.toString,v=[],y=0,b="MozAppearance"in h.style,x=b&&!!t.createRange().compareNode,w=x?h:g.parentNode,h=e.opera&&"[object Opera]"==m.call(e.opera),h=!!t.attachEvent&&!h,C=b?"object":h?"script":"img",T=h?"script":C,N=Array.isArray||function(e){return"[object Array]"==m.call(e)},E=[],k={},S={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};d=function(e){function t(e){var t,n,i,e=e.split("!"),r=E.length,o=e.pop(),a=e.length,o={url:o,origUrl:o,prefixes:e};for(n=0;a>n;n++)i=e[n].split("="),(t=S[i.shift()])&&(o=t(o,i));for(n=0;r>n;n++)o=E[n](o);return o}function a(e,r,o,a,s){var l=t(e),u=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(r&&(r=i(r)?r:r[e]||r[a]||r[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,r,o,a,s):(k[l.url]?l.noexec=!0:k[l.url]=1,o.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(i(r)||i(u))&&o.load(function(){c(),r&&r(l.origUrl,s,a),u&&u(l.origUrl,s,a),k[l.url]=2})))}function s(e,t){function n(e,n){if(e){if(r(e))n||(f=function(){var e=[].slice.call(arguments);d.apply(this,e),h()}),a(e,f,t,0,u);else if(Object(e)===e)for(l in s=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(l)&&(!n&&!--s&&(i(f)?f=function(){var e=[].slice.call(arguments);d.apply(this,e),h()}:f[l]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),h()}}(d[l])),a(e[l],f,t,l,u))}else!n&&h()}var s,l,u=!!e.test,c=e.load||e.both,f=e.callback||o,d=f,h=e.complete||o;n(u?e.yep:e.nope,!!c),c&&n(c)}var l,u,f=this.yepnope.loader;if(r(e))a(e,0,f,0);else if(N(e))for(l=0;l<e.length;l++)u=e[l],r(u)?a(u,0,f,0):N(u)?d(u):Object(u)===u&&s(u,f);else Object(e)===e&&s(e,f)},d.addPrefix=function(e,t){S[e]=t},d.addFilter=function(e){E.push(e)},d.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",f=function(){t.removeEventListener("DOMContentLoaded",f,0),t.readyState="complete"},0)),e.yepnope=c(),e.yepnope.executeStack=s,e.yepnope.injectJs=function(e,n,i,r,l,u){var c,f,h=t.createElement("script"),r=r||d.errorTimeout;h.src=e;for(f in i)h.setAttribute(f,i[f]);n=u?s:n||o,h.onreadystatechange=h.onload=function(){!c&&a(h.readyState)&&(c=1,n(),h.onload=h.onreadystatechange=null)},p(function(){c||(c=1,n(1))},r),l?h.onload():g.parentNode.insertBefore(h,g)},e.yepnope.injectCss=function(e,n,i,r,a,l){var u,r=t.createElement("link"),n=l?s:n||o;r.href=e,r.rel="stylesheet",r.type="text/css";for(u in i)r.setAttribute(u,i[u]);a||(g.parentNode.insertBefore(r,g),p(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};