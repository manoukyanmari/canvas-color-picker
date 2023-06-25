const HtmlWebpackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/colorDropper.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'color dropper project', 
        template: './src/index.html' }) ,
    new CopyPlugin({
        patterns: [
            path.resolve(__dirname, "./src/style.css"),
            {
                from: "src/assets",
                to: "assets",
            },
        ],
        options: {
            concurrency: 100,
        },
        }),
   ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    open: true,
    port: 4000,
  },
};