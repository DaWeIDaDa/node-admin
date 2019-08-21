import userView from '../views/user.art'

//确定用户点击的是登录还是注册
let _type =''

let _url =''

export default{
    render(req,res,next){
        // console.log(userView())
        // $(".user-menu").html(userView())
       let html = userView({
           isSignin :false
       })
       $(".user-menu").html(html)
       this.bindEventToBtn()
    },
   
    //绑定注册登录点击事件
    bindEventToBtn(){
        $(".hidden-xs").on("click",function(){
            _type = $(this).attr("id")
           _url = _type === "btn-signin" ? '/api/users/signin' : '/api/users/signup'   
            $('input').val('')
        })
        $("#btn-submit").on("click",()=>{
            let data = $("#user-form").serialize()
            // console.log(data)
            $.ajax({
                url:_url,
                type:'post',
                data,
                success(result){
                    result = JSON.parse(result)
                    console.log(result) 
                    if(_type === 'btn-signin'){
                        if(result.ret){
                            let html = userView({
                                isSignin : true,
                                username:result.data.username
                            })
                            $('.user-menu').html(html)
                        }else{
                            alert(result.data.msg)
                        }
                    }
                    else{
                        if(result.ret){
                            alert('注册成功')
                        }else{
                            alert(result.data.msg)
                        }
                         
                    }
                }
            })
        })
    }

}