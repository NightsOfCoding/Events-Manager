import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventStack from "./eventStack";
import EventsForm from "./eventsForm";
import { useSelector } from "react-redux";
import {BsCurrencyDollar} from "react-icons/bs";

import './events.css'

export default function UserEvents() {
    const {total_price} = useSelector((store)=>store.session)


    return (
        <div>
            <Container className="eventWrapper">

            

                <div className="eventContainer">
                <EventStack />
                <EventsForm />
                    {/* <Col sm={4}><EventStack /></Col>
                    <Col sm={8}><EventsForm /></Col> */}
                </div>

                <div className="kpiWrapper">
                    <p>Total price</p>
                    <h1><span>{total_price} </span><BsCurrencyDollar /></h1>
                </div>
            </Container>
        </div>
    )
}