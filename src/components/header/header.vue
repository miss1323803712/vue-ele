<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :width='64' :height='64' :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟到达
                </div>
                <div class="support" v-if="seller.supports">
                    <span class="icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
                <div class="supports_count" v-if="seller.supports">
                    <span class="count" @click='giveData.detailShow=true'>{{seller.supports.length}}个 <i
                            class="iconfont icon-icon"></i></span>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper" @click='giveData.detailShow=true'>
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right iconfont icon-arrow-right"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt=""/>
        </div>
        <!--过渡状态-->
        <transition name="fade">
            <v-detail :detailShow="giveData" v-show='giveData.detailShow' :seller='seller'></v-detail>
        </transition>
    </div>
</template>
<script type='text/ecmascript-6'>
    import detail from '../detail/detail.vue'
    export default {
        props: ['seller'],
        data(){
            return {
                //便于子组件改变父组件数据
                giveData:{
                    detailShow: false
                }
            }
        },
        components: {
            'v-detail': detail
        }
    }
</script>
<style type="text/css">
    .header {
        position: relative;
        background: rgba(7, 17, 27, 0.5);
        color: #fff;
        overflow: hidden;

    }

    .content-wrapper {
        padding: 24px 12px 18px 24px;
    }

    .header .avatar {
        width: 64px;
        height: 64px;
        display: inline-block;
        vertical-align: top;
    }

    .header .content {
        display: inline-block;
        margin-left: 16px;
        padding: 2px 0 2px;
    }

    .content .title .brand {
        display: inline-block;
        width: 30px;
        height: 18px;
        background-repeat: no-repeat;
        vertical-align: top;
        background-size: 30px 18px;
        background-image: url('./brand@2x.png');
    }

    .content .title .name {
        margin-left: 6px;
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
    }

    .content .description {
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 12px;
        font-weight: 200;
        line-height: 12px;
    }

    .content .support .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        vertical-align: middle;
        background-image: url('../detail/decrease_1@2x.png');
    }

    .content .support .text {
        font-size: 12px;
        margin-left: 5px;
    }

    .content .supports_count {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        position: absolute;
        right: 12px;
        bottom: 50px;
        height: 24px;
        padding: 5px 10px;
        box-sizing: border-box;
    }

    .header .bulletin-wrapper {
        position: relative;
        padding: 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 28px;
        line-height: 28px;
        background: rgba(7, 17, 27, 0.2);
        font-size: 10px;
    }

    .header .bulletin-wrapper .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        background-repeat: no-repeat;
        background-size: 22px 12px;
        vertical-align: middle;
        margin-bottom: 3px;
        background-image: url('./bulletin@2x.png');
    }

    .header .bulletin-wrapper .bulletin-text {
        margin-left: 5px;
    }

    .background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        filter: blur(10px);
    }

    .background img {
        width: 100%;
        height: 100%;
    }

    .icon-keyboard_arrow_right {
        position: absolute;
        right: 3px;
    }

    .header .fade-leave-active, .header .fade-enter-active{
        transition: all 0.4s linear;
    }
    .header .fade-enter-active{
        opacity: 1;
        transform: rotateZ(0deg) scale(1,1);
    }
    .header .fade-leave-active{
        opacity: 0;
        transform: rotateZ(360deg) scale(0.1,0.1);
    }
    .header .fade-enter{
        opacity: 0;
        transform: rotateZ(360deg) scale(0.1,0.1);
    }
    .header .fade-leave{
        opacity: 1;
        transform: rotateZ(0deg) scale(1,1);
    }
</style>
