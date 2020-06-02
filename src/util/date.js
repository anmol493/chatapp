const date=function(text){
    return{
    message:text,
    createdAt:new Date().getTime()
    }
};

module.exports=date;