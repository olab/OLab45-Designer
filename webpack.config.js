const htmlWebPackPlugin = require('html-webpack-plugin')
    , copyWebPackPlugin = require('copy-webpack-plugin')
    , dotEnv = require('dotenv-webpack')
    , webpack = require('webpack')
    , path = require('path')

// load .env variables
require('dotenv').config({
  path: path.resolve(__dirname, '.env')
})

module.exports = (env, options) => ({
  entry: './src/index.jsx',
  
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: process.env.PUBLIC_URL || '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: [ '.jsx', '.js' ]
  },

  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 4000,
    devMiddleware: {
      writeToDisk: true
    }
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader'
        }
      },
      {
        test: /\.cur$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      }
    ]
  },

  plugins: [
    new copyWebPackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'public'),
        globOptions: {
          ignore: ['**/index.html']
        }
      }]
    }),
    new htmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      publicUrl: process.env.PUBLIC_URL || '',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.PROJECT_VERSION': JSON.stringify(process.env.PROJECT_VERSION),
      'process.env.PLAYER_PUBLIC_URL': JSON.stringify(process.env.PLAYER_PUBLIC_URL),
      'process.env.npm_package_version': JSON.stringify(process.env.npm_package_version),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    })
  ]
})