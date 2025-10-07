//ip:port
const http = require("http");

// const server = http.createServer((req, res)=>{
//     res.setHeader("Content-Type", "text/plain");
//     res.write("Helo. from server... ");
//     res.end();
// });


// const server = http.createServer((req, res)=>{
//     res.setHeader("Content-Type", "text.html");
//     res.write("<html>");
//     res.write("<body><h1>Heading 1</h1></body>");
//      res.write("</html>");
//     res.end();
// });


// const server = http.createServer((req, res)=>{
//     res.setHeader("Content-Type", "application/json");
//     const jsonData= {
//         message:"hello World!",
//         date: new Date()
//     }
//     const jsonResponse = JSON.stringify(jsonData);
//     res.write(jsonResponse);
//     res.end();
// });

const port = 3000;
const host ="localhost"

server.listen(port, host, ()=>{
    console.log(`server is running at http://${host}:${port}`);
});