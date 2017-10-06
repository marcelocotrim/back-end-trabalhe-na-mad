const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    './src/index.jsx',
  ],
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PARSE_URL: JSON.stringify('https://api.marcelocotrim.com'),
        PARSE_APP_ID: JSON.stringify('a888a9ba04704c98a98c662e8adb0517'),
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: 'popper.js/dist/umd/popper.js',
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  output: {
    path: `${__dirname}/public`,
    filename: '[name].[chunkhash:8].js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
      './src/components',
    ],
    alias: {
      app: 'index.jsx',
      actions: 'src/actions/index.jsx',
      reducers: 'src/reducers/index.jsx',
      routes: 'src/routes/index.jsx',
      store: 'src/store/index.jsx',
      parseApp: 'src/parse/index.jsx',
      styles: 'src/styles/app.scss',
    },
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015', 'stage-0'],
            },
          },
        ],
        exclude: /()node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
      },
    ],
  },
  devtool: 'cheap-module-source-map',
};
