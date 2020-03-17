<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right gray-bg" style="max-height: 600px;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('user_page.your_joining_demand')}}</p>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header" style="flex-grow:0.5; width: 94px;">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('form_joining.category')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('brand_info.budget')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('form_joining.location')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('form_joining.store_front')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('user_page.suggestion')}}</p>
                    </div>
                </div>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group row-group" v-if="demands.length == 0">
                    <span class="label-span width-full text-center">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group padding-full row-animation" v-else v-for="(item, index) in demands" :key="index">
                    <div class="block-item-row" style="flex-grow:0.5; width: 94px;">
                        <p class="label-cell ">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{handle_translate(item.category)}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell bold">{{handle_return_string_money(item.budget.from.toString())}} {{$t('m')}} --> {{handle_return_string_money(item.budget.to.toString())}} {{$t('m')}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{item.location.toString()}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{item.store_front == false ? `${$t('form_joining.still')}` : `${$t('form_joining.found')}`}}</p>
                    </div>
                    <div class="block-item-row">
                        <a class="label-cell" v-on:click="handle_get_brand_same_suggestion(item, index)">{{$t('see_more')}}</a>
                    </div>
                </div>
            </form>
        </div>
         <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="joining_selected">
            <div class="block-alert padding-full" style="padding: 0 16px 8px 16px;">
                <div class="block-header bg-title-header padding-full header-brand-fix">
                    <p class="title-form">{{$t('user_page.brand_suggestion_demand')}} #{{index_selected}}</p>
                </div>
                <div class="form-group row-group width-full">
                    <div class="block-list-row width-full padding-full border-bottom-ol">
                        <div class="block-item-row-header" style="max-width: 86px !important; flex-grow:0.5;">
                            <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 64px !important; border: none; flex-grow:0.5; margin-right: 16px;">
                            <p class="label text-color-second ">{{$t('user_page.logo')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 200px !important; flex-grow: 0.5">
                            <p class="label text-color-second text-center width-full">{{$t('user_page.brand_name')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 120px !important; flex-grow: 0.5">
                            <p class="label text-color-second " style="margin-left: 16px;">{{$t('form_joining.category')}}</p>
                        </div>
                        <div class="block-item-row-header" >
                            <p class="label text-color-second ">{{$t('user_page.pricing')}}</p>
                        </div>
                        <div class="block-item-row-header" >
                            <p class="label text-color-second ">{{$t('form_joining.location')}}</p>
                        </div>
                    </div>
                </div>
                <div class="form-group row-group width-full flex-row-center" v-if="brands.length == 0">
                    <span class="label-span width-full flex-row-center text-center" style="font-size: 20px;">{{$t('nodata')}}</span>
                </div>
                <div class="form-group col-group width-full" style="padding: 0 8px 16px 8px;" v-for="(brand, index) in brands" :key="index">
                    <div class="form-group row-group padding-fix" style="align-items:center;">
                        <div class="block-item-row" style="max-width: 86px !important; flex-grow:0.5;">
                            <p class="label-cell text-center">{{index + 1}}</p>
                        </div>
                        <div class="block-item-row logo-brand" style="max-width: 64px !important; height:64px; border: none; flex-grow:0.5; margin-right: 16px;">
                            <img v-bind:src="`http://franchiseking.vn/${brand.image_source.logo}`" v-bind:alt="`${brand.name}`" >
                        </div>
                        <div class="block-item-row" style="max-width: 200px !important; flex-grow: 0.5">
                            <a class="label-cell width-full text-center bold" style="font-size: 16px;" v-bind:href="`#/${brand.id_category}/${brand.name_vietnamese}`">{{brand.name}}</a>
                        </div>
                        <div class="block-item-row" style="max-width: 120px !important; flex-grow: 0.5">
                            <p class="label-cell width-full text-center">{{handle_translate(brand.id_category)}}</p>
                        </div>
                        <div class="block-item-row">
                            <p class="label-cell bold">{{brand.price.toLocaleString()}} <sup>đ</sup></p>
                        </div>
                        <div class="block-item-row">
                            <p class="label-cell">{{brand.location.toString()}}</p>
                        </div>
                    </div>
                </div>
                <div class="form-group flex-row-center padding-full">
                    <button class="btn btn-sign-up" style="max-width: 140px !important;" v-on:click="joining_selected = null">{{$t('close')}}</button>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import { HTTP } from '../../../../http-common';
export default {
    data() {
        return {
            customer: {},
            joining_demands: [],
            joining_selected: null,
            demands: [],
            index_selected: 0
        }
    },
    methods: {
        handle_translate(name) {
            var result = ''
            switch(name) {
                case 'Drink':
                    result = this.$t('drink')
                    break;
                case 'Dessert':
                    result = this.$t('dessert')
                    break;
                case 'Vietnamese Foods':
                    result = this.$t('vn_food')
                    break;
                case 'Foriegn Foods':
                    result = this.$t('foriegn_fd')
                    break;
                case 'BBQ':
                    result = this.$t('bbq')
                    break;
                case 'Brunch':
                    result = this.$t('brunch')
                    break;
                case 'Hot Pot':
                    result = this.$t('hotpot')
                    break;
            }
            return result;
        },
        handle_return_string_money(text) {
            const length = text.length
            if(length > 6) {
                return text.substr(0, text.length - 6) 
            } else if(length == 6) {
                return '0.' + text.substr(0, 1)
            }
        },
        handle_get_brand_suggestion() {
            return new Promise((resolve, reject) => {
                HTTP.get('/brands/get-brand-same-your-demand/' + this.customer.id).then(result => {
                    resolve(result)
                    this.demands = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log('Error: ' + error)
                })
            })
        },
        handle_get_brand_same_suggestion(joining, index) {
            this.joining_selected = joining
            this.index_selected = index + 1
            this.brands = joining.brands
        } 
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
            this.handle_get_brand_suggestion()
        }
    }
}
</script>
