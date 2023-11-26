<template>
  <router-view/>
  <van-sticky position="bottom">
    <MusicDetailFooter/>
  </van-sticky>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// router-link跳转是基于a标签,默认为蓝色,改为黑色
a {
  color: black;
}
</style>

<script>
import MusicDetailFooter from "@/components/detail/MusicDetailFooter.vue";

export default {
  components: {MusicDetailFooter}
}
</script>
