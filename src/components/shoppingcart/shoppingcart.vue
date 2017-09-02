<template>
    <div>
        <div class="shopping-cart">
            <div class="content">
                <div class="content-left">
                    <div class="login-wrapper" @click="toggleListShow">
                        <div class="logo" :class="{highLight:totalCount>0}">
                            <i class="iconfont icon-cart" :class="{highLight:totalCount>0}"></i>
                        </div>
                        <div class="num" v-if="totalCount">{{totalCount}}</div>
                    </div>
                    <div class="price">￥{{totalPay}}</div>
                </div>
                <div class="content-right">
                    <div class="pay" :class="totalPay<minPrice? 'not-enough':'enough'">{{payText}}</div>
                </div>
            </div>
            <transition name="fold">
                <div v-show="listShow" class="shopping-cart-list">
                    <div class="list-header">
                        <h1>购物车</h1>
                        <span class="clearCart" @click="clearCart">清空</span>
                    </div>
                    <div class="list-content" ref="listFoodContent">
                        <div>
                            <div class="food" v-for="food in shoppingList">
                                <span class="name">{{food.name}}/{{food.count}}个</span>
                                <div class="price"><span>￥{{food.price}}</span></div>
                                <div class="controller-wrapper">
                                    <v-controller :food="food" :updateFoodCount="updateFoodCount"></v-controller>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class="black-background" v-show="listShow" @click="toggleListShow"></div>
    </div>

</template>
<script>
    import BScroll from 'better-scroll';
    import controller from '../controller/controller.vue'
    export default{
        props:{
            deliveryPrice:Number,
            minPrice:Number,
            shoppingList:Array,
            updateFoodCount:Function,
            clearCart:Function
        },
        data(){
            return {
                //是否显示购物车
                isShow:false
            }
        },
        components:{
            'v-controller':controller
        },
        mounted(){

        },
        computed:{
            //计算总价
            totalPay(){
                var total=0;
                for(let i=0;i<this.shoppingList.length;i++){
                    total+=this.shoppingList[i].count*this.shoppingList[i].price;
                }
                return total;
            },
            //计算数量
            totalCount(){
                var total=0;
                for(let i=0;i<this.shoppingList.length;i++){
                    total+=this.shoppingList[i].count;
                }
                return total;
            },
            payText(){
//                var minPrice=this.minPrice;
//                var totalPrice=this.totalPay;
                if(this.totalPay===0){
                    return `￥${this.minPrice}元起送`;
                }else if(this.totalPay<this.minPrice){
                    return `还差￥${this.minPrice-this.totalPay}元起送`;
                }else{
                    return '去结算';
                }
            },
            //判断是否需要滑动
            listShow(){
                if(this.totalCount==0){
                    this.isShow=false;
                    return false;
                }
                //如果是true 说明要显示
                if(this.isShow){
                    setTimeout(()=>{
                        if(!this.scroll){
                            this.scroll= new BScroll(this.$refs.listFoodContent,{
                                click:true
                            });
                        }else{  //不是第一次
                            this.scroll.refresh();
                        }
                    },20);
                }
                return this.isShow;
            }
        },
        methods:{
            //当点击购物车按钮触发的事件
            toggleListShow(){
                this.isShow=!this.isShow;
            }
        }
    }
</script>
<style>
    .shopping-cart {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
    }
    .shopping-cart .content{
        display: flex;
        background-color: #141d27;
        font-size: 0;
        color: rgba(255,255,255,0.4);
    }
    .shopping-cart .content .content-left{
        flex: 1;
    }
    .shopping-cart .content .content-right{
        flex: 0 0 105px;
        width: 105px;
    }
    .shopping-cart .content-left .login-wrapper{
        width: 56px;
        height: 56px;
        padding: 6px;
        box-sizing: border-box;
        margin: 0 12px;
        position: relative;
        top: -10px;
        border-radius: 50%;
        background:#141d27;
        display: inline-block;
    }
    .shopping-cart .content-left .login-wrapper .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        background: #2b343c;
    }
    .shopping-cart .content-left .login-wrapper .logo .iconfont{
        font-size: 24px;
        line-height: 44px;
        color: #80858a;
    }
    .shopping-cart .content-left .price{
        font-size: 16px;
        display: inline-block;
        line-height: 24px;
        padding-right: 16px;
        color: white;
        border-right: 1px solid rgba(255,255,255,0.1);
        position: relative;
        top:-5px;
        font-weight: bold;
    }
    .content-right .pay{
        text-align: center;
        line-height: 48px;
        height: 100%;
        font-size: 14px;
        font-weight: bold;
    }
    .content-right .not-enough{
        background: #2b333b;
    }
    .content-right .enough{
        background: #00b43c;
        color: white;
    }
    .shopping-cart-list{
        width: 100%;
        position: absolute;
        top:0;
        z-index: -1;
        transform: translateY(-100%);
    }
    .shopping-cart-list .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .shopping-cart-list .list-header h1{
        float: left;
        font-size: 14px;
        color: #07111b;
    }
    .shopping-cart-list .list-header .clearCart{
        float: right;
        font-size: 12px;
        color: #00a0dc;
    }
    .shopping-cart-list .list-content{
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
    }
    .shopping-cart-list .list-content .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border: none;
    }
    .shopping-cart-list .list-content .food .name{
        line-height: 24px;
        font-size: 14px;
        color: #07111b;
    }
    .shopping-cart-list .list-content .food .price{
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: #f01414;
    }
    .logo.highLight{
        background: #00a0dc!important;
    }
    .food .controller-wrapper{
        bottom: 7px;
    }
    .icon-cart.highLight{
        color: white!important;
    }
    .login-wrapper .num{
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background: #f01414;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
    }
    .fold-enter-active,.fold-leave-active{
        transition: all 0.5s ease-in-out;
    }
    .fold-enter,.fold-leave-active{
        transform: translateY(0);
    }
    .black-background{
        height: 100%;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 40;
        background: rgba(7,17,27,0.6);
    }
</style>