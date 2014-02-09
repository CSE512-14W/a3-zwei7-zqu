var margin = {top: 5, right: 5, bottom: 5, left: 30},
    fullwidth = 220,
    fullheight = 110,
    width = fullwidth - margin.left - margin.right,
    height = fullheight - margin.top - margin.bottom;
        

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
  d3.select("svg").selectAll(".cell").remove();
  // Price Charts
  // dairies
  pricechart(0, 0, "data/butter.csv", "butter");
  pricechart(0, fullheight, "data/cheese.csv", "cheese");
  pricechart(0, fullheight*2, "data/ice_cream.csv", "ice cream");
  pricechart(0, fullheight*3, "data/whole_milk.csv", "whole milk");

  // vegetables
  pricechart(fullwidth, 0, "data/broccoli.csv", "broccoli");
  pricechart(fullwidth, fullheight, "data/iceberg_lettuce.csv", "iceberg lettuce");
  pricechart(fullwidth, fullheight*2, "data/potatoes.csv", "potatoes");
  pricechart(fullwidth, fullheight*3, "data/tomatoes.csv", "tomatoes");

  // fruits 
  pricechart(fullwidth*2, 0, "data/apples.csv", "apples");
  pricechart(fullwidth*2, fullheight, "data/grapefruit.csv", "grapefruit");
  pricechart(fullwidth*2, fullheight*2, "data/grapes.csv", "grapes");
  pricechart(fullwidth*2, fullheight*3, "data/lemons.csv", "lemons");
  pricechart(fullwidth*3, 0, "data/oranges.csv", "oranges");
  pricechart(fullwidth*3, fullheight, "data/peaches.csv", "peaches");
  pricechart(fullwidth*3, fullheight*2, "data/pears.csv", "pears");
  pricechart(fullwidth*3, fullheight*3, "data/strawberries.csv", "strawberries");
  
  // time axies
  //drawtimeaxis();
  
}

function showpercentcharts()
{
  d3.select("svg").selectAll(".cell").remove();
  // Percent Charts
  // dairies
  percentchart(0, 0, "data/butter.csv", "butter");
  percentchart(0, fullheight, "data/cheese.csv", "cheese");
  percentchart(0, fullheight*2, "data/ice_cream.csv", "ice cream");
  percentchart(0, fullheight*3, "data/whole_milk.csv", "whole milk");

  // vegetables
  percentchart(fullwidth, 0, "data/broccoli.csv", "broccoli");
  percentchart(fullwidth, fullheight*1, "data/iceberg_lettuce.csv", "iceberg lettuce");
  percentchart(fullwidth, fullheight*2, "data/potatoes.csv", "potatoes");
  percentchart(fullwidth, fullheight*3, "data/tomatoes.csv", "tomatoes");

  // fruits 
  percentchart(fullwidth*2, 0, "data/apples.csv", "apples");
  percentchart(fullwidth*2, fullheight, "data/grapefruit.csv", "grapefruit");
  percentchart(fullwidth*2, fullheight*2, "data/grapes.csv", "grapes");
  percentchart(fullwidth*2, fullheight*3, "data/lemons.csv", "lemons");
  percentchart(fullwidth*3, 0, "data/oranges.csv", "oranges");
  percentchart(fullwidth*3, fullheight, "data/peaches.csv", "peaches");
  percentchart(fullwidth*3, fullheight*2, "data/pears.csv", "pears");
  percentchart(fullwidth*3, fullheight*3, "data/strawberries.csv", "strawberries");
  
  // time axies
  //drawtimeaxis();
}

function pricechart(offset_x, offset_y, individual_food, caption)
{

  var retailprice = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.retail); });

  var farmprice = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.farm); });


  var cell = d3.select("svg").append("g")
      .attr("class", "cell")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + (offset_x+margin.left) + "," + (offset_y+margin.top) + ")");

  d3.csv(individual_food, function(error, data) {
    data.forEach(function(d) {
      d.year = formatYear(d.year);
      d.retail = d.retail;
      d.farm = d.farm;
    });

    x.domain( [formatYear("2000"), formatYear("2012")] );
    var max = d3.extent(data, function(d) { return d.retail; });
    y.domain( [0, d3.max(max)] );

    cell.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    cell.append("g")
        .attr("class", "y axis")
        .call(yAxis);
        /*
      .append("text")
        .attr("transform", "translate(-30,0), rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");
        */

    cell.append("path")
        .datum(data)
        .attr("class", "retailline")
        .attr("d", retailprice);

    cell.append("path")
        .datum(data)
        .attr("class", "farmline")
        .attr("d", farmprice);
    
    
    cell.append("text")
        .text(caption)
        .attr("x", 0)
        .attr("y", 15)
        .style("text-anchor", "start");
        
  });

}

function percentchart(offset_x, offset_y, individual_food, caption)
{

  var percentline = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.percent); });
  
  var cell = d3.select("svg").append("g")
      .attr("class", "cell")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + (offset_x+margin.left) + "," + (offset_y+margin.top) + ")");

  d3.csv(individual_food, function(error, data) {
    data.forEach(function(d) {
      d.year = formatYear(d.year);
      d.percent = d.percent;
    });

    x.domain( [formatYear("2000"), formatYear("2012")] );
    var max = d3.extent(data, function(d) { return d.percent; });
    y.domain( [0, d3.max(max)] );

    cell.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    cell.append("g")
        .attr("class", "y axis")
        .call(yAxis);
        /*
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Farm/Retail %");
        */

    cell.append("path")
        .datum(data)
        .attr("class", "percentline")
        .attr("d", percentline);

    
    cell.append("text")
        .text(caption)
        .attr("x", 0)
        .attr("y", 15)
        .style("text-anchor", "start"); 
    
  });

}

function drawrules()
{
  var rulesgroup = d3.select("svg").append("g")
    .attr("class","rulesgroup")
    .style("display", "none");

  rulesgroup.append("line")
          .attr("class", "rule")
          .attr({
            "x1": 0,
            "y1": 0,
            "x2": 0,
            "y2": 500
          });
  
  svg.on({
      "mouseover": function() { rulesgroup.style("display", null);  },
      "mouseout":  function() { rulesgroup.style("display", "none");  }, 
      "mousemove": mousemove
    });
  
  function mousemove() {
    rulesgroup.attr("transform", "translate(" + (d3.mouse(this)[0]) + "," + 0 + ")");
}
  
}



/*function drawtimeaxis()
{
  x.domain( [formatYear("2000"), formatYear("2012")] );

  var svg = d3.select("#columns").selectAll(".datacolumn").append("tr")
    .attr("class", "svgrow")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  svg.append("g")
        .attr("class", "time axis")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(xAxis);


}*/
