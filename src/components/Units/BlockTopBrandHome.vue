<template>
    <div class="block-top-brand">
        <div class="row list-brand flex-row-center" style="overflow: hidden;" v-if="top_brand.length > 0">
            <span class="btn-next" v-on:click="handle_click('NEXT')"><i class="fas fa-chevron-left"></i></span>
            <div class="form-group row-group" v-if="top_brand.length == 0"><span class="label-span">NO DATA</span></div>
            <div class="list-item-brand" id="list-brand" v-else>
                <div class="brand flex-row-center" v-for="(brand, index) in top_brand" :key="index">
                    <router-link :to="{path: `/${brand.id_category}/${brand.name_vietnamese}`}" class="brand-block">
                        <div class="thumbnail">
                            <img v-bind:src="`/${brand.image_source.logo}`" :alt="`/${brand.name}`">
                        </div>
                        <div class="info">
                            <p class="text-name">{{brand.name}}</p>
                            <p class="price-text">{{Number(brand.price).toLocaleString()}} <sup>đ</sup></p>
                        </div>
                    </router-link>
                </div>
            </div>
            <span class="btn-prev"  v-on:click="handle_click('PREV')"><i class="fas fa-chevron-right"></i></span>
        </div>
    </div>
</template>

<script>

import { HTTP } from '../../http-common';
export default {
     data() {
        return {
            i : 0,
            top_brand: []
        }
    },
    methods : {
        handle_click(state) {
            var list_brand_element = document.getElementById('list-brand')
            var count = document.querySelectorAll('#list-brand .brand').length
            var marginLeft = 386
            
            switch(state) {
                case 'NEXT':
                    this.i = (this.i == count - 1) ? 0 :  this.i + 1
                    break;
                case 'PREV':
                     this.i = ( this.i == 0) ? 0 :  this.i - 1
                    break;
            }
            setTimeout(() => {
                list_brand_element.style.marginLeft = "-" + (marginLeft *  this.i) + "px";
            }, 200)
            
        },
        handle_get_top_brand() {
            return new Promise((resolve, reject) => {
                HTTP.get('/top-brand/HOME&category=category').then(result => {
                    resolve(result.data)
                    this.top_brand = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error)
                })
            })
        }
    },
    created() {
        this.handle_get_top_brand()
    }
}
</script>