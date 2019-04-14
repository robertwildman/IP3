var ctx = document.getElementById("myChart").getContext('2d');
var chart;
var currentcoin;
var days = [];
var value = [];
Chart.defaults.global.defaultFontColor = "#fff";

$( document ).ready(function() {
  currentcoin = 'btc-bitcoin';
  loadgraphwithcoin(currentcoin);
    $("#bitcoin").click(function()
    {
      currentcoin = 'btc-bitcoin';
      loadgraphwithcoin('btc-bitcoin');
    });
    $("#ethereum").click(function()
    {
      currentcoin = 'eth-ethereum';
      loadgraphwithcoin('eth-ethereum');
    });
    $("#xrp").click(function()
    {
      currentcoin = 'xrp-xrp';
      loadgraphwithcoin('xrp-xrp');
    });
    $("#dogecoin").click(function()
    {
      currentcoin = 'doge-dogecoin';
      loadgraphwithcoin('doge-dogecoin');
    });
    $('#cryptodate').on('change', function() {
      loadgraphwithcoin(currentcoin);
    });
 });


function loadgraphwithcoin(type)
{
  if(chart != undefined)
  {
    chart.destroy();
  }
  days = [];
  value = [];
  $.ajax({
    url: "https://api.coinpaprika.com/v1/coins/"+type+"/ohlcv/historical?start="+getdate()+"&limit=366",
    type: "get", //send it through get method
    success: function(response) {
      // Begin accessing JSON data here
      response.forEach(day => {
            var tempdate = new Date(Date.parse(day.time_open));
            var dayi = tempdate.toDateString();
            days.push(dayi);
            value.push(day.close);
      });
      console.log(days);
      console.log(value);
      chart = new Chart(ctx, {
         type: 'line',
    data: {
        labels: days,
        datasets: [{
            data: value,
            backgroundColor: "#D4aF37",
            borderColor:"white"
        }]
    },
    options: {
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false
        },
       hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Price (USD)'
            },
          }]
        },
        legend: {
            display: false
        }
    }
    }); 
    },
    error: function(xhr) {
      error("Unable to access the server!");    }
  });
}
function getdate()
{
  var datenum = $("#cryptodate").val();
  var d = new Date();
  d.setDate(d.getDate()-datenum);
  return d.toISOString().slice(0,10);
}
