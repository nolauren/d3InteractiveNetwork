
var w = 1600,
    h = 1600,
    fill = d3.scale.category20();
var vis = d3.select("#chart")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var file = "output.json"
console.log(file);
d3.json(file, function(json) {
  var force = d3.layout.force()
      .charge(-425)
      .chargeDistance(600)
      .gravity(.15)
      .chargeDistance(600)
      .friction(.8)
      .linkStrength(1)
      .linkDistance(100)
      .nodes(json.nodes)
      .links(json.links)
      .size([w, h])
      //.chargeDistance(110)
      .start();

  var link = vis.selectAll("line.link")
      .data(json.links)
      .enter().append("svg:line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.round(Math.sqrt(d.value/2)); })
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  var node = vis.selectAll("g.node")
      .data(json.nodes)
      .enter().append("svg:g")
      .attr("class", "node")
      .on("click", click)
      .on("dblclick", dblclick)
      .call(force.drag);

      node.append("svg:circle")
      .attr("r", function(d) {return Math.sqrt(1.5*d.nodeSize)+2}) //2})
      .style("fill", function(d) { return fill(d.group); })
      //.call(force.drag)
      .on("mouseover", fade(.15))
      .on("mouseout", fade(1));



      var linkedByIndex = {};
    json.links.forEach(function(d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    var slider = vis.select("svg")
	.append("#citation_menu");

    function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }


     function fade(opacity) {

		return function(d) {

			d3.select("#metatdata").text("");
			d3.select("#metadata").html("<p id=\"metadata\"> "+d.meta) + "</p>";

			    node.style("stroke-opacity", function(o) {
				thisOpacity = isConnected(d, o) ? 1 : opacity;
				this.setAttribute('fill-opacity', thisOpacity);
				return thisOpacity;
			    });

			    link.style("stroke-opacity", function(o) {
				return o.source === d || o.target === d ? 1 : opacity;
			    });
			};
		    }

    function dblclick(d) {
      d3.select(this).classed("fixed", d.fixed = false);
      d3.select(this).select("circle").classed("fixed_circle", false);
      force.resume();
    }

    function click(d) {
      d3.select(this).classed("fixed", d.fixed = true);
            d3.select(this).select("circle").classed("fixed_circle", true);

      force.resume();

    };

  node.append("svg:text")
    .attr("class", "nodetext")
    .attr("dx", 10)
	.attr("dy", "-.15em")
	.text(function(d) { return d.name; })


  node.append("svg:title")
    .text(function(d) { return "Citations: "+d.nodeSize; });

  vis.style("opacity", 1e-6)
    .transition()
      .duration(1000)
      .style("opacity", 1);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });





});




