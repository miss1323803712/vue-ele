<template>
    <div class="controller">
        <transition name="move">
            <div class="cart-decrease iconfont icon-iconremovecircleoutline" v-show="food.count"
                 @click.stop="updateFoodCount(food,false,$event)"></div>
        </transition>
        <transition name="fadeNum">
            <div class="cart-count" v-show="food.count">{{food.count}}</div>
        </transition>
        <div class="cart-add iconfont icon-iconaddcircleoutline" @click.stop="updateFoodCount(food,true,$event)"></div>
    </div>
</template>
<script>
    export default{
        props: {
            food: Object,
            updateFoodCount: Function
        },
        mounted(){
//            console.log(this.food);
        }
    }
</script>
<style>
    .controller {
        font-size: 0;
    }

    .controller .cart-decrease {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: #00a0dc;
    }

    .controller .cart-add {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: #00a0dc;
    }

    .controller .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: #93999f;
    }
    .fadeNum-enter-active,.fadeNum-leave-active,.move-enter-active,.move-leave-active{
        transition: all 0.4s linear;
    }
    .controller .fadeNum-enter{
        opacity: 0;
    }
    .controller .fadeNum-leave{
        opacity: 1;
    }
    .fadeNum-enter-active{
        opacity: 1;
    }
    .fadeNum-leave-active{
        opacity: 0;
    }

    .controller .move-enter,.controller .move-leave-active{
        transform: translateX(40px) rotateZ(180deg);
        opacity: 0;
    }
</style>