var express = require('express')
var app = express()
var port = 3000
var path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Site'));
app.get('/', (req, res) => {
  res.render('Pages/index', {message: 'FOO'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))