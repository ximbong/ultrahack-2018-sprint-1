document.addEventListener("DOMContentLoaded", function(event) {

  const realData = [
    2123,
    3123,
    235,
    4636,
    2337,
    3237,
    2329,
    2212,
    3325,
    1112
  ];

  const expectedData = [
    2523,
    3523,
    1535,
    2526,
    2537,
    3537,
    2529,
    2512,
    3525,
    1312
  ];

  const trace1 = {
    x: [
      '19-5-2018',
      '20-5-2018',
      '21-5-2018',
      '22-5-2018',
      '23-5-2018',
      '24-5-2018',
      '25-5-2018',
      '26-5-2018',
      '27-5-2018',
      '28-5-2018'
    ],
    y: realData,
    name: 'Consumption',
    type: 'bar'
  };

  const trace2 = {
    x: [
      '19-5-2018',
      '20-5-2018',
      '21-5-2018',
      '22-5-2018',
      '23-5-2018',
      '24-5-2018',
      '25-5-2018',
      '26-5-2018',
      '27-5-2018',
      '28-5-2018'
    ],
    y: expectedData,
    error_y: {
      type: 'data',
      array: expectedData.map(function(element) {
        return 0.2 * element;
      }),
      visible: true
    },
    name: 'Expectation',
    type: 'scatter'
  }

  const data = [trace1, trace2];

  const layout = {
    title: 'Energy consumption'
  };

  Plotly.newPlot('plot', data, layout);

  const outOfRange = (real, expected, error) => {
    return (expected - real) * (expected - real) > error * error
      ? true
      : false;
  }

  //Error calculation
  const calculation = (consumption, prediction) => {
    const newArray = [];
    consumption.y.forEach(function(element, index) {
      if (outOfRange(element, prediction.y[index], prediction.error_y.array[index])) {
        newArray.push(index)
      }
      newArray.forEach(function(element) {
        document.querySelectorAll(".point")[element].children[0].style.fill = "red";
      })
    })
  }

  calculation(trace1, trace2);

});
