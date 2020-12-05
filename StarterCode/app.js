// @TODO: YOUR CODE HERE!
var svgWidth = 600;
var svgHeight = 600;

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
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data.csv").then(function(data, err){
    if (err) throw err;

    data.forEach(function(data){
        data.state = +data.state
        data.age = +data.age;
        data.smokes = +data.smokes;
    });
    console.log(data)

    // smokes = x, y = age
    var Xscale = d3.scaleLinear()
        .domain([0, d3.max(age)])
        .range([0, width]);
    

    var Yscale = d3.scaleLinear()
        .domain([0, d3.max(smokes)])
        .range([0,height]);
    
    
    var bottomAxis = d3.axisBottom(Xscale);
    var leftAxis = d3.axisLeft(Yscale);

    chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    circles = svg
        .selectAll("circle")
        .data(data, function(d){return d["Smokes"];});
    
    //chartGroup.append("g")
        //.selectAll("dot")
        //.data(data)
    circles
        .enter()
        .append("circle")
        .attr("cx", function (d) {return bottomAxis(d.age);})
        .attr("cy", function (d) {return leftAxis(d.smokes);} )
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
    //function renderCircles(circlesGroup, Xscale){
    //circlesGroup.transition()
    //.duration(1000)
    //.attr("cx", d => d[chosenXAxis])
});