<template>
    <transition enter-active-class="bounceInUp" leave-active-class='bounceOutDown'>
        <div class="food-detail animated" v-show="isShow" ref="foodDetail">
            <div class="food-content">
                <div class="img-header">
                    <img :src="food.image" alt="">
                </div>
                <div class="back" @click="show(false)">
                    <span class="iconfont icon-back4"></span>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="details">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span></div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                        <div v-show="!food.count" class="buy" @click="updateFoodCount(food,true,$event)">加入购物车</div>
                    </div>
                    <div class="controller-wrapper">
                        <v-controller :food="food" :updateFoodCount="updateFoodCount"></v-controller>
                    </div>
                </div>
                <split></split>
                <div class="info">商品信息</div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <rating-select :ratings="food.ratings"
                                   :fatherData="giveData"
                                   :setCommentType="setCommentType"
                    ></rating-select>
                </div>
                <rating-wrapper :commentContent="commentContent"></rating-wrapper>
            </div>
        </div>
    </transition>
</template>
<script>
    import controller from '../controller/controller.vue'
    import BScroll from 'better-scroll'
    import split from '../split/split.vue'
    import ratingSelect from '../ratingselect/ratingselect.vue'
    import ratingWrapper from  '../ratingWrapper/ratingwrapper.vue'
    export default{
        props: {
            food: Object,
            updateFoodCount: Function
        },
        components: {
            'v-controller': controller,
            split,
            ratingSelect,
            ratingWrapper
        },
        data(){
            return {
                //商品详情页显示状态
                isShow: false,
                //传递给子组件的数据
                giveData: {
                    //是否只显示带内容的评价
                    onlyContent: false,
                    //评论：满意   不满意  0代表全部  1代表满意  2代表不满意
                    currentType: 0
                }
            }
        },
        computed: {
            //评论 根据点击的内容来显示
            commentContent(){
                let arr = [];
                //全部
                if (this.giveData.currentType == 0) {
                    //如果显示带内容的评价
                    if (this.giveData.onlyContent) {
                        this.food.ratings.forEach((ratings) => {
                            //带内容的评价
                            if (ratings.text) {
                                arr.push(ratings)
                            }
                        });
                        return arr;
                    }
                    console.log(this.food);
                    return this.food.ratings
                }
                //代表满意的
                if(this.giveData.currentType==1){
                   this.food.ratings.forEach((ratings)=>{
                       //如果只显示内容
                       if(this.giveData.onlyContent){
                           //带有评价的并且好评
                           if(ratings.text&&ratings.rateType==0){
                               arr.push(ratings);
                           }
                       }else{
                           if(ratings.rateType==0){
                               arr.push(ratings);
                           }
                       }
                   });
                   return arr;
                }

                //代表不满意的
                if(this.giveData.currentType==2){
                    this.food.ratings.forEach((ratings)=>{
                        if(ratings.rateType==1){
                            arr.push(ratings);
                        }
                    })
                    return arr;
                }
            }
        },
        methods: {
            //是否显示商品详情页
            show(isShow){
                this.isShow = isShow;
                if (isShow) {
                    setTimeout(() => {
                        if (!this.scrolls) {
                            this.scrolls = new BScroll(this.$refs.foodDetail, {
                                click: true
                            });
                        } else {
                            this.scrolls.refresh();//刷新
                        }
                    }, 20)
                }

            },
            //设置评论的类型
            setCommentType(val,isOnlyContent){
                this.giveData.currentType=val;
                if(isOnlyContent){
                    this.giveData.onlyContent=!this.giveData.onlyContent;
                }
                setTimeout(()=>{
                    //刷新
                    this.scrolls.refresh();
                },20);
            }
        }
    }
</script>
<style>
    .food-detail {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
    }

    .food-detail .img-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
    }

    .food-detail .img-header img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .food-content {
        position: relative;
    }

    .food-detail .content {
        padding: 18px;
        position: relative;
    }

    .content .details {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
    }

    .content .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: #07111b;
    }

    .content .details .sell-count, .content .details .rating {
        font-size: 10px;
        color: #93999f;
    }

    .content .details .rating {
        margin-left: 10px;
    }

    .content .price {
        font-weight: 700;
        line-height: 24px;
        position: relative;
    }

    .content .price .now {
        margin-right: 8px;
        font-size: 14px;
        color: #f01414;
    }

    .content .old {
        text-decoration: line-through;
        font-size: 10px;
        color: #93999f;
    }

    .content .price .buy {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background: #00a0dc;
        text-align: center;
    }

    .content .controller-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }

    .food-content .info {
        padding: 18px;
        background: #ffffff;
        line-height: 24px;
        font-size: 14px;
    }

    .food-detail .rating {
        padding-top: 18px;
    }

    .food-detail .rating .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: #07111b;
    }

    .food-content .back {
        position: absolute;
        left: 20px;
        top: 20px;
    }

    .food-content .back span {
        font-size: 24px;
        color: white;
    }
</style>