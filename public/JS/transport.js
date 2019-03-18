$( document ).ready(function() {
    //Jquery ready
    $("#lookup").click(function(){
        $.ajax({
            url: "/api/train/station",
            data: { 
                station: $("#stationname").val(), 
              },
            type: "get", //send it through get method
            success: function(response) {
                var tableset = "<h3> "+response.Station_Name+" </h3> <table class='table table-striped table-dark' style='width: 400px; float: left; margin-left: 2px; margin-right: 2px;'> "
                tableset += "<tr><th> Mode </th><th> Platform </th><th> Planned Depart </th><th> Destination </th><th> Live Departure </th><th> Status </th></tr>"; 
                $.each(response.Results, function(index, value) {
                    tableset += "<tr><td> "+value.mode+"</td><td>"+ value.platform +"</td><td>"+ value.aimed_departure + "</td><td>"+ value.destination_name + "</td><td>"+ value.expected_departure+ "</td><td>"+value.status+"</td><td><button type='button' onclick='viewextra(\"" + value.timetable_id + "\")'class='btn table-button'>View</button></td></tr>";
                 });
                 tableset += "</table>"
            $('#listholder').append(tableset);
            },
            error: function(xhr) {
              console.log(xhr);
            }
        });
    });
});

function viewextra(url)
{
    $.ajax({
        url: url,
        type: "get", //send it through get method
        success: function(response) {
            console.log(response);
        },
        error: function(xhr) {
          console.log(xhr);
        }
    });
}
