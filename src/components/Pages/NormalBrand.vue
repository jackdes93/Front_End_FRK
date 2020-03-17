<template>
    <div>
        <!-- NAV -->
        <block_nav v-if="!is_vip"></block_nav>
        <div class="container bg-vip-1 flex-box" id="bgvip" style="height: 1000px;" v-else>
            <transition-group name='fade' tag='div'>
                <div v-for="i in [index]" :key="i">
                    <img :src="`${list_image_vip[position]}`" :alt="`${brand.name}`" style="width:100%; height: 1000px; position: absolute; z-index:9; opacity: .5">
                </div>
            </transition-group> 
            <block_nav_vip style="z-index: 99"></block_nav_vip>
            <div class="block-brand-vip" style="z-index: 99">
                <div class="wrap-container flex-box" style="padding: 20px 5px; align-items: center;">
                    <div class="logo-vip">
                        <img :src="`http://franchiseking.vn/${brand.image_source.logo}`" v-bind:alt="brand.name" style="object-fit: contain; opacity: 100% !important;">
                    </div>
                    <div class="intro-vip">
                        <div class="form-group">
                            <div class="header-info-brand" style="background: transparent; flex: 1; padding: 0 16px;" >
                                <p class="title-brand text-uppercase" style="font-family: 'Cabin', sans-serif; font-size: 26px; display: flex; justify-content: flex-start; align-items: center; max-width: 380px;"> 
                                <span class="larger-text text-uppercase" style="font-family: 'Cabin',sans-serif;"> {{brand.name}} </span></p>
                                <span class="box-shadow wish margin-fix-right margin-fix-left" v-if="is_owner" :id="`${brand.id}`" v-on:click="handle_add_wish_list(brand)"> 
                                    <input class="toogle-heart" type="checkbox"  :checked="handle_check_wish_list(brand.id)" />
                                    <label class="label-toogle-heart" >❤</label>
                                </span>
                            </div>
                            
                            <span class="item-contact" style="flex: 1; display: flex; align-items: center; margin: 0;">
                                <i class="fas fa-money-check-alt" style="font-size: 1em; color: #FFF; padding: 2px 16px;">
                                    <span style="font-family: Cabin',sans-serif; padding:0 10px;">{{$t('brand_page.cost')}}:</span> 
                                </i>
                                <span class="price-text" style="font-size: 1.1em;"> {{Number(brand.offset_price).toLocaleString()}}<sup>đ</sup></span> 
                            </span>
                        </div>
                        <div class="form-group row-group padding-full">
                            <ul class="list">
                                <li class="padding-right">
                                    <i class="fas fa-crown padding-right-fix"></i>
                                    <router-link class="white" to="#BRANDINTRODUCE">{{$t('brand_page.intro')}}</router-link>
                                </li>
                                <li class="padding-right">
                                    <i class="fas fa-rocket padding-right-fix white"></i>
                                    <router-link class="white" to="#FRANCHISETERM">{{$t('brand_page.term')}}</router-link>
                                </li>
                                <li>
                                    <i class="fas fa-comments padding-right-fix white"></i>
                                    <a v-on:click="handle_scroll_to_top('ONLINEONQUIRY')" class="white">{{$t('brand_page.quiry')}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="label-circle-vip" v-if="is_hot_label">
                        <i class="fas fa-fire-alt" style="font-size: 30px;"></i>
                        <span class="text-uppercase" style="font-size: 25px; font-weight: bold;">Hot</span>
                    </div>
                </div>
            </div>
            <div class="block-slider-vip" style="z-index: 99">
                <span class="circle-prev" v-on:click="handle_click_action('PREV')"><i class="fas fa-arrow-circle-left white" style="font-size: 2.4rem"></i></span>
                <div class="block-info-vip">
                    <h1 class="title-brand-vip text-uppercase">{{brand.name}}</h1>
                    <div class="btn btn-see-more margin-top">
                        <span class="text-uppercase padding-right-fix white" v-on:click="handle_scroll()">{{$t('see_more')}}</span>
                        <i class="fas fa-chevron-down white"></i>
                    </div>
                    <div class="vip-image" id="vip_image">
                        <span class="rectangle" v-bind:class="{'selected' : position == 0}"></span>
                        <span class="rectangle" v-bind:class="{'selected' : position == 1}"></span>
                        <span class="rectangle" v-bind:class="{'selected' : position == 2}"></span>
                    </div>
                </div>
                <span class="circle-next" v-on:click="handle_click_action('NEXT')"><i class="fas fa-arrow-circle-right white" style="font-size: 2.4rem"></i></span>
            </div>
        </div>
        <div class="block-consult" v-if="is_vip">
            <div class="wrap-container" style="padding: 0;">
                <h2 class="label-consult text-uppercase">{{brand.slogan ? brand.slogan : 'need to consult with us ?'}}</h2>
            </div>
        </div>
        <div class="wrap-container flex-box flex-row-center" style="padding:120px 10px !important; min-height: 460px;" v-if="is_vip">
            <div class="block-intro-vip">
                <span class="label-vip text-uppercase" style="color: #000; font-weight: bold;">{{$t('welcome_to')}}{{brand.name}}</span>
                <p class="text-description-brand margin-top width-full">{{brand.introduce}}</p>
                <p class="title-header text-uppercase" style="padding-right: 15px; margin: 32px 0;">{{$t('joining_demand_request')}}</p>
                <ul class="list-item" v-if="joining_demands.length > 0">
                    <li class="joining-vip" v-for="(item, index) in joining_demands" :key="index">
                        <span style="margin-right:32px;" ><i class="fas fa-bolt text-color-primarry" style="margin-right: 5px;"></i>{{handle_translate_sex(item.sex)}} - {{item.first_name}} | {{$t('ask')}}: {{handle_translate(item.category)}} | {{$t('brand_info.budget')}}: {{handle_return_string_money(item.budget.from.toString())}} {{$t('million')}} -> {{handle_return_string_money(item.budget.to.toString())}} {{$t('million')}}</span>
                        <span>{{handle_return_date_string(item.created_on)}}  </span>
                    </li>
                </ul>
                <div class="list-item" v-else style="justify-content: center; display:flex;">
                    <p class="text-description">{{$t('nodata')}}</p>
                </div>
            </div>
            <div class="block-contact-vip">
                <div class="block-sub-div">
                    <div class="logo-brand-vip">
                        <img :src="`http://franchiseking.vn//${brand.image_source.logo}`" v-bind:alt="brand.name" style="object-fit: contain">
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group row-group" style="align-items: center; height: 360px;" v-if="is_vip">
            <span class="circle-next" style="position: absolute; left: 16px; z-index: 999;" v-on:click="handle_click_slide_menu('PREV')"><i class="fas fa-arrow-circle-left black" style="font-size: 2.4rem"></i></span>
            <slick ref="slick" :options="slickOptions" v-if="is_vip" style="overflow: hidden; width: inherit">
                <div class="form-group row-group" v-for="(pic, index) in brand.image_source.menu" :key="index" style="height: 100%" > 
                    <img class="menu-item" :src="`http://franchiseking.vn/${pic}`" :alt="`${pic}`"  v-on:click="handle_show_full_pic(pic)" style="height: 100%; border-radius: 0;">
                </div>
            </slick>
            <span class="circle-next" style="position: absolute; right: 16px; z-index: 999;" v-on:click="handle_click_slide_menu('NEXT')"><i class="fas fa-arrow-circle-right black" style="font-size: 2.4rem"></i></span>
        </div>
        
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="pic_selected">
            <div class="form-group col-group" style="align-items: flex-end; width: 800px;" v-on:click="pic_selected = null"><span class="label btn-close"><i class="far fa-times-circle text-color-primarry"></i></span></div>
            <div class="form-group row-group animation-tranform-scale" style="max-width: 800px; max-height: 800px; border-radius: 0;">
                <img :src="`http://franchiseking.vn/${pic_selected}`" :alt="`${pic_selected}`" style="border-radius: 0">
            </div>
        </div>
        <div class="block-joining-special" v-if="is_vip">
            <div class="block-title-vip">
                <span class="label-vip margin-bottom" style="color: #000; font-size: 1.2rem">- {{brand.name}} -</span>
                <span class="text-uppercase" style="text-align:center ;font-size: 2rem; font-weight: bold">{{$t('special_joining')}}</span>
            </div>
            <ul class="list-joining-special margin-top">
                <div v-for="(equiqment, index) in brand.feature" :key="index" style="display: flex; min-width: 30%; max-height: 100px; margin-bottom: 24px;">
                    <li class="option-vip "  :class="{'primary-color' : equiqment.value == true}">
                        <img v-bind:src="`http://franchiseking.vn/image/${list_icon[index]}`" :alt="`${list_icon[index]}`" style="margin:5px 15px;">
                        <span style="font-size: 14px; font-weight: bold; color: #FFF; letter-spacing: 1px;">{{handle_translate_feature(equiqment.content)}}</span>
                    </li>
                </div>
            </ul>
        </div>
        <div class="block-video-vip" v-if="is_vip && brand.video_intro != 'No Info'">
           <iframe :src="`${brand.video_intro}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div class="wrap-container img-brand-header" v-if="!is_vip">
            <div class="logo-brand-normal">
                <img :src="`${brand.image_source.logo}`" v-bind:alt="brand.name" style="object-fit: contain">
                <div class="label-circle-mobile" v-if="is_hot_label">
                    <i class="fas fa-fire-alt" ></i>
                    <span class="text-uppercase label-text-hot-label">Hot</span>
                </div>
            </div>
            <div class="img-brand">
                <img :src="`http://franchiseking.vn/${brand.image_source.thumbnail}`" :alt="brand.name">
                <div class="label-circle" v-if="is_hot_label">
                    <i class="fas fa-fire-alt" style="font-size: 28px; margin-right: 0"></i>
                    <span class="text-uppercase" style="font-size: 25px; font-weight: bold;">Hot</span>
                </div>
            </div>
        </div>
       
        <!-- INFO BRAND -->
        <div class="wrap-container block-info-brand">
            <div class="info-brand" v-if="!is_vip">
                <div class="header-info-brand">
                    <p class="title-brand text-uppercase label-title-brand" > 
                    <span class="larger-text text-uppercase" style="font-family: Cabin',sans-serif; font-weight: bold;"> {{brand.name}} </span></p>
                </div>
                <div class="content-info-brand">
                    <div class="form-group row-group">
                        <p class="text-description-brand">{{brand.introduce}}</p>
                        <span class="box-shadow wish margin-fix-right" v-if="is_owner" :id="`${brand.id}`" v-on:click="handle_add_wish_list(brand)"> 
                            <input class="toogle-heart" type="checkbox"  :checked="handle_check_wish_list(brand.id)" />
                            <label class="label-toogle-heart" >❤</label>
                        </span>
                    </div>
                    <div class="contact-brand">
                        <div class="content-contact">
                            <span class="item-contact">
                                <i class="fas fa-money-check-alt size-icon">
                                    <span style="font-family: Cabin',sans-serif; padding:0 10px; font-size: 1rem">{{$t('brand_page.cost')}}:</span> 
                                </i>
                                <span class="price-text size-icon" v-if="brand.price == 0">{{$t('contact_us')}}</span> 
                                <span class="price-text size-icon" v-if="brand.price != 0"> {{Number(brand.price).toLocaleString()}}<sup>đ</sup></span> 
                            </span>
                            <span class="item-contact">
                                <i class="fas fa-map-marked-alt size-icon black">
                                <span class="size-icon black"> {{$t('head_office')}}: </span> {{brand.head_office}}</i>
                            </span>
                        </div>
                        <div class="qrcode">
                            <img :src="`http://franchiseking.vn/${brand.image_source.image_qr_code}`" alt="QR Code Brand">
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!is_vip" class="nav-section">
                <ul class="list">
                    <li v-if="events" class="item-link-short">
                        <router-link to="#LASTEVENTS" class="text-uppercase">{{$t('last_event')}}</router-link>
                    </li>
                    <li v-if="brand.feature" class="item-link-short">
                        <router-link to="#OURSPECIFICATIONS" class="text-uppercase">{{$t('special_our')}}</router-link>
                    </li>
                    <li class="item-link-short">
                        <router-link to="#BRANDINTRODUCE" class="text-uppercase">{{$t('brand_page.intro')}}</router-link>
                    </li>
                    <li class="item-link-short">
                        <router-link to="#FRANCHISETERM" class="text-uppercase">{{$t('brand_page.term')}}</router-link>
                    </li>
                    <li id="btn-inquiry-bar" class="item-link-short">
                        <a  class="text-uppercase" v-on:click="handle_scroll_to_top_non_vip('ONLINEONQUIRY', 'btn-inquiry-bar')">{{$t('brand_page.quiry')}}</a>
                    </li>
                </ul>
            </div>
            <div class="intro-brand">
                <div class="col-group flex-3 block-content-short ">
                    <div id="OURSPECIFICATIONS" v-if="events.length > 0">
                        <div class="block-header">
                            <i class="fas fa-newspaper"></i>
                            <p class="text-uppercase size-icon">{{$t('last_event')}}</p>
                        </div>
                        <ul class="list">
                            <li class="item-newspaper" v-for="(event, index) in events" :key="index">
                                <span class="title-newspaper current"><i class="far fa-bell" style="padding-right: 10px;"></i> {{event.name}} </span>
                                <span style="font-family: 'Quicksand', sans-serif; font-size: 14px;"> {{handle_format_show_date(event.created_on)}}</span>
                            </li>   
                        </ul>
                    </div>
                    <div id="OPTIONJOINING" v-if="!is_vip">
                        <div class="block-header">
                            <i class="fas fa-star size-icon" style=" margin-left: 8px"></i>
                            <p class="text-uppercase size-icon" style="font-weight: 900">{{$t('special_joining')}}</p>
                        </div>
                        <ul class="list">
                           <li class="option" v-for="(equiqment, index) in brand.feature" :key="index">
                               <span v-bind:class="{ 'check' : equiqment.value == true}"><i class="far fa-check-circle " style="padding-right: 8px;"></i> {{handle_translate_feature(equiqment.content)}}</span>
                           </li>
                        </ul>
                    </div>
                    <div class="col-group flex-1 block-contact-mobile" v-if="!is_vip">
                        <div class="block-btn-contact">
                            <div class="block-call">
                                <ul class="list col-group" style="justify-content: flex-start; align-items: center;">
                                    <li class="btn btn-call" style="display: flex; width: 100%;">
                                        <a :href="`tel:0000000`" style="color: #FFF">
                                        {{$t('brand_info.call_support')}}
                                        <i class="fas fa-phone" style="padding: 0 10px; color: #FFF"></i>
                                        </a>
                                    </li>
                                    <li id="btn-inquiry" class="btn btn-inquiry" v-if="!is_vip">
                                        <a v-on:click="handle_scroll_to_top_non_vip('ONLINEONQUIRY', 'btn-inquiry')">{{$t('brand_page.quiry')}}</a>
                                        <i class="fas fa-comments" style="padding: 0 10px;"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-4" style="height: 300px; width: 100% !important;" >
                            <div class="list-joining header-block-product row-header">
                                <span class="circle"><i class="fas fa-bolt text-color-primarry"></i></span>
                                <p class="title-header" style="padding-right: 15px;">{{$t('last_joining')}}</p>
                            </div>
                            <div class="list-item" v-if="joining_demands.length > 0">
                                <div class="list-joining" v-for="(item, index) in joining_demands" :key="index" >
                                    <p class="text-overflow text-description">{{handle_translate_sex(item.sex)}} | {{$t('ask')}}: {{item.category}} | {{$t('brand_info.budget')}}: {{handle_return_string_money(item.budget.from.toString())}} {{$t('million')}} -> {{handle_return_string_money(item.budget.to.toString())}} {{$t('million')}}</p>
                                </div>
                            </div>
                            <div class="list-item" v-else style="justify-content: center; display:flex;">
                                <p class="text-description">{{$t('nodata')}}</p>
                            </div>
                        </div>
                    </div>
                    <div id="BRANDINTRODUCE" >
                       <div class="block-header bg-title-header ">
                            <i class="fas fa-crown size-icon" style="color: #FFF; margin-left: 8px"></i>
                            <p class="text-uppercase size-icon" style="font-weight: bold">{{$t('brand_page.intro')}}</p>
                        </div>
                        <ul class="list">
                            <div class="form-group col-group" v-for="(pic, index) in brand.image_source.image_intro" :key="index">
                                <img :src="`http://franchiseking.vn/${pic}`" :alt="`${brand.name}`">
                            </div>
                        </ul>
                    </div>
                    <div id="MENU" v-if="!is_vip">
                        <div class="block-header bg-title-header ">
                            <i class="fas fa-crown size-icon" style="color: #FFF; margin-left: 8px"></i>
                            <p class="text-uppercase size-icon" style="font-weight: bold;">Menu</p>
                        </div>
                        <ul class="list">
                            <div class="form-group col-group" v-for="(pic, index) in brand.image_source.menu" :key="index">
                                <img :src="`http://franchiseking.vn/${pic}`" :alt="`${brand.name}`">
                            </div>
                        </ul>
                        
                    </div>
                    <div id="FRANCHISETERM">
                        <div class="block-header bg-title-header ">
                            <i class="fas fa-crown size-icon" style="color: #FFF; margin-left: 8px"></i>
                            <p class="text-uppercase size-icon" style="font-weight: bold;">{{$t('brand_page.term')}}</p>
                        </div>
                        <ul class="list">
                            <div class="form-group col-group" v-for="(pic, index) in brand.image_source.main_banner" :key="index">
                                <img :src="`http://franchiseking.vn/${pic}`" :alt="`${brand.name}`">
                            </div>
                        </ul>
                    </div>
                    <div id="ONLINEONQUIRY">
                        <div class="block-header">
                            <i class="fas fa-comments size-icon" style=" margin-left: 8px"></i>
                            <p class="text-uppercase" style="font-weight: bold; font-size: .9rem;">{{$t('title_form_inquiry.title')}} </p>
                        </div>
                        <ValidationObserver v-slot="{ invalid }">
                            <form class="form-box block-box-quiry" @submit.prevent="handle_post_joining_request()">
                                <div class="form-content" style="padding: 0; height: auto;">
                                    <div class="form-group col-group">
                                        <div class="form-group row-block-quiry">
                                            <div class="form-group col-group col-1-3 padding-right">
                                                <span class="label text-uppercase padding-span margin-bottom">{{$t('form_joining.location')}}</span>
                                                <ValidationProvider name="location" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                    <input type="text" :placeholder="`${$t('filter.select_city')}`" v-model="new_joining_request.location" readonly v-on:click="handle_toogle($event)" style="min-width: 260px;">
                                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                            <div class="form-group col-group" v-if="city_show" style="max-height: 280px; position: absolute; top: 80px; left: 30px;">
                                                <ul class="list-city" >
                                                    <li class="item-city" v-for="(city,i) in list_city" :key="i" v-on:click="handle_select_city(i)">
                                                        <p>{{city.name}}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <div class="form-group col-group col-1-3" style="align-items: normal">
                                                <span class="label text-uppercase padding-span">{{$t('form_joining.store_front')}}</span>
                                                <div class="form-group row-group-radio-btn">
                                                    <div class="form-group radio-btn">
                                                        <input type="radio" name="check" :value='true' v-model="new_joining_request.store_found" style="width: 30px; margin-right: 5px;">
                                                        <p class="label-option">{{$t('form_joining.found')}}</p>
                                                    </div>
                                                    <div class="form-group radio-btn row-group">
                                                        <input type="radio" name="check" :value='false' v-model="new_joining_request.store_found" style="width: 30px; margin-right: 5px;">
                                                        <p class="label-option">{{$t('form_joining.still')}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-group col-1-3 padding-left">
                                                <span class="label text-uppercase padding-span">{{$t('form_joining.time_open')}}</span>
                                                <datepicker class="date_picker" :format="format" v-model="new_joining_request.open_time"></datepicker>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-group col-2-3">
                                        <span class="label text-uppercase padding-span">{{$t('form_joining.your_budget')}}</span>
                                        <div class="form-group row-group row-block-quiry" >
                                            <div class="form-group col-group" style="margin-right: 30px;">
                                                <span class="label margin-bottom" style="padding-left: 20px">{{$t('joining_page.budget_from')}}</span>
                                                <vue-numeric  separator="," v-model="new_joining_request.budget.from" :aria-placeholder="`${$t('joining_page.budget_from')}`"></vue-numeric>
                                            </div>
                                            <div class="form-group col-group">
                                                <span class="label margin-bottom" style="padding-left: 20px">{{$t('joining_page.budget_to')}}</span>
                                                <vue-numeric  separator="," v-model="new_joining_request.budget.to" aria-placeholder="Budget To"></vue-numeric>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-group" style="padding-top: 15px;">
                                        <span class="label text-uppercase padding-span">{{$t('form_joining.contact_info')}}</span>
                                        <div class="form-group col-group block-sex">
                                            <div class="form-group row-group-radio-btn">
                                                <div class="form-group radio-btn">
                                                    <input type="radio" name="sex" value="Mr" v-model="new_joining_request.sex" style="width: 30px; margin-right: 8px;">
                                                    <p class="label-option "> {{$t('mr')}}</p>
                                                </div>
                                                <div class="form-group radio-btn row-group">
                                                    <input type="radio" name="sex" value="Mrs" v-model="new_joining_request.sex" style="width: 30px; margin-right: 8px;">
                                                    <p class="label-option ">{{$t('mrs')}}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row-block-quiry" >
                                            <div class="form-group col-group col-2-3">
                                                <div class="form-group row-group row-block-quiry" style="margin-bottom: 10px;">
                                                    <div class="form-group col-group padding-right">
                                                        <ValidationProvider name="first_name" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                            <input type="text" :placeholder="`${$t('form_joining.first_name')} (*)`" name="first_name" v-model="new_joining_request.first_name" >
                                                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                        </ValidationProvider>
                                                    </div>
                                                    <div class="form-group col-group">
                                                        <ValidationProvider name="last_name" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                            <input type="text" :placeholder="`${$t('form_joining.last_name')} (*)`" name="last_name" v-model="new_joining_request.last_name" >
                                                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                        </ValidationProvider>
                                                    </div>
                                                </div>
                                                <div class="form-group col-group" style="margin-bottom: 10px;">
                                                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" style="width: 100%;">
                                                        <input type="text" name="email" :placeholder="`${$t('form_joining.your_email')} (*)`" v-model="new_joining_request.email">
                                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                    </ValidationProvider>  
                                                </div>
                                                <div class="form-group col-group">
                                                    <span class="label text-uppercase padding-span" style="font-size: 14px; margin-bottom: 8px;">{{$t('messages')}}</span>
                                                    <ValidationProvider name="message" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                        <textarea name="message" v-model="new_joining_request.message" cols="30" rows="10" style="padding: 10px; max-height: 156px" :placeholder="`${$t('form_joining.leave_message')}`"></textarea>
                                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                            <div class="form-group col-group col-1-3">
                                                <ValidationProvider name="phone_number" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                    <input type="text" name="phone_number" :placeholder="`${$t('form_joining.phone_number')}`" v-model="new_joining_request.phone_number" style="margin-bottom : 10px;">
                                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                </ValidationProvider>
                                                <ValidationProvider name="zalo" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                    <input type="text" name="zalo" placeholder="Zalo" v-model="new_joining_request.zalo" style="margin: 16px 0;" >
                                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                </ValidationProvider>
                                                <div class="form-group col-group">
                                                    <span class="label text-uppercase" style="font-size: 14px; margin-bottom: 8px;">{{$t('form_joining.time_free')}}</span>
                                                    <select class="block_selected" v-model="new_joining_request.time_contact">
                                                        <option value="0">{{$t('form_joining.mo')}}</option>
                                                        <option value="1">{{$t('form_joining.af')}}</option>
                                                        <option value="2">{{$t('form_joining.eve')}}</option>
                                                    </select>
                                                </div>
                                                <button type="submit" class="btn btn-submit-joining btn-submit-joining-mobile" :disabled="invalid" style="min-width: 140px !important;">{{$t('form_joining.submit_demand')}}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </ValidationObserver>
                    </div>
                </div>
                <div class="col-group flex-1 block-contact-desktop"  v-if="!is_vip">
                    <div class="block-btn-contact">
                        <div class="block-call">
                            <ul class="list col-group" style="justify-content: flex-start; ">
                                <li class="btn btn-call">
                                    <a :href="`tel:0000000`" style="color: #FFF">
                                    {{$t('brand_info.call_support')}}
                                    <i class="fas fa-phone" style="padding: 0 10px; color: #FFF"></i>
                                    </a>
                                </li>
                                <li id="btn-inquiry" class="btn btn-inquiry" v-if="!is_vip">
                                    <a v-on:click="handle_scroll_to_top_non_vip('ONLINEONQUIRY', 'btn-inquiry')" style="font-size: .975rem">{{$t('brand_page.quiry')}}</a>
                                    <i class="fas fa-comments" style="padding: 0 4px;"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-4" style="height: 300px; width: 100% !important;" >
                        <div class="list-joining header-block-product row-header">
                            <span class="circle"><i class="fas fa-bolt text-color-primarry"></i></span>
                            <p class="title-header" style="padding-right: 10px; font-size: .975rem">{{$t('last_joining')}}</p>
                        </div>
                        <div class="list-item" v-if="joining_demands.length > 0">
                            <div class="list-joining" v-for="(item, index) in joining_demands" :key="index" >
                                <p class="text-overflow text-description">{{handle_translate_sex(item.sex)}} - {{item.last_name}}  | {{$t('brand_info.budget')}}: {{handle_return_string_money(item.budget.from.toString())}} {{$t('million')}} -> {{handle_return_string_money(item.budget.to.toString())}} {{$t('million')}}</p>
                            </div>
                        </div>
                        <div class="list-item" v-else style="justify-content: center; display:flex;">
                            <p class="text-description">{{$t('nodata')}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_login">
            <div class="block-alert animation-tranform-scale" style="padding: 8px; background: transparent; box-shadow: none;">
                <div class="form-group col-group" style="align-items: flex-end; width: 430px;" v-on:click="handle_close_box_login()"><span class="label btn-close"><i class="far fa-times-circle text-color-primarry"></i></span></div>
                <ValidationObserver v-slot="{ invalid }">
                    <form class="form-login" style="background: #FFF" @submit.prevent="handle_login()">
                        <div class="form-header">
                            <p class="title-form">{{$t('form_login.login')}}</p>
                        </div>
                        <div class="form-content" style="height: auto; flex: 1; padding: 0;  margin-top: 20px;">
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group">
                                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" style="width: 100%;">
                                        <input type="text" name="email_user" placeholder="Email" v-model="email_user">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group ">
                                    <ValidationProvider name="password" rules="required|min:9" v-slot="{ errors }" style="width: 100%;">
                                        <input type="password" :placeholder="`${$t('form_login.password')}`" name="password" v-model="password">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <vue-recaptcha id="capcah" sitekey="6LeeM74UAAAAAJ71ru17H2h-hReSNO_07eNNm7Is" :loadRecaptchaScript="true" @verify="handle_verify" @expired="handle_expired" ref="recaptcha" ></vue-recaptcha >
                            <div class="form-group col-group margin-bottom" style="align-items: center;">
                                <div class="form-group margin-bottom" >
                                    <button class="btn btn-login bg-title-header" :disabled="invalid" style="width: 100%; border: none;">{{$t('form_login.login')}}</button>
                                </div>
                                <div class="form-group margin-bottom">
                                    <router-link to="/signup" class="btn btn-sign-up">{{$t('form_login.sign_up')}}</router-link>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
        <block_footer></block_footer>
        <block_alert></block_alert>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 3s ease; overflow: hidden; visibility: visible; position: absolute; width:100%; opacity: 1;}
.fade-enter, .fade-leave-to { visibility: hidden; width: 100%; opacity: 0;}
.bg-vip-1 {display: flex; flex-direction: column; background-position: center; background-size: cover; width: 100%; background-color: black;}
.bg-vip-1 img { opacity: 0.5; border-radius: 0px;}
.block-consult {display: flex; justify-content: flex-start; align-items: center; width: 100%; height: 160px; background-color: black; background: url('../../assets/image/consult_bg.png') no-repeat; background-size: cover; }
.slide-left-animation { animation: slide-left 1s both;}

@keyframes slide-left {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
  }
}

</style>

<script>
import block_footer from '../Units/Block_Footer';
import block_nav from '../Units/BlockNav';
import block_nav_vip from '../Units/Block_Nav_Vip';
import { Promise } from 'q';
import { HTTP } from '../../http-common';
import { router } from '../../routers';
import datepicker from 'vuejs-datepicker';
import { socket_bus} from '../../main'
import block_alert from '../Units/Block_Alert';
import VueRecaptcha from 'vue-recaptcha'
import Slick from 'vue-slick';
import 'hooper/dist/hooper.css';

export default {
    components: {
        block_alert, block_footer, block_nav,datepicker, block_nav_vip, VueRecaptcha, Slick
    },
    data() {
        return {
            pic_selected: '',
            format: 'dd/MM/yyyy',
            id_brand: '',
            category: '',
            is_login: false,
            events: [],
            brand: { id: "", name: "", image_source: {logo: "", thumbnail: "", image_intro: "", main_banner: ""}, id_category: "", id_customer: "",introduce: "",
            location: [], phone_number: "", terms: [], website: "", priority: 0, price: 0, level : 1, email: "", feauture: "", event: []},
            joining_demands: [],
            new_joining_request: {id_brand: "", sex: "Mrs", first_name: "", last_name: "", email: "", location: "", budget:{from: 0, to: 0}, store_found: false, open_time: new Date(Date.now() + 7 * 60 * 60 * 1000), phone_number: "", zalo: "", time_contact: "0", message: ""},
            list_city:[],
            city_show: false,
            is_hot_label: false,
            city_choose: {_id: '', name: '-- Select City --'},
            customer: {},
            wish_list_current: [],
            is_wish_list: false,
            list_icon: [],
            list_image_vip: [],
            i:0,
            position: 0,
            is_owner: true,
            is_vip: false,
            index: 0,
            token_recaptcha: null,
            email_user: '',
            password: '',
            slickOptions: {
                slidesToShow: 5,
                infinite: false,
                accessibility: true,
                adaptiveHeight: false,
                arrows: false,
                draggable: true,
                edgeFriction: 0.30,
                swipe: true
            }
        }
    },
    methods: {
        handle_click_slide_menu(status) {
            switch(status) {
                case 'PREV':
                    this.$refs.slick.prev()
                    break;
                case 'NEXT':
                    this.$refs.slick.next()
                    break;
            }
        },
        reInit() {
            this.$refs.slick.reSlick()
        },
        handle_translate_sex(gender) {
            switch(gender) {
                case 'Mr':
                    return this.$t('mr')
                case 'Mrs':
                    return this.$t('mrs')
            }
        },
        handle_show_full_pic(pic) {
            this.pic_selected = pic
        },
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
        handle_close_box_login() {
            this.is_login = false
        },
        handle_verify: function(response) {
           this.token_recaptcha = response
        },
        handle_expired: function () {
            this.$refs.recaptcha.reset()
        },
        handle_auto_slider_show() {
            setInterval(() => {
                this.position = this.position < 2 ? this.position + 1 : 0
            }, 6000)
        },
        handle_scroll() {
            var startTime = null
            var duration = 800
            function animation(current_time) {
                if(startTime === null) startTime = current_time
                var timeElapsed = current_time - startTime
                var run = ease(timeElapsed, 0, 1000, duration)
                window.scrollTo(0, run);

                if(timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            function ease (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2 * t * t + b;
                t--;
                return -c/2 * ( t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation)
        },
        handle_check_wish_list(id_brand) {
            return this.wish_list_current.indexOf(id_brand) == -1 ? false : true
        },
        handle_click(action) {
            var list_brand_element = document.getElementById('list-menu')
            var count = document.querySelectorAll('#list-menu .menu-item').length
            var marginLeft = document.querySelectorAll('#list-menu div')[0].offsetWidth
            switch(action) {
                case 'NEXT':
                    this.i = (this.i == count - 1) ? 0 :  this.i + 1
                    break;
                case 'PREV':
                    this.i = ( this.i == 0) ? 0 :  this.i - 1
                    break;
            }
            setTimeout(() => {
                list_brand_element.style.marginLeft = "-" + (marginLeft *  this.i) + "px";
            }, 200)
        },
        handle_click_action(action) {
           
            switch(action) {
                case 'NEXT':
                    this.position = this.position < 2 ? this.position + 1 : 0
                    break;
                case 'PREV':
                    this.position = this.position > 0 ? this.position - 1 : 2
                    break;
            }
            document.getElementById('bgvip').style.backgroundImage = `url('${this.list_image_vip[this.position]}')`
        },
        handle_get_info_brand(id_brand, category) {
            return new Promise((resolve, reject) => {
                HTTP.get(`/brand-seo/${category}&${id_brand}`).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        this.brand =  result.data.data
                        this.events = this.brand.events
                        this.handle_get_joining_demands()
                        this.is_hot_label = this.brand.hotlabel
                        this.is_vip = this.brand.level == 'NORMAL' ? false : true
                        this.list_image_vip = this.brand['image_source'].bg_vip
                    } else {
                        this.$router.push('/')
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_return_date_string(date) {
            const date_t = new Date(date).getUTCDate() > 10 ? new Date(date).getUTCDate() : `0${new Date(date).getUTCDate()}`
            const month = new Date(date).getUTCMonth() + 1 > 10 ? new Date(date).getUTCMonth() + 1 : `0${new Date(date).getUTCMonth() + 1}`
            
            return `${date_t}/${month}/${new Date(date).getUTCFullYear()}`
        },
        handle_add_wish_list(brand) {
            var brand_wish = document.getElementById(brand.id)
            var element_first = brand_wish.children[0]
            if(localStorage.getItem('access_token')) {
                if(element_first.checked) {
                    HTTP.patch(`/wish/remove-user/brand=${brand.id}&customer=${this.customer.id}`).then(result => {
                        alert(result.data.message)
                        if(result.data.status == 200) {
                            window.location.reload()
                            element_first.checked = false
                            brand_wish.children[1].style.color = '#F3A8B7'
                        }                       
                    }).catch(error => {
                        console.log('Error: ' + error);
                    })
                } else if(!element_first.checked){
                    HTTP.patch('/wish/' + brand.id, {id_customer: this.customer.id}).then(result => {
                        setTimeout(() => { alert(result.data.message)}, 100)
                        if(result.data.status == 200) {
                            window.location.reload()
                            element_first.checked = true
                            this.brand = brand
                        }
                    })
                    .catch(error => {
                        console.log('Error: ' + error);
                    })
                }
            } else {
                router.push('/login')
            }
        },
        handle_get_joining_demands() {
            return new Promise((resolve, reject) => {
                HTTP.get(`joining-request/brand/${this.brand.id}`).then(result => {
                    resolve(result)
                    this.joining_demands = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        },
        handle_select_city(i) {
            this.city_choose = this.list_city[i]
            this.city_show = false;
            this.new_joining_request.location = this.new_joining_request.location.length == 0 ? this.new_joining_request.location += this.city_choose.name : this.new_joining_request.location += ', ' + this.city_choose.name
        },
        changeHandler() {
            this.new_joining_request.time_contact = this.timer_call.HH + ':' + this.timer_call.mm
        },
        handle_return_string_money(text) {
            const length = text.length
           if(length > 6) {
               return text.substr(0, text.length - 6) 
           } else if(length == 6) {
               return '0.' + text.substr(0, 1)
           }
        },
        handle_toogle($event) {
            this.city_show = !this.city_show
            $event.stopPropagation();
        },
        handle_login() {
            if(this.token_recaptcha != null) {
                    const info_login = {email: this.email_user, password: this.password}
                    this.$store.dispatch('handle_sign_in', info_login).then(result => {
                        if(result.data.status == 200) {
                            socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_success'), is_redirect: true, brand: {name: this.$t('success')}})
                        } else if(result.data.status == 403) {
                            socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_not_active'), is_redirect: false, brand: {name: this.$t('fail')}})
                        } else if(result.data.status == 503) {
                            socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_lock'), is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                        } else if(result.data.status == 401) {
                            socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_error'), is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                        } else {
                            socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_error'), is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                        }
                    })
            } else {
                socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('auth_capcha'), is_redirect: false,})
            }   
        },
        handle_post_joining_request() {
            if(JSON.parse(localStorage.getItem('customer'))) {
                this.customer = JSON.parse(localStorage.getItem('customer'))
                this.new_joining_request.id_customer = this.customer.id
                this.new_joining_request.id_brand = this.brand.id
                return new Promise((resolve, reject) => {
                    HTTP.post('/joining-request', this.new_joining_request).then(result => {
                        resolve(result)
                        if(result.data.status == 201) {
                            socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.request_success'), is_redirect: false})
                            setTimeout(() => { window.location.reload()}, 3000)
                        } else {
                            socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.request_fail'), is_redirect: false})
                        }
                    }).catch(error => {
                        reject(error)
                        console.log(error)
                    })
                })
            } else {
                this.is_login = true
            }
        },
        handle_scroll_to_top(item) {
            var online_inquery = document.getElementById(item);
            var startTime = null;
            var duration = 1000
            var start_position = parseFloat(window.pageYOffset);
            var target_position = parseFloat(online_inquery.offsetTop); 
            var distance = (target_position - 10)
            function animation(current_time) {
                if(startTime === null) startTime = current_time
                var timeElapsed = current_time - startTime
                var run = ease(timeElapsed, start_position, distance, duration)
                window.scrollTo(0, run);

                if(timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            function ease (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2 * t * t + b;
                t--;
                return -c/2 * ( t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation)
        },
        handle_scroll_to_top_non_vip(item, button) {
            const online_inquery = document.getElementById(item);
            const btn_click = document.getElementById(button);
             var startTime = null;
            var duration = 1000
            const start_position =  parseFloat(btn_click.offsetTop);
            const target_position = parseFloat(online_inquery.offsetTop);
            const distance = (target_position - start_position - 100)
            function animation(current_time) {
                if(startTime === null) startTime = current_time
                var timeElapsed = current_time - startTime
                var run = ease(timeElapsed, start_position, distance, duration)
                window.scrollTo(0, run);

                if(timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            function ease (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2 * t * t + b;
                t--;
                return -c/2 * ( t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation)
        },
        handle_get_wish_list(id_customer) {
            HTTP.get('/customers/' + id_customer).then(result => {
                localStorage.removeItem('customer')
                localStorage.setItem('customer', JSON.stringify(result.data))
                this.customer = result.data
                this.wish_list_current = result.data.wish_list
                this.wish_list_current.map(item => { this.is_wish_list = item == this.id_brand ? true : false })  
            }).catch(error => {
                console.log(error)
            }) 
        },
        handle_format_show_date(date) {
            const value_date = new Date(date)
            return `${value_date.getDate() < 10 ? `0${value_date.getDate()}` :value_date.getDate()}/${value_date.getMonth() + 1}/${value_date.getFullYear()}`
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('click', () => {
                if(this.city_show) {
                    this.city_show = false
                }
            })
        })

        this.handle_auto_slider_show()

        if(window.screen.width > 320 && window.screen.width < 960) {
            this.slickOptions.slidesToShow = 1
        } else if(window.screen.width > 960 && window.screen.width < 1200) {
            this.slickOptions.slidesToShow = 3
        } else {
            this.slickOptions.slidesToShow = 5
        }
    },  
    created() {
        this.id_brand = this.$route.params.id
        this.category = this.$route.params.category
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
            this.handle_get_wish_list(this.customer.id)
        }
        this.handle_get_info_brand(this.$route.params.id, this.$route.params.category)
        
        this.$store.dispatch('get_cities').then(result => {
            this.list_city = result.data
        })
        this.list_icon = ['Equipments.png','Need-Crowd.png', 'Low-Risk.png', 'Free-Franchise-Fee.png', 'Have-Decorated.png', 'Free-Signing.png', 'Exemption.png', 'Education.png', 'Free-Margin.png']
    }
}

</script>