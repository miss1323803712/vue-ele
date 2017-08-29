<template>
    <div class="tab">
        <router-link to="/goods">商品</router-link>
        <router-link to="/ratings">评价</router-link>
        <router-link to="/seller">商家</router-link>
    </div>
</template>
<script>
    export default{

    }
</script>
<style>
    .tab{
        display: flex;
    }
    .tab>a{
        height: 40px;
        line-height: 40px;
        color: #4d555d;
        text-align: center;
        font-size: 14px;
        display: block;
        flex: 1;

    }
</style>