<template>
    <div class="star" :class="`star-${size}`">
        <span class="star-item" :class='c' v-for='c in starClasses'></span>
    </div>
</template>
<script type="text/ecmascript-6">
    /*加入是3.5的评分那么就是 on on on half off*/
    const CLASS_ON = 'on';
    const ClSAA_HALF = 'half';
    const CLASS_OFF = 'off';
    export default{
        props: {
            score: Number,
            size: Number
        },
        computed: {
            starClasses(){
                const arr = [];
                //对分数取整
                var scoreInteger = Math.floor(this.score);
                for (let i = 0; i < scoreInteger; i++) {
                    console.log(i);
                    arr.push(CLASS_ON);
                }

                //this.score-scoreInteger >=0.5说明有一半
                if (this.score - scoreInteger >= 0.5) {
                    arr.push(ClSAA_HALF);
                }
                //当长度小于5 说明要添加off
                while (arr.length < 5) {
                    arr.push(CLASS_OFF);
                }
                return arr;
            }
        }
    }
</script>
<style>
    .star-48{
        text-align: center;
    }
    .star-48 .star-item {
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        display: inline-block;
        background-repeat: no-repeat;
    }

    .star-48 .on {
        background-image: url('./star48_on@3x.png')
    }

    .star-48 .off {
        background-image: url('./star48_off@3x.png')
    }

    .star-48 .half {
        background-image: url('./star48_half@3x.png')
    }
</style>
