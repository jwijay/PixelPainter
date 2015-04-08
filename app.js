var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);
// mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var picSchema = new Schema({
  file_name : String,
  grid : String,
  timestamp: Date
});

var Pic = mongoose.model('Pic', picSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('application');
});

app.get('/pic', function(req, res) {
  res.render('pic');
});

app.get('/pic/:file_name?', function(req, res) {
  // var file_name = req.params.file_name || "";

  // Pic.find(function(err, pics) {
  //   if (err) throw err;

  //   res.render('pic', {pics : pics});
  // });
  var file_name = req.params.file_name || "";

  Pic.findOne({ file_name : file_name }, function(err, pic) {
      if (err) throw err;
      res.render('pic', { pic : pic });
    });
});

app.get('/load', function(req, res) {

  Pic.find(function(err, pics) {
    if (err) throw err;

    res.render('load', { pics : pics });
  });
});

app.post('/', function(req, res) {
  var file_name = req.body.file_name;
  var grid = req.body.grid;
  console.log('grid', grid);
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

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  // var host = server.address().address;
  // var port = server.address().port;

  // console.log('PixelPainter app listening at http://%s:%s', host, port);
});