$(function(){

  const tutorials = {
    tutorialArray: [
      {
        name: 'Geo Json', 
        description: 'A page that introduces GeoJSON', 
        content:'so many conso many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontentstents', 
        images: [
          {url:'../src/Logos/NRE_Powered_logo.jpg'}
        ]
      },
      {
        name: 'Earthquake data fundamentals', 
        description: 'A page that explains earthquake data fundamentals', 
        content:'so many wefwef so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents, so many wefwef so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents, so many wefwef so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents, so many wefwef so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents', 
        images: [
          {url:'../src/Logos/NRE_Powered_logo.jpg'}
        ]
      },{
        name: 'Weather data fundamentals', 
        description: 'A page that explains weather data fundamentals', 
        content:'so many contents so many wefwef fcontentsso many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents', 
        images: [
          {url:'../src/Logos/NRE_Powered_logo.jpg'}
        ]
      },
      {
        name: 'Javascript data processing', 
        description: 'A page that explains specific JavaScript techniques used to access and process data', 
        content:'so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents so many wefwef fcontents', 
        images: [
          {url:'../src/Logos/NRE_Powered_logo.jpg'}
        ] 
      }
    ]
  };

  let i=0;
  
  tutorials.tutorialArray.forEach(tutorial =>{

    
    i++;
    
    $('#tutorials').append(`<div class="tutorial" id=${i}>

                              <div class="tutorialTitle">
                                <h3>${tutorial.name}</h3>
                              </div>

                              <div class="tutorialDescription">
                                <p>${tutorial.description}</p>
                              </div>

                              <div class="tutorialContent">
                                <p>${tutorial.content}</p>
                              </div>

                            </div>`)
  });

  $('.tutorialContent').hide();

  $('.tutorial').click(function() {

    $(this).clone().appendTo('.opencontent');

    $('.opencontent').append(`
                              <button class="hide">Back</button>
                            `);
    $('.opencontent').append(`
                              <div class="tutorialnav">
                                <ul id="tutnavlist">
                                  <li><button class="tutnavbut" data-tutname="geo">geoJson</button></li>
                                  <li><button class="tutnavbut" data-tutname="earth">Earthquake Data</button></li>
                                  <li><button class="tutnavbut" data-tutname="weather">Weather Data</button></li>
                                  <li><button class="tutnavbut" data-tutname="jscript">Javascript data processing</button></li>
                                </ul>
                              </div>  
                            `)


    $('.opencontent').children().children('.tutorialContent').show(300);

    $('.opencontent').hide().delay(400).fadeIn(300);

    $('.opencontent').children('.hide').click(function(){
      $('#tutorials').fadeIn(300);
      $('.opencontent').children().remove();
    });

    $('.opencontent').find('.tutnavbut').click(function() {
      $('.opencontent').children().remove();

      let lol = $('#1').clone();
      console.log(lol);
      $('.opencontent').append(lol);
      $('.opencontent').append('<button class="hide">Back</button>')

      $('.opencontent').append(`
                              <div class="tutorialnav">
                                <ul id="tutnavlist">
                                  <li><button class="tutnavbut" data-tutname="geo">geoJson</button></li>
                                  <li><button class="tutnavbut" data-tutname="earth">Earthquake Data</button></li>
                                  <li><button class="tutnavbut" data-tutname="weather">Weather Data</button></li>
                                  <li><button class="tutnavbut" data-tutname="jscript">Javascript data processing</button></li>
                                </ul>
                              </div>  
                            `)

      $('.opencontent').children('.hide').click(function(){
                              $('#tutorials').fadeIn(300);
                              $('.opencontent').children().remove();
      });
    })

    $('#tutorials').fadeOut(400);

  });



})