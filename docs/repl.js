/* global describe lo DOCS */
var sheet = null;

function generateEvilScope(depth){
  var s0 = "window.__scope=new function(){\n"
  var s1 = "\n}"
  for (var i = 0; i < depth; i++){
    var istr = "__"+(''+i).padStart(8,'0');
    s0 += `this.evil=function(${istr}){window.__scope=this;var __r=eval(${istr});\n`
    s1 = `;return __r}` + s1
  }
  return eval(s0+s1);
}
var stackCallSize = 1000;
for (var i = stackCallSize; i > 0; i-=200){
  try{
    generateEvilScope(i);
    stackCallSize = i;
    break;
  }catch(e){
    console.log(i+ " exceeds max stack size");
  }
}
console.log("final stack size "+stackCallSize);


console.log(lo);
lo.options.termcols=60;
lo.options.assertionlvl= lo.ASSERTION_THROW;

var evalIdx = 0;

function newSheet(){
  var maindiv = document.createElement("div");
  var table = document.createElement("table");
  table.style.width="100%";
  table.style.borderCollapse = "collapse";
  
  // maindiv.style.margin = "20px";
  maindiv.style.padding = "20px";
  maindiv.style.border = "1px solid gainsboro";
  maindiv.style.background = "white";
  
  maindiv.style.minWidth = "650px";
  table.style.fontFamily= "monospace";
  
  maindiv.innerHTML = `
    <div style="margin:10px">
    <i>Loshu.js</i> is a linear algebra library for JavaScript.
    It not only provides convienient manipulation of matrices and vectors,
    but is also capable of more advanced operations such matrix decompositions,
    eigenvalue and vectors, solution and approximation to linear systems, and many more!

    <br>
    <br>

    While all functions are implemented in JavaScript, 
    some of key functionalities such as <code>eigen()</code>, <code>inv()</code> and <code>svd()</code> are also rewritten in
    in C++ and compiled to Web Assembly using emscripten, and when enabled, can have an up to 100x speed boost!

    <br>
    <br>

    <b>Try the library!</b> 
    Type code in a cell below and press Enter to evaluate. 
    For inspirations, check out the <button id='btn-cheat-sheet'>Cheat Sheet</button>.<br><br></div>`
  
    
  maindiv.appendChild(table);
  document.getElementById("content").appendChild(maindiv);
  sheet = table;
  
  document.getElementById('btn-cheat-sheet').onclick = function(){
    var cs = document.getElementById('cheat-sheet')
    if (!cs){
      cs = newRef();
    }
    cs.scrollIntoView();
  }
}

function newIn(txt){
  var tr0 = document.createElement("tr");
  var td0 = document.createElement('td'); td0.width="40px";
  var td1 = document.createElement('td');
  tr0.appendChild(td0);
  tr0.appendChild(td1);
  td0.innerHTML = "&nbsp;[ ]";
  td0.style.minWidth = "40px";
  
  var inp = document.createElement("input");
  inp.style.width = "100%";
  inp.style.margin = "0px";
  inp.style.padding = "0px";
  td1.style.padding = "0px";
  td1.style.margin = "0px";
  inp.style.height = "24px";
  inp.style.fontSize = "16px";
  inp.style.fontFamily = "monospace"
  inp.style.border = "1px solid gainsboro";
  inp.style.background = "whitesmoke"
  inp.autocomplete="off"
  inp.autocorrect="off" 
  inp.autocapitalize="off" 
  inp.spellcheck=false
  td1.appendChild(inp);
  inp.tabindex = -1;
  
  if (txt){
    inp.value = txt;
  }
  
  
  var tr1 = document.createElement("tr");
  var td2 = document.createElement('td'); td0.width="40px";
  var td3 = document.createElement('td');
  var oup = document.createElement('pre');
  // td3.width = "calc(100% - 100px)"
  // oup.style.width = "500px";
  oup.style.whiteSpace= "pre-wrap";
  // oup.style.maxWidth="100%";
  oup.style.overflow = "scroll";
  oup.style.marginTop = "10px";
  oup.style.paddingTop = "2px";
  oup.style.paddingBottom = "2px";
  oup.style.fontSize = "16px";
  oup.style.lineHeight = "100%";
  // oup.style.minWidth = "800px";
  oup.innerHTML = ""
  tr1.appendChild(td2);
  tr1.appendChild(td3);
  td3.appendChild(oup);
  
  sheet.appendChild(tr0);
  sheet.appendChild(tr1);
  
  function onenter(){
    if (evalIdx >= stackCallSize){
      alert("Maximum number of eval exceeded, please refresh the page.");
    }
    try{
      var ret = lo.print(window.__scope.evil(inp.value));
      oup.style.background = "none"
      if (ret.trim() != "undefined" && ret != undefined){
        oup.innerHTML = ret;
      }else{
        oup.innerHTML = "";
      }

    }catch(e){
      oup.style.background = "rgba(255,0,0,0.1)"
      oup.innerHTML = e.toString().split("\n")[0];
    }
    evalIdx ++;
    td0.innerHTML = "&nbsp;["+evalIdx+"]";


  }
  
  inp.onkeypress = function(e){
    if (e.key == "Enter"){
      onenter();
      if (tr1.nextSibling == null){
        newIn().focus();
      }else{
        tr1.nextSibling.children[1].children[0].focus();
      }
    }
  }
  inp.onfocus = function(){
    tr0.style.borderLeft = "3px solid darkred";
    tr1.style.borderLeft = "3px solid darkred";
  }
  inp.onblur = function(){
    tr0.style.borderLeft = "3px solid white";
    tr1.style.borderLeft = "3px solid white";
  }
  tr0.style.borderLeft = "3px solid white";
  tr1.style.borderLeft = "3px solid white";
  if (txt){
    onenter();
  }
  return inp;
}


