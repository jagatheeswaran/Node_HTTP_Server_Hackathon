var http = require('http');
var fs = require('fs');
let firstapi = require('./includes/apis/firstapi.js');
let seconapi = require('./includes/apis/secondapi.js');

function error(response) {
    response.writeHead(404, {
        "content-type": "text/plain"
    });
    response.write("Error occured in the page");
    response.end();
}

function requestHandler(request, response) {
    if (request.url === "/first") {
        firstapi.sendResponse(request, response);
    } else if (request.url === "/second") {
        seconapi.sendResponse(request, response);
    } else if (request.method == 'POST' && request.url == '/third') {
        var f1 = {},
            f2 = {};
        request.on('data', (data) => {

            response.writeHead(200, {
                "content-type": "text/json"
            });
            fs.readFile("./includes/json/file1.json", (error, file_data) => {
                if (error) {
                    response.write("Error in reading the first file");
                } else {
                    f1 = JSON.parse(file_data);
                }
            });

            fs.readFile("./includes/json/file2.json", (error, file_data) => {
                if (error) {
                    response.write("Error in reading the first file");
                } else {
                    f2 = JSON.parse(file_data);
                }
            });

            // let jsonObj = JSON.parse(data);
            // for (let key in jsonObj) {
            //     var str1 = key.toString();
            //     var str2 = jsonObj[key].toString();
            //     f1.str1=str2;
            //     f2.str1=str2;
            // }
            response.write(f1);
            response.end();
        });
    } else {
        error(response);
    }
}
http.createServer(requestHandler).listen(3000);
console.log("Server is now on");
