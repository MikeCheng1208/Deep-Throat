<script>
import abiContract from 'abi';
export default {
    props: ["web3", "contractAddress", "handLoading", "LoadingCloseFn"],
    data(){
        return {
            postMessage: [],
        };
    },
    watch:{
        web3(){
		    this.getTextData();
        },
        postMessage(){
            this.LoadingCloseFn();
        }
    },
    computed:{
        postMessageSort(){
            return this.postMessage.sort((a, b)=> {
                return b.args._id - a.args._id;
            });
        }
    },
    methods:{
        toNumberFn(_id){
            return _id.toNumber();
        },
		getTextData(){
            const contract = this.web3.eth.contract(abiContract).at(this.contractAddress);
            let NewMessageEvent = contract.allEvents({fromBlock: 4386608, toBlock: "latest"});
            NewMessageEvent.watch((error, result)=>{
                if(error) return console.error('data is Error');
                this.postMessage.push(result);
            });
		},
    }
};
</script>
<template>
    <div class="messageBox">
        <div class="item" v-for="(obj, idx) in postMessageSort" :key="idx">
            <header>
                <span><i class="fas fa-user-circle fa-2x"></i></span>
                <p>{{obj.args._name}}</p>
                <a class="hashid">#{{obj.args._id.toNumber()}}</a>
            </header>
            <div>
                <p><span><i class="fas fa-comment"></i></span>{{obj.args._message}}</p>
                <p class="timep">{{obj.args._time}}</p>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
    .messageBox{
        width: 100%;
        .item{
            width: 600px;
            border: 1px solid #e0e0e0;
            /* padding: 30px;  */
            margin: 0 auto 60px auto;
            background-color: #fff;
            header{
                position: relative;
                width: 100%;
                height: 69px;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                align-items: center;
                padding-left: 20px;
                >span{
                    display: block;
                    width: 32px;
                    height: 32px;
                    margin-right: 5px;
                    color: rgb(168, 168, 168);
                }
                .hashid{
                    position: absolute;
                    top: 50%;
                    right: 20px;
                    transform: translateY(-50%);
                }
            }
            >div{
                padding: 15px;
                >p{
                    color: rgb(59, 59, 59);
                    line-height: 20px;
                    font-size: 14px;
                    >span{
                        padding-right: 5px;
                        color: rgb(168, 168, 168);
                    }
                    &.timep{
                        font-size: 12px;
                        padding-top: 10px;
                    }
                }
            }
        }
    }
</style>
