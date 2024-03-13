import axios from "axios";


const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async peopleObject => {
    const response = await axios.post(baseUrl, peopleObject)
    return response.data
}

const update = async (id, peopleObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, peopleObject)
    return response.data 
}
// eslint-disable-next-line
export default { getAll, create, update }
