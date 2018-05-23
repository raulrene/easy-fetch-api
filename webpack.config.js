const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src', 'index')
    },

    output: {
        library: 'EasyFetchApi',
        libraryTarget: 'umd',
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
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
        new CleanPlugin('./dist')
    ]
};