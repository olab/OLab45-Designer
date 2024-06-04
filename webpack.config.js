const HtmlWebPackPlugin = require('html-webpack-plugin'),
  CopyWebPackPlugin = require('copy-webpack-plugin'),
  webpack = require('webpack'),
  path = require('path'),
  WorkboxPlugin = require('workbox-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

// load .env variables
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

let isAbsoluteUrl = false;

try {
  new URL(process.env.PUBLIC_URL);
  isAbsoluteUrl = true;
} catch (err) { }

if (isAbsoluteUrl) {
  // the react router doesn't seem to work well with absolute URLs
  // e.g. it redirects to this as the login
  // https://hash.ngrok.app/https://hash.ngrok.app/designer/v2/login
  // when I set the env variable as https://hash.ngrok.app/designer/v2
  throw new Error(
    'Absolute URLs not supported for PUBLIC_URL environment variable. Use a pathname instead (e.g. /designer instead of example.com/designer',
  );
}

if (process.env.PUBLIC_URL) {
  process.env.PUBLIC_URL = process.env.PUBLIC_URL.replace(/\/{1,}$/g, '');
}

const devServerHost = process.env.WEBPACK_HOST || 'localhost';

module.exports = (env, options) => ({
  entry: {
    main: './src/index.jsx',
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: `${process.env.PUBLIC_URL || ''}/` || '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].bundle.js',
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },

  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 4000,
    host: devServerHost,
    allowedHosts: 'all',
    devMiddleware: {
      writeToDisk: true,
    },
    client: {
      overlay: {
        warnings: false,
      },
    },
    // proxy: {
    //   '/olab/api/v3': `http://${devServerHost}:5001`,
    // },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|@material-ui|@tinymce|classnames|connected-react-router|d3|dagre|enzyme)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
      },
    ],
  },

  plugins: [
    // start with copying public to build
    new CopyWebPackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      publicUrl: `${process.env.PUBLIC_URL || ''}`.replace(/\/{1,}$/g, ''),
    }),
    // use env variables in react
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.PROJECT_VERSION': JSON.stringify(
        process.env.PROJECT_VERSION,
      ),
      'process.env.PLAYER_PUBLIC_URL': JSON.stringify(
        process.env.PLAYER_PUBLIC_URL,
      ),
      'process.env.npm_package_version': JSON.stringify(
        process.env.npm_package_version,
      ),
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[id].css',
      ignoreOrder: false,
    }),
    // service-worker
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: path.resolve(__dirname, 'build/service-worker.js'),
      manifestTransforms: [
        (entries) => ({
          warnings: [],
          manifest: entries.map((entry) => ({
            ...entry,
            url: entry.url.replace(/\/{2,}/g, '/'),
          })),
        }),
      ],
      importScripts: ['service-worker-offline.js'],
      disableDevLogs: true,
    }),
  ],
});
