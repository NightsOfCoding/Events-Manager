import './App.css';
import Login from "./components/login"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from './components/navigation';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Container>
        <Row>
        <Col xs={8} md={4}/>
        <Col xs={8} md={4}>
          <Login/>
        </Col>
        <Col xs={8} md={4}/>
        </Row>
      </Container>
    </div>
  );
}

export default App;
