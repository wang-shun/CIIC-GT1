<template>
     <transition name="fade" mode="out-in">
        <router-view></router-view>
     </transition>
</template>
<script>
  import Http from './assets/js/http'

  export default {
    name: 'app',
    created () {
      Http._this = this
    }
  }
</script>
<style scoped>
</style>
