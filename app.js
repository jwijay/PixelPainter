var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var picSchema = new Schema({
  file_name : String,
  grid : String,
  timestamp: Date
});

var Pic = mongoose.model('Pic', picSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('application');
});

app.get('/load', function(req, res) {
  res.render('load');
});

app.get('/pic/:file_name?', function(req, res) {
  // var file_name = req.params.file_name || "";

  // Pic.find(function(err, pics) {
  //   if (err) throw err;

  //   res.render('load', {pics : pics});
  // });
  res.send('sample file');
});

app.post('/', function(req, res) {
//   var pic = new Pic(
//     {
//       file_name : file_name,
//       grid : grid    
//     }
//   );

//   //save pic object to db
//   pic.save(function(err) {
//     if (err) throw err;
//     res.redirect('/pic'+file_name);
//   });
  
//   res.send('file saved');

  var file_name = req.body.file_name;
  var grid = req.body.grid;
  console.log(grid);
  console.log(file_name);

  var pic = new Pic(
    {
      file_name : file_name,
      grid : grid
    }
  );

  pic.save(function(err) {
    if (err) throw err;
    res.redirect('/');
  });
});


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('PixelPainter app listening at http://%s:%s', host, port);
});