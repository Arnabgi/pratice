var http =require('http');
const server = http.createServer((req, res) => {
    console.log("requested");
    res.end("Hello world");
});
/*http.createServer(function(req,res){
    //res.writeHead(200,{'content-type':'text/plain'});
    res.send("Hello World!");
});*/
server.listen(2121, () => {
    console.log("server is running....");
});