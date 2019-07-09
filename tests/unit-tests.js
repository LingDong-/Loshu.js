
var unittests = function(lo){
  var that = this;
  that.gramschmidt = function(){
    // Poole 390
    var y = lo.gramschmidt([[1,-1,-1,1],[2,1,0,1],[2,2,1,2]] );
    lo.print(y);
  }
  
  that.qr = function(){
    // Poole 394
    var [q,r] = (lo.qr([[1,2,2],[-1,1,2],[-1,0,1],[1,1,2]],{method:'householder'}))
    lo.print(q,r,lo.matmul(q,r));
  }

  that.hessenberg = function(){
    // http://mathfaculty.fullerton.edu/mathews/n2003/hessenberg/HessenbergMod/Links/HessenbergMod_lnk_2.html
    var [h,q] = lo.hessenberg([[5,1,2,0,4],[1,4,2,1,3],[2,2,5,4,0],[0,1,4,1,3],[4,3,0,3,4]]);
    lo.print(h,q);
    // http://mathfaculty.fullerton.edu/mathews/n2003/hessenberg/HessenbergMod/Links/HessenbergMod_lnk_5.html
    var a = [[2,-1,1],[-1,2,1],[1,-1,2]];
    var [h,q] = lo.hessenberg(a);
    lo.print(h);
    lo.print(lo.mul(lo.T(q),a,q));
  }
  
  that.eigen = function(){
    // http://mathfaculty.fullerton.edu/mathews/n2003/hessenberg/HessenbergMod/Links/HessenbergMod_lnk_5.html
    // var eigs = lo.eigen([[2,-1,1],[-1,2,1],[1,-1,2]],{fancy:false,maxiter:100});
    // lo.print(eigs);
    var eigs = lo.eigen([[2,-1,1],[-1,2,1],[1,-1,2]],{fancy:true});
    lo.print(eigs);
    //https://stats.stackexchange.com/questions/20643/finding-matrix-eigenvectors-using-qr-decomposition
 
    // var eigs = lo.eigen([[52,30,49,28],[30,50,8,44],[49,8,46,16],[28,44,16,22]],{fancy:false,maxiter:100});
    // lo.print(eigs);
    // var eigs = lo.eigen([[52,30,49,28],[30,50,8,44],[49,8,46,16],[28,44,16,22]]);
    // lo.print(eigs);
  }
  
  that.dist = function(){
    
    lo.print(lo.dist('ln',[[0,0,0],[1,1,0.1]],'ln',[[0,1,0],lo.rand(3)]));
    lo.print(lo.dist('pl',[0,1,2,1],'pl',[0,1,2,1.1]));
    
  }
  that.svd = function(){
    lo.print(lo.svd(lo.magic(10)));
  }

}

  
  
// function testall(){

// lo.print(lo.scale([[1,-1],[-1,1]],2))
// lo.print(lo.gramschmidt([[1,-1,-1,1],[2,1,0,1],[2,2,1,2]]))
// lo.print(lo.transpose([[1,-1,-1,1],[2,1,0,1],[2,2,1,2]]))
// var [q,r] = (lo.qr([[1,2,2],[-1,1,2],[-1,0,1],[1,1,2]],{method:'householder'}))
// lo.print(q);
// lo.print(r);



// lo.print(lo.householder([1,2,3]))
// // lo.print(lo.hessenberg([[-149,-50,-154],[537,180,546],[-27,-9,-25]]))
// lo.print(lo.hessenberg([[-149,-50,-154,1],[537,180,546,2],[-27,-9,-25,3],[4,5,6,7]]))

// var m = [[-149,-50,-154,1],[537,180,546,2],[-27,-9,-25,3],[4,5,6,7]];
// console.log(lo.eigenpairs(m));

// // console.log(lo.eigenvals([[3,1],[1,3]]));
// // console.log(lo.qr([ [ -1, 1 ], [ 1, -1 ] ]));
// console.log(lo.eigenpairs([[3,1],[1,3]]));

// console.log(lo.rank([[3,2],[3,1],[0,0]]));

// lo.print(lo.rand(30,30))
// lo.print(lo.rand(8,8))
// lo.print(lo.rand(9,3))
// lo.print(lo.zeros(3,20))
// lo.print(lo.rand(7,7))
// var ran = lo.scale(lo.rand(5,5),100);
// var [q,r] = lo.qr(ran)
// lo.print(q);
// lo.print(r);
// lo.print(ran);
// lo.print(lo.matmul(q,r));

// // lo.print(lo.minor([[1,2,3,4,5],[6,7,8,9,0],[1,2,3,4,5],[6,7,8,9,0],[1,2,3,4,5]],4,4))
// console.log(lo.det([[5,-3,2],[1,0,2],[2,-1,3]]))
// console.log(lo.det([[2,-3,0,1],[5,4,2,0],[1,-1,0,3],[-2,1,0,0]]))
// // console.log(lo.transpose(lo.slice([[1,2,3],[4,5,6]], [0,Infinity], [3,5])))
// // lo.assert([[1,2],[3,4],[5,6]],'!hasnan','rank=10')

// console.log(lo.eigenpairs([[0,-1],[1,0]]));

// lo.print(lo.inv([[1,2,-1],[2,2,4],[1,3,-3]]))

// console.log(lo.gauss([[1,-1,2],[1,2,-1],[0,2,-2]],[[3],[-3],[1]],{jordan:true}));

