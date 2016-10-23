const express = require('express');
const setup = require('./middlewares/frontend');
const port = process.env.PORT || 8080;
const app = express();

//use middleware

//In dev we make wepack work to
setup(app, {
	outputPath: resolve(process.cwd(), 'dist')
	publicPath: '/',
});

//start routes

app.listen(port, () => {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
});