import { 
    CREATE_USER, 
    USER_CREATE_FAIL,
    CREATE_USER_EVENTS,
} from "../constants/constants"

import db from "../db.json"

function checkUser(email, password) {
    const users = db.users

    if (users.length > 0) {
        let length = users.length
        for(let i=0; i<length; i++) {
            if (users[i].email === email && users[i].password === password) {
                return true
            }
        }
    }
    return false
}

function addUser(email, password, username) {
    const flag = validateUserAlreadyExists(email, password)

    if (!flag) {
        return false
    }

    fetch(`${CREATE_USER}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "username": username,
            "password": password
        })
    })
    .then(response => {
        if (response.status < 200 || response.status > 201) {
            throw new Error(USER_CREATE_FAIL)
        }
        return response.json()
    })
    .then(res=> {
        if (!res.id) {
            throw new Error(USER_CREATE_FAIL)
        }
    }).catch(err=> {
        console.error(err)
    })
    return flag
}

function validateUserAlreadyExists(email) {
    const users = db.users

    if (users.length > 0) {
        let length = users.length
        for(let i=0; i<length; i++) {
            if (users[i].email === email) {
                return false
            }
        }
    }
    return true
}

function addEventToUser(form, loggedUserEmail) {
    const user = db.users.find((user)=> user.email === loggedUserEmail)
    let flag = true

    fetch(`${CREATE_USER_EVENTS}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": user.email,
            "userid": user.id,
            "username": user.username,
            "eventname": form.eventName,
            "eventdate": form.eventDate,
            "eventdesc": form.eventDesc,
            "price": form.eventPrice,
            "eventtype": form.eventType,
            "eventtc": form.eventTC,
        })
    })
    .catch(err=> {
        console.error(err)
    })

    return flag
}

function deleteEventForUser(event_id) {
    fetch(`${CREATE_USER_EVENTS}/${event_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .catch(err=> {
        console.error(err)
    })
}
export {checkUser, addUser, addEventToUser, deleteEventForUser}