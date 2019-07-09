
#include <emscripten.h>

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.
void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    EM_ASM({
      throw 'Array index ' + $0 + ' out of bounds: [0,' + $1 + ')';
    }, array_idx, array_size);
  }
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// matrix_t

matrix_t* EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_matrix_t_0() {
  return new matrix_t();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_reshape_2(matrix_t* self, int arg0, int arg1) {
  self->reshape(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_push_1(matrix_t* self, double arg0) {
  self->push(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_zeros_2(matrix_t* self, int arg0, int arg1) {
  self->zeros(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_iden_1(matrix_t* self, int arg0) {
  self->iden(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_release_0(matrix_t* self) {
  self->release();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_set_3(matrix_t* self, int arg0, int arg1, double arg2) {
  self->set(arg0, arg1, arg2);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_get_2(matrix_t* self, int arg0, int arg1) {
  return self->get(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_mul_2(matrix_t* self, matrix_t* arg0, matrix_t* arg1) {
  self->mul(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_transpose_1(matrix_t* self, matrix_t* arg0) {
  self->transpose(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_col_2(matrix_t* self, int arg0, matrix_t* arg1) {
  self->col(arg0, arg1);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_vnorm_0(matrix_t* self) {
  return self->vnorm();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_vnormzeq_0(matrix_t* self) {
  self->vnormzeq();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_scaleeq_1(matrix_t* self, double arg0) {
  self->scaleeq(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_pluseq_2(matrix_t* self, matrix_t* arg0, double arg1) {
  self->pluseq(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_clone_1(matrix_t* self, matrix_t* arg0) {
  self->clone(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_minor_3(matrix_t* self, int arg0, int arg1, matrix_t* arg2) {
  self->minor(arg0, arg1, arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_bliteq_5(matrix_t* self, matrix_t* arg0, int arg1, int arg2, int arg3, int arg4) {
  self->bliteq(arg0, arg1, arg2, arg3, arg4);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_slice_5(matrix_t* self, int arg0, int arg1, int arg2, int arg3, matrix_t* arg4) {
  self->slice(arg0, arg1, arg2, arg3, arg4);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_qr_2(matrix_t* self, matrix_t* arg0, matrix_t* arg1) {
  self->qr(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_stack4_4(matrix_t* self, matrix_t* arg0, matrix_t* arg1, matrix_t* arg2, matrix_t* arg3) {
  self->stack4(arg0, arg1, arg2, arg3);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_hessenberg_2(matrix_t* self, matrix_t* arg0, matrix_t* arg1) {
  self->hessenberg(arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_eigen_3(matrix_t* self, matrix_t* arg0, matrix_t* arg1, int arg2) {
  self->eigen(arg0, arg1, arg2);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_cofactor_2(matrix_t* self, int arg0, int arg1) {
  return self->cofactor(arg0, arg1);
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_det_0(matrix_t* self) {
  return self->det();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_adj_1(matrix_t* self, matrix_t* arg0) {
  self->adj(arg0);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_inv_1(matrix_t* self, matrix_t* arg0) {
  return self->inv(arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_svd_3(matrix_t* self, matrix_t* arg0, matrix_t* arg1, matrix_t* arg2) {
  self->svd(arg0, arg1, arg2);
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_tostr_0(matrix_t* self) {
  return self->tostr();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_print_0(matrix_t* self) {
  self->print();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_get_nrows_0(matrix_t* self) {
  return self->nrows;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_set_nrows_1(matrix_t* self, int arg0) {
  self->nrows = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_get_ncols_0(matrix_t* self) {
  return self->ncols;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t_set_ncols_1(matrix_t* self, int arg0) {
  self->ncols = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_matrix_t___destroy___0(matrix_t* self) {
  delete self;
}

}

