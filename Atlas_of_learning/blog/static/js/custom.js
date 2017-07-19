function getNodeColor(node) {
  return node.level === 1 ? 'red' : 'gray'
}
var width = window.innerWidth
var height = window.innerHeight
var time1 = 0, time2 = 0, time3 = 0, time4 = 0, toggle = true, mouseState = "leave", degree = 1;

//this is how the zoom event is caught and 'zoomed' listener is called
var zoom = d3.behavior.zoom().scaleExtent([0, 8]).on("zoom",zoomed);

let minX=0,minY=0,maxX=width,maxY=height;

//this svg contains everything that is rendered
var svg = d3.select('svg')
   .attr('width', width)
   .attr('height', height)
   .attr('viewBox','0 0 '+width+' '+height)
   .attr("preserveAspectRatio","xMidYMid meet")
   .style("position","relative")
   .append('g')
   .call(zoom)
   .append('g')
   .classed("container",true);

//zoom is disabled by default (initially)
zoom.on("zoom",null);

//the zoom event listener
function zoomed() {
 svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

 var xTrans = (-1) * d3.event.translate[0];
 var yTrans = (-1) * d3.event.translate[1];

 d3.selectAll("foreignObject").attr("transform","scale(" + 1/d3.event.scale + ")translate("+xTrans+","+yTrans+")");
}

//Force setup used to mimic forces in physics,
//mainly attractive 'spring' forces and repulsive 'electostatic forces'
//please remember that d3.v3 is needed for this and not the latest d3.v4 as this feature has changed in v4
var force = d3.layout.force()
        .nodes(dataset.nodes)
        .links(dataset.links)
        .linkDistance(60)
        //.friction(0.5)
        .charge(-500)
        .size([width, height])
        .start();

//this rect allows user to use zoom feature if the corresponding checkbox is enabled
svg.append("rect")
   .classed("forZoom",true)
   .attr("width",width)
   .attr("height",height);

var linkElements = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(dataset.links)
  .enter().append("line")
    .attr("stroke-width",2)
    .attr("stroke","rgba(50, 50, 50, 0.2)")
    .attr("data-orgcolor","rgba(50, 50, 50, 0.2)")
    .attr('x1', function (link) { return link.source.x })
    .attr('y1', function (link) { return link.source.y })
    .attr('x2', function (link) { return link.target.x })
    .attr('y2', function (link) { return link.target.y })
    .attr("pointer-events","none")

