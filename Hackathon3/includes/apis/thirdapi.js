const fs = require('fs');

exports.addData = function(req, res) {
  var jsonObj = req.body;
  console.log(jsonObj);
  var fileObj = null;
  let data1 = fs.readFileSync("./includes/json/file1.json").toString();
  let data2 = fs.readFileSync("./includes/json/file2.json").toString();
  fileJsonObj1= JSON.parse(data1);
  fileJsonObj2= JSON.parse(data2);
  for(let each in jsonObj){
    fileJsonObj1['user'][0][each] = jsonObj[each];
    fileJsonObj2['user'][0][each] = jsonObj[each];
  }
  fs.writeFile('./includes/json/file1.json', JSON.stringify(fileJsonObj1,null,2),'utf-8');
  fs.writeFile('./includes/json/file2.json', JSON.stringify(fileJsonObj2,null,2),'utf-8');
  res.end('done');
}

findFile1 = function(id){
 return new Promise(function(resolve, reject){
   fs.readFile('./includes/json/file1.json', 'utf8', function (err, data) {
     if (err) reject('nothing');
     var jsonData = JSON.parse(data);
     jsonData = jsonData['user'];
     for (var i = 0; i < jsonData.length; ++i) {
       if(jsonData[i].id == id){
         resolve(jsonData[i]);
       }
     }
     resolve(null);
   });
 })
}

findFile2 = function(id){
 return new Promise(function(resolve, reject){
   fs.readFile('./includes/json/file2.json', 'utf8', function (err, data) {
     if (err) reject('nothing');
     var jsonData = JSON.parse(data);
     jsonData = jsonData['user'];
     for (var i = 0; i < jsonData.length; ++i) {
       if(jsonData[i].id == id){
         resolve(jsonData[i]);
       }
     }
     resolve(null);
   });
 })
}


exports.fetchData = (req, res) => {
    var allPromises = [findFile1(req.params.id), findFile2(req.params.id)];
    Promise.all(allPromises).then(function(data) {
        res.json(data);
    }).catch(function(urls) {
        console.log(urls)
    });
};
