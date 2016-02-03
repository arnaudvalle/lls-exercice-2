var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './app/js/index.js',
    output: {
        path: './app/',
        filename: './app/bundled.js'
    },
    devServer: {
        inline: true, // reload on the fly
        port: 3000
    },
    module: {
        loaders: [
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('css!autoprefixer!sass')
            },            
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('app/css/main.css', {
            allChunks: true
        })
    ]
}
