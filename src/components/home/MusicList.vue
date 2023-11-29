<!--首页中下区域-歌单列表-->
<template>
  <div class="itemListTop">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicMid">
      <van-swipe :loop="false" :width="150" class="musicListSwiper" :show-indicators="false">
        <van-swipe-item v-for="item in musicList" :key="item">
          <!--路由跳转到对应的歌单列表-->
          <router-link :to="{path: '/albumDetail', query:{id: item.id}}">
            <!--歌曲封面地址-->
            <img :src="item.picUrl" alt="">
            <!--歌曲播放次数-->
            <span class="playCount">
          <IconPlayOne theme="outline" size=".5rem" fill="#333"/>
            {{ changeCountUnit(item.playCount) }}
          </span>
            <!--歌名-->
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="musicBottom">
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getMusicList} from "@/request/api/home.js";
import {PlayOne as IconPlayOne} from "@icon-park/vue-next";

const musicList = ref([])

onMounted(async () => {
  const res = await getMusicList()
  musicList.value = res.data.result
})

// 转换计算单位
function changeCountUnit(playCount) {
  if (playCount >= 100000000) {
    return (playCount / 100000000).toFixed(1) + "亿"
  } else if (playCount >= 10000) {
    return (playCount / 10000).toFixed(1) + "万"
  }
}
</script>

<style lang="less" scoped>
.itemListTop {
  width: 100%;
  height: 5rem;
  padding: .2rem;

  .musicTop {
    width: 100%;
    height: .6rem;
    justify-content: space-between;
    display: flex;
    margin-bottom: 0.2rem;

    .title {
      font-size: .4rem;
      font-weight: 900;
    }

    .more {
      border: 0.02rem solid #ccc;
      text-align: center;
      line-height: .6rem;
      border-radius: .4rem;
    }
  }

  .musicMid {
    width: 100%;
    height: 4rem;

    .musicListSwiper {
      height: 100%;

      img {
        width: 100%;
        height: 65%;
        padding: .1rem;
        border-radius: .3rem;
      }

      .playCount {
        position: absolute;
        z-index: 100;
        right: .3rem;
        color: white;
        margin-top: .06rem;

        .i-icon-play-one {
          width: .3rem;
          height: .3rem;
        }
      }

      .name {
        bottom: 0;
      }
    }
  }
}
</style>
