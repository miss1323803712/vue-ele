<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <v-tab></v-tab>
        <keep-alive>
            <router-view :seller="seller" :goods="goods" :ratings="ratings"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import axios from 'axios'
    import header from './components/header/header.vue'
    import tab from './components/nav/nav.vue'
    import Vue from 'vue'
    //自定义全局过滤器
    Vue.filter('date',(val)=>{
        var date=new Date(val);
        //获取年份
        let year=date.getFullYear();
        //获取月份
        let month=date.getMonth()+1;
        if(month<10){
            month='0'+month;
        }
        //获取日期
        let dates=date.getDate();
        if(dates<10){
            dates='0'+dates;
        }
        //获取小时
        let hour=date.getHours();
        if(hour<10){
            hour='0'+hour;
        }
        //获取分钟
        let minute=date.getMinutes();
        if(minute<10){
            minute='0'+minute;
        }
        //获取秒数
        let second=date.getSeconds();
        if(second<10){
            second='0'+second;
        }
        return year+"-"+month+"-"+dates+" "+hour+":"+minute+":"+second;
    })
    export default {
        name: 'app',
        data () {
            return {
                seller: {}, //卖家信息
                goods:[],   //商品信息
                ratings:[]   //评论信息
            }
        },
        components: {
            'v-header': header,
            'v-tab':tab
        },
        mounted(){
            axios.get('./src/static/data.json').then((res) => {
//                console.log(res.data.seller);
                this.seller = res.data.seller;
                this.goods=res.data.goods;
                this.ratings=res.data.ratings;
            }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>

<style>
    #app{
        /*position: relative;*/
    }
</style>
