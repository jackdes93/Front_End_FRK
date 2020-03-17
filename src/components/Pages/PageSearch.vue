<template>
    <div>
        <block_nav></block_nav>
        <div class="row block-products" v-if="search_result.length > 0">
            <div class="row-content" style="flex-wrap: wrap;">
                <div class="brand-item" style="margin: 0 18px 48px 0;" v-for="(brand, i) in search_result" :key="i" >
                    <router-link :to="{path: `/${brand.id_category}/${brand.name_vietnamese}`}" class="logo-brand-home" style="color:#000; width: 100%;">
                        <div class="header-img flex-row-center">
                            <img  v-bind:src="`${brand.image_source.logo}`" v-bind:alt="brand.name">
                            <div class="label-circle-front" v-if="brand.hotlabel">
                                <i class="fas fa-fire-alt" style="margin: 0"></i>
                                <span class="text-uppercase" style="font-weight: bold;">Hot</span>
                            </div>
                        </div>
                    </router-link>
                    <div class="introduct-brand">
                        <div class="form-group row-group">
                            <h4 class="name-brand text-uppercase">{{brand.name}}</h4>
                            <span class="box-shadow wish " :id="`${brand.id}`" v-on:click="handle_add_wish_list(brand)"> 
                                <input class="toogle-heart" type="checkbox"  :checked="handle_check_wish_list(brand.id)" />
                                <label class="label-toogle-heart" >❤</label>
                            </span>
                        </div>
                        <div class="price-text" v-if="brand.price != 0">{{brand.price.toLocaleString()}} <sup>đ</sup></div>
                        <div class="price-text" v-else>{{$t('contact_us')}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row block-products" v-else>
            <span class="label" style="padding: 24px 16px">{{$t('nodata')}}</span>
        </div>
        <Block_Banner_Bottom></Block_Banner_Bottom>
        <block_footer></block_footer>
    </div>
</template>

<script>
import block_nav from '../Units/BlockNav';
import block_footer from '../Units/Block_Footer';
import Block_Banner_Bottom from '../Units/Block_Banner_Bottom.vue';
import { HTTP } from '../../http-common';
import { router } from '../../routers';


export default {
    components : {
        block_nav, block_footer, Block_Banner_Bottom
    },
    data() {
        return {
            search_result: [],
            key_word: '',
            wish_list_current: [],
        }
    }, 
    methods: {
        handle_search() {
            return new Promise((resolve, reject) => {
                HTTP.get(`/search/key-word=${this.key_word}`).then(result => {
                    resolve(result)
                    this.search_result = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error)
                })
            })
        },
        handle_check_wish_list(id_brand) {
            return this.wish_list_current.indexOf(id_brand) == -1 ? false : true
        },
        handle_add_wish_list(brand) {
            var brand_wish = document.getElementById(brand._id)
            var element_first = brand_wish.children[0]
            if(localStorage.getItem('access_token')) {
                if(element_first.checked) {
                    HTTP.patch(`/wish/remove-user/brand=${brand._id}&customer=${this.customer.id}`).then(result => {
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
                    HTTP.patch('/wish/' + brand._id, {id_customer: this.customer.id}).then(result => {
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
                this.wish_list_current.map(item => { this.is_wish_list = item == this.id_brand ? true : false })  
            }).catch(error => {
                console.log(error)
            }) 
        }
    },
    created() {
        this.key_word = this.$route.params.key
        this.handle_search()
    }    
}
</script>