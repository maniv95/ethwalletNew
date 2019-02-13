import React, { Component } from 'react';
import {Grid,Button,Form} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import Main from 'views/File.js';
import $ from 'jquery';
class TxData extends Component{
   constructor(props){
	   	super(props);
	   	this.state = {
	   		txhash:'0x206adec279867f8e27bc49b076840b5b6e031e769cbeab81b2e8817f2044ebd2',
        abi:[]
      }
	   this.onUpdateHash = this.onUpdateHash.bind(this);
	   this.onUpdateAbi = this.onUpdateAbi.bind(this);
    }
    onUpdateHash(a){
   		this.setState({txhash: a.target.value});
   	}
   	onUpdateAbi(b){
   		this.setState({abi: b.target.value});
   	}
    onChange = async(event)=>{
      let reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(event.target.files[0]);
    }

    onReaderLoad = async(event)=>{
      var obj = JSON.parse(event.target.result);
      this.setState({abi: obj});
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
    $("#FileSelect").val('');
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
                   <h4>Upload ABI</h4>
                   <Form>
                    <input type = "file" id ="FileSelect" onChange={this.onChange}/>
                </Form><br/><br/>
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