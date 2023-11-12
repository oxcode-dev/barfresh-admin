import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.config';
import HomeView from '../views/Index.vue'
import AuthView from '../views/Auth.vue'
import ProfileView from '../views/Profile.vue'
import CategoriesView from '../views/Categories.vue'
import ReviewsView from '../views/Reviews.vue'
import FaqsView from '../views/Faqs.vue'
import ProductsView from '../views/Products.vue'
import OrdersView from '../views/orders/index.vue'
import OrderView from '../views/orders/_id.vue'
import TestView from '../views/test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '/categories', name: 'categories', component: CategoriesView, meta: { requiresAuth: true } },
    { path: '/reviews', name: 'reviews', component: ReviewsView, meta: { requiresAuth: true } },
    { path: '/faqs', name: 'faqs', component: FaqsView, meta: { requiresAuth: true } },
    { path: '/products', name: 'products', component: ProductsView, meta: { requiresAuth: true } },
    { path: '/orders', name: 'orders', component: OrdersView, meta: { requiresAuth: true } },
    { path: '/orders/:id', name: 'orders_single', component: OrderView, meta: { requiresAuth: true }, },
    { path: '/auth', name: 'auth', component: AuthView },
    { path: '/test', name: 'test', component: TestView },
  ]
})

router.beforeEach((to, from, next) => {
  let loader = document.querySelector('#loader')
  // console.log(to)

  if (to.meta.requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if(user && user.uid !== '') {
        loader.classList.add('hidden')
        next()
      }
      else {
        next('/auth');
      }
    })
  } else {
    loader.classList.add('hidden')
    next();
  }
});

export default router
