var express = require('express');
var app = express();
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var helmet = require("helmet");

app.use(express.static(path.join(__dirname, '/dist')));
app.set('views', path.join(__dirname, '/dist'));
app.engine('html', require('ejs').renderFile);
app.use(morgan('dev'));
app.use(helmet());

app.get('*', function(req, res) {
  res.render('index.html');
});

https.createServer({
  key: fs.readFileSync('private.pem'),
  cert: fs.readFileSync('gesa-cert.pem'),
  ca: fs.readFileSync('request.pem')
}, app).listen(443, function() {
  console.log('[HTTPS] Magic happens at https://localhost');
})

var apps = express();
apps.get('*', function(req, res) {
  console.log(req.headers.host);
  res.redirect('https://' + req.headers.host + req.url);
});
apps.listen(80, function() {
  console.log('[REDIRECT] from Port 80 to PORT 443');
});
