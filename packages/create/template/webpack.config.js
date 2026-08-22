const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dynamicImport } = require('@beautiful-eyes/dynamic-import/dist/index');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'app.ts'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'app', 'index.html')
        })
    ],
    devServer: {
        port: 9000,
        historyApiFallback: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.template\.be$/,
                use: ['@beautiful-eyes/template-compiler/dist/index.js']
            },
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        getCustomTransformers: (program) => ({
                            before: [dynamicImport(program)]
                        })
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
};
