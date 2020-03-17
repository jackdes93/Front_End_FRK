<template>
    <div>
        <block_nav></block_nav>
        <div class="block block-category-image">
            <div class="col-1">
                <router-link :to="{path: `/${brand_left}`}">
                    <img :src="`${image_link.left}`" :alt="`${image_link.left}`">
                </router-link>
            </div>
            <div class="col-2">
                <router-link :to="{path: `/${brand_center}`}">
                    <img :src="`${image_link.center}`" :alt="`${image_link.center}`">
                </router-link>
            </div>
            <div class="col-1">
                <div class="col-1-top">
                    <router-link :to="{path: `/${brand_right_top}`}">
                        <img :src="`${image_link.right_top}`" :alt="`${image_link.right_top}`">
                    </router-link>
                </div>
                <div class="col-1-bottom">
                    <router-link :to="{path: `/${brand_right_bottom}`}">
                        <img :src="`${image_link.right_bottom}`" :alt="`${image_link.right_bottom}`">
                    </router-link>
                </div>
            </div>
        </div>
        <div class="block block-category-image-mobile">
            <div class="image-center">
                <router-link :to="{path: `/${brand_center}`}">
                    <img :src="`${image_link.center}`" :alt="`${image_link.center}`">
                </router-link>
            </div>
             <div class="image-bottom">
                <div class="col-image-left">
                    <router-link :to="{path: `/${brand_left}`}">
                        <img :src="`${image_link.left}`" :alt="`${image_link.left}`">
                    </router-link>
                </div>
                <div class="col-image-right">
                    <div class="col-1-top">
                        <router-link :to="{path: `/${brand_right_top}`}">
                            <img :src="`${image_link.right_top}`" :alt="`${image_link.right_top}`">
                        </router-link>
                    </div>
                    <div class="col-1-bottom">
                        <router-link :to="{path: `/${brand_right_bottom}`}">
                            <img :src="`${image_link.right_bottom}`" :alt="`${image_link.right_bottom}`">
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <block_top_brand></block_top_brand>
        <div class="wrap-container" style="padding: 0; margin:30px auto;">
            <div class="block-joinning-demand">
                <div class="block-form post-joinning-demand">
                    <div class="block-header">
                        <span><i class="fas fa-fire-alt text-color-primarry"></i></span>
                        <p class="title-header text-uppercase">{{$t('title_join_venture')}}</p>
                    </div>
                    <div class="block-venture">
                        <div class="venture-item" v-for="(brand, index) in brands" :key="index">
                            <div class="image-venture">
                                <a :href="`#/${brand.id_category}/${brand.name_vietnamese}`" >
                                    <img class="image-category-logo" v-bind:src="`${brand.image_source.logo}`" v-bind:alt="`${brand.name}`" style="background: #e1e1e1; border-radius: 20px;">
                                </a>
                                <div class="form-group row-group block-image-intro-category" style="margin-bottom: 0"> 
                                    <img class="image-category-intro" v-if="brand.image_source.image_intro.length > 0" v-bind:src="`${brand.image_source.image_intro[0]}`" v-bind:alt="`${brand.name}`" style="background: #e1e1e1; border-radius: 20px;">
                                    <img class="image-category-intro" v-if="brand.image_source.image_intro.length > 1" v-bind:src="`${brand.image_source.image_intro[1]}`" v-bind:alt="`${brand.name}`" style="background: #e1e1e1; border-radius: 20px;">
                                </div>
                                <div class="label-circle-front" v-if="brand.hotlabel">
                                    <i class="fas fa-fire-alt" style="margin: 0"></i>
                                    <span class="text-uppercase" style="font-weight: bold;">Hot</span>
                                </div>
                            </div>
                            <div class="price-venture">
                                <p class="title-venture text-uppercase"> {{brand.name}}</p>
                                <p class="price-text" v-if="brand.price == 0">{{$t('contact')}}</p>
                                <p class="price-text" v-if="brand.price != 0">{{ brand.price.toLocaleString()}} <sup>đ</sup></p>
                            </div>
                            <div class="description-venture">
                                <p class="text-description" style="font-size: 13px; overflow:hidden">{{brand.introduce}}</p>
                                <div class="block-button-contact">
                                    <div class="form-group row-group venture-block-buton" >
                                        <div class="btn-view-more margin-fix-right">
                                            <span class="text-uppercase" v-on:click="handle_detail_brand(brand)">{{$t('view_more')}} <i class="fas fa-chevron-right" style="margin-left: 10px;"></i></span>
                                        </div>
                                        <div class="hotline" v-on:click="handle_push_to(brand)">
                                            <span class="text-uppercase">{{$t('contact')}}<i class="fas fa-phone" style="margin-left: 10px;"></i></span>
                                        </div> 
                                        <span class="box-shadow wish wish-mobile" v-if="is_owner" :id="`${brand._id}`" v-on:click="handle_add_wish_list(brand)"> 
                                            <input class="toogle-heart" type="checkbox"  :checked="handle_check_wish_list(brand._id)" />
                                            <label class="label-toogle-heart" >❤</label>
                                        </span>
                                    </div>
                                    <div class="form-group row-group ">
                                        <span class="box-shadow wish margin-fix-right venture-block-wish" v-if="is_owner" :id="`${brand._id}`" v-on:click="handle_add_wish_list(brand)"> 
                                            <input class="toogle-heart" type="checkbox"  :checked="handle_check_wish_list(brand._id)" />
                                            <label class="label-toogle-heart" >❤</label>
                                        </span>
                                        <div class="join-venture" v-if="brand.request_joining">
                                            <p class="text-description" style="padding: 8px;">{{`${brand.request_joining.sex} - ${brand.request_joining.name}`}} | {{$t('ask')}}: {{handle_translate($route.params.category)}} | {{$t('brand_info.budget')}}: {{handle_return_string_money(brand.request_joining.budget.from.toString())}} {{$t('million')}} -> {{handle_return_string_money(brand.request_joining.budget.to.toString())}} {{$t('million')}}</p>
                                            <span class="circle"><i class="fas fa-bolt text-color-primarry"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-group block-list-cat-joining">
                    <div class="block-top block-category-joining" style="max-height: 300px;height: 300px !important;">
                        <div class="list-joining header-block-product row-header">
                            <span class="circle"><i class="fas fa-bolt text-color-primarry"></i></span>
                            <p class="title-header text-uppercase" style="padding:0 8px; font-size: 13px;" >{{$t('last_joining')}}</p>
                        </div>
                        <div class="list-item" v-if="joining_demands.length > 0">
                            <div class="list-joining" v-for="(item, index) in joining_demands" :key="index" >
                                <p class="text-overflow text-description">{{item.sex}}:{{item.name}} | {{$t('ask')}}: {{handle_translate(item.category)}} | {{$t('brand_info.budget')}}: {{handle_return_string_money(item.budget.from.toString())}} {{$t('million')}} -> {{handle_return_string_money(item.budget.to.toString())}} {{$t('million')}}</p>
                            </div>
                        </div>
                        <div class="list-item" v-else style="justify-content: center; display:flex;">
                            <p class="text-description">{{$t('no_data')}}</p>
                        </div>
                    </div>
                    <div class="block-bottom block-category-link">
                        <div class="block-header">
                            <span class="flex-row-center" style="display: flex; justify-content: flex-start;">
                                <i class="fas fa-crown" style="color: #333; margin-right: 10px;"></i>
                                <h6 class="text-uppercase">{{$t('popular_category')}}</h6>
                            </span>
                        </div>
                        <div class="block-content">
                            <ul class="list-category">
                                <a href="#" v-on:click="handle_route(index)" v-for="(item, index) in category_popular" :key="index"  class="item-category">
                                    <img :src="`image/${item}`" :alt="`${item}`" style="object-fit:cover; object-position: center;">
                                </a>
                            </ul>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <Block_Banner_Bottom></Block_Banner_Bottom>
        <block_footer></block_footer>
    </div>
