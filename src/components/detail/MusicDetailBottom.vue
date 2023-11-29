<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <IconPlay theme="outline" size=".5rem" fill="#333"/>
        <span>播放全部 共{{ songs.length }}</span>
      </div>
      <div class="listRight">
        <IconPlus theme="outline" size=".5rem" fill="#333"/>
        <span>收藏
        <span v-if="subscribedCount != null">{{ subscribedCount }}</span>
        </span>
      </div>
    </div>

    <div class="itemList">
      <div class="item" v-for="(song , index) in songs" :key="index">
        <div class="itemLeft" @click="playSong(songs, index)">
          <!--歌曲编号-->
          <span class="leftSpan">{{ index + 1 }}</span>
          <div>
            <!--歌曲名-->
            <p>{{ song.name }}</p>
            <!--作者名,可能有多个,循环取出来-->
            <span v-for="(s , sIndex) in song.ar" :key="sIndex">
                {{ s.name + ' ' }}
              </span>
          </div>
        </div>
        <div class="itemRight">
          <IconPlayTwo theme="outline" size=".5rem" fill="#999"
                       style="position: absolute; left: 0"
                       v-if="song.mv !== 0"/>
          <IconHamburgerButton theme="outline" size=".5rem" fill="#999"
                               style="position: absolute; right: 0"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  HamburgerButton as IconHamburgerButton,
  Play as IconPlay,
  PlayTwo as IconPlayTwo,
  Plus as IconPlus
} from "@icon-park/vue-next";
import {useStore} from "vuex";

const props = defineProps(['songs', 'subscribedCount'])

const store = useStore()

// 点击播放歌曲
function playSong(playList, songIndex) {
  store.commit('updatePlayList', playList)
  store.commit('updatePlayListIndex', songIndex)
}
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 .2rem;
  margin-top: .2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;

  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .listLeft {
      width: 3rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-weight: 700;

        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
      }
    }

    .listRight {
      display: flex;
      align-items: center;
      background-color: red;
      padding: 0.2rem;
      border-radius: 0.4rem;
      color: #fff;
    }
  }

  .itemList {
    width: 100%;
    // 解决只显示19条的问题(总共20条)
    position: relative;
    padding-bottom: 1.5rem;

    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;

        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }

        div {
          p {
            width: 4.54rem;
            height: .4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }

          span {
            font-weight: 400;
            font-size: .24rem;
            color: #999;
          }

          margin-left: 0.3rem;
        }
      }

      .itemRight {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
      }
    }
  }
}
</style>
