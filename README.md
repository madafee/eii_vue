# mjvod

> HRMS

## Build Setup

``` bash
# install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## zhengenru

## 技术栈

前端：vue2 + vuex + webpack + ES6/7 + stylus + element

## 项目运行

cd HRMS
cnpm install
cnpm run dev

## 项目打包
npm run build

## 项目打包成桌面端
npm run electron_build

## 结构
├── static  //公共css
│   ├── reset.css
├── src  //主体
│   ├── api  //所以请求
│   ├── assets // 主题 字体等静态资源
│   ├── components // 全局公用组件
│   │   ├── banner // 轮播组件
│   │   ├── common // 公共组件
│   │   ├── content // 主内容组件
│   │   └── recommend // 精彩推荐
│   ├── store // 全局store管理---vuex
│   ├── App.vue // 入口页面
│   └── main.js // 入口 加载组件 初始化等
# center

#### build（）
##### build.js（）
##### check-versions.js（）
##### electron.js（）
##### logo.png（logo图片）
##### utils.js（）
##### vue-loader.conf.js（）
##### webpack.base.conf.js（）
##### webpack.dev.conf.js（）
##### webpack.prod.conf.js（）

#### config（）
##### dev.env.js（开发服务器）
##### index.js（）
##### prod.env.js（生产服务器）

#### dist(打包之后文件)

#### node_modules(依赖文件)

#### src
##### api(接口文件)
1. accountings.js(科室成本核算接口)
2. consumables.js（物资接口）
3. dicts.js（字典接口）
4. distributions.js（医疗包配送申请接口）
5. equipment.js（设备接口） 
6. index.js（主页接口）
7. login.js（主页接口）
8. material.js（物资接口）
9. packages.js（医疗包接口）
10.recall.js（召回接口）
11.rospective.js（取得医疗包接口）
12.upload.js（上传文件接口）
13.user.js（用户接口）
##### asses（存放图片文件）
##### components（自定义组件文件）
1. Breadcrumb（）
2. Carousel（轮播组件）
3. dragDialog（关于医疗包详细的页面组件）
4. GoSearch（手动查询组件）
5. Packages（获取医疗包列表组件）
6. Packagesdblclick（两栏分页的获取医疗包列表且可双击到另一个列表的引用组件）
. Search（切换查询组件）
. Upload（上传文件组件）
##### icons（存放svg图片文件）
##### router（路由文件）
1.index.js（各种路由配置文件）
##### store（）
##### styles（全局样式文件）
##### utils（插件文件）
1. auth.js（字典文件）
2. code.js（）
3. dicts.js（字典信息）
4. index.js（）
5. messages.js（全局写死文字插件）
6. validate.js（全局验证插件）
##### views（自定义文件）
1. assigned（配包管理页）
  - confirmation.vue（配包审核页）
  - index.vue（配包管理主页）
  - printers.vue（标签打印页）
  - uncomplete.vue（配包任务页）
2. callback（召回管理页）
  - used.vue（主页）
3. dashboard（主页）
4. clearnings（清洗管理页）
  - assigned（清洗配包管理页）
  - clearnings（清洗列表页）
  - detailed.vue（清洗详细页）
  - part.vue（清洗部分不合格页）
5. confirmation（入库管理页）
  - index.vue（入库管理主页）
6. form
7. distribution（配送管理）
  - complete.vue（医疗包配送信息列表页）
  - consumables.vue（物资配送信息列表页）
8. layout（导航条）
9. login（登录页面）
10.recall（召回页面）
  - index.vue（召回界面）
11.remand（退回页）
  - complete.vue（退回完成页页）
  - index.vue（新增退回页）
12.sterilizations（灭菌管理页）
  - assigned.vue（灭菌配包管理页）
  - sterilizations.vue（灭菌列表页）
  - detailed.vue（灭菌详细页）
13.404.vue
##### min.js（全局方法文件）
##### permission.js（）

#### static（）
#####.gitkeep（）

#### .babelrc（）

#### .editorconfig（）

#### .eslintignore（）

#### .eslintrc（）

#### .postcssrc.js（）

#### .travis.yml（）

#### favicon.ico（）

#### index.html（）

#### LICENSE（）

#### package-lock.json（）

#### package.json（）

#### README-zh.md（）

#### README.md（）
组件的原则就是尽量将复杂的UI布局划分成单个小的UI组件，逻辑处理也被划分成更多的单个小的逻辑。数据流动采用的单向数据流动。子组件的数据更多的是来自于父组件，父组件的数据主要是其本身发起的`ajax`请求。本项目中`ajax`请求库使用的是`axios`。

## 状态管理

目前的状态管理采用`vuex`。由于`vuex`可以分多个子`module`。所以在不同模块下单独维护一份状态，同时对于一些公共的状态，比如发起网络请求的`requesting`，错误时的状态`error`则保存在根状态中，之后可以通过子模块中的`rootState.requesting`获取来赋值。

在子模块中发送网络请求获取数据是一个异步的过程，所以将网络请求放在`actions`。每次发起网络需要经历下面的步骤

1. 请求中
   rootState.requesting = true  //请求状态更新为true,表示请求中
   commit(TYPE.XX_REQUEST)  // 发送同步操作，请求中的数据处理

2. 请求成功
   rootState.requesting = false  //请求状态更新为false,表示请求结束
   commit(TYPE.XX_SUCCESS, response) //发送同步操作,处理请求成功后数据

3. 请求失败
   rootState.requesting = false  //请求状态更新为false,表示请求结束
   rootState.error = error
   commit(TYPE.XX_FAILURE, error) //发送同步操作,处理请求失败