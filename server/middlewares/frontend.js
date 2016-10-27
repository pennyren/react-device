import express from 'express';
import path from 'path';
import compression from 'compression';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config';

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

const setup = (app, opts) => {
	const isDev = process.env.NODE_ENV == 'development';
	if (isDev) {
		addDevMiddleware(app, webpackConfig);
	} else {
		addProdMiddleware(app, opts);
	}
}

export default setup;