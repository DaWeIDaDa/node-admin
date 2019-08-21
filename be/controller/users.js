const userModel = require('../modules/users')

const tools = require('../utils/tools')


module.exports ={
    async signup(req,res,next){
        //获取请求的user pass
        let {username,password} = req.body

        //注册先判断用户
        let result = await userModel.findOne(username)
        if(result){
            res.render('error',{
                data:JSON.stringify({
                    msg:"用户名已存在~"
                })
            })
        }
        else{

            //密码加密
            let newPassword = await tools.crypt(password)
            //保存到数据库
            await userModel.save({
                username,
                password:newPassword
            })
    
            // res.set('content-type','application/json;charset=utf-8')
     
            //succ是express默认路径 自动找views下的ejs
            res.render('succ',{
                data:JSON.stringify({
                    msg:"注册成功~"
                })
            })
        }

    },
    async signin(req,res,next){
        let {username,password} = req.body

        //从数据库根据用户名请求用户信息
        let result = await userModel.findOne(username)
        if(result){
            //这里是个promise
            if( await tools.compare(password,result.password)){
                
                res.render('succ',{
                    data:JSON.stringify({
                        msg :"用户登录成功~",
                        username
                    })
                })

            }else{
                res.render('error',{
                    data:JSON.stringify({
                        msg :"用户或密码错误~"
                    })
                })

            }
        }else{
            res.render('error',{
                data:JSON.stringify({
                    msg :"用户或密码错误~"
                })
            })
        }
    }
}
