import Stack from "react-bootstrap/Stack";
import { useSelector, useDispatch } from "react-redux";
import {MdDeleteForever} from "react-icons/md";
import {GiQueenCrown} from "react-icons/gi";
import {setFormData} from "../stores/formSlice";
import Button from 'react-bootstrap/Button';
import {deleteEventForUser} from "../api/api"

export default function EventStack() {
    const {events} = useSelector((store)=>store.session)
    const dispatch = useDispatch()

    function handleForm(e) {
        e.preventDefault()

        if (e.target === e.currentTarget) {
            console.log("handleForm")
            const event_id = parseInt(e.target.getAttribute("value"))
            let event = events.find((evt)=> evt.id === event_id)
            dispatch(setFormData(event))
        }
    }

    function deleteEvent(e) {
        const event_id = e.currentTarget.getAttribute("value")
        deleteEventForUser(event_id)
    }

    function EventItems() {
        return (events.map((event) => {
                return <div key={event.id} value={event.id} className="event" onClick={handleForm}> {/*onClick={handleForm}*/}
                    <div className="eventDetails">
                        <p>{event.eventname}</p>
                        <span className="premiumIcon">{event.eventtype === "Premium" && <GiQueenCrown/>}</span>
                    </div>

                    <div className="deleteEventWrapper" value={event.id} onClick={deleteEvent}> {/*onClick={deleteEvent}*/}
                        <MdDeleteForever/>
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