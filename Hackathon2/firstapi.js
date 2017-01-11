var http=require('http');
var fs=require('fs');

function error(response){
response.writeHead(404, {"content-type":"text/plain"});
response.write("Error occured in the page");
response.end();
}

function requestHandler(request,response){
if(request.method == 'GET' && request.url == '/first')
{
	response.writeHead(200, {"content-type":"text/json"});
	fs.createReadStream("./includes/json/file1.json").pipe(response);
}
else
{
	error(response);
}
}
http.createServer(requestHandler).listen(3000);
console.log("Server is now on");
