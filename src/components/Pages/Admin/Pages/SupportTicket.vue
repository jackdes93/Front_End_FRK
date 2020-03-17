<template>
    <div class="flex-box padding-full block-custom-header">
        <div class="block-custom col-12 padding-fix-lr box-shadow margin-fix-right" style="max-height: 600px; background: #EDEDED">
            <div class="block-header bg-title-header padding-full header-fix">
                <p class="title-form"> {{$t('user_page.support_ticket')}}</p>
            </div>
            <div class="form-group row-group width-full">
                <div class="block-list-row width-full padding-full border-bottom-ol">
                    <div class="block-item-row-header" style="max-width: 72px !important">
                        <p class="label text-color-second ">{{$t('user_page.nodot')}}</p>
                    </div>
                    <div class="block-item-row-header" >
                        <p class="label text-color-second ">{{$t('customer')}}</p>
                    </div>
                    <div class="block-item-row-header">
                        <p class="label text-color-second ">{{$t('user_page.subject')}}</p>
                    </div>
                    <div class="block-item-row-header">
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
                <div class="form-group row-group border-bottom-ol padding-full" v-if="support_tickets.length == 0">
                    <span class="label text-center width-full">No Data</span>
                </div>
                <div class="form-group row-group border-bottom-ol padding-full row-animation" v-else v-for="(ticket, index) in support_tickets" :key="index">
                    <div class="block-item-row " style="max-width: 72px !important">
                        <p class="label-cell ">{{index + 1}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{ticket.name_customer}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell ">{{lang_current == 'en' ? ticket.subject.name_en : (lang_current == 'vi' ? ticket.subject.name_vi : ticket.subject.name_tw)}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell">{{handle_format_date(ticket.created_on)}}</p>
                    </div>
                    <div class="block-item-row">
                        <p class="label-cell text-color-primarry bold">{{handle_translate_status(ticket.status)}}</p>
                    </div>
                    <div class="block-item-row">
                        <a class="label-cell" v-on:click="handle_detail_ticket(ticket)">{{$t('see_more')}}</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="ticket_selected">
            <div class="block-alert padding-full">
                <div class="block-header bg-title-header padding-full header-fix width-full">
                    <p class="title-form">Ticket #{{ticket_selected.code_ticket}}</p>
                </div>
                <ValidationObserver v-slot="{ invalid }" style=" width: 100%; justify-content: center; display: flex;">
                    <form class="block-form" @submit.prevent="handle_reply_ticket" style="width: 85%;">
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('user_page.subject')}}</span>
                            <ValidationProvider name="subject" rules="required" v-slot="{errors}" style="width: 100%">
                                <select name="subject"  class="list-joining" v-model="ticket_selected.subject._id" disabled>
                                    <option value="" selected>-- {{$t('user_page.select_sub')}} --</option>
                                    <option v-bind:value="item.id" v-for="(item, index) in subjects" :key="index">{{`${lang_current == 'en' ? item.name_en : (lang_current == 'vi' ? item.name_vi : item.name_tw)}`}}</option>
                                </select>
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group col-group" v-for="(message, index) in ticket_selected.history" :key="index">
                            <div class="form-group col-group">
                                <span class="label-span margin-bottom">{{$t('content')}} {{index + 1}}</span>
                                <p class="content">{{message.content}}</p>
                            </div>
                            <div class="form-group col-group" v-show="message.reply.length != 0">
                                <span class="label-span margin-bottom">{{$t('reply')}} {{index + 1}}</span>
                                <p class="content">{{message.reply}}</p>
                            </div>
                        </div>
                        <div class="form-group col-group">
                            <span class="label-span margin-bottom">{{$t('reply')}} {{$t('content')}} </span>
                            <ValidationProvider name="message" rules="required" v-slot="{errors}" style="width: 100%">
                                <textarea name="content" class="margin-bottom padding-full" cols="30" rows="5" v-model="new_reply"></textarea>
                                <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group row-group" style="justify-content: center;">
                            <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="ticket_selected = null">{{$t('cancel')}}</div>
                            <button class="btn btn-signup" :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid" v-if="ticket_selected.status != 'CLOSE'" v-on:click="handle_reply_ticket()">{{$t('reply')}}</button>
                        </div>
                    </form> 
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP_ADMIN } from '../../../../http-common';
import { socket_bus } from '../../../../main';


export default {
    data() {
        return {
            support_tickets: [],
            is_detail: false,
            ticket_selected: null,
            subjects: [], 
            new_reply:'',
            lang_current: 'en'
        }
    },
    methods: {
        handle_translate_status(state) {
            switch(state) {
                case 'OPEN':
                    return this.$t('ticket_open')
                case 'CLOSE':
                    return this.$t('ticket_close')
            }
        },
        handle_format_date(date) {
            const value_date = new Date(date)
            var date_current = value_date.getUTCDate() > 10 ? value_date.getUTCDate() : `0${value_date.getUTCDate()}`
            var month_current = value_date.getUTCMonth() + 1 > 10 ? value_date.getUTCMonth() + 1 : `0${value_date.getUTCMonth() + 1}`
            var year_current = value_date.getUTCFullYear() 
            var hour_current = value_date.getUTCHours() > 10 ? value_date.getUTCHours() : `0${value_date.getUTCHours()}`
            var minutes_current = value_date.getUTCMinutes() > 10 ? value_date.getUTCMinutes() : `0${value_date.getUTCMinutes()}`
            var second_current = value_date.getUTCSeconds() > 10 ? value_date.getUTCSeconds() : `0${value_date.getUTCSeconds()}`
            return `${date_current}/${month_current}/${year_current} ${hour_current}:${minutes_current}:${second_current}`
        },
        handle_get_tickets() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/ticket-support').then(result => {
                    resolve(result)
                    this.support_tickets = result.data.status == 200 ? result.data.data : []
                }).catch(error => {
                    reject(error)
                })
            })
        },
        handle_detail_ticket(ticket) {
            this.ticket_selected = ticket
        },
        handle_get_subject() {
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.get('/support-code').then(result => {
                    resolve(result)
                    this.subjects = result.data.status == 200 ? result.data.data : []
                })
                .catch(error => {
                    reject(error)
                    console.log('Error : ' + error);
                })
            })
        },
        handle_reply_ticket() {
            this.ticket_selected.history.map(item => {
                if(item.content.length > 0 && item.reply.length == 0) {
                    item.reply = this.new_reply
                }
            })

            var historys = this.ticket_selected.history 
            
            return new Promise((resolve, reject) => {
                HTTP_ADMIN.patch('ticket-support/reply-ticket/' + this.ticket_selected._id, historys).then(result => {
                    resolve(result)
                    if(result.data.status == 200) {
                        socket_bus.$emit('SHOW_MESSAGE', this.$t('reply_success'))
                        this.ticket_selected = null
                    } else {
                        socket_bus.$emit('SHOW_MESSAGE', this.$t('reply_fail'))
                    }
                }).catch(error => {
                    reject(error)
                    console.log('Error Update: ' + error)
                })
            })
        }
    },
    created() {
        this.handle_get_tickets()
        this.handle_get_subject()
        if(localStorage.getItem('lang')) {
            this.lang_current = localStorage.getItem('lang')
        } else {
            this.lang_current = 'vi' 
        }
    }
}
</script>