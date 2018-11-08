import abi from 'ethereumjs-abi';
import abiContract from './abi';
const contractAddress = '0xc1ec12c78689cd01fdbde47fcb097debd4396f89'; //合約位置
new Vue({
    el: '#app',
    data: {
		web3: null,
        Contract: null,
        nameContent: "Mike",
		textContent: "",
		gettextContent: "讀取中......",
        MetaMaskAddress: "",
    },
    methods: {
		getTextData(){
            const contract = this.web3.eth.contract(abiContract).at(contractAddress);
            console.log('contract:',contract);
            
            let NewMessageEvent = contract.allEvents({fromBlock: 4336911, toBlock: "latest"});
            NewMessageEvent.watch((error, result)=>{
                if(error) return console.error('data is Error');

            });
		},
		textByteData(_name, _massage, _time) {
			let byteData = "0x" + 		
				abi.methodID("SetPosMsg", ["string", "string", "string"]).toString("hex") + 		
				abi.rawEncode(["string", "string", "string"], [_name, _massage, _time]).toString("hex");
			return byteData;
		},
        SendText(){
            let payload = {
                from: this.MetaMaskAddress, 
                to: contractAddress,
                value: this.web3.toWei(0, 'ether'),
				data: this.textByteData(this.nameContent ,this.textContent, "2018/12/01")
            };
            this.web3.eth.sendTransaction(payload, this.sendTransaction);
		},
		sendTransaction(err, result){
			window.open(`https://ropsten.etherscan.io/tx/${result}`);
		}
    },
    mounted() {
		this.web3 = new Web3(window.web3.currentProvider);
		this.web3.eth.getAccounts((err, accounts) =>  this.MetaMaskAddress = accounts[0]);
		this.getTextData();
    }
})