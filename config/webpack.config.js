const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// paths
const projectPath = path.resolve(__dirname, '..');
const buildPath = path.join(projectPath, 'build');
const dataPath = path.join(projectPath, 'data');
const srcPath = path.join(projectPath, 'src');
const appPath = path.join(srcPath, 'app');

const entries = {
  main: path.join(appPath, 'index.tsx')
};

const erdFilePath = path.join(dataPath, 'erd.dot_json.json');
if (fs.existsSync(erdFilePath)) {
  entries.erdFile = erdFilePath;
}

const config = {
  entry: entries,
  output: {
    filename: '[name]-[chunkhash].js',
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: srcPath,
        loader: 'ts-loader'
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg|woff|woff2|eot|ttf)$/,
        include: projectPath,
        loader: 'url-loader'
      },
      {
        test: /\.(sass|scss)$/,
        include: projectPath,
        exclude: path.join(appPath, 'theme', 'bootstrap.config.scss'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,   // make sure sass-loader is used on imported assets
              localIdentName: '[local]---[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      },
      {
        include: path.join(appPath, 'theme', 'bootstrap.config.scss'),
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']  // order is important. give typescript precedence when js file already exists.
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appPath, 'index.html')
    })
  ],
  devServer: {
    contentBase: buildPath
  },
  devtool: 'source-map',
  mode: 'development'
};

module.exports = config;