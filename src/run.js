var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    app.use(express.static('dist'));
    res.sendFile(path.join(__dirname + '/index.html'));
});


//electronjs a tester pour faire une desktop application
app.listen(8080);

