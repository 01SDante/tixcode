/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export default {
    login: async function(body) {
        try {
            const response = await axios.post('/api/users/login', body)
            return response
        } catch (error) {
            throw error
        }
    },
    signup: async function(body) {
        try {
            const response = await axios.post('/api/users/signup', body)
            return response
        } catch (error) {
            throw error
        }
    },
    getUsers: async function(token) {
        try {
            const response = await axios.get('/api/users', {headers: {Authorization: `Bearer ${token}`}} )
            return response
        } catch (error) {
            throw error
        }
    },
    getUser: async function(userId, token) {
        try {
            const response = await axios.get(`/api/users/${userId}`, {headers: {Authorization: `Bearer ${token}`}} )
            return response
        } catch (error) {
            throw error
        }
    }
}