import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux'
import Form from "react-bootstrap/Form"
import {
    setIsLoginFalse, 
    setEmail, 
    setPassword, 
    setUsername,
    setErrorMsg,
    setSuccessMsg,
    setLoggedIn
} from "../stores/loginSlice"
import { 
    checkUser, 
    addUser 
} from "../api/api"
import { validateRegistration } from "../constants/validate"
import { 
    USER_EXISTS, 
    USER_CREATED, 
    USER_LOGGED, 
    USER_NOT_FOUND,
    USERNAME_INVALID
} from "../constants/constants"
import LoginAlert from "./loginAlert"
import { useNavigate } from "react-router-dom"
import {
    setLoggeduserEmail,
    setUserSession
} from "../stores/sessionSlice"

export default function Login() {
    const {isLogin, username, email, password} = useSelector((store)=> store.login)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function validateCred(email, password) {
        const flag = validateRegistration(email, password)

            if (flag.length > 0 || flag.msg) {
                dispatch(setErrorMsg(flag))
                dispatch(setLoggedIn(false))
                return
            } else {
                dispatch(setErrorMsg(""))
                dispatch(setLoggedIn(true))
                return true
            }
    }

    function handleLogin() {
        const flag = validateCred(email, password)
        if (flag) {
            const userExist = checkUser(email, password)

            if (userExist) {
                dispatch(setSuccessMsg(USER_LOGGED))
                dispatch(setLoggedIn(true))
                dispatch(setLoggeduserEmail(email))
                dispatch(setUserSession(true))
                navigate("/Events")
            } else {
                dispatch(setErrorMsg(USER_NOT_FOUND))
                dispatch(setLoggedIn(false))
            }
        }
    }

    function handleRegister() {

        if (username.length === 0) {
            dispatch(setErrorMsg(USERNAME_INVALID))
            return
        }
        const flag = validateCred(email, password)

        if (flag) {
            const userExist = addUser(email, password, username)

            if (!userExist) {
                dispatch(setErrorMsg(USER_EXISTS))
                dispatch(setLoggedIn(false))
            } else {
                dispatch(setSuccessMsg(USER_CREATED))
                dispatch(setLoggedIn(true))
                navigate("/")
            }
        }
    }

    return (
        <Container>
            <Row>
                <Col xs={8} md={4}/>
                <Col xs={8} md={4}>
                    <LoginCard/>
                </Col>
                <Col xs={8} md={4}/>
            </Row>
        </Container>
    )

    function LoginCard() {
        return (
            <>
                <Card className="text-center">
                <Card.Header>{isLogin ? "SIGN IN" : "SIGN UP"}</Card.Header>
                <Card.Body>
                    <LoginAlert/>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                            <Form.Label column sm="4">
                                Email
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(e)=> dispatch(setEmail(e.target.value))}/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        {!isLogin &&
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm="4">
                                User Name
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control required type="text" placeholder="User name" value={username} onChange={(e)=>dispatch(setUsername(e.target.value))}/>
                            </Col>
                        </Form.Group>
                        }

                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm="4">
                                Password
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control required type="password" placeholder="Password" value={password} onChange={(e)=>dispatch(setPassword(e.target.value))}/>
                            </Col>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            {isLogin && <Button variant="primary" onClick={handleLogin}>SIGN IN</Button>}
                            {!isLogin && <Button variant="primary" onClick={handleRegister}>SIGN UP</Button>}
                        </div>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">{isLogin ? "Not Registered? " : "Already a user, Sign In"}
                    {
                        isLogin && <span>
                            <Button variant="light" size="sm" onClick={()=>dispatch(setIsLoginFalse())}>CREATE NEW</Button>
                        </span>
                    }
                </Card.Footer>
                </Card>
            </>
        )
    }
}