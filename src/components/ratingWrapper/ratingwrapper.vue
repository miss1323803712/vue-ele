<template>
    <div class="rating-wrapper">
        <ul>
            <li class="rating-item" v-for="rating in commentContent">
                <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img width="12" height="12" class="avatar" :src="rating.avatar">
                </div>
                <p class="rating-time">{{rating.rateTime | date}}</p>
                <p class="text">
                                <span class="iconfont"
                                      :class="rating.rateType==1 ? 'icon-thumb_down_':'icon-zan1'"></span>
                    <span>{{rating.text}}</span>
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        props:{
            commentContent:Array
        }
    }
</script>
<style>
    .rating-wrapper {
        padding: 0 18px;
    }

    .rating-wrapper .rating-item {
        padding: 16px 0;
        position: relative;
    }

    .rating-wrapper .rating-item .rating-time {
        line-height: 14px;
        margin-bottom: 5px;
        height: 14px;
        font-size: 12px;
    }

    .rating-wrapper .rating-item .user {
        position: absolute;
        right: 0;
        font-size: 12px;
    }

    .rating-wrapper .rating-item .text {
        font-size: 12px;
    }

    .rating-wrapper .rating-item .text .iconfont.icon-zan1 {
        color: #00A0DC;
    }

    .rating-wrapper .rating-item .text .iconfont.icon-thumb_down_ {
        color: #999999;
        font-size: 12px;
    }
</style>