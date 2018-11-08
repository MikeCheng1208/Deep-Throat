<script>
export default {
    props: ["errorIdx"]
};
</script>

<template>
    <div class="Error">
        <div>
            <a href="https://metamask.io/" target="_blank"><img src="~metamsk2.png" alt=""></a>
            <h1>Please install <a href="https://metamask.io/" target="_blank">MetaMask</a> to use the service.</h1>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    .Error{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#fff, 0.8);
        z-index: 9999;

        display: flex;
        justify-content: center;
        align-items: center;
        >div{
            >h1{
                font-family: 'Vidaloka', sans-serif;
                >a{
                    font-family: 'Vidaloka', sans-serif;
                    text-decoration: underline;
                    color: coral;
                }
            }
            >a{
                display: block;
                width: 200px;
                margin: 0 auto 40px auto;
                >img{
                    width: 100%;
                }
            }
        }
    }
</style>
