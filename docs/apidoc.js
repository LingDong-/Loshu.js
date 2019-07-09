/*global describe lo */


var fs = require("fs");
var lo = require("../loshu.js"); 

function loadJSON(filename,callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', filename, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);  
}

var wasmFlag = `<span style="margin-left:2px; margin-right:2px; padding:1px; background: rgba(0,255,0,0.1); font-family: monospace; border-radius:3px; border: 1px solid lightgreen;">WASM ✔︎</span>`


function highlightCode(s){
  var parts = s.split("`");
  var r = "";
  for (var i = 0; i < parts.length; i++){
    if (i % 2 == 1){
      r+= `<code>${parts[i]}</code>`
    }else{
      r += parts[i];
    }
  }
  r = r.replace(/\[wasm\]/g, wasmFlag);
  return r;
}
function parseDefaultOptions(f){
  var fstr = lo[f].toString().split("\n")[0];
  var ol = "{"+fstr.split("{")[1].split("}")[0].replace(/=/g,':')+"}"
  return ol;
}
function parseWasmSupport(f){
  var fstr = lo[f].toString();
  return fstr.includes("usingwasm");
}

function newDoc(apidoc){
  
  var page = `<table><tr><td valign="top">`
      
  page += `<div style="padding:20px; border: 1px solid gainsboro; background: white; min-width:150px;">`
  for (var fname in apidoc){
    if (fname[0] == ":"){
      continue;
    }
    page += `<div style="padding:1px;"><a href="#${fname}">${fname}()</a></div>`;
  }
  page += "</div></td>";
  
  page+="<td>"
  
  page +=`<div style="padding:20px; border: 1px solid gainsboro; background: white">`
  for (var fname in apidoc){
    var f = apidoc[fname];
    var tcelll = "font-family:monospace; font-size:18px; font-weight:bold; padding:5px;"

    if (fname[0] == ":"){
      page += `<h1>loshu.js reference</h1>`;
      for (var i = 0; i < f.desc.length; i++){
        page += `<div style="padding:10px">${highlightCode(f.desc[i])}</div>`
      }
      page += "<h3>library options</h3>"
      page += `<table style="border-collapse:collapse; margin-left:5px">`
      var opts = Object.keys(f.opt)
      for (var i = 0; i < opts.length; i++){
        var a = opts[i];
        var bt = ""
        if (i != 0){
          bt = `border-top: 1px solid gainsboro;`
        }
        page += `<tr>`
        page += `<td style="${bt}"><div style="${tcelll}">options.${a}</div></td>`
        page += `<td style="${bt} border-left:1px solid gainsboro"><div style="padding:5px;">${highlightCode(f.opt[a])}</div></td>`
        page += `</tr>`
      }
      page += `</table>`
      continue;
    }
    
    page += `<div style="padding:20px; border-bottom: 1px solid gainsboro">`
    page += `<a id="${fname}"></a>`
    page += `<h2 class="apidoc-cell-head" style="margin:0px; padding-bottom:20px;padding-top:10px"><a href="#${fname}" style="color:black;text-decoration:none">${fname}()</a></h2>`

    
    page += `<div style="padding-top:10px"><i>${highlightCode(f.desc)}</i>${(parseWasmSupport(fname) ? "&nbsp;&nbsp;&nbsp;"+wasmFlag : "")}</div>`
    
    if ('pts' in f){
      page += `<ul>`
      for (var i = 0; i < f.pts.length; i++){
        page += `<li style="padding-bottom:10px; margin-left:-20px;">${highlightCode(f.pts[i])}</li>`
      }
      page += "</ul>"
    }
    
    page += `<h3>syntax</h3>`
    page += `<table style="border-collapse:collapse; margin-left:15px">`
    var syns = Object.keys(f.syn);
    for (var i = 0; i < syns.length; i++){
      var a = syns[i];
      var bt = ""
      if (i != 0){
        bt = `border-top: 1px solid gainsboro;`
      }
      page += `<tr>`
      page += `<td style="${bt}"><div style="${tcelll}">${fname}${a.replace(/ /g,'')}</div></td>`
      page += `<td style="${bt} border-left:1px solid gainsboro"><div style="padding:5px;">${highlightCode(f.syn[a])}</div></td>`
      page += `</tr>`
    }
    page += `</table>`
    
    if ('opt' in f){
      
      page += "<h3>options</h3>"
      page += `<table style="border-collapse:collapse; margin-left:15px">`
      var opts = Object.keys(f.opt)
      for (var i = 0; i < opts.length; i++){
        var a = opts[i];
        var bt = ""
        if (i != 0){
          bt = `border-top: 1px solid gainsboro;`
        }
        page += `<tr>`
        page += `<td style="${bt}"><div style="${tcelll}">${a}</div></td>`
        page += `<td style="${bt} border-left:1px solid gainsboro"><div style="padding:5px;">${highlightCode(f.opt[a])}</div></td>`
        page += `</tr>`
      }
      page += `</table>`
      page += `<div style="padding-top:10px; padding-left:20px; padding-bottom:10px"><b>default:</b>&nbsp;&nbsp;<code>${parseDefaultOptions(fname)}</code></div>`

    }
    page += "<h3>returns</h3>"
    page += `<div style="padding-top:0px; padding-left:20px">${highlightCode(f.ret)}</div>`

    if ('ref' in f){
      page += "<h3>reference</h3>"
      page += `<ul>`
      for (var i = 0; i < f.ref.length; i++){
        page += `<li style="padding-bottom:10px; margin-left:-20px;"><a href="${f.ref[i]}">${f.ref[i]}</a></li>`
      }
      page += "</ul>"
    }
    if ('see' in f){
      page += "<h3>see also</h3>"
      page += `<div style="padding-left:20px">`
      for (var i = 0; i < f.see.length; i++){
        if (i != 0){
          page += "&nbsp;|&nbsp;"
        }
        page += `<a href="#${f.see[i]}">${f.see[i]}()</a>`
      }
      page += "</div>"
    }
    
    page += `</div>`
  }
  page += "</div>"
  
  page+="</td></tr></table>"
  return page;
}

function newNav(){
  return `<button>Github</button>&nbsp;<button onclick="window.location.href='/'">Online REPL</button>`
}



var apidoc = JSON.parse(fs.readFileSync("apidoc.json").toString());
var page = newDoc(apidoc);
console.log(page);
var htm = fs.readFileSync("index.html").toString();
htm = htm.replace(/\<script.*?\<\/script\>/g,"");
var [a,b] = htm.split(`id="content">`);
var doc = a + `id="content">` + page + b;
var [c,d] = doc.split(`id="nav">`);
doc = c + `id="nav">`+newNav()+d;
doc = doc.replace(/\n/g,'')
fs.writeFileSync("apidoc.html",doc);