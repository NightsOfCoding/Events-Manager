import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { 
    setIsLoginTrue, 
    setIsLoginFalse
} from '../stores/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    clearSession
} from "../stores/sessionSlice";
import {FaUserCircle} from "react-icons/fa";

export default function Navigation() {
    const {loggedIn, isLogin } = useSelector((store)=>store.login)
    const {isUserLoggedIn, loggedInUser} = useSelector((store)=>store.session)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleSignOut() {
        dispatch(setIsLoginFalse())
        dispatch(clearSession())
        navigate("/")
    }

    function login() {
        dispatch(setIsLoginTrue())
        navigate("/")
    }

    function register () {
        dispatch(setIsLoginFalse())
        navigate("/")
    }

    function NavItems() {
        if (!loggedIn) {
            return (
                <>
                    <Nav.Item>
                        <Nav.Link onClick={login}>Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={register}>Register</Nav.Link>
                    </Nav.Item>
                </>
            )
        } else {
           return ( 
            <>
                <Nav.Item>
                    <Nav.Link onClick={handleSignOut}>Log Out</Nav.Link>
                </Nav.Item>
            </>
           )
        }
    }

    return (
        <Navbar>
            <Container fluid>
                <Navbar.Brand>
                    {isUserLoggedIn ? <div><FaUserCircle/>{loggedInUser}</div> : "Events Manager"}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav variant="tabs">
                        <NavItems/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

