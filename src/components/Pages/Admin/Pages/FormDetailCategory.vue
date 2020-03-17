<template>
    <div class="block-model" style="background: rgba(0,0,0,.5)" v-if="is_show">
        <div class="block-alert padding-full">
            <div class="block-header bg-title-header padding-full header-fix width-full">
                <p class="title-form">{{category.name}}</p>
            </div>
            <ValidationObserver v-slot="{ invalid }" style=" width: 100%; justify-content: center; display: flex;">
                <form class="block-form">
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('name')}} </span>
                        <ValidationProvider name="name_category" rules="required" v-slot="{errors}" style="width: 100%">
                            <input type="text" class="border-bottom-ol margin-bottom" name="name_category" v-model="category.name">
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group col-group">
                        <span class="label-span margin-bottom">{{$t('descrip')}} </span>
                        <ValidationProvider name="description" rules="required" v-slot="{errors}" style="width: 100%">
                            <input type="text" class="border-bottom-ol margin-bottom" name="description" v-model="category.description">
                            <span class="error-text margin-fix-top" >{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="form-group row-group" style="justify-content: center;">
                        <div class="btn btn-cancel margin-fix-right" style="color: #ED6B28; border: 1px solid #ED6B28" v-on:click="handle_close()">{{$t('cancel')}}</div>
                        <button class="btn btn-signup " :class="{'bg-title-header': !invalid, 'disable-button' : invalid}" :disabled="invalid">{{$t('save')}}</button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import {socket_bus } from '../../../../main'

export default {
    data() {
        return {
            is_show: false,
            category: {}
        }
    },
    methods : {
        handle_close() {
            socket_bus.$emit('CANCEL_ADD_BRAND', {state: false})
        }
    },
    created() {
        socket_bus.$on('EDIT_CATEGORY', (result) => {
            this.category = result.data
            this.is_show = true
        })
    }
}
</script>