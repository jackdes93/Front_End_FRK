<template>
    <div class="block-model gray-bg" v-if="is_show">
        <div class="block-alert animation-transform-scale padding-full">
            <div class="form-group box-header">
                <p class="text-center label text-uppercase" style="font-size: 20px;">{{$t('sent')}}</p>
            </div>
            <div class="form-group.col-group margin-bottom">
                <p class="label" style="font-size: 18px"> {{message}}</p>
            </div>
            <div class="form-group row-group flex-row-center" style="justify-content: center; margin-top: 16px;" v-if="request == ''">
                <button class="btn btn-sign-up primary-color" style="color:#FFF; width: 25%" @click="handle_cancel">{{$t('ok')}}</button>
            </div>
            <div class="form-group row-group flex-row-center" style="justify-content: center; margin-top: 16px;" v-if="request == 'SHOW_MESSAGE_UPLOAD_IMAGE' || request == 'SHOW_MESSAGE_LOCK_BRAND' || request == 'SHOW_MESSAGE_UNLOCK_BRAND'">
                <div class="btn btn-sign-up margin-fix-right" style="width: 25%" @click="handle_no_accept">{{$t('cancel')}}</div>
                <button class="btn btn-sign-up primary-color" style="color:#FFF; width: 25%" @click="handle_accept">{{$t('ok')}}</button>
            </div>
            <div class="form-group row-group flex-row-center" style="justify-content: center; margin-top: 16px;" v-if="request == 'UPGRADE_VIP_BRAND'">
                <div class="btn btn-sign-up margin-fix-right" style="width: 25%" @click="handle_no_accept">{{$t('cancel')}}</div>
                <button class="btn btn-sign-up primary-color" style="color:#FFF; width: 25%" @click="handle_accept">{{$t('ok')}}</button>
            </div>
            <div class="form-group row-group flex-row-center" style="justify-content: center; margin-top: 16px;" v-if="request == 'SHOW_CONFIRM'">
                <div class="btn btn-sign-up margin-fix-right" style="width: 25%" @click="handle_no_accept">{{$t('cancel')}}</div>
                <button class="btn btn-sign-up primary-color" style="color:#FFF; width: 25%" @click="handle_accept">{{$t('ok')}}</button>
            </div>
            <div class="form-group row-group flex-row-center" style="justify-content: center; margin-top: 16px;" v-if="request == 'SHOW_ALERT_STOP' || request == 'SHOW_ALERT_APPROVE'">
                <div class="btn btn-sign-up margin-fix-right" style="width: 25%" @click="handle_no_accept">{{$t('cancel')}}</div>
                <button class="btn btn-sign-up primary-color" style="color:#FFF; width: 25%" @click="handle_accept">{{$t('ok')}}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animation-tranform-scale { animation: position-animation-scale 1s; }
