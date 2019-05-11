const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    /**
     * all the same stuff as in webpack.dev.js
     **/
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "wordpress/wp-content/themes//app"),
        publicPath: '/wp-content/themes/technomad/app/',
        //https://webpack.js.org/configuration/output#outputpublicpath:
        //publicPath: 'https://cdn.example.com/assets/', // CDN (always HTTPS)
        //publicPath: '//cdn.example.com/assets/', // CDN (same protocol)
        //publicPath: '/assets/', // server-relative
        //publicPath: 'assets/', // relative to HTML page
        //publicPath: '../assets/', // relative to HTML page
        //publicPath: '', // relative to HTML page (same directory)

    },
});