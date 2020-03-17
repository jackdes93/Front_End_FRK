<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style=" background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('manager.admin_list')}}</p>
            </div>
            <div class="form-group row-group" style="justify-content: flex-end">
                <button class="btn btn-signup primary-color" style="color: #FFF; " v-on:click="is_add = true">{{$t('manager.new_account')}}</button>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header margin-fix-right" style="max-width: 36px; width: 36px">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                    </div>
                    <div class="block-item-row-header margin-fix-right" style="max-width: 140px; width: 140px;">
                        <p class="label text-color-second ">{{$t('name')}}</p>
                    </div>
                    <div class="block-item-row-header margin-fix-right" >
                        <p class="label text-color-second ">Email</p>
                    </div>
                    <div class="block-item-row-header margin-fix-right" style="max-width:140px; width: 140px;">
                        <p class="label text-color-second ">{{$t('manager.role')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second" style="text-align:center; width: 100%;">{{$t('action')}}</p>
                    </div>
                </div>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group row-group border-bottom-ol padding-full row-animation flex-row-center" v-for="(account, index) in accounts" :key="index">
                    <div class="block-item-row margin-fix-right" style="max-width: 36px; width: 36px">
                        <p class="label-cell">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row margin-fix-right" style="max-width: 140px; width: 140px;">
                        <p class="label-cell">{{account.full_name}}</p>
                    </div>
                    <div class="block-item-row margin-fix-right" >
                        <p class="label-cell bold">{{account.user_name}}</p>
                    </div>
                    <div class="block-item-row margin-fix-right" style="max-width:140px; width: 140px;">
                        <p class="label-cell">{{handle_translate_role(account.roles)}}</p>
                    </div>
                    <div class="block-item-row" style="justify-content: flex-end; align-items: flex-end; flex-direction: row">
                        <a class="label-cell flex-box margin-fix-right md-size border-right" style="justify-content: flex-start;" v-on:click="handle_reset_pass(account)">{{$t('manager.reset_pwd')}}</a>
                        <a class="label-cell flex-box margin-fix-right md-size border-right"  style="justify-content: flex-start;" v-on:click="handle_edit_account(account)">{{$t('edit')}}</a>
                        <a class="label-cell flex-box md-size" style="justify-content: flex-start;" v-bind:class="{'gray' : account.roles == 'ADMIN'}" v-on:click="handle_remove_account(account)">{{$t('remove')}}</a>
                    </div>
                </div>
            </form>
        </div>
        <Form_Add_Account v-if="is_add"></Form_Add_Account>
        <Detail_Account></Detail_Account>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_change_pass">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('change_pass')}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style="min-width:80%">
                    <form class="block-form" @submit.prevent="handle_change_password" >
                        <div class="form-group margin-bottom col-group">
                            <span class="label-span margin-bottom">{{$t('form_login.password')}}</span>
                            <div class="form-group ">
                                <ValidationProvider name="password" rules="required|min:9" v-slot="{errors}" style="width: 100%">
                                    <input type="password" :placeholder="`${$t('form_login.password')}`" name="password" v-model="new_password">
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="form-group margin-bottom col-group">
                            <span class="label-span margin-bottom">{{$t('form_login.re_password')}}</span>
                            <div class="form-group ">
                                <ValidationProvider name="re_password" rules="required|password:@password" v-slot="{errors}" style="width: 100%">
                                    <input type="password" :placeholder="`${$t('form_login.re_password')}`" name="re_password">
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="form-group row-group" style="justify-content: center;">
                            <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_change_pass = false">{{$t('cancel')}}</div>
                            <button class="btn btn-signup" :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid">{{$t('save')}}</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>
<style scoped>
.border-right { border-right: 1px solid #A2A2A2;}
</style>

<script>
import {HTTP_ADMIN} from '../../../../http-common'
import { socket_bus } from '../../../../main';
import Detail_Account from '../../Admin/Pages/DetailAccountManager';
import Form_Add_Account from '../../Admin/Pages/FormAddAccount'
import { Promise } from 'q';

export default {
    components:{
        Detail_Account, Form_Add_Account
    },
    data() {
        return {
            accounts: [],
            is_add: false,
            is_change_pass: false,
            new_password: '',
            account_selected: {},
            is_refresh : 0
        }
    },
    methods: {
        handle_translate_role(role) {
            switch(role) {
                case 'ADMIN':
                    return this.$t('manager.role_ad')
                case 'MODERATOR':
                    return this.$t('manager.role_mod')
                case 'MONITOR':
                    return this.$t('manager.role_monit')
            }
        },
        handle_get_accounts() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get(`/admin`).then(result => {
                    this.accounts = result.data.status == 200 ? result.data.data : []
                    resolve(result.data)
                }).catch(error => {
                    reject(error)
                    console.log('Error get account admin :' + error);
                })
            })
        },
        handle_reset_pass(account) {
            this.is_change_pass = true;
            this.account_selected = account
        },
        handle_change_password() {
            HTTP_ADMIN.patch('/admin/update-password/' + this.account_selected.id, {new_password:this.new_password}).then(result => {
                if(result.data.status == 200) {
                    this.is_change_pass = false
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.change_pass_success'), is_redirect: true})
                } else {
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.change_pass_fail'), is_redirect: true})
                }
            }).catch(error => {
                console.log('Error get account admin :' + error);
            })
        },
        handle_edit_account(account) {
           socket_bus.$emit('EDIT_ACCOUNT', {data: account})
        },
        handle_remove_account(account) {
            if(account.roles != 'ADMIN') {
                socket_bus.$emit('REMOVE', {data: account, message: this.$t('message_alert.remove_account')})
            }
            
        }
    },
    created() {
        this.handle_get_accounts()
        socket_bus.$on('CLOSE_FORM_ADD', result => {
            this.is_add = result.state
            window.location.reload()
        })

        socket_bus.$on('ADD_ACCOUNT_SUCCESS', result => {
            this.accounts.push(result.data)
        })

        socket_bus.$on('RESPONSE_DELETE_ACCOUNT', result => {
            if(result.is_delete) {
                HTTP_ADMIN.delete('/admin/' + result.data.id).then(result => {
                   if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.del_account_success'), is_redirect: true})
                        this.accounts.splice(this.accounts.indexOf(result.data), 1)
                        window.location.reload()
                    } else {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.del_account_fail'), is_redirect: true})
                    }
                }).catch(error => {
                    console.log('Error get account admin :' + error);
                })
            }
        })
    }
}
</script>