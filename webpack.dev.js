const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        overlay: {
            errors: true,
            warnings: false,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        /**
         * use your custom apache's hostnames or just "localhost" instead
         **/
        host: "dev.your-projects-local-hostname",
        /**
         * random port for the node.js/express.js server
         * if you don't use hostnames (ugh! ;) ) you just can use localhost:8015
         **/
        port: 8015,
        /**
         * Express.js address for the browser
         * same as above: use localhost:8015 if no hostname
         **/
        public: "dev.your-projects-local-hostname:8015",
        /**
         * here the browser can access all by webpack created bundle.js files including *.hot-update.json files
         * I personally create a directory named "app" inside my theme for all the Webpack created files
         **/
        publicPath: "/wp-content/themes/your-fancy-theme/app/",
        stats: 'errors-only',
        https: true,
        inline: true,
        noInfo: true,
        historyApiFallback: true,
        /**
         * enable/disable HMR
         **/
        hot: true,
        open: true,
        hotOnly: true,
        disableHostCheck: true,
        /**
         * important if you want to enable HMR even without using the port number like:
         * https://dev.your-projects-local-hostname
         * 
         **/
        writeToDisk: true,
        /**
         * proxy all the express.js requests to apache
         **/
        proxy: {
            '/': {
                target: "https://dev.tech-nomad-vue",
                /**
                 * webpack docs https://webpack.js.org/configuration/dev-server#devserverproxy:
                 * "A backend server running on HTTPS with an invalid certificate will not be accepted by default. If you want to, modify your config like this:"
                 **/
                secure: false,
                /**
                 * webpack docs:
                 * "The origin of the host header is kept when proxying by default, you can set changeOrigin to true to override this behaviour.
                 * It is useful in some cases like using name-based virtual hosted sites."
                 **/
                changeOrigin: true,
                /**
                 * http-proxy-middleware docs:
                 * "rewrites the location host/port on (301/302/307/308) redirects based on requested host/port. Default: false."
                 * https://github.com/chimurai/http-proxy-middleware
                 **/
                autoRewrite: true,
                 /**
                  * don't remember what it does :)
                  **/
                headers: {
                    'X-ProxiedBy-Webpack': true,
                },
            },
        },
    },
    output: {
        /**
         * actually it's a production property, but to be able to catch up the bundle.js files by Apache web server it should be also enabled in dev config
         **/
        filename: '[name].bundle.js',
        /**
         * The output directory as an server-internal absolute path:
         **/
        path: path.resolve(__dirname, "wordpress/wp-content/themes/technomad/app"),
        /**
         * relative path on the server publicly accessable:
         **/
        publicPath: "https://dev.tech-nomad-vue:8015/wp-content/themes/technomad/app/",
        //https://webpack.js.org/configuration/output#outputpublicpath
        //publicPath: 'https://cdn.example.com/assets/', // CDN (always HTTPS)
        //publicPath: '//cdn.example.com/assets/', // CDN (saXe protocol)
        //publicPath: '/assets/', // server-relative
        //publicPath: 'assets/', // relative to HTML page
        //publicPath: '../assets/', // relative to HTML page
        //publicPath: '', // relative to HTML page (same directory)

    },
});