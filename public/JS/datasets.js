$(document).ready(function(){
    $("#di1").hide();
    $("#dt1").hide();
    $("#do1").hide();
    $("#du1").hide();
    $("#di2").hide();
    $("#dt2").hide();
    $("#do2").hide();
    $("#du2").hide();
    

});
function iclick(id)
{
    $("#di"+id).toggle();
    $("#dt"+id).hide();
    $("#do"+id).hide();
    $("#du"+id).hide();
}
function tclick(id)
{
    $("#di"+id).hide();
    $("#dt"+id).toggle();
    $("#do"+id).hide();
    $("#du"+id).hide();
}
function oclick(id)
{
    $("#di"+id).hide();
    $("#dt"+id).hide();
    $("#do"+id).toggle();
    $("#du"+id).hide();
}
function uclick(id)
{
    $("#di"+id).hide();
    $("#dt"+id).hide();
    $("#du"+id).toggle();
    $("#do"+id).hide();
}