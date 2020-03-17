import Vue from 'vue'
import Vuex from 'vuex'
import {router} from './routers';
import App from './App.vue';
import {store} from './store';
import './vee-validate'
import VueMask from 'v-mask'
import VueTimepicker from 'vuejs-timepicker'
import VueNumeric from 'vue-numeric'
import i18n from '@/lang/i18n.js'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
// Components
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueMask);
Vue.use(VueTimepicker);
Vue.use(VueNumeric)

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
export const socket_bus = new Vue();

new Vue({
    i18n,
    store,
    router,
    render: h => h(App),
}).$mount('#app')

window.onload = () => {
    window.onscroll = function() {
        if(document.getElementById('nav-bar-state')) {
            var nav_bar_state = document.getElementById('nav-bar-state');
            if( window.pageYOffset > nav_bar_state.offsetTop) {
                nav_bar_state.classList.add('fix-top-state')
            } else {
                nav_bar_state.classList.remove('fix-top-state')
            }
        }

        if(document.getElementById('nav-bar')) {
            var navbar = document.getElementById('nav-bar');
            if( window.pageYOffset > navbar.offsetTop) {
                navbar.classList.add('fix-top-fix');
            } else {
                navbar.classList.remove('fix-top-fix');
            }
        }
        

        if(document.getElementById('nav-bar-joining')) {
            var navbarjoining = document.getElementById('nav-bar-joining');
            if( window.pageYOffset > navbarjoining.offsetTop) {
                navbarjoining.classList.add('fix-top-fix');
                navbarjoining.style.top = "36px"
                navbarjoining.classList.add('opacity-35');
            } else {
                navbarjoining.classList.remove('fix-top-fix');
                navbarjoining.classList.remove('opacity-35');
                navbarjoining.style.top = "0px"
            }
        } 

        /* BUTTON SCROLL */
        if(document.getElementsByClassName('box-scroll').length != 0) {
            var btn_scroll = document.getElementsByClassName('box-scroll');
            if( window.pageYOffset >= 20) {
                btn_scroll[0].style.display = 'flex'
            } else {
                btn_scroll[0].style.display = 'none'
            }
        }
        
    }
}