<template>
    <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_show">
        <div class="block-alert padding-full">
            <div class="block-header bg-title-header padding-full header-fix width-full">
                <p class="title-form">{{$t('manager.manager_detail_info')}}</p>
            </div>
            <ValidationObserver v-slot="{ invalid }" style="min-width:80%">
                <form class="block-form" @submit.prevent="handle_update_info">
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('name')}}</span>
                        <ValidationProvider name="name_full" rules="required" v-slot="{errors}" style="width: 100%">
                            <input type="text" class="border-bottom-ol margin-bottom" name="name_full" v-model="account.full_name" >
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">Email </span>
                        <input type="text" class="border-bottom-ol margin-bottom" name="user_name" v-model="account.user_name" readonly>
                    </div>
                    <div class="form-group col-group" v-show="account.roles != 'ADMIN'">
                        <span class="label-span margin-bottom">{{$t('manager.role')}}</span>
                        <ValidationProvider name="category" rules="required" v-slot="{errors}" style="width: 100%">
                            <select name="category"  class="list-joining" v-model="account.roles">
                                <option value="" selected>-- {{$t('manager.select_roles')}} --</option>
                                <option v-bind:value="item" v-for="(item, index) in roles" :key="index">{{handle_translate_role(item)}}</option>
                            </select>
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group row-group" style="justify-content: center;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_show = false">{{$t('cancel')}}</div>
                        <button class="btn btn-signup" :disabled="invalid" :class="{'bg-title-header': !invalid, 'disable-button' : invalid}">{{$t('save')}}</button>
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
            is_show: false,
            account: {},
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
        handle_update_info() {
            HTTP_ADMIN.patch('/admin/' + this.account.id , this.account).then(result => {
                if(result.data.status == 200) {
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.update_account_success'), is_redirect: true})
                } else {
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.update_account_fail'), is_redirect: true})
                }
            })
        }
    },
    created() {
        socket_bus.$on('EDIT_ACCOUNT', result => {
            this.account = result.data
            this.is_show = true
        })
    }
}
</script>