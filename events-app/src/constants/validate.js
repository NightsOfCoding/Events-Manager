import {
    EMAIL_PATTERN,
    PASSWORD_PATTERN,
    INVALID_EMAIL,
    INVALID_PASSWORD
} from "./constants"

import db from "../db.json"

function validateRegistration(email, pwd) {

    if (!email.match(EMAIL_PATTERN)) {
        return INVALID_EMAIL
    }

    if (!pwd.match(PASSWORD_PATTERN)) {
        return INVALID_PASSWORD
    }
    return true
}

function validateForm(form, loggedUserEmail) {
    let flag = {
        "field": "",
        "msg": "Mandatory Field "
    }

    if (form.eventName.length === 0) {
        flag.field = "Event Name"
        return flag
    }

    if (form.eventDate.length === 0) {
        flag.field = "Event Date"
        return flag
    }

    if (form.eventPrice.length === 0) {
        flag.field = "Price"
        return flag
    }

    if (form.eventType.length === 0) {
        flag.field = "Booking Type"
        return flag
    }

    if (form.eventTC === false) {
        flag.field = "Terms & Conditions"
        flag.msg = "Please accept "
        return flag
    }

    if (form.eventName.length > 0) {
        let events = db.events.filter((evt)=> evt.email === loggedUserEmail)
    
        if (events.length > 0) {
            events.forEach(evt => {
                if (evt.eventname === form.eventName) {
                    flag.field = "Please Provide Different Name"
                    flag.msg = "Unique Field Event Name "
                    return flag
                }
            });
        }
    }

    return flag
}
export {validateRegistration, validateForm}