import axios from "axios";

const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
    console.log(token)
}
//const getAll = () => {
//   return axios.get(baseUrl)
// }
// 原来的函数直接返回axios方法返回的promise
// 修改后，只返回response.data
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(reponse => reponse.data)
}

// 异步函数
const create = async newObject => {
    const config = {
        // headers: { Authorization: token },
        headers: { Authorization: token },
    }
    const request = axios.post(baseUrl, newObject, config)
    const response = await request;
    return response.data;
}

const update = (id, newObject) => {

    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update, setToken }