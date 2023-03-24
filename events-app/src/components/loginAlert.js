import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert"

export default function LoginAlert() {
    const {loggedIn, error_msg, success_msg}=useSelector((store)=>store.login)
    const style = loggedIn ? "success" : "danger"
    const msg = loggedIn ? success_msg : error_msg
    
    if (!loggedIn) {
        if (error_msg.msg) {
            return (
                <Alert variant={style}>
                    {error_msg.msg}
                    <ul>
                        {error_msg.rules.map((rule, idx)=><li key={idx}>{rule}</li>)}
                    </ul>
                </Alert>
            )
        }
    }
    if (error_msg || success_msg) {
        return (
            <Alert variant={style}>{msg}</Alert>
        )
    }
}