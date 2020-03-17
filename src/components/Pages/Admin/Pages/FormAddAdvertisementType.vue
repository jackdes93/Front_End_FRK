<template>
    <div class="block-model" style="background: rgba(0,0,0,.5)">
        <div class="block-alert padding-full">
            <div class="block-header bg-title-header padding-full header-fix width-full">
                <p class="title-form">{{$t('new_type_advertisement')}}</p>
            </div>
            <ValidationObserver v-slot="{ invalid }">
                <form class="block-form width-full padding-full" @submit.prevent="handle_add_advertisment_type">
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('name')}} </span>
                        <ValidationProvider name="name_type" rules="required" v-slot="{ errors }" style="width: 100%;">
                            <input type="text" class="border-bottom-ol margin-bottom" name="name_type" v-model="new_type.name">
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('description')}} </span>
                        <ValidationProvider name="description" rules="required" v-slot="{ errors }" style="width: 100%;">
                            <input type="text" class="border-bottom-ol margin-bottom" name="description" v-model="new_type.description">
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('price')}} </span>
                        <p class="label"> {{parseInt(new_type.price).toLocaleString()}} <sup>đ</sup></p>
                        <ValidationProvider name="price" rules="required|regex:^([0-9]+)$" v-slot="{ errors }" style="width: 100%;">
                            <input type="text" class="border-bottom-ol margin-bottom" name="price" v-model="new_type.price">
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group col-group">
                        <div class="form-group row-group margin-bottom">
                            <span class="label-span margin-bottom">{{$t('option')}}</span>
                            <div class="btn btn-sign-up fix-size" v-on:click="is_add_options = true"><i class="fas fa-plus text-color-second margin-fix-right"></i> {{$t('add')}}</div>
                        </div>
                        <div class="form-group col-group padding-full" style="max-height: 200px; overflow: scroll;">
                            <div class="form-group col-group" v-for="(item, index) in options" :key="index">
                                <div class="form-group row-group">
                                    <span class="label-span margin-fix-right">{{index + 1}}</span>
                                    <span class="label-spab margin-fix-right">{{item.page}}</span>
                                    <span class="label-span margin-fix-right">{{item.position}}</span>
                                    <span class="label-span">{{Number(item.bonus).toLocaleString()}}</span>
                                    <span class="label-span" v-on:click="handle_remove(index)"><i class="fas fa-times black"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row-group" style="justify-content: center;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="handle_close()">{{$t('cancel')}}</div>
                        <button class="btn btn-signup " :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid">{{$t('save')}}</button>
                    </div>
                </form>
            </ValidationObserver>
            <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_add_options">
                <div class="block-alert padding-full" style="max-width: 420px;">
                    <div class="block-header bg-title-header padding-full header-fix width-full">
                        <p class="title-form">{{$t('add_option')}}</p>
                    </div>
                    <ValidationObserver v-slot="{ invalid }" style=" width: 100%; justify-content: center; display: flex;">
                        <form class="form-group col-group" @submit.prevent="handle_add_options">
                            <div class="form-group col-group margin-bottom">
                                <span class="label-span margin-bottom">{{$t('page')}}</span>
                                <ValidationProvider name="page" rules="required|" v-slot="{ errors }" style="width: 100%;">
                                    <input type="text" name="page" v-model="option.page" class="border-bottom-ol" >
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group col-group margin-bottom">
                                <span class="label-span margin-bottom">{{$t('position')}}</span>
                                <ValidationProvider name="position" rules="required" v-slot="{ errors }" style="width: 100%;">
                                    <input type="text" name="postion" v-model="option.position" class="border-bottom-ol">
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group col-group margin-bottom">
                                <span class="label-span margin-bottom">{{$t('bonus_price')}}</span>
                                <ValidationProvider name="price" rules="required|regex:^([0-9]+)$" v-slot="{ errors }" style="width: 100%;">
                                    <input type="number" name="bonus" v-model="option.bonus" class="border-bottom-ol">
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group row-group margin-bottom" style="margin-top: 16px;">
                                <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_add_options = false">{{$t('cancel')}}</div>
                                <button type="submit" class="btn btn-signup " :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid">{{$t('add')}}</button>
                            </div>
                        </form>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {socket_bus } from '../../../../main'
import { HTTP_ADMIN } from '../../../../http-common';

export default {
    data() {
        return {
            is_add_options: false,
            new_type: {name: "", description: "", price: 0, options: []},
            options: [],
            option: {page: "", position: "", bonus: 0}
        }
    },
    methods : {
        handle_close() {
            socket_bus.$emit('CLOSE_FORM_ADD', {state: false})
        },
        handle_add_advertisment_type() {
            this.new_type.option = this.options
            HTTP_ADMIN.post('/advertising-type/', this.new_type).then(result => {
                if(result.status == 201) {
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.create_adv_success'), is_redirect: true, brand: result.data.data})
                    socket_bus.$emit('ADD_SUCCESS_CATEGORY', {data: result.data.data})
                    this.new_type = {}
                    this.options = []
                }
            })
        },
        handle_add_options() {
            this.options.push(this.option)
            this.option = {}
        },
        handle_remove(index) {
            this.options.splice(index, 1)
        }
    },
    created() {
        this.new_category = {}
    }
}
</script>