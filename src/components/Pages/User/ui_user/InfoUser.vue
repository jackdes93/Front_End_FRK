<template>
    <div class="flex-box block-info-user padding-full">
        <div class="block-custom width-full padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('user_page.edit_profile')}}</p>
                <p class="label-cell white">{{$t('user_page.comple_profile')}}</p>
            </div>
            <ValidationObserver v-slot="{ invalid }">
                <form class="block-form">
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right ">
                            <span class="label-span margin-bottom">{{$t('user_page.full_name')}}</span>
                            <ValidationProvider name="name_full" rules="required" v-slot="{ errors }" style="width: 100%;">
                                <input type="text" name="name_full" class="border-bottom-ol" v-model="customer.full_name" :readonly="readonly">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('form_joining.your_email')}}</span>
                            <input type="text" name="email" v-model="customer.email" class="border-bottom-ol" readonly>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('user_page.address')}} </span>
                            <ValidationProvider name="name_full" rules="required" v-slot="{ errors }" style="width: 100%;">
                                <input type="text" name="address" class="border-bottom-ol" v-model="customer.address" :readonly="readonly">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('user_page.birthday')}} </span>
                            <input type="text" class="border-bottom-ol margin-bottom" name="birthday" v-model="customer.birthday" readonly >
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.phone_number')}}</span>
                            <ValidationProvider name="phone_number" rules="required|regex:^([0-9]+)$" v-slot="{ errors }" style="width: 100%;">
                                <input type="text" name="phone_number" v-model="customer.phone_number" class="border-bottom-ol" :readonly="readonly">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('user_page.account_type')}}</span>
                            <input type="text" v-model="customer.level" class="border-bottom-ol" readonly>
                        </div>
                    </div>

                    <div class="form-group row-group" >
                        <div class="form-group" style="align-items: center; justify-content: center;" v-show="!is_edit">
                            <div class="btn btn-sign-up " style="border:1px solid #ED6B28; width: 160px;" v-on:click="handle_cancel">{{$t('cancel')}}</div>
                        </div>
                        <div class="form-group" v-if="is_edit" style="align-items: center; justify-content: center;">
                            <div class="btn btn-login bg-title-header" style="border:none;" v-on:click="handle_edit">{{$t('edit')}}</div>
                        </div>
                        <div class="form-group" v-else style="align-items: center; justify-content: center;">
                            <button class="btn btn-login" :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" style="border:none;" :disabled="invalid" v-on:click="handle_save">{{$t('save')}}</button>
                        </div>
                        <div class="form-group" style="align-items: center; justify-content: center" v-if="is_edit">
                            <div class="btn btn-login bg-title-header" style="border:none;" v-on:click="is_change_password = true">{{$t('change_pass')}}</div>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </div>
        <block_alert></block_alert>
        <div class="block-model" style="background: rgba(0,0,0,.5); " v-if="is_change_password">
            <div class="block-alert padding-full animation-tranform-scale" style="max-width: 360px;">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('change_pass')}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style="display: flex; align-items: center;">
                    <form class="block-form" style="width: 100%;" @submit.prevent="handle_change_password">
                        <div class="form-group margin-bottom col-group">
                            <span class="label-span margin-bottom-fix">{{$t('form_login.password')}}</span>
                            <ValidationProvider name="password" rules="required|min:9" v-slot="{errors}" style="width: 100%">
                                <input type="password" :placeholder="`${$t('form_login.password')}`" name="password" v-model="password">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group margin-bottom col-group" style="margin-top: 16px;">
                            <span class="label-span margin-bottom-fix">{{$t('form_login.re_password')}}</span>
                            <ValidationProvider name="re_password" rules="required|password:@password" v-slot="{errors}" style="width: 100%">
                                <input type="password" :placeholder="`${$t('form_login.re_password')}`" name="re_password" v-model="confirmation">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group row-group" style="justify-content: center; margin-top: 16px;">
                            <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_change_password = false">{{$t('cancel')}}</div>
                            <button class="btn btn-signup primary-color" style="color: #FFF" :disabled="invalid">{{$t('save')}}</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div> 
</template>

<script>
import { HTTP } from '../../../../http-common'
import { socket_bus } from '../../../../main'
import block_alert from '../../../Units/Block_Alert'

export default {
    components: {
        block_alert
    },
    data() {
        return {
            is_edit: true,
            is_change_password: false,
            readonly: true,
            customer: {},
            password: '',
            confirmation: ''
        }
    },
    methods: {
        handle_edit() {
            this.is_edit = false;
            this.readonly = false;
        },
        handle_cancel() {
            this.is_edit = true;
            this.readonly = true;
            this.customer = JSON.parse(localStorage.getItem('customer'))
        },
        handle_save() {
            const data = {id: this.customer.id, updateOps: this.customer}
            HTTP.patch('/customers/' + data.id, data.updateOps).then(result => {
                if(result.status == 200) {
                    this.is_edit = true;
                    this.readonly = true;
                    localStorage.removeItem('customer')
                    localStorage.setItem('customer', JSON.stringify(this.customer))
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: `${this.$t('message_alert.update_account_success')}`, is_redirect: true})
                } else {
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: `${this.$t('message_alert.update_account_fail')}`, is_redirect: false})
                }
            }).catch(error => {
                console.log(error);
            })
        },
        handle_change_password() {
            const id_customer = this.customer.id
            return new Promise((resolve, reject) => {
                HTTP.patch('/customers/update-password/' + id_customer, {password: this.password}).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        this.is_change_password = false
                         socket_bus.$emit('SHOW_ALERT', {is_show: true, message: `${this.$t('message_alert.change_pass_success')}`, is_redirect: true})
                    } else {
                         socket_bus.$emit('SHOW_ALERT', {is_show: true, message: `${this.$t('message_alert.change_pass_fail')}`, is_redirect: true})
                    }
                })
                .catch(error => {
                    reject(error)
                    this.password = ''
                    console.log('Error: ' + error)
                })
            })
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
        }
        
    }
}
</script>