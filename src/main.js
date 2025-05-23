import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/main.css';

// 引入希伯来语语言包
import he from 'element-plus/es/locale/lang/he';

const app = createApp(App);

// 配置 ElementPlus
app.use(ElementPlus, {
  locale: he, // 默认使用希伯来语
});

app.mount('#app');  