var http=require('http');
var fs=require('fs');

function error(response){
response.writeHead(404, {"content-type":"text/plain"});
response.write("Error occured in the page");
response.end();
}

function requestHandler(request,response){
if(request.method == 'POST' && request.url == '/third')
{
  var f1,f2;
	request.on('data',(data)=>{
    // fs.readFile("./includes/json/file1.json",(error,file_data)=>{
    //   if(error){
    //     response.write("Error in reading the first file");
    //   }
    //   else{
    //     f1=JSON.parse(file_data);
    //   }
    // });
    //
    // fs.readFile("./includes/json/file2.json",(error,file_data)=>{
    //   if(error){
    //     response.write("Error in reading the first file");
    //   }
    //   else{
    //     f2=file_data;
    //   }
    // });
    response.writeHead(200,{"content-type":"text/html"});
    fs.appendFile("./includes/json/file1.json",data,(error)=>{
      if(error){
        response.write("Error in writing data to the first file");
        response.end();
      }
      else{
        response.write("Success in writing data to the first file");
        fs.appendFile("./includes/json/file2.json",data,(error)=>{
          if(error){
            response.write("Error in writing data to the second file");
            response.end();
          }
          else{
            response.write("Success in writing data to the first file");
            response.end();
          }
        });
      }
    });
  });
}
else
{
	error(response);
}
}
http.createServer(requestHandler).listen(3002);
console.log("Server is now on");
