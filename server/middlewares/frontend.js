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

	//app use webpack middleware
	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
}

//Production middlewares
const addProdMiddleware = (app, opts) => {
	const publicPath = opts.publicPath || '/';
	const outputPath = opts.outputPath || path.resolve(process.cwd(), 'dist');

	//use static middleware
	app.use(compression());
	app.use(express.static(outputPath));
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