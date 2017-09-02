<template>
    <div class="ratings" ref="ratingsScroll">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1>{{seller.score}}</h1>
                    <p class="title">综合评分</p>
                    <p class="rank">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <v-star :score="seller.serviceScore" :size="36"></v-star>
                        <span class="score">{{seller.serviceScore}}</span></div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <v-star :score="seller.foodScore" :size="36"></v-star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <rating-select
                    :fatherData="giveData"
                    :ratings="ratings"
                    :setCommentType="setCommentType">
            </rating-select>
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item" v-for="rating in commentContent">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <v-star :score="rating.score" :size="24"></v-star>
                                <span class="delivery">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend">
                                <span class="iconfont"
                                      :class="rating.rateType==1 ? 'icon-thumb_down_':'icon-zan1'"></span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | date}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import star from '../star/star.vue'
    import split from '../split/split.vue'
    import ratingSelect from '../ratingselect/ratingselect.vue'
    import BScroll from  'better-scroll'
    export default{
        props: {
            seller: Object,
            ratings: Array,
            goods: Array
        },
        data(){
            return {
                giveData: {
                    //是否只显示带内容的评价
                    onlyContent: false,
                    //评论：满意   不满意  0代表全部  1代表满意  2代表不满意
                    currentType: 0
                },
            }
        },
        components: {
            'v-star': star,
            split,
            ratingSelect
        },
        mounted(){
            setTimeout(() => {
                if(!this.scrollRating){
                    this.scrollRating = new BScroll(this.$refs.ratingsScroll, {
                        click: true
                    })
                }else{
                    this.scrollRating.refresh();
                }
            }, 20);
        },
        computed: {
            //评论 根据点击的内容来显示
            commentContent(){
                let arr = [];
                //全部
                if (this.giveData.currentType == 0) {
                    //如果显示带内容的评价
                    if (this.giveData.onlyContent) {
                        this.ratings.forEach((ratings) => {
                            //带内容的评价
                            if (ratings.text) {
                                arr.push(ratings)
                            }
                        });
                        return arr;
                    }
                    return this.ratings
                }
                //代表满意的
                if (this.giveData.currentType == 1) {
                    this.ratings.forEach((ratings) => {
                        //如果只显示内容
                        if (this.giveData.onlyContent) {
                            //带有评价的并且好评
                            if (ratings.text && ratings.rateType == 0) {
                                arr.push(ratings);
                            }
                        } else {
                            if (ratings.rateType == 0) {
                                arr.push(ratings);
                            }
                        }
                    });
                    return arr;
                }

                //代表不满意的
                if (this.giveData.currentType == 2) {
                    this.ratings.forEach((ratings) => {
                        //只显示带内容的
                        if(this.giveData.onlyContent){
                            if (ratings.rateType == 1&&ratings.text) {
                                arr.push(ratings);
                            }
                        }else{
                            if(ratings.rateType==1){
                                arr.push(ratings);
                            }
                        }
                    })
                    return arr;
                }
            }
        },
        methods: {
            //设置评论的类型
            setCommentType(val, isOnlyContent){
                console.log(1);
                this.giveData.currentType = val;
                if (isOnlyContent) {
                    this.giveData.onlyContent = !this.giveData.onlyContent;
                }
                setTimeout(() => {
                    //刷新
                    this.scrollRating.refresh();
                }, 20);
            }
        }

    }
</script>
<style>
    .ratings {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
    }

    .ratings .ratings-content .overview {
        padding: 18px 0;
        display: flex;
    }

    .overview-left {
        flex: 0 0 120px;
        width: 120px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
    }

    .ratings .ratings-content .overview .overview-left h1 {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: #f90;
    }

    .ratings .ratings-content .overview .overview-left .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: #07111b;
    }

    .ratings-content .overview-left .rank {
        line-height: 10px;
        font-size: 10px;
        color: #93999f;
    }

    .ratings .ratings-content .overview .overview-right {
        flex: 1;
        padding: 0 5px;
    }

    .overview-right .score-wrapper .title {
        display: inline-block;
        line-height: 18px;
        vertical-align: top;
        font-size: 12px;
        color: #07111b;
    }

    .overview-right .score-wrapper {
        margin-bottom: 8px;
    }

    .overview-right .score-wrapper .score {
        display: inline-block;
        line-height: 18px;
        vertical-align: top;
        font-size: 12px;
        color: #f90;
    }

    .overview-right .score-wrapper .star {
        display: inline-block;
        margin: 0 12px;
        vertical-align: top;
    }

    .overview-right .delivery-wrapper .title {
        line-height: 18px;
        font-size: 12px;
        color: #07111b;
    }

    .overview-right .delivery-wrapper .delivery {
        margin-left: 12px;
        font-size: 12px;
        color: #93999f;
    }

    .ratings-content .rating-wrapper .rating-item {
        display: flex;
        padding: 18px 0;
        position: relative;
    }

    .ratings-content .rating-wrapper {
        padding: 0 18px;
    }

    .ratings-content .rating-wrapper .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
    }

    .ratings-content .rating-wrapper .rating-item img {
        border-radius: 50%;
    }

    .rating-item .content .name {
        margin-bottom: 4px;
        line-height: 12px;
        font-size: 10px;
        color: #07111b;
    }

    .ratings-content .rating-item .content {
        position: relative;
        flex: 1;
    }

    .rating-item .content .time {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 12px;
        font-size: 10px;
        color: #93999f;
    }

    .rating-item .content .delivery {
        display: inline-block;
        line-height: 12px;
        font-size: 10px;
        color: #93999f;
    }

    .rating-item .star-wrapper {
        margin-bottom: 6px;
    }

    .rating-item .content .star-wrapper .star {
        display: inline-block !important;
    }

    .rating-item .content .text {
        margin-bottom: 8px;
        line-height: 18px;
        color: #07111b;
        font-size: 12px;
    }

    .recommend {
        line-height: 16px;
    }

    .recommend .iconfont.icon-zan1 {
        color: #00A0DC;
    }

    .recommend .item {
        padding: 0 6px;
        border: 1px solid rgba(7, 17, 27, 0.1);
        border-radius: 1px;
        color: #93999f;
        background: #fff;
        display: inline-block;
        margin: 0 8px 4px 0;
        font-size: 9px;
    }
</style>