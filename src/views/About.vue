<template>
  <div class="about">
    <h1>关于我们</h1>
    <p>这是关于页面的内容</p>
    
    <router-link to="/" class="back-link">返回首页</router-link>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
</script>

<style scoped>
.about {
  padding: 2rem;
  text-align: center;
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