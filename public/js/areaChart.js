margin1 = { left:50, right:20, top:50, bottom:20 };
    var width1 = 300 - margin1.left - margin1.right;
    var height1 = 250 - margin1.top - margin1.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d/%m/%Y");

// set the ranges
var x1 = d3.scaleTime().range([0, width1]);
var y1 = d3.scaleLinear().range([height1, 0]);

// define the area
var area = d3.area()
    .x(function(d) { return x1(d.date); })
    .y0(height1)
    .y1(function(d) { return y1(d.close); });

// define the line
var valueline = d3.line()
    .x(function(d) { return x1(d.date); })
    .y(function(d) { return y1(d.close); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg1 = d3.selectAll("#chart-area7").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin1.left + "," + margin1.top + ")");

// get the data
d3.csv("/public/data/area.csv").then(data=>{

  data = data.map(d=>{
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
    })
    //console.log(data);
  // scale the range of the data
  x1.domain(d3.extent(data, function(d) { return d.date; }));
  y1.domain([0, d3.max(data, function(d) { return d.close; })]);

  // add the area
    svg1.append("path")
       .data([data])
       .attr("class", "area")
       .attr("d", area)
       .attr("fill","lightsteelblue");

  // add the valueline path.
  svg1.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // add the X Axis
  svg1.append("g")
      .attr("transform", "translate(0," + height1 + ")")
      .call(d3.axisBottom(x1));

  // add the Y Axis
  svg1.append("g")
      .call(d3.axisLeft(y1));

}).catch(error => console.log(error));