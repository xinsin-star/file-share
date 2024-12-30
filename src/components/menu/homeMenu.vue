<script setup lang="ts">
import {Message, Notebook} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
  <el-menu
      :default-active="route.path"
      :collapse="true"
      router
      background-color="#E1F3D8"
      active-text-color="#B3E19D"
      style="border: none"
  >
    <el-menu-item index="/index">
      <el-icon><Message /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon><Notebook /></el-icon>
      <template #title>我的</template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>