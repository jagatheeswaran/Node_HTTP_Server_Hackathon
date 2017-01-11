var http=require('http');
var fs=require('fs');

function error(response){
response.writeHead(404, {"content-type":"text/plain"});
response.write("Error occured in the page");
response.end();
}

function requestHandler(request,response){
if(request.method == 'GET' && request.url == '/two')
{
	response.writeHead(200, {"content-type":"text/json"});
	fs.createReadStream("./includes/json/file2.json").pipe(response);
}
else
{
	error(response);
}
}
http.createServer(requestHandler).listen(3001);
console.log("Server is now on");
