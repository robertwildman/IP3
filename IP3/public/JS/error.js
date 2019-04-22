//This function will display an error messasge from the input
function error(error)
{
    //Change the text of the modal
    $('#errortextholder').text(error);
    //Display the modal
    $('#errorModal').modal('show');

}