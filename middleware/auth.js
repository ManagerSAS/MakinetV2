import store from '@/store/store.js'
export default function ({ route, redirect }) {
  const isAuthenticated = store.getters.isAuthenticated

  if (route.meta.requiresAuth && !isAuthenticated) {
    return redirect('/')
  }
}


