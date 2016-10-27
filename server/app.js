import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';

import setup from './middlewares/frontend';
import startRoutes from './routes';

const isDev = process.env.NODE_ENV == 'development';
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
	outputPath: path.resolve(process.cwd(), 'dist')
});

startRoutes(app);

if (isDev) {
	//reload
	const http = require('http');
	const reload = require('reload');
	const server = http.createServer(app);
	reload(server, app);

	server.listen(app.get('port'), () => {
		console.log('Express started on http://localhost:' + app.get('port') + ' in development environment.')
	});

} else {
	app.listen(app.get('port'), () => {
		console.log('Express started on http://localhost:' + app.get('port') + ' in production environment.')
	});
}