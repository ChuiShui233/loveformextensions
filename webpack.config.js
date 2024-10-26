const path = require('path');

module.exports = {
  mode: 'production',
  entry: './popup.jsx',
  output: {
    filename: 'popup.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 添加对 CSS 的支持
      },
    ],
  },
};
