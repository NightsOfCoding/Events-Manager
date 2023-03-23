import {
    EMAIL_PATTERN,
    PASSWORD_PATTERN,
    INVALID_EMAIL,
    INVALID_PASSWORD
} from "./constants"

function validateRegistration(email, pwd) {

    if (!email.match(EMAIL_PATTERN)) {
        return INVALID_EMAIL
    }

    if (!pwd.match(PASSWORD_PATTERN)) {
        return INVALID_PASSWORD
    }
    return true
}

export {validateRegistration}