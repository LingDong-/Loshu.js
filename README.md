<img src="https://cdn.glitch.com/4ccedd07-e2b9-4ccf-9add-44a186608f08%2Floshu-logo-small.png?v=1562646290711" width="150" align="right" />

# loshu.js 

### Linear Algebra for Javascript

#### [Online REPL](https://loshu.glitch.me) | [API Reference](https://loshu.glitch.me/apidoc.html)

*loshu.js* is a linear algebra library for JavaScript.
It not only provides convienient manipulation of matrices and vectors,
but is also capable of more advanced operations such **matrix decompositions**,
**eigenvalue and vectors**, **solution and approximation to linear systems**, and many more!

(Optionally) accelerated using [WebAssembly](https://webassembly.org/).

## Features

- Basic matrix and vector math: multiplication, inverse, norm, ...
- Matrix factorizations: QR, SVD, Polar, LDL, Cholesky, LUP, ...
- Solving linear systems: Gauss-Jordan elimination, Least squares approximation, ...
- Miscellaneous utilities: affine transformation, n-dimensional point/line/plane distance, ...
- Pretty print matrices
- Simple to use, [documented](https://loshu.glitch.me/apidoc.html) interface
- Try it out in your browser with the [online REPL](https://loshu.glitch.me)
- Additional WebAssembly implementation for certain matrix math (C++ → [emscripten](https://emscripten.org/)) for up to **100x** speed boost

## Quick Start

### For Browser

To use the library, simply include the following to your html:

```html
<script src="https://loshu.glitch.me/loshu.js"></script>
```

To enable Web Assembly acceleration of some functionalities such as `eigen()`, `inv()` and `svd()`, include the `loshuwasm.js` script **before** `loshu.js`, like so:

```html
<script src="https://loshu.glitch.me/loshuwasm.js"></script>
<script src="https://loshu.glitch.me/loshu.js"></script>
```

You will see a `web assembly backend initialized` message in console if the wasm module is detected. Otherwise you can manually turn it on using `lo.options.usewasm=true`.


You can also download the scripts from the links above and host them yourself, but you'll also need to [download here](https://loshu.glitch.me/loshuwasm.wasm) the `.wasm` binary and put it in the same folder.

### For Node.js

To use the library with node.js, [download](https://loshu.glitch.me/loshu.js) and `require` it like so:

```javascript
const lo = require("./loshu")
```

To enable Web Assembly acceleration of some functionalities such as `eigen()`, `inv()` and `svd()`, Download the [wasm binary](https://loshu.glitch.me/loshuwasm.wasm) 
as well as [the wrapper](https://loshu.glitch.me/loshuwasm.js) and put them under the same folder. You will see a `web assembly backend initialized` message in the console.

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
|[add()](https://loshu.glitch.me/apidoc.html#add)|[adj()](https://loshu.glitch.me/apidoc.html#adj)|[affine()](https://loshu.glitch.me/apidoc.html#affine)|[approx()](https://loshu.glitch.me/apidoc.html#approx)|
|[assert()](https://loshu.glitch.me/apidoc.html#assert)|[blit()](https://loshu.glitch.me/apidoc.html#blit)|[cholesky()](https://loshu.glitch.me/apidoc.html#cholesky)|[clone()](https://loshu.glitch.me/apidoc.html#clone)|
|[cofactor()](https://loshu.glitch.me/apidoc.html#cofactor)|[cond()](https://loshu.glitch.me/apidoc.html#cond)|[cross()](https://loshu.glitch.me/apidoc.html#cross)|[det()](https://loshu.glitch.me/apidoc.html#det)|
|[diagonal()](https://loshu.glitch.me/apidoc.html#diagonal)|[dist()](https://loshu.glitch.me/apidoc.html#dist)|[dot()](https://loshu.glitch.me/apidoc.html#dot)|[eigen()](https://loshu.glitch.me/apidoc.html#eigen)|
|[gauss()](https://loshu.glitch.me/apidoc.html#gauss)|[gaussjordan()](https://loshu.glitch.me/apidoc.html#gaussjordan)|[gerschgorin()](https://loshu.glitch.me/apidoc.html#gerschgorin)|[gramschmidt()](https://loshu.glitch.me/apidoc.html#gramschmidt)|
|[hasinf()](https://loshu.glitch.me/apidoc.html#hasinf)|[hasnan()](https://loshu.glitch.me/apidoc.html#hasnan)|[hessenberg()](https://loshu.glitch.me/apidoc.html#hessenberg)|[householder()](https://loshu.glitch.me/apidoc.html#householder)|
|[hsplit()](https://loshu.glitch.me/apidoc.html#hsplit)|[hstack()](https://loshu.glitch.me/apidoc.html#hstack)|[iden()](https://loshu.glitch.me/apidoc.html#iden)|[inv()](https://loshu.glitch.me/apidoc.html#inv)|
|[ishermitian()](https://loshu.glitch.me/apidoc.html#ishermitian)|[ismat()](https://loshu.glitch.me/apidoc.html#ismat)|[isnum()](https://loshu.glitch.me/apidoc.html#isnum)|[isperm()](https://loshu.glitch.me/apidoc.html#isperm)|
|[issquare()](https://loshu.glitch.me/apidoc.html#issquare)|[isunitary()](https://loshu.glitch.me/apidoc.html#isunitary)|[isvec()](https://loshu.glitch.me/apidoc.html#isvec)|[ldl()](https://loshu.glitch.me/apidoc.html#ldl)|
|[lsq()](https://loshu.glitch.me/apidoc.html#lsq)|[lsqfit()](https://loshu.glitch.me/apidoc.html#lsqfit)|[lup()](https://loshu.glitch.me/apidoc.html#lup)|[magic()](https://loshu.glitch.me/apidoc.html#magic)|
|[map()](https://loshu.glitch.me/apidoc.html#map)|[matmul()](https://loshu.glitch.me/apidoc.html#matmul)|[minor()](https://loshu.glitch.me/apidoc.html#minor)|[mul()](https://loshu.glitch.me/apidoc.html#mul)|
|[ncols()](https://loshu.glitch.me/apidoc.html#ncols)|[norm()](https://loshu.glitch.me/apidoc.html#norm)|[normalize()](https://loshu.glitch.me/apidoc.html#normalize)|[nrows()](https://loshu.glitch.me/apidoc.html#nrows)|
|[outer()](https://loshu.glitch.me/apidoc.html#outer)|[pinv()](https://loshu.glitch.me/apidoc.html#pinv)|[polar()](https://loshu.glitch.me/apidoc.html#polar)|[print()](https://loshu.glitch.me/apidoc.html#print)|
|[proj()](https://loshu.glitch.me/apidoc.html#proj)|[qr()](https://loshu.glitch.me/apidoc.html#qr)|[rand()](https://loshu.glitch.me/apidoc.html#rand)|[rank()](https://loshu.glitch.me/apidoc.html#rank)|
|[scale()](https://loshu.glitch.me/apidoc.html#scale)|[size()](https://loshu.glitch.me/apidoc.html#size)|[slice()](https://loshu.glitch.me/apidoc.html#slice)|[sub()](https://loshu.glitch.me/apidoc.html#sub)|
|[svd()](https://loshu.glitch.me/apidoc.html#svd)|[tr()](https://loshu.glitch.me/apidoc.html#tr)|[transform()](https://loshu.glitch.me/apidoc.html#transform)|[transpose()](https://loshu.glitch.me/apidoc.html#transpose)|
|[zeros()](https://loshu.glitch.me/apidoc.html#zeros)|

## References

The development of this library is largely inspired by the textbook, David Poole's *Linear Algebra: A Modern Introduction*.

Besides Wikipedia and Wolfram MathWorld, the following online resources have also been very helpful in explaining algorithms.

- http://pi.math.cornell.edu/~web6140/TopTenAlgorithms/QRalgorithm.html
- https://www.mathworks.com/matlabcentral/fileexchange/38303-linear-algebra-package
- http://buzzard.ups.edu/courses/2014spring/420projects/math420-UPS-spring-2014-buffington-polar-decomposition.pdf
- http://webhome.auburn.edu/~tamtiny/lecture%2010.pdf
- https://www.cs.cmu.edu/~venkatg/teaching/CStheory-infoage/book-chapter-4.pdf
- http://math.mit.edu/~gs/linearalgebra/ila0403.pdf
