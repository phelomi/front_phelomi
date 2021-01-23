const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/v1/api': {
        target: 'http://localhost:5000/',
      },
    },
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
          threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
          deleteOriginalAssets: false, // 是否删除原文件
        }),
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/home'],
          // renderer: new Renderer({
          //   renderAfterDocumentEvent: 'render-event',
          // }),
        }),
      );
    }
  },
  chainWebpack: (config) => {
    // config
    //   .plugin('html')
    //   .tap((args) => {
    //     args[0].chunksSortMode = 'none';
    //     return args;
    //   });
    config
      .plugin('define')
      .tap((args) => {
        // if (args[0]['process.env'].VUE_APP_MODE_ENV !== '"PRODUCTION"') {
        //   args[0]['process.env'].BUILD_TIME = `${Date.now()}`;
        // }
        args[0]['process.env'].BUILD_TIME = `${Date.now()}`;
        return args;
      });
    config
      .devServer.port(8080);
  },
  pwa: {
    themeColor: '#2F599C',
  },
};
