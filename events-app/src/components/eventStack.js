import Stack from "react-bootstrap/Stack";
import { useSelector, useDispatch } from "react-redux";
import {GiQueenCrown} from "react-icons/gi";
import {setFormData} from "../stores/formSlice";
import {SlOptions} from "react-icons/sl";
import Button from 'react-bootstrap/Button';

export default function EventStack() {
    const {events} = useSelector((store)=>store.session)
    const dispatch = useDispatch()

    function handleForm(e) {
        console.log("handleForm")
        const event_id = parseInt(e.target.getAttribute("value"))
        let event = events.find((evt)=> evt.id === event_id)
        dispatch(setFormData(event))
    }

    // function deleteEvent(e) {
    //     const event_id = e.target.getAttribute("value")
    //     console.log(event_id)
    // }

    function EventItems() {
        return (events.map((event) => {
                return <div key={event.id} value={event.id} className="event" onClick={handleForm}> {/*onClick={handleForm}*/}
                    <div className="eventDetails">
                        <p>{event.eventname}</p>
                        <span className="premiumIcon">{event.eventtype === "Premium" && <GiQueenCrown/>}</span>
                    </div>

                    <div className="deleteEventWrapper" key={event.id} value={event.id}> {/*onClick={deleteEvent}*/}
                        <Button value={event.id}><SlOptions/></Button>
                    </div>
                </div>
            })
        )
    }

    return (
        <div className="eventStackWrapper">
            <p className="events-header">
                Events
            </p>
            <Stack gap={0}>
                <EventItems/>
            </Stack>
        </div>
    )
}