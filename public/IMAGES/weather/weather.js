let map;

$(function() {

  let apixuUrl = "http://api.apixu.com/v1/current.json?key=";
  let apixuKey = "fd7ede7ab4f24f97ab7205326193001";

  let $latitude = $("#latitude");
  let $longitude = $("#longitude");
  let $location = $("#location");

  let $btnCurrentWeather = $('#currentWeather');

  let weatherLocation;
  let localTime;
  let temperature;
  let condition;
  let useLocation = false;
  let apixuConditions;

  
  $('#location').focusin(function(){
    $('.latlon').prop('disabled', true)
    $('.latlon').val('');
    useLocation = true;
  }).focusout(function(){
    $('.latlon').prop('disabled', false)
  });

  $('.latlon').focusin(function(){
    $('#location').prop('disabled', true)
    $('#location').val('');
    useLocation = false;
  }).focusout(function(){
    $('#location').prop('disabled', false)
  });

  let fetchConditions = function(){
    if(!apixuConditions){
      fetch('http://www.apixu.com/doc/Apixu_weather_conditions.json')
      .then(response => response.json())
      .then(response => {
        apixuConditions = response;
      })
    }else{
      console.log('skipping fetching')
    }
  }

  fetchConditions();

  let getCurrentWeather = function() {

    let apixuLatitude = $latitude.val();
    let apixuLongitude = $longitude.val();
    let apixuLocation = $location.val();
    let fetchUrl;

    if(!useLocation){
      fetchUrl = apixuUrl + apixuKey + '&q=' + apixuLatitude +','+apixuLongitude;
    }else{
      fetchUrl = apixuUrl + apixuKey + '&q=' + apixuLocation;
    }
    
    
    fetch(fetchUrl)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
        weatherLocation = data.location.name;
        localTime = data.location.localtime;
        temperature = data.current.temp_c; 
        condition = data.current.condition.text;

        let conditionIconSrc = '../src/weather/64x64/day/';
    
        apixuConditions.forEach(apixuCondition => {
          if(apixuCondition.day === condition){
            conditionIconSrc += apixuCondition.icon+'.png';
          }
        })   

        let center = new google.maps.LatLng(data.location.lat, data.location.lon);
        map.panTo(center);   

        $('#weatherResult').remove();
        $('#weatherContainer').hide().append(`
                                              <div id="weatherResult">
                                                <div id="resultHeader">
                                                  <p id="resultTime">Today: ${localTime}</p>
                                                  <h3 id="resultTitle">${weatherLocation}</h3>
                                                </div>
                                                <img src="${conditionIconSrc} "alt="sunshine" id="resultPicture"> 
                                                <p id="resultTemperature">${temperature}</p>
                                                <p id="resultCondition">${condition}</p>
                                              </div>
                                              `).slideDown(300);
    }).catch(error => {
      $('weatherResult').remove();
      $('weatherContainer').append(`
                                    <div id="weatherError">
                                      <p>Error finding the place</p>
                                    </div>
                                  `)
    })
  };

  $btnCurrentWeather.click(getCurrentWeather);

})

function initMap() {
  console.log("initing map")
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(55.866, -4.2499),
      mapTypeId: 'terrain'
  });
  google.maps.event.trigger(map, 'resize');

  new google.maps.event.addListener(map, "click", function (e) {
    document.getElementById('location').value = '';
    document.getElementById('latitude').value = e.latLng.lat();
    document.getElementById('longitude').value = e.latLng.lng();
    document.getElementById('currentWeather').click();
  });
}