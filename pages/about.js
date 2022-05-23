/*
 * @Author: indeex
 * @Date: 2019-05-19 19:54:39
 * @Email: indeex@qq.com
 */
import { getArticle } from './api/aboutApi'
import { Button, Avatar, List } from 'antd-mobile';
import { useRouter } from 'next/router';

function About(props) {
    const router = useRouter()

    const { id, name } = router.query

    const handleBack = () => {
        router.push({ pathname: '/', query: {} })
    }

    return (
        <div>
            <Button onClick={handleBack}>返回</Button>
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

        </div>
    )
}

// export const getServerSideProps = async () => {
export const getStaticProps = async () => {
    let result = await getArticle({})
    // let { data: { data } } = result.data
    let data = result.data.data
    return {
        props: {
            ...data
        }
    }
}

export default About