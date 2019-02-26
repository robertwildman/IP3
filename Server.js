var express = require('express');
var request = require('request');
var app = express();
var port = 3000;
var path = require("path");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Site'));
app.get('/', (req, res) => {
  res.render('Pages/index', {message: 'FOO'});
});
app.get('/postcode', (req, res) => {
  res.render('Pages/postcode', {message: 'Postcode'});
});
app.get('/api/postcode/nearby/', (req, res) => {
  console.log(req.query);
  console.log(req.query.lat);
  console.log(req.query.long);
  request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ req.query.lat +","+ req.query.long +"&radius=1500&type="+req.query.type+"&key=AIzaSyASgFJuBaUXGa3zhgSt3Lx1rDxHY1ZSB0w", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var re = {};
      var key = 'Results';
      re[key] = []; 
      var bodyjson = JSON.parse(body);
      var results = bodyjson.results;
      results.forEach(function(item) {
          var data = {
            lat: item.geometry.location.lat,
            long: item.geometry.location.lng,
            name: item.name,
            rating: item.rating,
            price: item.price_level, 

          };
          console.log(data);
        re[key].push(data);
         
        });
      res.json(re);
     }
  })
  
});
app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));