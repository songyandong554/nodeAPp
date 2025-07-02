<template>
  <div>
    <h2>用户列表</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userApi } from '../api'

interface User {
  id: number
  name: string
  email: string
}

const users = ref<User[]>([])

const fetchUsers = async () => {
  try {
    const response = await userApi.getUserList()
    users.value = response.data
  } catch (error) {
    console.error('获取用户列表失败:', error)
  }
}

onMounted(() => {
  fetchUsers()
})
</script>