</template>

<script>
import block_nav from '../Units/BlockNav';
import Block_Banner_Bottom from '../Units/Block_Banner_Bottom';
import block_footer from '../Units/Block_Footer';
import block_top_brand from '../Units/BlockTopBrand';
import { socket_bus } from '../../main';
import { HTTP } from '../../http-common';
import { router } from '../../routers';

export default {
    components : {
        block_nav, block_footer, Block_Banner_Bottom, block_top_brand
    },
    data() {
        return {
            category: {},
            customer: {},
            brands: [],
            brand: {},
            joining_demands: [],
            image_category: [],
            image_link: {},
            wish_list_current: [],
            is_wish_list: false,
            is_owner: true,
            category_popular: [],
            category_vn: ['BBQ-vi.jpg', 'Brunch-vi.jpg','Dessert-vi.jpg', 'Drink-vi.jpg', 'Foriegn-vi.jpg', 'Hotpot-vi.jpg', 'Vietnamese-vi.jpg'],
            category_en: ['BBQ-eng.jpg', 'Brunch-eng.jpg','Dessert-eng.jpg', 'Drink-eng.jpg', 'Foriegn-eng.jpg', 'Hotpot-eng.jpg', 'Vietnamese-eng.jpg'],
            brand_left: '',
            brand_right_top: '',
            brand_right_bottom: '',
            brand_center: '',
            brand_side_bar: ''
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
            router.push(`/${route}`)
            window.location.reload()
        },
        handle_get_brand_by_category(category) {
            return new Promise((resolve, reject) => {
                HTTP.get(`/recommends/brand-category=${category}`).then(result => {
                    resolve(result)
                    this.brands = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error)
                })
            })
        },
        handle_detail_brand(brand) {
            router.push(`/${brand.id_category}/${brand.name_vietnamese}`)
        },
        handle_get_joining_demand_by_category(category) {
            return new Promise((resolve, reject) => {
                HTTP.get('joining-demand/category-type='+ category).then(result => {
                    resolve(result)
                    this.joining_demands = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log(error)
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
        handle_get_wish_list(id_customer) {
            HTTP.get('/customers/' + id_customer).then(result => {
                localStorage.removeItem('customer')
                localStorage.setItem('customer', JSON.stringify(result.data))
                this.customer = result.data
                this.wish_list_current = result.data.wish_list
                
            }).catch(error => {
                console.log(error)
            }) 
        },
        handle_check_wish_list(id_brand) {
            return this.wish_list_current.indexOf(id_brand) == -1 ? false : true
        },
        handle_get_image_advertisement() {
            this.$store.dispatch('handle_get_link_image').then(result => {
                this.image_category = result.data[0]
                const category_name = this.$route.params.category
                switch(category_name) {
                    case 'Drink':
                        this.image_link = this.image_category.drink
                        break;
                    case 'Dessert':
                        this.image_link = this.image_category.dessert
                        break;
                    case 'Vietnamese Foods':
                        this.image_link = this.image_category.vn_food
                        break;
                    case 'Foriegn Foods':
                        this.image_link = this.image_category.foreign_food
                        break;
                    case 'BBQ':
                        this.image_link = this.image_category.bbq
                        break;
                    case 'Brunch':
                        this.image_link = this.image_category.brunch
                        break;
                    case 'Hot Pot':
                        this.image_link = this.image_category.hotpot
                        break;
                }

                if(this.image_link.left.split('/')[1] == 'advertisement') {
                    var id_brand = this.image_link.left.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand).then(result => { 
                        this.brand_left = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_left = ''
                }

                if(this.image_link.center.split('/')[1] == 'advertisement') {
                    var id_brand_center = this.image_link.center.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand_center).then(result => { 
                        this.brand_center = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_center = ''
                }

                if(this.image_link.right_top.split('/')[1] == 'advertisement') {
                    var id_brand_right_top = this.image_link.right_top.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand_right_top).then(result => { 
                        this.brand_right_top = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_right_top = ''
                }

                if(this.image_link.right_bottom.split('/')[1] == 'advertisement') {
                    var id_brand_right_bottom = this.image_link.right_bottom.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand_right_bottom).then(result => { 
                        this.brand_right_bottom = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_right_bottom = ''
                }

                if(this.image_link.left.split('/')[1] == 'advertisement') {
                    var id_brand_side_bar = this.image_link.side_bar.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand_side_bar).then(result => { 
                        this.brand_side_bar = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_side_bar = ''
                }
            })
        },
        handle_push_to(brand) {
            router.push(`/${brand.id_category}/${brand.name_vietnamese}/#ONLINEONQUIRY`)
        },
        handle_get_info_brand_in_image(id_brand) {
            return new Promise((resolve, reject) => {
                HTTP.get(`/brands/${id_brand}`).then(result_brand => {
                    resolve(result_brand.data)
                    return result_brand.data.status == 200 ? `${result_brand.data.data.id_category}/${result_brand.data.data.name_vietnamese}` : ''
                }).catch(error => {
                    reject(error)
                    console.log(`Error get info brand ${JSON.stringify(error)}`)
                })
            })
        },
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
            this.handle_get_wish_list(this.customer.id)
        }

        this.category_popular = localStorage.getItem('lang') == 'vn' ? this.category_vn : this.category_en   
        this.handle_get_brand_by_category(this.$route.params.category)
        this.handle_get_joining_demand_by_category(this.$route.params.category)
        this.handle_get_image_advertisement()

        socket_bus.$on('CHANGE_CATEGORY', result => {
            this.handle_get_brand_by_category(result)
            this.handle_get_joining_demand_by_category(result)
            this.handle_get_image_advertisement()
        })

        socket_bus.$on('CHANGE_LANG', () => {
            window.location.reload()
        })
    }
}
</script>