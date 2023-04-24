const path = require("path");

const globConfig = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  devtool: "inline-source-map",
  experiments: {
    topLevelAwait: true,
  },
};

const clientConfig = {
  ...globConfig,
  target: "web",
  name: "client",
  entry: "./src",
  output: {
    filename: "client.bundle.js",
    path: path.resolve(__dirname, "build"),
  },
};

const serverConfig = {
  ...globConfig,
  target: "node",
  name: "server",
  entry: "./server",
  output: {
    filename: "server.bundle.js",
    path: path.resolve(__dirname, "build"),
  },
};

module.exports = [clientConfig, serverConfig];
