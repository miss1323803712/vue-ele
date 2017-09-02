<template>
    <div class="rating-select">
        <div class="rating-type" v-if="ratings">
            <span class="block positive" :class="{active:fatherData.currentType==0}" @click="setCommentType(0,false)">
                {{desc.all}}<span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" :class="{active:fatherData.currentType==1}" @click="setCommentType(1,false)">
                {{desc.positive}}<span class="count">{{positiveRatings}}</span>
            </span>
            <span class="block negative" :class="{active:fatherData.currentType==2}" @click="setCommentType(2,false)">
                {{desc.negative}}<span class="count">{{ratings.length-positiveRatings}}</span>
            </span>
        </div>
        <div class="switch" :class="{on:fatherData.onlyContent==true}" >
            <span class="iconfont icon-check1" @click="setCommentType(fatherData.currentType,true)"></span>
            <span class="text" @click="setCommentType(fatherData.currentType,true)">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            //当前商品评价
            ratings:Array,
            //是否只显示带内容的评价
            fatherData:Object,
            setCommentType:Function
        },
        data(){
            return {
                desc:{
                    all:'全部',
                    positive:'满意',
                    negative:'不满意'
                }
            }
        },
        computed:{
            //好评
            positiveRatings(){
                let count=0;
                for(let i=0;i<this.ratings.length;i++){
                    if(this.ratings[i].rateType==0){
                        count++;
                    }
                }
                return count;
            }
        }
    }
</script>
<style>
    .rating-select .rating-type{
        padding: 18px 0;
        margin: 0 18px;
        position: relative;
        border: none;
        font-size: 0;
    }
    .rating-select .rating-type .block{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: #4d555d;
    }
    .rating-select .rating-type .block.active{
        color: #fff;
    }
    .rating-select .rating-type .block.positive.active{
        background: #00a0dc;
    }
    .rating-select .rating-type .block.positive{
        background: rgba(0,160,220,0.2);
    }
    .rating-select .rating-type .block.negative{
        background: rgba(77,85,93,0.2);
    }
    .rating-select .rating-type .block.positive.active{
        background: #00a0dc;
    }
    .rating-select .rating-type .block.negative.active{
        background: #4d555d;
    }
    .rating-select .rating-type:after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(7,17,27,0.1);
        width: 100%;
        height: 1px;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    .switch .text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
    }
    .rating-select .switch{
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        color: #93999f;
        font-size: 0;
    }
    .rating-select .switch .icon-check1{
        font-size: 24px;
        margin-right: 5px;
        vertical-align: middle;
    }
    .rating-select .switch.on .icon-check1{
        color: #61b2f4;
    }
    .rating-type .block .count{
        margin-left: 3px;
    }
</style>