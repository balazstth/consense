/**************************************************
 * dom-drag.js
 * 09.25.2001
 * www.youngpup.net
 **************************************************
 * 10.28.2001 - fixed minor bug where events
 * sometimes fired off the handle, not the root.
 **************************************************/

var Drag = {

	obj : null,

	init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
	{
		o.onmousedown	= Drag.start;

		o.hmode			= bSwapHorzRef ? false : true ;
		o.vmode			= bSwapVertRef ? false : true ;

		o.root = oRoot && oRoot != null ? oRoot : o ;

		if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
		if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
		if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
		if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

		o.minX	= typeof minX != 'undefined' ? minX : null;
		o.minY	= typeof minY != 'undefined' ? minY : null;
		o.maxX	= typeof maxX != 'undefined' ? maxX : null;
		o.maxY	= typeof maxY != 'undefined' ? maxY : null;

		o.xMapper = fXMapper ? fXMapper : null;
		o.yMapper = fYMapper ? fYMapper : null;

		o.root.onDragStart	= new Function();
		o.root.onDragEnd	= new Function();
		o.root.onDrag		= new Function();
	},

	start : function(e)
	{
		var o = Drag.obj = this;
		e = Drag.fixE(e);
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		o.root.onDragStart(x, y);

		o.lastMouseX	= e.clientX;
		o.lastMouseY	= e.clientY;

		if (o.hmode) {
			if (o.minX != null)	o.minMouseX	= e.clientX - x + o.minX;
			if (o.maxX != null)	o.maxMouseX	= o.minMouseX + o.maxX - o.minX;
		} else {
			if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
			if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
		}

		if (o.vmode) {
			if (o.minY != null)	o.minMouseY	= e.clientY - y + o.minY;
			if (o.maxY != null)	o.maxMouseY	= o.minMouseY + o.maxY - o.minY;
		} else {
			if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
			if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
		}

		document.onmousemove	= Drag.drag;
		document.onmouseup		= Drag.end;

		return false;
	},

	drag : function(e)
	{
		e = Drag.fixE(e);
		var o = Drag.obj;

		var ey	= e.clientY;
		var ex	= e.clientX;
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		var nx, ny;

		if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
		if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
		if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
		if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

		nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
		ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

		if (o.xMapper)		nx = o.xMapper(y)
		else if (o.yMapper)	ny = o.yMapper(x)

		Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
		Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
		Drag.obj.lastMouseX	= ex;
		Drag.obj.lastMouseY	= ey;

		Drag.obj.root.onDrag(nx, ny);
		return false;
	},

	end : function()
	{
		document.onmousemove = null;
		document.onmouseup   = null;
		Drag.obj.root.onDragEnd(	parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), 
									parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
		Drag.obj = null;
	},

	fixE : function(e)
	{
		if (typeof e == 'undefined') e = window.event;
		if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
		if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
		return e;
	}
};/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
  var bkey = str2binb(key);
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
  return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);
  return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
/*
 * DateFormat.js
 * Formats a Date object into a human-readable string
 *
 * Copyright (C) 2001 David A. Lindquist (http://www.gazingus.org)
 */

Date.MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

Date.DAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday'
];

Date.SUFFIXES = [
  'st','nd','rd','th','th','th','th','th','th','th',
  'th','th','th','th','th','th','th','th','th','th',
  'st','nd','rd','th','th','th','th','th','th','th',
  'st'
];

Date.prototype.format = function( mask ) {
  var formatted     = ( mask != null ) ? mask : 'DD-MMM-YY';
  var letters       = 'DMYHdhmst'.split( '' );
  var temp          = new Array();
  var count         = 0;
  var regexA;
  var regexB        = /\[(\d+)\]/;

  var day           = this.getDay();
  var date          = this.getDate();
  var month         = this.getMonth();
  var year          = this.getFullYear().toString();
  var hours         = this.getHours();
  var minutes       = this.getMinutes();
  var seconds       = this.getSeconds();

  var formats       = new Object();
  formats[ 'D' ]    = date;
  formats[ 'd' ]    = date + Date.SUFFIXES[ date - 1 ];
  formats[ 'DD' ]   = ( date < 10 ) ? '0' + date : date;
  formats[ 'DDD' ]  = Date.DAYS[ day ].substring( 0, 3 );
  formats[ 'DDDD' ] = Date.DAYS[ day ];
  formats[ 'M' ]    = month + 1;
  formats[ 'MM' ]   = ( month + 1 < 10 ) ? '0' + ( month + 1 ) : month + 1;
  formats[ 'MMM' ]  = Date.MONTHS[ month ].substring( 0, 3 );
  formats[ 'MMMM' ] = Date.MONTHS[ month ];
  formats[ 'Y' ]    = ( year.charAt( 2 ) == '0' ) ? year.charAt( 3 ) : year.substring( 2, 4 );
  formats[ 'YY' ]   = year.substring( 2, 4 );
  formats[ 'YYYY' ] = year;
  formats[ 'H' ]    = hours;
  formats[ 'HH' ]   = ( hours < 10 ) ? '0' + hours : hours;  
  formats[ 'h' ]    = ( hours > 12 || hours == 0 ) ? Math.abs( hours - 12 ) : hours;
  formats[ 'hh' ]   = ( formats[ 'h' ] < 10 ) ? '0' + formats[ 'h' ] : formats[ 'h' ];
  formats[ 'm' ]    = minutes;
  formats[ 'mm' ]   = ( minutes < 10 ) ? '0' + minutes : minutes;
  formats[ 's' ]    = seconds;
  formats[ 'ss' ]   = ( seconds < 10 ) ? '0' + seconds : seconds;
  formats[ 't' ]    = ( hours < 12 ) ?  'A' : 'P';
  formats[ 'tt' ]   = ( hours < 12 ) ?  'AM' : 'PM';

  for ( var i = 0; i < letters.length; i++ ) {
    regexA = new RegExp( '(' + letters[ i ] + '+)' );
    while ( regexA.test( formatted ) ) {
      temp[ count ] = RegExp.$1;
      formatted = formatted.replace( RegExp.$1, '[' + count + ']' );
      count++;
    }
  }

  while ( regexB.test( formatted ) ) {
    formatted = formatted.replace( regexB, formats[ temp[ RegExp.$1 ] ] );
  }

  return formatted;
}/*! keydrown - v1.2.2 - 2016-03-23 - http://jeremyckahn.github.com/keydrown */
;(function (window) {

var util = (function () {

  var util = {};

  /**
   * @param {Object} obj The Object to iterate through.
   * @param {function(*, string)} iterator The function to call for each property.
   */
  util.forEach = function (obj, iterator) {
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        iterator(obj[prop], prop);
      }
    }
  };
  var forEach = util.forEach;


  /**
   * Create a transposed copy of an Object.
   *
   * @param {Object} obj
   * @return {Object}
   */
  util.getTranspose = function (obj) {
    var transpose = {};

    forEach(obj, function (val, key) {
      transpose[val] = key;
    });

    return transpose;
  };


  /**
   * Implementation of Array#indexOf because IE<9 doesn't support it.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {number} Index of the found element or -1 if not found.
   */
  util.indexOf = function (arr, val) {
    if (arr.indexOf) {
      return arr.indexOf(val);
    }

    var i, len = arr.length;
    for (i = 0; i < len; i++) {
      if (arr[i] === val) {
        return i;
      }
    }

    return -1;
  };
  var indexOf = util.indexOf;


  /**
   * Push a value onto an array if it is not present in the array already.  Otherwise, this is a no-op.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {boolean} Whether or not the value was added to the array.
   */
  util.pushUnique = function (arr, val) {
    if (indexOf(arr, val) === -1) {
      arr.push(val);
      return true;
    }

    return false;
  };


  /**
   * Remove a value from an array.  Assumes there is only one instance of the
   * value present in the array.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {*} The value that was removed from arr.  Returns undefined if
   * nothing was removed.
   */
  util.removeValue = function (arr, val) {
    var index = indexOf(arr, val);

    if (index !== -1) {
      return arr.splice(index, 1)[0];
    }
  };


  /**
   * Cross-browser function for listening for and handling an event on the
   * document element.
   *
   * @param {string} eventName
   * @param {function} handler
   */
  util.documentOn = function (eventName, handler) {
    if (window.addEventListener) {
      window.addEventListener(eventName, handler, false);
    } else if (document.attachEvent) {
      document.attachEvent('on' + eventName, handler);
    }
  };


  /**
   * Shim for requestAnimationFrame.  See:
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */
  util.requestAnimationFrame = (function () {
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
  })();


  /**
   * An empty function.  NOOP!
   */
  util.noop = function () {};

  return util;

}());

/**
 * Lookup table of keys to keyCodes.
 *
 * @type {Object.<number>}
 */
var KEY_MAP = {
  'A': 65
  ,'B': 66
  ,'C': 67
  ,'D': 68
  ,'E': 69
  ,'F': 70
  ,'G': 71
  ,'H': 72
  ,'I': 73
  ,'J': 74
  ,'K': 75
  ,'L': 76
  ,'M': 77
  ,'N': 78
  ,'O': 79
  ,'P': 80
  ,'Q': 81
  ,'R': 82
  ,'S': 83
  ,'T': 84
  ,'U': 85
  ,'V': 86
  ,'W': 87
  ,'X': 88
  ,'Y': 89
  ,'Z': 90
  ,'ENTER': 13
  ,'SHIFT': 16
  ,'ESC': 27
  ,'SPACE': 32
  ,'LEFT': 37
  ,'UP': 38
  ,'RIGHT': 39
  ,'DOWN': 40
  ,'BACKSPACE': 8
  ,'DELETE': 46
};


/**
 * The transposed version of KEY_MAP.
 *
 * @type {Object.<string>}
 */
var TRANSPOSED_KEY_MAP = util.getTranspose(KEY_MAP);

/*!
 * @type Array.<string>
 */
var keysDown = [];

var Key = (function () {

  'use strict';

  /**
   * Represents a key on the keyboard.  You'll never actually call this method
   * directly; Key Objects for every key that Keydrown supports are created for
   * you when the library is initialized (as in, when the file is loaded).  You
   * will, however, use the `prototype` methods below to bind functions to key
   * states.
   *
   * @param {number} keyCode The keyCode of the key.
   * @constructor
   * @class kd.Key
   */
  function Key (keyCode) {
    this.keyCode = keyCode;
    this.cachedKeypressEvent = null;
  }


  /*!
   * The function to be invoked on every tick that the key is held down for.
   *
   * @type {function}
   */
  Key.prototype._downHandler = util.noop;


  /*!
   * The function to be invoked when the key is released.
   *
   * @type {function}
   */
  Key.prototype._upHandler = util.noop;


  /*!
   * The function to be invoked when the key is pressed.
   *
   * @type {function}
   */
  Key.prototype._pressHandler = util.noop;


  /*!
   * Private helper function that binds or invokes a hander for `down`, `up',
   * or `press` for a `Key`.
   *
   * @param {Key} key
   * @param {string} handlerName
   * @param {function=} opt_handler If omitted, the handler is invoked.
   * @param {KeyboardEvent=} opt_evt If this function is being called by a
   * keyboard event handler, this is the raw KeyboardEvent Object provided from
   * the browser.
   */
  function bindOrFire (key, handlerName, opt_handler, opt_evt) {
    if (opt_handler) {
      key[handlerName] = opt_handler;
    } else {
      key[handlerName](opt_evt);
    }
  }


  /**
   * Returns whether the key is currently pressed or not.
   *
   * @method isDown
   * @return {boolean} True if the key is down, otherwise false.
   */
  Key.prototype.isDown = function () {
    return util.indexOf(keysDown, this.keyCode) !== -1;
  };


  /**
   * Bind a function to be called when the key is held down.
   *
   * @method down
   * @param {function=} opt_handler The function to be called when the key is
   * held down.  If omitted, this function invokes whatever handler was
   * previously bound.
   */
  Key.prototype.down = function (opt_handler) {
    bindOrFire(this, '_downHandler', opt_handler, this.cachedKeypressEvent);
  };


  /**
   * Bind a function to be called when the key is released.
   *
   * @method up
   * @param {function=} opt_handler The function to be called when the key is
   * released.  If omitted, this function invokes whatever handler was
   * previously bound.
   * @param {KeyboardEvent=} opt_evt If this function is being called by the
   * keyup event handler, this is the raw KeyboardEvent Object provided from
   * the browser.  This should generally not be provided by client code.
   */
  Key.prototype.up = function (opt_handler, opt_evt) {
    bindOrFire(this, '_upHandler', opt_handler, opt_evt);
  };


  /**
   * Bind a function to be called when the key is pressed.  This handler will
   * not fire again until the key is released — it does not repeat.
   *
   * @method press
   * @param {function=} opt_handler The function to be called once when the key
   * is pressed.  If omitted, this function invokes whatever handler was
   * previously bound.
   * @param {KeyboardEvent=} opt_evt If this function is being called by the
   * keydown event handler, this is the raw KeyboardEvent Object provided from
   * the browser.  This should generally not be provided by client code.
   */
  Key.prototype.press = function (opt_handler, opt_evt) {
    this.cachedKeypressEvent = opt_evt;
    bindOrFire(this, '_pressHandler', opt_handler, opt_evt);
  };


  /**
   * Remove the handler that was bound with `{{#crossLink
   * "kd.Key/down:method"}}{{/crossLink}}`.
   * @method unbindDown
   */
  Key.prototype.unbindDown = function () {
    this._downHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with `{{#crossLink
   * "kd.Key/up:method"}}{{/crossLink}}`.
   * @method unbindUp
   */
  Key.prototype.unbindUp = function () {
    this._upHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with `{{#crossLink
   * "kd.Key/press:method"}}{{/crossLink}}`.
   * @method unbindPress
   */
  Key.prototype.unbindPress = function () {
    this._pressHandler = util.noop;
  };

  return Key;

}());

var kd = (function (keysDown) {

  'use strict';

  /**
   * @class kd
   */
  var kd = {};
  kd.Key = Key;

  var isRunning = false;

  var now = Date.now
     ? Date.now
     : function () {return +new Date();};

  var previousUpdateTime = now();

  /**
   * Evaluate which keys are held down and invoke their handler functions.
   * @method tick
   */
  kd.tick = function () {
    var i, len = keysDown.length;
    for (i = 0; i < len; i++) {
      var keyCode = keysDown[i];

      var keyName = TRANSPOSED_KEY_MAP[keyCode];
      if (keyName) {
        kd[keyName].down();
      }
    }
  };


  /**
   * A basic run loop.  `handler` gets called approximately 60 times a second.
   *
   * @param {Function(number, number)} handler The callback function to call on
   * every tick.  You likely want to call [kd.tick](#method_tick) in this
   * function.  This callback receives the time elapsed since the previous
   * execution of the callback as the first parameter, and the current time
   * stamp as the second.
   * @method run
   */
  kd.run = function (handler) {
    isRunning = true;
    var currentTime = now();
    var timeSinceLastUpdate = currentTime - previousUpdateTime;

    util.requestAnimationFrame.call(window, function () {
      if (!isRunning) {
        return;
      }

      kd.run(handler);
      handler(timeSinceLastUpdate, currentTime);
    });

    previousUpdateTime = currentTime;
  };


  /**
   * Cancels the loop created by [run](#method_run).
   * @method stop
   */
  kd.stop = function () {
    isRunning = false;
  };


  // SETUP
  //


  // Initialize the KEY Objects
  util.forEach(KEY_MAP, function (keyCode, keyName) {
    kd[keyName] = new Key(keyCode);
  });

  util.documentOn('keydown', function (evt) {
    var keyCode = evt.keyCode;
    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    var isNew = util.pushUnique(keysDown, keyCode);
    var key = kd[keyName];

    if (key) {
      var cachedKeypressEvent = key.cachedKeypressEvent || {};

      // If a modifier key was held down the last time that this button was
      // pressed, and it is pressed again without the modifier key being
      // released, it is considered a newly-pressed key.  This is to work
      // around the fact that the "keyup" event does not fire for the modified
      // key until the modifier button is also released, which poses a problem
      // for repeated, modified key presses such as hitting ctrl/meta+Z for
      // rapid "undo" actions.
      if (cachedKeypressEvent.ctrlKey ||
          cachedKeypressEvent.shiftKey ||
          cachedKeypressEvent.metaKey) {
        isNew = true;
      }

      if (isNew) {
        key.press(null, evt);
      }
    }
  });

  util.documentOn('keyup', function (evt) {
    var keyCode = util.removeValue(keysDown, evt.keyCode);

    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    if (keyName) {
      kd[keyName].up(null, evt);
    }
  });

  // Stop firing the "down" handlers if the user loses focus of the browser
  // window.
  util.documentOn('blur', function (evt) {
    // Fire the "up" handler for each key that is currently held down
    util.forEach(keysDown, function (keyCode) {
      var mappedKey = TRANSPOSED_KEY_MAP[keyCode];
      if (mappedKey) {
        kd[mappedKey].up();
      }
    });

    keysDown.length = 0;
  });


  return kd;

 // The variables passed into the closure here are defined in kd.key.js.
}(keysDown));

if (typeof module === "object" && typeof module.exports === "object") {
  // Keydrown was loaded as a CommonJS module (by Browserify, for example).
  module.exports = kd;
} else if (typeof define === "function" && define.amd) {
  // Keydrown was loaded as an AMD module.
  define(function () {
    return kd;
  });
} else {
  window.kd = kd;
}

} (window));
/*
  SortTable
  version 2
  7th April 2007
  Stuart Langridge, http://www.kryogenix.org/code/browser/sorttable/
  
  Instructions:
  Download this file
  Add <script src="sorttable.js"></script> to your HTML
  Add class="sortable" to any table you'd like to make sortable
  Click on the headers to sort
  
  Thanks to many, many people for contributions and suggestions.
  Licenced as X11: http://www.kryogenix.org/code/browser/licence.html
  This basically means: do what you want with it.
*/

 
var stIsIE = /*@cc_on!@*/false;

sorttable = {
  init: function() {
    // quit if this function has already been called
    if (arguments.callee.done) return;
    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;
    // kill the timer
    if (_timer) clearInterval(_timer);
    
    if (!document.createElement || !document.getElementsByTagName) return;
    
    sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
    
    forEach(document.getElementsByTagName('table'), function(table) {
      if (table.className.search(/\bsortable\b/) != -1) {
        sorttable.makeSortable(table);
      }
    });
    
  },
  
  makeSortable: function(table) {
    if (table.getElementsByTagName('thead').length == 0) {
      // table doesn't have a tHead. Since it should have, create one and
      // put the first table row in it.
      the = document.createElement('thead');
      the.appendChild(table.rows[0]);
      table.insertBefore(the,table.firstChild);
    }
    // Safari doesn't support table.tHead, sigh
    if (table.tHead == null) table.tHead = table.getElementsByTagName('thead')[0];
    
    if (table.tHead.rows.length != 1) return; // can't cope with two header rows
    
    // Sorttable v1 put rows with a class of "sortbottom" at the bottom (as
    // "total" rows, for example). This is B&R, since what you're supposed
    // to do is put them in a tfoot. So, if there are sortbottom rows,
    // for backwards compatibility, move them to tfoot (creating it if needed).
    sortbottomrows = [];
    for (var i=0; i<table.rows.length; i++) {
      if (table.rows[i].className.search(/\bsortbottom\b/) != -1) {
        sortbottomrows[sortbottomrows.length] = table.rows[i];
      }
    }
    if (sortbottomrows) {
      if (table.tFoot == null) {
        // table doesn't have a tfoot. Create one.
        tfo = document.createElement('tfoot');
        table.appendChild(tfo);
      }
      for (var i=0; i<sortbottomrows.length; i++) {
        tfo.appendChild(sortbottomrows[i]);
      }
      delete sortbottomrows;
    }
    
    // work through each column and calculate its type
    headrow = table.tHead.rows[0].cells;
    for (var i=0; i<headrow.length; i++) {
      // manually override the type with a sorttable_type attribute
      if (!headrow[i].className.match(/\bsorttable_nosort\b/)) { // skip this col
        mtch = headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
        if (mtch) { override = mtch[1]; }
	      if (mtch && typeof sorttable["sort_"+override] == 'function') {
	        headrow[i].sorttable_sortfunction = sorttable["sort_"+override];
	      } else {
	        headrow[i].sorttable_sortfunction = sorttable.guessType(table,i);
	      }
	      // make it clickable to sort
	      headrow[i].sorttable_columnindex = i;
	      headrow[i].sorttable_tbody = table.tBodies[0];
	      dean_addEvent(headrow[i],"click", function(e) {

          if (this.className.search(/\bsorttable_sorted\b/) != -1) {
            // if we're already sorted by this column, just 
            // reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
            this.className = this.className.replace('sorttable_sorted',
                                                    'sorttable_sorted_reverse');
            this.removeChild(document.getElementById('sorttable_sortfwdind'));
            sortrevind = document.createElement('span');
            sortrevind.id = "sorttable_sortrevind";
            sortrevind.innerHTML = '&nbsp;&uarr;';
            this.appendChild(sortrevind);
            return;
          }
          if (this.className.search(/\bsorttable_sorted_reverse\b/) != -1) {
            // if we're already sorted by this column in reverse, just 
            // re-reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
            this.className = this.className.replace('sorttable_sorted_reverse',
                                                    'sorttable_sorted');
            this.removeChild(document.getElementById('sorttable_sortrevind'));
            sortfwdind = document.createElement('span');
            sortfwdind.id = "sorttable_sortfwdind";
            sortfwdind.innerHTML = '&nbsp;&darr;';
            this.appendChild(sortfwdind);
            return;
          }
          
          // remove sorttable_sorted classes
          theadrow = this.parentNode;
          forEach(theadrow.childNodes, function(cell) {
            if (cell.nodeType == 1) { // an element
              cell.className = cell.className.replace('sorttable_sorted_reverse','');
              cell.className = cell.className.replace('sorttable_sorted','');
            }
          });
          sortfwdind = document.getElementById('sorttable_sortfwdind');
          if (sortfwdind) { sortfwdind.parentNode.removeChild(sortfwdind); }
          sortrevind = document.getElementById('sorttable_sortrevind');
          if (sortrevind) { sortrevind.parentNode.removeChild(sortrevind); }
          
          this.className += ' sorttable_sorted';
          sortfwdind = document.createElement('span');
          sortfwdind.id = "sorttable_sortfwdind";
          sortfwdind.innerHTML = '&nbsp;&darr;';
          this.appendChild(sortfwdind);

	        // build an array to sort. This is a Schwartzian transform thing,
	        // i.e., we "decorate" each row with the actual sort key,
	        // sort based on the sort keys, and then put the rows back in order
	        // which is a lot faster because you only do getInnerText once per row
	        row_array = [];
	        col = this.sorttable_columnindex;
	        rows = this.sorttable_tbody.rows;
	        for (var j=0; j<rows.length; j++) {
	          row_array[row_array.length] = [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
	        }
	        /* If you want a stable sort, uncomment the following line */
	        //sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
	        /* and comment out this one */
	        row_array.sort(this.sorttable_sortfunction);
	        
	        tb = this.sorttable_tbody;
	        for (var j=0; j<row_array.length; j++) {
	          tb.appendChild(row_array[j][1]);
	        }
	        
	        delete row_array;
	      });
	    }
    }
  },
  
  guessType: function(table, column) {
    // guess the type of a column based on its first non-blank row
    sortfn = sorttable.sort_alpha;
    for (var i=0; i<table.tBodies[0].rows.length; i++) {
      text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
      if (text != '') {
        if (text.match(/^-?[�$�]?[\d,.]+%?$/)) {
          return sorttable.sort_numeric;
        }
        // check for a date: dd/mm/yyyy or dd/mm/yy 
        // can have / or . or - as separator
        // can be mm/dd as well
        possdate = text.match(sorttable.DATE_RE)
        if (possdate) {
          // looks like a date
          first = parseInt(possdate[1]);
          second = parseInt(possdate[2]);
          if (first > 12) {
            // definitely dd/mm
            return sorttable.sort_ddmm;
          } else if (second > 12) {
            return sorttable.sort_mmdd;
          } else {
            // looks like a date, but we can't tell which, so assume
            // that it's dd/mm (English imperialism!) and keep looking
            sortfn = sorttable.sort_ddmm;
          }
        }
      }
    }
    return sortfn;
  },
  
  getInnerText: function(node) {
    // gets the text we want to use for sorting for a cell.
    // strips leading and trailing whitespace.
    // this is *not* a generic getInnerText function; it's special to sorttable.
    // for example, you can override the cell text with a customkey attribute.
    // it also gets .value for <input> fields.
    
    hasInputs = (typeof node.getElementsByTagName == 'function') &&
                 node.getElementsByTagName('input').length;
    
    if (node.getAttribute("sorttable_customkey") != null) {
      return node.getAttribute("sorttable_customkey");
    }
    else if (typeof node.textContent != 'undefined' && !hasInputs) {
      return node.textContent.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.innerText != 'undefined' && !hasInputs) {
      return node.innerText.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.text != 'undefined' && !hasInputs) {
      return node.text.replace(/^\s+|\s+$/g, '');
    }
    else {
      switch (node.nodeType) {
        case 3:
          if (node.nodeName.toLowerCase() == 'input') {
            return node.value.replace(/^\s+|\s+$/g, '');
          }
        case 4:
          return node.nodeValue.replace(/^\s+|\s+$/g, '');
          break;
        case 1:
        case 11:
          var innerText = '';
          for (var i = 0; i < node.childNodes.length; i++) {
            innerText += sorttable.getInnerText(node.childNodes[i]);
          }
          return innerText.replace(/^\s+|\s+$/g, '');
          break;
        default:
          return '';
      }
    }
  },
  
  reverse: function(tbody) {
    // reverse the rows in a tbody
    newrows = [];
    for (var i=0; i<tbody.rows.length; i++) {
      newrows[newrows.length] = tbody.rows[i];
    }
    for (var i=newrows.length-1; i>=0; i--) {
       tbody.appendChild(newrows[i]);
    }
    delete newrows;
  },
  
  /* sort functions
     each sort function takes two parameters, a and b
     you are comparing a[0] and b[0] */
  sort_numeric: function(a,b) {
    aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(b[0].replace(/[^0-9.-]/g,'')); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
  },
  sort_alpha: function(a,b) {
    if (a[0]==b[0]) return 0;
    if (a[0]<b[0]) return -1;
    return 1;
  },
  sort_ddmm: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  sort_mmdd: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  
  shaker_sort: function(list, comp_func) {
    // A stable sort function to allow multi-level sorting of data
    // see: http://en.wikipedia.org/wiki/Cocktail_sort
    // thanks to Joseph Nahmias
    var b = 0;
    var t = list.length - 1;
    var swap = true;

    while(swap) {
        swap = false;
        for(var i = b; i < t; ++i) {
            if ( comp_func(list[i], list[i+1]) > 0 ) {
                var q = list[i]; list[i] = list[i+1]; list[i+1] = q;
                swap = true;
            }
        } // for
        t--;

        if (!swap) break;

        for(var i = t; i > b; --i) {
            if ( comp_func(list[i], list[i-1]) < 0 ) {
                var q = list[i]; list[i] = list[i-1]; list[i-1] = q;
                swap = true;
            }
        } // for
        b++;

    } // while(swap)
  }  
}

/* ******************************************************************
   Supporting functions: bundled here to avoid depending on a library
   ****************************************************************** */

// Dean Edwards/Matthias Miller/John Resig

/* for Mozilla/Opera9 */
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", sorttable.init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            sorttable.init(); // call the onload handler
        }
    };
/*@end @*/

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            sorttable.init(); // call the onload handler
        }
    }, 10);
}

/* for other browsers */
window.onload = sorttable.init;

// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function dean_addEvent(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = dean_addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = handleEvent;
	}
};
// a counter used to create unique IDs
dean_addEvent.guid = 1;

function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
}

