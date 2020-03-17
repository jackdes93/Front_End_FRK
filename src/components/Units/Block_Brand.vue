<template>
    <div>
        <div class="row" v-for="(category, index) in brands" :key="index">
            <div class="block-products" v-if="category.brands.length > 0">
                <div class="list-joining row-header-block" >
                    <span class="field bg-title-header text-uppercase"><i class="fas fa-crown"></i>{{handle_translate(category.category)}}</span>
                    <div style="display: flex; flex-direction: row; align-items: center;">
                        <a class="label" style="margin-right: 8px; color: #ED6B28" :href="`/${category.category}`">{{$t('see_more')}}</a>
                        <span class="circle-small bg-title-header"><i class="fas fa-chevron-right"></i></span>
                    </div>
                </div>
                <div class="row-content row-brands">
                    <div class="col-4 " v-for="(brand, i) in category.brands" :key="i"  >
                        <div class="brand-item">
                            <router-link :to="{path: `/${category.category}/${brand.name_vietnamese}`}" class="logo-brand-home" style="color:#000; width: 100%;">
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
                                    <span class="box-shadow wish " :id="`${brand._id}`" v-on:click="handle_add_wish_list(brand)"> 
                                        <input class="toogle-heart" type="checkbox"  :checked="handle_check_wish_list(brand._id)" />
                                        <label class="label-toogle-heart" >❤</label>
                                    </span>
                                </div>
                                <div class="price-text" v-if="brand.price != 0">{{brand.price.toLocaleString()}} <sup>đ</sup></div>
                                <div class="price-text" v-else>{{$t('contact_us')}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4" style="padding-top: 10px; flex: 1; max-width: 360px;" v-if="category.joiningdemands.length > 0">
                        <div class="list-joining header-block-product row-header">
                            <span class="circle"><i class="fas fa-bolt text-color-primarry"></i></span>
                            <p class="title-header text-uppercase" style="padding-right: 5px; font-size: .82em;">{{$t('last_joining')}}</p>
                        </div>
                        <div class="list-item" style="overflow: hidden">
                            <div class="list-joining" v-for="(joining, a) in category.joiningdemands" :key="a">
                                <p class="text-overflow text-description padding-left">{{handle_translate_sex(joining.sex)}} {{joining.last_name}} | {{handle_translate(joining.category)}} | {{$t('brand_info.budget')}}: {{handle_return_string_money(joining.budget.from.toString())}} {{$t('million')}} -> {{handle_return_string_money(joining.budget.to.toString())}} {{$t('million')}} | {{joining.location[0]}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP } from '../../http-common';
import { router } from '../../routers';
export default {
    data() {
        return {
            brands: [],
            wish_list_current: [],
            customer: {}
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
        handle_get_brand_by_category() {
            return new Promise((resolve, reject) => {
                HTTP.get('/brands/brand-by-category').then(result => {
                    resolve(result.data)
                    this.brands = result.data.data
                }).catch(error => {
                    reject(error)
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
        this.handle_get_brand_by_category()
         if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
            this.handle_get_wish_list(this.customer.id)
        }
    }
}
</script>