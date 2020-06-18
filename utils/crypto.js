const crypto = require('crypto')
const secret = 'com.it666'
function _md5(password) {
    const md5 = crypto.createHash('md5')
    const hash = md5.update(password)
        .digest('hex')
    return hash
    // console.log(hash);
}
function generatePwd(password) {
    password = password + secret
    return _md5(password)
}
// md5('jwl19981218')
// console.log(generatePwd('jwl19981218'));
module.exports = generatePwd