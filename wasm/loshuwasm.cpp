#include <iostream>
#include <string>
#include <math.h>
#include <vector>
#include <iomanip>

struct _idxdouble_t{
  int idx;
  double val;
};

bool _compidxdouble(_idxdouble_t& a, _idxdouble_t& b){
  return a.val > b.val;
}

struct matrix_t {
  std::vector<double> data;
  int nrows;
  int ncols;
  void reshape(int m, int n){
    nrows = m;
    ncols = n;
  }
  void push(double x){
    data.push_back(x);
  }
  void zeros(int m, int n){
    data.clear();
    for (int i = 0; i < m; i++){
      for (int j = 0; j < n; j++){
        data.push_back(0); 
      }
    }
    nrows = m;
    ncols = n;
  }
  void iden(int m){
    data.clear();
    for (int i = 0; i < m; i++){
      for (int j = 0; j < m; j++){
        if (i == j){
          data.push_back(1);
        }else{
          data.push_back(0);
        } 
      }
    }
    nrows = m;
    ncols = m;
  }
  void release(){
    data.clear();
  }
  void set(int i, int j, double x){
    data[i*ncols+j] = x;
  }
  double get(int i, int j){
    return data[i*ncols+j];
  }
  void mul(matrix_t* B, matrix_t* C){
    C->zeros(nrows,B->ncols);
    for (int i = 0; i < nrows; i++) {
      for (int j = 0; j < B->ncols; j++) {
        double sum = 0;
        for (int k = 0; k < ncols; k++) {
          sum += get(i,k) * (B->get(k,j));
        }
        C->set(i,j,sum);
      }
    }
  }
  void transpose(matrix_t* B){
    B->zeros(ncols,nrows);
    for (int i = 0; i < ncols; i++){
      for (int j = 0; j < nrows; j++){
        B->set(i,j,get(j,i)); 
      }
    }
  }
  void col(int j, matrix_t* B){
    B->zeros(nrows,1);
    for (int i = 0; i < nrows; i++){
      B->set(i,0,get(i,j));
    }
  }
  double vnorm(){
    double s;
    for (int i = 0; i < nrows; i++){
      double x = get(i,0);
      s += x*x;
    }
    return sqrt(s);
  }

  void vnormzeq(){
    double s = vnorm();
    if (abs(s) > 1e-10){
      scaleeq(1/s);
    }
  }

  void scaleeq(double s){
    for (int i = 0; i < nrows; i++){
      for (int j = 0; j < ncols; j++){
        set(i,j,get(i,j)*s);
      }
    }
  }
  void pluseq(matrix_t* B, double s){
    for (int i = 0; i < nrows; i++){
      for (int j = 0; j < ncols; j++){
        set(i,j,get(i,j)+B->get(i,j)*s);
      }
    }
  }
  void clone(matrix_t* B){
    B->zeros(nrows,ncols);
    for (int i = 0; i < nrows; i++){
      for (int j = 0; j < ncols; j++){
        B->set(i,j,get(i,j));
      }
    }
  }
  void minor(int i,int j,matrix_t* B){
    B->zeros(nrows-1,ncols-1);
    for (int _i = 0; _i < nrows-1; _i++){
      int ii = _i < i ? _i : _i+1;
      for (int _j = 0; _j < ncols-1; _j++){
        int jj = _j < j ? _j : _j+1;
        B->set(_i,_j,get(ii,jj));
      }
    }
  }
  void bliteq(matrix_t* B, int i0, int i1, int j0,int j1){
    for (int i = i0; i < i1; i++){
      for (int j = j0; j < j1; j++){
        set(i,j,B->get(i-i0,j-j0));
      }
    }
  }
  void slice(int i0, int i1, int j0,int j1, matrix_t* B){
    B->zeros(i1-i0,j1-j0);
    for (int i = i0; i < i1; i++){
      for (int j = j0; j < j1; j++){
        B->set(i-i0,j-j0,get(i,j));
      }
    }
  }

