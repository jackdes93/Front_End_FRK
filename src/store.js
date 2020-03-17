import Vue from 'vue'
import Vuex from 'vuex'
import { HTTP } from './http-common'
import i18n from '@/lang/i18n.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        is_login: false,
    },
    mutations: {
        SET_LANG (state, payload) {
            i18n.locale = payload
        }
    },
    getters: {

    },
    actions: {
        setLang({commit}, payload) {
            commit('SET_LANG', payload)
            localStorage.setItem('lang', payload)
        },
        get_cities() {
            return new Promise((resolve, reject) => {
                HTTP.get('cities').then(result => {
                    resolve(result.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        get_categories() {
            return new Promise((resolve, reject) => {
                HTTP.get('categories').then(result => {
                    resolve(result.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        get_advertisement_type() {
            return new Promise((resolve, reject) => {
                HTTP.get('/advertising-type').then(result => {
                    resolve(result.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_register_account(data) {
            return new Promise((resolve, reject) => {
                HTTP.post('customers', data).then(result => {
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_sign_in({commit}, customer) {
            return new Promise((resolve, reject) => {
                HTTP.post('customers/login', customer).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        localStorage.setItem('access_token', result.data.access_token)
                        localStorage.setItem('customer', JSON.stringify(result.data.customer))
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_get_brands() {
            const customer = JSON.parse(localStorage.getItem('customer'))
            return new Promise((resolve, reject) => {
                HTTP.get('/brands/brand-customer/' + customer.id).then(result => {
                    resolve(result.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_sign_in_manager({commit}, manager) {
            return new Promise((resolve, reject) => {
                HTTP.post('/admin/login', manager).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        localStorage.setItem('token_manager', result.data.access_token)
                        localStorage.setItem('manager', JSON.stringify(result.data.customer))
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_add_wish_list({commit}, data) {
            return new Promise((resolve, reject) => {
                HTTP.patch('/wish/' + data.id_brand, {id_customer: data.id_customer}).then(result => {
                    resolve(result.data)
                })
                .catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_update_brand_into_wish_list_customer({commit}, data) {
            return new Promise((resolve, reject) => {
                HTTP.patch('/customers/wish-list/' + data.id_customer, {id_brand: data.id_brand}).then(result => {
                    resolve(result.data)
                }).catch(error => {
                    reject(error)
                    console.log(error);
                })
            })
        },
        handle_get_link_image() {
            return new Promise((resolve, reject) => {
                HTTP.get('/position-advertisement').then(result => {
                    resolve(result.data)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})