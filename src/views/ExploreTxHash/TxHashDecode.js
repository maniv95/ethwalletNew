import React, { Component } from 'react';
import {Grid,Button} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import Main from 'views/File.js';
class TxData extends Component{
   constructor(props){
	   	super(props);
	   	this.state = {
	   		txhash:'0xf649185c3f069c9c0a48b2ac65c2e739018f4e61587cf9cd61de80817ce7477a',
	   		abi:[ { "constant": true, "inputs": [ { "name": "_CertificateId", "type": "uint256" } ], "name": "GetDates", "outputs": [ { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_CertificateId", "type": "uint256" }, { "name": "_LawyerName", "type": "string" }, { "name": "_WorkingStatus", "type": "string" }, { "name": "_LawyerType", "type": "string" }, { "name": "_GeneratedDate", "type": "string" } ], "name": "LawyerDetail", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_CertificateId", "type": "uint256" } ], "name": "GetLawyerDetails", "outputs": [ { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_CertificateId", "type": "uint256" }, { "name": "_LawyerRegistrationDate", "type": "string" }, { "name": "_LawyerRegistrationExpiryDate", "type": "string" }, { "name": "_Target", "type": "string" }, { "name": "_SignatureId", "type": "string" } ], "name": "Date", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "msg", "type": "string" }, { "indexed": false, "name": "LawyerName", "type": "string" }, { "indexed": false, "name": "WorkingStatus", "type": "string" }, { "indexed": false, "name": "LawyerType", "type": "string" }, { "indexed": false, "name": "GeneratedDate", "type": "string" } ], "name": "RegCert1", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "msg", "type": "string" }, { "indexed": false, "name": "LawyerRegistrationDate", "type": "string" }, { "indexed": false, "name": "LawyerRegistrationExpiryDate", "type": "string" }, { "indexed": false, "name": "Target", "type": "string" }, { "indexed": false, "name": "SignatureId", "type": "string" } ], "name": "RegCert2", "type": "event" } ]
      }
	   this.onUpdateHash = this.onUpdateHash.bind(this);
	   this.onUpdateAbi = this.onUpdateAbi.bind(this);
    }
    onUpdateHash(a){
   		this.setState({txhash: a.target.value});
   	}
   	onUpdateAbi(b){
   		this.setState({abi: b.target.value });
   	}
   	onClick = async () => {
   	 try{
   	 	  await Main.GetTxData(this.state.txhash,this.state.abi);
   	 }
     catch(error){
     	console.log(error);
     }
   	}
   	clearFields = () => { 
    this.setState({
      txhash:'',
      abi:[]
    });
  }
    render(){
        return(
        	<div className="App">
              <br/><br/><br/>
              <Grid>
                <Row>
                <Col>
                <Card body inverse style={{backgroundColor:'#222', borderColor:'#222',height:'28vw'}}>
                  <CardBody>
                   <h4>Enter Tx Hash To Decode</h4>
                   <div>
                      <input type ="text" value = {this.state.txhash} onChange = {this.onUpdateHash} placeholder="Enter TxHash"/>
                   </div><br/>
                   <h4>Enter ABI</h4>
                   <div>
                      <input type ="text" value = {this.state.abi} onChange = {this.onUpdateAbi} placeholder="Enter ABI"/>
                   </div>
                   <br/>
                    <Button onClick = {this.onClick}>Get Details</Button>  <Button name="clearFields" onClick={this.clearFields}>Clear</Button>
                 </CardBody><br/>
                </Card>
                </Col>
                </Row>
                </Grid>
        </div>
        );
    }
}
export default TxData;