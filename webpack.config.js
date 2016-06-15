var path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssExtractPlugin = new ExtractTextPlugin('css/[contenthash:16].css');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

process.env.NODE_ENV = TARGET;
process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        app:PATHS.src
    },
    output: {
        publicPath : '/',
        path: PATHS.dist,
        filename: 'bundle/bundle.js'
    },
    externals: [{
    }],
    module: {
      loaders: [
          { test: /\.html$/, loader: "html" },
          { test: /\.(css|scss)$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style-loader", "css-loader", "scss-loader")},
          { test: /\.jsx?$/,  exclude: /(node_modules|bower_components)/, loaders: ['babel?cacheDirectory']},
          { test: /\.woff(2)?(\?t=\d+)?$/, loader: "url-loader?name=font/[name].[ext]?[hash]&limit=10000&minetype=application/font-woff" },
          { test: /\.(ttf|eot|svg)(\?t=\d+)?$/, loader: "file-loader?name=font/[name].[ext]?[hash:16]" },
          { test: /\.jpg$/, loader: "file-loader?name=img/[name].[ext]?[hash:16]" },
          { test: /\.png$/, loader: 'url-loader?name=img/[name].[ext]?[hash:16]&limit=8192' }
      ]
    },
    plugins: [
    cssExtractPlugin,
    new HtmlWebpackPlugin({
      title: 'React',
      template:'./src/assets/index.html'
    })],
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        root:[path.resolve('./src/assets')],
        extensions: ['', '.jsx','.js', '.json','.scss','.css']
    },
    htmlLoader: {
      ignoreCustomFragments: [/\{\{.*?}}/]
    }
}


if(TARGET === 'dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: PATHS.dist,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: false,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
}

if(TARGET === 'build' || TARGET === 'production') {
  module.exports = merge(common, {
    plugins:[
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"'+TARGET+'"'
      })
    ]
  })
}
