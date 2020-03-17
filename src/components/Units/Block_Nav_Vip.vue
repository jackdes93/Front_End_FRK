<template>
    <div class="container flex-box flex-col-center" style="height: 236px;">
        <div class="row" id="nav-bar-state" >
            <div class="wrap-container top-bar">
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
                <div class="form-group info-bar" v-if="customer.id != undefined"> 
                    <span v-on:click="handle_toogle($event)" class="white" style="margin-right: 8px;">{{$t('user_page.hi')}}{{customer.full_name}}</span>
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
        <div class="row">
            <div class="wrap-container" style="padding: 15px 20px; height: 120px; display: flex; justify-content: space-between; flex-direction: column; position: relative; align-items: center; padding-top: 16px;">
                <div class="header" style="width:100%">
                    <div class="nav" style="height: auto; padding-bottom: 0; height: 70px; flex-direction: row; justify-content: flex-start;">
                        <div class="logo" style="flex: 1 !important; flex-grow:0.5">
                            <router-link to="/"><img src="../../assets/image/Logo-Light.png" alt="LOGO" style="border-radius: 0; object-fit: fill;"></router-link>
                        </div>
                        <div class="block-link">
                            <ul class="list">
                                <li class="item-menu"><router-link to="/">{{$t('home')}}</router-link></li>
                            <li class="item-menu"><router-link to="/about">{{$t('about')}}</router-link></li>
                            <li class="item-menu"><a href="https://news.franchiseking.vn">{{$t('news')}}</a></li>
                            <li class="item-menu"><router-link to="/contact">{{$t('contact')}}</router-link></li>
                            </ul>
                        </div>
                        <div class="block-btn" style="justify-content: flex-end">
                            <router-link class="btn margin-fix-right text-color-primarry" v-if="!customer.full_name" style="padding:0; align-items: center; color: #EF4934 !important" to="/login">{{$t('member_center')}}</router-link>
                            <router-link class="btn btn-signup bg-title-header" style="width: 250px!important; color: #FFF"  to="/joining-online">{{$t('exhibition')}}</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
* { color: #FFF !important; border-color: #FFF !important;}
.opacity-35 { background: rgba(0, 0, 0, 0.85); z-index: 990;}
</style>
<script>
import i18n from '@/lang/i18n.js'
import { socket_bus } from '../../main';

export default {
    data() {
        return {
            customer: {},
            event_links: [],
            is_toogle : false,
            toogle: false,
            language: [],
            language_selected: {},
        }
    },
    methods: {
        handle_toogle($event) {
            this.is_toogle = !this.is_toogle
            $event.stopPropagation();
        },
        handle_logout() {
            localStorage.clear()
            window.location.reload();
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
            })
        })
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
        }
        this.event_links = [{link: 'login', name: 'Account Info'}]
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
    }
}
</script>