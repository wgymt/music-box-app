import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@icon-park/vue-next/styles/index.less'
import getVant from "@/plugins/vantInput.js";
import Vue3Marquee from 'vue3-marquee'

const app = createApp(App)
    .use(Vue3Marquee)
    .use(store)
    .use(router);

// 导入Vant组件
getVant(app);

app.mount('#app')
