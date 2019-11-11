// vue配置
// 判断开发环境以及上线环境
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
// 导入gzip压缩包
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const webpack = require('webpack')

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './',
  //打包输出文件目录
  outputDir: 'dist',
  //静态资源打包目录
  assetsDir:'assets',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // sourceMap
  productionSourceMap: !IS_PROD,
  configureWebpack: config => {

    // 开启gzip压缩
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )

    }
    config.plugins = [...config.plugins, ...plugins]
  },

  
  chainWebpack: config => {
    //添加目录别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assect', resolve('src/assect'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
      .set('@static', resolve('src/static'))
      .set('@router', resolve('src/router'))
      .set('@style', resolve('src/style'))
      .set('@components', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
      .set('@api', resolve('src/api'))
    // 删除moment多于的语言包
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

    return config
  }

}