<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="form-group row-group" v-if="brand.length == 0">
            <span class="label-span text-center width-full">{{$t('nodata')}}</span>
        </div>
        <div class="form-group col-group" v-else>
            <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="background: #EDEDED; margin-bottom: 56px;"  v-for="(item, index) in brand" :key="index">
                <div class="block-header bg-title-header padding-full header-fix">
                    <p class="title-form">{{$t('your_adver_of')}} {{item.brand_name}}</p>
                </div>
                <div class="form-group row-group" style="justify-content: flex-end">
                    <button class="btn btn-signup primary-color" style="color: #FFF; " v-on:click="handle_create_add(item)">{{$t('user_page.new_advertisment')}}</button>
                </div>
                <div class="form-group row-group width-full">
                    <div class="block-list-row width-full padding-full border-bottom-ol" >
                        <div class="block-item-row-header" style="max-width: 128px;">
                            <p class="label text-color-second ">{{$t('kind')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 148px;">
                            <p class="label text-color-second ">{{$t('user_page.pricing')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 128px;">
                            <p class="label text-color-second ">{{$t('estimate')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('date_start')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second">{{$t('page')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second">{{$t('position')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second">{{$t('payment_code')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second">{{$t('user_page.payment')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('user_page.status')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('action')}}</p>
                        </div>
                    </div>
                </div>
                <form class="block-form width-full" style="padding: 0 8px 16px 8px;">
                    <div class="form-group row-group border-bottom-ol padding-full row-animation"  v-for="(adv, index) in item.advertisement" :key="index">
                        <div class="block-item-row" style="max-width: 128px;" >
                            <p class="label-cell">{{adv.adversiting_type}}</p>
                        </div>
                        <div class="block-item-row" style="max-width: 148px;" >
                            <p class="label-cell bold">{{adv.price.toLocaleString()}} <sup>đ</sup></p>
                        </div>
                        <div class="block-item-row" style="max-width: 128px;" >
                            <p class="label-cell">{{ adv.adversiting_status != 'STOP' ? handle_cal_estimate_time(adv.start_time, adv.adversiting_time) : 0}} {{$t('day')}}</p>
                        </div>
                        <div class="block-item-row" >
                            <p class="label-cell">{{handle_format_date(adv.start_time)}}</p>
                        </div>
                        <div class="block-item-row" >
                            <p class="label-cell">{{adv.page}}</p>
                        </div>
                        <div class="block-item-row" >
                            <p class="label-cell">{{!adv.position ? 'Any' : adv.position}}</p>
                        </div>
                        <div class="block-item-row" >
                            <p class="label-cell bold">{{adv.payment_code}}</p>
                        </div>
                        <div class="block-item-row">
                            <p class="label-cell">{{adv.note_payment}}</p>
                        </div>
                        <div class="block-item-row" style="max-width: 240px;" >
                            <p class="label-cell bold text-uppercase" v-bind:class="{'text-color-primarry' : adv.adversiting_status == 'WAITING', 'color-red' : adv.adversiting_status == 'STOP', 'color-green' : adv.adversiting_status == 'START', 'color-orange' : adv.adversiting_status == 'PROCESSING'}">{{handle_translate_state(adv.adversiting_status)}}</p>
                        </div>
                        <div class="block-item-row" style="justify-content: flex-end; align-items: flex-end; flex-direction: row" >
                            <a v-on:click="handle_edit(adv,item)" class="label-cell flex-box"><i class="fas fa-edit"></i></a>
                            <span class="label-span flex-box" v-on:click="handle_preview_adv(adv, item)" v-if="adv.adversiting_type != 'RECOMMEND' && adv.adversiting_status != 'PROCESSING'"><i class="far fa-eye" style="color:#000"></i></span>
                            <span class="label-span flex-box" v-on:click="handle_stop_adv(adv, item)" v-if="adv.adversiting_status == 'WAITING'"><i class="fas fa-ban black"></i></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Form_Advertisment ></Form_Advertisment>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_edit">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('user_page.detail_adv_for')}} {{brand_selected.brand_name}} {{$t('brand')}}</p>
                </div>
                <form class="block-form" style="padding: 8px 16px!important; width: 85%;" @submit.prevent="handle_save()">
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('user_page.adver_type')}}</span>
                            <input class="border-bottom-ol" v-model="advertisement_selected.adversiting_type" readonly/>
                        </div>
                        <div class="form-group col-group ">
                            <span class="label-span margin-bottom">{{$t('user_page.adver_position')}}</span>
                            <input class="border-bottom-ol" v-model="advertisement_selected.position" readonly/>
                        </div>
                        <span class="label-span margin-fix-left" v-on:click="handle_preview(advertisement_selected.adversiting_type)" ><i class="far fa-eye" style="color:#000"></i></span>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('user_page.page_show')}}</span>
                            <input class="border-bottom-ol" v-model="advertisement_selected.page" readonly/>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('user_page.adver_time')}}</span>
                            <input class="border-bottom-ol" v-model="advertisement_selected.adversiting_time" readonly/>
                        </div>
                    </div>
                    <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_preview">
                        <div class="block-alert padding-full" style="max-width: 840px;">
                            <div class="block-header bg-title-header padding-full header-fix width-full">
                                <p class="title-form">{{$t('preview_adv')}}</p>
                            </div>
                            <div class="form-group col-group">
                                <img :src="`${image_preview}`" style="border-radius: 4px;">
                            </div>
                            <div class="form-group row-group margin-bottom" style="margin-top: 16px; justify-content: center">
                                <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_preview = false">{{$t('cancel')}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('user_page.payment')}}</span>
                            <p>{{advertisement_selected.note_payment == null ? `${$t('nodata')}` : advertisement_selected.note_payment}}</p>
                        </div>
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('date_start')}}</span>
                            <p>{{handle_format_date(advertisement_selected.start_time)}}</p>
                        </div>
                    </div>
                    
                    <div class="form-group col-group margin-fix-right" v-if="advertisement_selected.adversiting_type != 'HOTLABEL' && advertisement_selected.adversiting_type != 'RECOMMEND'">
                        <span class="label-span margin-bottom">Banner</span>
                        <div class="form-group margin-bottom" v-if="url_preview">
                            <img v-bind:src="url_preview" :alt="banner.name" style="width: 100%; height: 200px; object-fit: contain;">
                        </div>
                    </div>
                    <div class="form-group row-group" style="justify-content: center; margin-top: 10px;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_edit = false">{{$t('cancel')}}</div>
                        <button type="submit" class="btn btn-signup primary-color" style="color: #FFF" v-if="advertisement_selected.adversiting_status == 'WAITING' ">{{$t('save')}}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_preview_temple">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('img_template')}}{{$t('footer.advertisement')}}</p>
                </div>
                <div class="form-group col-group" style="overflow:hidden; max-height: 500px">
                    <img :src="`${image_preview}`" style="height: 100%;">
                </div>
                <div class="form-group row-group" style="justify-content: center">
                    <button class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_preview_temple = false">{{$t('cancel')}}</button>
                </div>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_preview">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('image')}} {{brand_name_preview}} {{$t('footer.advertisement')}}</p>
                </div>
                <div class="form-group col-group" style="overflow:hidden; max-height: 500px">
                    <img :src="`${adv_preview.banner_file}`" :alt="`${adv_preview.banner_file}`" style="height: 100%;">
                </div>
                <div class="form-group row-group" style="justify-content: center">
                    <button class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_preview = false">{{$t('cancel')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form_Advertisment from './CreateNewAdvertisement'