function newNav(){
  document.getElementById("nav").innerHTML = `<button onclick="window.location.href='https://github.com/LingDong-/Loshu.js'">Github</button>&nbsp;<button onclick="window.location.href='./apidoc.html'">API Documentation</button>`
}

function newRef(){
  var keys = Object.keys(lo);
  var table = document.createElement("table");
  keys.sort();
  var cols = 4;
  var tr;
  var idx = 0;
  for (var i = 0; i < keys.length; i++){
    if (typeof lo[keys[i]] != 'function' || keys[i][0] == keys[i][0].toUpperCase()){
      continue;
    }
    if (idx % cols == 0){
      tr = document.createElement("tr");
      table.appendChild(tr);
    }
    var td0 = document.createElement("td");
    td0.style.fontFamily = "monospace";
    td0.style.fontSize = "14px";
    var d0 = document.createElement("pre");
    var fname = keys[i]+""+lo[keys[i]].toString().split("\n")[0].replace(/(function)|/g,"").replace(/ /g,'').trim().replace(/{$/g,'').replace(/={}/g,'');

    d0.innerHTML = `<a href="/apidoc.html#${keys[i]}">${fname}</a>`
    d0.style.maxWidth = "200px";
    d0.style.height = "30px";
    d0.style.overflow = "scroll";
    d0.style.margin = "0px";
    d0.style.marginRight = "10px";
    td0.appendChild(d0);
    
    // console.log(i,tr)
    tr.appendChild(td0);
    idx ++;
    
  }
  var dd = document.createElement("div");
  dd.id = "cheat-sheet";
  var d = document.createElement("div");
  d.innerHTML = `<b>Cheat Sheet</b>&nbsp;&nbsp;&nbsp;<small><i>Click on an item to read about it in <a href="apidoc.html">API Documentation</a></i></small>`
  d.style.paddingTop = "30px";
  d.style.paddingBottom = "10px";
  dd.appendChild(d);
  dd.appendChild(table);
  document.getElementById("content").appendChild(dd);
  return dd;
}



function newInstructions(){
  var maindiv = document.createElement("div");

  maindiv.style.minWidth = "650px";
  // maindiv.style.margin = "20px";
  maindiv.style.padding = "20px";
  maindiv.style.border = "1px solid gainsboro";
  maindiv.style.background = "white";
  
  maindiv.innerHTML = `




  `
  
  
  document.getElementById("content").appendChild(maindiv);
  
}

newNav();
newSheet();
newIn("var a = [[1,0,1], [-1,-2,0], [0,1,-1]]; a");
newIn("var [u,s,v] = lo.svd(a); [u,s,v]");
newIn("lo.mul(u,s,lo.T(v))");
newIn();
// table.children[0]