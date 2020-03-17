<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form">{{$t('user_page.your_support_ticket')}}</p>
            </div>
            <div class="form-group row-group" style="justify-content: flex-end">
                <button class="btn btn-signup primary-color" style="color: #FFF; " v-on:click="is_add = true">{{$t('user_page.new_ticket')}}</button>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header" style="max-width: 140px !important">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 120px; margin-right: 32px;">
                        <p class="label text-color-second ">{{$t('user_page.subject')}}</p>
                    </div>
                    <div class="block-item-row-header" style="max-width: 200px; margin-right: 16px;">
                        <p class="label text-color-second ">{{$t('user_page.date_created')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('user_page.status')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('see_more')}}</p>
                    </div>
                </div>
            </div>
            <form class="block-form" style="padding: 0 8px 16px 8px;">
                <div class="form-group row-group width-full" v-if="tickets.length == 0">
                    <span class="label-span width-full text-center">{{$t('nodata')}}</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation" v-else v-for="(ticket, index) in tickets" :key="index">
                    <div class="block-item-row " style="max-width: 140px !important">
                        <p class="label-cell bold">{{ticket.code_ticket}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 120px; margin-right: 16px;">
                        <p class="label-cell ">{{lang_current == 'en' ? ticket.subject.name_en : (lang_current == 'vn' ? ticket.subject.name_vi : ticket.subject.name_tw)}}</p>
                    </div>
                    <div class="block-item-row" style="max-width: 200px; margin-right: 16px;">
                        <p class="label-cell">{{new Date(ticket.created_on).toLocaleString()}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell text-color-primarry bold">{{handle_translate_status(ticket.status)}}</p>
                    </div>
                    <div class="block-item-row">
                        <a class="label-cell" v-on:click="ticket_selected = ticket">{{$t('see_more')}}</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_add">
            <div class="block-alert padding-full" style="max-width: 45%;">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">{{$t('user_page.add_new_ticket')}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style="width: 100%; display: flex; justify-content: center;">
                    <form class="block-form" @submit.prevent="handle_add_ticket" style="width: 80%;">
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('user_page.subject')}}</span>
                            <ValidationProvider name="subject" rules="required" v-slot="{errors}" style="width: 100%">
                                <select name="subject"  class="list-joining" v-model="new_ticket.subject">
                                    <option value="" selected>-- {{$t('user_page.select_sub')}} --</option>
                                    <option v-bind:value="item.id" v-for="(item, index) in subjects" :key="index">{{`${lang_current == 'en' ? item.name_en : (lang_current == 'vn' ? item.name_vi : item.name_tw)}`}}</option>
                                </select>
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('content')}}</span>
                            <ValidationProvider name="content" rules="required" v-slot="{errors}" style="width: 100%">
                                <textarea name="content" class="margin-bottom" cols="30" rows="5" v-model="new_ticket.content"></textarea>
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group row-group" style="justify-content: center;">
                            <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="is_add = false">{{$t('cancel')}}</div>
                            <button class="btn btn-signup" :class="{'bg-title-header': !invalid, 'disable-button' : invalid}">{{$t('save')}}</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="ticket_selected">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">Ticket {{ticket_selected._id}}</p>
                </div>
                <form class="block-form" style="width: 80%;">
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('user_page.subject')}}</span>
                        <select name="subject"  class="list-joining" v-model="ticket_selected.subject._id" disabled>
                            <option value="" selected>-- {{$t('user_page.select_sub')}} --</option>
                            <option v-bind:value="item.id" v-for="(item, index) in subjects" :key="index">{{`${lang_current == 'en' ? item.name_en : (lang_current == 'vn' ? item.name_vi : item.name_tw)}`}}</option>
                        </select>
                    </div>
                    <div class="form-group row-group">
                        <span class="label-span margin-right">{{$t('user_page.status')}}</span>
                        <span class="label">{{handle_translate_status(ticket_selected.status)}}</span>
                    </div>
                    <span class="label-span margin-bottom">{{$t('content')}}</span>
                    <div class="form-group col-group" style="max-height: 180px; overflow: auto;">
                        <div class="form-group col-group" v-for="(message, index) in ticket_selected.history" :key="index">
                            <div class="form-group col-group">
                                <span class="label-span margin-bottom">You</span>
                                <p class="content">{{message.content}}</p>
                            </div>
                            <div class="form-group col-group" v-show="message.reply.length != 0">
                                <span class="label-span margin-bottom">Admin</span>
                                <p class="content">{{message.reply}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-group margin-bottom-fix">
                        <span class="label-span margin-bottom">{{$t('new_question')}}</span>
                        <textarea name="content" v-model="new_content" :placeholder="`${$t('reply_here')}`"></textarea>
                    </div>
                    
                    <div class="form-group row-group" style="justify-content: center;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-if="ticket_selected.status != 'STOP'" v-on:click="handle_reply()">{{$t('reply')}}</div>
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-if="ticket_selected.status != 'STOP'" v-on:click="handle_close_ticket()">{{$t('close_ticket')}}</div>
                        <button class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="ticket_selected = null">{{$t('close')}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped>
    textarea[name="content"] { padding: 8px; font-size: 16px;}
    select:disabled { color: #2A2A2A;}
</style>
<script>
import { HTTP } from '../../../../http-common';
import { socket_bus } from '../../../../main'

export default {
    data() {
        return {
            customer:{},
            tickets: [],
            brands:[],
            ticket_selected: null,
            is_add: false,
            new_ticket: {id_customer: '', subject: '', },
            subjects: [],
            new_content: '',
            lang_current: 'en'
        }
    },
    methods: {
        handle_translate_status(status) {
            switch(status) {
                case 'OPEN':
                    return this.$t('ticket_open')
                case 'CLOSE':
                   return this.$t('ticket_close')
            }
        },
        handle_get_ticket() {
            return new Promise((resolve, reject) => {
                HTTP.get('/ticket-support/customer/' + this.customer.id).then(result => {
                    resolve(result)
                    this.tickets = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_add_ticket() {
            this.new_ticket.id_customer = this.customer.id;
            return new Promise((resolve, reject) => {
                HTTP.post('/ticket-support', this.new_ticket).then(result => {
                    resolve(result)
                    if(result.data.status == 201) {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.ticket_sp_success')})
                        this.is_add = false;
                        this.handle_get_ticket()
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.ticket_sp_fail')})
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })
            })
        },
        handle_get_subject() {
            return new Promise((resolve, reject) => {
                HTTP.get('/support-code').then(result => {
                    resolve(result)
                    this.subjects = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                    console.log('Error : ' + error);
                })
            })
        },
        handle_reply() {
            var new_history = {content: this.new_content, reply: ''}
            this.ticket_selected.history.push(new_history)
            return new Promise((resolve, reject) => {
                HTTP.patch('/ticket-support/reply-ticket/' + this.ticket_selected._id, this.ticket_selected.history).then(result => {
                    resolve(result)
                    result.data.status == 200 ? socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.reply_ticket_success')}) : socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.reply_ticket_fail')})
                }).catch(error => {
                    reject(error)
                    console.log(error)
                })
            })
        },
        handle_close_ticket() {
            const id_ticket = this.ticket_selected._id
            return new Promise((resolve, reject) => {
                HTTP.patch(`/ticket-support/${id_ticket}`, {status: 'STOP'}).then(result => {
                    resolve(result)
                    result.data.status == 200 ? socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.close_ticket_success')}) : socket_bus.$emit('SHOW_MESSAGE', {message: this.$t('message_alert.close_ticket_fail')})
                    this.ticket_selected = null
                    this.handle_get_ticket()
                }).catch(error => {
                    reject(error)
                    console.log('Error: ' + error);
                })              
            })
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('customer'))) {
            this.customer = JSON.parse(localStorage.getItem('customer'))
        }

        this.lang_current = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'vn'
        this.handle_get_ticket()
        this.handle_get_subject()
    }
}
</script>