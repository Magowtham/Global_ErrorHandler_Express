const express=require("express");

const app=express();

function errorCreater(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject("unable to connect database")
        },3000);
    })
}
//in case of asynchronous functions we need to handle the promise errors first and then we need to pass it the global error handler middleware
app.get("/",async (req,res,next)=>{ 
    try{
        await errorCreater();
    }catch(error){
        next(error);
    }

})
//in case of synchronous the error is directly catched by the global error handler middleware
app.get("/test",(req,res)=>{
    throw new Error("unable to connect database")
})

app.use((error,req,res,next)=>{
    res.status(500).json({error:(error.message?error.message:error)})
})


app.listen(9000,()=>{
    console.log("server listening on port 9000");
})