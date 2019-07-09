// server.js

const express = require('express');
const app = express();
const lo = require('./loshu') 
const unittests = require('./tests/unit-tests');

var ut = new unittests(lo);

// ut.hessenberg();
// ut.eigen();
// ut.svd();
// ut.dist();.
// ut.qr();

app.use(express.static('docs'));

express.static.mime.types['wasm'] = 'application/wasm';

app.get('/loshu.js', function(request, response) {
  response.sendFile(__dirname + '/loshu.js');
});

app.get('/loshuwasm.js', function(request, response) {
  response.sendFile(__dirname + '/wasm/dist/loshuwasm.js');
});

app.get('/loshuwasm.wasm', function(request, response) {
  response.sendFile(__dirname + '/wasm/dist/loshuwasm.wasm');
});

app.get('/README.md', function(request, response) {
  response.sendFile(__dirname + '/README.md');
});


const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