var nodeElements = svg.append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(dataset.nodes)
  .enter().append("circle")
    .attr("r",18)
    .attr("fill", getNodeColor)
    .attr("data-orgcolor",getNodeColor)
    .on("mousedown",function(){
      time3 = new Date().getTime();
    })
    .on("mouseup",function(){
      time4 = new Date().getTime();
    })
    .on("mouseover",function(){
          if(mouseState == "leave"){
            d3.selectAll("circle")
              .transition()
              .duration(100)
              .attr("opacity","0.2");
            d3.selectAll("text")
              .transition()
              .duration(100)
              .attr("opacity","0.2");
            d3.selectAll("line")
              .transition()
              .duration(100)
              .attr("opacity","0.2");
            d3.select(this)
              .transition()
              .duration(100)
              .attr("r",22)
              .attr("opacity","1")
              .attr("cursor","pointer");
            var x = d3.select(this).attr("cx");
            var y = d3.select(this).attr("cy");

            d3.select("text[x='"+x+"'][y='"+y+"']")
              .transition()
              .duration(100)
              .style("font-size",18)
              .style("font-weight","bold")
              .attr("opacity","1");

            var highlight = function(x,y,degree)
                            {
                              if(degree>=1)
                              {
                                d3.selectAll("line[x2='"+x+"'][y2='"+y+"']")
                                  .each(function(){
                                    var x1 = d3.select(this).attr("x1");
                                    var y1 = d3.select(this).attr("y1");
                                    d3.select(this)
                                      .transition()
                                      .duration(100)
                                      .attr("stroke-width",4)
                                      .attr("stroke","blue")
                                      .attr("opacity","1");
                                    d3.select("circle[cx='"+x1+"'][cy='"+y1+"']")
                                      .transition()
                                      .duration(100)
                                      .attr("r",22)
                                      .attr("fill",function(){
                                        if(d3.select(this).attr("data-orgcolor") == "red")
                                          return "red";
                                        else
                                          return "green";
                                      })
                                      .attr("opacity","1");

                                    d3.select("text[x='"+x1+"'][y='"+y1+"']")
                                      .transition()
                                      .duration(100)
                                      .style("font-size",18)
                                      .style("font-weight","bold")
                                      .attr("opacity","1");

                                    highlight(x1,y1,degree-1);
                                  });
                              }
                            };

              highlight(x,y,degree);

              window.setTimeout(function(){
                mouseState = "over";
                },100);

            }
    })
    .on("mouseleave",function(){
          if(mouseState == "over"){
            d3.selectAll("circle")
              .transition()
              .duration(100)
              .attr("opacity","1");
            d3.selectAll("text")
              .transition()
              .duration(100)
              .attr("opacity","1");
            d3.selectAll("line")
              .transition()
              .duration(100)
              .attr("opacity","1");
            d3.select(this)
              .transition()
              .duration(100)
              .attr("r",18)
              .attr("fill",function(){
                return d3.select(this).attr("data-orgcolor");
              });
            var x = d3.select(this).attr("cx");
            var y = d3.select(this).attr("cy");

            d3.select("text[x='"+x+"'][y='"+y+"']")
              .transition()
              .duration(100)
              .style("font-size",14)
              .style("font-weight","normal");

              var dehighlight = function(x,y,degree)
                              {
                                if(degree>=1)
                                {
                                   d3.selectAll("line[x2='"+x+"'][y2='"+y+"']")
                                     .each(function(){
                                        var x1 = d3.select(this).attr("x1");
                                        var y1 = d3.select(this).attr("y1");
                                        d3.select(this)
                                          .transition()
                                          .duration(100)
                                          .attr("stroke-width",2)
                                          .attr("stroke",function(){
                                            return d3.select(this).attr("data-orgcolor");
                                          });
                                        d3.select("circle[cx='"+x1+"'][cy='"+y1+"']")
                                          .transition()
                                          .duration(100)
                                          .attr("r",18)
                                          .attr("fill",function(){
                                            return d3.select(this).attr("data-orgcolor");
                                          });
                                        d3.select("text[x='"+x1+"'][y='"+y1+"']")
                                          .transition()
                                          .duration(100)
                                          .style("font-size",14)
                                          .style("font-weight","normal");

                                        dehighlight(x1,y1,degree-1);
                                      });
                                  }
                              };

              dehighlight(x,y,degree);

              window.setTimeout(function(){
                mouseState = "leave";
                },100);
            }
    })
    .on("click",function(d){
      if(toggle == true){
        time1 = new Date().getTime();
      }
      else{
        time2 = new Date().getTime();
      }

      window.setTimeout(function(){
          if((time1 - time2 > 500 || time1 - time2 < (-500)) && time4 - time3 < 500){
            d3.selectAll("g.container > :not(.overlay)")
              .classed("on", false)
              .classed("off", true);
            d3.select("label.switch")
              .style("opacity",0.2);
            d3.select("foreignObject.overlay").style("display","block");
            d3.select("foreignObject.overlay iframe").attr("src","http://localhost:5000/graphssecondsearchinput/"+d.name);
          }
      },500);

      toggle = !toggle;
    })
    .on("dblclick",function(){
          var xDisp = width/2 - parseFloat(d3.select(this).attr("cx"));
          var yDisp = height/2 - parseFloat(d3.select(this).attr("cy"));

          d3.selectAll('g.links,.nodes,.texts')
            .attr("transform","translate("+xDisp+","+yDisp+")");

          d3.selectAll("circle")
            .each(function(){
              d3.select(this)
                .transition()
                .duration(100)
                .attr("r",18)
                .attr("fill",function(){
                  return d3.select(this).attr("data-orgcolor");
                });
            })

          d3.selectAll("line")
            .each(function(){
              d3.select(this)
                .transition()
                .duration(100)
                .attr("stroke-width",2)
                .attr("stroke",function(){
                  return d3.select(this).attr("data-orgcolor");
                });
            })

          d3.selectAll("text")
            .transition()
            .duration(100)
            .style("font-size",14)
            .style("font-weight","normal");

    })
    //Note that a drawback of all events in D3 is that if another event is triggered before the current one
    //finishes then the later event occurs and the current one pauses midway.
    .html(function(d){
      return "<title>"+`
      ${d.name}

      ${d.description}
      `+"</title>";
    })
    .call(force.drag);

var textElements = svg.append("g")
  .attr("class", "texts")
  .selectAll("text")
  .data(dataset.nodes)
  .enter().append("text")
    .text(function (node) { return  node.name.substring(0, 3) })
    .style("fill", "white")
    .attr("font-size", 14)
    .attr("dx", 0)
    .attr("dy", ".35em")
    .attr("text-anchor","middle")
    .attr("pointer-events","none");

