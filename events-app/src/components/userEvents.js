import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventStack from "./eventStack";
import EventsForm from "./eventsForm";
import { useSelector } from "react-redux";

export default function UserEvents() {
    const {total_price} = useSelector((store)=>store.session)


    return (
        <div>
            <Container>
                <Row>
                    <Col sm={4}><EventStack/></Col>
                    <Col sm={8}><EventsForm/></Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm={4}>Total Price</Col>
                    <Col sm={8}>{total_price}</Col>
                </Row>
            </Container>
        </div>
    )
}