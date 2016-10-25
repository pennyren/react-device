const express = require('express');
const path = require('path');
const compression = require('compression');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

//Dev middleware
const addDevMiddleware = (app, webpackConfig) => {
	const compiler = webpack(webpackConfig);
	const middleware = webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		noInfo: true,
		silent: true,
		stats: 'errors-only'
	});

	//app use middleware
	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));

	const fs = middleware.fileSystem;
	app.get('*', (req, res) => {
		fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
			if (err) {
				res.sendStatus(404);
			} else {
				res.send(file.toString());
			}
		})
	});
}

//Production middlewares
const addProdMiddleware = (app, opts) => {
	const publicPath = opts.publicPath || '/';
	const outputPath = opts.outputPath || path.resolve(process.cwd(), 'dist');

	app.use(compression());
	app.use(publicPath, express.static(outputPath));

	app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
}

module.exports = (app, opts) => {
	const isDev = process.env.NODE_ENV == 'development';
	if (isDev) {
		const webpackConfig = require('../../webpack.config');
		addDevMiddleware(app, webpackConfig);
	} else {
		addProdMiddleware(app, opts);
	}
};