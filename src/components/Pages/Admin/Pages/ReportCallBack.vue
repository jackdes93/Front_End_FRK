<template>
    <div class="flex-box padding-full block-custom-header col-group">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('report.call_back_title')}}</p>
            </div>
            <div class="form-group row-group width-full">
                <div class="form-group col-group" >
                    <span class="label-span margin-bottom-fix">{{$t('brand')}}</span>
                    <select v-model="selected_type" class="selection-brand" style="max-width: 180px" @change="handle_change()">
                        <option value=null>--{{$t('select_type')}} --</option>
                        <option value="0">{{$t('manager.all_brand')}}</option>
                        <option value="1">{{$t('brand')}}</option>
                    </select>
                </div>
                <div class="form-group col-group margin-fix-right" v-if="selected_type == 1">
                    <span class="label-span margin-bottom-fix">{{$t('user_page.brand_name')}}</span>
                    <input type="text" placeholder="Search...." class="border-bottom-ol" v-model="search_text" style="height: 48px" v-on:click="is_have_brand = true">
                </div>
                <div class="form-group col-group" v-if="list_brand.length > 0 && is_have_brand" style="max-height: 280px; position: absolute; top: 152px; left: 280px;">
                    <ul class="list-city" >
                        <li class="item-city" v-for="(brand,i) in list_brand" :key="i" v-on:click="handle_select_brand(brand)">
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
        </div>
        <div class="form-group col-group width-full padding-top" v-if="data_report_brand">
            <div class="form-group row-group"><span class="label" style="font-size: 1.2em">Report of brand {{data_report_brand.name_brand}}</span></div>
            <div class="form-group row-group" style="max-width: 400px; align-items: flex-end">
                <span class="label-span" style="width: 120px;">{{$t('user_page.brand_name')}}</span>
                <input type="text" class="border-bottom-ol" :value="data_report_brand.name_brand">
            </div>
            <div class="form-group row-group" style="max-width: 600px; align-items: flex-end">
                <span class="label-span" style="width: 120px;">Brand Owner</span>
                <input type="text" class="border-bottom-ol" :value="data_report_brand.owner_brand.full_name">
            </div>
            <div class="form-group col-group" style="max-width: 600px;">
                <div class="form-group row-group">
                    <div class="form-group row-group margin-fix-right" style="max-width: 400px; align-items: flex-end">
                        <span class="label-span" style="width: 120px;">Email:</span>
                        <input type="text" class="border-bottom-ol" :value="data_report_brand.owner_brand.email">
                    </div>
                    <div class="form-group row-group" style="max-width: 400px; align-items: flex-end">
                        <span class="label-span" style="width: 160px;">{{$t('form_joining.phone_number')}}</span>
                        <input type="text" class="border-bottom-ol" :value="data_report_brand.owner_brand.phone_number">
                    </div>
                </div>
            </div>
            <span class="label-span" style="font-size: 1.3em">{{$t('list_call_back')}}</span>
            <div class="form-group row-group padding-top border-bottom-ol padding-bottom" style="justify-content: flex-start">
                <span class="flex-box label text-color-second " style="width: 80px; min-width: 100px;">{{$t('user_page.nodot')}}</span>
                <span class="flex-box label text-color-second margin-fix-right">{{$t('user_page.date_created')}}</span>
                <span class="flex-box label text-color-second margin-fix-right">{{$t('name')}}</span>
                <span class="flex-box label text-color-second margin-fix-right">EMAIL</span>
                <span class="flex-box label text-color-second margin-fix-right">{{$t('form_joining.location')}}</span>
                <span class="flex-box label text-color-second ">{{$t('brand_info.budget')}}</span>
            </div>
            <div class="form-group col-group" style="max-height: 300px; height: 240px;">
                <div class="form-group row-group padding-top"  v-for="(item, index) in data_report_brand.data_call_back" :key="index">
                    <span class="label flex-box" style="width: 80px; min-width: 100px;">{{index + 1}}</span>
                    <span class="label flex-box">{{new Date(item.created_on).toLocaleDateString()}}</span>
                    <span class="label flex-box">{{item.name}}</span>
                    <span class="label flex-box text-overflow">{{item.email}}</span>
                    <span class="label flex-box">{{item.location}}</span>
                    <span class="label flex-box">{{item.budget ? handle_return_string_money(item.budget.from.toString()) : 0}}M -> {{item.budget ? handle_return_string_money(item.budget.to.toString()):0}}M</span>
                </div>
            </div>
        </div>
        <div class="form-group row-group" v-else><span class="label-span" v-if="id_brand != 'all_brand'" style="display: flex; width: 100%; padding: 8px 0; justify-content: center; font-size: 1.6em">{{$t('nodata')}}</span></div>
        <div class="form-group row-group" style="justify-content: center">
            <download-excel v-if="data_report_brand"
                :data= "json_data" 
                :title= "titles"
                :fields = "json_fields"
                :worksheet = "id_brand"
                :name = "name_file"
                class="btn-dwn-report text-color-primarry">
                {{$t('report.download_report')}}
                <span><i class="fas fa-print"></i></span>
            </download-excel>
        </div>
        <div class="form-group col-group width-full padding-top" v-if="data_report_summary">
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
                            <p class="label text-color-second" style="text-align: left">{{$t('report.amount_call_back')}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group col-group" style="padding: 0 8px 16px 8px; max-height: 400px; overflow: auto;">
                <div class="form-group border-bottom-ol padding-full row-animation" style="align-items: center;" v-for="(item,index) in data_report_summary" :key="index">
                    <div class="block-item-row logo-brand margin-fix-right" style="width: 64px; border: none;">
                        <p class="label text-color-second">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 160px; margin: 0 8px;">
                        <p class="label-cell">{{item.owner[0]}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 220px;">
                        <a class="label-cell width-full" style="font-size: 16px;" v-bind:href="`/#/${item.category}/${item.name_vietnamese}`">{{item.name_brand}}</a>
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
                        <p class="label text-color-second">{{item.sum_call_back ? item.sum_call_back : 0}}</p>
                    </div>
                </div>
            </div>
            <div class="form-group row-group" style="justify-content: center">
                <download-excel v-if="data_report_summary"
                    :data= "json_data" 
                    :title= "titles"
                    :fields = "json_fields"
                    :worksheet = "id_brand"
                    :name = "name_file"
                    class="btn-dwn-report text-color-primarry">
                    {{$t('report.download_report')}}
                    <span><i class="fas fa-print"></i></span>
                </download-excel>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { HTTP_ADMIN } from '../../../../http-common'
import datepicker from 'vuejs-datepicker';
import JsonExcel from 'vue-json-excel'
import { socket_bus } from '../../../../main'

Vue.component('download-excel', JsonExcel)
export default {
    components: { datepicker},
    data() {
        return {
            format: 'dd/MM/yyyy',
            id_brand: null,
            selected_type: null,
            is_have_brand: false,
            search_text: '',
            date_from: '',
            titles: [],
            date_to: '',
            name_file: '',
            json_fields: {
                'NAME BRAND' : 'name_brand',
                'OWNER':'owner',
                'BRAND TYPE' : 'level',
                'CATEGORY': 'category',
                'PRICE' : 'price',
                'AMOUNT CALL BACK':'amount_call_back'
            },
            json_data: [],
            brands: [],
            disable_date_from : {
                from: new Date(),
                ranges: []
            },
            disable_date_to : {
                from: new Date(),
                ranges: []
            },
            data_report_brand: null,
            data_report_summary:null
        }
    },
    methods: {
        handle_change() {
            if(this.selected_type == 1) {
                this.is_have_brand = true
            } else {
                this.id_brand = 'all_brand'
                this.is_have_brand = false
            }
            this.data_report_brand = null
            this.data_report_summary = null
        },
        handle_return_string_money(text) {
            const length = text.length
           if(length > 6) {
               return text.substr(0, text.length - 6) 
           } else if(length == 6) {
               return '0.' + text.substr(0, 1)
           }
        },
        handle_get_brand() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/brands').then(result => {
                    resolve(result)
                    result.data.data.map(brand => {
                        this.brands.push(brand)
                    })
                    
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_select_brand(brand) {
            this.id_brand = brand.id
            this.search_text = brand.name
            this.is_have_brand = false
        },
        handle_get_all(date_from, date_to) {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get(`/reports/call-back-all/date-from=${date_from}&date-to=${date_to}`).then(result => {
                    resolve(result)
                    if(result.data.status == 200 ) {
                        this.data_report_summary = result.data.data
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: result.message})
                    }
                    this.titles.push('Summary All Call Back Of Brand')
                    this.data_report_summary.map(item => {
                        this.json_data.push({
                            name_brand: item.name_brand,
                            owner: item.owner[0],
                            level: item.level,
                            category: item.category,
                            price: item.price,
                            amount_call_back: item.sum_call_back
                        })
                    })
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_get_data_brand(id_brand, date_from, date_to) {
            this.json_data = []
            this.data_report_brand = []
            const current_date = new Date()
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get(`/reports/call-back-brand=${id_brand}&date-from=${date_from}&date-to=${date_to}`).then(result => {
                    resolve(result)
                    this.data_report_brand = result.data.status == 200 ? result.data.data[0] : null
                    if(this.data_report_brand) {
                        this.json_fields = {
                            'DATE CREATE' : 'date_created',
                            'NAME':'name',
                            'EMAIL' : 'email',
                            'LOCATIONS': 'location',
                            'BUDGET' : 'budget'
                        }
                        this.titles.push(this.data_report_brand.name_brand)
                        this.titles.push(this.data_report_brand.owner_brand.full_name)
                        this.titles.push(this.data_report_brand.owner_brand.email)
                        this.titles.push(this.data_report_brand.owner_brand.phone_number)
                        this.name_file = `${this.data_report_brand.name_brand}_${current_date.getDate()}_${current_date.getMonth() + 1}_${current_date.getFullYear()}.xls`
                        this.data_report_brand.data_call_back.map(item => {
                            this.json_data.push({
                                date_created: item.created_on,
                                name: item.name,
                                email: item.email,
                                location: item.location,
                                budget: item.budget ? item.budget.from + '-' + item.budget.to : 0
                            })
                        })
                    }
                }).catch(error => {
                    reject(error)
                    console.log(error);
                })
            })
        },
        handle_export() {
           if(this.date_from <= this.date_to) {
                const current_date = new Date()
                const date_f = new Date(this.date_from)
                const date_t = new Date(this.date_to)
                this.titles = []
                if(this.selected_type == 0) {
                    this.handle_get_all(date_f, date_t)
                    this.name_file = `Summary_All_Brand_${current_date.getDate()}_${current_date.getMonth() + 1}_${current_date.getFullYear()}.xls`
                } else if(this.selected_type == 1) {
                    this.handle_get_data_brand(this.id_brand, date_f, date_t)
                }
                
            } else {
                alert('Please choose full conditions')
            }
        }
    },
    computed: {
        list_brand() {
            return this.brands.filter(item => { return item.name.includes(this.search_text.toUpperCase()) ||  item.name.includes(this.search_text.toLowerCase())})
        }
    },
    created() {
        this.handle_get_brand()
    }
}
</script>