import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { 
    setIsLoginTrue, 
    setIsLoginFalse
} from '../stores/loginSlice';
import { useDispatch } from 'react-redux';

export default function Navigation() {
    const dispatch = useDispatch()

    return (
        <Navbar>
            <Container fluid>
                <Navbar.Brand>
                    Events Manager
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav variant="tabs">
                        {/* <Button variant="light">Sign-in</Button>
                        <Button variant="light">Sign-up</Button> */}
                        <Nav.Item>
                            <Nav.Link onClick={()=> dispatch(setIsLoginTrue())}>Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={()=> dispatch(setIsLoginFalse())}>Register</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}