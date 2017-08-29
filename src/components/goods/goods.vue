<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li class="menu-item" :class="{'current':currentIndex===index}" v-for="(v,index) in goods" @click="clickMenuItem($event,index)">
                    <span class="text">
                        <i class="icon" v-if="v.type>=0"></i>
                        {{v.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <div>
                <div class="foods-list" v-for="(v,index) in goods">
                    <h3>{{v.name}}</h3>
                    <div class="foods-item" v-for="(val,index) in v.foods">
                        <div class="foods-item-img">
                            <img width="60" height="60" :src="val.icon" alt="">
                        </div>
                        <div class="foods-item-desc">
                            <h2>{{val.name}}</h2>
                            <p><span class="sellCount">月售{{val.sellCount}}份</span><span
                                    class="rating">好评率{{val.rating}}%</span></p>
                            <p class="price">
                                <span class="nowPrice">￥{{val.price}}</span>
                                <span class="oldPrice" v-if="val.oldPrice">￥{{val.oldPrice}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    export default{
        props: {
            goods: Array,
            seller: Object,
            ratings: Array
        },
        data(){
            return {
                //每个分类高度
                listHeight: [],
                scrollY: 0
            }
        },
        methods: {
            //初始化滚动事件
            initScroll(){
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click:true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    probeType: 3,
                    click:true
                });
                //实时监听滚动的位置
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(pos.y);
                });
            },
            //计算购买页面每个分类的高度
            calculateHeight(){
                //获取分类列表
                var list = this.$refs.foodsWrapper.getElementsByClassName('foods-list');
                //第一个的高度
                var height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < list.length; i++) {
                    height += list[i].clientHeight;
                    this.listHeight.push(height);
                }
//                console.log(this.listHeight);
            },
            //当点击左侧菜单触发的事件
            clickMenuItem($event,index){
                //过滤原生dom事件
                if(!$event._constructed){
                    return;
                }
                var ele=this.$refs.foodsWrapper.getElementsByClassName('foods-list')[index];
                this.foodsScroll.scrollToElement(ele,300);
            }
        },
        mounted(){
//            Vue.nextTick(() => {
//                this.initScroll();
//                new BScroll(this.$refs.menuWrapper, {});
//                new BScroll(this.$refs.foodsWrapper, {});
//            })
            setTimeout(() => {
                //调用initScroll方法
                this.initScroll();
                //计算高度
                this.calculateHeight();
            }, 20)
        },
        computed: {
            //计算当前的索引值
            currentIndex(){
                for (let i = 0; i < this.listHeight.length; i++) {
                    if(this.scrollY>=this.listHeight[i]&&this.scrollY<this.listHeight[i+1]){
                        console.log(i);
                        return i;
                    }
                }
                return 0;
            }
        }
    }
</script>
<style>
    .goods {
        display: flex;
        overflow: hidden;
        position: absolute;
        top: 176px;
        bottom: 46px;
        width: 100%;
    }

    .goods .menu-wrapper {
        flex: 0 0 80px;
        background: #f3f5f7
    }

    .goods .menu-wrapper .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
    }

    .goods .menu-wrapper .menu-item .text {
        font-size: 12px;
        vertical-align: middle;
        display: table-cell;
    }

    .goods .foods-wrapper {
        flex: 1;
    }

    .menu-item + .menu-item > .text {
        border-top: 1px solid #dce0ff;
    }

    .foods-list > h3 {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: #93999f;
        background: #f3f5f7;
    }

    .foods-item {
        display: flex;
        padding: 10px 0;
        margin: 0 10px;
        position: relative;
    }

    .foods-item + .foods-item {
        border-top: 1px solid #dce0ff;
    }

    .foods-item .foods-item-img {
        width: 60px;
        height: 60px;
        overflow: hidden;
    }

    .foods-item-desc {
        margin-left: 10px;
    }

    .foods-item-desc .sellCount, .foods-item-desc .rating {
        font-size: 12px;
        color: #93999f;
    }

    .foods-item-desc > h2 {
        margin: 0px 0 6px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: #07111b;
    }

    .foods-item-desc .price {
        margin-top: 5px;
    }

    .foods-item-desc .price .nowPrice {
        margin-right: 8px;
        font-size: 14px;
        color: #f01414;
    }

    .foods-item-desc .rating {
        margin-left: 8px;
    }

    .price .oldPrice {
        text-decoration: line-through;
        font-size: 14px;
        color: #501c47;
    }
    .menu-item.current{
        background: white;
        z-index: 100;
    }
    .menu-item.current .text{
        border-top: 1px solid transparent;
    }
</style>