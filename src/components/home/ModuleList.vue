<!--首页中部区域-其他模块-->
<template>
  <div class="moduleList">
    <div class="moduleItem">
      <IconRecord theme="outline" size=".6rem" fill="#333"/>
      <span>每日推荐</span>
    </div>
    <div class="moduleItem">
      <IconFm theme="outline" size=".6rem" fill="#333"/>
      <span>私人FM</span>
    </div>
    <div class="moduleItem">
      <IconMusicMenu theme="outline" size=".6rem" fill="#333"/>
      <span>歌单</span>
    </div>
    <div class="moduleItem">
      <IconRanking theme="outline" size=".6rem" fill="#333"/>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script setup>
import {
  Fm as IconFm,
  MusicMenu as IconMusicMenu,
  Ranking as IconRanking,
  Record as IconRecord
} from "@icon-park/vue-next";</script>

<style lang="less" scoped>
.moduleList {
  margin-top: 0.2rem;
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .moduleItem {
    width: 25%;
    height: 100%;
    display: flex;
    // 垂直放置内容
    flex-direction: column;
    align-items: center;
  }
}
</style>
