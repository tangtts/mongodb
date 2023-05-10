<template>

<el-aside width="200px" class="h-full">
      <el-scrollbar>
        <el-menu  router>
          <el-sub-menu index="/student">
            <template #title>
              <el-icon><message /></el-icon>
              学生管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="student">基本信息</el-menu-item>
              <el-menu-item index="grades">成绩管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="/teacher">
            <template #title>
              <el-icon><message /></el-icon>
              教师管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="teacher">基本信息</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="/class">
            <template #title>
              <el-icon><message /></el-icon>
              班级管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="class">基本信息</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

        </el-menu>
      </el-scrollbar>
    </el-aside>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

</script>
<style lang="scss">

</style>