var express = require('express');
var request = require('request');
var app = express();
var port = 3000;
var path = require("path");
var XLSX = require('xlsx');
var fs = require('fs');
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
          long: item.geometry.location. lng,
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
              long: item.geometry.location. lng,
              name: item.name,
              rating: item.rating,
              price: item.price_level, 
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
app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));




// Housing api 
//Listing URL, Summary, Title, Price , Updated, img url