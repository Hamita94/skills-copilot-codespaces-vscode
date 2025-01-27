// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
    var url_parts = url.parse(req.url);
    var path = url_parts.pathname;

    switch (path) {
        case '/':
            fs.readFile('index.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
            break;
        case '/comments':
            fs.readFile('comments.json', function(err, data) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(data);
                res.end();
            });
            break;
        case '/post_comment':
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                var post_data = JSON.parse(body);
                fs.readFile('comments.json', function(err, data) {
                    var comments = JSON.parse(data);
                    comments.push(post_data);
                    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.write(JSON.stringify(comments));
                        res.end();
                    });
                });
            });
            break;
        default:
            res.writeHead(404);
            res.end();
            break;
    }
}).listen(3000);

console.log('Server is running at http://localhost:3000/');
