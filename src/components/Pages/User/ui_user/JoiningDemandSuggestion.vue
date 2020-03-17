<template>
    <div class="flex-box padding-full block-custom-header col-group">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" v-for="(item, index) in data" :key="index" style="max-height: 600px; background: #EDEDED; margin-bottom: 80px;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('t_joining_demand_mat')}} #{{item.name}}</p>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group row-group width-full">
                    <div class="block-list-row width-full padding-full border-bottom-ol">
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('form_joining.category')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('name')}}</p>
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
                            <p class="label text-color-second ">{{$t('footer.contact')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('detail')}}</p>
                        </div>
                    </div>
                </div>
                <div class="form-group row-group padding-full" v-if="item.joiningdemands.length == 0">
                    <p class="label width-full flex-row-center flex-box">{{$t('nodata')}}</p>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation" v-for="(joining_demand, index) in item.joiningdemands" :key="index" >
                    <div class="block-item-row">
                        <p class="label-cell ">{{handle_translate(joining_demand.category)}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{joining_demand.last_name}} {{joining_demand.first_name}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell bold">{{handle_return_string_money(joining_demand.budget.from.toString())}} {{$t('m')}} --> {{handle_return_string_money(joining_demand.budget.to.toString())}} {{$t('m')}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{joining_demand.location.toString()}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{joining_demand.store_front ? $t('form_joining.found') : $t('form_joining.still')}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{joining_demand.phone_number}}</p>
                    </div>
                    <div class="block-item-row">
                        <a class="label-cell" v-on:click="handle_get_detail(item.name, joining_demand)">{{$t('see_more')}}</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_detail_joining">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('detail_joining_demand')}} {{name_brand_selected}} Brand</p>
                </div>
                <form class="block-form" style="padding: 8px 16px!important; width: 96%;">
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('name_customer')}}</span>
                            <input class="border-bottom-ol" v-model="joining_demand_selected.first_name" readonly/>
                        </div>
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.phone_number')}}</span>
                            <input class="border-bottom-ol" v-model="joining_demand_selected.phone_number" readonly/>
                        </div>
                        <div class="form-group col-group ">
                            <span class="label-span margin-bottom">Email</span>
                            <input class="border-bottom-ol" v-model="joining_demand_selected.email" readonly/>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">Zalo</span>
                            <input class="border-bottom-ol" v-model="joining_demand_selected.zalo" readonly/>
                        </div>
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.time_open')}}</span>
                            <p class="border-bottom-ol" style="padding: 5px 16px; width: 100%;">{{new Date(joining_demand_selected.time_open).toLocaleString()}}</p>
                        </div>
                        <div class="form-group col-group ">
                            <span class="label-span margin-bottom">{{$t('form_joining.time_free')}}</span>
                            <p class="border-bottom-ol" style="width: 100%; padding: 5px 16px">{{handle_convert_time(joining_demand_selected.time_call)}}</p>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.location')}}</span>
                            <input class="border-bottom-ol" v-model="joining_demand_selected.location" readonly/>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom-fix">{{$t('form_joining.store_front')}}</span>
                            <p class="border-bottom-ol" style="padding: 5px 16px; width: 100%;">{{joining_demand_selected.store_front ? $t('form_joining.found') : $t('form_joining.still')}}</p>
                        </div>
                    </div>
                    <div class="form-group col-group ">
                            <span class="label-span margin-bottom">{{$t('messages')}}</span>
                            <textarea name="message" cols="30" rows="5" style="padding: 8px 16px;" v-model="joining_demand_selected.message" readonly></textarea>
                        </div>
                    <div class="form-group row-group" style="justify-content: center; margin-top: 10px;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_detail_joining = false">{{$t('close')}}</div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP } from '../../../../http-common'
export default {
    data() {
        return {
            customer: {},
            data: [],
            is_detail_joining : false,
            name_brand_selected: '',
            joining_demand_selected: {}
        }
    },
    methods: {
        handle_convert_time(value) {
            switch(parseInt(value)) {
                case 0:
                    return this.$t('form_joining.mo')
                case 1:
                    return this.$t('form_joining.af')
                case 2:
                    return this.$t('form_joining.eve')
            }
        },
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
        handle_get_joining_demand_same_condition_with_brand(id_customer) {
            return new Promise((resolve, reject) => {
                HTTP.get(`/joining-demand/list-joining-same-condition-with-brand/${id_customer}`).then(result => {
                    resolve(result)
                    this.data = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log('Error:' + error)
                })
            })
        },
        handle_return_string_money(text) {
            const length = text.length
            if(length > 6) {
                return text.substr(0, text.length - 6) 
            } else if(length == 6) {
                return '0.' + text.substr(0, 1)
            }
        },
        handle_get_detail(name_brand, joining_demand) { 
            this.is_detail_joining = true
            this.name_brand_selected = name_brand
            this.joining_demand_selected = joining_demand
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
            this.handle_get_joining_demand_same_condition_with_brand(this.customer.id)
        }
    }
}
</script>