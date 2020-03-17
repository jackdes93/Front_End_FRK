<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">FA&Q</p>
            </div>
            <div class="form-group row-group" style="justify-content: flex-end">
                <button class="btn btn-signup primary-color" style="color: #FFF; " v-on:click="is_add = true">{{$t('new_faq')}}</button>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group padding-full flex-col-center" v-if="FAQ.length == 0">
                    <span class="label-cell" style="font-size: 1.2em; color: gray; font-weight: bold">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation flex-row-center" v-else v-for="(item, index) in FAQ" :key="index">
                    <div class="block-item-row " style="max-width: 72px !important">
                        <p class="label-cell">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row margin-fix-right">
                        <p class="label-cell text-overflow">{{handle_translate(item)}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 78px !important">
                        <a class="label-cell" v-on:click="handle_show_detail(item)">{{$t('see_more')}}</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_detail">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t(`user_page.detail_info`)}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style="padding: 8px 16px!important; width: 100%">
                    <form class="block-form"  @submit.prevent="handle_update">
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Question</span>
                            <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.question_en" name="question_en" readonly>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Answer</span>
                            <ValidationProvider name="answer" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.answer_en" name="answer_en" :readonly="readonly">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">問題</span>
                            <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.question_tw" name="question_tw" readonly>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">回答</span>
                            <ValidationProvider name="answer" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.answer_tw" name="answer_tw" :readonly="readonly">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Câu Hỏi</span>
                            <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.question_vi" name="question_vi" readonly>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Câu trả  lời</span>
                            <ValidationProvider name="answer" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.answer_vi" name="answer_vi" :readonly="readonly">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group row-group" style="justify-content: center;">
                            <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_detail = false">{{$t('cancel')}}</div>
                            <div class="btn btn-signup primary-color margin-fix-right" style="color: #FFF" v-if="!is_edit" v-on:click="handle_edit">{{$t('edit')}}</div>
                            <div class="btn btn-signup primary-color" style="color: #FFF" v-if="!is_edit" v-on:click="handle_delete()">{{$t('delete')}}</div>
                            <button class="btn btn-signup" :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid" v-else>{{$t('save')}}</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_add">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('add_faq')}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style="padding: 8px 16px!important; width: 100%">
                    <form class="block-form"  @submit.prevent="handle_add">
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Question</span>
                            <ValidationProvider name="question" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="new_faq.question_en" name="question_en"  >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Answer</span>
                            <ValidationProvider name="answer" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="new_faq.answer_en" name="answer_en"  >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">問題</span>
                            <ValidationProvider name="question" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="new_faq.question_tw" name="question_tw"  >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">回答</span>
                            <ValidationProvider name="answer" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="new_faq.answer_tw" name="answer_tw" >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Câu Hỏi</span>
                            <ValidationProvider name="question" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="new_faq.question_vi" name="question_vi"  >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Câu trả  lời</span>
                            <ValidationProvider name="answer" rules="required" v-slot="{errors}" style="width: 100%">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="new_faq.answer_vi" name="answer_vi" >
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
    </div>
</template>

<script>
import {socket_bus} from '../../../../main'
import {HTTP_ADMIN} from '../../../../http-common'

export default {
    data() {
        return {
            FAQ: [],
            faq_selected: {},
            new_faq: {},
            is_detail : false,
            readonly: true,
            is_add: false,
            is_edit: false,
            lang_current: ''
        }
    },
    methods: {
        handle_translate(item) {
            switch(this.lang_current) {
                case 'en':
                    return item.question_en
                case 'tw':
                    return item.question_tw
                case 'vi':
                    return item.question_vi
            }
        },
        handle_get_faq() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/faq').then(result => {
                    resolve(result.data)
                    this.FAQ = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log('Error get : ' + error)
                })
            })
        },
        handle_show_detail(item) {
            this.faq_selected = item
            this.is_detail = true
        },
        handle_edit() {
            this.is_edit = true
            this.readonly = false
        },
        handle_add() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.post('/faq', this.new_faq).then(result => {
                    resolve(result.data)
                    if(result.data.status == 201) {
                        result.data.status == 201 ? this.FAQ.push(result.data.data) : this.FAQ
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: 'Add FAQ Success'})
                        this.is_add = false
                    } else {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: 'Add FAQ Fail'})
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error Add : ' + error)
                })
            })
        },
        handle_update() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch('/faq/' + this.faq_selected.id, this.faq_selected).then(result => {
                    resolve(result.data)
                    if(result.data.status == 200) {
                        this.is_detail = false
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: 'Update FAQ Success'})
                    } else {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: 'Update FAQ Fail'})
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error Add : ' + error)
                })
            })
        },
        handle_delete() {
             return new Promise((resolve, reject) => {
                HTTP_ADMIN.delete('/faq/' + this.faq_selected.id, this.faq_selected).then(result => {
                    resolve(result.data)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', { message: 'Delete FAQ Success'})
                        this.is_detail = false
                        setTimeout(() => { window.location.reload()}, 2000)
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: 'Delete FAQ Fail'})
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error Add : ' + error)
                })
            })
        }
    },
    created() {
        this.handle_get_faq()
        if(localStorage.getItem('lang')) {
            this.lang_current = localStorage.getItem('lang')
        } else {
            this.lang_current = 'vi' 
        }
    }
}
</script>