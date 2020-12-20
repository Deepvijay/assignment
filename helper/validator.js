const JOI = require('joi');
exports.validators =(schema)=>(req,res,next)=>{
    const { error } = schema.validate(req['body'])
    if(!error) return next();
    const { details } = error;
    const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
    return res.status(400).json({success:false,message:message})
    
}


