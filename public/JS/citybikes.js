var mymap;
var markergroup,stationgroup;
var networkids;
makemap();
function makemap()
{
    mymap = L.map('citymap').setView(["55.882244", "-4.098274"], 8);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicndpbGRtYW4iLCJhIjoiY2pzbjhtZDB4MDFlNzN5cW5iOHoyM3Z2aCJ9.FK-juz0mjxJjHNNXpoawHg'
    }).addTo(mymap);
    displaynetworks();
}
function displaynetworks()
{
     $.ajax({
        url: "https://api.citybik.es/v2/networks",
        type: "get", //send it through get method
        success: function(response) {
            markergroup = L.markerClusterGroup();
            $.each(response.networks, function(index, value) {
               //Add markers to the maps 
                var city = value.location;
                var marker = L.marker([city.latitude, city.longitude]).addTo(markergroup);
                marker.bindPopup("<b>"+value.name+"</b><p> City: " + city.city + " <br> <a onclick='displaystations(\""+value.id+"\")' href='javascript:void(0);'>View Network </a> </p>").openPopup();
            }); 
            markergroup.addTo(mymap);
        },
        error: function(xhr) {
          //Do Something to handle error
        }
    });



}

function displaystations(id)
{
    if(stationgroup != undefined)
    {
        mymap.removeLayer(stationgroup);
    }
    $.ajax({
        url: "https://api.citybik.es/v2/networks/"+id,
        type: "get", //send it through get method
        success: function(response) {
            var network = response.network;
            stationgroup = L.markerClusterGroup();
            $.each(network.stations, function(index, value) {
               //Add markers to the maps
               console.log(value); 
                var marker = L.marker([value.latitude, value.longitude]).addTo(stationgroup);
                marker.bindPopup("<b>"+value.name+"</b><p> Free Bike: " + value.free_bikes + "<br> Empty Slots: "+value.empty_slots+"</p>").openPopup();
            }); 
            stationgroup.addTo(mymap);
        },
        error: function(xhr) {
          console.log(xhr);
        }
    });
}