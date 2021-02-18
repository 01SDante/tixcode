/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export default {
    getCoordinates: async function(address) {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDqLScR5cAaNwjQpgMo9L-A07K9mr2RnbU&address=${address}`)
            return response
        } catch (error) {
            throw error
        }
    }
}