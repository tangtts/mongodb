
<template>
  <div class="h-screen">
    <el-container class="h-full">
      <el-aside width="200px">
        <Side/>
      </el-aside>
      <el-container>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
  import Side from "./components/side/index.vue"
</script>