import SMERouter from 'sme-router'
const router = new SMERouter('router-view', "hash")
import Home from '../controllers/home'
import Position from '../controllers/position'
import User from '../controllers/user'

/**
 * sme-router中间件添加使用router.use 
 * 注册顺序会在每个匹配路由的handler执行前执行
 */
router.use( (req,res,next) =>{
    // $(".nav").on("click",function(){
    //     $(this).addClass("active").siblings().removeClass("active")
    // })
    $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
    .parent()
    .addClass("active")
    .siblings()
    .removeClass("active")
})

router.route("/",Home.render)

router.route("/position",Position.render)
router.redirect("/")

//登录那一块
User.render()

export default router