module.exports = {
    /** 组件测试编译配置
     entry: {
        'test_lab_login': './test/test_lab_login.js',
        //'lab_head_tail': './assets/module/lab/lab_head_tail.js'
    },
     */
    /**产品编译配置*/
    entry: {
        'demo_base': './example/js/demo_base.js',
        'demo_replace_head': './example/js/demo_replace_head.js',
        'demo_replace_login': './example/js/demo_replace_login.js',
        'demo_login': './example/js/demo_login.js'
    },

    output: {
        'path': 'build',
        filename: '[name].js',
        //publicPath: "/front-end-laban/build/"
        publicPath: "/build/"
    },
    module: {
        loaders: [
            {
                test: /\.less$/, loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.scss$/, loader: 'style!css!sass'
            },
            {
                test: /\.html$/, loader: 'html'
            },
            {
                test: /\.css$/, loader: 'style-loader!css-loader'// 链式调用
            },
            {
                test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=192'
            },
            {
                test: /\.otf$/, loader: "file"
            },
            {
                test: "\.jpg$", loader: "file-loader"
            },
            {
                test: "\.png$", loader: "url-loader?mimetype=image/png"
            }
        ]
    },
    resolve: {
        // 现在可以写 require('file') 代替 require('file.coffee')
        extensions: ['', '.js', '.json', '.coffee', '.scss', '.jsx']
    }
};
