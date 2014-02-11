function showbarchart()
{
	var fullwidth = 300;
	var fullheight = 480;
	var offset_x = 220*4 + 60;
	var offset_y = 110*4 - height;
    var margin = {top: 235, right: 5, bottom: 40, left: 50},
        width = fullwidth - margin.left - margin.right,
        height = fullheight - margin.top - margin.bottom;

	var svg = d3.select(".barchartsvg");

	var barchart = svg.append("g")
	   .attr("class", "barchart")
	   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scale.ordinal()
	    .domain(["-", "retail spending", "farm value", "."])
        .rangePoints([0, width]);

	var y = d3.scale.linear()
	    .rangeRound([height, 0])
	    .domain([0,500]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .tickFormat(d3.format(".2s"));

	barchart.append("g")
	      .attr("class", "major x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

    barchart.append("g")
      .attr("class", "major y axis")
      .call(yAxis)
      .append("text")
        .attr("transform", "translate(" + (-margin.left) + ", 0), rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .text("Spendings ($)");
    
    var title = barchart.append("g");
    title.append("text")
      .attr("transform", "translate(" + width + ", 0)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .text("Your Spending vs Farm Value");
    title.append("text")
      .attr("transform", "translate(" + width + ", 15)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .text("Spending = Price * Weight");
    
    var palette = ["#5259C9", "#567ED4", "#5692BD", "#56C1D4",
                    "#5AB02A", "#79992C", "#B0AE2A", "#A69727",
                    "#ED7E3B", "#D66340", "#ED4A3B", "#E3385B",
                    "#D64D4A", "#E04E8F", "#C950C3", "#BD4EE0"];
    for(var j=0; j<16; j++)
    {
      barchart.append("rect")
        .attr("width", 40)
        .attr("x", x("retail spending")-20)
        .attr("class", "retailrect")
        .attr("fill", palette[j]);	
    }

    for(var j=0; j<16; j++)
    {
      barchart.append("rect")
        .attr("width", 40)
        .attr("x", x("farm value")-20)
        .attr("class", "farmrect")
        .attr("fill", palette[j]);	
    }
      
    
    
    


    
}

