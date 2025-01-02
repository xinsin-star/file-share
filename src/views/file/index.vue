<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import request from "@/utils/request.ts";
import {Files, Folder} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const data = ref()
const loading = ref(false)
const page = reactive({
  page: 1,
  num: 10,
  total: 400
})
const separatorList = reactive([{'id': '-1'}])
const queryParams = reactive({
  folder: separatorList[0].id,
  sort: 'TIME',
  reverse: false
})

const update = () => {
  loading.value = true
  request({
    url: '/file/get',
    params: {
      page: page.page,
      num: page.num,
      folder: queryParams.folder,
      sort: queryParams.sort,
      reverse: queryParams.reverse
    },
    method: 'get'
  }).then(res => {
    loading.value = false
    data.value = res.data.data
    page.total = res.data.total
    data.value = [
      {
        name: '.',
        type: 'flag'
      },
      {
        name: '..',
        type: 'flag'
      },
      ...data.value
    ]
  }).catch(() => {loading.value = false})
}
const push = (row) => {
  queryParams.folder = row.id
  separatorList.push(row)
  update()
}
const back = (row) => {
  if (row.name === '.') {
    update()
    return
  }
  if (separatorList.length === 1) {
    ElMessage.warning("当前已经是最顶层了!")
    return
  }
  separatorList.pop()
  queryParams.folder = separatorList[separatorList.length - 1].id
  update()
}
const copy = (index) => {
  let copyString = separatorList.filter(item => item.name).splice(0, index).map(item1 => item1.name).join('/')
  copyString = "/" + copyString
  navigator.clipboard.writeText(copyString).then(() => {
    ElMessage.success(`已成功将${copyString}复制到剪贴板`)
  })
}

onMounted(() => {
  update()
})
</script>

<template>
  <div v-loading="loading" style="background-color: white">
    <div>
      <div>
        <span>当前路径: </span>
        <span>
          <span v-for="(item, index) in separatorList" :key="index">
            <span v-if="item.id === '-1' && separatorList.length === 1">
              /
            </span>
            <span v-if="item.id !== '-1'">
              /<el-tag @click="copy(index)">{{item.name}}</el-tag>
            </span>
          </span>
        </span>
      </div>
      <div>
        <el-table :data="data" style="width: 100%" border stripe>
          <el-table-column label="名字">
            <template #default="scope">
              <div v-if="scope.row.type === 'FILE'">
              <span>
                <el-icon><Files /></el-icon>
                {{scope.row.name + '.' + scope.row.ext}}
              </span>
              </div>
              <div v-else-if="scope.row.type === 'flag'" @click="back(scope.row)">
                <span>
                  {{scope.row.name}}
                </span>
              </div>
              <div v-else @click="push(scope.row)">
                <el-icon><Folder /></el-icon>
                {{scope.row.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ownerName" label="上传人" />
          <el-table-column prop="time" label="上传时间" />
        </el-table>
      </div>
      <div style="display: flex;justify-content: right">
        <el-pagination
            v-model:current-page="page.page"
            v-model:page-size="page.num"
            :page-sizes="[10, 20, 50, 100]"
            layout="sizes, prev, pager, next, jumper"
            :total="page.total"
            @size-change="update"
            @current-change="update"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>