var ctx = document.getElementById("myChart").getContext('2d');
var request = new XMLHttpRequest();
var days = [];
var value = [];
request.open('GET', 'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=2019-01-01&limit=200', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(day => {
        var tempdate = new Date(Date.parse(day.time_open));
        var dayi = tempdate.toDateString();
        days.push(dayi);
        value.push(day.close);
        
    });
  } else {
    console.log('error');
  }
console.log(days);
console.log(value);
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            data: value,
            backgroundColor: "#FFD700",
            borderColor:"#BF5700"
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
            },
          }]
        },
        legend: {
            display: false
        }
    }
});

}

request.send();
