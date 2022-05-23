/*
 * @Author: indeex
 * @Date: 2019-05-19 19:58:15
 * @Email: indeex@qq.com
 */
import { getReq } from "../../utils/axios"

const url = 'https://www.fastmock.site/mock/2aeaa7d7a3b169abc7931f5e4cf75eb9/live/getProfiles'

export const getArticle = (params) => {
  return  getReq({url, params})
}