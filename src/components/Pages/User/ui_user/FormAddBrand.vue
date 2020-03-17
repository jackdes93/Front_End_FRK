<template>
    <div class="block-model" style="background: rgba(0,0,0,.5)">
        <div class="block-alert padding-full">
            <div class="block-header bg-title-header padding-full header-fix width-full">
                <p class="title-form">{{$t('add_brand')}}</p>
            </div>
            <ValidationObserver v-slot="{ invalid }" style="width: 100%; justify-content: center;">
                <form class="block-form" style="padding: 8px 16px!important; width: 100%; max-height: 520px; overflow: auto;" enctype="multipart/form-data" @submit.prevent="handle_save">
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span">{{$t('customer')}}:</span>
                            <input type="text" class="border-bottom-ol margin-bottom" v-model="search_text" v-on:click="is_show = true">

                            <div class="form-group col-group" v-if="is_show">
                                <ul class="list-city">
                                    <li v-for="(item,index) in customer_filters" v-on:click="handle_choose_customer(item)" :key="index" :value="item.id"><p class="text-center">{{item.full_name}}</p> </li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span">{{$t('name_customer')}}:</span>
                            <input type="text" class="border-bottom-ol margin-bottom" v-model="customer.full_name" readonly>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.category')}}</span>
                            <ValidationProvider name="category" rules="required" v-slot="{ errors }" style="width: 100%;">
                                <select name="category"  class="list-joining" v-model="new_brand.id_category">
                                    <option value="" selected>-- {{$t('filter.choose_category')}} --</option>
                                    <option v-bind:value="item.name" v-for="(item, index) in categories" :key="index">{{handle_translate(item.name)}}</option>
                                </select>
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('user_page.brand_name')}}</span>
                            <ValidationProvider name="name_brand" rules="required" v-slot="{ errors }" style="width: 100%;">
                                <input type="text" class="border-bottom-ol margin-bottom" v-model="new_brand.name" >
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                    </div>
                    
                    <div class="form-group row-group" style="justify-content: center; margin-top: 8px;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="handle_close()">{{$t('cancel')}}</div>
                        <button class="btn btn-signup" :class="{'bg-title-header': !invalid, 'disable-button':invalid}" :disabled="invalid" >{{$t('save')}}</button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import { socket_bus } from '../../../../main'
import {HTTP_ADMIN} from '../../../../http-common'

export default {
    data() {
        return {
            is_show: false,
            customers:[],
            search_text: '',
            customer: '',
            categories: [],
            category_selected: '',
            list_feature:[],
            new_brand: {
                id_category: '',
                id_customer: '',
                name: '',
                introduce: '',
                phone_number: '',
                email: '',
                website: '',
                feature: [],
                events: [],
                terms: [],
                location: [],
                head_office: 'No Info',
                price: 1000,
                offset_price:1000
            },
            images: '',
            thumbnail: '',
            main_banner: Array,
            image_intro: Array

        }
    },
    methods : {
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
        handle_close() {
            socket_bus.$emit('CANCEL_ADD_BRAND', {state: false})
        },
        handle_get_users() {
            HTTP_ADMIN.get('/customers').then(result => {
                this.customers = result.data.status == 200 ? result.data.data : []
            }).catch(error => {
                console.log(error)
            })
        },
        handle_choose_customer(customer) {
            this.customer = customer
            this.is_show = false
            this.search_text = customer.email
        },
        handleFileUpload(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.images = this.$refs.logo.files[0]
            this.thumbnail = this.$refs.thumbnail.files[0]
        },
        handle_save() {
            this.new_brand.feature = this.list_feature
            this.new_brand.phone_number = this.customer.phone_number
            this.new_brand.email = this.customer.email
            this.new_brand.id_customer = this.customer.id
            HTTP_ADMIN.post('/brands', this.new_brand).then(result => {
                if(result.data.status == 201) {
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.create_brand_success'), is_redirect: true, brand: result.data.data})
                    socket_bus.$emit('UPDATE_LIST_BRAND', {data: result.data.data})
                    socket_bus.$emit('CANCEL_ADD_BRAND', {state: false})
                } else {
                    socket_bus.$emit('SHOW_ALERT', {is_show: true, message: this.$t('message_alert.create_brand_fail'), is_redirect: true})
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },
    computed: {
         customer_filters() {
           return this.customers.filter(item => {
               return item.email.match(this.search_text.toLowerCase().trim())
           })
        },
    },
    created() {
        this.handle_get_users()
        this.$store.dispatch('get_categories').then(result => {
            this.categories = result.data
        })
       
        this.list_feature = [{content: "Equipments included", value: false}, {content: "Need crowd", value: false}, {content: "Low risk", value:false}, 
        {content: "Free Franchise Fee", value:false}, {content: "Have decorated", value:false}, {content: "Free Signing", value:false}, {content: "Exemption premium", value:false}
        , {content:"Education training", value:false}, {content:"Free Margin", value:false}]
    }
}
</script>