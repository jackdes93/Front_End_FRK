<template>
    <div class="container" style="padding-bottom: 100px; max-height: 100vh; overflow: hidden; ">
      <nav_top></nav_top>
      <div class="flex-box container" style="height: 100%">
        <nav_left></nav_left>
        <router-view></router-view>
      </div>
      <block_alert></block_alert>
      <block_notification></block_notification>
    </div>
</template>

<script>

import nav_top from '../Admin/Units/NavTop'
import nav_left from '../Admin/Units/NavLeft'
import { router } from '../../../routers';
import block_alert from '../../Units/Block_Alert'
import {HTTP_ADMIN} from '../../../http-common';
import block_notification from '../../Units/Block_Notification'
export default {
  components: {
   nav_top, nav_left, block_alert, block_notification
  },
  data() {
    return {

    }
  },
  methods: {
     handle_re_check_token() {
      const token = localStorage.getItem('token_manager')
      return new Promise((resolve, reject) => {
          HTTP_ADMIN.post('/admin/check-token', {token: token}).then(result => {
            resolve(result)
            if(result.data.status == 500) {
              window.localStorage.clear()
              router.push('/manager-login')
            }
          }).catch(error => {
              reject(error)
          })
      })
    }
  },
  created() {
    if(!localStorage.getItem('token_manager')) {
        router.push('/manager-login')
    } else {
      this.handle_re_check_token()
      setInterval(() => {
          this.handle_re_check_token()
      }, 900000)
    }
  }
}
</script>
