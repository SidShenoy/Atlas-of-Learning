var neo4j = require('neo4j');

//Connecting to the neo4j DB
//Using the 'full options' notation and not the 'short-hand' notation
var db = new neo4j.GraphDatabase({
    url: 'http://172.25.0.2:7474',
    auth: {username: 'neo4j', password: 'HBCSE'},
});

//Cypher query is sent
db.cypher({
    query: 'MATCH (node:ASSET {_id: {id}}) RETURN node',
    params: {
        id: '576c57ffa6127d1ccfa9d75b',
    },
}, callback);

//Getting the results of the query
function callback(err, results) {
    if (err) throw err;
    var result = results[0];
    if (!result) {
        console.log('No node found.');
    } else {
        var node = result['name'];
        console.log(node);
    }
};

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
