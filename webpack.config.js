const path = require('path');
const webpack = require('webpack');

let NODE_ENV = process.env.NODE_ENV || "development",
    isDevelopment = NODE_ENV === "development",
    isProduction = NODE_ENV === "production";

let config = {
    context: __dirname + "\\src",
    entry: "./index.js",
    output: {
        path: __dirname + "/dest",
        filename: isProduction ? "guardjs.min.js" : "guardjs.js",
        library: "guardjs"
    },

    watch: isDevelopment,
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: isDevelopment ? "source-map" : false,

    resolve: {
        modules: ['node_modules', path.resolve(__dirname, "src")],
        extensions: ['.js']
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader?presets[]=env',

            include: [
                path.resolve(__dirname, "src")
            ]
        }]
    },

    plugins: []
};

if(isProduction) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true,
            unsafe: true
        }
    }));
}

module.exports = config;