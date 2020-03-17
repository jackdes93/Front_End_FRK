<template>
    <div class="block-model" style="background: rgba(0,0,0,.5)">
        <div class="block-alert padding-full">
            <div class="block-header bg-title-header padding-full header-fix width-full">
                <p class="title-form">{{$t('manager.add_account_manager')}}</p>
            </div>
            <ValidationObserver v-slot="{ invalid }" style="width: 90%; display: flex; align-items:center; justify-content: center;">
                <form class="block-form" @submit.prevent="handle_add_account" style="width: 85%;">
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('name')}}</span>
                        <ValidationProvider name="name_full" rules="required" v-slot="{errors}" style="width: 100%">
                            <input type="text" class="border-bottom-ol margin-bottom" name="name_full" v-model="account.full_name">
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">Email </span>
                        <ValidationProvider name="email" rules="required|email" v-slot="{errors}" style="width: 100%">
                            <input type="text" class="border-bottom-ol margin-bottom" name="email" v-model="account.user_name"> 
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group margin-bottom col-group">
                        <span class="label-span margin-bottom">{{$t('form_login.password')}}</span>
                        <div class="form-group ">
                            <ValidationProvider name="password" rules="required|min:9" v-slot="{errors}" style="width: 100%">
                                <input type="password" :placeholder="`${$t('form_login.password')}`" name="password" v-model="account.password">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>
                    <div class="form-group margin-bottom col-group">
                        <span class="label-span margin-bottom">{{$t('form_login.re_password')}}</span>
                        <div class="form-group ">
                            <ValidationProvider name="re_password" rules="required|password:@password" v-slot="{errors}" style="width: 100%">
                                <input type="password" :placeholder="`${$t('form_login.re_password')}`" name="re_password" v-model="confirmation">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>  
                    </div>
                    <div class="form-group col-group" v-show="account.roles != 'ADMIN'">
                        <span class="label-span margin-bottom">{{$t('manager.role')}}</span>
                        <ValidationProvider name="name_category" rules="required" v-slot="{errors}" style="width: 100%">
                            <select name="name_category"  class="list-joining" v-model="account.roles">
                                <option value="" selected>-- {{$t('manager.select_roles')}} --</option>
                                <option v-bind:value="item" v-for="(item, index) in roles" :key="index">{{handle_translate_role(item)}}</option>
                            </select>
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group row-group" style="justify-content: center;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="handle_close_form">{{$t('cancel')}}</div>
                        <button class="btn btn-signup primary-color" style="color: #FFF" :disabled="invalid">{{$t('save')}}</button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import {socket_bus } from '../../../../main'
import { HTTP_ADMIN } from '../../../../http-common';

export default {
    data() {
        return {
            confirmation: '',
            account: {full_name: '', user_name: '', roles: '', password: ''},
            roles: ['MODERATOR', 'MONITOR']
        }
    },
    methods : {
        handle_translate_role(role) {
            switch(role) {
                case 'MODERATOR':
                    return this.$t('manager.role_mod')
                case 'MONITOR':
                    return this.$t('manager.role_monit')
            }
        },
        handle_add_account() {
            HTTP_ADMIN.post('admin', this.account).then(result => {
                if(result.data.status == 201) {
                    this.account = {full_name: '', user_name: '', roles: '', password: ''}
                    socket_bus.$emit('ADD_ACCOUNT_SUCCESS', {data: result.data.data})
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.register_account_success'), is_redirect: true})
                    setTimeout(() => {this.handle_close_form()}, 5000) 
                } else {
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.register_account_fail'), is_redirect: true})
                }
            })
        },
        handle_close_form() {
            socket_bus.$emit('CLOSE_FORM_ADD', {data: false})
        }
    }
}
</script>