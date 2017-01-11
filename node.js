var http = require('http'),
    fs = require('fs'),
    port = 3000;

// Request Handler to handle the Requests
var requestHandler=(req,res)=>{
  if(req.url==="/file1"){
    fs.readFile("./file1.json",(error,data)=>{
      if(error){
        res.write("File Not Found");
      }
      else{
        var object=JSON.parse(data);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write("Details in first file are :<br>");
        for(let user in object){
          res.write("<br>"+user+":"+object[user]);
        }
        console.log(data);
        res.end();
      }
    });
  }

  if(req.url==="/file2"){
    fs.readFile("./file2.json",(error,data)=>{
      if(error){
        res.write("File Not Found");
      }
      else{
        var object=JSON.parse(data);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write("Details in second file are :<br>");
        for(let user in object){
          res.write("<br>"+user+":"+object[user]);
        }
        console.log(data);
        res.end();
      }
    });
  }

}

//Creating server
var server=http.createServer(requestHandler);

//Starting the server
server.listen(port,(error)=>{
  if(error){
    console.log("Error...!!!", error);
  }
  else{
    console.log("Server is listening on: http://localhost:"+port);
  }
});
