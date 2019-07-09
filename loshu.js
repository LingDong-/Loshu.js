 /*.                @   
@   @  ooooooooo  .'    
 `@'            ,'   o  
 o         o   @     o  
 |         |         o  
 o      o--O--o      o  
 |         |         o  
 o    @    o         o  
    @' `.        @   o  
  @'     @     ,' `@    
@'     @'     @     `@  
 `.  @'    O   `@  ,'   
   @'            `@     

    
LOSHU.JS:
A Linear Algebra Library
For Javascript.

Lingdong Huang 2019*/
 

var LOSHU = new function(){
  var that = this;
  
  that.ASSERTION_NONE = 0;
  that.ASSERTION_WARN = 1;
  that.ASSERTION_DEFAULT = 2;
  that.ASSERTION_THROW = 3;
  
  that.SINGULAR = 'singular';
  that.INCONSISTENT = 'inconsistent';
  that.IRREDUCIBLE = 'irreducible';
  that.UNFACTORIZABLE = 'unfactorizable';

  var _wasmexist = false;
  
  var _isnode = typeof module !== 'undefined' && module.exports
  if (_isnode) {
    try{
      let {_LOSHUWASM,LOSHUWASM} = require('./loshuwasm');
      that.wasm = LOSHUWASM;
      that._wasm = _LOSHUWASM
      _wasmexist = true;
    }catch(e){/*no wasm*/}
  }else{
    _wasmexist = typeof LOSHUWASM != 'undefined';
    if (_wasmexist){
      /*global describe LOSHUWASM _LOSHUWASM*/
      that.wasm = LOSHUWASM; 
      that._wasm = _LOSHUWASM;
    }
  }
  
  var _wasmready = false;
  if (_wasmexist){
    that._wasm.then(function(){
      var msg = "🚀 web assembly backend initialized."
      if (!_isnode) {
        console.log("%c "+msg,"color:lightgreen; background:black");
      }else{
        console.log('\x1b[36m%s\x1b[0m',msg);
      }
      _wasmready = true;
    });
  }
  function usingwasm(){
    return that.options.usewasm && _wasmexist && _wasmready;
  }
  
  that.options = {
    assertionlvl : that.ASSERTION_DEFAULT, //assertion level
    termcols: 80,
    usewasm: _wasmexist,
  }
  
  
  that.ismat = function(A){
    if (A == undefined){
      return false
    }
    if (typeof A != 'object'){
      return false;
    }
    if (!A.length){
      return false;
    }
    for (var i = 0; i < A.length; i++){
      if (typeof A[i] != 'object'){
        return false;
      }
      if (A[i].length != A[0].length){
        return false;
      }
      if (!A[i] || !A[i].length){
        return false;
      }
      for (var j = 0; j < A[i].length; j++){
        if (typeof A[i][j] != 'number'){
          return false;
        }
      }
    }
    return true;
  }
  
  that.isvec = function(v){
    if (typeof v != 'object'){
      return false;
    }
    for (var i = 0; i < v.length; i++){
      if (typeof v[i] != 'number'){
        return false;
      }
    }
    return true;
  }
  
  that.isnum = function(s){
    return (typeof s == 'number');
  }
  
  that.hasnan = function(A){
    if (typeof A == 'number'){
      return isNaN(A);
    }
    if (A == undefined || A == null || (typeof A != 'object')){
      return true
    }
    for (var i = 0; i < A.length; i++){
      if (that.hasnan(A[i])){
        return true;
      }
    }
    return false;
  }
  
  that.hasinf = function(A){
    if (typeof A == 'number'){
      return A == Infinity || A == -Infinity;
    }
    if (typeof A != 'object'){
      return false;
    }
    for (var i = 0; i < A.length; i++){
      if (that.hasinf(A[i])){
        return true;
      }
    }
    return false;
  }
  

  that.issquare = function(A){
    return A.length == A[0].length;
  }
  
  that.isperm = function(A){
    var ep = 1e-10;
    for (var i = 0; i < A.length; i++){
      if (! (A[i].filter(x=>Math.abs(x)<ep).length == A[i].length-1
          && A[i].filter(x=>Math.abs(x-1)<ep).length == 1)){
        return false;
      }
    }
    return true;
  }
  
  that.ishermitian = function(A){
    return that.approx(that.transpose(A),A);
  }
  that.isunitary = function(A){
    return that.approx(that.matmul(that.transpose(A),A),that.iden(A.length))
        && that.approx(that.matmul(A,that.transpose(A)),that.iden(A.length))
  }
  
  that.nrows = function(A){
    return A.length;
  }
  that.ncols = function(A){
    return A[0].length;
  }
  that.size = function(A){
    return [A.length, A[0].length]
  }
  
  that.assert = function(){

    if (that.options.assertionlvl == that.ASSERTION_NONE){
      return;
    }
    var m = arguments[0];
    for (var i = 1; i < arguments.length; i++){
      var ss = arguments[i].split("|")
      var ok = false
      for (var j = 0; j < ss.length; j++){
        var [fun, ans] = ss[j].split("=");
        var inv = false;
        if (fun[0] == "!"){
          fun = fun.slice(1)
          inv = true
        }
        if (ans == undefined){
          ans = true;
        }else{
          ans = JSON.parse(ans);
        }
        var ret = that[fun](m)
        ok = ok || (inv ? (ret!=ans): (ret==ans));
      }
      var badstr = "Assertion Failure: `"+arguments[i]+"` failed for `"+JSON.stringify(m)+"`\n"+(new Error().stack);
      if (that.options.assertionlvl == that.ASSERTION_THROW){
        if (!ok){
          throw badstr;
        }
      }else if (that.options.assertionlvl == that.ASSERTION_DEFAULT){
        console.assert(ok, badstr);
      }else if (that.options.assertionlvl == that.ASSERTION_WARN){
        if (!ok){
          console.warn(badstr);
        }
      }
    }
  };var assert = that.assert
  
  function printmat(A){
    if (!that.ismat(A)){
      if (typeof A == 'object' && A.length && A.filter(that.ismat).length==A.length){
        return A.map(printmat).join("\n");
      }
      console.log(A);
      return typeof A == 'string'? A : (that.isvec(A) ? JSON.stringify(A) : JSON.stringify(A, null, 4));
    }
    function rd(x){
      return Math.round(A[i][j] * 1000) / 1000
    }
    var maxr = 19;
    var maxc = 19;
    
    var padsp = 5;
    for (var i = 0; i < A.length; i++){
      for (var j = 0; j < A[i].length; j++){
        if ((i < maxr-1 || i == A.length-1 || A.length <= maxr+1)
          &&(j < maxc - 1 || j == A[i].length - 1) || A[i].length <= maxc+1) {
          padsp = Math.max(padsp,('  '+rd(A[i][j])).length);
        }
      }
    }
    maxc = Math.min(maxc,Math.floor((that.options.termcols-4)/padsp-1));
    maxr = maxc;
    
    var r = `Matrix ${A.length}x${A[0].length}:\n`
    for (var i = 0; i < A.length; i++){
      if (i < maxr-1 || i == A.length-1 || A.length <= maxr+1){
        if (i == 0){
          r += A.length == 1 ? "[ " : "⎡ "
        }else if (i == A.length-1){
          r += "⎣ "
        }else{
          r += "⎢ "
        }
        for (var j = 0; j < A[i].length; j++){
          if (j < maxc - 1 || j == A[i].length - 1 || A[i].length <= maxc+1){
            r += ('' + rd(A[i][j])).padStart(padsp, ' ')
          }else if (j == maxc - 1){
            r += '...'.padStart(padsp, ' ')
          }
        }
        if (i == 0){
          r += A.length == 1 ? " ]" : " ⎤"
        }else if (i == A.length - 1){
          r += " ⎦"
        }else{
          r += " ⎥"
        }
        r += "\n"
      }else if (i == maxr-1){
        r += "⎢ "
        for (var j = 0; j < Math.min(maxc+1,A[i].length); j++){
          if (j == maxc-1){
            r += "'-.".padStart(padsp, ' ')
          }else{
            r += ":".padStart(padsp, '  ');
          }
        }
        r+=" ⎥\n"
      }
    }
    console.log(r);
    return r;
  }
  that.print = function(...items){
    var r = "";
    for (var i = 0; i < items.length; i++){
      r += printmat(items[i]) + "\n";
    }
    return r;
  }
  
  that.rank = function(A){
    assert(A,'ismat','!hasnan');
    var [a,_] = that.gauss(A,that.zeros(A.length,1),{jordan:false,elementary:false})
    var n = a.filter(x=>x.filter(y=>y!=0).length).length
    return n;
  }
  
  that.rand = function(m,n){
    assert(m,'isnum','!hasnan');
    if (n == undefined){
      return new Array(m).fill(0).map(x=>Math.random());
    }else{
      return new Array(m).fill([]).map(x=>that.rand(n))
    }
  }
  that.zeros = function(m,n){
    assert(m,'isnum','!hasnan');
    if (n == undefined){
      return new Array(m).fill(0).map(x=>0);
    }else{
      return new Array(m).fill([]).map(x=>that.zeros(n))
    }
  }
  
  that.scale = function(A,s){
    assert(A,'ismat|isvec','!hasnan');
    assert(s,'isnum','!hasnan');
    
    if (typeof A[0] != 'number'){
      return A.map(x=>that.scale(x,s));
    }
    return A.map(x=>x*s);
  }
  that.add = function(A,B){
    assert(A,'ismat|isvec','!hasnan');
    assert(B,'ismat|isvec','!hasnan');
    
    if (typeof A[0] != 'number'){
      var r = []
      for (var i = 0; i < A.length; i++){
        r.push(that.add(A[i],B[i]));
      }
      return r;
    }
    return A.map((x,i)=>(x+B[i]))
  }
  that.sub = function(A,B){
    assert(A,'ismat|isvec','!hasnan');
    assert(B,'ismat|isvec','!hasnan');
    return that.add(A,that.scale(B,-1));
  }
  that.clone = function(A){
    assert(A,'ismat|isvec','!hasnan');
    if (that.isvec(A)){
      return A.slice();
    }else {
      return A.map(x=>x.slice());
    }
  }
  
  that.dot = function(u,v){
    assert(u,'isvec','!hasnan');
    assert(v,'isvec','!hasnan');
    var r = 0;
    for (var i = 0; i < u.length; i++){
      r += u[i]*v[i];
    }
    return r;
  }
  
  that.cross = function(u,v){
    assert(u,'isvec','!hasnan','nrows=3|nrows=7');
    assert(v,'isvec','!hasnan','nrows=3|nrows=7');
    if (u.length != 7){
      return [
        u[1]*v[2] - u[2]*v[1],
        u[2]*v[0] - u[0]*v[2],
        u[0]*v[1] - u[1]*v[0]
      ];
    }else{
      return [
        u[2]*v[4] - u[4]*v[2] + u[3]*v[7] - u[7]*v[3] + u[5]*v[6] - u[6]*v[5],
        u[3]*v[5] - u[5]*v[3] + u[4]*v[1] - u[1]*v[4] + u[6]*v[7] - u[7]*v[6],
        u[4]*v[6] - u[6]*v[4] + u[5]*v[2] - u[2]*v[5] + u[7]*v[1] - u[1]*v[7],
        u[5]*v[7] - u[7]*v[5] + u[6]*v[3] - u[3]*v[6] + u[1]*v[2] - u[2]*v[1],
        u[6]*v[1] - u[1]*v[6] + u[7]*v[4] - u[4]*v[7] + u[2]*v[3] - u[3]*v[2],
        u[7]*v[2] - u[2]*v[7] + u[1]*v[5] - u[5]*v[1] + u[3]*v[4] - u[4]*v[3],
        u[1]*v[3] - u[3]*v[1] + u[2]*v[6] - u[6]*v[2] + u[4]*v[5] - u[5]*v[4],
      ]
    }
  }
  
  that.iden = function(n){
    assert(n,'isnum');
    var r = [];
    for (var i = 0; i < n; i++){
      r.push([])
      for (var j = 0; j < n; j++){
        r[i].push(i==j?1:0)
      }
    }
    return r;
  }
  
  that.proj = function(u,v){
    assert(u,'isvec','!hasnan');
    assert(v,'isvec','!hasnan');
    return that.scale(u,that.dot(u,v)/that.dot(u,u));
  }
  
  that.norm = function(u,{order}={}){
    assert(u,'isvec|ismat','!hasnan');
    
    if (that.isvec(u)){
      if (order == undefined){order = '2'}
      
      if (order == '1'){
        return u.reduce((x,y)=>(x+y),0);
      }else if (order == '2'){
        var r = 0;
        for (var i = 0; i < u.length; i++){
          r += u[i]*u[i];
        }
        return Math.sqrt(r);
      }else{
        throw TypeError(order);
      }
    }else{
      if (order == undefined){order = 'fro'}
      
      if (order == 'fro'){
        var s = 0;
        for (var i = 0; i < u.length; i++){
          for (var j = 0; j < u[i].length; j++){
            s += u[i][j]*u[i][j]
          }
        }
        return Math.sqrt(s);
      }else if (order == '1'){
        var s = 0;
        for (var i = 0; i < u.length; i++){
          s+= Math.max.apply(null,u[i].map(Math.abs));
        }
        return s;
      }else if (order == 'inf'){
        return that.norm(that.transpose(u),{order:'1'})
      }else{
        throw TypeError(order);
      }
    }
  }

  that.normalize = function(u){
    assert(u,'isvec','!hasnan');
    var n = that.norm(u);
    return u.map(x=>x/n);
  }
  

  that.cond = function(A){
    var n = that.norm(A,{order:'inf'});
    var ninv = that.norm(that.inv(A),{order:'inf'});
    return n * ninv;
  }
  
  that.matmul = function(A, B, {method="naive"}={}) {
    assert(A,'ismat','!hasnan');
    assert(B,'ismat','!hasnan','nrows='+that.ncols(A));
    
    if (usingwasm()){return that.wasm.matmul(A,B)};
    
    if (method == "naive"){
      var result = [];
      for (var i = 0; i < A.length; i++) {
        result[i] = [];
        for (var j = 0; j < B[0].length; j++) {
          var sum = 0;
          for (var k = 0; k < A[0].length; k++) {
            sum += A[i][k] * B[k][j];
          }
          result[i][j] = sum;
        }
      }
      return result;
    }else if (method == "strassen"){
      function split4(a){
        var au = a.slice(0,a.length/2);
        var al = a.slice(a.length/2);
        var [a11,a12] = that.hsplit(au,a.length/2);
        var [a21,a22] = that.hsplit(al,a.length/2);
        return [a11,a12,a21,a22];
      }
      function _matmul(a,b){
        if (a.length == 1){
          return [[a[0][0]*b[0][0]]]
        }
        var [a11, a12, a21, a22] = split4(a);
        var [b11, b12, b21, b22] = split4(b);
        var m1 = _matmul(that.add(a11,a22), that.add(b11,b22));
        var m2 = _matmul(that.add(a21,a22), b11);
        var m3 = _matmul(a11, that.sub(b12,b22));
        var m4 = _matmul(a22, that.sub(b21,b11));
        var m5 = _matmul(that.add(a11,a12),b22);
        var m6 = _matmul(that.sub(a21,a11), that.add(b11,b12));
        var m7 = _matmul(that.sub(a12,a22), that.add(b21,b22));
        var c11 = that.add(that.sub(that.add(m1,m4),m5),m7);
        var c12 = that.add(m3,m5);
        var c21 = that.add(m2,m4);
        var c22 = that.add(that.add(that.sub(m1,m2),m3),m6);
        return that.hstack(c11,c12).concat(that.hstack(c21,c22));
        
      }
      function nextpow2(x){
        return Math.pow(2, Math.ceil(Math.log(x)/Math.log(2)));
      }
      
      function pad2sq(a,n){
        var b = [];
        for (var i = 0; i < n; i++){
          b.push([])
          for (var j = 0; j < n; j++){
            if (i < a.length && j < a[0].length){
              b[b.length-1].push(a[i][j]);
            }else{
              b[b.length-1].push(0);
            }
          }
        }
        return b; 
      }
      var n = Math.max(nextpow2(A.length),nextpow2(A[0].length),
                       nextpow2(B.length),nextpow2(B[0].length));
      var a = pad2sq(A,n);
      var b = pad2sq(B,n);
      var c = _matmul(a,b);
      return that.hsplit(c.slice(0,A.length),B[0].length)[0];
      
    }else if (method == "auto"){
      if (A.length < 1e20){
        return that.matmul(A,B,{method:"naive"});
      }else{
        return that.matmul(A,B,{method:"strassen"});
      }
    }else{
      throw TypeError(method);
    }
    
  }
  
  that.mul = function(...items){
    assert(items[0], 'ismat|isvec|isnum', '!hasnan');
    assert(items[1], 'ismat|isvec|isnum', '!hasnan');
    
    return _mul(Array.from(items));
    
    function _mul(args){
      var a = args[0];
      var b = args[1];
      var c;
      if (that.isnum(a)){
        if (that.isnum(b)){
          c= a * b;
        }else if (that.isvec(b) || that.ismat(b)){
          c= that.scale(b,a);
        }
      }else if (that.isvec(a)){
        if (that.isnum(b)){
          c= that.scale(a,b);
        }else if (that.isvec(b)){
          throw TypeError(
            "vector multiplication is ambiguous: use `dot`, `cross` or `outer`"
          );
        }else if (that.ismat(b)){
          c= that.matmul(that.transpose([a]),b);
        }
      }else if (that.ismat(a)){
        if (that.isnum(b)){
          c= that.scale(a,b);
        }else if (that.isvec(b)){
          c= that.matmul(a,that.transpose([b]));
        }else if (that.ismat(b)){
          c= that.matmul(a,b);
        }
      }

      var rest = args.slice(2);

      if (rest.length){
        return _mul([c].concat(args.slice(2)));
      }
      return c;
    }
  }
  
  that.slice = function(A,ri,rj){
    assert(A,'ismat','!hasnan');
    assert(ri,'isvec','!hasnan');
    assert(rj,'isvec','!hasnan');
    var r = [];
    for (var i = Math.max(0,ri[0]); i < Math.min(ri[1],A.length); i++){
      r.push([])
      for (var j = Math.max(0,rj[0]); j < Math.min(rj[1],A[0].length); j++){
        r[r.length-1].push(A[i][j]);
      }
    }
    return r;
  }

  that.blit = function(A,ri,rj,B){
    assert(A,'ismat','!hasnan');
    assert(ri,'isvec','!hasnan');
    assert(rj,'isvec','!hasnan');
    assert(B,'ismat','!hasnan');
    
    var r = [];
    for (var i = 0; i < A.length; i++){
      r.push([])
      for (var j = 0; j < A[0].length; j++){
        if (ri[0] <= i && i < ri[1] && rj[0] <= j && j <rj[1]){
          r[i].push(B[i-ri[0]][j-rj[0]]);
        }else{
          r[i].push(A[i][j]);
        }
      }
    }
    return r;
  }
  
  that.map = function(A,f){
    assert(A,'ismat','!hasnan');
    var a = that.zeros(A.length,A[0].length);
    for (var i = 0; i < A.length; i++){
      for (var j = 0; j < A[i].length; j++){
        a[i][j] = f(A[i][j],i,j);
      }
    }
    return a;
  }
  
  that.hstack = function(A,B){
    assert(A,'ismat','!hasnan');
    assert(B,'ismat','!hasnan');
    var r = []
    for (var i = 0; i < A.length; i++){
      r.push(A[i].concat(B[i]));
    }
    return r;
  }
  
  that.hsplit = function(A,n){
    assert(A,'ismat','!hasnan');
    assert(n,'isnum','!hasnan');
    return [
      that.slice(A,[0,Infinity],[0,n]),
      that.slice(A,[0,Infinity],[n,Infinity])
    ]
  }
  
  that.outer = function(u,v){
    assert(u,'isvec','!hasnan');
    assert(v,'isvec','!hasnan');
    
    return that.matmul(that.transpose([u]), [v]);
  }

  that.transpose = that.T = function(A){
    assert(A,'ismat','!hasnan');
    var r = [];
    for (var i = 0; i < A[0].length; i++){
      r.push([])
      for (var j = 0; j < A.length; j++){
        r[i].push(A[j][i]); 
      }
    }
    return r;
  }
  
  that.diagonal = function(A){
    assert(A,'ismat','!hasnan');
    var r = [];
    for (var i = 0; i < Math.min(A.length, A[0].length); i++){
      r.push(A[i][i])
    }
    return r;
  }
  
  that.tr = function(A){
    assert(A,'ismat','!hasnan','issquare');
    return that.diagonal(A).reduce((x,y)=>(x+y),0);
  }
  
  that.approx = function(A,B,{epsilon=1e-5}={}){
    assert(A,'ismat|isvec','!hasnan');
    assert(B,'ismat|isvec','!hasnan');
    
    if (A.length != B.length){
      return false;
    }
    if (that.isvec(A)){
      for (var i = 0; i < A.length; i++){
        if (Math.abs(A[i]-B[i]) > epsilon){
          return false;
        }
      }
      return true;
    }
    for (var i = 0; i < A.length; i++){
      if (!that.approx(A[i],B[i])){
        return false
      }
    }
    return true;
  }

  
  that.gaussjordan = function(A){
    assert(A,'ismat','!hasnan','nrows='+(that.ncols(A)-1));
    var [a,aug] = that.hsplit(A,that.ncols(A)-1);
    
    var [a_,aug_] = that.gauss(a,aug,{jordan:true,elementary:false,operations:['s','+*','*']});
    var redo = false;
    for (var i = 0; i < a_.length; i++){
      if (a_[i].filter(x=>(x!=0)).length == 0){
        if (aug_[i][0] == 0){
          aug_[i][0] = 1;
          a_[i][i] = 1;
          redo = true;
        }else{
          throw that.INCONSISTENT
        }
      }
    }
    if (redo){
      [a_,aug_] = that.gauss(a_,aug_,{jordan:true});
    }
    return that.transpose(aug_)[0];
  }
  
  that.gauss = function(A,B,{jordan=false,elementary=false,operations=['s','+*','*']}={}){
    assert(A,'ismat','!hasnan');
    assert(B,'ismat','!hasnan','nrows='+that.nrows(A));
    
    var m = that.hstack(A,B);
    var emats = [];
    
    function iszero(x){
      return Math.abs(x)<0.0001;
    }

    function elimrow(m,ind,i0,i1){
      if (!operations.includes('+*')){
        return m;
      }
      var r0 = m[i0];
      var r1 = m[i1];
      var p = -r1[ind]/r0[ind]
      var r = that.add(r1,that.scale(r0,p))
      if (elementary){
        var e = that.iden(m.length);
        e[i1] = that.add(e[i1],that.scale(e[i0],p))
        emats.push(e);
      }
      var M = that.clone(m);
      M[i1] = r;
      return M
    }
    
    function countleadzero(r){
      var counter = 0;
      for (var i = 0; i < r.length; i++){
        if (iszero(r[i])){
          counter += 1;
        }else{
          break;
        }
      }
      return counter;
    }
    
    function bbswaps(m,cmp){
      for (var i = 0; i < m.length; i++){
        for (var j = 0; j < m.length-i-1; j++){
          if (cmp(m[j],m[j+1])>0){
            [m[j],m[j+1]] = [m[j+1],m[j]];
            var e = that.iden(m.length);
            [e[j],e[j+1]] = [e[j+1],e[j]];
            emats.push(e);
          }
        }
      }
    }

    function reorder(m){
      if (!operations.includes('s')){
        return m;
      }
      var M = that.clone(m);
      var cmp = (x,y)=>(countleadzero(x)-countleadzero(y));
      if (elementary){
        bbswaps(M,cmp);
      }else{
        M.sort(cmp);
      }
      return M
    }
    function normdiag(m){
      if (!operations.includes('*')){
        return m;
      }
      var M = []
      for (var row = 0; row < m.length; row++){
        var p = m[row][row] == 0 ? 1 : 1.0/m[row][row]
        M.push(that.scale(m[row],p))
        if (elementary && p != 1){
          var e = that.iden(m.length);
          e[row] = that.scale(e[row],p);
          emats.push(e);
        }
      }
      return M;
    }
    function solve(m){
      
      function isech(){
        for (var i = 0; i < m.length; i++){
          if (countleadzero(m[i]) < i){
            return false
          }
        }
        return true
      }
      m = reorder(m)
      
      var lastm = undefined;
      while (!isech()){
        for (var ind = 0; ind < that.ncols(A); ind ++){
          for (var row = 1+ind; row < m.length; row++){
            if (!iszero(m[row][ind]) && !iszero(m[ind][ind])){

              m = elimrow(m,ind,ind,row);
              m = reorder(m);
            }
          }
        }
        if (lastm != undefined){
          if (that.approx(lastm,m)){
            throw that.IRREDUCIBLE;
          }
        }
        lastm = m;
      }

      if (!jordan){

        m = normdiag(m);
        
        var [x,y] = that.hsplit(m,that.ncols(A));
        return elementary ? [x,y,emats] : [x,y];
      }
      for (var ind = that.ncols(A)-1; ind > 0; ind--){
        for (var row = 0; row < ind; row++){
          if (!iszero(m[row][ind]) && !iszero(m[ind][ind])){
            m = elimrow(m,ind,ind,row);
            m = reorder(m);
          }
        }
      }
      
      
      m = normdiag(m);
      
      
      var [x,y] = that.hsplit(m,that.ncols(A));
      return elementary ? [x,y,emats] : [x,y];
    }
    return solve(m);
  }
  
  
  
  that.gramschmidt = function(vs){
    assert(vs,'ismat','!hasnan');
    var us = []
    for (var i = 0; i < vs.length; i++){
      var u = vs[i]
      for (var j = 0; j < i; j++){
        u = that.sub(u,that.proj(us[j],vs[i]))
      }
      us.push(u);
    }

    return us.map(x=>that.norm(x)!=0?that.normalize(x):x);
  }
  
  that.qr = function(A,{method="householder"}={}){
    assert(A,'ismat','!hasnan');
    
    if (usingwasm()){return that.wasm.qr(A)};
    
    if (method == "gramschmidt"){
      assert(A,'rank='+A.length);

      var qt = that.gramschmidt(that.transpose(A));
      var q = that.transpose(qt);
      var r = that.matmul(qt,A);
      return [q,r];
    }else if (method == "householder"){
      var m = that.nrows(A);
      var n = that.ncols(A);
      
      function getq(A){
        var x = that.transpose(A)[0];
        var a = that.norm(x);
        var e1 = that.zeros(A.length); e1[0] = 1;
        var u = that.sub(x , that.scale(e1,a))
        var v = that.norm(u) == 0 ? u : that.normalize(u);
        
        var I = that.iden(A.length);
        var q1 = that.sub(I, that.scale(that.matmul(that.transpose([v]),[v]),2))
        return q1
      }
      
      var a = A;
      var Q = that.iden(a.length);
      
      for (var i = 0; i < Math.min(m-1,n); i++){
        var q = getq(a);
        var qp = that.blit(that.iden(m), [m-q.length,Infinity],[m-q.length,Infinity], q);

        Q = that.matmul(Q,that.transpose(qp));
        a = that.minor(that.matmul(q,a),0,0);
        
      }
      var R = that.matmul(that.transpose(Q),A);
      return [Q,R];
      
    }else{
      throw TypeError(method);
    }
  }
  
  that.householder = function(v){
    assert(v,'isvec','!hasnan');
    v = that.normalize(v);
    return that.sub(that.iden(v.length),that.scale(that.outer(v,v),2));
  }
  
  
  that.hessenberg = function(A){
    assert(A,'ismat','!hasnan');
    
    if (usingwasm()){return that.wasm.hessenberg(A)};
    
    function vhouse(x){
      x = that.norm(x) == 0? x: that.normalize(x);
      var x1 = x.slice(1);
      
      
      
      var s = that.matmul([x1], that.transpose([x1]))[0][0];
      var v = [1].concat(x1);
      
      var beta;
      if (s == 0){
        beta = 0;
      }else{
        var mu = Math.sqrt(x[0]*x[0]+s);
        
        v[0] = x[0] <= 0 ? (x[0]-mu) : (-s/(x[0]+mu))
        beta = 2 * v[0]*v[0] / (s+v[0]*v[0])
        v = v.map(u=>u/v[0]);
      }
      
      
      return [v,beta];
    }
    var n = Math.max(that.nrows(A),that.ncols(A));
    var Q = that.iden(n);
    var H = A;
    for (var k = 0; k < n-2; k++){
      var [v,beta] = vhouse(that.transpose(that.slice(H,[k+1,n],[k,k+1]))[0]);
      
      var I = that.iden(k+1);
      var N = that.zeros(k+1,n-k-1);
      var m = v.length;
      var R = that.sub(that.iden(m),that.mul(beta,that.transpose([v]),[v]));
      
      var h1 = that.matmul(R,that.slice(H,[k+1,n],[k,n]));
      H = that.blit(H,[k+1,n],[k,n],h1);
      
      var h2 = that.matmul(that.slice(H,[0,n],[k+1,n]),R);
      H = that.blit(H,[0,n],[k+1,n],h2);
      
      var P = that.hstack(I,N).concat(that.hstack(that.transpose(N),R));
      Q = that.matmul(Q,P);
    }
    // that.print(H,Q,that.mul(that.transpose(Q),a,Q));
    return [H,Q];
    
  }

  that.eigen = function(A,{fancy=true,maxiter=50}={}){
    assert(A,'ismat','!hasnan');
    
    if (usingwasm()){return that.wasm.eigen(A,{maxiter:maxiter})};
    
    if (!fancy){
      var Q = undefined;
      for (var i = 0; i < maxiter; i++){
        var [q,r] = that.qr(A);
        A = that.matmul(r,q);
        Q = Q?that.matmul(Q,q):q;
      }
      var vals = that.diagonal(A);
      // that.print(Q);
      var Qt = that.transpose(Q);
      var pairs = [];
      for (var i = 0; i < vals.length; i++){
        pairs.push({val:vals[i],vec:Qt[i]});
      }
      return pairs;
    }
    
    
    var n = A.length;
    var eigs = [];
    var I = that.iden(n);
    var Qh;
    [A, Qh] = that.hessenberg(A);
    
    function wilkinson(a,b,c){
      var d = (a-c)/2
      var sgn = d > 0 ? 1 : -1
      return c - sgn * b * b / (Math.abs(d) + Math.sqrt(d*d+b*b))
    }

    var Q = undefined;
    for (var k = 0; k < n; k++){
      if (k == n - 1){
        eigs.unshift(A[0][0]);
        continue;
      }
      for (var i = 0; i < maxiter; i++){
        var mu = wilkinson(A[A.length-2][A.length-2], 
                           A[A.length-2][A.length-1], 
                           A[A.length-1][A.length-1] );
        var muI = that.scale(I,mu)
        var [q,r] = that.qr(that.sub(A,muI));
        var qp = that.blit(I,[0,that.nrows(q)],[0,that.ncols(q)],q);
        Q = Q?that.matmul(Q,qp):qp;
        A = that.add(that.matmul(r,q), muI);
        if (Math.abs(A[A.length-1][A.length-2]) < 1e-8){
          break;
        }
      }
      eigs.unshift(A[A.length-1][A.length-1]);  
      A = that.slice(A, [0, A.length-1], [0, A.length-1]);
    }
    var QQ = that.transpose(that.matmul(Qh,Q));
    var pairs = [];
    for (var i = 0; i < eigs.length; i++){
      pairs.push({val:eigs[i],vec:QQ[i]});
    }
    return pairs;
  }
  
  
    
  that.gerschgorin = function(A){
    assert(A,'ismat','!hasnan','issquare');
    var n = that.nrows(A);
    var disks = [];
    for (var i = 0; i < n; i++){
      var r = 0;
      var o = A[i][i];
      for (var j = 0; j < n; j++){
        if (i != j){
          r += Math.abs(A[i][j]);
        }
      }
      disks.push({o:o,r:r});
    }
    return disks;
  }
  
  that.minor = function(A,i,j){
    assert(A,'ismat','!hasnan');
    assert(i,'isnum');
    assert(j,'isnum');
    var r = []
    for (var a = 0; a < A.length; a++){
      if (a == i){
        continue;
      }
      r.push([]);
      for (var b = 0; b < A[a].length; b++){
        if (b == j){
          continue;
        }
        r[r.length-1].push(A[a][b]);
      }
    }
    return r;
    
  }
  
  that.cofactor = function(A,i,j){
    assert(A,'ismat','!hasnan','issquare');
    assert(i,'isnum');
    assert(j,'isnum')
    
    return Math.pow(-1,i+j) * that.det(that.minor(A,i,j))
  }
  
  
  that.det = function(A){
    assert(A,'ismat','!hasnan','issquare');
    
    if (usingwasm()){return that.wasm.det(A)};
    
    var n = A.length;
    if (n == 1){
      return A[0][0];
    }
    if (n == 2){
      return A[0][0]*A[1][1]-A[0][1]*A[1][0];
    }
    var s = 0;
    for (var j = 0; j < n; j++){
      s += A[0][j] * that.cofactor(A,0,j)
    }
    
    return s;
  }
  
  this.adj = function(A){
    assert(A,'ismat','!hasnan','issquare');
    var comat = that.map(A, (x,i,j)=>(that.cofactor(A,i,j)));
    return that.transpose(comat);
    
  }
  
  that.inv = function(A,{method="adjugate"}={}){
    assert(A,'ismat','!hasnan','issquare');
    
    if (usingwasm()){return that.wasm.inv(A)};
    
    if (method == 'adjugate'){
      var d = that.det(A);
      if (Math.abs(d)<1e-10){
        throw that.SINGULAR;
      }
      return that.scale(that.adj(A),1/d);
      
    }else if (method == 'gaussjordan'){
      var I = that.iden(A.length);
      var [a,aug] = that.gauss(A,I,{jordan:true});
      if (that.approx(a,I)){
        return aug;
      }else{
        throw that.SINGULAR
      }
    }else{
      throw TypeError(method);
    }
  }
  
  that.lup = function(A,{p=false}={}){
    assert(A,'ismat','!hasnan','issquare');
    if (p){
      var [u,_,emats] = that.gauss(A,that.iden(A.length),{
        elementary:true,jordan:false,operations:['s','+*']});
      var l = that.iden(A.length);
      var P = that.iden(A.length);
      // console.log(emats)
      for (var i = 0; i < emats.length; i++){
        
        if (that.isperm(emats[i])){
          
          P = that.matmul(emats[i],P);
          
        }else{
          var einv = that.inv(emats[i],{method:'adjugate'});
          l = that.matmul(l,einv);
          
        }
      }
      return [l,u,P]
    }else{
      
      var [u,_,emats] = that.gauss(A,that.iden(A.length),{
        elementary:true,jordan:false,operations:['+*']});

      var l = that.iden(A.length);
      for (var i = 0; i < emats.length; i++){
        var einv = that.inv(emats[i],{method:'adjugate'});
        l = that.matmul(l,einv);
        
      }
      return [l,u]
    }
  }
  
  that.cholesky = function(A){
    assert(A,'ismat','!hasnan','issquare','ishermitian');
    var n = A.length;
    var l = that.zeros(n,n)

    for (var i = 0; i < n; i++){
      for (var j = 0; j <= i; j++){
        if (i == j){
          var s = A[j][j];
          for (var k = 0; k < j; k++){
            s -= l[j][k]*l[j][k];
          }
          l[j][j] = Math.sqrt(s);
        }else{
          var s = 0;
          for (var k = 0; k < j; k++){
            s += l[i][k] * l[j][k];
          }
          l[i][j] = (A[i][j]-s)/l[j][j];
        }
      }
    }
    return [l, that.transpose(l)];
  }
  
  that.ldl = function(A){
    assert(A,'ismat','!hasnan','issquare','ishermitian');
    
    var n = A.length;
    var d = that.zeros(n,n);
    var l = that.iden(n);
    
    for (var i = 0; i < n; i++){
      for (var j = 0; j <= i; j++){
        if (i == j){
          var s = A[j][j]
          for (var k = 0; k < j; k++){
            s -= l[j][k]*l[j][k]*d[k][k]
          }
          d[j][j] = s;
        }else{
          var s = A[i][j]
          for (var k = 0; k < j; k++){
            s -= l[i][k]*l[j][k]*d[k][k]
          }
          l[i][j] = s/d[j][j];
        }
      }
    }
    return [l,d,that.transpose(l)];
  }
  
  
  that.polar = function(A,{method='svd'}={}){
    assert(A,'ismat','!hasnan','issquare');
    
    if (method=='direct'){
      var ata = that.matmul(that.transpose(A), A);
      var eigs = that.eigen(ata);
      // console.log(eigs)
      if (eigs.length < ata.length){
        throw that.UNFACTORIZABLE
      }
      var S = undefined;
      var B = that.iden(A.length);
      for (var i = 0; i < eigs.length; i++){
        var sc = 1/eigs[i].vec[0];
        for (var j = 0; j < eigs[i].vec.length; j++){
          eigs[i].vec[j] *= sc;
        }
        var col = that.transpose([eigs[i].vec]);
        if (S == undefined){
          S = col;
        }else{
          S = that.hstack(S,col);
        }
        B[i][i] = eigs[i].val
      }
      var C = that.map(B,Math.sqrt);
      var Sinv = that.inv(S);
      var P = that.matmul(that.matmul(S,C),Sinv);
      var U = that.matmul(A,that.inv(P));
      return [U,P];
      
    }else if (method=='svd'){
      var [u,s,v] = that.svd(A);
      var vt = that.transpose(v)
      var B = that.matmul(u,vt);
      var C = that.matmul(that.matmul(v,s),vt);
      return [B,C]
      
    }else{
      throw TypeError(method);
    }
  }
  
  that.svd = function(A){
    assert(A,'ismat','!hasnan');

    if (usingwasm()){return that.wasm.svd(A)};
    
    var ata = that.matmul(that.transpose(A), A);
    

    
    var eigs = that.eigen(ata);
    eigs.sort((x,y)=>(y.val-x.val));
    // that.print(eigs)
    if (eigs.length < ata.length){
      throw that.UNFACTORIZABLE
    }
    
    
    var U = undefined;
    var V = undefined;
    var S = that.zeros(eigs.length, eigs.length);
    
    for (var i = 0; i < S.length; i++){
      var sig = (eigs[i].val < 1e-10) ? 0 : Math.sqrt(eigs[i].val)

      var u, v;
      if (sig != 0){
        // console.log(sig);
        v = that.transpose([that.normalize(eigs[i].vec)]);
        u = that.scale(that.matmul(A,v),1/sig);
        
      }else{
        v = that.transpose([eigs[i].vec]);
        u = that.matmul(A,v);
      }
      U = (U==undefined)?u:that.hstack(U,u);
      V = (V==undefined)?v:that.hstack(V,v);

      // that.print(A,i)
      S[i][i] = sig;
    }
    // console.log(that.approx(a,that.matmul(that.matmul(U,S),that.transpose(V))))
    
    return [U,S,V]
  }
  
  that.pinv = function(A, {method='direct'}={}){
    assert(A,'ismat','!hasnan');
    if (method == 'direct'){
      var at = that.transpose(A);
      return that.matmul(that.inv(that.matmul(at,A)),at);
    }else if (method == 'svd'){
      var [u,s,v] = that.svd(A);
      for (var i = 0; i < Math.min(that.nrows(s),that.ncols(s)); i++){
        if (Math.abs(s[i][i]) > 1e-10){
          s[i][i] = 1/s[i][i];
        }else{
          s[i][i] = 0;
        }
      }
      s = that.transpose(s);
      return that.matmul(that.matmul(v,s),that.transpose(u));
    }else{
      throw TypeError(method);
    }
  }
  
  that.affine = function(typ,a,b){
    assert(a,'isvec|isnum','!hasnan');
    
    if (typ == "rot2d"){
      return [
        [Math.cos(a), -Math.sin(a), 0],
        [Math.sin(a), Math.cos(a), 0], [0,0,1]
      ]
    }else if (typ == "rotx"){
      return [
        [1, 0, 0, 0], [0, Math.cos(a), -Math.sin(a),0], 
        [0, Math.sin(a), Math.cos(a), 0], [0, 0, 0, 1]
      ];
    }else if (typ == "roty"){
      return [
        [Math.cos(a), 0, Math.sin(a), 0], [0, 1, 0, 0], 
        [-Math.sin(a),0, Math.cos(a), 0], [0, 0, 0, 1]
      ];
    }else if (typ == "rotz"){
      return [
        [Math.cos(a), -Math.sin(a),0, 0], 
        [Math.sin(a), Math.cos(a), 0, 0], 
        [0, 0, 1, 0], [0, 0, 0, 1]
      ];
    }else if (typ == "rotaxial"){
      var costh = Math.cos(a);
      var sinth = Math.sin(a);
      return [
        [b[0]*b[0] *(1-costh) +costh,
        b[1]*b[0] *(1-costh) -b[2]*sinth,
        b[2]*b[0] *(1-costh) +b[1]*sinth,
        0],
        [b[0]*b[1] *(1-costh) +b[2]*sinth,
        b[1]*b[1] *(1-costh) +costh,
        b[2]*b[1] *(1-costh) -b[0]*sinth,
        0],
        [b[0]*b[2] *(1-costh) -b[1]*sinth,
        b[1]*b[2] *(1-costh) +b[0]*sinth,
        b[2]*b[2] *(1-costh) +costh,
        0],
        [0,0,0,1]
      ]
    }else if (typ == "transl2d"){
      return [
        [1, 0, a[0]], [0, 1, a[1]], [0, 0, 1]
      ];
    }else if (typ == "transl3d"){
      return [
        [1, 0 ,0, a[0]], [0, 1, 0, a[1]], 
        [0, 0, 1, a[2]], [0, 0, 0, 1]
      ];
    }else if (typ == "scale2d"){
      if (typeof a == 'number'){
        a = [a,a];
      }
      return [
        [a[0], 0 ,0], [0, a[1], 0], [0, 0, 1]
      ];
    }else if (typ == "scale3d"){
      if (typeof a == 'number'){
        a = [a,a,a];
      }
      return [
        [a[0], 0 ,0, 0], [0, a[1], 0, 0], 
        [0, 0, a[2], 0], [0, 0, 0, 1]
      ];
    }else if (typ == "reflect2d"){
      a = that.normalize(a);
      return [
        [a[0]*a[0]-a[1]*a[1], 2*a[0]*a[1],0],
        [2*a[0]*a[1], a[1]*a[1]-a[0]*a[0],0],
        [0,0,1],
      ]
    }else if (typ == "reflect3d"){
      return [
        [1-2*a[0]*a[0], -2*a[0]*a[1], -2*a[0]*a[2], 0],
        [-2*a[0]*a[1], 1-2*a[1]*a[1], -2*a[1]*a[2], 0],
        [-2*a[0]*a[2], -2*a[1]*a[2], 1-2*a[2]*a[2], 0],
        [0,0,0,1]
      ] 
    }else{
      throw TypeError(typ);
    }
  }
  
  that.transform = function(A,v){
    assert(A, 'ismat','!hasnan','ncols='+(v.length+1));
    assert(v, 'isvec','!hasnan');
    var u = that.transpose(that.matmul(A, that.transpose([v.concat(1)])))[0];
    // console.log(u);
    for (var i = 0; i < u.length-1; i++){
      u[i] /= u[u.length-1];
    }
    return u.slice(0,-1);
  }

  that.magic = function(n){
    assert(n, 'isnum','!hasnan');
    
    var a = that.zeros(n,n);
    if (n % 2 == 1){
      var y = 0;
      var x = Math.floor(n/2);
      
      for (var i = 0; i < n*n; i++){
        a[y][x] = i+1;
        var ny = (y - 1 + n) % n;
        var nx = (x + 1 + n) % n;
        if (a[ny][nx] != 0){
          [x,y] = [x, (y + 1 + n) % n];
        }else{
          [x,y] = [nx,ny];
        }
      }
      
    }else if (n % 4 == 0){
      for (var i = 0; i < n; i++){
        for (var j = 0; j < n; j++){
          if ((i<n/4  && j<n/4) || (i<n/4 && j>=n*3/4) ||
              (i>=n*3/4 && j<n/4) || (i>=n*3/4 && j>=n*3/4)||
              (i>=n/4 && i <n*3/4 && j >= n/4 && j <n*3/4)){
            a[i][j] = i*n+j+1;
          }else{
            a[i][j] = n*n-(i*n+j);
          }
          
        }
      }
    }else if (n % 2 == 0){
      var y = 0;
      var x = n/2-1;
      for (var i = 0; i < n*n/4; i++){
        
        if ((y < n/2+1 && !(x==n/2-1 && y==n/2-1)) || (y==n/2+1 && x==n/2-1)){
          a[y][x]    = i*4+4;
          a[y][x+1]  = i*4+1;
          a[y+1][x]  = i*4+2;
          a[y+1][x+1]= i*4+3;
        }else if (y == n/2+1 || (y==n/2-1 && x==n/2-1)){
          a[y][x]    = i*4+1;
          a[y][x+1]  = i*4+4;
          a[y+1][x]  = i*4+2;
          a[y+1][x+1]= i*4+3;
        }else{
          a[y][x]    = i*4+1;
          a[y][x+1]  = i*4+4;
          a[y+1][x]  = i*4+3;
          a[y+1][x+1]= i*4+2;
        }
        var ny = (y - 2 + n) % n;
        var nx = (x + 2 + n) % n;
        if (a[ny][nx] != 0){
          [x,y] = [x, (y + 2 + n) % n];
        }else{
          [x,y] = [nx,ny];
        }
      }
    }
    return a;
    
    
  }
  
  that.lsq = function(A,b,{method='gaussjordan'}={}){
    assert(A, 'ismat','!hasnan');
    assert(b, 'isvec','!hasnan');
    b = that.transpose([b]);
    if (method == 'gaussjordan'){
      var at = that.transpose(A);
      var ata = that.matmul(at,A);
      var atb = that.matmul(at,b);
      var m = that.hstack(ata,atb);
      return that.gaussjordan(m);
    }else if (method == 'qr'){
      var [q,r] = that.qr(A);
      var qtb = that.matmul(that.transpose(q),b);
      
      r = r.filter(x=>x.filter(y=>Math.abs(y)>1e-10).length);
      qtb = qtb.slice(0,r.length);
      return that.gaussjordan(that.hstack(r,qtb));
    }else{
      throw TypeError(method);
    }
  }
  
  that.lsqfit = function(data, {order=1}={}){
    assert(data, 'ismat','!hasnan');
    var a = that.zeros(data.length,order+1);
    var b = [];
    for (var i = 0; i < data.length; i++){
      for (var j = 0; j < order+1; j++){
        a[i][j] = Math.pow(data[i][0],j);
      }
      b.push(data[i][1]);
    }
    return that.lsq(a,b,{method:'qr'});
  }
  
  that.dist = function(typ0,a,typ1,b){
    assert(a, 'ismat|isvec','!hasnan');
    assert(b, 'ismat|isvec','!hasnan');
    
    function checkplane(a){
      if (that.norm(a.slice(0,-1))<1e-10){
        return TypeError("invalid plane equation")
      }
    }
    
    
    if (typ0 == 'pt'){
      if (typ1 == 'pt'){
        return that.norm(that.sub(a,b));
      }else if (typ1 == 'ln'){
        if (that.norm(b[1]) < 1e-10){
          return that.dist('pt',a,'pt',b[0]);
        }
        var o = b[0];
        var d = that.normalize(b[1]);
        var oa = that.sub(a,o);
        return that.norm(that.sub(oa, that.scale(d, that.dot(oa, d))));
      }else if (typ1 == 'pl'){
        var d = b[b.length-1];
        var c = b.slice(0,-1);
        return Math.abs(that.dot(a,c)-d)/that.norm(c);
      }else{
        throw TypeError(typ1);
      }
    }else if (typ0 == 'ln'){
      if (typ1 == 'pt'){
        return that.dist(typ1,b,typ0,a);
      }else if (typ1 == 'ln'){
        if (a[0].length == 2){
          return that.dist('ln',that.hstack(a,[[0],[0]]),'ln',that.hstack(b,[[0],[0]]));
        }
        if (a[0].length == 3){
          if (that.norm(a[1]) < 1e-10){
            return that.dist('pt',a[0],'ln',b);
          }
          if (that.norm(b[1]) < 1e-10){
            return that.dist('pt',b[0],'ln',a);
          }
          var n = that.cross(a[1],b[1]);
          var r = that.sub(a[0],b[0]);
          var d = that.dot(n,r)/that.norm(n);
          return d;
        }
        var A = that.T([a[1],that.scale(b[1],-1)])
        var B = that.sub(b[0],a[0]);
        var [t,s] = that.lsq(A,B,{method:'qr'});
        var p = that.add(a[0],that.scale(a[1],t));
        var q = that.add(b[0],that.scale(b[1],s));
        return that.dist('pt',p,'pt',q);
      }else if (typ1 == 'pl'){
        checkplane(b);
        var x = that.dot(a[1],b.slice(0,-1));
        if (Math.abs(x) < 1e-10){
          return that.dist('pt',a[0],'pl',b);
        }else{
          return 0;
        }
      }else{
        throw TypeError(typ1);
      }
    }else if (typ0 == 'pl'){
      if (typ1 == 'pt'){
        return that.dist(typ1,b,typ0,a);
      }else if (typ1 == 'ln'){
        return that.dist(typ1,b,typ0,a);
      }else if (typ1 == 'pl'){
        checkplane(a);
        checkplane(b);
        var x = that.dot(that.normalize(a.slice(0,-1)),that.normalize(b.slice(0,-1)));
        
        if (Math.abs(x-1) < 1e-10 || Math.abs(x+1) < 1e-10){
          var p = new Array(a.length-1).fill(1);
          var pvt = 0;
          for (var i = 0; i < a.length-1; i++){
            if (a[i] != 0){
              pvt = i;
              break;
            }
          }
          p[pvt] = a[a.length-1];
          for (var i = 0; i < a.length-1; i++){
            if (i != pvt){
              p[pvt] -= a[i];
            }
          }
          p[pvt] /= a[pvt];
          that.print(p);
          return that.dist('pt',p, 'pl',b)
        }else{
          return 0;
        }
      }else{
        throw TypeError(typ1);
      }
    }
    
  }

  
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = LOSHU 
}else{
  var lo = LOSHU;
}