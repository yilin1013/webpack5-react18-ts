/**** webpack.config.js  ***/
const htmlWebpackPlugin = require('html-webpack-plugin');
// webpack 默认配置
const path = require('path');

module.exports = {
    // 项目入口文件 支持 str | [] | {}
    entry: path.resolve(__dirname, './src/index.tsx'),
    // 项目出口 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].js', // 每个输出js的名称
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: '/', // 打包后文件的公共前缀路径
    },
    devServer: {
        port: 8080, // 服务端口号
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新，后面会讲react模块热替换具体配置
        historyApiFallback: true, // 解决history路由404问题
        static: {
          directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
        }
    },
    
    // 打包环境 默认是生产环境 production
    // 如果是开发环境 这里需要换成 development
    // 接下来为了观察打包后的文件，使用 development
    mode: 'development',
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
    },
    // 模块 这些选项决定了如何处理项目中的不同类型的模块。
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/, // 匹配.ts, tsx文件
                use: {
                  loader: 'babel-loader',
                  
                }
            },
            {
                test: /\.(css|less)$/, //匹配 css和less 文件
                use: ['style-loader','css-loader', 'less-loader']
            },
            {
                test:/\.(png|jpg|jpeg|gif|svg|webp)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                  dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb转base64位
                  }
                },
                generator:{ 
                  filename:'static/images/[name][ext]', // 文件输出目录和命名
                },
            },
        ]
    },
    // 插件
    plugins: [
        // 复制一个 html 并将最后打包好的资源在 html 中引入
        new htmlWebpackPlugin({
            // 页面title 需要搭配 ejs 使用
            title: "测试title",
            // html 模板路径
            template: path.resolve(__dirname, "./public/index.html"),
            inject: true, // 自动注入静态资源
            // 输出文件名称
            filename: "index.html",
            minify: {
                // 压缩HTML⽂件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空⽩符与换⾏符
                minifyCSS: true // 压缩内联css
            }
        })
    ],
    // 是否开启 source-map
    devtool: 'cheap-source-map'
}