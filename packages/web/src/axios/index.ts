
import axios from "axios"

import { ElMessage } from 'element-plus'
axios.defaults.baseURL = "http://localhost:3000"

axios.interceptors.request.use(function (req) {
    return req
})

axios.interceptors.response.use((res) => {
    // console.log(res.response.data.statusCode,res.response.data.message)
    return res
}, err => {
    console.log(err, "er")
    let msg = ''
    const errData = err.response.data
    switch (errData.statusCode) {
        case 400:
            msg = errData.message.join(',')
    }
    ElMessage.error(msg)
})

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: object) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url: string, params: object) {
    console.log(params)
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}


export default axios