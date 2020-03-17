<template>
  <div id="app">
    <div class="container" style="padding-bottom: 100px; max-height: 100vh; overflow: hidden; ">
      <nav_top></nav_top>
      <div class="flex-box container" style="height: 100%">
        <nav_left></nav_left>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import nav_top from '../Units/NavTop'
import nav_left from '../Units/NavLeft'

export default {
  name: 'app',
  components: {
   nav_top, nav_left
  },
  data() {
    return  {

    }
  },
  methods: {

  },
  created() {
    
  }
}
</script>

