<script>
import axios from 'axios'
import abi from 'ethereumjs-abi';
import abiContract from 'abi';
import moment from "moment";
export default {
    props: ["web3", "contractAddress", "metaMaskAddress", "handMsgBox", "postHash", "handLoading"],
    data(){
        return {
            Contract: null,
            textContent: "",
            MetaMaskAddress: ""
        };
    },
    watch:{
        web3(){
		    this.web3.eth.getAccounts((err, accounts) =>  this.MetaMaskAddress = accounts[0]);
        }
    },
    computed:{
        addRess(){
            let addr = this.metaMaskAddress.slice(0, 30);
            return `${addr}...`
        }
    },
    methods:{
		textByteData(_name, _massage, _time) {
			let byteData = "0x" + 		
				abi.methodID("SetPosMsg", ["string", "string", "string"]).toString("hex") + 		
				abi.rawEncode(["string", "string", "string"], [_name, _massage, _time]).toString("hex");
			return byteData;
		},
        SendText(){

            if(this.textContent === "") return alert("Fields must not be blank");
            if(this.textContent.length > 500) return alert("Can't over 500 words");

            let newTime = moment.utc(new Date()).format('MMMM Do YYYY, h:mm:ss a') + "";
            let payload = {
                from: this.MetaMaskAddress, 
                to: this.contractAddress,
                value: this.web3.toWei(0, 'ether'),
				data: this.textByteData(this.addRess ,this.textContent, newTime)
            };
            this.web3.eth.sendTransaction(payload, this.sendTransaction);
		},
		sendTransaction(err, result){
            this.handMsgBox();
            this.handLoading();
            this.postHash(result, `https://ropsten.etherscan.io/tx/${result}`);
            console.log(`https://ropsten.etherscan.io/tx/${result}`);

            const tx = result;
            let t = setInterval(async ()=>{
                const results = await axios.get(`https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${tx}&apikey=HFJAP3VU8CJJ974BHB7J7UDYNSR3VTEX7W`);
                if(results.data.result.status === "1") {
                    //交易完成
                    this.handLoading();
                    window.clearInterval(t);
                }
            },3000);
		}
    },
    created(){
    },
    mounted(){
    }
};

</script>

<template>
    <div class="msgBox">
        <div class="mid">
            <a @click="handMsgBox" class="closeMsg"><i class="fas fa-times fa-2x"></i></a>
            <p>Address: <span>{{this.addRess}}</span></p>
            <textarea cols="50" rows="5" placeholder="message" v-model="textContent"></textarea>
            <button @click="SendText">Submit</button>
        </div>
    </div>
</template>

<style lang='scss' scoped>
        .msgBox{
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(#fff, 0.95);
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 100;
            .mid{
                position: relative;
                width: 400px;
                margin: 0 auto;
                padding-top: 20px;
                a.closeMsg{
                    display: block;
                    position: absolute;
                    top: -30px;
                    right:  -30px;
                }
                >p{
                    color: #000;
                    margin-bottom: 10px;
                    font-family: 'Roboto', sans-serif;
                    >span{
                        margin-left: 10px;
                        font-family: 'Roboto', sans-serif;
                    }
                }
                textarea{
                    outline: none;
                    resize: none;
                    width: 100%;
                    height: 200px;
                    margin-bottom: 10px;
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ddd;
                    line-height: 20px;
                    color: #454545;
                }
                button{
                    width: 100px;
                    float: right;
                    border-radius: 5px;
                    line-height: 30px;
                    
                }
            }
        }
</style>
