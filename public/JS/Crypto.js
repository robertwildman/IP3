var ctx = document.getElementById("myChart").getContext('2d');
var chart;
var days = [];
var value = [];
$( document ).ready(function() {
  loadgraphwithcoin('btc-bitcoin');
    $("#bitcoin").click(function()
    {
      loadgraphwithcoin('btc-bitcoin');
    });
    $("#ethereum").click(function()
    {
      loadgraphwithcoin('eth-ethereum');
    });
    $("#xrp").click(function()
    {
      loadgraphwithcoin('xrp-xrp');
    });
    $("#dogecoin").click(function()
    {
      loadgraphwithcoin('doge-dogecoin');
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
    url: "https://api.coinpaprika.com/v1/coins/"+type+"/ohlcv/historical?start=2019-01-01&limit=200",
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
      //Do Something to handle error
    }
  });
}
