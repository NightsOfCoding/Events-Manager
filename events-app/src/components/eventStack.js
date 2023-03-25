import Stack from "react-bootstrap/Stack";
import { useSelector, useDispatch } from "react-redux";
import {MdDeleteForever} from "react-icons/md";
import {GiQueenCrown} from "react-icons/gi";
import {setFormData} from "../stores/formSlice";


export default function EventStack() {
    const {events} = useSelector((store)=>store.session)
    const dispatch = useDispatch()

    function handleForm(e) {
        console.log("handleForm")
        const event_id = parseInt(e.target.getAttribute("value"))
        let event = events.find((evt)=> evt.id === event_id)
        dispatch(setFormData(event))
    }

    function deleteEvent(e) {
        const event_id = e.target.getAttribute("value")
        console.log(event_id)
    }

    function EventItems() {
        return (events.map((event) => {
                return <div key={event.id} value={event.id} className="event" onClick={handleForm}>
                    <div className="eventDetails">
                        <p>{event.eventname}</p>
                        <span className="premiumIcon">{event.eventtype === "Premium" && <GiQueenCrown/>}</span>
                    </div>
                    
                    <div className="deleteEventWrapper" key={event.id} value={event.id} onClick={deleteEvent}>
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