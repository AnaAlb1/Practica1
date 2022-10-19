
const path = require('path');

const MiniCssExtractPlugin =
  require('mini-css-extract-plugin');

const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {

  entry: "./client/index.js",

  output: {

    path: path.resolve(__dirname, "public"),
    
    filename: "bundle.js",
    
    publicPath: '/'
  },
  
  devServer: {
    
    static: path.join(__dirname, "public"),
    
    port: 3000,
    
    host: "localhost"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    'modules': false,
                    'useBuiltIns': 'usage',
                    'targets': {"chrome": 80},
                    'corejs': 3
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'stylesheet/app.css'
    }),
    new ESLintPlugin()
  ]
}