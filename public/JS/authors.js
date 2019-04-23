$(function(){

  let users = [
    {
      Name: "Janne Antila",
      picture: "../IMAGES/Janne.jpg",
      description: "Janne was the second developer for the project. He was responsible for developing most of the static pages as well as the weather and earthquake pages"
    },
    {
      Name: "Benjamin Hollywood",
      picture: "../IMAGES/Benjamin.jpeg",
      description: "Benjamin was the mastermind behind organising documentation for the group. He was responsible for designing the overall appearance of the documentation and the poster deliverable"
    },
    {
      Name: "Robert Wildman",
      picture: "../IMAGES/Robert.png",
      description: "Robert was the technical lead for the group. Robert decided what technology stack would be used for the project and how pages would be implemented"
    },
    {
      Name: "Lewis Bohme",
      picture: "../IMAGES/Lewis.jpeg",
      description: "Lewis worked on the project as a designer with Adrian. His main task was designing the navigation for the application"
    },
    {
      Name: "Adrian McAulay",
      picture: "../IMAGES/Adrian.png",
      description: "Adrian was the second designer of the project. He worked on the CSS extensively with Lewis to produce a responsive UI for the project"
    },
    {
      Name: "Stephen Wrath",
      picture: "../IMAGES/Stephen.png",
      description: "Stephen worked mainly on the documentation of the project. He was responsible for coordinating the groups efforts for the deliverables of the module"
    }
  ];
  /**
   * Create a template for every author
   */
  users.forEach((user, index) =>{
    $('#profiles').append(`
                            <div id="profile${index}" class="profile">
                              <div class="imageContainer">
                                <img src=${user.picture} alt="${user.Name} class="profilepicture" width="150" height="220" >
                              </div>
                              <h2>${user.Name}</h2>
                              <p>${user.description}</p>
                            </div>
                          `)
  })

})