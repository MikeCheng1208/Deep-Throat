<script>
import abi from 'ethereumjs-abi';
import abiContract from 'abi';
import VueMetamask from 'vue-metamask';
import MessageItem from './components/MessageItem';
import PostInput from './components/PostInput';
import LoadingBar from './components/LoadingBar';
import ErreoPage from './components/ErreoPage';
import MenuPage from './components/MenuPage';
import LodingPage from './components/LodingPage';
export default {
    components: {
        VueMetamask,
        MessageItem,
        PostInput,
        LoadingBar,
        ErreoPage,
        MenuPage,
        LodingPage,
    },
    data(){
        return {
            web3: null,
            isOpenMsg: false,
            metaMaskAddress: "",
            contractAddress: '0x3c27b00821e07b971d3e0a986903d14225c7a075', //合約位置,
            hashInfo: {
                hash: "",
                url: "",
            },
            isCloseLoading: false,
            isOpenPop: false,
            type: "ROPSTEN",
            isOpenMenu: false,
            isTextLoading: true,
            postMessage: [],
        };
    },
    methods:{
        onComplete(data){
            this.web3 = data.web3;
            this.metaMaskAddress = data.metaMaskAddress;
            this.type = data.type;
            this.isTextLoading = true;
            if(data.type === "NO_INSTALL_METAMASK"){
                this.isOpenPop = true;
                this.LoadingCloseFn();
                return ;
            }
            if(data.type === "NO_LOGIN"){
                this.LoadingCloseFn();
                return ;
            }
            this.getTextData();
        },
        handMsgBox(){
            this.isOpenMsg = !this.isOpenMsg;
        },
        postHash(hash, url){
            this.hashInfo = {
                hash,
                url,
            };
        },
        handLoading(){
            this.isCloseLoading = !this.isCloseLoading;
        },
        handOpenMenu(){
            this.isOpenMenu = !this.isOpenMenu;
        },
        LoadingCloseFn(){
            this.isTextLoading = false
        },
		getTextData(){
            console.log('GET');
            const contract = this.web3.eth.contract(abiContract).at(this.contractAddress);
            let NewMessageEvent = contract.allEvents({fromBlock: 4386608, toBlock: "latest"});
            NewMessageEvent.watch((error, result)=>{
                if(error) return console.error('data is Error');
                this.postMessage.push(result);
            });
		}
    }
};
</script>

<template>
    <div id="app">

        <vue-metamask
            @onComplete="onComplete"
        ></vue-metamask>

        <erreo-page
            v-if="isOpenPop"
        ></erreo-page>

        <LoadingBar
            :hashInfo="hashInfo"
            :handLoading="handLoading"
            :isCloseLoading="isCloseLoading"
        ></LoadingBar>

        <header>
            <h1>Deep Throat</h1>
            <a @click="handOpenMenu" class="MenuBtn"><i class="fas fa-bars fa-2x"></i></a>
        </header>

        <menu-page
            :isOpenMenu="isOpenMenu"
            :handOpenMenu="handOpenMenu"
        ></menu-page>
        
        <message-item 
            v-if="type === 'ROPSTEN'"
            :web3="web3"
            :contractAddress="contractAddress"
            :handLoading="handLoading"
            :LoadingCloseFn="LoadingCloseFn"
            :getTextData="getTextData"
            :postMessage="postMessage"
        ></message-item>

        <post-input
            v-if="isOpenMsg"
            :web3="web3"
            :contractAddress="contractAddress"
            :metaMaskAddress="metaMaskAddress"
            :handMsgBox="handMsgBox"
            :postHash="postHash"
            :handLoading="handLoading"
        ></post-input>

        <a class="newPost" @click="handMsgBox" v-if="type === 'ROPSTEN'">
            <i class="fas fa-comment fa-3x"></i>
        </a>

        <div class="noROPSTEN" v-if="type !== 'ROPSTEN'">
            <h1>Currently not in the ROPSTEN or not logIn.</h1>
        </div>

        <loding-page v-if="isTextLoading"></loding-page>
        
    </div>
</template>
<style lang='scss' scoped>
    #app{
        position: relative;
    }
    header{
        position: relative;
        width: 100%;
        /* height: 88px; */
        border-bottom: 1px solid #e0e0e0;
        background-color: #fff;
        margin-bottom: 60px;
        >h1{
            position: relative;
            display: block;
            width: 227px;
            font-family: 'Vidaloka', sans-serif;
            color: #272727;
            line-height: 88px;
            text-align: center;
            margin: 0 auto;
            &::before{
                position: absolute;
                top: 0;
                right: 29px;
                content:"ROPSTEN";
                color:red;
                font-size: 12px;
                line-height: 127px;
            }
        }
        a.MenuBtn{
            position: absolute;
            right: 40px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    a.newPost{
        position: fixed;
        bottom: 40px;
        right: 60px;
        display: block;
        color: #858585;
        transition: color .3s, transform .3s;
        &:hover{
            color: #313131;
            transform: scale(1.1);
        }
    }
    .noROPSTEN{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 200px;
        >h1{
            font-family: 'Vidaloka', sans-serif;
        }
    }
</style>
