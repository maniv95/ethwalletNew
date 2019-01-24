import React, { Component } from 'react';
import {Grid,Form,Button} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import Main from 'views/File.js';
class GetTxByAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
          BCAddress:'0x421a167a34932e90e4e5593739279e660314ec6d',
          startBlockNumber:'2000',
          endBlockNumber:'3000',
        }
        this.updateStartBlockNumber = this.updateStartBlockNumber.bind(this);
        this.updateEndBlockNumber = this.updateEndBlockNumber.bind(this);
        this.updateBCAddress = this.updateBCAddress.bind(this);
        this.onGetTxByAddress=this.onGetTxByAddress.bind(this);
    }
    updateGTxHash(e){
      this.setState({GTxHash: e.target.value});
    }
    updateStartBlockNumber(g){
      this.setState({startBlockNumber: g.target.value});
    }
    updateEndBlockNumber(h){
      this.setState({endBlockNumber: h.target.value});
    }
    updateBCAddress(i){
      this.setState({BCAddress: i.target.value});
    }
    onGetTxByAddress = async () =>{
      try{
        Main.getTxByAddress(this.state.BCAddress,this.state.startBlockNumber,this.state.endBlockNumber);
      }
      catch(error){
        console.log(error);
      }
    }
    render(){
      return(
        <div className="App">
            <br/><br/><br/><br/><br/><br/>
              <Grid>
                <Row>
                <Col>
                <Card body inverse style={{width:"100%",backgroundColor:'#222', borderColor:'#222',height:'29vw'}}>
                  <CardBody>
                    <Form>
                      <b>Enter Blockchain Address</b><br/><br/>
                      <input type="text" value={this.state.BCAddress} onChange={this.updateBCAddress} placeholder="Enter Blockchain Address"/><br/><br/>
                      <b>Start Block Number</b><br/><br/>
                      <input type="text" value={this.state.startBlockNumber} onChange={this.updateStartBlockNumber} placeholder="Enter StartBlockNumber"/>
                      <br/>
                      <br/>
                      <b>End Block Number</b><br/><br/>
                      <input type="text" value={this.state.endBlockNumber} onChange={this.updateEndBlockNumber} placeholder="Enter EndBlockNumber"/>
                    </Form>
                      <br/>
                    <Button onClick={this.onGetTxByAddress}>Get Transactions</Button>
                    <br/><br/>
                  <br/>
                  </CardBody>
              </Card>
                </Col>
                </Row>
               </Grid>
        </div>
       );
    }
}
export default GetTxByAdd;