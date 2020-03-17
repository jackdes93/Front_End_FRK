<template>
    <div class="flex-box padding-full block-custom-header col-group animation-transit-view ">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('user_page.your_call_back_request')}}</p>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('brand')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('name')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">Email</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('form_joining.phone_number')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('messages')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second">{{$t('status')}}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second">{{$t('action')}}</p>
                    </div>
                </div>
            </div>
            <form class="block-form" style="padding: 0 8px 20px 8px; overflow: auto">
                <div class="form-group row-group padding-full" v-if="list_request.length == 0">
                    <span class="label-span width-full text-center">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol row-animation" style="padding: 16px 8px 16px 0" v-else v-for="(item, index) in list_request" :key="index">
                    <div class="block-item-row">
                        <p class="label-cell text-uppercase text-overflow" style="max-width: 190px;">{{item.name_brand}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{item.first_name }} {{item.last_name}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell bold text-overflow" style="max-width: 150px;padding: 0 10px 0 0; text-align: left;">{{item.email}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell bold" style="max-width: 120px">{{item.contact.phone_number}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell sm-size text-overflow" style="max-width: 180px;">{{item.message}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell sm-size text-uppercase">{{item.status == 'CONFIRM' ? $t('form_joining.confirm') : $t('form_joining.unconfirm')}}</p>
                    </div>
                    <div class="block-item-row">
                        <a class="label-cell sm-size" v-on:click="handle_detail_request(item)">{{$t('see_more')}}</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_detail">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('detail_request_for')}} {{request_selected.name_brand}}</p>
                </div>
                <form class="block-form" style="padding: 8px 16px!important; width: 96%;">
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('name')}}</span>
                            <input class="border-bottom-ol" v-model="request_selected.first_name" readonly/>
                        </div>
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.phone_number')}}</span>
                            <input class="border-bottom-ol" v-model="request_selected.contact.phone_number" readonly/>
                        </div>
                        <div class="form-group col-group ">
                            <span class="label-span margin-bottom">Email</span>
                            <input class="border-bottom-ol" v-model="request_selected.email" readonly/>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">Zalo</span>
                            <input class="border-bottom-ol" v-model="request_selected.contact.zalo" readonly/>
                        </div>
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.time_open')}}</span>
                            <p class="border-bottom-ol" style="padding: 5px 16px; width: 100%;">{{new Date(request_selected.open_time).toLocaleString()}}</p>
                        </div>
                        <div class="form-group col-group ">
                            <span class="label-span margin-bottom">{{$t('form_joining.time_free')}}</span>
                            <p class="border-bottom-ol" style="width: 100%">{{handle_convert_time(request_selected.contact.time_contact)}}</p>
                        </div>
                    </div>
                    <div class="form-group row-group">
                        <div class="form-group col-group margin-fix-right">
                            <span class="label-span margin-bottom">{{$t('form_joining.location')}}</span>
                            <input class="border-bottom-ol" v-model="request_selected.location" readonly/>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom-fix">{{$t('form_joining.store_front')}}</span>
                            <p class="border-bottom-ol" style="padding: 5px 16px; width: 100%;">{{request_selected.store_front ? `${$t('form_joining.found')}` : `${$t('form_joining.still')}`}}</p>
                        </div>
                    </div>
                    <div class="form-group col-group ">
                            <span class="label-span margin-bottom">{{$t('messages')}}</span>
                            <textarea name="message" cols="30" rows="5" style="padding: 8px 16px;" v-model="request_selected.message" readonly></textarea>
                        </div>
                    <div class="form-group row-group" style="justify-content: center; margin-top: 10px;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_detail = false">{{$t('close')}}</div>
                        <div class="btn btn-signup bg-title-header" v-if="request_selected.status != 'CONFIRM'" v-on:click="handle_confirm_request(request_selected.id)">{{$t('confirm')}}</div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP } from '../../../../http-common';
import { socket_bus } from '../../../../main';
export default {
    data() {
        return {
            is_detail: false,
            customer: {},
            list_request: [],
            request_selected: {},
        }
    },
    methods: {
        handle_get_request_call() {
            return new Promise((resolve, reject) => {
                HTTP.get('/joining-request/customer/' + this.customer.id).then(result => {
                    resolve(result)
                    this.list_request = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        },
        handle_detail_request(request) {
            this.request_selected = request
            this.is_detail = true
        },
        handle_confirm_request(id) {
            if(this.request_selected.status == 'UNCONFIRM') {
                socket_bus.$emit('SHOW_CONFIRM', {message: this.$t('message_alert.call_back_confirm'), id_joining: id})
            } 
        },
        handle_convert_time(value) {
            switch(parseInt(value)) {
                case 0:
                    return this.$t('form_joining.mo')
                case 1:
                    return this.$t('form_joining.af')
                case 2:
                    return this.$t('form_joining.eve')
            }
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
        }
        this.handle_get_request_call()

        socket_bus.$on('UPGRADE_STATUS_CALLBACK', result => {
            if(result.is_update) {
                return new Promise((resolve, reject) => {
                    HTTP.patch(`/joining-request/${result.id_joining}`).then(result_final => {
                        console.log(result_final.status)
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.upgrade_call_back')})
                        this.handle_get_request_call()
                    }).catch(error => {
                        reject(error)
                        console.log(`Error: ${error}`);
                    })
                })
            }
        })
    }
}
</script>