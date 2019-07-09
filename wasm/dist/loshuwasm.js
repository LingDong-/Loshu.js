
var _LOSHUWASM = (new function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return (
function(_LOSHUWASM) {
  _LOSHUWASM = _LOSHUWASM || {};

var aa,e;var h;h||(h=typeof _LOSHUWASM !== 'undefined' ? _LOSHUWASM : {});var l={},m;for(m in h)h.hasOwnProperty(m)&&(l[m]=h[m]);h.arguments=[];h.thisProgram="./this.program";h.quit=function(a,b){throw b;};h.preRun=[];h.postRun=[];var n=!1,q=!1,r=!1,ba=!1,ca=!1;n="object"===typeof window;q="function"===typeof importScripts;r=(ba="object"===typeof process&&"function"===typeof require)&&!n&&!q;ca=!n&&!r&&!q;var w="";
if(r){w=__dirname+"/";var da,ea;h.read=function(a,b){da||(da=require("fs"));ea||(ea=require("path"));a=ea.normalize(a);a=da.readFileSync(a);return b?a:a.toString()};h.readBinary=function(a){a=h.read(a,!0);a.buffer||(a=new Uint8Array(a));assert(a.buffer);return a};1<process.argv.length&&(h.thisProgram=process.argv[1].replace(/\\/g,"/"));h.arguments=process.argv.slice(2);process.on("uncaughtException",function(a){if(!(a instanceof fa))throw a;});process.on("unhandledRejection",x);h.quit=function(a){process.exit(a)};
h.inspect=function(){return"[Emscripten Module object]"}}else if(ca)"undefined"!=typeof read&&(h.read=function(a){return read(a)}),h.readBinary=function(a){if("function"===typeof readbuffer)return new Uint8Array(readbuffer(a));a=read(a,"binary");assert("object"===typeof a);return a},"undefined"!=typeof scriptArgs?h.arguments=scriptArgs:"undefined"!=typeof arguments&&(h.arguments=arguments),"function"===typeof quit&&(h.quit=function(a){quit(a)});else if(n||q)q?w=self.location.href:document.currentScript&&
(w=document.currentScript.src),_scriptDir&&(w=_scriptDir),0!==w.indexOf("blob:")?w=w.substr(0,w.lastIndexOf("/")+1):w="",h.read=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},q&&(h.readBinary=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),h.readAsync=function(a,b,c){var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=function(){200==d.status||
0==d.status&&d.response?b(d.response):c()};d.onerror=c;d.send(null)},h.setWindowTitle=function(a){document.title=a};var ha=h.print||("undefined"!==typeof console?console.log.bind(console):"undefined"!==typeof print?print:null),y=h.printErr||("undefined"!==typeof printErr?printErr:"undefined"!==typeof console&&console.warn.bind(console)||ha);for(m in l)l.hasOwnProperty(m)&&(h[m]=l[m]);l=void 0;var ia={"f64-rem":function(a,b){return a%b},"debugger":function(){debugger}};
"object"!==typeof WebAssembly&&y("no native wasm support detected");var z,ja=!1;function assert(a,b){a||x("Assertion failed: "+b)}var ka="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function A(a,b,c){var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.subarray&&ka)return ka.decode(a.subarray(b,c));for(d="";b<c;){var f=a[b++];if(f&128){var g=a[b++]&63;if(192==(f&224))d+=String.fromCharCode((f&31)<<6|g);else{var k=a[b++]&63;f=224==(f&240)?(f&15)<<12|g<<6|k:(f&7)<<18|g<<12|k<<6|a[b++]&63;65536>f?d+=String.fromCharCode(f):(f-=65536,d+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else d+=String.fromCharCode(f)}return d}function la(a){return a?A(C,a,void 0):""}
function ma(a,b,c,d){if(!(0<d))return 0;var f=c;d=c+d-1;for(var g=0;g<a.length;++g){var k=a.charCodeAt(g);if(55296<=k&&57343>=k){var p=a.charCodeAt(++g);k=65536+((k&1023)<<10)|p&1023}if(127>=k){if(c>=d)break;b[c++]=k}else{if(2047>=k){if(c+1>=d)break;b[c++]=192|k>>6}else{if(65535>=k){if(c+2>=d)break;b[c++]=224|k>>12}else{if(c+3>=d)break;b[c++]=240|k>>18;b[c++]=128|k>>12&63}b[c++]=128|k>>6&63}b[c++]=128|k&63}}b[c]=0;return c-f}
function na(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&(d=65536+((d&1023)<<10)|a.charCodeAt(++c)&1023);127>=d?++b:b=2047>=d?b+2:65535>=d?b+3:b+4}return b}"undefined"!==typeof TextDecoder&&new TextDecoder("utf-16le");function oa(a){0<a%65536&&(a+=65536-a%65536);return a}var buffer,E,C,G;
function pa(){h.HEAP8=E=new Int8Array(buffer);h.HEAP16=new Int16Array(buffer);h.HEAP32=G=new Int32Array(buffer);h.HEAPU8=C=new Uint8Array(buffer);h.HEAPU16=new Uint16Array(buffer);h.HEAPU32=new Uint32Array(buffer);h.HEAPF32=new Float32Array(buffer);h.HEAPF64=new Float64Array(buffer)}var qa=h.TOTAL_MEMORY||16777216;5242880>qa&&y("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+qa+"! (TOTAL_STACK=5242880)");
h.buffer?buffer=h.buffer:"object"===typeof WebAssembly&&"function"===typeof WebAssembly.Memory?(z=new WebAssembly.Memory({initial:qa/65536}),buffer=z.buffer):buffer=new ArrayBuffer(qa);pa();G[5704]=5265728;function ra(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b();else{var c=b.ob;"number"===typeof c?void 0===b.Wa?h.dynCall_v(c):h.dynCall_vi(c,b.Wa):c(void 0===b.Wa?null:b.Wa)}}}var sa=[],ta=[],ua=[],va=[],wa=!1;function xa(){var a=h.preRun.shift();sa.unshift(a)}
var ya=Math.abs,za=Math.ceil,Aa=Math.floor,Ba=Math.min,H=0,Ca=null,I=null;h.preloadedImages={};h.preloadedAudios={};function Da(){var a=J;return String.prototype.startsWith?a.startsWith("data:application/octet-stream;base64,"):0===a.indexOf("data:application/octet-stream;base64,")}var J="loshuwasm.wasm";if(!Da()){var Ea=J;J=h.locateFile?h.locateFile(Ea,w):w+Ea}
function Fa(){try{if(h.wasmBinary)return new Uint8Array(h.wasmBinary);if(h.readBinary)return h.readBinary(J);throw"both async and sync fetching of the wasm failed";}catch(a){x(a)}}function Ga(){return h.wasmBinary||!n&&!q||"function"!==typeof fetch?new Promise(function(a){a(Fa())}):fetch(J,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+J+"'";return a.arrayBuffer()}).catch(function(){return Fa()})}
function Ha(a){function b(a){h.asm=a.exports;H--;h.monitorRunDependencies&&h.monitorRunDependencies(H);0==H&&(null!==Ca&&(clearInterval(Ca),Ca=null),I&&(a=I,I=null,a()))}function c(a){b(a.instance)}function d(a){return Ga().then(function(a){return WebAssembly.instantiate(a,f)}).then(a,function(a){y("failed to asynchronously prepare wasm: "+a);x(a)})}var f={env:a,global:{NaN:NaN,Infinity:Infinity},"global.Math":Math,asm2wasm:ia};H++;h.monitorRunDependencies&&h.monitorRunDependencies(H);if(h.instantiateWasm)try{return h.instantiateWasm(f,
b)}catch(g){return y("Module.instantiateWasm callback failed with error: "+g),!1}(function(){if(h.wasmBinary||"function"!==typeof WebAssembly.instantiateStreaming||Da()||"function"!==typeof fetch)return d(c);fetch(J,{credentials:"same-origin"}).then(function(a){return WebAssembly.instantiateStreaming(a,f).then(c,function(a){y("wasm streaming compile failed: "+a);y("falling back to ArrayBuffer instantiation");d(c)})})})();return{}}
h.asm=function(a,b){b.memory=z;b.table=new WebAssembly.Table({initial:482,maximum:482,element:"anyfunc"});b.__memory_base=1024;b.__table_base=0;return Ha(b)};ta.push({ob:function(){Ia()}});function Ja(a){h.___errno_location&&(G[h.___errno_location()>>2]=a);return a}function Ka(a,b){for(var c=0,d=a.length-1;0<=d;d--){var f=a[d];"."===f?a.splice(d,1):".."===f?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");return a}
function La(a){var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=Ka(a.split("/").filter(function(a){return!!a}),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+a}function Ma(a){var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=b[0];b=b[1];if(!a&&!b)return".";b&&(b=b.substr(0,b.length-1));return a+b}function Na(a){if("/"===a)return"/";var b=a.lastIndexOf("/");return-1===b?a:a.substr(b+1)}
function Oa(){var a=Array.prototype.slice.call(arguments,0);return La(a.join("/"))}function K(a,b){return La(a+"/"+b)}function Pa(){for(var a="",b=!1,c=arguments.length-1;-1<=c&&!b;c--){b=0<=c?arguments[c]:"/";if("string"!==typeof b)throw new TypeError("Arguments to path.resolve must be strings");if(!b)return"";a=b+"/"+a;b="/"===b.charAt(0)}a=Ka(a.split("/").filter(function(a){return!!a}),!b).join("/");return(b?"/":"")+a||"."}var Ra=[];function Sa(a,b){Ra[a]={input:[],output:[],Ia:b};Ta(a,Ua)}
var Ua={open:function(a){var b=Ra[a.node.rdev];if(!b)throw new L(19);a.tty=b;a.seekable=!1},close:function(a){a.tty.Ia.flush(a.tty)},flush:function(a){a.tty.Ia.flush(a.tty)},read:function(a,b,c,d){if(!a.tty||!a.tty.Ia.jb)throw new L(6);for(var f=0,g=0;g<d;g++){try{var k=a.tty.Ia.jb(a.tty)}catch(p){throw new L(5);}if(void 0===k&&0===f)throw new L(11);if(null===k||void 0===k)break;f++;b[c+g]=k}f&&(a.node.timestamp=Date.now());return f},write:function(a,b,c,d){if(!a.tty||!a.tty.Ia.Za)throw new L(6);
try{for(var f=0;f<d;f++)a.tty.Ia.Za(a.tty,b[c+f])}catch(g){throw new L(5);}d&&(a.node.timestamp=Date.now());return f}},Wa={jb:function(a){if(!a.input.length){var b=null;if(r){var c=new Buffer(256),d=0,f=process.stdin.fd;if("win32"!=process.platform){var g=!1;try{f=fs.openSync("/dev/stdin","r"),g=!0}catch(k){}}try{d=fs.readSync(f,c,0,256,null)}catch(k){if(-1!=k.toString().indexOf("EOF"))d=0;else throw k;}g&&fs.closeSync(f);0<d?b=c.slice(0,d).toString("utf-8"):b=null}else"undefined"!=typeof window&&
"function"==typeof window.prompt?(b=window.prompt("Input: "),null!==b&&(b+="\n")):"function"==typeof readline&&(b=readline(),null!==b&&(b+="\n"));if(!b)return null;a.input=Va(b,!0)}return a.input.shift()},Za:function(a,b){null===b||10===b?(ha(A(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&(ha(A(a.output,0)),a.output=[])}},Xa={Za:function(a,b){null===b||10===b?(y(A(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&
(y(A(a.output,0)),a.output=[])}},M={Ea:null,Aa:function(){return M.createNode(null,"/",16895,0)},createNode:function(a,b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new L(1);M.Ea||(M.Ea={dir:{node:{Fa:M.va.Fa,Da:M.va.Da,lookup:M.va.lookup,Ka:M.va.Ka,rename:M.va.rename,unlink:M.va.unlink,rmdir:M.va.rmdir,readdir:M.va.readdir,symlink:M.va.symlink},stream:{Ga:M.ua.Ga}},file:{node:{Fa:M.va.Fa,Da:M.va.Da},stream:{Ga:M.ua.Ga,read:M.ua.read,write:M.ua.write,ab:M.ua.ab,kb:M.ua.kb,Qa:M.ua.Qa}},link:{node:{Fa:M.va.Fa,
Da:M.va.Da,readlink:M.va.readlink},stream:{}},cb:{node:{Fa:M.va.Fa,Da:M.va.Da},stream:Ya}});c=Za(a,b,c,d);16384===(c.mode&61440)?(c.va=M.Ea.dir.node,c.ua=M.Ea.dir.stream,c.ta={}):32768===(c.mode&61440)?(c.va=M.Ea.file.node,c.ua=M.Ea.file.stream,c.ya=0,c.ta=null):40960===(c.mode&61440)?(c.va=M.Ea.link.node,c.ua=M.Ea.link.stream):8192===(c.mode&61440)&&(c.va=M.Ea.cb.node,c.ua=M.Ea.cb.stream);c.timestamp=Date.now();a&&(a.ta[b]=c);return c},Cb:function(a){if(a.ta&&a.ta.subarray){for(var b=[],c=0;c<a.ya;++c)b.push(a.ta[c]);
return b}return a.ta},Db:function(a){return a.ta?a.ta.subarray?a.ta.subarray(0,a.ya):new Uint8Array(a.ta):new Uint8Array},eb:function(a,b){var c=a.ta?a.ta.length:0;c>=b||(b=Math.max(b,c*(1048576>c?2:1.125)|0),0!=c&&(b=Math.max(b,256)),c=a.ta,a.ta=new Uint8Array(b),0<a.ya&&a.ta.set(c.subarray(0,a.ya),0))},sb:function(a,b){if(a.ya!=b)if(0==b)a.ta=null,a.ya=0;else{if(!a.ta||a.ta.subarray){var c=a.ta;a.ta=new Uint8Array(new ArrayBuffer(b));c&&a.ta.set(c.subarray(0,Math.min(b,a.ya)))}else if(a.ta||(a.ta=
[]),a.ta.length>b)a.ta.length=b;else for(;a.ta.length<b;)a.ta.push(0);a.ya=b}},va:{Fa:function(a){var b={};b.dev=8192===(a.mode&61440)?a.id:1;b.ino=a.id;b.mode=a.mode;b.nlink=1;b.uid=0;b.gid=0;b.rdev=a.rdev;16384===(a.mode&61440)?b.size=4096:32768===(a.mode&61440)?b.size=a.ya:40960===(a.mode&61440)?b.size=a.link.length:b.size=0;b.atime=new Date(a.timestamp);b.mtime=new Date(a.timestamp);b.ctime=new Date(a.timestamp);b.Ha=4096;b.blocks=Math.ceil(b.size/b.Ha);return b},Da:function(a,b){void 0!==b.mode&&
(a.mode=b.mode);void 0!==b.timestamp&&(a.timestamp=b.timestamp);void 0!==b.size&&M.sb(a,b.size)},lookup:function(){throw $a[2];},Ka:function(a,b,c,d){return M.createNode(a,b,c,d)},rename:function(a,b,c){if(16384===(a.mode&61440)){try{var d=ab(b,c)}catch(g){}if(d)for(var f in d.ta)throw new L(39);}delete a.parent.ta[a.name];a.name=c;b.ta[c]=a;a.parent=b},unlink:function(a,b){delete a.ta[b]},rmdir:function(a,b){var c=ab(a,b),d;for(d in c.ta)throw new L(39);delete a.ta[b]},readdir:function(a){var b=
[".",".."],c;for(c in a.ta)a.ta.hasOwnProperty(c)&&b.push(c);return b},symlink:function(a,b,c){a=M.createNode(a,b,41471,0);a.link=c;return a},readlink:function(a){if(40960!==(a.mode&61440))throw new L(22);return a.link}},ua:{read:function(a,b,c,d,f){var g=a.node.ta;if(f>=a.node.ya)return 0;a=Math.min(a.node.ya-f,d);if(8<a&&g.subarray)b.set(g.subarray(f,f+a),c);else for(d=0;d<a;d++)b[c+d]=g[f+d];return a},write:function(a,b,c,d,f,g){g=!1;if(!d)return 0;a=a.node;a.timestamp=Date.now();if(b.subarray&&
(!a.ta||a.ta.subarray)){if(g)return a.ta=b.subarray(c,c+d),a.ya=d;if(0===a.ya&&0===f)return a.ta=new Uint8Array(b.subarray(c,c+d)),a.ya=d;if(f+d<=a.ya)return a.ta.set(b.subarray(c,c+d),f),d}M.eb(a,f+d);if(a.ta.subarray&&b.subarray)a.ta.set(b.subarray(c,c+d),f);else for(g=0;g<d;g++)a.ta[f+g]=b[c+g];a.ya=Math.max(a.ya,f+d);return d},Ga:function(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.ya);if(0>b)throw new L(22);return b},ab:function(a,b,c){M.eb(a.node,b+c);a.node.ya=
Math.max(a.node.ya,b+c)},kb:function(a,b,c,d,f,g,k){if(32768!==(a.node.mode&61440))throw new L(19);c=a.node.ta;if(k&2||c.buffer!==b&&c.buffer!==b.buffer){if(0<f||f+d<a.node.ya)c.subarray?c=c.subarray(f,f+d):c=Array.prototype.slice.call(c,f,f+d);a=!0;d=bb(d);if(!d)throw new L(12);b.set(c,d)}else a=!1,d=c.byteOffset;return{sa:d,mb:a}},Qa:function(a,b,c,d,f){if(32768!==(a.node.mode&61440))throw new L(19);if(f&2)return 0;M.ua.write(a,b,0,d,c,!1);return 0}}},N={Oa:!1,ub:function(){N.Oa=!!process.platform.match(/^win/);
var a=process.binding("constants");a.fs&&(a=a.fs);N.fb={1024:a.O_APPEND,64:a.O_CREAT,128:a.O_EXCL,0:a.O_RDONLY,2:a.O_RDWR,4096:a.O_SYNC,512:a.O_TRUNC,1:a.O_WRONLY}},bb:function(a){return Buffer.Ca?Buffer.from(a):new Buffer(a)},Aa:function(a){assert(ba);return N.createNode(null,"/",N.ib(a.Ya.root),0)},createNode:function(a,b,c){if(16384!==(c&61440)&&32768!==(c&61440)&&40960!==(c&61440))throw new L(22);a=Za(a,b,c);a.va=N.va;a.ua=N.ua;return a},ib:function(a){try{var b=fs.lstatSync(a);N.Oa&&(b.mode=
b.mode|(b.mode&292)>>2)}catch(c){if(!c.code)throw c;throw new L(-c.wa);}return b.mode},Ba:function(a){for(var b=[];a.parent!==a;)b.push(a.name),a=a.parent;b.push(a.Aa.Ya.root);b.reverse();return Oa.apply(null,b)},nb:function(a){a&=-2656257;var b=0,c;for(c in N.fb)a&c&&(b|=N.fb[c],a^=c);if(a)throw new L(22);return b},va:{Fa:function(a){a=N.Ba(a);try{var b=fs.lstatSync(a)}catch(c){if(!c.code)throw c;throw new L(-c.wa);}N.Oa&&!b.Ha&&(b.Ha=4096);N.Oa&&!b.blocks&&(b.blocks=(b.size+b.Ha-1)/b.Ha|0);return{dev:b.dev,
ino:b.ino,mode:b.mode,nlink:b.nlink,uid:b.uid,gid:b.gid,rdev:b.rdev,size:b.size,atime:b.atime,mtime:b.mtime,ctime:b.ctime,Ha:b.Ha,blocks:b.blocks}},Da:function(a,b){var c=N.Ba(a);try{void 0!==b.mode&&(fs.chmodSync(c,b.mode),a.mode=b.mode),void 0!==b.size&&fs.truncateSync(c,b.size)}catch(d){if(!d.code)throw d;throw new L(-d.wa);}},lookup:function(a,b){var c=K(N.Ba(a),b);c=N.ib(c);return N.createNode(a,b,c)},Ka:function(a,b,c,d){a=N.createNode(a,b,c,d);b=N.Ba(a);try{16384===(a.mode&61440)?fs.mkdirSync(b,
a.mode):fs.writeFileSync(b,"",{mode:a.mode})}catch(f){if(!f.code)throw f;throw new L(-f.wa);}return a},rename:function(a,b,c){a=N.Ba(a);b=K(N.Ba(b),c);try{fs.renameSync(a,b)}catch(d){if(!d.code)throw d;throw new L(-d.wa);}},unlink:function(a,b){a=K(N.Ba(a),b);try{fs.unlinkSync(a)}catch(c){if(!c.code)throw c;throw new L(-c.wa);}},rmdir:function(a,b){a=K(N.Ba(a),b);try{fs.rmdirSync(a)}catch(c){if(!c.code)throw c;throw new L(-c.wa);}},readdir:function(a){a=N.Ba(a);try{return fs.readdirSync(a)}catch(b){if(!b.code)throw b;
throw new L(-b.wa);}},symlink:function(a,b,c){a=K(N.Ba(a),b);try{fs.symlinkSync(c,a)}catch(d){if(!d.code)throw d;throw new L(-d.wa);}},readlink:function(a){var b=N.Ba(a);try{return b=fs.readlinkSync(b),b=cb.relative(cb.resolve(a.Aa.Ya.root),b)}catch(c){if(!c.code)throw c;throw new L(-c.wa);}}},ua:{open:function(a){var b=N.Ba(a.node);try{32768===(a.node.mode&61440)&&(a.La=fs.openSync(b,N.nb(a.flags)))}catch(c){if(!c.code)throw c;throw new L(-c.wa);}},close:function(a){try{32768===(a.node.mode&61440)&&
a.La&&fs.closeSync(a.La)}catch(b){if(!b.code)throw b;throw new L(-b.wa);}},read:function(a,b,c,d,f){if(0===d)return 0;try{return fs.readSync(a.La,N.bb(b.buffer),c,d,f)}catch(g){throw new L(-g.wa);}},write:function(a,b,c,d,f){try{return fs.writeSync(a.La,N.bb(b.buffer),c,d,f)}catch(g){throw new L(-g.wa);}},Ga:function(a,b,c){if(1===c)b+=a.position;else if(2===c&&32768===(a.node.mode&61440))try{b+=fs.fstatSync(a.La).size}catch(d){throw new L(-d.wa);}if(0>b)throw new L(22);return b}}},db=null,eb={},
O=[],fb=1,P=null,gb=!0,hb={},L=null,$a={};
function Q(a,b){a=Pa("/",a);b=b||{};if(!a)return{path:"",node:null};var c={hb:!0,$a:0},d;for(d in c)void 0===b[d]&&(b[d]=c[d]);if(8<b.$a)throw new L(40);a=Ka(a.split("/").filter(function(a){return!!a}),!1);var f=db;c="/";for(d=0;d<a.length;d++){var g=d===a.length-1;if(g&&b.parent)break;f=ab(f,a[d]);c=K(c,a[d]);f.Pa&&(!g||g&&b.hb)&&(f=f.Pa.root);if(!g||b.gb)for(g=0;40960===(f.mode&61440);)if(f=ib(c),c=Pa(Ma(c),f),f=Q(c,{$a:b.$a}).node,40<g++)throw new L(40);}return{path:c,node:f}}
function jb(a){for(var b;;){if(a===a.parent)return a=a.Aa.lb,b?"/"!==a[a.length-1]?a+"/"+b:a+b:a;b=b?a.name+"/"+b:a.name;a=a.parent}}function kb(a,b){for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return(a+c>>>0)%P.length}function lb(a){var b=kb(a.parent.id,a.name);a.rb=P[b];P[b]=a}function ab(a,b){var c;if(c=(c=mb(a,"x"))?c:a.va.lookup?0:13)throw new L(c,a);for(c=P[kb(a.id,b)];c;c=c.rb){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.va.lookup(a,b)}
function Za(a,b,c,d){nb||(nb=function(a,b,c,d){a||(a=this);this.parent=a;this.Aa=a.Aa;this.Pa=null;this.id=fb++;this.name=b;this.mode=c;this.va={};this.ua={};this.rdev=d},nb.prototype={},Object.defineProperties(nb.prototype,{read:{get:function(){return 365===(this.mode&365)},set:function(a){a?this.mode|=365:this.mode&=-366}},write:{get:function(){return 146===(this.mode&146)},set:function(a){a?this.mode|=146:this.mode&=-147}}}));a=new nb(a,b,c,d);lb(a);return a}
var ob={r:0,rs:1052672,"r+":2,w:577,wx:705,xw:705,"w+":578,"wx+":706,"xw+":706,a:1089,ax:1217,xa:1217,"a+":1090,"ax+":1218,"xa+":1218};function pb(a){var b=["r","w","rw"][a&3];a&512&&(b+="w");return b}function mb(a,b){if(gb)return 0;if(-1===b.indexOf("r")||a.mode&292){if(-1!==b.indexOf("w")&&!(a.mode&146)||-1!==b.indexOf("x")&&!(a.mode&73))return 13}else return 13;return 0}function qb(a,b){try{return ab(a,b),17}catch(c){}return mb(a,"wx")}
function rb(){var a=4096;for(var b=0;b<=a;b++)if(!O[b])return b;throw new L(24);}function sb(a){tb||(tb=function(){},tb.prototype={},Object.defineProperties(tb.prototype,{object:{get:function(){return this.node},set:function(a){this.node=a}}}));var b=new tb,c;for(c in a)b[c]=a[c];a=b;b=rb();a.fd=b;return O[b]=a}var Ya={open:function(a){a.ua=eb[a.node.rdev].ua;a.ua.open&&a.ua.open(a)},Ga:function(){throw new L(29);}};function Ta(a,b){eb[a]={ua:b}}
function ub(a,b){var c="/"===b,d=!b;if(c&&db)throw new L(16);if(!c&&!d){var f=Q(b,{hb:!1});b=f.path;f=f.node;if(f.Pa)throw new L(16);if(16384!==(f.mode&61440))throw new L(20);}b={type:a,Ya:{},lb:b,qb:[]};a=a.Aa(b);a.Aa=b;b.root=a;c?db=a:f&&(f.Pa=b,f.Aa&&f.Aa.qb.push(b))}function vb(a,b,c){var d=Q(a,{parent:!0}).node;a=Na(a);if(!a||"."===a||".."===a)throw new L(22);var f=qb(d,a);if(f)throw new L(f);if(!d.va.Ka)throw new L(1);return d.va.Ka(d,a,b,c)}function S(a){vb(a,16895,0)}
function wb(a,b,c){"undefined"===typeof c&&(c=b,b=438);vb(a,b|8192,c)}function xb(a,b){if(!Pa(a))throw new L(2);var c=Q(b,{parent:!0}).node;if(!c)throw new L(2);b=Na(b);var d=qb(c,b);if(d)throw new L(d);if(!c.va.symlink)throw new L(1);c.va.symlink(c,b,a)}function ib(a){a=Q(a).node;if(!a)throw new L(2);if(!a.va.readlink)throw new L(22);return Pa(jb(a.parent),a.va.readlink(a))}
function yb(a,b){if(""===a)throw new L(2);if("string"===typeof b){var c=ob[b];if("undefined"===typeof c)throw Error("Unknown file open mode: "+b);b=c}var d=b&64?("undefined"===typeof d?438:d)&4095|32768:0;if("object"===typeof a)var f=a;else{a=La(a);try{f=Q(a,{gb:!(b&131072)}).node}catch(k){}}c=!1;if(b&64)if(f){if(b&128)throw new L(17);}else f=vb(a,d,0),c=!0;if(!f)throw new L(2);8192===(f.mode&61440)&&(b&=-513);if(b&65536&&16384!==(f.mode&61440))throw new L(20);if(!c&&(d=f?40960===(f.mode&61440)?40:
16384===(f.mode&61440)&&("r"!==pb(b)||b&512)?21:mb(f,pb(b)):2))throw new L(d);if(b&512){d=f;var g;"string"===typeof d?g=Q(d,{gb:!0}).node:g=d;if(!g.va.Da)throw new L(1);if(16384===(g.mode&61440))throw new L(21);if(32768!==(g.mode&61440))throw new L(22);if(d=mb(g,"w"))throw new L(d);g.va.Da(g,{size:0,timestamp:Date.now()})}b&=-641;f=sb({node:f,path:jb(f),flags:b,seekable:!0,position:0,ua:f.ua,Ab:[],error:!1});f.ua.open&&f.ua.open(f);!h.logReadFiles||b&1||(zb||(zb={}),a in zb||(zb[a]=1,console.log("FS.trackingDelegate error on read file: "+
a)));try{hb.onOpenFile&&(f=0,1!==(b&2097155)&&(f|=1),0!==(b&2097155)&&(f|=2),hb.onOpenFile(a,f))}catch(k){console.log("FS.trackingDelegate['onOpenFile']('"+a+"', flags) threw an exception: "+k.message)}}function Ab(a,b,c){if(null===a.fd)throw new L(9);if(!a.seekable||!a.ua.Ga)throw new L(29);if(0!=c&&1!=c&&2!=c)throw new L(22);a.position=a.ua.Ga(a,b,c);a.Ab=[]}
function Bb(){L||(L=function(a,b){this.node=b;this.tb=function(a){this.wa=a};this.tb(a);this.message="FS error";this.stack&&Object.defineProperty(this,"stack",{value:Error().stack,writable:!0})},L.prototype=Error(),L.prototype.constructor=L,[2].forEach(function(a){$a[a]=new L(a);$a[a].stack="<generic error, no stack>"}))}var Cb;function Db(a,b){var c=0;a&&(c|=365);b&&(c|=146);return c}
function Eb(a,b,c){a=K("/dev",a);var d=Db(!!b,!!c);Fb||(Fb=64);var f=Fb++<<8|0;Ta(f,{open:function(a){a.seekable=!1},close:function(){c&&c.buffer&&c.buffer.length&&c(10)},read:function(a,c,d,f){for(var g=0,k=0;k<f;k++){try{var p=b()}catch(B){throw new L(5);}if(void 0===p&&0===g)throw new L(11);if(null===p||void 0===p)break;g++;c[d+k]=p}g&&(a.node.timestamp=Date.now());return g},write:function(a,b,d,f){for(var g=0;g<f;g++)try{c(b[d+g])}catch(t){throw new L(5);}f&&(a.node.timestamp=Date.now());return g}});
wb(a,d,f)}var Fb,T={},nb,tb,zb,Gb={},U=0;function V(){U+=4;return G[U-4>>2]}function Hb(){var a=O[V()];if(!a)throw new L(9);return a}function Ib(){return E.length}var Jb={};function Kb(a){if(0===a)return 0;a=la(a);if(!Jb.hasOwnProperty(a))return 0;Kb.Ca&&Lb(Kb.Ca);a=Jb[a];var b=na(a)+1,c=bb(b);c&&ma(a,E,c,b);Kb.Ca=c;return Kb.Ca}function W(){W.Ca||(W.Ca=[]);W.Ca.push(Mb());return W.Ca.length-1}
function Nb(a){a=oa(a);var b=buffer.byteLength;try{return-1!==z.grow((a-b)/65536)?(buffer=z.buffer,!0):!1}catch(c){return!1}}function Ob(a){return 0===a%4&&(0!==a%100||0===a%400)}function Pb(a,b){for(var c=0,d=0;d<=b;c+=a[d++]);return c}var Qb=[31,29,31,30,31,30,31,31,30,31,30,31],Rb=[31,28,31,30,31,30,31,31,30,31,30,31];
function Sb(a,b){for(a=new Date(a.getTime());0<b;){var c=a.getMonth(),d=(Ob(a.getFullYear())?Qb:Rb)[c];if(b>d-a.getDate())b-=d-a.getDate()+1,a.setDate(1),11>c?a.setMonth(c+1):(a.setMonth(0),a.setFullYear(a.getFullYear()+1));else{a.setDate(a.getDate()+b);break}}return a}
function Tb(a,b,c,d){function f(a,b,c){for(a="number"===typeof a?a.toString():a||"";a.length<b;)a=c[0]+a;return a}function g(a,b){return f(a,b,"0")}function k(a,b){function c(a){return 0>a?-1:0<a?1:0}var d;0===(d=c(a.getFullYear()-b.getFullYear()))&&0===(d=c(a.getMonth()-b.getMonth()))&&(d=c(a.getDate()-b.getDate()));return d}function p(a){switch(a.getDay()){case 0:return new Date(a.getFullYear()-1,11,29);case 1:return a;case 2:return new Date(a.getFullYear(),0,3);case 3:return new Date(a.getFullYear(),
0,2);case 4:return new Date(a.getFullYear(),0,1);case 5:return new Date(a.getFullYear()-1,11,31);case 6:return new Date(a.getFullYear()-1,11,30)}}function v(a){a=Sb(new Date(a.za+1900,0,1),a.Ua);var b=p(new Date(a.getFullYear()+1,0,4));return 0>=k(p(new Date(a.getFullYear(),0,4)),a)?0>=k(b,a)?a.getFullYear()+1:a.getFullYear():a.getFullYear()-1}var u=G[d+40>>2];d={xb:G[d>>2],wb:G[d+4>>2],Sa:G[d+8>>2],Ma:G[d+12>>2],Ja:G[d+16>>2],za:G[d+20>>2],Ta:G[d+24>>2],Ua:G[d+28>>2],Gb:G[d+32>>2],vb:G[d+36>>2],
yb:u?la(u):""};c=la(c);u={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var t in u)c=c.replace(new RegExp(t,"g"),u[t]);var D="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
B="January February March April May June July August September October November December".split(" ");u={"%a":function(a){return D[a.Ta].substring(0,3)},"%A":function(a){return D[a.Ta]},"%b":function(a){return B[a.Ja].substring(0,3)},"%B":function(a){return B[a.Ja]},"%C":function(a){return g((a.za+1900)/100|0,2)},"%d":function(a){return g(a.Ma,2)},"%e":function(a){return f(a.Ma,2," ")},"%g":function(a){return v(a).toString().substring(2)},"%G":function(a){return v(a)},"%H":function(a){return g(a.Sa,
2)},"%I":function(a){a=a.Sa;0==a?a=12:12<a&&(a-=12);return g(a,2)},"%j":function(a){return g(a.Ma+Pb(Ob(a.za+1900)?Qb:Rb,a.Ja-1),3)},"%m":function(a){return g(a.Ja+1,2)},"%M":function(a){return g(a.wb,2)},"%n":function(){return"\n"},"%p":function(a){return 0<=a.Sa&&12>a.Sa?"AM":"PM"},"%S":function(a){return g(a.xb,2)},"%t":function(){return"\t"},"%u":function(a){return a.Ta||7},"%U":function(a){var b=new Date(a.za+1900,0,1),c=0===b.getDay()?b:Sb(b,7-b.getDay());a=new Date(a.za+1900,a.Ja,a.Ma);return 0>
k(c,a)?g(Math.ceil((31-c.getDate()+(Pb(Ob(a.getFullYear())?Qb:Rb,a.getMonth()-1)-31)+a.getDate())/7),2):0===k(c,b)?"01":"00"},"%V":function(a){var b=p(new Date(a.za+1900,0,4)),c=p(new Date(a.za+1901,0,4)),d=Sb(new Date(a.za+1900,0,1),a.Ua);return 0>k(d,b)?"53":0>=k(c,d)?"01":g(Math.ceil((b.getFullYear()<a.za+1900?a.Ua+32-b.getDate():a.Ua+1-b.getDate())/7),2)},"%w":function(a){return a.Ta},"%W":function(a){var b=new Date(a.za,0,1),c=1===b.getDay()?b:Sb(b,0===b.getDay()?1:7-b.getDay()+1);a=new Date(a.za+
1900,a.Ja,a.Ma);return 0>k(c,a)?g(Math.ceil((31-c.getDate()+(Pb(Ob(a.getFullYear())?Qb:Rb,a.getMonth()-1)-31)+a.getDate())/7),2):0===k(c,b)?"01":"00"},"%y":function(a){return(a.za+1900).toString().substring(2)},"%Y":function(a){return a.za+1900},"%z":function(a){a=a.vb;var b=0<=a;a=Math.abs(a)/60;return(b?"+":"-")+String("0000"+(a/60*100+a%60)).slice(-4)},"%Z":function(a){return a.yb},"%%":function(){return"%"}};for(t in u)0<=c.indexOf(t)&&(c=c.replace(new RegExp(t,"g"),u[t](d)));t=Va(c,!1);if(t.length>
b)return 0;E.set(t,a);return t.length-1}Bb();P=Array(4096);ub(M,"/");S("/tmp");S("/home");S("/home/web_user");
(function(){S("/dev");Ta(259,{read:function(){return 0},write:function(a,b,c,k){return k}});wb("/dev/null",259);Sa(1280,Wa);Sa(1536,Xa);wb("/dev/tty",1280);wb("/dev/tty1",1536);if("object"===typeof crypto&&"function"===typeof crypto.getRandomValues){var a=new Uint8Array(1);var b=function(){crypto.getRandomValues(a);return a[0]}}else if(r)try{var c=require("crypto");b=function(){return c.randomBytes(1)[0]}}catch(d){}b||(b=function(){x("random_device")});Eb("random",b);Eb("urandom",b);S("/dev/shm");
S("/dev/shm/tmp")})();S("/proc");S("/proc/self");S("/proc/self/fd");ub({Aa:function(){var a=Za("/proc/self","fd",16895,73);a.va={lookup:function(a,c){var b=O[+c];if(!b)throw new L(9);a={parent:null,Aa:{lb:"fake"},va:{readlink:function(){return b.path}}};return a.parent=a}};return a}},"/proc/self/fd");if(ba){var fs=require("fs"),cb=require("path");N.ub()}function Va(a,b){var c=Array(na(a)+1);a=ma(a,c,0,c.length);b&&(c.length=a);return c}
var Wb=h.asm({},{c:x,h:function(a){return bb(a)},f:function(a){"uncaught_exception"in Ub?Ub.Ra++:Ub.Ra=1;throw a;},p:function(){return!!Ub.Ra},l:function(){},o:function(){Ja(1);return-1},k:Ja,n:function(a,b){U=b;try{var c=Hb(),d=V(),f=V(),g=V(),k=V();a=4294967296*d+(f>>>0);if(-9007199254740992>=a||9007199254740992<=a)return-75;Ab(c,a,k);aa=[c.position>>>0,(e=c.position,1<=+ya(e)?0<e?(Ba(+Aa(e/4294967296),4294967295)|0)>>>0:~~+za((e-+(~~e>>>0))/4294967296)>>>0:0)];G[g>>2]=aa[0];G[g+4>>2]=aa[1];c.Xa&&
0===a&&0===k&&(c.Xa=null);return 0}catch(p){return"undefined"!==typeof T&&p instanceof L||x(p),-p.wa}},m:function(a,b){U=b;try{var c=Hb(),d=V();a:{var f=V();for(b=a=0;b<f;b++){var g=G[d+(8*b+4)>>2],k=c,p=G[d+8*b>>2],v=g,u=void 0,t=E;if(0>v||0>u)throw new L(22);if(null===k.fd)throw new L(9);if(1===(k.flags&2097155))throw new L(9);if(16384===(k.node.mode&61440))throw new L(21);if(!k.ua.read)throw new L(22);var D="undefined"!==typeof u;if(!D)u=k.position;else if(!k.seekable)throw new L(29);var B=k.ua.read(k,
t,p,v,u);D||(k.position+=B);var R=B;if(0>R){var F=-1;break a}a+=R;if(R<g)break}F=a}return F}catch(Qa){return"undefined"!==typeof T&&Qa instanceof L||x(Qa),-Qa.wa}},j:function(a,b){U=b;try{var c=Hb(),d=V();a:{var f=V();for(b=a=0;b<f;b++){var g=c,k=G[d+8*b>>2],p=G[d+(8*b+4)>>2],v=void 0,u=E;if(0>p||0>v)throw new L(22);if(null===g.fd)throw new L(9);if(0===(g.flags&2097155))throw new L(9);if(16384===(g.node.mode&61440))throw new L(21);if(!g.ua.write)throw new L(22);g.flags&1024&&Ab(g,0,2);var t="undefined"!==
typeof v;if(!t)v=g.position;else if(!g.seekable)throw new L(29);var D=g.ua.write(g,u,k,p,v,void 0);t||(g.position+=D);try{if(g.path&&hb.onWriteToFile)hb.onWriteToFile(g.path)}catch(F){console.log("FS.trackingDelegate['onWriteToFile']('"+g.path+"') threw an exception: "+F.message)}var B=D;if(0>B){var R=-1;break a}a+=B}R=a}return R}catch(F){return"undefined"!==typeof T&&F instanceof L||x(F),-F.wa}},z:function(a,b){U=b;try{var c=Hb(),d=V();switch(d){case 21509:case 21505:return c.tty?0:-25;case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:return c.tty?
0:-25;case 21519:if(!c.tty)return-25;var f=V();return G[f>>2]=0;case 21520:return c.tty?-22:-25;case 21531:a=f=V();if(!c.ua.pb)throw new L(25);return c.ua.pb(c,d,a);case 21523:return c.tty?0:-25;case 21524:return c.tty?0:-25;default:x("bad ioctl syscall "+d)}}catch(g){return"undefined"!==typeof T&&g instanceof L||x(g),-g.wa}},y:function(a,b){U=b;try{var c=Hb();if(null===c.fd)throw new L(9);c.Xa&&(c.Xa=null);try{c.ua.close&&c.ua.close(c)}catch(d){throw d;}finally{O[c.fd]=null}c.fd=null;return 0}catch(d){return"undefined"!==
typeof T&&d instanceof L||x(d),-d.wa}},x:function(a,b){U=b;try{var c=V(),d=V(),f=Gb[c];if(!f)return 0;if(d===f.Eb){var g=O[f.fd],k=f.flags,p=new Uint8Array(C.subarray(c,c+d));g&&g.ua.Qa&&g.ua.Qa(g,p,0,d,k);Gb[c]=null;f.mb&&Lb(f.Fb)}return 0}catch(v){return"undefined"!==typeof T&&v instanceof L||x(v),-v.wa}},i:function(){},b:function(){h.abort()},w:Ib,v:function(a,b,c){C.set(C.subarray(b,b+c),a)},u:function(a){if(2147418112<a)return!1;for(var b=Math.max(Ib(),16777216);b<a;)536870912>=b?b=oa(2*b):b=
Math.min(oa((3*b+2147483648)/4),2147418112);if(!Nb(b))return!1;pa();return!0},g:Kb,e:function(a){var b=W.Ca[a];W.Ca.splice(a,1);Vb(b)},d:W,t:function(){x("trap!")},s:function(){return 0},r:function(a,b,c,d){return Tb(a,b,c,d)},q:function(){x("OOM")},a:22816},buffer);h.asm=Wb;var Ub=h.__ZSt18uncaught_exceptionv=function(){return h.asm.A.apply(null,arguments)};h.___errno_location=function(){return h.asm.B.apply(null,arguments)};
var Xb=h._emscripten_bind_VoidPtr___destroy___0=function(){return h.asm.C.apply(null,arguments)},Yb=h._emscripten_bind_matrix_t___destroy___0=function(){return h.asm.D.apply(null,arguments)},Zb=h._emscripten_bind_matrix_t_adj_1=function(){return h.asm.E.apply(null,arguments)},$b=h._emscripten_bind_matrix_t_bliteq_5=function(){return h.asm.F.apply(null,arguments)},ac=h._emscripten_bind_matrix_t_clone_1=function(){return h.asm.G.apply(null,arguments)},bc=h._emscripten_bind_matrix_t_cofactor_2=function(){return h.asm.H.apply(null,
arguments)},cc=h._emscripten_bind_matrix_t_col_2=function(){return h.asm.I.apply(null,arguments)},dc=h._emscripten_bind_matrix_t_det_0=function(){return h.asm.J.apply(null,arguments)},ec=h._emscripten_bind_matrix_t_eigen_3=function(){return h.asm.K.apply(null,arguments)},fc=h._emscripten_bind_matrix_t_get_2=function(){return h.asm.L.apply(null,arguments)},hc=h._emscripten_bind_matrix_t_get_ncols_0=function(){return h.asm.M.apply(null,arguments)},ic=h._emscripten_bind_matrix_t_get_nrows_0=function(){return h.asm.N.apply(null,
arguments)},jc=h._emscripten_bind_matrix_t_hessenberg_2=function(){return h.asm.O.apply(null,arguments)},kc=h._emscripten_bind_matrix_t_iden_1=function(){return h.asm.P.apply(null,arguments)},lc=h._emscripten_bind_matrix_t_inv_1=function(){return h.asm.Q.apply(null,arguments)},mc=h._emscripten_bind_matrix_t_matrix_t_0=function(){return h.asm.R.apply(null,arguments)},nc=h._emscripten_bind_matrix_t_minor_3=function(){return h.asm.S.apply(null,arguments)},oc=h._emscripten_bind_matrix_t_mul_2=function(){return h.asm.T.apply(null,
arguments)},pc=h._emscripten_bind_matrix_t_pluseq_2=function(){return h.asm.U.apply(null,arguments)},qc=h._emscripten_bind_matrix_t_print_0=function(){return h.asm.V.apply(null,arguments)},rc=h._emscripten_bind_matrix_t_push_1=function(){return h.asm.W.apply(null,arguments)},sc=h._emscripten_bind_matrix_t_qr_2=function(){return h.asm.X.apply(null,arguments)},tc=h._emscripten_bind_matrix_t_release_0=function(){return h.asm.Y.apply(null,arguments)},uc=h._emscripten_bind_matrix_t_reshape_2=function(){return h.asm.Z.apply(null,
arguments)},vc=h._emscripten_bind_matrix_t_scaleeq_1=function(){return h.asm._.apply(null,arguments)},wc=h._emscripten_bind_matrix_t_set_3=function(){return h.asm.$.apply(null,arguments)},xc=h._emscripten_bind_matrix_t_set_ncols_1=function(){return h.asm.aa.apply(null,arguments)},yc=h._emscripten_bind_matrix_t_set_nrows_1=function(){return h.asm.ba.apply(null,arguments)},zc=h._emscripten_bind_matrix_t_slice_5=function(){return h.asm.ca.apply(null,arguments)},Ac=h._emscripten_bind_matrix_t_stack4_4=
function(){return h.asm.da.apply(null,arguments)},Bc=h._emscripten_bind_matrix_t_svd_3=function(){return h.asm.ea.apply(null,arguments)},Cc=h._emscripten_bind_matrix_t_tostr_0=function(){return h.asm.fa.apply(null,arguments)},Dc=h._emscripten_bind_matrix_t_transpose_1=function(){return h.asm.ga.apply(null,arguments)},Ec=h._emscripten_bind_matrix_t_vnorm_0=function(){return h.asm.ha.apply(null,arguments)},Fc=h._emscripten_bind_matrix_t_vnormzeq_0=function(){return h.asm.ia.apply(null,arguments)},Gc=
h._emscripten_bind_matrix_t_zeros_2=function(){return h.asm.ja.apply(null,arguments)},Lb=h._free=function(){return h.asm.ka.apply(null,arguments)},bb=h._malloc=function(){return h.asm.la.apply(null,arguments)},Ia=h.globalCtors=function(){return h.asm.oa.apply(null,arguments)};h.stackAlloc=function(){return h.asm.pa.apply(null,arguments)};var Vb=h.stackRestore=function(){return h.asm.qa.apply(null,arguments)},Mb=h.stackSave=function(){return h.asm.ra.apply(null,arguments)};
h.dynCall_v=function(){return h.asm.ma.apply(null,arguments)};h.dynCall_vi=function(){return h.asm.na.apply(null,arguments)};h.asm=Wb;h.then=function(a){if(h.calledRun)a(h);else{var b=h.onRuntimeInitialized;h.onRuntimeInitialized=function(){b&&b();a(h)}}return h};function fa(a){this.name="ExitStatus";this.message="Program terminated with exit("+a+")";this.status=a}fa.prototype=Error();fa.prototype.constructor=fa;I=function Hc(){h.calledRun||Ic();h.calledRun||(I=Hc)};
function Ic(){function a(){if(!h.calledRun&&(h.calledRun=!0,!ja)){wa||(wa=!0,h.noFSInit||Cb||(Cb=!0,Bb(),h.stdin=h.stdin,h.stdout=h.stdout,h.stderr=h.stderr,h.stdin?Eb("stdin",h.stdin):xb("/dev/tty","/dev/stdin"),h.stdout?Eb("stdout",null,h.stdout):xb("/dev/tty","/dev/stdout"),h.stderr?Eb("stderr",null,h.stderr):xb("/dev/tty1","/dev/stderr"),yb("/dev/stdin","r"),yb("/dev/stdout","w"),yb("/dev/stderr","w")),ra(ta));gb=!1;ra(ua);if(h.onRuntimeInitialized)h.onRuntimeInitialized();if(h.postRun)for("function"==
typeof h.postRun&&(h.postRun=[h.postRun]);h.postRun.length;){var a=h.postRun.shift();va.unshift(a)}ra(va)}}if(!(0<H)){if(h.preRun)for("function"==typeof h.preRun&&(h.preRun=[h.preRun]);h.preRun.length;)xa();ra(sa);0<H||h.calledRun||(h.setStatus?(h.setStatus("Running..."),setTimeout(function(){setTimeout(function(){h.setStatus("")},1);a()},1)):a())}}h.run=Ic;
function x(a){if(h.onAbort)h.onAbort(a);void 0!==a?(ha(a),y(a),a='"'+a+'"'):a="";ja=!0;throw"abort("+a+"). Build with -s ASSERTIONS=1 for more info.";}h.abort=x;if(h.preInit)for("function"==typeof h.preInit&&(h.preInit=[h.preInit]);0<h.preInit.length;)h.preInit.pop()();h.noExitRuntime=!0;Ic();function X(){}X.prototype=Object.create(X.prototype);X.prototype.constructor=X;X.prototype.Na=X;X.Va={};h.WrapperObject=X;function Jc(a){return(a||X).Va}h.getCache=Jc;
function Kc(a,b){var c=Jc(b),d=c[a];if(d)return d;d=Object.create((b||X).prototype);d.sa=a;return c[a]=d}h.wrapPointer=Kc;h.castObject=function(a,b){return Kc(a.sa,b)};h.NULL=Kc(0);h.destroy=function(a){if(!a.__destroy__)throw"Error: Cannot destroy object. (Did you create it yourself?)";a.__destroy__();delete Jc(a.Na)[a.sa]};h.compare=function(a,b){return a.sa===b.sa};h.getPointer=function(a){return a.sa};h.getClass=function(a){return a.Na};
function Y(){throw"cannot construct a VoidPtr, no constructor in IDL";}Y.prototype=Object.create(X.prototype);Y.prototype.constructor=Y;Y.prototype.Na=Y;Y.Va={};h.VoidPtr=Y;Y.prototype.__destroy__=function(){Xb(this.sa)};function Z(){this.sa=mc();Jc(Z)[this.sa]=this}Z.prototype=Object.create(X.prototype);Z.prototype.constructor=Z;Z.prototype.Na=Z;Z.Va={};h.matrix_t=Z;Z.prototype.reshape=function(a,b){var c=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);uc(c,a,b)};
Z.prototype.push=Z.prototype.push=function(a){var b=this.sa;a&&"object"===typeof a&&(a=a.sa);rc(b,a)};Z.prototype.zeros=function(a,b){var c=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);Gc(c,a,b)};Z.prototype.iden=function(a){var b=this.sa;a&&"object"===typeof a&&(a=a.sa);kc(b,a)};Z.prototype.release=Z.prototype.release=function(){tc(this.sa)};
Z.prototype.set=Z.prototype.set=function(a,b,c){var d=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);c&&"object"===typeof c&&(c=c.sa);wc(d,a,b,c)};Z.prototype.get=Z.prototype.get=function(a,b){var c=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);return fc(c,a,b)};Z.prototype.mul=Z.prototype.mul=function(a,b){var c=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);oc(c,a,b)};
Z.prototype.transpose=function(a){var b=this.sa;a&&"object"===typeof a&&(a=a.sa);Dc(b,a)};Z.prototype.col=function(a,b){var c=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);cc(c,a,b)};Z.prototype.vnorm=function(){return Ec(this.sa)};Z.prototype.vnormzeq=function(){Fc(this.sa)};Z.prototype.scaleeq=function(a){var b=this.sa;a&&"object"===typeof a&&(a=a.sa);vc(b,a)};
Z.prototype.pluseq=function(a,b){var c=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);pc(c,a,b)};Z.prototype.clone=Z.prototype.clone=function(a){var b=this.sa;a&&"object"===typeof a&&(a=a.sa);ac(b,a)};Z.prototype.minor=function(a,b,c){var d=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);c&&"object"===typeof c&&(c=c.sa);nc(d,a,b,c)};
Z.prototype.bliteq=function(a,b,c,d,f){var g=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);c&&"object"===typeof c&&(c=c.sa);d&&"object"===typeof d&&(d=d.sa);f&&"object"===typeof f&&(f=f.sa);$b(g,a,b,c,d,f)};Z.prototype.slice=Z.prototype.slice=function(a,b,c,d,f){var g=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);c&&"object"===typeof c&&(c=c.sa);d&&"object"===typeof d&&(d=d.sa);f&&"object"===typeof f&&(f=f.sa);zc(g,a,b,c,d,f)};
Z.prototype.qr=function(a,b){var c=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);sc(c,a,b)};Z.prototype.stack4=function(a,b,c,d){var f=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);c&&"object"===typeof c&&(c=c.sa);d&&"object"===typeof d&&(d=d.sa);Ac(f,a,b,c,d)};Z.prototype.hessenberg=function(a,b){var c=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);jc(c,a,b)};
Z.prototype.eigen=function(a,b,c){var d=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);c&&"object"===typeof c&&(c=c.sa);ec(d,a,b,c)};Z.prototype.cofactor=function(a,b){var c=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);return bc(c,a,b)};Z.prototype.det=function(){return dc(this.sa)};Z.prototype.adj=function(a){var b=this.sa;a&&"object"===typeof a&&(a=a.sa);Zb(b,a)};
Z.prototype.inv=function(a){var b=this.sa;a&&"object"===typeof a&&(a=a.sa);return!!lc(b,a)};Z.prototype.svd=function(a,b,c){var d=this.sa;a&&"object"===typeof a&&(a=a.sa);b&&"object"===typeof b&&(b=b.sa);c&&"object"===typeof c&&(c=c.sa);Bc(d,a,b,c)};Z.prototype.tostr=function(){return la(Cc(this.sa))};Z.prototype.print=function(){qc(this.sa)};Z.prototype.get_nrows=Z.prototype.Ra=function(){return ic(this.sa)};
Z.prototype.set_nrows=Z.prototype.Bb=function(a){var b=this.sa;a&&"object"===typeof a&&(a=a.sa);yc(b,a)};Object.defineProperty(Z.prototype,"nrows",{get:Z.prototype.Ra,set:Z.prototype.Bb});Z.prototype.get_ncols=Z.prototype.Ca=function(){return hc(this.sa)};Z.prototype.set_ncols=Z.prototype.zb=function(a){var b=this.sa;a&&"object"===typeof a&&(a=a.sa);xc(b,a)};Object.defineProperty(Z.prototype,"ncols",{get:Z.prototype.Ca,set:Z.prototype.zb});Z.prototype.__destroy__=function(){Yb(this.sa)};
(function(){function a(){}wa||ua.unshift(a)})();


  return _LOSHUWASM
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
      module.exports = _LOSHUWASM;
    else if (typeof define === 'function' && define['amd'])
      define([], function() { return _LOSHUWASM; });
    else if (typeof exports === 'object')
      exports["_LOSHUWASM"] = _LOSHUWASM;
    
