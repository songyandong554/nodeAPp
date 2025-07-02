import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import UserList from "../components/UserList.vue";

// 定义路由

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "关于我们",
    },
  },
  {
    path: "/users",
    name: "UserList",
    component: UserList,
    meta: {
      title: "用户列表",
    },
  },
  {
    path: "/user/:id",
    name: "UserDetail",
    component: () => import("../views/UserDetail.vue"), // 懒加载
    meta: {
      title: "用户详情",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录",
      requiresAuth: false,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      title: "仪表板",
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: {
      title: "页面未找到",
    },
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);

    // 路由切换时的滚动行为
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - NodeApp`;
  }

  // 检查是否需要登录
  const token = localStorage.getItem("token");
  const requiresAuth = to.meta.requiresAuth;
  console.log(from);

  if (requiresAuth && !token) {
    // 需要登录但没有token，跳转到登录页
    next({ name: "Login", query: { redirect: to.fullPath } });
  } else if (to.name === "Login" && token) {
    // 已登录用户访问登录页，跳转到首页
    next({ name: "Home" });
  } else {
    next();
  }
});

// 全局后置钩子
router.afterEach((to, from) => {
  console.log(to, from);

  // 可以在这里添加页面访问统计等逻辑
  //   console.log(`从 ${from.name} 跳转到 ${to.name}`);
});

export default router;
