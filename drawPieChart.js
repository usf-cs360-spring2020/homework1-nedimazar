console.log("PIE");


function drawPie(data){
  // set the dimensions and margins of the graph
  var width = 600
      height = 600
      margin = 90;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  var area = [...new Set(data.map(d => d.BoardingArea))];

  var formatComma =   d3.format(",");

  var arc = d3.arc()
    	.innerRadius(0)
    	.outerRadius(radius)

  var svg = d3.select("#pieChart")
      .attr("width", width + 360)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



  svg.append("text").attr("id", "charttitle")
   .attr("x",  95 )
   .attr("y", -270)
   .style("text-anchor", "middle")
   .text("Distribution of boarding areas used for enplaned/deplaned flights at SFO 2/1/2013 - 4/1/2017 by passenger count.");

      // Create dummy data
     var data = {A: 85568565, B: 81973388, C:62529391, D:66385481, E:65848059, F: 188886482, G:86367680};

     // A,85568565
     // B,81973388
     // C,62529391
     // D,66385481
     // E,65848059
     // F,188886482
     // G,86367680
     // Other,200


     // set the color scale
     var color = d3.scaleOrdinal()
       .domain(area)
       .range(["#1BA3C6", "#1FAE81", "#BCBD22", "#F88113", "#F43C63", "#D669BE", "#4F7CBA"])

     // Compute the position of each group on the pie:
     var pie = d3.pie()
       .value(function(d) {return d.value; })
       .sort(function(a, b) {
   return a.key.localeCompare(b.key);
   });
     var data_ready = pie(d3.entries(data))


  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
var g=  svg
    .selectAll('.arc')
    .data(data_ready)
    .enter()
    .append('g');
    g.append("path")
    .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius))
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "transparent")
    .style("stroke-width", "1px");

    g.append("text")
       	.attr("transform", function(d) {
           var _d = arc.centroid(d);
           _d[0] *= 2.4;	//multiply by a constant factor
           _d[1] *= 2.4;	//multiply by a constant factor
           return "translate(" + _d + ")";
         })
         .attr("dy", ".60em")
         .style("text-anchor", "middle")
         .text(function(d) {
           return d.data.key;
         });
   g.append("text")
        .attr("id", 'pieLabel')
      	.attr("transform", function(d) {
          var _d = arc.centroid(d);
          _d[0] = (_d[0] * 2.5) ;	//multiply by a constant factor
          _d[1] = (_d[1] * 2.4);	//multiply by a constant factor
          return "translate(" + _d + ")";
        })
        .attr("dy", "1.5em")
        .style("text-anchor", "middle")
        .style("padding-top", "10px")
        .text(function(d) {
          return formatComma(d.data.value); });

}

d3.csv("pieData.csv").then(d => drawPie(d));
