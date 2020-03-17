<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 800px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('user_page.your_brand')}}</p>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group row-group width-full">
                    <div class="block-list-row width-full padding-full border-bottom-ol">
                        <div class="block-item-row-header margin-fix-right" style="max-width: 64px; width: 64px; justify-content: center;">
                            <p class="label text-color-second ">{{$t('user_page.logo')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 160px; margin: 0 8px;">
                            <p class="label text-color-second ">{{$t('form_joining.category')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 220px;">
                            <p class="label text-color-second ">{{$t('user_page.brand_name')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 200px;">
                            <p class="label text-color-second ">{{$t('user_page.pricing')}}</p>
                        </div>
                        <div class="block-item-row-header">
                            <p class="label text-color-second ">{{$t('form_joining.location')}}</p>
                        </div>
                        <div class="block-item-row-header" style="width: 200px; flex: none;">
                            <p class="label text-color-second" style="text-align:left;">{{$t('action')}}</p>
                        </div>
                    </div>
                </div>
                <div class="form-group padding-full flex-row-center" v-if="brands.length == 0">
                    <span class="label-cell">{{$t('nodata')}}</span>
                </div>
                <div class="form-group border-bottom-ol padding-full row-animation" style="align-items: center;" v-for="(item,index) in brands" :key="index">
                    <div class="block-item-row logo-brand margin-fix-right" style="width: 64px; border: none;">
                        <img v-bind:src="`http://franchiseking.vn/${item.image_source.logo}`" v-bind:alt="`${item.name}`" >
                    </div>
                    <div class="block-item-row " style="max-width: 160px; margin: 0 8px;">
                        <p class="label-cell">{{handle_translate(item.id_category)}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 220px;">
                        <router-link class="label-cell width-full" style="font-size: 16px;" :to="`/${item.id_category}/${item.name_vietnamese}`">{{item.name}}</router-link>
                    </div>
                    <div class="block-item-row " style="max-width: 200px;">
                        <p class="label-cell bold">{{item.price.toLocaleString() }} <sup>đ</sup></p>
                    </div>
                    <div class="block-item-row " style="max-width: 360px; margin-right: 8px;">
                        <p class="label-cell text-overflow" >{{item.location.toString()}}</p>
                    </div>
                    <div class="block-item-row" style="justify-content: flex-end; align-items: flex-end; flex-direction: row; width: 200px; flex: none;">
                        <a class="label-cell flex-box" v-on:click="handle_edit(item)"><i class="fas fa-edit"></i></a>
                        <a  class="label-cell flex-box" v-on:click="handle_update_image(item)"><i class="far fa-file-image"></i></a>
                        <a class="label-cell flex-box" v-on:click="handle_delete_brand(item)"><i class="fas fa-trash-alt"></i></a>
                    </div>
                </div>
            </form>
        </div>
        <detail_brand></detail_brand>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="brand_selected">
            <div class="block-alert padding-full" style="padding: 0 16px; max-width: 1000px">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form"> {{brand_selected.name}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style="width: 100%; justify-content: center;">
                    <form class="block-form" style="padding:16px; width: 96%;" @submit.prevent="handle_upload">
                        <div class="form-group row-group">
                            <div class="form-group row-group" style="justify-content: flex-start; align-items: center">
                                <input type="radio" name="logo" v-model="is_logo" value="LOGO" @change="handle_change()">
                                <span class="label-span">{{$t('logo')}}</span>
                            </div>
                            <div class="form-group row-group" style="justify-content: flex-start; align-items: center">
                                <input type="radio" name="thumbnail" v-model="is_logo" value="THUMBNAIL" @change="handle_change()">
                                <span class="label-span">{{$t('image_upload.thumbnail')}}</span>
                            </div>
                            <div class="form-group row-group" style="justify-content: flex-start; align-items: center" >
                                <input type="radio" name="main_banner" v-model="is_logo" value="MAIN_BANNER" @change="handle_change()">
                                <span class="label-span">{{$t('image_upload.banner')}}</span>
                            </div>
                            <div class="form-group row-group margin-fix-right" style="justify-content: flex-start; align-items: center">
                                <input type="radio" name="image_intro" v-model="is_logo" value="IMAGE_INTRO" @change="handle_change()">
                                <span class="label-span">{{$t('image_upload.intro')}}</span>
                            </div>
                            <div class="form-group row-group" style="justify-content: flex-start; align-items: center">
                                <input type="radio" name="image_intro" v-model="is_logo" value="MENU" @change="handle_change()">
                                <span class="label-span">{{$t('image_upload.menu')}}</span>
                            </div>
                            <div class="form-group row-group" style="justify-content: flex-start; align-items: center">
                                <input type="radio" name="qr_code_image" v-model="is_logo" value="QR_CODE" @change="handle_change()">
                                <span class="label-span">QR Code</span>
                            </div>
                            <div class="form-group row-group" style="justify-content: flex-start; align-items: center" v-if="brand_selected.level == 'VIP'">
                                <input type="radio" name="bg_vip" v-model="is_logo" value="BG_VIP" @change="handle_change()">
                                <span class="label-span">{{$t('bg_vip')}}</span>
                            </div>
                        </div>
                        <div class="form-group row-group" v-if="url_preview.length > 0">
                            <div class="form-group margin-bottom margin-fix-right" style="max-height: 200px" v-for="(image, index) in url_preview" :key="index" >
                                <!-- <span class="label-span" v-on:click="handle_delete_link(index)"><i class="fas fa-times-circle"></i></span> -->
                                <img v-bind:src="image" style="width: 100%; height: auto; object-fit: contain;">
                            </div>
                        </div>
                        <div class="form-group row-group">
                            <div class="form-group col-group margin-fix-right" v-if="is_logo == 'LOGO'">
                                <span class="label-span margin-bottom">{{$t('user_page.logo')}}</span>
                                <span class="label-span text-color-second">{{$t('image_upload.size_up_load')}} 270px - 270px</span>
                                <span class="label-span margin-bottom">* {{$t('image_upload.note_upload')}}</span>
                                <ValidationProvider name="logo" rules="required" v-slot="{ errors }" style="width: 100%;">
                                    <input type="file" name="logo" ref="logo" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group col-group" v-if="is_logo == 'THUMBNAIL'">
                                <span class="label-span margin-bottom">{{$t('image_upload.thumbnail')}}</span>
                                <span class="label-span text-color-second">{{$t('image_upload.size_up_load')}}: 870px - 270px</span>
                                <span class="label-span margin-bottom">* {{$t('image_upload.note_upload')}}</span>
                                <ValidationProvider name="thumbnail" rules="required" v-slot="{ errors }" style="width: 100%;">
                                    <input type="file" name="thumbnail" ref="thumbnail" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="form-group row-group">
                            <div class="form-group col-group margin-fix-right" v-if="is_logo == 'MAIN_BANNER'">
                                <span class="label-span margin-bottom">{{$t('image_upload.banner')}}</span>
                                <span class="label-span text-color-second">{{$t('image_upload.size_up_load')}} 960px - 720px}</span>
                                <span class="label-span margin-bottom">* {{$t('image_upload.note_upload')}}</span>
                                <div class="form-group col-group">
                                    <ValidationProvider name="main_banner_1" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="main_banner_1" ref="main_banner_1" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="main_banner_2" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="main_banner_2" ref="main_banner_2"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group col-group margin-fix-right" v-if="is_logo == 'IMAGE_INTRO'">
                                <span class="label-span margin-bottom">{{$t('image_upload.intro')}}</span>
                                <span class="label-span text-color-second">{{$t('image_upload.size_up_load')}} 960px - 720px}</span>
                                <span class="label-span margin-bottom">* {{$t('image_upload.note_upload')}}</span>
                                <div class="form-group col-group">
                                    <ValidationProvider name="image_intro_1" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="image_intro_1" ref="image_intro_1" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="image_intro_2" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="image_intro_2" ref="image_intro_2"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="image_intro_3" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="image_intro_3" ref="image_intro_3" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="image_intro_4" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="image_intro_4" ref="image_intro_4"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="image_intro_5" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="image_intro_5" ref="image_intro_5" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group col-group" v-if="is_logo == 'MENU'">
                                <span class="label-span margin-bottom">{{$t('image_upload.menu')}}</span>
                                <span class="label-span text-color-second">{{$t('image_upload.size_up_load')}} 960px - 720px}</span>
                                <span class="label-span margin-bottom">* {{$t('image_upload.note_upload')}}</span>
                                <div class="form-group col-group">
                                    <ValidationProvider name="menu_1" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="menu_1" ref="menu_1" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="menu_2" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="menu_2" ref="menu_2"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="menu_3" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="menu_3" ref="menu_3" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="menu_4" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="menu_4" ref="menu_4"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="menu_5" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="menu_5" ref="menu_5" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group" v-if="brand_selected.level == 'VIP'">
                                    <ValidationProvider name="menu_6" rules="required" v-slot="{ errors }" style="width: 100%; margin-bottom: 5px;">
                                        <input type="file" name="menu_6" ref="menu_6" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                    <ValidationProvider name="menu_7" rules="required" v-slot="{ errors }" style="width: 100%; margin-bottom: 5px;">
                                        <input type="file" name="menu_7" ref="menu_7"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                    <ValidationProvider name="menu_8" rules="required" v-slot="{ errors }" style="width: 100%; margin-bottom: 5px;">
                                        <input type="file" name="menu_8" ref="menu_8" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                    <ValidationProvider name="menu_9" rules="required" v-slot="{ errors }" style="width: 100%; margin-bottom: 5px;">
                                        <input type="file" name="menu_9" ref="menu_9"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                    <ValidationProvider name="menu_10" rules="required" v-slot="{ errors }" style="width: 100%; margin-bottom: 5px;">
                                        <input type="file" name="menu_10" ref="menu_10" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row-group">
                            <div class="form-group col-group" v-if="is_logo == 'QR_CODE'">
                                <span class="label-span margin-bottom">QR CODE</span>
                                <span class="label-span text-color-second">{{$t('image_upload.size_up_load')}}: 90px - 90px}</span>
                                <span class="label-span margin-bottom">* {{$t('image_upload.note_upload')}}</span>
                                <ValidationProvider name="qr_code_image" rules="required" v-slot="{ errors }" style="width: 100%;">
                                    <input type="file" name="qr_code_image" ref="qr_code_image"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group col-group" v-if="is_logo == 'BG_VIP'">
                                <span class="label-span margin-bottom text-uppercase">{{$t('bg_vip')}}</span>
                                <span class="label-span text-color-second">{{$t('image_upload.size_up_load')}}: 1920px - 1080px}</span>
                                <span class="label-span margin-bottom">* {{$t('image_upload.note_upload')}}</span>
                                <div class="form-group col-group">
                                    <ValidationProvider name="bg_vip_1" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="bg_vip_1" ref="bg_vip_1"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="bg_vip_2" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="bg_vip_2" ref="bg_vip_2"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group col-group">
                                    <ValidationProvider name="bg_vip_3" rules="required" v-slot="{ errors }" style="width: 100%;">
                                        <input type="file" name="bg_vip_3" ref="bg_vip_3"  v-on:change="handleFileUpload"  accept="image/jpeg, image/x-png">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row-group" style="justify-content: center; align-items: center;">
                            <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="handle_close_form_up()">{{$t('cancel')}}</div>
                            <button type="submit" class="btn btn-signup bg-title-header" >{{$t('save')}}</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../../../../http-common'
    import detail_brand from './Detail-Brand'
    import { socket_bus } from '../../../../main'

    export default {
        components: { detail_brand,
        },
        data() {
            return {
                customer: {},
                brands: [],
                brand_selected: null,
                is_add: false,
                is_change_image: false,
                images: '',
                thumbnail: '',
                main_banner: [],
                image_intro: [],
                menu: [],
                bg_vip: [],
                logo:'',
                is_logo: '',
                qr_code_image: '',
                url_preview: [],
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
            handle_get_brands() {
                this.$store.dispatch('handle_get_brands').then (result => {
                    this.brands = result.status == 200 ? result.data : []
                })
            },
            handle_change() {
                if(this.url_preview.length > 0) {
                    socket_bus.$emit('SHOW_MESSAGE_UPLOAD_IMAGE', {message: this.$t('message_alert.save_image')})
                }
            },
            handle_add_brand() {
                this.is_add = true;
            },
            handle_edit(brand) {
               socket_bus.$emit('EDIT_BRAND', {data: brand })
            },
            handle_delete_brand(brand) {
                socket_bus.$emit('DELETE_BRAND', {data: brand })
            },
            handle_update_image(brand) {
                this.brand_selected = brand
            },
            handle_delete_link(index) {
                console.log(`Position delete ${index}`)
                if(this.is_logo == 'MAIN_BANNER' || this.is_logo == 'IMAGE_INTRO' || this.is_logo == 'MENU') {
                    this.url_preview = [],
                    this.main_banner = ''
                    this.image_intro = ''
                    this.$refs.logo = []
                    this.menu = ''
                } else {
                    this.url_preview = [],
                    this.logo = ''
                    this.qr_code_image = ''
                    this.thumbnail = ''
                    this.$refs.logo = []
                }
            },
            handleFileUpload(e) {
                var files = e.target.files || e.dataTransfer.files;
                var _URL = window.URL || window.webkitURL;
                var image = new Image()
                if (!files.length)
                    return;

                const type_file = e.target.files[0].name.split('.')[1]
                if(type_file != 'png' || type_file != 'jpg') {
                    switch(this.is_logo) {
                        case 'LOGO':
                            this.logo = files[0]
                            this.thumbnail = this.main_banner = this.image_intro = this.menu = this.qr_code_image = null
                            image.src = _URL.createObjectURL(files[0]);
                            image.onload = () => {
                                if(image.width != 270 || image.height != 270 ) {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.size_error')})
                                    this.logo = null
                                    e.target.value = ''
                                } else {
                                    this.url_preview.push(URL.createObjectURL(files[0]));
                                }
                            }
                            break;
                        case 'THUMBNAIL':
                            this.thumbnail = files[0]
                            this.logo = this.main_banner = this.image_intro = this.menu = this.qr_code_image = null
                            image.src = _URL.createObjectURL(files[0]);
                            image.onload = () => {
                                if(image.width != 870 || image.height != 270 ) {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.size_error')})
                                    this.thumbnail = null
                                    e.target.value = ''
                                } else {
                                    this.url_preview.push(URL.createObjectURL(files[0]));
                                }
                            }
                            break;
                        case 'MAIN_BANNER':
                            this.main_banner.push(files[0])
                            this.logo = this.thumbnail = this.image_intro = this.menu = this.qr_code_image = null
                                image.src = _URL.createObjectURL(files[0]);
                                image.onload = () => {
                                    if(image.width != 960 || image.height != 720 ) {
                                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.size_error')})
                                        this.main_banner = null
                                        e.target.value = ''
                                        this.url_preview = null
                                    } else {
                                        this.url_preview.push(URL.createObjectURL(files[0]));
                                    }
                                    if(this.main_banner.length > 2) {
                                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.main_banner')})
                                        this.main_banner = []
                                        e.target.value = ''
                                    }
                                }
                            break;
                        case 'IMAGE_INTRO':
                            this.image_intro.push(files[0])
                            this.logo = this.main_banner = this.thumbnail = this.menu = this.qr_code_image = null
                                image.src = _URL.createObjectURL(files[0]);
                                image.onload = () => {
                                if(image.width != 960 || image.height != 720 ) {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.size_error')})
                                    this.image_intro = null
                                    e.target.value = ''
                                    this.url_preview = null
                                } else {
                                    this.url_preview.push(URL.createObjectURL(files[0]));
                                }

                                if(this.image_intro.length > 5) {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.intro_max_upload')})
                                    this.image_intro = []
                                    e.target.value = ''
                                }
                            }
                            break;
                        case 'MENU':
                            this.menu.push(files[0])
                            this.logo = this.main_banner = this.image_intro = this.thumbnail = this.qr_code_image = null
                                image.src = _URL.createObjectURL(files[0]);
                                image.onload = () => {
                                if(image.width != 960 || image.height != 720 ) {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.size_error')})
                                    this.image_intro = null
                                    e.target.value = ''
                                    this.url_preview = null
                                } else {
                                    this.url_preview.push(URL.createObjectURL(files[0]));
                                }

                                if(this.menu.length > 5 && this.brand_selected.level == 'NORMAL') {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.menu_max_upload')})
                                    this.menu = []
                                    e.target.value = ''
                                } else if(this.menu.length > 10 && this.brand_selected.level == 'VIP') {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.menu_max_upload_vip')})
                                    this.menu = []
                                    e.target.value = ''
                                } 
                            }
                            break;
                        case 'QR_CODE':
                            this.qr_code_image = files[0]
                            this.logo = this.main_banner = this.image_intro = this.menu = this.thumbnail = null
                            image.src = _URL.createObjectURL(files[0]);
                            image.onload = () => {
                                if(image.width != 90 || image.height != 90 ) {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.size_error')})
                                    this.logo = null
                                    e.target.value = ''
                                } else {
                                    this.url_preview.push(URL.createObjectURL(files[0]));
                                }
                            }
                            break;
                        case 'BG_VIP':
                            this.bg_vip.push(files[0])
                            this.logo = this.main_banner = this.image_intro = this.menu = this.thumbnail = null
                            image.src = _URL.createObjectURL(files[0]);
                            image.onload = () => {
                                if(image.width != 1920 || image.height != 1080 ) {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.size_error')})
                                    this.bg_vip = []
                                    e.target.value = ''
                                } else {
                                    this.url_preview.push(URL.createObjectURL(files[0]));
                                }

                                if(this.bg_vip > 3) {
                                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.bg_vip_max_upload')})
                                    this.bg_vip = []
                                    e.target.value = ''
                                }  
                            }
                            break;
                    }
                } else {
                    socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.type_not_accept')})
                    e.target.value = ''
                }
            },
            handle_upload() {
                switch(this.is_logo) {
                    case 'LOGO':
                        this.handle_up_logo();
                        break;
                    case 'THUMBNAIL':
                        this.handle_up_thumbnail();
                        break;
                    case 'MAIN_BANNER':
                        this.handle_up_main_banner();
                        break;
                    case 'IMAGE_INTRO':
                        this.handle_up_image_intro();
                        break;
                    case 'BG_VIP':
                        this.handle_up_image_bg_vip();
                        break;
                    case 'MENU':
                        this.handle_up_menu();
                        break;
                    case 'QR_CODE':
                        this.handle_up_qr_code_image();
                        break;
                }
            },
            handle_up_logo() {
                const data_form = new FormData()
                data_form.append('name', this.brand_selected.id)
                data_form.append('logo', this.logo);
                console.log('ACCESSS')
                return new Promise((resolve, reject) => {
                    HTTP.post('/brands/upload-logo/' + this.brand_selected.id, data_form, {
                        headers: {
                            'Content-Type' : 'multipart/form-data'
                        }
                    }).then(result => {
                        resolve(result)
                        console.log(result)
                        if(result.data.status == 200) {
                            this.brand_selected = null
                            socket_bus.$emit('SHOW_MESSAGE',{message: `${this.$t('message_alert.update_image_success')}`})
                        } else {
                            socket_bus.$emit('SHOW_MESSAGE',{message: `${this.$t('message_alert.update_image_fail')}`})
                        }
                    }).catch(error => {
                        reject(error)
                        console.log('Error: ' + error);
                    })
                })
            },
            handle_up_thumbnail() {
                const data_form = new FormData();
                data_form.append("name", this.brand_selected.id)
                data_form.append("thumbnail", this.thumbnail)
                
                return new Promise((resolve, reject) => {
                    HTTP.post('/brands/upload-thumbnail/' + this.brand_selected.id, data_form, {
                        headers: {
                            'Content-Type' : 'multipart/form-data'
                        }
                    }).then(result => {
                        resolve(result)
                        if(result.data.status == 200) {
                            this.brand_selected = null
                            socket_bus.$emit('SHOW_MESSAGE',{message: `${this.$t('message_alert.update_image_success')}`})

                        } else {
                            socket_bus.$emit('SHOW_MESSAGE',{message: `${this.$t('message_alert.update_image_fail')}`})
                        }
                    }).catch(error => {
                        reject(error)
                        console.log('Error: ' + error);
                    })
                })
            },
            handle_up_qr_code_image() {
                const data_form = new FormData();
                data_form.append("name", this.brand_selected.id)
                data_form.append("qr_code_image", this.qr_code_image)
                
                return new Promise((resolve, reject) => {
                    HTTP.post('/brands/upload-qr-code/' + this.brand_selected.id, data_form, {
                        headers: {
                            'Content-Type' : 'multipart/form-data'
                        }
                    }).then(result => {
                        resolve(result)
                        if(result.data.status == 200) {
                            this.brand_selected = null
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_success')})
                        } else {
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_fail')})
                        }
                    }).catch(error => {
                        reject(error)
                        console.log('Error: ' + error);
                    })
                })
            },
            handle_up_main_banner() {
                const data_form = new FormData();
                data_form.append("name", this.brand_selected.id)
                for(let i = 0; i < this.main_banner.length; i++) {
                    data_form.append('main_banner', this.main_banner[i])
                }

                return new Promise((resolve, reject) => {
                    HTTP.post('/brands/upload-banners/' + this.brand_selected.id, data_form, {
                        headers: {
                            'Content-Type' : 'multipart/form-data'
                        }
                    }).then(result => {
                        resolve(result)
                        if(result.data.status == 200) {
                            this.brand_selected = null
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_success')})
                        } else {
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_fail')})
                        }
                    }).catch(error => {
                        reject(error)
                        console.log('Error: ' + error);
                    })
                })
            },
            handle_up_image_intro() {
                const data_form = new FormData();
                data_form.append("name", this.brand_selected.id)
                for(let i = 0; i < this.image_intro.length; i++) {
                    data_form.append('image_intro', this.image_intro[i])
                }

                return new Promise((resolve, reject) => {
                    HTTP.post('/brands/upload-intro-image/' + this.brand_selected.id, data_form, {
                        headers: {
                             'Content-Type' : 'multipart/form-data'
                        }
                    }).then(result => {
                        resolve(result)
                        if(result.data.status == 200) {
                            this.brand_selected = null
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_success')})
                        } else {
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_fail')})
                        }
                    }).catch(error => {
                        reject(error)
                        console.log('Error: ' + error);
                    })
                })
            },
            handle_up_image_bg_vip() {
                const data_form = new FormData();
                data_form.append("name", this.brand_selected.id)
                for(let i = 0; i < this.bg_vip.length; i++) {
                    data_form.append('bg_vip', this.bg_vip[i])
                }

                return new Promise((resolve, reject) => {
                    HTTP.post('/brands/upload-background-image/' + this.brand_selected.id, data_form, {
                        headers: {
                             'Content-Type' : 'multipart/form-data'
                        }
                    }).then(result => {
                        resolve(result)
                        if(result.data.status == 200) {
                            this.brand_selected = null
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_success')})
                        } else {
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_fail')})
                        }
                    }).catch(error => {
                        reject(error)
                        console.log('Error: ' + error);
                    })
                })
            },
            handle_up_menu() {
                const data_form = new FormData();
                data_form.append("name", this.brand_selected.id)
                for(let i = 0; i < this.menu.length; i++) {
                    data_form.append('menu', this.menu[i])
                }

                return new Promise((resolve, reject) => {
                    HTTP.post('/brands/upload-menu/' + this.brand_selected.id, data_form, {
                        headers: {
                            'Content-Type' : 'multipart/form-data'
                        }
                    }).then(result => {
                        resolve(result)
                        if(result.data.status == 200) {
                            this.brand_selected = null
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_success')})
                        } else {
                            socket_bus.$emit('SHOW_MESSAGE',{message: this.$t('message_alert.update_image_fail')})
                        }
                    }).catch(error => {
                        reject(error)
                        console.log('Error: ' + error);
                    })
                })
            },
            handle_close_form_up() {
                console.log('object')
                this.is_logo = []
                this.brand_selected = null
                this.logo = []
                this.main_banner = []
                this.image_intro = []
                this.thumbnail = []
                this.url_preview = []
            }
        },
        created() {
            this.handle_get_brands()

            socket_bus.$on('CANCEL_ADD_BRAND', result => {
                this.is_add = result.state
            })

            socket_bus.$on("UPDATE_LIST_BRAND", result => {
                this.brands.push(result.data)
            })

            socket_bus.$on('RESPONSE_DELETE', result => {
                if(result.is_delete) {
                    this.brands.splice(this.brands.indexOf(result.data), 1)
                    HTTP.delete('/brands/' + result.data.id).then(result => {
                        if(result.data.status == 200) {
                            socket_bus.$emit('SHOW_MESSAGE',{message: `${this.$t('message_alert.del_brand_success')}`})
                        } else {
                            socket_bus.$emit('SHOW_MESSAGE',{message: `${this.$t('message_alert.del_brand_fail')}`})
                        }
                    })
                    .catch(error => {
                        console.log('Error Delete: ' + error);
                    })
                }
            })

            socket_bus.$on('CLOSE_BOX', result => {
                console.log(`Close box ${result}`)
                this.handle_get_brands()
            })

            socket_bus.$on('RESULT_UPLOAD_IMAGE', result => {
                if(result.is_save) {
                    this.handle_upload()
                } else {
                    this.url_preview = null
                }
            })
        }   
    }
</script>