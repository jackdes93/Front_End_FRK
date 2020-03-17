<template>
    <div class="block-model gray-bg " v-if="is_show">
        <div class="block-alert animation-tranform-scale" style="padding: 8px">
            <div class="form-group box-header">
                <div class="box-title">
                    <p class="text-center label">{{brand.name != null ? brand.name : `${this.$t('notif')}`}}</p>
                </div>
            </div>
            <div class="form-content">
                <p class="label" style="font-size: 18px;">
                    {{message}}
                </p>
            </div>
            <div class="form-group" style="margin-bottom: 4px; justify-content: center; width: 50%;" v-if="topic == 'DELETE_BRAND' || topic == 'DEL_CATEGORY' || topic == 'REMOVE' || topic == 'DELETE_SUP_CODE' || topic == 'CHANGE_STATUS' || topic == 'DELETE_ACCOUNT'">
                <button class="btn btn-sign-up margin-fix-right" @click="handle_cancel">{{$t('cancel')}}</button>
                <button class="btn btn-sign-up" @click="handle_ok">{{$t('ok')}}</button>
            </div>
            <div class="form-group" style="margin-bottom: 4px; justify-content: center; width: 50%;" v-else>
                <button class="btn btn-sign-up" @click="handle_accept">{{$t('ok')}}</button>
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
import { socket_bus } from '../../main';

export default {
    data() {
        return {
            is_show: false,
            message: 'Bạn muốn xoá ',
            id_shop: '',
            id_card: '',
            is_notification: false,
            is_redirect: false,
            topic: '',
            brand: {}
        }
    },
    methods: {
        handle_accept() {
            this.is_show = false;
            this.message = 'Bạn muốn xoá ';
            this.action = '';
            socket_bus.$emit('CLOSE_BOX', {is_redirect: this.is_redirect});
        },
        handle_ok() {
            var topic_response = '' //'SUCCESS_DEL_CATEGORY' : 'RESPONSE_DELETE'
            this.is_show = false;
            switch(this.topic) {
                case 'DEL_CATEGORY':
                    topic_response = 'SUCCESS_DEL_CATEGORY'
                    break
                case 'DELETE_BRAND':
                    topic_response = 'RESPONSE_DELETE'
                    break
                 case 'REMOVE':
                    topic_response = 'RESPONSE_DELETE_ACCOUNT'
                    break
                case 'DELETE_SUP_CODE':
                    topic_response = 'RESPONSE_DELETE_SUP'
                    break
                case 'CHANGE_STATUS' :
                    topic_response = 'RESPONSE_STATUS'
                    break
                case 'DELETE_ACCOUNT':
                    topic_response = 'RESPONSE_DELETE_CUSTOMER'
                    break
            }
            socket_bus.$emit(topic_response, {is_delete: true, data: this.brand})
        },
        handle_cancel() {
            this.is_show = false;
        }
    },
    created() {
       socket_bus.$on('SHOW_ALERT', (result) => {
           this.is_show = result.is_show
           this.message = result.message
           this.is_redirect = result.is_redirect
           this.topic = 'SHOW_ALERT'
           this.brand = result.brand != undefined ? result.brand : `${this.$t('notif')}`
       })

       socket_bus.$on('DELETE_BRAND', (result) => {
           this.topic = 'DELETE_BRAND'
           this.is_show = true
           this.brand = result.data
           this.message = `${result.data.name} ${this.$t('message_alert.is_del')}`
       })

       socket_bus.$on('UPDATE_BRAND', result => {
           this.is_show = true
           this.message = result.message
           this.brand = result.brand
           this.topic = 'UPDATE_BRAND'
       })

       socket_bus.$on('DEL_CATEGORY', result => {
           this.is_show = true
           this.topic = 'DEL_CATEGORY'
           this.brand = result.data
           this.message = result.message
       })

       socket_bus.$on('REMOVE', result => {
           this.is_show = true
           this.topic = 'REMOVE'
           this.brand = result.data,
           this.message = result.message
       })

       socket_bus.$on('DELETE_SUP_CODE', result => {
           this.is_show = true
           this.topic = 'DELETE_SUP_CODE'
           this.brand = result.brand
           this.message = result.message
       })

       socket_bus.$on('CHANGE_STATUS', result => {
           this.is_show = true;
           this.topic = 'CHANGE_STATUS'
           this.brand = result.brand
           this.message = result.message
       })

       socket_bus.$on('DELETE_ACCOUNT', result => {
           this.is_show = true;
           this.topic = 'DELETE_ACCOUNT'
           this.brand = result.brand
           this.message = result.message
       })
    }
}
</script>
