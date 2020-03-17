<template>
   <div>
        <block_nav></block_nav>
        <div class="flex-col-center" style="display: flex; margin: 60px 0;">
            <div class="block-form flex-col-center">
                <ValidationObserver v-slot="{ invalid }">
                    <form class="form-login" @submit.prevent="handle_send_link_reset">
                        <div class="form-header">
                            <p class="title-form">{{$t('manager.forgot_pwd')}}</p>
                        </div>
                        <div class="form-content" style="height: auto; flex: 1; padding: 0;  margin-top: 20px;">
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group">
                                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" style="width: 100%;">
                                        <input type="text" name="email" placeholder="Email" v-model="email" >
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <vue-recaptcha id="capcah" sitekey="6LeeM74UAAAAAJ71ru17H2h-hReSNO_07eNNm7Is" :loadRecaptchaScript="true" @verify="handle_verify" @expired="handle_expired" ref="recaptcha" ></vue-recaptcha >
                            <div class="form-group margin-top" >
                                <button type="submit" class="btn btn-login" :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid"   style="width: 100%; border: none;">{{$t('manager.send_reset')}}</button>
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

<script>
import block_nav from '../Units/BlockNav';
import block_footer from '../Units/Block_Footer';
import block_alert from '../Units/Block_Notification';
import { socket_bus } from '../../main'
import VueRecaptcha from 'vue-recaptcha'
import { HTTP } from '../../http-common';
import { router } from '../../routers';

export default {
    components: {
        block_nav, block_footer,block_alert, VueRecaptcha
    },
    data() {
        return {
            email: '',
            token_recaptcha: null,
        }
    },
    methods: {
        handle_verify: function(response) {
           this.token_recaptcha = response
        },
        handle_expired: function () {
            this.$refs.recaptcha.reset()
        },
        handle_load() {
            this.$recaptchaLoaded().then(() => {

            })
        },
        handle_send_link_reset() {
            if(this.token_recaptcha != null) {
                return new Promise((resolve, reject) => {
                    HTTP.post(`/reset-password`, {email: this.email}).then(result => {
                        resolve(result)
                        if(result.data.status == 201) {
                            socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.send_link_reset_success')})
                            setTimeout(() => {
                                router.push('/')
                            }, 2000)
                        } else {
                            socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.send_link_reset_fail')})
                        }   
                    }).catch(error => {
                        reject(error)
                        console.log(error);
                    })
                })
            } else {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.check_capcha')})
            }
        }
    },
    created() {

    }
}
</script>