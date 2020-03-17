<template>
   <div>
        <block_nav></block_nav>
        <div class="flex-col-center" style="display: flex; margin: 60px 0;">
            <div class="block-form flex-col-center" v-if="is_reset">
                <ValidationObserver v-slot="{ invalid }">
                    <form class="form-login" @submit.prevent="handle_reset_password">
                        <div class="form-header">
                            <p class="title-form">{{$t('manager.forgot_pwd')}}</p>
                        </div>
                        <div class="form-content" style="height: auto; flex: 1; padding: 0;  margin-top: 20px;">
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group ">
                                    <ValidationProvider name="password" rules="required|min:9" v-slot="{errors}" style="width: 100%">
                                        <input type="password" :placeholder="`${$t('form_login.password')}`" name="password" v-model="password">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group ">
                                    <ValidationProvider name="re_password" rules="required|password:@password" v-slot="{errors}" style="width: 100%">
                                        <input type="password" :placeholder="`${$t('form_login.re_password')}`" name="re_password" v-model="confirmation">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group margin-top" >
                                <button type="submit" class="btn btn-login" :class="{' bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid"   style="width: 100%; border: none;">Reset Password</button>
                            </div>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
            <div class="form-group col-group" style="justify-content: center; align-items: center" v-else>
                <p class="title-form margin-bottom-fix">{{$t('link_not_exit')}}</p>
                <router-link to="/">{{$t('user_page.back_home')}}</router-link>
            </div>
        </div>
        <block_footer></block_footer>
        <block_alert></block_alert>
    </div>
   
</template>

<script>
import block_nav from '../Units/BlockNav';
import block_footer from '../Units/Block_Footer';
import block_alert from '../Units/Block_Notification';
import { socket_bus } from '../../main'
import { HTTP } from '../../http-common';
import { router } from '../../routers';

export default {
    components: {
        block_nav, block_footer,block_alert
    },
    data() {
        return {
            email: '',
            password: '',
            confirmation: '',
            token: '',
            is_reset: false,
            data: null
        }
    },
    methods: {
       handle_reset_password() {
           return new Promise((resolve, reject) => {
               HTTP.patch(`/reset-password/`,{id_ticket: this.data._id, password: this.password}).then(result => {
                   resolve(result)
                   if(result.data.status == 200) {
                       socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.reset_pwd_success')})
                       setTimeout(() => {
                           router.push('/')
                       }, 2000)
                   } else {
                       socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.reset_pwd_fail')})
                   }
               }).catch(error => {
                   reject(error)
                   console.log(error);
               })
           })
       },
       handle_check_token() {
           return new Promise((resolve, reject) => {
               HTTP.get(`/reset-password/token=${this.token}`).then(result => {
                   resolve(result)
                   this.is_reset = result.data.status == 200 ? true : false
                   this.data = result.data.status == 200 ? result.data.data : null;
               }).catch(error => {
                   reject(error)
                   console.log(error);
               })
           })
       }
    },
    created() {
        this.token = this.$route.params.token
        this.handle_check_token()
    }
}
</script>