<template>
   <div class="flex-box block-left-menu gray-bg" style="z-index: 9; position: fixed; top: 80px; left: 0; height:0;">
        <div class="flex-box block-info padding-full" style="padding-top: 16px;">
            <div class="flex-box circle-avatar margin-fix-right" style="position: relative">
                <img :src="`http://franchiseking.vn/${manager.avatar}`" :alt="`${manager.id}`">
                <span class="action-edit" v-on:click="handle_upload()"><i class="fas fa-edit"></i></span>
            </div>
            <div class="flex-box block-content" >
                <p class="label title-form text-uppercase bold margin-bottom-fix" style="font-size: 18px;">{{manager.full_name}}</p>
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
                    <span class="icon"><i class="fas fa-cogs"></i></span>
                    <p class="label text-uppercase bold">{{$t('manager.systems')}}</p>
                </div>
                <div class="flex-box block-list flex-left" style="padding-left: 36px">
                    <div class="block-item flex-left margin-bottom-fix flex-row">
                        <router-link to="/manager/admin-list" class="label-cell black sm-size">{{$t('manager.ad_ma')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix flex-row">
                        <router-link to="/manager/menu-editor" class="label-cell black sm-size">{{$t('form_joining.category')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix flex-row">
                        <router-link to="/manager/fqa-management" class="label-cell black sm-size">{{$t('manager.fqa_manager')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix flex-row">
                        <router-link to="/manager/support-center" class="label-cell black sm-size">{{$t('manager.support_center')}}</router-link>
                    </div>
                     <div class="block-item flex-left margin-bottom-fix flex-row">
                        <router-link to="/manager/settings" class="label-cell black sm-size">{{$t('manager.support_code_setting')}}</router-link>
                    </div>
                </div>
            </div>
            <div class=" flex-box block-item margin-bottom">
                <div class="flex-box block-item-header">
                    <span class="icon"><i class="fas fa-user-cog"></i></span>
                    <p class="label text-uppercase bold">{{$t('manager.user')}}</p>
                </div>
                <div class="flex-box block-list flex-left" style="padding-left: 36px">
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/manager/user-list" class="label-cell black sm-size">{{$t('manager.user_list')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/manager/brand-list" class="label-cell black sm-size">{{$t('manager.brand_list')}}</router-link>
                    </div>
                </div>
            </div>
            <div class=" flex-box block-item margin-bottom">
                <div class="flex-box block-item-header">
                    <span class="icon"><i class="fas fa-bullhorn"></i></span>
                    <p class="label text-uppercase bold">{{$t('manager.adv')}} </p>
                </div>
                <div class="flex-box block-list flex-left" style="padding-left: 36px">
                     <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/manager/advertisement-type" class="label-cell black sm-size">{{$t('manager.adv_type')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/manager/advertising-wait-list" class="label-cell black sm-size">{{$t('manager.adv_wait')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/manager/advertising-stop-list" class="label-cell black sm-size">{{$t('manager.advertisement_stop')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/manager/advertising-list" class="label-cell black sm-size">{{$t('user_page.advertisement_list')}}</router-link>
                    </div>
                </div>
            </div>
            <div class=" flex-box block-item margin-bottom">
                <div class="flex-box block-item-header">
                    <span class="icon"><i class="fas fa-chart-area"></i></span>
                    <p class="label text-uppercase bold">{{$t('manager.report')}} </p>
                </div>
                <div class="flex-box block-list flex-left" style="padding-left: 36px">
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/manager/report-view-brand" class="label-cell black sm-size">{{$t('manager.visit')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/manager/report-call-back" class="label-cell black sm-size">{{$t('manager.request_call')}}</router-link>
                    </div>
                    <div class="block-item flex-left margin-bottom-fix">
                        <router-link to="/manager/report-wish-brand" class="label-cell black sm-size">{{$t('manager.wish')}}</router-link>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex-box flex-col-center padding-full" style="background: #EEE; bottom: 0;">
            <p class="label-cell sm-size text-center">2019 &copy; Franchise King <i class="fas fa-bolt text-color-primarry"></i> Brave Cat</p>
        </div>
    </div>
</template>
<style> 
.action-edit { display: block; position: absolute; bottom: 8px; right: 0;}
.action-edit .fa-edit { display: none}
.circle-avatar:hover .action-edit .fa-edit { display: block; color: #2A2A2A;}
</style>
<script>
import { router } from '../../../../routers';
import { HTTP_ADMIN} from '../../../../http-common'
import { socket_bus } from '../../../../main'

export default {
    data() {
        return {
            manager: {},
            avatar: '',
            is_show: false,
            url_preview: ''
        }
    },
    methods: {
        handle_logout() {
            localStorage.removeItem('token_manager')
            router.push('/manager-login')
        },
        handle_upload() {
            this.is_show = true
            this.url_preview = this.manager.avatar
        },
        handleFileUpload(e) {
            this.url_preview = []
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.avatar = files[0]
            this.url_preview = URL.createObjectURL(files[0]);
        },
        handle_upload_image() {
            const data_form = new FormData();
            data_form.append("name", this.manager.id)
            data_form.append("avatar", this.avatar)
                
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.post('/admin/upload-avatar/' + this.manager.id, data_form, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: 'Change Avatar Success'})
                        this.handle_get_new_info(this.manager.id)
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
            console.log(id)
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get(`/admin/${this.manager.id}`).then(result => {
                    resolve(result)
                    this.manager = result.data.data
                    this.is_show = false
                    localStorage.setItem('manager', JSON.stringify(this.manager))
                    setTimeout(() => { window.location.reload()}, 1500)
                }).catch(error => {
                    reject(error)
                    console.log(`Error: ${error}`);
                })
            })
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('manager'))) {
            this.manager = JSON.parse(localStorage.getItem('manager'))
        }
    }

}
</script>