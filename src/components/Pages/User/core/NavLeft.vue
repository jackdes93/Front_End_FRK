<template>
   <div class="flex-box block-left-menu gray-bg" style="z-index: 9; position: fixed; top: 80px; left: 0;">
        <div class="flex-box block-info padding-full" style="padding-top: 16px;">
            <div class="flex-box circle-avatar margin-fix-right" style="position: relative">
                <img :src="`http://franchiseking.vn/${customer.avatar_path}`" :alt="`${customer.id}`">
                <span class="action-edit" v-on:click="handle_upload()"><i class="fas fa-edit"></i></span>
            </div>
            <div class="flex-box block-content" >
                <p class="label title-form text-uppercase bold" style="font-size: 16px;">{{customer.full_name}}</p>
                <div class="form-group flex-row-center" style="margin-top: 8px; background: none;" v-on:click="handle_logout">
                    <a class="label-cell text-color-second sm-size">{{$t('user_page.logout')}}</a>
                </div>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0, 0, 0, .4)" v-if="is_show">
            <div class="block-alert animation-transform-scale padding-full" style="width: 320px">
                <div class="form-group box-header">
                    <p class="text-center label text-uppercase" style="font-size: 20px;">{{$t('avatar_upload')}}</p>
                </div>
                <div class="form-group.col-group margin-bottom">
                    <ValidationProvider name="avatar" rules="required" v-slot="{ errors }" style="width: 100%;">
                        <input type="file" name="avatar" ref="avatar"  v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="form-group row-group">
                    <div class="form-group margin-bottom margin-fix-right" style="max-height: 120px" >
                        <img v-bind:src="url_preview" style="width: 100%; height: auto; object-fit: contain;">
                    </div>
                </div>
                <div class="form-group row-group flex-row-center" style="justify-content: center; margin-top: 16px;">
                    <div class="btn btn-sign-up margin-fix-right" style="width: 25%" v-on:click="handle_no_accept()">Cancel</div>
                    <button class="btn btn-sign-up primary-color" style="color:#FFF; width: 25%" @click="handle_accept">OK</button>
                </div>
            </div>
        </div>
        <br>
        <span class="line-separate"></span>
        <div class=" flex-box block-list padding-full" style="min-height: 72%;">
            <div class=" flex-box block-item margin-bottom">
                <div class="flex-box block-item-header">
                    <span class="icon"><i class="fas fa-user"></i></span>
                    <p class="label text-uppercase bold">{{$t('user_page.user_center')}}</p>
                </div>
                <div class="flex-box block-list flex-left" style="padding-left: 36px">
                    <div class="block-item flex-left margin-bottom-fix flex-row">
                        <router-link to="/user/info-user" class="label-cell black sm-size">{{$t('user_page.profile')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix flex-row">
                        <router-link to="/user/your-joining-demands" class="label-cell black sm-size">{{$t('user_page.your_joining_demand')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix flex-row">
                        <router-link to="/user/wish-list" class="label-cell black sm-size">{{$t('user_page.wish_list')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix flex-row">
                        <router-link to="/user/support-ticket" class="label-cell black sm-size">{{$t('user_page.support_ticket')}}</router-link>
                    </div>
                    <div class="block-item flex-left flex-row">
                        <router-link to="/user/faq" class="label-cell black sm-size">{{$t('user_page.fqa')}}</router-link>
                    </div>
                </div>
            </div>
            <div class=" flex-box block-item margin-bottom">
                <div class="flex-box block-item-header">
                    <span class="icon"><i class="fas fa-crown" style="color: #000;"></i></span>
                    <p class="label text-uppercase bold">{{$t('user_page.brand_center')}}</p>
                </div>
                <div class="flex-box block-list flex-left" style="padding-left: 36px">
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/user/your-brand" class="label-cell black sm-size">{{$t('user_page.your_brand')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/user/joining-demand-suggestion" class="label-cell black sm-size">{{$t('user_page.demand_suggestion')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/user/call-back-request" class="label-cell black sm-size">{{$t('user_page.call_back')}}</router-link>
                    </div>
                </div>
            </div>
            <div class=" flex-box block-item margin-bottom">
                <div class="flex-box block-item-header">
                    <span class="icon"><i class="fas fa-bullhorn"></i></span>
                    <p class="label text-uppercase bold">{{$t('user_page.adv_center')}}</p>
                </div>
                <div class="flex-box block-list flex-left" style="padding-left: 36px">
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/user/advertisement" class="label-cell black sm-size">{{$t('user_page.advertisement_list')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/user/advertisement-stop" class="label-cell black sm-size">{{$t('user_page.advertisement_stop')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/user/advertisement-type" class="label-cell black sm-size">{{$t('user_page.adv_type_price')}}</router-link>
                    </div>
                </div>
            </div>
            <span class="line-separate"></span>
            <div class="flex-box flex-row-center margin-fix-top">
                <router-link to="/">{{$t('user_page.back_home')}}</router-link>
            </div>
        </div>
        <div class="flex-box flex-row-center" style="background: #EEE; bottom: 0; padding: 8px;">
            <p class="label-cell sm-size text-center">2019 &copy; Franchise King <i class="fas fa-bolt text-color-primarry"></i> Brave Cat</p>
        </div>
    </div>
</template>

<script>
import { router } from '../../../../routers';
import { HTTP} from '../../../../http-common'
import {socket_bus} from '../../../../main'


export default {
    data() {
        return {
            customer: {},
            is_show: false,
            avatar: '',
            url_preview: ''
        }
    },
    methods: {
        handle_logout() {
            localStorage.clear()
            router.push('/')
        },
        handle_upload() {
            this.is_show = true
            this.url_preview = this.customer.avatar_path
        },
        handleFileUpload(e) {
            this.url_preview = []
            var files = e.target.files || e.dataTransfer.files;
            // var _URL = window.URL || window.webkitURL;
            // var image = new Image()
            if (!files.length)
                return;
            this.avatar = files[0]
            this.url_preview = URL.createObjectURL(files[0]);
        },
        handle_upload_image() {
            const data_form = new FormData();
            data_form.append("name", this.customer.id)
            data_form.append("avatar", this.avatar)
                
            return new Promise((resolve, reject) => {
                HTTP.post('/customers/upload-avatar/' + this.customer.id, data_form, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: 'Change Avatar Success'})
                        this.handle_get_new_info(this.customer.id)
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: 'Change Avatar Fail'})
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_no_accept() {
            this.is_show = false
        },
        handle_accept() {
            this.handle_upload_image()
        },
        handle_get_new_info(id) {
            return new Promise((resolve, reject) => {
                HTTP.get(`/customers/${id}`).then(result => {
                    resolve(result)
                    this.customer = result.data
                    this.is_show = false
                    localStorage.setItem('customer', JSON.stringify(this.customer))
                    setTimeout(() => { window.location.reload()}, 1500)
                }).catch(error => {
                    reject(error)
                    console.log(`Error: ${error}`);
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