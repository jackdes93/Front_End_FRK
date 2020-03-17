<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 800px; background: #EDEDED; padding-bottom: 32px;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('manager.brand_list')}}</p>
            </div>
            <div class="form-group row-group" style="justify-content: flex-end; align-items: center;">
                <ul class="form-group row-group" style="width: 100%; justify-content: flex-start; list-style: none; padding-left: 20px;">
                    <li class="item padding-right" v-on:click="handle_choose_tab('All')">
                        <p class="label text-color-second" v-bind:class="{'active' : tab_choose == 'All'}">{{$t('manager.all_brand')}}</p>
                    </li>
                    <li class="item padding-right" v-on:click="handle_choose_tab('Adv')">
                        <p class="label text-color-second" v-bind:class="{'active' : tab_choose == 'Adv'}">{{$t('manager.brand_adv')}}</p>
                    </li>
                    <li class="item" v-on:click="handle_choose_tab('VIP')">
                        <p class="label text-color-second" v-bind:class="{'active' : tab_choose == 'VIP'}">{{$t('manager.brand_vip')}}</p>
                    </li>
                </ul>
                <div class="flex-box block-search margin-fix-right">
                    <input type="text" :placeholder="`${$t('search')}`" class="border-bottom-ol" v-model="search_text">
                </div>
                <button class="btn btn-signup primary-color" style="color: #FFF; min-width: 240px; margin-bottom: 8px;" v-on:click="is_add = true">{{$t('new_brand')}}</button>
            </div>
            <span class="line-separate"></span>
            <div class="form-group row-group width-full">
                <div class="form-group row-group width-full">
                    <div class="block-list-row width-full padding-full border-bottom-ol">
                        <div class="block-item-row-header margin-fix-right" style="max-width: 64px; width: 64px; justify-content: center;">
                            <p class="label text-color-second ">Logo</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 160px; margin: 0 8px;">
                            <p class="label text-color-second ">{{$t('form_joining.category')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 220px;">
                            <p class="label text-color-second ">{{$t('user_page.brand_name')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 180px; justify-content: flex-start;">
                            <p class="label text-color-second ">{{$t('user_page.pricing')}}</p>
                        </div>
                        <div class="block-item-row-header" style="max-width: 200px; justify-content: flex-start;">
                            <p class="label text-color-second text-overflow" style="text-align:left;">{{$t('form_joining.location')}}</p>
                        </div>
                        <div class="block-item-row-header" style="width: 200px; flex: none;">
                            <p class="label text-color-second" style="text-align:left;">{{$t('email_owner')}}</p>
                        </div>
                        <div class="block-item-row-header" style="display: flex; justify-content: flex-end;">
                            <p class="label text-color-second" style="text-align: left">{{$t('action')}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group padding-full flex-row-center" v-if="filter_search.length == 0">
                <span class="label-cell">{{$t('nodata')}}</span>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px; max-height: 800px; overflow: auto;">
                <div class="form-group border-bottom-ol padding-full row-animation" style="align-items: center;" v-for="(item,index) in filter_search" :key="index">
                    <div class="block-item-row logo-brand margin-fix-right" style="width: 64px; border: none;">
                        <img v-bind:src="`http://franchiseking.vn/${item.image_source.logo}`" v-bind:alt="`${item.name}`" >
                    </div>
                    <div class="block-item-row " style="max-width: 160px; margin: 0 8px;">
                        <p class="label-cell">{{handle_translate(item.id_category)}}</p>
                    </div>
                    <div class="block-item-row " style="max-width: 200px;">
                        <router-link class="label-cell width-full" style="font-size: 16px;" :to="`/${item.id_category}/${item.name_vietnamese}`">{{item.name}}</router-link>
                    </div>
                    <div class="block-item-row " style="max-width: 180px; justify-content: flex-start;">
                        <p class="label-cell bold">{{item.price.toLocaleString() }} <sup>đ</sup></p>
                    </div>
                    <div class="block-item-row " style="max-width: 200px; margin-right: 8px;">
                        <p class="label-cell text-overflow" >{{item.location.toString()}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{item.email_owner}}</p>
                    </div>
                    <div class="block-item-row" style="display: flex; justify-content:flex-end;">
                        <a class="label-cell margin-fix-right" v-on:click="handle_edit(item)"><i class="fas fa-edit"></i></a>
                        <i class="fas fa-upload margin-fix-right" v-bind:class="{'black': item.level == 'NORMAL', 'gray' : item.level == 'VIP'}"  v-on:click="handle_upgrade_level(item)"></i>
                        <a  class="label-cell margin-fix-right" v-on:click="handle_update_image(item)"><i class="far fa-file-image"></i></a>
                        <a v-on:click="handle_lock_brand(item)" class="label-cell "><i class="fas" v-bind:class="{ 'fa-lock' : item.is_lock, 'fa-lock-open' : !item.is_lock}"></i></a>
                    </div>
                </div>
            </form>
        </div>
        <block_add_brand v-if="is_add"></block_add_brand>
        <block_detail_brand ></block_detail_brand>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="brand_selected">
            <div class="block-alert padding-full" style="padding: 0 16px; max-width: 1000px">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form"> {{brand_selected.name}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style=" width: 100%; justify-content: center; display: flex;">
                    <form class="block-form" style="padding:16px; width: 96%;" @submit.prevent="handle_upload">
                        <div class="form-group row-group">
                            <div class="form-group row-group" style="justify-content: flex-start; align-items: center">
                                <input type="radio" name="logo" v-model="is_logo" value="LOGO" @change="handle_change()">
                                <span class="label-span">Logo</span>
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
                                <span class="label-span" v-on:click="handle_delete_link(index)"><i class="fas fa-times-circle"></i></span>
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
                                <span class="label-span margin-bottom">COVER</span>
                                <span class="label-span text-color-second">Size Image Upload: 870px - 270px</span>
                                <span class="label-span margin-bottom">* {{$t('image_upload.note_upload')}}</span>
                                <ValidationProvider name="thumbnail" rules="required" v-slot="{ errors }" style="width: 100%;">
                                    <input type="file" name="thumbnail" ref="thumbnail" v-on:change="handleFileUpload" accept="image/jpeg, image/x-png">
                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="form-group row-group">
                            <div class="form-group col-group margin-fix-right" v-if="is_logo == 'MAIN_BANNER'">
                                <span class="label-span margin-bottom">Term</span>
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
                                <span class="label-span margin-bottom">Brand Introduce</span>
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
                                <span class="label-span margin-bottom">Menu</span>
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
                            <button class="btn btn-signup bg-title-header" >{{$t('save')}}</button>
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
import block_add_brand from '../../User/ui_user/FormAddBrand'
import block_detail_brand from '../../Admin/Pages/DetailBrand_Admin'

export default {
    components: { block_add_brand, block_detail_brand},
    data() {
        return {
            users: [],
            brands: [],
            user_selected: null,
            brand_selected: null,
            url_preview: [],
            is_add: false,
            brands_of_user: [],
            tab_choose: 'All',
            is_logo: '',
            qr_code_image : '',
            logo : '',
            images : '',
            thumbnail : [],
            main_banner : [],
            image_intro : [],
            menu: [],
            bg_vip: [],
            search_text: ''
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
        handle_change() {
            if(this.url_preview.length > 0) {
                socket_bus.$emit('SHOW_MESSAGE_UPLOAD_IMAGE', {message: this.$t('message_alert.save_image')})
            }
        },
        handle_get_users() {
            HTTP_ADMIN.get('/customers').then(result => {
                this.users = result.data.status == 200 ? result.data.data : []
            }).catch(error => {
                console.log(error)
            })
            
        },
        handle_get_brand() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/brands').then(result => {
                    resolve(result)
                    this.brands = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        },
        handle_get_brand_advertisement() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/brands/advertisments/get-brand').then(result => {
                    resolve(result)
                    this.brands = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        },
        handle_get_vip_brands() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/brands/vip/get-brands').then(result => {
                    resolve(result)
                    this.brands = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log(error);
                })
            })
        },
        handle_upgrade_level(brand) {
            if(brand.level == 'NORMAL') {
                socket_bus.$emit('UPGRADE_VIP_BRAND', {message: brand.name, id_brand: brand.id})
            }
        },
        handle_process_upgrade(id_brand) {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch('/brands/upgrade-level-brand/' + id_brand).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: result.data.message})
                        setTimeout(() => { window.location.reload()}, 2000)
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: result.data.message})
                    }
                }).catch(error => {
                    reject(error)
                    console.log(error);
                })
            })
        },
        handle_edit(brand) {
            socket_bus.$emit('EDIT_BRAND', {data: brand })
        },
        handle_choose_tab(item) {
            switch(item) {
                case 'All':
                    this.tab_choose = 'All'
                    this.handle_get_brand()
                    break;
                case 'Adv':
                    this.tab_choose = 'Adv'
                    this.handle_get_brand_advertisement()
                    break;
                case 'VIP':
                    this.tab_choose = 'VIP'
                    this.handle_get_vip_brands()
                    break;
            }
        },
        handle_update_image(brand) {
            this.brand_selected = brand
        },
        handle_delete_link(index) {
            console.log(index)
                if(this.is_logo == 'MAIN_BANNER' || this.is_logo == 'IMAGE_INTRO' || this.is_logo == 'MENU') {
                this.url_preview = null,
                this.main_banner = ''
                this.image_intro = ''
                this.$refs.logo = []
                this.menu = ''
            } else {
                this.url_preview = null,
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
                                socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.$t('message_alert.width')}:270px - ${this.$t('message_alert.height')}: 270px`})
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
                                socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.$t('message_alert.width')}:870px - ${this.$t('message_alert.height')}: 270px`})
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
                                    socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.$t('message_alert.width')}:960px - ${this.$t('message_alert.height')}: 720px`})
                                    this.main_banner = null
                                    e.target.value = ''
                                    this.url_preview = null
                                } else {
                                    this.url_preview.push(URL.createObjectURL(files[0]));
                                }
                            }
                        break;
                    case 'IMAGE_INTRO':
                        this.image_intro.push(files[0])
                        this.logo = this.main_banner = this.thumbnail = this.menu = this.qr_code_image = null
                            image.src = _URL.createObjectURL(files[0]);
                            image.onload = () => {
                            if(image.width != 960 || image.height != 720 ) {
                                socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.$t('message_alert.width')}:960px - ${this.$t('message_alert.height')}: 720px`})
                                this.image_intro = null
                                e.target.value = ''
                                this.url_preview = null
                            } else {
                                this.url_preview.push(URL.createObjectURL(files[0]));
                            }
                        }
                        break;
                    case 'MENU':
                        this.menu.push(files[0])
                        this.logo = this.main_banner = this.image_intro = this.thumbnail = this.qr_code_image = null
                            image.src = _URL.createObjectURL(files[0]);
                            image.onload = () => {
                            if(image.width != 960 || image.height != 720 ) {
                                socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.$t('message_alert.width')}:960px - ${this.$t('message_alert.height')}: 720px`})
                                this.image_intro = null
                                e.target.value = ''
                                this.url_preview = null
                            } else {
                                this.url_preview.push(URL.createObjectURL(files[0]));
                            }
                        }
                        break;
                    case 'QR_CODE':
                        this.qr_code_image = files[0]
                        this.logo = this.main_banner = this.image_intro = this.menu = this.thumbnail = null
                        image.src = _URL.createObjectURL(files[0]);
                        image.onload = () => {
                            if(image.width != 90 || image.height != 90 ) {
                                socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.$t('message_alert.width')}:90px - ${this.$t('message_alert.height')}: 90px`})
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
                                socket_bus.$emit('SHOW_MESSAGE', {message: `${this.$t('message_alert.size_error')} ${this.$t('message_alert.width')}:1920px - ${this.$t('message_alert.height')}: 1080px`})
                                this.bg_vip = []
                                e.target.value = ''
                            } else {
                                this.url_preview.push(URL.createObjectURL(files[0]));
                            }
                        }
                        break;
                }
            } else {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.type_not_accept')})
                e.target.value = ''
            }
            
            if(this.main_banner.length > 2) {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.main_banner')})
                this.main_banner = []
                e.target.value = ''
            } else if(this.image_intro.length > 5) {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.intro_max_upload')})
                this.image_intro = []
                e.target.value = ''
            } else if(this.menu.length > 5 && this.brand_selected.level == 'NORMAL') {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.menu_max_upload')})
                this.menu = []
                e.target.value = ''
            } else if(this.menu.length > 10 && this.brand_selected.level == 'VIP') {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.menu_max_upload_vip')})
                this.menu = []
                e.target.value = ''
            } else if(this.bg_vip > 3) {
                socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.bg_vip_max_upload')})
                this.bg_vip = []
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
            data_form.append('name', this.brand_selected.name)
            data_form.append('logo', this.logo);

            return new Promise((resolve, reject) => {
                HTTP_ADMIN.post('/brands/upload-logo/' + this.brand_selected.id, data_form, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        setTimeout(() => {window.location.reload()}, 3000) 
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
        handle_up_thumbnail() {
            const data_form = new FormData();
            data_form.append("name", this.brand_selected.name)
            data_form.append("thumbnail", this.thumbnail)
            
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.post('/brands/upload-thumbnail/' + this.brand_selected.id, data_form, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        setTimeout(() => {window.location.reload()}, 3000) 
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
        handle_up_qr_code_image() {
            const data_form = new FormData();
            data_form.append("name", this.brand_selected.name)
            data_form.append("qr_code_image", this.qr_code_image)
            
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.post('/brands/upload-qr-code/' + this.brand_selected.id, data_form, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_qr_success')})
                        setTimeout(() => { window.location.reload() }, 2000)
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_qr_fail')})
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
                HTTP_ADMIN.post('/brands/upload-banners/' + this.brand_selected.id, data_form, {
                    headers: {
                            'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_success')})
                        setTimeout(() => {window.location.reload()}, 3000) 
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_fail')})
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
                HTTP_ADMIN.post('/brands/upload-intro-image/' + this.brand_selected.id, data_form, {
                    headers: {
                            'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    resolve(result)
                     if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_success')})
                        setTimeout(() => {window.location.reload()}, 3000) 
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_fail')})
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
                HTTP_ADMIN.post('/brands/upload-background-image/' + this.brand_selected.id, data_form, {
                    headers: {
                            'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_success')})
                        setTimeout(() => {window.location.reload()}, 3000) 
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_fail')})
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
                HTTP_ADMIN.post('/brands/upload-menu/' + this.brand_selected.id, data_form, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then(result => {
                    resolve(result)
                     if(result.data.status == 200) {
                        this.brand_selected = null
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_success')})
                        setTimeout(() => {window.location.reload()}, 3000) 
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.update_image_fail')})
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_close_form_up() {
            this.is_logo = []
            this.brand_selected = null
            this.logo = []
            this.main_banner = []
            this.image_intro = []
            this.thumbnail = []
            this.url_preview = []
        },
        handle_lock_brand(brand) {
            if(!brand.is_lock) {
                socket_bus.$emit('SHOW_MESSAGE_LOCK_BRAND', {brand: brand})
            } else {
                socket_bus.$emit('SHOW_MESSAGE_UNLOCK_BRAND', {brand: brand})
            }
        }
    },
    computed: {
        filter_search() {
            return this.brands.filter(item => { return item.name.includes(this.search_text) || item.email_owner.includes(this.search_text) || item.id_category.includes(this.search_text)})
        }
    },
    created() {
        this.handle_get_users()
        this.handle_get_brand()

        socket_bus.$on('CANCEL_ADD_BRAND' , result => {
            this.is_add = false
            console.log(`Result cancel add ${result}`)
        })

        socket_bus.$on('UPDATE_LIST_BRAND', result => {
            this.handle_get_brand()
            console.log(`Result update list brand ${result}`)
        })

        socket_bus.$on('RESPONSE_UPDATE_BRAND_VIP', result => {
            if(result.is_del) {
                this.handle_process_upgrade(result.id_brand)
            }
        })

        socket_bus.$on('RESULT_UPLOAD_IMAGE', result => {
            if(result.is_save) {
                this.handle_upload()
            } else {
                this.url_preview = null
            }
        })

        socket_bus.$on('ACCEPT_LOCK_BRAND', result => {
            const brand = result.brand
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch(`/brands/${brand.id}`, {is_lock : true}).then(result_1 => {
                    resolve(result_1)
                    if(result_1.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: result_1.data.message})
                        setTimeout(() => { window.location.reload()})
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: result_1.data.message})
                    }
                }).catch(error => {
                    reject(error)
                    console.log(`Error: ${error}`);
                })
            })
        })

        socket_bus.$on('ACCEPT_UNLOCK_BRAND', result => {
            const brand = result.brand
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch(`/brands/${brand.id}`, {is_lock : false}).then(result_1 => {
                    resolve(result_1)
                    if(result_1.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: result_1.data.message})
                        setTimeout(() => { window.location.reload()})
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: result_1.data.message})
                    }
                }).catch(error => {
                    reject(error)
                    console.log(`Error: ${error}`);
                })
            })
        })
    }
}
</script>