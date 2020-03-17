<template>
    <div>
        <div class="row search-bar flex-row-center">
            <div class="search-bar-wrap">
                <div class="bar-item">
                  <h3>Easy to browser your <i class="far fa-heart"></i> brands</h3>
                </div>
                <div class="bar-item padding-left" style="flex: 0.4 !important">
                    <div class="list-joining not-active">
                        <input type="text" style="border: 1px solid #FFF" class="title" id="input_keyword" v-model="key_word"  :placeholder="`${this.$t('filter.keyword')}`" v-on:keyup.enter="handle_search">
                        <span class="circle" style="background: #FFF;" v-on:click="handle_search"><i class="fas fa-filter text-color-primarry"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { router } from '../../routers';

export default {
    data() {
        return {
            customer: {},
            city_show: false,
            category_show: false,
            readonly: true,
            key_word: '',
            search_result:[]
        }
    },
    methods: {
        handle_search() {
           router.push(`/search-key=${this.key_word}`)
        },
        
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
        }
    }
}
</script>