const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "production",

	devtool: "inline-source-map",
	devServer: {
		host: "localhost",
		port: "8080",
		static: "./dist",
		watchFiles: ["src/**/*"],
	},

	entry: {
		index: "./src/js/index.js",
	},

	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/pages/index.html",
			inject: true,
			chunks: ["index"],
		}),
	],

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},

			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},

			{
				test: /\.html$/i,
				loader: "html-loader",
			},
		],
	},
};
