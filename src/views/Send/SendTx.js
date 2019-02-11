import React, { Component } from 'react';
import {Table,Grid,Button,Form} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import $ from 'jquery';
import Main from 'views/File.js';
class SendTx extends Component {
    constructor(props){
        super(props)
        this.state = {
          Password1:'',
          BCAddress:'null',
          Balance:'null',
          Receiver:'',
          Receiver1:'',
          Amount:'',
          TxCount:'null',
          ATxHash:'null',
          key:'',
          gas:'null',
          txnn:'',
          estGas:'null'
        }
        this.onReaderLoad = this.onReaderLoad.bind(this); 
        this.updatePasswordWhenLogin = this.updatePasswordWhenLogin.bind(this);
        this.updateReceiver = this.updateReceiver.bind(this);
        this.updateAmount = this.updateAmount.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onSendTx = this.onSendTx.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.onEstimate = this.onEstimate.bind(this);
    }
    updatePassword(a){
      this.setState({Password: a.target.value});
    }
    updateReceiver(b){
      this.setState({Receiver: b.target.value});
    }
    updateAmount(c){
      this.setState({Amount: c.target.value});
    }
    updatePasswordWhenLogin(d){
      this.setState({Password1: d.target.value});
    }
    updateReceiver1(f){
      this.setState({Receiver1: f.target.value});
    }
    onChange = async(event)=>{
      let reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(event.target.files[0]);
    }

    onReaderLoad = async(event)=>{
      var obj = JSON.parse(event.target.result);
      this.setState({key: obj});
    }
    onLogin = async () =>{
      try{
        Main.LoginWithKeyStoreFile(this.state.key,this.state.Password1);
        var Balance = Main.ViewBalance(this.state.key.address);
        this.setState({Balance:Balance});
        var khex="0x";
        var address=khex.concat(this.state.key.address);
        this.setState({BCAddress:address});
        this.setState({gas: Main.gas});
      }
      catch(error){
        console.log(error);
      }
    }
    onEstimate = () => {
      var est = Main.EstimateGas(this.state.Receiver,this.state.Amount);
      this.setState({estGas:est});
    }
    onSendTx = async() =>{
      try{
        var est = Main.EstimateGas(this.state.BCAddress,this.state.Amount);
        this.setState({estGas:est});
        var tx = Main.SendTx(this.state.BCAddress,this.state.Receiver,this.state.Amount,this.state.Password1,this.state.gas);
        this.setState({ATxHash:tx});
        var Count = Main.GetTxCount(this.state.BCAddress);
        this.setState({TxCount:Count});
      }
      catch(error){
        console.log(error);
      }
    }
    clearFields = () => { 
        this.setState({
          Password1:'',
          BCAddress:'null',
          Balance:'null',
          Receiver:'',
          Receiver1:'',
          Amount:'',
          TxCount:'null',
          ATxHash:'null',
          key:'',
          gas:'null',
          estGas:'null',
          txnn:''
        });
        $("#FileSelect").val('');
      }
    render(){
      return(
        <div className="App">
        <br/>
              <Grid>
                <Row>
                <Col>
                <Card body inverse style={{width:"100%",backgroundColor:'#222', borderColor:'#222',height:'75vw'}}>
                  <CardBody>
                <h4>Login To Send Ether</h4><br/>
                <Form>
                    <input type = "file" id ="FileSelect" onChange={this.onChange}/>
                </Form><br/>
                    <div>
                      <input type = "password" value={this.state.Password1} onChange = {this.updatePasswordWhenLogin} placeholder=" Enter Password "/>
                    </div><br/>
                      <Button onClick = {this.onLogin}>Login</Button><br/>
                  <Form>
                   <b>Receiver Address</b> <br/>
                     <input type="text" value={this.state.Receiver} onChange={this.updateReceiver} placeholder="Enter Receiver Address"/>
                   <br/><br/>
                   <b>Amount To Send (In Ethers)</b><br/>
                   <input type="text" value={this.state.Amount} onChange={this.updateAmount} placeholder="Enter Amount"/>
                   <br/>
                  </Form>
                  <br/>
                  <div>
                        <button className= "btn btn-default" onClick={this.onEstimate}>EstimateGas</button> <Button name="clearFields"  className ="btn btn-default" onClick={this.clearFields}>Clear</Button> <br/>
                        <button className= "btn btn-default" onClick={this.onSendTx}>Send</button>
                  </div>
                  <br/>
                <Table bordered responsive>
                    <thead>
                        <tr>
                          <th>Property</th>
                          <th>Values</th>
                        </tr>
                    </thead>
                    <tbody>
                     <tr>
                       <td>Balance</td>
                       <td>{this.state.Balance}</td>
                     </tr>
                     <tr>
                       <td>My Address </td>
                       <td>{this.state.BCAddress}</td>
                     </tr>
                     <tr>
                        <td>Receiver Address</td>
                        <td>{this.state.Receiver}</td>
                     </tr>
                     <tr>
                       <td>Enter Amount To Send </td>
                       <td>{this.state.Amount}</td>
                     </tr>
                     <tr>
                       <td>Estimate Gas</td>
                       <td>{this.state.estGas}</td>
                     </tr>
                     <tr>
                      <td>Gas</td>
                      <td>{this.state.gas}</td>
                     </tr>
                     <tr>
                      <td>Transaction Hash </td>
                      <td>{this.state.ATxHash}</td>
                     </tr>
                     <tr>
                      <td>Transaction Count </td>
                      <td>{this.state.TxCount}</td>
                     </tr>
                        </tbody>
                   </Table><br/>
              </CardBody>
              </Card>
                </Col>
                </Row>
          </Grid>
        </div>
       );
    }
}
export default SendTx;