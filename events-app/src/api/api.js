import { 
    CREATE_USER, 
    USER_CREATE_FAIL,
    CREATE_USER_EVENTS,
    EVENTS_CREATION_FAILED
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
            "password": password,
            "events": []
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
    const events = new Array(user.events)
    let flag = true

    fetch(`${CREATE_USER_EVENTS}/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "events": events
        })
    })
    .then((response)=> {
        if (response.status < 200 || response.status > 201) {
            flag = false
            throw new Error(EVENTS_CREATION_FAILED)
        }
        return response.json()
    })
    .then(res=>{
        if (!res.id) {
            flag = false
            throw new Error(EVENTS_CREATION_FAILED)
        }
    })
    .catch(err=> {
        flag = false
        console.error(err)
    })

    return flag
}
export {checkUser, addUser, addEventToUser}