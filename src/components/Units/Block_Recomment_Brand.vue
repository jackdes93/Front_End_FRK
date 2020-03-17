<template>
    <div class="container flex-box bg-recomment">
        <div class="wrap-container" style="padding: 0;">
            <div class="block-recomment">
                <div class="item-recomment">
                    <router-link :to="{path: `/${brand_left}`}">
                        <img :src="`http://franchiseking.vn/${image_banner.left}`" :alt="`${image_banner.left}`">
                    </router-link>
                </div>
                <div class="item-recomment">
                    <router-link :to="{path: `/${brand_center}`}">
                        <img :src="`http://franchiseking.vn/${image_banner.center}`" :alt="`${image_banner.center}`">
                    </router-link>
                </div>
                <div class="item-recomment">
                    <div class="item-top">
                        <router-link :to="{path: `/${brand_right_top}`}">
                            <img :src="`http://franchiseking.vn/${image_banner.right_top}`" :alt="`${image_banner.right_top}`">
                        </router-link>
                    </div>
                    <div class="item-bottom">
                        <router-link :to="{path: `/${brand_right_bottom}`}">
                            <img :src="`http://franchiseking.vn/${image_banner.right_bottom}`" :alt="`${image_banner.right_bottom}`">
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="banner banner-online-joining" style="padding 0 15px;">
                <router-link :to="{path: `/${brand_wide}`}">
                    <img :src="`http://franchiseking.vn/${image_banner.wide}`" :alt="`${image_banner.wide}`" style="height: 100%">
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
<script>
import { HTTP } from '../../http-common';
export default {
    data() {
        return {
            image_banner: {},
            brand_left:'', brand_center: '', brand_right_top: '', brand_right_bottom: '', brand_wide: ''
        }
    },
    methods: {
        handle_get_name_image(link) {
            return String(link).split('/')[2].split('.')[0]
        },
        handle_get_image_advertisement() {
            this.$store.dispatch('handle_get_link_image').then(result => {
                this.image_banner = result.data[0].exhibition

                if(this.image_banner.left.split('/')[1] == 'advertisement') {
                    var id_brand = this.image_banner.left.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand).then(result => { 
                        this.brand_left = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_left = ''
                }

                if(this.image_banner.center.split('/')[1] == 'advertisement') {
                    var id_brand_center = this.image_banner.center.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand_center).then(result => { 
                        this.brand_center = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_center = ''
                }

                if(this.image_banner.right_top.split('/')[1] == 'advertisement') {
                    var id_brand_right_top = this.image_banner.right_top.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand_right_top).then(result => { 
                        this.brand_right_top = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_right_top = ''
                }

                if(this.image_banner.right_bottom.split('/')[1] == 'advertisement') {
                    var id_brand_right_bottom = this.image_banner.right_bottom.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand_right_bottom).then(result => { 
                        this.brand_right_bottom = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_right_bottom = ''
                }

                if(this.image_banner.wide.split('/')[1] == 'advertisement') {
                    var id_brand_side_bar = this.image_banner.wide.split('/')[2]
                    this.handle_get_info_brand_in_image(id_brand_side_bar).then(result => { 
                        this.brand_wide = result.status == 200 ? `${result.data.id_category}/${result.data.name_vietnamese}` : ''  
                    })
                } else {
                    this.brand_wide = ''
                }
            })
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
        this.handle_get_image_advertisement()
    }
}
</script>