var degreeBox = svg.append("foreignObject")
                   .classed("degreeBox", true)
                   .append("xhtml:body");

var showDegree = degreeBox.append("b")
                          .classed("text",true)
                          .text("Enter degree");

degreeBox.append("br");

degreeBox.append("input")
.attr("type","number")
.attr("min",1)
.attr("step",1)
.style("width","4em");

degreeBox.append("br");

degreeBox.append("input")
.attr("type","button")
.attr("value","apply")
.on('click',function(){
  var num = $('foreignObject.degreeBox input').val();
  if(Number.isInteger(parseFloat(num)) && parseFloat(num)>0)
  {
    degree = parseInt(num);
    showDegree.text("degree now is "+degree);
  }
  else {
    showDegree.text("Invalid degree (must be a +ve Integer)");
  }
});

degreeBox.append("br")
degreeBox.append("br")

degreeBox.append("label")
         .attr("for","zoomCheckBox")
         .classed("text",true)
         .append("b")
         .text("Zoom in/out");

degreeBox.append("input")
            .attr({"type":"checkbox"})
            .attr("id","zoomCheckBox")
            .on("change",function(){
              if(!$(this).is(":checked")){
                zoom.on("zoom",null);           //disable zooming
                nodeElements.call(force.drag);  //enable dragging
                d3.select("svg rect.forZoom")   //used to change cursor icon to default
                  .on("mouseover",function(){
                       d3.select(this).attr("cursor", "default");
                     })
                  .on("mousedown",function(){
                       d3.select(this).attr("cursor", "default");
                     })
                  .on("mouseup",function(){
                       d3.select(this).attr("cursor", "default");
                     });
              }
              else {
                d3.selectAll('circle').on('mousedown.drag', null); //disable dragging
                zoom.on("zoom",zoomed);          //enable zooming
                d3.select("svg rect.forZoom")    //used to change the cursor icons when zooming is enabled
                  .on("mouseover",function(){
                       d3.select(this).attr("cursor", "zoom-in");
                     })
                  .on("mousedown",function(){
                       d3.select(this).attr("cursor", "move");
                     })
                  .on("mouseup",function(){
                       d3.select(this).attr("cursor", "zoom-in");
                     });
              }
            });

var overlay = svg.append("foreignObject")
                 .classed("overlay", true)
                 .style("border",0);

overlay.append("xhtml:head")
       .append("link")
       .attr("rel","stylesheet")
       .attr("href", "/../static/css/font-awesome-4.7.0/css/font-awesome.min.css");

var overlayBody = overlay.append("xhtml:body");

overlayBody.append("i")
           .classed("fa fa-window-close",true)
           .attr("aria-hidden","true")
           .style("float","right")
           .style("background-color","white")
           .on("mouseover", function(){
              d3.select(this).style({ "background-color": "lightgray" });
           })
           .on("mouseout", function(){
              d3.select(this).style({ "background-color": "white" });
           })
           .on("click", function(d){
              d3.select(this)
                .style({ "background-color": "gray" });
              d3.selectAll("g.container > :not(.overlay)")
                .classed("off", false)
                .classed("on", true);
                d3.select("label.switch")
                  .style("opacity",1);
              d3.select("foreignObject.overlay").style("display","none");

           });

overlayBody.append("br");
overlayBody.append("br");

overlayBody.append("iframe")
           .classed("iframe",true);

d3.select("input#graphCheckBox")
  .on("change",function(){
      $("svg").toggle();
  })

force.on("tick", function() {
  nodeElements
    .attr('cx', function (node) { return node.x })
    .attr('cy', function (node) { return node.y })
  textElements
    .attr('x', function (node) { return node.x })
    .attr('y', function (node) { return node.y })
  linkElements
    .attr('x1', function (link) { return link.source.x })
    .attr('y1', function (link) { return link.source.y })
    .attr('x2', function (link) { return link.target.x })
    .attr('y2', function (link) { return link.target.y })
});

force.on("end", function(){
  d3.selectAll("svg circle")
    .each(function(){

      var cx = parseFloat(d3.select(this).attr("cx"));
      var cy = parseFloat(d3.select(this).attr("cy"));

      if(cx > maxX){maxX = cx;}
      else if (cx < minX) {
        minX = cx;
      }

      if(cy > maxY){maxY = cy;}
      else if (cy < minY) {
        minY = cy;
      }
    });

  var xForRect = minX;
  var yForRect = minY;
  var widthForRect = maxX - minX;
  var heightForRect = maxY - minY;

  d3.select("svg rect")
    .attr("x",xForRect)
    .attr("y",yForRect)
    .attr("width",widthForRect)
    .attr("height",heightForRect);
})