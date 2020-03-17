<template>
    <div class="container flex-box bg-food" v-if="brands.length != 0">
        <div class="wrap-container block-online-brands">
            <div class="block-drink-left">
                <p class="text-uppercase title-block-drink">{{$t('bbq')}}</p>
                <a class="title-see-more see-more-desktop" v-on:click="handle_click()">{{$t('see_more')}} >> </a>
            </div>
            <div class="block-drink-brands">
                <div class="brand-item exhibiton-background" v-for="(brand, index) in brands" :key="index">
                    <router-link :to="{path: `/${brand.id_category}/${brand.name_vietnamese}`}" class="logo-brand-home" style="color:#000; width: 100%; display: flex;">
                        <div class="header-img flex-row-center">
                            <img  v-bind:src="`${brand.image_source.logo}`" v-bind:alt="brand.name">
                            <div class="label-circle-front" v-if="brand.hotlabel">
                                <i class="fas fa-fire-alt" style="margin: 0"></i>
                                <span class="text-uppercase" style="font-weight: bold;">Hot</span>
                            </div>
                        </div>
                    </router-link>
                    <div class="introduct-brand" style="padding: 20px;">
                        <div class="form-group row-group">
                            <h4 class="name-brand text-uppercase">{{brand.name}}</h4>
                            <span class="box-shadow wish " :id="`${brand._id}`" v-on:click="handle_add_wish_list(brand)"> 
                                <input class="toogle-heart" type="checkbox"  :checked="handle_check_wish_list(brand._id)" />
                                <label class="label-toogle-heart" >❤</label>
                            </span>
                        </div>
                        <div class="price-text" v-if="brand.price != 0">{{brand.price.toLocaleString()}} <sup>đ</sup></div>
                        <div class="price-text" v-else>Contact Us</div>
                    </div>
                </div>
            </div>
            <div class="form-group block-see-more"><a class="title-see-more" v-on:click="handle_click()">{{$t('see_more')}} >> </a></div>
        </div>
    </div>
</template>

<style scoped>
.bg-food { background: url('../../assets/image/BBQ.jpg') no-repeat; background-position: bottom; background-size: cover; }
</style>


<script>

import { HTTP } from '../../http-common';
import { router } from '../../routers';
export default {
    data() {
        return {
            brands: [],
            brand:{},
            customer: null,
            is_owner: true,
            wish_list_current: []
        }
    },
    methods: {
        handle_click() {
            router.push('/BBQ')
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
        handle_check_wish_list(id_brand) {
            return this.wish_list_current.indexOf(id_brand) == -1 ? false : true
        },
        handle_get_brand() {
             return new Promise((resolve, reject) => {
                HTTP.get('recommends/brand-exhibition=BBQ').then(result => {
                    resolve(result)
                    this.brands = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
            this.handle_get_wish_list(this.customer.id)
        }
        this.handle_get_brand()
    }
}
</script>