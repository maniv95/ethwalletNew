import React, { Component } from 'react';
import {Table,Grid,Button,Form} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import Main from 'views/File.js';
class GetDetails extends Component {
  	constructor(props){
  	    super(props)
  	    this.state = {
  	      GTxHash:'0x206adec279867f8e27bc49b076840b5b6e031e769cbeab81b2e8817f2044ebd2',
  	      TxDetails:'',
  	      txn:'',
  	      key:'',
  	      gas:'null',
  	      nonce:'null',
          blockHash:'null',
          blockNumber:'null',
          TransactionIndex:'null',
          from:'null',
          to:'null',
          Value:'null',
          gasPrice:'null',
          input:'null',
  	    }
  	    this.updateGTxHash = this.updateGTxHash.bind(this);
        this.onGetTx=this.onGetTx.bind(this);
        this.clearFields = this.clearFields.bind(this);
  	}
  	updateGTxHash(e){
  		this.setState({GTxHash: e.target.value});
  	}
  	onGetTx = async() =>{
  		try{
  			var tx = Main.GetTx(this.state.GTxHash);
  			this.setState({
	        TxDetails: tx,
          nonce: tx.nonce,
          blockHash: tx.blockHash,
          blockNumber: tx.blockNumber,
          TransactionIndex: tx.transactionIndex,
          from: tx.from,
          to: tx.to,
          gas: tx.gas,
          gasPrice: tx.gasPrice.toString(),
          input: tx.input
  			})
  		}
  		catch(error){
  			console.log(error);
  		}
  	}
    clearFields = () => { 
    this.setState({
      GTxHash:'',
      TxDetails:'',
      txn:'',
      key:'',
      gas:'null',
      nonce:'null',
      blockHash:'null',
      blockNumber:'null',
      TransactionIndex:'null',
      from:'null',
      to:'null',
      Value:'null',
      gasPrice:'null',
      input:'null',
    });
  }
  	render(){
  		return(
  			<div className="App">
            <br/>
              <Grid>
                <Row>
                <Col>
                <Card body inverse style={{width:"100%",backgroundColor:'#222', borderColor:'#222',height:'50vw',overflow:'scroll'}}>
                  <CardBody>
                     <Form>
                        <b>Transaction Hash</b><br/><br/>
                        <input type="text" value={this.state.GTxHash} onChange={this.updateGTxHash} placeholder="Enter Tx Hash"/><br/>
                     </Form><br/>
                       <Button onClick={this.onGetTx}>Get TxDetails</Button>
                       <Button name="clearFields" onClick={this.clearFields}>Clear</Button>
                       <br/><br/>
                     <Table>
                        <thead>
                  			<tr>
                    			<th>Property</th>
                    			<th>Values</th>
                  			</tr>
                		</thead>
                        <tbody>
                         <tr>
                           <td>Nonce</td>
                           <td>{this.state.nonce}</td>
                         </tr>
                         <tr>
                           <td>Block Hash</td>
                           <td>{this.state.blockHash}</td>
                         </tr>
                         <tr>
                           <td>BlockNumber</td>
                           <td>{this.state.blockNumber}</td>
                         </tr>
                         <tr>
                           <td>From</td>
                           <td>{this.state.from}</td>
                         </tr>
                         <tr>
                           <td>To</td>
                           <td>{this.state.to}</td>
                         </tr>
                         <tr>
                           <td>Gas Price</td>
                           <td>{this.state.gasPrice}</td>
                         </tr>
                         <tr>
                           <td>Gas</td>
                           <td>{this.state.gas}</td>
                         </tr>
                         <tr>
                           <td>Input</td>
                           <td>{this.state.input}</td>
                         </tr>
                        </tbody>
                      </Table>
                  </CardBody>
              </Card>
                </Col>
                </Row>
               </Grid>
        </div>
  	   );
  	}
}
export default GetDetails;