<template>
    <div>
        <block_nav></block_nav>
        <div class="flex-col-center" style="display: flex; margin: 40px 0;">
            <div class="block-form flex-col-center" style="padding: 0 16px;">
                <ValidationObserver v-slot="{ invalid }">
                    <form class="form-signup" @submit.prevent="register">
                        <div class="form-header">
                            <p class="title-form" >{{$t('form_login.sign_up')}}</p>
                        </div>
                        <div class="form-content" style="padding: 0;  margin-top: 8px; heigh: auto">
                            <span class="label margin-bottom">{{$t('gender')}}</span>
                            <div class="form-group row-group margin-bottom">
                                <ValidationProvider name="gender" rules="required" v-slot="{errors}" style="width: 100%">
                                    <div class="form-group row-group" style="align-items: center; justify-content: left;">
                                        <input type="radio" name="gender" v-model="gender" value="MALE"  style="margin-right: 5px">
                                        <span class="label">{{$t('male')}}</span>
                                    </div>
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                                <ValidationProvider name="gender" rules="required" v-slot="{errors}" style="width: 100%">
                                    <div class="form-group row-group" style="align-items: center; justify-content: left;">
                                        <input type="radio" name="gender" v-model="gender" value="FEMALE"  style="margin-right: 5px">
                                        <span class="label">{{$t('female')}}</span>
                                    </div>
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                                <ValidationProvider name="gender" rules="required" v-slot="{errors}" style="width: 100%">
                                    <div class="form-group row-group" style="align-items: center; justify-content: left;">
                                        <input type="radio" name="gender" v-model="gender" value="OTHER"  style="margin-right: 5px">
                                        <span class="label">{{$t('other')}}</span>
                                    </div>
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group margin-bottom col-group"> 
                                <div class="form-group">
                                    <ValidationProvider name="name_full" rules="required" v-slot="{errors}" style="width: 100%">
                                        <input type="text" :placeholder="`${$t('form_joining.your_name')}`" name="name_full" v-model="name"> 
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group margin-bottom col-group"> 
                                <div class="form-group">
                                    <ValidationProvider name="phone_number" rules="required|regex:^([0-9]+)$" v-slot="{errors}" style="width: 100%">
                                        <input type="text" :placeholder="`${$t('form_joining.phone_number')}`" name="phone_number" v-model="phone_number" >
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group">
                                    <ValidationProvider name="address" rules="required" v-slot="{errors}" style="width: 100%">
                                        <input type="text" name="address" :placeholder="`${$t('form_joining.address')}`" v-model="address">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group">
                                    <datepicker :placeholder="`${$t('choose_birth')}`" class="date_picker" :disabled-dates="disable_date" :format="format" v-model="birthday"></datepicker>
                                </div>
                            </div>
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group">
                                    <ValidationProvider name="email" rules="required|email" v-slot="{errors}" style="width: 100%">
                                        <input type="text" name="email" placeholder="Email" v-model="email">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
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
                            <ValidationProvider name="agree" rules="required" v-slot="{errors}" style="width: 100%">
                                <div class="form-group margin-bottom" style="flex-direction:row; align-items: center;">
                                    <input type="checkbox" name="agree" v-model="agree" style="width: 40px; height: 40px;" >
                                    <p style="font-family: 'Quicksand'; font-size: 12px; flex: 8; text-align: center; letter-spacing: 1px;">{{$t('policy_sign')}} <span class="text-color-primarry ">{{$t('policy_sign_link_1')}}</span> <span class="text-color-primarry"> {{$t('policy_sign_link_2')}}</span></p>
                                </div>
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                            <div class="form-group flex-row-center" style="padding: 10px 0 20px 0;">
                                <router-link to="/login">{{$t('form_login.have_account')}}</router-link>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-sign-up" type="submit" :disabled="!agree">{{$t('form_login.sign_up')}}</button>   
                            </div>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
        <block_alert></block_alert>
        <block_footer></block_footer>
    </div>
    
</template>

<style scoped>
input[type="text"], input[type="password"], input[type="email"] { height: 42px;}
</style>

<script>
import block_nav from '../Units/BlockNav';
import datepicker from 'vuejs-datepicker';
import block_footer from '../Units/Block_Footer';
import block_alert from '../Units/Block_Notification';
import { socket_bus } from '../../main'
import  { router } from '../../routers';
import { HTTP } from '../../http-common';
 
export default {
    components: {
        block_nav, block_footer, block_alert, datepicker
    },
    data() {
        return {
            email: '',
            name: '',
            phone_number: '',
            address: '',
            password: '',
            confirmation: '',
            gender: 'MALE',
            agree: false,
            birthday: '',
            format: 'dd/MM/yyyy',
            disable_date : {
                from: new Date(),
                ranges: []
            },
        }
    },
    methods: {
        register() {
            const new_customer = {
                email: this.email,
                password: this.password,
                full_name: this.name,
                address: this.address,
                gender: this.gender,
                phone_number: this.phone_number,
                birthday: this.birthday.length == 0 ? this.get_current_date() : this.birthday
            }
            if(this.agree) {
                HTTP.post('customers', new_customer).then(result => {
                    if(result.data.status == 201) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.register_account_success')})
                        setTimeout(() => { router.push('/login') }, 3500)
                    } else if(result.data.status == 501){
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.email_exist')})
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.register_account_fail')})
                    }
                }).catch(error => {
                   console.log(error)
                })
            } else {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.empty_field')})
            }
        },
        get_current_date() {
            const current_date = new Date(Date.now())
            const date = current_date.getUTCDate() > 10 ? current_date.getUTCDate() : `0${current_date.getUTCDate()}`
            const month = current_date.getUTCMonth() > 10 ? current_date.getUTCMonth() + 1 : `0${current_date.getUTCMonth() + 1}`
            const year = current_date.getUTCFullYear()
            return `${date}/${month}/${year}`
        }
    },
    created() {
        socket_bus.$on('CLOSE_BOX', result => {
            if(result.is_redirect) {
                router.push('/login')
            }
        })

        if(localStorage.getItem('access_token') != undefined) {
            router.push('/user/info-user')
        }
    }
}
</script>