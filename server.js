const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const external = require('./serverside_js/external');
const app = express();

app.use(function (req, res, next) {
    console.log(req.method, req.path, req.socket.remoteAddress);
    next();
});

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
    throw new Error('BROKEN')
});

app.get('/test', function (req, res) {    
    res.sendFile(path.join(__dirname, 'static/form.html'))
});

app.get('/test2', function (req, res) {    
    res.sendFile(path.join(__dirname, 'static/cookietest.html'))
});

app.get('/lol', function(req,res) {
    res.send(req.socket.remoteAddress)
});

app.post('/api/v1/users/login', function (req, res) {
    const data = req.body;
    console.log(JSON.parse(JSON.stringify(data)));
    res.send(true);
});

app.post('/api/v1/util/checktoken', function (req, res) {
    const data = req.body;
    datas = JSON.parse(JSON.stringify(data));
    const token = datas.token;
    const email = datas.email;
    console.log(token);
    if (token == "12345") {
        res.send(true);
    } else {
        res.send(false);
    }
});

app.get('/ejs', function (req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('ejs_test.ejs', {
        sus: "Hey!"
    });
});

app.listen(3000, function () {
    console.log("Listening on port 3000. Go to http://localhost:3000");
});