// Dean's forEach: http://dean.edwards.name/base/forEach.js
/*
	forEach, version 1.0
	Copyright 2006, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

// array-like enumeration
if (!Array.forEach) { // mozilla already supports this
	Array.forEach = function(array, block, context) {
		for (var i = 0; i < array.length; i++) {
			block.call(context, array[i], i, array);
		}
	};
}

// generic enumeration
Function.prototype.forEach = function(object, block, context) {
	for (var key in object) {
		if (typeof this.prototype[key] == "undefined") {
			block.call(context, object[key], key, object);
		}
	}
};

// character enumeration
String.forEach = function(string, block, context) {
	Array.forEach(string.split(""), function(chr, index) {
		block.call(context, chr, index, string);
	});
};

// globally resolve forEach enumeration
var forEach = function(object, block, context) {
	if (object) {
		var resolve = Object; // default
		if (object instanceof Function) {
			// functions have a "length" property
			resolve = Function;
		} else if (object.forEach instanceof Function) {
			// the object implements a custom forEach method so use that
			object.forEach(block, context);
			return;
		} else if (typeof object == "string") {
			// the object is a string
			resolve = String;
		} else if (typeof object.length == "number") {
			// the object is array-like
			resolve = Array;
		}
		resolve.forEach(object, block, context);
	}
};

/* MIT https://github.com/kenwheeler/cash */
(function(){
"use strict";

var doc = document,
    win = window,
    _Array$prototype = Array.prototype,
    filter = _Array$prototype.filter,
    indexOf = _Array$prototype.indexOf,
    map = _Array$prototype.map,
    push = _Array$prototype.push,
    reverse = _Array$prototype.reverse,
    slice = _Array$prototype.slice,
    splice = _Array$prototype.splice;
var idRe = /^#[\w-]*$/,
    classRe = /^\.[\w-]*$/,
    htmlRe = /<.+>/,
    tagRe = /^\w+$/; // @require ./variables.js

function find(selector, context) {
  if (context === void 0) {
    context = doc;
  }

  return classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
} // @require ./find.js
// @require ./variables.js


function Cash(selector, context) {
  if (context === void 0) {
    context = doc;
  }

  if (!selector) return;
  if (selector.__cash) return selector;
  var eles = selector;

  if (isString(selector)) {
    if (context.__cash) context = context[0];
    eles = idRe.test(selector) ? context.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, context);
    if (!eles) return;
  } else if (isFunction(selector)) {
    return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
  }

  if (eles.nodeType || eles === win) eles = [eles];
  this.length = eles.length;

  for (var i = 0, l = this.length; i < l; i++) {
    this[i] = eles[i];
  }
}

function cash(selector, context) {
  return new Cash(selector, context);
}
/* PROTOTYPE */


var fn = cash.fn = cash.prototype = Cash.prototype = {
  constructor: cash,
  __cash: true,
  length: 0,
  splice: splice // Ensures a cash collection gets printed as array-like in Chrome

}; // @require core/cash.js
// @require core/variables.js

fn.get = function (index) {
  if (index === undefined) return slice.call(this);
  return this[index < 0 ? index + this.length : index];
}; // @require core/cash.js
// @require ./get.js


fn.eq = function (index) {
  return cash(this.get(index));
}; // @require core/cash.js
// @require ./eq.js


fn.first = function () {
  return this.eq(0);
}; // @require core/cash.js
// @require ./eq.js


fn.last = function () {
  return this.eq(-1);
}; // @require core/cash.js
// @require core/variables.js


fn.map = function (callback) {
  return cash(map.call(this, function (ele, i) {
    return callback.call(ele, i, ele);
  }));
}; // @require core/cash.js
// @require core/variables.js


fn.slice = function () {
  return cash(slice.apply(this, arguments));
}; // @require ./cash.js


var camelCaseRe = /(?:^\w|[A-Z]|\b\w)/g,
    camelCaseWhitespaceRe = /[\s-_]+/g;

function camelCase(str) {
  return str.replace(camelCaseRe, function (letter, index) {
    return letter[!index ? 'toLowerCase' : 'toUpperCase']();
  }).replace(camelCaseWhitespaceRe, '');
}

;
cash.camelCase = camelCase; // @require ./cash.js

function each(arr, callback) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (callback.call(arr[i], arr[i], i, arr) === false) break;
  }
}

cash.each = each; // @require core/cash.js
// @require core/each.js

fn.each = function (callback) {
  each(this, function (ele, i) {
    return callback.call(ele, i, ele);
  });
  return this;
}; // @require core/cash.js
// @require collection/each.js


fn.removeProp = function (prop) {
  return this.each(function (i, ele) {
    delete ele[prop];
  });
}; // @require ./cash.js
// @require ./variables.js


if (typeof exports !== 'undefined') {
  // Node.js
  module.exports = cash;
} else {
  // Browser
  win.cash = win.$ = cash;
} // @require ./cash.js


function extend(target) {
  if (target === void 0) {
    target = this;
  }

  var args = arguments,
      length = args.length;

  for (var i = length < 2 ? 0 : 1; i < length; i++) {
    for (var key in args[i]) {
      target[key] = args[i][key];
    }
  }

  return target;
}

;
cash.extend = fn.extend = extend; // @require ./cash.js

var guid = 1;
cash.guid = guid; // @require ./cash.js

function matches(ele, selector) {
  var matches = ele && (ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector || ele.oMatchesSelector);
  return !!matches && matches.call(ele, selector);
}

cash.matches = matches; // @require ./cash.js

function isFunction(x) {
  return typeof x === 'function';
}

cash.isFunction = isFunction;

function isString(x) {
  return typeof x === 'string';
}

cash.isString = isString;

function isNumeric(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

cash.isNumeric = isNumeric;
var isArray = Array.isArray;
cash.isArray = isArray; // @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js

fn.prop = function (prop, value) {
  if (!prop) return;

  if (isString(prop)) {
    if (arguments.length < 2) return this[0] && this[0][prop];
    return this.each(function (i, ele) {
      ele[prop] = value;
    });
  }

  for (var key in prop) {
    this.prop(key, prop[key]);
  }

  return this;
}; // @require ./matches.js
// @require ./type_checking.js


function getCompareFunction(selector) {
  return isString(selector) ? function (i, ele) {
    return matches(ele, selector);
  } : selector.__cash ? function (i, ele) {
    return selector.is(ele);
  } : function (i, ele, selector) {
    return ele === selector;
  };
} // @require core/cash.js
// @require core/get_compare_function.js
// @require core/type_checking.js
// @require core/variables.js
// @require collection/get.js


fn.filter = function (selector) {
  if (!selector) return cash();
  var comparator = isFunction(selector) ? selector : getCompareFunction(selector);
  return cash(filter.call(this, function (ele, i) {
    return comparator.call(ele, i, ele, selector);
  }));
}; // @require ./type_checking.js


var splitValuesRe = /\S+/g;

function getSplitValues(str) {
  return isString(str) ? str.match(splitValuesRe) || [] : [];
} // @require core/cash.js
// @require core/get_split_values.js
// @require collection/each.js


fn.hasClass = function (cls) {
  var classes = getSplitValues(cls);
  var check = false;

  if (classes.length) {
    this.each(function (i, ele) {
      check = ele.classList.contains(classes[0]);
      return !check;
    });
  }

  return check;
}; // @require core/cash.js
// @require core/get_split_values.js
// @require collection/each.js


fn.removeAttr = function (attr) {
  var attrs = getSplitValues(attr);
  if (!attrs.length) return this;
  return this.each(function (i, ele) {
    each(attrs, function (a) {
      ele.removeAttribute(a);
    });
  });
}; // @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./remove_attr.js


fn.attr = function (attr, value) {
  if (!attr) return;

  if (isString(attr)) {
    if (arguments.length < 2) {
      if (!this[0]) return;

      var _value = this[0].getAttribute(attr);

      return _value === null ? undefined : _value;
    }

    if (value === null) return this.removeAttr(attr);
    return this.each(function (i, ele) {
      ele.setAttribute(attr, value);
    });
  }

  for (var key in attr) {
    this.attr(key, attr[key]);
  }

  return this;
}; // @require core/cash.js
// @require core/each.js
// @require core/get_split_values.js
// @require collection/each.js


fn.toggleClass = function (cls, force) {
  var classes = getSplitValues(cls),
      isForce = force !== undefined;
  if (!classes.length) return this;
  return this.each(function (i, ele) {
    each(classes, function (c) {
      if (isForce) {
        force ? ele.classList.add(c) : ele.classList.remove(c);
      } else {
        ele.classList.toggle(c);
      }
    });
  });
}; // @require core/cash.js
// @require ./toggle_class.js


fn.addClass = function (cls) {
  return this.toggleClass(cls, true);
}; // @require core/cash.js
// @require ./attr.js
// @require ./toggle_class.js


fn.removeClass = function (cls) {
  return !arguments.length ? this.attr('class', '') : this.toggleClass(cls, false);
}; // @optional ./add_class.js
// @optional ./attr.js
// @optional ./has_class.js
// @optional ./prop.js
// @optional ./remove_attr.js
// @optional ./remove_class.js
// @optional ./remove_prop.js
// @optional ./toggle_class.js
// @require ./cash.js
// @require ./variables.js
// @require ./type_checking.js


var fragment;

function initFragment() {
  if (fragment) return;
  fragment = doc.implementation.createHTMLDocument('');
  var base = fragment.createElement('base');
  base.href = doc.location.href;
  fragment.head.appendChild(base);
}

function parseHTML(html) {
  //FIXME: `<tr></tr>` can't be parsed with this
  initFragment();
  if (!isString(html)) html = '';
  fragment.body.innerHTML = html;
  return slice.call(fragment.body.childNodes);
}

cash.parseHTML = parseHTML; // @require ./cash.js

function unique(arr) {
  return arr.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

cash.unique = unique; // @require core/cash.js
// @require core/unique.js
// @require ./get.js

fn.add = function (selector, context) {
  return cash(unique(this.get().concat(cash(selector, context).get())));
}; // @optional ./camel_case.js
// @optional ./each.js
// @optional ./export.js
// @optional ./extend.js
// @optional ./find.js
// @optional ./get_compare_function.js
// @optional ./get_split_values.js
// @optional ./guid.js
// @optional ./matches.js
// @optional ./parse_html.js
// @optional ./unique.js
// @optional ./variables.js
// @require ./cash.js
// @require ./type_checking.js
// @require core/variables.js


function computeStyle(ele, prop, isVariable) {
  if (ele.nodeType !== 1) return;
  var style = win.getComputedStyle(ele, null);
  return prop ? isVariable ? style.getPropertyValue(prop) : style[prop] : style;
} // @require ./compute_style.js


function computeStyleInt(ele, prop) {
  return parseInt(computeStyle(ele, prop), 10) || 0;
}

var cssVariableRe = /^--/; // @require ./variables.js

function isCSSVariable(prop) {
  return cssVariableRe.test(prop);
} // @require core/camel_case.js
// @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require ./is_css_variable.js


var prefixedProps = {},
    _doc$createElement = doc.createElement('div'),
    style = _doc$createElement.style,
    vendorsPrefixes = ['webkit', 'moz', 'ms', 'o'];

function getPrefixedProp(prop, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  if (isVariable) return prop;

  if (!prefixedProps[prop]) {
    var propCC = camelCase(prop),
        propUC = "" + propCC.charAt(0).toUpperCase() + propCC.slice(1),
        props = (propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC).split(' ');
    each(props, function (p) {
      if (p in style) {
        prefixedProps[prop] = p;
        return false;
      }
    });
  }

  return prefixedProps[prop];
}

;
cash.prefixedProp = getPrefixedProp; // @require core/type_checking.js
// @require ./is_css_variable.js

var numericProps = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue(prop, value, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
} // @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/compute_style.js
// @require ./helpers/get_prefixed_prop.js
// @require ./helpers/get_suffixed_value.js
// @require ./helpers/is_css_variable.js


fn.css = function (prop, value) {
  if (isString(prop)) {
    var isVariable = isCSSVariable(prop);
    prop = getPrefixedProp(prop, isVariable);
    if (arguments.length < 2) return this[0] && computeStyle(this[0], prop, isVariable);
    if (!prop) return this;
    value = getSuffixedValue(prop, value, isVariable);
    return this.each(function (i, ele) {
      if (ele.nodeType !== 1) return;

      if (isVariable) {
        ele.style.setProperty(prop, value);
      } else {
        ele.style[prop] = value;
      }
    });
  }

  for (var key in prop) {
    this.css(key, prop[key]);
  }

  return this;
}; // @optional ./css.js


var dataNamespace = '__cashData',
    dataAttributeRe = /^data-(.*)/; // @require core/cash.js
// @require ./helpers/variables.js

cash.hasData = function (ele) {
  return dataNamespace in ele;
}; // @require ./variables.js


function getDataCache(ele) {
  return ele[dataNamespace] = ele[dataNamespace] || {};
} // @require attributes/attr.js
// @require ./get_data_cache.js


function getData(ele, key) {
  var cache = getDataCache(ele);

  if (key) {
    if (!(key in cache)) {
      var value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase(key)] : cash(ele).attr("data-" + key);

      if (value !== undefined) {
        try {
          value = JSON.parse(value);
        } catch (e) {}

        cache[key] = value;
      }
    }

    return cache[key];
  }

  return cache;
} // @require ./variables.js
// @require ./get_data_cache.js


function removeData(ele, key) {
  if (key === undefined) {
    delete ele[dataNamespace];
  } else {
    delete getDataCache(ele)[key];
  }
} // @require ./get_data_cache.js


function setData(ele, key, value) {
  getDataCache(ele)[key] = value;
} // @require core/cash.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/get_data.js
// @require ./helpers/set_data.js
// @require ./helpers/variables.js


fn.data = function (name, value) {
  var _this = this;

  if (!name) {
    if (!this[0]) return;
    each(this[0].attributes, function (attr) {
      var match = attr.name.match(dataAttributeRe);
      if (!match) return;

      _this.data(match[1]);
    });
    return getData(this[0]);
  }

  if (isString(name)) {
    if (value === undefined) return this[0] && getData(this[0], name);
    return this.each(function (i, ele) {
      return setData(ele, name, value);
    });
  }

  for (var key in name) {
    this.data(key, name[key]);
  }

  return this;
}; // @require core/cash.js
// @require collection/each.js
// @require ./helpers/remove_data.js


fn.removeData = function (key) {
  return this.each(function (i, ele) {
    return removeData(ele, key);
  });
}; // @optional ./data.js
// @optional ./remove_data.js
// @require css/helpers/compute_style_int.js


function getExtraSpace(ele, xAxis) {
  return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
} // @require core/cash.js
// @require core/each.js
// @require core/variables.js


each(['Width', 'Height'], function (prop) {
  fn["inner" + prop] = function () {
    if (!this[0]) return;
    if (this[0] === win) return win["inner" + prop];
    return this[0]["client" + prop];
  };
}); // @require core/camel_case.js
// @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require css/helpers/compute_style.js
// @require css/helpers/get_suffixed_value.js
// @require ./helpers/get_extra_space.js

each(['width', 'height'], function (prop, index) {
  fn[prop] = function (value) {
    if (!this[0]) return value === undefined ? undefined : this;

    if (!arguments.length) {
      if (this[0] === win) return this[0][camelCase("outer-" + prop)];
      return this[0].getBoundingClientRect()[prop] - getExtraSpace(this[0], !index);
    }

    value = parseInt(value, 10);
    return this.each(function (i, ele) {
      if (ele.nodeType !== 1) return;
      var boxSizing = computeStyle(ele, 'boxSizing');
      ele.style[prop] = getSuffixedValue(prop, value + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
    });
  };
}); // @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require css/helpers/compute_style_int.js

each(['Width', 'Height'], function (prop, index) {
  fn["outer" + prop] = function (includeMargins) {
    if (!this[0]) return;
    if (this[0] === win) return win["outer" + prop];
    return this[0]["offset" + prop] + (includeMargins ? computeStyleInt(this[0], "margin" + (!index ? 'Left' : 'Top')) + computeStyleInt(this[0], "margin" + (!index ? 'Right' : 'Bottom')) : 0);
  };
}); // @optional ./inner.js
// @optional ./normal.js
// @optional ./outer.js

function hasNamespaces(ns1, ns2) {
  for (var i = 0, l = ns2.length; i < l; i++) {
    if (ns1.indexOf(ns2[i]) < 0) return false;
  }

  return true;
} // @require core/each.js


function removeEventListeners(cache, ele, name) {
  each(cache[name], function (_ref) {
    var namespaces = _ref[0],
        callback = _ref[1];
    ele.removeEventListener(name, callback);
  });
  delete cache[name];
}

var eventsNamespace = '__cashEvents',
    eventsNamespacesSeparator = '.'; // @require ./variables.js

function getEventsCache(ele) {
  return ele[eventsNamespace] = ele[eventsNamespace] || {};
} // @require core/guid.js
// @require events/helpers/get_events_cache.js


function addEvent(ele, name, namespaces, callback) {
  callback.guid = callback.guid || guid++;
  var eventCache = getEventsCache(ele);
  eventCache[name] = eventCache[name] || [];
  eventCache[name].push([namespaces, callback]);
  ele.addEventListener(name, callback);
} // @require ./variables.js


function parseEventName(eventName) {
  var parts = eventName.split(eventsNamespacesSeparator);
  return [parts[0], parts.slice(1).sort()]; // [name, namespaces]
} // @require core/guid.js
// @require ./get_events_cache.js
// @require ./has_namespaces.js
// @require ./parse_event_name.js
// @require ./remove_event_listeners.js


function removeEvent(ele, name, namespaces, callback) {
  var cache = getEventsCache(ele);

  if (!name) {
    if (!namespaces || !namespaces.length) {
      for (name in cache) {
        removeEventListeners(cache, ele, name);
      }
    } else {
      for (name in cache) {
        removeEvent(ele, name, namespaces, callback);
      }
    }
  } else {
    var eventCache = cache[name];
    if (!eventCache) return;
    if (callback) callback.guid = callback.guid || guid++;
    cache[name] = eventCache.filter(function (_ref2) {
      var ns = _ref2[0],
          cb = _ref2[1];
      if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces)) return true;
      ele.removeEventListener(name, cb);
    });
  }
} // @require core/cash.js
// @require core/each.js
// @require collection/each.js
// @require ./helpers/parse_event_name.js
// @require ./helpers/remove_event.js


fn.off = function (eventFullName, callback) {
  var _this2 = this;

  if (eventFullName === undefined) {
    this.each(function (i, ele) {
      return removeEvent(ele);
    });
  } else {
    each(getSplitValues(eventFullName), function (eventFullName) {
      var _parseEventName = parseEventName(eventFullName),
          name = _parseEventName[0],
          namespaces = _parseEventName[1];

      _this2.each(function (i, ele) {
        return removeEvent(ele, name, namespaces, callback);
      });
    });
  }

  return this;
}; // @require core/cash.js
// @require core/get_split_values.js
// @require core/guid.js
// @require core/matches.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/variables.js
// @require ./helpers/add_event.js
// @require ./helpers/has_namespaces.js
// @require ./helpers/parse_event_name.js
// @require ./helpers/remove_event.js


fn.on = function (eventFullName, selector, callback, _one) {
  var _this3 = this;

  if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.on(key, selector, eventFullName[key]);
    }

    return this;
  }

  if (isFunction(selector)) {
    callback = selector;
    selector = false;
  }

  each(getSplitValues(eventFullName), function (eventFullName) {
    var _parseEventName2 = parseEventName(eventFullName),
        name = _parseEventName2[0],
        namespaces = _parseEventName2[1];

    _this3.each(function (i, ele) {
      var finalCallback = function finalCallback(event) {
        if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;
        var thisArg = ele;

        if (selector) {
          var target = event.target;

          while (!matches(target, selector)) {
            if (target === ele) return;
            target = target.parentNode;
            if (!target) return;
          }

          thisArg = target;
        }

        event.namespace = event.namespace || '';
        var returnValue = callback.call(thisArg, event, event.data);

        if (_one) {
          removeEvent(ele, name, namespaces, finalCallback);
        }

        if (returnValue === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      finalCallback.guid = callback.guid = callback.guid || guid++;
      addEvent(ele, name, namespaces, finalCallback);
    });
  });
  return this;
}; // @require core/cash.js
// @require ./on.js


fn.one = function (eventFullName, delegate, callback) {
  return this.on(eventFullName, delegate, callback, true);
}; // @require core/cash.js
// @require core/variables.js


fn.ready = function (callback) {
  var finalCallback = function finalCallback() {
    return callback(cash);
  };

  if (doc.readyState !== 'loading') {
    setTimeout(finalCallback);
  } else {
    doc.addEventListener('DOMContentLoaded', finalCallback);
  }

  return this;
}; // @require core/cash.js
// @require core/type_checking.js
// @require core/variables.js
// @require collection/each.js
// @require ./helpers/parse_event_name.js
// @require ./helpers/variables.js


fn.trigger = function (eventFullName, data) {
  var evt = eventFullName;

  if (isString(eventFullName)) {
    var _parseEventName3 = parseEventName(eventFullName),
        name = _parseEventName3[0],
        namespaces = _parseEventName3[1];

    evt = doc.createEvent('HTMLEvents');
    evt.initEvent(name, true, true);
    evt.namespace = namespaces.join(eventsNamespacesSeparator);
  }

  evt.data = data;
  return this.each(function (i, ele) {
    ele.dispatchEvent(evt);
  });
}; // @optional ./off.js
// @optional ./on.js
// @optional ./one.js
// @optional ./ready.js
// @optional ./trigger.js
// @require core/each.js


function getValueSelectMultiple(ele) {
  var values = [];
  each(ele.options, function (option) {
    if (option.selected && !option.disabled && !option.parentNode.disabled) {
      values.push(option.value);
    }
  });
  return values;
}

function getValueSelectSingle(ele) {
  return ele.selectedIndex < 0 ? null : ele.options[ele.selectedIndex].value;
} // @require ./get_value_select_single.js
// @require ./get_value_select_multiple.js


var selectOneRe = /select-one/i,
    selectMultipleRe = /select-multiple/i;

function getValue(ele) {
  var type = ele.type;
  if (selectOneRe.test(type)) return getValueSelectSingle(ele);
  if (selectMultipleRe.test(type)) return getValueSelectMultiple(ele);
  return ele.value;
}

var queryEncodeSpaceRe = /%20/g;

function queryEncode(prop, value) {
  return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value).replace(queryEncodeSpaceRe, '+');
} // @require core/cash.js
// @require core/each.js
// @require core/type_checking.js
// @require ./helpers/get_value.js
// @require ./helpers/query_encode.js


var skippableRe = /file|reset|submit|button|image/i,
    checkableRe = /radio|checkbox/i;

fn.serialize = function () {
  var query = '';
  this.each(function (i, ele) {
    each(ele.elements || [ele], function (ele) {
      if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET') return;
      if (skippableRe.test(ele.type)) return;
      if (checkableRe.test(ele.type) && !ele.checked) return;
      var value = getValue(ele);
      if (value === undefined) return;
      var values = isArray(value) ? value : [value];
      each(values, function (value) {
        query += queryEncode(ele.name, value);
      });
    });
  });
  return query.substr(1);
}; // @require core/cash.js
// @require core/each.js
// @require core/type_checking.js
// @require collection/each.js
// @require ./helpers/get_value.js


fn.val = function (value) {
  if (value === undefined) return this[0] && getValue(this[0]);
  return this.each(function (i, ele) {
    if (selectMultipleRe.test(ele.type) && isArray(value)) {
      each(ele.options, function (option) {
        option.selected = value.indexOf(option.value) >= 0;
      });
    } else {
      ele.value = value;
    }
  });
}; // @optional ./serialize.js
// @optional ./val.js
// @require core/cash.js
// @require collection/map.js


fn.clone = function () {
  return this.map(function (i, ele) {
    return ele.cloneNode(true);
  });
}; // @require core/cash.js
// @require collection/each.js


fn.detach = function () {
  return this.each(function (i, ele) {
    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  });
};

function insertElement(ele, child, prepend) {
  if (prepend) {
    ele.insertBefore(child, ele.childNodes[0]);
  } else {
    ele.appendChild(child);
  }
} // @require core/each.js
// @require core/type_checking.js
// @require ./insert_element.js


function insertContent(parent, child, prepend) {
  var isStr = isString(child);

  if (!isStr && child.length) {
    each(child, function (ele) {
      return insertContent(parent, ele, prepend);
    });
  } else {
    each(parent, isStr ? function (ele) {
      ele.insertAdjacentHTML(prepend ? 'afterbegin' : 'beforeend', child);
    } : function (ele, index) {
      return insertElement(ele, !index ? child : child.cloneNode(true), prepend);
    });
  }
} // @require core/cash.js
// @require core/each.js
// @require ./helpers/insert_content.js


fn.append = function () {
  var _this4 = this;

  each(arguments, function (content) {
    insertContent(_this4, content);
  });
  return this;
}; // @require core/cash.js
// @require ./helpers/insert_content.js


fn.appendTo = function (parent) {
  insertContent(cash(parent), this);
  return this;
}; // @require core/cash.js
// @require collection/each.js


fn.html = function (content) {
  if (content === undefined) return this[0] && this[0].innerHTML;
  var source = content.nodeType ? content[0].outerHTML : content;
  return this.each(function (i, ele) {
    ele.innerHTML = source;
  });
}; // @require core/cash.js
// @require ./html.js


fn.empty = function () {
  return this.html('');
}; // @require core/cash.js
// @require collection/each.js


fn.insertAfter = function (content) {
  var _this5 = this;

  cash(content).each(function (index, ele) {
    var parent = ele.parentNode;

    _this5.each(function (i, e) {
      parent.insertBefore(!index ? e : e.cloneNode(true), ele.nextSibling);
    });
  });
  return this;
}; // @require core/cash.js
// @require core/each.js
// @require core/variables.js
// @require collection/slice.js
// @require ./insert_after.js


fn.after = function () {
  var _this6 = this;

  each(reverse.apply(arguments), function (content) {
    reverse.apply(cash(content).slice()).insertAfter(_this6);
  });
  return this;
}; // @require core/cash.js
// @require collection/each.js


fn.insertBefore = function (selector) {
  var _this7 = this;

  cash(selector).each(function (index, ele) {
    var parent = ele.parentNode;

    _this7.each(function (i, e) {
      parent.insertBefore(!index ? e : e.cloneNode(true), ele);
    });
  });
  return this;
}; // @require core/cash.js
// @require core/each.js
// @require ./insert_before.js


fn.before = function () {
  var _this8 = this;

  each(arguments, function (content) {
    cash(content).insertBefore(_this8);
  });
  return this;
}; // @require core/cash.js
// @require core/each.js
// @require ./helpers/insert_content.js


fn.prepend = function () {
  var _this9 = this;

  each(arguments, function (content) {
    insertContent(_this9, content, true);
  });
  return this;
}; // @require core/cash.js
// @require core/variables.js
// @require collection/slice.js
// @require ./helpers/insert_content.js


fn.prependTo = function (parent) {
  insertContent(cash(parent), reverse.apply(this.slice()), true);
  return this;
}; // @require core/cash.js
// @require events/off.js
// @require ./detach.js


fn.remove = function () {
  return this.detach().off();
}; // @require core/cash.js
// @require collection/each.js
// @require collection/slice.js
// @require ./after.js
// @require ./remove.js


fn.replaceWith = function (content) {
  var _this10 = this;

  return this.each(function (i, ele) {
    var parent = ele.parentNode;
    if (!parent) return;
    var $eles = i ? cash(content).clone() : cash(content);

    if (!$eles[0]) {
      _this10.remove();

      return false;
    }

    parent.replaceChild($eles[0], ele);
    cash($eles[0]).after($eles.slice(1));
  });
}; // @require core/cash.js
// @require ./replace_with.js


fn.replaceAll = function (content) {
  cash(content).replaceWith(this);
  return this;
}; // @require core/cash.js
// @require collection/each.js


fn.text = function (content) {
  if (content === undefined) return this[0] ? this[0].textContent : '';
  return this.each(function (i, ele) {
    ele.textContent = content;
  });
}; // @optional ./after.js
// @optional ./append.js
// @optional ./append_to.js
// @optional ./before.js
// @optional ./clone.js
// @optional ./detach.js
// @optional ./empty.js
// @optional ./html.js
// @optional ./insert_after.js
// @optional ./insert_before.js
// @optional ./prepend.js
// @optional ./prepend_to.js
// @optional ./remove.js
// @optional ./replace_all.js
// @optional ./replace_with.js
// @optional ./text.js
// @require core/cash.js
// @require core/variables.js


var docEle = doc.documentElement;

fn.offset = function () {
  var ele = this[0];
  if (!ele) return;
  var rect = ele.getBoundingClientRect();
  return {
    top: rect.top + win.pageYOffset - docEle.clientTop,
    left: rect.left + win.pageXOffset - docEle.clientLeft
  };
}; // @require core/cash.js


fn.offsetParent = function () {
  return cash(this[0] && this[0].offsetParent);
}; // @require core/cash.js


fn.position = function () {
  var ele = this[0];
  if (!ele) return;
  return {
    left: ele.offsetLeft,
    top: ele.offsetTop
  };
}; // @optional ./offset.js
// @optional ./offset_parent.js
// @optional ./position.js
// @require core/cash.js
// @require core/matches.js
// @require core/unique.js
// @require collection/each.js
// @require collection/filter.js


fn.children = function (selector) {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, ele.children);
  });
  result = cash(unique(result));
  if (!selector) return result;
  return result.filter(function (i, ele) {
    return matches(ele, selector);
  });
}; // @require core/cash.js
// @require core/unique.js
// @require collection/each.js


fn.contents = function () {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes);
  });
  return cash(result.length && unique(result));
}; // @require core/cash.js
// @require core/unique.js
// @require core/find.js
// @require core/variables.js


fn.find = function (selector) {
  var result = [];

  for (var i = 0, l = this.length; i < l; i++) {
    var found = find(selector, this[i]);

    if (found.length) {
      push.apply(result, found);
    }
  }

  return cash(result.length && unique(result));
}; // @require core/cash.js
// @require core/find.js
// @require core/type_checking.js
// @require collection/filter.js


fn.has = function (selector) {
  var comparator = isString(selector) ? function (i, ele) {
    return !!find(selector, ele).length;
  } : function (i, ele) {
    return ele.contains(selector);
  };
  return this.filter(comparator);
}; // @require core/cash.js
// @require core/get_compare_function.js
// @require collection/each.js


fn.is = function (selector) {
  if (!selector || !this[0]) return false;
  var comparator = getCompareFunction(selector);
  var check = false;
  this.each(function (i, ele) {
    check = comparator(i, ele, selector);
    return !check;
  });
  return check;
}; // @require core/cash.js


fn.next = function () {
  return cash(this[0] && this[0].nextElementSibling);
}; // @require core/cash.js
// @require core/get_compare_function.js
// @require collection/filter.js


fn.not = function (selector) {
  if (!selector || !this[0]) return this;
  var comparator = getCompareFunction(selector);
  return this.filter(function (i, ele) {
    return !comparator(i, ele, selector);
  });
}; // @require core/cash.js
// @require core/unique.js
// @require collection/each.js


fn.parent = function () {
  var result = [];
  this.each(function (i, ele) {
    if (ele && ele.parentNode) {
      result.push(ele.parentNode);
    }
  });
  return cash(unique(result));
}; // @require core/cash.js
// @require core/variables.js
// @require traversal/children.js
// @require traversal/parent.js
// @require ./get.js
//FIXME Ugly file name, is there a better option?


fn.index = function (ele) {
  var child = ele ? cash(ele)[0] : this[0],
      collection = ele ? this : cash(child).parent().children();
  return indexOf.call(collection, child);
}; // @optional ./add.js
// @optional ./each.js
// @optional ./eq.js
// @optional ./filter.js
// @optional ./first.js
// @optional ./get.js
// @optional ./indexFn.js
// @optional ./last.js
// @optional ./map.js
// @optional ./slice.js
// @require core/cash.js
// @require collection/filter.js
// @require ./is.js
// @require ./parent.js


