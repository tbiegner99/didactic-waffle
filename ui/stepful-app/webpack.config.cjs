const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
    devtool: 'source-map',
    mode: env.MODE || 'production',
    entry: './src/app.tsx',
    output: {
        filename: 'stepful-app-app.js', // '[name].[contenthash].bundle.js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'build', process.env.OUTDIR || ''),
        publicPath: process.env.BASE_PATH
    },
    externals: [],
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        hot: true,
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        },
        proxy: {
            '/api': 'http://localhost:8080'
        },
        host: '0.0.0.0',
        port: '8000',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },

        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: ['@svgr/webpack']
            },
            {
                test: /\.(png|jpe?g|gif|eot|woff2?|ttf)$/i,
                exclude: [
                    path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/svgs')
                ],
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.html?$/i,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]'
                            }
                        }
                    }
                ]
            }
        ]
    }
});
