<img src="https://cdn.glitch.com/4ccedd07-e2b9-4ccf-9add-44a186608f08%2Floshu-logo-small.png?v=1562646290711" width="150" align="right" />

# Loshu.js 

### Linear Algebra for Javascript

#### [Online REPL](https://loshu.netlify.com) | [API Reference](https://loshu.netlify.com/apidoc.html)

*Loshu.js* is a linear algebra library for JavaScript.
It not only provides convienient manipulation of matrices and vectors,
but is also capable of more advanced operations such as **matrix decompositions**,
**eigenvalue and vectors**, **solution and approximation to linear systems**, and many more!

(Optionally) accelerated using [WebAssembly](https://webassembly.org/).

## Features

- Basic matrix and vector math: multiplication, inverse, norm, ...
- Matrix factorizations: QR, SVD, Polar, LDL, Cholesky, LUP, ...
- Solving linear systems: Gauss-Jordan elimination, Least squares approximation, ...
- Miscellaneous utilities: affine transformation, n-dimensional point/line/plane distance, ...
- Pretty print matrices
- Simple to use, [documented](https://loshu.netlify.com/apidoc.html) interface
- Try it out in your browser with the [online REPL](https://loshu.netlify.com)
- Additional WebAssembly implementation for certain matrix math (C++ → [emscripten](https://emscripten.org/)) for up to **100x** speed boost

## Quick Start

### For Browser

To use the library, simply include the following to your html:

```html
<script src="https://cdn.jsdelivr.net/npm/loshu/loshu.min.js"></script>
```

To enable Web Assembly acceleration of some functionalities such as `eigen()`, `inv()` and `svd()`, include the `loshuwasm.js` script **before** `loshu.js`, like so:

```html
<script src="https://cdn.jsdelivr.net/npm/loshu/wasm/dist/loshuwasm.js"></script>
<script src="https://cdn.jsdelivr.net/npm/loshu/loshu.min.js"></script>
```

You will see a `web assembly backend initialized` message in console if the wasm module is detected. Otherwise you can manually turn it on using `lo.options.usewasm=true`.


You can also download the scripts from the links above and host them yourself, but you'll also need to [download here](https://loshu.netlify.com/loshuwasm.wasm) the `.wasm` binary and put it in the same folder.

### For Node.js

To use the library with node.js, [download](https://loshu.netlify.com/loshu.js) and `require` it like so:

```javascript
const lo = require("./loshu")
```

To enable Web Assembly acceleration of some functionalities such as `eigen()`, `inv()` and `svd()`, Download the [wasm binary](https://loshu.netlify.com/loshuwasm.wasm) 
as well as [the wrapper](https://loshu.netlify.com/loshuwasm.js) and put them under the same folder. You will see a `web assembly backend initialized` message in the console.

## Examples

```javascript
let A = [[1,2,3],[4,5,6],[7,8,9]];  // matrix is just JS array (row major)
let B = lo.rand(3,3);               // generate a 3x3 matrix of random values
let C = lo.mul(A,B)                 // array multiplication

let [U,S,V] = lo.svd(C);  // singular value decomposition
lo.print(U,S,V);          // pretty print the matrices

let l = lo.lsqfit([[0,0],[1,1],[2,1.9],[3,3.1]],{order:1}) // fit a line to data points
lo.print(`y = ${l[0].toFixed(2)} + ${l[1].toFixed(2)} x`); // display the line equation

let M = lo.affine('roty',Math.PI/4); // create a 45° rotation matrix around y axis
let u = [1,2,3];                     // some vector
let v = lo.transform(M,u);           // apply the transform

```

## Function List

| | | | |
|-|-|-|-|
|[add()](https://loshu.netlify.com/apidoc.html#add)|[adj()](https://loshu.netlify.com/apidoc.html#adj)|[affine()](https://loshu.netlify.com/apidoc.html#affine)|[approx()](https://loshu.netlify.com/apidoc.html#approx)|
|[assert()](https://loshu.netlify.com/apidoc.html#assert)|[blit()](https://loshu.netlify.com/apidoc.html#blit)|[cholesky()](https://loshu.netlify.com/apidoc.html#cholesky)|[clone()](https://loshu.netlify.com/apidoc.html#clone)|
|[cofactor()](https://loshu.netlify.com/apidoc.html#cofactor)|[cond()](https://loshu.netlify.com/apidoc.html#cond)|[cross()](https://loshu.netlify.com/apidoc.html#cross)|[det()](https://loshu.netlify.com/apidoc.html#det)|
|[diagonal()](https://loshu.netlify.com/apidoc.html#diagonal)|[dist()](https://loshu.netlify.com/apidoc.html#dist)|[dot()](https://loshu.netlify.com/apidoc.html#dot)|[eigen()](https://loshu.netlify.com/apidoc.html#eigen)|
|[gauss()](https://loshu.netlify.com/apidoc.html#gauss)|[gaussjordan()](https://loshu.netlify.com/apidoc.html#gaussjordan)|[gerschgorin()](https://loshu.netlify.com/apidoc.html#gerschgorin)|[gramschmidt()](https://loshu.netlify.com/apidoc.html#gramschmidt)|
|[hasinf()](https://loshu.netlify.com/apidoc.html#hasinf)|[hasnan()](https://loshu.netlify.com/apidoc.html#hasnan)|[hessenberg()](https://loshu.netlify.com/apidoc.html#hessenberg)|[householder()](https://loshu.netlify.com/apidoc.html#householder)|
|[hsplit()](https://loshu.netlify.com/apidoc.html#hsplit)|[hstack()](https://loshu.netlify.com/apidoc.html#hstack)|[iden()](https://loshu.netlify.com/apidoc.html#iden)|[inv()](https://loshu.netlify.com/apidoc.html#inv)|
|[ishermitian()](https://loshu.netlify.com/apidoc.html#ishermitian)|[ismat()](https://loshu.netlify.com/apidoc.html#ismat)|[isnum()](https://loshu.netlify.com/apidoc.html#isnum)|[isperm()](https://loshu.netlify.com/apidoc.html#isperm)|
|[issquare()](https://loshu.netlify.com/apidoc.html#issquare)|[isunitary()](https://loshu.netlify.com/apidoc.html#isunitary)|[isvec()](https://loshu.netlify.com/apidoc.html#isvec)|[ldl()](https://loshu.netlify.com/apidoc.html#ldl)|
|[lsq()](https://loshu.netlify.com/apidoc.html#lsq)|[lsqfit()](https://loshu.netlify.com/apidoc.html#lsqfit)|[lup()](https://loshu.netlify.com/apidoc.html#lup)|[magic()](https://loshu.netlify.com/apidoc.html#magic)|
|[map()](https://loshu.netlify.com/apidoc.html#map)|[matmul()](https://loshu.netlify.com/apidoc.html#matmul)|[minor()](https://loshu.netlify.com/apidoc.html#minor)|[mul()](https://loshu.netlify.com/apidoc.html#mul)|
|[ncols()](https://loshu.netlify.com/apidoc.html#ncols)|[norm()](https://loshu.netlify.com/apidoc.html#norm)|[normalize()](https://loshu.netlify.com/apidoc.html#normalize)|[nrows()](https://loshu.netlify.com/apidoc.html#nrows)|
|[outer()](https://loshu.netlify.com/apidoc.html#outer)|[pinv()](https://loshu.netlify.com/apidoc.html#pinv)|[polar()](https://loshu.netlify.com/apidoc.html#polar)|[print()](https://loshu.netlify.com/apidoc.html#print)|
|[proj()](https://loshu.netlify.com/apidoc.html#proj)|[qr()](https://loshu.netlify.com/apidoc.html#qr)|[rand()](https://loshu.netlify.com/apidoc.html#rand)|[rank()](https://loshu.netlify.com/apidoc.html#rank)|
|[scale()](https://loshu.netlify.com/apidoc.html#scale)|[size()](https://loshu.netlify.com/apidoc.html#size)|[slice()](https://loshu.netlify.com/apidoc.html#slice)|[sub()](https://loshu.netlify.com/apidoc.html#sub)|
|[svd()](https://loshu.netlify.com/apidoc.html#svd)|[tr()](https://loshu.netlify.com/apidoc.html#tr)|[transform()](https://loshu.netlify.com/apidoc.html#transform)|[transpose()](https://loshu.netlify.com/apidoc.html#transpose)|
|[zeros()](https://loshu.netlify.com/apidoc.html#zeros)|

## References

The development of this library is largely inspired by the textbook, David Poole's *Linear Algebra: A Modern Introduction*.

Besides Wikipedia and Wolfram MathWorld, the following online resources have also been very helpful in explaining algorithms.

- http://pi.math.cornell.edu/~web6140/TopTenAlgorithms/QRalgorithm.html
- https://www.mathworks.com/matlabcentral/fileexchange/38303-linear-algebra-package
- http://buzzard.ups.edu/courses/2014spring/420projects/math420-UPS-spring-2014-buffington-polar-decomposition.pdf
- http://webhome.auburn.edu/~tamtiny/lecture%2010.pdf
- https://www.cs.cmu.edu/~venkatg/teaching/CStheory-infoage/book-chapter-4.pdf
- http://math.mit.edu/~gs/linearalgebra/ila0403.pdf
