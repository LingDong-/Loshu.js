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
- Simple to use, [documented](https://loshu.glitch.me/apidoc.html#lsqfit) interface
- Try it out in your browser with the [online REPL](https://loshu.glitch.me)
- Additional WebAssembly implementation for certain matrix math (C++ → [emscripten](https://emscripten.org/)) for up to **100x** speed boost

## Quick Start

### For Browser

To use the library, simply include the following to your html:

```html
<script src="https://loshu.glitch.me/loshu.js"></script>;
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
const lo = requrie("./loshu")
```

To enable Web Assembly acceleration of some functionalities such as `eigen()`, `inv()` and `svd()`, Download the [wasm binary](https://loshu.glitch.me/loshuwasm.wasm) 
as well as [the wrapper](https://loshu.glitch.me/loshuwasm.js) and put them under the same folder. You will see a `web assembly backend initialized` message in the console.

## Examples

```javascript
let A = [[1,2,3],[4,5,6],[7,8,9]];  // matrix is just JS array (row major)
let B = lo.rand(3,3);               // generate a 3x3 matrix of random values
let C = lo.mul(A,B)                 // array multiplication

let [U,S,V] = lo.svd(C);  // singular value decomposition
lo.print(U,S,V);          // pretty print the matrix

let l = lo.lsqfit([[0,0],[1,1],[2,1.9],[3,3.1]],{order:1}) // fit a line to data points
lo.print(`y = ${l[0].toFixed(2)} + ${l[1].toFixed(2)} x`); // display the line equation

let M = lo.affine('roty',Math.PI/4); // create a 45° rotation matrix around y axis
let u = [1,2,3];                     // some vector
let v = lo.transform(M,u);           // apply the transform

```

## References

The development of this library is largely inspired by the textbook, David Poole's *Linear Algebra: A Modern Introduction*.

Aside from Wikipedia and Wolfram MathWorld, the following online resources have also been very helpful in explaining algorithms.

- http://pi.math.cornell.edu/~web6140/TopTenAlgorithms/QRalgorithm.html
- https://www.mathworks.com/matlabcentral/fileexchange/38303-linear-algebra-package
- http://buzzard.ups.edu/courses/2014spring/420projects/math420-UPS-spring-2014-buffington-polar-decomposition.pdf
- http://webhome.auburn.edu/~tamtiny/lecture%2010.pdf
- https://www.cs.cmu.edu/~venkatg/teaching/CStheory-infoage/book-chapter-4.pdf
- http://math.mit.edu/~gs/linearalgebra/ila0403.pdf
