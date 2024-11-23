import path from "path";
import webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

/** @type {import("webpack").Configuration} */
export default {
  mode: "production",
  target: "node",
  entry: "./src/index.ts",
  externals: ["@amplication/code-gen-utils"],
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/static", to: "static", noErrorOnMissing: true },
        { from: "src/templates", to: "templates", noErrorOnMissing: true },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  optimization: {
    minimize: false,
  },
  output: {
    filename: "index.js",
    path: path.resolve("dist"),
    libraryTarget: "commonjs2",
    clean: true,
  },
};
