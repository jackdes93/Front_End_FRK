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

import nav_top from '../User/core/NavTop'
import nav_left from '../User/core/NavLeft'
import block_alert from '../../Units/Block_Alert'
import block_notification  from '../../Units/Block_Notification'
import { router } from '../../../routers';
import { HTTP } from '../../../http-common' 

export default {
  components: {
   nav_top, nav_left,block_alert, block_notification
  },
  data() {
    return {

    }
  },
  methods: {
    handle_re_check_token() {
      const token = localStorage.getItem('access_token')
      return new Promise((resolve, reject) => {
          HTTP.post('/customers/token/detect', {token: token}).then(result => {
            resolve(result)
            if(result.data.status == 500) {
              router.push('/login')
            }
          }).catch(error => {
              reject(error)
          })
      })
    }
  },
  created() {
    if(!localStorage.getItem('access_token')) {
        router.push('/login')
    } else {
      this.handle_re_check_token()
      setInterval(() => {
          this.handle_re_check_token()
      }, 900000)
    }
  }
}
</script>
