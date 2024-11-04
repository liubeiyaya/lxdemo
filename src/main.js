import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)


new Vue({
  render: h => h(App),
}).$mount('#app')
