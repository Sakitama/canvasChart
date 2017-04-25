const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = {
    context: __dirname,
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'js/main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: __dirname + '/node_modules',
                include: __dirname + '/src',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'temple.html',
        inject: 'body', //默认是body，还有head和false可选
        title: 'canvasCircle'
    })]
};

module.exports = webpackConfig;