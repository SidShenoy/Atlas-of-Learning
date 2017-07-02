//the following javascript adds a single node when user clicks on the only <p> tag, this <p> is also created by the javascript.

            d3.select('body')
              .append('p')
              .text('Click me to see nodes!')
              .on('click',function(){
                d3.select('svg > circle')
                  .style("display","initial");

                d3.select('svg > text')
                  .style("display","initial");

                d3.select('body')
                  .append('p')
                  .text("click on the node to see the resource");
              });

            var w = 200;
            var h = 200;

            //creating the svg canvas
            var svg = d3.select('body')
                        .append('svg')
                        .attr('width',w)
                        .attr('height',h);

            //creating the nodes i.e. 'circle' svgs

            var circle = svg.append("circle")
                          .attr("r","30")
                          .attr("cx","150")
                          .attr("cy","150")
                          .attr("fill","red")
                          .attr("stroke","orange")
                          .attr("stroke-width","10")
                          .style("display","none")
                          .on("click",function () {
                            window.location.href = "https://www.google.co.in";
                          });

            var text = svg.append("text")
                          .attr("x","150")
                          .attr("y","150")
                          .attr("text-anchor","middle")
                          .style("display","none")
                          .text('Google');

