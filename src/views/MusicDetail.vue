<!--歌单详情-->
<template>
  <MusicDetailTop :playlist='playlist'/>
  <MusicDetailBottom :songs='songs' :subscribedCount='playlist.subscribedCount'/>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getMusicDetailList, getMusicList} from "@/request/api/musicDetail.js";
import MusicDetailTop from "@/components/detail/MusicDetailTop.vue";
import MusicDetailBottom from "@/components/detail/MusicDetailBottom.vue";

const playlist = ref({})
const songs = ref({});

onMounted(async () => {
  const id = useRoute().query.id
  // 根据id获取歌单详情
  const detailRes = await getMusicDetailList(id)
  playlist.value = detailRes.data.playlist
  // 根据id获取歌单所有歌曲
  const musicRes = await getMusicList(id)
  // console.log(musicRes.data.songs)
  songs.value = musicRes.data.songs
})
</script>
