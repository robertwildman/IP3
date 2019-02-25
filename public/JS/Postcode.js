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
                $('#map').html('<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/view?key=AIzaSyASgFJuBaUXGa3zhgSt3Lx1rDxHY1ZSB0w&center=' + result.latitude + ',' + result.longitude + '&zoom=16&maptype=satellite" allowfullscreen></iframe>');
                //Working on Google Place API
            } else {
                alert('error');
            }
        };
        request.send();
    });
    $("#pcATM").click(function(){

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
              response.forEach(result => {
                  console.log(result);
              });
            },
            error: function(xhr) {
              //Do Something to handle error
            }
        });
    });


});