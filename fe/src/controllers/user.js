import userView from '../views/user.art'

//确定用户点击的是登录还是注册
let _type =''
let _url =''

export default{
    async render(){
        let result = await this.isSignin()
     
        let html = userView({
            isSignin : result.ret,
            username : result.data.username
        })
        $("#user-menu").html(html)
        this.bindEventToBtn()
        this.bindEventOut()
    }, 
    isSignin(){
        return $.ajax({
            url : '/api/users/isSignin',
            dataType:'json',
            success(res){
                return res
            }
        })
    },
    //绑定注册登录点击事件
    bindEventToBtn(){
        $(".hidden-xs").on("click",function(){
            _type = $(this).attr("id")
           _url = _type === "btn-signin" ? '/api/users/signin' : '/api/users/signup'   
            $('input').val('')
        })
        $("#btn-submit").on("click",()=>{
            // console.log(1)
            let data = $("#user-form").serialize()
            // console.log(data)
            $.ajax({
                url:_url,
                type:'post',
                data,
                success:this.bindEventSucc.bind(this),
                error : this.bindEventErr.bind(this)
            })
        })  
    },
    bindEventOut(){
        $("#btn-signout").on("click",()=>{
            $.ajax({
                url : "/api/users/signout",
                success(){
                    location.reload()
                }
            })
        })
    },
    bindEventErr(){
        alert("系统请求出错，请稍后再试")
    },
    bindEventSucc(result){
        if(_type === "btn-signup"){
            alert(result.data.msg)
        }
        else
        {
            if(result.ret){
                let html = userView({
                    isSignin : true,
                    username : result.data.username
                })            
                $("#user-menu").html(html)
                this.bindEventOut()
            }else{
                alert(result.data.msg)
            }
        }
    }

}