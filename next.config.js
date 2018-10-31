const optimizedImages = require('next-optimized-images')
const withCss = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const webpack = require('webpack')

const optimizedImagesConfig = {
  inlineImageLimit: 8192,
  imagesFolder: 'images',
  imagesName: '[name]-[hash].[ext]',
  optimizeImagesInDev: false,
  mozjpeg: {
    quality: 80
  },
  optipng: {
    optimizationLevel: 3
  },
  pngquant: false,
  gifsicle: {
    interlaced: true,
    optimizationLevel: 3
  },
  svgo: {
    // enable/disable svgo plugins here
  },
  webp: {
    preset: 'default',
    quality: 75
  }
}

const nextConfiguration = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        PC: JSON.stringify('pc')
      })
    )
    return config;
  }
}

const cssConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    })
    return config
  }
}

module.exports = withPlugins([
  [withCss, cssConfig],
  [optimizedImages, optimizedImagesConfig],
], nextConfiguration)