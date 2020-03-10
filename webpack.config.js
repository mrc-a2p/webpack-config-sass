const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');


// 'production' - 'development'
const MODE = 'development';
const enabledSourceMap = (MODE === 'development');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/scripts/main.js")
  },
  // mode: "production",
  mode: isDevelopment,
  

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/[name].js"
    // publicPath: "dist/",
    // chunkFilename: "scripts/[id].[chunkhash].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 2323
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      hash: true,
      templateParameters: {
        title: "Index"
      }
    }),
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, "dist"),
      filename: "styles/[name].css"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/images/'),
        to: path.resolve(__dirname, 'dist/images/'),
      },
    ]),
    // new ImageminPlugin({
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   pngquant: {
    //     quality: '95-100',
    //   },
    // }),
  ],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /(node_modules|bower_components)/,
        // options: {
        //   // ES2015(ES6)
        //   presets: ['@babel/preset-env'],
        // },
      },
      //HTML
      // {
      //   test: /\.html$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: [
      //     { 
      //       loader: 'html-loader',
      //       options: {
      //         minimize: false,
      //         removeComments: false,
      //         collapseWhitespace: false            
      //       }
      //     },         
      //   ],
      // },
      // CSS
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
            //  options: {
            //      plugins: [autoprefixer({ browsers: ['> 1%'] })]
            //  },
          }
        ]
      },
      // SASS
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
            sourceMap: false,
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader",
            options: {
            sourceMap: false,
            }
          }
        ]
      },
      // URL - LOADER
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 90000
          }
        }
      },
      // FONTS
      {
        test: /\.(woff|woff2|ttf|eot|otf|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        // exclude: path.resolve(__dirname, "node_modules"), 
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[name]-[hash].[ext]',
              // name: '[name].[ext]', 
              // outputPath: 'src/fonts/',
              // prefix: "font", 
              // limit: 10000, 
            }
          }
        ],
      },     
      // IMAGES
      {
        test: /\.(gif|png|jpe?g|svg|jpg|png|bmp|svgz)$/,
        loader: 'file-loader', 
        options: {
          outputPath: 'dist/images/',
          // name: '[name]-[hash].[ext]',
          // // limit: 90000,
          limit: 10 * 1024,
          // useRelativePath: true,
        },
      },
      // VIDEOS
      {
        test: /\.(webm|mp4)$/,
        loader: 'file-loader', 
        options: {
          outputPath: 'src/videos/',
          name: '[name]-[hash].[ext]',
        },
      },
    ]
  }
};
