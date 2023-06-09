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
import { getUserEvents } from "../stores/sessionSlice";
import React from "react";

export default function EventsForm() {
    const {loggedUserEmail} = useSelector((store)=>store.session)
    const {eventName, eventDate, eventDesc, eventPrice, eventType, eventTC} = useSelector((store)=>store.form)
    const {alertType, alertMsg, hide, show} = useSelector((store)=>store.alert)
    const form = useSelector((store)=>store.form)
    const dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(getUserEvents())
    },[])

    function closeAlert() {
        setTimeout(()=> {
            dispatch(setAlertTimeOut())
        }, show)
    }
    
    function saveForm() {
        const flag = validateForm(form, loggedUserEmail)

        if (flag.field.length > 0) {
            let msg = flag.msg+flag.field
            dispatch(setAlerts({"msg": msg, "type": "danger"}))
            closeAlert()
            return
        } else {
            let response = addEventToUser(form, loggedUserEmail)
            if (!response) {
                return
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
        <div className="eventFormWrapper">
            {/* <Form> */}
                <FormAlerts/>
                <Row>
                    <Col>
                    <Form.Group as={Row} className="mb-3 customFormControl">
                        <Form.Label >Event Name</Form.Label>
                        <div>
                            <Form.Control type="text" placeholder="Name Of Event" value={eventName} onChange={(e)=>dispatch(setEventName(e.target.value))}/>
                        </div>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group as={Row} className="customFormControl">
                        <Form.Label >Event Date</Form.Label>
                        <div>
                            <Form.Control type="date" placeholder="--Select Date--" value={eventDate} onChange={(e)=>dispatch(setEventDate(e.target.value))}/>
                        </div>
                    </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3 customFormControl">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Description" value={eventDesc} rows={5} onChange={(e)=>dispatch(setEventDesc(e.target.value))}/>
                </Form.Group>
                <Row>
                    <Form.Group as={Row} className="customFormControl">
                        <Form.Label >Price</Form.Label>
                        <div>
                            <Form.Control min="0" type="number" placeholder="Event Price" value={eventPrice} onKeyPress={handleText} onChange={(e)=>dispatch(setEventPrice(e.target.value))}/>
                        </div>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Row} className="eventTypeWrapper">
                        <p>Event Booking Type</p>
                        <div className="eventTypeCheckWrapper">
                            <Form.Check type="radio" name="BookingType" checked={eventType === "Premium"} value="Premium" label="Premium" onChange={(e)=>dispatch(setEventType(e.target.value))}/>
                            <Form.Check type="radio" name="BookingType" checked={eventType === "Normal"} value="Normal" label="Normal" onChange={(e)=>dispatch(setEventType(e.target.value))}/>
                        </div>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Row}>
                        <div className="acceptTermsWrapper">
                            <Form.Check type="checkbox" name="t&c" checked={eventTC} onChange={(e)=>dispatch(setEventTc(e.target.checked))}/><Form.Label column>Accept Terms & Conditions</Form.Label>
                        </div>
                    </Form.Group>
                </Row>
                <Row>
                    <Button type="button" onClick={saveForm}>Save</Button>
                </Row>
            {/* </Form> */}
        </div>
    )
}
