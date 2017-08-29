/**
 * Created by Administrator on 2017/8/28.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import selelr from '../components/seller/seller.vue'

const routes=[
    {
        path:'/goods',
        component:goods
    },
    {
        path:'/ratings',
        component:ratings
    },
    {
        path:'/seller',
        component:selelr
    },
    {
        path:'/',
        redirect:'/goods'
    }

]
export default new VueRouter({
    routes
})