<template>
   <div>
        <div class="row" style="margin-bottom: 30px;">
            <div class="wrap-container" style="padding: 0">
                <div class="banner" style="padding: 0 15px;">
                    <router-link :to="{path: `/${current_brand_show}`}">
                        <img :src="`${image_banner}`" v-bind:alt="`${name_picture}`">
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP } from '../../http-common';
export default {
    data() {
       return {
           image_banner: '',
           name_picture: '',
           current_brand_show: ''
       }
   },
   methods: {
        handle_get_name_image(link) {
            return String(link).split('/')[2].split('.')[0]
        },
        handle_get_image_advertisement() {
            this.$store.dispatch('handle_get_link_image').then(result => {
                this.image_banner = result.data[0].footer
                this.name_picture = this.handle_get_name_image(this.image_banner)
                var id_brand = this.image_banner.split('/')[1] == 'advertisement' ? this.image_banner.split('/')[2] : ''
                if(id_brand.length > 0) {
                    this.handle_get_info_brand_in_image(id_brand)
                }
            })
        },
        handle_get_info_brand_in_image(id_brand) {
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
   created() {
       this.handle_get_image_advertisement()
   }
}
</script>
