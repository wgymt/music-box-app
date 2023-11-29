<template>
  <img :src="musicList.al?.picUrl" alt="" class="bgImage">

  <div class="detailTop">
    <div class="detailTopLeft">
      <IconArrowLeft theme="outline" size=".7rem" @click="back"/>
      <div class="leftMarquee ">
        <!--<marquee behavior="" direction="" style="color: white">-->
        <!--歌名-->
        {{ musicList.name }}
        <!--</marquee>-->
        <!--歌手-->
        <span v-for="item in musicList.ar" :key="item">{{ item.name }}</span>
        <!--歌手右侧小箭头-->
        <IconRight theme="outline" size=".33rem" fill="#999"
                   style="margin-top: -0.08rem; vertical-align: middle"/>
      </div>
    </div>
    <div class="detailTopRight">
      <!--分享图标-->
      <IconShareOne one theme="outline" size=".7rem" fill="#fff"/>
    </div>
  </div>

  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" alt="" class="img_needle"
         :class="{img_needle_active:!isBtnShow}"/>
    <img src="@/assets/cd.png" alt="" class="img_cd"/>
    <img :src="musicList.al?.picUrl" alt="" class="img_ar"
         @click="isLyricShow=true"
         :class="[!isBtnShow ? 'img_ar_active' : 'img_ar_pause']"
    />
  </div>

  <div class="lyric" ref="currentLyric" v-show="isLyricShow" @click="isLyricShow=false">
    <p v-for="item in lyricHandler" :key="item"

       :class="{active: currentTime>= item.time && currentTime < item.pre}">
      {{ item.lrcChar }}</p>
  </div>

  <div class="detailFooter">
    <div class="footerTop">
      <IconLike theme="outline" size=".7rem" fill="#333"/>
      <IconDownload theme="outline" size=".7rem" fill="#333"/>
      <IconRecord theme="outline" size=".7rem" fill="#333"/>
      <IconComment theme="outline" size=".7rem" fill="#333"/>
      <IconSwitch theme="outline" size=".7rem" fill="#333"/>
    </div>
    <div class="footerContent"></div>
    <div class="footer">
      <IconLoopOnce theme="outline" size=".7rem" fill="#333"/>
      <!--上一首-->
      <IconGoStart theme="outline" size=".7rem" fill="#333" @click="goPlay(-1)"/>
      <!--播放-->
      <IconPlay theme="outline" size="1.2rem" fill="#333" @click="play" v-if="isBtnShow"/>
      <!--暂停-->
      <IconPauseOne theme="outline" size="1.2rem" fill="#333" @click="stop" v-else/>
      <!--下一首-->
      <IconGoEnd theme="outline" size=".7rem" fill="#333" @click="goPlay(1)"/>
      <IconMusicList theme="outline" size=".7rem" fill="#333"/>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowLeft as IconArrowLeft,
  Comment as IconComment,
  Download as IconDownload,
  GoEnd as IconGoEnd,
  GoStart as IconGoStart,
  Like as IconLike,
  LoopOnce as IconLoopOnce,
  MusicList as IconMusicList,
  PauseOne as IconPauseOne,
  Play as IconPlay,
  Record as IconRecord,
  Right as IconRight,
  ShareOne as IconShareOne,
  Switch as IconSwitch
} from "@icon-park/vue-next";
import {computed, ref, watch} from "vue";
import {useMapState} from "@/hooks/useMapState.js";
import {useStore} from "vuex";


const props = defineProps(['musicList', 'play', 'stop', 'isBtnShow'])

const store = useStore()
const back = () => {
  store.commit('updateDetailShow')
}

const {
  playListIndex,
  detailShow,
  lyricList,
  currentTime,
  playList
} = useMapState(['playList', 'playListIndex', 'currentTime', 'detailShow', 'lyricList'])

const isLyricShow = ref(false);

// 处理歌词,展示歌词
const lyricHandler = computed(() => {
  let arr = []
  let lrc = lyricList.value.lyric
  if (lrc === '') {
    arr[0] = {lrcChar: '诶嘿, 找不到歌词哦'}
    return arr
  }
  let num = /\d{2,3}/g
  let ch = /](.*)/g
  let lrcArr = lrc.trim().split('\n')
  for (let i = 0; i < lrcArr.length; i++) {
    let item = lrcArr[i];
    let numList = item.match(num)
    let min = Number(numList[0])
    let sec = Number(numList[1])
    let millionSec = Number(numList[2])
    let chList = item.match(ch)
    let lrcChar = chList[0].replace(']', '')
    let time = min * 60 + sec + '.' + millionSec
    arr[i] = {min, sec, millionSec, lrcChar, time}
  }
  arr.forEach((item, i) => {
    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
      item.pre = 100;
    } else {
      item.pre = arr[i + 1].time
    }
  })
  return arr
})

const currentLyric = ref()
// 监听当前歌词(p标签),实现自动滚动效果
watch(() => currentTime.value, () => {
      let p = document.querySelector("p.active")
      if (p && p.offsetTop > 300) {
        currentLyric.value.scrollTop = p.offsetTop - 300
      }
    }
)

// 上一首/下一首
const goPlay = (num) => {
  let index = playListIndex.value + num
  if (index < 0) {
    index = playList.value.length - 1
  }
  if (index === playList.value.length) {
    index = 0
  }
  store.commit('updatePlayListIndex', index)
  props.play()
}
</script>

<style lang="less" scoped>
.bgImage {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  // 背景虚化
  filter: blur(1.4rem);
}

.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: .2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;

  .detailTopLeft {
    display: flex;
    align-items: center;

    .leftMarquee {
      padding-top: .3rem;
      width: 2rem;
      height: 100%;
      margin-left: .4rem;

      span {
        color: #999;
      }
    }
  }

  .detailTopRight {

  }
}

.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }

  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }

  .img_ar_active {
    animation-play-state: running;
  }

  .img_ar_pause {
    animation-play-state: paused;
  }

  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}

.lyric {
  width: 100%;
  height: 9rem;
  display: flex;
  // 垂直排列
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  overflow: scroll;

  p {
    margin-bottom: 0.3rem;
  }

  .active {
    color: yellowgreen;
    font-size: 0.5rem;
  }
}

.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    //.icon {
    //  width: 0.36rem;
    //  height: 0.36rem;
    //  fill: rgb(245, 234, 234);
    //}
    //.icon {
    //  width: 0.6rem;
    //  height: 0.6rem;
    //}
  }

  //.range {
  //  width: 100%;
  //  height: 0.06rem;
  //}
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    //.icon {
    //  fill: rgb(245, 234, 234);
    //}
    //.bofang {
    //  width: 1rem;
    //  height: 1rem;
    //}
  }
}
</style>
