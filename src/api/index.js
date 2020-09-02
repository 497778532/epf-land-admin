import axios from 'axios'
import apiConfig from '../utils/config'
import qs from 'qs'
// const baseURL = process.env.NODE_ENV === 'production' ? 'http://epf3.cross.echosite.cn' : 'http://epf3.cross.echosite.cn'
const baseURL = apiConfig.baseURL1;
// 合同网签鉴证
export async function getAddTransNotice({
    // function,
    transNotice,
    targetIds,
    bankIds,
    id,
    noticeId,
    noticeNo,
    title,
    noticeDate,
    noticeType,
    fileTemplateCode,
    content,
    publishUserId,
    publishDate,
    actProiId,
    }) {
    return axios.post(baseURL+'/epf-trade/admin/transnotice/addTransNotice', {
        params: {
            // function,
            transNotice,
            targetIds,
            bankIds,
            id,
            noticeId,
            noticeNo,
            title,
            noticeDate,
            noticeType,
            fileTemplateCode,
            content,
            publishUserId,
            publishDate,
            actProiId,
        },
    })
}
export async function getDataPage({
    pageIndex,pageSize
}){
    return axios.post(baseURL+'epf-contract/transContract/page',{
        params:{
            token:token,
            pageIndex:pageIndex,
            pageSize:pageSize,
            id:id,
            code:code,
            signType:signType,
            contractType:contractType,
            beginDate:beginDate,
            endDate:endDate,
            status:status
        }
    })
}