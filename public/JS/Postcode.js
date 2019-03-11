var mymap;
var atmMarkers,barMarkers;
$( document ).ready(function() {
    var pclat;
    var pclong;
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
                $("#simpletable").append("<tr><td> Postcode </td><td>"+ result.postcode +"</td></tr>");
                $("#simpletable").append("<tr><td> Lat </td><td>"+ result.latitude +"</td></tr>");
                $("#simpletable").append("<tr><td> Long </td><td>"+ result.longitude +"</td></tr>");
                $("#simpletable").append("<tr><td> Country </td><td>"+ result.country +"</td></tr>");
                $("#simpletable").append("<tr><td> Parliamentary Constituency </td><td>"+ result.parliamentary_constituency +"</td></tr>");
                createmap(result.latitude,result.longitude,result.postcode);
                displayinfo(result.postcode);
             } else {
                alert('error');
            }
        };
        request.send();
    });
    $("#pcATM").click(function(){
        mymap.removeLayer(atmMarkers);
        mymap.removeLayer(barMarkers);
        var request = new XMLHttpRequest();
        var apir = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ pclat +","+ pclong +"&radius=1500&type=restaurant&key=AIzaSyASgFJuBaUXGa3zhgSt3Lx1rDxHY1ZSB0w"
        var st = "/api/postcode/nearby/ATM/"+pclat+"/"+pclong;
        console.log(pclat);
        console.log(pclong);
        $.ajax({
            url: "/api/postcode/nearby",
            type: "get", //send it through get method
            data: { 
              type: 'ATM', 
              lat: pclat, 
              long: pclong
            },
            success: function(response) {
                var tableset = "<table class='table table-striped table-dark' style='width: 400px; float: left; margin-left: 2px; margin-right: 2px;'> "
                atmMarkers = L.layerGroup().addTo(mymap);
                $.each(response.Results, function(index, value) {
                    tableset += "<tr><td> Name </td><td>"+ value.name +"</td> <td> <button type='button' onclick='viewmarker(\"" + value.lat + "\",\""+ value.long +"\",\""+ value.name +"\")'class='btn table-button'>View</button></tr>";
                   //Add markers to the maps 
                    var marker = L.marker([value.lat, value.long]).addTo(atmMarkers);
                    marker.bindPopup("<b>"+value.name+"</b>").openPopup();
                    console.log( value);
                }); 
                tableset += "</table>"
                $('#listholder').append(tableset);
            },
            error: function(xhr) {
              //Do Something to handle error
            }
        });
    });
    $("#pcBAR").click(function()
        {
            var request = new XMLHttpRequest();
        var apir = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ pclat +","+ pclong +"&radius=1500&type=restaurant&key=AIzaSyASgFJuBaUXGa3zhgSt3Lx1rDxHY1ZSB0w"
        var st = "/api/postcode/nearby/ATM/"+pclat+"/"+pclong;
        console.log(pclat);
        console.log(pclong);
        $.ajax({
            url: "/api/postcode/nearby",
            type: "get", //send it through get method
            data: { 
              type: 'bar', 
              lat: pclat, 
              long: pclong
            },
            success: function(response) {
                var tableset = "<table class='table table-striped table-dark' style='width: 400px; float: left; margin-left: 2px; margin-right: 2px;'> "
                barMarkers = L.layerGroup().addTo(mymap);
                $.each(response.Results, function(index, value) {
                    tableset += "<tr><td> Name </td><td>"+ value.name +"</td> <td> <button type='button' onclick='viewmarker(\"" + value.lat + "\",\""+ value.long +"\",\""+ value.name +"\")'class='btn table-button'>View</button></tr>";
                   //Add markers to the maps 
                    var marker = L.marker([value.lat, value.long]).addTo(barMarkers);
                    if(value.rating != null)
                    {
                        marker.bindPopup("<b>"+value.name+"</b><p> Rating: " + value.rating + "</p>").openPopup();
                    }else{

                        marker.bindPopup("<b>"+value.name+"</b>").openPopup();
                    }
                    console.log( value);
                }); 
                tableset += "</table>"
                $('#listholder').append(tableset);
            },
            error: function(xhr) {
              //Do Something to handle error
            }
        });
            mymap.removeLayer(atmMarkers);
        });
});

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
          //Do Something to handle error
        }
    });
}