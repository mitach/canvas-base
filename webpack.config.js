const path = require('path');


module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        app: './src/app.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/'),
            publicPath: '/',
        }
    },
};