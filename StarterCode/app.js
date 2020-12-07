// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 800;

var margin = {
    top: 80,
    right: 60,
    bottom: 100,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var age = [];
var smokes = [];


//create wrapper
var chart = d3
    .select('#scatter')
    .append('div')
    .classed('chart', true);

//append an svg element to the chart 
var svg = chart.append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data.csv").then(function(data, err){
    if (err) throw err;

    data.forEach(function(data){
        data.age = +data.age;
        data.smokes = +data.smokes;
    });
    console.log(data)

    // smokes = x, y = age
    var Xscale = d3.scaleLinear()
        .domain(d3.extent(data, (d) => d.age))
        .range([0, width]);
    

    var Yscale = d3.scaleLinear()
        .domain(d3.extent(data, (d) => d.smokes))
        .range([height, 0]);
    
    
    var bottomAxis = d3.axisBottom(Xscale);
    var leftAxis = d3.axisLeft(Yscale);
    //append y axis
    chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);
    // append x axis
    chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    //append dots
    var circlesGroup = chartGroup.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => Xscale(d.age))
        .attr("cy", d => Yscale(d.smokes))
        .attr("r", 20)
        .attr("class", "stateCircle")
        .style("fill", "#69b3a2")
    //append labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokers");
    chartGroup.append("text")
        .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 1) + ")")
        .style("text-anchor", "middle")
        .text("Age");
    //append Abbr
    chartGroup.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d) => Xscale(d.age)-0.5)
        .attr("y", (d) => Yscale(d.smokes)+5)
        .attr("class", "stateText")
        .html(function (d){
            return `${d.abbr}`
        });
  //add data to abbr
    var toolTip = d3
        .tip()
        .attr("class", "d3-tip")
        .html(function (d) {
        return `${d.state}<br>Age: ${d.age}<br> Smokers: ${d.smokes}`;
     });
    chartGroup.call(toolTip);
    circlesGroup
        .on("click", function (data) {
            toolTip.show(data, this);
        })
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });
}).catch(function(error) {
    console.log(error);
});