/*global describe _LOSHUWASM */
/*begin handwritten wrapper*/

var LOSHUWASM = new function(){var that = this;
  that.wrap = function(A){
    var a = new _LOSHUWASM.matrix_t(); a.reshape(A.length, A[0].length);
    for (var i = 0; i < A.length; i++){
      for (var j = 0; j < A[i].length; j++){
        a.push(A[i][j]);
      }
    }
    return a;
  }
  that.unwrap = function(A){
    var a = [];
    for (var i = 0; i < A.nrows; i++){
      a.push([])
      for (var j = 0; j < A.ncols; j++){
        a[a.length-1].push(A.get(i,j));
      }
    }
    return a;
  }
  that.matmul = function(A,B){
    var a = that.wrap(A);
    var b = that.wrap(B);
    var c = new _LOSHUWASM.matrix_t();
    a.mul(b,c);
    var C = that.unwrap(c);
    a.release();
    b.release();
    c.release();
    _LOSHUWASM.destroy(a);
    _LOSHUWASM.destroy(b);
    _LOSHUWASM.destroy(c);
    return C;
  }
  that.qr = function(A){
    var a = that.wrap(A);
    var q = new _LOSHUWASM.matrix_t();
    var r = new _LOSHUWASM.matrix_t();
    a.qr(q,r);
    var Q = that.unwrap(q);
    var R = that.unwrap(r);
    a.release();
    q.release();
    r.release();
    _LOSHUWASM.destroy(a);
    _LOSHUWASM.destroy(q);
    _LOSHUWASM.destroy(r);
    return [Q,R];
  }

  that.hessenberg = function(A){
    var a = that.wrap(A);
    var h = new _LOSHUWASM.matrix_t();
    var q = new _LOSHUWASM.matrix_t();
    a.hessenberg(h,q);
    var H = that.unwrap(h);
    var Q = that.unwrap(q);
    a.release();
    h.release();
    q.release();
    _LOSHUWASM.destroy(a);
    _LOSHUWASM.destroy(h);
    _LOSHUWASM.destroy(q);
    return [H,Q];
  }

  that.eigen = function(A,{maxiter=50}={}){
    var a = that.wrap(A);
    var v = new _LOSHUWASM.matrix_t();
    var d = new _LOSHUWASM.matrix_t();
    a.eigen(v,d,maxiter);
    var vt = new _LOSHUWASM.matrix_t();
    v.transpose(vt);
    var V = that.unwrap(vt);
    var pairs = [];
    for (var i = 0; i < d.nrows; i++){
      pairs.push({val:d.get(i,i), vec:V[i]})
    }
    a.release();
    v.release();
    d.release();
    vt.release();
    _LOSHUWASM.destroy(a);
    _LOSHUWASM.destroy(v);
    _LOSHUWASM.destroy(d);
    _LOSHUWASM.destroy(vt);
    return pairs;
  }

  that.det = function(A){
    var a = that.wrap(A);
    var d = a.det();
    a.release();
    _LOSHUWASM.destroy(a);
    return d;
  }

  that.inv = function(A){
    var a = that.wrap(A);
    var b = new _LOSHUWASM.matrix_t();
    var c = a.inv(b);
    if (!c){
      throw "singular";
    }
    var B = that.unwrap(b);
    a.release();
    b.release();
    _LOSHUWASM.destroy(a);
    _LOSHUWASM.destroy(b);
    return B;
  }

  that.svd = function(A){
    var a = that.wrap(A);
    var u = new _LOSHUWASM.matrix_t();
    var s = new _LOSHUWASM.matrix_t();
    var v = new _LOSHUWASM.matrix_t();
    a.svd(u,s,v);
    var U = that.unwrap(u);
    var S = that.unwrap(s);
    var V = that.unwrap(v);
    
    a.release();
    u.release();
    s.release();
    v.release();

    _LOSHUWASM.destroy(u);
    _LOSHUWASM.destroy(s);
    _LOSHUWASM.destroy(v);

    return [U,S,V];
  }

}
if (typeof exports === 'object' && typeof module === 'object'){
  module.exports = {_LOSHUWASM,LOSHUWASM}
}
/*end handwritten wrapper*/