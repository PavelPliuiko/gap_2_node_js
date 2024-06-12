const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}

const myEmitter = new MyEmitter();

const server = http.createServer((req, res) => {
    const url = req.url;

    switch (url) {
        case '/price':
            myEmitter.emit('routeAccessed', '/price');
            fs.readFile('./views/price.html', 'utf8', (err, data) => {
                if (err) {
                    myEmitter.emit('error', url);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
            break;
        case '/about':
            myEmitter.emit('routeAccessed', '/about');
            fs.readFile('./views/about.html', 'utf8', (err, data) => {
                if (err) {
                    myEmitter.emit('error', url);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
            break;
        case '/contact':
            myEmitter.emit('routeAccessed', '/contact');
            fs.readFile('./views/contact.html', 'utf8', (err, data) => {
                if (err) {
                    myEmitter.emit('error', url);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
            break;
        case '/products':
            myEmitter.emit('routeAccessed', '/products');
            fs.readFile('./views/products.html', 'utf8', (err, data) => {
                if (err) {
                    myEmitter.emit('error', url);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
            break;
        case '/subscribe':
            myEmitter.emit('routeAccessed', '/subscribe');
            fs.readFile('./views/subscribe.html', 'utf8', (err, data) => {
                if (err) {
                    myEmitter.emit('error', url);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
            break;
        default:
            myEmitter.emit('not-found', url);
            fs.readFile('./views/not-found.html', 'utf8', (err, data) => {
                if (err) {
                    myEmitter.emit('error', url);
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
    }

    console.log(`Request received for: ${url}`);
});

myEmitter.on('routeAccessed', (route) => {
    console.log(`Route accessed: ${route}`);
});

myEmitter.on('not-found', (route) => {
    console.log(`Incorrect Path: ${route}`);
});

myEmitter.on('error', (route) => {
    console.log(`Error occurred on path: ${route}`);
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
