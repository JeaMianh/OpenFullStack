import axios from "axios";


const baseUrl = '/api/persons'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async peopleObject => {
    const response = await axios.post(baseUrl, peopleObject)
    return response.data
}

const deleteP = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`)
        return response.data 
    } catch (error) {
        console.error('Delete failed:', error)
    }
}

const updateNumber = async (id, updatePerson) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, updatePerson)
        return response.data
    } catch (error) {
        console.error('Updata failed:', error)
        console.log('url', `${baseUrl}/${id}`)
    }
}

// eslint-disable-next-line
export default { getAll, create, deleteP, updateNumber }
