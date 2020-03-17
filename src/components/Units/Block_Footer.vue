<template>
    <div>
        <div class="row footer">
            <div class="block footer-top">
                <div class="block-cust">
                    <div class="block introduce-brand">
                        <div class="title-brand">
                            <h1> Franchise King</h1>
                        </div>
                        <div class="content-introduce">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ea incidunt nostrum, at ipsum id? Quam, quidem quasi. Incidunt dolorum inventore tenetur delectus. Tempore at obcaecati quam placeat qui repellendus?
                        </div>
                    </div>
                    <div class="block link-maps">
                        <div class="col">
                            <ul>
                                <li class="item">{{$t('footer.about_us')}}</li>
                                <li class="item"> {{$t('footer.plan_pricing')}}</li>
                            </ul>
                        </div>
                        <div class="col">
                            <ul>
                                <li class="item">{{$t('footer.terms_condition')}}</li>
                                <li class="item">{{$t('footer.privacy_policy')}}</li>
                                <li class="item">{{$t('footer.support')}}</li>
                            </ul>
                        </div>
                        <div class="col">
                            <ul>
                                <li class="item">{{$t('footer.advertisement')}}</li>
                                <li class="item">{{$t('footer.contact')}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="block-footer">
                    <div class="social">
                        <span class="logo-social facebook" ><a href="https://www.facebook.com" target="_blank"></a></span>
                        <span class="logo-social twitter" ><a href="https://www.twitter.com" target="_blank"></a></span>
                        <span class="logo-social google" ><a href="https://www.google.com" target="_blank"></a></span>
                        <span class="logo-social instagram" ><a href="https://www.instagram.com" target="_blank"></a></span>
                    </div>
                    <div class="block copyright">
                        <p>Copyright &copy; 2019 Franchise King <i class="fas fa-bolt text-color-primarry"></i> Brave Cat</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import i18n from '@/lang/i18n.js'
import {socket_bus} from '../../main'
export default {
   data() {
       return {
           language: [],
           language_selected: {},
           toogle: false
       }
   },
   methods: {
        handle_toogle($event) {
            $event.stopPropagation();
            this.toogle = !this.toogle
        },
        handle_choose(lang) {
            this.language_selected = lang
            this.$store.dispatch('setLang', lang.value)
            socket_bus.$emit('CHANGE_LANG')
        }
   },
   mounted() {
        this.$nextTick(() => {
            window.onclick = () => {
                if(this.toogle) {
                    this.toogle = false
                }
            }
        })
   },
   created() {
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
    //  this.language_selected = this.language.map(item => {item.value == i18n.locale})
     this.language.map(item => {
         if(item.value == i18n.locale) {
            this.language_selected = item
        }
     })
   }
}
</script>