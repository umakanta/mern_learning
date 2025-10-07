const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/1',(re, res) => {
    res.send("Hello world from 1");
})

app.get('/about', (req, res) => {
    res.send("This is an about page");
});

const users = [{id:1, name:"User 1"},{id:2, name:"User 2"},{id:3, name:"User 3"}];

app.get("/users", (req, res) => {
    res.status(200).json({message:"All users", users});
})

app.get("/users/:id", (req, res) =>{
    const userId = req.params.id
    const user = users.find((u)=> u.id==userId)

    if(!user){
        return res.status(400).json({message:"user not found" });
    }
    res.status(200).json({message:"user found", user})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
