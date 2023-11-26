<!--获取歌单详情-->
<template>
  <MusicDetailTop :playlist='playlist'/>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getMusicDetailList} from "@/request/api/musicDetail.js";
import MusicDetailTop from "@/components/detail/MusicDetailTop.vue";

const playlist = ref({})

onMounted(async () => {
  const id = useRoute().query.id
  const res = await getMusicDetailList(id)
  playlist.value = res.data.playlist
})
</script>
