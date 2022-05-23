import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import stylesPc from '../styles/pc.module.scss'
import { Button, Steps, Avatar, List, Space } from 'antd-mobile';
import {
  CheckCircleFill,
  ClockCircleFill,
  HandPayCircleOutline,
} from 'antd-mobile-icons';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()

  const handleAvatar = () => {
    router.push({pathname: 'about', query: {id: 666, name: "indeex"}})
  }
  return (
    <div className={styles.container}>
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
      <div className={styles.lalala}>啦啦啦</div>
      <div className={styles.rect}></div>
      
      <div className={'pc ' + stylesPc.pcContainer}>PC上显示</div>

      <Button onClick={handleAvatar}>跳转到关于页面</Button>

      <Avatar src="" style={{ '--size': '54px', borderRadius: '30px' }} />
      <List header="当前进程">
        <List.Item extra="未开启" clickable>
          大字号模式
        </List.Item>
        <List.Item description="管理已授权的产品和设备" clickable>
          授权管理
        </List.Item>
        <List.Item title="这里是标题">这里是主信息</List.Item>
      </List>
      <Steps
        direction="vertical"
        current={1}
        style={{
          '--title-font-size': '17px',
          '--description-font-size': '15px',
          '--indicator-margin-right': '12px',
          '--icon-size': '22px',
        }}
      >
        <Steps.Step
          title="填写机构信息"
          description="这里是一些描述"
          icon={<CheckCircleFill />}
        />
        <Steps.Step
          title="签约机构"
          description={
            <Space block direction="vertical">
              <div>这里是一些描述</div>
              <Button color="primary">去查看</Button>
            </Space>
          }
          icon={<ClockCircleFill />}
        />
        <Steps.Step
          title="关联服务区"
          description="这里是一些描述"
          icon={<HandPayCircleOutline />}
        />
      </Steps>

    </div>
  )
}
