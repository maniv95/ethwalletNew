/*eslint-disable*/
//--------------------------------------------------------------Beginning-Of-Code-------------------------------------------------------//
//--------Node-Module-For-Keystore -------//
const keythereum = require("keythereum");
//--------------Input-Data-Decoder-Using-Abi-----------//
const abiDecoder = require('abi-decoder');
//--------Web3---------//
var Web3 = require('web3');
//----------Initialising-RPC-Port------------//
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//------------Node-Module-For-File-Download-----------------//
const fileDownload = require('react-file-download');
//------------Gas-Price-------------//
var gas=3000000;
exports.gas=gas;
//----Sweet-Alerts------//
var sweetAlert = require('sweetalert');
var swal = require('sweetalert');
//-----------KeyStore-Generation-And-Private-Key-Extraction---------------//
function KeyStoreGen(Password){
	var params = { keyBytes: 32, ivBytes: 16 };
    var dk = keythereum.create(params);
    var options = {
		kdf: "scrypt",
		cipher: "aes-128-ctr",
		kdfparams: {
		c: 262144,
		dklen: 32,
		prf: "hmac-sha256"
		}
	};
	var keyObject = keythereum.dump(Password, dk.privateKey, dk.salt, dk.iv, options);
	var now = new Date();
	fileDownload(keythereum.exportToFile(keyObject).toString(),'UTC--' + now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate() +"."+Number(new Date())+"--"+keyObject.address);
	sweetAlert("Account Created","KeyStore File Downloaded","success");
	var PrivateKey = dk.privateKey.toString('hex');
	return PrivateKey;
}
exports.KeyStoreGen=KeyStoreGen;
//-------------------Login-With-Keystore-And-Password------------------//
function LoginWithKeyStoreFile(KeyStore,Password){
    var json = KeyStore;
    var khex="0x"
    var address= khex.concat(json.address);
    var account = web3.personal.unlockAccount(address,Password);
    sweetAlert("Logged In",address,"success");
}
exports.LoginWithKeyStoreFile=LoginWithKeyStoreFile;
//----------------Check-Balance---------------------//
function ViewBalance(BlockchainAddress){
	var bal = web3.eth.getBalance(BlockchainAddress);
	var Bal = web3.fromWei(bal,'ether');
	return Bal.toString();
}
exports.ViewBalance=ViewBalance;
//------------Estimate-Gas-For-Transaction-------//
function EstimateGas(ToAdd,Amount){
	var amount = web3.toWei(Amount, "ether");
	var estGas = web3.eth.estimateGas({to:ToAdd,data:"0x"});
	var final =  estGas.toString();
	return final;
	// return JSON.stringify(est);
}
exports.EstimateGas =  EstimateGas;
//--------------Sending-Transactions----------------//
function SendTx(FromAdd,ToAdd,amt,Password,gas){
	var unlockAccount = web3.personal.unlockAccount(FromAdd,Password);
	var amount = web3.toWei(amt, "ether");
	var bal = web3.eth.getBalance(FromAdd);
	var balance = web3.fromWei(bal,'ether');
	if (balance !== 0 && balance >= amount){
		var txHash = web3.eth.sendTransaction({from:FromAdd,to:ToAdd, value:amount,gas:gas});
		sweetAlert("Done","Transaction Sent","success");
		return txHash;
	}
	else{
		sweetAlert("Insufficient Funds","Tranasaction Failed","error");
	}
}
exports.SendTx=SendTx;
//----------------------Transfer-Entire-Balance------------------//
function SendEntireBalance(FromAdd,ToAdd,Password,gas){
	var unlockAccount = web3.personal.unlockAccount(FromAdd,Password);
    var price = web3.eth.gasPrice;
    var balance = web3.eth.getBalance(FromAdd);
    var value = balance.minus(gas * price);
    if (value.greaterThan(0)){
        var txn = web3.eth.sendTransaction({from: FromAdd, to: ToAdd, gasPrice: price, gas: gas, value: value});
        sweetAlert("Done","Transcation Success","success");
        return txn;
    }
    sweetAlert("Insufficient Funds","Transcation Failed","error");
    return null;
}
exports.SendEntireBalance=SendEntireBalance;
//--------------Get-Transactions---------------//
function GetTx(txHash){
	var tx = web3.eth.getTransaction(txHash);
	sweetAlert("Updated","Transcation Details Updated","success")
	return tx;
}
exports.GetTx=GetTx;
//--------------------Transaction-Count-----------------------------//
function GetTxCount(BlockchainAddress){
	var count = web3.eth.getTransactionCount(BlockchainAddress);
	return count;
}
exports.GetTxCount=GetTxCount;
//---------------------Get-Tranasactions-By-Address---------------------//
function getTxByAddress(myaddress, startBlockNumber, endBlockNumber) {
       if (endBlockNumber == null) {
          endBlockNumber = web3.eth.blockNumber;
          // console.log("Using endBlockNumber: " + endBlockNumber);
        }
	   if (startBlockNumber == null) {
	      startBlockNumber = endBlockNumber - 1000;
	      // console.log("Using startBlockNumber: " + startBlockNumber);
	    }
        // console.log("Searching for transactions to/from account \"" + myaddress + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
	   for (var i = startBlockNumber; i <= endBlockNumber; i++) {
	     if (i % 1000 === 0) {
	      // console.log("Searching block " + i);
	     }
	     var block = web3.eth.getBlock(i, true);
	     if (block != null && block.transactions != null) {
	         	// eslint-disable-next-line
	         block.transactions.forEach( function(e) {
		        if (myaddress === "*" || myaddress === e.from || myaddress === e.to) {
		            console.log(
		                "   tx hash         : " + e.hash + "\n"
			          + "   nonce           : " + e.nonce + "\n"
			          + "   blockHash       : " + e.blockHash + "\n"
			          + "   blockNumber     : " + e.blockNumber + "\n"
			          + "   transactionIndex: " + e.transactionIndex + "\n"
			          + "   from            : " + e.from + "\n" 
			          + "   to              : " + e.to + "\n"
			          + "   value           : " + e.value + "\n"
			          + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
			          + "   gasPrice        : " + e.gasPrice + "\n"
			          + "   gas             : " + e.gas + "\n"
			          + "   input           : " + e.input
				    );
			    }
            })
        }
        console.log("No Tranasactions Found !!!!");
    }
}
exports.getTxByAddress=getTxByAddress;

