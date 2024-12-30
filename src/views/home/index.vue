<script setup lang="ts">
</script>

<template>
  <el-container style="height: 100vh">
    <el-header>
      <div style="display:flex;">
        <div>
          <h2>文件分享站V2.0</h2>
        </div>
        <div>
          <img src="../../../public/UserAvatar.jpg" alt="" width="50">
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="50px">
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
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

</style>