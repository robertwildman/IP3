$(function(){

  /**
   * Variables used throughout app.
   * Storing tutorials in a tutorial array, for easy and automatic creation of new tutorials.
   */
  let index = 0;
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

  /**
   * Calling createTutorial method for every tutorial in tutorial array
   */
  tutorials.tutorialArray.forEach(tutorial => {
    createTutorial(tutorial);
  })

  /**
   * Create and append a tutorial on the page for every tutorial in the tutorial array 
   */
  function createTutorial(tutorial){
    let tutorialContent = `
                            <div class='tutorial'>
                              <h3>${tutorial.name}</h3>
                              <h5>${tutorial.description}</h5>
                              <p class='content' id='content${index}'>${tutorial.content}</p>
                            </div>
                          `
    $('#tutorials').append(tutorialContent);     
    
    index++;
  }

  /**
   * Add a listener to show the tutorial content once clicked
   */

  $('.tutorial').click(function (){
    showContent($(this).children('p').attr('id'));
  })

  /**
   * Function to show the content of a tutorial
   */
  function showContent(contentId){
    $('#'+contentId).fadeToggle(200);
  }
})