  void qr(matrix_t* Q, matrix_t* R){
    matrix_t A; clone(&A);
    matrix_t Q_; Q_.iden(nrows);

    for (int i = 0; i < std::min(nrows-1,ncols); i++){
      matrix_t v; A.col(0,&v);
      double a = v.vnorm();
      matrix_t e1; e1.zeros(A.nrows,1); e1.set(0,0,1);
      v.pluseq(&e1,-a);
      v.vnormzeq();
      matrix_t q; q.iden(A.nrows);
      matrix_t vv;
      matrix_t vt; v.transpose(&vt);
      v.mul(&vt,&vv);

      vv.scaleeq(2);
      q.pluseq(&vv,-1);

      matrix_t qp; qp.iden(nrows);
      int n0 = nrows-(q.nrows);
      qp.bliteq(&q,n0,nrows,n0,nrows);
      matrix_t Qn; Q_.mul(&qp,&Qn); Qn.clone(&Q_);
      matrix_t qa; q.mul(&A,&qa);
      qa.minor(0,0,&A);


    }
    matrix_t Qt; Q_.transpose(&Qt);
    Qt.mul(this,R);
    Q_.clone(Q);

  }

  void stack4(matrix_t* B, matrix_t* C, matrix_t* D, matrix_t* E){
    data.clear();
    nrows = (B->nrows) + (D->nrows);
    ncols = (B->ncols) + (C->ncols);
    int i0 = B->nrows;
    int j0 = B->ncols;
    for (int i = 0; i < nrows; i++){
      for (int j = 0; j < ncols; j++){
        if (i < i0){
          if (j < j0){
            data.push_back(B->get(i,j));
          }else{
            data.push_back(C->get(i,j-j0));
          }
        }else{
          if (j < j0){
            data.push_back(D->get(i-i0,j));
          }else{
            data.push_back(E->get(i-i0,j-j0));
          }
        }
      }
    }
  }

  void hessenberg(matrix_t* H,matrix_t* Q){
    int n = std::max(nrows,ncols);
    matrix_t Q_; Q_.iden(n);
    matrix_t H_; clone(&H_);
    for (int k = 0; k < n-2; k++){
      matrix_t x; H_.slice(k+1,n,k,k+1,&x);
      x.vnormzeq();
      matrix_t v; x.slice(1,x.nrows,0,1,&v);

      matrix_t vt; v.transpose(&vt);
      matrix_t ss; vt.mul(&v,&ss);

      double s = ss.get(0,0);

      v.data.insert(v.data.begin(),1); v.nrows ++;

      double beta;
      if (s == 0){
        beta = 0;
      }else{
        double x0 = x.get(0,0);
        double mu = sqrt(x0*x0+s);
        double v0 = x0 <= 0 ? (x0-mu) : (-s/(x0+mu));
        double v02 = v0*v0;
        v.set(0,0,v0);
        beta = 2 * v02/ (s+v02);
        v.scaleeq(1/v0);
      }

      matrix_t I; I.iden(k+1);
      matrix_t N; N.zeros(k+1,n-k-1);
      double m = v.nrows;
      matrix_t R; R.iden(m);
      matrix_t v_t; v.transpose(&v_t);
      matrix_t vv; v.mul(&v_t,&vv);
      R.pluseq(&vv,-beta);

      matrix_t h_1; H_.slice(k+1,n,k,n,&h_1);
      matrix_t h1; R.mul(&h_1,&h1);
      H_.bliteq(&h1,k+1,n,k,n);

      matrix_t h_2; H_.slice(0,n,k+1,n,&h_2);
      matrix_t h2; h_2.mul(&R,&h2);

      H_.bliteq(&h2,0,n,k+1,n);

      matrix_t Nt; N.transpose(&Nt);
      matrix_t P; P.stack4(&I,&N,&Nt,&R);

      matrix_t Qn; Q_.mul(&P,&Qn);
      Qn.clone(&Q_);
    }
    H_.clone(H);
    Q_.clone(Q);
  }

