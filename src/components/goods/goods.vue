<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li class="menu-item" :class="{'current':currentIndex===index}" v-for="(v,index) in goods"
                        @click="clickMenuItem($event,index)">
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
                        <div class="foods-item" @click.stop="clickFood(val,$event)" v-for="(val,index) in v.foods">
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
                            <div class="controller-wrapper">
                                <v-controller :food="val" :updateFoodCount="updateFoodCount"></v-controller>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <v-shoppingCart :updateFoodCount="updateFoodCount"
                            :shoppingList="shoppingList"
                            :minPrice="seller.minPrice"
                            :deliveryPrice="seller.deliveryPrice"
                            :clearCart="clearCart"
            >
            </v-shoppingCart>
        </div>
            <v-food :food="selectedFood" :updateFoodCount="updateFoodCount" ref="food"></v-food>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    import shoppingCart from '../shoppingcart/shoppingcart.vue'
    import controller from '../controller/controller.vue'
    import foodDetail from '../foodDetail/foodDetail.vue'
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
                //实时滚动的位置
                scrollY: 0,
                //保存当前props的goods信息
                singleGoods:[],
                //当用户点击商品详情的时候
                selectedFood:{}
            }
        },
        components: {
            'v-controller': controller,
            'v-shoppingCart': shoppingCart,
            'v-food':foodDetail
        },
        methods: {
            //初始化滚动事件
            initScroll(){
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    probeType: 3,
                    click: true
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
            clickMenuItem($event, index){
                //过滤原生dom事件
                if (!$event._constructed) {
                    return;
                }
                var ele = this.$refs.foodsWrapper.getElementsByClassName('foods-list')[index];
                this.foodsScroll.scrollToElement(ele, 300);
            },
            /**
             * 点击加入购物车触发的事件
             * food 表示绑定的当前的商品信息 比如：瘦肉粥
             * isAdd 表示是否是增加  true表示增加 false表示减少
             */
            updateFoodCount(food, isAdd, $event){
                //过滤原生dom事件
                if (!$event._constructed) {
                    return;
                }
                //当点击的是增加
                if (isAdd) {
                    //说明数量为0 那么此时为1
                    if (!food.count) {
                        //food.count=1  没有数据绑定不会更新
//                        food.count = 1;
                        Vue.set(food, 'count', 1);
                    } else {
                        food.count++;
                        console.log('增加');
                    }
                } else { //这里减少
                    if (food.count) {
                        food.count--;
                    }
                }
            },
            //清空购物车
            clearCart(){
//                console.log(1);
                this.shoppingList.forEach((food)=>{
                    food.count=0;
                })
            },
            //点击商品详情
            clickFood(foods,$event){
                if(!$event._constructed){
                    return;
                }
                this.selectedFood=foods;
                //显示商品详情
                this.$refs.food.show(true);
                console.log(this.selectedFood);
            }
        },
        mounted(){
//            console.log(this.goods);
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
                //把goods的值赋值为singleGoods  不知道为何拿不到 goods
                this.singleGoods=this.goods;
            }, 20);

        },
        computed: {
            //计算当前的索引值
            currentIndex(){
                for (let i = 0; i < this.listHeight.length; i++) {
                    if (this.scrollY >= this.listHeight[i] && this.scrollY < this.listHeight[i + 1]) {
//                        console.log(i);
                        return i;
                    }
                }
                return 0;
            },
            //购物车商品
            shoppingList(){
                var arr = [];
                for (let i = 0; i < this.singleGoods.length; i++) {
//                    console.log(this.singleGoods[i].foods);
                    for(let j=0;j<this.singleGoods[i].foods.length;j++){
                        //如果有count属性说明已经加入购物车
                        if(this.singleGoods[i].foods[j].count){
                            arr.push(this.singleGoods[i].foods[j]);
                        }
                    }
                }
                //arr中返回带有count的商品
                return arr;
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

    .menu-item.current {
        background: white;
        z-index: 100;
    }

    .menu-item.current .text {
        border-top: 1px solid transparent;
    }

    .controller-wrapper {
        position: absolute;
        right: 0;
        bottom: 5px;
    }
</style>