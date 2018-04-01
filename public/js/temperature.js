function sensor_data() {
    let http_req = new XMLHttpRequest();
    http_req.addEventListener("load", res_listen);

    //if there is an error with sending request to server, let user know
    http_req.onerror = () => {
        console.log('Unable to connect to server.');
    };
    const params = JSON.stringify({
        start: moment().format('L'),
        end: moment().add(1, 'days').format('L')
    });

    //send GET request to this route on local Node server
    http_req.open('POST', `/api/sensor/lookup`, true);
    http_req.setRequestHeader("Content-Type", "application/json");
    http_req.send(params);
};

sensor_data.call();

function res_listen() {
    //response recieved back from Node server
    //already formatted for chart.js
    let data = JSON.parse(this.responseText);
    console.log(data);
    let ctx = document.getElementById("tempChart").getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                lineTension: .3,
                label: "Bedroom",
                fill: false,
                color: '#ddd',
                backgroundColor: '#ddd',
                borderColor: '#7f90bd',
                data: data
            }]
        },
        options: {
            title: {
                display: true,
                text: 'House Temperatures',
                fontFamily: 'Hack',
                fontSize: 16
            },
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    },
                    gridLines: {
                        display: false,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature in Farernheit',
                        fontFamily: 'Hack',

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    type: 'time',
                    time: {
                        //parser: '',
                        round: 'minute',
                        //unit: 'hour', //or use minute
                        //The number of steps of the above unit between ticks
                        //unitStepSize: 1,
                        tooltipFormat: 'dddd, MMMM Do YYYY, h:mm a',
                        displayFormats: {
                            hour: 'h a'
                        }
                    },
                }]
            }
        }
    });
}