<!--获取歌单详情页上半区域-->
<template>
  <!--导航栏-->
  <div class="musicDetailTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgImg"/>
    <div class="detailLeft">
      <IconArrowLeft theme="outline" size=".5rem" @click="$router.go(-1)"/>
      <span>歌单</span>
    </div>
    <div class="detailRight">
      <IconSearch theme="outline" size=".5rem"/>
      <IconHamburgerButton theme="outline" size=".5rem"/>
    </div>
  </div>

  <!--歌单信息-->
  <div class="musicDetailMid">
    <!--左侧图片-->
    <div class="midLeft">
      <img :src="playlist.coverImgUrl" alt=""/>
      <div class="playCount">
        <IconPlayOne theme="outline" size=".5rem" fill="#333"/>
        <span>{{ changeCountUnit(playlist.playCount) }}</span>
      </div>
    </div>
    <!--右侧歌单信息-->
    <div class="midRight">
      <!--标题-->
      <p>chek</p>
      <span>{{ playlist.name }}}</span>
      <div class="musicInfo">
        <!--用户名-->
        <span>{{ playlist.name }}</span>
        <!--描述-->
        <span>{{ playlist.description }}</span>
      </div>
    </div>
  </div>

  <!--功能菜单-->
  <div class="musicDetailBottom">
    <div class="otherItem">
      <IconComments theme="outline" size=".5rem" fill="#333"/>
      <span>40</span>
    </div>
    <div class="otherItem">
      <IconShareOne one theme="outline" size=".5rem" fill="#333"/>
      <span>分享</span>
    </div>
    <div class="otherItem">
      <IconDownload theme="outline" size=".5rem" fill="#333"/>
      <span>下载</span>
    </div>
    <div class="otherItem">
      <IconCheckCorrect theme="outline" size=".5rem" fill="#333"/>
      <span>多选</span>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowLeft as IconArrowLeft,
  CheckCorrect as IconCheckCorrect,
  Comments as IconComments,
  Download as IconDownload,
  HamburgerButton as IconHamburgerButton,
  PlayOne as IconPlayOne,
  Search as IconSearch,
  ShareOne as IconShareOne
} from "@icon-park/vue-next";

const props = defineProps(['playlist'])
console.log(props.playlist)

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
.musicDetailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .detailLeft, .detailRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .2rem;

    span {
      font-size: .4rem;
      color: white;
    }

    .i-icon {
      fill: white;
    }
  }

  .bgImg {
    width: 100%;
    height: 10rem;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
  }
}

.musicDetailMid {
  width: 100%;
  height: 2rem;

  .musicAvatar {
    width: 100%;
    height: 3rem;
    position: fixed;
  }
}

.musicDetailBottom {
  margin-top: 0.2rem;
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .otherItem {
    width: 25%;
    height: 100%;
    display: flex;
    // 垂直放置内容
    flex-direction: column;
    align-items: center;
  }
}
</style>
