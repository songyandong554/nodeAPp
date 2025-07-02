<template>
  <div class="user-detail">
    <h1>用户详情</h1>
    <div v-if="loading">加载中...</div>
    <div v-else-if="user">
      <h2>{{ user.name }}</h2>
      <p>邮箱: {{ user.email }}</p>
      <p>ID: {{ user.id }}</p>
    </div>
    <div v-else>
      用户不存在
    </div>
    
    <router-link to="/users" class="back-link">返回用户列表</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { userApi } from '../api'

interface User {
  id: number
  name: string
  email: string
}

const route = useRoute()
const user = ref<User | null>(null)
const loading = ref(true)

const fetchUser = async () => {
  try {
    const userId = Number(route.params.id)
    const response = await userApi.getUserById(userId)
    user.value = response.data
  } catch (error) {
    console.error('获取用户详情失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
.user-detail {
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>