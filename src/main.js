//import "./main.css";
import './assets/css/style.scss';
import Vue from 'vue';
import App from './App.vue';


// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({


    //渲染
    render: f => f(App),

    //初始化回调
    mounted: function () {

        //console.log("全部渲染完毕");

    }
  
}).$mount('#app')
