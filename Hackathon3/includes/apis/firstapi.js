var http=require('http');
var fs=require('fs');

exports.sendResponse = function(request,response){
  fs.readFile("./includes/json/file1.json", function (err, data) {
    if(err){
      response.writeHead(404);
      response.write("Not Found!");
    }else{
      response.writeHead(200, {'Content-Type': 'application/json'});
      var jsonObj = JSON.parse(data);
      response.write(JSON.stringify(jsonObj));
    }
    response.end();
  });
};
