function buildMetadata(sample) {
  // console.log("in buildMetadata")
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample

  var url = `/metadata/${sample}`
  d3.json(url).then(function (response) {

    var data = [response];
    //  console.log(data);
    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
    var metaData = d3.select("#sample-metadata").html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    data.forEach((data) => {
      var row = metaData.append("ul");
      Object.entries(data).forEach(([key, value]) => {
        var cell = metaData.append("li");
        cell.text(`${key} : ${value}`);
      });
    });

  })


  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var urlPie = `/samples/${sample}`;
  d3.json(urlPie).then(function (response) {
    console.log(response);
    // @TODO: Build a Pie Chart
    var pieSampleValues = response.sample_values.slice(0, 10);
    var pieOutIds = response.otu_ids.slice(0, 10);
    var pieLabels = response.otu_labels.slice(0, 10);
    // console.log(pieLabels);
    tracePie = {
      values: pieSampleValues,
      labels: pieOutIds,
      type: "pie",
      hovertext: pieLabels

    }
    pieData = [tracePie];
    Plotly.plot("pie", pieData);
    // @TODO: Build a Bubble Chart using the sample data

    traceBubble = {
      x: response.otu_ids,
      y: response.sample_values,
      type: "bubble",
      text: response.otu_labels,
      mode: 'markers',
      marker: {
        color: response.otu_ids,
        size: response.sample_values,
        colorscale:'Viridis'
      }
    }
    var bubbleData = [traceBubble];
    var layout = {
      title:"Sample",
      hovermode: "closest",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Sample Value"}
    }
    Plotly.plot("bubble", bubbleData,layout);

    // })

  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  console.log("in init")
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample)
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
