<script>
export default {
    props:["isOpenMenu", "handOpenMenu"]
};

</script>

<template>
    <div :class="['menupage', {'open': isOpenMenu}]">
        <a @click="handOpenMenu" id="CloseBtn"><i class="fas fa-times fa-2x"></i></a>
        <div class="mid">
            <a id="metamask_icon" target="_blank" href="https://medium.com/portalnetworkofficial/how-to-use-metamask-extension-6e9b7f95176f">
                <img src="~metamsk2.png" alt="">
                How to use metamask
            </a>
            <a href="https://github.com/MikeCheng1208/Deep-Throat" target="_blank"><i class="fab fa-github fa-2x"></i>GitHub</a>
        </div>

    </div>
</template>

<style lang='scss' scoped>
    .menupage{
        position: fixed;
        top: 0;
        right: -400px;
        width: 100%;
        max-width: 400px;
        height: 100%;
        background-color: #fff;
        z-index: 400;
        transition: right .2s;
        &.open{
            right: 0;
        }
        @extend %BoxSet;
        box-shadow: -3px 0 7px rgba(182, 182, 182, 0.384);
        a#CloseBtn{
            position: absolute;
            top: 50px;
            right: 50px;
            margin: 0;
        }
        >.mid{
            position: relative;
            width: 100%;
            height: 500px;
            @extend %BoxSet;
            flex-direction: column;
            a{
                @extend %BoxSet;
                font-family: 'Vidaloka', sans-serif;
                color: rgb(39, 39, 39);
                margin-bottom: 40px;
                >svg{
                    margin-right: 20px;
                    float: left;
                }
                >img{
                    width: 30px;
                    margin-right: 20px;
                    float: left;
                }
            }
        }
    }
</style>
