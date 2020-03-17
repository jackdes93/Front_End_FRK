<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form"> {{$t('manager.adv_wait')}} </p>
            </div>
            <div class="form-group row-group" style="justify-content: flex-end">
                <div class="flex-box block-search margin-fix-right">
                    <input type="text" :placeholder="`${$t('search')}`" class="border-bottom-ol" v-model="search_text">
                </div>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header margin-fix-right" style="max-width: 56px;">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('form_joining.category')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second ">{{$t('payment_code')}}</p>
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
                    <div class="block-item-row-header" style="max-width: 240px;">
                        <p class="label text-color-second ">{{$t('estimate')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('date_start')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('user_page.status')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 140px;">
                        <p class="label text-color-second" style="text-align:left ; width: 100%;">{{$t('action')}}</p>
                    </div>
                </div>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px; overflow: auto; max-height: 600px;">
                <div class="form-group row-group padding-full" v-if="adv_wait.length == 0">
                    <span class="label text-center width-full">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation flex-row-center" v-else v-for="(adv, index) in filter_search" :key="index">
                    <div class="block-item-row " style="max-width: 56px;">
                       <p class="label-cell">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 140px;">
                        <p class="label-cell">{{handle_translate(adv.category)}}</p>
                    </div>
                     <div class="block-item-row " style="max-width: 140px;">
                        <p class="label-cell bold">{{adv.payment_code}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 150px;">
                        <p class="label-cell">{{adv.brand_name}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 200px;">
                        <p class="label-cell width-full">{{adv.adversiting_type}}</p>
                    </div>
                    <div class="block-item-row" style="justify-content: flex-end; max-width: 150px;">
                        <p class="label-cell width-full">{{adv.position}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 240px;">
                        <p class="label-cell bold">{{adv.adversiting_time}} {{$t('day')}}</p>
                    </div>
                    <div class="block-item-row ">
                        <p class="label-cell">{{handle_format_date(adv.start_time)}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 240px;">
                        <p class="label-cell bold">{{handle_translate_state(adv.adversiting_status)}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px;">
                        <a class="label-cell flex-box" v-on:click="adv_selected = adv"><i class="fas fa-info-circle"></i></a>
                        <a class="label-cell flex-box" v-on:click="handle_change_status(adv, 'STOP')"><i class="fas fa-lock"></i></a>
                        <a class="label-cell flex-box" v-on:click="handle_change_status(adv, 'PROCESSING')"><i class="far fa-check-circle"></i></a>
                        <span class="label-cell flex-box" v-if="adv.adversiting_type == 'BANNER'" v-on:click="handle_preview_picture(adv)"><i class="far fa-eye " style="color: #000"></i></span>
                    </div>
                </div>
            </form>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_preview">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">Image {{adv_selected.brand_name}} {{$t('footer.advertisement')}}</p>
                </div>
                <div class="form-group col-group" style="overflow:hidden; max-height: 500px">
                    <img :src="`http://franchiseking.vn/${adv_selected.banner_file}`" :alt="`${adv_selected.banner_file}`">
                </div>
                <div class="form-group row-group" style="justify-content: center; margin-top: 10px;">
                    <button class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_preview = false">{{$t('cancel')}}</button>
                </div>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="adv_selected">
            <div class="block-alert padding-full ">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{adv_selected.brand_name}} {{$t('manager.adv')}}</p>
                </div>
                <form class="block-form width-full padding-full" @submit.prevent="handle_write_note_payment">
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
                            <textarea name="note_payment" cols="30" rows="2" :placeholder="`${$t('user_page.payment')}`" v-model="adv_selected.note_payment"></textarea>
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group row-group" style="justify-content: center; margin-top: 16px;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="adv_selected = null">{{$t('cancel')}}</div>
                        <button class="btn btn-signup primary-color" style="color: #FFF"  >{{$t('save')}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP_ADMIN } from '../../../../http-common';
import { socket_bus } from '../../../../main';
import datepicker from 'vuejs-datepicker';

export default {
    components: {datepicker},
    data() {
        return {
            adv_wait: [],
            adv_selected: null,
            is_preview: false,
            search_text: '',
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
        handle_process_choose_date() {
            var start_date = Date.parse(this.adv_selected.start_time)
            var stop_date = start_date + (this.adv_selected.adversiting_time - 1) * 24 * 60 * 60 * 1000
            this.highlighted = {from:start_date, to: stop_date} 
            this.adv_selected.start_time = start_date
        },
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
        handle_get_list_advertisement_wait () {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/advertisements/advertisement-wait').then(result => {
                    this.adv_wait = result.data.status == 200 ? result.data.data : []
                    resolve(result)
                }).catch(error => {
                    reject(error)
                    console.log(error);
                })
            })
        },
        handle_change_status(advertisement, status) {
            switch(status) {
                case 'STOP':
                    socket_bus.$emit('SHOW_ALERT_STOP', {is_show: true, message: this.$t('message_alert.stop_adv'), brand: advertisement})
                    break;
                case 'PROCESSING':
                    socket_bus.$emit('SHOW_ALERT_APPROVE', {is_show: true, message: this.$t('message_alert.approve_adv'), brand: advertisement})
                    break;
            }
        },
        handle_change_advertisement_status(advertisement, status) {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch('/advertisements/update-state/' + advertisement.id, {status: status}).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_state_success')})
                        setTimeout(() => { window.location.reload()}, 3000) 
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_state_fail')})
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_preview_picture(advertisement) {
            this.adv_selected = advertisement
            this.is_preview = true
        },
        handle_write_note_payment() {
            const advertisement = this.adv_selected
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch(`/note-payment/${advertisement.id}`, {note_payment: advertisement.note_payment}).then(result_note_payment => {
                    if(result_note_payment.data.status == 200) {
                        this.adv_selected = null
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_state_success')})
                        setTimeout(() => { window.location.reload()}, 3000) 
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_state_fail')})
                    }
                }).catch(error => {
                    reject(error)
                    console.log(`Error when update note payment ${JSON.stringify(error)}`)
                })
            })
        }
    },
    computed: {
        filter_search() {
            return this.adv_wait.filter(item => { return item.payment_code.includes(this.search_text) || item.category.includes(this.search_text) || item.brand_name.includes(this.search_text)})
        }
    },
    created() {
        this.handle_get_list_advertisement_wait()

        socket_bus.$on('ACCEPT_STOP_ADV', result => {
            this.adv_wait = this.adv_wait.filter(item => {return item.id != result.brand.id})
            this.handle_change_advertisement_status(result.brand, 'STOP')
        })

        socket_bus.$on('ACCEPT_APPROVE_ADV', result => {
            this.adv_wait = this.adv_wait.filter(item => {return item.id != result.brand.id})
            this.handle_change_advertisement_status(result.brand, 'PROCESSING')
        })
    }
}
</script>