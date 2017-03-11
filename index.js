var express = require('express');
var app = express();
var path = require('path');
// router = express.Router()
//   , multer = require('multer');


app.use('/js', express.static('js'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/live.html'));
});


var http = require('http'),
  url = require('url'),
  formidable = require('formidable')
  util = require('util');


app.post('/data', function(request, response) {
  var form = new formidable.IncomingForm(),
    fields = [],
    files = [];
    var fs = require('fs');
  form.type = true;
  form.on('error', function(err){
    response.writeHead(200, {'content-type': 'text/plain'});
    response.end('error:\n\n' + util.inspect(err));
  });

  form.on('field', function(field, value){
    console.log(field, value);
    fields.push([field, value]);
  });


  form.on('file', function(field, file){
    console.log(field, file);
    files.push([field, file]);
    file.name ="test";
    file.type ="wav";
        fs.rename(file.path,  file.name+"."+file.type);

  });
 
  form.on('end', function(){
    console.log('-> upload done');
    response.writeHead(200, {'content-type': 'text/plain'});
    response.write('Received fields:\n\n ' + util.inspect(fields));
    response.write('\n\n');
    response.end(    '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
);
     var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("for w in test.wav; do pocketsphinx_continuous -infile $w -jsgf wyn/wyn-align.jsgf -dict wyn/phonemes.dict -backtrace yes -fsgusefiller no -bestpath no 2>&1 | tee $w-align.txt ; done", function(error, stdout, stderr) {
  if (!error) {
    console.log(stdout)
  } else {
    console.log(stderr)
  }
});
  });

  form.encoding = 'utf-8';
  form.uploadDir = '';
  form.keepExtensions = true;
  form.parse(request);
});

app.listen(8080);


