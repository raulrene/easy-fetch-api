const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src', 'index')
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            }
        ],
    },

    plugins: [
        new CleanPlugin('./dist'),
        new WrapperPlugin({
            test: /\.js$/,
            header: ('(function umdWrapper(root, factory) {' +
                '  if(typeof exports === "object" && typeof module === "object")' +
                '    module.exports = factory().default;' +
                '  else if(typeof define === "function" && define.amd)' +
                '    define("NAME", [], function() { return factory().default; });' +
                '  else if(typeof exports === "object")' +
                '    exports["NAME"] = factory().default;' +
                '  else' +
                '    root["NAME"] = factory().default;' +
                '})(this, function() {' +
                'return ').replace(/NAME/g, 'EasyFetchApi'), // this is the name of the lib
            footer: '\n})',
        }),
    ]
};
