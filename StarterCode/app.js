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
        .range([0,height]);
    
    
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
    
    //circles = svg
        //.selectAll("circle")
        //.data(data, function(d){return d["Smokes"];});
    
    //chartGroup.append("g")
        //.selectAll("dot")
        //.data(data)
    chartGroup.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => Xscale(d[age]))
        //.attr("cx", function (d) {return bottomAxis(d.age);})
        .attr("cy", d => Yscale(d.smokes))
        //.attr("cy", function (d) {return leftAxis(d.smokes);} )
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
    //function renderCircles(circlesGroup, Xscale){
    //circlesGroup.transition()
    //.duration(1000)
    //.attr("cx", d => d[chosenXAxis])
}).catch(function(error) {
    console.log(error);
});