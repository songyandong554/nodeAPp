<template>
  <div class="home">
    <h1>欢迎来到首页{{ test.message }}</h1>
    <p>这是一个使用2222222222222222222ue 3 + TypeScript + Vite 构建的应用</p>

    <div class="navigation">
      <router-link to="/about" class="nav-link">关于我们</router-link>
      <router-link to="/users" class="nav-link">用户列表</router-link>
      <router-link to="/dashboard" class="nav-link">仪表板</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { userApi } from "../api";

const test = reactive({ message: "" });
onMounted(async () => {
  console.log("首页组件已挂载");
  const res = await userApi.getTest();
  test.message = res.message;
  console.log(res);
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.navigation {
  margin-top: 2rem;
}

.nav-link {
  display: inline-block;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #369870;
}
</style>
