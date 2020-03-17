<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 85vh; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form" style="height: 48px;">{{$t('user_page.advertisement_stop')}}</p>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                     <div class="block-item-row-header margin-fix-right" style="max-width: 56px;">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}.</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('form_joining.category')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 150px;">
                        <p class="label text-color-second ">{{$t('user_page.brand_name')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 200px;">
                        <p class="label text-color-second">{{$t('manager.adv_type')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second" style="width: 100%; max-width: 150px;">{{$t('position')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 128px;">
                        <p class="label text-color-second ">{{$t('estimate')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('date_start')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('user_page.status')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second" style="text-align:center ; width: 100%;">{{$t('action')}}</p>
                    </div>
                </div>
            </div>
           <form class="block-form" style="padding: 0 8px 16px 8px; max-height:100%; height:100%; overflow: auto;">
                <div class="form-group row-group padding-full" v-if="adv_list.length == 0">
                    <span class="label text-center width-full">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation flex-row-center" v-else v-for="(adv, index) in adv_list" :key="index">
                    <div class="block-item-row " style="max-width: 56px;">
                       <p class="label-cell">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 140px;">
                        <p class="label-cell">{{handle_translate(adv.category)}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 150px;">
                        <p class="label-cell">{{adv.brand_name}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 200px;">
                        <p class="label-cell width-full">{{adv.adversiting_type}}</p>
                    </div>
                    <div class="block-item-row" style="justify-content: flex-end; max-width: 150px;">
                        <p class="label-cell width-full">{{adv.position}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 128px;">
                        <p class="label-cell width-full">{{handle_cal_estimate_time(adv.start_time, adv.adversiting_time)}} {{$t('day')}}</p>
                    </div>
                    <div class="block-item-row ">
                        <p class="label-cell">{{handle_format_date(adv.start_time)}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell bold" v-bind:class="{'color-red' : adv.adversiting_status == 'STOP', 'color-green' : adv.adversiting_status == 'START', 'color-orange' : adv.adversiting_status == 'PROCESSING'}">{{handle_translate_state(adv.adversiting_status)}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <a class="label-cell flex-box" v-on:click="handle_detail_adv(adv)">{{$t('see_more')}}</a>
                        <span class="label-span" v-on:click="handle_preview(adv)" v-if="adv.adversiting_type == 'BANNER'"><i class="far fa-eye" style="color: #000"></i></span>
                        <!-- <a class="label-cell flex-box" v-on:click="handle_change_status(adv, 'PROCESSING')" v-if="adv.adversiting_status != 'PROCE'"><i class="far fa-check-circle"></i></a> -->
                    </div>
                </div>
            </form>
        </div>
        
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="adv_selected">
            <div class="block-alert padding-full ">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{adv_selected.brand_name}} Advertisement</p>
                </div>
                <form class="block-form width-full padding-full">
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('user_page.status')}}</span>
                        <select name="category"  class="list-joining" v-model="adv_selected.adversiting_status" disabled="true">
                            <option value="" selected>-- {{$t('user_page.status')}} --</option>
                            <option v-bind:value="item" v-for="(item, index) in status" :key="index">{{handle_translate_state(item)}}</option>
                        </select>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span">{{$t('form_joining.category')}}</span>
                        <input type="text" class="margin-bottom border-bottom-ol" name="category" v-model="adv_selected.category" readonly>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span">{{$t('manager.adv_type')}}</span>
                        <input type="text" class="margin-bottom border-bottom-ol" name="advertising_type" v-model="adv_selected.adversiting_type" readonly>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span">{{$t('user_page.adver_time')}}</span>
                        <input type="text" class="margin-bottom border-bottom-ol" name="status" v-model="adv_selected.adversiting_time" readonly>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span">{{$t('date_start')}}</span>
                        <input type="text" class="margin-bottom border-bottom-ol" name="status" v-model="adv_selected.start_time" readonly>
                    </div>
                    <div class="form-group row-group" style="justify-content: center;">
                        <button class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="adv_selected = null">{{$t('cancel')}}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_preview">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">Image {{adv_preview.brand_name}} Advertisement</p>
                </div>
                <div class="form-group col-group">
                    <img :src="`http://franchiseking.vn/${adv_preview.banner_file}`" :alt="`${adv_preview.banner_file}`">
                </div>
                <div class="form-group row-group" style="justify-content: center">
                    <button class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_preview = false">CANCEL</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP_ADMIN } from '../../../../http-common';

export default {
    data() {
        return {
            adv_list: [],
            adv_selected: null,
            adv_preview: null,
            is_preview: false,
            status: ['START', 'STOP', 'PROCESSING', 'PAUSE', 'WAITING']
        }
    },
    methods: {
         handle_translate_state (state) {
            switch(state) {
                case 'WAITING':
                    return this.$t('waiting')
                case 'START':
                    return this.$t('start')
                case 'STOP':
                    return this.$t('stop')
                case 'PROCESSING':
                    return this.$t('processing')
                case 'PAUSE':
                    return this.$t('pause')
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
        handle_format_date(date) {
            const value_date = new Date(date)
            return `${value_date.getUTCDate()}/${value_date.getUTCMonth() + 1}/${value_date.getUTCFullYear()} 
            ${value_date.getUTCHours() < 10 ? `0${value_date.getUTCHours()}` : `${value_date.getUTCHours()}`}:
            ${value_date.getUTCMinutes() < 10 ? `0${value_date.getUTCMinutes()}` : `${value_date.getUTCMinutes()}`}:
            ${value_date.getUTCSeconds() < 10 ? `0${value_date.getUTCSeconds()}` : `${value_date.getUTCSeconds()}`}`
        },
        handle_get_list_adv() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/advertisements/advertisement-stop').then(result => {
                    resolve(result)
                    this.adv_list = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_detail_adv(adv) {
            this.adv_selected = adv
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
        handle_preview(advertisement) {
            this.adv_preview = advertisement
            this.is_preview = true
        }
    },
    created() {
        this.handle_get_list_adv()
    }
}
</script>