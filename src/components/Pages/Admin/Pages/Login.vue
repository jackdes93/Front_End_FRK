<template>
    <div>
        <div class="container">
            <div class="flex-box" style="min-height: 100vh; flex-direction: row;">
                <div class="block-login-admin">
                    <div class="logo " style="flex:none; width: 360px; height: 84px; margin-bottom: 16px;">
                        <router-link to="/"><img src="/image/Logo@2x.png" alt="LOGO" style="border-radius: 0; object-fit: fill;"></router-link>
                    </div>
                    <ValidationObserver v-slot="{ invalid }">
                        <form class="form-login" @submit.prevent="handle_login" style="box-shadow:none;">
                            <div class="form-header col-group" >
                                <span class="text-uppercase" style="margin-bottom: 8px;">{{$t('manager.welcome')}}</span>
                                <p class="title-form">{{$t('manager.title_login')}} </p>
                            </div>
                            <div class="form-content" style=" flex: 1; padding: 0;  margin-top: 20px;">
                                <div class="form-group col-group" style="margin-bottom: 16px;">
                                    <span class="label" style="margin-bottom: 8px;">Email</span>
                                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" style="width: 100%;">
                                        <input type="text" name="email" placeholder="Email" v-model="email" style="height: 40px; border-radius: 8px;">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group" style="margin-bottom: 16px;">
                                    <span class="label" style="margin-bottom: 8px;">{{$t('form_login.password')}}</span>
                                    <ValidationProvider name="password" rules="required|min:9" v-slot="{ errors }" style="width: 100%;">
                                        <input type="password" :placeholder="`${$t('form_login.password')}`" name="password" v-model="password" style="height: 40px;border-radius: 8px;">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group" style="align-items: flex-end;">
                                <span>
                                    <router-link to="/">{{$t('manager.forgot_pwd')}}</router-link>
                                </span>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-login bg-title-header" :disabled=invalid style="width: 100%; border: none; height: 52px; border-radius: 8px;">{{$t('form_login.login')}}</button>
                                </div>
                            </div>
                        </form>
                    </ValidationObserver>
                </div>
                <div class="block-img img-introduct">
                    <img src="/image/bg_login.jpg" alt="Background Introduct" >
                </div>
            </div>
        </div>
        <block_notification></block_notification>
    </div>
</template>

<style>
.block-login-admin { display: flex; justify-content: center; align-items: center; width: 40%; height: 100%; flex-direction: column; min-height: 100vh; padding: 0 25px;}
.block-img { display: flex; width: 60%; height: 100%; background: coral; min-height: 100vh;}
.block-img img { width: 100%; object-position: center; object-fit: cover; border-radius: 0;}
</style>


<script>
import {socket_bus} from '../../../../main'
import { router } from '../../../../routers';
import block_notification from '../../../Units/Block_Notification'
export default {
    components: {block_notification},
    data() {
        return {
            email:'',
            password: ''
        }
    },
    methods: {
        handle_login() {
            const info = {email: this.email, password: this.password}
            this.$store.dispatch('handle_sign_in_manager', info).then(result => {
                if(result.data.status == 200) {
                    window.location.reload()
                    router.push('/manager')
                } else {
                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.login_error')})
                    router.push('/manager-login')
                }
            })
        }
    },
    created() {
        if(localStorage.getItem('token_manager')) {
            router.push('/manager')
        }
    }
}
</script>