<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 700px; background: #EDEDED; padding-bottom: 32px;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('top_wish_brand')}}</p>
            </div>
            <div class="form-group row-group" style="justify-content: flex-end">
                <download-excel
                    :data= "json_data" 
                    :title= "titles"
                    :fields = "json_fields"
                    worksheet = "all_brand"
                    :name = "name_file"
                    class="btn-dwn-report text-color-primarry">
                    {{$t('report.download_report')}}
                    <span><i class="fas fa-print"></i></span>
                </download-excel>
            </div>
            <div class="form-group row-group width-full">
                <div class="form-group row-group width-full">
                    <div class="block-list-row width-full padding-full border-bottom-ol">
                        <div class="block-item-row-header margin-fix-right" style="max-width: 64px; width: 64px; justify-content: center;">
                            <p class="label text-color-second ">{{$t('report.rank')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 160px; margin: 0 8px;">
                            <p class="label text-color-second ">{{$t('report.owner')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 220px;">
                            <p class="label text-color-second ">{{$t('user_page.brand_name')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 200px;">
                            <p class="label text-color-second ">{{$t('price')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('form_joining.category')}}</p>
                        </div>
                        <div class="block-item-row-header" style="width: 200px; flex: none;">
                            <p class="label text-color-second" style="text-align:left;">{{$t('report.brand_type')}}</p>
                        </div>
                        <div class="block-item-row-header" style="display: flex; justify-content: center;">
                            <p class="label text-color-second" style="text-align: left">{{$t('amount_wish')}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group padding-full flex-row-center" v-if="brands.length == 0">
                <span class="label-cell">{{$t('nodata')}}</span>
            </div>
            <div class="form-group col-group" style="padding: 0 8px 16px 8px; max-height: 700px; overflow: auto;">
                <div class="form-group border-bottom-ol padding-full row-animation" style="align-items: center;" v-for="(item,index) in brands" :key="index">
                    <div class="block-item-row logo-brand margin-fix-right" style="width: 64px; border: none;">
                        <p class="label text-color-second">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 160px; margin: 0 8px;">
                        <p class="label-cell">{{item.owner.full_name}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 220px;">
                        <a class="label-cell width-full" style="font-size: 16px;" v-bind:href="`/#/brand/${item._id}`">{{item.name_brand}}</a>
                    </div>
                    <div class="block-item-row " style="max-width: 200px;">
                        <p class="label-cell bold">{{item.price.toLocaleString() }} <sup>đ</sup></p>
                    </div>
                    <div class="block-item-row " style="max-width: 360px; margin-right: 8px;">
                        <p class="label-cell text-overflow" >{{item.category}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{item.level}}</p>
                    </div>
                    <div class="block-item-row" style="display: flex; justify-content: center;">
                        <p class="label text-color-second">{{item.amount_user_wish ? item.amount_user_wish : 0}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { HTTP, HTTP_ADMIN } from '../../../../http-common';
import JsonExcel from 'vue-json-excel'

Vue.component('download-excel', JsonExcel)

export default {
    data() {
        return {
            brands: [],
            titles: [],
            name_file: '',
            json_fields: {
                'OWNER' : 'full_name',
                'BRAND NAME' : 'brand_name',
                'PRICE' : 'price',
                'CATEGORY': 'category',
                'BRAND TYPE' : 'level',
                'AMOUNT WISH': 'amount_user_wish'
            },
            json_data: [],
        }
    },
    methods: {
        handle_get_brand() {
            return new Promise((resolve, reject) => {
                const current_date = new Date()
                HTTP_ADMIN.get('/reports/wish-list-brand').then(result => {
                    resolve(result)
                    this.brands = result.data.status == 200 ? result.data.data : []
                    this.titles.push('Summary Amount Wish Of Brand')
                    this.name_file = `SUMMARY_VIEW_OF_BRAND_${current_date.getDate()}_${current_date.getMonth() + 1}_${current_date.getFullYear()}.xls`
                    this.brands.map(item => {
                        this.json_data.push({
                            full_name: item.owner.full_name,
                            brand_name: item.name_brand,
                            price: item.price.toLocaleString(),
                            category: item.category,
                            level: item.level,
                            amount_user_wish : item.amount_user_wish ? item.amount_user_wish : 0
                        })
                    })
                }).catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        }
    },
    created() {
        this.handle_get_brand()
    }
}
</script>