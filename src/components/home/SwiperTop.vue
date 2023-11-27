<!--首页上半区导航栏-->
<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image.pic" alt="轮播图demo"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getBanners} from "@/request/api/home.js";

const images = ref([]);

onMounted(async () => {
  const res = await getBanners()
  images.value = res.data.banners
})

</script>

<style lang="less" scoped>
#swiperTop {
  .van-swipe {
    width: 100%;
    padding: 0.2rem;

    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 3rem;
        }
      }
    }

    // 想要在scoped中影响子组件样式,使用深度选择器v-deep
    :deep (.van-swipe__indicators) {
      .van-swipe__indicator--active {
        background-color: rgb(219, 130, 130);
      }
    }
  }
}
</style>
