<script setup lang="ts">
import {onMounted, ref} from "vue";
import request from "@/utils/request.ts";

const data = ref()
const loading = ref(false)

const update = () => {
  loading.value = true
  request({
    url: '/file/get',
    params: {
      page: 1,
      num: 10,
      folder: -1,
      sort: 'TIME',
      reverse: false
    },
    method: 'get'
  }).then(res => {
    loading.value = false
    data.value = res.data
  }).catch(() => {loading.value = false})
}
onMounted(() => {
  update()
})
</script>

<template>
  <div v-loading="loading">
    dsadasxs
  </div>
</template>

<style scoped>

</style>