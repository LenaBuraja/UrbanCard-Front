const express = require("express");
const path = require("path");
const webpack = require("webpack");
const logger = require("../build/lib/logger");
const webpackConfig = require("../build/webpack.config");
const project = require("../project.config");
const compress = require("compression");

const app = express();
app.use(compress());

if (project.env === "development") {
	const compiler = webpack(webpackConfig);
	logger.info("Enabling webpack development and HMR middleware");
	app.use(require("webpack-dev-middleware")(compiler, {
		publicPath: webpackConfig.output.publicPath,
		contentBase: path.resolve(project.basePath, project.srcDir),
		hot: true,
		quiet: false,
		noInfo: false,
		lazy: false,
		stats: "normal"
	}));
	app.use(require("webpack-hot-middleware")(compiler, {
		path: "/__webpack_hmr"
	}));
	app.use(express.static(path.resolve(project.basePath, "public")));
	app.use("*", function(req, res, next) {
		const filename = path.join(compiler.outputPath, "index.html");
		compiler.outputFileSystem.readFile(filename, (err, result) => {
			if (err) {
				return next(err);
			}
			res.set("content-type", "text/html");
			res.send(result);
			res.end();
		});
	});
} else {
	logger.warn("Serving the compiled application bundle in ~/dist");
	app.use(express.static(path.resolve(project.basePath, project.outDir)));
}

module.exports = app;
