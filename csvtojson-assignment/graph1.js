
graph1();
function graph1(){

var margin = {top: 30, right: 20, bottom: 150, left: 50},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")



var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(11);


// add the SVG element
var svg = d3.select("#graph1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("partone.json", function(error, data) {

    data.forEach(function(d) {
        d.Country = d.Country;
        d.MValue = +d.MValue;
        d.FValue = +d.FValue;
    });
  
  // scale the range of the data
  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.MValue; })]);
   y.domain([0, d3.max(data, function(d) { return d.FValue; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("dy", ".1000em")
      .style("text-anchor", "end")
      .text("Value");



    


  // Add bar chart
  svg.selectAll("bar1")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.Country); })
      .attr("width", (x.rangeBand()/2))
      .attr("y", function(d) { return y(d.MValue); })
      .attr("height", function(d) { return height - y(d.MValue); });
     

       svg.selectAll("bar2")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.Country); })
      .attr("width", (x.rangeBand()/4))
       .attr("y", function(d) { return y(d.FValue); })
      .attr("height", function(d) { return height - y(d.FValue); });


      

});

}