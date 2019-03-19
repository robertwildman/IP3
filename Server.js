var express = require('express');
var request = require('request');
var app = express();
var port = 3000;
var path = require("path");
var XLSX = require('xlsx');
var fs = require('fs');
var csv = require('csv-parser'); 
var devmode = true;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Site'));

console.log("Loading in the Postcode Look up Table");
var pcworkbook = XLSX.readFile('PCLookUp.xlsx');
var pc_sheet_name_list = pcworkbook.SheetNames;
var all_postcodes = XLSX.utils.sheet_to_json(pcworkbook.Sheets[pc_sheet_name_list[0]]);
console.log("Done Loading in the Postcode Look up Table");

console.log("Loading in the Postcode Data Table");
var pcdworkbook = XLSX.readFile('PCData.xlsx');
var pcd_sheet_name_list = pcdworkbook.SheetNames;
var all_postcodes_data = XLSX.utils.sheet_to_json(pcdworkbook.Sheets[pcd_sheet_name_list[0]]);
console.log("Done Loading in the Postcode Data Table");

console.log("Loading in the Postcode Rank Table");
var pcrworkbook = XLSX.readFile('PCRank.xlsx');
var pcr_sheet_name_list = pcrworkbook.SheetNames;
var all_postcodes_rank = XLSX.utils.sheet_to_json(pcrworkbook.Sheets[pcr_sheet_name_list[0]]);
console.log("Done Loading in the Postcode Rank Table");

app.get('/', (req, res) => {
  res.render('Pages/index', {message: 'FOO'});
});
app.get('/postcode', (req, res) => {
  res.render('Pages/postcode', {message: 'Postcode'});
});
app.get('/citybikes', (req, res) => {
  res.render('Pages/citybikes', {message: 'City Bikes'});
});
app.get('/authors', (req, res) => {
  res.render('Pages/authors', {message: 'Authors'});
});
app.get('/earthquakes', (req, res) => {
  res.render('Pages/earthquakes', {message: 'Earthquakes'});
});
app.get('/tutorial', (req, res) => {
  res.render('Pages/tutorial', {message: 'Tutorial'});
});
app.get('/weather', (req, res) => {
  res.render('Pages/weather', {message: 'Weather'});
});
app.get('/crypto', (req, res) => {
  res.render('Pages/index', {message: 'Crypto'});
});
app.get('/train', (req, res) => {
  res.render('Pages/transport', {message: 'Trains'});
});
app.get('/api/postcode/nearby/', (req, res) => {
  if(devmode == true)
  {
      var bodyjson = JSON.parse(fs.readFileSync('Catched/'+req.query.type+'.json', 'utf8'));
      //Read the catched version from the file system! 
      var re = {};
      var key = 'Results';
      re[key] = []; 
      var results = bodyjson.results;
      results.forEach(function(item) {
        var data = {
          lat: item.geometry.location.lat,
          long: item.geometry.location.lng,
          name: item.name,
          rating: item.rating,
          price: item.price_level, 
          };
        re[key].push(data);
      });
      res.json(re);
  }else 
  {
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
              price: item.price_level 
            };
            console.log(data);
          re[key].push(data);
          
          });
        res.json(re);
      }
    });
  }
});
app.get('/api/postcode/info', (req, res) => { 
  var dataZone;
  var json; 
  all_postcodes.forEach(function(item)
  {
    var postcode = item.Postcode; 
    if(postcode === req.query.postcode)
    {
      dataZone = item.DZ;
      console.log(item.DZ);
    }
  });
  all_postcodes_data.forEach(function(item)
  {
    var testdz = item.Data_Zone; 
    if(testdz === dataZone)
    {
      json = item; 
      console.log(item);
    }
  });
  all_postcodes_rank.forEach(function(item)
  {
    var testdz = item.Data_Zone; 
    if(testdz === dataZone)
    {
      console.log(item);
      json = Object.assign(json, item);
    }
  });
  console.log(json);
  res.json(json);
});
app.get('/api/postcode/housing',(req,res) => {
  console.log(req.query);
  request("https://api.nestoria.co.uk/api?encoding=json&action=search_listings&country=uk&listing_type=buy&centre_point="+ req.query.lat +","+ req.query.long+"", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var re = {};
        var key = 'Results';
        re[key] = []; 
        var bodyjson = JSON.parse(body);
        var results = bodyjson.response;
        results = results.listings;
        console.log(results);
        results.forEach(function(item) {
            var data = {
              title: item.title,
              img_url: item.img_url,
              latitude: item.latitude, 
              longitude: item.longitude,
              summary: item.summary, 
              price: item.price_formatted,
              listing_url: item.lister_url
            };
            console.log(data);
          re[key].push(data);
          });
        res.json(re);
      }
    });
});
app.get('/api/train/station', (req, res) => {
  var station;
  fs.createReadStream('station_codes.csv')  
    .pipe(csv())
    .on('data', (row) => {
      if(row.stationname.toUpperCase() === req.query.station.toUpperCase())
      {
        station = row.crscode;
      }
    })
    .on('end', () => {
      if(station == undefined)
      {
        res.status(500).send("Error not found");
      }else
      {
        request("http://transportapi.com/v3/uk/train/station/"+ station +"/live.json?app_id=5fa2da4b&app_key=c31b495f35dd25555591bbab273f5396", function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var re = {};
            var key = 'Results';
            re[key] = []; 
            var bodyjson = JSON.parse(body);
            re["Station_Name"] = bodyjson.station_name;
            var results = bodyjson.departures;
            results = results.all;
            console.log(results);
            results.forEach(function(item) {
                var timetable = item.service_timetable;
                var data = {
                  mode: item.mode,
                  platform: item.platform,
                  operator_name: item.operator_name, 
                  aimed_departure: item.aimed_departure_time,
                  destination_name: item.destination_name, 
                  expected_departure: item.expected_departure_time,
                  status: item.status,
                  timetable_id: timetable.id
                };
                console.log(data);
              re[key].push(data);
              });
            res.json(re);
          }
        });
      }
    });
  
  
});
app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));



