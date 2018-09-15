const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry : './www/js/index.js',
    output : {
        path : path.join(__dirname, '/www'),
        filename : 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './www/index.html',
            inject: false
        })
    ]
}