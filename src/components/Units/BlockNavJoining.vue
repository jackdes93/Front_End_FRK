<template>
    <div class="container flex-box bg-nav-join ">
        <div class="row" id="nav-bar-state" >
            <div class="wrap-container top-bar" >
                <div class="form-group row-group block-language" v-on:click="handle_toogle_lang($event)">
                    <i class="fas fa-globe white margin-fix-right"></i>
                    <span class="white">{{handle_translate_language(language_selected.name)}}</span>
                    <i class="fas fa-chevron-down white margin-fix-left"></i>
                </div>
                <ul class="list-lang" v-if="toogle">
                    <li class="item-lang" v-for="(lang,index) in language" :key="index" v-on:click="handle_choose(lang)">
                        <span class="white">{{handle_translate_language(lang.name)}}</span>
                    </li>
                </ul>
                <div class="form-group info-bar"  v-if="customer.id != undefined"> 
                    <span v-on:click="handle_toogle($event)" class="white">{{$t('user_page.hi')}}{{customer.full_name}}</span>
                     <span v-on:click="handle_toogle($event)" v-if="customer.id != undefined"><i class="fas fa-angle-down white"></i></span>
                </div>
               
                <ul class="list-item list-bar-state" v-if="is_toogle" >
                    <li class="item-menu-state" v-for="(item, index) in event_links" :key="index" v-on:click="handle_toogle($event)" style="padding:0">
                        <a :href="`#/${item.link}`" target="_blank" style="padding:8px">{{$t('user_page.account_info')}}</a>
                    </li>
                    <li class="item-menu-state" v-on:click="handle_logout()">
                        <a href="#/logout" style="padding:8px">{{$t('user_page.logout')}}</a>
                    </li>
                </ul>
                <router-link to="/login" style="color:#FFF" v-if="customer.id == undefined">{{$t('member_center')}}</router-link>
            </div>
        </div>
            
        <div class="wrap-container" style="padding: 0; height: 160px; display: flex; justify-content: space-between; flex-direction: column; position: relative; align-items: center; padding-top: 16px;">
           <div class="row">
                <div class="wrap-container">
                    <div class="header">
                        <div class="nav">
                            <div class="logo">
                                <router-link to="/"><img src="../../assets/image/Logo-Light.png" alt="LOGO" style="border-radius: 0; object-fit: fill;"></router-link>
                            </div>
                            <div class="block-link">
                                <ul class="list">
                                    <li class="item-menu"><router-link class="white" to="/">{{$t('home')}}</router-link></li>
                                <li class="item-menu"><router-link class="white" to="/about">{{$t('about')}}</router-link></li>
                                <li class="item-menu"><a class="white" href="https://news.franchiseking.vn/">{{$t('news')}}</a></li>
                                <li class="item-menu"><router-link class="white" to="/contact">{{$t('contact')}}</router-link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="nav-bar-joining" >
                <div class="wrap-container flex-box flex-row-center">
                    <div class="btn-menu" v-on:click="handle_show_menu($event)"><i class="fas fa-bars white"></i></div>
                    <div class="block-category">
                        <ul class="list">
                           <li v-for="(category, index) in categories" :key="index" class="item-category-online">
                                <a class="text-uppercase link-category white" :id="`${index}`"  :href="`#${category.name}`">{{handle_translate(category.name)}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="btn btn-join-demand">
                        <i class="fas fa-bolt text-color-primarry margin-fix-right"></i>
                        <p class="text-color-primary">
                            <router-link to="/joining-demand">{{$t('joining_demand')}}</router-link>
                        </p>
                    </div>
                </div>
            </div>
            <div class="form-group col-group mobile-nav">
                <div class="form-group row-group menu-mobile" v-if="is_menu">
                    <ul class="list col-group " >
                        <li class="item-menu white"><router-link to="/">{{$t('home')}}</router-link></li>
                        <li class="item-menu white"><router-link to="/about">{{$t('about')}}</router-link></li>
                        <li class="item-menu white"><a href="https://news.franchiseking.vn/">{{$t('news')}}</a></li>
                        <li class="item-menu"><router-link to="/contact">{{$t('contact')}}</router-link></li>
                    </ul>
                    <span style="display: flex; width: 2px; border: 1px solid #CCC; height: 210px; margin-right: 4px; margin-top: 4px;"></span>
                    <div class="block-category-mobile col-group" >
                        <ul class="list col-group" style="width: 100%;">
                            <li v-for="(category, index) in categories" :key="index" class="item-category-mobile">
                                <a class="text-uppercase link_category " :id="`${index}`" :href="`#${category.name}`">{{handle_translate(category.name)}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap-container block-slogan">
            <div class="slogan-online">
                <span class="rectangle-online"></span>
                <h4 class="text-slogan text-uppercase">good brand <br> good business</h4>
            </div>
        </div>
    </div>
</template>

<script>
import { router } from '../../routers';
import { socket_bus } from '../../main';
import i18n from '@/lang/i18n.js'
import {HTTP} from '../../http-common'
export default {
    data() {
        return {
            customer: {},
            is_toogle : false,
            toogle: false,
            is_menu: false,
            categories: [],
            event_links: [],
            image_banner: '',
            name_picture: '',
            language: [],
            language_selected: {},
        }
    },
    methods: {
        handle_translate_language(language) {
            switch(language) {
                case 'Vietnamese':
                    return this.$t('vn')
                case 'English':
                    return this.$t('en')
                case 'Taiwan':
                    return this.$t('tw')
            }
        },
        handle_show_menu($event) {
            $event.stopPropagation()
            this.is_menu = !this.is_menu
        },
        handle_toogle_lang($event) {
            $event.stopPropagation();
            this.toogle = !this.toogle
        },
        handle_choose(lang) {
            this.language_selected = lang
            this.$store.dispatch('setLang', lang.value)
            socket_bus.$emit('CHANGE_LANG')
            this.language = [
            {
                name: 'Vietnamese',
                icon: '/img/vi.png',
                value: 'vn'
            },
            {
                name: 'English',
                icon: '/img/eng.png',
                value: 'en'
            },
            {
                name: 'Taiwan',
                icon: '/img/tw.png',
                value: 'tw'
            }
        ]
            this.language = this.language.filter(item => {return item.value != this.language_selected.value})
        },
        handle_logout() {
            localStorage.clear()
            router.push('/')
            window.location.reload();
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
        handle_toogle($event) {
            this.is_toogle = !this.is_toogle
            $event.stopPropagation();
        },
        handle_redirect_category(category, index) {
            socket_bus.$emit('CHANGE_CATEGORY', category)
            router.push('/' + category)
            var link_category = document.getElementsByClassName('link_category')
            var category_selected = document.getElementById(index)
            for(var i = 0; i < link_category.length; i ++) {
                link_category[i].classList.remove('active')
            }
            category_selected.classList.add('active')
           
        },
        handle_get_name_image(link) {
            return String(link).split('/')[2].split('.')[0]
        },
        handle_get_image_advertisement() {
            this.$store.dispatch('handle_get_link_image').then(result => {
                this.image_banner = result.data[0].exhibition
                this.name_picture = this.handle_get_name_image(this.image_banner)
            })
        },
        handle_re_check_token() {
            const token = localStorage.getItem('access_token')
            return new Promise((resolve, reject) => {
                HTTP.post('/customers/token/detect', {token: token}).then(result => {
                    resolve(result)
                    if(result.data.status == 500) {
                        this.handle_logout()
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('click', () => {
                if(this.is_toogle) {
                    this.is_toogle = false
                }
                if(this.toogle) {
                    this.toogle = false
                }
                if(this.is_menu) {
                    this.is_menu = false
                }
            })
        })
    },
    created() {
        if(localStorage.getItem('access_token')) { 
            this.handle_re_check_token()
            setInterval(() => {
                this.handle_re_check_token()
            }, 900000)
        }
       
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
        }
         this.language = [
            {
                name: 'Vietnamese',
                icon: '/img/vi.png',
                value: 'vn'
            },
            {
                name: 'English',
                icon: '/img/eng.png',
                value: 'en'
            },
            {
                name: 'Taiwan',
                icon: '/img/tw.png',
                value: 'tw'
            }
        ]
        this.language.map(item => {
            if(item.value == i18n.locale) {
                this.language_selected = item
                this.language = this.language.filter(item => {return item.value != this.language_selected.value})
            }
        })

        this.$store.dispatch('get_categories').then(result => {
            this.categories = result.data
        })
        this.event_links = [{link: 'login', name: 'Account Info'}]
    }
}
</script>