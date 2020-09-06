const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    hot: true,
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Web Gaming Sandbox',
      templateContent: () => `
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Unity WebGL Player | Micro FPS Tutorial</title>
    <link rel="shortcut icon" href="TemplateData/favicon.ico">
    <link rel="stylesheet" href="TemplateData/style.css">
  </head>
  <body>
    <div id="unity-container" class="unity-desktop">
      <canvas id="unity-canvas"></canvas>
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
    </div>
    <script>
      var buildUrl = "Build";
      var loaderUrl = buildUrl + "/AndrewAllbrightMicroFPS.loader.js";
      var config = {
        dataUrl: buildUrl + "/AndrewAllbrightMicroFPS.data",
        frameworkUrl: buildUrl + "/AndrewAllbrightMicroFPS.framework.js",
        codeUrl: buildUrl + "/AndrewAllbrightMicroFPS.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Micro FPS Andrew Allbright",
        productVersion: "1.1.2-preview.1",
      };

      var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loadingBar = document.querySelector("#unity-loading-bar");
      var progressBarFull = document.querySelector("#unity-progress-bar-full");

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        container.className = "unity-mobile";
        config.devicePixelRatio = 1;
      } else {
        canvas.style.width = "1024px";
        canvas.style.height = "680px";
      }
      loadingBar.style.display = "block";

      var script = document.createElement("script");
      script.src = loaderUrl;
      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          loadingBar.style.display = "none";
        }).catch((message) => {
          alert(message);
        });
      };
      document.body.appendChild(script);
    </script>
  </body>
</html>
      `
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/Build', to: 'Build' },
        { from: 'src/TemplateData', to: 'TemplateData' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
