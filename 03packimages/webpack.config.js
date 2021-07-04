const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg)$/i,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8 * 1024,
                        name: '[hash:10].[ext]'
                      },
                    },
                  ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',

}