//---------------------------------------Get-Transaction-Hash-And-Input-Data-Decoder-Using-Abi-And-RawInput----------------------------------//
function GetTxData(txHash,abi){
		var tx = web3.eth.getTransaction(txHash);
	    // var abi = [ { "constant": true, "inputs": [ { "name": "_CertificateId", "type": "uint256" } ], "name": "GetDates", "outputs": [ { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_CertificateId", "type": "uint256" }, { "name": "_LawyerName", "type": "string" }, { "name": "_WorkingStatus", "type": "string" }, { "name": "_LawyerType", "type": "string" }, { "name": "_GeneratedDate", "type": "string" } ], "name": "LawyerDetail", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_CertificateId", "type": "uint256" } ], "name": "GetLawyerDetails", "outputs": [ { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_CertificateId", "type": "uint256" }, { "name": "_LawyerRegistrationDate", "type": "string" }, { "name": "_LawyerRegistrationExpiryDate", "type": "string" }, { "name": "_Target", "type": "string" }, { "name": "_SignatureId", "type": "string" } ], "name": "Date", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "msg", "type": "string" }, { "indexed": false, "name": "LawyerName", "type": "string" }, { "indexed": false, "name": "WorkingStatus", "type": "string" }, { "indexed": false, "name": "LawyerType", "type": "string" }, { "indexed": false, "name": "GeneratedDate", "type": "string" } ], "name": "RegCert1", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "msg", "type": "string" }, { "indexed": false, "name": "LawyerRegistrationDate", "type": "string" }, { "indexed": false, "name": "LawyerRegistrationExpiryDate", "type": "string" }, { "indexed": false, "name": "Target", "type": "string" }, { "indexed": false, "name": "SignatureId", "type": "string" } ], "name": "RegCert2", "type": "event" } ];
		abiDecoder.addABI(abi);
		const data = tx.input;
		const decodedData = abiDecoder.decodeMethod(data);
		swal("Decoded Data \n",JSON.stringify(decodedData));
}
exports.GetTxData=GetTxData;
//------------------------------------------------------------------End-Of-Code--------------------------------------------------------------//