const express = require('express');
const http = require('http');
const reload = require('reload');

const setup = require('./middlewares/frontend');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const startRoutes = require('./routes');
const resolve = require('path').resolve;

const app = express();
app.set('port', process.env.PROT || 8080);

//use middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//In dev we start webpack to compile module before start routes
setup(app, {
	publicPath: '/',
	outputPath: resolve(process.cwd(), 'dist')
});

startRoutes(app);

//reload
const server = http.createServer(app);
reload(server, app);

server.listen(app.get('port'), () => {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
});