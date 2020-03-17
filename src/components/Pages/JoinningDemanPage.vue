<template>
    <div>
        <block_nav></block_nav>
        <div class="wrap-container">
            <div class="banner joining-banner">
                <img src="/image/ally_buy.jpg" alt="">
            </div>
            <div class="block-joinning-demand">
                <div class="block-form post-joinning-demand">
                    <ValidationObserver v-slot="{ invalid }">
                        <form class="form-box" @submit.prevent="handle_post_request()">
                            <div class="form-header bg-title-header">
                                <span class="flex-row-center" style="display: flex; justify-content: flex-start; width: 100%">
                                    <i class="fas fa-bolt icon-joining-demand"></i>
                                    <h6 class="text-uppercase title-form">{{$t('form_joining.title_joining_demand')}}</h6>
                                </span>
                            </div>
                            <div class="form-content">
                                <div class="form-group col-group">
                                    <div class="form-group margin-10 col-group-mobile" style="position: relative">
                                        <div class="form-group col-group padding-right col-1-3" style="justify-content: flex-start">
                                            <span class="label text-uppercase padding-span margin-bottom">{{$t('form_joining.category')}}</span>
                                            <ValidationProvider name="name_category" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                <input type="text" :placeholder="`${$t('filter.choose_category')}`" v-model="new_joining_post.category" readonly v-on:click="handle_toogle_category($event)">
                                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                            </ValidationProvider>
                                            
                                        </div>
                                        <div class="form-group col-group" v-if="category_show" style="max-height: 280px; position: absolute; top: 80px; left: 30px;">
                                            <ul class="list-city" >
                                                <li class="item-city" v-for="(category,i) in list_category" :key="i" v-on:click="handle_select_category(i)">
                                                    <p>{{handle_translate(category.name)}}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="form-group col-group col-2-3">
                                            <span class="label text-uppercase padding-span margin-bottom">{{$t('form_joining.your_budget')}}</span>
                                            <div class="form-group row-group col-group-mobile" >
                                                <div class="form-group col-group" style="margin-right: 30px;">
                                                    <vue-numeric  separator="," v-model="new_joining_post.budget.from"></vue-numeric>
                                                </div>
                                                <div class="form-group col-group">
                                                    <vue-numeric  separator="," v-model="new_joining_post.budget.to"></vue-numeric>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-group-mobile" style="position: relative">
                                        <div class="form-group col-group padding-right" style="justify-content: flex-start">
                                            <ValidationProvider name="location" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                <span class="label text-uppercase padding-span margin-bottom">{{$t('form_joining.location')}}</span>
                                                <input type="text" :placeholder="`${$t('filter.select_city')}`" v-model="new_joining_post.location" readonly v-on:click="handle_toogle($event)" style="min-width: 260px;">
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
                                        <div class="form-group col-group" style="align-items: normal">
                                            <span class="label text-uppercase padding-span margin-bottom">{{$t('form_joining.store_front')}}</span>
                                            <div class="form-group row-group-radio-btn">
                                                <div class="form-group radio-btn">
                                                    <input type="radio" name="check" :value="true" v-model="new_joining_post.store_front" style="width: 40px;">
                                                    <p class="label-option">{{$t('form_joining.found')}}</p>
                                                </div>
                                                <div class="form-group radio-btn row-group">
                                                    <input type="radio" name="check" :value="false" v-model="new_joining_post.store_front" style="width: 40px;">
                                                    <p class="label-option">{{$t('form_joining.still')}}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-group padding-left" style="justify-content: flex-start">
                                            <span class="label text-uppercase padding-span margin-bottom">{{$t('form_joining.time_open')}}</span>
                                            <datepicker  class="date_picker" :disabled-dates="disable_date" :format="format" v-model="new_joining_post.time_open"></datepicker>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-group" style="padding-top: 15px;">
                                    <span class="label text-uppercase padding-span">{{$t('form_joining.contact_info')}}</span>
                                    <div class="form-group col-group" style="align-items: flex-start; justify-content: flex-start; max-width: 200px; padding-left: 16px;">
                                        <div class="form-group row-group-radio-btn">
                                            <div class="form-group radio-btn">
                                                <input type="radio" name="gender" value="Mr" v-model="new_joining_post.sex" style="width: 40px; margin-right: 5px;">
                                                <p class="label-option "> {{$t('mr')}}</p>
                                            </div>
                                            <div class="form-group radio-btn row-group">
                                                <input type="radio" name="gender" value="Mrs" v-model="new_joining_post.sex" style="width: 40px; margin-right: 5px;">
                                                <p class="label-option ">{{$t('mrs')}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-group-mobile" >
                                        <div class="form-group col-group col-2-3" style="padding-right: 15px;">
                                            <div class="form-group row-group col-group-mobile" style="margin-bottom: 10px;">
                                                <div class="form-group col-group padding-right">
                                                    <div class="form-group col-group margin-bottom">
                                                        <ValidationProvider name="first_name" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                            <input type="text" :placeholder="`${$t('form_joining.first_name')} (*)`" name="first_name" v-model="new_joining_post.first_name">
                                                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                        </ValidationProvider>
                                                    </div>
                                                    <div class="form-group col-group ">
                                                        <ValidationProvider name="last_name" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                            <input type="text" :placeholder="`${$t('form_joining.last_name')} (*)`" name="last_name" v-model="new_joining_post.last_name">
                                                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                        </ValidationProvider>
                                                    </div>
                                                </div>
                                                <div class="form-group col-group">
                                                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" style="width: 100%;">
                                                        <input type="text" name="email" :placeholder="`${$t('form_joining.your_email')} (*)`" v-model="new_joining_post.email">
                                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                            <div class="form-group col-group">
                                                <span class="label text-uppercase padding-span" style="font-size: 14px; margin-bottom: 8px;">{{$t('form_joining.leave_message')}}</span>
                                                <ValidationProvider name="message" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                    <textarea name="message" v-model="new_joining_post.message" cols="30" rows="10" style="padding: 10px;" :placeholder="`${$t('form_joining.leave_message')}`"></textarea>
                                                    <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                        <div class="form-group col-group col-1-3 padding-left">
                                            <ValidationProvider name="phone_number" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                <input type="text" name="phone_number" :placeholder="`${$t('form_joining.phone_number')} (*)`" v-model="new_joining_post.phone_number" style="margin-bottom : 10px;">
                                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                            </ValidationProvider>
                                            <ValidationProvider name="zalo" rules="required" v-slot="{ errors }" style="width: 100%;">
                                                <input type="text" name="zalo" :placeholder="`${$t('form_joining.zalo_number')}`" v-model="new_joining_post.zalo" style="margin: 10px 0;">
                                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                            </ValidationProvider>
                                            <div class="form-group col-group" style="justify-content: flex-start">
                                                <span class="label text-uppercase" style="font-size: 14px; margin-bottom: 8px;">{{$t('form_joining.time_free')}}</span>
                                                <select class="block_selected" v-model="new_joining_post.time_call">
                                                    <option value="0">{{$t('form_joining.mo')}}</option>
                                                    <option value="1">{{$t('form_joining.af')}}</option>
                                                    <option value="2">{{$t('form_joining.eve')}}</option>
                                                </select>
                                            </div>
                                            <button type="submit" class="btn-submit-joining"  style="min-width: 140px !important;" :disabled="invalid">{{$t('form_joining.submit_demand')}}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </ValidationObserver>
                    <div class="block-table">
                        <div class="form-header" style="align-items: center; justify-content: space-between; background: #171717;">
                            <span class="flex-row-center" style="display: flex; justify-content: space-between;">
                                <i class="fas fa-crown icon-mobile" style=" color: #FFF;"></i>
                                <h6 class="text-uppercase title-block-normal" style="color: #FFF;">{{$t('last_joining')}}</h6>
                            </span>
                        </div>
                      
                        <div class="tab-table">
                            <ul class="list">
                                <li class="item border-right" v-on:click="handle_choose_tab('ALL')">
                                    <p class="text-uppercase title-tab-table" :class="{ 'show': current_tab == 'ALL' }">{{$t('joining_page.tab_1')}}</p>
                                </li>
                                <li class="item border-right" v-on:click="handle_choose_tab('DOMESTIC')">
                                    <p class="text-uppercase title-tab-table" :class="{ 'show': current_tab == 'DOMESTIC' }">{{$t('joining_page.tab_2')}}</p>
                                </li>
                                <li class="item margin-fix-left" v-on:click="handle_choose_tab('OVERSEA')">
                                    <p class="text-uppercase title-tab-table" :class="{ 'show': current_tab == 'OVERSEA' }">{{$t('joining_page.tab_3')}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="content-table">
                            <div class="form-group row-group flex-row-center" v-if="list_joining_demand.length == 0">
                                <span class="label-cell flex-row-center" style="width: 100%; display: flex;">{{$t('nodata')}}</span>
                            </div>
                            <ul class="list" v-else>
                                <li class="item-row" v-for="(item, index) in list_joining_demand" :key="index">
                                    <div class="form-group col-group block-row">
                                        <span class="label-cell-bold"><i class="fas fa-user-circle"></i> {{item.first_name}}</span>
                                        <span class="label-cell"><i class="fas fa-map-marked-alt"></i>{{item.location.toString()}}</span>
                                    </div>
                                    <div class="form-group col-group block-row">
                                        <span class="label-cell-bold"><i class="fas fa-phone-volume"></i>{{handle_replace_phone(item.phone_number, 0, 6)}}</span>
                                        <span class="label-cell"><i class="fas fa-store"></i>{{item.store_front == true ? $t('form_joining.found') : $t('form_joining.still')}}</span>
                                    </div>
                                    <div class="form-group block-row block-budget">
                                        <p class="text-uppercase joining-budget" >
                                            {{$t('joining_page.budget_from' )}} 
                                            <span class="text-color-budget"> <br>~ {{handle_return_string_money(item.budget.from.toString())}} {{$t('m')}} </span>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <div class="block-pagging">
                                <span class="btn-newer"  v-on:click="handle_get_joining('NEW')"> <i class="fas fa-chevron-left" style="font-size: 12px; padding: 0 5px;"></i> {{$t('newer')}}</span>
                                <span class="title-total-joining">{{$t('total')}} {{list_joining_demand.length}} {{$t('demands_sub')}}</span>
                                <span class="btn-older" v-on:click="handle_get_joining('OLD')" > {{$t('older')}}<i class="fas fa-chevron-right" style="font-size: 12px; padding: 0 5px;"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block-ads">
                    <div class="block-bottom">
                        <div class="block-header">
                           <span class="flex-row-center" style="display: flex; justify-content: flex-start;">
                               <i class="fas fa-crown" style="color: #333; margin-right: 10px;"></i>
                               <h6 class="text-uppercase title-form">{{$t('popular_category')}}</h6>
                            </span>
                        </div>
                        <div class="block-content">
                            <ul class="list-category">
                                <a href="#" v-on:click="handle_route(index)" v-for="(item, index) in category_popular" :key="index"  class="item-category">
                                    <img :src="`/image/${item}`" :alt="`${item}`" style="object-fit:cover; object-position: center;">
                                </a>
                            </ul>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_login">
            <div class="block-alert animation-tranform-scale" style="padding: 8px; background: transparent; box-shadow: none;">
                <div class="form-group col-group" style="align-items: flex-end; width: 430px;" v-on:click="is_login = false"><span class="label btn-close"><i class="far fa-times-circle text-color-primarry"></i></span></div>
                  <ValidationObserver v-slot="{ invalid }">
                    <form class="form-login" style="background: #FFF; padding: 8px;" @submit.prevent="handle_login">
                        <div class="form-header">
                            <p class="title-form">{{$t('form_login.login')}}</p>
                        </div>
                        <div class="form-content" style="height: auto; flex: 1; padding: 0;  margin-top: 20px;">
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group">
                                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" style="width: 100%;">
                                        <input type="text" name="email" placeholder="Email" v-model="email_user">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="form-group margin-bottom col-group">
                                <div class="form-group ">
                                    <ValidationProvider name="password" rules="required|min:9" v-slot="{ errors }" style="width: 100%;">
                                        <input type="password" name="password" v-model="password" :placeholder="`${$t('form_login.re_password')}`">
                                        <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <vue-recaptcha id="capcah" sitekey="6LeeM74UAAAAAJ71ru17H2h-hReSNO_07eNNm7Is" :loadRecaptchaScript="true" @verify="handle_verify" @expired="handle_expired" ref="recaptcha" style="margin: 8px 0;"></vue-recaptcha >
                            <div class="form-group col-group margin-bottom" style="align-items: center;">
                                <span class="flex-row-center " style="display: flex; width: 100%; justify-content: flex-start; margin-bottom: 24px;">
                                    <input type="checkbox" name="remember" v-model="remember" style="margin-right:10px; flex: 1;">
                                    <p style="font-family: 'Quicksand Light'; font-size: 12px; flex: 2">{{$t('form_login.remember')}}</p>
                                </span>
                                <span class="form-group row-group flex-row-center margin-bottom" style="justify-content: center">
                                    <router-link to="/forgot-password" style="display:flex;">{{$t('manager.forgot_pwd')}} ?</router-link>
                                </span>
                                <div class="form-group margin-bottom" >
                                    <button type="submit" class="btn btn-login bg-title-header" :disabled="invalid"  style="width: 100%; border: none;">{{$t('form_login.login')}}</button>
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
        <Block_Banner_Bottom></Block_Banner_Bottom>
        <block_footer></block_footer>
        <block_alert></block_alert>
    </div>
</template>

<script>
import block_nav from '../Units/BlockNav';
import block_alert from '../Units/Block_Notification';
import Block_Banner_Bottom from '../Units/Block_Banner_Bottom';
import block_footer from '../Units/Block_Footer';
import datepicker from 'vuejs-datepicker';
import { HTTP } from '../../http-common';
import { router } from '../../routers';
import { socket_bus } from '../../main';
import VueRecaptcha from 'vue-recaptcha'
import VueNumeric from 'vue-numeric'

export default {
    components : {
        block_nav, block_footer, Block_Banner_Bottom, datepicker, VueNumeric, VueRecaptcha,block_alert
    },
    data() {
        return {
            page: 1,
            format: 'dd/MM/yyyy',
            category_show : false,
            is_Input_Active: false,
            city_show: false,
            current_tab: 'ALL',
            is_login: false,
            list_joining_demand: [],
            list_category: [],
            category_choose: {_id: '', name: 'Choose Category'},
            list_city: [],
            city_choose: {_id: '', name: '-- Select City --'},
            new_joining_post : {
                category: '',
                budget: { from: 0, to: 0},
                location: [],
                store_front: false,
                time_open: new Date(Date.now() + 7 * 60 * 60 * 1000),
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                zalo: '',
                time_call: '0',
                id_customer: '',
                message: '',
                created_on: new Date(Date.now() + 7 * 60 * 60 * 1000)
            },
            disable_date : {
                to: new Date(),
                ranges: []
            },
            remember: false,
            token_recaptcha: null,
            email_user: '',
            password: '',
            image_banner:'',
            name_picture: '',
            category_popular: [],
            category_vn: ['BBQ-vi.jpg', 'Brunch-vi.jpg','Dessert-vi.jpg', 'Drink-vi.jpg', 'Foriegn-vi.jpg', 'Hotpot-vi.jpg', 'Vietnamese-vi.jpg'],
            category_en: ['BBQ-eng.jpg', 'Brunch-eng.jpg','Dessert-eng.jpg', 'Drink-eng.jpg', 'Foriegn-eng.jpg', 'Hotpot-eng.jpg', 'Vietnamese-eng.jpg']
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
        handle_route(index) {
            var route = ''
            switch(index) {
                case 0:
                    route = 'BBQ'
                    break;
                case 1:
                    route = 'Brunch'
                    break;
                case 2:
                    route = 'Dessert'
                    break;
                case 3:
                    route = 'Drink'
                    break;
                case 4:
                    route = 'Foriegn Foods'
                    break;
                case 5:
                    route = 'Hot Pot'
                    break;
                case 6:
                    route = 'Vietnamese Foods'
                    break;
            }
            router.push(`/category=${route}`)
            window.location.reload()
        },
        handle_verify: function(response) {
           this.token_recaptcha = response
        },
        handle_expired: function () {
            this.$refs.recaptcha.reset()
        },
        handle_replace_phone(text, start, length) {
            var length_cut = (text.length - length) / 2
           return text.substr(start, length_cut) + '*'.repeat(length) + text.substr(length + length_cut, length_cut)
        },
        handle_replace_string(text, start, length) {
            return text.substr(start, length) + '*'.repeat(1)
        },
        handle_return_string_money(text) {
            const length = text.length
           if(length > 6) {
               return text.substr(0, text.length - 6) 
           } else if(length == 6) {
               return '0.' + text.substr(0, 1)
           }
        },
        handle_get_joining(event) {
            switch(event) {
                case 'OLD':
                    this.page = this.list_joining_demand .length < 1 ? 1 : this.page +=1
                    break;
                case 'NEW':
                    this.page = this.page == 1 ? 1 : this.page -= 1
                    break;
            }
            this.handle_get_joining_budget(this.page)
        },
        handle_select_category(i) {
            this.category_show = false;
            this.category_choose = this.list_category[i]
            this.new_joining_post.category = this.category_choose.name
        },
        handle_select_city(i) {
            this.city_choose = this.list_city[i]
            this.city_show = false;
            this.new_joining_post.location =  this.city_choose.name 
        },
        handle_toogle($event) {
            this.city_show = !this.city_show
            $event.stopPropagation();
        },
        handle_toogle_category($event) {
            this.category_show = !this.category_show
            $event.stopPropagation()
        },
        handle_login() {
            if(this.token_recaptcha != null) {
                const info_login = {email: this.email_user, password: this.password}
                this.$store.dispatch('handle_sign_in', info_login).then(result => {
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_success'), is_redirect: false, brand: {name: this.$t('success')}})
                    } else if(result.data.status == 403) {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_not_active'), is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                    } else if(result.data.status == 503) {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.login_lock'), is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                    } else if(result.data.status == 401) {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: result.data.error, is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                    } else {
                        socket_bus.$emit('SHOW_ALERT', {is_show: true, message: result.data.error, is_redirect: false, brand: {name: this.$t('message_alert.login_fail')}})
                    }
                })
            } else {
                socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('auth_capcha'), is_redirect: false})
            }
        },
        handle_post_request() {
            if(JSON.parse(localStorage.getItem('customer'))) {
                var customer = JSON.parse(localStorage.getItem('customer'))
                this.new_joining_post.id_customer = customer.id
                return new Promise((resolve, reject) => {
                    HTTP.post('/joining-demand/', this.new_joining_post).then(result => {
                        resolve(result)
                        if(result.data.status == 201) {
                            socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.demand_success')})
                            setTimeout(() => {window.location.reload()}, 2000)
                        } else {
                            socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.demand_fail')})
                        }
                    }).catch(error => {
                        reject(error)
                        console.log('Error: ' + error)
                    })
                })
            } else {
                this.is_login = true
            }
            
        },
        handle_get_joining_budget(page) {
            return new Promise((resolve, reject) => {
                HTTP.get('/joining-demand/page=' + page).then(result => {
                    resolve(result)
                    this.list_joining_demand = result.data.status == 200 ? result.data.data : [];
                }).catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        },
        handle_get_name_image(link) {
            return String(link).split('/')[2].split('.')[0]
        },
        handle_get_image_advertisement() {
            this.$store.dispatch('handle_get_link_image').then(result => {
                this.image_banner = result.data[0].header
                this.name_picture = this.handle_get_name_image(this.image_banner)
            })
        },
        handle_choose_tab(tab) {
            switch(tab) {
                case 'ALL':
                    this.handle_get_joining_budget(this.page)
                    this.current_tab = 'ALL'
                    break;

                case 'DOMESTIC':
                    this.current_tab = 'DOMESTIC'
                    this.list_joining_demand.length = 0;
                    this.handle_get_joining_budget(this.page)
                    this.list_joining_demand = this.list_joining_demand.filter(item => {
                       return item.location.indexOf('Nước ngoài') == -1
                    })
                    break;

                case 'OVERSEA':
                    this.current_tab = 'OVERSEA'
                    this.list_joining_demand = this.list_joining_demand.filter(item => {
                       return item.location.indexOf('Nước ngoài') != -1
                    })
                    break;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('click', () => {
                if(this.city_show) {
                    this.city_show = false
                }

                if(this.category_show) {
                    this.category_show = false
                }
            })
        })
    },
    created() {
        this.city_show = false
        this.$store.dispatch('get_cities').then(result => {
            this.list_city = result.data
        })

        this.$store.dispatch('get_categories').then(result => {
            this.list_category = result.data
        })

        this.handle_get_joining_budget(this.page)
        this.category_popular = localStorage.getItem('lang') == 'en' ? this.category_en : this.category_vn   
        
        socket_bus.$on('CHANGE_LANG', () => {
            window.location.reload()
        })

         socket_bus.$on('CLOSE_BOX', result => {
           this.is_login = false
        })
    }
}
</script>