const mongoose = require('../utils/db')

const Users = mongoose.model('users',{
    username:String,
    password:String
})

module.exports = {
    save({username,password}){
        const users = new Users({ 
            username ,  //username : username
            password 
        })

        return users.save() //返回一个promise对象
    },
    findOne(username){
        return Users.findOne({username:username})
    }
} 