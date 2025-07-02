<template>
  <div class="dashboard">
    <h1>仪表板</h1>
    <p>这是需要登录才能访问的页面</p>
    
    <div class="stats">
      <div class="stat-card">
        <h3>用户总数</h3>
        <p class="stat-number">1,234</p>
      </div>
      <div class="stat-card">
        <h3>今日访问</h3>
        <p class="stat-number">567</p>
      </div>
      <div class="stat-card">
        <h3>活跃用户</h3>
        <p class="stat-number">89</p>
      </div>
    </div>
    
    <button @click="logout" class="logout-btn">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #42b883;
  margin: 0;
}

.logout-btn {
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>