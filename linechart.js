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
        .attr("transform", "translate(-margin.left,0), rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");
        */

    var retailgroup = cell.append("g")
        .attr("class", "retailgroup");
    var retailpath = retailgroup.append("path")
        .datum(data)
        .attr("class", "retailline")
        .attr("d", retailprice);
    retailgroup.append("text")
        .attr("class", "datalabel")
        .attr("name", "retail_text_label")
        .style("display", "none")
        .text("retail default")
        .style("text-anchor", "start")
        .attr("x", 0)
        .attr("y", 10);
    

    var farmgroup = cell.append("g")
        .attr("class", "farmgroup");
    var farmpath = farmgroup.append("path")
        .datum(data)
        .attr("class", "farmline")
        .attr("d", farmprice);

    farmgroup.append("text")
        .attr("class", "datalabel")
        .style("display", "none")
        .text("")
        .style("text-anchor", "start")
        .attr("x", 0)
        .attr("y", 10);
    
    
    cell.append("text")
        .text(caption)
        .attr("x", 0)
        .attr("y", 15)
        .style("text-anchor", "start");

    cell.append("g")
        .attr("class", "interactive")
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .on({
        "mouseover": 
          function() { 
            d3.select(".rulesgroup").style("display", null); 
            d3.selectAll(".datalabel").style("display", null);
          },
        "mouseout":  
          function() { 
            d3.select(".rulesgroup").style("display", "none");  
            d3.selectAll(".datalabel").style("display", "none");
          }, 
          /*
        "mousemove": 
        
          function mousemove() {
            // move the four rules
            d3.select(".rulesgroup")
              .attr("transform", "translate(" + (d3.mouse(this)[0]+margin.left) + ",0)");
              
            x0 = (x.invert(d3.mouse(this)[0]));
            //console.log(x0);
            var bisectYear = d3.bisector(function(d) { return d.year; }).left;
            i = bisectYear(data, x0);
            //console.log(data);
            //console.log(data[i].retail);
            
            var selection = d3.selectAll(".retailgroup").selectAll(".datalabel");
            //console.log(selection);
            
              .attr("transform", "translate(" + 
                function(d) {(d.x(data[i].year))}
                 + "," + 
                 function(d) {(d.y(data[i].retail))}
                 + ")")
              .text(  "R" + data[i].retail  );
            

            d3.selectAll(".farmgroup").selectAll(".datalabel")
              .attr("transform", "translate(" + (d3.mouse(this)[0]) + "," + (y(data[i].farm)) + ")")
              .text(  "F" + data[i].farm  );
              
              
          }
          */
      });
        
  });

}

function findYatX(x, line) {
     function getXY(len) {
          var point = line.getPointAtLength(len);
          return [point.x, point.y];
     }
     var curlen = 0;
     while (getXY(curlen)[0] < x) { curlen += 0.01; }
     return getXY(curlen)[1];
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

    var percentpath = cell.append("g")
        .attr("class", "percentgroup");
    percentpath.append("path")
        .datum(data)
        .attr("class", "percentline")
        .attr("d", percentline);
    percentpath.append("text")
        .attr("class", "datalabel")
        .style("display", "none")
        .text("percent default");
    
    cell.append("text")
        .text(caption)
        .attr("x", 0)
        .attr("y", 15)
        .style("text-anchor", "start"); 

    cell.append("g").append("rect")
        .attr("class", "interactive")
        .attr("width", width)
        .attr("height", height)
        .on({
        "mouseover": 
          function() { 
            d3.select(".rulesgroup").style("display", null);  
            d3.selectAll(".datalabel").style("display", null);
          },
        "mouseout":  
          function() { 
            d3.select(".rulesgroup").style("display", "none");  
            d3.selectAll(".datalabel").style("display", "none");
          }, 
          /*
        "mousemove": 
          function () {
            d3.select(".rulesgroup")
              .attr("transform", "translate(" + (d3.mouse(this)[0]+margin.left) + ",0)");
            d3.selectAll(".retailgroup").selectAll(".datalabel")
              .attr("transform", "translate(" + (d3.mouse(this)[0]) + ",5)");
          }
          */
        });;
    
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
            "y2": 460
          });

  rulesgroup.append("line")
          .attr("class", "rule")
          .attr({
            "x1": fullwidth,
            "y1": 0,
            "x2": fullwidth,
            "y2": 460
          });

  rulesgroup.append("line")
          .attr("class", "rule")
          .attr({
            "x1": fullwidth*2,
            "y1": 0,
            "x2": fullwidth*2,
            "y2": 460
          });
  
  rulesgroup.append("line")
          .attr("class", "rule")
          .attr({
            "x1": fullwidth*3,
            "y1": 0,
            "x2": fullwidth*3,
            "y2": 460
          });
}


