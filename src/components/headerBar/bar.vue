<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ArrowDown, Moon, Sunny} from "@element-plus/icons-vue";
import userStore from "@/pinia/modules/user.ts";

const theme = ref(false)
const user = userStore()

onMounted(() => {
  // user.register("xinsin", "xinsin", "user")
  setTimeout(() => {
    user.login("xinsin", "xinsin").then(res => {
      console.log(user.isLogin())
    })
  }, 4000)
})
</script>

<template>
  <div style="display:flex;justify-content:space-between;align-items: center">
    <div>
      <el-badge value="V3.0" class="item">
        <span style="font-size: 20px;font-weight: bolder;padding: 10px;">文件分享站</span>
      </el-badge>
    </div>
    <div style="display: flex;align-items: center;width: 200px;justify-content: space-around">
      <div>
        <el-switch
            v-model="theme"
            :active-action-icon="Moon"
            :inactive-action-icon="Sunny"
            style="--el-switch-on-color: #606266;"
        />
      </div>
      <div style="display: flex;align-items: center">
        <div style="margin-right: 10px;padding-top: 5px">
          <img :src="user.isLogin() ? '../../../public/xinsin.png' : '../../../public/UserAvatar.jpg'" alt="" width="50" height="50" style="border-radius: 50%">
        </div>
        <el-dropdown trigger="click">
          <div style="display: flex;align-items:center" class="el-dropdown-link">
            <span style="font-size: 20px;font-weight: bold">
              {{user.isLogin() ? user.userInfo.name : '请登录'}}
            </span>
            <el-icon><arrow-down/></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>