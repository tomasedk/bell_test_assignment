"use strict";

const webpack = require("webpack");
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base.webpack.config');

module.exports = function (env) {
    return webpackMerge(commonConfig, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    })
};