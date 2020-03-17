<template>
    <div class="flex-box nav-top box-shadow padding-full " style="position: fixed; z-index: 999">
        <div class="block-logo">
            <router-link to="/">
             <img src="http://franchiseking.vn/image/Logo@2x.png" alt="LOGO">
            </router-link>
        </div>
        <div class="form-group row-group block-language" style="padding: 12px; border: 1px solid #DDD" v-on:click="handle_toogle_lang($event)">
            <i class="fas fa-globe margin-fix-right"></i>
            <span style="color: #000">{{handle_translate_language(language_selected.name)}}</span>
            <i class="fas fa-chevron-down margin-fix-left"></i>
        </div>
        <ul class="list-lang" v-if="toogle" style="top: 78px !important; right: 16px !important; left: unset">
            <li class="item-lang" v-for="(lang,index) in language" :key="index" v-on:click="handle_choose(lang)">
                <span class="white">{{handle_translate_language(lang.name)}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { socket_bus } from '../../../../main';
import i18n from '@/lang/i18n.js'
export default {
    data() {
        return{
            language: [],
            language_selected: {},
            toogle: false
        }
    },
    methods: {
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
            setTimeout(() => {window.location.reload()}, 300)
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
                if(this.toogle) {
                    this.toogle = false
                }
            })
        })
    },
    created() {
        this.is_toogle = false;
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