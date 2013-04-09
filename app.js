var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')

var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

var white = 0;
var brown = 0;
var name = 'Brandwatch Table Football Scoreboard!';

app.get('/', function (req, res) {
  res.render('index',
  { title : name,
    score1 : white,
    score2 : brown }
  )
})

app.get('/white', function(req, res){
  white++;
  res.send('White: ' + white + " Brown: " + brown);
});


app.get('/score', function(req, res){
  res.send('White: ' + white + " Brown: " + brown);
});


app.get('/brown', function(req, res){
  brown++;
  res.send('White: ' + white + " Brown: " + brown);
});

app.get('/reset', function(req, res){
  white = 0;
  brown = 0;
  res.send('White: ' + white + " Brown: " + brown);
});

app.listen(3000);
console.log('Listening on port 3000');
