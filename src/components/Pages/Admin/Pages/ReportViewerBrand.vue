<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 700px; background: #EDEDED; padding-bottom: 32px;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('top_view')}}</p>
            </div>
            <div class="form-group row-group" style="justify-content: flex-end; position: relative">
                <div class="form-group col-group" >
                    <span class="label-span margin-bottom-fix">{{$t('brand')}}</span>
                    <select v-model="selected_type" class="selection-brand" style="max-width: 180px" @change="handle_change()">
                        <option value=null>-- {{$t('select_type')}}--</option>
                        <option value="0">{{$t('manager.all_brand')}}</option>
                        <option value="1">{{$t('brand')}}</option>
                    </select>
                </div>
                <div class="form-group col-group margin-fix-right" v-if="selected_type == 1">
                    <span class="label-span margin-bottom-fix">{{$t('user_page.brand_name')}}</span>
                    <input type="text" placeholder="Search...." class="border-bottom-ol" v-model="search_text" style="height: 48px" v-on:click="is_have_brand = true">
                </div>
                <div class="form-group col-group" v-if="list_brand_filter.length > 0 && is_have_brand" style="max-height: 280px; position: absolute; top: 76px; left: 380px;">
                    <ul class="list-city" >
                        <li class="item-city" v-for="(brand,i) in list_brand_filter" :key="i" v-on:click="handle_select_brand(brand)">
                            <p>{{brand.name}}</p>
                        </li>
                    </ul>
                </div>
                <div class="form-group col-group margin-fix-right">
                    <span class="label-span margin-bottom-fix">{{$t('date_from')}}</span>
                    <datepicker :placeholder="`${this.$t('date_from')}`" class="date_picker" style="justify-content: flex-start" :disabled-dates="disable_date_from"  :format="format"  v-model="date_from"></datepicker>
                </div>
                <div class="form-group col-group margin-fix-right">
                    <span class="label-span margin-bottom-fix">{{$t('date_to')}}</span>
                    <datepicker :placeholder="`${this.$t('date_to')}`" class="date_picker" style="justify-content: flex-start" :disabled-dates="disable_date_to" :format="format" v-model="date_to"></datepicker>
                </div>
                <div class="form-group row-group" style="max-width:160px; margin-top: 24px; ">
                    <span class="label-span margin-bottom-fix"></span>
                    <button class="btn btn-sign-up" v-on:click="handle_export()">{{$t('export')}}</button>
                </div>
                
            </div>
            <div class="form-group row-group" style="justify-content: flex-end">
                <download-excel
                    :data= "json_data" 
                    :title= "titles"
                    :fields = "json_fields"
                    worksheet = "all_brand"
                    :name = "name_file"
                    class="btn-dwn-report text-color-primarry" style="max-width:168px!important;">
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
                            <p class="label text-color-second" style="text-align: left">{{$t('view')}}</p>
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
                        <p class="label-cell">{{item.owner_brand.full_name}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 220px;">
                        <a class="label-cell width-full" style="font-size: 16px;" v-bind:href="`/#/brand/${item._id}`">{{item.name_brand}}</a>
                    </div>
                    <div class="block-item-row " style="max-width: 200px;">
                        <p class="label-cell bold">{{item.price.toLocaleString() }} <sup>đ</sup></p>
                    </div>
                    <div class="block-item-row " style="max-width: 360px; margin-right: 8px;">
                        <p class="label-cell text-overflow" >{{item.id_category}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{item.level}}</p>
                    </div>
                    <div class="block-item-row" style="display: flex; justify-content: center;">
                        <p class="label text-color-second">{{item.amount_viewer ? item.amount_viewer : 0}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { HTTP_ADMIN } from '../../../../http-common';
import JsonExcel from 'vue-json-excel'
import datepicker from 'vuejs-datepicker';

Vue.component('download-excel', JsonExcel)

export default {
    components: {datepicker},
    data() {
        return {
            format: 'dd/MM/yyyy',
            brands: [],
            list_brand: [],
            titles: [],
            name_file: '',
            json_fields: {
                'OWNER' : 'owner',
                'BRAND NAME' : 'brand_name',
                'PRICE' : 'price',
                'CATEGORY': 'category',
                'BRAND TYPE' : 'level',
                'VIEW': 'amount_viewer'
            },
            json_data: [],
            date_from: '',
            date_to: '',
            disable_date_from : {
                from: new Date(),
                ranges: []
            },
            disable_date_to : {
                from: new Date(),
                ranges: []
            },
            selected_type: null,
            data_report_brand: null,
            is_have_brand: false,
            search_text: '',
            id_brand: ''
        }
    },
    methods: {
        handle_change() {
            if(this.selected_type == 1) { 
                this.is_have_brand = true
            } else {
                this.is_have_brand = false
            }
            this.data_report_brand = []
            this.json_data = []
        },
        handle_select_brand(brand) {
            this.id_brand = brand.id
            this.search_text = brand.name
            this.is_have_brand = false
        },
        handle_get_brand_origin() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/brands').then(result => {
                    resolve(result)
                    result.data.data.map(brand => {
                        this.list_brand.push(brand)
                    })
                    
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_get_brand() {
            return new Promise((resolve, reject) => {
                const current_date = new Date()
                const date_f = new Date(this.date_from)
                const date_t = new Date(this.date_to)
                HTTP_ADMIN.get(`/reports/view-brand&date-from=${date_f}&date-to=${date_t}`).then(result => {
                    resolve(result)
                    this.brands = result.data.status == 200 ? result.data.data : []
                    this.titles.push('Summary Amount View Of Brand')
                    this.name_file = `SUMMARY_VIEW_OF_BRAND_${current_date.getDate()}_${current_date.getMonth() + 1}_${current_date.getFullYear()}.xls`
                    this.brands.map(item => {
                        this.json_data.push({
                            owner: item.owner_brand.full_name,
                            brand_name: item.name_brand,
                            category: item.id_category,
                            price: item.price.toLocaleString(),
                            level: item.level,
                            amount_viewer : item.amount_viewer ? item.amount_viewer : 0
                        })
                    })
                }).catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        },
        handle_date_visit_of_brand() {
            return new Promise((resolve, reject) => {
                const current_date = new Date()
                const date_f = new Date(this.date_from)
                const date_t = new Date(this.date_to)
                HTTP_ADMIN.get(`/reports/${this.id_brand}/date-from=${date_f}&date-to=${date_t}`).then(result => {
                    resolve(result)
                    this.brands = result.data.status == 200 ? result.data.data : []
                    this.titles.push('Summary Amount View Of Brand')
                    this.name_file = `SUMMARY_VIEW_OF_BRAND_${this.search_text}_${current_date.getDate()}_${current_date.getMonth() + 1}_${current_date.getFullYear()}.xls`
                    this.brands.map(item => {
                        this.json_data.push({
                            owner: item.owner_brand.full_name,
                            brand_name: item.name_brand,
                            category: item.id_category,
                            price: item.price.toLocaleString(),
                            level: item.level,
                            amount_viewer : item.amount_viewer ? item.amount_viewer : 0
                        })
                    })
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_export() {
            if(this.selected_type == 0 && this.date_from && this.date_to) {
                this.handle_get_brand()
            } else if(this.selected_type == 1 && this.id_brand.length > 0 && this.date_from && this.date_to) {
                const current_date = new Date()
                this.titles = []
                this.handle_date_visit_of_brand()
                this.name_file = `Summary_Brand_${this.search_text}_${current_date.getDate()}_${current_date.getMonth() + 1}_${current_date.getFullYear()}.xls`  
            } else {
                alert(`${this.$t('message_alert.please_fill')}`)
            }
        }
    },
    computed: {
        list_brand_filter() {
            return this.list_brand.filter(item => { return item.name.includes(this.search_text.toUpperCase()) ||  item.name.includes(this.search_text.toLowerCase())})
        }
    },
    created() {
        this.handle_get_brand_origin()
    }
}
</script>