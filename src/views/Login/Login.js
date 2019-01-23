import React, { Component } from 'react';
import {Table,Grid,Button,Form} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import Main from 'views/File.js';
class Login extends Component{
  constructor(props){
      super(props)
      this.state = {
        Password1:'',
        BCAddress:'null',
        Balance:'null',
        key:''
      }
      this.onReaderLoad = this.onReaderLoad.bind(this); 
      this.updatePasswordWhenLogin = this.updatePasswordWhenLogin.bind(this);
      this.onLogin = this.onLogin.bind(this);
  }
    updatePasswordWhenLogin(d){
      this.setState({Password1: d.target.value});
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
      }
      catch(error){
        console.log(error);
      }
    }
    render() {
      return(
        <div className="App">
             <br/>
              <Grid>
                <div>
                <Row>
                <Col>
                <Card body inverse style={{width:"100%",backgroundColor:'#222', borderColor:'#222',height:'40vw'}}>
                  <CardBody><br/>
                  <h3 style={{color:"white"}}>Login Using KeyStore File</h3><br/>
                <Form>
                    <input type = "file" onChange={this.onChange}/>
                </Form><br/><br/>
                    <div>
                      <input type = "password" value = {this.state.Password1} onChange = {this.updatePasswordWhenLogin} placeholder=" Enter Password "/>
                    </div><br/>
                      <Button onClick = {this.onLogin}>Login</Button><br/><br/>
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
                       <td>Address</td>
                       <td>{this.state.BCAddress}</td>
                     </tr>
                     <tr>
                       <td>Balance</td>
                       <td>{this.state.Balance}</td>
                     </tr>
                    </tbody>
                </Table>
              </CardBody>
              </Card>
                </Col>
                </Row>
                </div>
            </Grid>
        </div>
      );
    }
}
export default Login;