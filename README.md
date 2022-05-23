nextjs ssr react mobile模版

## 开始

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## sass

```bash
npm i -S sass
```

直接使用，无需其他配置

## 移动端适配

安装*postcss-px-to-viewport*

```bash
npm i -D postcss-px-to-viewport
```


根目录新建*postcss.config.js*：

```javascript
/*
 * @Author: indeex
 * @Date: 2019-05-19 19:30:45
 * @Email: indeex@qq.com
 */
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            // 视窗的宽度，对应的是我们设计稿的宽度，我们公司用的是375
            viewportWidth: 375,
            // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            // viewportHeight: 1334,
            // 指定`px`转换为视窗单位值的小数位数
            unitPrecision: 3,
            // 指定需要转换成的视窗单位，建议使用vw
            viewportUnit: 'vw',
            // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            selectorBlackList: ['.ignore'],
            // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            minPixelValue: 1,
            // 允许在媒体查询中转换`px`
            mediaQuery: false
            // exclude: undefined
        }
    }
}
```

## CSS3自动补全

安装*autoprefixer*


```bash
npm i -D autoprefixer
```


修改*postcss.config.js*：

```javascript
//...

plugins: {
    'autoprefixer': {
        overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8"
            //'last 2 versions', // 所有主流浏览器最近2个版本
        ],
        grid: true
    },
}

//...
```

在*Home.module.scss*中添加：

```css
transform:rotate(30deg);
```

进行测试

## 添加meta

在*index.js*中添加：

```html
<Head>
    <meta charSet="utf-8" />
    <meta name="keywords" content="indeex" />
    <meta name="description" content="indeex" />
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
    <meta httpEquiv="Pragma" content="no-cache" />
    <meta httpEquiv="Expires" content="0" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="robots" content="all" />
    <meta name="author" content="indeex@qq.com" />
    <meta name="copyright" content="" />
    <meta property="image" content="https://blog.indeex.club/wp-content/uploads/2020/06/cropped-author%E7%99%BD%E5%BA%95-1-32x32.png" />
    <meta itemProp="image" content="https://blog.indeex.club/wp-content/uploads/2020/06/cropped-author%E7%99%BD%E5%BA%95-1-32x32.png" />
    <meta name="description" itemProp="description" content="indeex" />
    <meta property="og:type" content="indeex" />
    <meta property="og:title" content="indeex" />
    <meta property="og:description" content="indeex" />
    <meta property="og:image" content="https://blog.indeex.club/wp-content/uploads/2020/06/cropped-author%E7%99%BD%E5%BA%95-1-32x32.png" />
    <meta property="og:url" content="" />
    <meta property="og:videosrc" content="" />
    <meta property="og:width" content="300" />
    <meta property="og:height" content="600" />
    <meta name="renderer" content="webkit" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="screen-orientation" content="portrait" />
    <meta name="full-screen" content="true" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="x5-orientation" content="portrait" />
    <meta name="360-fullscreen" content="true" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta httpEquiv="Cache-Control" content="no-siteapp" />
    <link rel="icon" href="https://blog.indeex.club/wp-content/uploads/2020/06/cropped-author%E7%99%BD%E5%BA%95-1-32x32.png" />
    <title>
       ssr mobile with indeex
    </title>
</Head>
```


## 配置antd-mobile

安装*antd-modile*：

```bash
npm i -S antd-mobile
```

安装*next-transpile-modules*、*next-images*：

```bash
npm i -D next-transpile-modules next-images
```

修改*next.config.js*：

```javascript
/** @type {import('next').NextConfig} */

const withImages = require('next-images')

const withTM = require('next-transpile-modules')([
  'antd-mobile',
]);

const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
}

module.exports = withTM(withImages(nextConfig))
```


在*index.js*中使用*antd-mobile*：

```javascript
//...

import { Steps, Avatar, List } from 'antd-mobile';

//...


//...
<Avatar src="" style={{ '--size': '54px', borderRadius: '30px' }} />
<List header="申请信息">
<List.Item extra="未开启" clickable>
    大字号模式
</List.Item>
<List.Item description="管理已授权的产品和设备" clickable>
    授权管理
</List.Item>
<List.Item title="这里是标题">这里是主信息</List.Item>
</List>
//...
```

注意：


部分警告需要等待官方解决，比如：


> Warning: useLayoutEffect does nothing on the server的错误, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.



## Router

无需增加额外的文件，只需在*pages*文件夹中新增*about.js*即可：

```bash
-- pages
    -- index.js
    -- about.js
```


使用*useRouter*，并可以携带参数跳转：，修改*index.js*：

```javascript
//...
const router = useRouter()
  const handleAvatar = () => {
    router.push({pathname: 'about', query: {id: 666, name: "indeex"}})
  }
//...

//...
<Button onClick={handleAvatar}>跳转到关于页面</Button>
//...
```


*about.js*：



