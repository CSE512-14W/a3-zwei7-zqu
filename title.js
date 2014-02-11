function addtitle()
{
	var margin = {top: 10, right: 5, bottom: 5, left: 10};
	
	var svg = d3.select(".barchartsvg");

	svg.append("g")
	    .attr("class", "title")
	    .append("text")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "start")
		.text("Farm 2 Consumer");

	var infogroup = svg.append("g")
	    .attr("class", "infogroup");

	infogroup
	   .append("text")
	   .attr("transform", "translate(" + margin.left + "," + (margin.top+40) + ")")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "start")
		.text("Of your grocery spendings at retail stores,");
    infogroup
	   .append("text")
	   .attr("transform", "translate(" + margin.left + "," + (margin.top+60) + ")")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "start")
		.text("how much goes to farmers?");

}

function addlegend(type)
{
	var legendgroup = d3.select(".barchartsvg").append("g")
	    .attr("class", "legendgroup");
    
    if(type == "price")
    {
	    // legends
		legendgroup
		   .append("line")
		   .attr("class", "retailline")
		   .attr("x1", 10)
		   .attr("y1", (margin.top+100))
		   .attr("x2", 40)
		   .attr("y2", (margin.top+100));
		legendgroup
		   .append("line")
		   .attr("class", "farmline")
		   .attr("x1", 10)
		   .attr("y1", (margin.top+115))
		   .attr("x2", 40)
		   .attr("y2", (margin.top+115));

		legendgroup
		   .append("text")
		   .attr("transform", "translate(" + (margin.left+40) + "," + (margin.top+90) + ")")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "start")
			.text("Retail prices (inflation adjusted)");
		legendgroup
		   .append("text")
		   .attr("transform", "translate(" + (margin.left+40) + "," + (margin.top+105) + ")")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "start")
			.text("Farm prices (inflation adjusted)");
	}
	else if(type == "percent")
	{
		legendgroup
		   .append("line")
		   .attr("class", "percentline")
		   .attr("x1", 10)
		   .attr("y1", (margin.top+100))
		   .attr("x2", 40)
		   .attr("y2", (margin.top+100));
		legendgroup
		   .append("text")
		   .attr("transform", "translate(" + (margin.left+40) + "," + (margin.top+90) + ")")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "start")
			.text("(Farm Price / Retail Price) * 100 ");
	}
}
