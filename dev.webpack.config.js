"use strict";

const path = require("path");
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base.webpack.config');

module.exports = function (env) {
    return webpackMerge(commonConfig, {
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            port: 3001,
            inline: true,
            stats: {
                cached: false
            },
            historyApiFallback: true,
            open: true
        },
        devtool: "inline-source-map"
    })
};