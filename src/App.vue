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
</style>
