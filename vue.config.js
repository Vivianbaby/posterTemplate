// Vue.config.js 配置选项

module.exports = {

    // 选项
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "static",
    indexPath: "index.html",
    //文件名哈希
    filenameHashing: true,
    //用于多页配置，默认是 undefined
    pages: {
        index: {
            // page 的入口文件
            entry: 'src/main.js',
            // 在 dist/index.html 的输出文件
            filename: 'index.html',
            // 当使用页面 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },

    },
    devServer: {
        host: '0.0.0.0',
        open: true,
        proxy: {
            '/api': {
                target: `http://192.168.0.166:10087`,
                changeOrigin: true,
                pathRewrite: {
                    ['^/api']: ''
                }
            }
        },
        disableHostCheck: true
    },
}
