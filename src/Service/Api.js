import axios from "axios"

const API_URL = 'http://localhost:3003/customer'

// Post 
export const addCustomer = async (data) => {
    try {
        return await axios.post(API_URL, data)
    }
    catch (error) {
        console.log('Error while calling addUser API', error.message)
    }
}

// Get 
export const getCustomers = async () => {
    try {
        return await axios.get(API_URL)
    }
    catch (error) {
        console.log('Error while calling getUsers API', error.message)
    }
}

// Delete 
export const deleteCustomer = async (id) => {
    try {
        return await axios.delete(`${API_URL}/${id}`)
    }
    catch (error) {
        console.log('Error while calling deleteUser API', error.message)
    }
}

// Edit 

export const getUser = async (data) => {
    try {
        return await axios.get(`${API_URL}/${data}`)
    }
    catch (error) {
        console.log('Error while calling getUser API', error.message)
    }
}


export const editCustomer = async (data, id) => {
    try {
        return await axios.put(`${API_URL}/${id}`, data)
    }
    catch (error) {
        console.log('Error while calling editUser API', error.message)
    }
}


