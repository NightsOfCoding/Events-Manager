import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { 
    setEventName,
    setEventDate,
    setEventDesc,
    setEventPrice,
    setEventType,
    setEventTc
} from "../stores/formSlice";
import { setAlerts, setAlertTimeOut } from "../stores/alertsSlice";
import { useDispatch } from "react-redux";
import { validateForm } from "../constants/validate";
import { useSelector } from "react-redux";
import { addEventToUser } from "../api/api";
import { setLoggeduserEmail } from "../stores/sessionSlice";
import { EVENTS_CREATION_FAILED, EVENTS_CREATED } from "../constants/constants";

export default function EventsForm() {
    const {loggedUserEmail} = useSelector((store)=>store.session)
    const {alertType, alertMsg, hide, show} = useSelector((store)=>store.alert)
    const form = useSelector((store)=>store.form)
    const dispatch = useDispatch()

    function closeAlert() {
        setTimeout(()=> {
            dispatch(setAlertTimeOut())
        }, show)
    }
    function handleSubmit(e) {
        const flag = validateForm(form, loggedUserEmail)

        if (flag.field.length > 0) {
            let msg = flag.msg+flag.field
            dispatch(setAlerts({"msg": msg, "type": "danger"}))
            closeAlert()
            return
        } else {
            let response = addEventToUser(form, loggedUserEmail)
            if (response) {
                dispatch(setLoggeduserEmail(loggedUserEmail))
                dispatch(setAlerts({"msg": EVENTS_CREATED, "type": "success"}))
                closeAlert()
            } else {
                dispatch(setAlerts({"msg": EVENTS_CREATION_FAILED, "type": "danger"}))
                closeAlert()
            }
        }
    }

    function handleText(event) {
        if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
        }
    }

    function FormAlerts() {
        return (
            <>
                {!hide && <Alert variant={alertType}>{alertMsg}</Alert>}
            </>
        )
        
    }

    return (
        <div>
            <Form>
                <FormAlerts/>
                <Row>
                    <Col>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column>Event Name</Form.Label>
                        <Col>
                            <Form.Control type="text" placeholder="Name Of Event" onChange={(e)=>dispatch(setEventName(e.target.value))}/>
                        </Col>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group as={Row}>
                        <Form.Label column>Event Date</Form.Label>
                        <Col>
                            <Form.Control type="date" placeholder="--Select Date--" onChange={(e)=>dispatch(setEventDate(e.target.value))}/>
                        </Col>
                    </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Description" rows={5} onChange={(e)=>dispatch(setEventDesc(e.target.value))}/>
                </Form.Group>
                <Row>
                    <Form.Group as={Row}>
                        <Form.Label column>Price</Form.Label>
                        <Col>
                            <Form.Control min="0" type="number" placeholder="Event Price" onKeyPress={handleText} onChange={(e)=>dispatch(setEventPrice(e.target.value))}/>
                        </Col>
                    </Form.Group>
                </Row>
                <hr/>
                <Row>
                    <Form.Group as={Row}>
                        <Form.Label column>Event Booking Type</Form.Label>
                        <Col>
                            <Form.Check type="radio" name="BookingType" value="Premium" label="Premium" onClick={(e)=>dispatch(setEventType(e.target.value))}/>
                            <Form.Check type="radio" name="BookingType" value="Normal" label="Normal" onClick={(e)=>dispatch(setEventType(e.target.value))}/>
                        </Col>
                    </Form.Group>
                </Row>
                <hr/>
                <Row>
                    <Form.Group as={Row}>
                        <Form.Label column>Accept Terms & Conditions</Form.Label>
                        <Col>
                            <Form.Check type="checkbox" name="t&c" onClick={(e)=>dispatch(setEventTc(e.target.checked))}/>
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Button type="button" onClick={handleSubmit}>Submit</Button>
                </Row>
            </Form>
        </div>
    )
}