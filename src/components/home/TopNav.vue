<!--首页上半区导航栏-->
<template>
  <div class="topNav">
    <div class="topLeft">
      <IconMusicList theme="outline" size=".5rem" fill="#333"/>
    </div>
    <div class="topMid">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <IconSearch theme="outline" size=".5rem" fill="#333"/>
    </div>
  </div>
</template>
<script setup>
import {MusicList as IconMusicList, Search as IconSearch} from "@icon-park/vue-next";</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  padding: .2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .topMid {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 0.36rem;

    .active {
      font-weight: 900;
    }
  }
}
</style>
