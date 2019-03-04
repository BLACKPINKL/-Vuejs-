const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const OptimizePlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
let config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: WEBPACK_ENV === 'dev' ? '/dist/' :
                '/',
    filename: WEBPACK_ENV === 'dev' ? 'js/[name].js' :
              'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'resource/[name].[hash:7].[ext]'
                }
            }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 5000,
                name: 'resource/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      router: path.resolve(__dirname, 'src/router'),
      service: path.resolve(__dirname, 'src/service'),
      pages: path.resolve(__dirname, 'src/pages'),
      static: path.resolve(__dirname, 'static'),
      style: path.resolve(__dirname, 'src/style')
    },
    extensions: ['.js', '.vue']
  },
  optimization: {
   runtimeChunk: false,
   splitChunks: {
     cacheGroups: {
       common: {
         name: "common",
         chunks: "all",
         minChunks: 2
       }
     }
   }
 },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new ExtractPlugin('css/[name].css'),
    new OptimizePlugin({
          cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
          cssProcessorOptions: {
           safe: true, discardComments: { removeAll: true }
          },
          canPrint: true
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true
        }
    })
  ],
  devServer: {
    port: 3000,
    inline:true,
    hot: true,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy : {
      '/manage' : {
          target: 'http://adminv2.happymmall.com',
          changeOrigin : true
      },
      '/user/logout.do' : {
          target: 'http://adminv2.happymmall.com',
          changeOrigin : true
      }
    }
  }
}
module.exports = config
