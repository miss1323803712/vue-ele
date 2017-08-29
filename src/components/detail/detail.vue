<template>
    <div class="detail">
        <div class="name">{{seller.name}}</div>
        <v-star :score='seller.score' :size='48'></v-star>
        <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
        </div>
        <div class="supports">
            <div class="support" v-for="v in seller.supports">
                <span class="icon" :class="classMap[v.type]"></span>
                <span class="text">{{v.description}}</span>
            </div>
        </div>
        <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
        </div>
        <div class="content">{{seller.bulletin}}</div>
        <div class="close" @click="close()">
            <span class="iconfont icon-close"></span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import star from '../star/star.vue'
    export default{
        props: {
            seller:Object,
            detailShow:Object
        },
        components: {
            'v-star': star
        },
        methods:{
          close(){
              this.detailShow.detailShow=false;
          }
        },
        mounted(){
            this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
        }
    }
</script>
<style>
    .detail {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(7, 17, 27, 0.8);
        z-index: 100;
        padding: 60px 0 0 0;
        box-sizing: border-box;
    }

    .detail .name {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .detail .title {
        display: flex;
        padding: 28px 36px 24px;
        justify-content: space-between;
    }

    .detail .title .line {
        position: relative;
        top: 8px;
        width: 33%;
        height: 2px;
        background: rgba(255, 255, 255, 0.2);
    }

    .supports {
        padding: 0 45px;
    }

    .supports .support {
        margin-bottom: 12px;
    }

    .supports .support .text {
        font-size: 12px;
        margin-left: 5px;
    }

    .support .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
        vertical-align: middle;
    }

    .support .decrease {
        background-image: url("./decrease_1@2x.png");
    }

    .support .discount {
        background-image: url("./discount_1@2x.png");
    }

    .support .guarantee {
        background-image: url("./guarantee_1@2x.png");
    }

    .support .invoice {
        background-image: url("./invoice_1@2x.png");
    }

    .support .special {
        background-image: url("./special_1@2x.png");
    }
    .detail .content{
        padding: 0 40px;
        font-size: 12px;
        line-height: 24px;
    }
    .detail .close{
        text-align: center;
        position: absolute;
        bottom: 30px;
        left: 50%;
    }
</style>
