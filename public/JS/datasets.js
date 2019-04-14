$(document).ready(function(){
    $("#cryptodiv").hide();
    $("#bikesdiv").hide();
    $("#petitiondiv").hide();
    $("#postcodediv").hide();
    $("#cryptolink").click(function(){
        $("#cryptodiv").show();
        $("#bikesdiv").hide();
        $("#petitiondiv").hide();
        $("#postcodediv").hide();
    }); 
    $("#bikeslink").click(function(){
        $("#cryptodiv").hide();
        $("#bikesdiv").show();
        $("#petitiondiv").hide();
        $("#postcodediv").hide();
    }); 
    $("#petitionlink").click(function(){
        $("#cryptodiv").hide();
        $("#bikesdiv").hide();
        $("#petitiondiv").show();
        $("#postcodediv").hide();
    }); 
    $("#postcodelink").click(function(){
        $("#cryptodiv").hide();
        $("#bikesdiv").hide();
        $("#petitiondiv").hide();
        $("#postcodediv").show();
    }); 
    
    $("#di1").hide();
        $("#dt1").hide();
        $("#do1").hide();
        $("#du1").hide();
    

});
function iclick(id)
{
    $("#di"+id).show();
    $("#dt"+id).hide();
    $("#do"+id).hide();
    $("#du"+id).hide();
}
function tclick(id)
{
    $("#di"+id).hide();
    $("#dt"+id).show();
    $("#do"+id).hide();
    $("#du"+id).hide();
}
function oclick(id)
{
    $("#di"+id).hide();
    $("#dt"+id).hide();
    $("#do"+id).show();
    $("#du"+id).hide();
}
function uclick(id)
{
    $("#di"+id).hide();
    $("#dt"+id).hide();
    $("#du"+id).show();
    $("#do"+id).hide();
}