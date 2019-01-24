import React, { Component } from 'react';
import {Table,Grid,Button} from 'react-bootstrap';
import { Card,CardBody,Row,Col} from 'reactstrap';
import Main from 'views/File.js'
class CreateAccount extends Component{
  constructor(props){
      super(props)
      this.state = {
        Password:'',
        PrivateKey:'null'
      }
      this.updatePassword = this.updatePassword.bind(this);
      this.onCreate = this.onCreate.bind(this);
  }
  updatePassword(a){
      this.setState({Password: a.target.value});
    }
  onCreate = async () => {
    try{
      var a = Main.KeyStoreGen(this.state.Password);
      this.setState({PrivateKey:a});
    }
    catch(error){
      console.log(error);
    }
  }
    render(){
      return(
        <div className="App">
              <br/><br/>
              <Grid>
                <Row>
                <Col>
                <Card body inverse style={{backgroundColor:'#222', borderColor:'#222',height:'28vw'}}>
                  <CardBody>
                  <br/>
                   <h3>Enter New Password</h3><br/>
                   <div>
                      <input type ="password" value = {this.state.Password} onChange = {this.updatePassword} placeholder="Enter Password"/>
                   </div>
                   <br/><br/>
                    <Button onClick = {this.onCreate}>Download Keystore</Button><br/><br/>
                   <br/>
                    <Table>
                    <tbody>
                    <tr>
                    <td>PrivateKey</td>
                    <td>{this.state.PrivateKey}</td>
                    </tr>
                    </tbody>
                    </Table><br/><br/>
                </CardBody>
                </Card>
                </Col>
                </Row>
                </Grid>
        </div>
      );
    }
}
export default CreateAccount;