.gray-bg { background: rgba(0, 0, 0, .4)}
.box-header { flex-direction: row; justify-content: space-between; align-items: center}
.box-title { display: flex; flex: 1; padding: 16px 0; justify-content: center;}
.box-title p {font-size: 1.6em;}
.btn-close { display: flex; width: 48px; justify-content: center;}
.block-model { margin: 0 auto; position: fixed; display: flex;  flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100vh;  z-index: 9999; top: 0; left: 0;}
.block-alert { position: relative; width: 80%;  max-width: 600px;  min-width:300px; display: flex;flex-direction: column;justify-content: flex-start; align-items: center; background: #FFF;border-radius: 8px; box-shadow: 0 0 3px rgba(0,0,0,0.35);}
@keyframes position-animation-scale {
   0% { transform: scale(0);}
   80% { transform: scale(1.2);}
   100% { transform: scale(1)}
}
</style>

<script>
import {socket_bus} from '../../main';

export default {
    data() {
        return {
            message: '',
            is_show: false,
            request: '',
            brand: null
        }
    },
    methods: {
        handle_cancel() {
            this.is_show = false
        },
        handle_accept() {
            this.is_show = false
            switch(this.request) {
                case 'SHOW_MESSAGE_UPLOAD_IMAGE':
                    socket_bus.$emit('RESULT_UPLOAD_IMAGE', {is_save: true})
                    break;
                case 'UPGRADE_VIP_BRAND':
                    socket_bus.$emit('RESPONSE_UPDATE_BRAND_VIP', {is_del: true, id_brand: this.brand})
                    break;
                case 'SHOW_CONFIRM':
                    socket_bus.$emit('UPGRADE_STATUS_CALLBACK', {is_update: true, id_joining: this.brand})
                    break;
                case 'SHOW_MESSAGE_LOCK_BRAND':
                    socket_bus.$emit('ACCEPT_LOCK_BRAND', {is_lock: true, brand: this.brand})
                    break;
                case 'SHOW_MESSAGE_UNLOCK_BRAND':
                    socket_bus.$emit('ACCEPT_UNLOCK_BRAND', {is_lock: true, brand: this.brand})
                    break;
                case 'SHOW_ALERT_STOP':
                    socket_bus.$emit('ACCEPT_STOP_ADV', {is_lock: true, brand: this.brand})
                    break;
                case 'SHOW_ALERT_APPROVE':
                    socket_bus.$emit('ACCEPT_APPROVE_ADV', {is_lock: true, brand: this.brand})
                    break;
            }
        },
        handle_no_accept() {
            this.is_show = false
            switch(this.request) {
                case 'SHOW_MESSAGE_UPLOAD_IMAGE':
                    socket_bus.$emit('RESULT_UPLOAD_IMAGE', {is_save: false})
                    break;
            }
        }
    },
    created() {
        socket_bus.$on('SHOW_MESSAGE', result => {
            this.is_show = true
            this.message = result.message
            this.request = ''
        })

        socket_bus.$on('SHOW_MESSAGE_UPLOAD_IMAGE', result => {
            this.is_show = true
            this.message = result.message
            this.request = 'SHOW_MESSAGE_UPLOAD_IMAGE'
        })

        socket_bus.$on('UPGRADE_VIP_BRAND', result => {
            this.is_show = true
            this.message = `${result.message} ${this.$t('message_alert.upgrade_vip_brand')}`
            this.request = 'UPGRADE_VIP_BRAND'
            this.brand = result.id_brand
        })

        socket_bus.$on('SHOW_CONFIRM', result => {
            this.is_show = true
            this.message = result.message
            this.request = 'SHOW_CONFIRM'
            this.brand = result.id_joining
        })

        socket_bus.$on('SHOW_MESSAGE_LOCK_BRAND', result => {
            this.is_show = true
            this.message = `${this.$t('message_alert.lock_brand')} ${result.brand.name} ?`
            this.request = 'SHOW_MESSAGE_LOCK_BRAND'
            this.brand = result.brand
        })

        socket_bus.$on('SHOW_MESSAGE_UNLOCK_BRAND', result => {
            this.is_show = true
            this.message = `${this.$t('message_alert.unlock_brand')} ${result.brand.name} ?`
            this.request = 'SHOW_MESSAGE_UNLOCK_BRAND'
            this.brand = result.brand
        })

        socket_bus.$on('SHOW_ALERT_STOP', result => {
            this.is_show = true
            this.message = result.name_brand ? `${this.$t('message_alert.stop_adv')} ${result.name_brand}` : `${this.$t('message_alert.stop_adv')} ${result.brand.brand_name}`
            this.request = 'SHOW_ALERT_STOP'
            this.brand = result.brand
        })

        socket_bus.$on('SHOW_ALERT_APPROVE', result => {
            this.is_show = true
            this.message = `${this.$t('message_alert.approve_adv')} ${result.brand.brand_name}`
            this.request = 'SHOW_ALERT_APPROVE'
            this.brand = result.brand
        })
    }
}
</script>