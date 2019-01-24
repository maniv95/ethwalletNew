import React, { Component } from 'react';
import {Table,Grid,Button,Form} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import Main from 'views/File.js';
class SendEntireBal extends Component {
    constructor(props){
        super(props)
        this.state = {
          Password1:'',
          BCAddress:'null',
          Balance:'null',
          Receiver1:'',
          key:'',
          gas:'null',
          txn:'null'
        }
    this.onReaderLoad = this.onReaderLoad.bind(this); 
    this.updatePasswordWhenLogin = this.updatePasswordWhenLogin.bind(this);
    this.updateReceiver1 = this.updateReceiver1.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onSendEntireBal = this.onSendEntireBal.bind(this);
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
        this.setState({gas: Main.gas});
        var khex="0x";
        var address=khex.concat(this.state.key.address);
        this.setState({BCAddress:address});
      }
      catch(error){
        console.log(error);
      }
    }
  onSendEntireBal = async() =>{
      try{
        var txnn = Main.SendEntireBalance(this.state.BCAddress,this.state.Receiver1,this.state.Password1,this.state.gas);
        console.log(txnn);
        this.setState({txn: txnn})
      }
      catch(error){
        console.log(error);
      }
    }
    render(){
      return(
        <div className="App">
        <br/>
              <Grid>
                <Row>
                <Col>
                <Card body inverse style={{width:"100%",backgroundColor:'#222', borderColor:'#222',height:'53vw'}}>
                  <CardBody>
                    <h4> Login To Send Entire Ethers</h4><br/>
                <Form>
                    <input type = "file" onChange={this.onChange}/>
                </Form><br/>
                    <div>
                      <input type = "password" value = {this.state.Password1} onChange = {this.updatePasswordWhenLogin} placeholder=" Enter Password "/>
                    </div><br/>
                      <Button onClick = {this.onLogin}>Login</Button><br/>
                    <Form>
                    <b>Receiver Address</b><br/>
                    <input type="text" value={this.state.Receiver1} onChange={this.updateReceiver1} placeholder="Enter Receiver Address"/>
                    </Form>
                    <br/>
                         <div>
                           <Button onClick={this.onSendEntireBal}>Send Entire Balance</Button>
                         </div>
                         <br/>
                    <Table>
                      <thead>
                        <tr>
                          <th>Property</th>
                          <th>Values</th>
                        </tr>
                    </thead>
                     <tbody>
                       <tr>
                         <td>My Address</td>
                         <td>{this.state.BCAddress}</td>
                       </tr>
                       <tr>
                         <td>Balance</td>
                         <td>{this.state.Balance}</td>
                       </tr>
                       <tr>
                         <td>Receiver Address</td>
                         <td>{this.state.Receiver1}</td>
                       </tr>
                       <tr>
                        <td>Gas</td>
                        <td>{this.state.gas}</td>
                       </tr>
                       <tr>
                         <td>Transaction Hash</td>
                         <td>{this.state.txn}</td>
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
export default SendEntireBal;