```javascript
/*
 * @Author: indeex
 * @Date: 2019-05-19 19:54:39
 * @Email: indeex@qq.com
 */
import { Button, List } from 'antd-mobile';
import { useRouter } from 'next/router';

function About(props) {
    const router = useRouter()

    const {id, name} = router.query

    const handleBack = () => {
        router.push({pathname: '/', query: {}})
    }

    return (
        <div>
            <Button onClick={handleBack}>返回</Button>
            <List header={id + " : " + name + "的一个列表"}>
                <List.Item extra="未开启" clickable>
                大字号模式
                </List.Item>
                <List.Item description="管理已授权的产品和设备" clickable>
                授权管理
                </List.Item>
                <List.Item title="这里是标题">这里是主信息</List.Item>
            </List>
        </div>
    )
}

export default About
```


## Axios

安装*axios*：

```bash
npm i -S axios
```


在根目录文件下新建*utils*文件夹，新建*axios.js*文件：

```javascript
/*
 * @Author: indeex
 * @Date: 2019-05-19 19:58:15
 * @Email: indeex@qq.com
 */
import axios from 'axios'

let baseURL
if (process.env.NODE_ENV === 'production') {
    baseURL = '生产环境地址'
} else {
    baseURL = '开发环境地址'
}

// 拦截器
axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})
axios.interceptors.request.use((config) => {
    // config.headers['Accept'] = 'application/vnd.dpexpo.v1+json'
    config.baseURL = baseURL
    config.timeout = 10000
    return config;
}, (error) => {
    return Promise.reject(error)
})

// axios的get请求
export function getReq({
    url,
    params = {}
}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err, '1')
            reject(err)
        })
    })
}

// axios的post请求
export function postReq({
    url,
    data
}) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default axios
```


注意不要在*pages*文件夹下。


在*api*文件中新建*about.js*：

```javascript
import { getReq, postReq } from "../utils/axios"

const url = 'https://www.fastmock.site/mock/2aeaa7d7a3b169abc7931f5e4cf75eb9/live/getProfiles'

export const getArticle = (params) => {
  return  getReq({url, params})
}
```


修改*pages*文件夹中的*about.js*：

```javascript
//...
import { getArticle } from './api/aboutApi'
//...

//...
<List header={id + " : " + name + "的一个列表"}>
    {
        props.footPrintRespList.map(item => (
            <List.Item title="" description={item.userId} key={item.userId}>
                <Avatar src={item.avatar} style={{ '--size': '60px', borderRadius: '30px', float: "right" }} />
                啦啦啦啦啦啦
            </List.Item>
        ))
    }
</List>
//...

//...
export const getServerSideProps = async () => {
    let result = await getArticle({})
    // let { data: { data } } = result.data
    let data = result.data.data
    return {
        props: {
            ...data
        }
    }
}
//...
```

也可以使用**getStaticProps**：


1. 构建时预渲染SSG：应用构建时获取一次数据，之后不变。


2. 在返回的对象中增加*revalidate*字段，每隔多少秒拉去一次数据，如果有新数据重新生成新的静态页面，如果失败不更新，使用之前缓存的页面：


```javascript
//...
export async function getStaticProps() {
  const data = await fetch('https://xxxx')
  return {
    props: {
      ...data,
    },
    revalidate: 1000,
  }
}
//...
```


一般与**getStaticPaths**指定路由根据数据预渲染页面一起使用，这两种都是直接生成静态页面


**getServerSideProps**是ssr，每次请求都会重新生成新的静态页面


## 发布

修改*package.json*：

```bash
//...
"start": "next build && next start",
//...
```

每次运行时，自动build一次


## 部署


一版使用PM2守护进程，在服务器端或本机安装，某些服务器厂商也会有一键部署或辅助部署的工具或已经设置好的服务器：

```bash
npm i -g pm2
```


也可使用配置文件*ecosystem.config*


将build后的文件夹或项目文件夹上传到服务器



进入build文件夹或项目文件夹然后使用：

```bash
pm2 start npm --name 'indeex-demo' -- run build
```

然后是根据端口，配置nginx即可，端口可根据需求修改，也可以运行时指定：

```bash
"start": "next build && next start -p 8080",
```

## 导出页面


如果不想使用node服务部署，也可以导出页面，直接放到服务器上面：

```bash
"export": "next export",
```

导出后就是普通带有*.html*的页面，导出的页面资源路径为服务器的*/*，如果需要放入服务器二级目录，需要修改*next.config.js*：

```javascript
//...

basePath: "/nextjs-demo",

//...
```

然后重新build，然后重新export。如果想要区分开发和生产环境，在配置里自行区分，在其他路径中配置即可。



## PC端


PC端只需要将*antd-mobile*改为*antd*，然后在*postcss.config.js*中增加相关样式类即可，也可以直接去掉px2rem的配置。



服务器端渲染比较适合偏静态类页面或一些简单请求的页面，如官网、宣传页、博客、论坛、新闻等。


预览地址：https://hungking.org/nextjs-demo/