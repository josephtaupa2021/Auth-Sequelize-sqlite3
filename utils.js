const db = require('./db.js')
function matchCredentials(requestBody) {
    let user = db.Account[requestBody.username]
    if (user !== undefined
        && requestBody.password === user.password) {
        return true
    } else {
        return false
    }
}
module.exports = matchCredentials