  void eigen(matrix_t* V, matrix_t* D, int maxiter){
    int n = nrows;
    matrix_t I; I.iden(n);
    matrix_t A; matrix_t Qh;
    hessenberg(&A,&Qh);

    matrix_t Q;
    std::vector<double> eigs;
    for (int k = 0; k < n; k++){
      if (k == n-1){
        eigs.push_back(A.get(0,0));
        continue;
      }
      for (int i = 0; i < maxiter; i++){
        double a = A.get(A.nrows-2,A.nrows-2);
        double b = A.get(A.nrows-2,A.nrows-1);
        double c = A.get(A.nrows-1,A.nrows-1);
        double d = (a-c)/2;
        double sgn = d > 0 ? 1 : -1;
        double mu = c - sgn * b * b / (abs(d)+sqrt(d*d+b*b));
      
      
        matrix_t amu; A.clone(&amu);
        amu.pluseq(&I,-mu);

        matrix_t q; matrix_t r;
        amu.qr(&q,&r);

        matrix_t qp; I.clone(&qp);
        qp.bliteq(&q,0,q.nrows,0,q.ncols);
        if (k == 0 && i == 0){
          qp.clone(&Q);
        }else{
          matrix_t Qn; Q.mul(&qp,&Qn);
          Qn.clone(&Q);
        }
        r.mul(&q,&A);
        A.pluseq(&I,mu);

        if (abs(A.get(A.nrows-1,A.nrows-2)) < 1e-8){
          break;
        }
      }
      eigs.push_back(A.get(A.nrows-1,A.nrows-1));
      matrix_t An;
      A.slice(0,A.nrows-1,0,A.nrows-1,&An);
      A = An;
    }
    Qh.mul(&Q,V);

    double es = eigs.size();
    D->zeros(es,es);
    for (int i = 0; i < es; i++){
      D->set(es-i-1,es-i-1,eigs[i]);
    }
  }

  double cofactor(int i, int j){
    matrix_t A; minor(i,j,&A);
    double d = A.det();
    return pow(-1,i+j) * d;
  }

  double det(){
    double n = nrows;
    if (n == 1){
      return get(0,0);
    }else if (n == 2){
      return get(0,0)*get(1,1)-get(0,1)*get(1,0);
    }
    double s = 0;
    for (int j = 0; j < n; j++){
      s += get(0,j) * cofactor(0,j);
    }
    return s;
  }

  void adj(matrix_t* B){
    B->reshape(nrows,ncols);
    B->data.clear();
    for (int i = 0; i < nrows; i++){
      for (int j = 0; j < ncols; j++){
        B->push(cofactor(i,j));
      }
    }
  }

  bool inv(matrix_t* B){
    double d = det();
    if (abs(d)<1e-10){
      return false;
    }
    adj(B);
    B->scaleeq(1/d);
    return true;
  }

  void svd(matrix_t* U, matrix_t* S, matrix_t* V){

    matrix_t at; transpose(&at);
    matrix_t ata; at.mul(this,&ata);
    matrix_t _v; matrix_t _d;
    ata.eigen(&_v,&_d,50);
    std::vector<_idxdouble_t> eigs;
    for (int i = 0; i < _d.nrows; i++){
      _idxdouble_t e;
      e.val = _d.get(i,i);
      e.idx = i;
      eigs.push_back(e);
    }
    std::sort(eigs.begin(),eigs.end(),_compidxdouble);
    S->zeros(eigs.size(),eigs.size());
    for (int i = 0; i < S->nrows; i++){
      double sig = (eigs[i].val < 1e-10) ? 0 : sqrt(eigs[i].val);
      matrix_t u;
      matrix_t v;
      _v.col(eigs[i].idx, &v);
      if (sig != 0){
        v.vnormzeq();
        mul(&v,&u);
        u.scaleeq(1/sig);
      }else{
        mul(&v,&u);
      }
      if (i == 0){
        U->zeros(u.nrows,S->nrows);
        V->zeros(v.nrows,S->nrows);
      }
      U->bliteq(&u,0,u.nrows,i,i+1);
      V->bliteq(&v,0,v.nrows,i,i+1);
      S->set(i,i,sig);
    }
  }

  std::string _tostr(){
    std::string s = "[";
    for (int i = 0; i < nrows; i++) {
      if (i != 0){
        s += ",";
      }
      s += "[";
      for (int j = 0; j < ncols; j++) {
        if (j != 0){
          s += ",";
        }
        s+=std::to_string(get(i,j));
      }
      s += "]";
    }
    s += "]";
    return s;
    
  }

  char* tostr(){
    std::string s = _tostr();
    char* cs = (char *)s.c_str();
    return cs;
  }

  void print(){
    for (int i = 0; i < nrows; i++) {
      if (i == 0){
        std::cout << "[[";
      }else{
        std::cout << " [";
      }
      for (int j = 0; j < ncols; j++) {
        if (j != 0){
          std::cout << ",";
        }
        std::cout << std::setw(10) << round(get(i,j)*1000)/1000;
      }
      if (i == nrows-1){
        std::cout << "]]\n\n";
      }else{
        std::cout << "],\n";
      }
    }
  }
};

