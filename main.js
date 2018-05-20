document.addEventListener("DOMContentLoaded", function(event) {

  const realData = [
    2223,
    3223,
    2252,
    2536,
    2237,
    3337,
    2229,
    2312,
    3225,
    2100
  ];

  const expectedData = [
    2123,
    3123,
    2352,
    2636,
    2337,
    3237,
    2329,
    2212,
    3325,
    2112
  ];

  const trace1 = {
    x: [
      '19-4-2017',
      '20-4-2017',
      '21-4-2017',
      '22-4-2017',
      '23-4-2017',
      '24-4-2017',
      '25-4-2017',
      '26-4-2017',
      '27-4-2017',
      '28-4-2017'
    ],
    y: realData,
    name: 'Generated',
    type: 'bar'
  };

  const trace2 = {
    x: [
      '19-4-2017',
      '20-4-2017',
      '21-4-2017',
      '22-4-2017',
      '23-4-2017',
      '24-4-2017',
      '25-4-2017',
      '26-4-2017',
      '27-4-2017',
      '28-4-2017'
    ],
    y: expectedData,
    error_y: {
      type: 'data',
      arrayminus: expectedData.map(function(element) {
        return 0.05 * element;
      }),
      visible: true
    },
    name: 'Expectation',
    type: 'scatter'
  }

  const data = [trace1, trace2];

  const layout = {
    title: 'Energy generated from solar panel (kWh)'
  };

  Plotly.newPlot('plot', data, layout);

  const outOfRange = (real, expected, error) => {
    return (expected - real) * (expected - real) > error * error
      ? true
      : false;
  }

  const error = (real, expected, error) => {
    return (expected - real) > error
      ? true
      : false;
  }

  //Error calculation
  const calculation = (consumption, prediction) => {
    const newArray = [];
    consumption.y.forEach(function(element, index) {
      if (error(element, prediction.y[index], prediction.error_y.arrayminus[index])) {
        newArray.push(index)
      }
      newArray.forEach(function(element) {
        document.querySelectorAll(".point")[element].children[0].style.fill = "#AF0C0C";
      })
    })
  }

  calculation(trace1, trace2);
});
