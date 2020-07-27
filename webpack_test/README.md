### ----此项目是为了玩转webpack 并进行测试--- ###

## 运行方式

# npm install || cnpm install(淘宝镜像更快)
# npm run dev                               dev 环境，会在内存中生成
# npm run build                             production 环境，会在build文件夹中生成打包好的文件



# ----------------------------------------------
# css相关
# ----------------------------------------------
# sass-loader                               将sass文件编译为css
# css-loader                                将css转换为js可识别模块
# style-loader                              将css模块以<style>标签的形式插入到html中
# postcss-loader                            css兼容浏览器处理
# postcss-reset-env                         css兼容浏览器处理
# mini-css-extract-plugin                   提取css到独立文件


# ----------------------------------------------
# 其它静态文件处理
# ----------------------------------------------
# url-loader || file-loader                 它俩功能很相似，都是处理css中src引入的静态文件/import 引入静态文件。不同的是前者有limit限制，低于这个限制文件会被转化为base64格式的字符串，从而减少请求
# html-loader                               单独处理HTML文件，并将html标签中有src的静态资源引入，此时又需要url-loaer || file-loader处理，如果没有此loader无法模块化html
# html-webpack-plugin                       此插件就是用来指定某个html作为模板，并且和以上两个loader配合使用的，如果没有html-loader则无法处理里面的<img src=''>
# mini-css-extract-plugin                   将原来写入html 中的style标签中的css 提取出来为单独文件并放在某个文件夹下，为什么这么做？因为嵌入style的是js写入的，js会放在html的底部；因此页面会出现暂时无样式状态，然后样式突变的 闪，而这个插件配合之前的指定HTML的插件，会在<head>写入<link>从而符合标准渲染逻辑。  