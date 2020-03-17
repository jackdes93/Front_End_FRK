<template>
     <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_show">
        <div class="block-alert padding-full" style="padding: 0 16px;">
            <div class="block-header bg-title-header padding-full header-fix width-full">
                <p class="title-form"> {{brand.name}}</p>
            </div>
            <ValidationObserver v-slot="{ invalid }" style="width: 100%; justify-content: center;">
                <form class="block-form" style="padding: 8px 16px!important; width: 100%;  max-height: 480px; overflow:auto;" enctype="multipart/form-data" @submit.prevent="handle_update">
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.category')}}</span>
                            <ValidationProvider name="category" rules="required" v-slot="{ errors }" style="width: 100%;">
                                <select name="category"  class="list-joining" v-model="brand.id_category" style="font-size: 14px; color: #333" >
                                    <option value="" selected>-- {{$t('filter.choose_category')}} --</option>
                                    <option v-bind:value="item.name" v-for="(item, index) in categories" :key="index">{{handle_translate(item.name)}}</option>
                                </select>
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('name_brand')}}</span>
                            <input type="text" class="border-bottom-ol margin-bottom" v-model="brand.name" name="name" readonly>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.phone_number')}}</span>
                            <ValidationProvider name="phone_number" rules="required|regex:^([0-9]+)$" v-slot="{ errors }" style="width: 100%;">
                                <input type="text" name="phone_number" v-model="brand.phone_number" class="border-bottom-ol">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group ">
                            <span class="label-span margin-bottom">Email</span>
                            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" style="width: 100%;">
                                <input type="text" name="email" v-model="brand.email" class="border-bottom-ol" >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>
                    <div class="form-group row-group" v-if="brand.level == 'VIP'">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('brand_info.video_intro')}}</span>
                            <input type="text" class="border-bottom-ol" v-model="brand.video_intro" name="video_intro">
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">Slogan</span>
                            <input type="text" class="border-bottom-ol" v-model="brand.slogan" name="slogan">
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <div class="form-group row-group" style="justify-content: flex-start; margin-bottom:0">
                                <span class="label-span margin-fix-right">{{$t('brand_info.offset_price')}}: </span>
                                <p class="label-span" style="font-size: 14px; height: 28px; color: #F34343">{{parseInt(brand.offset_price).toLocaleString()}} <sup>đ</sup></p>
                            </div>
                            <ValidationProvider name="offset_price" rules="required|regex:^([0-9]+)$" v-slot="{ errors }" style="width: 100%;">
                                <input type="text" name="offset_price"  v-model="brand.offset_price" class="border-bottom-ol">
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <div class="form-group row-group" style="justify-content: flex-start; margin-bottom:0">
                                <span class="label-span margin-fix-right">{{$t('price')}}: </span>
                                <p class="label-span" style="font-size: 14px; height: 28px; color: #F34343">{{parseInt(brand.price).toLocaleString()}} <sup>đ</sup></p>
                            </div>
                            <ValidationProvider name="price" rules="required|regex:^([0-9]+)$" v-slot="{ errors }" style="width: 100%;">
                                <input type="text" name="price"  v-model="brand.price" class="border-bottom-ol" >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.location')}}</span>
                            <select name="category"  class="list-joining" v-model="location_selected" style="font-size: 14px; color: #333" @change="handle_choose_locations(location_selected)">
                                <option value="" selected>-- {{$t('filter.choose_locations')}} --</option>
                                <option v-bind:value="item.name" v-for="(item, index) in locations" :key="index">{{item.name}}</option>
                            </select>
                            <textarea v-model="brand.location" cols="30" rows="2" class="padding-full" style="max-height: 90px" disabled></textarea>
                        </div>
                    </div>
                    <div class="form-group col-group margin-bottom">
                        <span class="label-span margin-bottom">{{$t('head_office')}}</span>
                        <ValidationProvider name="head_office" rules="required" v-slot="{ errors }" style="width: 100%;">
                            <input type="text" name="head_office" v-model="brand.head_office" class="border-bottom-ol" >   
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('about_brand')}}</span>
                        <ValidationProvider name="introduce" rules="required|max:120" v-slot="{ errors }" style="width: 100%;">
                            <textarea name="introduce" v-model="brand.introduce" cols="30" rows="5" class="padding-full" style="max-height: 120px"></textarea>
                            <span class="label">{{$t('max_length')}}</span>
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('about_feature')}}</span>
                        <div class="form-group row-group" style="flex-wrap: wrap">
                            <div class="form-group col-group" style="width: 33.3%;" v-for="(feature, index) in list_feature" :key="index">
                                <span class="label-span margin-bottom-fix">{{handle_translate_feature(feature.content)}}</span>
                                <div class="form-group row-group margin-fix-right">
                                    <div class="form-group radio-btn">
                                        <input type="radio" :value="true" v-model="feature.value" style="width: 40px;">
                                        <p class="label-option text-uppercase">{{$t('yes')}}</p>
                                    </div>
                                    <div class="form-group radio-btn row-group">
                                        <input type="radio" :value="false" v-model="feature.value" style="width: 40px;">
                                        <p class="label-option text-uppercase">{{$t('no')}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('events')}}</span>
                        <div class="form-group row-group" style="justify-content: flex-end">
                            <span v-on:click="add_event = true"><i class="far fa-calendar-plus"></i></span>
                        </div>
                        <div class="form-group col-group" v-if="brand.events != null">
                            <div class="form-group row-group" v-for="(item, index) in brand.events" :key="index">
                                <span class="label-span">{{item.name}}</span>
                                <span class="label-span">{{new Date(item.created_on).toLocaleString().split(',')[0]}}</span>
                                <span class="label-span" v-on:click="handle_remove_event(item)"><i class="fas fa-trash-alt"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="add_event">
                        <div class="block-alert padding-full" style="width: 25%;">
                            <div class="block-header bg-title-header padding-full header-fix width-full">
                                <p class="title-form">{{$t('add_event')}}</p>
                            </div>
                            <div class="form-group col-group">
                                <div class="form-group col-group">
                                    <span class="label-span margin-bottom">{{$t('title_event')}}</span>
                                    <ValidationProvider name="name_event" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="text" name="name_event" :placeholder="`${$t('title_event')}`" v-model="event.name">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <span class="label-span margin-bottom">{{$t('date_start')}}</span>
                                    <datepicker placeholder="Choose Date Start" class="date_picker" :format="format" v-model="event.created_on"></datepicker>
                                </div>
                                <div class="form-group row-group margin-fix-top">
                                    <div class="btn btn-cancel" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="add_event = false">{{$t('cancel')}}</div>
                                    <button class="btn btn-signup bg-title-header" v-on:click="handle_add_new_event()">{{$t('save')}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row-group" style="justify-content: center; margin-top: 8px; padding: 16px 0px;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_show = !is_show">{{$t('cancel')}}</div>
                        <button class="btn btn-signup" :class="{'bg-title-header': !invalid, 'disable-button':invalid}" :disabled="invalid" >{{$t('save')}}</button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import {socket_bus} from '../../../../main'
import { HTTP } from '../../../../http-common';
import datepicker from 'vuejs-datepicker';

export default {
    components: { datepicker },
    data() {
        return {
            is_show: false,
            add_event: false,
            brand: {},
            categories: [],
            list_feature:[],
            location_selected: '',
            locations: [],
            current_location: [],
            events: [],
            event: {name: '', created_on: new Date()},
            format: 'dd/MM/yyyy',
        }
    },
    methods: {
        handle_translate(name) {
            var result = ''
            switch(name) {
                case 'Drink':
                    result = this.$t('drink')
                    break;
                case 'Dessert':
                    result = this.$t('dessert')
                    break;
                case 'Vietnamese Foods':
                    result = this.$t('vn_food')
                    break;
                case 'Foriegn Foods':
                    result = this.$t('foriegn_fd')
                    break;
                case 'BBQ':
                    result = this.$t('bbq')
                    break;
                case 'Brunch':
                    result = this.$t('brunch')
                    break;
                case 'Hot Pot':
                    result = this.$t('hotpot')
                    break;
            }
            return result;
        },
        handle_translate_feature(name) {
            var result = ''
            switch(name) {
                case 'Equipments included':
                    result = this.$t('list_special.equiment')
                    break;
                case 'Need crowd':
                    result = this.$t('list_special.crowd')
                    break;
                case 'Low risk':
                    result = this.$t('list_special.risk')
                    break;
                case 'Free Franchise Fee':
                    result = this.$t('list_special.free_franchise_fee')
                    break;
                case 'Have decorated':
                    result = this.$t('list_special.decorate')
                    break;
                case 'Free Signing':
                    result = this.$t('list_special.free_signing')
                    break;
                case 'Exemption premium':
                    result = this.$t('list_special.exemption_premium')
                    break;
                case 'Education training':
                    result = this.$t('list_special.education_training')
                    break;
                case 'Free Margin':
                    result = this.$t('list_special.free_margin')
                    break;
            }
            return result;
        },
        handle_close() {
            this.brand = null;
        },
        handle_check_length() {
            if(this.brand.introduce.length > 150) {
                socket_bus.$emit('SHOW_MESSAGE', { message: this.$t('max_length')})
            }
        },
        handle_update() {
            if(this.brand.video_intro != undefined) { 
                this.brand.video_intro = this.brand.video_intro.replace('watch?v=', 'embed/')
            }
            
            HTTP.patch('/brands/' + this.brand.id, this.brand).then(result => {
                if(result.data.status == 200) {
                    socket_bus.$emit('SHOW_MESSAGE', { message: this.$t('message_alert.update_brand_success')})
                    this.is_show = false
                } else {
                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_brand_fail')})
                }
            }).catch(error => {
                console.log('Error: ' + error)
            })
        },
        handle_format(event) {
            this.brand.price = parseInt(event.target.value)
        },
        handle_choose_locations(location) {
            this.brand.location.length = 0
            this.current_location.indexOf(location) == -1 ? this.brand.location.push(location) : ''
        },
        handle_remove_event(event) {
            this.brand.events.splice(this.brand.events.indexOf(event), 1)
        },
        handle_add_new_event() {
            this.brand.events.push(this.event)
            this.add_event = false
            this.event = {name: '', created_on: new Date()}
        },
        handle_get_list_city() {
           return new Promise((resolve, reject) => {
                HTTP.get('/cities/').then(result => {
                    if(result.data.status == 200) {
                        this.locations = result.data.data
                    } 
                }).catch(error => {
                    console.log(error);
                    reject(error)
                })
           })
        }
    },
    created() {
        this.handle_get_list_city()
        this.$store.dispatch('get_categories').then(result => {
            this.categories = result.data
        })
        socket_bus.$on('EDIT_BRAND', result => {
            this.brand = result.data
            this.list_feature = this.brand.feature
            this.current_location = this.brand.location
            this.is_show = true
        })
    }
}
</script>