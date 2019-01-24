import React from 'react';
import { Card,CardBody,Row,Col} from 'reactstrap';
const Home = () => (
    <div>
    <br/><br/>
    <Row>
    <Col>
    <Card body inverse style={{width:'100%',backgroundColor:'#222', borderColor:'#222',height:'15vw'}}>
    <CardBody>
    <h2>Welcome to the Simple Ether Wallet !!!</h2>  
     <p>
      By Using This Wallet, You Can Create an New Blockchain Account, Send Transactions, Get Transaction Details, <br/>A Lot More Coming Soon...
     </p>
     </CardBody>
    </Card>
    </Col>
    </Row>
    </div>
)
export default Home;