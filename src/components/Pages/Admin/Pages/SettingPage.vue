<template>
    <div class="flex-box padding-full block-custom-header flex-row-center">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED; width:86%; ">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('sup_code')}}</p>
            </div>
            <div class="form-group row-group " style="justify-content: flex-end; margin-bottom: 8px;">
                <button class="btn btn-signup primary-color" style="color: #FFF; " v-on:click="is_add = true">{{$t('new_support_code')}}</button>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-item-row-header" style="max-width: 92px !important">
                    <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                </div>
                <div class="block-item-row-header" >
                    <p class="label text-color-second ">{{$t('name')}}</p>
                </div>
                <div class="block-item-row-header" style="max-width: 140px !important;">
                    <p class="label text-color-second ">{{$t('action')}}</p>
                </div>
            </div>
            <div class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group row-group border-bottom-ol padding-full" v-if="support_codes.length == 0">
                    <span class="label text-center width-full">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation" v-else v-for="(code, index) in support_codes" :key="index">
                    <div class="block-item-row " style="max-width: 72px !important">
                        <p class="label-cell ">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{handle_show_content_support(code)}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 140px !important;">
                        <div class="form-group flex-row-center margin-fix-right">
                            <a class="label-cell" v-on:click="handle_detail_code(code)">{{$t('edit')}}</a>
                        </div>
                        <div class="form-group ">
                            <a class="label-cell" v-on:click="handle_remove_code(code)">{{$t('remove')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_add">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('add_support_code')}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style=" width: 100%; justify-content: center; display: flex;">
                    <form class="block-form" @submit.prevent="handle_add_support_code" style="min-width: 85%">
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Name </span>
                            <ValidationProvider name="name_code" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" name="name_code" v-model="new_code.name_en" >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">名稱 </span>
                            <ValidationProvider name="name_code" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" name="name_code_tw" v-model="new_code.name_tw" >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Tên </span>
                            <ValidationProvider name="name_code" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" name="name_code_vi" v-model="new_code.name_vi">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group row-group" style="justify-content: center;">
                            <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_add = false">{{$t('cancel')}}</div>
                            <button class="btn btn-signup" :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid">{{$t('save')}}</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_edit">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{code_selected._id}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style=" width: 100%; justify-content: center; display: flex;">
                    <form class="block-form" @submit.prevent="handle_update_support_code" style="min-width: 85%">
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Name </span>
                            <ValidationProvider name="name_code" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" name="name_code" v-model="code_selected.name_en" >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">名稱 </span>
                            <ValidationProvider name="name_code" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" name="name_code_tw" v-model="code_selected.name_tw" >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Tên </span>
                            <ValidationProvider name="name_code" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" name="name_code_vi" v-model="code_selected.name_vi" >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group row-group" style="justify-content: center;">
                            <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="handle_close_form()">{{$t('cancel')}}</div>
                            <button class="btn btn-signup " :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid">{{$t('save')}}</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>
<script>
import { HTTP_ADMIN } from '../../../../http-common';
import { socket_bus } from '../../../../main';

export default {
    data() {
        return {
            support_codes: [],
            code_selected: {},
            new_code: {},
            is_add: false,
            is_edit: false,
            lang_current: ''
        }
    },
    methods: {
        handle_show_content_support(item) {
            switch(this.lang_current) {
                case 'en':
                    return item.name_en
                case 'vi':
                    return item.name_vi
                case 'tw':
                    return item.name_tw
            }
        },
        handle_get_support_code() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/support-code').then(result => {
                    resolve(result)
                    this.support_codes = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log('Error Support Code: ' + error);
                })
            })
        },
        handle_add_support_code() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.post('/support-code', this.new_code).then(result => {
                    if(result.status == 201) {
                        resolve(result)
                        this.support_codes.push(result.data.data)
                        this.is_add = false
                        this.new_code = {}
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('add_sup_code_success'), is_redirect: true, brand: result.data.data})
                    } else {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('add_sup_code_fail'), is_redirect: false, brand: result.data.data})
                    }
                })
                .catch(error => {
                    reject(error)
                    console.log('Error Support Code: ' + error);
                })
            })
        },
        handle_close_form() {
            this.is_edit = false
            this.new_code = {}
            setTimeout(() => {window.location.reload()}, 1500)
        },
        handle_detail_code(item) {
            this.code_selected = item
            this.is_edit = true
        },
        handle_update_support_code() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch('/support-code/' + this.code_selected.id, this.code_selected).then(result => {
                    if(result.status == 200) {
                        resolve(result)
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('update_sup_succ'), is_redirect: false, brand: result.data.data})
                        this.is_edit = false
                        setTimeout(() => { window.location.reload()}, 2000)
                    } else {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message:  this.$t('update_sup_fail'), is_redirect: false, brand: result.data.data})
                    }
                })
                .catch(error => {
                    reject(error)
                    console.log('Error Support Code: ' + error);
                })
            })
        },
        handle_remove_code(item) {
            socket_bus.$emit('DELETE_SUP_CODE', {data: item, is_show: true, brand: item, message: this.$t('ques_delete')})
        }
    },
    created() {
        this.handle_get_support_code()
        socket_bus.$on('RESPONSE_DELETE_SUP', result => {
            if(result.is_delete) {               
                HTTP_ADMIN.delete('/support-code/' + result.data.id).then(final => {
                    if(final.data.status == 200) {
                        this.support_codes.splice(this.support_codes.indexOf(result.data), 1)
                    }
                })
            }
        })

        if(localStorage.getItem('lang')) {
            this.lang_current = localStorage.getItem('lang')
        } else {
            this.lang_current = 'vi' 
        }
    }
}
</script>