<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">User Waiting List</p>
            </div>
            <div class="form-group row-group width-full">
                    <div class="block-list-row width-full padding-full border-bottom-ol">
                        <div class="block-item-row-header" style="max-width: 48px;">
                            <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 140px;">
                            <p class="label text-color-second ">{{$t('user_page.full_name')}}</p>
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
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('user_page.status')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 140px;">
                            <p class="label text-color-second ">{{$t('action')}}</p>
                        </div>
                    </div>
                </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group row-group padding-full" v-if="customers_wait.length == 0">
                   <span class="label text-center width-full">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation" v-else v-for="(customer, index) in customers_wait" :key="index">
                    <div class="block-item-row" style="max-width: 48px;">
                        <p class="label-cell ">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <p class="label-cell ">{{customer.full_name}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{customer.email}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <p class="label-cell">{{customer.phone_number}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{customer.address}}</p>
                    </div>
                     <div class="block-item-row">
                        <p class="label-cell bold" v-bind:class="{'color-red' : customer.status_account == 'DEACTIVE'}">{{customer.status_account}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <a  class="label-cell flex-box" v-on:click="handle_show_detail(customer)">{{$t('see_more')}}</a>
                    </div>
                </div>
            </form>
        </div>
         <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="customer_selected">
        <div class="block-alert padding-full">
            <div class="block-header bg-title-header padding-full header-fix width-full">
                <p class="title-form"> {{$t('user_page.detail_info')}}</p>
            </div>
            <ValidationObserver v-slot="{ invalid }" style=" width: 100%; justify-content: center; display: flex;">
                <form class="block-form" @submit.prevent="handle_update_info">
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('name_customer')}}</span>
                        <input type="text" class="border-bottom-ol margin-bottom" name="full_name" v-model="customer_selected.full_name" readonly>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">Email</span>
                        <input type="text" class="border-bottom-ol margin-bottom" name="email" v-model="customer_selected.email" readonly>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('form_joining.address')}}</span>
                        <input type="text" class="border-bottom-ol margin-bottom" name="address" v-model="customer_selected.address" readonly>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('form_joining.phone_number')}}</span>
                        <input type="text" class="border-bottom-ol margin-bottom" name="phone_number" v-model="customer_selected.phone_number" readonly>
                    </div>
                    <div class="form-group col-group" >
                        <span class="label-span margin-bottom">{{$t('user_page.status')}}</span>
                        <ValidationProvider name="category" rules="required" v-slot="{ errors }" style="width: 100%;">
                            <select name="category"  class="list-joining" v-model="customer_selected.status_account" >
                                <option v-bind:value="item" v-for="(item, index) in status" :key="index">{{item}}</option>
                            </select>
                        </ValidationProvider>
                    </div>
                    <div class="form-group row-group" style="justify-content: center;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="customer_selected = null">{{$t('cancel')}}</div>
                        <button class="btn btn-signup" :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid">{{$t('save')}}</button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
    </div>
</template>

<script>
import { HTTP_ADMIN } from '../../../../http-common';
export default {
    data() {
        return {
            customers_wait : [],
            customer_selected: null,
            status: ['DEACTIVE', 'ACTIVE']
        }
    },
    methods: {
        handle_get_customers_await() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/customers/customer-waiting').then(result => {
                    resolve(result)
                    this.customers_wait = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log('Error: ' + error)
                })
            })
        },
        handle_show_detail(customer) {
            this.customer_selected = customer
        },
        handle_update_info() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch('/customers/change-status/' + this.customer_selected.id, {status: this.customer_selected.status_account}).then(result => {
                    resolve(result)
                    this.handle_get_customers_await()
                    
                })
                .catch(error => {
                    reject(error)
                    console.log('Error: ' + error)
                })
            })
        }
    },
    created() {
        this.handle_get_customers_await()
    }
}
</script>