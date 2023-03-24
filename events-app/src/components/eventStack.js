import Stack from "react-bootstrap/Stack";
import { useSelector } from "react-redux";
import {MdDeleteForever} from "react-icons/md";
import {RiEdit2Fill} from "react-icons/ri";
import {GiQueenCrown} from "react-icons/gi"

export default function EventStack() {
    const {events} = useSelector((store)=>store.session)

    function EventItems() {
        return (events.map((events) => {
                return <div key={events.id} className="bg-light border">
                    {events.eventname}
                    <MdDeleteForever/>
                    <RiEdit2Fill/>
                </div>
            })
        )
    }

    return (
        <div>
            <header className="events-header">
                Events
            </header>
            <hr/>
            <Stack gap={0}>
                <EventItems/>
            </Stack>
        </div>
    )
}