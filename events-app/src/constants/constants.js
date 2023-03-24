//  API URL
 export const GET_USERS_URL = "http://localhost:2222/users"
 export const GET_USER = "http://localhost:2222/users?email="
 export const CREATE_USER = "http://localhost:2222/users"
 export const CREATE_USER_EVENTS = "http://localhost:2222/users"

//  Messages
export const USER_NOT_FOUND = "User Not Found!"
export const USER_CREATE_FAIL = "Unable To Register User!"
export const USER_EXISTS = "User Already Exists"
export const USER_CREATED = "Successfully Registered"
export const USER_LOGGED = "Successfully Logged In!"
export const USERNAME_INVALID = "*Invalid Username"
export const EVENTS_CREATION_FAILED = "Failed To Create Event, Please try again later..."
export const EVENTS_CREATED = "Event Created!"

// PATTERN Messages
export const INVALID_EMAIL = "*Invalid E-mail"
export const INVALID_PASSWORD = {
    "msg":"*Invalid Password, password should contain",
    "rules": ["Minimum 8 characters", "Atleast 1 uppercase, 1 lowecase, and 1 special character"]
}

// PATTERN FOR VALIDATION
export const EMAIL_PATTERN = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/