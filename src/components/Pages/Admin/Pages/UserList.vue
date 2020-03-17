<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED; padding-bottom: 16px;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('manager.user_list')}}</p>
            </div>
            <div class="flex-box block-search margin-fix-right" style="justify-content: flex-end; width: 100%">
                <ul class="form-group row-group" style="width: 100%; justify-content: flex-start; list-style: none; padding-left: 20px;">
                    <li class="item padding-right" v-on:click="handle_choose_tab('All')">
                        <p class="label text-color-second" v-bind:class="{'active' : tab_choose == 'All'}">{{$t('manager.all_user')}}</p>
                    </li>
                    <li class="item padding-right" v-on:click="handle_choose_tab('Free')">
                        <p class="label text-color-second" v-bind:class="{'active' : tab_choose == 'Free'}">{{$t('manager.free_user')}}</p>
                    </li>
                    <li class="item" v-on:click="handle_choose_tab('Owner')">
                        <p class="label text-color-second" v-bind:class="{'active' : tab_choose == 'Owner'}">{{$t('manager.user_owner')}}</p>
                    </li>
                </ul>
                <div class="form-group row-group" style="align-items: flex-end; max-width: 300px">
                    <input type="text" :placeholder="`${$t('search')}`" class="border-bottom-ol" v-model="search_text">
                </div>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header" style="max-width: 48px;">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('user_page.full_name')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('gender')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('user_page.birthday')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">Email</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('form_joining.phone_number')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('form_joining.address')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('action')}}</p>
                    </div>
                </div>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px; overflow-y: scroll;">
                <div class="form-group row-group border-bottom-ol padding-full row-animation" v-for="(user, index) in filter_search" :key="index">
                    <div class="block-item-row" style="max-width: 48px;">
                        <p class="label-cell ">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <p class="label-cell ">{{user.full_name}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <p class="label-cell ">{{user.gender == 'MALE' ? $t('male') : $t('female')}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <p class="label-cell ">{{user.birthday}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{user.email}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <p class="label-cell">{{user.phone_number}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{user.address}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <a v-on:click="handle_change_status(user)" class="label-cell flex-box"><i class="fas" v-bind:class="{ 'fa-lock' : user.status_account == 'LOCK', 'fa-lock-open' : user.status_account == 'ACTIVE'}"></i></a>
                        <!-- <a v-on:click="handle_delete_account(user)" class="label-cell flex-box"><i class="fas fa-trash-alt"></i></a> -->
                        <a v-on:click="handle_selected_user(user)" class="label-cell flex-box"><i class="fas fa-info-circle"></i></a>
                    </div>
                </div>
            </form>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="user_selected">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{user_selected.full_name}}</p>
                </div>
                    <form class="block-form" style="width: 85%;">
                        <div class="form-group row-group">
                            <div class="form-group col-group margin-fix-right">
                                <span class="label-span margin-bottom">{{$t('name')}} </span>
                                <input type="text" class="border-bottom-ol margin-bottom" name="name_customer" v-model="user_selected.full_name" readonly>
                            </div>
                            <div class="form-group col-group margin-fix-right">
                                <span class="label-span margin-bottom">{{$t('gender')}} </span>
                                <p class="border-bottom-ol margin-bottom" style="width: 100%"> {{user_selected.gender == 'MALE' ? $t('male') : $t('female')}}</p>
                            </div>
                            <div class="form-group col-group">
                                <span class="label-span margin-bottom">Email </span>
                                <input type="text" class="border-bottom-ol margin-bottom" name="email" v-model="user_selected.email" readonly>
                            </div>
                        </div>
                        <div class="form-group row-group">
                            <div class="form-group col-group margin-fix-right">
                                <span class="label-span margin-bottom">{{$t('form_joining.address')}} </span>
                                <input type="text" class="border-bottom-ol margin-bottom" name="name_customer" v-model="user_selected.address" readonly>
                            </div>
                            <div class="form-group col-group margin-fix-right">
                                <span class="label-span margin-bottom">{{$t('form_joining.phone_number')}} </span>
                                <input type="text" class="border-bottom-ol margin-bottom" name="email" v-model="user_selected.phone_number" readonly>
                            </div>
                            <div class="form-group col-group margin-fix-right">
                                <span class="label-span margin-bottom">{{$t('user_page.birthday')}}</span>
                                <input type="text" class="border-bottom-ol margin-bottom" name="birthday" v-model="user_selected.birthday" readonly>
                            </div>
                        </div>
                        <div class="form-group row-group" style="flex-wrap: wrap">
                            <div class="form-group col-group" v-for="(item, index) in brands_of_user" :key="index" style="width: 25%; justify-content: center; align-items: center;">
                                <img v-bind:src="`http://franchiseking.vn/${item.image_source.logo}`" v-bind:alt="`${item.name}`" style="width: 120px;">
                                <router-link class="label-cell width-full margin-fix-top" style="font-size: 16px; text-align: center" :to="`/${item.id_category}/${item.name_vietnamese}`">{{item.name}}</router-link>
                            </div>
                        </div>
                        <div class="form-group row-group flex-row-center" style="justify-content: center">
                            <button class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="user_selected = null">{{$t('cancel')}}</button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP_ADMIN } from '../../../../http-common';
import { socket_bus } from '../../../../main';
export default {
    data() {
        return {
            users: [],
            templ_users:[],
            user_selected: null,
            brands_of_user: [],
            search_text: '',
            tab_choose: 'All'
        }
    },
    methods: {
        handle_get_users() {
            HTTP_ADMIN.get('/customers').then(result => {
                this.users = result.data.status == 200 ? result.data.data : []
                this.templ_users = this.users
            }).catch(error => {
                console.log(error)
            })
        },
        handle_change_status(item) {
            const current_status = item.status_account == 'ACTIVE' ? 'LOCK' : 'ACTIVE'
            socket_bus.$emit('CHANGE_STATUS', {is_show: true, message: current_status + ' ?', brand: item})
        },
        handle_delete_account(item) {
            socket_bus.$emit('DELETE_ACCOUNT', {is_show: true, message: 'Delete ' + item.full_name + ' ?', brand: item})
        },
        handle_selected_user(user) {
            this.user_selected = user
            this.handle_get_brand_of_customer(user.id)
        },
        handle_get_brand_of_customer(id_customer) {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/brands/brand-customer/' + id_customer).then(result => {
                    resolve(result.data)
                    this.brands_of_user = result.data.status == 200 ? result.data.data : [];
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_choose_tab(tab) {
            switch(tab) {
                case 'All':
                    this.tab_choose = 'All'
                    this.handle_get_users()
                    break;
                case 'Free':
                    this.tab_choose = 'Free'
                    this.users = this.templ_users.filter(item => {return item.level != 'BRAND OWNER'})
                    break;
                case 'Owner':
                    this.tab_choose = 'Owner'
                    this.users = this.templ_users.filter(item => {return item.level == 'BRAND OWNER'})
                    break;
            }
        }
    },
    computed: {
        filter_search() {
            return this.users.filter(user => { return user.email.includes(this.search_text) || user.full_name.includes(this.search_text) || user.phone_number.includes(this.search_text)})
        }
    },
    created() {
        this.handle_get_users()
        socket_bus.$on('RESPONSE_STATUS', result => {
            if(result.is_delete) {
                const current_status = result.data.status_account == 'ACTIVE' ? 'LOCK' : 'ACTIVE'
                return new Promise((resolve, reject) => {
                    HTTP_ADMIN.patch('/customers/change-status/' + result.data.id, {status: current_status})
                    .then(result => {
                        resolve(result)
                        this.handle_get_users()
                    })
                    .catch(error => {
                        reject(error)
                        console.log('Error Change Status : ' + error);
                    })
                })
            }
        })

        socket_bus.$on('RESPONSE_DELETE_CUSTOMER', result => {
            if(result.is_delete) {
                return new Promise((resolve, reject) => {
                    HTTP_ADMIN.delete('/customers/' + result.data.id).then(result => {
                        resolve(result)
                        this.handle_get_users
                    })
                    .catch(error => {
                        reject(error)
                        console.log('Error Change Status : ' + error);
                    })
                })
            }
        })
    }
}
</script>