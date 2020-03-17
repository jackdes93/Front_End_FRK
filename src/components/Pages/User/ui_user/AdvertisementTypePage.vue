<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('adver_type_price')}}</p>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header" style="max-width: 100px">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 100px">
                        <p class="label text-color-second ">{{$t('name')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('description')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('user_page.pricing')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second">{{$t('option')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 148px;">
                        <p class="label text-color-second ">{{$t('action')}}</p>
                    </div>
                </div>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group row-group" v-if="advertisement_types.length == 0">
                    <span class="label text-center width-full">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation" style="align-items: center;" v-for="(item,index) in advertisement_types" :key="index">
                    <div class="block-item-row" style="max-width: 100px">
                        <p class="label-cell ">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 100px">
                        <p class="label-cell ">{{item.name}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{item.description}}</p>
                    </div>
                    <div class="block-item-row margin-fix-left" >
                        <p class="label-cell bold">{{parseInt(item.price).toLocaleString()}} <sup>đ</sup></p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell bold">{{export_list_option(item.option).toString()}}</p>
                    </div>
                   <div class="block-item-row margin-fix-left" style="justify-content: flex-start; align-items: flex-end; flex-direction: row; max-width: 148px;">
                        <a class="label-cell" v-on:click="handle_show_detail(item)">{{$t('see_more')}}</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_detail_type">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('detail_type')}} {{advertisement_type.name}}</p>
                </div>
                <div class="form-group col-group">
                    <div class="form-group col-group margin-bottom">
                        <span class="label-span">{{$t('name')}}</span>
                        <input type="text" class="border-bottom-ol" name="name" v-model="advertisement_type.name" readonly>
                    </div>
                    <div class="form-group col-group margin-bottom">  
                        <span class="label-span">{{$t('description')}}</span>
                        <input type="text" class="border-bottom-ol" name="description" v-model="advertisement_type.description" readonly>
                    </div>
                    <div class="form-group col-group margin-bottom">
                        <span class="label-span">{{$t('user_page.pricing')}}</span>
                        <input type="number" class="border-bottom-ol" name="price" v-if="is_edit" v-model="advertisement_type.price">
                        <p class="border-bottom-ol width-full padding-full" v-else>{{advertisement_type.price.toLocaleString()}} <sup>đ</sup></p>
                    </div>
                    <div class="form-group col-group margin-bottom">
                        <div class="form-group row-group margin-bottom">
                            <span class="label-span margin-bottom">{{$t('option')}}</span>
                            <span class="label-span margin-fix-left" v-on:click="handle_preview('')" v-if="advertisement_type.name == 'HOTLABEL'"><i class="far fa-eye" style="color:#000"></i></span>
                        </div>
                        <div class="form-group row-group" style="margin-left: 8px;justify-content: flex-start; align-items: center;">
                            <div class="form-group col-group" style="max-width: 48px;">
                                <span class="label-span margin-fix-right">{{$t('user_page.nodot')}}</span>
                            </div>
                            <div class="form-group col-group" style="max-width: 160px;">
                                <span class="label-span margin-fix-right">{{$t('page')}}</span>
                            </div>
                            <div class="form-group col-group" style="max-width: 160px;">
                                <span class="label-span margin-fix-right">{{$t('position')}}</span>
                            </div>
                            <div class="form-group col-group" style="max-width: 160px;">
                                <span class="label-span margin-fix-right">{{$t('price')}}</span>
                            </div>
                            <div class="form-group col-group" style="max-width: 160px;">
                                <span class="label-span margin-fix-right">{{$t('action')}}</span>
                            </div>
                        </div>
                        <div class="form-group col-group" style="max-height: 200px; overflow: scroll; padding-top: 16px;">
                            <div class="form-group row-group" style="justify-content: flex-start; align-items: flex-start;" v-for="(item, index) in options" :key="index">
                                <div class="form-group col-group" style="max-width: 48px;">
                                    <span class="label-span margin-fix-right">{{index + 1}}</span>
                                </div>
                                <div class="form-group col-group" style="max-width: 160px;">
                                    <span class="label-span margin-fix-right">{{item.page}}</span>
                                </div>
                                <div class="form-group col-group" style="max-width: 160px;">
                                    <span class="label-span margin-fix-right">{{item.position}}</span>
                                </div>
                                <div class="form-group col-group">
                                    <p class="label-span margin-fix-right">+{{item.bonus.toLocaleString()}} <sup>đ</sup> </p>
                                </div>
                                <div class="form-group col-group">
                                    <span class="label-span margin-fix-left" v-on:click="handle_preview(item)" ><i class="far fa-eye" style="color:#000"></i></span>
                                </div>
                                <div class="form-group col-group" style="max-widthL 160px;">
                                    <span class="label-span" v-if="is_edit" v-on:click="handle_update_price(item)"><i class="fas fa-edit black"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_preview">
                        <div class="block-alert padding-full" style="max-width: 840px;">
                            <div class="block-header bg-title-header padding-full header-fix width-full">
                                <p class="title-form">{{$t('preview_position')}}</p>
                            </div>
                            <div class="form-group col-group">
                                <img :src="`${image_preview}`" style="border-radius: 4px">
                            </div>
                            <div class="form-group row-group margin-bottom" style="margin-top: 16px; justify-content: center">
                                <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_preview = false">{{$t('cancel')}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row-group" style="justify-content: center;">
                    <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_detail_type = false; is_edit = false;">{{$t('cancel')}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP } from '../../../../http-common';

export default {
    data() {
        return {
            is_detail_type: false,
            is_preview: false,
            is_edit: false,
            image_preview: '',
            advertisement_types: [],
            advertisement_type : {},
            options: [],
            option: {}
        }
    },
    methods: {
        handle_get_advertisement_type() {
            HTTP.get('advertising-type').then(result => {
                this.advertisement_types = result.data.status == 200 ? result.data.data : []
            })
            .catch(error => {
                console.log(error);
            })
        },
        handle_show_detail(type) {
            this.is_detail_type = true;
            this.advertisement_type = type;
            this.options = type.option
        },
        export_list_option(array) {
            return array.map(item => item.position)
        },
        handle_preview(item) {
            this.is_preview = true
            this.image_preview = ''
            switch(this.advertisement_type.name) {
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
        }
    },
     created() {
        this.handle_get_advertisement_type()
     }
    
}
</script>