fn.closest = function (selector) {
  if (!selector || !this[0]) return cash();
  if (this.is(selector)) return this.filter(selector);
  return this.parent().closest(selector);
}; // @require core/cash.js
// @require core/matches.js
// @require core/unique.js
// @require core/variables.js
// @require collection/each.js


fn.parents = function (selector) {
  var result = [];
  var last;
  this.each(function (i, ele) {
    last = ele;

    while (last && last.parentNode && last !== doc.body.parentNode) {
      last = last.parentNode;

      if (!selector || selector && matches(last, selector)) {
        result.push(last);
      }
    }
  });
  return cash(unique(result));
}; // @require core/cash.js


fn.prev = function () {
  return cash(this[0] && this[0].previousElementSibling);
}; // @require core/cash.js
// @require collection/filter.js
// @require ./children.js
// @require ./parent.js


fn.siblings = function () {
  var ele = this[0];
  return this.parent().children().filter(function (i, child) {
    return child !== ele;
  });
}; // @optional ./children.js
// @optional ./closest.js
// @optional ./contents.js
// @optional ./find.js
// @optional ./has.js
// @optional ./is.js
// @optional ./next.js
// @optional ./not.js
// @optional ./parent.js
// @optional ./parents.js
// @optional ./prev.js
// @optional ./siblings.js
// @optional attributes/index.js
// @optional collection/index.js
// @optional css/index.js
// @optional data/index.js
// @optional dimensions/index.js
// @optional events/index.js
// @optional forms/index.js
// @optional manipulation/index.js
// @optional offset/index.js
// @optional traversal/index.js
// @require core/index.js
})();(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dragula = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';

function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}

function addClass (el, className) {
  var current = el.className;
  if (!current.length) {
    el.className = className;
  } else if (!lookupClass(className).test(current)) {
    el.className += ' ' + className;
  }
}

function rmClass (el, className) {
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}

module.exports = {
  add: addClass,
  rm: rmClass
};

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var emitter = require('contra/emitter');
var crossvent = require('crossvent');
var classes = require('./classes');
var doc = document;
var documentElement = doc.documentElement;

function dragula (initialContainers, options) {
  var len = arguments.length;
  if (len === 1 && Array.isArray(initialContainers) === false) {
    options = initialContainers;
    initialContainers = [];
  }
  var _mirror; // mirror image
  var _source; // source container
  var _item; // item being dragged
  var _offsetX; // reference x
  var _offsetY; // reference y
  var _moveX; // reference move x
  var _moveY; // reference move y
  var _initialSibling; // reference sibling when grabbed
  var _currentSibling; // reference sibling now
  var _copy; // item used for copying
  var _renderTimer; // timer for setTimeout renderMirrorImage
  var _lastDropTarget = null; // last container item was over
  var _grabbed; // holds mousedown context until first mousemove

  var o = options || {};
  if (o.moves === void 0) { o.moves = always; }
  if (o.accepts === void 0) { o.accepts = always; }
  if (o.invalid === void 0) { o.invalid = invalidTarget; }
  if (o.containers === void 0) { o.containers = initialContainers || []; }
  if (o.isContainer === void 0) { o.isContainer = never; }
  if (o.copy === void 0) { o.copy = false; }
  if (o.copySortSource === void 0) { o.copySortSource = false; }
  if (o.revertOnSpill === void 0) { o.revertOnSpill = false; }
  if (o.removeOnSpill === void 0) { o.removeOnSpill = false; }
  if (o.direction === void 0) { o.direction = 'vertical'; }
  if (o.ignoreInputTextSelection === void 0) { o.ignoreInputTextSelection = true; }
  if (o.mirrorContainer === void 0) { o.mirrorContainer = doc.body; }

  var drake = emitter({
    containers: o.containers,
    start: manualStart,
    end: end,
    cancel: cancel,
    remove: remove,
    destroy: destroy,
    canMove: canMove,
    dragging: false
  });

  if (o.removeOnSpill === true) {
    drake.on('over', spillOver).on('out', spillOut);
  }

  events();

  return drake;

  function isContainer (el) {
    return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
  }

  function events (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousedown', grab);
    touchy(documentElement, op, 'mouseup', release);
  }

  function eventualMovements (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
  }

  function movements (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
    crossvent[op](documentElement, 'click', preventGrabbed);
  }

  function destroy () {
    events(true);
    release({});
  }

  function preventGrabbed (e) {
    if (_grabbed) {
      e.preventDefault();
    }
  }

  function grab (e) {
    _moveX = e.clientX;
    _moveY = e.clientY;

    var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
    if (ignore) {
      return; // we only care about honest-to-god left clicks and touch events
    }
    var item = e.target;
    var context = canStart(item);
    if (!context) {
      return;
    }
    _grabbed = context;
    eventualMovements();
    if (e.type === 'mousedown') {
      if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
        item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
      } else {
        e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
      }
    }
  }

  function startBecauseMouseMoved (e) {
    if (!_grabbed) {
      return;
    }
    if (whichMouseButton(e) === 0) {
      release({});
      return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
    }
    // truthy check fixes #239, equality fixes #207
    if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
      return;
    }
    if (o.ignoreInputTextSelection) {
      var clientX = getCoord('clientX', e);
      var clientY = getCoord('clientY', e);
      var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
      if (isInput(elementBehindCursor)) {
        return;
      }
    }

    var grabbed = _grabbed; // call to end() unsets _grabbed
    eventualMovements(true);
    movements();
    end();
    start(grabbed);

    var offset = getOffset(_item);
    _offsetX = getCoord('pageX', e) - offset.left;
    _offsetY = getCoord('pageY', e) - offset.top;

    classes.add(_copy || _item, 'gu-transit');
    renderMirrorImage();
    drag(e);
  }

  function canStart (item) {
    if (drake.dragging && _mirror) {
      return;
    }
    if (isContainer(item)) {
      return; // don't drag container itself
    }
    var handle = item;
    while (getParent(item) && isContainer(getParent(item)) === false) {
      if (o.invalid(item, handle)) {
        return;
      }
      item = getParent(item); // drag target should be a top element
      if (!item) {
        return;
      }
    }
    var source = getParent(item);
    if (!source) {
      return;
    }
    if (o.invalid(item, handle)) {
      return;
    }

    var movable = o.moves(item, source, handle, nextEl(item));
    if (!movable) {
      return;
    }

    return {
      item: item,
      source: source
    };
  }

  function canMove (item) {
    return !!canStart(item);
  }

  function manualStart (item) {
    var context = canStart(item);
    if (context) {
      start(context);
    }
  }

  function start (context) {
    if (isCopy(context.item, context.source)) {
      _copy = context.item.cloneNode(true);
      drake.emit('cloned', _copy, context.item, 'copy');
    }

    _source = context.source;
    _item = context.item;
    _initialSibling = _currentSibling = nextEl(context.item);

    drake.dragging = true;
    drake.emit('drag', _item, _source);
  }

  function invalidTarget () {
    return false;
  }

  function end () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    drop(item, getParent(item));
  }

  function ungrab () {
    _grabbed = false;
    eventualMovements(true);
    movements(true);
  }

  function release (e) {
    ungrab();

    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
      drop(item, dropTarget);
    } else if (o.removeOnSpill) {
      remove();
    } else {
      cancel();
    }
  }

  function drop (item, target) {
    var parent = getParent(item);
    if (_copy && o.copySortSource && target === _source) {
      parent.removeChild(_item);
    }
    if (isInitialPlacement(target)) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, target, _source, _currentSibling);
    }
    cleanup();
  }

  function remove () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var parent = getParent(item);
    if (parent) {
      parent.removeChild(item);
    }
    drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
    cleanup();
  }

  function cancel (revert) {
    if (!drake.dragging) {
      return;
    }
    var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
    var item = _copy || _item;
    var parent = getParent(item);
    var initial = isInitialPlacement(parent);
    if (initial === false && reverts) {
      if (_copy) {
        if (parent) {
          parent.removeChild(_copy);
        }
      } else {
        _source.insertBefore(item, _initialSibling);
      }
    }
    if (initial || reverts) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, parent, _source, _currentSibling);
    }
    cleanup();
  }

  function cleanup () {
    var item = _copy || _item;
    ungrab();
    removeMirrorImage();
    if (item) {
      classes.rm(item, 'gu-transit');
    }
    if (_renderTimer) {
      clearTimeout(_renderTimer);
    }
    drake.dragging = false;
    if (_lastDropTarget) {
      drake.emit('out', item, _lastDropTarget, _source);
    }
    drake.emit('dragend', item);
    _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
  }

  function isInitialPlacement (target, s) {
    var sibling;
    if (s !== void 0) {
      sibling = s;
    } else if (_mirror) {
      sibling = _currentSibling;
    } else {
      sibling = nextEl(_copy || _item);
    }
    return target === _source && sibling === _initialSibling;
  }

  function findDropTarget (elementBehindCursor, clientX, clientY) {
    var target = elementBehindCursor;
    while (target && !accepted()) {
      target = getParent(target);
    }
    return target;

    function accepted () {
      var droppable = isContainer(target);
      if (droppable === false) {
        return false;
      }

      var immediate = getImmediateChild(target, elementBehindCursor);
      var reference = getReference(target, immediate, clientX, clientY);
      var initial = isInitialPlacement(target, reference);
      if (initial) {
        return true; // should always be able to drop it right back where it was
      }
      return o.accepts(_item, target, _source, reference);
    }
  }

  function drag (e) {
    if (!_mirror) {
      return;
    }
    e.preventDefault();

    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var x = clientX - _offsetX;
    var y = clientY - _offsetY;

    _mirror.style.left = x + 'px';
    _mirror.style.top = y + 'px';

    var item = _copy || _item;
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
    if (changed || dropTarget === null) {
      out();
      _lastDropTarget = dropTarget;
      over();
    }
    var parent = getParent(item);
    if (dropTarget === _source && _copy && !o.copySortSource) {
      if (parent) {
        parent.removeChild(item);
      }
      return;
    }
    var reference;
    var immediate = getImmediateChild(dropTarget, elementBehindCursor);
    if (immediate !== null) {
      reference = getReference(dropTarget, immediate, clientX, clientY);
    } else if (o.revertOnSpill === true && !_copy) {
      reference = _initialSibling;
      dropTarget = _source;
    } else {
      if (_copy && parent) {
        parent.removeChild(item);
      }
      return;
    }
    if (
      (reference === null && changed) ||
      reference !== item &&
      reference !== nextEl(item)
    ) {
      _currentSibling = reference;
      dropTarget.insertBefore(item, reference);
      drake.emit('shadow', item, dropTarget, _source);
    }
    function moved (type) { drake.emit(type, item, _lastDropTarget, _source); }
    function over () { if (changed) { moved('over'); } }
    function out () { if (_lastDropTarget) { moved('out'); } }
  }

  function spillOver (el) {
    classes.rm(el, 'gu-hide');
  }

  function spillOut (el) {
    if (drake.dragging) { classes.add(el, 'gu-hide'); }
  }

  function renderMirrorImage () {
    if (_mirror) {
      return;
    }
    var rect = _item.getBoundingClientRect();
    _mirror = _item.cloneNode(true);
    _mirror.style.width = getRectWidth(rect) + 'px';
    _mirror.style.height = getRectHeight(rect) + 'px';
    classes.rm(_mirror, 'gu-transit');
    classes.add(_mirror, 'gu-mirror');
    o.mirrorContainer.appendChild(_mirror);
    touchy(documentElement, 'add', 'mousemove', drag);
    classes.add(o.mirrorContainer, 'gu-unselectable');
    drake.emit('cloned', _mirror, _item, 'mirror');
  }

  function removeMirrorImage () {
    if (_mirror) {
      classes.rm(o.mirrorContainer, 'gu-unselectable');
      touchy(documentElement, 'remove', 'mousemove', drag);
      getParent(_mirror).removeChild(_mirror);
      _mirror = null;
    }
  }

  function getImmediateChild (dropTarget, target) {
    var immediate = target;
    while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
      immediate = getParent(immediate);
    }
    if (immediate === documentElement) {
      return null;
    }
    return immediate;
  }

  function getReference (dropTarget, target, x, y) {
    var horizontal = o.direction === 'horizontal';
    var reference = target !== dropTarget ? inside() : outside();
    return reference;

    function outside () { // slower, but able to figure out any position
      var len = dropTarget.children.length;
      var i;
      var el;
      var rect;
      for (i = 0; i < len; i++) {
        el = dropTarget.children[i];
        rect = el.getBoundingClientRect();
        if (horizontal && (rect.left + rect.width / 2) > x) { return el; }
        if (!horizontal && (rect.top + rect.height / 2) > y) { return el; }
      }
      return null;
    }

    function inside () { // faster, but only available if dropped inside a child element
      var rect = target.getBoundingClientRect();
      if (horizontal) {
        return resolve(x > rect.left + getRectWidth(rect) / 2);
      }
      return resolve(y > rect.top + getRectHeight(rect) / 2);
    }

    function resolve (after) {
      return after ? nextEl(target) : target;
    }
  }

  function isCopy (item, container) {
    return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
  }
}

function touchy (el, op, type, fn) {
  var touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  };
  var pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    mousemove: 'pointermove'
  };
  var microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  };
  if (global.navigator.pointerEnabled) {
    crossvent[op](el, pointers[type], fn);
  } else if (global.navigator.msPointerEnabled) {
    crossvent[op](el, microsoft[type], fn);
  } else {
    crossvent[op](el, touch[type], fn);
    crossvent[op](el, type, fn);
  }
}

function whichMouseButton (e) {
  if (e.touches !== void 0) { return e.touches.length; }
  if (e.which !== void 0 && e.which !== 0) { return e.which; } // see https://github.com/bevacqua/dragula/issues/261
  if (e.buttons !== void 0) { return e.buttons; }
  var button = e.button;
  if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
  }
}

function getOffset (el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
    top: rect.top + getScroll('scrollTop', 'pageYOffset')
  };
}

function getScroll (scrollProp, offsetProp) {
  if (typeof global[offsetProp] !== 'undefined') {
    return global[offsetProp];
  }
  if (documentElement.clientHeight) {
    return documentElement[scrollProp];
  }
  return doc.body[scrollProp];
}

function getElementBehindPoint (point, x, y) {
  var p = point || {};
  var state = p.className;
  var el;
  p.className += ' gu-hide';
  el = doc.elementFromPoint(x, y);
  p.className = state;
  return el;
}

function never () { return false; }
function always () { return true; }
function getRectWidth (rect) { return rect.width || (rect.right - rect.left); }
function getRectHeight (rect) { return rect.height || (rect.bottom - rect.top); }
function getParent (el) { return el.parentNode === doc ? null : el.parentNode; }
function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el); }
function isEditable (el) {
  if (!el) { return false; } // no parents were editable
  if (el.contentEditable === 'false') { return false; } // stop the lookup
  if (el.contentEditable === 'true') { return true; } // found a contentEditable element in the chain
  return isEditable(getParent(el)); // contentEditable is set to 'inherit'
}

function nextEl (el) {
  return el.nextElementSibling || manually();
  function manually () {
    var sibling = el;
    do {
      sibling = sibling.nextSibling;
    } while (sibling && sibling.nodeType !== 1);
    return sibling;
  }
}

function getEventHost (e) {
  // on touchend event, we have to use `e.changedTouches`
  // see http://stackoverflow.com/questions/7192563/touchend-event-properties
  // see https://github.com/bevacqua/dragula/issues/34
  if (e.targetTouches && e.targetTouches.length) {
    return e.targetTouches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function getCoord (coord, e) {
  var host = getEventHost(e);
  var missMap = {
    pageX: 'clientX', // IE8
    pageY: 'clientY' // IE8
  };
  if (coord in missMap && !(coord in host) && missMap[coord] in host) {
    coord = missMap[coord];
  }
  return host[coord];
}

module.exports = dragula;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./classes":1,"contra/emitter":5,"crossvent":6}],3:[function(require,module,exports){
module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }

},{}],4:[function(require,module,exports){
'use strict';

var ticky = require('ticky');

module.exports = function debounce (fn, args, ctx) {
  if (!fn) { return; }
  ticky(function run () {
    fn.apply(ctx || null, args || []);
  });
};

},{"ticky":9}],5:[function(require,module,exports){
'use strict';

var atoa = require('atoa');
var debounce = require('./debounce');

module.exports = function emitter (thing, options) {
  var opts = options || {};
  var evt = {};
  if (thing === undefined) { thing = {}; }
  thing.on = function (type, fn) {
    if (!evt[type]) {
      evt[type] = [fn];
    } else {
      evt[type].push(fn);
    }
    return thing;
  };
  thing.once = function (type, fn) {
    fn._once = true; // thing.off(fn) still works!
    thing.on(type, fn);
    return thing;
  };
  thing.off = function (type, fn) {
    var c = arguments.length;
    if (c === 1) {
      delete evt[type];
    } else if (c === 0) {
      evt = {};
    } else {
      var et = evt[type];
      if (!et) { return thing; }
      et.splice(et.indexOf(fn), 1);
    }
    return thing;
  };
  thing.emit = function () {
    var args = atoa(arguments);
    return thing.emitterSnapshot(args.shift()).apply(this, args);
  };
  thing.emitterSnapshot = function (type) {
    var et = (evt[type] || []).slice(0);
    return function () {
      var args = atoa(arguments);
      var ctx = this || thing;
      if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
      et.forEach(function emitter (listen) {
        if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
        if (listen._once) { thing.off(type, listen); }
      });
      return thing;
    };
  };
  return thing;
};

},{"./debounce":4,"atoa":3}],6:[function(require,module,exports){
(function (global){
'use strict';

var customEvent = require('custom-event');
var eventmap = require('./eventmap');
var doc = global.document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}

function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}

function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}

function removeEventHard (el, type, fn) {
  var listener = unwrap(el, type, fn);
  if (listener) {
    return el.detachEvent('on' + type, listener);
  }
}

function fabricateEvent (el, type, model) {
  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
  }
  function makeClassicEvent () {
    var e;
    if (doc.createEvent) {
      e = doc.createEvent('Event');
      e.initEvent(type, true, true);
    } else if (doc.createEventObject) {
      e = doc.createEventObject();
    }
    return e;
  }
  function makeCustomEvent () {
    return new customEvent(type, { detail: model });
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    e.which = e.which || e.keyCode;
    fn.call(el, e);
  };
}

function wrap (el, type, fn) {
  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
  hardCache.push({
    wrapper: wrapper,
    element: el,
    type: type,
    fn: fn
  });
  return wrapper;
}

function unwrap (el, type, fn) {
  var i = find(el, type, fn);
  if (i) {
    var wrapper = hardCache[i].wrapper;
    hardCache.splice(i, 1); // free up a tad of memory
    return wrapper;
  }
}

