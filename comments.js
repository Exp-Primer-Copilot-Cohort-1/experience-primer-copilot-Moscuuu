// Create web server                             
// usage: node comments.js
var http = require('http');
var url = require('url');
var fs = require('fs');
var ejs = require('ejs');

var comments = [];

function renderFile(filename, res) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

function renderEjs(filename, res, data) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(ejs.render(data, {
                comments: comments
            }));
        }
    });
}

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
        renderFile('./comments.html', res);
    } else if (pathname === '/comment') {
        comments.push(url.parse(req.url, true).query);
        renderEjs('./comments.ejs', res, comments);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
}).listen(3000);

console.log('Server running at http://)