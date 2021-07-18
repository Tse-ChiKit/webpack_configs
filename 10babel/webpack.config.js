const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin  = require("optimize-css-assets-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const postcssPresetEnv = require('postcss-preset-env');

const {resolve} = require('path');

process.env.Node_ENV = 'development';

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', 
                        {
                            corejs:{
                            useBuiltIns:'usage',
                            version:3
                            //core-js的版本
                        },
                        //需要兼容的浏览器
                            targets:{
                                chrome:'60',
                                firefox:'60',
                                ie:'9',
                                safari:'10',
                                edge:'17'
                            }
                        }
                        ]
                    ]
                  }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                              plugins: [
                                postcssPresetEnv()
                              ],
                            }
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                        name: '[hash:10].[ext]',
                        outputPath: 'imgs'
                      },
                    },
                  ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsPlugin(),
        new ESLintPlugin({
            exclude: 'node_modules',
            fix:true
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 8888,
        open: true
    }

}