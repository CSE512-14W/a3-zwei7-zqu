var margin = {top: 5, right: 5, bottom: 5, left: 30},
    width = 220 - margin.left - margin.right,
    height = 110 - margin.top - margin.bottom;

var formatYear = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var currentview = "pricechart";
function SwitchView()
{
  var button = d3.select("#SwitchButton")
  if(currentview === "pricechart")
  {
    console.log("Switch to percent chart!");  
    currentview = "percentchart";
    showpercentcharts();
    button.text("Show Retail & Farm Prices");
  }
  else if(currentview === "percentchart")
  {
    console.log("Switch to price chart!");  
    currentview = "pricechart";
    showpricecharts();
    button.text("Show Farm/Retail Percentage");
  }
}

function showpricecharts()
{
  d3.select(".columns").selectAll(".svgrow").remove();
  // Price Charts
  // dairies
  pricechart(".dairycolumn", "data/butter.csv");
  pricechart(".dairycolumn", "data/cheese.csv");
  pricechart(".dairycolumn", "data/ice_cream.csv");
  pricechart(".dairycolumn", "data/whole_milk.csv");

  // vegetables
  pricechart(".veggicolumn", "data/broccoli.csv");
  pricechart(".veggicolumn", "data/iceberg_lettuce.csv");
  pricechart(".veggicolumn", "data/potatoes.csv");
  pricechart(".veggicolumn", "data/tomatoes.csv");

  // fruits 
  pricechart(".fruitcolumn1", "data/apples.csv");
  pricechart(".fruitcolumn1", "data/grapefruit.csv");
  pricechart(".fruitcolumn1", "data/grapes.csv");
  pricechart(".fruitcolumn1", "data/lemons.csv");
  pricechart(".fruitcolumn2", "data/oranges.csv");
  pricechart(".fruitcolumn2", "data/peaches.csv");
  pricechart(".fruitcolumn2", "data/pears.csv");
  pricechart(".fruitcolumn2", "data/strawberries.csv");

}

function showpercentcharts()
{
  d3.select(".columns").selectAll(".svgrow").remove();
  // Percent Charts
  // dairies
  percentchart(".dairycolumn", "data/butter.csv");
  percentchart(".dairycolumn", "data/cheese.csv");
  percentchart(".dairycolumn", "data/ice_cream.csv");
  percentchart(".dairycolumn", "data/whole_milk.csv");

  // vegetables
  percentchart(".veggicolumn", "data/broccoli.csv");
  percentchart(".veggicolumn", "data/iceberg_lettuce.csv");
  percentchart(".veggicolumn", "data/potatoes.csv");
  percentchart(".veggicolumn", "data/tomatoes.csv");

  // fruits 
  percentchart(".fruitcolumn1", "data/apples.csv");
  percentchart(".fruitcolumn1", "data/grapefruit.csv");
  percentchart(".fruitcolumn1", "data/grapes.csv");
  percentchart(".fruitcolumn1", "data/lemons.csv");
  percentchart(".fruitcolumn2", "data/oranges.csv");
  percentchart(".fruitcolumn2", "data/peaches.csv");
  percentchart(".fruitcolumn2", "data/pears.csv");
  percentchart(".fruitcolumn2", "data/strawberries.csv");

}

function pricechart(column, individual_food)
{

  var retailprice = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.retail); });

  var farmprice = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.farm); });

  var svgrow = d3.select(column).append("tr")
      .attr("class", "svgrow");

  var svg = svgrow.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(individual_food, function(error, data) {
    data.forEach(function(d) {
      d.year = formatYear(d.year);
      d.retail = d.retail;
      d.farm = d.farm;
    });

    x.domain( [formatYear("2000"), formatYear("2012")] );
    var max = d3.extent(data, function(d) { return d.retail; });
    y.domain( [0, d3.max(max)] );

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

    svg.append("path")
        .datum(data)
        .attr("class", "retailline")
        .attr("d", retailprice);

    svg.append("path")
        .datum(data)
        .attr("class", "farmline")
        .attr("d", farmprice);

    svg.append("text")
        .text(individual_food)
        .attr("x", 0)
        .attr("y", height);
  });

}

function percentchart(column, individual_food)
{

  var percentline = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.percent); });
  
  var svgrow = d3.select(column).append("tr")
      .attr("class", "svgrow");

  var svg = svgrow.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(individual_food, function(error, data) {
    data.forEach(function(d) {
      d.year = formatYear(d.year);
      d.percent = d.percent;
    });

    x.domain( [formatYear("2000"), formatYear("2012")] );
    var max = d3.extent(data, function(d) { return d.percent; });
    y.domain( [0, d3.max(max)] );

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Farm/Retail %");

    svg.append("path")
        .datum(data)
        .attr("class", "percentline")
        .attr("d", percentline);


    svg.append("text")
        .text(individual_food)
        .attr("x", 0)
        .attr("y", height);
  });

}
