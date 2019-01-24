import React,{Component} from 'react';
import {Grid} from 'react-bootstrap';
import {Card,CardBody,Row,Col} from 'reactstrap';
class Home extends Component{
  render(){
    return(
      <div>
      <br/><br/>
      <Grid>
      <Row>
      <Col>
      <Card body inverse style={{backgroundColor:'#222', borderColor:'#222',height:'15vw'}}>
      <CardBody>
      <h2>Welcome !</h2>  
      <p>
      By Using This Wallet, You Can Create an New Blockchain Account, Send Transactions, Get Transaction Details, <br/>A Lot More Coming Soon...
      </p>
      </CardBody>
      </Card>
      </Col>
      </Row>
      </Grid>
      </div>
    );
  }
}
export default Home;