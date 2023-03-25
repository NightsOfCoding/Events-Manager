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
import { clearAlerts } from '../stores/alertsSlice';
import { clearForm } from '../stores/formSlice';

import './navigation.css'

export default function Navigation() {
    const {loggedIn} = useSelector((store)=>store.login)
    const {isUserLoggedIn, loggedInUser} = useSelector((store)=>store.session)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleSignOut() {
        dispatch(setIsLoginFalse())
        dispatch(clearForm())
        dispatch(clearSession())
        dispatch(clearAlerts())
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
                    {isUserLoggedIn ? <div>
                        {/* <FaUserCircle/> */}
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                        <span className="userName">{loggedInUser}</span></div> : "Events Manager"}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar id="responsive-navbar-nav">
                    <Nav variant="tabs">
                        <NavItems/>
                    </Nav>
                </Navbar>
            </Container>
        </Navbar>
    )
}

