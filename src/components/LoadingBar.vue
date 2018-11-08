<script>
export default {
    props: ["hashInfo", "handLoading", "isCloseLoading"],
    computed:{
        hash(){
            return this.hashInfo.hash;
        },
        url(){
            return this.hashInfo.url;
        },
        address(){
            let addr = this.hashInfo.hash.slice(0, 30);
            return `${addr}...`
        }
    },
    methods:{

    }
};

</script>

<template>

    <div :class="{loadingBar: true, open: isCloseLoading}">
        <a @click="handLoading" class="closeLoading"><i class="fas fa-times"></i></a>
        <div class="mid">
            <p>Message post loading ... <a :href="url" target="_blank">({{address}})</a></p>
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div>
    </div>

</template>

<style lang='scss' scoped>

    .loadingBar{
        position: relative;
        width: 100%;
        background-color: rgb(88, 88, 88);
        text-align: center;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        transition: height .3s;
        line-height: 30px;
        height: 0px;
        overflow: hidden;
        &.open{
            height: 30px;
        }
        a.closeLoading{
            position: absolute;
            top: 0;
            right: 20px;
            color: #fff;
            text-decoration: underline;
        }
        >.mid{
            width: 500px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 0 auto;
            a{
                color: #fff;
            }
        }
    }

    .spinner {
        width: 70px;
        text-align: center;
        
    }

    .spinner > div {
        width: 6px;
        height: 6px;
        background-color: #fff;

        border-radius: 100%;
        display: inline-block;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner .bounce1 {
        animation-delay: -0.32s;
    }

    .spinner .bounce2 {
        animation-delay: -0.16s;
    }

    @keyframes sk-bouncedelay {
        0%, 80%, 100% { 
            -webkit-transform: scale(0);
            transform: scale(0);
        } 40% { 
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }
</style>
