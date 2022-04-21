const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')


const templates = ['index', 'example'];

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: './src/vendor.js'
    },
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            { test: /\.hbs$/, loader: "handlebars-loader" }
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [new MiniCssExtractPlugin(), ...templates.map(template => new HtmlWebpackPlugin({
        inject: false,
        filename: `${template}.html`,
        template: `src/templates/${template}.hbs`,
        page: `page-${template}`
    }))],
    output: {
        filename: '[name].js', // For prod: '[name].[contenthash].bundle.js'
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
};