function svglisten()
{
  d3.select("svg").on(
    {"mousemove":
    function ()
    {
      // move the four rules
      var current_rule = Math.floor( d3.mouse(this)[0]/fullwidth );

      d3.select(".rulesgroup")
        .attr("transform", "translate(" + (d3.mouse(this)[0]%fullwidth) + ",0)");
      
      //console.log(this);

      d3.selectAll(".rule")
        .style("stroke", function (d,i) {
          if(i===current_rule)
            return "red";
          else
            return "grey";
        } );
      
      
      

      var retail_labels = d3.selectAll(".retailgroup").selectAll(".datalabel")  
        .text(function (d)
          {
            // get path
            var retailpath = d3.select(this.parentNode).select("path");
            var retaildata = retailpath.datum();
            
            // reconstruct x scale
            var x = d3.time.scale()
                .range([0, width])
                .domain( [formatYear("2000"), formatYear("2012")] );

            x0 =  x.invert(  (d3.mouse(svg.node())[0]-margin.left)%fullwidth );
            
            var bisectYear = d3.bisector(function(d) { return d.year; }).left;
            var index = bisectYear(retaildata, x0);
            if(index<1)
            {
              var retailvalue = "";
            }
            else
            {
              var retailvalue = d3.round(retaildata[index-1].retail, 2);
            }

            return retailvalue;
          })
          .attr("transform", function()
          {
            // get path
            var retailpath = d3.select(this.parentNode).select("path");
            var retaildata = retailpath.datum();
            
            // reconstruct x scale
            var x = d3.time.scale()
                .range([0, width])
                .domain( [formatYear("2000"), formatYear("2012")] );

            // reconstruct y scale
            var y = d3.scale.linear()
              .range([height, 0]);
            var yMax = d3.max( retaildata, function(d) {return d.retail;} );
            //console.log(yMax);
            y.domain([0, yMax]);

            x0 =  x.invert(  (d3.mouse(svg.node())[0]-margin.left)%fullwidth );
            
            var bisectYear = d3.bisector(function(d) { return d.year; }).left;
            i = bisectYear(retaildata, x0);
            if(i<1)
            {
              var retailpos = 0;
            }
            else
            {
              var retailvalue = retaildata[i-1].retail;
              var retailpos = y(retailvalue);
            }


            return "translate(" + ( (d3.mouse(svg.node())[0]-margin.left)%fullwidth ) + "," + retailpos + ")";
          });
      
      

      var farm_labels = d3.selectAll(".farmgroup").selectAll(".datalabel")  
        .text(function (d, i)
          {
            // get path
            var farmpath = d3.select(this.parentNode).select("path");
            var farmdata = farmpath.datum();
            
            // reconstruct x scale
            var x = d3.time.scale()
                .range([0, width])
                .domain( [formatYear("2000"), formatYear("2012")] );

            x0 =  x.invert(  (d3.mouse(svg.node())[0]-margin.left)%fullwidth );
            
            var bisectYear = d3.bisector(function(d) { return d.year; }).left;
            i = bisectYear(farmdata, x0);
            if(i<1)
              var farmvalue = "";
            else
            {
              var farmvalue = d3.round(farmdata[i-1].farm, 2);
            }

            return farmvalue;
          })
          .attr("transform", function()
          {
            // get path
            var farmpath = d3.select(this.parentNode).select("path");
            var farmdata = farmpath.datum();
            
            // reconstruct x scale
            var x = d3.time.scale()
                .range([0, width])
                .domain( [formatYear("2000"), formatYear("2012")] );

            // reconstruct y scale
            var y = d3.scale.linear()
              .range([height, 0]);
            var yMax = d3.max( farmdata, function(d) {return d.retail;} );
            //console.log(yMax);
            y.domain([0, yMax]);

            x0 =  x.invert(  (d3.mouse(svg.node())[0]-margin.left)%fullwidth );
            
            var bisectYear = d3.bisector(function(d) { return d.year; }).left;
            i = bisectYear(farmdata, x0);
            if(i<1)
            {
              var farmpos = 0;
            }
            else
            {
              var farmvalue = farmdata[i-1].farm;
              var farmpos = y(farmvalue);
            }

            
            //console.log(retailpos);

            return "translate(" + ( (d3.mouse(svg.node())[0]-margin.left)%fullwidth ) + "," + farmpos + ")";
          });      

      var percent_labels = d3.selectAll(".percentgroup").selectAll(".datalabel")  
        .text(function (d, i)
          {
            // get path
            var percentpath = d3.select(this.parentNode).select("path");
            var percentdata = percentpath.datum();
            
            // reconstruct x scale
            var x = d3.time.scale()
                .range([0, width])
                .domain( [formatYear("2000"), formatYear("2012")] );

            x0 =  x.invert(  (d3.mouse(svg.node())[0]-margin.left)%fullwidth );
            
            var bisectYear = d3.bisector(function(d) { return d.year; }).left;
            i = bisectYear(percentdata, x0);
            if(i<1)
              var percentvalue = "";
            else
            {
              var percentvalue = d3.round(percentdata[i-1].percent, 0);
            }

            return percentvalue;
          })
          .attr("transform", function()
          {
            // get path
            var percentpath = d3.select(this.parentNode).select("path");
            var percentdata = percentpath.datum();
            
            // reconstruct x scale
            var x = d3.time.scale()
                .range([0, width])
                .domain( [formatYear("2000"), formatYear("2012")] );

            // reconstruct y scale
            var y = d3.scale.linear()
              .range([height, 0]);
            var yMax = d3.max( percentdata, function(d) {return d.percent;} );
            //console.log(yMax);
            y.domain([0, yMax]);

            x0 =  x.invert(  (d3.mouse(svg.node())[0]-margin.left)%fullwidth );
            
            var bisectYear = d3.bisector(function(d) { return d.year; }).left;
            i = bisectYear(percentdata, x0);
            if(i<1)
            {
              var percentpos = 0;
            }
            else
            {
              var percentvalue = percentdata[i-1].percent;
              var percentpos = y(percentvalue);
            }

            return "translate(" + ( (d3.mouse(svg.node())[0]-margin.left)%fullwidth ) + "," + percentpos + ")";
          });      

      var barchart = d3.select(".barchart");
      var slc = document.getElementsByName('retail_text_label');
      var retailarray = [
        slc[0].innerHTML,
        slc[1].innerHTML,
        slc[2].innerHTML,
        slc[3].innerHTML,
        slc[4].innerHTML,
        slc[5].innerHTML,
        slc[6].innerHTML,
        slc[7].innerHTML,
        slc[8].innerHTML,
        slc[9].innerHTML,
        slc[10].innerHTML,
        slc[11].innerHTML,
        slc[12].innerHTML,
        slc[13].innerHTML,
        slc[14].innerHTML,
        slc[15].innerHTML,
        ];
      console.log(retailarray);

      var retailrects = barchart.selectAll(".retailrect")
        .data(retailarray);

      retailrects
          .attr("height", function(d) { return d*3; })
          .attr("y", function(d) { return d*50; });
      
    }});
}

/*
function mousemove() {
  d3.select(".rulesgroup")
    .attr("transform", "translate(" + (d3.mouse(this)[0]+margin.left) + ",0)");
  d3.selectAll(".retailgroup").selectAll(".datalabel")
    .attr("transform", "translate(" + (d3.mouse(this)[0]) + ",5)");
}
*/

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
