/**
 * 专门做密码加密
 */
const bcrypt = require('bcrypt')

module.exports = {
    //返回一个promise对象
    crypt(myPlaintextPassword){
        return new Promise((resolve)=>{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                   resolve(hash)
                });
            });
        })
    },
    
    compare(myPlaintextPassword, hash){
        return new Promise((resolve)=>{
            bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
                resolve(res)
            });
        })
    }
    
}