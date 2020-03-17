<template>
    <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_add">
        <div class="block-alert padding-full" style="max-height: 640px;">
            <div class="block-header bg-title-header padding-full header-fix width-full">
                <p class="title-form">{{$t('user_page.adv_brand')}}</p>
            </div>
            <ValidationObserver v-slot="{ invalid }" style="padding: 8px 16px!important; width: 85%; overflow: auto;">
                <form class="block-form"  @submit.prevent="handle_create_advertisement">
                    <div class="form-group row-group" style="align-items: center;">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('brand')}}</span>
                            <ValidationProvider name="brand" rules="required" v-slot="{ errors }" style="width: 100%;">
                                <select name="brand"  class="list-joining" v-model="new_adv.id_brand">
                                    <option value="" selected>-- {{$t('brand')}} --</option>
                                    <option v-bind:value="item.id" v-for="(item, index) in brands" :key="index">{{item.name}}</option>
                                </select>
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('manager.adv_type')}} (1)</span>
                            <ValidationProvider name="adv_type" rules="required" v-slot="{ errors }" style="width: 100%;">
                                <select name="adv_type"  class="list-joining" v-model="selected_advertising_type" true-value="item" false-value="null" @change="handle_choose_type">
                                    <option value=null selected>-- {{$t('manager.adv_type')}} --</option>
                                    <option v-bind:value="item" v-for="(item, index) in adver_type" :key="index">{{item.name}}</option>
                                </select>
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group" v-if="!is_hotlabel" >
                            <span class="label-span margin-bottom">{{$t('page')}}</span>
                            <select name="page"  class="list-joining" v-model="selected_page" true-value="item" false-value="null" :disabled="selected_advertising_type == null" @change="handle_choose_page">
                                <option value=null selected>-- {{$t('select_page')}} --</option>
                                <option v-bind:value="item" v-for="(item, index) in pages" :key="index">{{item}}</option>
                            </select>
                        </div>
                        <span class="label-span" v-on:click="handle_preview('')" v-if="is_preview_hotlabel"><i class="far fa-eye" style="color:#000"></i></span>
                    </div>
                    <div class="form-group col-group" v-if="options.length != 0 && !is_hotlabel">
                        <span class="label-span">{{$t('option')}}: (2)</span>
                        <div class="form-group col-group padding-full" style="max-height: 200px; overflow: scroll;">
                            <div class="form-group col-group" v-for="(item, index) in options" :key="index">
                                <div class="form-group row-group">
                                    <input style="width: 40px;" type="radio" name="option" v-model="option" :value="item" @change="handle_check">
                                    <span class="label-span margin-fix-right text-overflow">{{item.position}}</span>
                                    <p class="label-span" style="width: 120px;"> + {{item.bonus.toLocaleString()}} <sup>đ</sup> </p>
                                    <span class="label-span margin-fix-left" v-on:click="handle_preview(item)" ><i class="far fa-eye" style="color:#000"></i></span>
                                </div>
                            </div>
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
                    <div class="form-group row-group" :class="{'margin-top-fix-date' : options.length == 1}">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('user_page.adver_time')}} (3)</span>
                            <select name="category"  class="list-joining" v-model="new_adv.adversiting_time" @change="handle_cal_price">
                                <option value="0" selected>-- {{$t('select_time')}}  --</option>
                                <option v-bind:value="item.value" v-for="(item, index) in times" :key="index">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="form-group col-group margin-fix-right ">
                            <span class="label-span margin-bottom">{{$t('date_start')}}</span>
                            <datepicker :placeholder="`${$t('date_start')}`" class="date_picker" :disabled-dates="disable_date" :highlighted="highlighted" :format="format"  @closed="handle_process_choose_date" v-model="new_adv.start_time"></datepicker>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('price')}} [ 1 + 2 ] * 3 </span>
                            <p class="label" style="color: #f34343">{{new_adv.price.toLocaleString()}} <sup>đ</sup> </p>
                        </div>
                    </div>
                    <div class="form-group col-group margin-fix-right" v-if="new_adv.advertising_type == 'BANNER'">
                        <span class="label-span margin-bottom">{{$t('image_upload.banner')}}</span>
                        <div class="form-group margin-bottom" v-if="image_upload_preview.length > 0">
                            <img v-bind:src="image_upload_preview" :alt="banner.name" style="width: 100%; max-height: 320px; object-fit: contain;">
                        </div>
                        <span class="label-span margin-bottom" >{{$t('image_upload.size_up_load')}}: {{size_accept}}</span>
                        <ValidationProvider name="banner" rules="required" v-slot="{ errors }" style="width: 100%;">
                            <input type="file" name="banner" ref="banner" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group row-group" style="justify-content: center; margin-top: 16px;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="handle_close()">{{$t('cancel')}}</div>
                        <button class="btn btn-signup primary-color" style="color: #FFF">{{$t('save')}}</button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>
