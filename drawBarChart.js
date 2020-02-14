//Source: https://bl.ocks.org/Golodhros/6f8e6d1792416ee3770ff4ddd5c9594e


console.log("BAR");


var svg = d3.select("#barChart"),
  margin = {
    top: 20,
    right: 10,
    bottom: 60,
    left: 40
  };

// },
// width = +svg.attr("width") - margin.left - margin.right,
// height = +svg.attr("height") - margin.top - margin.bottom;

let bounds = svg.node().getBoundingClientRect();
let width = bounds.width - margin.right - margin.left;
let height = bounds.height - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
  y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



svg.append("text").attr("id", "charttitle")
  .attr("x", 355)
  .attr("y", 25)
  .style("text-anchor", "middle")
  .text("Number of emplaned passengers each month for various airlines 2005 - 2019 at SFO");

d3.csv("barChartData.csv")
  .then((data) => {
    return data.map((d) => {
      d.count = +d.count;

      return d;
    });
  })
  .then((data) => {
    x.domain(data.map(function(d) {
      var month = d.month;
      var splitMonth = month.split(" ");
      var monthName = splitMonth[0];
      var year = splitMonth[1].substring(2, 4);

      return (month /*Name + " " +  year + "'"*/ );
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.count;
    })]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-8")
      .attr("dy", "-7.2")
      .attr("transform", "rotate(-90)")
      .attr("font-size", "5");

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, ".1s"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d.month);
      })
      .attr("y", function(d) {
        return y(d.count);
      })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        return height - y(d.count);
      });
  })
  .catch((error) => {
    throw error;
  });
