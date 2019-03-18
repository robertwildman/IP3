'use strict'

let map;
let markers = [];
var markerCluster;

let quakes = {"type":"FeatureCollection","metadata":{"generated":1550939135000,"url":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson","title":"USGS All Earthquakes, Past Hour","status":200,"api":"1.7.0","count":5},"features":[{"type":"Feature","properties":{"mag":1.5,"place":"7km SSW of Big Lake, Alaska","time":1550937996252,"updated":1550938155847,"tz":-540,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/ak0192hkl1ft","detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak0192hkl1ft.geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"automatic","tsunami":0,"sig":35,"net":"ak","code":"0192hkl1ft","ids":",ak0192hkl1ft,","sources":",ak,","types":",geoserve,origin,","nst":null,"dmin":null,"rms":0.44,"gap":null,"magType":"ml","type":"earthquake","title":"M 1.5 - 7km SSW of Big Lake, Alaska"},"geometry":{"type":"Point","coordinates":[-149.9983,61.4543,33.4]},"id":"ak0192hkl1ft"},
{"type":"Feature","properties":{"mag":1.05,"place":"20km ESE of Julian, CA","time":1550937753850,"updated":1550937962993,"tz":-480,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/ci38470992","detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ci38470992.geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"automatic","tsunami":0,"sig":17,"net":"ci","code":"38470992","ids":",ci38470992,","sources":",ci,","types":",geoserve,nearby-cities,origin,phase-data,","nst":30,"dmin":0.1271,"rms":0.21,"gap":95,"magType":"ml","type":"earthquake","title":"M 1.1 - 20km ESE of Julian, CA"},"geometry":{"type":"Point","coordinates":[-116.4051667,33.0186667,9.6]},"id":"ci38470992"},
{"type":"Feature","properties":{"mag":1.6,"place":"46km NE of Cape Yakataga, Alaska","time":1550936864650,"updated":1550937573968,"tz":-540,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/ak0192hk8euz","detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak0192hk8euz.geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"automatic","tsunami":0,"sig":39,"net":"ak","code":"0192hk8euz","ids":",ak0192hk8euz,","sources":",ak,","types":",geoserve,origin,","nst":null,"dmin":null,"rms":0.38,"gap":null,"magType":"ml","type":"earthquake","title":"M 1.6 - 46km NE of Cape Yakataga, Alaska"},"geometry":{"type":"Point","coordinates":[-141.8028,60.3372,2.4]},"id":"ak0192hk8euz"},
{"type":"Feature","properties":{"mag":1.4,"place":"69km W of Willow, Alaska","time":1550936175852,"updated":1550936631057,"tz":-540,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/ak0192hk5zqo","detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak0192hk5zqo.geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"automatic","tsunami":0,"sig":30,"net":"ak","code":"0192hk5zqo","ids":",ak0192hk5zqo,","sources":",ak,","types":",geoserve,origin,","nst":null,"dmin":null,"rms":0.51,"gap":null,"magType":"ml","type":"earthquake","title":"M 1.4 - 69km W of Willow, Alaska"},"geometry":{"type":"Point","coordinates":[-151.3362,61.6483,13.9]},"id":"ak0192hk5zqo"},
{"type":"Feature","properties":{"mag":0.97,"place":"8km W of Cobb, CA","time":1550935598880,"updated":1550935790949,"tz":-480,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/nc73144926","detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc73144926.geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"automatic","tsunami":0,"sig":14,"net":"nc","code":"73144926","ids":",nc73144926,","sources":",nc,","types":",geoserve,nearby-cities,origin,phase-data,","nst":15,"dmin":0.01143,"rms":0.03,"gap":96,"magType":"md","type":"earthquake","title":"M 1.0 - 8km W of Cobb, CA"},"geometry":{"type":"Point","coordinates":[-122.8095016,38.8348351,1.96]},"id":"nc73144926"}],"bbox":[-151.3362,33.0186667,1.96,-116.4051667,61.6483,33.4]}

//initiating the map centered at GCU
function initMap() {
  console.log("initing map")
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(55.866, -4.2499),
      mapTypeId: 'terrain'
  });
  google.maps.event.trigger(map, 'resize');
}



