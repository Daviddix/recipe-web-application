const noBodyDataError = {
    status : "failed",
    reason : "empty body",
    message : "body data cannot be empty"
}

const unknownError = {
    status : "failed",
    reason : "server error",
    message: "an error ocurred on the server"
}

const userNotFoundInDataBase = {
    status : "failed",
    reason : "user not found",
    message : "user not found in database, check your email and try again"
}

const wrongPassword = {
    status : "failed",
    reason : "wrong password",
    message : "the password you entered is incorrect, enter the correct one and try again"
}

const logoutError = {
    status : "failed",
    reason : "unknown",
    message : "an error ocurred when trying to log the user out"
}

module.exports = {noBodyDataError, unknownError, userNotFoundInDataBase, wrongPassword, logoutError}