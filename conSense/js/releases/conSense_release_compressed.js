var Drag={obj:null,init:function(o,_1,_2,_3,_4,_5,_6,_7,_8,_9){
o.onmousedown=Drag.start;
o.hmode=_6?false:true;
o.vmode=_7?false:true;
o.root=_1&&_1!=null?_1:o;
if(o.hmode&&isNaN(parseInt(o.root.style.left))){
o.root.style.left="0px";
}
if(o.vmode&&isNaN(parseInt(o.root.style.top))){
o.root.style.top="0px";
}
if(!o.hmode&&isNaN(parseInt(o.root.style.right))){
o.root.style.right="0px";
}
if(!o.vmode&&isNaN(parseInt(o.root.style.bottom))){
o.root.style.bottom="0px";
}
o.minX=typeof _2!="undefined"?_2:null;
o.minY=typeof _4!="undefined"?_4:null;
o.maxX=typeof _3!="undefined"?_3:null;
o.maxY=typeof _5!="undefined"?_5:null;
o.xMapper=_8?_8:null;
o.yMapper=_9?_9:null;
o.root.onDragStart=new Function();
o.root.onDragEnd=new Function();
o.root.onDrag=new Function();
},start:function(e){
var o=Drag.obj=this;
e=Drag.fixE(e);
var y=parseInt(o.vmode?o.root.style.top:o.root.style.bottom);
var x=parseInt(o.hmode?o.root.style.left:o.root.style.right);
o.root.onDragStart(x,y);
o.lastMouseX=e.clientX;
o.lastMouseY=e.clientY;
if(o.hmode){
if(o.minX!=null){
o.minMouseX=e.clientX-x+o.minX;
}
if(o.maxX!=null){
o.maxMouseX=o.minMouseX+o.maxX-o.minX;
}
}else{
if(o.minX!=null){
o.maxMouseX=-o.minX+e.clientX+x;
}
if(o.maxX!=null){
o.minMouseX=-o.maxX+e.clientX+x;
}
}
if(o.vmode){
if(o.minY!=null){
o.minMouseY=e.clientY-y+o.minY;
}
if(o.maxY!=null){
o.maxMouseY=o.minMouseY+o.maxY-o.minY;
}
}else{
if(o.minY!=null){
o.maxMouseY=-o.minY+e.clientY+y;
}
if(o.maxY!=null){
o.minMouseY=-o.maxY+e.clientY+y;
}
}
document.onmousemove=Drag.drag;
document.onmouseup=Drag.end;
return false;
},drag:function(e){
e=Drag.fixE(e);
var o=Drag.obj;
var ey=e.clientY;
var ex=e.clientX;
var y=parseInt(o.vmode?o.root.style.top:o.root.style.bottom);
var x=parseInt(o.hmode?o.root.style.left:o.root.style.right);
var nx,ny;
if(o.minX!=null){
ex=o.hmode?Math.max(ex,o.minMouseX):Math.min(ex,o.maxMouseX);
}
if(o.maxX!=null){
ex=o.hmode?Math.min(ex,o.maxMouseX):Math.max(ex,o.minMouseX);
}
if(o.minY!=null){
ey=o.vmode?Math.max(ey,o.minMouseY):Math.min(ey,o.maxMouseY);
}
if(o.maxY!=null){
ey=o.vmode?Math.min(ey,o.maxMouseY):Math.max(ey,o.minMouseY);
}
nx=x+((ex-o.lastMouseX)*(o.hmode?1:-1));
ny=y+((ey-o.lastMouseY)*(o.vmode?1:-1));
if(o.xMapper){
nx=o.xMapper(y);
}else{
if(o.yMapper){
ny=o.yMapper(x);
}
}
Drag.obj.root.style[o.hmode?"left":"right"]=nx+"px";
Drag.obj.root.style[o.vmode?"top":"bottom"]=ny+"px";
Drag.obj.lastMouseX=ex;
Drag.obj.lastMouseY=ey;
Drag.obj.root.onDrag(nx,ny);
return false;
},end:function(){
document.onmousemove=null;
document.onmouseup=null;
Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode?"left":"right"]),parseInt(Drag.obj.root.style[Drag.obj.vmode?"top":"bottom"]));
Drag.obj=null;
},fixE:function(e){
if(typeof e=="undefined"){
e=window.event;
}
if(typeof e.layerX=="undefined"){
e.layerX=e.offsetX;
}
if(typeof e.layerY=="undefined"){
e.layerY=e.offsetY;
}
return e;
}};
var hexcase=0;
var b64pad="";
var chrsz=8;
function hex_md5(s){
return binl2hex(core_md5(str2binl(s),s.length*chrsz));
};
function b64_md5(s){
return binl2b64(core_md5(str2binl(s),s.length*chrsz));
};
function str_md5(s){
return binl2str(core_md5(str2binl(s),s.length*chrsz));
};
function hex_hmac_md5(_a,_b){
return binl2hex(core_hmac_md5(_a,_b));
};
function b64_hmac_md5(_c,_d){
return binl2b64(core_hmac_md5(_c,_d));
};
function str_hmac_md5(_e,_f){
return binl2str(core_hmac_md5(_e,_f));
};
function md5_vm_test(){
return hex_md5("abc")=="900150983cd24fb0d6963f7d28e17f72";
};
function core_md5(x,len){
x[len>>5]|=128<<((len)%32);
x[(((len+64)>>>9)<<4)+14]=len;
var a=1732584193;
var b=-271733879;
var c=-1732584194;
var d=271733878;
for(var i=0;i<x.length;i+=16){
var _10=a;
var _11=b;
var _12=c;
var _13=d;
a=md5_ff(a,b,c,d,x[i+0],7,-680876936);
d=md5_ff(d,a,b,c,x[i+1],12,-389564586);
c=md5_ff(c,d,a,b,x[i+2],17,606105819);
b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);
a=md5_ff(a,b,c,d,x[i+4],7,-176418897);
d=md5_ff(d,a,b,c,x[i+5],12,1200080426);
c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);
b=md5_ff(b,c,d,a,x[i+7],22,-45705983);
a=md5_ff(a,b,c,d,x[i+8],7,1770035416);
d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);
c=md5_ff(c,d,a,b,x[i+10],17,-42063);
b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);
a=md5_ff(a,b,c,d,x[i+12],7,1804603682);
d=md5_ff(d,a,b,c,x[i+13],12,-40341101);
c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);
b=md5_ff(b,c,d,a,x[i+15],22,1236535329);
a=md5_gg(a,b,c,d,x[i+1],5,-165796510);
d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);
c=md5_gg(c,d,a,b,x[i+11],14,643717713);
b=md5_gg(b,c,d,a,x[i+0],20,-373897302);
a=md5_gg(a,b,c,d,x[i+5],5,-701558691);
d=md5_gg(d,a,b,c,x[i+10],9,38016083);
c=md5_gg(c,d,a,b,x[i+15],14,-660478335);
b=md5_gg(b,c,d,a,x[i+4],20,-405537848);
a=md5_gg(a,b,c,d,x[i+9],5,568446438);
d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);
c=md5_gg(c,d,a,b,x[i+3],14,-187363961);
b=md5_gg(b,c,d,a,x[i+8],20,1163531501);
a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);
d=md5_gg(d,a,b,c,x[i+2],9,-51403784);
c=md5_gg(c,d,a,b,x[i+7],14,1735328473);
b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);
a=md5_hh(a,b,c,d,x[i+5],4,-378558);
d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);
c=md5_hh(c,d,a,b,x[i+11],16,1839030562);
b=md5_hh(b,c,d,a,x[i+14],23,-35309556);
a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);
d=md5_hh(d,a,b,c,x[i+4],11,1272893353);
c=md5_hh(c,d,a,b,x[i+7],16,-155497632);
b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);
a=md5_hh(a,b,c,d,x[i+13],4,681279174);
d=md5_hh(d,a,b,c,x[i+0],11,-358537222);
c=md5_hh(c,d,a,b,x[i+3],16,-722521979);
b=md5_hh(b,c,d,a,x[i+6],23,76029189);
a=md5_hh(a,b,c,d,x[i+9],4,-640364487);
d=md5_hh(d,a,b,c,x[i+12],11,-421815835);
c=md5_hh(c,d,a,b,x[i+15],16,530742520);
b=md5_hh(b,c,d,a,x[i+2],23,-995338651);
a=md5_ii(a,b,c,d,x[i+0],6,-198630844);
d=md5_ii(d,a,b,c,x[i+7],10,1126891415);
c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);
b=md5_ii(b,c,d,a,x[i+5],21,-57434055);
a=md5_ii(a,b,c,d,x[i+12],6,1700485571);
d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);
c=md5_ii(c,d,a,b,x[i+10],15,-1051523);
b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);
a=md5_ii(a,b,c,d,x[i+8],6,1873313359);
d=md5_ii(d,a,b,c,x[i+15],10,-30611744);
c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);
b=md5_ii(b,c,d,a,x[i+13],21,1309151649);
a=md5_ii(a,b,c,d,x[i+4],6,-145523070);
d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);
c=md5_ii(c,d,a,b,x[i+2],15,718787259);
b=md5_ii(b,c,d,a,x[i+9],21,-343485551);
a=safe_add(a,_10);
b=safe_add(b,_11);
c=safe_add(c,_12);
d=safe_add(d,_13);
}
return Array(a,b,c,d);
};
function md5_cmn(q,a,b,x,s,t){
return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);
};
function md5_ff(a,b,c,d,x,s,t){
return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);
};
function md5_gg(a,b,c,d,x,s,t){
return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);
};
function md5_hh(a,b,c,d,x,s,t){
return md5_cmn(b^c^d,a,b,x,s,t);
};
function md5_ii(a,b,c,d,x,s,t){
return md5_cmn(c^(b|(~d)),a,b,x,s,t);
};
function core_hmac_md5(key,_14){
var _15=str2binl(key);
if(_15.length>16){
_15=core_md5(_15,key.length*chrsz);
}
var _16=Array(16),_17=Array(16);
for(var i=0;i<16;i++){
_16[i]=_15[i]^909522486;
_17[i]=_15[i]^1549556828;
}
var _18=core_md5(_16.concat(str2binl(_14)),512+_14.length*chrsz);
return core_md5(_17.concat(_18),512+128);
};
function safe_add(x,y){
var lsw=(x&65535)+(y&65535);
var msw=(x>>16)+(y>>16)+(lsw>>16);
return (msw<<16)|(lsw&65535);
};
function bit_rol(num,cnt){
return (num<<cnt)|(num>>>(32-cnt));
};
function str2binl(str){
var bin=Array();
var _19=(1<<chrsz)-1;
for(var i=0;i<str.length*chrsz;i+=chrsz){
bin[i>>5]|=(str.charCodeAt(i/chrsz)&_19)<<(i%32);
}
return bin;
};
function binl2str(bin){
var str="";
var _1a=(1<<chrsz)-1;
for(var i=0;i<bin.length*32;i+=chrsz){
str+=String.fromCharCode((bin[i>>5]>>>(i%32))&_1a);
}
return str;
};
function binl2hex(_1b){
var _1c=hexcase?"0123456789ABCDEF":"0123456789abcdef";
var str="";
for(var i=0;i<_1b.length*4;i++){
str+=_1c.charAt((_1b[i>>2]>>((i%4)*8+4))&15)+_1c.charAt((_1b[i>>2]>>((i%4)*8))&15);
}
return str;
};
function binl2b64(_1d){
var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var str="";
for(var i=0;i<_1d.length*4;i+=3){
var _1e=(((_1d[i>>2]>>8*(i%4))&255)<<16)|(((_1d[i+1>>2]>>8*((i+1)%4))&255)<<8)|((_1d[i+2>>2]>>8*((i+2)%4))&255);
for(var j=0;j<4;j++){
if(i*8+j*6>_1d.length*32){
str+=b64pad;
}else{
str+=tab.charAt((_1e>>6*(3-j))&63);
}
}
}
return str;
};
var hexcase=0;
var b64pad="";
var chrsz=8;
function hex_sha1(s){
return binb2hex(core_sha1(str2binb(s),s.length*chrsz));
};
function b64_sha1(s){
return binb2b64(core_sha1(str2binb(s),s.length*chrsz));
};
function str_sha1(s){
return binb2str(core_sha1(str2binb(s),s.length*chrsz));
};
function hex_hmac_sha1(key,_1f){
return binb2hex(core_hmac_sha1(key,_1f));
};
function b64_hmac_sha1(key,_20){
return binb2b64(core_hmac_sha1(key,_20));
};
function str_hmac_sha1(key,_21){
return binb2str(core_hmac_sha1(key,_21));
};
function sha1_vm_test(){
return hex_sha1("abc")=="a9993e364706816aba3e25717850c26c9cd0d89d";
};
function core_sha1(x,len){
x[len>>5]|=128<<(24-len%32);
x[((len+64>>9)<<4)+15]=len;
var w=Array(80);
var a=1732584193;
var b=-271733879;
var c=-1732584194;
var d=271733878;
var e=-1009589776;
for(var i=0;i<x.length;i+=16){
var _22=a;
var _23=b;
var _24=c;
var _25=d;
var _26=e;
for(var j=0;j<80;j++){
if(j<16){
w[j]=x[i+j];
}else{
w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);
}
var t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));
e=d;
d=c;
c=rol(b,30);
b=a;
a=t;
}
a=safe_add(a,_22);
b=safe_add(b,_23);
c=safe_add(c,_24);
d=safe_add(d,_25);
e=safe_add(e,_26);
}
return Array(a,b,c,d,e);
};
function sha1_ft(t,b,c,d){
if(t<20){
return (b&c)|((~b)&d);
}
if(t<40){
return b^c^d;
}
if(t<60){
return (b&c)|(b&d)|(c&d);
}
return b^c^d;
};
function sha1_kt(t){
return (t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;
};
function core_hmac_sha1(key,_27){
var _28=str2binb(key);
if(_28.length>16){
_28=core_sha1(_28,key.length*chrsz);
}
var _29=Array(16),_2a=Array(16);
for(var i=0;i<16;i++){
_29[i]=_28[i]^909522486;
_2a[i]=_28[i]^1549556828;
}
var _2b=core_sha1(_29.concat(str2binb(_27)),512+_27.length*chrsz);
return core_sha1(_2a.concat(_2b),512+160);
};
function safe_add(x,y){
var lsw=(x&65535)+(y&65535);
var msw=(x>>16)+(y>>16)+(lsw>>16);
return (msw<<16)|(lsw&65535);
};
function rol(num,cnt){
return (num<<cnt)|(num>>>(32-cnt));
};
function str2binb(str){
var bin=Array();
var _2c=(1<<chrsz)-1;
for(var i=0;i<str.length*chrsz;i+=chrsz){
bin[i>>5]|=(str.charCodeAt(i/chrsz)&_2c)<<(32-chrsz-i%32);
}
return bin;
};
function binb2str(bin){
var str="";
var _2d=(1<<chrsz)-1;
for(var i=0;i<bin.length*32;i+=chrsz){
str+=String.fromCharCode((bin[i>>5]>>>(32-chrsz-i%32))&_2d);
}
return str;
};
function binb2hex(_2e){
var _2f=hexcase?"0123456789ABCDEF":"0123456789abcdef";
var str="";
for(var i=0;i<_2e.length*4;i++){
str+=_2f.charAt((_2e[i>>2]>>((3-i%4)*8+4))&15)+_2f.charAt((_2e[i>>2]>>((3-i%4)*8))&15);
}
return str;
};
function binb2b64(_30){
var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var str="";
for(var i=0;i<_30.length*4;i+=3){
var _31=(((_30[i>>2]>>8*(3-i%4))&255)<<16)|(((_30[i+1>>2]>>8*(3-(i+1)%4))&255)<<8)|((_30[i+2>>2]>>8*(3-(i+2)%4))&255);
for(var j=0;j<4;j++){
if(i*8+j*6>_30.length*32){
str+=b64pad;
}else{
str+=tab.charAt((_31>>6*(3-j))&63);
}
}
}
return str;
};
Date.MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
Date.DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
Date.SUFFIXES=["st","nd","rd","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st"];
Date.prototype.format=function(_32){
var _33=(_32!=null)?_32:"DD-MMM-YY";
var _34="DMYHdhmst".split("");
var _35=new Array();
var _36=0;
var _37;
var _38=/\[(\d+)\]/;
var day=this.getDay();
var _39=this.getDate();
var _3a=this.getMonth();
var _3b=this.getFullYear().toString();
var _3c=this.getHours();
var _3d=this.getMinutes();
var _3e=this.getSeconds();
var _3f=new Object();
_3f["D"]=_39;
_3f["d"]=_39+Date.SUFFIXES[_39-1];
_3f["DD"]=(_39<10)?"0"+_39:_39;
_3f["DDD"]=Date.DAYS[day].substring(0,3);
_3f["DDDD"]=Date.DAYS[day];
_3f["M"]=_3a+1;
_3f["MM"]=(_3a+1<10)?"0"+(_3a+1):_3a+1;
_3f["MMM"]=Date.MONTHS[_3a].substring(0,3);
_3f["MMMM"]=Date.MONTHS[_3a];
_3f["Y"]=(_3b.charAt(2)=="0")?_3b.charAt(3):_3b.substring(2,4);
_3f["YY"]=_3b.substring(2,4);
_3f["YYYY"]=_3b;
_3f["H"]=_3c;
_3f["HH"]=(_3c<10)?"0"+_3c:_3c;
_3f["h"]=(_3c>12||_3c==0)?Math.abs(_3c-12):_3c;
_3f["hh"]=(_3f["h"]<10)?"0"+_3f["h"]:_3f["h"];
_3f["m"]=_3d;
_3f["mm"]=(_3d<10)?"0"+_3d:_3d;
_3f["s"]=_3e;
_3f["ss"]=(_3e<10)?"0"+_3e:_3e;
_3f["t"]=(_3c<12)?"A":"P";
_3f["tt"]=(_3c<12)?"AM":"PM";
for(var i=0;i<_34.length;i++){
_37=new RegExp("("+_34[i]+"+)");
while(_37.test(_33)){
_35[_36]=RegExp.$1;
_33=_33.replace(RegExp.$1,"["+_36+"]");
_36++;
}
}
while(_38.test(_33)){
_33=_33.replace(_38,_3f[_35[RegExp.$1]]);
}
return _33;
};
var stIsIE=false;
sorttable={init:function(){
if(arguments.callee.done){
return;
}
arguments.callee.done=true;
if(_timer){
clearInterval(_timer);
}
if(!document.createElement||!document.getElementsByTagName){
return;
}
sorttable.DATE_RE=/^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
forEach(document.getElementsByTagName("table"),function(_40){
if(_40.className.search(/\bsortable\b/)!=-1){
sorttable.makeSortable(_40);
}
});
},makeSortable:function(_41){
if(_41.getElementsByTagName("thead").length==0){
the=document.createElement("thead");
the.appendChild(_41.rows[0]);
_41.insertBefore(the,_41.firstChild);
}
if(_41.tHead==null){
_41.tHead=_41.getElementsByTagName("thead")[0];
}
if(_41.tHead.rows.length!=1){
return;
}
sortbottomrows=[];
for(var i=0;i<_41.rows.length;i++){
if(_41.rows[i].className.search(/\bsortbottom\b/)!=-1){
sortbottomrows[sortbottomrows.length]=_41.rows[i];
}
}
if(sortbottomrows){
if(_41.tFoot==null){
tfo=document.createElement("tfoot");
_41.appendChild(tfo);
}
for(var i=0;i<sortbottomrows.length;i++){
tfo.appendChild(sortbottomrows[i]);
}
delete sortbottomrows;
}
headrow=_41.tHead.rows[0].cells;
for(var i=0;i<headrow.length;i++){
if(!headrow[i].className.match(/\bsorttable_nosort\b/)){
mtch=headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
if(mtch){
override=mtch[1];
}
if(mtch&&typeof sorttable["sort_"+override]=="function"){
headrow[i].sorttable_sortfunction=sorttable["sort_"+override];
}else{
headrow[i].sorttable_sortfunction=sorttable.guessType(_41,i);
}
headrow[i].sorttable_columnindex=i;
headrow[i].sorttable_tbody=_41.tBodies[0];
dean_addEvent(headrow[i],"click",function(e){
if(this.className.search(/\bsorttable_sorted\b/)!=-1){
sorttable.reverse(this.sorttable_tbody);
this.className=this.className.replace("sorttable_sorted","sorttable_sorted_reverse");
this.removeChild(document.getElementById("sorttable_sortfwdind"));
sortrevind=document.createElement("span");
sortrevind.id="sorttable_sortrevind";
sortrevind.innerHTML="&nbsp;&uarr;";
this.appendChild(sortrevind);
return;
}
if(this.className.search(/\bsorttable_sorted_reverse\b/)!=-1){
sorttable.reverse(this.sorttable_tbody);
this.className=this.className.replace("sorttable_sorted_reverse","sorttable_sorted");
this.removeChild(document.getElementById("sorttable_sortrevind"));
sortfwdind=document.createElement("span");
sortfwdind.id="sorttable_sortfwdind";
sortfwdind.innerHTML="&nbsp;&darr;";
this.appendChild(sortfwdind);
return;
}
theadrow=this.parentNode;
forEach(theadrow.childNodes,function(_42){
if(_42.nodeType==1){
_42.className=_42.className.replace("sorttable_sorted_reverse","");
_42.className=_42.className.replace("sorttable_sorted","");
}
});
sortfwdind=document.getElementById("sorttable_sortfwdind");
if(sortfwdind){
sortfwdind.parentNode.removeChild(sortfwdind);
}
sortrevind=document.getElementById("sorttable_sortrevind");
if(sortrevind){
sortrevind.parentNode.removeChild(sortrevind);
}
this.className+=" sorttable_sorted";
sortfwdind=document.createElement("span");
sortfwdind.id="sorttable_sortfwdind";
sortfwdind.innerHTML="&nbsp;&darr;";
this.appendChild(sortfwdind);
row_array=[];
col=this.sorttable_columnindex;
rows=this.sorttable_tbody.rows;
for(var j=0;j<rows.length;j++){
row_array[row_array.length]=[sorttable.getInnerText(rows[j].cells[col]),rows[j]];
}
row_array.sort(this.sorttable_sortfunction);
tb=this.sorttable_tbody;
for(var j=0;j<row_array.length;j++){
tb.appendChild(row_array[j][1]);
}
delete row_array;
});
}
}
},guessType:function(_43,_44){
sortfn=sorttable.sort_alpha;
for(var i=0;i<_43.tBodies[0].rows.length;i++){
text=sorttable.getInnerText(_43.tBodies[0].rows[i].cells[_44]);
if(text!=""){
if(text.match(/^-?[�$�]?[\d,.]+%?$/)){
return sorttable.sort_numeric;
}
possdate=text.match(sorttable.DATE_RE);
if(possdate){
first=parseInt(possdate[1]);
second=parseInt(possdate[2]);
if(first>12){
return sorttable.sort_ddmm;
}else{
if(second>12){
return sorttable.sort_mmdd;
}else{
sortfn=sorttable.sort_ddmm;
}
}
}
}
}
return sortfn;
},getInnerText:function(_45){
hasInputs=(typeof _45.getElementsByTagName=="function")&&_45.getElementsByTagName("input").length;
if(_45.getAttribute("sorttable_customkey")!=null){
return _45.getAttribute("sorttable_customkey");
}else{
if(typeof _45.textContent!="undefined"&&!hasInputs){
return _45.textContent.replace(/^\s+|\s+$/g,"");
}else{
if(typeof _45.innerText!="undefined"&&!hasInputs){
return _45.innerText.replace(/^\s+|\s+$/g,"");
}else{
if(typeof _45.text!="undefined"&&!hasInputs){
return _45.text.replace(/^\s+|\s+$/g,"");
}else{
switch(_45.nodeType){
case 3:
if(_45.nodeName.toLowerCase()=="input"){
return _45.value.replace(/^\s+|\s+$/g,"");
}
case 4:
return _45.nodeValue.replace(/^\s+|\s+$/g,"");
break;
case 1:
case 11:
var _46="";
for(var i=0;i<_45.childNodes.length;i++){
_46+=sorttable.getInnerText(_45.childNodes[i]);
}
return _46.replace(/^\s+|\s+$/g,"");
break;
default:
return "";
}
}
}
}
}
},reverse:function(_47){
newrows=[];
for(var i=0;i<_47.rows.length;i++){
newrows[newrows.length]=_47.rows[i];
}
for(var i=newrows.length-1;i>=0;i--){
_47.appendChild(newrows[i]);
}
delete newrows;
},sort_numeric:function(a,b){
aa=parseFloat(a[0].replace(/[^0-9.-]/g,""));
if(isNaN(aa)){
aa=0;
}
bb=parseFloat(b[0].replace(/[^0-9.-]/g,""));
if(isNaN(bb)){
bb=0;
}
return aa-bb;
},sort_alpha:function(a,b){
if(a[0]==b[0]){
return 0;
}
if(a[0]<b[0]){
return -1;
}
return 1;
},sort_ddmm:function(a,b){
mtch=a[0].match(sorttable.DATE_RE);
y=mtch[3];
m=mtch[2];
d=mtch[1];
if(m.length==1){
m="0"+m;
}
if(d.length==1){
d="0"+d;
}
dt1=y+m+d;
mtch=b[0].match(sorttable.DATE_RE);
y=mtch[3];
m=mtch[2];
d=mtch[1];
if(m.length==1){
m="0"+m;
}
if(d.length==1){
d="0"+d;
}
dt2=y+m+d;
if(dt1==dt2){
return 0;
}
if(dt1<dt2){
return -1;
}
return 1;
},sort_mmdd:function(a,b){
mtch=a[0].match(sorttable.DATE_RE);
y=mtch[3];
d=mtch[2];
m=mtch[1];
if(m.length==1){
m="0"+m;
}
if(d.length==1){
d="0"+d;
}
dt1=y+m+d;
mtch=b[0].match(sorttable.DATE_RE);
y=mtch[3];
d=mtch[2];
m=mtch[1];
if(m.length==1){
m="0"+m;
}
if(d.length==1){
d="0"+d;
}
dt2=y+m+d;
if(dt1==dt2){
return 0;
}
if(dt1<dt2){
return -1;
}
return 1;
},shaker_sort:function(_48,_49){
var b=0;
var t=_48.length-1;
var _4a=true;
while(_4a){
_4a=false;
for(var i=b;i<t;++i){
if(_49(_48[i],_48[i+1])>0){
var q=_48[i];
_48[i]=_48[i+1];
_48[i+1]=q;
_4a=true;
}
}
t--;
if(!_4a){
break;
}
for(var i=t;i>b;--i){
if(_49(_48[i],_48[i-1])<0){
var q=_48[i];
_48[i]=_48[i-1];
_48[i-1]=q;
_4a=true;
}
}
b++;
}
}};
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",sorttable.init,false);
}
if(/WebKit/i.test(navigator.userAgent)){
var _timer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
sorttable.init();
}
},10);
}
window.onload=sorttable.init;
function dean_addEvent(_4b,_4c,_4d){
if(_4b.addEventListener){
_4b.addEventListener(_4c,_4d,false);
}else{
if(!_4d.$$guid){
_4d.$$guid=dean_addEvent.guid++;
}
if(!_4b.events){
_4b.events={};
}
var _4e=_4b.events[_4c];
if(!_4e){
_4e=_4b.events[_4c]={};
if(_4b["on"+_4c]){
_4e[0]=_4b["on"+_4c];
}
}
_4e[_4d.$$guid]=_4d;
_4b["on"+_4c]=handleEvent;
}
};
dean_addEvent.guid=1;
function removeEvent(_4f,_50,_51){
if(_4f.removeEventListener){
_4f.removeEventListener(_50,_51,false);
}else{
if(_4f.events&&_4f.events[_50]){
delete _4f.events[_50][_51.$$guid];
}
}
};
function handleEvent(_52){
var _53=true;
_52=_52||fixEvent(((this.ownerDocument||this.document||this).parentWindow||window).event);
var _54=this.events[_52.type];
for(var i in _54){
this.$$handleEvent=_54[i];
if(this.$$handleEvent(_52)===false){
_53=false;
}
}
return _53;
};
function fixEvent(_55){
_55.preventDefault=fixEvent.preventDefault;
_55.stopPropagation=fixEvent.stopPropagation;
return _55;
};
fixEvent.preventDefault=function(){
this.returnValue=false;
};
fixEvent.stopPropagation=function(){
this.cancelBubble=true;
};
if(!Array.forEach){
Array.forEach=function(_56,_57,_58){
for(var i=0;i<_56.length;i++){
_57.call(_58,_56[i],i,_56);
}
};
}
Function.prototype.forEach=function(_59,_5a,_5b){
for(var key in _59){
if(typeof this.prototype[key]=="undefined"){
_5a.call(_5b,_59[key],key,_59);
}
}
};
String.forEach=function(_5c,_5d,_5e){
Array.forEach(_5c.split(""),function(chr,_5f){
_5d.call(_5e,chr,_5f,_5c);
});
};
var forEach=function(_60,_61,_62){
if(_60){
var _63=Object;
if(_60 instanceof Function){
_63=Function;
}else{
if(_60.forEach instanceof Function){
_60.forEach(_61,_62);
return;
}else{
if(typeof _60=="string"){
_63=String;
}else{
if(typeof _60.length=="number"){
_63=Array;
}
}
}
}
_63.forEach(_60,_61,_62);
}
};
shortcut={"all_shortcuts":{},"add":function(_64,_65,opt){
var _66={"type":"keydown","propagate":false,"disable_in_input":false,"target":document,"keycode":false};
if(!opt){
opt=_66;
}else{
for(var dfo in _66){
if(typeof opt[dfo]=="undefined"){
opt[dfo]=_66[dfo];
}
}
}
var ele=opt.target;
if(typeof opt.target=="string"){
ele=document.getElementById(opt.target);
}
var ths=this;
_64=_64.toLowerCase();
var _67=function(e){
e=e||window.event;
if(opt["disable_in_input"]){
var _68;
if(e.target){
_68=e.target;
}else{
if(e.srcElement){
_68=e.srcElement;
}
}
if(_68.nodeType==3){
_68=_68.parentNode;
}
if(_68.tagName=="INPUT"||_68.tagName=="TEXTAREA"){
return;
}
}
if(e.keyCode){
code=e.keyCode;
}else{
if(e.which){
code=e.which;
}
}
var _69=String.fromCharCode(code).toLowerCase();
if(code==188){
_69=",";
}
if(code==190){
_69=".";
}
var _6a=_64.split("+");
var kp=0;
var _6b={"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"};
var _6c={"esc":27,"escape":27,"tab":9,"space":32,"return":13,"enter":13,"backspace":8,"scrolllock":145,"scroll_lock":145,"scroll":145,"capslock":20,"caps_lock":20,"caps":20,"numlock":144,"num_lock":144,"num":144,"pause":19,"break":19,"insert":45,"home":36,"delete":46,"end":35,"pageup":33,"page_up":33,"pu":33,"pagedown":34,"page_down":34,"pd":34,"left":37,"up":38,"right":39,"down":40,"f1":112,"f2":113,"f3":114,"f4":115,"f5":116,"f6":117,"f7":118,"f8":119,"f9":120,"f10":121,"f11":122,"f12":123};
var _6d={shift:{wanted:false,pressed:false},ctrl:{wanted:false,pressed:false},alt:{wanted:false,pressed:false},meta:{wanted:false,pressed:false}};
if(e.ctrlKey){
_6d.ctrl.pressed=true;
}
if(e.shiftKey){
_6d.shift.pressed=true;
}
if(e.altKey){
_6d.alt.pressed=true;
}
if(e.metaKey){
_6d.meta.pressed=true;
}
for(var i=0;k=_6a[i],i<_6a.length;i++){
if(k=="ctrl"||k=="control"){
kp++;
_6d.ctrl.wanted=true;
}else{
if(k=="shift"){
kp++;
_6d.shift.wanted=true;
}else{
if(k=="alt"){
kp++;
_6d.alt.wanted=true;
}else{
if(k=="meta"){
kp++;
_6d.meta.wanted=true;
}else{
if(k.length>1){
if(_6c[k]==code){
kp++;
}
}else{
if(opt["keycode"]){
if(opt["keycode"]==code){
kp++;
}
}else{
if(_69==k){
kp++;
}else{
if(_6b[_69]&&e.shiftKey){
_69=_6b[_69];
if(_69==k){
kp++;
}
}
}
}
}
}
}
}
}
}
if(kp==_6a.length&&_6d.ctrl.pressed==_6d.ctrl.wanted&&_6d.shift.pressed==_6d.shift.wanted&&_6d.alt.pressed==_6d.alt.wanted&&_6d.meta.pressed==_6d.meta.wanted){
_65(e);
if(!opt["propagate"]){
e.cancelBubble=true;
e.returnValue=false;
if(e.stopPropagation){
e.stopPropagation();
e.preventDefault();
}
return false;
}
}
};
this.all_shortcuts[_64]={"callback":_67,"target":ele,"event":opt["type"]};
if(ele.addEventListener){
ele.addEventListener(opt["type"],_67,false);
}else{
if(ele.attachEvent){
ele.attachEvent("on"+opt["type"],_67);
}else{
ele["on"+opt["type"]]=_67;
}
}
},"remove":function(_6e){
_6e=_6e.toLowerCase();
var _6f=this.all_shortcuts[_6e];
delete (this.all_shortcuts[_6e]);
if(!_6f){
return;
}
var _70=_6f["event"];
var ele=_6f["target"];
var _71=_6f["callback"];
if(ele.detachEvent){
ele.detachEvent("on"+_70,_71);
}else{
if(ele.removeEventListener){
ele.removeEventListener(_70,_71,false);
}else{
ele["on"+_70]=false;
}
}
}}(function(){
"use strict";
var doc=document,win=window,_72=Array.prototype,_73=_72.filter,_74=_72.indexOf,map=_72.map,_75=_72.push,_76=_72.reverse,_77=_72.slice,_78=_72.splice;
var _79=/^#[\w-]*$/,_7a=/^\.[\w-]*$/,_7b=/<.+>/,_7c=/^\w+$/;
function _7d(_7e,_7f){
if(_7f===void 0){
_7f=doc;
}
return _7a.test(_7e)?_7f.getElementsByClassName(_7e.slice(1)):_7c.test(_7e)?_7f.getElementsByTagName(_7e):_7f.querySelectorAll(_7e);
};
function _80(_81,_82){
if(_82===void 0){
_82=doc;
}
if(!_81){
return;
}
if(_81.__cash){
return _81;
}
var _83=_81;
if(_84(_81)){
if(_82.__cash){
_82=_82[0];
}
_83=_79.test(_81)?_82.getElementById(_81.slice(1)):_7b.test(_81)?_85(_81):_7d(_81,_82);
if(!_83){
return;
}
}else{
if(_86(_81)){
return this.ready(_81);
}
}
if(_83.nodeType||_83===win){
_83=[_83];
}
this.length=_83.length;
for(var i=0,l=this.length;i<l;i++){
this[i]=_83[i];
}
};
function _87(_88,_89){
return new _80(_88,_89);
};
var fn=_87.fn=_87.prototype=_80.prototype={constructor:_87,__cash:true,length:0,splice:_78};
fn.get=function(_8a){
if(_8a===undefined){
return _77.call(this);
}
return this[_8a<0?_8a+this.length:_8a];
};
fn.eq=function(_8b){
return _87(this.get(_8b));
};
fn.first=function(){
return this.eq(0);
};
fn.last=function(){
return this.eq(-1);
};
fn.map=function(_8c){
return _87(map.call(this,function(ele,i){
return _8c.call(ele,i,ele);
}));
};
fn.slice=function(){
return _87(_77.apply(this,arguments));
};
var _8d=/(?:^\w|[A-Z]|\b\w)/g,_8e=/[\s-_]+/g;
function _8f(str){
return str.replace(_8d,function(_90,_91){
return _90[!_91?"toLowerCase":"toUpperCase"]();
}).replace(_8e,"");
};
_87.camelCase=_8f;
function _92(arr,_93){
for(var i=0,l=arr.length;i<l;i++){
if(_93.call(arr[i],arr[i],i,arr)===false){
break;
}
}
};
_87.each=_92;
fn.each=function(_94){
_92(this,function(ele,i){
return _94.call(ele,i,ele);
});
return this;
};
fn.removeProp=function(_95){
return this.each(function(i,ele){
delete ele[_95];
});
};
if(typeof exports!=="undefined"){
module.exports=_87;
}else{
win.cash=win.$=_87;
}
function _96(_97){
if(_97===void 0){
_97=this;
}
var _98=arguments,_99=_98.length;
for(var i=_99<2?0:1;i<_99;i++){
for(var key in _98[i]){
_97[key]=_98[i][key];
}
}
return _97;
};
_87.extend=fn.extend=_96;
var _9a=1;
_87.guid=_9a;
function _9b(ele,_9c){
var _9d=ele&&(ele.matches||ele.webkitMatchesSelector||ele.mozMatchesSelector||ele.msMatchesSelector||ele.oMatchesSelector);
return !!_9d&&_9d.call(ele,_9c);
};
_87.matches=_9b;
function _86(x){
return typeof x==="function";
};
_87.isFunction=_86;
function _84(x){
return typeof x==="string";
};
_87.isString=_84;
function _9e(x){
return !isNaN(parseFloat(x))&&isFinite(x);
};
_87.isNumeric=_9e;
var _9f=Array.isArray;
_87.isArray=_9f;
fn.prop=function(_a0,_a1){
if(!_a0){
return;
}
if(_84(_a0)){
if(arguments.length<2){
return this[0]&&this[0][_a0];
}
return this.each(function(i,ele){
ele[_a0]=_a1;
});
}
for(var key in _a0){
this.prop(key,_a0[key]);
}
return this;
};
function _a2(_a3){
return _84(_a3)?function(i,ele){
return _9b(ele,_a3);
}:_a3.__cash?function(i,ele){
return _a3.is(ele);
}:function(i,ele,_a4){
return ele===_a4;
};
};
fn.filter=function(_a5){
if(!_a5){
return _87();
}
var _a6=_86(_a5)?_a5:_a2(_a5);
return _87(_73.call(this,function(ele,i){
return _a6.call(ele,i,ele,_a5);
}));
};
var _a7=/\S+/g;
function _a8(str){
return _84(str)?str.match(_a7)||[]:[];
};
fn.hasClass=function(cls){
var _a9=_a8(cls);
var _aa=false;
if(_a9.length){
this.each(function(i,ele){
_aa=ele.classList.contains(_a9[0]);
return !_aa;
});
}
return _aa;
};
fn.removeAttr=function(_ab){
var _ac=_a8(_ab);
if(!_ac.length){
return this;
}
return this.each(function(i,ele){
_92(_ac,function(a){
ele.removeAttribute(a);
});
});
};
fn.attr=function(_ad,_ae){
if(!_ad){
return;
}
if(_84(_ad)){
if(arguments.length<2){
if(!this[0]){
return;
}
var _af=this[0].getAttribute(_ad);
return _af===null?undefined:_af;
}
if(_ae===null){
return this.removeAttr(_ad);
}
return this.each(function(i,ele){
ele.setAttribute(_ad,_ae);
});
}
for(var key in _ad){
this.attr(key,_ad[key]);
}
return this;
};
fn.toggleClass=function(cls,_b0){
var _b1=_a8(cls),_b2=_b0!==undefined;
if(!_b1.length){
return this;
}
return this.each(function(i,ele){
_92(_b1,function(c){
if(_b2){
_b0?ele.classList.add(c):ele.classList.remove(c);
}else{
ele.classList.toggle(c);
}
});
});
};
fn.addClass=function(cls){
return this.toggleClass(cls,true);
};
fn.removeClass=function(cls){
return !arguments.length?this.attr("class",""):this.toggleClass(cls,false);
};
var _b3;
function _b4(){
if(_b3){
return;
}
_b3=doc.implementation.createHTMLDocument("");
var _b5=_b3.createElement("base");
_b5.href=doc.location.href;
_b3.head.appendChild(_b5);
};
function _85(_b6){
_b4();
if(!_84(_b6)){
_b6="";
}
_b3.body.innerHTML=_b6;
return _77.call(_b3.body.childNodes);
};
_87.parseHTML=_85;
function _b7(arr){
return arr.filter(function(_b8,_b9,_ba){
return _ba.indexOf(_b8)===_b9;
});
};
_87.unique=_b7;
fn.add=function(_bb,_bc){
return _87(_b7(this.get().concat(_87(_bb,_bc).get())));
};
function _bd(ele,_be,_bf){
if(ele.nodeType!==1){
return;
}
var _c0=win.getComputedStyle(ele,null);
return _be?_bf?_c0.getPropertyValue(_be):_c0[_be]:_c0;
};
function _c1(ele,_c2){
return parseInt(_bd(ele,_c2),10)||0;
};
var _c3=/^--/;
function _c4(_c5){
return _c3.test(_c5);
};
var _c6={},_c7=doc.createElement("div"),_c8=_c7.style,_c9=["webkit","moz","ms","o"];
function _ca(_cb,_cc){
if(_cc===void 0){
_cc=_c4(_cb);
}
if(_cc){
return _cb;
}
if(!_c6[_cb]){
var _cd=_8f(_cb),_ce=""+_cd.charAt(0).toUpperCase()+_cd.slice(1),_cf=(_cd+" "+_c9.join(_ce+" ")+_ce).split(" ");
_92(_cf,function(p){
if(p in _c8){
_c6[_cb]=p;
return false;
}
});
}
return _c6[_cb];
};
_87.prefixedProp=_ca;
var _d0={animationIterationCount:true,columnCount:true,flexGrow:true,flexShrink:true,fontWeight:true,lineHeight:true,opacity:true,order:true,orphans:true,widows:true,zIndex:true};
function _d1(_d2,_d3,_d4){
if(_d4===void 0){
_d4=_c4(_d2);
}
return !_d4&&!_d0[_d2]&&_9e(_d3)?_d3+"px":_d3;
};
fn.css=function(_d5,_d6){
if(_84(_d5)){
var _d7=_c4(_d5);
_d5=_ca(_d5,_d7);
if(arguments.length<2){
return this[0]&&_bd(this[0],_d5,_d7);
}
if(!_d5){
return this;
}
_d6=_d1(_d5,_d6,_d7);
return this.each(function(i,ele){
if(ele.nodeType!==1){
return;
}
if(_d7){
ele.style.setProperty(_d5,_d6);
}else{
ele.style[_d5]=_d6;
}
});
}
for(var key in _d5){
this.css(key,_d5[key]);
}
return this;
};
var _d8="__cashData",_d9=/^data-(.*)/;
_87.hasData=function(ele){
return _d8 in ele;
};
function _da(ele){
return ele[_d8]=ele[_d8]||{};
};
function _db(ele,key){
var _dc=_da(ele);
if(key){
if(!(key in _dc)){
var _dd=ele.dataset?ele.dataset[key]||ele.dataset[_8f(key)]:_87(ele).attr("data-"+key);
if(_dd!==undefined){
try{
_dd=JSON.parse(_dd);
}
catch(e){
}
_dc[key]=_dd;
}
}
return _dc[key];
}
return _dc;
};
function _de(ele,key){
if(key===undefined){
delete ele[_d8];
}else{
delete _da(ele)[key];
}
};
function _df(ele,key,_e0){
_da(ele)[key]=_e0;
};
fn.data=function(_e1,_e2){
var _e3=this;
if(!_e1){
if(!this[0]){
return;
}
_92(this[0].attributes,function(_e4){
var _e5=_e4.name.match(_d9);
if(!_e5){
return;
}
_e3.data(_e5[1]);
});
return _db(this[0]);
}
if(_84(_e1)){
if(_e2===undefined){
return this[0]&&_db(this[0],_e1);
}
return this.each(function(i,ele){
return _df(ele,_e1,_e2);
});
}
for(var key in _e1){
this.data(key,_e1[key]);
}
return this;
};
fn.removeData=function(key){
return this.each(function(i,ele){
return _de(ele,key);
});
};
function _e6(ele,_e7){
return _c1(ele,"border"+(_e7?"Left":"Top")+"Width")+_c1(ele,"padding"+(_e7?"Left":"Top"))+_c1(ele,"padding"+(_e7?"Right":"Bottom"))+_c1(ele,"border"+(_e7?"Right":"Bottom")+"Width");
};
_92(["Width","Height"],function(_e8){
fn["inner"+_e8]=function(){
if(!this[0]){
return;
}
if(this[0]===win){
return win["inner"+_e8];
}
return this[0]["client"+_e8];
};
});
_92(["width","height"],function(_e9,_ea){
fn[_e9]=function(_eb){
if(!this[0]){
return _eb===undefined?undefined:this;
}
if(!arguments.length){
if(this[0]===win){
return this[0][_8f("outer-"+_e9)];
}
return this[0].getBoundingClientRect()[_e9]-_e6(this[0],!_ea);
}
_eb=parseInt(_eb,10);
return this.each(function(i,ele){
if(ele.nodeType!==1){
return;
}
var _ec=_bd(ele,"boxSizing");
ele.style[_e9]=_d1(_e9,_eb+(_ec==="border-box"?_e6(ele,!_ea):0));
});
};
});
_92(["Width","Height"],function(_ed,_ee){
fn["outer"+_ed]=function(_ef){
if(!this[0]){
return;
}
if(this[0]===win){
return win["outer"+_ed];
}
return this[0]["offset"+_ed]+(_ef?_c1(this[0],"margin"+(!_ee?"Left":"Top"))+_c1(this[0],"margin"+(!_ee?"Right":"Bottom")):0);
};
});
function _f0(ns1,ns2){
for(var i=0,l=ns2.length;i<l;i++){
if(ns1.indexOf(ns2[i])<0){
return false;
}
}
return true;
};
function _f1(_f2,ele,_f3){
_92(_f2[_f3],function(_f4){
var _f5=_f4[0],_f6=_f4[1];
ele.removeEventListener(_f3,_f6);
});
delete _f2[_f3];
};
var _f7="__cashEvents",_f8=".";
function _f9(ele){
return ele[_f7]=ele[_f7]||{};
};
function _fa(ele,_fb,_fc,_fd){
_fd.guid=_fd.guid||_9a++;
var _fe=_f9(ele);
_fe[_fb]=_fe[_fb]||[];
_fe[_fb].push([_fc,_fd]);
ele.addEventListener(_fb,_fd);
};
function _ff(_100){
var _101=_100.split(_f8);
return [_101[0],_101.slice(1).sort()];
};
function _102(ele,name,_103,_104){
var _105=_f9(ele);
if(!name){
if(!_103||!_103.length){
for(name in _105){
_f1(_105,ele,name);
}
}else{
for(name in _105){
_102(ele,name,_103,_104);
}
}
}else{
var _106=_105[name];
if(!_106){
return;
}
if(_104){
_104.guid=_104.guid||_9a++;
}
_105[name]=_106.filter(function(_107){
var ns=_107[0],cb=_107[1];
if(_104&&cb.guid!==_104.guid||!_f0(ns,_103)){
return true;
}
ele.removeEventListener(name,cb);
});
}
};
fn.off=function(_108,_109){
var _10a=this;
if(_108===undefined){
this.each(function(i,ele){
return _102(ele);
});
}else{
_92(_a8(_108),function(_10b){
var _10c=_ff(_10b),name=_10c[0],_10d=_10c[1];
_10a.each(function(i,ele){
return _102(ele,name,_10d,_109);
});
});
}
return this;
};
fn.on=function(_10e,_10f,_110,_111){
var _112=this;
if(!_84(_10e)){
for(var key in _10e){
this.on(key,_10f,_10e[key]);
}
return this;
}
if(_86(_10f)){
_110=_10f;
_10f=false;
}
_92(_a8(_10e),function(_113){
var _114=_ff(_113),name=_114[0],_115=_114[1];
_112.each(function(i,ele){
var _116=function _116(_117){
if(_117.namespace&&!_f0(_115,_117.namespace.split(_f8))){
return;
}
var _118=ele;
if(_10f){
var _119=_117.target;
while(!_9b(_119,_10f)){
if(_119===ele){
return;
}
_119=_119.parentNode;
if(!_119){
return;
}
}
_118=_119;
}
_117.namespace=_117.namespace||"";
var _11a=_110.call(_118,_117,_117.data);
if(_111){
_102(ele,name,_115,_116);
}
if(_11a===false){
_117.preventDefault();
_117.stopPropagation();
}
};
_116.guid=_110.guid=_110.guid||_9a++;
_fa(ele,name,_115,_116);
});
});
return this;
};
fn.one=function(_11b,_11c,_11d){
return this.on(_11b,_11c,_11d,true);
};
fn.ready=function(_11e){
var _11f=function _11f(){
return _11e(_87);
};
if(doc.readyState!=="loading"){
setTimeout(_11f);
}else{
doc.addEventListener("DOMContentLoaded",_11f);
}
return this;
};
fn.trigger=function(_120,data){
var evt=_120;
if(_84(_120)){
var _121=_ff(_120),name=_121[0],_122=_121[1];
evt=doc.createEvent("HTMLEvents");
evt.initEvent(name,true,true);
evt.namespace=_122.join(_f8);
}
evt.data=data;
return this.each(function(i,ele){
ele.dispatchEvent(evt);
});
};
function _123(ele){
var _124=[];
_92(ele.options,function(_125){
if(_125.selected&&!_125.disabled&&!_125.parentNode.disabled){
_124.push(_125.value);
}
});
return _124;
};
function _126(ele){
return ele.selectedIndex<0?null:ele.options[ele.selectedIndex].value;
};
var _127=/select-one/i,_128=/select-multiple/i;
function _129(ele){
var type=ele.type;
if(_127.test(type)){
return _126(ele);
}
if(_128.test(type)){
return _123(ele);
}
return ele.value;
};
var _12a=/%20/g;
function _12b(prop,_12c){
return "&"+encodeURIComponent(prop)+"="+encodeURIComponent(_12c).replace(_12a,"+");
};
var _12d=/file|reset|submit|button|image/i,_12e=/radio|checkbox/i;
fn.serialize=function(){
var _12f="";
this.each(function(i,ele){
_92(ele.elements||[ele],function(ele){
if(ele.disabled||!ele.name||ele.tagName==="FIELDSET"){
return;
}
if(_12d.test(ele.type)){
return;
}
if(_12e.test(ele.type)&&!ele.checked){
return;
}
var _130=_129(ele);
if(_130===undefined){
return;
}
var _131=_9f(_130)?_130:[_130];
_92(_131,function(_132){
_12f+=_12b(ele.name,_132);
});
});
});
return _12f.substr(1);
};
fn.val=function(_133){
if(_133===undefined){
return this[0]&&_129(this[0]);
}
return this.each(function(i,ele){
if(_128.test(ele.type)&&_9f(_133)){
_92(ele.options,function(_134){
_134.selected=_133.indexOf(_134.value)>=0;
});
}else{
ele.value=_133;
}
});
};
fn.clone=function(){
return this.map(function(i,ele){
return ele.cloneNode(true);
});
};
fn.detach=function(){
return this.each(function(i,ele){
if(ele.parentNode){
ele.parentNode.removeChild(ele);
}
});
};
function _135(ele,_136,_137){
if(_137){
ele.insertBefore(_136,ele.childNodes[0]);
}else{
ele.appendChild(_136);
}
};
function _138(_139,_13a,_13b){
var _13c=_84(_13a);
if(!_13c&&_13a.length){
_92(_13a,function(ele){
return _138(_139,ele,_13b);
});
}else{
_92(_139,_13c?function(ele){
ele.insertAdjacentHTML(_13b?"afterbegin":"beforeend",_13a);
}:function(ele,_13d){
return _135(ele,!_13d?_13a:_13a.cloneNode(true),_13b);
});
}
};
fn.append=function(){
var _13e=this;
_92(arguments,function(_13f){
_138(_13e,_13f);
});
return this;
};
fn.appendTo=function(_140){
_138(_87(_140),this);
return this;
};
fn.html=function(_141){
if(_141===undefined){
return this[0]&&this[0].innerHTML;
}
var _142=_141.nodeType?_141[0].outerHTML:_141;
return this.each(function(i,ele){
ele.innerHTML=_142;
});
};
fn.empty=function(){
return this.html("");
};
fn.insertAfter=function(_143){
var _144=this;
_87(_143).each(function(_145,ele){
var _146=ele.parentNode;
_144.each(function(i,e){
_146.insertBefore(!_145?e:e.cloneNode(true),ele.nextSibling);
});
});
return this;
};
fn.after=function(){
var _147=this;
_92(_76.apply(arguments),function(_148){
_76.apply(_87(_148).slice()).insertAfter(_147);
});
return this;
};
fn.insertBefore=function(_149){
var _14a=this;
_87(_149).each(function(_14b,ele){
var _14c=ele.parentNode;
_14a.each(function(i,e){
_14c.insertBefore(!_14b?e:e.cloneNode(true),ele);
});
});
return this;
};
fn.before=function(){
var _14d=this;
_92(arguments,function(_14e){
_87(_14e).insertBefore(_14d);
});
return this;
};
fn.prepend=function(){
var _14f=this;
_92(arguments,function(_150){
_138(_14f,_150,true);
});
return this;
};
fn.prependTo=function(_151){
_138(_87(_151),_76.apply(this.slice()),true);
return this;
};
fn.remove=function(){
return this.detach().off();
};
fn.replaceWith=function(_152){
var _153=this;
return this.each(function(i,ele){
var _154=ele.parentNode;
if(!_154){
return;
}
var _155=i?_87(_152).clone():_87(_152);
if(!_155[0]){
_153.remove();
return false;
}
_154.replaceChild(_155[0],ele);
_87(_155[0]).after(_155.slice(1));
});
};
fn.replaceAll=function(_156){
_87(_156).replaceWith(this);
return this;
};
fn.text=function(_157){
if(_157===undefined){
return this[0]?this[0].textContent:"";
}
return this.each(function(i,ele){
ele.textContent=_157;
});
};
var _158=doc.documentElement;
fn.offset=function(){
var ele=this[0];
if(!ele){
return;
}
var rect=ele.getBoundingClientRect();
return {top:rect.top+win.pageYOffset-_158.clientTop,left:rect.left+win.pageXOffset-_158.clientLeft};
};
fn.offsetParent=function(){
return _87(this[0]&&this[0].offsetParent);
};
fn.position=function(){
var ele=this[0];
if(!ele){
return;
}
return {left:ele.offsetLeft,top:ele.offsetTop};
};
fn.children=function(_159){
var _15a=[];
this.each(function(i,ele){
_75.apply(_15a,ele.children);
});
_15a=_87(_b7(_15a));
if(!_159){
return _15a;
}
return _15a.filter(function(i,ele){
return _9b(ele,_159);
});
};
fn.contents=function(){
var _15b=[];
this.each(function(i,ele){
_75.apply(_15b,ele.tagName==="IFRAME"?[ele.contentDocument]:ele.childNodes);
});
return _87(_15b.length&&_b7(_15b));
};
fn.find=function(_15c){
var _15d=[];
for(var i=0,l=this.length;i<l;i++){
var _15e=_7d(_15c,this[i]);
if(_15e.length){
_75.apply(_15d,_15e);
}
}
return _87(_15d.length&&_b7(_15d));
};
fn.has=function(_15f){
var _160=_84(_15f)?function(i,ele){
return !!_7d(_15f,ele).length;
}:function(i,ele){
return ele.contains(_15f);
};
return this.filter(_160);
};
fn.is=function(_161){
if(!_161||!this[0]){
return false;
}
var _162=_a2(_161);
var _163=false;
this.each(function(i,ele){
_163=_162(i,ele,_161);
return !_163;
});
return _163;
};
fn.next=function(){
return _87(this[0]&&this[0].nextElementSibling);
};
fn.not=function(_164){
if(!_164||!this[0]){
return this;
}
var _165=_a2(_164);
return this.filter(function(i,ele){
return !_165(i,ele,_164);
});
};
fn.parent=function(){
var _166=[];
this.each(function(i,ele){
if(ele&&ele.parentNode){
_166.push(ele.parentNode);
}
});
return _87(_b7(_166));
};
fn.index=function(ele){
var _167=ele?_87(ele)[0]:this[0],_168=ele?this:_87(_167).parent().children();
return _74.call(_168,_167);
};
fn.closest=function(_169){
if(!_169||!this[0]){
return _87();
}
if(this.is(_169)){
return this.filter(_169);
}
return this.parent().closest(_169);
};
fn.parents=function(_16a){
var _16b=[];
var last;
this.each(function(i,ele){
last=ele;
while(last&&last.parentNode&&last!==doc.body.parentNode){
last=last.parentNode;
if(!_16a||_16a&&_9b(last,_16a)){
_16b.push(last);
}
}
});
return _87(_b7(_16b));
};
fn.prev=function(){
return _87(this[0]&&this[0].previousElementSibling);
};
fn.siblings=function(){
var ele=this[0];
return this.parent().children().filter(function(i,_16c){
return _16c!==ele;
});
};
})();
(function(){
var root=typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global||this||{};
var _16d=root._;
var _16e=Array.prototype,_16f=Object.prototype;
var _170=typeof Symbol!=="undefined"?Symbol.prototype:null;
var push=_16e.push,_171=_16e.slice,_172=_16f.toString,_173=_16f.hasOwnProperty;
var _174=Array.isArray,_175=Object.keys,_176=Object.create;
var Ctor=function(){
};
var _177=function(obj){
if(obj instanceof _177){
return obj;
}
if(!(this instanceof _177)){
return new _177(obj);
}
this._wrapped=obj;
};
if(typeof exports!="undefined"&&!exports.nodeType){
if(typeof module!="undefined"&&!module.nodeType&&module.exports){
exports=module.exports=_177;
}
exports._=_177;
}else{
root._=_177;
}
_177.VERSION="1.9.1";
var _178=function(func,_179,_17a){
if(_179===void 0){
return func;
}
switch(_17a==null?3:_17a){
case 1:
return function(_17b){
return func.call(_179,_17b);
};
case 3:
return function(_17c,_17d,_17e){
return func.call(_179,_17c,_17d,_17e);
};
case 4:
return function(_17f,_180,_181,_182){
return func.call(_179,_17f,_180,_181,_182);
};
}
return function(){
return func.apply(_179,arguments);
};
};
var _183;
var cb=function(_184,_185,_186){
if(_177.iteratee!==_183){
return _177.iteratee(_184,_185);
}
if(_184==null){
return _177.identity;
}
if(_177.isFunction(_184)){
return _178(_184,_185,_186);
}
if(_177.isObject(_184)&&!_177.isArray(_184)){
return _177.matcher(_184);
}
return _177.property(_184);
};
_177.iteratee=_183=function(_187,_188){
return cb(_187,_188,Infinity);
};
var _189=function(func,_18a){
_18a=_18a==null?func.length-1:+_18a;
return function(){
var _18b=Math.max(arguments.length-_18a,0),rest=Array(_18b),_18c=0;
for(;_18c<_18b;_18c++){
rest[_18c]=arguments[_18c+_18a];
}
switch(_18a){
case 0:
return func.call(this,rest);
case 1:
return func.call(this,arguments[0],rest);
case 2:
return func.call(this,arguments[0],arguments[1],rest);
}
var args=Array(_18a+1);
for(_18c=0;_18c<_18a;_18c++){
args[_18c]=arguments[_18c];
}
args[_18a]=rest;
return func.apply(this,args);
};
};
var _18d=function(_18e){
if(!_177.isObject(_18e)){
return {};
}
if(_176){
return _176(_18e);
}
Ctor.prototype=_18e;
var _18f=new Ctor;
Ctor.prototype=null;
return _18f;
};
var _190=function(key){
return function(obj){
return obj==null?void 0:obj[key];
};
};
var has=function(obj,path){
return obj!=null&&_173.call(obj,path);
};
var _191=function(obj,path){
var _192=path.length;
for(var i=0;i<_192;i++){
if(obj==null){
return void 0;
}
obj=obj[path[i]];
}
return _192?obj:void 0;
};
var _193=Math.pow(2,53)-1;
var _194=_190("length");
var _195=function(_196){
var _197=_194(_196);
return typeof _197=="number"&&_197>=0&&_197<=_193;
};
_177.each=_177.forEach=function(obj,_198,_199){
_198=_178(_198,_199);
var i,_19a;
if(_195(obj)){
for(i=0,_19a=obj.length;i<_19a;i++){
_198(obj[i],i,obj);
}
}else{
var keys=_177.keys(obj);
for(i=0,_19a=keys.length;i<_19a;i++){
_198(obj[keys[i]],keys[i],obj);
}
}
return obj;
};
_177.map=_177.collect=function(obj,_19b,_19c){
_19b=cb(_19b,_19c);
var keys=!_195(obj)&&_177.keys(obj),_19d=(keys||obj).length,_19e=Array(_19d);
for(var _19f=0;_19f<_19d;_19f++){
var _1a0=keys?keys[_19f]:_19f;
_19e[_19f]=_19b(obj[_1a0],_1a0,obj);
}
return _19e;
};
var _1a1=function(dir){
var _1a2=function(obj,_1a3,memo,_1a4){
var keys=!_195(obj)&&_177.keys(obj),_1a5=(keys||obj).length,_1a6=dir>0?0:_1a5-1;
if(!_1a4){
memo=obj[keys?keys[_1a6]:_1a6];
_1a6+=dir;
}
for(;_1a6>=0&&_1a6<_1a5;_1a6+=dir){
var _1a7=keys?keys[_1a6]:_1a6;
memo=_1a3(memo,obj[_1a7],_1a7,obj);
}
return memo;
};
return function(obj,_1a8,memo,_1a9){
var _1aa=arguments.length>=3;
return _1a2(obj,_178(_1a8,_1a9,4),memo,_1aa);
};
};
_177.reduce=_177.foldl=_177.inject=_1a1(1);
_177.reduceRight=_177.foldr=_1a1(-1);
_177.find=_177.detect=function(obj,_1ab,_1ac){
var _1ad=_195(obj)?_177.findIndex:_177.findKey;
var key=_1ad(obj,_1ab,_1ac);
if(key!==void 0&&key!==-1){
return obj[key];
}
};
_177.filter=_177.select=function(obj,_1ae,_1af){
var _1b0=[];
_1ae=cb(_1ae,_1af);
_177.each(obj,function(_1b1,_1b2,list){
if(_1ae(_1b1,_1b2,list)){
_1b0.push(_1b1);
}
});
return _1b0;
};
_177.reject=function(obj,_1b3,_1b4){
return _177.filter(obj,_177.negate(cb(_1b3)),_1b4);
};
_177.every=_177.all=function(obj,_1b5,_1b6){
_1b5=cb(_1b5,_1b6);
var keys=!_195(obj)&&_177.keys(obj),_1b7=(keys||obj).length;
for(var _1b8=0;_1b8<_1b7;_1b8++){
var _1b9=keys?keys[_1b8]:_1b8;
if(!_1b5(obj[_1b9],_1b9,obj)){
return false;
}
}
return true;
};
_177.some=_177.any=function(obj,_1ba,_1bb){
_1ba=cb(_1ba,_1bb);
var keys=!_195(obj)&&_177.keys(obj),_1bc=(keys||obj).length;
for(var _1bd=0;_1bd<_1bc;_1bd++){
var _1be=keys?keys[_1bd]:_1bd;
if(_1ba(obj[_1be],_1be,obj)){
return true;
}
}
return false;
};
_177.contains=_177.includes=_177.include=function(obj,item,_1bf,_1c0){
if(!_195(obj)){
obj=_177.values(obj);
}
if(typeof _1bf!="number"||_1c0){
_1bf=0;
}
return _177.indexOf(obj,item,_1bf)>=0;
};
_177.invoke=_189(function(obj,path,args){
var _1c1,func;
if(_177.isFunction(path)){
func=path;
}else{
if(_177.isArray(path)){
_1c1=path.slice(0,-1);
path=path[path.length-1];
}
}
return _177.map(obj,function(_1c2){
var _1c3=func;
if(!_1c3){
if(_1c1&&_1c1.length){
_1c2=_191(_1c2,_1c1);
}
if(_1c2==null){
return void 0;
}
_1c3=_1c2[path];
}
return _1c3==null?_1c3:_1c3.apply(_1c2,args);
});
});
_177.pluck=function(obj,key){
return _177.map(obj,_177.property(key));
};
_177.where=function(obj,_1c4){
return _177.filter(obj,_177.matcher(_1c4));
};
_177.findWhere=function(obj,_1c5){
return _177.find(obj,_177.matcher(_1c5));
};
_177.max=function(obj,_1c6,_1c7){
var _1c8=-Infinity,_1c9=-Infinity,_1ca,_1cb;
if(_1c6==null||typeof _1c6=="number"&&typeof obj[0]!="object"&&obj!=null){
obj=_195(obj)?obj:_177.values(obj);
for(var i=0,_1cc=obj.length;i<_1cc;i++){
_1ca=obj[i];
if(_1ca!=null&&_1ca>_1c8){
_1c8=_1ca;
}
}
}else{
_1c6=cb(_1c6,_1c7);
_177.each(obj,function(v,_1cd,list){
_1cb=_1c6(v,_1cd,list);
if(_1cb>_1c9||_1cb===-Infinity&&_1c8===-Infinity){
_1c8=v;
_1c9=_1cb;
}
});
}
return _1c8;
};
_177.min=function(obj,_1ce,_1cf){
var _1d0=Infinity,_1d1=Infinity,_1d2,_1d3;
if(_1ce==null||typeof _1ce=="number"&&typeof obj[0]!="object"&&obj!=null){
obj=_195(obj)?obj:_177.values(obj);
for(var i=0,_1d4=obj.length;i<_1d4;i++){
_1d2=obj[i];
if(_1d2!=null&&_1d2<_1d0){
_1d0=_1d2;
}
}
}else{
_1ce=cb(_1ce,_1cf);
_177.each(obj,function(v,_1d5,list){
_1d3=_1ce(v,_1d5,list);
if(_1d3<_1d1||_1d3===Infinity&&_1d0===Infinity){
_1d0=v;
_1d1=_1d3;
}
});
}
return _1d0;
};
_177.shuffle=function(obj){
return _177.sample(obj,Infinity);
};
_177.sample=function(obj,n,_1d6){
if(n==null||_1d6){
if(!_195(obj)){
obj=_177.values(obj);
}
return obj[_177.random(obj.length-1)];
}
var _1d7=_195(obj)?_177.clone(obj):_177.values(obj);
var _1d8=_194(_1d7);
n=Math.max(Math.min(n,_1d8),0);
var last=_1d8-1;
for(var _1d9=0;_1d9<n;_1d9++){
var rand=_177.random(_1d9,last);
var temp=_1d7[_1d9];
_1d7[_1d9]=_1d7[rand];
_1d7[rand]=temp;
}
return _1d7.slice(0,n);
};
_177.sortBy=function(obj,_1da,_1db){
var _1dc=0;
_1da=cb(_1da,_1db);
return _177.pluck(_177.map(obj,function(_1dd,key,list){
return {value:_1dd,index:_1dc++,criteria:_1da(_1dd,key,list)};
}).sort(function(left,_1de){
var a=left.criteria;
var b=_1de.criteria;
if(a!==b){
if(a>b||a===void 0){
return 1;
}
if(a<b||b===void 0){
return -1;
}
}
return left.index-_1de.index;
}),"value");
};
var _1df=function(_1e0,_1e1){
return function(obj,_1e2,_1e3){
var _1e4=_1e1?[[],[]]:{};
_1e2=cb(_1e2,_1e3);
_177.each(obj,function(_1e5,_1e6){
var key=_1e2(_1e5,_1e6,obj);
_1e0(_1e4,_1e5,key);
});
return _1e4;
};
};
_177.groupBy=_1df(function(_1e7,_1e8,key){
if(has(_1e7,key)){
_1e7[key].push(_1e8);
}else{
_1e7[key]=[_1e8];
}
});
_177.indexBy=_1df(function(_1e9,_1ea,key){
_1e9[key]=_1ea;
});
_177.countBy=_1df(function(_1eb,_1ec,key){
if(has(_1eb,key)){
_1eb[key]++;
}else{
_1eb[key]=1;
}
});
var _1ed=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
_177.toArray=function(obj){
if(!obj){
return [];
}
if(_177.isArray(obj)){
return _171.call(obj);
}
if(_177.isString(obj)){
return obj.match(_1ed);
}
if(_195(obj)){
return _177.map(obj,_177.identity);
}
return _177.values(obj);
};
_177.size=function(obj){
if(obj==null){
return 0;
}
return _195(obj)?obj.length:_177.keys(obj).length;
};
_177.partition=_1df(function(_1ee,_1ef,pass){
_1ee[pass?0:1].push(_1ef);
},true);
_177.first=_177.head=_177.take=function(_1f0,n,_1f1){
if(_1f0==null||_1f0.length<1){
return n==null?void 0:[];
}
if(n==null||_1f1){
return _1f0[0];
}
return _177.initial(_1f0,_1f0.length-n);
};
_177.initial=function(_1f2,n,_1f3){
return _171.call(_1f2,0,Math.max(0,_1f2.length-(n==null||_1f3?1:n)));
};
_177.last=function(_1f4,n,_1f5){
if(_1f4==null||_1f4.length<1){
return n==null?void 0:[];
}
if(n==null||_1f5){
return _1f4[_1f4.length-1];
}
return _177.rest(_1f4,Math.max(0,_1f4.length-n));
};
_177.rest=_177.tail=_177.drop=function(_1f6,n,_1f7){
return _171.call(_1f6,n==null||_1f7?1:n);
};
_177.compact=function(_1f8){
return _177.filter(_1f8,Boolean);
};
var _1f9=function(_1fa,_1fb,_1fc,_1fd){
_1fd=_1fd||[];
var idx=_1fd.length;
for(var i=0,_1fe=_194(_1fa);i<_1fe;i++){
var _1ff=_1fa[i];
if(_195(_1ff)&&(_177.isArray(_1ff)||_177.isArguments(_1ff))){
if(_1fb){
var j=0,len=_1ff.length;
while(j<len){
_1fd[idx++]=_1ff[j++];
}
}else{
_1f9(_1ff,_1fb,_1fc,_1fd);
idx=_1fd.length;
}
}else{
if(!_1fc){
_1fd[idx++]=_1ff;
}
}
}
return _1fd;
};
_177.flatten=function(_200,_201){
return _1f9(_200,_201,false);
};
_177.without=_189(function(_202,_203){
return _177.difference(_202,_203);
});
_177.uniq=_177.unique=function(_204,_205,_206,_207){
if(!_177.isBoolean(_205)){
_207=_206;
_206=_205;
_205=false;
}
if(_206!=null){
_206=cb(_206,_207);
}
var _208=[];
var seen=[];
for(var i=0,_209=_194(_204);i<_209;i++){
var _20a=_204[i],_20b=_206?_206(_20a,i,_204):_20a;
if(_205&&!_206){
if(!i||seen!==_20b){
_208.push(_20a);
}
seen=_20b;
}else{
if(_206){
if(!_177.contains(seen,_20b)){
seen.push(_20b);
_208.push(_20a);
}
}else{
if(!_177.contains(_208,_20a)){
_208.push(_20a);
}
}
}
}
return _208;
};
_177.union=_189(function(_20c){
return _177.uniq(_1f9(_20c,true,true));
});
_177.intersection=function(_20d){
var _20e=[];
var _20f=arguments.length;
for(var i=0,_210=_194(_20d);i<_210;i++){
var item=_20d[i];
if(_177.contains(_20e,item)){
continue;
}
var j;
for(j=1;j<_20f;j++){
if(!_177.contains(arguments[j],item)){
break;
}
}
if(j===_20f){
_20e.push(item);
}
}
return _20e;
};
_177.difference=_189(function(_211,rest){
rest=_1f9(rest,true,true);
return _177.filter(_211,function(_212){
return !_177.contains(rest,_212);
});
});
_177.unzip=function(_213){
var _214=_213&&_177.max(_213,_194).length||0;
var _215=Array(_214);
for(var _216=0;_216<_214;_216++){
_215[_216]=_177.pluck(_213,_216);
}
return _215;
};
_177.zip=_189(_177.unzip);
_177.object=function(list,_217){
var _218={};
for(var i=0,_219=_194(list);i<_219;i++){
if(_217){
_218[list[i]]=_217[i];
}else{
_218[list[i][0]]=list[i][1];
}
}
return _218;
};
var _21a=function(dir){
return function(_21b,_21c,_21d){
_21c=cb(_21c,_21d);
var _21e=_194(_21b);
var _21f=dir>0?0:_21e-1;
for(;_21f>=0&&_21f<_21e;_21f+=dir){
if(_21c(_21b[_21f],_21f,_21b)){
return _21f;
}
}
return -1;
};
};
_177.findIndex=_21a(1);
_177.findLastIndex=_21a(-1);
_177.sortedIndex=function(_220,obj,_221,_222){
_221=cb(_221,_222,1);
var _223=_221(obj);
var low=0,high=_194(_220);
while(low<high){
var mid=Math.floor((low+high)/2);
if(_221(_220[mid])<_223){
low=mid+1;
}else{
high=mid;
}
}
return low;
};
var _224=function(dir,_225,_226){
return function(_227,item,idx){
var i=0,_228=_194(_227);
if(typeof idx=="number"){
if(dir>0){
i=idx>=0?idx:Math.max(idx+_228,i);
}else{
_228=idx>=0?Math.min(idx+1,_228):idx+_228+1;
}
}else{
if(_226&&idx&&_228){
idx=_226(_227,item);
return _227[idx]===item?idx:-1;
}
}
if(item!==item){
idx=_225(_171.call(_227,i,_228),_177.isNaN);
return idx>=0?idx+i:-1;
}
for(idx=dir>0?i:_228-1;idx>=0&&idx<_228;idx+=dir){
if(_227[idx]===item){
return idx;
}
}
return -1;
};
};
_177.indexOf=_224(1,_177.findIndex,_177.sortedIndex);
_177.lastIndexOf=_224(-1,_177.findLastIndex);
_177.range=function(_229,stop,step){
if(stop==null){
stop=_229||0;
_229=0;
}
if(!step){
step=stop<_229?-1:1;
}
var _22a=Math.max(Math.ceil((stop-_229)/step),0);
var _22b=Array(_22a);
for(var idx=0;idx<_22a;idx++,_229+=step){
_22b[idx]=_229;
}
return _22b;
};
_177.chunk=function(_22c,_22d){
if(_22d==null||_22d<1){
return [];
}
var _22e=[];
var i=0,_22f=_22c.length;
while(i<_22f){
_22e.push(_171.call(_22c,i,i+=_22d));
}
return _22e;
};
var _230=function(_231,_232,_233,_234,args){
if(!(_234 instanceof _232)){
return _231.apply(_233,args);
}
var self=_18d(_231.prototype);
var _235=_231.apply(self,args);
if(_177.isObject(_235)){
return _235;
}
return self;
};
_177.bind=_189(function(func,_236,args){
if(!_177.isFunction(func)){
throw new TypeError("Bind must be called on a function");
}
var _237=_189(function(_238){
return _230(func,_237,_236,this,args.concat(_238));
});
return _237;
});
_177.partial=_189(function(func,_239){
var _23a=_177.partial.placeholder;
var _23b=function(){
var _23c=0,_23d=_239.length;
var args=Array(_23d);
for(var i=0;i<_23d;i++){
args[i]=_239[i]===_23a?arguments[_23c++]:_239[i];
}
while(_23c<arguments.length){
args.push(arguments[_23c++]);
}
return _230(func,_23b,this,this,args);
};
return _23b;
});
_177.partial.placeholder=_177;
_177.bindAll=_189(function(obj,keys){
keys=_1f9(keys,false,false);
var _23e=keys.length;
if(_23e<1){
throw new Error("bindAll must be passed function names");
}
while(_23e--){
var key=keys[_23e];
obj[key]=_177.bind(obj[key],obj);
}
});
_177.memoize=function(func,_23f){
var _240=function(key){
var _241=_240.cache;
var _242=""+(_23f?_23f.apply(this,arguments):key);
if(!has(_241,_242)){
_241[_242]=func.apply(this,arguments);
}
return _241[_242];
};
_240.cache={};
return _240;
};
_177.delay=_189(function(func,wait,args){
return setTimeout(function(){
return func.apply(null,args);
},wait);
});
_177.defer=_177.partial(_177.delay,_177,1);
_177.throttle=function(func,wait,_243){
var _244,_245,args,_246;
var _247=0;
if(!_243){
_243={};
}
var _248=function(){
_247=_243.leading===false?0:_177.now();
_244=null;
_246=func.apply(_245,args);
if(!_244){
_245=args=null;
}
};
var _249=function(){
var now=_177.now();
if(!_247&&_243.leading===false){
_247=now;
}
var _24a=wait-(now-_247);
_245=this;
args=arguments;
if(_24a<=0||_24a>wait){
if(_244){
clearTimeout(_244);
_244=null;
}
_247=now;
_246=func.apply(_245,args);
if(!_244){
_245=args=null;
}
}else{
if(!_244&&_243.trailing!==false){
_244=setTimeout(_248,_24a);
}
}
return _246;
};
_249.cancel=function(){
clearTimeout(_244);
_247=0;
_244=_245=args=null;
};
return _249;
};
_177.debounce=function(func,wait,_24b){
var _24c,_24d;
var _24e=function(_24f,args){
_24c=null;
if(args){
_24d=func.apply(_24f,args);
}
};
var _250=_189(function(args){
if(_24c){
clearTimeout(_24c);
}
if(_24b){
var _251=!_24c;
_24c=setTimeout(_24e,wait);
if(_251){
_24d=func.apply(this,args);
}
}else{
_24c=_177.delay(_24e,wait,this,args);
}
return _24d;
});
_250.cancel=function(){
clearTimeout(_24c);
_24c=null;
};
return _250;
};
_177.wrap=function(func,_252){
return _177.partial(_252,func);
};
_177.negate=function(_253){
return function(){
return !_253.apply(this,arguments);
};
};
_177.compose=function(){
var args=arguments;
var _254=args.length-1;
return function(){
var i=_254;
var _255=args[_254].apply(this,arguments);
while(i--){
_255=args[i].call(this,_255);
}
return _255;
};
};
_177.after=function(_256,func){
return function(){
if(--_256<1){
return func.apply(this,arguments);
}
};
};
_177.before=function(_257,func){
var memo;
return function(){
if(--_257>0){
memo=func.apply(this,arguments);
}
if(_257<=1){
func=null;
}
return memo;
};
};
_177.once=_177.partial(_177.before,2);
_177.restArguments=_189;
var _258=!{toString:null}.propertyIsEnumerable("toString");
var _259=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];
var _25a=function(obj,keys){
var _25b=_259.length;
var _25c=obj.constructor;
var _25d=_177.isFunction(_25c)&&_25c.prototype||_16f;
var prop="constructor";
if(has(obj,prop)&&!_177.contains(keys,prop)){
keys.push(prop);
}
while(_25b--){
prop=_259[_25b];
if(prop in obj&&obj[prop]!==_25d[prop]&&!_177.contains(keys,prop)){
keys.push(prop);
}
}
};
_177.keys=function(obj){
if(!_177.isObject(obj)){
return [];
}
if(_175){
return _175(obj);
}
var keys=[];
for(var key in obj){
if(has(obj,key)){
keys.push(key);
}
}
if(_258){
_25a(obj,keys);
}
return keys;
};
_177.allKeys=function(obj){
if(!_177.isObject(obj)){
return [];
}
var keys=[];
for(var key in obj){
keys.push(key);
}
if(_258){
_25a(obj,keys);
}
return keys;
};
_177.values=function(obj){
var keys=_177.keys(obj);
var _25e=keys.length;
var _25f=Array(_25e);
for(var i=0;i<_25e;i++){
_25f[i]=obj[keys[i]];
}
return _25f;
};
_177.mapObject=function(obj,_260,_261){
_260=cb(_260,_261);
var keys=_177.keys(obj),_262=keys.length,_263={};
for(var _264=0;_264<_262;_264++){
var _265=keys[_264];
_263[_265]=_260(obj[_265],_265,obj);
}
return _263;
};
_177.pairs=function(obj){
var keys=_177.keys(obj);
var _266=keys.length;
var _267=Array(_266);
for(var i=0;i<_266;i++){
_267[i]=[keys[i],obj[keys[i]]];
}
return _267;
};
_177.invert=function(obj){
var _268={};
var keys=_177.keys(obj);
for(var i=0,_269=keys.length;i<_269;i++){
_268[obj[keys[i]]]=keys[i];
}
return _268;
};
_177.functions=_177.methods=function(obj){
var _26a=[];
for(var key in obj){
if(_177.isFunction(obj[key])){
_26a.push(key);
}
}
return _26a.sort();
};
var _26b=function(_26c,_26d){
return function(obj){
var _26e=arguments.length;
if(_26d){
obj=Object(obj);
}
if(_26e<2||obj==null){
return obj;
}
for(var _26f=1;_26f<_26e;_26f++){
var _270=arguments[_26f],keys=_26c(_270),l=keys.length;
for(var i=0;i<l;i++){
var key=keys[i];
if(!_26d||obj[key]===void 0){
obj[key]=_270[key];
}
}
}
return obj;
};
};
_177.extend=_26b(_177.allKeys);
_177.extendOwn=_177.assign=_26b(_177.keys);
_177.findKey=function(obj,_271,_272){
_271=cb(_271,_272);
var keys=_177.keys(obj),key;
for(var i=0,_273=keys.length;i<_273;i++){
key=keys[i];
if(_271(obj[key],key,obj)){
return key;
}
}
};
var _274=function(_275,key,obj){
return key in obj;
};
_177.pick=_189(function(obj,keys){
var _276={},_277=keys[0];
if(obj==null){
return _276;
}
if(_177.isFunction(_277)){
if(keys.length>1){
_277=_178(_277,keys[1]);
}
keys=_177.allKeys(obj);
}else{
_277=_274;
keys=_1f9(keys,false,false);
obj=Object(obj);
}
for(var i=0,_278=keys.length;i<_278;i++){
var key=keys[i];
var _279=obj[key];
if(_277(_279,key,obj)){
_276[key]=_279;
}
}
return _276;
});
_177.omit=_189(function(obj,keys){
var _27a=keys[0],_27b;
if(_177.isFunction(_27a)){
_27a=_177.negate(_27a);
if(keys.length>1){
_27b=keys[1];
}
}else{
keys=_177.map(_1f9(keys,false,false),String);
_27a=function(_27c,key){
return !_177.contains(keys,key);
};
}
return _177.pick(obj,_27a,_27b);
});
_177.defaults=_26b(_177.allKeys,true);
_177.create=function(_27d,_27e){
var _27f=_18d(_27d);
if(_27e){
_177.extendOwn(_27f,_27e);
}
return _27f;
};
_177.clone=function(obj){
if(!_177.isObject(obj)){
return obj;
}
return _177.isArray(obj)?obj.slice():_177.extend({},obj);
};
_177.tap=function(obj,_280){
_280(obj);
return obj;
};
_177.isMatch=function(_281,_282){
var keys=_177.keys(_282),_283=keys.length;
if(_281==null){
return !_283;
}
var obj=Object(_281);
for(var i=0;i<_283;i++){
var key=keys[i];
if(_282[key]!==obj[key]||!(key in obj)){
return false;
}
}
return true;
};
var eq,_284;
eq=function(a,b,_285,_286){
if(a===b){
return a!==0||1/a===1/b;
}
if(a==null||b==null){
return false;
}
if(a!==a){
return b!==b;
}
var type=typeof a;
if(type!=="function"&&type!=="object"&&typeof b!="object"){
return false;
}
return _284(a,b,_285,_286);
};
_284=function(a,b,_287,_288){
if(a instanceof _177){
a=a._wrapped;
}
if(b instanceof _177){
b=b._wrapped;
}
var _289=_172.call(a);
if(_289!==_172.call(b)){
return false;
}
switch(_289){
case "[object RegExp]":
case "[object String]":
return ""+a===""+b;
case "[object Number]":
if(+a!==+a){
return +b!==+b;
}
return +a===0?1/+a===1/b:+a===+b;
case "[object Date]":
case "[object Boolean]":
return +a===+b;
case "[object Symbol]":
return _170.valueOf.call(a)===_170.valueOf.call(b);
}
var _28a=_289==="[object Array]";
if(!_28a){
if(typeof a!="object"||typeof b!="object"){
return false;
}
var _28b=a.constructor,_28c=b.constructor;
if(_28b!==_28c&&!(_177.isFunction(_28b)&&_28b instanceof _28b&&_177.isFunction(_28c)&&_28c instanceof _28c)&&("constructor" in a&&"constructor" in b)){
return false;
}
}
_287=_287||[];
_288=_288||[];
var _28d=_287.length;
while(_28d--){
if(_287[_28d]===a){
return _288[_28d]===b;
}
}
_287.push(a);
_288.push(b);
if(_28a){
_28d=a.length;
if(_28d!==b.length){
return false;
}
while(_28d--){
if(!eq(a[_28d],b[_28d],_287,_288)){
return false;
}
}
}else{
var keys=_177.keys(a),key;
_28d=keys.length;
if(_177.keys(b).length!==_28d){
return false;
}
while(_28d--){
key=keys[_28d];
if(!(has(b,key)&&eq(a[key],b[key],_287,_288))){
return false;
}
}
}
_287.pop();
_288.pop();
return true;
};
_177.isEqual=function(a,b){
return eq(a,b);
};
_177.isEmpty=function(obj){
if(obj==null){
return true;
}
if(_195(obj)&&(_177.isArray(obj)||_177.isString(obj)||_177.isArguments(obj))){
return obj.length===0;
}
return _177.keys(obj).length===0;
};
_177.isElement=function(obj){
return !!(obj&&obj.nodeType===1);
};
_177.isArray=_174||function(obj){
return _172.call(obj)==="[object Array]";
};
_177.isObject=function(obj){
var type=typeof obj;
return type==="function"||type==="object"&&!!obj;
};
_177.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(name){
_177["is"+name]=function(obj){
return _172.call(obj)==="[object "+name+"]";
};
});
if(!_177.isArguments(arguments)){
_177.isArguments=function(obj){
return has(obj,"callee");
};
}
var _28e=root.document&&root.document.childNodes;
if(typeof /./!="function"&&typeof Int8Array!="object"&&typeof _28e!="function"){
_177.isFunction=function(obj){
return typeof obj=="function"||false;
};
}
_177.isFinite=function(obj){
return !_177.isSymbol(obj)&&isFinite(obj)&&!isNaN(parseFloat(obj));
};
_177.isNaN=function(obj){
return _177.isNumber(obj)&&isNaN(obj);
};
_177.isBoolean=function(obj){
return obj===true||obj===false||_172.call(obj)==="[object Boolean]";
};
_177.isNull=function(obj){
return obj===null;
};
_177.isUndefined=function(obj){
return obj===void 0;
};
_177.has=function(obj,path){
if(!_177.isArray(path)){
return has(obj,path);
}
var _28f=path.length;
for(var i=0;i<_28f;i++){
var key=path[i];
if(obj==null||!_173.call(obj,key)){
return false;
}
obj=obj[key];
}
return !!_28f;
};
_177.noConflict=function(){
root._=_16d;
return this;
};
_177.identity=function(_290){
return _290;
};
_177.constant=function(_291){
return function(){
return _291;
};
};
_177.noop=function(){
};
_177.property=function(path){
if(!_177.isArray(path)){
return _190(path);
}
return function(obj){
return _191(obj,path);
};
};
_177.propertyOf=function(obj){
if(obj==null){
return function(){
};
}
return function(path){
return !_177.isArray(path)?obj[path]:_191(obj,path);
};
};
_177.matcher=_177.matches=function(_292){
_292=_177.extendOwn({},_292);
return function(obj){
return _177.isMatch(obj,_292);
};
};
_177.times=function(n,_293,_294){
var _295=Array(Math.max(0,n));
_293=_178(_293,_294,1);
for(var i=0;i<n;i++){
_295[i]=_293(i);
}
return _295;
};
_177.random=function(min,max){
if(max==null){
max=min;
min=0;
}
return min+Math.floor(Math.random()*(max-min+1));
};
_177.now=Date.now||function(){
return new Date().getTime();
};
var _296={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#x27;","`":"&#x60;"};
var _297=_177.invert(_296);
var _298=function(map){
var _299=function(_29a){
return map[_29a];
};
var _29b="(?:"+_177.keys(map).join("|")+")";
var _29c=RegExp(_29b);
var _29d=RegExp(_29b,"g");
return function(_29e){
_29e=_29e==null?"":""+_29e;
return _29c.test(_29e)?_29e.replace(_29d,_299):_29e;
};
};
_177.escape=_298(_296);
_177.unescape=_298(_297);
_177.result=function(obj,path,_29f){
if(!_177.isArray(path)){
path=[path];
}
var _2a0=path.length;
if(!_2a0){
return _177.isFunction(_29f)?_29f.call(obj):_29f;
}
for(var i=0;i<_2a0;i++){
var prop=obj==null?void 0:obj[path[i]];
if(prop===void 0){
prop=_29f;
i=_2a0;
}
obj=_177.isFunction(prop)?prop.call(obj):prop;
}
return obj;
};
var _2a1=0;
_177.uniqueId=function(_2a2){
var id=++_2a1+"";
return _2a2?_2a2+id:id;
};
_177.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
var _2a3=/(.)^/;
var _2a4={"'":"'","\\":"\\","\r":"r","\n":"n","?":"u2028","?":"u2029"};
var _2a5=/\\|'|\r|\n|\u2028|\u2029/g;
var _2a6=function(_2a7){
return "\\"+_2a4[_2a7];
};
_177.template=function(text,_2a8,_2a9){
if(!_2a8&&_2a9){
_2a8=_2a9;
}
_2a8=_177.defaults({},_2a8,_177.templateSettings);
var _2aa=RegExp([(_2a8.escape||_2a3).source,(_2a8.interpolate||_2a3).source,(_2a8.evaluate||_2a3).source].join("|")+"|$","g");
var _2ab=0;
var _2ac="__p+='";
text.replace(_2aa,function(_2ad,_2ae,_2af,_2b0,_2b1){
_2ac+=text.slice(_2ab,_2b1).replace(_2a5,_2a6);
_2ab=_2b1+_2ad.length;
if(_2ae){
_2ac+="'+\n((__t=("+_2ae+"))==null?'':_.escape(__t))+\n'";
}else{
if(_2af){
_2ac+="'+\n((__t=("+_2af+"))==null?'':__t)+\n'";
}else{
if(_2b0){
_2ac+="';\n"+_2b0+"\n__p+='";
}
}
}
return _2ad;
});
_2ac+="';\n";
if(!_2a8.variable){
_2ac="with(obj||{}){\n"+_2ac+"}\n";
}
_2ac="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+_2ac+"return __p;\n";
var _2b2;
try{
_2b2=new Function(_2a8.variable||"obj","_",_2ac);
}
catch(e){
e.source=_2ac;
throw e;
}
var _2b3=function(data){
return _2b2.call(this,data,_177);
};
var _2b4=_2a8.variable||"obj";
_2b3.source="function("+_2b4+"){\n"+_2ac+"}";
return _2b3;
};
_177.chain=function(obj){
var _2b5=_177(obj);
_2b5._chain=true;
return _2b5;
};
var _2b6=function(_2b7,obj){
return _2b7._chain?_177(obj).chain():obj;
};
_177.mixin=function(obj){
_177.each(_177.functions(obj),function(name){
var func=_177[name]=obj[name];
_177.prototype[name]=function(){
var args=[this._wrapped];
push.apply(args,arguments);
return _2b6(this,func.apply(_177,args));
};
});
return _177;
};
_177.mixin(_177);
_177.each(["pop","push","reverse","shift","sort","splice","unshift"],function(name){
var _2b8=_16e[name];
_177.prototype[name]=function(){
var obj=this._wrapped;
_2b8.apply(obj,arguments);
if((name==="shift"||name==="splice")&&obj.length===0){
delete obj[0];
}
return _2b6(this,obj);
};
});
_177.each(["concat","join","slice"],function(name){
var _2b9=_16e[name];
_177.prototype[name]=function(){
return _2b6(this,_2b9.apply(this._wrapped,arguments));
};
});
_177.prototype.value=function(){
return this._wrapped;
};
_177.prototype.valueOf=_177.prototype.toJSON=_177.prototype.value;
_177.prototype.toString=function(){
return String(this._wrapped);
};
if(typeof define=="function"&&define.amd){
define("underscore",[],function(){
return _177;
});
}
}());
(function(_2ba){
var root=(typeof self=="object"&&self.self===self&&self)||(typeof global=="object"&&global.global===global&&global);
if(typeof define==="function"&&define.amd){
define(["conSense/lib/underscore","jquery","exports"],function(_2bb,$,_2bc){
root.Backbone=_2ba(root,_2bc,_2bb,$);
});
}else{
if(typeof exports!=="undefined"){
var _2bd=require("conSense/lib/underscore"),$;
try{
$=require("jquery");
}
catch(e){
}
_2ba(root,exports,_2bd,$);
}else{
root.Backbone=_2ba(root,{},root._,(root.jQuery||root.Zepto||root.ender||root.$));
}
}
})(function(root,_2be,_2bf,$){
var _2c0=root.Backbone;
var _2c1=Array.prototype.slice;
_2be.VERSION="1.3.3";
_2be.$=$;
_2be.noConflict=function(){
root.Backbone=_2c0;
return this;
};
_2be.emulateHTTP=false;
_2be.emulateJSON=false;
var _2c2=_2be.Events={};
var _2c3=/\s+/;
var _2c4;
var _2c5=function(_2c6,_2c7,name,_2c8,opts){
var i=0,_2c9;
if(name&&typeof name==="object"){
if(_2c8!==void 0&&"context" in opts&&opts.context===void 0){
opts.context=_2c8;
}
for(_2c9=_2bf.keys(name);i<_2c9.length;i++){
_2c7=_2c5(_2c6,_2c7,_2c9[i],name[_2c9[i]],opts);
}
}else{
if(name&&_2c3.test(name)){
for(_2c9=name.split(_2c3);i<_2c9.length;i++){
_2c7=_2c6(_2c7,_2c9[i],_2c8,opts);
}
}else{
_2c7=_2c6(_2c7,name,_2c8,opts);
}
}
return _2c7;
};
_2c2.on=function(name,_2ca,_2cb){
this._events=_2c5(_2cc,this._events||{},name,_2ca,{context:_2cb,ctx:this,listening:_2c4});
if(_2c4){
var _2cd=this._listeners||(this._listeners={});
_2cd[_2c4.id]=_2c4;
_2c4.interop=false;
}
return this;
};
_2c2.listenTo=function(obj,name,_2ce){
if(!obj){
return this;
}
var id=obj._listenId||(obj._listenId=_2bf.uniqueId("l"));
var _2cf=this._listeningTo||(this._listeningTo={});
var _2d0=_2c4=_2cf[id];
if(!_2d0){
this._listenId||(this._listenId=_2bf.uniqueId("l"));
_2d0=_2c4=_2cf[id]=new _2d1(this,obj);
}
var _2d2=_2d3(obj,name,_2ce,this);
_2c4=void 0;
if(_2d2){
throw _2d2;
}
if(_2d0.interop){
_2d0.on(name,_2ce);
}
return this;
};
var _2cc=function(_2d4,name,_2d5,_2d6){
if(_2d5){
var _2d7=_2d4[name]||(_2d4[name]=[]);
var _2d8=_2d6.context,ctx=_2d6.ctx,_2d9=_2d6.listening;
if(_2d9){
_2d9.count++;
}
_2d7.push({callback:_2d5,context:_2d8,ctx:_2d8||ctx,listening:_2d9});
}
return _2d4;
};
var _2d3=function(obj,name,_2da,_2db){
try{
obj.on(name,_2da,_2db);
}
catch(e){
return e;
}
};
_2c2.off=function(name,_2dc,_2dd){
if(!this._events){
return this;
}
this._events=_2c5(_2de,this._events,name,_2dc,{context:_2dd,listeners:this._listeners});
return this;
};
_2c2.stopListening=function(obj,name,_2df){
var _2e0=this._listeningTo;
if(!_2e0){
return this;
}
var ids=obj?[obj._listenId]:_2bf.keys(_2e0);
for(var i=0;i<ids.length;i++){
var _2e1=_2e0[ids[i]];
if(!_2e1){
break;
}
_2e1.obj.off(name,_2df,this);
if(_2e1.interop){
_2e1.off(name,_2df);
}
}
if(_2bf.isEmpty(_2e0)){
this._listeningTo=void 0;
}
return this;
};
var _2de=function(_2e2,name,_2e3,_2e4){
if(!_2e2){
return;
}
var _2e5=_2e4.context,_2e6=_2e4.listeners;
var i=0,_2e7;
if(!name&&!_2e5&&!_2e3){
for(_2e7=_2bf.keys(_2e6);i<_2e7.length;i++){
_2e6[_2e7[i]].cleanup();
}
return;
}
_2e7=name?[name]:_2bf.keys(_2e2);
for(;i<_2e7.length;i++){
name=_2e7[i];
var _2e8=_2e2[name];
if(!_2e8){
break;
}
var _2e9=[];
for(var j=0;j<_2e8.length;j++){
var _2ea=_2e8[j];
if(_2e3&&_2e3!==_2ea.callback&&_2e3!==_2ea.callback._callback||_2e5&&_2e5!==_2ea.context){
_2e9.push(_2ea);
}else{
var _2eb=_2ea.listening;
if(_2eb){
_2eb.off(name,_2e3);
}
}
}
if(_2e9.length){
_2e2[name]=_2e9;
}else{
delete _2e2[name];
}
}
return _2e2;
};
_2c2.once=function(name,_2ec,_2ed){
var _2ee=_2c5(_2ef,{},name,_2ec,this.off.bind(this));
if(typeof name==="string"&&_2ed==null){
_2ec=void 0;
}
return this.on(_2ee,_2ec,_2ed);
};
_2c2.listenToOnce=function(obj,name,_2f0){
var _2f1=_2c5(_2ef,{},name,_2f0,this.stopListening.bind(this,obj));
return this.listenTo(obj,_2f1);
};
var _2ef=function(map,name,_2f2,_2f3){
if(_2f2){
var once=map[name]=_2bf.once(function(){
_2f3(name,once);
_2f2.apply(this,arguments);
});
once._callback=_2f2;
}
return map;
};
_2c2.trigger=function(name){
if(!this._events){
return this;
}
var _2f4=Math.max(0,arguments.length-1);
var args=Array(_2f4);
for(var i=0;i<_2f4;i++){
args[i]=arguments[i+1];
}
_2c5(_2f5,this._events,name,void 0,args);
return this;
};
var _2f5=function(_2f6,name,_2f7,args){
if(_2f6){
var _2f8=_2f6[name];
var _2f9=_2f6.all;
if(_2f8&&_2f9){
_2f9=_2f9.slice();
}
if(_2f8){
_2fa(_2f8,args);
}
if(_2f9){
_2fa(_2f9,[name].concat(args));
}
}
return _2f6;
};
var _2fa=function(_2fb,args){
var ev,i=-1,l=_2fb.length,a1=args[0],a2=args[1],a3=args[2];
switch(args.length){
case 0:
while(++i<l){
(ev=_2fb[i]).callback.call(ev.ctx);
}
return;
case 1:
while(++i<l){
(ev=_2fb[i]).callback.call(ev.ctx,a1);
}
return;
case 2:
while(++i<l){
(ev=_2fb[i]).callback.call(ev.ctx,a1,a2);
}
return;
case 3:
while(++i<l){
(ev=_2fb[i]).callback.call(ev.ctx,a1,a2,a3);
}
return;
default:
while(++i<l){
(ev=_2fb[i]).callback.apply(ev.ctx,args);
}
return;
}
};
var _2d1=function(_2fc,obj){
this.id=_2fc._listenId;
this.listener=_2fc;
this.obj=obj;
this.interop=true;
this.count=0;
this._events=void 0;
};
_2d1.prototype.on=_2c2.on;
_2d1.prototype.off=function(name,_2fd){
var _2fe;
if(this.interop){
this._events=_2c5(_2de,this._events,name,_2fd,{context:void 0,listeners:void 0});
_2fe=!this._events;
}else{
this.count--;
_2fe=this.count===0;
}
if(_2fe){
this.cleanup();
}
};
_2d1.prototype.cleanup=function(){
delete this.listener._listeningTo[this.obj._listenId];
if(!this.interop){
delete this.obj._listeners[this.id];
}
};
_2c2.bind=_2c2.on;
_2c2.unbind=_2c2.off;
_2bf.extend(_2be,_2c2);
var _2ff=_2be.Model=function(_300,_301){
var _302=_300||{};
_301||(_301={});
this.preinitialize.apply(this,arguments);
this.cid=_2bf.uniqueId(this.cidPrefix);
this.attributes={};
if(_301.collection){
this.collection=_301.collection;
}
if(_301.parse){
_302=this.parse(_302,_301)||{};
}
var _303=_2bf.result(this,"defaults");
_302=_2bf.defaults(_2bf.extend({},_303,_302),_303);
this.set(_302,_301);
this.changed={};
this.initialize.apply(this,arguments);
};
_2bf.extend(_2ff.prototype,_2c2,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",preinitialize:function(){
},initialize:function(){
},toJSON:function(_304){
return _2bf.clone(this.attributes);
},sync:function(){
return _2be.sync.apply(this,arguments);
},get:function(attr){
return this.attributes[attr];
},escape:function(attr){
return _2bf.escape(this.get(attr));
},has:function(attr){
return this.get(attr)!=null;
},matches:function(_305){
return !!_2bf.iteratee(_305,this)(this.attributes);
},set:function(key,val,_306){
if(key==null){
return this;
}
var _307;
if(typeof key==="object"){
_307=key;
_306=val;
}else{
(_307={})[key]=val;
}
_306||(_306={});
if(!this._validate(_307,_306)){
return false;
}
var _308=_306.unset;
var _309=_306.silent;
var _30a=[];
var _30b=this._changing;
this._changing=true;
if(!_30b){
this._previousAttributes=_2bf.clone(this.attributes);
this.changed={};
}
var _30c=this.attributes;
var _30d=this.changed;
var prev=this._previousAttributes;
for(var attr in _307){
val=_307[attr];
if(!_2bf.isEqual(_30c[attr],val)){
_30a.push(attr);
}
if(!_2bf.isEqual(prev[attr],val)){
_30d[attr]=val;
}else{
delete _30d[attr];
}
_308?delete _30c[attr]:_30c[attr]=val;
}
if(this.idAttribute in _307){
this.id=this.get(this.idAttribute);
}
if(!_309){
if(_30a.length){
this._pending=_306;
}
for(var i=0;i<_30a.length;i++){
this.trigger("change:"+_30a[i],this,_30c[_30a[i]],_306);
}
}
if(_30b){
return this;
}
if(!_309){
while(this._pending){
_306=this._pending;
this._pending=false;
this.trigger("change",this,_306);
}
}
this._pending=false;
this._changing=false;
return this;
},unset:function(attr,_30e){
return this.set(attr,void 0,_2bf.extend({},_30e,{unset:true}));
},clear:function(_30f){
var _310={};
for(var key in this.attributes){
_310[key]=void 0;
}
return this.set(_310,_2bf.extend({},_30f,{unset:true}));
},hasChanged:function(attr){
if(attr==null){
return !_2bf.isEmpty(this.changed);
}
return _2bf.has(this.changed,attr);
},changedAttributes:function(diff){
if(!diff){
return this.hasChanged()?_2bf.clone(this.changed):false;
}
var old=this._changing?this._previousAttributes:this.attributes;
var _311={};
var _312;
for(var attr in diff){
var val=diff[attr];
if(_2bf.isEqual(old[attr],val)){
continue;
}
_311[attr]=val;
_312=true;
}
return _312?_311:false;
},previous:function(attr){
if(attr==null||!this._previousAttributes){
return null;
}
return this._previousAttributes[attr];
},previousAttributes:function(){
return _2bf.clone(this._previousAttributes);
},fetch:function(_313){
_313=_2bf.extend({parse:true},_313);
var _314=this;
var _315=_313.success;
_313.success=function(resp){
var _316=_313.parse?_314.parse(resp,_313):resp;
if(!_314.set(_316,_313)){
return false;
}
if(_315){
_315.call(_313.context,_314,resp,_313);
}
_314.trigger("sync",_314,resp,_313);
};
_317(this,_313);
return this.sync("read",this,_313);
},save:function(key,val,_318){
var _319;
if(key==null||typeof key==="object"){
_319=key;
_318=val;
}else{
(_319={})[key]=val;
}
_318=_2bf.extend({validate:true,parse:true},_318);
var wait=_318.wait;
if(_319&&!wait){
if(!this.set(_319,_318)){
return false;
}
}else{
if(!this._validate(_319,_318)){
return false;
}
}
var _31a=this;
var _31b=_318.success;
var _31c=this.attributes;
_318.success=function(resp){
_31a.attributes=_31c;
var _31d=_318.parse?_31a.parse(resp,_318):resp;
if(wait){
_31d=_2bf.extend({},_319,_31d);
}
if(_31d&&!_31a.set(_31d,_318)){
return false;
}
if(_31b){
_31b.call(_318.context,_31a,resp,_318);
}
_31a.trigger("sync",_31a,resp,_318);
};
_317(this,_318);
if(_319&&wait){
this.attributes=_2bf.extend({},_31c,_319);
}
var _31e=this.isNew()?"create":(_318.patch?"patch":"update");
if(_31e==="patch"&&!_318.attrs){
_318.attrs=_319;
}
var xhr=this.sync(_31e,this,_318);
this.attributes=_31c;
return xhr;
},destroy:function(_31f){
_31f=_31f?_2bf.clone(_31f):{};
var _320=this;
var _321=_31f.success;
var wait=_31f.wait;
var _322=function(){
_320.stopListening();
_320.trigger("destroy",_320,_320.collection,_31f);
};
_31f.success=function(resp){
if(wait){
_322();
}
if(_321){
_321.call(_31f.context,_320,resp,_31f);
}
if(!_320.isNew()){
_320.trigger("sync",_320,resp,_31f);
}
};
var xhr=false;
if(this.isNew()){
_2bf.defer(_31f.success);
}else{
_317(this,_31f);
xhr=this.sync("delete",this,_31f);
}
if(!wait){
_322();
}
return xhr;
},url:function(){
var base=_2bf.result(this,"urlRoot")||_2bf.result(this.collection,"url")||_323();
if(this.isNew()){
return base;
}
var id=this.get(this.idAttribute);
return base.replace(/[^\/]$/,"$&/")+encodeURIComponent(id);
},parse:function(resp,_324){
return resp;
},clone:function(){
return new this.constructor(this.attributes);
},isNew:function(){
return !this.has(this.idAttribute);
},isValid:function(_325){
return this._validate({},_2bf.extend({},_325,{validate:true}));
},_validate:function(_326,_327){
if(!_327.validate||!this.validate){
return true;
}
_326=_2bf.extend({},this.attributes,_326);
var _328=this.validationError=this.validate(_326,_327)||null;
if(!_328){
return true;
}
this.trigger("invalid",this,_328,_2bf.extend(_327,{validationError:_328}));
return false;
}});
var _329=_2be.Collection=function(_32a,_32b){
_32b||(_32b={});
this.preinitialize.apply(this,arguments);
if(_32b.model){
this.model=_32b.model;
}
if(_32b.comparator!==void 0){
this.comparator=_32b.comparator;
}
this._reset();
this.initialize.apply(this,arguments);
if(_32a){
this.reset(_32a,_2bf.extend({silent:true},_32b));
}
};
var _32c={add:true,remove:true,merge:true};
var _32d={add:true,remove:false};
var _32e=function(_32f,_330,at){
at=Math.min(Math.max(at,0),_32f.length);
var tail=Array(_32f.length-at);
var _331=_330.length;
var i;
for(i=0;i<tail.length;i++){
tail[i]=_32f[i+at];
}
for(i=0;i<_331;i++){
_32f[i+at]=_330[i];
}
for(i=0;i<tail.length;i++){
_32f[i+_331+at]=tail[i];
}
};
_2bf.extend(_329.prototype,_2c2,{model:_2ff,preinitialize:function(){
},initialize:function(){
},toJSON:function(_332){
return this.map(function(_333){
return _333.toJSON(_332);
});
},sync:function(){
return _2be.sync.apply(this,arguments);
},add:function(_334,_335){
return this.set(_334,_2bf.extend({merge:false},_335,_32d));
},remove:function(_336,_337){
_337=_2bf.extend({},_337);
var _338=!_2bf.isArray(_336);
_336=_338?[_336]:_336.slice();
var _339=this._removeModels(_336,_337);
if(!_337.silent&&_339.length){
_337.changes={added:[],merged:[],removed:_339};
this.trigger("update",this,_337);
}
return _338?_339[0]:_339;
},set:function(_33a,_33b){
if(_33a==null){
return;
}
_33b=_2bf.extend({},_32c,_33b);
if(_33b.parse&&!this._isModel(_33a)){
_33a=this.parse(_33a,_33b)||[];
}
var _33c=!_2bf.isArray(_33a);
_33a=_33c?[_33a]:_33a.slice();
var at=_33b.at;
if(at!=null){
at=+at;
}
if(at>this.length){
at=this.length;
}
if(at<0){
at+=this.length+1;
}
var set=[];
var _33d=[];
var _33e=[];
var _33f=[];
var _340={};
var add=_33b.add;
var _341=_33b.merge;
var _342=_33b.remove;
var sort=false;
var _343=this.comparator&&at==null&&_33b.sort!==false;
var _344=_2bf.isString(this.comparator)?this.comparator:null;
var _345,i;
for(i=0;i<_33a.length;i++){
_345=_33a[i];
var _346=this.get(_345);
if(_346){
if(_341&&_345!==_346){
var _347=this._isModel(_345)?_345.attributes:_345;
if(_33b.parse){
_347=_346.parse(_347,_33b);
}
_346.set(_347,_33b);
_33e.push(_346);
if(_343&&!sort){
sort=_346.hasChanged(_344);
}
}
if(!_340[_346.cid]){
_340[_346.cid]=true;
set.push(_346);
}
_33a[i]=_346;
}else{
if(add){
_345=_33a[i]=this._prepareModel(_345,_33b);
if(_345){
_33d.push(_345);
this._addReference(_345,_33b);
_340[_345.cid]=true;
set.push(_345);
}
}
}
}
if(_342){
for(i=0;i<this.length;i++){
_345=this.models[i];
if(!_340[_345.cid]){
_33f.push(_345);
}
}
if(_33f.length){
this._removeModels(_33f,_33b);
}
}
var _348=false;
var _349=!_343&&add&&_342;
if(set.length&&_349){
_348=this.length!==set.length||_2bf.some(this.models,function(m,_34a){
return m!==set[_34a];
});
this.models.length=0;
_32e(this.models,set,0);
this.length=this.models.length;
}else{
if(_33d.length){
if(_343){
sort=true;
}
_32e(this.models,_33d,at==null?this.length:at);
this.length=this.models.length;
}
}
if(sort){
this.sort({silent:true});
}
if(!_33b.silent){
for(i=0;i<_33d.length;i++){
if(at!=null){
_33b.index=at+i;
}
_345=_33d[i];
_345.trigger("add",_345,this,_33b);
}
if(sort||_348){
this.trigger("sort",this,_33b);
}
if(_33d.length||_33f.length||_33e.length){
_33b.changes={added:_33d,removed:_33f,merged:_33e};
this.trigger("update",this,_33b);
}
}
return _33c?_33a[0]:_33a;
},reset:function(_34b,_34c){
_34c=_34c?_2bf.clone(_34c):{};
for(var i=0;i<this.models.length;i++){
this._removeReference(this.models[i],_34c);
}
_34c.previousModels=this.models;
this._reset();
_34b=this.add(_34b,_2bf.extend({silent:true},_34c));
if(!_34c.silent){
this.trigger("reset",this,_34c);
}
return _34b;
},push:function(_34d,_34e){
return this.add(_34d,_2bf.extend({at:this.length},_34e));
},pop:function(_34f){
var _350=this.at(this.length-1);
return this.remove(_350,_34f);
},unshift:function(_351,_352){
return this.add(_351,_2bf.extend({at:0},_352));
},shift:function(_353){
var _354=this.at(0);
return this.remove(_354,_353);
},slice:function(){
return _2c1.apply(this.models,arguments);
},get:function(obj){
if(obj==null){
return void 0;
}
return this._byId[obj]||this._byId[this.modelId(this._isModel(obj)?obj.attributes:obj)]||obj.cid&&this._byId[obj.cid];
},has:function(obj){
return this.get(obj)!=null;
},at:function(_355){
if(_355<0){
_355+=this.length;
}
return this.models[_355];
},where:function(_356,_357){
return this[_357?"find":"filter"](_356);
},findWhere:function(_358){
return this.where(_358,true);
},sort:function(_359){
var _35a=this.comparator;
if(!_35a){
throw new Error("Cannot sort a set without a comparator");
}
_359||(_359={});
var _35b=_35a.length;
if(_2bf.isFunction(_35a)){
_35a=_35a.bind(this);
}
if(_35b===1||_2bf.isString(_35a)){
this.models=this.sortBy(_35a);
}else{
this.models.sort(_35a);
}
if(!_359.silent){
this.trigger("sort",this,_359);
}
return this;
},pluck:function(attr){
return this.map(attr+"");
},fetch:function(_35c){
_35c=_2bf.extend({parse:true},_35c);
var _35d=_35c.success;
var _35e=this;
_35c.success=function(resp){
var _35f=_35c.reset?"reset":"set";
_35e[_35f](resp,_35c);
if(_35d){
_35d.call(_35c.context,_35e,resp,_35c);
}
_35e.trigger("sync",_35e,resp,_35c);
};
_317(this,_35c);
return this.sync("read",this,_35c);
},create:function(_360,_361){
_361=_361?_2bf.clone(_361):{};
var wait=_361.wait;
_360=this._prepareModel(_360,_361);
if(!_360){
return false;
}
if(!wait){
this.add(_360,_361);
}
var _362=this;
var _363=_361.success;
_361.success=function(m,resp,_364){
if(wait){
_362.add(m,_364);
}
if(_363){
_363.call(_364.context,m,resp,_364);
}
};
_360.save(null,_361);
return _360;
},parse:function(resp,_365){
return resp;
},clone:function(){
return new this.constructor(this.models,{model:this.model,comparator:this.comparator});
},modelId:function(_366){
return _366[this.model.prototype.idAttribute||"id"];
},values:function(){
return new _367(this,_368);
},keys:function(){
return new _367(this,_369);
},entries:function(){
return new _367(this,_36a);
},_reset:function(){
this.length=0;
this.models=[];
this._byId={};
},_prepareModel:function(_36b,_36c){
if(this._isModel(_36b)){
if(!_36b.collection){
_36b.collection=this;
}
return _36b;
}
_36c=_36c?_2bf.clone(_36c):{};
_36c.collection=this;
var _36d=new this.model(_36b,_36c);
if(!_36d.validationError){
return _36d;
}
this.trigger("invalid",this,_36d.validationError,_36c);
return false;
},_removeModels:function(_36e,_36f){
var _370=[];
for(var i=0;i<_36e.length;i++){
var _371=this.get(_36e[i]);
if(!_371){
continue;
}
var _372=this.indexOf(_371);
this.models.splice(_372,1);
this.length--;
delete this._byId[_371.cid];
var id=this.modelId(_371.attributes);
if(id!=null){
delete this._byId[id];
}
if(!_36f.silent){
_36f.index=_372;
_371.trigger("remove",_371,this,_36f);
}
_370.push(_371);
this._removeReference(_371,_36f);
}
return _370;
},_isModel:function(_373){
return _373 instanceof _2ff;
},_addReference:function(_374,_375){
this._byId[_374.cid]=_374;
var id=this.modelId(_374.attributes);
if(id!=null){
this._byId[id]=_374;
}
_374.on("all",this._onModelEvent,this);
},_removeReference:function(_376,_377){
delete this._byId[_376.cid];
var id=this.modelId(_376.attributes);
if(id!=null){
delete this._byId[id];
}
if(this===_376.collection){
delete _376.collection;
}
_376.off("all",this._onModelEvent,this);
},_onModelEvent:function(_378,_379,_37a,_37b){
if(_379){
if((_378==="add"||_378==="remove")&&_37a!==this){
return;
}
if(_378==="destroy"){
this.remove(_379,_37b);
}
if(_378==="change"){
var _37c=this.modelId(_379.previousAttributes());
var id=this.modelId(_379.attributes);
if(_37c!==id){
if(_37c!=null){
delete this._byId[_37c];
}
if(id!=null){
this._byId[id]=_379;
}
}
}
}
this.trigger.apply(this,arguments);
}});
var _37d=typeof Symbol==="function"&&Symbol.iterator;
if(_37d){
_329.prototype[_37d]=_329.prototype.values;
}
var _367=function(_37e,kind){
this._collection=_37e;
this._kind=kind;
this._index=0;
};
var _368=1;
var _369=2;
var _36a=3;
if(_37d){
_367.prototype[_37d]=function(){
return this;
};
}
_367.prototype.next=function(){
if(this._collection){
if(this._index<this._collection.length){
var _37f=this._collection.at(this._index);
this._index++;
var _380;
if(this._kind===_368){
_380=_37f;
}else{
var id=this._collection.modelId(_37f.attributes);
if(this._kind===_369){
_380=id;
}else{
_380=[id,_37f];
}
}
return {value:_380,done:false};
}
this._collection=void 0;
}
return {value:void 0,done:true};
};
var View=_2be.View=function(_381){
this.cid=_2bf.uniqueId("view");
this.preinitialize.apply(this,arguments);
_2bf.extend(this,_2bf.pick(_381,_382));
this._ensureElement();
this.initialize.apply(this,arguments);
};
var _383=/^(\S+)\s*(.*)$/;
var _382=["model","collection","el","id","attributes","className","tagName","events"];
_2bf.extend(View.prototype,_2c2,{tagName:"div",$:function(_384){
return this.$el.find(_384);
},preinitialize:function(){
},initialize:function(){
},render:function(){
return this;
},remove:function(){
this._removeElement();
this.stopListening();
return this;
},_removeElement:function(){
this.$el.remove();
},setElement:function(_385){
this.undelegateEvents();
this._setElement(_385);
this.delegateEvents();
return this;
},_setElement:function(el){
this.$el=el instanceof _2be.$?el:_2be.$(el);
this.el=this.$el[0];
},delegateEvents:function(_386){
_386||(_386=_2bf.result(this,"events"));
if(!_386){
return this;
}
this.undelegateEvents();
for(var key in _386){
var _387=_386[key];
if(!_2bf.isFunction(_387)){
_387=this[_387];
}
if(!_387){
continue;
}
var _388=key.match(_383);
this.delegate(_388[1],_388[2],_387.bind(this));
}
return this;
},delegate:function(_389,_38a,_38b){
this.$el.on(_389+".delegateEvents"+this.cid,_38a,_38b);
return this;
},undelegateEvents:function(){
if(this.$el){
this.$el.off(".delegateEvents"+this.cid);
}
return this;
},undelegate:function(_38c,_38d,_38e){
this.$el.off(_38c+".delegateEvents"+this.cid,_38d,_38e);
return this;
},_createElement:function(_38f){
return document.createElement(_38f);
},_ensureElement:function(){
if(!this.el){
var _390=_2bf.extend({},_2bf.result(this,"attributes"));
if(this.id){
_390.id=_2bf.result(this,"id");
}
if(this.className){
_390["class"]=_2bf.result(this,"className");
}
this.setElement(this._createElement(_2bf.result(this,"tagName")));
this._setAttributes(_390);
}else{
this.setElement(_2bf.result(this,"el"));
}
},_setAttributes:function(_391){
this.$el.attr(_391);
}});
var _392=function(base,_393,_394,_395){
switch(_393){
case 1:
return function(){
return base[_394](this[_395]);
};
case 2:
return function(_396){
return base[_394](this[_395],_396);
};
case 3:
return function(_397,_398){
return base[_394](this[_395],cb(_397,this),_398);
};
case 4:
return function(_399,_39a,_39b){
return base[_394](this[_395],cb(_399,this),_39a,_39b);
};
default:
return function(){
var args=_2c1.call(arguments);
args.unshift(this[_395]);
return base[_394].apply(base,args);
};
}
};
var _39c=function(_39d,base,_39e,_39f){
_2bf.each(_39e,function(_3a0,_3a1){
if(base[_3a1]){
_39d.prototype[_3a1]=_392(base,_3a0,_3a1,_39f);
}
});
};
var cb=function(_3a2,_3a3){
if(_2bf.isFunction(_3a2)){
return _3a2;
}
if(_2bf.isObject(_3a2)&&!_3a3._isModel(_3a2)){
return _3a4(_3a2);
}
if(_2bf.isString(_3a2)){
return function(_3a5){
return _3a5.get(_3a2);
};
}
return _3a2;
};
var _3a4=function(_3a6){
var _3a7=_2bf.matches(_3a6);
return function(_3a8){
return _3a7(_3a8.attributes);
};
};
var _3a9={forEach:3,each:3,map:3,collect:3,reduce:0,foldl:0,inject:0,reduceRight:0,foldr:0,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3,findIndex:3,findLastIndex:3};
var _3aa={keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};
_2bf.each([[_329,_3a9,"models"],[_2ff,_3aa,"attributes"]],function(_3ab){
var Base=_3ab[0],_3ac=_3ab[1],_3ad=_3ab[2];
Base.mixin=function(obj){
var _3ae=_2bf.reduce(_2bf.functions(obj),function(memo,name){
memo[name]=0;
return memo;
},{});
_39c(Base,obj,_3ae,_3ad);
};
_39c(Base,_2bf,_3ac,_3ad);
});
_2be.sync=function(_3af,_3b0,_3b1){
var type=_3b2[_3af];
_2bf.defaults(_3b1||(_3b1={}),{emulateHTTP:_2be.emulateHTTP,emulateJSON:_2be.emulateJSON});
var _3b3={type:type,dataType:"json"};
if(!_3b1.url){
_3b3.url=_2bf.result(_3b0,"url")||_323();
}
if(_3b1.data==null&&_3b0&&(_3af==="create"||_3af==="update"||_3af==="patch")){
_3b3.contentType="application/json";
_3b3.data=JSON.stringify(_3b1.attrs||_3b0.toJSON(_3b1));
}
if(_3b1.emulateJSON){
_3b3.contentType="application/x-www-form-urlencoded";
_3b3.data=_3b3.data?{model:_3b3.data}:{};
}
if(_3b1.emulateHTTP&&(type==="PUT"||type==="DELETE"||type==="PATCH")){
_3b3.type="POST";
if(_3b1.emulateJSON){
_3b3.data._method=type;
}
var _3b4=_3b1.beforeSend;
_3b1.beforeSend=function(xhr){
xhr.setRequestHeader("X-HTTP-Method-Override",type);
if(_3b4){
return _3b4.apply(this,arguments);
}
};
}
if(_3b3.type!=="GET"&&!_3b1.emulateJSON){
_3b3.processData=false;
}
var _3b5=_3b1.error;
_3b1.error=function(xhr,_3b6,_3b7){
_3b1.textStatus=_3b6;
_3b1.errorThrown=_3b7;
if(_3b5){
_3b5.call(_3b1.context,xhr,_3b6,_3b7);
}
};
var xhr=_3b1.xhr=_2be.ajax(_2bf.extend(_3b3,_3b1));
_3b0.trigger("request",_3b0,xhr,_3b1);
return xhr;
};
var _3b2={"create":"POST","update":"PUT","patch":"PATCH","delete":"DELETE","read":"GET"};
_2be.ajax=function(){
return _2be.$.ajax.apply(_2be.$,arguments);
};
var _3b8=_2be.Router=function(_3b9){
_3b9||(_3b9={});
this.preinitialize.apply(this,arguments);
if(_3b9.routes){
this.routes=_3b9.routes;
}
this._bindRoutes();
this.initialize.apply(this,arguments);
};
var _3ba=/\((.*?)\)/g;
var _3bb=/(\(\?)?:\w+/g;
var _3bc=/\*\w+/g;
var _3bd=/[\-{}\[\]+?.,\\\^$|#\s]/g;
_2bf.extend(_3b8.prototype,_2c2,{preinitialize:function(){
},initialize:function(){
},route:function(_3be,name,_3bf){
if(!_2bf.isRegExp(_3be)){
_3be=this._routeToRegExp(_3be);
}
if(_2bf.isFunction(name)){
_3bf=name;
name="";
}
if(!_3bf){
_3bf=this[name];
}
var _3c0=this;
_2be.history.route(_3be,function(_3c1){
var args=_3c0._extractParameters(_3be,_3c1);
if(_3c0.execute(_3bf,args,name)!==false){
_3c0.trigger.apply(_3c0,["route:"+name].concat(args));
_3c0.trigger("route",name,args);
_2be.history.trigger("route",_3c0,name,args);
}
});
return this;
},execute:function(_3c2,args,name){
if(_3c2){
_3c2.apply(this,args);
}
},navigate:function(_3c3,_3c4){
_2be.history.navigate(_3c3,_3c4);
return this;
},_bindRoutes:function(){
if(!this.routes){
return;
}
this.routes=_2bf.result(this,"routes");
var _3c5,_3c6=_2bf.keys(this.routes);
while((_3c5=_3c6.pop())!=null){
this.route(_3c5,this.routes[_3c5]);
}
},_routeToRegExp:function(_3c7){
_3c7=_3c7.replace(_3bd,"\\$&").replace(_3ba,"(?:$1)?").replace(_3bb,function(_3c8,_3c9){
return _3c9?_3c8:"([^/?]+)";
}).replace(_3bc,"([^?]*?)");
return new RegExp("^"+_3c7+"(?:\\?([\\s\\S]*))?$");
},_extractParameters:function(_3ca,_3cb){
var _3cc=_3ca.exec(_3cb).slice(1);
return _2bf.map(_3cc,function(_3cd,i){
if(i===_3cc.length-1){
return _3cd||null;
}
return _3cd?decodeURIComponent(_3cd):null;
});
}});
var _3ce=_2be.History=function(){
this.handlers=[];
this.checkUrl=this.checkUrl.bind(this);
if(typeof window!=="undefined"){
this.location=window.location;
this.history=window.history;
}
};
var _3cf=/^[#\/]|\s+$/g;
var _3d0=/^\/+|\/+$/g;
var _3d1=/#.*$/;
_3ce.started=false;
_2bf.extend(_3ce.prototype,_2c2,{interval:50,atRoot:function(){
var path=this.location.pathname.replace(/[^\/]$/,"$&/");
return path===this.root&&!this.getSearch();
},matchRoot:function(){
var path=this.decodeFragment(this.location.pathname);
var _3d2=path.slice(0,this.root.length-1)+"/";
return _3d2===this.root;
},decodeFragment:function(_3d3){
return decodeURI(_3d3.replace(/%25/g,"%2525"));
},getSearch:function(){
var _3d4=this.location.href.replace(/#.*/,"").match(/\?.+/);
return _3d4?_3d4[0]:"";
},getHash:function(_3d5){
var _3d6=(_3d5||this).location.href.match(/#(.*)$/);
return _3d6?_3d6[1]:"";
},getPath:function(){
var path=this.decodeFragment(this.location.pathname+this.getSearch()).slice(this.root.length-1);
return path.charAt(0)==="/"?path.slice(1):path;
},getFragment:function(_3d7){
if(_3d7==null){
if(this._usePushState||!this._wantsHashChange){
_3d7=this.getPath();
}else{
_3d7=this.getHash();
}
}
return _3d7.replace(_3cf,"");
},start:function(_3d8){
if(_3ce.started){
throw new Error("Backbone.history has already been started");
}
_3ce.started=true;
this.options=_2bf.extend({root:"/"},this.options,_3d8);
this.root=this.options.root;
this._wantsHashChange=this.options.hashChange!==false;
this._hasHashChange="onhashchange" in window&&(document.documentMode===void 0||document.documentMode>7);
this._useHashChange=this._wantsHashChange&&this._hasHashChange;
this._wantsPushState=!!this.options.pushState;
this._hasPushState=!!(this.history&&this.history.pushState);
this._usePushState=this._wantsPushState&&this._hasPushState;
this.fragment=this.getFragment();
this.root=("/"+this.root+"/").replace(_3d0,"/");
if(this._wantsHashChange&&this._wantsPushState){
if(!this._hasPushState&&!this.atRoot()){
var _3d9=this.root.slice(0,-1)||"/";
this.location.replace(_3d9+"#"+this.getPath());
return true;
}else{
if(this._hasPushState&&this.atRoot()){
this.navigate(this.getHash(),{replace:true});
}
}
}
if(!this._hasHashChange&&this._wantsHashChange&&!this._usePushState){
this.iframe=document.createElement("iframe");
this.iframe.src="javascript:0";
this.iframe.style.display="none";
this.iframe.tabIndex=-1;
var body=document.body;
var _3da=body.insertBefore(this.iframe,body.firstChild).contentWindow;
_3da.document.open();
_3da.document.close();
_3da.location.hash="#"+this.fragment;
}
var _3db=window.addEventListener||function(_3dc,_3dd){
return attachEvent("on"+_3dc,_3dd);
};
if(this._usePushState){
_3db("popstate",this.checkUrl,false);
}else{
if(this._useHashChange&&!this.iframe){
_3db("hashchange",this.checkUrl,false);
}else{
if(this._wantsHashChange){
this._checkUrlInterval=setInterval(this.checkUrl,this.interval);
}
}
}
if(!this.options.silent){
return this.loadUrl();
}
},stop:function(){
var _3de=window.removeEventListener||function(_3df,_3e0){
return detachEvent("on"+_3df,_3e0);
};
if(this._usePushState){
_3de("popstate",this.checkUrl,false);
}else{
if(this._useHashChange&&!this.iframe){
_3de("hashchange",this.checkUrl,false);
}
}
if(this.iframe){
document.body.removeChild(this.iframe);
this.iframe=null;
}
if(this._checkUrlInterval){
clearInterval(this._checkUrlInterval);
}
_3ce.started=false;
},route:function(_3e1,_3e2){
this.handlers.unshift({route:_3e1,callback:_3e2});
},checkUrl:function(e){
var _3e3=this.getFragment();
if(_3e3===this.fragment&&this.iframe){
_3e3=this.getHash(this.iframe.contentWindow);
}
if(_3e3===this.fragment){
return false;
}
if(this.iframe){
this.navigate(_3e3);
}
this.loadUrl();
},loadUrl:function(_3e4){
if(!this.matchRoot()){
return false;
}
_3e4=this.fragment=this.getFragment(_3e4);
return _2bf.some(this.handlers,function(_3e5){
if(_3e5.route.test(_3e4)){
_3e5.callback(_3e4);
return true;
}
});
},navigate:function(_3e6,_3e7){
if(!_3ce.started){
return false;
}
if(!_3e7||_3e7===true){
_3e7={trigger:!!_3e7};
}
_3e6=this.getFragment(_3e6||"");
var _3e8=this.root;
if(_3e6===""||_3e6.charAt(0)==="?"){
_3e8=_3e8.slice(0,-1)||"/";
}
var url=_3e8+_3e6;
_3e6=_3e6.replace(_3d1,"");
var _3e9=this.decodeFragment(_3e6);
if(this.fragment===_3e9){
return;
}
this.fragment=_3e9;
if(this._usePushState){
this.history[_3e7.replace?"replaceState":"pushState"]({},document.title,url);
}else{
if(this._wantsHashChange){
this._updateHash(this.location,_3e6,_3e7.replace);
if(this.iframe&&_3e6!==this.getHash(this.iframe.contentWindow)){
var _3ea=this.iframe.contentWindow;
if(!_3e7.replace){
_3ea.document.open();
_3ea.document.close();
}
this._updateHash(_3ea.location,_3e6,_3e7.replace);
}
}else{
return this.location.assign(url);
}
}
if(_3e7.trigger){
return this.loadUrl(_3e6);
}
},_updateHash:function(_3eb,_3ec,_3ed){
if(_3ed){
var href=_3eb.href.replace(/(javascript:|#).*$/,"");
_3eb.replace(href+"#"+_3ec);
}else{
_3eb.hash="#"+_3ec;
}
}});
_2be.history=new _3ce;
var _3ee=function(_3ef,_3f0){
var _3f1=this;
var _3f2;
if(_3ef&&_2bf.has(_3ef,"constructor")){
_3f2=_3ef.constructor;
}else{
_3f2=function(){
return _3f1.apply(this,arguments);
};
}
_2bf.extend(_3f2,_3f1,_3f0);
_3f2.prototype=_2bf.create(_3f1.prototype,_3ef);
_3f2.prototype.constructor=_3f2;
_3f2.__super__=_3f1.prototype;
return _3f2;
};
_2ff.extend=_329.extend=_3b8.extend=View.extend=_3ce.extend=_3ee;
var _323=function(){
throw new Error("A \"url\" property or function must be specified");
};
var _317=function(_3f3,_3f4){
var _3f5=_3f4.error;
_3f4.error=function(resp){
if(_3f5){
_3f5.call(_3f4.context,_3f3,resp,_3f4);
}
_3f3.trigger("error",_3f3,resp,_3f4);
};
};
return _2be;
});
var simpleClassesVersion="1.19";
function SimpleDebug(){
this.version=simpleClassesVersion;
this.messages="";
this.add=function(_3f6,_3f7){
this.messages+=_3f6+": "+_3f7+"\n";
};
this.print=function(){
alert(this.messages);
this.messages="";
};
this.alert=function(_3f8,_3f9){
alert(_3f8+": "+_3f9);
};
};
function SimpleUtilities(){
this.version=simpleClassesVersion;
this.DOM_ELEMENT_NODE=1;
this.DOM_ATTRIBUTE_NODE=2;
this.DOM_TEXT_NODE=3;
this.DOM_CDATA_SECTION_NODE=4;
this.DOM_ENTITY_REFERENCE_NODE=5;
this.DOM_ENTITY_NODE=6;
this.DOM_PROCESSING_INSTRUCTION_NODE=7;
this.DOM_COMMENT_NODE=8;
this.DOM_DOCUMENT_NODE=9;
this.DOM_DOCUMENT_TYPE_NODE=10;
this.DOM_DOCUMENT_FRAGMENT_NODE=11;
this.DOM_NOTATION_NODE=12;
this.randomSuffix=function(){
if(!conSense.debug){
return "";
}
return "?random_suffix="+this.random(3735928559);
};
this.random=function(_3fa){
if(_3fa<1){
return 1;
}
return Math.floor((Math.random()*_3fa)+1);
};
this.replaceAll=function(_3fb,_3fc){
var _3fd=this;
return _3fd.replace(new RegExp(_3fb,"g"),_3fc);
};
this.linkTo=function(dest){
document.location.href=dest;
};
this.formURI=function(_3fe,_3ff){
var _400=_3fe+"?";
var _401="";
if(_3ff.length===0){
return _3fe;
}
for(var i in _3ff){
_400+=_401+i+"="+_3ff[i];
_401="&";
}
return _400;
};
this.checkBrowser=function(){
if(!(document.all||document.getElementById)){
alert("SimpleUtilities.checkBrowser() error: Please upgrade to a more modern browser. This interactive web page will not operate properly.");
}
};
this.getDOMElement=function(_402){
var _403=document.all?document.all[_402]:document.getElementById(_402);
return _403;
};
this.getKeyName=function(_404){
if(!_404){
_404=window.event;
}
var _405=_404.keyCode;
var _406="Unknown";
switch(_405){
case 13:
_406="Enter";
break;
case 16:
_406="Shift";
break;
case 17:
_406="Ctrl";
break;
case 18:
_406="Alt";
break;
case 19:
_406="Pause";
break;
case 32:
_406="Space";
break;
case 8:
_406="Backspace";
break;
case 9:
_406="Tab";
break;
case 37:
_406="Arrow Left";
break;
case 38:
_406="Arrow Up";
break;
case 39:
_406="Arrow Right";
break;
case 40:
_406="Arrow Down";
break;
case 33:
_406="Page Up";
break;
case 34:
_406="Page Down";
break;
case 36:
_406="Home";
break;
case 35:
_406="End";
break;
case 45:
_406="Insert";
break;
case 46:
_406="Delete";
break;
case 91:
case 92:
_406="Win";
break;
case 93:
_406="Select";
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
_406="Fxx";
break;
case 144:
_406="Num Lock";
break;
case 145:
_406="Scroll Lock";
break;
case 20:
_406="Caps Lock";
break;
case 27:
_406="Esc";
break;
}
return _406;
};
this.trimString=function(str){
return (str+"").replace(/^\s*|\s*$/g,"");
};
this.HTML2Source=function(str){
return (str+"").replace(/</g,"&lt;").replace(/>/g,"&gt;");
};
this.HTMLDecode=function(s){
var out="";
if(s==null){
return;
}
var l=s.length;
for(var i=0;i<l;i++){
var ch=s.charAt(i);
if(ch==="&"){
var _407=s.indexOf(";",i+1);
if(_407>0){
var _408=s.substring(i+1,_407);
if(_408.length>1&&_408.charAt(0)==="#"){
if(_408.charAt(1)==="x"||_408.charAt(1)==="X"){
ch=String.fromCharCode(eval("0"+_408.substring(1)));
}else{
ch=String.fromCharCode(eval(_408.substring(1)));
}
}else{
switch(_408){
case "quot":
ch=String.fromCharCode(34);
break;
case "amp":
ch=String.fromCharCode(38);
break;
case "lt":
ch=String.fromCharCode(60);
break;
case "gt":
ch=String.fromCharCode(62);
break;
case "nbsp":
ch=String.fromCharCode(160);
break;
case "iexcl":
ch=String.fromCharCode(161);
break;
case "cent":
ch=String.fromCharCode(162);
break;
case "pound":
ch=String.fromCharCode(163);
break;
case "curren":
ch=String.fromCharCode(164);
break;
case "yen":
ch=String.fromCharCode(165);
break;
case "brvbar":
ch=String.fromCharCode(166);
break;
case "sect":
ch=String.fromCharCode(167);
break;
case "uml":
ch=String.fromCharCode(168);
break;
case "copy":
ch=String.fromCharCode(169);
break;
case "ordf":
ch=String.fromCharCode(170);
break;
case "laquo":
ch=String.fromCharCode(171);
break;
case "not":
ch=String.fromCharCode(172);
break;
case "shy":
ch=String.fromCharCode(173);
break;
case "reg":
ch=String.fromCharCode(174);
break;
case "macr":
ch=String.fromCharCode(175);
break;
case "deg":
ch=String.fromCharCode(176);
break;
case "plusmn":
ch=String.fromCharCode(177);
break;
case "sup2":
ch=String.fromCharCode(178);
break;
case "sup3":
ch=String.fromCharCode(179);
break;
case "acute":
ch=String.fromCharCode(180);
break;
case "micro":
ch=String.fromCharCode(181);
break;
case "para":
ch=String.fromCharCode(182);
break;
case "middot":
ch=String.fromCharCode(183);
break;
case "cedil":
ch=String.fromCharCode(184);
break;
case "sup1":
ch=String.fromCharCode(185);
break;
case "ordm":
ch=String.fromCharCode(186);
break;
case "raquo":
ch=String.fromCharCode(187);
break;
case "frac14":
ch=String.fromCharCode(188);
break;
case "frac12":
ch=String.fromCharCode(189);
break;
case "frac34":
ch=String.fromCharCode(190);
break;
case "iquest":
ch=String.fromCharCode(191);
break;
case "Agrave":
ch=String.fromCharCode(192);
break;
case "Aacute":
ch=String.fromCharCode(193);
break;
case "Acirc":
ch=String.fromCharCode(194);
break;
case "Atilde":
ch=String.fromCharCode(195);
break;
case "Auml":
ch=String.fromCharCode(196);
break;
case "Aring":
ch=String.fromCharCode(197);
break;
case "AElig":
ch=String.fromCharCode(198);
break;
case "Ccedil":
ch=String.fromCharCode(199);
break;
case "Egrave":
ch=String.fromCharCode(200);
break;
case "Eacute":
ch=String.fromCharCode(201);
break;
case "Ecirc":
ch=String.fromCharCode(202);
break;
case "Euml":
ch=String.fromCharCode(203);
break;
case "Igrave":
ch=String.fromCharCode(204);
break;
case "Iacute":
ch=String.fromCharCode(205);
break;
case "Icirc":
ch=String.fromCharCode(206);
break;
case "Iuml":
ch=String.fromCharCode(207);
break;
case "ETH":
ch=String.fromCharCode(208);
break;
case "Ntilde":
ch=String.fromCharCode(209);
break;
case "Ograve":
ch=String.fromCharCode(210);
break;
case "Oacute":
ch=String.fromCharCode(211);
break;
case "Ocirc":
ch=String.fromCharCode(212);
break;
case "Otilde":
ch=String.fromCharCode(213);
break;
case "Ouml":
ch=String.fromCharCode(214);
break;
case "times":
ch=String.fromCharCode(215);
break;
case "Oslash":
ch=String.fromCharCode(216);
break;
case "Ugrave":
ch=String.fromCharCode(217);
break;
case "Uacute":
ch=String.fromCharCode(218);
break;
case "Ucirc":
ch=String.fromCharCode(219);
break;
case "Uuml":
ch=String.fromCharCode(220);
break;
case "Yacute":
ch=String.fromCharCode(221);
break;
case "THORN":
ch=String.fromCharCode(222);
break;
case "szlig":
ch=String.fromCharCode(223);
break;
case "agrave":
ch=String.fromCharCode(224);
break;
case "aacute":
ch=String.fromCharCode(225);
break;
case "acirc":
ch=String.fromCharCode(226);
break;
case "atilde":
ch=String.fromCharCode(227);
break;
case "auml":
ch=String.fromCharCode(228);
break;
case "aring":
ch=String.fromCharCode(229);
break;
case "aelig":
ch=String.fromCharCode(230);
break;
case "ccedil":
ch=String.fromCharCode(231);
break;
case "egrave":
ch=String.fromCharCode(232);
break;
case "eacute":
ch=String.fromCharCode(233);
break;
case "ecirc":
ch=String.fromCharCode(234);
break;
case "euml":
ch=String.fromCharCode(235);
break;
case "igrave":
ch=String.fromCharCode(236);
break;
case "iacute":
ch=String.fromCharCode(237);
break;
case "icirc":
ch=String.fromCharCode(238);
break;
case "iuml":
ch=String.fromCharCode(239);
break;
case "eth":
ch=String.fromCharCode(240);
break;
case "ntilde":
ch=String.fromCharCode(241);
break;
case "ograve":
ch=String.fromCharCode(242);
break;
case "oacute":
ch=String.fromCharCode(243);
break;
case "ocirc":
ch=String.fromCharCode(244);
break;
case "otilde":
ch=String.fromCharCode(245);
break;
case "ouml":
ch=String.fromCharCode(246);
break;
case "divide":
ch=String.fromCharCode(247);
break;
case "oslash":
ch=String.fromCharCode(248);
break;
case "ugrave":
ch=String.fromCharCode(249);
break;
case "uacute":
ch=String.fromCharCode(250);
break;
case "ucirc":
ch=String.fromCharCode(251);
break;
case "uuml":
ch=String.fromCharCode(252);
break;
case "yacute":
ch=String.fromCharCode(253);
break;
case "thorn":
ch=String.fromCharCode(254);
break;
case "yuml":
ch=String.fromCharCode(255);
break;
case "OElig":
ch=String.fromCharCode(338);
break;
case "oelig":
ch=String.fromCharCode(339);
break;
case "Scaron":
ch=String.fromCharCode(352);
break;
case "scaron":
ch=String.fromCharCode(353);
break;
case "Yuml":
ch=String.fromCharCode(376);
break;
case "fnof":
ch=String.fromCharCode(402);
break;
case "circ":
ch=String.fromCharCode(710);
break;
case "tilde":
ch=String.fromCharCode(732);
break;
case "Alpha":
ch=String.fromCharCode(913);
break;
case "Beta":
ch=String.fromCharCode(914);
break;
case "Gamma":
ch=String.fromCharCode(915);
break;
case "Delta":
ch=String.fromCharCode(916);
break;
case "Epsilon":
ch=String.fromCharCode(917);
break;
case "Zeta":
ch=String.fromCharCode(918);
break;
case "Eta":
ch=String.fromCharCode(919);
break;
case "Theta":
ch=String.fromCharCode(920);
break;
case "Iota":
ch=String.fromCharCode(921);
break;
case "Kappa":
ch=String.fromCharCode(922);
break;
case "Lambda":
ch=String.fromCharCode(923);
break;
case "Mu":
ch=String.fromCharCode(924);
break;
case "Nu":
ch=String.fromCharCode(925);
break;
case "Xi":
ch=String.fromCharCode(926);
break;
case "Omicron":
ch=String.fromCharCode(927);
break;
case "Pi":
ch=String.fromCharCode(928);
break;
case "Rho":
ch=String.fromCharCode(929);
break;
case "Sigma":
ch=String.fromCharCode(931);
break;
case "Tau":
ch=String.fromCharCode(932);
break;
case "Upsilon":
ch=String.fromCharCode(933);
break;
case "Phi":
ch=String.fromCharCode(934);
break;
case "Chi":
ch=String.fromCharCode(935);
break;
case "Psi":
ch=String.fromCharCode(936);
break;
case "Omega":
ch=String.fromCharCode(937);
break;
case "alpha":
ch=String.fromCharCode(945);
break;
case "beta":
ch=String.fromCharCode(946);
break;
case "gamma":
ch=String.fromCharCode(947);
break;
case "delta":
ch=String.fromCharCode(948);
break;
case "epsilon":
ch=String.fromCharCode(949);
break;
case "zeta":
ch=String.fromCharCode(950);
break;
case "eta":
ch=String.fromCharCode(951);
break;
case "theta":
ch=String.fromCharCode(952);
break;
case "iota":
ch=String.fromCharCode(953);
break;
case "kappa":
ch=String.fromCharCode(954);
break;
case "lambda":
ch=String.fromCharCode(955);
break;
case "mu":
ch=String.fromCharCode(956);
break;
case "nu":
ch=String.fromCharCode(957);
break;
case "xi":
ch=String.fromCharCode(958);
break;
case "omicron":
ch=String.fromCharCode(959);
break;
case "pi":
ch=String.fromCharCode(960);
break;
case "rho":
ch=String.fromCharCode(961);
break;
case "sigmaf":
ch=String.fromCharCode(962);
break;
case "sigma":
ch=String.fromCharCode(963);
break;
case "tau":
ch=String.fromCharCode(964);
break;
case "upsilon":
ch=String.fromCharCode(965);
break;
case "phi":
ch=String.fromCharCode(966);
break;
case "chi":
ch=String.fromCharCode(967);
break;
case "psi":
ch=String.fromCharCode(968);
break;
case "omega":
ch=String.fromCharCode(969);
break;
case "thetasym":
ch=String.fromCharCode(977);
break;
case "upsih":
ch=String.fromCharCode(978);
break;
case "piv":
ch=String.fromCharCode(982);
break;
case "ensp":
ch=String.fromCharCode(8194);
break;
case "emsp":
ch=String.fromCharCode(8195);
break;
case "thinsp":
ch=String.fromCharCode(8201);
break;
case "zwnj":
ch=String.fromCharCode(8204);
break;
case "zwj":
ch=String.fromCharCode(8205);
break;
case "lrm":
ch=String.fromCharCode(8206);
break;
case "rlm":
ch=String.fromCharCode(8207);
break;
case "ndash":
ch=String.fromCharCode(8211);
break;
case "mdash":
ch=String.fromCharCode(8212);
break;
case "lsquo":
ch=String.fromCharCode(8216);
break;
case "rsquo":
ch=String.fromCharCode(8217);
break;
case "sbquo":
ch=String.fromCharCode(8218);
break;
case "ldquo":
ch=String.fromCharCode(8220);
break;
case "rdquo":
ch=String.fromCharCode(8221);
break;
case "bdquo":
ch=String.fromCharCode(8222);
break;
case "dagger":
ch=String.fromCharCode(8224);
break;
case "Dagger":
ch=String.fromCharCode(8225);
break;
case "bull":
ch=String.fromCharCode(8226);
break;
case "hellip":
ch=String.fromCharCode(8230);
break;
case "permil":
ch=String.fromCharCode(8240);
break;
case "prime":
ch=String.fromCharCode(8242);
break;
case "Prime":
ch=String.fromCharCode(8243);
break;
case "lsaquo":
ch=String.fromCharCode(8249);
break;
case "rsaquo":
ch=String.fromCharCode(8250);
break;
case "oline":
ch=String.fromCharCode(8254);
break;
case "frasl":
ch=String.fromCharCode(8260);
break;
case "euro":
ch=String.fromCharCode(8364);
break;
case "image":
ch=String.fromCharCode(8465);
break;
case "weierp":
ch=String.fromCharCode(8472);
break;
case "real":
ch=String.fromCharCode(8476);
break;
case "trade":
ch=String.fromCharCode(8482);
break;
case "alefsym":
ch=String.fromCharCode(8501);
break;
case "larr":
ch=String.fromCharCode(8592);
break;
case "uarr":
ch=String.fromCharCode(8593);
break;
case "rarr":
ch=String.fromCharCode(8594);
break;
case "darr":
ch=String.fromCharCode(8595);
break;
case "harr":
ch=String.fromCharCode(8596);
break;
case "crarr":
ch=String.fromCharCode(8629);
break;
case "lArr":
ch=String.fromCharCode(8656);
break;
case "uArr":
ch=String.fromCharCode(8657);
break;
case "rArr":
ch=String.fromCharCode(8658);
break;
case "dArr":
ch=String.fromCharCode(8659);
break;
case "hArr":
ch=String.fromCharCode(8660);
break;
case "forall":
ch=String.fromCharCode(8704);
break;
case "part":
ch=String.fromCharCode(8706);
break;
case "exist":
ch=String.fromCharCode(8707);
break;
case "empty":
ch=String.fromCharCode(8709);
break;
case "nabla":
ch=String.fromCharCode(8711);
break;
case "isin":
ch=String.fromCharCode(8712);
break;
case "notin":
ch=String.fromCharCode(8713);
break;
case "ni":
ch=String.fromCharCode(8715);
break;
case "prod":
ch=String.fromCharCode(8719);
break;
case "sum":
ch=String.fromCharCode(8721);
break;
case "minus":
ch=String.fromCharCode(8722);
break;
case "lowast":
ch=String.fromCharCode(8727);
break;
case "radic":
ch=String.fromCharCode(8730);
break;
case "prop":
ch=String.fromCharCode(8733);
break;
case "infin":
ch=String.fromCharCode(8734);
break;
case "ang":
ch=String.fromCharCode(8736);
break;
case "and":
ch=String.fromCharCode(8743);
break;
case "or":
ch=String.fromCharCode(8744);
break;
case "cap":
ch=String.fromCharCode(8745);
break;
case "cup":
ch=String.fromCharCode(8746);
break;
case "int":
ch=String.fromCharCode(8747);
break;
case "there4":
ch=String.fromCharCode(8756);
break;
case "sim":
ch=String.fromCharCode(8764);
break;
case "cong":
ch=String.fromCharCode(8773);
break;
case "asymp":
ch=String.fromCharCode(8776);
break;
case "ne":
ch=String.fromCharCode(8800);
break;
case "equiv":
ch=String.fromCharCode(8801);
break;
case "le":
ch=String.fromCharCode(8804);
break;
case "ge":
ch=String.fromCharCode(8805);
break;
case "sub":
ch=String.fromCharCode(8834);
break;
case "sup":
ch=String.fromCharCode(8835);
break;
case "nsub":
ch=String.fromCharCode(8836);
break;
case "sube":
ch=String.fromCharCode(8838);
break;
case "supe":
ch=String.fromCharCode(8839);
break;
case "oplus":
ch=String.fromCharCode(8853);
break;
case "otimes":
ch=String.fromCharCode(8855);
break;
case "perp":
ch=String.fromCharCode(8869);
break;
case "sdot":
ch=String.fromCharCode(8901);
break;
case "lceil":
ch=String.fromCharCode(8968);
break;
case "rceil":
ch=String.fromCharCode(8969);
break;
case "lfloor":
ch=String.fromCharCode(8970);
break;
case "rfloor":
ch=String.fromCharCode(8971);
break;
case "lang":
ch=String.fromCharCode(9001);
break;
case "rang":
ch=String.fromCharCode(9002);
break;
case "loz":
ch=String.fromCharCode(9674);
break;
case "spades":
ch=String.fromCharCode(9824);
break;
case "clubs":
ch=String.fromCharCode(9827);
break;
case "hearts":
ch=String.fromCharCode(9829);
break;
case "diams":
ch=String.fromCharCode(9830);
break;
default:
ch="";
break;
}
}
i=_407;
}
}
out+=ch;
}
return out;
};
this.includeJavaScriptFile=function(_409){
document.write("<script charset=\"UTF-8\" type=\"text/javascript\" src=\""+_409+this.randomSuffix()+"\"></script>");
};
this.includeCSSFile=function(_40a){
document.write("<link href=\""+_40a+this.randomSuffix()+"\" rel=\"stylesheet\" type=\"text/css\">");
};
this.isDefined=function(_40b){
return (typeof (window[_40b])==="undefined")?false:true;
};
this.regexpResultLength=function(_40c,text){
var len=text.length-text.replace(_40c,"").length;
return len;
};
this.accented2HTML=function(str){
var _40d;
var _40e;
_40d=new RegExp("é","g");
_40e="&eacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("É","g");
_40e="&Eacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("á","g");
_40e="&aacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("�?","g");
_40e="&Aacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("�","g");
_40e="&iacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("I","g");
_40e="&Iacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("ó","g");
_40e="&oacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("Ó","g");
_40e="&Oacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("ú","g");
_40e="&uacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("Ú","g");
_40e="&Uacute;";
str=str.replace(_40d,_40e);
_40d=new RegExp("ö","g");
_40e="&ouml;";
str=str.replace(_40d,_40e);
_40d=new RegExp("Ö","g");
_40e="&Ouml;";
str=str.replace(_40d,_40e);
_40d=new RegExp("ü","g");
_40e="&uuml;";
str=str.replace(_40d,_40e);
_40d=new RegExp("Ü","g");
_40e="&Uuml;";
str=str.replace(_40d,_40e);
_40d=new RegExp("õ","g");
_40e="&otilde;";
str=str.replace(_40d,_40e);
_40d=new RegExp("Õ","g");
_40e="&Otilde;";
str=str.replace(_40d,_40e);
_40d=new RegExp("û","g");
_40e="&ucirc;";
str=str.replace(_40d,_40e);
_40d=new RegExp("Û","g");
_40e="&Ucirc;";
str=str.replace(_40d,_40e);
_40d=new RegExp("ä","g");
_40e="&auml;";
str=str.replace(_40d,_40e);
_40d=new RegExp("Ä","g");
_40e="&Auml;";
str=str.replace(_40d,_40e);
_40d=new RegExp("ß","g");
_40e="&szlig;";
str=str.replace(_40d,_40e);
return str;
};
this.liteDown=function(text){
var _40f;
var _410;
_40f=new RegExp("==>","g");
_410="<p>";
text=text.replace(_40f,_410);
_40f=new RegExp("<==","g");
_410="</p>";
text=text.replace(_40f,_410);
_40f=new RegExp("__","g");
_410="<br />";
text=text.replace(_40f,_410);
var _411;
while(true){
_40f=new RegExp("(>|\\s|^)\\(rel\\)\\((.*)\\)([^<\\s]*)(<|\\s|$)","");
_410="$1<a href=\"$3\">$2</a>$4";
_411=text.replace(_40f,_410);
if(text===_411){
break;
}else{
text=_411;
}
}
while(true){
_40f=new RegExp("(>|\\s|^)\\(rel\\)([^<\\s]*)(<|\\s|$)","");
_410="$1<a href=\"$2\">$2</a>$3";
_411=text.replace(_40f,_410);
if(text===_411){
break;
}else{
text=_411;
}
}
while(true){
_40f=new RegExp("(>|\\s|^)\\((.*)\\)(\\w+:\\/{2}[\\w.\\/]+)(<|\\s|$)","");
_410="$1<a href=\"$3\">$2</a>$4";
_411=text.replace(_40f,_410);
if(text===_411){
break;
}else{
text=_411;
}
}
while(true){
_40f=new RegExp("(\\(|\\s|^)(\\w+:\\/{2}[\\w.\\/]+)(\\)|\\s|$)","");
_410="$1<a href=\"$2\">$2</a>$3";
_411=text.replace(_40f,_410);
if(text===_411){
break;
}else{
text=_411;
}
}
while(true){
_40f=new RegExp("(>|\\s|^)([\\w.]+@[\\w.]+)(<|\\s|$)","");
_410="$1<a href=\"mailto:$2\">$2</a>$3";
_411=text.replace(_40f,_410);
if(text===_411){
break;
}else{
text=_411;
}
}
while(true){
_40f=new RegExp("(>|\\s|^)\\*([^*\\s][^*]*[^*\\s]|[^*\\s])\\*(<|\\s|$)","");
_410="$1<em>$2</em>$3";
_411=text.replace(_40f,_410);
if(text===_411){
break;
}else{
text=_411;
}
}
while(true){
_40f=new RegExp("(>|\\s|^)_([^_\\s][^_]*[^_\\s]|[^_\\s])_(<|\\s|$)","");
_410="$1<cite>$2</cite>$3";
_411=text.replace(_40f,_410);
if(text===_411){
break;
}else{
text=_411;
}
}
for(var _412=1;_412<=6;_412++){
_40f=new RegExp("^(\\s*)(=){"+_412+"}([^=].*[^=])(=){"+_412+"}(\\s*)$","gm");
_410="<h"+_412+">$3</h"+_412+">";
text=text.replace(_40f,_410);
}
while(true){
_40f=new RegExp("(>|\\s|^)\\(image\\)\\((.*)\\)([^<\\s]*)(<|\\s|$)","");
_410="$1<img class=\"$2\" src=\"$3\"/>$4";
_411=text.replace(_40f,_410);
if(text===_411){
break;
}else{
text=_411;
}
}
_411=text;
do{
text=_411;
_40f=new RegExp("(>|\\s|^)\\(thumbnail\\)\\((.*)\\)([^<\\s]*)\\s+>>>\\s+(.*)(<|\\s|$)","");
_410="$1<a href=\"$4\"><img class=\"$2\" src=\"$3\"/></a>$5";
_411=text.replace(_40f,_410);
}while(_411!==text);
return text;
};
this.toObject=function(obj){
if(typeof (obj)==="string"){
obj=this.getDOMElement(obj);
}
return obj;
};
this.attachEvent=function(_413,_414,_415,_416){
if(_413.addEventListener){
_413.addEventListener(_414,_415,_416);
}else{
if(_413.attachEvent){
_413.attachEvent("on"+_414,_415);
}
}
};
this.objectArray2objectHashTable=function(_417,_418){
var _419=[];
for(var i in _417){
_419[_417[i][_418]]=_417[i];
}
return _419;
};
this.str_repeat=function(i,m){
for(var o=[];m>0;o[--m]=i){
}
return (o.join(""));
};
this.sprintf=function(){
var i=0,a,f=arguments[i++],o=[],m,p,c,x;
while(f){
if(m=/^[^\x25]+/.exec(f)){
o.push(m[0]);
}else{
if(m=/^\x25{2}/.exec(f)){
o.push("%");
}else{
if(m=/^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)){
if(!(a=arguments[m[1]?m[1]:i++])){
throw ("Too few arguments.");
}
if(/[^s]/.test(m[7])&&(typeof (a)!=="number")){
throw ("Expecting number but found "+typeof (a));
}
switch(m[7]){
case "b":
a=a.toString(2);
break;
case "c":
a=String.fromCharCode(a);
break;
case "d":
a=parseInt(a);
break;
case "e":
a=m[6]?a.toExponential(m[6]):a.toExponential();
break;
case "f":
a=m[6]?parseFloat(a).toFixed(m[6]):parseFloat(a);
break;
case "o":
a=a.toString(8);
break;
case "s":
a=((a=String(a))&&m[6]?a.substring(0,m[6]):a);
break;
case "u":
a=Math.abs(a);
break;
case "x":
a=a.toString(16);
break;
case "X":
a=a.toString(16).toUpperCase();
break;
}
a=(/[def]/.test(m[7])&&m[2]&&a>0?"+"+a:a);
c=m[3]?m[3]==="0"?"0":m[3].charAt(1):" ";
x=m[6]?m[5]-String(a).length:m[5];
p=m[5]?this.str_repeat(c,x):"";
o.push(m[4]?a+p:p+a);
}else{
throw ("Huh ?!");
}
}
}
f=f.substring(m[0].length);
}
return o.join("");
};
};
function SimpleCryptography(){
this.version=simpleClassesVersion;
this.base64KeyStr="ABCDEFGHIJKLMNOP"+"QRSTUVWXYZabcdef"+"ghijklmnopqrstuv"+"wxyz0123456789-_"+".";
this.base64Encode=function(_41a){
var _41b="";
var chr1,chr2,chr3="";
var enc1,enc2,enc3,enc4="";
var i=0;
do{
chr1=_41a.charCodeAt(i++);
chr2=_41a.charCodeAt(i++);
chr3=_41a.charCodeAt(i++);
enc1=chr1>>2;
enc2=((chr1&3)<<4)|(chr2>>4);
enc3=((chr2&15)<<2)|(chr3>>6);
enc4=chr3&63;
if(isNaN(chr2)){
enc3=enc4=64;
}else{
if(isNaN(chr3)){
enc4=64;
}
}
_41b=_41b+this.base64KeyStr.charAt(enc1)+this.base64KeyStr.charAt(enc2)+this.base64KeyStr.charAt(enc3)+this.base64KeyStr.charAt(enc4);
chr1=chr2=chr3="";
enc1=enc2=enc3=enc4="";
}while(i<_41a.length);
return _41b;
};
this.base64Decode=function(_41c){
var _41d="";
var chr1,chr2,chr3="";
var enc1,enc2,enc3,enc4="";
var i=0;
var _41e=/[^A-Za-z0-9\-\_\.]/g;
if(_41e.exec(_41c)){
alert("There were invalid base64 characters in the input text.\n"+"Valid base64 characters are A-Z, a-z, 0-9, '-', '_', and '.'\n"+"Expect errors in decoding.");
}
_41c=_41c.replace(/[^A-Za-z0-9\-\_\.]/g,"");
do{
enc1=this.base64KeyStr.indexOf(_41c.charAt(i++));
enc2=this.base64KeyStr.indexOf(_41c.charAt(i++));
enc3=this.base64KeyStr.indexOf(_41c.charAt(i++));
enc4=this.base64KeyStr.indexOf(_41c.charAt(i++));
chr1=(enc1<<2)|(enc2>>4);
chr2=((enc2&15)<<4)|(enc3>>2);
chr3=((enc3&3)<<6)|enc4;
_41d=_41d+String.fromCharCode(chr1);
if(enc3!==64){
_41d=_41d+String.fromCharCode(chr2);
}
if(enc4!==64){
_41d=_41d+String.fromCharCode(chr3);
}
chr1=chr2=chr3="";
enc1=enc2=enc3=enc4="";
}while(i<_41c.length);
return _41d;
};
this.RC4Encrypt=function(_41f,data){
var buf=new Array(256);
var _420=_41f.length;
var _421=data.length;
var i,j,k,n,tmp,_422="";
for(i=0;i<256;i++){
buf[i]=i;
}
for(j=i=0;i<256;i++){
j=(j+buf[i]+_41f.charCodeAt(i%_420))%256;
tmp=buf[i];
buf[i]=buf[j];
buf[j]=tmp;
}
for(n=j=i=0;i<_421;i++){
n=(n+1)%256;
j=(j+buf[n])%256;
tmp=buf[n];
buf[n]=buf[j];
buf[j]=tmp;
k=buf[((buf[n]+buf[j])%256)];
_422+=String.fromCharCode(data.charCodeAt(i)^k);
}
return _422;
};
this.RC4Decrypt=function(_423,data){
return this.RC4Encrypt(_423,data);
};
this.SHA1=function(data){
return hex_sha1(data);
};
this.MD5=function(data){
return hex_md5(data);
};
this.generateRandomString=function(len){
var _424="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var _425="";
for(var i=0;i<len;i++){
_425+=_424[Math.floor(Math.random()*_424.length)];
}
return _425;
};
};
function rem(str){
};
var simpleDebug=new SimpleDebug();
var simpleUtils=new SimpleUtilities();
var simpleCrypto=new SimpleCryptography();
var redSandVersion="0.43";
var redSandId=0;
function RedSandUtilities(){
this.version=redSandVersion;
this.generateCredentials=function(_426,_427){
if(_427===undefined){
_427=_426;
}
var _428=simpleCrypto.SHA1(_426);
var _429=simpleCrypto.SHA1(_427);
var _42a=new Date().format("YYYY-MM-DD HH:mm:ss");
var _42b=simpleCrypto.generateRandomString(16);
var _42c=simpleCrypto.base64Encode(simpleCrypto.RC4Encrypt(_428,_429+_42a+_42b));
return _42c;
};
this.formAuthenticatedURI=function(uri,_42d,_42e,_42f){
var _430=this.generateCredentials(_42f,_42f);
if(_42d===null){
uri=simpleUtils.formURI(uri,{"userIdentifier":_42e,"credentials":_430});
}else{
if(typeof (_42d)!=="object"){
return uri;
}
_42d.userIdentifier=_42e;
_42d.credentials=_430;
uri=simpleUtils.formURI(uri,_42d);
}
return uri;
};
this.blockInput=function(_431){
if(_431===undefined){
_431="blue";
}
simpleUtils.getDOMElement("inputBlocker").style.background=_431;
simpleUtils.getDOMElement("inputBlocker").style.display="block";
};
this.unblockInput=function(){
simpleUtils.getDOMElement("inputBlocker").style.display="none";
};
};
function RedSandGenericLoader(){
this.version=redSandVersion;
this.containers=[];
this.frameNames=[];
this.callbacks=[];
this.lastProcess=0;
this.oldContainerPool=[];
this.indicate=true;
this.loadsInProgress=0;
this.showIndicator=function(){
if(!redSandGenericLoader.indicate){
return;
}
redSandGenericLoader.loadsInProgress++;
if(redSandGenericLoader.loadsInProgress===1){
simpleUtils.getDOMElement("loadIndicator").style.display="block";
}
};
this.hideIndicator=function(){
if(!redSandGenericLoader.indicate){
return;
}
redSandGenericLoader.loadsInProgress--;
if(redSandGenericLoader.loadsInProgress===0){
simpleUtils.getDOMElement("loadIndicator").style.display="none";
}
};
this.load=function(uri,_432){
this.showIndicator();
conSense.writeLn("[load request: "+uri+"]");
if(_432===undefined){
_432=redSandGenericLoader.javaScriptEvaluatorCallback;
}
this.callbacks.push(_432);
if(this.oldContainerPool.length){
this.containers.push(this.oldContainerPool.pop());
}else{
var _433=document.createElement("div");
_433.setAttribute("id","RedSandRegistryContainer"+this.lastProcess);
_433.style.display="none";
conSense.conSenseContainer.appendChild(_433);
this.containers.push(_433);
}
var _434=uri+simpleUtils.randomSuffix();
this.frameNames.push("RedSandRegistry"+this.lastProcess);
this.containers[this.lastProcess].innerHTML="<iframe name='"+this.frameNames[this.lastProcess]+"' id='"+this.frameNames[this.lastProcess]+"' onLoad='parent.redSandGenericLoader.loadedCallback("+this.lastProcess+")' src='"+_434+"' style='width: 0px; height: 0px; border: 0px;'></iframe>";
};
this.loadedCallback=function(_435){
var _436="deadbeef";
if(window.frames[this.frameNames[_435]].document.body.innerText===undefined){
if(window.frames[this.frameNames[_435]].document.body.textContent===undefined){
_436=window.frames[this.frameNames[_435]].document.body.innerHTML;
}else{
_436=window.frames[this.frameNames[_435]].document.body.textContent;
}
}else{
_436=window.frames[this.frameNames[_435]].document.body.innerText;
}
var _437=this.callbacks[_435];
this.callbacks[_435]=undefined;
this.oldContainerPool.push(this.containers[_435]);
this.containers[_435]=undefined;
this.frameNames[_435]=undefined;
this.lastProcess++;
conSense.scrollToBottomFocusInput();
_437(_436);
this.hideIndicator();
conSense.separator();
conSense.scrollToBottomFocusInput();
};
this.javaScriptEvaluatorCallback=function(_438){
try{
eval(_438);
}
catch(ex){
conSense.writeLn(">>> JavaScript exception: "+ex);
conSense.listObject(ex);
}
conSense.separator();
conSense.scrollToBottomFocusInput();
};
};
function RedSandHashHandler(){
this.version=redSandVersion;
this.hashSeparator="#";
this.paramSeparator=";";
this.equalsString="=";
this.lastHash="deadbeef";
this.defaultHash="deadbeef";
this.eventRegistry=[];
this.firstRun=true;
this.addEvent=function(_439,_43a){
this.eventRegistry[_439]=_43a;
};
this.onHashChanged=function(){
var _43b=this.processCurrentURIHash();
if(_43b===undefined){
return;
}
redSandHashHandler.updateNodeStyles();
for(var i in _43b){
if(i==="each"||i==="forEach"){
continue;
}
for(var j in this.eventRegistry){
if(j===i){
this.eventRegistry[j](_43b);
}
}
}
if(this.firstRun!==undefined||this.firstRun===true){
this.firstRun=false;
window.setInterval(function(){
if(redSandHashHandler.changed()){
redSandHashHandler.onHashChanged();
}
},100);
}
};
this.changed=function(){
if(window.location.hash!==this.lastHash){
this.lastHash=window.location.hash;
return true;
}else{
return false;
}
};
this.setDefaultHash=function(hash){
this.defaultHash=hash;
if(window.location.hash.length===0){
this.lastHash=hash;
window.location.hash=hash;
}else{
this.lastHash=window.location.hash;
}
this.updateNodeStyles();
this.onHashChanged();
};
this.array2Hash=function(_43c){
var hash=this.hashSeparator;
for(var i in _43c){
hash+=""+i+this.equalsString+_43c[i]+this.paramSeparator;
}
if(hash.length>2){
hash=hash.substr(0,hash.length-this.paramSeparator.length);
}
return hash;
};
this.hash2Array=function(hash){
if(hash.substr(hash.length-this.paramSeparator.length)===this.paramSeparator){
hash=hash.substr(0,hash.length-this.paramSeparator.length);
}
var _43d=[];
var _43e=hash.substr(this.hashSeparator.length).split(this.paramSeparator);
for(var i=0;i<_43e.length;i++){
var _43f=_43e[i].split(this.equalsString);
_43d[_43f[0]]=_43f[1];
}
return _43d;
};
this.getDocumentAnchors=function(){
var _440=[];
for(var i=0;i<document.anchors.length;i++){
_440[this.hashSeparator+document.anchors[i].name]=true;
}
return _440;
};
this.processCurrentURIHash=function(){
var _441=this.getDocumentAnchors();
if(_441[window.location.hash]===undefined){
return this.hash2Array(window.location.hash);
}
return undefined;
};
this.menuContainsLink=function(menu,link){
for(var i in menu.items){
if(i==="each"||i==="forEach"){
continue;
}
var _442=this.hash2Array(menu.items[i].link);
var _443=this.hash2Array(link);
var _444=0;
var _445=0;
for(var j in _442){
if(j==="each"||j==="forEach"){
continue;
}
_444++;
for(var k in _443){
if(k==="each"||k==="forEach"){
continue;
}
if(j===k&&_442[j]===_443[k]){
_445++;
}
}
}
if(_444===_445){
return menu.items[i];
}
}
return undefined;
};
this.updateNodeStyles=function(){
for(var i in redSandRegistry.menus){
var menu=redSandRegistry.menus[i];
if(!menu.items){
continue;
}
var item=this.menuContainsLink(menu,window.location.hash);
if(item===undefined){
continue;
}
simpleUtils.getDOMElement(item.DOMid).className=item.selectedClassName;
if((menu.lastSelectedNode!==undefined)&&(menu.lastSelectedNode!==item)){
simpleUtils.getDOMElement(menu.lastSelectedNode.DOMid).className=menu.lastSelectedNode.deselectedClassName;
}
menu.lastSelectedNode=item;
}
};
};
function RedSandRegistry(){
this.version=redSandVersion;
this.menus=[];
this.findMenuNodesByLink=function(link){
var _446=[];
var _447=true;
for(var i in this.menus){
var menu=this.menus[i];
if(!menu.items){
continue;
}
var _448=[];
for(var j in menu.items){
var item=menu.items[j];
if(!item.link){
continue;
}
if(item.link===link){
_448.push(item);
}
}
if(_448.length>0){
_446[menu.id]=_448;
_447=false;
}
}
if(!_447){
return _446;
}
return undefined;
};
this.addMenu=function(obj){
this.menus[obj.id]=obj;
};
};
function RedSandUITextManager(){
this.version=redSandVersion;
this.registry=[];
this.currentTable=undefined;
this.fieldId="id";
this.fieldText="text";
this.initTextTable=function(_449){
var _44a=simpleUtils.objectArray2objectHashTable(_449,this.fieldId);
for(var i in _44a){
if(_44a[i][this.fieldText]){
_44a[i][this.fieldText]=simpleUtils.liteDown(_44a[i][this.fieldText]);
}
}
return _44a;
};
this.setTextTable=function(_44b){
for(var i in this.registry){
if(this.registry[i]===undefined||typeof (this.registry[i])!=="object"){
continue;
}
this.registry[i]=_44b;
}
this.currentTable=_44b;
this.refresh();
};
this.setText=function(_44c,_44d,_44e){
if(_44e!==""){
var _44f=simpleUtils.getDOMElement(_44c);
if(_44f===undefined){
return;
}
_44f[_44d]=this.currentTable[_44e][this.fieldText];
}
this.registry[_44c+"; "+_44d+"; "+_44e]=this.currentTable;
};
this.refresh=function(){
for(var i in this.registry){
if(this.registry[i]===undefined||typeof (this.registry[i])!=="object"){
continue;
}
var elem=i;
elem=elem.split(";");
elem[0]=simpleUtils.trimString(elem[0]);
elem[1]=simpleUtils.trimString(elem[1]);
elem[2]=simpleUtils.trimString(elem[2]);
if(simpleUtils.getDOMElement(elem[0])===undefined){
this.registry[i]=undefined;
continue;
}
simpleUtils.getDOMElement(elem[0])[elem[1]]=this.registry[i][elem[2]][this.fieldText];
}
};
};
function RedSandNode(_450,_451,_452,_453,link,_454){
this.version=redSandVersion;
this.DOMid=_450;
this.textId=_451;
this.selectedClassName=_453;
this.deselectedClassName=_452;
this.className=this.deselectedClassName;
this.link=link;
this.custom=_454;
this.renderString=function(){
var _455="<a "+"id='"+this.DOMid+"' class='"+this.className+"' href='"+this.link+"'></a>";
return _455;
};
this.render=function(_456){
_456.innerHTML+=this.renderString();
redSandUITextManager.setText(this.DOMid,"innerHTML",this.textId);
};
};
function RedSandMenu(id,_457,_458){
this.version=redSandVersion;
this.id=id;
this.items=_457;
this.menuContainer=simpleUtils.getDOMElement(_458);
this.lastSelectedNode=undefined;
this.render=function(){
if(!this.items.length){
return "";
}
for(var i=0;i<this.items.length;i++){
if(this.items[i].DOMid===undefined){
continue;
}
this.menuContainer.innerHTML+=this.items[i].renderString();
redSandUITextManager.setText(this.items[i].DOMid,"innerHTML",this.items[i].textId);
}
};
};
function RedSandWindowlet(left,top,_459,_45a,_45b,_45c,_45d){
this.version=redSandVersion;
if(_45b===undefined||_45b==="default"){
_45b="white";
}
if(_45c===undefined||_45c==="default"){
_45c="1px solid gray";
}
if(_45d===undefined){
_45d=true;
}
this.left=left;
this.top=top;
this.width=_459;
this.height=_45a;
this.background=_45b;
this.border=_45c;
this.draggable=_45d;
this.DOMContainer=undefined;
this.id="RedSandId"+redSandId++;
this.borderVisible=true;
this.DOMContainer=document.createElement("div");
this.DOMContainer.id=this.id;
this.DOMContainer.style.display="block";
this.DOMContainer.style.position="absolute";
this.DOMContainer.style.overflow="auto";
this.DOMContainer.style.width=this.width+"px";
this.DOMContainer.style.height=this.height+"px";
this.DOMContainer.style.left=this.left+"px";
this.DOMContainer.style.top=this.top+"px";
this.DOMContainer.style.background=_45b;
this.DOMContainer.style.border=this.border;
redSandWindowletManager.initZIndex(this);
document.body.appendChild(this.DOMContainer);
if(this.draggable){
Drag.init(this.DOMContainer,null,0,1000000000,0,1000000000);
var _45e=this;
this.DOMContainer.onDragStart=function(){
redSandWindowletManager.updateZIndex(_45e);
};
}
this.show=function(){
this.DOMContainer.style.display="block";
};
this.hide=function(){
this.DOMContainer.style.display="none";
};
this.borderOn=function(){
this.DOMContainer.style.border=this.border;
};
this.borderOff=function(){
this.DOMContainer.style.border="none";
};
};
function RedSandWindowletManager(){
this.version=redSandVersion;
this.topmostWindowlet=undefined;
this.highestZIndex=1000000;
this.initZIndex=function(_45f){
_45f.DOMContainer.style.zIndex=""+this.highestZIndex++;
this.topmostWindowlet=_45f;
};
this.updateZIndex=function(_460){
var _461=_460.DOMContainer.style.zIndex;
_460.DOMContainer.style.zIndex=this.topmostWindowlet.DOMContainer.style.zIndex;
this.topmostWindowlet.DOMContainer.style.zIndex=_461;
this.topmostWindowlet=_460;
};
};
var redSandUtils=new RedSandUtilities();
var redSandGenericLoader=new RedSandGenericLoader();
var redSandHashHandler=new RedSandHashHandler();
var redSandRegistry=new RedSandRegistry();
var redSandUITextManager=new RedSandUITextManager();
var redSandWindowletManager=new RedSandWindowletManager();
var redSandGLVersion="0.02";
function RedSandGLViewport(_462,_463){
this.version=redSandGLVersion;
if(_462===undefined){
_462=0;
}
if(_463===undefined){
_463=0;
}
this.originX=_462;
this.originY=_463;
this.setOrigin=function(_464,_465){
this.originX=_464;
this.originY=_465;
};
};
function RedSandGLPrimitive(_466){
this.version=redSandGLVersion;
if(_466===undefined){
alert("RedSandGLViewport should be specified for RedSandGLPrimitive() call.");
}
this.viewport=_466;
this.plot=function(x,y,_467){
};
this.line=function(x1,y1,x2,y2,_468,_469){
};
this.erase=function(){
};
};
function ConSense(){
this.version="1.12";
this.debug=true;
this.echo=true;
this.verbose=true;
this.commandLine="";
this.oldCommandLine="";
this.conSenseContainer=undefined;
this.conSenseInnerContainer=undefined;
this.conSenseHeader=undefined;
this.conSenseHeaderSwitch=undefined;
this.conSenseOut=undefined;
this.conSenseIn=undefined;
this.conSenseCounter=undefined;
this.containerHeight=undefined;
this.containerScrollTop=undefined;
this.zTop=2000000001;
this.scrollInfinite=1000000000;
this.visible=this.show;
this.globalVisible=this.show;
this.show=true;
this.hide=false;
this.toggle="toggle";
this.interfaceText={showConsoleButton:"Show",hideConsoleButton:"Hide"};
this.outlineColor="red";
this.lastKeyEventType="deadbeef";
this.commandHistory=[];
this.commandHistoryPosition=0;
this.currentlyTypedCommand="";
this.tabPixelSize=20;
this.mapResultBuffer=undefined;
this.mapTempObjects=undefined;
this.mapTempObjectCounter=0;
this.mapExcerptSize=40;
this.mapShowConSense=false;
this.mapShowEmptyTexts=false;
this.lastWriteLn="";
this.separatorString="===============================";
this.writeTitle=function(){
this.writeLn("Type "+conSense.highlightAppendLink("help()")+" + Enter for usage information.");
};
this.clearScreen=function(){
this.conSenseOut.innerHTML="";
this.writeTitle();
};
this.write=function(str){
this.conSenseOut.innerHTML+=str;
};
this.writeLn=function(str){
this.lastWriteLn=str;
this.conSenseOut.innerHTML+=str+"<br />";
};
this.writeManualEntry=function(name,str){
if(name!==""){
this.conSenseOut.innerHTML+="<div class='conSenseManualEntry'>"+"<span class='conSenseManualEntryHead'>"+conSense.highlightAppendLink(name)+"</span> "+str+"</div>";
}else{
this.conSenseOut.innerHTML+="<div class='conSenseManualEntry'>"+"<span class='conSenseManualEntryHead'>"+"</span> "+str+"</div>";
}
};
this.separator=function(){
if(this.lastWriteLn!==this.separatorString){
this.writeLn(this.separatorString);
}
};
this.debugLn=function(_46a,_46b){
if(this.debug){
var now=new Date();
if(_46a===undefined){
_46a="";
}
if(_46b===undefined){
_46b="";
}
this.writeLn("("+now.format("HH:mm:ss")+") *"+_46a+"* *"+_46b+"*");
}
};
this.echoLn=function(str){
if(this.echo){
this.writeLn("[echo: "+this.highlightAppendLink(str)+"]");
}
};
this.verboseLn=function(str){
if(this.verbose&&str!==undefined){
this.writeLn("[result: "+str+"]");
}
};
this.getInput=function(){
return simpleUtils.trimString(this.conSenseIn.value);
};
this.setInput=function(str){
this.conSenseIn.value=str;
};
this.appendInput=function(str){
if(this.conSenseIn.value.length===0){
this.conSenseIn.value+=str;
}else{
this.conSenseIn.value+=" "+str;
}
this.scrollToBottomFocusInput();
};
this.highlight=function(str){
return "<span class='conSenseHighlight'>&nbsp;"+str+"&nbsp;</span>";
};
this.highlightAppendLink=function(str){
return "<a class='conSenseHighlightAppendLink' href='javascript:conSense.appendInput(\""+str.replace(/"/g,"\\\"")+"\")'>"+"<img src='"+relativeConSensePath+"conSense/images/orangeArrow.png' style='border: 0;'>"+simpleUtils.HTML2Source(str)+"</a>";
};
this.highlightLabelledAppendLink=function(_46c,str){
return "<a class='conSenseHighlightAppendLink' href='javascript:conSense.appendInput(\""+str.replace(/"/g,"\\\"")+"\")'>"+_46c+"</a>";
};
this.init=function(show,_46d,_46e){
simpleUtils.checkBrowser();
document.body.innerHTML+="<!-- RedSand -->            <div id=\"loadIndicator\" class=\"loadIndicator\">                <img src=\""+relativeConSensePath+"conSense/images/loader.gif\" style=\"border: 0;\">            </div>            <div id=\"inputBlocker\" class=\"inputBlocker\">            </div>            <!-- End of RedSand -->";
if(_46d===undefined){
_46d="20px";
}
if(_46e===undefined){
_46e="20px";
}
document.body.innerHTML+="<!-- ConSense -->            <div id=\"conSenseContainer\" class=\"conSenseContainer\">                <div id=\"conSenseHeader\" class=\"conSenseHeader\">                    Loading ConSense...                </div>                <div id=\"conSenseHeaderSwitch\" class=\"conSenseHeaderSwitch\"                    onClick=\"conSense.showConsole(conSense.toggle)\"                >                    &nbsp;                </div>                <div id=\"conSenseInnerContainer\" class=\"conSenseInnerContainer\"                    onScroll=\"conSense.containerScrollTop = conSense.conSenseInnerContainer.scrollTop\"                >                    <form>                        <div id=\"conSenseOut\" class=\"conSenseOut\"                            onDblClick=\"conSense.scrollToBottomFocusInput()\"                        >                        </div>                        <input id=\"conSenseIn\" class=\"conSenseIn\"                            onKeyDown=\"conSense.handleInput(event, 'down')\"                            onKeyPress=\"conSense.handleInput(event, 'press')\"                            onKeyUp=\"conSense.handleInput(event, 'up')\"                            type=\"text\" maxlength=\"1000\" size=\"1000\" />                        <input id=\"conSenseCounter\" class=\"conSenseCounter\" type=\"text\" maxlength=\"4\" size=\"4\" readonly />                    </form>                </div>            </div>            <!-- End of ConSense -->";
this.conSenseContainer=simpleUtils.getDOMElement("conSenseContainer");
this.conSenseInnerContainer=simpleUtils.getDOMElement("conSenseInnerContainer");
this.conSenseHeader=simpleUtils.getDOMElement("conSenseHeader");
this.conSenseHeaderSwitch=simpleUtils.getDOMElement("conSenseHeaderSwitch");
this.conSenseOut=simpleUtils.getDOMElement("conSenseOut");
this.conSenseIn=simpleUtils.getDOMElement("conSenseIn");
this.conSenseCounter=simpleUtils.getDOMElement("conSenseCounter");
this.containerHeight=this.conSenseInnerContainer.style.height;
this.innerContainerHeight=this.conSenseInnerContainer.style.height;
this.conSenseHeader.innerHTML="ConSense v"+this.version;
this.showConsole(show);
this.globalShowConsole(show);
this.writeTitle();
this.separator();
this.updateCounter();
this.scrollToBottomFocusInput();
this.conSenseContainer.style.zIndex=""+this.zTop;
this.conSenseContainer.style.left=_46d+"px";
this.conSenseContainer.style.top=_46e+"px";
Drag.init(this.conSenseHeader,this.conSenseContainer,0,1000000000,0,1000000000);
shortcut.add("Alt+Shift+K",function(){
conSense.showConsole(conSense.toggle);
conSense.globalShowConsole(conSense.toggle);
conSense.scrollToBottomFocusInput();
},{"type":"keydown","disable_in_input":false,"target":document,"propagate":false});
};
this.updateCounter=function(){
this.conSenseCounter.value=this.conSenseIn.value.length;
};
this.handleInput=function(_46f,type){
var _470=(simpleUtils.getKeyName(_46f));
if(_470==="Enter"&&this.lastKeyEventType==="press"){
this.handleCommand();
}else{
if(_470==="Arrow Up"&&this.lastKeyEventType==="down"){
if(this.commandHistoryPosition===this.commandHistory.length){
this.currentlyTypedCommand=this.getInput();
}
if(this.commandHistoryPosition>0){
this.commandHistoryPosition--;
this.setInput(this.commandHistory[this.commandHistoryPosition]);
}
}else{
if(_470==="Arrow Down"&&this.lastKeyEventType==="down"){
if(this.commandHistoryPosition===this.commandHistory.length-1){
this.commandHistoryPosition++;
this.setInput(this.currentlyTypedCommand);
}else{
if(this.commandHistoryPosition<this.commandHistory.length-1){
this.commandHistoryPosition++;
this.setInput(this.commandHistory[this.commandHistoryPosition]);
}
}
}else{
if(this.getInput()!==this.oldCommandLine){
this.commandHistoryPosition=this.commandHistory.length;
}
}
}
}
this.updateCounter();
this.lastKeyEventType=type;
this.oldCommandLine=this.getInput();
};
this.handleCommand=function(){
this.commandLine=this.getInput();
this.commandHistory.push(this.commandLine);
this.commandHistoryPosition=this.commandHistory.length;
this.setInput("");
this.updateCounter();
this.echoLn(this.commandLine);
try{
var _471=eval(this.commandLine);
this.verboseLn(_471);
}
catch(ex){
this.writeLn(">>> JavaScript exception: "+ex);
this.listObject(ex);
}
this.separator();
this.scrollToBottomFocusInput();
};
this.showConsole=function(show){
if(show===conSense.toggle){
if(this.visible){
this.showConsole(this.hide);
}else{
this.showConsole(this.show);
}
}else{
if(show){
this.visible=show;
this.conSenseHeaderSwitch.innerHTML=this.interfaceText.hideConsoleButton;
this.conSenseContainer.style.height=this.containerHeight;
this.conSenseInnerContainer.style.display="block";
this.conSenseInnerContainer.scrollTop=this.containerScrollTop;
}else{
this.visible=show;
this.conSenseHeaderSwitch.innerHTML=this.interfaceText.showConsoleButton;
this.conSenseInnerContainer.style.display="none";
this.conSenseContainer.style.height="21px";
}
}
};
this.scrollToBottomFocusInput=function(){
this.updateCounter();
this.conSenseInnerContainer.scrollTop=this.scrollInfinite;
if(this.visible&&this.globalVisible){
this.conSenseIn.focus();
this.conSenseInnerContainer.scrollTop=this.scrollInfinite;
}
};
this.globalShowConsole=function(show){
if(show===conSense.toggle){
if(this.globalVisible){
this.globalShowConsole(this.hide);
}else{
this.globalShowConsole(this.show);
}
}else{
if(show){
this.globalVisible=show;
this.conSenseContainer.style.display="block";
this.conSenseInnerContainer.scrollTop=this.containerScrollTop;
}else{
this.globalVisible=show;
this.containerScrollTop=this.conSenseInnerContainer.scrollTop;
this.conSenseContainer.style.display="none";
}
}
};
this.listObject=function(obj){
obj=simpleUtils.toObject(obj);
for(var i in obj){
try{
this.writeLn(this.highlight(i)+" - "+simpleUtils.HTML2Source(obj[i]));
}
catch(ex){
}
}
};
this.listObjectStyle=function(obj){
obj=simpleUtils.toObject(obj);
this.listObject(obj.style);
};
this.outlineDOMElement=function(obj){
obj=simpleUtils.toObject(obj);
obj.style.border="1px solid "+this.outlineColor;
};
this.outlineDOMElementsByTag=function(_472){
var _473=document.getElementsByTagName(_472);
for(var i=0;i<_473.length;i++){
_473[i].style.border="1px solid "+this.outlineColor;
}
};
this.outlineDOMSubtree=function(obj,_474){
obj=simpleUtils.toObject(obj);
if(_474===undefined){
_474=0;
}
if(_474===0){
obj.style.border="1px solid "+this.outlineColor;
}
for(var i=0;i<obj.childNodes.length;i++){
var _475=obj.childNodes[i];
if(_475.nodeType===simpleUtils.DOM_ELEMENT_NODE){
_475.style.border="1px solid "+this.outlineColor;
}
this.outlineDOMSubtree(_475,_474+1);
}
};
this.tabulator=function(_476){
return "<span style='margin-left: "+_476*this.tabPixelSize+"px'></span>";
};
this.mapAppendObjectLink=function(_477,_478,i){
var _479="l"+_478+"n"+i+"_"+this.mapTempObjectCounter++;
this.mapTempObjects[_479]=_477;
this.mapResultBuffer+=this.tabulator(_478)+this.highlightLabelledAppendLink("(o)","conSense.mapTempObjects[\""+_479+"\"]")+(" ");
};
this.mapDOMSubtree=function(obj,_47a){
obj=simpleUtils.toObject(obj);
if(_47a===undefined){
_47a=0;
this.mapResultBuffer="";
this.mapTempObjects=[];
this.mapTempObjectCounter=0;
}
for(var i=0;i<obj.childNodes.length;i++){
var _47b=obj.childNodes[i];
this.mapTempObjectCounter++;
if(_47b.nodeType===simpleUtils.DOM_ELEMENT_NODE){
var id="";
var _47c="";
this.mapAppendObjectLink(_47b,_47a,i);
if(_47b.id){
id=" id: "+this.highlightAppendLink(_47b.id);
}
if(_47b.className){
_47c=" class: "+_47b.className;
}
this.mapResultBuffer+=this.highlight(_47b.nodeName)+id+_47c+"<br />";
if(_47b.id==="conSenseContainer"&&!this.mapShowConSense){
this.mapResultBuffer+=this.tabulator(_47a)+"(...)<br />";
continue;
}
if(_47b.attributes){
for(var j=0;j<_47b.attributes.length;j++){
if(_47b.attributes[j].specified){
if(_47b.attributes[j].nodeName!=="id"&&_47b.attributes[j].nodeName!=="class"){
this.mapResultBuffer+=this.tabulator(_47a)+_47b.attributes[j].nodeName+": "+simpleUtils.HTML2Source(_47b.attributes[j].nodeValue)+"<br />";
}
}
}
}
}
if(_47b.nodeType===simpleUtils.DOM_TEXT_NODE){
var _47d="";
if(!this.mapShowEmptyTexts){
var hide=true;
for(j=0;j<_47b.nodeValue.length;j++){
if(_47b.nodeValue.charAt(j)!=="\n"&&_47b.nodeValue.charAt(j)!=="\t"&&_47b.nodeValue.charAt(j)!==" "){
hide=false;
break;
}
}
if(hide){
continue;
}
}
this.mapAppendObjectLink(_47b,_47a,i);
this.mapResultBuffer+=this.highlight("text");
if(_47b.nodeValue.length>this.mapExcerptSize){
_47d=_47b.nodeValue.substring(0,this.mapExcerptSize)+" (...)";
}else{
_47d=_47b.nodeValue;
}
this.mapResultBuffer+=" \""+_47d+"\"<br />";
}
if(_47b.nodeType===simpleUtils.DOM_COMMENT_NODE){
_47d="";
this.mapAppendObjectLink(_47b,_47a,i);
this.mapResultBuffer+=this.highlight("comment");
if(_47b.nodeValue.length>this.mapExcerptSize){
_47d=_47b.nodeValue.substring(0,this.mapExcerptSize)+" (...)";
}else{
_47d=_47b.nodeValue;
}
this.mapResultBuffer+=" \""+_47d+"\"<br />";
}
if(_47b.nodeType===simpleUtils.DOM_DOCUMENT_TYPE_NODE){
this.mapAppendObjectLink(_47b,_47a,i);
this.mapResultBuffer+=this.highlight("DOCTYPE")+" "+_47b.nodeName+" PUBLIC \""+_47b.publicId+"\"<br />";
}
this.mapDOMSubtree(_47b,_47a+1);
}
if(_47a===0){
this.write(this.mapResultBuffer);
}
};
this.mapDynamicCSS=function(obj,_47e){
obj=simpleUtils.toObject(obj);
var id="";
var _47f="";
var _480;
if(_47e===undefined){
_47e=0;
}
var _481;
if(obj!==document.body&&obj.parentNode){
this.mapDynamicCSS(obj.parentNode,_47e+1);
}else{
_481=_47e;
}
if(obj.nodeName.toUpperCase()==="#TEXT"){
this.writeLn(this.tabulator(_481-_47e)+this.highlight(obj.nodeName));
return;
}
this.write(this.tabulator(_481-_47e)+this.highlight(obj.nodeName));
if(obj.id){
id=" id: "+this.highlightAppendLink(obj.id);
}
if(obj.className){
_47f=" class: "+obj.className;
}
this.writeLn(id+_47f);
if(obj.style.cssText){
_480=obj.style.cssText.split(";");
for(var i=0;i<_480.length;i++){
if(_480[i].length){
this.writeLn(this.tabulator(_481-_47e)+_480[i]+";");
}
}
}
};
this.listCSS=function(){
var _482=false;
for(var i=0;i<document.childNodes.length;i++){
var _483=document.childNodes[i];
if(_483.nodeType===simpleUtils.DOM_ELEMENT_NODE&&_483.nodeName.toUpperCase()==="HTML"){
var _484=_483;
for(var j=0;j<_484.childNodes.length;j++){
_483=_484.childNodes[j];
if(_483.nodeType===simpleUtils.DOM_ELEMENT_NODE&&_483.nodeName.toUpperCase()==="HEAD"){
_482=_483;
}
}
}
}
if(_482){
for(i=0;i<_482.childNodes.length;i++){
_483=_482.childNodes[i];
if(_483.nodeType===simpleUtils.DOM_ELEMENT_NODE){
if(_483.nodeName.toUpperCase()==="STYLE"){
this.listCSS_HandleStyleNode(_483);
}
if(_483.nodeName.toUpperCase()==="LINK"){
this.listCSS_HandleLinkNode(_483);
}
}
}
}
};
this.listCSS_getFormattedRule=function(_485){
var _486=[];
if(simpleUtils.trimString(_485).search("\n")>0){
_486=simpleUtils.trimString(_485).split(/\n/);
}else{
_486=simpleUtils.trimString(_485).split(/;/);
}
for(var i=0;i<_486.length;i++){
var tab="";
if(_486[i].search(/{/)>0){
}else{
if(simpleUtils.trimString(_486[i])==="}"){
}else{
tab=this.tabulator(1);
}
}
_486[i]=tab+_486[i];
}
return _486;
};
this.listCSS_HandleStyleNode=function(node){
if(node.textContent){
var _487=this.listCSS_getFormattedRule(node.textContent);
}else{
if(node.innerHTML){
_487=this.listCSS_getFormattedRule(node.innerHTML);
}else{
return;
}
}
this.writeLn("/* STYLE node */");
for(var i=0;i<_487.length;i++){
this.writeLn(_487[i]);
}
};
this.listCSS_HandleLinkNode=function(node){
if(node.rel.toUpperCase()==="STYLESHEET"||node.type.toUpperCase()==="TEXT/CSS"){
this.writeLn("/* LINK node: "+node.href+" */");
if(node.sheet){
for(var i=0;i<node.sheet.cssRules.length;i++){
var _488=this.listCSS_getFormattedRule(node.sheet.cssRules[i].cssText);
for(var j=0;j<_488.length;j++){
if(_488[j].search("{")>0){
var _489=_488[j].split(/{/);
if(_489.length!==2){
this.writeLn(_488[j]+";");
}
this.writeLn(_489[0]+" {");
this.writeLn(this.tabulator(1)+simpleUtils.trimString(_489[1])+";");
}else{
if(simpleUtils.trimString(_488[j])==="}"){
this.writeLn(_488[j]);
}else{
this.writeLn(_488[j]+";");
}
}
}
}
}else{
if(node.styleSheet){
_488=this.listCSS_getFormattedRule(node.styleSheet.cssText);
for(i=0;i<_488.length;i++){
if(_488[i].search("{")>0){
_489=_488[i].split(/{/);
this.writeLn(_489[0]+" {");
}else{
if(simpleUtils.trimString(_488[i])==="}"){
this.writeLn(_488[i]);
}else{
_489=simpleUtils.trimString(_488[i]).split(/;/);
for(j=0;j<_489.length;j++){
var tab="";
if(j>0){
tab=this.tabulator(1);
}
this.writeLn(tab+_489[j]+";");
}
}
}
}
}
}
}
};
this.license=function(){
this.writeLn("The ConSense MIT-like license:<br />");
this.writeLn("---license---");
this.writeLn("Copyright (c) 2005-2008 Bal&aacute;zs T&oacute;th (contact dot consense at gmail dot com)<br />");
this.writeLn("Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br />");
this.writeLn("The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br />");
this.writeLn("THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.");
this.writeLn("---end of license---<br />");
this.writeLn("For the third-party library licenses please see the documentation.");
};
this.help=function(){
this.writeLn("Command shorthands:");
this.writeManualEntry("","All obj parameters may be JavaScript/DOM object references or DOM id strings (eg. conSenseIn or \"conSenseIn\").");
this.writeManualEntry("clear()","clears screen");
this.writeManualEntry("debug(value0, value1)","shorthand for conSense.debugLn(value0, value1), writes a minimal, timestamped debug message. "+this.highlightAppendLink("conSense.debug")+" toggles output.");
this.writeManualEntry("help()","");
this.writeManualEntry("list(obj)"," or "+this.highlightAppendLink("inspect(obj)")+" shorthand for conSense.listObject(obj), lists object members");
this.writeManualEntry("listCSS()","shorthand for conSense.listCSS(), lists full static CSS info of the page");
this.writeManualEntry("listStyle(obj)","shorthand for conSense.listObjectStyle(obj), lists the style member of an object");
this.writeManualEntry("load(uri, callback)","shorthand for redSandGenericLoader.load(uri, callback), loads external content identified by uri. If no callback is defined, redSandGenericLoader.JavaScriptEvaluatorCallback() is invoked. Asynchronous operation, execution takes place on finished loading. Use \"browsable\" file extensions, eg. .txt for your external files.");
this.writeManualEntry("map(obj)","shorthand for conSense.mapDOMSubtree(obj), maps the subtree of a DOM element. Set "+conSense.highlightAppendLink("conSense.mapShowEmptyTexts")+" to display empty text nodes. Set "+conSense.highlightAppendLink("conSense.mapShowConSense")+" to expand conSenseContainer in higher level perspectives. Click (o) for a temporary representation of an object valid until next mapping. map() defaults to document if no parameter is passed.");
this.writeManualEntry("mapCSS(obj)","shorthand for conSense.mapDynamicCSS(obj), lists the element's and its predecessors' inline and dynamic style info up to the root");
this.writeManualEntry("outline(obj)","shorthand for conSense.outlineDOMElement(obj), draws with "+this.highlightAppendLink("conSense.outlineColor"));
this.writeManualEntry("outlineAll(tagName)","shorthand for conSense.outlineDOMElementsByTag(tagName), draws with "+this.highlightAppendLink("conSense.outlineColor")+", tagName stands for an HTML tag");
this.writeManualEntry("outlineSub(obj)","shorthand for conSense.outlineDOMSubtree(obj), outlines a subtree of the DOM rooting out of the parameter element. Draws with "+this.highlightAppendLink("conSense.outlineColor")+".");
this.writeManualEntry("write(value)","");
this.writeLn("To enumerate ConSense functions call "+this.highlightAppendLink("list(conSense)")+".");
this.writeLn("To enumerate SimpleDebug functions call "+this.highlightAppendLink("list(simpleDebug)")+".");
this.writeLn("To enumerate SimpleUtilities functions call "+this.highlightAppendLink("list(simpleUtils)")+".");
this.writeLn("To enumerate SimpleCryptography functions call "+this.highlightAppendLink("list(simpleCrypto)")+".");
this.writeLn("Otherwise all JavaScript expressions are accepted.");
this.writeLn(this.highlight("This")+" style is used for simple highlighting and "+this.highlightAppendLink("this")+" is a clickable autoappend input string.");
this.writeLn("Doubleclicking the output area focuses the input line. Up/down arrow keys control command history.");
this.writeLn("Works best with Firefox 1.5+ and IE 6.0+.");
this.writeLn("ConSense is (c) 2005-2007 Bal&aacute;zs T&oacute;th. See "+this.highlightAppendLink("license()")+" for details.");
};
};
var conSense=new ConSense();
function clear(){
conSense.clearScreen();
};
function debug(_48a,_48b){
conSense.debugLn(_48a,_48b);
};
function help(){
conSense.help();
};
function license(){
conSense.license();
};
function list(obj){
conSense.listObject(obj);
};
function inspect(obj){
conSense.listObject(obj);
};
function listCSS(){
conSense.listCSS();
};
function listStyle(obj){
conSense.listObjectStyle(obj);
};
function load(uri,_48c){
redSandGenericLoader.load(uri,_48c);
};
function map(obj){
if(obj===undefined){
obj=document;
}
conSense.mapDOMSubtree(obj);
};
function mapCSS(obj){
conSense.mapDynamicCSS(obj);
};
function outline(obj){
conSense.outlineDOMElement(obj);
};
function outlineAll(_48d){
conSense.outlineDOMElementsByTag(_48d);
};
function outlineSub(obj){
conSense.outlineDOMSubtree(obj);
};
function write(_48e){
conSense.writeLn(_48e);
};

