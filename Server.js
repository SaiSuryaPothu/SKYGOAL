const express = require("express");
const app = express();
const router = require("./routes/auth-Route");
const connectDb = require("./database/db");
require("dotenv").config()

app.use(express.json())
app.use("/api/v1",router)


// app.get("/",(req,res)=>{
//     res.send({message : `this is home page`})
// })
connectDb().then(()=>{
    app.listen(process.env.PORT,()=>{console.log(`Port running Sucessfully on ${process.env.PORT}`)})
})
