<template>
    <div>
        <block_nav></block_nav>
        <div class="flex-col-center login-block" style="display: flex; margin: 60px 0;">
            <div class="block-form flex-col-center">
                <ValidationObserver v-slot="{ invalid }">
                    <form class="form-login" @submit.prevent="handle_login">
                        <div class="form-header">
                            <p class="title-form">{{$t('form_login.login')}}</p>
                        </div>
                        <div class="form-content" style="height: auto; flex: 1; padding: 0;  margin-top: 20px;">
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group">
                                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" style="width: 100%;">
                                        <input type="text" name="email" placeholder="Email" v-model="email">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group ">
                                    <ValidationProvider name="password" rules="required|min:9" v-slot="{ errors }" style="width: 100%;">
                                        <input type="password" name="password" v-model="password" :placeholder="`${$t('form_login.re_password')}`">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <vue-recaptcha id="capcah" sitekey="6LeeM74UAAAAAJ71ru17H2h-hReSNO_07eNNm7Is" :loadRecaptchaScript="true" @verify="handle_verify" @expired="handle_expired" ref="recaptcha" class="margin-bottom" style="display: flex; justify-content: center;"></vue-recaptcha >
                            <div class="form-group col-group margin-bottom" style="align-items: center;">
                                <span class="flex-row-center " style="display: flex; width: 100%; justify-content: flex-start; margin-bottom: 24px;">
                                    <input type="checkbox" name="remember" v-model="remember" style="margin-right:10px; flex: 1;">
                                    <p style="font-family: 'Quicksand Light'; font-size: 12px; flex: 2">{{$t('form_login.remember')}}</p>
                                </span>
                                <span class="form-group row-group flex-row-center margin-bottom" style="justify-content: center">
                                    <router-link to="/forgot-password" style="display:flex;">{{$t('manager.forgot_pwd')}} ?</router-link>
                                </span>
                                <div class="form-group margin-bottom" >
                                    <button type="submit" class="btn btn-login bg-title-header" :disabled="invalid"  style="width: 100%; border: none;">{{$t('form_login.login')}}</button>
                                </div>
                                <div class="form-group margin-bottom">
                                    <router-link to="/signup" class="btn btn-sign-up">{{$t('form_login.sign_up')}}</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="block-login-social" style="display:flex; width: 100%; flex-direction: column; justify-content: flex-start; flex: 1; align-items: center;">
                            <div class="form-header" style="padding: 20px 0; width: 100%;">
                                <p class="title-form">{{$t('form_login.social')}}</p>
                            </div>
                            <div class="form-group col-group" style="margin-top: 23px; height: 100%; ">
                                <div class="btn btn-social margin-fix-bottom" style="width: 100%; height: 45px; justify-content: flex-start; background: #00aced; border: none; margin-bottom: 8px;" >
                                    <span style="display: flex; justify-content: center; align-items: center; width: 32px; height: 32px; margin: 0 0 0 20px;">
                                        <img src="../../assets/image/zalo.png" alt="">
                                    </span>
                                    <p style="width: 100%; text-align: center; color: #FFF;">{{$t('form_login.connect')}} Zalo</p>
                                </div>
                                <div class="btn btn-social margin-fix-bottom" style="width: 100%; height: 45px; justify-content: flex-start; background: #44619d; border: none; " >
                                    <facebook-login class="" style="display: flex; width: 100%; height: 40px;"
                                        appId="326022817735322"
                                        @login="getUserData"
                                        @logout="onLogout"
                                        @get-initial-status="sdkLoaded">
                                    </facebook-login>
                                </div>
                            </div>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
        <block_footer></block_footer>
        <block_alert></block_alert>
    </div>
   
</template>

<style scoped>
input[type="text"], input[type="password"] { height: 42px;}
</style>

<script>
import block_nav from '../Units/BlockNav';
import block_footer from '../Units/Block_Footer';
import block_alert from '../Units/Block_Alert';
import { socket_bus } from '../../main'
import {router} from '../../routers';
import VueRecaptcha from 'vue-recaptcha'
import facebookLogin from 'facebook-login-vuejs';

export default {
    components: {
        block_nav, block_footer,block_alert, VueRecaptcha, facebookLogin, 
    },
    data() {
        return {
            email: '',
            password: '',
            remember: false,
            token_recaptcha: null,
            FB: undefined,
            isConnected: false,
        }
    },
    methods: {
        getUserData() {
            this.FB.api('/me', {fields: 'id,name,email'}, user_info => {
                console.log(user_info);
            })
        },
        sdkLoaded(payload) {
            this.isConnected = payload.isConnected
            this.FB = payload.FB
            if(this.isConnected) this.getUserData()
        },
        onLogin() {
            this.isConnected = true
            this.getUserData()
        },
        onLogout() {
            this.isConnected = false
        },
        handle_login() {
            // if(this.token_recaptcha != null) {
                const info_login = {email: this.email, password: this.password}
                this.$store.dispatch('handle_sign_in', info_login).then(result => {
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_success'), is_redirect: true, brand: {name: this.$t('success')}})
                    } else if(result.data.status == 403) {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_not_active'), is_redirect: false, brand: {name: this.$t('fail')}})
                    } else if(result.data.status == 503) {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_lock'), is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                    } else if(result.data.status == 401) {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_error'), is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                    } else {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_error'), is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                    }
                })
            // } else {
            //     socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('auth_capcha'), is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
            // }
        },
        handle_verify: function(response) {
           this.token_recaptcha = response
        },
        handle_expired: function () {
            this.$refs.recaptcha.reset()
        },
        handle_load() {
            this.$recaptchaLoaded().then(() => {

            })
        }
    },
    created() {
        socket_bus.$on('CLOSE_BOX', result => {
            if(result.is_redirect && localStorage.getItem('access_token') != undefined) {
                window.location.reload()
                router.push('/user/info-user')
            } else {
                router.push('/login')
            }
        })

        if(localStorage.getItem('access_token') != undefined) {
            router.push('/user/info-user')
        }
    }

}
</script>