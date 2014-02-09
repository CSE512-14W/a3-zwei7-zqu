function showbarchart()
{
	var width = 300;
	var height = 200;
	var offset_x = 220*4 + 60;
	var offset_y = 110*4 - height;

	var svg = d3.select("svg");

	var barchart = svg.append("g")
	   .attr("class", "barchart")
	   .attr("transform", "translate(" + offset_x + ", " + offset_y + ")");

	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .1)
	    .domain(["retail","farm"]);

	var y = d3.scale.linear()
	    .rangeRound([height, 0])
	    .domain([0,100]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .tickFormat(d3.format(".2s"));

	barchart.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

    barchart.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    
    for(var j=0; j<16; j++)
    {
      barchart.append("rect")
        .attr("width", 40)
        .attr("x", x("retail") )
        .attr("class", "retailrect");	
    }
      
    
    
    


    
}

