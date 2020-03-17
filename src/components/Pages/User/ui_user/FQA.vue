<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">FA&Q</p>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group row-group padding-full flex-row-center" v-if="FAQ.length == 0">
                    <span class="label-cell">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation flex-row-center" v-else v-for="(item, index) in FAQ" :key="index">
                    <div class="block-item-row " style="max-width: 72px !important">
                        <p class="label-cell ">{{index + 1}}</p>
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
                <form class="block-form" style="padding: 8px 16px!important; width: 100%" enctype="multipart/form-data" @submit.prevent="handle_update">
                    <div class="form-group col-group" v-if="lang_current == 'en'">
                        <span class="label-span margin-bottom">{{$t('user_page.question')}}</span>
                        <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.question_en" name="question_en" readonly>
                    </div>
                    <div class="form-group col-group" v-if="lang_current == 'en'">
                        <span class="label-span margin-bottom">{{$t('user_page.answer')}}</span>
                        <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.answer_en" name="answer_en" readonly>
                    </div>
                    <div class="form-group col-group" v-if="lang_current == 'tw'">
                        <span class="label-span margin-bottom">{{$t('user_page.question')}}</span>
                        <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.question_tw" name="question_tw" readonly>
                    </div>
                    <div class="form-group col-group" v-if="lang_current == 'tw'">
                        <span class="label-span margin-bottom">{{$t('user_page.answer')}}</span>
                        <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.answer_tw" name="answer_en" readonly>
                    </div>
                    <div class="form-group col-group" v-if="lang_current == 'vi'">
                        <span class="label-span margin-bottom">{{$t('user_page.question')}}</span>
                        <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.question_vi" name="question_en" readonly>
                    </div>
                    <div class="form-group col-group" v-if="lang_current == 'vi'">
                        <span class="label-span margin-bottom">{{$t('user_page.answer')}}</span>
                        <input type="text" class="border-bottom-ol margin-bottom" v-model="faq_selected.answer_vi" name="answer_en" readonly>
                    </div>
                </form>
                <div class="form-group row-group" style="justify-content: center; margin-top: 10px;">
                    <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_detail = false">{{$t('cancel')}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {HTTP} from '../../../../http-common'

export default {
    data() {
        return {
            FAQ: [],
            faq_selected: {},
            is_detail : false,
            readonly: true,
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
        handle_translate_answer(item) {
            switch(this.lang_current) {
                case 'en':
                    return item.answer_en
                case 'tw':
                    return item.answer_tw
                case 'vi':
                    return item.answer_vi
            }
        },
        handle_get_faq() {
            return new Promise((resolve, reject) => {
                HTTP.get('/faq').then(result => {
                    resolve(result.data)
                    this.FAQ = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log(error);
                })
            })
        },
        handle_show_detail(item) {
            this.faq_selected = item
            this.is_detail = true
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