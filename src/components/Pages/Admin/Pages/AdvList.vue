<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 82vh; background: #EDEDED; margin-bottom: 16px;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('manager.adv')}}</p>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                     <div class="block-item-row-header margin-fix-right" style="max-width: 24px;">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 148px;">
                        <p class="label text-color-second ">{{$t('form_joining.category')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 150px;">
                        <p class="label text-color-second ">{{$t('user_page.brand_name')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second">{{$t('manager.adv_type')}}</p>
                    </div>
                     <div class="block-item-row-header" style="max-width: 80px;">
                        <p class="label text-color-second">{{$t('page')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 80px;">
                        <p class="label text-color-second" style="width: 100%; ">{{$t('position')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 90px;">
                        <p class="label text-color-second ">{{$t('estimate')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('date_start')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('user_page.status')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 130px;">
                        <p class="label text-color-second">{{$t('user_page.payment')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 160px;">
                        <p class="label text-color-second" style="text-align:center ; width: 100%;">{{$t('action')}}</p>
                    </div>
                </div>
            </div>
           <form class="block-form" style="padding: 0 8px 16px 8px; max-height:100%; overflow: auto; margin-bottom: 24px;">
                <div class="form-group row-group padding-full" v-if="adv_list.length == 0">
                    <span class="label text-center width-full">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation flex-row-center" v-else v-for="(adv, index) in adv_list" :key="index">
                    <div class="block-item-row " style="max-width: 24px;">
                       <p class="label-cell">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 148px;">
                        <p class="label-cell">{{handle_translate(adv.category)}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 150px;">
                        <p class="label-cell">{{adv.brand_name}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <p class="label-cell width-full">{{adv.adversiting_type}}</p>
                    </div>
                    <div class="block-item-row" style="justify-content: center;max-width: 80px;">
                        <p class="label-cell width-full">{{adv.page == null ? 'Any' : adv.page}}</p>
                    </div>
                    <div class="block-item-row" style="justify-content: center; max-width: 80px;">
                        <p class="label-cell width-full">{{adv.position == null ? 'Any' : adv.position}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 90px;">
                        <p class="label-cell width-full">{{handle_cal_estimate_time(adv.start_time, adv.adversiting_time)}} {{$t('day')}}</p>
                    </div>
                    <div class="block-item-row ">
                        <p class="label-cell">{{handle_format_date(adv.start_time)}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 120px; margin-left: 16px;">
                        <p class="label-cell bold" v-bind:class="{'color-red' : adv.adversiting_status == 'STOP', 'color-green' : adv.adversiting_status == 'START', 'color-orange' : adv.adversiting_status == 'PROCESSING'}">{{handle_translate_state(adv.adversiting_status)}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 130px;">
                        <p class="label-cell text-overflow">{{adv.note_payment == undefined ? 'NO INFO' : adv.note_payment}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 160px;">
                        <a class="label-cell flex-box" style="max-width: 80px;" v-on:click="handle_detail_adv(adv)">{{$t('see_more')}}</a>
                        <span class="label-span margin-fix-right" v-on:click="handle_preview(adv)"><i class="far fa-eye"  v-bind:class="{'black': adv.adversiting_type == 'BANNER', 'gray': adv.adversiting_type != 'BANNER'}"></i></span>
                        <span class="label-span margin-fix-right" v-on:click="handle_change_status(adv, 'PAUSE')" v-if="adv.adversiting_status != 'PAUSE'"><i class="fas fa-lock" style="color:#000"></i></span>
                        <span class="label-span" v-on:click="handle_change_status(adv, 'START')" v-if="adv.adversiting_status == 'PAUSE'"><i class="fas fa-lock-open" style="color:#000"></i></span>
                    </div>
                </div>
            </form>
        </div>
        
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="adv_selected">
            <div class="block-alert padding-full ">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{adv_selected.brand_name}} {{$t('manager.adv')}}</p>
                </div>
                <form class="block-form width-full padding-full" @submit.prevent="handle_update">
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('user_page.status')}}</span>
                        <ValidationProvider name="category" rules="required" v-slot="{errors}" style="width: 100%">
                            <select name="category"  class="list-joining" v-model="adv_selected.adversiting_status" :disabled="adv_selected.adversiting_status == 'START'">
                                <option value="" selected>-- {{$t('user_page.status')}} --</option>
                                <option v-bind:value="item" v-for="(item, index) in status" :key="index">{{handle_translate_state(item)}}</option>
                            </select>
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
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
                        <datepicker v-if="adv_selected.adversiting_status != 'STOP'" :placeholder="`${$t('date_start')}`" class="date_picker margin-fix-top" :disabled-dates="disable_date" :highlighted="highlighted" :format="format" @closed="handle_process_choose_date" v-model="adv_selected.start_time"></datepicker>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('user_page.payment')}}</span>
                        <ValidationProvider name="note_payment" rules="max:20" v-slot="{ errors }" style="width: 100%;">
                            <textarea name="note_payment" cols="30" rows="2" :placeholder="`${$t('user_page.payment')}`" v-model="adv_selected.note_payment" readonly></textarea>
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group row-group" style="justify-content: center; margin-top: 16px;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="adv_selected = null">{{$t('cancel')}}</div>
                        <button class="btn btn-signup primary-color" style="color: #FFF" v-if="adv_selected.adversiting_status == 'PROCESSING' || adv_selected.adversiting_status == 'PAUSE' || adv_selected.adversiting_status == 'STOP'" >{{$t('save')}}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_preview">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">Image {{adv_preview.brand_name}} Advertisement</p>
                </div>
                <div class="form-group col-group" style="overflow:hidden; max-height: 500px">
                    <img :src="`http://franchiseking.vn/${adv_preview.banner_file}`" :alt="`${adv_preview.banner_file}`" style="height: 100%;">
                </div>
                <div class="form-group row-group" style="justify-content: center">
                    <button class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_preview = false">{{$t('cancel')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP_ADMIN } from '../../../../http-common';
import { socket_bus } from '../../../../main';
import datepicker from 'vuejs-datepicker';

export default {
    components: { datepicker},
    data() {
        return {
            adv_list: [],
            adv_selected: null,
            adv_preview: null,
            is_preview: false,
            status: ['START', 'STOP', 'PROCESSING', 'PAUSE', 'WAITING'],
            format: 'dd/MM/yyyy',
            disable_date : {
                to: new Date(),
                ranges: []
            },
            highlighted: {
                to: null,
                from: new Date(Date.now() + 24 * 60 * 60 * 1000)
            },
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
        handle_change_status(advertisement, state) {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch('/advertisements/update-state/' + advertisement._id, {status: state}).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_state_success')})
                        setTimeout(() => {window.location.reload()}, 3000)
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_state_fail')})
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_get_list_adv() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/advertisements').then(result => {
                    resolve(result)
                    this.adv_list = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_detail_adv(adv) {
            this.adv_selected = adv
            this.disable_date.to = new Date()
            this.handle_get_current_advertisement(adv.page, adv.position, adv.adversiting_time)
            this.handle_check_have_avd(adv.id_brand,adv.page, adv.position, adv.adversiting_type)
        },
        handle_get_current_advertisement(page, position, range) {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get(`/advertisements/advertisement-run&page=${page}&position=${position}&range=${range}`).then(result => {
                    resolve(result.data)
                    if(result.data.status == 200) {
                        if(position == 'Slider' && result.data.data.length < 3) {
                            this.disable_date.to = new Date()
                        } else {
                            this.disable_date.to = new Date()
                            result.data.data.map(item => {
                                var start_time = new Date(item.start_time)
                                start_time.setUTCDate(start_time.getUTCDate() - 1)
                                this.disable_date.ranges.push({from: start_time, to: new Date(item.stop_time)})
                            })
                        }
                       
                    } else {
                        this.disable_date.to = new Date()
                        this.disable_date.ranges.length = 0
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error:' + error);
                })
            })
        },
        handle_check_have_avd(id_brand, page, position, range, adversiting_type) {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get(`/adv-check/advertisement-brand-have&brand=${id_brand}&page=${page}&position=${position}&range=${range}&advertisement-type=${adversiting_type}`).then(result => {
                    resolve(result)
                    result.data.data.map(item => {
                        var start_time = new Date(item.start_time)
                        start_time.setUTCDate(start_time.getUTCDate() - 1)
                        this.disable_date.ranges.push({from: start_time, to: new Date(item.stop_time)})
                    })
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_update() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch('/advertisements/update-state/' + this.adv_selected._id, {status: this.adv_selected.adversiting_status, start_time: this.adv_selected.start_time}).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_state_success')})
                        this.adv_selected = null
                        setTimeout(() => {window.location.reload()}, 3000)
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_state_fail')})
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_process_choose_date() {
            var start_date = Date.parse(this.adv_selected.start_time)
            var stop_date = start_date + (this.adv_selected.adversiting_time - 1) * 24 * 60 * 60 * 1000
            this.highlighted = {from:start_date, to: stop_date} 
            this.adv_selected.start_time = start_date
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
            if(advertisement.adversiting_type == 'BANNER') {
                this.adv_preview = advertisement
                this.is_preview = true
            }
        },
        handle_format_date(date) {
            const value_date = new Date(date)
            return `${value_date.getUTCDate()}/${value_date.getUTCMonth() + 1}/${value_date.getUTCFullYear()}
            ${value_date.getUTCHours() < 10 ? `0${value_date.getUTCHours()}` : `${value_date.getUTCHours()}`}:
            ${value_date.getUTCMinutes() < 10 ? `0${value_date.getUTCMinutes()}` : `${value_date.getUTCMinutes()}`}:
            ${value_date.getUTCSeconds() < 10 ? `0${value_date.getUTCSeconds()}` : `${value_date.getUTCSeconds()}`}`
        }
    },
    created() {
        this.handle_get_list_adv()
    }
}
</script>