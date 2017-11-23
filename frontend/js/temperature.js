var temps = [];
var times = [];
var data = [];

let sensor_data = function() {
    let http_req = new XMLHttpRequest();
    http_req.addEventListener("load", res_listen);

    //if there is an error with sending request to server, let user know
    http_req.onerror = () => {
        console.log('Unable to connect to server.');
    };

    const params = JSON.stringify({
        start: "2017, 11, 22",
        end: "2017, 11, 23"
    });

    //send GET request to this route on local Node server
    http_req.open('POST', `http://localhost:8000/api/sensor/lookup`, true);
    http_req.setRequestHeader("Content-Type", "application/json");
    http_req.send(params);
};

sensor_data.call();

function res_listen() {

    //response recieved back from Node server
    let response = JSON.parse(this.responseText);
    for (let i = 0; i < response.length; i++) {
        temps[i] = response[i].value;
        times[i] = response[i].time;
    }

    for (let i = 0; i < temps.length; i++) {
        data.push({
            x: new Date(times[i]).toString(),
            y: temps[i]
        });
    }

    var ctx = document.getElementById("tempChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: "Temperature Sensor",
                fill: false,
                color: '#ddd',
                backgroundColor: '#ddd',
                borderColor: '#000',
                data: data
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }],
                xAxes: [{
                    type: 'time',
                    distribution: 'series'
                }]
            }
        }
    });
}