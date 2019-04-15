var mymap;
var markergroup;
var pclat;
var pclong;
$( document ).ready(function() {
    //Jquery ready
    $("#pcsearch").click(function(){
        var request = new XMLHttpRequest();
        var apir = "https://api.postcodes.io/postcodes/" + $("#pc").val();
        request.open('GET', apir, true);
        request.onload = function () 
        {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);

            if (request.status >= 200 && request.status < 400) {
                var result = data.result;
                console.log(result);
                pclat = result.latitude;
                pclong = result.longitude;
                $("#simpletable").empty();
                $("#simpletable").append("<tr><td> Postcode </td><td>"+ result.postcode +"</td></tr>");
                $("#simpletable").append("<tr><td> Lat </td><td>"+ result.latitude +"</td></tr>");
                $("#simpletable").append("<tr><td> Long </td><td>"+ result.longitude +"</td></tr>");
                $("#simpletable").append("<tr><td> Country </td><td>"+ result.country +"</td></tr>");
                $("#simpletable").append("<tr><td> Parliamentary Constituency </td><td>"+ result.parliamentary_constituency +"</td></tr>");
                createmap(result.latitude,result.longitude,result.postcode);
                displayinfo(result.postcode);
             } else {
                error('Not a Valid postcode!');
            }
        };
        request.send();
    });
    $("#pcBAR").click(function()
    {
        findnearby('bar');
    });
    $("#pcCafe").click(function()
    {
        findnearby('cafe');
    });
    $("#pcRestaurant").click(function()
    {
        findnearby('restaurant');
    });
    $("#pcTransit").click(function()
    {
        findnearby('transit_station');
    });
    $("#pcDepartment").click(function()
    {
        findnearby('department_store');
    });
    $("#pcSupermarket").click(function()
    {
        findnearby('supermarket');
    });
    $("#pcHouse").click(function()
    {
        if(markergroup != undefined)
        {
            console.log("Removed");
            mymap.removeLayer(markergroup);
        }
        $.ajax({
            url: "/api/postcode/housing",
            type: "get", //send it through get method
            data: { 
              lat: pclat, 
              long: pclong
            },
            success: function(response) {
                markergroup = L.layerGroup().addTo(mymap);
                $.each(response.Results, function(index, value) {
                   //Add markers to the maps 
                    var marker = L.marker([value.latitude, value.longitude]).addTo(markergroup);
                    marker.bindPopup("<b>"+value.title+"</b> <img src='"+value.img_url+"'style='width:200px;height:150px;'><p> Summary: " + value.summary + " <br> Price: "+ value.price +" <a href='" + value.listing_url + "'>View Listing</a></p>").openPopup();
                }); 
            },
            error: function(xhr) {
              error("Error connecting to the server!");
            }
        });
    });
});

function findnearby(intype)
{
    if(markergroup != undefined)
    {
        console.log("Removed");
        mymap.removeLayer(markergroup);
    }
        $.ajax({
            url: "/api/postcode/nearby",
            type: "get", //send it through get method
            data: { 
              type: intype, 
              lat: pclat, 
              long: pclong
            },
            success: function(response) {
                markergroup = L.layerGroup().addTo(mymap);
                $.each(response.Results, function(index, value) {
                   //Add markers to the maps 
                    var marker = L.marker([value.lat, value.long]).addTo(markergroup);
                    if(value.rating != null)
                    {
                        marker.bindPopup("<b>"+value.name+"</b><p> Rating: " + value.rating + "</p>").openPopup();
                    }else{

                        marker.bindPopup("<b>"+value.name+"</b>").openPopup();
                    }
                }); 
            },
            error: function(xhr) {
                error("Error connecting to the server!");

            }
        });
}
function createmap(lat,long,postcode) {
    mymap = L.map('mapid').setView([lat, long], 15);
    var marker = L.marker([lat, long]).addTo(mymap);
    marker.bindPopup("<b>"+postcode+"</b>").openPopup();
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicndpbGRtYW4iLCJhIjoiY2pzbjhtZDB4MDFlNzN5cW5iOHoyM3Z2aCJ9.FK-juz0mjxJjHNNXpoawHg'
}).addTo(mymap);
}

function viewmarker(lat,long,name)
{
    mymap.setView([lat, long], 13);  
    var marker = L.marker([lat, long]).addTo(mymap);
    marker.bindPopup("<b>"+name+"</b>").openPopup();
}

function displayinfo(postCode)
{
    $.ajax({
        url: "/api/postcode/info",
        type: "get", //send it through get method
        data: { 
          postcode: postCode
        },
        success: function(response) {
            var g1 = new JustGage({
                id: "simdgauge",
                value: response.SIMD16_rank,
                min: 1,
                max: 6976,
                title: "SIMD Rank",
                valueFontColor: "#fff",
                levelColors:["#FF0000","#FF7F00","#FFFF00","#7FFF00","#00FF00"]
              });
            var g2 = new JustGage({
                id: "employgauge",
                value: response.Employment_rank,
                min: 1,
                max: 6976,
                title: "Employment Rank",
                valueFontColor: "#fff",
                levelColors:["#FF0000","#FF7F00","#FFFF00","#7FFF00","#00FF00"]
            });
            var g3 = new JustGage({
                id: "healthgauge",
                value: response.Health_rank,
                min: 1,
                max: 6976,
                title: "Health Rank",
                valueFontColor: "#fff",
                levelColors:["#FF0000","#FF7F00","#FFFF00","#7FFF00","#00FF00"]
            });
            var g4 = new JustGage({
                id: "educationgauge",
                value: response.Education_rank,
                min: 1,
                max: 6976,
                title: "Education Rank",
                valueFontColor: "#fff",
                levelColors:["#FF0000","#FF7F00","#FFFF00","#7FFF00","#00FF00"]
            });
            var g5 = new JustGage({
                id: "housinggauge",
                value: response.Housing_rank,
                min: 1,
                max: 6976,
                title: "Housing Rank",
                valueFontColor: "#fff",
                levelColors:["#FF0000","#FF7F00","#FFFF00","#7FFF00","#00FF00"]
            });
            var g6 = new JustGage({
                id: "crimegauge",
                value: response.Crime_rank,
                min: 1,
                max: 6976,
                title: "Crime Rank",
                valueFontColor: "#fff",
                levelColors:["#FF0000","#FF7F00","#FFFF00","#7FFF00","#00FF00"]
            });
            var tableset = "<h3> Ranking for the Postcode Based on the SIMD Ranking </h3> <h6> For all ranks: 1st most deprived, 6,976 is least deprived. </h6> <table class='table table-striped table-dark' style='width: 400px; float: left; margin-left: 2px; margin-right: 2px;'> "
            tableset += "<tr><td> SIMD 2016 Rank </td><td>"+ response.SIMD16_rank +"/6,976</td></tr>";
            tableset += "<tr><td> Domain Rank </td><td>"+ response.Domain_rank +"/6,976</td></tr>";
            tableset += "<tr><td> Employment Rank </td><td>"+ response.Employment_rank +"/6,976</td></tr>";
            tableset += "<tr><td> Health Rank </td><td>"+ response.Health_rank +"/6,976</td></tr>";
            tableset += "<tr><td> Education Rank </td><td>"+ response.Education_rank +"/6,976</td></tr>";
            tableset += "<tr><td> Housing Rank </td><td>"+ response.Housing_rank +"/6,976</td></tr>";
            tableset += "<tr><td> Crime Rank </td><td>"+ response.Crime_rank +"/6,976</td></tr>";
            $('#infoholder').append(tableset);
        },
        error: function(xhr) {
            error("Error connecting to the server!");

        }
    });
}
