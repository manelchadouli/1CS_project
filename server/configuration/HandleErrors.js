const Email=require("./Email_Validator");
   handleErrors=function(req, res){
    const {email,password}=req.body;
    if(!email){
        return res.status(400).json({
            message:"Email not present",
        })
    } else if(!password){
        return res.status(400).json({
            message:"Password not present",
        })
    }else 
    if( !Email.Validator(email)){
        return res.status(400).json({
             message:"Email not valide",
        
        })
    }else if( !Email.Validator(password)){ 
        return res.status(400).json({
        message:"Wrong Password",
   
   })}

}
module.exports={handleErrors};