$(function(){

//Can these be loaded from an external JSON? 
  let feeds = {
    urls: [
      { name: 'Hour', 
        feeds: [ 
          {name: 'Significant Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson' },
          {name: 'M4.5+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson' },
          {name: 'M2.5+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson'},
          {name: 'M1.0+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson'},
          {name: 'All Earthquakes', url:'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'}
        ]
      },
      { name: 'Day', 
        feeds: [
          {name: 'Significant Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson' },
          {name: 'M4.5+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson' },
          {name: 'M2.5+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson'},
          {name: 'M1.0+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson'},
          {name: 'All Earthquakes', url:'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'}
        ]
      },
      { name: 'Week', 
        feeds: [
          {name: 'Significant Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson' },
          {name: 'M4.5+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson' },
          {name: 'M2.5+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson'},
          {name: 'M1.0+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson'},
          {name: 'All Earthquakes', url:'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'},
        ]
      },
      { name: 'Month', 
        feeds: [
          {name: 'Significant Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson' },
          {name: 'M4.5+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson' },
          {name: 'M2.5+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson'},
          {name: 'M1.0+ Earthquakes', url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson'},
          {name: 'All Earthquakes', url:'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'}
        ]
      }
    ]
  }
        
  //Creating a button from every feed and appending them to a list labeled by the timeframe
  feeds.urls.forEach(element => {
      $('#buttons').append(`
                            <div class="buttonbyfeed">
                  
                              <div class="labelcontainer">
                                <label>${element.name}</label>
                              </div>

                              <div class="buttonfeeds">
                                <ul id=${element.name}>
                                </ul>
                              </div>

                            </div>
                          `)
    element.feeds.forEach(feed => {
      $('#' + element.name).append(`
                            <li>
                            <button class='dynamic' data-feedurl='${feed.url}'>${feed.name}</button>
                            </li>
                          `)
    })
  })
 

  function clearOverlays(){
    if(markers === undefined || markers.length == 0){
      console.log("noothing")
    }else{
      for(var i = 0; i< markers.length; i++){

        markers[i].setMap(null);
      }
      markers = [];
      markerCluster.clearMarkers();
    }
  }

  $('#clear').click(clearOverlays);
  //Get all the earthquakes for respective button, loop through earthquake events (features)
  //and place a marker on the map with a infowindow attached
  $('.dynamic').click(function(){
    clearOverlays();

    let infowindow = new google.maps.InfoWindow({});

    let feedurl = $(this).attr('data-feedurl')
    /*
    quakes.features.forEach(feature => {
      var latLng = new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
      var marker = new google.maps.Marker({
        position: latLng,
        map:map,
        label: ''+feature.properties.mag,
        animation: google.maps.Animation.DROP
      });

      console.log(feature.properties.place)
      let infowindowcontent = `<div>
                                <h3>${feature.properties.place}</h3>
                                <a href="https://www.google.com"/>${latLng}</a>
                              </div>`

      markers.push(marker);
    
      marker.addListener('click', function() {
        infowindow.setOptions({
          content: infowindowcontent
        })

        if(marker.getAnimation() !== null){
          marker.setAnimation(null);
          infowindow.close();
        }else{
          marker.setAnimation(google.maps.Animation.BOUNCE);
          infowindow.open(map,marker);
        }
      })
    })
    markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      */

    
    fetch(feedurl)
    .then(response => response.json())
    .then(response => {
      response.features.forEach(feature => {
        var latLng = new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
        var marker = new google.maps.Marker({
          position: latLng,
          map:map,
          animation: google.maps.Animation.DROP
        });

        markers.push(marker);
      
        let infowindowcontent = `<div>
        <h3>${feature.properties.place}</h3>
        <a href="../index.html?latLng=${latLng}"/>${latLng}</a>
        </div>`

        marker.addListener('click', function() {
          infowindow.setOptions({
            content: infowindowcontent
          })

          if(marker.getAnimation() !== null){
            marker.setAnimation(null);
            infowindow.close();
          }else{
            marker.setAnimation(google.maps.Animation.BOUNCE);
            infowindow.open(map,marker);
          }
        })
      })

      markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    })
  })
})