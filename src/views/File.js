//--------------------------------------------------------------Beginning-Of-Code-------------------------------------------------------//
//--------Node-Module-For-Keystore -------//
const keythereum = require("keythereum");
//--------Web3---------//
var Web3 = require('web3');
//----------Initialising-RPC-Port------------//
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//------------Node-Module-For-File-Download-----------------//
const fileDownload = require('react-file-download');
//------------Gas-Price-------------//
var gas=3000000;
exports.gas=gas;
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
    console.log(account);
}
exports.LoginWithKeyStoreFile=LoginWithKeyStoreFile;
//----------------Check-Balance---------------------//
function ViewBalance(BlockchainAddress){
	var Bal = web3.eth.getBalance(BlockchainAddress);
	return Bal.toString();
}
exports.ViewBalance=ViewBalance;
//--------------Sending-Transactions----------------//
function SendTx(FromAdd,ToAdd,amt,Password,gas){
	var unlockAccount = web3.personal.unlockAccount(FromAdd,Password);
	console.log("unlockAccount Success",FromAdd,unlockAccount);
	var Amount = web3.toWei(amt, "Ether")
	var txHash = web3.eth.sendTransaction({from:FromAdd,to:ToAdd, value:Amount,gas:gas});
	return txHash;
}
exports.SendTx=SendTx;
//----------------------Transfer-Entire-Balance------------------//
function SendEntireBalance(FromAdd,ToAdd,Password,gas){
	var unlockAccount = web3.personal.unlockAccount(FromAdd,Password);
    var price = web3.eth.gasPrice;  // current average price; or set your own
    var balance = web3.eth.getBalance(FromAdd);
    var value = balance.minus(gas * price);
    if (value.greaterThan(0)) {
        var txn = web3.eth.sendTransaction({from: FromAdd, to: ToAdd, gasPrice: price, gas: gas, value: value});
        alert("Transfer",FromAdd,"to", ToAdd, ":","TxHash:",txn);
        return txn;
    }
    alert("  Transfer "+ FromAdd +" to "+ ToAdd +": (No funds available)");
    console.log(unlockAccount);
    return null;
}
exports.SendEntireBalance=SendEntireBalance;
//--------------Get-Transactions---------------//
function GetTx(txHash){
	var tx = web3.eth.getTransaction(txHash);
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
          console.log("Using endBlockNumber: " + endBlockNumber);
        }
	   if (startBlockNumber == null) {
	      startBlockNumber = endBlockNumber - 1000;
	      console.log("Using startBlockNumber: " + startBlockNumber);
	    }
        console.log("Searching for transactions to/from account \"" + myaddress + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
	   for (var i = startBlockNumber; i <= endBlockNumber; i++) {
	     if (i % 1000 === 0) {
	      console.log("Searching block " + i);
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
//------------------------------------------------------------------End-Of-Code-------------------------------------------------------------------//