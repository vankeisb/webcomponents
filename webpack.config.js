const { resolve } = require('path')
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    devtool: 'inline-source-map',
    mode: 'development'
}