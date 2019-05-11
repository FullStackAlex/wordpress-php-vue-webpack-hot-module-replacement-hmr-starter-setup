const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

/**
 * set true to enable sourcemaps in dev mode (even though sourcemaps are not loaded when console isn't open, as I always also check the performance of the production ready app and the sourcemap distorts the result)
 **/
const sourceMap = false;

module.exports = {
    entry: {
        /**
         * define your app's main .js file
         * the result of which will then be outputted in "wordpress/wp-content/themes/your-fancy-theme/app" as "app.bundle.js" as defined in next sections
         **/
        app: './src/main.js',
        /**
         * create an extra babelPolyfill bundle
         **/
        babelPolyfill: "babel-polyfill",
    },
    resolve: {
        alias: {
            /**
             * import Vue templates (or whatever) without the need of relative or absolute paths like:
             * import bla from "~/components/modals/bla-popup"
             **/
            "~": path.resolve(__dirname, 'src'),
            /**
             * use @node_modules  for importing libraries which are not getting loaded just by npm name for any reason or just parts of it like:
             * import TweenMax from "@node_modules/gsap/src/minified/TweenLite.min.js
             **/
            "@node_modules": path.resolve(__dirname, 'node_modules'),
            /**
             * don't remember what it exactly does, but obviously has something to do with the vue-loader,
             * after checking my notes I found this where I probably got it from, seems to do with less-loader errors
             * https://github.com/vuejs-templates/webpack/issues/25
             *
             * Aah, I think I got it. I think it does enable importing Vue templates without the need to append .vue :D
             **/
            'vue$': 'vue/dist/vue.esm.js',
            /**
             * import any css preprocessor files inside style tag in Vue templates like:
             * @import (reference) "~@styles/variables"
             **/
            '@styles': path.resolve(__dirname, 'src/less'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options:{
                        sourceMap: sourceMap
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        strictMath: true,
                        noIeCompat: true,
                        sourceMap: sourceMap
                    }
                },]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }

            },
            {
                test: /\.(svg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'svg/'
                }

            },
            /**
             * enable (almost) all the ES6 magic in older browsers, though 100kb more
             **/
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-syntax-dynamic-import',
                        'transform-es2015-arrow-functions'
                    ]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ]
    }
};