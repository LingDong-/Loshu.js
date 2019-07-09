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