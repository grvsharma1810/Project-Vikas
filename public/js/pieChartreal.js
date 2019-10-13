/*
*    main.js
*    Mastering Data Visualization with D3.js
*    10.4 - Converting our code to OOP
*/

// data = [
//     {
//         "category" : "A",
//         "count" : "70"
//     },
//     {
//         "category" : "B",
//         "count" : "30"
//     }
// ]

PieChart = function(_parentElement){
    this.parentElement = _parentElement;    
    this.initVis();
};

PieChart.prototype.initVis = function(){
    var vis = this;

    //vis.margin = { left:10, right:10, top:10, bottom:10 };
    vis.height = 250 // - vis.margin.top - vis.margin.bottom;
    vis.width = 300 // - vis.margin.left - vis.margin.right;
    vis.radius = Math.min(vis.width,vis.height)/2;

    vis.svg = d3.select(vis.parentElement)
        .append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height)
        .append("g")
        .attr("transform, translate("+vis.width/2+","+vis.height/2+")");

    // vis.g = vis.svg.append("g");        

    //vis.t = function() { return d3.transition().duration(1000); }

    //vis.bisectDate = d3.bisector(function(d) { return d.date; }).left;

    // vis.linePath = vis.g.append("path")
    //     .attr("class", "line")
    //     .attr("fill", "none")
    //     .attr("stroke", "grey")
    //     .attr("stroke-width", "3px");

    // vis.g.append("text")
    //     .attr("x", vis.width/2)
    //     .attr("y", 0)
    //     .attr("text-anchor", "middle")
    //     .text(vis.coin)

    vis.color = d3.scaleOrdinal()
        .range(["#FF2D00,#F0FF00"])
    
    vis.arc = d3.arc()
        .innerRadius(0)
        .outerRadius(vis.radius-10)

    vis.wrangleData1();
};


PieChart.prototype.wrangleData1 = function(){
    var vis = this;

    //d3.json("/public/data/debt.json").then(data=>{
        var data1 = vis.type(data);
        vis.data = data1;
      //  console.log("Got Pie Chart Data")
        vis.updateVis1();
    //}).catch(console.log("Didn't get Pie Chart data"))
};


PieChart.prototype.updateVis1 = function(){    
    var vis = this;
    data = vis.data;
    vis.pie = d3.pie()
        .value(data => data.count )
        .sort(null);
    var svg = vis.svg;
    console.log("SVG is "+vis.svg);
    vis.g = svg.selectAll(".arc")
            .data(pie(vis.data))
            .enter().append("g")
            .attr("class","arc");

    vis.g.append("path")
        .attr("d",vis.arc)
        .style("fill",d => color(vis.data.category));

};

PieChart.prototype.type = function(data){
    data.count = +data.count;
    return data;
}