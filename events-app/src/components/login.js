import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useSelector, useDispatch } from 'react-redux'
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    setIsLoginFalse, 
    setEmail, 
    setPassword, 
    setUsername,
    setErrorMsg
} from "../stores/loginSlice"
import { checkUser } from "../api/loginAPI"
import { validateRegistration } from "../constants/validate"
import Alert from 'react-bootstrap/Alert';

export default function Login() {
    const {isLogin, username, email, password, error_msg} = useSelector((store)=> store.login)
    const dispatch = useDispatch()

    function validateCred(email, password) {
        const flag = validateRegistration(email, password)

            if (flag.length > 0 || flag.msg) {
                dispatch(setErrorMsg(flag))
            } else {
                dispatch(setErrorMsg(""))
            }
    }

    function handleLogin() {
        console.log("Login")
        checkUser(email, password)
        validateCred(email, password)
    }

    function handleRegister() {
        console.log("Sign up")

        if (username.length === 0) {
            dispatch(setErrorMsg("*Invalid Username"))
            return
        }
        validateCred(email, password)
    }

    return (
            <Card className="text-center">
                <Card.Header>{isLogin ? "SIGN IN" : "SIGN UP"}</Card.Header>
                <Card.Body>
                    { error_msg.msg ?
                        <Alert variant="danger">
                            {error_msg.msg}
                            <ul>
                                {error_msg.rules.map((rule, i)=><li key={i}>{rule}</li>)}
                            </ul>
                        </Alert> 
                        : error_msg.length > 0 && <Alert variant="danger">{error_msg}</Alert>}
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
    )
}