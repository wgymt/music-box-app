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
      <p class="rightP_one">{{ playlist.name }}</p>
      <div class="right_img">
        <!--用户名-->
        <img v-if="playlist.creator != null" :src="playlist.creator.backgroundUrl" alt=""/>
        <span v-if="playlist.creator != null">{{ playlist.creator.nickname }}</span>
        <!--<span>测试用户</span>-->
        <IconRight theme="outline" size=".33rem" fill="#333"
                   style="margin-top: -0.08rem; vertical-align: middle"/>
      </div>
      <p class="rightP_two">
        <!--描述-->
        <span>{{ playlist.description }}</span>
        <IconRight theme="outline" size=".24rem" fill="#333"
                   v-if="playlist.description !== '' "/>
      </p>
    </div>
  </div>

  <!--功能菜单-->
  <div class="musicDetailBottom">
    <div class="otherItem">
      <IconComments theme="outline" size=".5rem" fill="#fff"/>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="otherItem">
      <IconShareOne one theme="outline" size=".5rem" fill="#fff"/>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="otherItem">
      <IconDownload theme="outline" size=".5rem" fill="#fff"/>
      <span>下载</span>
    </div>
    <div class="otherItem">
      <IconCheckCorrect theme="outline" size=".5rem" fill="#fff"/>
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
  Right as IconRight,
  Search as IconSearch,
  ShareOne as IconShareOne
} from "@icon-park/vue-next";

const props = defineProps(['playlist'])
console.log("歌曲详情列表: ", props)

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
    }
  }

  .bgImg {
    width: 100%;
    height: 10rem;
    position: absolute;
    z-index: -1;
    filter: blur(0.6rem);
  }
}

.musicDetailMid {
  width: 100%;
  height: 3rem;
  padding: 0.2rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;

  .midLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;

    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.2rem;
      position: absolute;
      z-index: -1;
    }

    .playCount {
      position: absolute;
      right: 0.1rem;
      margin-top: 0.1rem;

      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.02rem;
        vertical-align: middle;
      }

      span {
        font-size: 0.26rem;
        color: #fff;
      }
    }
  }

  .midRight {
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .rightP_one {
      font-size: 0.3rem;
      font-weight: 900;
      color: #fff;
    }

    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #ccc;

      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
      }

      span {
        margin-left: 0.1rem;
      }
    }

    .rightP_two {
      width: 100%;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.24rem;
        color: #ccc;
      }
    }
  }
}


.musicDetailBottom {
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-around;
  margin-top: .2rem;

  .otherItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    span {
      margin-top: .1rem;
    }
  }
}
</style>
