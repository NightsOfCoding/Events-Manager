import { GET_USER } from "../constants/constants"

function checkUser(email, password) {
    fetch(`${GET_USER}${email}`)
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(res=> {
        console.log(res)
    }).catch(err => {
        console.log("No User Found")
        console.log(err)
    })
}

export {checkUser}