const bcrypt = require('bcryptjs');
const saltRound = 10

let hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(saltRound);
    let hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

let hashCompare = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { hashPassword, hashCompare }