const express = require("express");
const app = express();
const port = 3000;

//get, post, delete, update(put-complete or patch-partial) - resource/data

app.get("/", (req, res)=>{
    res.send("Hello from express..");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

