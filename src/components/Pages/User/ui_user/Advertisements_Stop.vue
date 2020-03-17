<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="form-group row-group" v-if="brand.length == 0">
            <span class="label-span text-center width-full">{{$t('nodata')}}</span>
        </div>
        <div class="form-group col-group" v-else>
            <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="background: #EDEDED; margin-bottom: 56px;"  v-for="(item, index) in brand" :key="index">
                <div class="block-header bg-title-header padding-full header-fix">
                    <p class="title-form">{{$t('your_adver_of')}} {{item.name}}</p>
                </div>
                <!-- <div class="form-group row-group" style="justify-content: flex-end">
                    <button class="btn btn-signup primary-color" style="color: #FFF; " v-on:click="handle_create_add(item)">{{$t('user_page.new_advertisment')}}</button>
                </div> -->
                <div class="form-group row-group width-full">
                    <div class="block-list-row width-full padding-full border-bottom-ol" >
                        <div class="block-item-row-header" style="max-width: 128px;">
                            <p class="label text-color-second ">{{$t('kind')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 148px;">
                            <p class="label text-color-second ">{{$t('user_page.pricing')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 128px;">
                            <p class="label text-color-second ">{{$t('estimate')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('date_start')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second">{{$t('position')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second">{{$t('payment_code')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('user_page.pricing')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('action')}}</p>
                        </div>
                    </div>
                </div>
                <form class="block-form width-full" style="padding: 0 8px 16px 8px;">
                    <div class="form-group row-group border-bottom-ol padding-full row-animation"  v-for="(adv, index) in item.adv" :key="index">
                        <div class="block-item-row" style="max-width: 128px;">
                            <p class="label-cell">{{adv.adversiting_type}}</p>
                        </div>
                        <div class="block-item-row" style="max-width: 148px;">
                            <p class="label-cell bold">{{adv.price.toLocaleString()}} <sup>đ</sup></p>
                        </div>
                        <div class="block-item-row" style="max-width: 128px;">
                            <p class="label-cell">{{ adv.adversiting_status != 'STOP' ? handle_cal_estimate_time(adv.start_time, adv.adversiting_time) : 0}} {{$t('day')}}</p>
                        </div>
                        <div class="block-item-row">
                            <p class="label-cell">{{new Date(adv.start_time).getDate()}}/{{new Date(adv.start_time).getUTCMonth() + 1}}/{{new Date(adv.start_time).getFullYear()}}</p>
                        </div>
                        <div class="block-item-row">
                            <p class="label-cell">{{!adv.position ? 'Any' : adv.position}}</p>
                        </div>
                        <div class="block-item-row">
                            <p class="label-cell bold">{{adv.payment_code}}</p>
                        </div>
                        <div class="block-item-row" style="max-width: 240px;">
                            <p class="label-cell bold text-uppercase" v-bind:class="{'color-red' : adv.adversiting_status == 'STOP', 'color-green' : adv.adversiting_status == 'START', 'color-orange' : adv.adversiting_status == 'PROCESSING'}">{{handle_translate_state(adv.adversiting_status)}}</p>
                        </div>
                    <div class="block-item-row" style="justify-content: flex-end; align-items: flex-end; flex-direction: row">
                            <!-- <a v-on:click="handle_edit(adv,item)" class="label-cell flex-box"><i class="fas fa-edit"></i></a> -->
                            <span class="label-span flex-box" v-on:click="handle_preview(adv, item)" v-if="adv.adversiting_type != 'RECOMMEND' && adv.adversiting_status != 'PROCESSING'"><i class="far fa-eye black"></i></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Form_Advertisment ></Form_Advertisment>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_edit">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('detail_adv_for')}} {{brand_selected.brand_name}} {{$t('brand')}}</p>
                </div>
                <form class="block-form" style="padding: 8px 16px!important; width: 85%;" @submit.prevent="handle_save()">
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('user_page.adver_type')}}</span>
                            <input class="border-bottom-ol" v-model="advertisement_selected.adversiting_type" readonly/>
                        </div>
                        <div class="form-group col-group ">
                            <span class="label-span margin-bottom">{{$t('user_page.adver_position')}}</span>
                            <input class="border-bottom-ol" v-model="advertisement_selected.position" readonly/>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('user_page.page_show')}}</span>
                            <input class="border-bottom-ol" v-model="advertisement_selected.page" readonly/>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('user_page.adver_time')}}</span>
                            <input class="border-bottom-ol" v-model="advertisement_selected.adversiting_time" readonly/>
                        </div>
                    </div>
                    
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('note')}}</span>
                        <p>{{advertisement_selected.note == null ? `${$t('nodata')}` : advertisement_selected.note}}</p>
                    </div>
                    <div class="form-group col-group margin-fix-right" v-if="advertisement_selected.adversiting_type != 'HOTLABEL' && advertisement_selected.adversiting_type != 'RECOMMEND'">
                        <span class="label-span margin-bottom">Banner</span>
                        <div class="form-group margin-bottom" v-if="url_preview">
                            <span class="label-span" v-on:click="handle_delete_link()"><i class="fas fa-times-circle"></i></span>
                            <img v-bind:src="url_preview" :alt="banner.name" style="width: 100%; height: 200px; object-fit: contain;">
                        </div>
                        <ValidationProvider name="banner" rules="required" v-slot="{ errors }" style="width: 100%;">
                            <input type="file" name="banner" ref="banner" v-on:change="handleFileUpload">
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group row-group" style="justify-content: center; margin-top: 10px;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_edit = false">{{$t('edit')}}</div>
                        <button type="submit" class="btn btn-signup primary-color" style="color: #FFF">{{$t('save')}}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_preview">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('image')}} {{brand_name}} {{$t('footer.advertisement')}}</p>
                </div>
                <div class="form-group col-group" style="height: 180px;">
                    <img :src="`${adv_preview.banner_file}`" :alt="`${adv_preview.banner_file}`">
                </div>
                <div class="form-group row-group" style="justify-content: center">
                    <button class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_preview = false">{{$t('cancel')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form_Advertisment from './CreateNewAdvertisement'
import { HTTP } from '../../../../http-common';

export default {
    components:{
        Form_Advertisment
    },
    data() {
        return {
            is_add : false,
            is_edit: false,
            is_preview: false,
            customer: {},
            advertisements: [],
            brand:[],
            brand_selected: {},
            advertisement_selected: {},
            banner: '',
            payment_code: '',
            adv_preview: null,
            brand_name: ''
        }
    },
    methods: {
        handle_preview(item, brand) {
            this.is_preview = true
            this.adv_preview = item
            this.brand_name = brand.name
        },
        handle_translate_state (state) {
            switch(state) {
                case 'START':
                    return this.$t('start')
                case 'STOP':
                    return this.$t('stop')
                case 'PROCESSING':
                    return this.$t('processing')
            }
        },
        handle_load_advertisement() {
            return new Promise((resolve, reject) => {
                HTTP.get(`/advertisements/advertisement-stop&customer=${this.customer.id}`).then(result => {
                    resolve(result)
                    this.brand = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_cal_estimate_time(date_start, range) {
          const time_start = new Date(date_start).getTime()
          const time_current = new Date(Date.now()).getTime()
          var estimate = 0
          if(time_current >= time_start) {
            estimate = range - ((time_current - time_start) / (1000 * 24 * 3600))
            estimate = estimate > 0 ? estimate.toFixed(1) : 0
          } else {
            estimate = range
          }
          return estimate
        },
        
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
        }

        this.handle_load_advertisement()
    }
}
</script>