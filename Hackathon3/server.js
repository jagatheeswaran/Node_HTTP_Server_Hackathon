var express = require('express');
var app = express();
const bodyParser = require('body-parser');
let firstapi = require('./includes/apis/firstapi.js'),
    secondapi = require('./includes/apis/secondapi.js'),
    thirdapi = require('./includes/apis/thirdapi.js');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/first', function(req, res) {
    firstapi.sendResponse(req, res);
});

app.get('/second', function(req, res) {
    secondapi.sendResponse(req, res);
});

app.post('/third', function(req, res) {
    thirdapi.addData(req, res);
});

app.get('/fourth/:id', function(req, res) {
    thirdapi.fetchData(req, res);
});

app.listen(3000);
