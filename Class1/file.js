// Common JS
const fs = require('fs')

// fs.readFile("./example1.txt", (err, data)=>{
//     if(err){
//         console.log("Error:", err)
//         return
//     }

//     console.log(data.toString());
// })

// const content = "this is the content of example2"
// fs.writeFile('./example2.txt', content, (err) => {
//     if (err) {
//         console.log("Error: ", err)
//         return
//     }    

//     console.log("Write Success: ")
// })

// fs.rename("./example1.txt","./newFile.txt", (err) => {
//     if(err){
//         console.log("Error rename: ", err)
//         return
//     }    

//     console.log("Rename Success: ")
// })

// fs.unlink("./newFile.txt", (err)=>{
//     if(err){
//         console.log("Error Delete: ", err)
//         return
//     }    

//     console.log("Delete file Success: ")
// })

// CRUD: create, read, update, delete

fs.appendFile("example2.txt", " New content added",(err) => {
    if(err){
        console.log("Error in update: ", err)
        return
    }    

    console.log("File has been updated: ")
})

// const dir_name = './My_directory'