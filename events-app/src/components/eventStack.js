import Stack from "react-bootstrap/Stack";
import { useSelector } from "react-redux";
import {MdDeleteForever} from "react-icons/md";
import {GiQueenCrown} from "react-icons/gi"
import Button from "react-bootstrap/Button"


export default function EventStack() {
    const {events} = useSelector((store)=>store.session)

    function EventItems() {
        return (events.map((event) => {
                return <div key={event.id} className="event">
                    <div className="eventDetails">
                        <p>{event.eventname}</p>
                        <span className="premiumIcon">{event.eventtype === "Premium" && <GiQueenCrown/>}</span>
                    </div>
                    
                    <div className="deleteEventWrapper">
                        <MdDeleteForever/>
                    </div>
                    
                    {/* <Button variant="outline-danger"><MdDeleteForever/></Button> */}
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