<template>
    <div class="seller" ref="sellerScroll">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <v-star :score="seller.score" :size="36"></v-star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.saleCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggle">
                    <span class="iconfont icon-aixin3" :class="{active:favorite==true}"></span>
                    <span class="text">{{favorite?'已收藏':'收藏'}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1>公告与活动</h1>
                <p class="content">{{seller.bulletin}}</p>
                <ul class="support">
                    <li class="support-item" v-for="(val,index) in seller.supports">
                        <span class="icon" :class="classMap[index]"></span>
                        <span class="text">{{val.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1>商家实景</h1>
                <div class="content" ref="picScroll">
                    <ul>
                        <li class="pics-item" v-for="val in seller.pics">
                            <img :src="val" :width="120" :height="90" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="info">
                <h1>商家信息</h1>
                <ul>
                    <li class="info-item" v-for="val in seller.infos">{{val}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import star from '../star/star.vue'
    import split from  '../split/split.vue'
    import BScroll from  'better-scroll'
    export default{
        props: {
            seller: Object,
            ratings: Array,
            goods: Array
        },
        data(){
            return {
                favorite: false,
                classMap: ["decrease", "discount", "guarantee", "invoice", "special"]
            }
        },
        components: {
            'v-star': star,
            split
        },
        mounted(){
            setTimeout(() => {
                //竖直滑动
                if (!this.sellerScroll) {
                    this.sellerScroll = new BScroll(this.$refs.sellerScroll, {
                        click: true
                    });
                } else {
                    this.sellerScroll.refresh();
                }
                let width=0;
                for(let i=0;i<this.$refs.picScroll.children[0].children.length;i++){
                   width+=this.$refs.picScroll.children[0].children[i].clientWidth;
                }
                //动态设置ul的宽度
                this.$refs.picScroll.children[0].style.width=width+'px';
                //横向滑动
                if (!this.picScroll) {
                    this.picScroll = new BScroll(this.$refs.picScroll, {
                        click: true,
                        scrollX: true
                    });
                } else {
                    this.picScroll.refresh();
                }
            }, 20);
        },
        methods: {
            toggle(){
                this.favorite = !this.favorite;
            }
        }
    }
</script>
<style>
    .seller {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
    }

    .seller .seller-content .overview {
        position: relative;
        padding: 18px;
    }

    .seller .seller-content .overview .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: #07111b;
        font-size: 14px;
    }

    .seller .seller-content .overview .desc {
        padding-bottom: 14px;
        position: relative;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .seller .seller-content .overview .star {
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
    }

    .seller .seller-content .desc .text {
        display: inline-block;
        margin-right: 8px;
        line-height: 18px;
        font-size: 10px;
        color: #4d555d;
    }

    .seller-content .favorite {
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
    }

    .seller-content .favorite .icon-aixin3 {
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
        margin-left: 7px;
    }

    .seller-content .favorite .icon-aixin3.active {
        color: #fa5c51;
    }

    .seller-content .favorite .text {
        line-height: 10px;
        font-size: 10px;
        color: #4d555d;
    }

    .seller-content .remark {
        margin-top: 18px;
        display: flex;
    }

    .seller-content .remark .block {
        flex: 1;
        text-align: center;
    }

    .seller-content .remark .block h2 {
        margin-bottom: 4px;
        line-height: 10px;
        font-size: 10px;
        color: #93999f;
    }

    .seller-content .remark .block .content {
        line-height: 24px;
        font-size: 10px;
        color: #07111b;
    }

    .seller-content .remark .block .content .stress {
        font-size: 24px;
    }

    .seller-content .bulletin {
        padding: 18px 18px 0 18px;
    }

    .seller-content .bulletin h1 {
        margin-bottom: 12px;
        line-height: 14px;
        color: #07111b;
        font-size: 14px;
    }

    .seller-content .bulletin .content {
        line-height: 24px;
        font-size: 12px;
        color: #f01414;
        padding: 0 5px 10px 5px;
    }

    .seller-content .bulletin .support-item {
        padding: 16px 12px;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
    }

    .seller-content .bulletin .support-item .text {
        font-size: 12px;
        margin-left: 5px;
    }
    .seller-content .info{
        padding: 18px 18px 0 18px;
        color: #07111b;
        position: relative;
    }
    .seller-content .info h1{
        line-height: 14px;
        color: #07111b;
        font-size: 14px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .seller-content .info .info-item{
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .seller-content .pics{
        padding: 18px;
    }
    .seller-content .pics h1{
        margin-bottom: 12px;
        line-height: 14px;
        color: #07111b;
        font-size: 14px;
    }
    .seller-content .pics .content{
        position: relative;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }
    .seller-content .pics .content .pics-item{
        display: inline-block;

    }
    .seller-content .pics .content .pics-item+.pics-item{
        margin-left: 5px;
    }
</style>