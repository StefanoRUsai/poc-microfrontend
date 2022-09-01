const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // only add this if you don't have yet
const { ModuleFederationPlugin } = webpack.container;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const deps = require("./package.json").dependencies;
require("dotenv").config({ path: "./.env" });
const path = require("path");

const buildDate = new Date().toLocaleString();

module.exports = (env, argv) => {
  return {
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    mode: process.env.NODE_ENV || "development",
    devServer: {
      port: 3000,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "dist"),
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } },
              ],
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { loose: true }],
            ],
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      }),
      new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "mainapp",
        remotes: {
          homepage: process.env.DEV_APP1,
          navbar: process.env.DEV_APP2,
          login: process.env.DEV_APP3,
          appone: process.env.DEV_APP4,
          helloVue: 'helloVue@http://localhost:8082/remoteEntry.js'

        //  login: process.env.DEV_APP2,
        },
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
          "react-router-dom":{
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
          "@material-ui/styles": {
            singleton: true,
          },
          "@emotion/core": {
            singleton: true,
          },
          "@emotion/styled": {
            singleton: true,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
  };
};


