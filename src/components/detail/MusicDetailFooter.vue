<template>
  <div class="footerMusic">
    <div class="footerLeft">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div>
        <p>{{ playList[playListIndex].al.name }}</p>
        <!--<span>横滑切换上下首哦</span>-->
        <span>{{ playList[playListIndex].id !== 0 ? "横滑切换上下首哦" : "目前尚无播放曲目" }}</span>
      </div>
    </div>
    <div class="footerRight">
      <IconPlay theme="outline" size=".6rem" fill="#333" @click="playMusic()" v-if="isBtnShow"/>
      <IconPauseOne theme="outline" size=".6rem" fill="#333" @click="stopMusic()" v-else/>
      <IconFind theme="outline" size=".6rem" fill="#333"/>
      <audio ref="audio"
             :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    </div>
  </div>
</template>

<script setup>
import {Find as IconFind, PauseOne as IconPauseOne, Play as IconPlay,} from "@icon-park/vue-next";
import {useStore} from "vuex";
import {computed, ref} from "vue";

const store = useStore()

const playList = computed(() => store.state.playList)
const playListIndex = computed(() => store.state.playListIndex)
// 不能使用.value,会导致不能判断true/false,进而不能改变按钮状态
// ComputedRefImpl是响应式对象,在模板中会自动解包
const isBtnShow = computed(() => store.state.isBtnShow)

console.log("isBtnShow 内容为: ", isBtnShow);

// 获取audio元素内容, 相当于Vue2 this.$refs
const audio = ref()

function playMusic() {
  // 防止歌曲没放完就结束
  setTimeout(() => {
    audio.value.play()
    startPlaying()
  }, 200)
}

function startPlaying() {
  audio.value.volume = 0.05
  store.commit('updateIsBtnShow', false)
  console.log("sp: ", isBtnShow.value)
}

function stopMusic() {
  audio.value.pause()
  store.commit('updateIsBtnShow', true)
  console.log("sm: ", isBtnShow.value)
}
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
    width: 58%;
    height: 96%;
    display: flex;
    justify-content: space-around;
    align-items: center;

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
