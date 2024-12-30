<script setup lang="ts">
import HomeMenu from "@/components/menu/homeMenu.vue";
import Bar from "@/components/headerBar/bar.vue";
</script>

<template>
  <el-container style="height: 100vh">
    <el-header class="header-item" style="border-radius: 10px 10px 10px 0">
      <bar/>
    </el-header>
    <el-container>
      <el-aside width="70px" class="header-item" style="border-radius: 0 0 10px 10px">
        <home-menu/>
      </el-aside>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
.header-item {
  background-color: rgb(224.6, 242.8, 215.6);
  border-radius: 10px;
}
</style>