import {socket_bus } from '../../../../main'
import { HTTP } from '../../../../http-common';

export default {
    components:{
        Form_Advertisment
    },
    data() {
        return {
            is_add : false,
            is_edit: false,
            is_preview: false,
            is_preview_temple: false,
            customer: {},
            advertisements: [],
            brand:[],
            brand_selected: {},
            advertisement_selected: {},
            banner: '',
            url_preview: null,
            payment_code: '',
            size_accept: '',
            image_preview: '',
            adv_preview: {},
            brand_name_preview: ''
        }
    },
    methods: {
        handle_preview_adv(advertisement, brand) {
            this.is_preview = true
            this.brand_name_preview = brand.brand_name
            this.adv_preview = advertisement

        },
        handle_preview(item) {
            this.is_preview_temple = true
            this.image_preview = ''
            switch(item) {
                case 'BANNER':
                    this.handle_preview_banner(this.advertisement_selected)
                    break;
                case 'RECOMMEND':
                    if(item.page == 'Home') {
                        this.image_preview = 'uploads/Location_preview/Recommended/CategoryPage-Recommended.jpg' 
                    } else if (item.page == 'Category') {
                        this.image_preview = 'uploads/Location_preview/Recommended/CategoryPage-Recommended.jpg' 
                    } else {
                        this.image_preview = 'uploads/Location_preview/Recommended/Exhibition-Recommended.jpg' 
                    }
                    break;
                case 'HOTLABEL':
                    this.image_preview = 'uploads/Location_preview/HOTLABEL/Hot-label.jpg' 
                    break;
            }
        },
        handle_preview_banner(item) {
            console.log(item);
            switch(item.page) {
                case 'All':
                    this.image_preview = item.position == 'Header' ? 'uploads/Location_preview/BANNER/Header.jpg' : 'uploads/Location_preview/BANNER/Footer.jpg'
                    break;
                case 'Home':
                    this.image_preview = item.position == 'Slider' ? 'uploads/Location_preview/BANNER/HomePage-Slider.jpg' : 'uploads/Location_preview/BANNER/HomePage-Right.jpg'
                    break;
                case 'Category':
                    this.export_link_category(item.position)
                    break;
                case 'Exhibition':
                    this.image_preview = 'uploads/Location_preview/BANNER/Exhibition-Banner.jpg' 
                    break;

            }
        },
        export_link_category(position) {
            switch(position) {
                case 'Left':
                    this.image_preview = 'uploads/Location_preview/BANNER/Category-Left.jpg' 
                    break;
                case 'Right - Top':
                    this.image_preview = 'uploads/Location_preview/BANNER/Category-Right-Top.jpg'
                    break;
                case 'Right - Bottom':
                    this.image_preview = 'uploads/Location_preview/BANNER/Category-Right-Bottom.jpg'
                    break;
                case 'Big Center':
                    this.image_preview = 'uploads/Location_preview/BANNER/Category-Center.jpg'
                    break;
                case 'SideBar':
                    this.image_preview = 'uploads/Location_preview/BANNER/Category-SideBar.jpg'
                    break;
            }
        },
        export_link_exhibition(position) {
            switch(position) {
                case 'Left':
                    this.image_preview = 'uploads/Location_preview/BANNER/Exhibition-Left.jpg' 
                    break;
                case 'Right - Top':
                    this.image_preview = 'uploads/Location_preview/BANNER/Exhibition-Right-Top.jpg'
                    break;
                case 'Right - Bottom':
                    this.image_preview = 'uploads/Location_preview/BANNER/Exhibition-Right-Bottom.jpg'
                    break;
                case 'Center':
                    this.image_preview = 'uploads/Location_preview/BANNER/Exhibition-Center.jpg'
                    break;
                case 'Wide':
                    this.image_preview = 'uploads/Location_preview/BANNER/Exhibition-Wide.jpg'
                    break;
            }
        },
        handle_translate_state (state) {
            switch(state) {
                case 'WAITING':
                    return this.$t('waiting')
                case 'START':
                    return this.$t('start')
                case 'STOP':
                    return this.$t('stop')
                case 'PROCESSING':
                    return this.$t('processing')
                case 'PAUSE':
                    return this.$t('pause')
            }
        },
        handle_stop_adv(advertisement, brand) {
            socket_bus.$emit('SHOW_ALERT_STOP', {brand: advertisement, name_brand: brand.brand_name})
        },
        handle_load_advertisement() {
            return new Promise((resolve, reject) => {
                HTTP.get(`/advertisements/advertisement-customer/${this.customer.id}`).then(result => {
                    resolve(result)
                    this.brand = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_get_place_holder_upload() {
            switch(this.advertisement_selected.page) {
                case 'All':
                    this.size_accept = `${this.$t('message_alert.width')}: 1170px, ${this.$t('message_alert.height')}: 120px`
                    break;
                case 'Home':
                    this.size_accept = this.advertisement_selected.position  == 'Right' ? `${this.$t('message_alert.width')}: 370px, ${this.$t('message_alert.height')}: 200px` : `${this.$t('message_alert.width')}: 770px, ${this.$t('message_alert.height')}: 420px`
                    break;
                case 'Category':
                    if(this.advertisement_selected.position == 'Left') {
                        this.size_accept = `${this.$t('message_alert.width')}: 270px, ${this.$t('message_alert.height')}: 390px`
                    } else if(this.advertisement_selected.position == 'Center') {
                        this.size_accept = `${this.$t('message_alert.width')}: 570px, ${this.$t('message_alert.height')}: 390px`
                    } else if(this.advertisement_selected.position == 'Right - Top' || this.advertisement_selected.position == 'Right - Bottom') {
                        this.size_accept = `${this.$t('message_alert.width')}: 270px, ${this.$t('message_alert.height')}: 180px`
                    } else {
                        this.size_accept = `${this.$t('message_alert.width')}: 1170px, ${this.$t('message_alert.height')}: 150px`
                    }
                    break;
                case 'Exhibition':
                    
                    break;
            }
        },
        handleFileUpload(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            var type_file = e.target.files[0].name.split('.')[1]
            if(type_file == 'png' || type_file == 'jpg') {
                switch(this.advertisement_selected.page) {
                    case 'All':
                        this.handle_detect_size_banner_all(e, files)
                        break;
                    case 'Home':
                        this.handle_detect_size_home(e, this.advertisement_selected.position, files)
                        break;
                    case 'Category':
                        this.handle_detect_size_category(e, this.advertisement_selected.position, files)
                        break;
                    case 'Exhibition':
                        this.handle_detect_size_exhibition(e, this.advertisement_selected.position, files)
                        break;
                }
            } else {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.type_not_accept')})
                e.target.value = ''
                e = null
            }
        },
        handle_detect_size_banner_all(e,files) {
            var _URL = window.URL || window.webkitURL;
            var image = new Image()
            image.src = _URL.createObjectURL(files[0]);
            image.onload = () => {
                if(image.width != 1170 || image.height != 120 ) {
                    socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                } else {
                    this.url_preview = URL.createObjectURL(files[0]);
                }
            }
        },
        handle_detect_size_home(e, position, files) {
            var _URL = window.URL || window.webkitURL;
            var image = new Image()
            image.src = _URL.createObjectURL(files[0]);
            if(position == 'Right') {
                image.onload = () => {
                    if(image.width != 370 || image.height != 200 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.url_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Slider') {
                image.onload = () => {
                    if(image.width != 770 || image.height != 420 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.url_preview = URL.createObjectURL(files[0]);
                    }
                }
            } 
        },
        handle_detect_size_category(e, position, files) {
            var _URL = window.URL || window.webkitURL;
            var image = new Image()
            image.src = _URL.createObjectURL(files[0]);
            if(position == 'Left') {
                image.onload = () => {
                    if(image.width != 270 || image.height != 390 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.url_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Center') {
                image.onload = () => {
                    if(image.width != 570 || image.height != 390 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.url_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Right - Top' || position == 'Right - Bottom') {
                image.onload = () => {
                    if(image.width != 270 || image.height != 180 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.url_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Sidebar') {
                image.onload = () => {
                    if(image.width != 1170 || image.height != 150 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.url_preview = URL.createObjectURL(files[0]);
                    }
                }
            }
        },
        handle_detect_size_exhibition(e, position, files) {
            var _URL = window.URL || window.webkitURL;
            var image = new Image()
            image.src = _URL.createObjectURL(files[0]);
             if(position == 'Left' || position == 'Center') {
                image.onload = () => {
                    if(image.width != 370 || image.height != 460 ) {
                        this.size_accept = `${this.$t('message_alert.width')}: 370px, ${this.$t('message_alert.height')}: 460px`
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.url_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Right - Top' || position == 'Right - Bottom') {
                image.onload = () => {
                    if(image.width != 370 || image.height != 215 ) {
                        this.size_accept = `${this.$t('message_alert.width')}: 370px, ${this.$t('message_alert.height')}: 215px`
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.url_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Wide') {
                image.onload = () => {
                    if(image.width != 1170 || image.height != 120 ) {
                        this.size_accept = `${this.$t('message_alert.width')}: 1170px, ${this.$t('message_alert.height')}: 120px`
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.url_preview = URL.createObjectURL(files[0]);
                    }
                }
            }
        },
        handle_delete_link() {
            this.url_preview = null,
            this.banner = ''
            this.$refs.banner = []
        },
        handle_cal_estimate_time(date_start, range) {
          const time_start = new Date(date_start).getTime()
          const time_current = new Date(Date.now()).getTime()
          var estimate = 0
          if(time_current >= time_start) {
            estimate = range - ((time_current - time_start) / (1000 * 24 * 3600))
            estimate = estimate > 0 ? estimate.toFixed(1) : 0
          } else {
            estimate = range
          }
          return estimate
        },
        handle_create_add(brand) {
            socket_bus.$emit('ADV', {id_brand: brand.id})
        },
        handle_edit(item, brand) {
            this.is_edit = true
            this.advertisement_selected = item
            this.brand_selected = brand
            this.url_preview = item.banner_file
            this.handle_get_place_holder_upload()
        },
        handle_save() {
            var data_form = new FormData()
            data_form.append('id', this.advertisement_selected._id)
            data_form.append('banner', this.banner)
            HTTP.post('/advertisements/upload-banner/' + this.advertisement_selected._id, data_form, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    if(result.data.status == 200) {
                        this.is_edit = false
                        this.handle_load_advertisement()
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_success')})
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_fail')})
                    }
                }).catch(error => {
                    console.log('Error: ' + error);
            })
        },
        handle_lock(item) {
            console.log(item)
        },  
        handle_format_date(date) {
            const value_date = new Date(date)
            return `${value_date.getUTCDate()}/${value_date.getUTCMonth() + 1}/${value_date.getUTCFullYear()} 
            ${value_date.getUTCHours() < 10 ? `0${value_date.getUTCHours()}` : `${value_date.getUTCHours()}`}:
            ${value_date.getUTCMinutes() < 10 ? `0${value_date.getUTCMinutes()}` : `${value_date.getUTCMinutes()}`}:
            ${value_date.getUTCSeconds() < 10 ? `0${value_date.getUTCSeconds()}` : `${value_date.getUTCSeconds()}`}`
        },
        handle_change_advertisement_status(advertisement, status) {
            return new Promise((resolve, reject) => {
                HTTP.patch('/advertisements/update-state/' + advertisement._id, {status: status}).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_state_success')})
                        this.handle_load_advertisement()
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_state_fail')})
                    }
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
        }
        socket_bus.$on('CLOSE_FORM_ADD', (result) => {
            this.is_add = result.state
        })

        this.handle_load_advertisement()

        socket_bus.$on('CLOSE_ADD_ADV', () => {
            this.is_add = false
            this.handle_load_advertisement()
        })

        socket_bus.$on('ACCEPT_STOP_ADV', result => {
            this.handle_change_advertisement_status(result.brand, 'STOP')
        })

        socket_bus.$on('CREATE_ADVERTISMENT', () => {
             this.handle_load_advertisement()
        })
    }
}
</script>