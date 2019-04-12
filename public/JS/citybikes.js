var mymap;
var markergroup,stationgroup;
var networkids;
//Making a the map
makemap();
//Used to make the map
function makemap()
{
    //Find the citymap div and set the lat and long to glasgow zoomed at 8
    mymap = L.map('citymap').setView(["55.882244", "-4.098274"], 8);
    //Setting the map to the Open Street Map using url and access token
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicndpbGRtYW4iLCJhIjoiY2pzbjhtZDB4MDFlNzN5cW5iOHoyM3Z2aCJ9.FK-juz0mjxJjHNNXpoawHg'
    }).addTo(mymap);
    //Display the networks on the map
    displaynetworks();
}

//Displaying the networks on a map
function displaynetworks()
{
    //Making a request to the server.
     $.ajax({
        url: "https://api.citybik.es/v2/networks",
        type: "get", //send it through get method
        success: function(response) {
            //Cluster the markers together in a group
            markergroup = L.markerClusterGroup();
            //For each network in the response json from the get reuqest
            $.each(response.networks, function(index, value) {
               //Add markers to the maps 
                var city = value.location;
                var marker = L.marker([city.latitude, city.longitude]).addTo(markergroup);
                //Add popup to the marker
                marker.bindPopup("<b>"+value.name+"</b><p> City: " + city.city + " <br> <a onclick='displaystations(\""+value.id+"\")' href='javascript:void(0);'>View Network </a> </p>").openPopup();
            }); 
            //Add the markers to the map
            markergroup.addTo(mymap);
        },
        error: function(xhr) {
          //Display error message to the user
          error("Issue connecting to the citybikes!");
        }
    });



}

//Displays the stations based on network ID
function displaystations(id)
{
    //If the station group is defined we will remove them from the map
    if(stationgroup != undefined)
    {
        mymap.removeLayer(stationgroup);
    }
    //Get all the stations based on network ID through api
    $.ajax({
        url: "https://api.citybik.es/v2/networks/"+id,
        type: "get", //send it through get method
        success: function(response) {
            //Gets the network infomation from the api
            var network = response.network;
            //Creates a Marker Cluster Group
            stationgroup = L.markerClusterGroup();
            //For each station in the network section
            $.each(network.stations, function(index, value) {
               //Add markers to the maps
                var marker = L.marker([value.latitude, value.longitude]).addTo(stationgroup);
                //Add popup to the marker
                marker.bindPopup("<b>"+value.name+"</b><p> Free Bike: " + value.free_bikes + "<br> Empty Slots: "+value.empty_slots+"</p>").openPopup();
            }); 
            //Add markers to the map
            stationgroup.addTo(mymap);
        },
        error: function(xhr) {
          //Display error message to the user
          error("Issue connecting to the citybikes!");

        }
    });
}