import positionView from '../views/position.art'

export default{
    render(req,res,next){
        $.ajax({
            url : '/api/positions/list',
            dataType:'json',
            success(result){
                if(result.ret){
                    res.render(positionView({
                        list : result.data
                    }))
                }else{
                    res.go('/')
                }
            }
        })
    }
}