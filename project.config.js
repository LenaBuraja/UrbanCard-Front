const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
	env: NODE_ENV,
	basePath: __dirname,
	srcDir: "app",
	main: "main",
	outDir: "dist",
	publicPath: "/",
	sourcemaps: true,
	externals: {},
	globals: {},
	verbose: false,
	vendors: [
		"react",
		"react-dom",
		"redux",
		"react-redux",
		"redux-thunk",
		"react-router"
	]
};
