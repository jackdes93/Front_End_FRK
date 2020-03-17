<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 800px; background: #EDEDED; padding-bottom: 16px;">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('categories')}}</p>
            </div>
            <div class="flex-box block-search margin-fix-right" style="justify-content: flex-end; width: 100%">
                <div class="form-group row-group" style="align-items: flex-end; max-width: 300px">
                    <input type="text" :placeholder="`${$t('search')}`" class="border-bottom-ol" v-model="search_text">
                </div>
            </div>
            <div class="form-group row-group" style="justify-content: flex-end" v-if="categories.length < 7">
                <button class="btn btn-signup primary-color" style="color: #FFF; " v-on:click="is_add = true">New Category</button>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header" v-for="(category, index) in categories" :key="index" v-on:click="handle_choose_tab(category.name, $event)">
                        <p class="label text-color-second tab-category text-uppercase" :class="{'active' : category.name == 'Drink'}" id="index">{{handle_translate(category.name)}}</p>
                    </div>
                </div>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px; margin-top: 16px; overflow: auto;">
                <div class="form-group row-group padding-full" v-if="filter_search.length == 0">
                    <span class="label text-center width-full">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation" v-else v-for="(item, index) in filter_search" :key="index">
                    <div class="block-item-row logo-brand margin-fix-right" style=" border: none;">
                        <img v-bind:src="`http://franchiseking.vn/${item.image_source.logo}`" v-bind:alt="`${item.name}`" >
                    </div>
                    <div class="block-item-row margin-right" >
                        <router-link class="label-cell width-full" style="font-size: 16px;" :to="`/${item.id_category}/${item.name_vietnamese}`">{{item.name}}</router-link>
                    </div>
                    <div class="block-item-row">
                        <span class="label text-center">{{item.email_owner}}</span>
                    </div>
                </div>
            </form>
        </div>
        <form_add_item v-if="is_add"></form_add_item>
        <form_detail></form_detail>
    </div>
</template>

<script>
import {socket_bus } from '../../../../main';
import form_add_item from '../Pages/FormAddMenuItem';
import form_detail from '../Pages/FormDetailCategory'
import { HTTP_ADMIN } from '../../../../http-common';

export default {
    components:{
        form_add_item, form_detail
    },
    data() {
        return {
            is_add : false,
            categories: [],
            brands: [], 
            search_text: ''
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
        handle_get_categories() {
            this.$store.dispatch('get_categories').then(result => {
                this.categories = result.status == 200 ? result.data : []
                this.handle_get_brand_by_category('Drink')
            })
        },
        handle_choose_tab(category, $event) {
            this.handle_get_brand_by_category(category)
            var list_object = document.getElementsByClassName('tab-category')
            for(var i = 0; i <= list_object.length-1; i++) {
                list_object[i].classList.remove('active')
            }
            $event.target.classList.add('active')
        },
        handle_get_brand_by_category(category) {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get(`/brands/category/${category}`).then(result => {
                    resolve(result)
                    this.brands = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log('Error: ' + error)
                })
            })
        }
    },
    computed: {
        filter_search() {
            return this.brands.filter(brand => { return brand.email_owner.includes(this.search_text) || brand.name.includes(this.search_text)})
        }
    },
    created() {
        this.handle_get_categories()
        socket_bus.$on('CANCEL_ADD_BRAND', (result) => {
            this.is_add = result.state
        })

        socket_bus.$on('SUCCESS_DEL_CATEGORY', (result) => {
            if(result.is_delete) {
                this.categories.splice(this.categories.indexOf(result.data), 1)
                HTTP_ADMIN.delete('/categories/' + result.data.id).then(result => {
                    console.log(`Result delete category ${result}`)
                })
            }
        })

        socket_bus.$on('ADD_SUCCESS_CATEGORY', (result) => {
            this.categories.push(result.data)
        })
     }
    
}
</script>