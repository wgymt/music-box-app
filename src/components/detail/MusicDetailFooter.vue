<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div class="textArea">
        <p>{{ playList[playListIndex].name }}</p>
        <!--<span>横滑切换上下首哦</span>-->
        <span>{{ playList[playListIndex].id !== 0 ? "横滑切换上下首哦" : "目前尚无播放曲目" }}</span>
      </div>
    </div>
    <div class="footerRight">
      <IconPlay theme="outline" size=".6rem" fill="#333" @click="playMusic" v-if="isBtnShow"/>
      <IconPauseOne theme="outline" size=".6rem" fill="#333" @click="stopMusic" v-else/>
      <IconFind theme="outline" size=".6rem" fill="#333"/>
    </div>
    <audio ref="audio" @timeupdate="updateTime"
           :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`">
    </audio>
    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }">
      <MusicDetail :musicList="playList[playListIndex]"
                   :play="playMusic" :stop="stopMusic"
                   :isBtnShow="isBtnShow"/>
    </van-popup>
  </div>
</template>

<script setup>
import {Find as IconFind, PauseOne as IconPauseOne, Play as IconPlay,} from "@icon-park/vue-next";
import {useStore} from "vuex";
import {onMounted, ref, watch} from "vue";
import {useMapState} from "@/hooks/useMapState.js";
import MusicDetail from "@/components/detail/MusicDetail.vue";

const store = useStore()

// 获取state中的属性(皆为computed响应式对象)
const {playList, playListIndex, isBtnShow, detailShow} =
    useMapState(['playList', 'playListIndex', 'isBtnShow', 'detailShow'])

onMounted(() => {
  store.dispatch("getLyric", playList.value[playListIndex.value].id)
})

// 获取audio元素内容, 相当于Vue2 this.$refs
const audio = ref()

const updateDetailShow = () => {
  store.commit('updateDetailShow')
}

function playMusic() {
  // 防止歌曲没放完就结束
  setTimeout(() => {
    audio.value.play()
    audio.value.volume = 0.1
    store.commit('updateIsBtnShow', false)
    // updateTime()
  }, 200)
}

function stopMusic() {
  audio.value.pause()
  store.commit('updateIsBtnShow', true)
  // clearInterval(interVal.value)
}

// 更新当前播放的时间节点
// const interVal = ref(0)
const updateTime = (e) => {
  // interVal.value = setInterval(() => {
  store.commit('updateCurrentTIme', e.target.currentTime)
  // }, 50)
}
/**
 * playListIndex为computed响应式对象,非模板使用需要.value
 * 监听歌曲id,如果变化,则播放对应的歌曲
 * 因为id为0,监听id的话是不变化的,所以还要监听下面的:
 * - 同时监听歌单列表变化,解决歌单第一首歌不播放问题
 * - 同时监听按钮状态
 */
watch(() => [playListIndex.value, playList.value],
    (newIndex, newPlayList) => {
      if (playListIndex.value !== newIndex
          || playList !== newPlayList
          || isBtnShow.value) {
        audio.value.autoplay = true
      }
      // 更改暂停按钮
      audio.value.volume = 0.1
      store.commit('updateIsBtnShow', false)
    })

/**
 * 监听歌单内歌曲的序号变更,动态获取歌词
 */
watch(() => [playListIndex.value], (newIndex) => {
  if (playListIndex.value !== newIndex) {
    store.dispatch("getLyric", playList.value[playListIndex.value].id)
  }
})
</script>

<style lang="less" scoped>
.footerMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 0.02rem solid #999;
  display: flex;
  padding: .2rem;
  justify-content: space-between;

  .footerLeft {
    width: 65%;
    height: 96%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .textArea {
      padding-left: .1rem;
    }

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