// lo.print(lo.inv([[1,2,-1],[2,2,4],[1,3,-3]]),{method:"adjugate"})
// lo.print(lo.inv([[1,2,-1],[2,2,4],[1,3,-3]]),{method:"gaussjordan"})
// // lo.print(lo.gauss([[1,2,-1],[2,2,4],[1,3,-3]],lo.iden(3),{jordan:true})[1])

// var [l,u] = lo.lu([[2,1,3],[4,-1,3],[-2,5,5]]);
// var [l,u] = lo.lup([[3,1,3,-4],[6,4,8,-10],[3,2,5,-1],[-9,5,-2,4]],{p:false});
// var [l,u,p] = lo.lup([[3,1,3,-4],[6,4,8,-10],[3,2,5,-1],[-9,5,-2,4]],{p:true});
// var [l,u,p] = lo.lup([[0,0,6],[1,2,3],[2,1,4]],{p:true})
// lo.print(l);
// lo.print(u);
// lo.print(p);
// lo.print(lo.matmul(l,u));
// console.log(lo.gaussjordan([[2,1,3,1],[4,-1,3,-4],[-2,5,5,9]]));
// console.log(lo.gauss([[2,1,3],[4,-1,3],[-2,5,5]],[[1],[-4],[9]],{jordan:false,elementary:true,normalize:false}));
// var [x,y,emats] = lo.gauss([[2,1,3],[4,-1,3],[-2,5,5]],lo.iden(3),{elementary:true,jordan:false,normalize:false});
// console.log(emats);

// var a = [[3,8,2],[2,5,7],[1,4,6]];
// var ata = lo.matmul(lo.transpose(a), a);
// lo.print(ata);
// var [q,r] = lo.qr(ata);
// lo.print(q);
// lo.print(r);
// console.log(lo.eigenpairs(ata));

// var [u,p] = lo.polar(a);
// lo.print(u);
// lo.print(p);

// // var a = [[1,2,3],[4,5,6],[7,8,9]]
// var a = lo.map(lo.rand(4,4),x=>x*10);
// // var a = [[1,1],[1,0],[0,1]]
// try{
//   console.log(lo.svd(a));
// }catch(err){
//   if (err == lo.UNFACTORIZABLE){
//     console.log("input is",err);  
//   }else{
//     throw err
//   }
// }

// var a = [[12,-51,4],[6,167,-68],[-4,24,-41],[1,2,3]];
// var a = lo.rand(4,4)
// // var [q,r] = lo.qr(a,{method:'gramschmidt'});
// // lo.print(q);
// // lo.print(r);
// // console.log(lo.approx(lo.matmul(q,r),a))
// var [q,r] = lo.qr(a,{method:'householder'});
// lo.print(q);
// lo.print(r);
// console.log(lo.approx(lo.matmul(q,r),a))


// var a = [[2,4],[1,3],[0,0],[0,0]]
// var [q,r] = lo.qr(a,{method:'householder'});
// lo.print(q);
// lo.print(r);
// console.log(lo.svd(a));


// var a = lo.rand(3,3);
// // lo.print(lo.polar(a,{method:'direct'}));
// // lo.print(lo.polar(a,{method:'svd'}));

// lo.print(lo.mul(2,[[1,2,3]],[[1,2,3],[4,5,6],[7,8,9]],20,[1,1,1],3 ))

// // lo.polar([[3,8,2],[2,5,7],[1,4,6]]);


// lo.print(lo.transform(lo.affine("reflect3d",[1,0,0]),[1,0,0]));

// lo.print(lo.cholesky([[4,12,-16],[12,37,-43],[-16,-43,98]]))
// lo.print(lo.ldl(lo.scale([[4,12,-16],[12,37,-43],[-16,-43,98]],100000)))

// // lo.print(lo.inv([[1,1],[1,0],[0,1]]));
// lo.print(lo.pinv([[1,1],[1,0],[0,1]]));

// lo.print(lo.gerschgorin([[2,1],[2,-3]]))

// lo.print(lo.magic(10));
// lo.print(lo.magic(18));
// var a = lo.rand(5,5);
// var vals = lo.eigenvals(a);
// // lo.print(vals);
// // lo.print(lo.eigenval2vec(a,vals[3]));
// lo.print(lo.svd(a));

// lo.print(lo.cond([[2,-1,1],[1,0,1],[3,-1,4]]))

// lo.print(lo.lsqfit([[-1,1],[0,-1],[1,0],[2,2]],{order:2}))

// lo.print(lo.lsqfit([[1,1],[2,2],[3,2],[4,3]],{order:1}))

// // lo.options.assertionlvl = 0;

// // lo.print(lo.svd(lo.rand(12,12)))

// // lo.print(lo.lsq([[1,2,2],[-1,1,2],[-1,0,1],[1,1,2]],[2,-3,-2,0]))

// var m = [[-149,-50,-154,1],[537,180,546,2],[-27,-9,-25,3],[4,5,6,7]];
// console.log(lo.eigenvals(m))
// console.log(lo.eigenpairs(m));

// var m = [[7,1,-2],[-3,3,6],[2,2,2]];
// console.log(lo.eigenpairs(m,{verify:true}));
// console.log(lo.eigen(m));

// var m = [[0,1],[-2,-3]];
// console.log(lo.eigen(m));

// var m = [[52,30,49,28],[30,50,8,44],[49,8,46,16],[28,44,16,22]];
// console.log(lo.eigen(m));
// console.log(lo.eigen(m));

// lo.print(lo.svd(lo.rand(25,25)))
  
// lo.print(lo.pca([[0,1],[1,1],[2,2,],[4,1]]))
  
// }

module.exports = unittests;