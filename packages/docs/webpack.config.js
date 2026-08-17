const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {dynamicImport} = require('@beautiful-eyes/dynamic-import/dist/index');

module.exports = {
    entry: path.resolve(__dirname, "src", "app.ts"),
    output: {
        filename: '[name].[contenthash:8].bundle.js',
        path: path.resolve(__dirname, `dist`),
        chunkFilename: '[id].[chunkhash].js',
        publicPath:'/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "app", "index.html")
        }),
        new CopyPlugin({
            patterns: [
                { from: "./public", to: "./" },
            ],
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false
        })
    ],
    devServer: {
        compress: true,
        port: 9001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test:/\.template.be/,
                use : ['@beautiful-eyes/template-compiler/dist/index.js']
            },
            {
                test:/\.(ts|tsx)$/,
                use: [
                    {
                        loader:'ts-loader',
                        options: {
                            getCustomTransformers: (program) => ({
                                before: [dynamicImport(program)],
                            }),
                        },
                    }
                  ],
            },
            {
                test: /\.(css|scss)$/, use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test:  /\.(js|mjs|jsx|ts|tsx)$/,
                use: 'source-map-loader',
            },
        ],
    },
    mode: "development",
    devtool:"source-map",
    optimization: {
        runtimeChunk: 'single',
    },
    resolve:{
        extensions: ['.js', '.ts', '.tsx']
    }
}
