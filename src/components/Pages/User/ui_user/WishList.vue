<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('user_page.your_brand_wish')}}</p>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header" style="width: 42px !important; flex-grow: 0.25;">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                    </div>
                    <div class="block-item-row-header margin-fix-right" style="max-width: 64px; width: 64px; ">
                        <p class="label text-color-second ">{{$t('user_page.logo')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('form_joining.category')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('user_page.brand_name')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('user_page.pricing')}}</p>
                    </div>
                    <div class="block-item-row-header" style="width: 200px !important;">
                        <p class="label text-color-second ">{{$t('form_joining.location')}}</p>
                    </div>
                    <div class="block-item-row-header" style="justify-content: flex-end; margin-right: 32px;">
                        <p class="label text-color-second ">{{$t('remove')}}</p>
                    </div>
                </div>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group width-full flex-row-center" v-if="wish_list.length == 0">
                    <h5>{{$t('nodata')}}</h5>
                </div>
                <div class="form-group col-group width-full" v-else >
                    <div class="block-list-row width-full " style="align-items: center; margin: 10px 0" v-for="(item, index) in wish_list" :key="index">
                        <div class="block-item-row-header" style="width: 42px !important; flex-grow: 0.25;">
                            <p class="label text-color-second ">{{index + 1}}</p>
                        </div>
                        <div class="block-item-row logo-brand margin-fix-right" style="width: 64px; max-width: 64px !important; height: 64px; border: none;">
                            <img v-bind:src="`http://franchiseking.vn/${item.image_source.logo}`" v-bind:alt="`${item.name}`" >
                        </div>
                        <div class="block-item-row-header" style="max-width: 140px;">
                            <p class="label text-color-second ">{{item.id_category}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <router-link class="label-cell width-full bold" style="font-size: 16px;" :to="`/${item.id_category}/${item.name_vietnamese}`">{{item.name}}</router-link>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{item.price.toLocaleString()}} <sup>đ</sup> </p>
                        </div>
                        <div class="block-item-row-header" >
                            <p class="label text-color-second ">{{item.location.toString()}}</p>
                        </div>
                        <div class="block-item-row-header" style="justify-content: flex-end; margin-right: 32px;">
                            <a class="label text-color-second" v-on:click="handle_remove_brand_wishlist(item)">{{$t('remove')}}</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { HTTP } from '../../../../http-common'

export default {
     data() {
        return {
            customer: {},
            wish_list: [],
            result_wish: false,
            result_customer: false
        }
    },
    methods: {
        handle_get_info_wish_list(id) {
            return new Promise((resolve) => {
                HTTP.get('brands/list-brand-wish-list/' + id).then(result => {
                    resolve(result.data)
                    this.wish_list = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    console.log(error);
                })
            })
        },
        handle_update_wish_list(id_customer, id_brand) {
            return new Promise((resolve, reject) => {
                HTTP.patch('/wish/remove-user/' + id_brand, {id_customer: id_customer}).then(result => {
                    resolve(result.data)
                    this.result_wish = result.data.status == 200 ? true : false;
                })
                .catch(error => {
                    reject(error)
                    console.log('Error :' + error)
                })
            })
        },
        handle_update_wish_list_customer(id_customer, id_brand) {
            return new Promise((resolve, reject) => {
                HTTP.patch('/customers/remove-brand-wish-list/' + id_customer, {id_brand: id_brand}).then(result => {
                    resolve(result.data)
                    this.result_customer =  result.data.status == 200 ? true : false;
                })
                .catch(error => {
                    reject(error)
                    console.log('Error :' + error)
                })
            })
        },
        handle_remove_brand_wishlist(brand) {
            this.handle_update_wish_list(this.customer._id, brand._id);
            this.handle_update_wish_list_customer(this.customer.id, brand._id)
            this.handle_get_info_wish_list(this.customer.id)
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
            this.handle_get_info_wish_list(this.customer.id)
        }
    }
}
</script>