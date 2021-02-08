// Vue.config.js 配置选项

module.exports = {

    // 选项
    publicPath: "./",   // 部署应用包的基本url
    outputDir: "dist",    // 生产的文件目录
    assetsDir: "static",  //  放置生成静态的资源 相当于outputDir
    indexPath: "index.html",
    //文件名哈希
    filenameHashing: true,   // 生成的静态资源文件名包含hash 控制缓存的
    //用于多页配置，默认是 undefined
    pages: {
        index: {
            // page 的入口文件
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出文件
            filename: 'index.html',
            // 当使用页面 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '海报管理系统',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },

    },
    devServer: {
        host: '0.0.0.0',
        open: true,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: `http://192.168.0.166:10087`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true
    },
}