<style>
.date_picker { display: flex; flex-direction: column; justify-content: flex-end; width: 100%; height: 36px !important;}
.date_picker input { height: 38px;}
.date_picker > .header { height: 20px !important;}
</style>
<script>
import { socket_bus } from '../../../../main'
import datepicker from 'vuejs-datepicker';
import { HTTP } from '../../../../http-common';
export default {
    components: {datepicker},
    data() {
        return {
            new_adv: {id_brand: '', price: 0, adversiting_time: 0, start_time:null, page: '', position: '', advertising_type: ''},
            format: 'dd/MM/yyyy',
            brands: [],
            adver_type:[],
            pages: [],
            options: [],
            option: {},
            times:[],
            times_all:{
                en: [{name: '3 days', value: 3}, {name: '1 weeks', value: 7}, {name:'2 weeks', value: 14}, {name:'1 months', value: 30}, {name:'2 months', value: 60}, {name: '3 months', value: 90}, {name: '4 months', value: 120}],
                vi: [{name: '3 ngày', value: 3}, {name: '1 tuần', value: 7}, {name:'2 tuần', value: 14}, {name:'1 tháng', value: 30}, {name:'2 tháng', value: 60}, {name: '3 tháng', value: 90}, {name: '4 tháng', value: 120}],
                tw: [{name: '3 天', value: 3}, {name: '1 周', value: 7}, {name:'2 周', value: 14}, {name:'1 月', value: 30}, {name:'2 月', value: 60}, {name: '3 月', value: 90}, {name: '4 月', value: 120}]
            },
            brand_selected: null,
            selected_advertising_type: null,
            selected_page: null,
            is_hotlabel: false,
            is_preview_hotlabel: false,
            banner: '',
            image_preview: '',
            final_price: 0,
            is_add: false,
            is_preview: false,
            disable_date : {
                to: new Date(),
                ranges: []
            },
            highlighted: {
                to: null,
                from: new Date(Date.now() + 24 * 60 * 60 * 1000)
            },
            image_upload_preview: '',
            size_accept: '',
            url_preview_upload: false,
            current_lang: ''
        }
    },
    methods : {
        handle_preview(item) {
            this.is_preview = true
            this.image_preview = ''
            switch(this.selected_advertising_type.name) {
                case 'BANNER':
                    this.handle_preview_banner(item)
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
        handle_close() {
            this.is_add =  this.is_preview = false;
            this.new_adv = {id_brand: '', price: 0, adversiting_time: 0, start_time:null, page: '', position: ''},
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        },
        handleFileUpload(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            const type_file = e.target.files[0].name.split('.')[1]
            if(type_file == 'png' || type_file == 'jpg') {
                switch(this.selected_page) {
                    case 'All':
                        this.handle_detect_size_banner_all(e, files)
                        break;
                    case 'Home':
                        this.handle_detect_size_home(e, this.option.position, files)
                        break;
                    case 'Category':
                        this.handle_detect_size_category(e, this.option.position, files)
                        break;
                    case 'Exhibition':
                        this.handle_detect_size_exhibition(e, this.option.position, files)
                        break;
                }
            } else {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.type_not_accept')})
                e.target.value = ''
            }
        },
        handle_get_place_holder_upload() {
            switch(this.selected_page) {
                case 'All':
                    this.size_accept = `${this.$t('message_alert.width')}: 1170px, ${this.$t('message_alert.height')}: 120px`
                    break;
                case 'Home':
                    this.size_accept = this.option.position  == 'Right' ? `${this.$t('message_alert.width')}: 370px, ${this.$t('message_alert.height')}: 200px` : `${this.$t('message_alert.width')}: 770px, ${this.$t('message_alert.height')}: 420px`
                    break;
                case 'Category':
                    if(this.option.position== 'Left') {
                        this.size_accept = `${this.$t('message_alert.width')}: 270px, ${this.$t('message_alert.height')}: 390px`
                    } else if(this.option.position == 'Big Center') {
                        this.size_accept = `${this.$t('message_alert.width')}: 570px, ${this.$t('message_alert.height')}: 390px`
                    } else if(this.option.position == 'Right - Top' || this.option.position == 'Right - Bottom') {
                        this.size_accept = `${this.$t('message_alert.width')}: 270px, ${this.$t('message_alert.height')}: 180px`
                    } else {
                        this.size_accept = `${this.$t('message_alert.width')}: 1170px, ${this.$t('message_alert.height')}: 150px`
                    }
                    break;
                case 'Exhibition':
                    if(this.option.position== 'Left' || this.option.position == 'Center') {
                        this.size_accept = `${this.$t('message_alert.width')}: 370px, ${this.$t('message_alert.height')}: 460px`
                    } else if(this.option.position == 'Right - Top' || this.option.position == 'Right - Bottom') {
                        this.size_accept = `${this.$t('message_alert.width')}: 370px, ${this.$t('message_alert.height')}: 215px`
                    } else {
                        this.size_accept = `${this.$t('message_alert.width')}: 1170px, ${this.$t('message_alert.height')}: 120px`
                    }
                    break;
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
                    this.image_upload_preview = URL.createObjectURL(files[0]);
                    this.banner = this.$refs.banner.files[0]
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
                        this.image_upload_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Slider') {
                image.onload = () => {
                    if(image.width != 770 || image.height != 420 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.image_upload_preview = URL.createObjectURL(files[0]);
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
                        this.image_upload_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Big Center') {
                image.onload = () => {
                    if(image.width != 570 || image.height != 390 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.image_upload_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Right - Top' || position == 'Right - Bottom') {
                image.onload = () => {
                    if(image.width != 270 || image.height != 180 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.image_upload_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'SideBar') {
                image.onload = () => {
                    if(image.width != 1170 || image.height != 150 ) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.image_upload_preview = URL.createObjectURL(files[0]);
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
                        this.image_upload_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Right - Top' || position == 'Right - Bottom') {
                image.onload = () => {
                    if(image.width != 370 || image.height != 215 ) {
                        this.size_accept = `${this.$t('message_alert.width')}: 370px, ${this.$t('message_alert.height')}: 215px`
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.image_upload_preview = URL.createObjectURL(files[0]);
                    }
                }
            } else if(position == 'Wide') {
                image.onload = () => {
                    if(image.width != 1170 || image.height != 120 ) {
                        this.size_accept = `${this.$t('message_alert.width')}: 1170px, ${this.$t('message_alert.height')}: 120px`
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.size_accept}`})
                    } else {
                        this.banner = this.$refs.banner.files[0]
                        this.image_upload_preview = URL.createObjectURL(files[0]);
                    }
                }
            }
        },
        handle_choose_type() {
            this.options = []
            this.new_adv.advertising_type = this.selected_advertising_type.name    
            switch(this.selected_advertising_type.name) {
                case 'BANNER':
                    this.is_hotlabel = this.is_preview_hotlabel = false
                    this.pages = ['All', 'Home', 'Category', 'Exhibition']
                    break;
                case 'RECOMMEND':
                    this.is_hotlabel = this.is_preview_hotlabel = false
                    this.selected_page = null
                    this.pages = ['Home', 'Category', 'Exhibition']
                    break;
                case 'HOTLABEL':
                    this.is_hotlabel = true
                    this.is_preview_hotlabel = true
                    this.final_price = this.selected_advertising_type.price
                    this.selected_page = null
                    this.handle_cal_price()
                    break
            }
            this.new_adv.start_time = null
            this.new_adv.adversiting_time = 0
        },
        handle_choose_page() {
            this.options = []
            this.selected_advertising_type.option.map(item => {
                if(item.page == this.selected_page) {
                    this.options.push(item)
                }
            })
            this.final_price = this.selected_advertising_type.price
            this.options.map(item => {
                return item.bonus == 0 ? this.option = item : null;
            })
        },
        handle_check() {
            this.final_price = this.selected_advertising_type.price + this.option.bonus
            this.handle_cal_price()
            this.handle_get_place_holder_upload()
        },
        handle_cal_price() {
            this.new_adv.price = this.final_price * this.new_adv.adversiting_time
            const info = JSON.parse(JSON.stringify(this.option))
            const category_brand = this.brands.filter(item => {return item.id == this.new_adv.id_brand})[0].id_category
            this.handle_get_current_advertisement(info.page, info.position, this.new_adv.adversiting_time, category_brand)
            if(this.new_adv.advertising_type == 'RECOMMEND' || this.new_adv.advertising_type == 'HOTLABEL') {
                this.handle_check_have_avd(this.new_adv.id_brand, info.page, info.position, this.new_adv.adversiting_time, this.new_adv.advertising_type)
            }
            this.handle_process_choose_date()
        },
        handle_process_choose_date() {
            var start_date = Date.parse(this.new_adv.start_time)
            var stop_date = start_date + (this.new_adv.adversiting_time - 1) * 24 * 60 * 60 * 1000
            this.highlighted = {from:start_date, to: stop_date} 
            this.new_adv.start_time = start_date
        },
        handle_create_advertisement() {
            this.new_adv.position = this.option.position
            this.new_adv.page = this.selected_page
            var data_form = new FormData()
            data_form.append('id_brand', this.new_adv.id_brand)
            data_form.append('advertising_type', this.new_adv.advertising_type)
            data_form.append('adversiting_time', this.new_adv.adversiting_time)
            data_form.append('price', this.new_adv.price)
            data_form.append('position', this.new_adv.position)
            data_form.append('start_time', this.new_adv.start_time)
            data_form.append('page', this.selected_page)
            if(this.new_adv.advertising_type == 'BANNER') {
                data_form.append('banner', this.banner)
            }
            return new Promise((resolve, reject) => {
                HTTP.post('/advertisements/', data_form).then(result => {
                    if(result.data.status == 201) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.create_adv_success')}`})
                        this.is_add = false
                        socket_bus.$emit('CREATE_ADVERTISMENT', {data: result})
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.create_adv_success')}`})
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_get_brands() {
            const customer = JSON.parse(localStorage.getItem('customer'))
            return new Promise((resolve, reject) => {
                HTTP.get('/brands/brand-customer/' + customer.id).then(result => {
                    resolve(result.data)
                    this.brands = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_get_current_advertisement(page, position, range, category) {
            return new Promise((resolve, reject) => {
                HTTP.get(`/advertisements/advertisement-run&page=${page}&position=${position}&range=${range}&category=${category}`).then(result => {
                    resolve(result.data)
                    if(result.data.status == 200) {
                        if(position == 'Slider' && result.data.data.length < 3) {
                            this.disable_date.to = new Date()
                        } else {
                            this.disable_date.to = new Date()
                            result.data.data.map(item => {
                                var start_time = new Date(item.start_time)
                                this.disable_date.ranges.push({from: start_time, to: new Date(item.stop_time)})
                            })
                        }
                       
                    } else {
                        this.disable_date.to = new Date()
                        this.disable_date.ranges.length = 0
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error:' + error);
                })
            })
        },
        handle_check_have_avd(id_brand, page, position, range, adversiting_type) {
            return new Promise((resolve, reject) => {
                HTTP.get(`/adv-check/advertisement-brand-have&brand=${id_brand}&page=${page}&position=${position}&range=${range}&advertisement-type=${adversiting_type}`).then(result => {
                    resolve(result)
                    result.data.data.map(item => {
                        var start_time = new Date(item.start_time)
                        start_time.setUTCDate(start_time.getUTCDate() - 1)
                        this.disable_date.ranges.push({from: start_time, to: new Date(item.stop_time)})
                    })
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    created() {
        socket_bus.$on('ADV', (brand_choose) => {
            this.is_add = true
            this.new_adv.id_brand = brand_choose.id_brand
        })
        this.handle_get_brands()
        this.$store.dispatch('get_advertisement_type').then(result => {
            this.adver_type = result.status == 200 ? result.data : []
        })  
        this.current_lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'vn'
        this.times = this.current_lang == 'vn' ? this.times_all.vi : (this.current_lang == 'en' ? this.times_all.en : this.times_all.tw)
    }
}
</script>