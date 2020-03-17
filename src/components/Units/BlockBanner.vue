<template>
    <div class="wrap-container none-padding-top">
        <div class="block block-advertisment">
            <div class="block-advertisment-left" >
                <transition-group name='fade' tag='div'>
                    <div id="bannerimage"  v-for="i in [index]" :key="i">
                        <router-link :to="{path: `/${current_brand_show}`}">
                            <img class="animation-slide-image" :src="`http://franchiseking.vn/${image_current}`" :alt="`${image_current}`" style="border-radius: 30px">                             
                        </router-link>
                    </div>
                </transition-group>
                <div class="nav-image" id="#navimage">
                    <span class="circle-mini" :class="{ choose: index == 0 }" v-on:click='handle_choose_slide(0)'></span>
                    <span class="circle-mini" :class="{ choose: index == 1 }" v-on:click='handle_choose_slide(1)'></span>
                    <span class="circle-mini" :class="{ choose: index == 2 }" v-on:click='handle_choose_slide(2)'></span>
                </div>
            </div>
            <div class="block-advertisment-right">
                <div class="block-advertisment-top">
                    <router-link :to="{path: `/${current_brand_right}`}">
                        <img :src="`http://franchiseking.vn/${image_right}`" :alt="image_right">
                    </router-link>
                </div>
                <div class="block-advertisment-bottom">
                    <div class="list-joining row-header">
                        <span class="circle"><i class="fas fa-bolt text-color-primarry"></i></span>
                        <p class="title-header text-uppercase">{{$t('last_joining')}}</p>
                    </div>
                    <div class="list-item" style="overflow: hidden !important">
                        <div class="list-joining" v-for="(item, index) in list_joining_demand" :key="index" >
                            <p class="text-overflow text-description padding-left">{{handle_translate_sex(item.sex)}} {{item.first_name}} | {{handle_translate(item.category)}} | {{$t('brand_info.budget')}}: {{handle_return_string_money(item.budget.from.toString())}} {{$t('million')}} -> {{handle_return_string_money(item.budget.to.toString())}} {{$t('million')}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: all 2s ease; overflow: hidden; visibility: visible; position: absolute; width:100%; opacity: 1;}
.fade-enter, .fade-leave-to { visibility: hidden; width:100%; opacity: 0;}
</style>

<script> 
import { HTTP } from '../../http-common';
export default {
    data() {
        return {
            list_joining_demand:[],
            slider: [],
            image_right: '',
            image_current: '',
            current_brand_show: '',
            current_brand_right: '',
            index : 0,
            is_animation: false
        }
    },
    methods: {
        handle_translate_sex(gender) {
            switch(gender) {
                case 'Mr':
                    return this.$t('mr')
                case 'Mrs':
                    return this.$t('mrs')
            }
        },
        handle_choose_slide(i) {
            this.image_current = this.slider[i]
            var id_brand_slider = this.image_current.split('/')[1] == 'advertisement' ? this.image_current.split('/')[2] : ''
            if(id_brand_slider.length > 0) { this.handle_get_info_brand_in_image_slider(id_brand_slider)}
            this.index = i
        },
        handle_auto_slide_show() {
            setInterval(() => {
                this.index = this.index == 2 ? 0 : this.index + 1
                this.image_current = this.slider[this.index]
                this.is_animation = true
                this.is_animation = false
                var id_brand_slider = this.image_current.split('/')[1] == 'advertisement' ? this.image_current.split('/')[2] : ''
                if(id_brand_slider.length > 0) { this.handle_get_info_brand_in_image_slider(id_brand_slider)}
            }, 5000)
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
        handle_get_list_joining_demand() {
            return new Promise((resolve, reject) => {
                HTTP.get('/joining-demand').then(result => {
                    resolve(result)
                    this.list_joining_demand = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error)
                })
            })
        },
        handle_return_string_money(text) {
            const length = text.length
           if(length > 6) {
               return text.substr(0, text.length - 6) 
           } else if(length == 6) {
               return '0.' + text.substr(0, 1)
           }
        },
        handle_get_name_image(link) {
            return String(link).split('/')[2].split('.')[0]
        },
        handle_get_image_advertisement() {
            this.$store.dispatch('handle_get_link_image').then(result => {
                this.slider = result.data[0].home.slider
                this.image_current = this.slider.length > 0 ? this.slider[0] : ''
                this.image_right = result.data[0].home.right
                var id_brand = this.image_right.split('/')[1] == 'advertisement' ? this.image_right.split('/')[2] : ''
                var id_brand_slider = this.image_current.split('/')[1] == 'advertisement' ? this.image_current.split('/')[2] : ''
                
                if(id_brand.length > 0) {
                    this.handle_get_info_brand_in_image(id_brand)
                }
                
                if(id_brand_slider.length > 0) {
                    this.handle_get_info_brand_in_image_slider(id_brand_slider)
                }
            })
        },
        handle_get_info_brand_in_image(id_brand) {
            return new Promise((resolve, reject) => {
                HTTP.get(`/brands/${id_brand}`).then(result_brand => {
                    this.current_brand_right = result_brand.data.status == 200 ? `${result_brand.data.data.id_category}/${result_brand.data.data.name_vietnamese}` : ''
                }).catch(error => {
                    reject(error)
                    console.log(`Error get info brand ${JSON.stringify(error)}`)
                })
            })
        },
        handle_get_info_brand_in_image_slider(id_brand) {
            return new Promise((resolve, reject) => {
                HTTP.get(`/brands/${id_brand}`).then(result_brand => {
                    this.current_brand_show = result_brand.data.status == 200 ? `${result_brand.data.data.id_category}/${result_brand.data.data.name_vietnamese}` : ''
                }).catch(error => {
                    reject(error)
                    console.log(`Error get info brand ${JSON.stringify(error)}`)
                })
            })
        },
    },
    mounted: function() {
       this.handle_auto_slide_show()
    },
    created() {
        this.handle_get_list_joining_demand()
        this.handle_get_image_advertisement()
        
    }
}
</script>
