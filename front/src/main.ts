import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import tabBar from '@/components/common/tabBar/tabBar.vue'
import './static/css/iconfont.css'

// @ts-ignore
// import hljs from 'highlight'

const app = createSSRApp(App)
app.component('tabBar', tabBar)


// 这里可以切换不同的主题
// import 'highlight/styles/a11y-dark.css'

export function createApp() {
  app.use(pinia)
  return {
    app
  }
}