function find (el, type, fn) {
  var i, item;
  for (i = 0; i < hardCache.length; i++) {
    item = hardCache[i];
    if (item.element === el && item.type === type && item.fn === fn) {
      return i;
    }
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./eventmap":7,"custom-event":8}],7:[function(require,module,exports){
(function (global){
'use strict';

var eventmap = [];
var eventname = '';
var ron = /^on/;

for (eventname in global) {
  if (ron.test(eventname)) {
    eventmap.push(eventname.slice(2));
  }
}

module.exports = eventmap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
(function (global){

var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGFzc2VzLmpzIiwiZHJhZ3VsYS5qcyIsIm5vZGVfbW9kdWxlcy9hdG9hL2F0b2EuanMiLCJub2RlX21vZHVsZXMvY29udHJhL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2NvbnRyYS9lbWl0dGVyLmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvZXZlbnRtYXAuanMiLCJub2RlX21vZHVsZXMvY3VzdG9tLWV2ZW50L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3RpY2t5L3RpY2t5LWJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2htQkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FjaGUgPSB7fTtcbnZhciBzdGFydCA9ICcoPzpefFxcXFxzKSc7XG52YXIgZW5kID0gJyg/OlxcXFxzfCQpJztcblxuZnVuY3Rpb24gbG9va3VwQ2xhc3MgKGNsYXNzTmFtZSkge1xuICB2YXIgY2FjaGVkID0gY2FjaGVbY2xhc3NOYW1lXTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIGNhY2hlZC5sYXN0SW5kZXggPSAwO1xuICB9IGVsc2Uge1xuICAgIGNhY2hlW2NsYXNzTmFtZV0gPSBjYWNoZWQgPSBuZXcgUmVnRXhwKHN0YXJ0ICsgY2xhc3NOYW1lICsgZW5kLCAnZycpO1xuICB9XG4gIHJldHVybiBjYWNoZWQ7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzIChlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjdXJyZW50ID0gZWwuY2xhc3NOYW1lO1xuICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICB9IGVsc2UgaWYgKCFsb29rdXBDbGFzcyhjbGFzc05hbWUpLnRlc3QoY3VycmVudCkpIHtcbiAgICBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJtQ2xhc3MgKGVsLCBjbGFzc05hbWUpIHtcbiAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobG9va3VwQ2xhc3MoY2xhc3NOYW1lKSwgJyAnKS50cmltKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZENsYXNzLFxuICBybTogcm1DbGFzc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVtaXR0ZXIgPSByZXF1aXJlKCdjb250cmEvZW1pdHRlcicpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG5mdW5jdGlvbiBkcmFndWxhIChpbml0aWFsQ29udGFpbmVycywgb3B0aW9ucykge1xuICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgaWYgKGxlbiA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGluaXRpYWxDb250YWluZXJzKSA9PT0gZmFsc2UpIHtcbiAgICBvcHRpb25zID0gaW5pdGlhbENvbnRhaW5lcnM7XG4gICAgaW5pdGlhbENvbnRhaW5lcnMgPSBbXTtcbiAgfVxuICB2YXIgX21pcnJvcjsgLy8gbWlycm9yIGltYWdlXG4gIHZhciBfc291cmNlOyAvLyBzb3VyY2UgY29udGFpbmVyXG4gIHZhciBfaXRlbTsgLy8gaXRlbSBiZWluZyBkcmFnZ2VkXG4gIHZhciBfb2Zmc2V0WDsgLy8gcmVmZXJlbmNlIHhcbiAgdmFyIF9vZmZzZXRZOyAvLyByZWZlcmVuY2UgeVxuICB2YXIgX21vdmVYOyAvLyByZWZlcmVuY2UgbW92ZSB4XG4gIHZhciBfbW92ZVk7IC8vIHJlZmVyZW5jZSBtb3ZlIHlcbiAgdmFyIF9pbml0aWFsU2libGluZzsgLy8gcmVmZXJlbmNlIHNpYmxpbmcgd2hlbiBncmFiYmVkXG4gIHZhciBfY3VycmVudFNpYmxpbmc7IC8vIHJlZmVyZW5jZSBzaWJsaW5nIG5vd1xuICB2YXIgX2NvcHk7IC8vIGl0ZW0gdXNlZCBmb3IgY29weWluZ1xuICB2YXIgX3JlbmRlclRpbWVyOyAvLyB0aW1lciBmb3Igc2V0VGltZW91dCByZW5kZXJNaXJyb3JJbWFnZVxuICB2YXIgX2xhc3REcm9wVGFyZ2V0ID0gbnVsbDsgLy8gbGFzdCBjb250YWluZXIgaXRlbSB3YXMgb3ZlclxuICB2YXIgX2dyYWJiZWQ7IC8vIGhvbGRzIG1vdXNlZG93biBjb250ZXh0IHVudGlsIGZpcnN0IG1vdXNlbW92ZVxuXG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKG8ubW92ZXMgPT09IHZvaWQgMCkgeyBvLm1vdmVzID0gYWx3YXlzOyB9XG4gIGlmIChvLmFjY2VwdHMgPT09IHZvaWQgMCkgeyBvLmFjY2VwdHMgPSBhbHdheXM7IH1cbiAgaWYgKG8uaW52YWxpZCA9PT0gdm9pZCAwKSB7IG8uaW52YWxpZCA9IGludmFsaWRUYXJnZXQ7IH1cbiAgaWYgKG8uY29udGFpbmVycyA9PT0gdm9pZCAwKSB7IG8uY29udGFpbmVycyA9IGluaXRpYWxDb250YWluZXJzIHx8IFtdOyB9XG4gIGlmIChvLmlzQ29udGFpbmVyID09PSB2b2lkIDApIHsgby5pc0NvbnRhaW5lciA9IG5ldmVyOyB9XG4gIGlmIChvLmNvcHkgPT09IHZvaWQgMCkgeyBvLmNvcHkgPSBmYWxzZTsgfVxuICBpZiAoby5jb3B5U29ydFNvdXJjZSA9PT0gdm9pZCAwKSB7IG8uY29weVNvcnRTb3VyY2UgPSBmYWxzZTsgfVxuICBpZiAoby5yZXZlcnRPblNwaWxsID09PSB2b2lkIDApIHsgby5yZXZlcnRPblNwaWxsID0gZmFsc2U7IH1cbiAgaWYgKG8ucmVtb3ZlT25TcGlsbCA9PT0gdm9pZCAwKSB7IG8ucmVtb3ZlT25TcGlsbCA9IGZhbHNlOyB9XG4gIGlmIChvLmRpcmVjdGlvbiA9PT0gdm9pZCAwKSB7IG8uZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJzsgfVxuICBpZiAoby5pZ25vcmVJbnB1dFRleHRTZWxlY3Rpb24gPT09IHZvaWQgMCkgeyBvLmlnbm9yZUlucHV0VGV4dFNlbGVjdGlvbiA9IHRydWU7IH1cbiAgaWYgKG8ubWlycm9yQ29udGFpbmVyID09PSB2b2lkIDApIHsgby5taXJyb3JDb250YWluZXIgPSBkb2MuYm9keTsgfVxuXG4gIHZhciBkcmFrZSA9IGVtaXR0ZXIoe1xuICAgIGNvbnRhaW5lcnM6IG8uY29udGFpbmVycyxcbiAgICBzdGFydDogbWFudWFsU3RhcnQsXG4gICAgZW5kOiBlbmQsXG4gICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgcmVtb3ZlOiByZW1vdmUsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBjYW5Nb3ZlOiBjYW5Nb3ZlLFxuICAgIGRyYWdnaW5nOiBmYWxzZVxuICB9KTtcblxuICBpZiAoby5yZW1vdmVPblNwaWxsID09PSB0cnVlKSB7XG4gICAgZHJha2Uub24oJ292ZXInLCBzcGlsbE92ZXIpLm9uKCdvdXQnLCBzcGlsbE91dCk7XG4gIH1cblxuICBldmVudHMoKTtcblxuICByZXR1cm4gZHJha2U7XG5cbiAgZnVuY3Rpb24gaXNDb250YWluZXIgKGVsKSB7XG4gICAgcmV0dXJuIGRyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihlbCkgIT09IC0xIHx8IG8uaXNDb250YWluZXIoZWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZXZlbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIHRvdWNoeShkb2N1bWVudEVsZW1lbnQsIG9wLCAnbW91c2Vkb3duJywgZ3JhYik7XG4gICAgdG91Y2h5KGRvY3VtZW50RWxlbWVudCwgb3AsICdtb3VzZXVwJywgcmVsZWFzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudHVhbE1vdmVtZW50cyAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICB0b3VjaHkoZG9jdW1lbnRFbGVtZW50LCBvcCwgJ21vdXNlbW92ZScsIHN0YXJ0QmVjYXVzZU1vdXNlTW92ZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZW1lbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZG9jdW1lbnRFbGVtZW50LCAnc2VsZWN0c3RhcnQnLCBwcmV2ZW50R3JhYmJlZCk7IC8vIElFOFxuICAgIGNyb3NzdmVudFtvcF0oZG9jdW1lbnRFbGVtZW50LCAnY2xpY2snLCBwcmV2ZW50R3JhYmJlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBldmVudHModHJ1ZSk7XG4gICAgcmVsZWFzZSh7fSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2ZW50R3JhYmJlZCAoZSkge1xuICAgIGlmIChfZ3JhYmJlZCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdyYWIgKGUpIHtcbiAgICBfbW92ZVggPSBlLmNsaWVudFg7XG4gICAgX21vdmVZID0gZS5jbGllbnRZO1xuXG4gICAgdmFyIGlnbm9yZSA9IHdoaWNoTW91c2VCdXR0b24oZSkgIT09IDEgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleTtcbiAgICBpZiAoaWdub3JlKSB7XG4gICAgICByZXR1cm47IC8vIHdlIG9ubHkgY2FyZSBhYm91dCBob25lc3QtdG8tZ29kIGxlZnQgY2xpY2tzIGFuZCB0b3VjaCBldmVudHNcbiAgICB9XG4gICAgdmFyIGl0ZW0gPSBlLnRhcmdldDtcbiAgICB2YXIgY29udGV4dCA9IGNhblN0YXJ0KGl0ZW0pO1xuICAgIGlmICghY29udGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfZ3JhYmJlZCA9IGNvbnRleHQ7XG4gICAgZXZlbnR1YWxNb3ZlbWVudHMoKTtcbiAgICBpZiAoZS50eXBlID09PSAnbW91c2Vkb3duJykge1xuICAgICAgaWYgKGlzSW5wdXQoaXRlbSkpIHsgLy8gc2VlIGFsc286IGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhL2lzc3Vlcy8yMDhcbiAgICAgICAgaXRlbS5mb2N1cygpOyAvLyBmaXhlcyBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYS9pc3N1ZXMvMTc2XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIGZpeGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhL2lzc3Vlcy8xNTVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEJlY2F1c2VNb3VzZU1vdmVkIChlKSB7XG4gICAgaWYgKCFfZ3JhYmJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAod2hpY2hNb3VzZUJ1dHRvbihlKSA9PT0gMCkge1xuICAgICAgcmVsZWFzZSh7fSk7XG4gICAgICByZXR1cm47IC8vIHdoZW4gdGV4dCBpcyBzZWxlY3RlZCBvbiBhbiBpbnB1dCBhbmQgdGhlbiBkcmFnZ2VkLCBtb3VzZXVwIGRvZXNuJ3QgZmlyZS4gdGhpcyBpcyBvdXIgb25seSBob3BlXG4gICAgfVxuICAgIC8vIHRydXRoeSBjaGVjayBmaXhlcyAjMjM5LCBlcXVhbGl0eSBmaXhlcyAjMjA3XG4gICAgaWYgKGUuY2xpZW50WCAhPT0gdm9pZCAwICYmIGUuY2xpZW50WCA9PT0gX21vdmVYICYmIGUuY2xpZW50WSAhPT0gdm9pZCAwICYmIGUuY2xpZW50WSA9PT0gX21vdmVZKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvLmlnbm9yZUlucHV0VGV4dFNlbGVjdGlvbikge1xuICAgICAgdmFyIGNsaWVudFggPSBnZXRDb29yZCgnY2xpZW50WCcsIGUpO1xuICAgICAgdmFyIGNsaWVudFkgPSBnZXRDb29yZCgnY2xpZW50WScsIGUpO1xuICAgICAgdmFyIGVsZW1lbnRCZWhpbmRDdXJzb3IgPSBkb2MuZWxlbWVudEZyb21Qb2ludChjbGllbnRYLCBjbGllbnRZKTtcbiAgICAgIGlmIChpc0lucHV0KGVsZW1lbnRCZWhpbmRDdXJzb3IpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZ3JhYmJlZCA9IF9ncmFiYmVkOyAvLyBjYWxsIHRvIGVuZCgpIHVuc2V0cyBfZ3JhYmJlZFxuICAgIGV2ZW50dWFsTW92ZW1lbnRzKHRydWUpO1xuICAgIG1vdmVtZW50cygpO1xuICAgIGVuZCgpO1xuICAgIHN0YXJ0KGdyYWJiZWQpO1xuXG4gICAgdmFyIG9mZnNldCA9IGdldE9mZnNldChfaXRlbSk7XG4gICAgX29mZnNldFggPSBnZXRDb29yZCgncGFnZVgnLCBlKSAtIG9mZnNldC5sZWZ0O1xuICAgIF9vZmZzZXRZID0gZ2V0Q29vcmQoJ3BhZ2VZJywgZSkgLSBvZmZzZXQudG9wO1xuXG4gICAgY2xhc3Nlcy5hZGQoX2NvcHkgfHwgX2l0ZW0sICdndS10cmFuc2l0Jyk7XG4gICAgcmVuZGVyTWlycm9ySW1hZ2UoKTtcbiAgICBkcmFnKGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuU3RhcnQgKGl0ZW0pIHtcbiAgICBpZiAoZHJha2UuZHJhZ2dpbmcgJiYgX21pcnJvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNDb250YWluZXIoaXRlbSkpIHtcbiAgICAgIHJldHVybjsgLy8gZG9uJ3QgZHJhZyBjb250YWluZXIgaXRzZWxmXG4gICAgfVxuICAgIHZhciBoYW5kbGUgPSBpdGVtO1xuICAgIHdoaWxlIChnZXRQYXJlbnQoaXRlbSkgJiYgaXNDb250YWluZXIoZ2V0UGFyZW50KGl0ZW0pKSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChvLmludmFsaWQoaXRlbSwgaGFuZGxlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpdGVtID0gZ2V0UGFyZW50KGl0ZW0pOyAvLyBkcmFnIHRhcmdldCBzaG91bGQgYmUgYSB0b3AgZWxlbWVudFxuICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHNvdXJjZSA9IGdldFBhcmVudChpdGVtKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoby5pbnZhbGlkKGl0ZW0sIGhhbmRsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbW92YWJsZSA9IG8ubW92ZXMoaXRlbSwgc291cmNlLCBoYW5kbGUsIG5leHRFbChpdGVtKSk7XG4gICAgaWYgKCFtb3ZhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICBzb3VyY2U6IHNvdXJjZVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjYW5Nb3ZlIChpdGVtKSB7XG4gICAgcmV0dXJuICEhY2FuU3RhcnQoaXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYW51YWxTdGFydCAoaXRlbSkge1xuICAgIHZhciBjb250ZXh0ID0gY2FuU3RhcnQoaXRlbSk7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIHN0YXJ0KGNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0IChjb250ZXh0KSB7XG4gICAgaWYgKGlzQ29weShjb250ZXh0Lml0ZW0sIGNvbnRleHQuc291cmNlKSkge1xuICAgICAgX2NvcHkgPSBjb250ZXh0Lml0ZW0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgZHJha2UuZW1pdCgnY2xvbmVkJywgX2NvcHksIGNvbnRleHQuaXRlbSwgJ2NvcHknKTtcbiAgICB9XG5cbiAgICBfc291cmNlID0gY29udGV4dC5zb3VyY2U7XG4gICAgX2l0ZW0gPSBjb250ZXh0Lml0ZW07XG4gICAgX2luaXRpYWxTaWJsaW5nID0gX2N1cnJlbnRTaWJsaW5nID0gbmV4dEVsKGNvbnRleHQuaXRlbSk7XG5cbiAgICBkcmFrZS5kcmFnZ2luZyA9IHRydWU7XG4gICAgZHJha2UuZW1pdCgnZHJhZycsIF9pdGVtLCBfc291cmNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGludmFsaWRUYXJnZXQgKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZCAoKSB7XG4gICAgaWYgKCFkcmFrZS5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgaXRlbSA9IF9jb3B5IHx8IF9pdGVtO1xuICAgIGRyb3AoaXRlbSwgZ2V0UGFyZW50KGl0ZW0pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuZ3JhYiAoKSB7XG4gICAgX2dyYWJiZWQgPSBmYWxzZTtcbiAgICBldmVudHVhbE1vdmVtZW50cyh0cnVlKTtcbiAgICBtb3ZlbWVudHModHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWxlYXNlIChlKSB7XG4gICAgdW5ncmFiKCk7XG5cbiAgICBpZiAoIWRyYWtlLmRyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpdGVtID0gX2NvcHkgfHwgX2l0ZW07XG4gICAgdmFyIGNsaWVudFggPSBnZXRDb29yZCgnY2xpZW50WCcsIGUpO1xuICAgIHZhciBjbGllbnRZID0gZ2V0Q29vcmQoJ2NsaWVudFknLCBlKTtcbiAgICB2YXIgZWxlbWVudEJlaGluZEN1cnNvciA9IGdldEVsZW1lbnRCZWhpbmRQb2ludChfbWlycm9yLCBjbGllbnRYLCBjbGllbnRZKTtcbiAgICB2YXIgZHJvcFRhcmdldCA9IGZpbmREcm9wVGFyZ2V0KGVsZW1lbnRCZWhpbmRDdXJzb3IsIGNsaWVudFgsIGNsaWVudFkpO1xuICAgIGlmIChkcm9wVGFyZ2V0ICYmICgoX2NvcHkgJiYgby5jb3B5U29ydFNvdXJjZSkgfHwgKCFfY29weSB8fCBkcm9wVGFyZ2V0ICE9PSBfc291cmNlKSkpIHtcbiAgICAgIGRyb3AoaXRlbSwgZHJvcFRhcmdldCk7XG4gICAgfSBlbHNlIGlmIChvLnJlbW92ZU9uU3BpbGwpIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW5jZWwoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcm9wIChpdGVtLCB0YXJnZXQpIHtcbiAgICB2YXIgcGFyZW50ID0gZ2V0UGFyZW50KGl0ZW0pO1xuICAgIGlmIChfY29weSAmJiBvLmNvcHlTb3J0U291cmNlICYmIHRhcmdldCA9PT0gX3NvdXJjZSkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKF9pdGVtKTtcbiAgICB9XG4gICAgaWYgKGlzSW5pdGlhbFBsYWNlbWVudCh0YXJnZXQpKSB7XG4gICAgICBkcmFrZS5lbWl0KCdjYW5jZWwnLCBpdGVtLCBfc291cmNlLCBfc291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJha2UuZW1pdCgnZHJvcCcsIGl0ZW0sIHRhcmdldCwgX3NvdXJjZSwgX2N1cnJlbnRTaWJsaW5nKTtcbiAgICB9XG4gICAgY2xlYW51cCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlICgpIHtcbiAgICBpZiAoIWRyYWtlLmRyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpdGVtID0gX2NvcHkgfHwgX2l0ZW07XG4gICAgdmFyIHBhcmVudCA9IGdldFBhcmVudChpdGVtKTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgfVxuICAgIGRyYWtlLmVtaXQoX2NvcHkgPyAnY2FuY2VsJyA6ICdyZW1vdmUnLCBpdGVtLCBwYXJlbnQsIF9zb3VyY2UpO1xuICAgIGNsZWFudXAoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCAocmV2ZXJ0KSB7XG4gICAgaWYgKCFkcmFrZS5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcmV2ZXJ0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwID8gcmV2ZXJ0IDogby5yZXZlcnRPblNwaWxsO1xuICAgIHZhciBpdGVtID0gX2NvcHkgfHwgX2l0ZW07XG4gICAgdmFyIHBhcmVudCA9IGdldFBhcmVudChpdGVtKTtcbiAgICB2YXIgaW5pdGlhbCA9IGlzSW5pdGlhbFBsYWNlbWVudChwYXJlbnQpO1xuICAgIGlmIChpbml0aWFsID09PSBmYWxzZSAmJiByZXZlcnRzKSB7XG4gICAgICBpZiAoX2NvcHkpIHtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChfY29weSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9zb3VyY2UuaW5zZXJ0QmVmb3JlKGl0ZW0sIF9pbml0aWFsU2libGluZyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpbml0aWFsIHx8IHJldmVydHMpIHtcbiAgICAgIGRyYWtlLmVtaXQoJ2NhbmNlbCcsIGl0ZW0sIF9zb3VyY2UsIF9zb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFrZS5lbWl0KCdkcm9wJywgaXRlbSwgcGFyZW50LCBfc291cmNlLCBfY3VycmVudFNpYmxpbmcpO1xuICAgIH1cbiAgICBjbGVhbnVwKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICB2YXIgaXRlbSA9IF9jb3B5IHx8IF9pdGVtO1xuICAgIHVuZ3JhYigpO1xuICAgIHJlbW92ZU1pcnJvckltYWdlKCk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGNsYXNzZXMucm0oaXRlbSwgJ2d1LXRyYW5zaXQnKTtcbiAgICB9XG4gICAgaWYgKF9yZW5kZXJUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KF9yZW5kZXJUaW1lcik7XG4gICAgfVxuICAgIGRyYWtlLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgaWYgKF9sYXN0RHJvcFRhcmdldCkge1xuICAgICAgZHJha2UuZW1pdCgnb3V0JywgaXRlbSwgX2xhc3REcm9wVGFyZ2V0LCBfc291cmNlKTtcbiAgICB9XG4gICAgZHJha2UuZW1pdCgnZHJhZ2VuZCcsIGl0ZW0pO1xuICAgIF9zb3VyY2UgPSBfaXRlbSA9IF9jb3B5ID0gX2luaXRpYWxTaWJsaW5nID0gX2N1cnJlbnRTaWJsaW5nID0gX3JlbmRlclRpbWVyID0gX2xhc3REcm9wVGFyZ2V0ID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW5pdGlhbFBsYWNlbWVudCAodGFyZ2V0LCBzKSB7XG4gICAgdmFyIHNpYmxpbmc7XG4gICAgaWYgKHMgIT09IHZvaWQgMCkge1xuICAgICAgc2libGluZyA9IHM7XG4gICAgfSBlbHNlIGlmIChfbWlycm9yKSB7XG4gICAgICBzaWJsaW5nID0gX2N1cnJlbnRTaWJsaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaWJsaW5nID0gbmV4dEVsKF9jb3B5IHx8IF9pdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldCA9PT0gX3NvdXJjZSAmJiBzaWJsaW5nID09PSBfaW5pdGlhbFNpYmxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kRHJvcFRhcmdldCAoZWxlbWVudEJlaGluZEN1cnNvciwgY2xpZW50WCwgY2xpZW50WSkge1xuICAgIHZhciB0YXJnZXQgPSBlbGVtZW50QmVoaW5kQ3Vyc29yO1xuICAgIHdoaWxlICh0YXJnZXQgJiYgIWFjY2VwdGVkKCkpIHtcbiAgICAgIHRhcmdldCA9IGdldFBhcmVudCh0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuXG4gICAgZnVuY3Rpb24gYWNjZXB0ZWQgKCkge1xuICAgICAgdmFyIGRyb3BwYWJsZSA9IGlzQ29udGFpbmVyKHRhcmdldCk7XG4gICAgICBpZiAoZHJvcHBhYmxlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbW1lZGlhdGUgPSBnZXRJbW1lZGlhdGVDaGlsZCh0YXJnZXQsIGVsZW1lbnRCZWhpbmRDdXJzb3IpO1xuICAgICAgdmFyIHJlZmVyZW5jZSA9IGdldFJlZmVyZW5jZSh0YXJnZXQsIGltbWVkaWF0ZSwgY2xpZW50WCwgY2xpZW50WSk7XG4gICAgICB2YXIgaW5pdGlhbCA9IGlzSW5pdGlhbFBsYWNlbWVudCh0YXJnZXQsIHJlZmVyZW5jZSk7XG4gICAgICBpZiAoaW5pdGlhbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gc2hvdWxkIGFsd2F5cyBiZSBhYmxlIHRvIGRyb3AgaXQgcmlnaHQgYmFjayB3aGVyZSBpdCB3YXNcbiAgICAgIH1cbiAgICAgIHJldHVybiBvLmFjY2VwdHMoX2l0ZW0sIHRhcmdldCwgX3NvdXJjZSwgcmVmZXJlbmNlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcmFnIChlKSB7XG4gICAgaWYgKCFfbWlycm9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBjbGllbnRYID0gZ2V0Q29vcmQoJ2NsaWVudFgnLCBlKTtcbiAgICB2YXIgY2xpZW50WSA9IGdldENvb3JkKCdjbGllbnRZJywgZSk7XG4gICAgdmFyIHggPSBjbGllbnRYIC0gX29mZnNldFg7XG4gICAgdmFyIHkgPSBjbGllbnRZIC0gX29mZnNldFk7XG5cbiAgICBfbWlycm9yLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICBfbWlycm9yLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuXG4gICAgdmFyIGl0ZW0gPSBfY29weSB8fCBfaXRlbTtcbiAgICB2YXIgZWxlbWVudEJlaGluZEN1cnNvciA9IGdldEVsZW1lbnRCZWhpbmRQb2ludChfbWlycm9yLCBjbGllbnRYLCBjbGllbnRZKTtcbiAgICB2YXIgZHJvcFRhcmdldCA9IGZpbmREcm9wVGFyZ2V0KGVsZW1lbnRCZWhpbmRDdXJzb3IsIGNsaWVudFgsIGNsaWVudFkpO1xuICAgIHZhciBjaGFuZ2VkID0gZHJvcFRhcmdldCAhPT0gbnVsbCAmJiBkcm9wVGFyZ2V0ICE9PSBfbGFzdERyb3BUYXJnZXQ7XG4gICAgaWYgKGNoYW5nZWQgfHwgZHJvcFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgb3V0KCk7XG4gICAgICBfbGFzdERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuICAgICAgb3ZlcigpO1xuICAgIH1cbiAgICB2YXIgcGFyZW50ID0gZ2V0UGFyZW50KGl0ZW0pO1xuICAgIGlmIChkcm9wVGFyZ2V0ID09PSBfc291cmNlICYmIF9jb3B5ICYmICFvLmNvcHlTb3J0U291cmNlKSB7XG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChpdGVtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJlZmVyZW5jZTtcbiAgICB2YXIgaW1tZWRpYXRlID0gZ2V0SW1tZWRpYXRlQ2hpbGQoZHJvcFRhcmdldCwgZWxlbWVudEJlaGluZEN1cnNvcik7XG4gICAgaWYgKGltbWVkaWF0ZSAhPT0gbnVsbCkge1xuICAgICAgcmVmZXJlbmNlID0gZ2V0UmVmZXJlbmNlKGRyb3BUYXJnZXQsIGltbWVkaWF0ZSwgY2xpZW50WCwgY2xpZW50WSk7XG4gICAgfSBlbHNlIGlmIChvLnJldmVydE9uU3BpbGwgPT09IHRydWUgJiYgIV9jb3B5KSB7XG4gICAgICByZWZlcmVuY2UgPSBfaW5pdGlhbFNpYmxpbmc7XG4gICAgICBkcm9wVGFyZ2V0ID0gX3NvdXJjZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKF9jb3B5ICYmIHBhcmVudCkge1xuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChyZWZlcmVuY2UgPT09IG51bGwgJiYgY2hhbmdlZCkgfHxcbiAgICAgIHJlZmVyZW5jZSAhPT0gaXRlbSAmJlxuICAgICAgcmVmZXJlbmNlICE9PSBuZXh0RWwoaXRlbSlcbiAgICApIHtcbiAgICAgIF9jdXJyZW50U2libGluZyA9IHJlZmVyZW5jZTtcbiAgICAgIGRyb3BUYXJnZXQuaW5zZXJ0QmVmb3JlKGl0ZW0sIHJlZmVyZW5jZSk7XG4gICAgICBkcmFrZS5lbWl0KCdzaGFkb3cnLCBpdGVtLCBkcm9wVGFyZ2V0LCBfc291cmNlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbW92ZWQgKHR5cGUpIHsgZHJha2UuZW1pdCh0eXBlLCBpdGVtLCBfbGFzdERyb3BUYXJnZXQsIF9zb3VyY2UpOyB9XG4gICAgZnVuY3Rpb24gb3ZlciAoKSB7IGlmIChjaGFuZ2VkKSB7IG1vdmVkKCdvdmVyJyk7IH0gfVxuICAgIGZ1bmN0aW9uIG91dCAoKSB7IGlmIChfbGFzdERyb3BUYXJnZXQpIHsgbW92ZWQoJ291dCcpOyB9IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNwaWxsT3ZlciAoZWwpIHtcbiAgICBjbGFzc2VzLnJtKGVsLCAnZ3UtaGlkZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3BpbGxPdXQgKGVsKSB7XG4gICAgaWYgKGRyYWtlLmRyYWdnaW5nKSB7IGNsYXNzZXMuYWRkKGVsLCAnZ3UtaGlkZScpOyB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJNaXJyb3JJbWFnZSAoKSB7XG4gICAgaWYgKF9taXJyb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJlY3QgPSBfaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBfbWlycm9yID0gX2l0ZW0uY2xvbmVOb2RlKHRydWUpO1xuICAgIF9taXJyb3Iuc3R5bGUud2lkdGggPSBnZXRSZWN0V2lkdGgocmVjdCkgKyAncHgnO1xuICAgIF9taXJyb3Iuc3R5bGUuaGVpZ2h0ID0gZ2V0UmVjdEhlaWdodChyZWN0KSArICdweCc7XG4gICAgY2xhc3Nlcy5ybShfbWlycm9yLCAnZ3UtdHJhbnNpdCcpO1xuICAgIGNsYXNzZXMuYWRkKF9taXJyb3IsICdndS1taXJyb3InKTtcbiAgICBvLm1pcnJvckNvbnRhaW5lci5hcHBlbmRDaGlsZChfbWlycm9yKTtcbiAgICB0b3VjaHkoZG9jdW1lbnRFbGVtZW50LCAnYWRkJywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgIGNsYXNzZXMuYWRkKG8ubWlycm9yQ29udGFpbmVyLCAnZ3UtdW5zZWxlY3RhYmxlJyk7XG4gICAgZHJha2UuZW1pdCgnY2xvbmVkJywgX21pcnJvciwgX2l0ZW0sICdtaXJyb3InKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU1pcnJvckltYWdlICgpIHtcbiAgICBpZiAoX21pcnJvcikge1xuICAgICAgY2xhc3Nlcy5ybShvLm1pcnJvckNvbnRhaW5lciwgJ2d1LXVuc2VsZWN0YWJsZScpO1xuICAgICAgdG91Y2h5KGRvY3VtZW50RWxlbWVudCwgJ3JlbW92ZScsICdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGdldFBhcmVudChfbWlycm9yKS5yZW1vdmVDaGlsZChfbWlycm9yKTtcbiAgICAgIF9taXJyb3IgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEltbWVkaWF0ZUNoaWxkIChkcm9wVGFyZ2V0LCB0YXJnZXQpIHtcbiAgICB2YXIgaW1tZWRpYXRlID0gdGFyZ2V0O1xuICAgIHdoaWxlIChpbW1lZGlhdGUgIT09IGRyb3BUYXJnZXQgJiYgZ2V0UGFyZW50KGltbWVkaWF0ZSkgIT09IGRyb3BUYXJnZXQpIHtcbiAgICAgIGltbWVkaWF0ZSA9IGdldFBhcmVudChpbW1lZGlhdGUpO1xuICAgIH1cbiAgICBpZiAoaW1tZWRpYXRlID09PSBkb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaW1tZWRpYXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UmVmZXJlbmNlIChkcm9wVGFyZ2V0LCB0YXJnZXQsIHgsIHkpIHtcbiAgICB2YXIgaG9yaXpvbnRhbCA9IG8uZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgdmFyIHJlZmVyZW5jZSA9IHRhcmdldCAhPT0gZHJvcFRhcmdldCA/IGluc2lkZSgpIDogb3V0c2lkZSgpO1xuICAgIHJldHVybiByZWZlcmVuY2U7XG5cbiAgICBmdW5jdGlvbiBvdXRzaWRlICgpIHsgLy8gc2xvd2VyLCBidXQgYWJsZSB0byBmaWd1cmUgb3V0IGFueSBwb3NpdGlvblxuICAgICAgdmFyIGxlbiA9IGRyb3BUYXJnZXQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgdmFyIGk7XG4gICAgICB2YXIgZWw7XG4gICAgICB2YXIgcmVjdDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlbCA9IGRyb3BUYXJnZXQuY2hpbGRyZW5baV07XG4gICAgICAgIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKGhvcml6b250YWwgJiYgKHJlY3QubGVmdCArIHJlY3Qud2lkdGggLyAyKSA+IHgpIHsgcmV0dXJuIGVsOyB9XG4gICAgICAgIGlmICghaG9yaXpvbnRhbCAmJiAocmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIpID4geSkgeyByZXR1cm4gZWw7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2lkZSAoKSB7IC8vIGZhc3RlciwgYnV0IG9ubHkgYXZhaWxhYmxlIGlmIGRyb3BwZWQgaW5zaWRlIGEgY2hpbGQgZWxlbWVudFxuICAgICAgdmFyIHJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSh4ID4gcmVjdC5sZWZ0ICsgZ2V0UmVjdFdpZHRoKHJlY3QpIC8gMik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZSh5ID4gcmVjdC50b3AgKyBnZXRSZWN0SGVpZ2h0KHJlY3QpIC8gMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZSAoYWZ0ZXIpIHtcbiAgICAgIHJldHVybiBhZnRlciA/IG5leHRFbCh0YXJnZXQpIDogdGFyZ2V0O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQ29weSAoaXRlbSwgY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvLmNvcHkgPT09ICdib29sZWFuJyA/IG8uY29weSA6IG8uY29weShpdGVtLCBjb250YWluZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvdWNoeSAoZWwsIG9wLCB0eXBlLCBmbikge1xuICB2YXIgdG91Y2ggPSB7XG4gICAgbW91c2V1cDogJ3RvdWNoZW5kJyxcbiAgICBtb3VzZWRvd246ICd0b3VjaHN0YXJ0JyxcbiAgICBtb3VzZW1vdmU6ICd0b3VjaG1vdmUnXG4gIH07XG4gIHZhciBwb2ludGVycyA9IHtcbiAgICBtb3VzZXVwOiAncG9pbnRlcnVwJyxcbiAgICBtb3VzZWRvd246ICdwb2ludGVyZG93bicsXG4gICAgbW91c2Vtb3ZlOiAncG9pbnRlcm1vdmUnXG4gIH07XG4gIHZhciBtaWNyb3NvZnQgPSB7XG4gICAgbW91c2V1cDogJ01TUG9pbnRlclVwJyxcbiAgICBtb3VzZWRvd246ICdNU1BvaW50ZXJEb3duJyxcbiAgICBtb3VzZW1vdmU6ICdNU1BvaW50ZXJNb3ZlJ1xuICB9O1xuICBpZiAoZ2xvYmFsLm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCkge1xuICAgIGNyb3NzdmVudFtvcF0oZWwsIHBvaW50ZXJzW3R5cGVdLCBmbik7XG4gIH0gZWxzZSBpZiAoZ2xvYmFsLm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkKSB7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgbWljcm9zb2Z0W3R5cGVdLCBmbik7XG4gIH0gZWxzZSB7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgdG91Y2hbdHlwZV0sIGZuKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCB0eXBlLCBmbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2hpY2hNb3VzZUJ1dHRvbiAoZSkge1xuICBpZiAoZS50b3VjaGVzICE9PSB2b2lkIDApIHsgcmV0dXJuIGUudG91Y2hlcy5sZW5ndGg7IH1cbiAgaWYgKGUud2hpY2ggIT09IHZvaWQgMCAmJiBlLndoaWNoICE9PSAwKSB7IHJldHVybiBlLndoaWNoOyB9IC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYS9pc3N1ZXMvMjYxXG4gIGlmIChlLmJ1dHRvbnMgIT09IHZvaWQgMCkgeyByZXR1cm4gZS5idXR0b25zOyB9XG4gIHZhciBidXR0b24gPSBlLmJ1dHRvbjtcbiAgaWYgKGJ1dHRvbiAhPT0gdm9pZCAwKSB7IC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iLzk5ZThmZjFiYWE3YWUzNDFlOTRiYjg5YzNlODQ1NzBjN2MzYWQ5ZWEvc3JjL2V2ZW50LmpzI0w1NzMtTDU3NVxuICAgIHJldHVybiBidXR0b24gJiAxID8gMSA6IGJ1dHRvbiAmIDIgPyAzIDogKGJ1dHRvbiAmIDQgPyAyIDogMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0IChlbCkge1xuICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IHJlY3QubGVmdCArIGdldFNjcm9sbCgnc2Nyb2xsTGVmdCcsICdwYWdlWE9mZnNldCcpLFxuICAgIHRvcDogcmVjdC50b3AgKyBnZXRTY3JvbGwoJ3Njcm9sbFRvcCcsICdwYWdlWU9mZnNldCcpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbCAoc2Nyb2xsUHJvcCwgb2Zmc2V0UHJvcCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFtvZmZzZXRQcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZ2xvYmFsW29mZnNldFByb3BdO1xuICB9XG4gIGlmIChkb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50RWxlbWVudFtzY3JvbGxQcm9wXTtcbiAgfVxuICByZXR1cm4gZG9jLmJvZHlbc2Nyb2xsUHJvcF07XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRCZWhpbmRQb2ludCAocG9pbnQsIHgsIHkpIHtcbiAgdmFyIHAgPSBwb2ludCB8fCB7fTtcbiAgdmFyIHN0YXRlID0gcC5jbGFzc05hbWU7XG4gIHZhciBlbDtcbiAgcC5jbGFzc05hbWUgKz0gJyBndS1oaWRlJztcbiAgZWwgPSBkb2MuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgcC5jbGFzc05hbWUgPSBzdGF0ZTtcbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBuZXZlciAoKSB7IHJldHVybiBmYWxzZTsgfVxuZnVuY3Rpb24gYWx3YXlzICgpIHsgcmV0dXJuIHRydWU7IH1cbmZ1bmN0aW9uIGdldFJlY3RXaWR0aCAocmVjdCkgeyByZXR1cm4gcmVjdC53aWR0aCB8fCAocmVjdC5yaWdodCAtIHJlY3QubGVmdCk7IH1cbmZ1bmN0aW9uIGdldFJlY3RIZWlnaHQgKHJlY3QpIHsgcmV0dXJuIHJlY3QuaGVpZ2h0IHx8IChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKTsgfVxuZnVuY3Rpb24gZ2V0UGFyZW50IChlbCkgeyByZXR1cm4gZWwucGFyZW50Tm9kZSA9PT0gZG9jID8gbnVsbCA6IGVsLnBhcmVudE5vZGU7IH1cbmZ1bmN0aW9uIGlzSW5wdXQgKGVsKSB7IHJldHVybiBlbC50YWdOYW1lID09PSAnSU5QVVQnIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScgfHwgZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcgfHwgaXNFZGl0YWJsZShlbCk7IH1cbmZ1bmN0aW9uIGlzRWRpdGFibGUgKGVsKSB7XG4gIGlmICghZWwpIHsgcmV0dXJuIGZhbHNlOyB9IC8vIG5vIHBhcmVudHMgd2VyZSBlZGl0YWJsZVxuICBpZiAoZWwuY29udGVudEVkaXRhYmxlID09PSAnZmFsc2UnKSB7IHJldHVybiBmYWxzZTsgfSAvLyBzdG9wIHRoZSBsb29rdXBcbiAgaWYgKGVsLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnKSB7IHJldHVybiB0cnVlOyB9IC8vIGZvdW5kIGEgY29udGVudEVkaXRhYmxlIGVsZW1lbnQgaW4gdGhlIGNoYWluXG4gIHJldHVybiBpc0VkaXRhYmxlKGdldFBhcmVudChlbCkpOyAvLyBjb250ZW50RWRpdGFibGUgaXMgc2V0IHRvICdpbmhlcml0J1xufVxuXG5mdW5jdGlvbiBuZXh0RWwgKGVsKSB7XG4gIHJldHVybiBlbC5uZXh0RWxlbWVudFNpYmxpbmcgfHwgbWFudWFsbHkoKTtcbiAgZnVuY3Rpb24gbWFudWFsbHkgKCkge1xuICAgIHZhciBzaWJsaW5nID0gZWw7XG4gICAgZG8ge1xuICAgICAgc2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgfSB3aGlsZSAoc2libGluZyAmJiBzaWJsaW5nLm5vZGVUeXBlICE9PSAxKTtcbiAgICByZXR1cm4gc2libGluZztcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFdmVudEhvc3QgKGUpIHtcbiAgLy8gb24gdG91Y2hlbmQgZXZlbnQsIHdlIGhhdmUgdG8gdXNlIGBlLmNoYW5nZWRUb3VjaGVzYFxuICAvLyBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83MTkyNTYzL3RvdWNoZW5kLWV2ZW50LXByb3BlcnRpZXNcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhL2lzc3Vlcy8zNFxuICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZS50YXJnZXRUb3VjaGVzWzBdO1xuICB9XG4gIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gIH1cbiAgcmV0dXJuIGU7XG59XG5cbmZ1bmN0aW9uIGdldENvb3JkIChjb29yZCwgZSkge1xuICB2YXIgaG9zdCA9IGdldEV2ZW50SG9zdChlKTtcbiAgdmFyIG1pc3NNYXAgPSB7XG4gICAgcGFnZVg6ICdjbGllbnRYJywgLy8gSUU4XG4gICAgcGFnZVk6ICdjbGllbnRZJyAvLyBJRThcbiAgfTtcbiAgaWYgKGNvb3JkIGluIG1pc3NNYXAgJiYgIShjb29yZCBpbiBob3N0KSAmJiBtaXNzTWFwW2Nvb3JkXSBpbiBob3N0KSB7XG4gICAgY29vcmQgPSBtaXNzTWFwW2Nvb3JkXTtcbiAgfVxuICByZXR1cm4gaG9zdFtjb29yZF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZHJhZ3VsYTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXRvYSAoYSwgbikgeyByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYSwgbik7IH1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRpY2t5ID0gcmVxdWlyZSgndGlja3knKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGFyZ3MsIGN0eCkge1xuICBpZiAoIWZuKSB7IHJldHVybjsgfVxuICB0aWNreShmdW5jdGlvbiBydW4gKCkge1xuICAgIGZuLmFwcGx5KGN0eCB8fCBudWxsLCBhcmdzIHx8IFtdKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXRvYSA9IHJlcXVpcmUoJ2F0b2EnKTtcbnZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbWl0dGVyICh0aGluZywgb3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBldnQgPSB7fTtcbiAgaWYgKHRoaW5nID09PSB1bmRlZmluZWQpIHsgdGhpbmcgPSB7fTsgfVxuICB0aGluZy5vbiA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIGlmICghZXZ0W3R5cGVdKSB7XG4gICAgICBldnRbdHlwZV0gPSBbZm5dO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnRbdHlwZV0ucHVzaChmbik7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbiAgfTtcbiAgdGhpbmcub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIGZuLl9vbmNlID0gdHJ1ZTsgLy8gdGhpbmcub2ZmKGZuKSBzdGlsbCB3b3JrcyFcbiAgICB0aGluZy5vbih0eXBlLCBmbik7XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9O1xuICB0aGluZy5vZmYgPSBmdW5jdGlvbiAodHlwZSwgZm4pIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGMgPT09IDEpIHtcbiAgICAgIGRlbGV0ZSBldnRbdHlwZV07XG4gICAgfSBlbHNlIGlmIChjID09PSAwKSB7XG4gICAgICBldnQgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGV0ID0gZXZ0W3R5cGVdO1xuICAgICAgaWYgKCFldCkgeyByZXR1cm4gdGhpbmc7IH1cbiAgICAgIGV0LnNwbGljZShldC5pbmRleE9mKGZuKSwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbiAgfTtcbiAgdGhpbmcuZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGF0b2EoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpbmcuZW1pdHRlclNuYXBzaG90KGFyZ3Muc2hpZnQoKSkuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG4gIHRoaW5nLmVtaXR0ZXJTbmFwc2hvdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIGV0ID0gKGV2dFt0eXBlXSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gYXRvYShhcmd1bWVudHMpO1xuICAgICAgdmFyIGN0eCA9IHRoaXMgfHwgdGhpbmc7XG4gICAgICBpZiAodHlwZSA9PT0gJ2Vycm9yJyAmJiBvcHRzLnRocm93cyAhPT0gZmFsc2UgJiYgIWV0Lmxlbmd0aCkgeyB0aHJvdyBhcmdzLmxlbmd0aCA9PT0gMSA/IGFyZ3NbMF0gOiBhcmdzOyB9XG4gICAgICBldC5mb3JFYWNoKGZ1bmN0aW9uIGVtaXR0ZXIgKGxpc3Rlbikge1xuICAgICAgICBpZiAob3B0cy5hc3luYykgeyBkZWJvdW5jZShsaXN0ZW4sIGFyZ3MsIGN0eCk7IH0gZWxzZSB7IGxpc3Rlbi5hcHBseShjdHgsIGFyZ3MpOyB9XG4gICAgICAgIGlmIChsaXN0ZW4uX29uY2UpIHsgdGhpbmcub2ZmKHR5cGUsIGxpc3Rlbik7IH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaW5nO1xuICAgIH07XG4gIH07XG4gIHJldHVybiB0aGluZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjdXN0b21FdmVudCA9IHJlcXVpcmUoJ2N1c3RvbS1ldmVudCcpO1xudmFyIGV2ZW50bWFwID0gcmVxdWlyZSgnLi9ldmVudG1hcCcpO1xudmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBhZGRFdmVudCA9IGFkZEV2ZW50RWFzeTtcbnZhciByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50RWFzeTtcbnZhciBoYXJkQ2FjaGUgPSBbXTtcblxuaWYgKCFnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICBhZGRFdmVudCA9IGFkZEV2ZW50SGFyZDtcbiAgcmVtb3ZlRXZlbnQgPSByZW1vdmVFdmVudEhhcmQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZEV2ZW50LFxuICByZW1vdmU6IHJlbW92ZUV2ZW50LFxuICBmYWJyaWNhdGU6IGZhYnJpY2F0ZUV2ZW50XG59O1xuXG5mdW5jdGlvbiBhZGRFdmVudEVhc3kgKGVsLCB0eXBlLCBmbiwgY2FwdHVyaW5nKSB7XG4gIHJldHVybiBlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJpbmcpO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudEhhcmQgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZWwuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIHdyYXAoZWwsIHR5cGUsIGZuKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBsaXN0ZW5lciA9IHVud3JhcChlbCwgdHlwZSwgZm4pO1xuICBpZiAobGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmYWJyaWNhdGVFdmVudCAoZWwsIHR5cGUsIG1vZGVsKSB7XG4gIHZhciBlID0gZXZlbnRtYXAuaW5kZXhPZih0eXBlKSA9PT0gLTEgPyBtYWtlQ3VzdG9tRXZlbnQoKSA6IG1ha2VDbGFzc2ljRXZlbnQoKTtcbiAgaWYgKGVsLmRpc3BhdGNoRXZlbnQpIHtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9IGVsc2Uge1xuICAgIGVsLmZpcmVFdmVudCgnb24nICsgdHlwZSwgZSk7XG4gIH1cbiAgZnVuY3Rpb24gbWFrZUNsYXNzaWNFdmVudCAoKSB7XG4gICAgdmFyIGU7XG4gICAgaWYgKGRvYy5jcmVhdGVFdmVudCkge1xuICAgICAgZSA9IGRvYy5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgIGUuaW5pdEV2ZW50KHR5cGUsIHRydWUsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0KSB7XG4gICAgICBlID0gZG9jLmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgfVxuICAgIHJldHVybiBlO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VDdXN0b21FdmVudCAoKSB7XG4gICAgcmV0dXJuIG5ldyBjdXN0b21FdmVudCh0eXBlLCB7IGRldGFpbDogbW9kZWwgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JhcHBlckZhY3RvcnkgKGVsLCB0eXBlLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlciAob3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gb3JpZ2luYWxFdmVudCB8fCBnbG9iYWwuZXZlbnQ7XG4gICAgZS50YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCA9IGUucHJldmVudERlZmF1bHQgfHwgZnVuY3Rpb24gcHJldmVudERlZmF1bHQgKCkgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH07XG4gICAgZS5zdG9wUHJvcGFnYXRpb24gPSBlLnN0b3BQcm9wYWdhdGlvbiB8fCBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24gKCkgeyBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7IH07XG4gICAgZS53aGljaCA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgIGZuLmNhbGwoZWwsIGUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB3cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIHdyYXBwZXIgPSB1bndyYXAoZWwsIHR5cGUsIGZuKSB8fCB3cmFwcGVyRmFjdG9yeShlbCwgdHlwZSwgZm4pO1xuICBoYXJkQ2FjaGUucHVzaCh7XG4gICAgd3JhcHBlcjogd3JhcHBlcixcbiAgICBlbGVtZW50OiBlbCxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGZuOiBmblxuICB9KTtcbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIHVud3JhcCAoZWwsIHR5cGUsIGZuKSB7XG4gIHZhciBpID0gZmluZChlbCwgdHlwZSwgZm4pO1xuICBpZiAoaSkge1xuICAgIHZhciB3cmFwcGVyID0gaGFyZENhY2hlW2ldLndyYXBwZXI7XG4gICAgaGFyZENhY2hlLnNwbGljZShpLCAxKTsgLy8gZnJlZSB1cCBhIHRhZCBvZiBtZW1vcnlcbiAgICByZXR1cm4gd3JhcHBlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGksIGl0ZW07XG4gIGZvciAoaSA9IDA7IGkgPCBoYXJkQ2FjaGUubGVuZ3RoOyBpKyspIHtcbiAgICBpdGVtID0gaGFyZENhY2hlW2ldO1xuICAgIGlmIChpdGVtLmVsZW1lbnQgPT09IGVsICYmIGl0ZW0udHlwZSA9PT0gdHlwZSAmJiBpdGVtLmZuID09PSBmbikge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBldmVudG1hcCA9IFtdO1xudmFyIGV2ZW50bmFtZSA9ICcnO1xudmFyIHJvbiA9IC9eb24vO1xuXG5mb3IgKGV2ZW50bmFtZSBpbiBnbG9iYWwpIHtcbiAgaWYgKHJvbi50ZXN0KGV2ZW50bmFtZSkpIHtcbiAgICBldmVudG1hcC5wdXNoKGV2ZW50bmFtZS5zbGljZSgyKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBldmVudG1hcDtcbiIsIlxudmFyIE5hdGl2ZUN1c3RvbUV2ZW50ID0gZ2xvYmFsLkN1c3RvbUV2ZW50O1xuXG5mdW5jdGlvbiB1c2VOYXRpdmUgKCkge1xuICB0cnkge1xuICAgIHZhciBwID0gbmV3IE5hdGl2ZUN1c3RvbUV2ZW50KCdjYXQnLCB7IGRldGFpbDogeyBmb286ICdiYXInIH0gfSk7XG4gICAgcmV0dXJuICAnY2F0JyA9PT0gcC50eXBlICYmICdiYXInID09PSBwLmRldGFpbC5mb287XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ3Jvc3MtYnJvd3NlciBgQ3VzdG9tRXZlbnRgIGNvbnN0cnVjdG9yLlxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudC5DdXN0b21FdmVudFxuICpcbiAqIEBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZU5hdGl2ZSgpID8gTmF0aXZlQ3VzdG9tRXZlbnQgOlxuXG4vLyBJRSA+PSA5XG4nZnVuY3Rpb24nID09PSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRXZlbnQgPyBmdW5jdGlvbiBDdXN0b21FdmVudCAodHlwZSwgcGFyYW1zKSB7XG4gIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gIGlmIChwYXJhbXMpIHtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICB9IGVsc2Uge1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgdm9pZCAwKTtcbiAgfVxuICByZXR1cm4gZTtcbn0gOlxuXG4vLyBJRSA8PSA4XG5mdW5jdGlvbiBDdXN0b21FdmVudCAodHlwZSwgcGFyYW1zKSB7XG4gIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgZS50eXBlID0gdHlwZTtcbiAgaWYgKHBhcmFtcykge1xuICAgIGUuYnViYmxlcyA9IEJvb2xlYW4ocGFyYW1zLmJ1YmJsZXMpO1xuICAgIGUuY2FuY2VsYWJsZSA9IEJvb2xlYW4ocGFyYW1zLmNhbmNlbGFibGUpO1xuICAgIGUuZGV0YWlsID0gcGFyYW1zLmRldGFpbDtcbiAgfSBlbHNlIHtcbiAgICBlLmJ1YmJsZXMgPSBmYWxzZTtcbiAgICBlLmNhbmNlbGFibGUgPSBmYWxzZTtcbiAgICBlLmRldGFpbCA9IHZvaWQgMDtcbiAgfVxuICByZXR1cm4gZTtcbn1cbiIsInZhciBzaSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicsIHRpY2s7XG5pZiAoc2kpIHtcbiAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRJbW1lZGlhdGUoZm4pOyB9O1xufSBlbHNlIHtcbiAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRUaW1lb3V0KGZuLCAwKTsgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aWNrOyJdfQ==
//////////////////////////////////////////////////////////////////////////////
// Simple Classes by Toth, Balazs Aladar (c) 2005-2018
// For detailed licensing information see conSense.js.
// See simpleClassesVersion and the changelog for detailed version info.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Notes:
//////////////////////////////////////////////////////////////////////////////
//
// Uses lib/sha1.js and lib/md5.js by Paul Johnston 2000-2002, BSD license.
//
//////////////////////////////////////////////////////////////////////////////

'use strict';

//----------------------------------------------------------------------------
// Version
//----------------------------------------------------------------------------

const simpleClassesVersion = "1.22";

//----------------------------------------------------------------------------
// Debug class
//----------------------------------------------------------------------------

class SimpleDebug
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // SimpleDebug                                         Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = simpleClassesVersion;

        this.messages = "";
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------
    // Batch debug
    //------------------------------------------------------------------------

    // SimpleDebug
    add(description, value)
    {
        this.messages += description + ": " + value + "\n";
    }

    //------------------------------------------------------------------------

    // SimpleDebug
    print()
    {
        alert(this.messages);
        this.messages = "";
    }

    //------------------------------------------------------------------------
    // Simple debug
    //------------------------------------------------------------------------

    // SimpleDebug
    alert(description, value)
    {
        alert(description + ": " + value);
    }

}

//----------------------------------------------------------------------------
// Utilities class
//----------------------------------------------------------------------------

class SimpleUtilities
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // SimpleUtilities                                     Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = simpleClassesVersion;

        // DOM nodeType-s
        this.DOM_ELEMENT_NODE = 1;
        // noinspection JSUnusedGlobalSymbols
        this.DOM_ATTRIBUTE_NODE = 2;
        this.DOM_TEXT_NODE = 3;
        // noinspection JSUnusedGlobalSymbols
        this.DOM_CDATA_SECTION_NODE = 4;
        // noinspection JSUnusedGlobalSymbols
        this.DOM_ENTITY_REFERENCE_NODE = 5;
        // noinspection JSUnusedGlobalSymbols
        this.DOM_ENTITY_NODE = 6;
        // noinspection JSUnusedGlobalSymbols
        this.DOM_PROCESSING_INSTRUCTION_NODE = 7;
        this.DOM_COMMENT_NODE = 8;
        // noinspection JSUnusedGlobalSymbols
        this.DOM_DOCUMENT_NODE = 9;
        this.DOM_DOCUMENT_TYPE_NODE = 10;
        // noinspection JSUnusedGlobalSymbols
        this.DOM_DOCUMENT_FRAGMENT_NODE = 11;
        // noinspection JSUnusedGlobalSymbols
        this.DOM_NOTATION_NODE = 12;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // Used for generating random number URL parameters to force fresh loading
    // of content.
    // Generating only if conSense.debug!
    randomSuffix()
    {
        if (!conSense.debug) return "";
        return "?random_suffix=" + this.random(0xdeadbeef);
    }

    //------------------------------------------------------------------------

    // Generate random integer from 1 to limit
    random(limit)
    {
        if (limit < 1) return 1;
        return Math.floor((Math.random() * limit) + 1);
    }

    //------------------------------------------------------------------------

    replaceAll(search, replacement)
    {
        let target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    }

    //------------------------------------------------------------------------

    // Example: onClick="linkTo(formURI('main.jsp', {'lang': 'hun'}))"

    // SimpleUtilities
    // noinspection JSUnusedGlobalSymbols
    linkTo(dest)
    {
        document.location.href = dest;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    formURI(target, paramArray)
    {
        let result = target + "?";
        let andSign = "";

        // No parameters to add
        if (paramArray.length === 0)
        {
            return target;
        }

        for (let i in paramArray)
        {
            // noinspection JSUnfilteredForInLoop
            result += andSign + i + "=" + paramArray[i];
            andSign = "&";
        }

        return result;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Basic browser capabilities test
    checkBrowser()
    {
        if (!(document.all || document.getElementById))
        {
            alert("SimpleUtilities.checkBrowser() error: Please upgrade to a more modern browser. This interactive web page will not operate properly.");
        }
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Accepts DOM element id as parameter
    getDOMElement(elemId)
    {
        let result = document.all
                        ? document.all[elemId]
                        : document.getElementById(elemId);
        return result;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Helper function to handle onKeyDown, onKeyPress and onKeyUp events.
    // Gets event parameter, brings back key name or "Unknown".
    getKeyName(keyEvent)
    {
        if (!keyEvent)
        {
            keyEvent = window.event;
        }

        let keyCode = keyEvent.keyCode;
        let keyName = "Unknown";

        switch(keyCode)
        {
            case 13:
                keyName = "Enter";
                break;
            case 16:
                keyName = "Shift";
                break;
            case 17:
                keyName = "Ctrl";
                break;
            case 18:
                keyName = "Alt";
                break;
            case 19:
                keyName = "Pause";
                break;
            case 32:
                keyName = "Space";
                break;
            case 8:
                keyName = "Backspace";
                break;
            case 9:
                keyName = "Tab";
                break;
            case 37:
                keyName = "Arrow Left";
                break;
            case 38:
                keyName = "Arrow Up";
                break;
            case 39:
                keyName = "Arrow Right";
                break;
            case 40:
                keyName = "Arrow Down";
                break;
            case 33:
                keyName = "Page Up";
                break;
            case 34:
                keyName = "Page Down";
                break;
            case 36:
                keyName = "Home";
                break;
            case 35:
                keyName = "End";
                break;
            case 45:
                keyName = "Insert";
                break;
            case 46:
                keyName = "Delete";
                break;
            case 91:
            case 92:
                keyName = "Win";
                break;
            case 93:
                keyName = "Select";
                break;
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
            case 123:
                // Group code for F1-F12
                keyName = "Fxx";
                break;
            case 144:
                keyName = "Num Lock";
                break;
            case 145:
                keyName = "Scroll Lock";
                break;
            case 20:
                keyName = "Caps Lock";
                break;
            case 27:
                keyName = "Esc";
                break;
        }

        return keyName;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    trimString(str)
    {
        // To force auto-conversion to string
        return (str + "").replace(/^\s*|\s*$/g, "");
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Avoids rendering of HTML strings when displayed.
    HTML2Source(str)
    {
        // To force auto-conversion to string
        return (str + "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    //------------------------------------------------------------------------

    // HtmlDecode http://lab.msdn.microsoft.com/annotations/htmldecode.js
    //   client side version of the useful Server.HtmlDecode method
    //   takes one string (encoded) and returns another (decoded)
    //   by Andy Oakley
    // noinspection JSUnusedGlobalSymbols
    HTMLDecode(s) {
        let out = "";
        if (s==null) return;

        let l = s.length;
        for (let i=0; i<l; i++) {
            let ch = s.charAt(i);

            if (ch === '&') {
                let semicolonIndex = s.indexOf(';', i+1);

                if (semicolonIndex > 0) {
                    let entity = s.substring(i + 1, semicolonIndex);
                    if (entity.length > 1 && entity.charAt(0) === '#') {
                        if (entity.charAt(1) === 'x' || entity.charAt(1) === 'X')
                            ch = String.fromCharCode(eval('0'+entity.substring(1)));
                        else
                            ch = String.fromCharCode(eval(entity.substring(1)));
                    } else {
                        switch (entity) {
                            case 'quot': ch = String.fromCharCode(0x0022); break;
                            case 'amp': ch = String.fromCharCode(0x0026); break;
                            case 'lt': ch = String.fromCharCode(0x003c); break;
                            case 'gt': ch = String.fromCharCode(0x003e); break;
                            case 'nbsp': ch = String.fromCharCode(0x00a0); break;
                            case 'iexcl': ch = String.fromCharCode(0x00a1); break;
                            case 'cent': ch = String.fromCharCode(0x00a2); break;
                            case 'pound': ch = String.fromCharCode(0x00a3); break;
                            case 'curren': ch = String.fromCharCode(0x00a4); break;
                            case 'yen': ch = String.fromCharCode(0x00a5); break;
                            case 'brvbar': ch = String.fromCharCode(0x00a6); break;
                            case 'sect': ch = String.fromCharCode(0x00a7); break;
                            case 'uml': ch = String.fromCharCode(0x00a8); break;
                            case 'copy': ch = String.fromCharCode(0x00a9); break;
                            case 'ordf': ch = String.fromCharCode(0x00aa); break;
                            case 'laquo': ch = String.fromCharCode(0x00ab); break;
                            case 'not': ch = String.fromCharCode(0x00ac); break;
                            case 'shy': ch = String.fromCharCode(0x00ad); break;
                            case 'reg': ch = String.fromCharCode(0x00ae); break;
                            case 'macr': ch = String.fromCharCode(0x00af); break;
                            case 'deg': ch = String.fromCharCode(0x00b0); break;
                            case 'plusmn': ch = String.fromCharCode(0x00b1); break;
                            case 'sup2': ch = String.fromCharCode(0x00b2); break;
                            case 'sup3': ch = String.fromCharCode(0x00b3); break;
                            case 'acute': ch = String.fromCharCode(0x00b4); break;
                            case 'micro': ch = String.fromCharCode(0x00b5); break;
                            case 'para': ch = String.fromCharCode(0x00b6); break;
                            case 'middot': ch = String.fromCharCode(0x00b7); break;
                            case 'cedil': ch = String.fromCharCode(0x00b8); break;
                            case 'sup1': ch = String.fromCharCode(0x00b9); break;
                            case 'ordm': ch = String.fromCharCode(0x00ba); break;
                            case 'raquo': ch = String.fromCharCode(0x00bb); break;
                            case 'frac14': ch = String.fromCharCode(0x00bc); break;
                            case 'frac12': ch = String.fromCharCode(0x00bd); break;
                            case 'frac34': ch = String.fromCharCode(0x00be); break;
                            case 'iquest': ch = String.fromCharCode(0x00bf); break;
                            case 'Agrave': ch = String.fromCharCode(0x00c0); break;
                            case 'Aacute': ch = String.fromCharCode(0x00c1); break;
                            case 'Acirc': ch = String.fromCharCode(0x00c2); break;
                            case 'Atilde': ch = String.fromCharCode(0x00c3); break;
                            case 'Auml': ch = String.fromCharCode(0x00c4); break;
                            case 'Aring': ch = String.fromCharCode(0x00c5); break;
                            case 'AElig': ch = String.fromCharCode(0x00c6); break;
                            case 'Ccedil': ch = String.fromCharCode(0x00c7); break;
                            case 'Egrave': ch = String.fromCharCode(0x00c8); break;
                            case 'Eacute': ch = String.fromCharCode(0x00c9); break;
                            case 'Ecirc': ch = String.fromCharCode(0x00ca); break;
                            case 'Euml': ch = String.fromCharCode(0x00cb); break;
                            case 'Igrave': ch = String.fromCharCode(0x00cc); break;
                            case 'Iacute': ch = String.fromCharCode(0x00cd); break;
                            case 'Icirc': ch = String.fromCharCode(0x00ce); break;
                            case 'Iuml': ch = String.fromCharCode(0x00cf); break;
                            case 'ETH': ch = String.fromCharCode(0x00d0); break;
                            case 'Ntilde': ch = String.fromCharCode(0x00d1); break;
                            case 'Ograve': ch = String.fromCharCode(0x00d2); break;
                            case 'Oacute': ch = String.fromCharCode(0x00d3); break;
                            case 'Ocirc': ch = String.fromCharCode(0x00d4); break;
                            case 'Otilde': ch = String.fromCharCode(0x00d5); break;
                            case 'Ouml': ch = String.fromCharCode(0x00d6); break;
                            case 'times': ch = String.fromCharCode(0x00d7); break;
                            case 'Oslash': ch = String.fromCharCode(0x00d8); break;
                            case 'Ugrave': ch = String.fromCharCode(0x00d9); break;
                            case 'Uacute': ch = String.fromCharCode(0x00da); break;
                            case 'Ucirc': ch = String.fromCharCode(0x00db); break;
                            case 'Uuml': ch = String.fromCharCode(0x00dc); break;
                            case 'Yacute': ch = String.fromCharCode(0x00dd); break;
                            case 'THORN': ch = String.fromCharCode(0x00de); break;
                            case 'szlig': ch = String.fromCharCode(0x00df); break;
                            case 'agrave': ch = String.fromCharCode(0x00e0); break;
                            case 'aacute': ch = String.fromCharCode(0x00e1); break;
                            case 'acirc': ch = String.fromCharCode(0x00e2); break;
                            case 'atilde': ch = String.fromCharCode(0x00e3); break;
                            case 'auml': ch = String.fromCharCode(0x00e4); break;
                            case 'aring': ch = String.fromCharCode(0x00e5); break;
                            case 'aelig': ch = String.fromCharCode(0x00e6); break;
                            case 'ccedil': ch = String.fromCharCode(0x00e7); break;
                            case 'egrave': ch = String.fromCharCode(0x00e8); break;
                            case 'eacute': ch = String.fromCharCode(0x00e9); break;
                            case 'ecirc': ch = String.fromCharCode(0x00ea); break;
                            case 'euml': ch = String.fromCharCode(0x00eb); break;
                            case 'igrave': ch = String.fromCharCode(0x00ec); break;
                            case 'iacute': ch = String.fromCharCode(0x00ed); break;
                            case 'icirc': ch = String.fromCharCode(0x00ee); break;
                            case 'iuml': ch = String.fromCharCode(0x00ef); break;
                            case 'eth': ch = String.fromCharCode(0x00f0); break;
                            case 'ntilde': ch = String.fromCharCode(0x00f1); break;
                            case 'ograve': ch = String.fromCharCode(0x00f2); break;
                            case 'oacute': ch = String.fromCharCode(0x00f3); break;
                            case 'ocirc': ch = String.fromCharCode(0x00f4); break;
                            case 'otilde': ch = String.fromCharCode(0x00f5); break;
                            case 'ouml': ch = String.fromCharCode(0x00f6); break;
                            case 'divide': ch = String.fromCharCode(0x00f7); break;
                            case 'oslash': ch = String.fromCharCode(0x00f8); break;
                            case 'ugrave': ch = String.fromCharCode(0x00f9); break;
                            case 'uacute': ch = String.fromCharCode(0x00fa); break;
                            case 'ucirc': ch = String.fromCharCode(0x00fb); break;
                            case 'uuml': ch = String.fromCharCode(0x00fc); break;
                            case 'yacute': ch = String.fromCharCode(0x00fd); break;
                            case 'thorn': ch = String.fromCharCode(0x00fe); break;
                            case 'yuml': ch = String.fromCharCode(0x00ff); break;
                            case 'OElig': ch = String.fromCharCode(0x0152); break;
                            case 'oelig': ch = String.fromCharCode(0x0153); break;
                            case 'Scaron': ch = String.fromCharCode(0x0160); break;
                            case 'scaron': ch = String.fromCharCode(0x0161); break;
                            case 'Yuml': ch = String.fromCharCode(0x0178); break;
                            case 'fnof': ch = String.fromCharCode(0x0192); break;
                            case 'circ': ch = String.fromCharCode(0x02c6); break;
                            case 'tilde': ch = String.fromCharCode(0x02dc); break;
                            case 'Alpha': ch = String.fromCharCode(0x0391); break;
                            case 'Beta': ch = String.fromCharCode(0x0392); break;
                            case 'Gamma': ch = String.fromCharCode(0x0393); break;
                            case 'Delta': ch = String.fromCharCode(0x0394); break;
                            case 'Epsilon': ch = String.fromCharCode(0x0395); break;
                            case 'Zeta': ch = String.fromCharCode(0x0396); break;
                            case 'Eta': ch = String.fromCharCode(0x0397); break;
                            case 'Theta': ch = String.fromCharCode(0x0398); break;
                            case 'Iota': ch = String.fromCharCode(0x0399); break;
                            case 'Kappa': ch = String.fromCharCode(0x039a); break;
                            case 'Lambda': ch = String.fromCharCode(0x039b); break;
                            case 'Mu': ch = String.fromCharCode(0x039c); break;
                            case 'Nu': ch = String.fromCharCode(0x039d); break;
                            case 'Xi': ch = String.fromCharCode(0x039e); break;
                            case 'Omicron': ch = String.fromCharCode(0x039f); break;
                            case 'Pi': ch = String.fromCharCode(0x03a0); break;
                            case 'Rho': ch = String.fromCharCode(0x03a1); break;
                            case 'Sigma': ch = String.fromCharCode(0x03a3); break;
                            case 'Tau': ch = String.fromCharCode(0x03a4); break;
                            case 'Upsilon': ch = String.fromCharCode(0x03a5); break;
                            case 'Phi': ch = String.fromCharCode(0x03a6); break;
                            case 'Chi': ch = String.fromCharCode(0x03a7); break;
                            case 'Psi': ch = String.fromCharCode(0x03a8); break;
                            case 'Omega': ch = String.fromCharCode(0x03a9); break;
                            case 'alpha': ch = String.fromCharCode(0x03b1); break;
                            case 'beta': ch = String.fromCharCode(0x03b2); break;
                            case 'gamma': ch = String.fromCharCode(0x03b3); break;
                            case 'delta': ch = String.fromCharCode(0x03b4); break;
                            case 'epsilon': ch = String.fromCharCode(0x03b5); break;
                            case 'zeta': ch = String.fromCharCode(0x03b6); break;
                            case 'eta': ch = String.fromCharCode(0x03b7); break;
                            case 'theta': ch = String.fromCharCode(0x03b8); break;
                            case 'iota': ch = String.fromCharCode(0x03b9); break;
                            case 'kappa': ch = String.fromCharCode(0x03ba); break;
                            case 'lambda': ch = String.fromCharCode(0x03bb); break;
                            case 'mu': ch = String.fromCharCode(0x03bc); break;
                            case 'nu': ch = String.fromCharCode(0x03bd); break;
                            case 'xi': ch = String.fromCharCode(0x03be); break;
                            case 'omicron': ch = String.fromCharCode(0x03bf); break;
                            case 'pi': ch = String.fromCharCode(0x03c0); break;
                            case 'rho': ch = String.fromCharCode(0x03c1); break;
                            case 'sigmaf': ch = String.fromCharCode(0x03c2); break;
                            case 'sigma': ch = String.fromCharCode(0x03c3); break;
                            case 'tau': ch = String.fromCharCode(0x03c4); break;
                            case 'upsilon': ch = String.fromCharCode(0x03c5); break;
                            case 'phi': ch = String.fromCharCode(0x03c6); break;
                            case 'chi': ch = String.fromCharCode(0x03c7); break;
                            case 'psi': ch = String.fromCharCode(0x03c8); break;
                            case 'omega': ch = String.fromCharCode(0x03c9); break;
                            case 'thetasym': ch = String.fromCharCode(0x03d1); break;
                            case 'upsih': ch = String.fromCharCode(0x03d2); break;
                            case 'piv': ch = String.fromCharCode(0x03d6); break;
                            case 'ensp': ch = String.fromCharCode(0x2002); break;
                            case 'emsp': ch = String.fromCharCode(0x2003); break;
                            case 'thinsp': ch = String.fromCharCode(0x2009); break;
                            case 'zwnj': ch = String.fromCharCode(0x200c); break;
                            case 'zwj': ch = String.fromCharCode(0x200d); break;
                            case 'lrm': ch = String.fromCharCode(0x200e); break;
                            case 'rlm': ch = String.fromCharCode(0x200f); break;
                            case 'ndash': ch = String.fromCharCode(0x2013); break;
                            case 'mdash': ch = String.fromCharCode(0x2014); break;
                            case 'lsquo': ch = String.fromCharCode(0x2018); break;
                            case 'rsquo': ch = String.fromCharCode(0x2019); break;
                            case 'sbquo': ch = String.fromCharCode(0x201a); break;
                            case 'ldquo': ch = String.fromCharCode(0x201c); break;
                            case 'rdquo': ch = String.fromCharCode(0x201d); break;
                            case 'bdquo': ch = String.fromCharCode(0x201e); break;
                            case 'dagger': ch = String.fromCharCode(0x2020); break;
                            case 'Dagger': ch = String.fromCharCode(0x2021); break;
                            case 'bull': ch = String.fromCharCode(0x2022); break;
                            case 'hellip': ch = String.fromCharCode(0x2026); break;
                            case 'permil': ch = String.fromCharCode(0x2030); break;
                            case 'prime': ch = String.fromCharCode(0x2032); break;
                            case 'Prime': ch = String.fromCharCode(0x2033); break;
                            case 'lsaquo': ch = String.fromCharCode(0x2039); break;
                            case 'rsaquo': ch = String.fromCharCode(0x203a); break;
                            case 'oline': ch = String.fromCharCode(0x203e); break;
                            case 'frasl': ch = String.fromCharCode(0x2044); break;
                            case 'euro': ch = String.fromCharCode(0x20ac); break;
                            case 'image': ch = String.fromCharCode(0x2111); break;
                            case 'weierp': ch = String.fromCharCode(0x2118); break;
                            case 'real': ch = String.fromCharCode(0x211c); break;
                            case 'trade': ch = String.fromCharCode(0x2122); break;
                            case 'alefsym': ch = String.fromCharCode(0x2135); break;
                            case 'larr': ch = String.fromCharCode(0x2190); break;
                            case 'uarr': ch = String.fromCharCode(0x2191); break;
                            case 'rarr': ch = String.fromCharCode(0x2192); break;
                            case 'darr': ch = String.fromCharCode(0x2193); break;
                            case 'harr': ch = String.fromCharCode(0x2194); break;
                            case 'crarr': ch = String.fromCharCode(0x21b5); break;
                            case 'lArr': ch = String.fromCharCode(0x21d0); break;
                            case 'uArr': ch = String.fromCharCode(0x21d1); break;
                            case 'rArr': ch = String.fromCharCode(0x21d2); break;
                            case 'dArr': ch = String.fromCharCode(0x21d3); break;
                            case 'hArr': ch = String.fromCharCode(0x21d4); break;
                            case 'forall': ch = String.fromCharCode(0x2200); break;
                            case 'part': ch = String.fromCharCode(0x2202); break;
                            case 'exist': ch = String.fromCharCode(0x2203); break;
                            case 'empty': ch = String.fromCharCode(0x2205); break;
                            case 'nabla': ch = String.fromCharCode(0x2207); break;
                            case 'isin': ch = String.fromCharCode(0x2208); break;
                            case 'notin': ch = String.fromCharCode(0x2209); break;
                            case 'ni': ch = String.fromCharCode(0x220b); break;
                            case 'prod': ch = String.fromCharCode(0x220f); break;
                            case 'sum': ch = String.fromCharCode(0x2211); break;
                            case 'minus': ch = String.fromCharCode(0x2212); break;
                            case 'lowast': ch = String.fromCharCode(0x2217); break;
                            case 'radic': ch = String.fromCharCode(0x221a); break;
                            case 'prop': ch = String.fromCharCode(0x221d); break;
                            case 'infin': ch = String.fromCharCode(0x221e); break;
                            case 'ang': ch = String.fromCharCode(0x2220); break;
                            case 'and': ch = String.fromCharCode(0x2227); break;
                            case 'or': ch = String.fromCharCode(0x2228); break;
                            case 'cap': ch = String.fromCharCode(0x2229); break;
                            case 'cup': ch = String.fromCharCode(0x222a); break;
                            case 'int': ch = String.fromCharCode(0x222b); break;
                            case 'there4': ch = String.fromCharCode(0x2234); break;
                            case 'sim': ch = String.fromCharCode(0x223c); break;
                            case 'cong': ch = String.fromCharCode(0x2245); break;
                            case 'asymp': ch = String.fromCharCode(0x2248); break;
                            case 'ne': ch = String.fromCharCode(0x2260); break;
                            case 'equiv': ch = String.fromCharCode(0x2261); break;
                            case 'le': ch = String.fromCharCode(0x2264); break;
                            case 'ge': ch = String.fromCharCode(0x2265); break;
                            case 'sub': ch = String.fromCharCode(0x2282); break;
                            case 'sup': ch = String.fromCharCode(0x2283); break;
                            case 'nsub': ch = String.fromCharCode(0x2284); break;
                            case 'sube': ch = String.fromCharCode(0x2286); break;
                            case 'supe': ch = String.fromCharCode(0x2287); break;
                            case 'oplus': ch = String.fromCharCode(0x2295); break;
                            case 'otimes': ch = String.fromCharCode(0x2297); break;
                            case 'perp': ch = String.fromCharCode(0x22a5); break;
                            case 'sdot': ch = String.fromCharCode(0x22c5); break;
                            case 'lceil': ch = String.fromCharCode(0x2308); break;
                            case 'rceil': ch = String.fromCharCode(0x2309); break;
                            case 'lfloor': ch = String.fromCharCode(0x230a); break;
                            case 'rfloor': ch = String.fromCharCode(0x230b); break;
                            case 'lang': ch = String.fromCharCode(0x2329); break;
                            case 'rang': ch = String.fromCharCode(0x232a); break;
                            case 'loz': ch = String.fromCharCode(0x25ca); break;
                            case 'spades': ch = String.fromCharCode(0x2660); break;
                            case 'clubs': ch = String.fromCharCode(0x2663); break;
                            case 'hearts': ch = String.fromCharCode(0x2665); break;
                            case 'diams': ch = String.fromCharCode(0x2666); break;
                            default: ch = ''; break;
                        }
                    }
                    i = semicolonIndex;
                }
            }

            out += ch;
        }

        return out;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Includes a JavaScript source file. Must be called from document head!
    // noinspection JSUnusedGlobalSymbols
    includeJavaScriptFile(filename)
    {
        document.write('<script charset="UTF-8" type="text/javascript" src="'
            + filename + this.randomSuffix()
            + '"></script>');
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Includes a CSS file. Must be called from document head!
    // noinspection JSUnusedGlobalSymbols
    includeCSSFile(filename)
    {
        document.write('<link href="'
            + filename + this.randomSuffix()
            + '" rel="stylesheet" type="text/css">');
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // noinspection JSUnusedGlobalSymbols
    isDefined(variable)
    {
        return (typeof(window[variable]) === "undefined") ? false : true;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // noinspection JSUnusedGlobalSymbols
    regexpResultLength(regexp, text)
    {
        let len = text.length - text.replace(regexp, "").length;

        return len;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // TODO: add more accented characters
    // noinspection JSUnusedGlobalSymbols
    accented2HTML(str)
    {
        let regexp;
        let replacement;

        // őŐ űŰ éÉ áÁ íÍ óÓ úÚ öÖ üÜ õÕ ûÛ äÄ ß

        regexp = new RegExp("ő", "g");
        replacement = "&odblac;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ő", "g");
        replacement = "&Odblac;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ű", "g");
        replacement = "&udblac;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ű", "g");
        replacement = "&Udblac;";
        str = str.replace(regexp, replacement);

        // --

        regexp = new RegExp("é", "g");
        replacement = "&eacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("É", "g");
        replacement = "&Eacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("á", "g");
        replacement = "&aacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Á", "g");
        replacement = "&Aacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("í", "g");
        replacement = "&iacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Í", "g");
        replacement = "&Iacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ó", "g");
        replacement = "&oacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ó", "g");
        replacement = "&Oacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ú", "g");
        replacement = "&uacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ú", "g");
        replacement = "&Uacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ö", "g");
        replacement = "&ouml;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ö", "g");
        replacement = "&Ouml;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ü", "g");
        replacement = "&uuml;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ü", "g");
        replacement = "&Uuml;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("õ", "g");
        replacement = "&otilde;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Õ", "g");
        replacement = "&Otilde;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("û", "g");
        replacement = "&ucirc;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Û", "g");
        replacement = "&Ucirc;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ä", "g");
        replacement = "&auml;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ä", "g");
        replacement = "&Auml;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ß", "g");
        replacement = "&szlig;";
        str = str.replace(regexp, replacement);

        return str;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Minimal plaintext --> HTML converter
    //
    // (rel)(str)relativePath --> <a href="relativePath">str</a>
    // (rel)relativePath --> <a href="relativePath">relativePath</a>
    // (str)x://y --> <a href="x://y">str</a>
    // x://y --> <a href="x://y">x://y</a>
    // x@y   --> <a href="mailto:x@y">x@y</a>
    // *str* --> <em>str</em>
    // _str_ --> <cite>str</cite>
    // ==> --> <p>
    // <== --> </p>
    // == Headlines == --> <h2>Headlines</h2>, works from h1 to h6 as =, ==,... ======
    // __ --> <br>
    // (image)(CSSClass)relativePath --> <img class="CSSClass" src="relativePath"/>
    // (thumbnail)(CSSClass)relativePath >>> target
    //     --> <a href="target"><img class="CSSClass" src="relativePath"/></a>
    //
    // TODO: URL and email address patterns can be further improved
    liteDown(text)
    {
        let regexp;
        let replacement;

        // text = this.accented2HTML(text);

        //--------------------------------------------------------------------
        // texts between ==> and <== will be enclosed in a <p> paragraph </p>
        regexp = new RegExp("==>", "g");
        replacement = "<p>";
        text = text.replace(regexp, replacement);
        regexp = new RegExp("<==", "g");
        replacement = "</p>";
        text = text.replace(regexp, replacement);

        //--------------------------------------------------------------------

        // __ --> <br />
        // (____ --> <br /><br />, etc.)
        regexp = new RegExp("__", "g");
        replacement = "<br />";
        text = text.replace(regexp, replacement);

        //--------------------------------------------------------------------

        let text2;

        // (rel)(str)relativePath --> <a href="relativePath">str</a>
        while (true)
        {
            regexp = new RegExp("(>|\\s|^)\\(rel\\)\\((.*)\\)([^<\\s]*)(<|\\s|$)", "");
            replacement = '$1<a href="$3">$2</a>$4';
            text2 = text.replace(regexp, replacement);
            if (text === text2) {
                break;
            } else {
                text = text2;
            }
        }

        //--------------------------------------------------------------------

        // (rel)relativePath --> <a href="relativePath">relativePath</a>
        while (true)
        {
            regexp = new RegExp("(>|\\s|^)\\(rel\\)([^<\\s]*)(<|\\s|$)", "");
            replacement = '$1<a href="$2">$2</a>$3';
            text2 = text.replace(regexp, replacement);
            if (text === text2) {
                break;
            } else {
                text = text2;
            }
        }

        //--------------------------------------------------------------------

        // (str)url --> <a href="url">str</a>
        // Remark: watch out for > and < that are allowed before and after the
        // url string in this current regexp. May cause problems.
        while (true)
        {
            regexp = new RegExp("(>|\\s|^)\\((.*)\\)(\\w+:\\/{2}[\\w-\.\\/]+)(<|\\s|$)", "");
            replacement = '$1<a href="$3">$2</a>$4';
            text2 = text.replace(regexp, replacement);
            if (text === text2) {
                break;
            } else {
                text = text2;
            }
        }

        //--------------------------------------------------------------------

        // url --> <a href="url">url</a>
        // (url) --> <a href="url">url</a>
        while (true)
        {
            regexp = new RegExp("(\\(|\\s|^)(\\w+:\\/{2}[\\w-\.\\/]+)(\\)|\\s|$)", "");
            replacement = '$1<a href="$2">$2</a>$3';
            text2 = text.replace(regexp, replacement);
            if (text === text2) {
                break;
            } else {
                text = text2;
            }
        }

        //--------------------------------------------------------------------

        // x@y --> <a href="mailto:x@y">x@y</a>
        //
        // This should be further extended, according to the specification:
        //
        //     addr-spec   =  local-part "@" domain        ; global address
        //     local-part  =  word *("." word)             ; uninterpreted
        //                                                 ; case-preserved
        //
        //     domain      =  sub-domain *("." sub-domain)
        //     sub-domain  =  domain-ref / domain-literal
        //     domain-ref  =  atom                         ; symbolic reference
        //
        // The local-part of the email address may use any of these ASCII characters:
        //     ----------
        // uppercase and lowercase Latin letters A to Z and a to z;
        // digits 0 to 9;
        // special characters !#$%&'*+-/=?^_`{|}~;
        // dot ., provided that it is not the first or last character unless quoted,
        // and provided also that it does not appear consecutively unless quoted
        // (e.g. John..Doe@example.com is not allowed but "John..Doe"@example.com is allowed);
        // space and "(),:;<>@[\] characters are allowed with restrictions
        // (they are only allowed inside a quoted string, as described in the paragraph
        // below, and in addition, a backslash or double-quote must be preceded by a backslash);
        // comments are allowed with parentheses at either end of the local-part;
        // e.g. john.smith(comment)@example.com and (comment)john.smith@example.com
        // are both equivalent to john.smith@example.com.
        //
        // domain-part
        // -----------
        // The Internet standards (Request for Comments) for protocols mandate that
        // component hostname labels may contain only the ASCII letters a through z
        // (in a case-insensitive manner), the digits 0 through 9, and the hyphen (-).
        // The original specification of hostnames in RFC 952, mandated that labels
        // could not start with a digit or with a hyphen, and must not end with a hyphen.
        // However, a subsequent specification (RFC 1123) permitted hostname labels
        // to start with digits. No other symbols, punctuation characters, or blank
        // spaces are permitted.
        //
        // Something like this might work as well for a pattern:
        // function validateEmail(email) {
        //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(String(email).toLowerCase());
        // }
    while (true)
        {
            regexp = new RegExp("(\\s|^)([\\w-.]+@[\\w-.]+)(\\s|$)", "");
            replacement = '$1<a href="mailto:$2">$2</a>$3';
            text2 = text.replace(regexp, replacement);
            if (text === text2) {
                break;
            } else {
                text = text2;
            }
        }

        //--------------------------------------------------------------------

        // * --> em
        // Right:   bla *bla habla* bla
        //          <tag>*bla habla*<tag>
        // Wrong:   bla *bla habla*.
        //          bla * habla * bla
        while (true)
        {
            regexp = new RegExp("(>|\\s|^)\\*([^\*\\s][^\*]*[^\*\\s]|[^\*\\s])\\*(<|\\s|$)", "");
            replacement = "$1<em>$2</em>$3";
            text2 = text.replace(regexp, replacement);
            if (text === text2) {
                break;
            } else {
                text = text2;
            }
        }

        //--------------------------------------------------------------------

        // _ --> cite
        // Right:   bla _bla habla_ bla
        //          <tag>_blabla_</tag>
        // Wrong:   bla _bla habla_.
        //          bla _ habla _ bla
        while (true)
        {
            regexp = new RegExp("(>|\\s|^)_([^_\\s][^_]*[^_\\s]|[^_\\s])_(<|\\s|$)", "");
            replacement = "$1<cite>$2</cite>$3";
            text2 = text.replace(regexp, replacement);
            if (text === text2) {
                break;
            } else {
                text = text2;
            }
        }

        //--------------------------------------------------------------------
        // For single-line headers only
        // =bla= --> <h1>bla</h1>
        // ==bla== --> <h2>bla</h2>
        // ...
        for (let level = 1; level <= 6; level++)
        {
            regexp = new RegExp("^(\\s*)(=){"+level+"}([^=].*[^=])(=){"+level+"}(\\s*)$", "gm");
            replacement = "<h" + level + ">$3</h" + level + ">";
            text = text.replace(regexp, replacement);
        }

        //--------------------------------------------------------------------
        // (image)(CSSClass)relativePath --> <img class="CSSClass" src="relativePath"/>
        // requires a class definition in the document CSS (not mandatory)
        while (true)
        {
            regexp = new RegExp("(>|\\s|^)\\(image\\)\\((.*)\\)([^<\\s]*)(<|\\s|$)", "");
            replacement = '$1<img class="$2" src="$3"/>$4';
            text2 = text.replace(regexp, replacement);
            if (text === text2) {
                break;
            } else {
                text = text2;
            }
        }

		//--------------------------------------------------------------------
		// (thumbnail)(CSSClass)relativePath >>> target
		//     --> <a href="target"><img class="CSSClass" src="relativePath"/></a>
		// requires a class definition in the document CSS (not mandatory)
		text2 = text;
		do {
			text = text2;
			regexp = new RegExp("(>|\\s|^)\\(thumbnail\\)\\((.*)\\)([^<\\s]*)\\s+>>>\\s+(.*)(<|\\s|$)", "");
			replacement = '$1<a href="$4"><img class="$2" src="$3"/></a>$5';
			text2 = text.replace(regexp, replacement);
		} while (text2 !== text);

        //--------------------------------------------------------------------

        return text;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Accepts either JavaScript/DOM objects or DOM id string as parameter.
    // Returns JavaScript/DOM object.
    toObject(obj)
    {
        // If obj is a string than it is handled as a DOM id
        if (typeof(obj) === "string")
        {
            obj = this.getDOMElement(obj);
        }
        return obj;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Adds a custom event callback to a DOM element.
    // Params:
    //      element - DOM element
    //      eventName - event name
    //      callback - the function(param) triggered on event
    //      capturing -
    // "it is meant to state whether the event handler should be executed in the
    // capturing or in the bubbling phase. If you�re not certain whether you want
    // capturing or bubbling, use false (bubbling)."
    // Example:
    //      simpleUtils.attachEvent(newLink, "click", action);
    attachEvent(element, eventName, callback, capturing )
    {
        if ( element.addEventListener ) // the DOM2, W3C way
        {
            element.addEventListener( eventName, callback, capturing );
        }
        else if ( element.attachEvent ) // the IE way
        {
            element.attachEvent( "on" + eventName, callback );
        }
    };

    //------------------------------------------------------------------------

    // SimpleUtilities
    // eg.:
    // Given: arr = [{a:1, b:2}, {a:3, b:4}]
    // objectArray2objectHashTable(arr, "a") --> [1:{a:1, b:2}, 3:{a:3, b:4}]
    objectArray2objectHashTable(array, indexName)
    {
        let hashTable = [];

        for (let i in array) {
            // noinspection JSUnfilteredForInLoop
            hashTable[array[i][indexName]] = array[i];
        }

        return hashTable;
    }

    //------------------------------------------------------------------------

    // NOTE: since EcmaScript 6 there is native templating support for strings
    // Example:
    //     let soMany = 10;
    //     console.log(`This is ${soMany} times easier!`);
    //     // "This is 10 times easier!
    //     // Be aware that template strings are surrounded by backticks `
    //     // instead of (single) quotes.
    
    // SimpleUtilities
    // Supported params: %s
    // noinspection JSUnusedGlobalSymbols
    microSprintf(format, ...args)
    {
        let i = 0;
        return format.replace(/%s/g, () => args[i++]);
    }

    //------------------------------------------------------------------------

    // Make container draggable by handle
    // Usage:
    //    simpleUtils.draggable(container);
    //    simpleUtils.draggable(handle, container);
    // Drag range: [(0, 0), (infinite, infinite))
    draggable(handle, container = null)
    {
        Drag.init(handle, container, 0, 1000000000, 0, 1000000000);
    }

}

//----------------------------------------------------------------------------
// Cryptography class
//----------------------------------------------------------------------------

class SimpleCryptography
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // SimpleCryptography                                  Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = simpleClassesVersion;

        // *Altered*, URL-safe base64 character palette
        this.base64KeyStr
            = "ABCDEFGHIJKLMNOP"
            + "QRSTUVWXYZabcdef"
            + "ghijklmnopqrstuv"
            + "wxyz0123456789-_"
            + ".";
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------
    // Methods
    //------------------------------------------------------------------------

    // SimpleCryptography
    base64Encode(input)
    {
        let output = "";
        let chr1, chr2, chr3 = "";
        let enc1, enc2, enc3, enc4 = "";
        let i = 0;

        do
        {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2))
            {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3))
            {
                enc4 = 64;
            }

            output = output
                + this.base64KeyStr.charAt(enc1)
                + this.base64KeyStr.charAt(enc2)
                + this.base64KeyStr.charAt(enc3)
                + this.base64KeyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    // noinspection JSUnusedGlobalSymbols
    base64Decode(input)
    {
        let output = "";
        let chr1, chr2, chr3 = "";
        let enc1, enc2, enc3, enc4 = "";
        let i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, -, _, or .
        let base64Test = /[^A-Za-z0-9\-_.]/g;
        if (base64Test.exec(input))
        {
            alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '-', '_', and '.'\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\-_.]/g, "");

        do
        {
            enc1 = this.base64KeyStr.indexOf(input.charAt(i++));
            enc2 = this.base64KeyStr.indexOf(input.charAt(i++));
            enc3 = this.base64KeyStr.indexOf(input.charAt(i++));
            enc4 = this.base64KeyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64)
            {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64)
            {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    // Apparently RC4 cipher
    RC4Encrypt(password, data)
    {
        let buf = new Array(256);	// 256B cipher buffer

        let passwordLength = password.length;
        let dataLength = data.length;

        let i, j, k, n, tmp, cipher = "";

        for (i = 0; i < 256; i++)
        {
            buf[i] = i;
        }

        for (j = i = 0; i < 256; i++)
        {
            j = (j + buf[i] + password.charCodeAt(i % passwordLength)) % 256;
            tmp = buf[i];
            buf[i] = buf[j];
            buf[j] = tmp;
        }

        for (n = j = i = 0; i < dataLength; i++)
        {
            n = (n + 1) % 256;
            j = (j + buf[n]) % 256;

            tmp = buf[n];
            buf[n] = buf[j];
            buf[j] = tmp;

            k = buf[((buf[n] + buf[j]) % 256)];
            cipher += String.fromCharCode(data.charCodeAt(i) ^ k);
        }

        return cipher;
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    // Apparently RC4 cipher
    // noinspection JSUnusedGlobalSymbols
    RC4Decrypt(password, data)
    {
        return this.RC4Encrypt(password, data);
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    SHA1(data)
    {
        return hex_sha1(data);
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    // noinspection JSUnusedGlobalSymbols
    MD5(data)
    {
        return hex_md5(data);
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    generateRandomString(len)
    {
        let charBuffer =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";

        for (let i = 0; i < len; i++)
        {
            result
                += charBuffer[Math.floor(Math.random() * charBuffer.length)];
        }

        return result;
    }

}

//----------------------------------------------------------------------------

// GLOBAL
// noinspection JSUnusedGlobalSymbols
function rem(str)
{
}

//----------------------------------------------------------------------------
// Instances
//----------------------------------------------------------------------------

// noinspection JSUnusedGlobalSymbols
const simpleDebug  = new SimpleDebug();
const simpleUtils  = new SimpleUtilities();
const simpleCrypto = new SimpleCryptography();
//////////////////////////////////////////////////////////////////////////////
// RedSand dynamic JavaScript toolkit by Toth, Balazs Aladar (c) 2005-2018
// For detailed licensing information see conSense.js.
// See redSandVersion and the changelog for detailed version info.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

'use strict';

//----------------------------------------------------------------------------
// Globals
//----------------------------------------------------------------------------

const redSandVersion = "0.45";

//----------------------------------------------------------------------------
// RedSandUtilities
//----------------------------------------------------------------------------

class RedSandUtilities
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandUtilities                                    Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandUtilities
    // The second password is optional
    generateCredentials(encodePassword, packetPassword)
    {
        if (packetPassword === undefined) {
            packetPassword = encodePassword;
        }
        let encodePasswordHash = simpleCrypto.SHA1(encodePassword);
        let packetPasswordHash = simpleCrypto.SHA1(packetPassword);
        let thisDate = new Date().format("YYYY-MM-DD HH:mm:ss");
        let randomString = simpleCrypto.generateRandomString(16);

        let credentialsPackage
            = simpleCrypto.base64Encode(
                simpleCrypto.RC4Encrypt(
                    encodePasswordHash, packetPasswordHash + thisDate + randomString));

        return credentialsPackage;
    }

    //------------------------------------------------------------------------

    // RedSandUtilities
    // Appends userId and RC4 encrypted, URL encoded credentials parameter to
    // the params list and returns URI.
    // Params:
    //      uri - base URI
    //      params - existing parameter list, may be null
    //      userIdentifier
    //      password
    // Returns "deadbeef" on error.
    // noinspection JSUnusedGlobalSymbols
    formAuthenticatedURI(uri, params, userId, password)
    {
        let credentialsPackage = this.generateCredentials(password, password);

        if (params === null)
        {
            uri = simpleUtils.formURI(uri,
                {
                    "userIdentifier": userId,
                    "credentials": credentialsPackage
                });
        }
        else
        {
            // TODO: more thorough params list type/format checking
            if (typeof(params) !== "object")
            {
                return uri;
            }
            params.userIdentifier = userId;
            params.credentials = credentialsPackage;
            uri = simpleUtils.formURI(uri, params);
        }

        return uri;
    }

    //------------------------------------------------------------------------

    // RedSandUtilities
    // Screen blocker div
    // noinspection JSUnusedGlobalSymbols
    blockInput(color)
    {
        if (color === undefined) {
            color = "blue";
        }
        simpleUtils.getDOMElement("inputBlocker").style.background = color;
        simpleUtils.getDOMElement("inputBlocker").style.display = "block";
    }

    //------------------------------------------------------------------------

    // RedSandUtilities
    // Remove screen blocker div
    // noinspection JSUnusedGlobalSymbols
    unblockInput()
    {
        simpleUtils.getDOMElement("inputBlocker").style.display = "none";
    }
}

//----------------------------------------------------------------------------
// RedSandGenericLoader
//----------------------------------------------------------------------------

// *DEPENDENCY*
// Uses conSenseContainer as parent for loader divs.
// Uses conSense console methods.
class RedSandGenericLoader
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandGenericLoader                                Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.containers = [];
        this.frameNames = [];
        this.callbacks = [];
        // Loading process counter
        this.lastProcess = 0;

        // Green point. To recycle already used loader divs.
        this.oldContainerPool = [];

        //------------------------------------------------------------------------
        // Load indication

        // Trigger
        this.indicate = true;

        // Number of loading processes in queue
        this.loadsInProgress = 0;
        //////////////////////////////////////////////////////////////////////
    }

    showIndicator() {
        if (!redSandGenericLoader.indicate) {
            return;
        }
        redSandGenericLoader.loadsInProgress++;
        if (redSandGenericLoader.loadsInProgress === 1)
        {
            simpleUtils.getDOMElement("loadIndicator").style.display = "block";
        }
    }

    hideIndicator() {
        if (!redSandGenericLoader.indicate) {
            return;
        }
        redSandGenericLoader.loadsInProgress--;
        if (redSandGenericLoader.loadsInProgress === 0)
        {
            simpleUtils.getDOMElement("loadIndicator").style.display = "none";
        }
    }

    //------------------------------------------------------------------------

    // RedSandGenericLoader
    // If no callback is given, loaded content is evaluated as JavaScript
    // source
    load(uri, callback)
    {
        this.showIndicator();

        conSense.writeLn("[load request: " + uri + "]");
        
        // Evaluate loaded content as JavaScript source
        if (callback === undefined)
        {
            callback = redSandGenericLoader.javaScriptEvaluatorCallback;
        }

        // Callbacks
        this.callbacks.push(callback);

        if (this.oldContainerPool.length)
        {
            // Recycle old loader div if possible
            this.containers.push(this.oldContainerPool.pop());
        }
        else
        {
            // Create loader div "RedSandRegistryContainerNNN" if necessary
            let newContainer = document.createElement('div');
            newContainer.setAttribute(
                "id", "RedSandRegistryContainer" + this.lastProcess);
            newContainer.style.display = "none";
            conSense.conSenseContainer.appendChild(newContainer);

            this.containers.push(newContainer);
        }

        let uriRandom = uri + simpleUtils.randomSuffix();

        // Create loader IFrame "RedSandRegistryNNN" if necessary
        this.frameNames.push("RedSandRegistry" + this.lastProcess);

        this.containers[this.lastProcess].innerHTML
            = "<iframe name='"
            + this.frameNames[this.lastProcess]
            + "' id='"
            + this.frameNames[this.lastProcess]
            + "' onLoad='parent.redSandGenericLoader.loadedCallback("
            + this.lastProcess
            + ")' src='"
            + uriRandom
            + "' style='width: 0px; height: 0px; border: 0px;'></iframe>";
    }
    
    //------------------------------------------------------------------------

    // RedSandGenericLoader
    // Receives an index of loader arrays
    loadedCallback(processNum)
    {
        let content = "deadbeef";

        // Firefox
        if (window.frames[this.frameNames[processNum]].document.body.innerText === undefined)
        {
            // Firefox 1.5
            if (window.frames[this.frameNames[processNum]].document.body.textContent === undefined)
            {
                content = window.frames[this.frameNames[processNum]].document.body.innerHTML;
            }
            // Firefox 2.0
            else
            {
                content = window.frames[this.frameNames[processNum]].document.body.textContent;
            }
        }
        // IE
        else
        {
            content = window.frames[this.frameNames[processNum]].document.body.innerText;
        }

        let callback = this.callbacks[processNum];
        this.callbacks[processNum] = undefined;

        // Recycle old loader container DOM elements
        this.oldContainerPool.push(this.containers[processNum]);
        this.containers[processNum] = undefined;
        this.frameNames[processNum] = undefined;

        // Process counter increment, now that the loading finished
        this.lastProcess++;

        // Handle content
        conSense.scrollToBottomFocusInput();
        // User callback with loaded content as parameter
        callback(content);

        this.hideIndicator();

        conSense.separator();
        conSense.scrollToBottomFocusInput();
    }

    //------------------------------------------------------------------------

    // RedSandGenericLoader
    javaScriptEvaluatorCallback(content)
    {
        try
        {
            eval(content);
        }
        catch(ex)
        {
            conSense.writeLn(">>> JavaScript exception: " + ex);
            conSense.listObject(ex);
        }

        conSense.separator();
        conSense.scrollToBottomFocusInput();
    }
}

//----------------------------------------------------------------------------
// RedSandHashHandler
//----------------------------------------------------------------------------

class RedSandHashHandler
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandHashHandler                                  Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.hashSeparator = "#";
        this.paramSeparator = ";";
        this.equalsString = "=";

        this.lastHash = "deadbeef";

        // noinspection JSUnusedGlobalSymbols
        this.defaultHash = "deadbeef";

        // onHashChanged() event registry
        // Format: "hashParameterName": callbackFunction
        this.eventRegistry = [];

        // Indicate if it is the first RedSandHashHandler.onHashChanged() call
        this.firstRun = true;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    addEvent(hashParameterName, callbackFunction)
    {
    	this.eventRegistry[hashParameterName] = callbackFunction;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    onHashChanged()
    {
	    let params = this.processCurrentURIHash();
	    if (params === undefined) {
	        return;
	    }

        redSandHashHandler.updateNodeStyles();
	    
        for (let i in params) {
			// Bloody forEach()...
			if (i === "each" || i === "forEach") continue;
			for (let j in this.eventRegistry) {
				if (j === i) {
					// Callback found - do it for each found param -
					// passing along full parameter list every time
					this.eventRegistry[j](params);
				}
			}
		}

        //------------------------------------------------------------------------
        // Continuous hash change checking from the first run on
		if (this.firstRun !== undefined || this.firstRun === true)
		{
		    this.firstRun = false;
            window.setInterval(function() { if (redSandHashHandler.changed()) redSandHashHandler.onHashChanged(); }, 100);
        }
    }
    
    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Returns a boolean.
    changed()
    {
        if (window.location.hash !== this.lastHash)
        {
            this.lastHash = window.location.hash;
            return true;
        }
        else
        {
            return false;
        }
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    setDefaultHash(hash)
    {
        // noinspection JSUnusedGlobalSymbols
        this.defaultHash = hash;
        if (window.location.hash.length === 0)
        {
            // To avoid double loading when reloading with #
            this.lastHash = hash;
            // Setting window location hash
            window.location.hash = hash;
        }
        else
        {
            // To avoid double loading when reloading with #something
            this.lastHash = window.location.hash;
        }
        this.updateNodeStyles();
        this.onHashChanged();
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // {param0: "value0", param1: "value1", ...}
    //      --> "#param0=value0;param1=value1;..."
    // noinspection JSUnusedGlobalSymbols
    array2Hash(params)
    {
        let hash = this.hashSeparator;   // hash = "#"

        for (let i in params)
        {
            // hash += "paramN=valueN;"
            // noinspection JSUnfilteredForInLoop
            hash += "" + i + this.equalsString + params[i] + this.paramSeparator;
        }

        // Cut trailing ; if present
        if (hash.length > 2)
        {
            hash = hash.substr(0, hash.length - this.paramSeparator.length);
        }

        return hash;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // "#param0=value0;param1=value1;..."
    //      --> {param0: "value0", param1: "value1", ...}
    // TODO: eliminate duplicated parameters
    hash2Array(hash)
    {
        // remove trailing paramSeparator if present
        if (hash.substr(hash.length - this.paramSeparator.length) === this.paramSeparator)
        {
            hash = hash.substr(0, hash.length - this.paramSeparator.length);
        }

        let params = [];
        // "#param0=value0;param1=value1;..."
        //      --> {"param0=value0", "param1=value1", ...}
        let paramsTemp
            = hash.substr(this.hashSeparator.length).split(this.paramSeparator);

        // {"param0=value0", "param1=value1", ...}
        //      --> {param0: "value0", param1: "value1", ...}
        for (let i = 0; i < paramsTemp.length; i++)
        {
            let splitInTwo = paramsTemp[i].split(this.equalsString);
            params[splitInTwo[0]] = splitInTwo[1];
        }

        return params;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Returns an array of anchors present in the document.
    getDocumentAnchors()
    {
        let anchors = [];

        for (let i = 0; i < document.anchors.length; i++)
        {
            anchors[this.hashSeparator + document.anchors[i].name] = true;
        }

        return anchors;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Verifies if the current URI hash is present in the document as an
    // anchor name. If not, the hash is processed as a URI parameter list and
    // the resulting *associative array* of parameter name-value pairs is
    // returned.
    // Otherwise the resulting value will be *undefined*.
    processCurrentURIHash()
    {
        let anchors = this.getDocumentAnchors();

        if (anchors[window.location.hash] === undefined)
        {
            // Return array
            return this.hash2Array(window.location.hash);
        }

        return undefined;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Helper function
    // Returns with the first matching menu item for which:
    // all link parameters are present in the menu item link.
    // *PRIVATE*
    menuContainsLink(menu, link)
    {
        for (let i in menu.items)
        {
            if (i === "each" || i === "forEach") continue;
            // noinspection JSUnfilteredForInLoop
            let itemParamArray = this.hash2Array(menu.items[i].link);
            let linkParamArray = this.hash2Array(link);
            let itemParamCount = 0;
            let matchCount = 0;
            // Parse through current item params
            for (let j in itemParamArray) {
            	if (j === "each"  || j === "forEach") continue;
            	itemParamCount++;
            	// Parse through link params
	            for (let k in linkParamArray) {
	                if (k === "each" || k === "forEach") continue;
                    // noinspection JSUnfilteredForInLoop
	                if (j === k && itemParamArray[j] === linkParamArray[k]) {
	                	matchCount++;
	                }
	            }
            }
            if (itemParamCount === matchCount) {
                // noinspection JSUnfilteredForInLoop
                return menu.items[i];
            }
        }
        
        return undefined;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Trigger visual effects defined by node.deselectedClassName and
    // node.selectedClassName
    updateNodeStyles()
    {
        for (let i in redSandRegistry.menus)
        {
            let menu = redSandRegistry.menus[i];
            if (!menu.items) continue;
            
            let item = this.menuContainsLink(menu, window.location.hash);
            if (item === undefined) continue;
            // Select new node
            simpleUtils.getDOMElement(item.DOMid).className = item.selectedClassName;
            // Deselect last node
            if ((menu.lastSelectedNode !== undefined)
                && (menu.lastSelectedNode !== item)) {
                    simpleUtils.getDOMElement(menu.lastSelectedNode.DOMid).className
                    	= menu.lastSelectedNode.deselectedClassName;
            }
            // Register new node as lastly selected
            menu.lastSelectedNode = item;
        }
    }

}

//----------------------------------------------------------------------------
// RedSandRegistry
//----------------------------------------------------------------------------

// Mainly a register class for load operations - the whole loading framework
// is fully functional without it.
class RedSandRegistry
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandRegistry                                     Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.menus = [];
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandRegistry
    // Returns a two dimensional array of RedSandNodes or undefined if no result.
    // Return format: nodes[menu] --> nodeArray
    // noinspection JSUnusedGlobalSymbols
    findMenuNodesByLink(link)
    {
        let menuNodes = [];
        let empty = true;

        for (let i in this.menus)
        {
            let menu = this.menus[i];
            if (!menu.items) continue;
            let nodes = [];
            for (let j in menu.items)
            {
                // noinspection JSUnfilteredForInLoop
                let item = menu.items[j];
                if (!item.link) continue;
                if (item.link === link)
                {
                    nodes.push(item);
                }
            }
            if (nodes.length > 0) {
                menuNodes[menu.id] = nodes;
                empty = false;
            }
        }
        
        if (!empty) {
            return menuNodes;
        }
        return undefined;
    }

    //------------------------------------------------------------------------

    // RedSandRegistry
    addMenu(obj)
    {
        this.menus[obj.id] = obj;
    }

}

//----------------------------------------------------------------------------
// RedSandUITextManager
//----------------------------------------------------------------------------

// Class for handling dynamic UI text changes
class RedSandUITextManager
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandRegistry                                     Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        // Private
        // UI text registry with items like "DOMid; field; textId": textTable
        // eg.: "aboutBox; innerHTML; aboutUs": interfaceTexts
        this.registry = [];
        // Default UI text table. Used when creating new RedSandNodes.
        this.currentTable = undefined;

        // Text table field names
        this.fieldId = "id";
        this.fieldText = "text";
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandUITextManager
    // Initializes a text table to be used from/with UI text registry.
    // Changes table format from:  [{id, text}, ...]
    // to: [id: {id, text}, ...]
    // The table parameter may directly come as a result of a
    /*
        load(
            simpleUtils.formURI(
                "ConSense/server/php/scripts/dbSelectJSOutput.php",
                {
                    table: "rsuitexts",
                    id: "",
                    lang: globals.uiLanguage,
                    text: "",
                    resultName: "rsuitexts",
                    userIdentifier: "guest"
                }
            ),
            refreshUITextsCallback
        );
    */
    // call.
    initTextTable(table)
    {
        let newTable = simpleUtils.objectArray2objectHashTable(table, this.fieldId);

        // Mass liteDown()
        for (let i in newTable) {
            // noinspection JSUnfilteredForInLoop
            if (newTable[i][this.fieldText]) {
                // noinspection JSUnfilteredForInLoop
                newTable[i][this.fieldText] = simpleUtils.liteDown(newTable[i][this.fieldText]);
            }
        }

        return newTable;
    }

    //------------------------------------------------------------------------

    // RedSandUITextManager
    // Sets new UI text array for registry items and redisplays them
    setTextTable(table)
    {
        for (let i in this.registry) {
            // Skip if the textTable is empty
            if (this.registry[i] === undefined || typeof(this.registry[i]) !== "object") {
                continue;
            }
            this.registry[i] = table;
        }
        this.currentTable = table;
        this.refresh();
    }

    //------------------------------------------------------------------------

    // RedSandUITextManager
    setText(DOMid, field, textId)
    {
        // Skip display if textId is empty
        if (textId !== "") {
            let domElem = simpleUtils.getDOMElement(DOMid);
            if (domElem === undefined) return;
            domElem[field] = this.currentTable[textId][this.fieldText];
        }
        this.registry[DOMid + "; " + field + "; " + textId] = this.currentTable;
    }

    //------------------------------------------------------------------------

    // RedSandUITextManager
    // Reparses and redisplays UI text registry items
    refresh()
    {
        for (let i in this.registry) {
            // Skip if the textTable is empty
            if (this.registry[i] === undefined || typeof(this.registry[i]) !== "object") {
                continue;
            }
            let elem = i;
            elem = elem.split(";");
            elem[0] = simpleUtils.trimString(elem[0]);	// DOMid
            elem[1] = simpleUtils.trimString(elem[1]);	// field
            elem[2] = simpleUtils.trimString(elem[2]);	// textId
            // Skip invalid reg entries
            if (simpleUtils.getDOMElement(elem[0]) === undefined) {
                // Entries with non-existent DOMids will be removed
                this.registry[i] = undefined;
                continue;
            }
            simpleUtils.getDOMElement(elem[0])[elem[1]] = this.registry[i][elem[2]][this.fieldText];
        }
    }
}

//----------------------------------------------------------------------------
// RedSandNode
//----------------------------------------------------------------------------

// Common RedSandNode class
// Special custom parameters:
//      "fullPageload" - denotes a node which should be rendered as full page
//          contents
class RedSandNode
{
    //------------------------------------------------------------------------

    constructor(DOMid, textId, deselectedClassName, selectedClassName, link, custom)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandNode                                         Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        // Constructor parameters
        this.DOMid = DOMid;
        this.textId = textId;           // Node label UI text id
        this.selectedClassName = selectedClassName;     // CSS class name in case node is activated
        this.deselectedClassName = deselectedClassName; // CSS class name in case node is deactivated
        this.className = this.deselectedClassName;      // CSS class name
        this.link = link;               // link URI
        this.custom = custom;           // Custom parameter object
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandNode
    renderString()
    {
    	// Creating node *without* text content yet! Content is added in
    	// RedSand*.render() or manually.
        let result = "<a "
            + "id='"
            + this.DOMid
            + "' class='"
            + this.className
            + "' href='"
            + this.link
            + "'></a>";

        return result;
    }

    //------------------------------------------------------------------------

    // RedSandNode
    render(container)
    {
        container.innerHTML += this.renderString();
        // Auto UI text registration, no manual UI text registry entry needed
        redSandUITextManager.setText(
            this.DOMid,
            "innerHTML",
            this.textId
        );
    }
}

//----------------------------------------------------------------------------
// RedSandMenu
//----------------------------------------------------------------------------

// name - menu name, used for referral in RedSandRegistry
// items - an array of redSandNodes
// menuContainer - DOM id
// *DEPENDENCY* with redSandRegistry
class RedSandMenu
{
    //------------------------------------------------------------------------

    constructor(id, items, menuContainer)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandMenu                                         Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.id = id;
        this.items = items;
        this.menuContainer = simpleUtils.getDOMElement(menuContainer);

        // For RedSandHashHandler.updateNodeStyles()
        // noinspection JSUnusedGlobalSymbols
        this.lastSelectedNode = undefined;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandMenu
    render()
    {
        if (!this.items.length) return "";

        for (let i=0; i < this.items.length; i++)
        {
        	if (this.items[i].DOMid === undefined) continue;
            this.menuContainer.innerHTML += this.items[i].renderString();
            // Auto UI text registration, no manual UI text registry entry needed
            redSandUITextManager.setText(
                this.items[i].DOMid,
                "innerHTML",
                this.items[i].textId
            );
        }
    }
}

//----------------------------------------------------------------------------
// RedSandWindowlet
//----------------------------------------------------------------------------

// Used for RedSandNode Id assignment
// GLOBAL
// TODO: make it a static class variable as soon as supported by EcmaScript
let staticRedSandId = 0;

// Creates a basic draggable window
class RedSandWindowlet
{

    //------------------------------------------------------------------------

    constructor(left, top, width, height, background, border, draggable)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandWindowlet                                    Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        // Constructor params

        // Defaults
        if (background === undefined || background === "default")
        {
            background = "white";
        }
        if (border === undefined || border === "default")
        {
            border = "1px solid gray";
        }
        if (draggable === undefined)
        {
            draggable = true;
        }

        // Fields
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.background = background;
        this.border = border;
        this.draggable = draggable;     // Flag

        this.DOMContainer = undefined;
        this.id = "RedSandId" + staticRedSandId++;

        // noinspection JSUnusedGlobalSymbols
        this.borderVisible = true;
        //////////////////////////////////////////////////////////////////////
        
        this.DOMContainer = document.createElement('div');

        this.DOMContainer.id = this.id;
        this.DOMContainer.style.display = "block";
        this.DOMContainer.style.position = "absolute";
        this.DOMContainer.style.overflow = "auto";
        this.DOMContainer.style.width  = this.width  + "px";    // "px" for HTML5
        this.DOMContainer.style.height = this.height + "px";
        this.DOMContainer.style.left   = this.left   + "px";
        this.DOMContainer.style.top    = this.top    + "px";
        this.DOMContainer.style.background = background;
        this.DOMContainer.style.border = this.border;
        redSandWindowletManager.initZIndex(this);

        document.body.appendChild(this.DOMContainer);

        if (this.draggable)
        {
            // Make it draggable
            simpleUtils.draggable(this.DOMContainer);
            // Update Z-index
            let windowlet = this;
            this.DOMContainer.onDragStart = function()
            {
                redSandWindowletManager.updateZIndex(windowlet);
            }
        }
    }

    //------------------------------------------------------------------------

    // RedSandWindowlet
    show()
    {
        this.DOMContainer.style.display = "block";
    }

    //------------------------------------------------------------------------

    // RedSandWindowlet
    hide()
    {
        this.DOMContainer.style.display = "none";
    }

    //------------------------------------------------------------------------

    // RedSandWindowlet
    // noinspection JSUnusedGlobalSymbols
    borderOn()
    {
        this.DOMContainer.style.border = this.border;
    }

    //------------------------------------------------------------------------

    // RedSandWindowlet
    // noinspection JSUnusedGlobalSymbols
    borderOff()
    {
        this.DOMContainer.style.border = "none";
    }
}

//----------------------------------------------------------------------------
// RedSandWindowletManager
//----------------------------------------------------------------------------

class RedSandWindowletManager
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandWindowletManager                             Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.topmostWindowlet = undefined;
        this.highestZIndex = 1000000;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandWindowletManager
    // Assigns new z-index and sets topmostWindowlet
    initZIndex(windowlet)
    {
        // Set new z-index
        windowlet.DOMContainer.style.zIndex = "" + this.highestZIndex++;
        // Set topmost windowlet
        this.topmostWindowlet = windowlet;
    }

    //------------------------------------------------------------------------

    // RedSandWindowletManager
    updateZIndex(windowlet)
    {
        // Switch z-index with that of the topmost windowlet and update
        // topmostWindowlet to windowlet
        let windowletZIndex = windowlet.DOMContainer.style.zIndex;
        windowlet.DOMContainer.style.zIndex
            = this.topmostWindowlet.DOMContainer.style.zIndex;
        this.topmostWindowlet.DOMContainer.style.zIndex = windowletZIndex;
        this.topmostWindowlet = windowlet;
    }
}

//----------------------------------------------------------------------------
// Instances
// GLOBAL
//----------------------------------------------------------------------------

// noinspection JSUnusedGlobalSymbols
const redSandUtils = new RedSandUtilities();
// This class is used in ConSense, gives an error if "let" or "const"
// noinspection ES6ConvertVarToLetConst
var   redSandGenericLoader = new RedSandGenericLoader();
const redSandHashHandler = new RedSandHashHandler();
const redSandRegistry = new RedSandRegistry();
const redSandUITextManager = new RedSandUITextManager();
const redSandWindowletManager = new RedSandWindowletManager();

//----------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////
// RedSand/GL by Toth, Balazs Aladar (c) 2005-2018
// For detailed licensing information see conSense.js.
// See redSandGLVersion and the changelog for detailed version info.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Remarks
//////////////////////////////////////////////////////////////////////////////
//
// Color array structure:
//      eg. {r:0, g:0, b:0, a:100}
//      defines black with 100% opacity.
//
//////////////////////////////////////////////////////////////////////////////

'use strict';

const redSandGLVersion = "0.04";

//----------------------------------------------------------------------------
// RedSandGLScene
//----------------------------------------------------------------------------

class RedSandGLViewport
{
    //------------------------------------------------------------------------

    // Params:
    //     viewport origin coordinates
    constructor(originX = 0, originY = 0)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandGLViewport                                   Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandGLVersion;
        //////////////////////////////////////////////////////////////////////

        // noinspection JSUnusedGlobalSymbols
        this.originX = originX;
        // noinspection JSUnusedGlobalSymbols
        this.originY = originY;
    }

    //------------------------------------------------------------------------
    // Methods
    //------------------------------------------------------------------------

    // RedSandGLScene
    // noinspection JSUnusedGlobalSymbols
    setOrigin(originX, originY)
    {
        // noinspection JSUnusedGlobalSymbols
        this.originX = originX;
        // noinspection JSUnusedGlobalSymbols
        this.originY = originY;
    }
}

//----------------------------------------------------------------------------
// RedSandGLPrimitive
//----------------------------------------------------------------------------

class RedSandGLPrimitive
{
    //------------------------------------------------------------------------

    constructor(viewport)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandGLViewport                                   Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandGLVersion;

        // noinspection JSUnusedGlobalSymbols
        this.viewport = viewport;
        //////////////////////////////////////////////////////////////////////

        if (viewport === undefined)
        {
            alert("RedSandGLViewport should be specified for RedSandGLPrimitive() call.");
        }
    }
    
    //------------------------------------------------------------------------
    // Methods
    //------------------------------------------------------------------------

    // RedSandGLPrimitive
    // noinspection JSUnusedGlobalSymbols
    plot(x, y, color)
    {
    }

    //------------------------------------------------------------------------

    // RedSandGLPrimitive
    line(x1, y1, x2, y2, color, antialias)
    {
    }

    //------------------------------------------------------------------------

    // RedSandGLPrimitive
    // Erases current primitive graphics.
    // noinspection JSUnusedGlobalSymbols
    erase()
    {
    }
    
}
//////////////////////////////////////////////////////////////////////////////
// ConSense by Toth, Balazs Aladar (c) 2005-2018, comes under the terms of the
// MIT License (http://www.opensource.org/licenses/mit-license.html)
// See conSense.version and the Changelog for detailed version info.
// Currently supported browsers: latest Firefox, Chrome, Edge and probably all
// else. See the Documentation for details.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////
//
// Classes                              Instances
// ---------------------------------------------------------------------------
//
// ConSense.                            conSense
//      version                  c
//      debug
//      echo
//      verbose
//      commandLine
//      oldCommandLine
//      conSenseContainer
//      conSenseInnerContainer
//      conSenseHeader
//      conSenseHeaderSwitch
//      conSenseOut
//      conSenseIn
//      conSenseCounter
//      containerHeight
//      containerScrollTop
//      zTop                     c
//      scrollInfinite           c
//      visible
//      globalVisible
//      show                     c
//      hide                     c
//      toggle                   c
//      interfaceText
//      outlineColor
//      lastKeyEventType
//      commandHistory
//      commandHistoryPosition
//      currentlyTypedCommand
//      tabPixelSize             c
//      mapResultBuffer
//      mapTempObjects
//      mapTempObjectCounter
//      mapExcerptSize           c
//      mapShowConSense
//      mapShowEmptyTexts
//      lastWriteLn
//      separatorString
//      --------------------------
//      writeTitle()
//      clearScreen()
//      write()
//      writeLn()
//      writeManualEntry()
//      separator()
//      debugLn()
//      echoLn()
//      verboseLn()
//      getInput()
//      setInput()
//      appendInput()
//      highlight()
//      highlightAppendLink()
//      highlightLabelledAppendLink()
//      --------------------------
//      init()
//      updateCounter()
//      handleInput()
//      handleCommand()
//      showConsole()
//      scrollToBottomFocusInput()
//      globalShowConsole()
//      --------------------------
//      toObject()
//      listObject()
//      listObjectStyle()
//      outlineDOMElement()
//      outlineDOMElementsByTag()
//      outlineDOMSubtree()
//      tabulator()
//      mapAppendObjectLink()
//      mapDOMSubtree()
//      mapDynamicCSS()
//      listCSS()
//      listCSS_getFormattedRule()
//      listCSS_HandleStyleNode()
//      listCSS_HandleLinkNode()
//      license()
//      help()
//
// clear()
// debug()
// help()
// license()
// list()
// inspect()
// listCSS()
// listStyle()
// load()
// map()
// mapCSS()
// outline()
// outlineAll()
// outlineSub()
// write()
//
// (* stands for constructor parameter) 
// (c stands for constant)
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// KNOWN BUGS
//////////////////////////////////////////////////////////////////////////////
//
// B0 The ignorance of IE regarding z-indexes causes severe rendering bugs
//    here and there (widgets float on top of the console). Since it is
//    hardcoded into IE6 nothing can be done.
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Notes:
//////////////////////////////////////////////////////////////////////////////
//
// Uses
//      (look in conSenseStub*.js)
//
//////////////////////////////////////////////////////////////////////////////
//
// HTML elements and corresponding CSS ids/classes:
//
// id                           field
// --------------------------------------------------------
// conSenseContainer
// conSenseInnerContainer
// conSenseHeader
// conSenseHeaderSwitch
// conSenseOut                  output
// conSenseIn                   command line
// conSenseCounter              command line length counter
// conSenseHighlight
// conSenseHighlightAppendLink
// conSenseManualEntry
// conSenseManualEntryHead
//
//////////////////////////////////////////////////////////////////////////////
//
// Incremental text search not needed due to existing browser functionality.
//
//////////////////////////////////////////////////////////////////////////////

'use strict';

//----------------------------------------------------------------------------
// ConSense class
//----------------------------------------------------------------------------

class ConSense
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // ConSense                                            Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = "1.16";

        // Toggle debug operation
        this.debug = true;

        // Toggle echo mode
        this.echo = true;

        // Toggle verbose mode
        this.verbose = true;

        // Command string
        this.commandLine = "";
        // For handleInput()
        this.oldCommandLine = "";

        // UI DOM elements
        this.conSenseContainer = undefined;
        this.conSenseInnerContainer = undefined;
        this.conSenseHeader = undefined;
        this.conSenseHeaderSwitch = undefined;
        this.conSenseOut = undefined;
        this.conSenseIn = undefined;
        this.conSenseCounter = undefined;

        this.containerHeight = undefined;
        this.containerScrollTop = undefined;

        // Top Z index
        this.zTop = 2000000001;
        this.scrollInfinite = 1000000000;

        this.show = true;
        this.hide = false;

        // Indicates ConSense visibility - show by default
        this.visible = this.show;
        this.globalVisible = this.show;

        // Indicates toggle mode for show functions
        this.toggle = "toggle";

        // Array of all interface texts
        this.interfaceText =
            {
                showConsoleButton: "Show",
                hideConsoleButton: "Hide"
            };

        // Used for DOM element outlining
        this.outlineColor = "red";

        // Used in handleInput()
        this.lastKeyEventType = "deadbeef";

        this.commandHistory = [];
        this.commandHistoryPosition = 0;
        this.currentlyTypedCommand = "";

        this.tabPixelSize = 20;

        // mapDOMSubtree() variables
        // noinspection JSUnusedGlobalSymbols
        this.mapResultBuffer = undefined;
        this.mapTempObjects = undefined;
        this.mapTempObjectCounter = 0;
        this.mapExcerptSize = 40;
        this.mapShowConSense = false;       // Details in help()
        this.mapShowEmptyTexts = false;

        this.lastWriteLn = "";
        this.separatorString = "===============================";
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------
    // Fields
    //------------------------------------------------------------------------


    //------------------------------------------------------------------------
    // Input/Output methods
    //------------------------------------------------------------------------

    // ConSense
    writeTitle()
    {
        this.writeLn("Type " + conSense.highlightAppendLink("help()")
            + " + Enter for usage information.");
    }

    //------------------------------------------------------------------------

    // ConSense
    clearScreen()
    {
        this.conSenseOut.innerHTML = "";
        this.writeTitle();
    }

    //------------------------------------------------------------------------

    // ConSense
    write(str)
    {
        this.conSenseOut.innerHTML += str;
    }

    //------------------------------------------------------------------------

    // ConSense
    writeLn(str)
    {
        this.lastWriteLn = str;
        this.conSenseOut.innerHTML += str + "<br />";
    }

    //------------------------------------------------------------------------

    // ConSense
    writeManualEntry(name, str)
    {
        if (name !== "")
        {
            this.conSenseOut.innerHTML
                += "<div class='conSenseManualEntry'>"
                + "<span class='conSenseManualEntryHead'>"
                + conSense.highlightAppendLink(name)
                + "</span> " + str + "</div>";
        }
        else
        {
            this.conSenseOut.innerHTML
                += "<div class='conSenseManualEntry'>"
                + "<span class='conSenseManualEntryHead'>"
                + "</span> " + str + "</div>";
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    separator()
    {
        if (this.lastWriteLn !== this.separatorString)
        {
            this.writeLn(this.separatorString);
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    debugLn(value0, value1)
    {
        if (this.debug)
        {
            let now = new Date();

            if (value0 === undefined)
            {
                value0 = "";
            }
            if (value1 === undefined)
            {
                value1 = "";
            }

            this.writeLn(
                "("
                + now.format("HH:mm:ss")
                + ") *" + value0
                + "* *" + value1 + "*");
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    echoLn(str)
    {
        if (this.echo)
        {
            this.writeLn("[echo: " + this.highlightAppendLink(str) + "]");
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    verboseLn(str)
    {
        if (this.verbose && str !== undefined)
        {
            this.writeLn("[result: " + str + "]");
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    getInput()
    {
        return simpleUtils.trimString(this.conSenseIn.value);
    }

    //------------------------------------------------------------------------

    // ConSense
    setInput(str)
    {
        this.conSenseIn.value = str;
    }

    //------------------------------------------------------------------------

    // ConSense
    // Not just generic append string!
    // noinspection JSUnusedGlobalSymbols
    appendInput(str)
    {
        if (this.conSenseIn.value.length === 0)
        {
            this.conSenseIn.value += str;
        }
        else
        {
            this.conSenseIn.value += " " + str;
        }
        this.scrollToBottomFocusInput();
    }

    //------------------------------------------------------------------------

    // ConSense
    // Return highlighted HTML string.
    // Uses conSenseHighlight style.
    highlight(str)
    {
        return "<span class='conSenseHighlight'>&nbsp;" + str
                    + "&nbsp;</span>";
    }

    //------------------------------------------------------------------------

    // ConSense
    // Return highlighted HTML append link string.
    // Uses conSenseHighlightAppendLink style.
    highlightAppendLink(str)
    {
        // *ENV* stub.relativeConSensePath
        return "<a class='conSenseHighlightAppendLink' href='javascript:conSense.appendInput(\""
                    + str.replace(/"/g, "\\\"") + "\")'>"
                    + "<img src='" + stub.relativeConSensePath + "conSense/images/orangeArrow.png' style='border: 0;'>"
                    + simpleUtils.HTML2Source(str) + "</a>";
    }

    //------------------------------------------------------------------------

    // ConSense
    // Return highlighted HTML append link string.
    // Uses conSenseHighlightAppendLink style.
    highlightLabelledAppendLink(label, str)
    {
        return "<a class='conSenseHighlightAppendLink' href='javascript:conSense.appendInput(\""
                    + str.replace(/"/g, "\\\"") + "\")'>"
                    + label + "</a>";
    }

    //------------------------------------------------------------------------
    // Core methods
    //------------------------------------------------------------------------

    // ConSense
    init(show, startXPos, startYPos)
    {
        simpleUtils.checkBrowser();

        //--------------------------------------------------------------------
        // Non-ConSense init
        
        // For RedSandGenericLoader load indication
        // *ENV* stub.relativeConSensePath
        document.body.innerHTML +=
            '<!-- RedSand -->\
            <div id="loadIndicator" class="loadIndicator">\
                <img src="' + stub.relativeConSensePath + 'conSense/images/loader.gif" style="border: 0;">\
            </div>\
            <div id="inputBlocker" class="inputBlocker">\
            </div>\
            <!-- End of RedSand -->';
        
        //--------------------------------------------------------------------
        // Con-Sense-specific init
        
        if (startXPos === undefined)
        {
            startXPos = "20px";
        }
        if (startYPos === undefined)
        {
            startYPos = "20px";
        }

        //--------------------------------------------------------------------
        
        // Interface created with innerHTML instead of createElement() because
        // of maintainability reasons
        document.body.innerHTML +=
            '<!-- ConSense -->\
            <div id="conSenseContainer" class="conSenseContainer">\
                <div id="conSenseHeader" class="conSenseHeader">\
                    Loading ConSense...\
                </div>\
                <div id="conSenseHeaderSwitch" class="conSenseHeaderSwitch"\
                    onClick="conSense.showConsole(conSense.toggle)"\
                >\
                    &nbsp;\
                </div>\
                <div id="conSenseInnerContainer" class="conSenseInnerContainer"\
                    onScroll="conSense.containerScrollTop = conSense.conSenseInnerContainer.scrollTop"\
                >\
                    <form>\
                        <div id="conSenseOut" class="conSenseOut"\
                            onDblClick="conSense.scrollToBottomFocusInput()"\
                        >\
                        </div>\
                        <input id="conSenseIn" class="conSenseIn"\
                            onKeyDown="conSense.handleInput(event, \'down\')"\
                            onKeyPress="conSense.handleInput(event, \'press\')"\
                            onKeyUp="conSense.handleInput(event, \'up\')"\
                            type="text" maxlength="1000" size="1000" />\
                        <input id="conSenseCounter" class="conSenseCounter" type="text" maxlength="4" size="4" readonly />\
                    </form>\
                </div>\
            </div>\
            <!-- End of ConSense -->';

        //--------------------------------------------------------------------

        // Interface elements
        // *NAMING*
        
        this.conSenseContainer
                = simpleUtils.getDOMElement("conSenseContainer");
        this.conSenseInnerContainer
                = simpleUtils.getDOMElement("conSenseInnerContainer");
        this.conSenseHeader
                = simpleUtils.getDOMElement("conSenseHeader");
        this.conSenseHeaderSwitch
                = simpleUtils.getDOMElement("conSenseHeaderSwitch");
        this.conSenseOut     = simpleUtils.getDOMElement("conSenseOut");
        this.conSenseIn      = simpleUtils.getDOMElement("conSenseIn");
        this.conSenseCounter = simpleUtils.getDOMElement("conSenseCounter");

        //--------------------------------------------------------------------

        // Used for show/hide
        this.containerHeight = this.conSenseInnerContainer.style.height;
        // this.innerContainerHeight = this.conSenseInnerContainer.style.height;

        this.conSenseHeader.innerHTML = "ConSense v" + this.version;
        this.showConsole(show);
        this.globalShowConsole(show);

        this.writeTitle();
        this.separator();
        this.updateCounter();

        this.scrollToBottomFocusInput();

        this.conSenseContainer.style.zIndex = "" + this.zTop;
        this.conSenseContainer.style.left = startXPos + "px";    // "px" for HTML5
        this.conSenseContainer.style.top = startYPos + "px";
        
        //--------------------------------------------------------------------

        // Make conSenseContainer draggable in the range of
        simpleUtils.draggable(this.conSenseHeader, this.conSenseContainer);

        //--------------------------------------------------------------------

        // Keyboard shortcut to show/hide the ConSense console
        kd.K.press(function (evt) {
            if (evt.altKey && evt.shiftKey)
            {
                conSense.showConsole(conSense.toggle);
                conSense.globalShowConsole(conSense.toggle);
                conSense.scrollToBottomFocusInput();
            }
        });
    }

    //------------------------------------------------------------------------

    // ConSense
    updateCounter()
    {
        this.conSenseCounter.value = this.conSenseIn.value.length;
    }

    //------------------------------------------------------------------------

    // ConSense
    // Valid key event types: down, press, up
    handleInput(event, type)
    {
        let thisEvent = (simpleUtils.getKeyName(event));

        //--------------------------------------------------------------------
        if (thisEvent === "Enter"
            && this.lastKeyEventType === "press")
        {
            this.handleCommand();
        }
        //--------------------------------------------------------------------
        else if (thisEvent === "Arrow Up"
            && this.lastKeyEventType === "down")
        {
            if (this.commandHistoryPosition === this.commandHistory.length)
            {
                this.currentlyTypedCommand = this.getInput();
            }
            if (this.commandHistoryPosition > 0)
            {
                this.commandHistoryPosition--;
                this.setInput(
                    this.commandHistory[this.commandHistoryPosition]);
            }
        }
        //--------------------------------------------------------------------
        else if (thisEvent === "Arrow Down"
            && this.lastKeyEventType === "down")
        {
            if (this.commandHistoryPosition === this.commandHistory.length-1)
            {
                this.commandHistoryPosition++;
                this.setInput(this.currentlyTypedCommand);
            }
            else if (this.commandHistoryPosition < this.commandHistory.length-1)
            {
                this.commandHistoryPosition++;
                this.setInput(
                    this.commandHistory[this.commandHistoryPosition]);
            }
        }
        //--------------------------------------------------------------------
        // Typing
        else if (this.getInput() !== this.oldCommandLine)
        {
            this.commandHistoryPosition = this.commandHistory.length;
        }

        this.updateCounter();
        this.lastKeyEventType = type;
        this.oldCommandLine = this.getInput();
    }

    //------------------------------------------------------------------------

    // ConSense
    handleCommand()
    {
        // Split the trimmed input line by whitespaces
        // this.commandLine = this.getInput().split(/\s+/);

        // Simply copy trimmed input line
        this.commandLine = this.getInput();
        
        // Maintain command history
        this.commandHistory.push(this.commandLine);
        this.commandHistoryPosition = this.commandHistory.length;

        this.setInput("");
        this.updateCounter();

        this.echoLn(this.commandLine);

        // Evaluate command line as JavaScript code
        try
        {
            let result = eval(this.commandLine);
            this.verboseLn(result);
        }
        catch(ex)
        {
            this.writeLn(">>> JavaScript exception: " + ex);
            this.listObject(ex);
        }

        this.separator();

        this.scrollToBottomFocusInput();
    }

    //------------------------------------------------------------------------

    // ConSense
    // *VALUES*
    showConsole(show)
    {
        // Toggle
        if (show === conSense.toggle)
        {
            if (this.visible)
            {
                this.showConsole(this.hide);
            }
            else
            {
                this.showConsole(this.show);
            }
        }
        // Show
        else if (show)
        {
            this.visible = show;
            this.conSenseHeaderSwitch.innerHTML
                = this.interfaceText.hideConsoleButton;
            this.conSenseContainer.style.height = this.containerHeight;
            this.conSenseInnerContainer.style.display = "block";
            this.conSenseInnerContainer.scrollTop = this.containerScrollTop;
        }
        // Hide
        else
        {
            this.visible = show;
            this.conSenseHeaderSwitch.innerHTML
                = this.interfaceText.showConsoleButton;
            this.conSenseInnerContainer.style.display = "none";
            // According to header background pixmap dimensions
            // *VALUES*
            this.conSenseContainer.style.height = "21px";
        }
    }
    
    //------------------------------------------------------------------------

    // ConSense
    scrollToBottomFocusInput()
    {
        // For the case of appended commands or any other kind of input line
        // manipulation
        this.updateCounter();

        // *WORKAROUND*
        // Double scroll before and after focus to avoid IE flickering
        this.conSenseInnerContainer.scrollTop = this.scrollInfinite;
        if (this.visible && this.globalVisible)
        {
            this.conSenseIn.focus();
            this.conSenseInnerContainer.scrollTop = this.scrollInfinite;
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    globalShowConsole(show)
    {
        // Toggle
        if (show === conSense.toggle)
        {
            if (this.globalVisible)
            {
                this.globalShowConsole(this.hide);
            }
            else
            {
                this.globalShowConsole(this.show);
            }
        }
        // Show
        else if (show)
        {
            this.globalVisible = show;
            this.conSenseContainer.style.display = "block";
            this.conSenseInnerContainer.scrollTop = this.containerScrollTop;
        }
        // Hide
        else
        {
            this.globalVisible = show;
            this.containerScrollTop = this.conSenseInnerContainer.scrollTop;
            this.conSenseContainer.style.display = "none";
        }
    }

    //------------------------------------------------------------------------
    // Utility methods
    //------------------------------------------------------------------------

    // Replacement of newlines and the like is not necessary in code listing
    // functions.

    //------------------------------------------------------------------------
    
    // ConSense
    listObject(obj)
    {
        obj = simpleUtils.toObject(obj);

        // List object
        for (let i in obj)
        {
            // Fix for exceptions caused by protected(?) items which would
            // stop listing (eg. in the document object)
            try
            {
                // noinspection JSUnfilteredForInLoop
                this.writeLn(this.highlight(i) + " - "
                    + simpleUtils.HTML2Source(obj[i]));
            }
            catch(ex)
            {
            }
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    listObjectStyle(obj)
    {
        obj = simpleUtils.toObject(obj);
        this.listObject(obj.style);
    }

    //------------------------------------------------------------------------
    
    // ConSense
    outlineDOMElement(obj)
    {
        obj = simpleUtils.toObject(obj);
        obj.style.border = "1px solid " + this.outlineColor;
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // tagName: eg. "div"
    outlineDOMElementsByTag(tagName)
    {
        let elements = document.getElementsByTagName(tagName);

        // Does not work as (let i in elements) in IE
        for (let i=0; i < elements.length; i++)
        {
            elements[i].style.border = "1px solid " + this.outlineColor;
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    outlineDOMSubtree(obj, level)
    {
        obj = simpleUtils.toObject(obj);
        if (level === undefined)
        {
            level = 0;
        }

        // Outline root node
        if (level === 0)
        {
            obj.style.border = "1px solid " + this.outlineColor;
        }

        // Outline children
        for (let i=0; i < obj.childNodes.length; i++)
        {
            let childNode = obj.childNodes[i];

            // Element nodes
            if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE)
            {
                childNode.style.border = "1px solid " + this.outlineColor;
            }

            // Dive further
            this.outlineDOMSubtree(childNode, level+1);
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // Private
    tabulator(times)
    {
        return "<span style='margin-left: "
            + times * this.tabPixelSize + "px'></span>";
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // Private
    // *GLOBAL*
    mapAppendObjectLink(childNode, level, i)
    {
        let index = "l" + level + "n" + i + "_" + this.mapTempObjectCounter++;
        this.mapTempObjects[index] = childNode;
        // noinspection JSUnusedGlobalSymbols
        this.mapResultBuffer
            += this.tabulator(level)
                + this.highlightLabelledAppendLink(
                    "(o)",
                    "conSense.mapTempObjects[\"" + index + "\"]")
                + (" ");
    }
    
    //------------------------------------------------------------------------
    
    // ConSense
    // *NAMING*, *GLOBAL*
    mapDOMSubtree(obj, level)
    {
        obj = simpleUtils.toObject(obj);
        if (level === undefined)
        {
            level = 0;
            // *GLOBAL*
            // noinspection JSUnusedGlobalSymbols
            this.mapResultBuffer = "";
            this.mapTempObjects = [];
            this.mapTempObjectCounter = 0;
        }

        for (let i=0; i < obj.childNodes.length; i++)
        {
            let childNode = obj.childNodes[i];
            // *GLOBAL*
            this.mapTempObjectCounter++;

            //----------------------------------------------------------------

            // Element node
            if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE)
            {
                let id = "";
                let className = "";

                // Temp object link
                this.mapAppendObjectLink(childNode, level, i);
                
                // id and class
                if (childNode.id)
                {
                    id = " id: " + this.highlightAppendLink(childNode.id);
                }

                if (childNode.className)
                {
                    className = " class: " + childNode.className;
                }

                // First line to display: tagname, id, class
                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer
                    += this.highlight(childNode.nodeName)
                        + id
                        + className
                        + "<br />";

                // Skip mapping conSenseContainer if indicated
                // *NAMING*
                if (childNode.id === "conSenseContainer"
                    && !this.mapShowConSense)
                {
                    // noinspection JSUnusedGlobalSymbols
                    this.mapResultBuffer
                        += this.tabulator(level)
                            + "(...)<br />";
                    continue;
                }

                // Display attributes if present - except id and class
                if (childNode.attributes)
                {
                    for (let j=0; j < childNode.attributes.length; j++)
                    {
                        if (childNode.attributes[j].specified)
                        {
                            if (childNode.attributes[j].nodeName !== "id"
                                && childNode.attributes[j].nodeName !== "class")
                            {
                                // noinspection JSUnusedGlobalSymbols
                                this.mapResultBuffer
                                    += this.tabulator(level)
                                        + childNode.attributes[j].nodeName
                                        + ": "
                                        + simpleUtils.HTML2Source(childNode.attributes[j].nodeValue)
                                        + "<br />";
                            }
                        }
                    }
                }
            }

            //----------------------------------------------------------------
            
            // Text node
            if (childNode.nodeType === simpleUtils.DOM_TEXT_NODE)
            {
                let excerpt = "";

                // Hide empty text nodes if indicated
                if (!this.mapShowEmptyTexts)
                {
                    let hide = true;
                    for (let j=0; j < childNode.nodeValue.length; j++)
                    {
                        if (childNode.nodeValue.charAt(j) !== "\n"
                            && childNode.nodeValue.charAt(j) !== "\t"
                            && childNode.nodeValue.charAt(j) !== " ")
                        {
                            hide = false;
                            break;
                        }
                    }
                    if (hide) continue;
        		}

                // Temp object link
                this.mapAppendObjectLink(childNode, level, i);
                
                // Show text
                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer += this.highlight("text");
                
                if (childNode.nodeValue.length > this.mapExcerptSize)
                {
                    excerpt
                        = childNode.nodeValue.substring(0, this.mapExcerptSize)
                            + " (...)";
                }
                else
                {
                    excerpt = childNode.nodeValue;
                }

                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer += " \"" + excerpt + "\"<br />";
            }

            //----------------------------------------------------------------

            // Comment node
            if (childNode.nodeType === simpleUtils.DOM_COMMENT_NODE)
            {
                let excerpt = "";

                // Temp object link
                this.mapAppendObjectLink(childNode, level, i);

                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer += this.highlight("comment");
                
                if (childNode.nodeValue.length > this.mapExcerptSize)
                {
                    excerpt
                        = childNode.nodeValue.substring(0, this.mapExcerptSize)
                            + " (...)";
                }
                else
                {
                    excerpt = childNode.nodeValue;
                }

                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer += " \"" + excerpt + "\"<br />";
            }

            //----------------------------------------------------------------

            // Document type node
            if (childNode.nodeType === simpleUtils.DOM_DOCUMENT_TYPE_NODE)
            {
                // Temp object link
                this.mapAppendObjectLink(childNode, level, i);

                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer
                    += this.highlight("DOCTYPE")
                        + " "
                        + childNode.nodeName
                        + " PUBLIC \""
                        + childNode.publicId
                        + "\"<br />";
            }

            //----------------------------------------------------------------

            // Dive deeper
            this.mapDOMSubtree(childNode, level+1);
        }

        if (level === 0)
        {
            this.write(this.mapResultBuffer);
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // Lists all inline and dynamic style definitions of an object.
    // *GLOBAL*
    mapDynamicCSS(obj, level)
    {
        obj = simpleUtils.toObject(obj);
        let id = "";
        let className = "";
        let cssTextRows;

        // First iteration only
        if (level === undefined)
        {
            level = 0;
        }

        let deepestLevel;
        
        // Iterate until root
        if (obj !== document.body
            && obj.parentNode)
        {
            this.mapDynamicCSS(obj.parentNode, level+1);
        }
        else
        {
            // Global variable
            deepestLevel = level;
        }

        // Text nodes have no style properties
        if (obj.nodeName.toUpperCase() === "#TEXT")
        {
            this.writeLn(this.tabulator(deepestLevel - level)
                + this.highlight(obj.nodeName));
            return;
        }

        //--------------------------------------------------------------------

        // Write nodeName, id, class and dynamic style info from root down to
        // the parameter element

        this.write(this.tabulator(deepestLevel - level)
            + this.highlight(obj.nodeName));

        if (obj.id)
        {
            id = " id: " + this.highlightAppendLink(obj.id);
        }

        if (obj.className)
        {
            className = " class: " + obj.className;
        }

        this.writeLn(id + className);

        //--------------------------------------------------------------------

        // Dynamic style settings
        if (obj.style.cssText)
        {
            cssTextRows = obj.style.cssText.split(";");
            for (let i=0; i < cssTextRows.length; i++)
            {
                if (cssTextRows[i].length)
                {
                    this.writeLn(this.tabulator(deepestLevel - level)
                        + cssTextRows[i] + ";");
                }
            }
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // Lists full static CSS info of the page
    listCSS()
    {
        // Looking up CSS definitions in document

        let headNode = false;

        // Locate document/HTML/HEAD
        for (let i=0; i < document.childNodes.length; i++)
        {
            let childNode = document.childNodes[i];

            if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE
                && childNode.nodeName.toUpperCase() === "HTML")
            {
                // HTML found
                let foundNode = childNode;

                for (let j=0; j < foundNode.childNodes.length; j++)
                {
                    childNode = foundNode.childNodes[j];

                    if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE
                        && childNode.nodeName.toUpperCase() === "HEAD")
                    {
                        // HEAD found, headNode set
                        headNode = childNode;
                    }
                }
            }
        }

        // Browse head for css link and style entries
        if (headNode)
        {
            for (let i=0; i < headNode.childNodes.length; i++)
            {
                let childNode = headNode.childNodes[i];

                if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE)
                {
                    if (childNode.nodeName.toUpperCase() === "STYLE")
                    {
                        this.listCSS_HandleStyleNode(childNode);
                    }

                    if (childNode.nodeName.toUpperCase() === "LINK")
                    {
                        this.listCSS_HandleLinkNode(childNode);
                    }
                }
            }
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    // Returns array of formatted CSS rule block lines.
    // Private
    listCSS_getFormattedRule(ruleString)
    {
        let lines = [];

        // For STYLE blocks
        if (simpleUtils.trimString(ruleString).search("\n") > 0)
        {
            lines = simpleUtils.trimString(ruleString).split(/\n/);
        }
        // For LINK blocks
        else
        {
            lines = simpleUtils.trimString(ruleString).split(/;/);
        }

        for (let i=0; i < lines.length; i++)
        {
            let tab = "";

            if (lines[i].search(/{/) > 0)
            {
            }
            else if (simpleUtils.trimString(lines[i]) === "}")
            {
            }
            else
            {
                tab = this.tabulator(1);
            }
            
            lines[i] = tab + lines[i];
        }

        return lines;
    }

    //------------------------------------------------------------------------

    // ConSense
    // Private
    listCSS_HandleStyleNode(node)
    {
        let lines;

        // Firefox
        if (node.textContent)
        {
            lines = this.listCSS_getFormattedRule(node.textContent);
        }
        // IE
        else if (node.innerHTML)
        {
            lines = this.listCSS_getFormattedRule(node.innerHTML);
        }
        else
        {
            return;
        }
            
        this.writeLn("/* STYLE node */");

        for (let i=0; i < lines.length; i++)
        {
            this.writeLn(lines[i]);
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    // Private
    listCSS_HandleLinkNode(node)
    {
        if (node.rel.toUpperCase() === "STYLESHEET"
            || node.type.toUpperCase() === "TEXT/CSS")
        {
            this.writeLn("/* LINK node: " + node.href + " */");

            //----------------------------------------------------------------
            // Firefox
            if (node.sheet)
            {
                for (let i=0; i < node.sheet.cssRules.length; i++)
                {
                    let lines = this.listCSS_getFormattedRule(
                                    node.sheet.cssRules[i].cssText);

                    for (let j=0; j < lines.length; j++)
                    {
                        if (lines[j].search("{") > 0)
                        {
                            let sublines = lines[j].split(/{/);

                            // Bad entry, simply dump to the screen
                            if (sublines.length !== 2)
                            {
                                this.writeLn(lines[j] + ";");
                            }

                            // Good entry
                            this.writeLn(sublines[0] + " {");
                            this.writeLn(this.tabulator(1)
                                + simpleUtils.trimString(sublines[1]) + ";");
                        }
                        else
                        {
                            if (simpleUtils.trimString(lines[j]) === "}")
                            {
                                this.writeLn(lines[j]);
                            }
                            else
                            {
                                this.writeLn(lines[j] + ";");
                            }
                        }
                    }
                }
            }
            //----------------------------------------------------------------
            // IE
            else if (node.styleSheet)
            {
                // Deprecated symbol intentionally used for IE
                // noinspection JSDeprecatedSymbols
                let lines = this.listCSS_getFormattedRule(
                                node.styleSheet.cssText);

                for (let i=0; i < lines.length; i++)
                {
                    if (lines[i].search("{") > 0)
                    {
                        let sublines = lines[i].split(/{/);

                        this.writeLn(sublines[0] + " {");
                    }
                    else
                    {
                        if (simpleUtils.trimString(lines[i]) === "}")
                        {
                            this.writeLn(lines[i]);
                        }
                        else
                        {
                            let sublines =
                                simpleUtils.trimString(lines[i]).split(/;/);

                            for (let j=0; j < sublines.length; j++)
                            {
                                let tab = "";

                                if (j > 0)
                                {
                                    tab = this.tabulator(1);
                                }

                                this.writeLn(tab + sublines[j] + ";");
                            }
                        }
                    }
                }
            }
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    license()
    {
        this.writeLn("The ConSense MIT-like license:<br />");
        this.writeLn("---license---");
        this.writeLn("Copyright (c) 2005-2008 Bal&aacute;zs T&oacute;th (contact dot consense at gmail dot com)<br />");
        this.writeLn("Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br />");
        this.writeLn("The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br />");
        this.writeLn("THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.");
        this.writeLn("---end of license---<br />");
        this.writeLn("For the third-party library licenses please see the documentation.");
    }

    //------------------------------------------------------------------------

    // ConSense
    help()
    {
        this.writeLn("Command shorthands:");
        this.writeManualEntry("", "All obj parameters may be JavaScript/DOM object references or DOM id strings (eg. conSenseIn or \"conSenseIn\").");
        this.writeManualEntry("clear()", "clears screen");
        this.writeManualEntry("debug(value0, value1)", "shorthand for conSense.debugLn(value0, value1), writes a minimal, timestamped debug message. " + this.highlightAppendLink("conSense.debug") + " toggles output.");
        this.writeManualEntry("help()", "");
        this.writeManualEntry("list(obj)", " or " + this.highlightAppendLink("inspect(obj)") + " shorthand for conSense.listObject(obj), lists object members");
        this.writeManualEntry("listCSS()", "shorthand for conSense.listCSS(), lists full static CSS info of the page");
        this.writeManualEntry("listStyle(obj)", "shorthand for conSense.listObjectStyle(obj), lists the style member of an object");
        this.writeManualEntry("load(uri, callback)", "shorthand for redSandGenericLoader.load(uri, callback), loads external content identified by uri. If no callback is defined, redSandGenericLoader.JavaScriptEvaluatorCallback() is invoked. Asynchronous operation, execution takes place on finished loading. Use \"browsable\" file extensions, eg. .txt for your external files.");
        this.writeManualEntry("map(obj)", "shorthand for conSense.mapDOMSubtree(obj), maps the subtree of a DOM element. Set " + conSense.highlightAppendLink("conSense.mapShowEmptyTexts") + " to display empty text nodes. Set " + conSense.highlightAppendLink("conSense.mapShowConSense") + " to expand conSenseContainer in higher level perspectives. Click (o) for a temporary representation of an object valid until next mapping. map() defaults to document if no parameter is passed.");
        this.writeManualEntry("mapCSS(obj)", "shorthand for conSense.mapDynamicCSS(obj), lists the element's and its predecessors' inline and dynamic style info up to the root");
        this.writeManualEntry("outline(obj)", "shorthand for conSense.outlineDOMElement(obj), draws with " + this.highlightAppendLink("conSense.outlineColor"));
        this.writeManualEntry("outlineAll(tagName)", "shorthand for conSense.outlineDOMElementsByTag(tagName), draws with " + this.highlightAppendLink("conSense.outlineColor") + ", tagName stands for an HTML tag");
        this.writeManualEntry("outlineSub(obj)", "shorthand for conSense.outlineDOMSubtree(obj), outlines a subtree of the DOM rooting out of the parameter element. Draws with " + this.highlightAppendLink("conSense.outlineColor") + ".");
        this.writeManualEntry("write(value)", "");
        this.writeLn("To enumerate ConSense functions call " + this.highlightAppendLink("list(conSense)") + ".");
        this.writeLn("To enumerate SimpleDebug functions call " + this.highlightAppendLink("list(simpleDebug)") + ".");
        this.writeLn("To enumerate SimpleUtilities functions call " + this.highlightAppendLink("list(simpleUtils)") + ".");
        this.writeLn("To enumerate SimpleCryptography functions call " + this.highlightAppendLink("list(simpleCrypto)") + ".");
        this.writeLn("Otherwise all JavaScript expressions are accepted.");
        this.writeLn(this.highlight("This") + " style is used for simple highlighting and " + this.highlightAppendLink("this") + " is a clickable autoappend input string.");
        this.writeLn("Doubleclicking the output area focuses the input line. Up/down arrow keys control command history.");
        this.writeLn("Works best with Firefox 1.5+ and IE 6.0+.");
        this.writeLn("ConSense is (c) 2005-2007 Bal&aacute;zs T&oacute;th. See " + this.highlightAppendLink("license()") + " for details.");
    }

}

//----------------------------------------------------------------------------
// Initialization
//----------------------------------------------------------------------------

// Instantiate ConSense
const conSense = new ConSense();

//----------------------------------------------------------------------------
// Commands
//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function clear()
{
    conSense.clearScreen();
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function debug(value0, value1)
{
    conSense.debugLn(value0, value1);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function help()
{
    conSense.help();
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
function license()
{
    conSense.license();
}

//----------------------------------------------------------------------------

// Both commands for the same function

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function list(obj)
{
    conSense.listObject(obj);
}

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function inspect(obj)
{
    conSense.listObject(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function listCSS()
{
    conSense.listCSS();
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function listStyle(obj)
{
    conSense.listObjectStyle(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// *DEPENDENCY*
// GLOBAL
// redSandGenericLoader
function load(uri, callback)
{
    redSandGenericLoader.load(uri, callback);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function map(obj)
{
    if (obj === undefined)
    {
        obj = document;
    }
    conSense.mapDOMSubtree(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function mapCSS(obj)
{
    conSense.mapDynamicCSS(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function outline(obj)
{
    conSense.outlineDOMElement(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function outlineAll(tagName)
{
    conSense.outlineDOMElementsByTag(tagName);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function outlineSub(obj)
{
    conSense.outlineDOMSubtree(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
function write(value)
{
    conSense.writeLn(value);
}
