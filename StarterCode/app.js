// @TODO: YOUR CODE HERE!
var svgWidth = 600;
var svgHeight = 600;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var age = [];
var smokes = [];


//create wrapper
var svg = d3.select("scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartgroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// smokes = x, y = age
var Xscale = d3.scaleLinear()
    .domain([0, d3.max(age)])
    .range([0, width]);

var Yscale = d3.scaleLinear()
    .domain([0, d3.max(smokes)])
    .rang([0,height]);

function renderCircles(circlesGroup, Xscale){
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => )
}





d3.csv("data.csv").then(function(data, err){
    if (err) throw err;

    data.forEach(function(data){
        data.state = +data.state
        data.age = +data.age;
        data.smokes = +data.smokes;
    });
    console.log(data)
})