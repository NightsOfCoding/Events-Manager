//  API URL
 export const GET_USERS_URL = "http://localhost:2222/users"
 export const GET_USER = "http://localhost:2222/users?email="
 export const CREATE_USER = "http://localhost:2222/users"
 export const CREATE_USER_EVENTS = "http://localhost:2222/users.events"

//  Messages
export const EMPTY_EMAIL_FIELD = "Please enter E-mail"
export const EMPTY_PWD_FIELD = "Please enter Password"

// PATTERN Messages
export const INVALID_EMAIL = "*Invalid E-mail"
export const INVALID_PASSWORD = {
    "msg":"*Invalid Password, password should contain",
    "rules": ["Minimum 8 characters", "Atleast 1 uppercase and 1 special character"]
}

// PATTERN FOR VALIDATION
export const EMAIL_PATTERN = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/