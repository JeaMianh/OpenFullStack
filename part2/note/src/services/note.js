import axios from "axios";

const baseUrl = 'http://localhost:3001/api/notes'

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
    const request = axios.post(baseUrl, newObject)
    const response = await request;
    return response.data;
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }