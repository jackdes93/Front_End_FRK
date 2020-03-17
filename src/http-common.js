import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)
const base_url_production = 'http://localhost/api/v1'
const auth_url_customer = localStorage.getItem('access_token') != undefined ? `Bearer ${localStorage.getItem('access_token')}` : ''
const auth_ur_manager = localStorage.getItem('token_manager') != undefined ? `Bearer ${localStorage.getItem('token_manager')}` : ''
// var base_url_production = 'http://franchiseking.vn/api/v1'

export const HTTP = axios.create({
    baseURL: base_url_production,  
    headers: {
        Authorization: auth_url_customer
    }
})

export const HTTP_ADMIN = axios.create({
    baseURL: base_url_production, 
    headers: {
        Authorization: auth_ur_manager
    }
})