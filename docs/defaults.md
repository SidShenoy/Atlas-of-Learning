#Default Settings

####Circular Nodes

1.  The default color of *LO* (Learning Objective) nodes is *RED*.
2.  The default color of *Resource* (currently inexistent) nodes is *GREY*.
3.  The default radius of *LO* nodes is 18px.

These are the basic features the user is likely to change, other features can be changed by visiting lines starting form line number 29-31 and 98-105 of 'custom.js' file

```javascript
function getNodeColor(node) {
  return node.level === 1 ? 'red' : 'gray' //change these 2 colors as needed
}
```

```javascript
var nodeElements = svg.append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(dataset.nodes)
  .enter().append("circle")
    .attr("r",18) //default radius can be changed here
    .attr("fill", getNodeColor) //this is the color function as given above
    .attr("data-orgcolor",getNodeColor)
```

####Links (edges)

1.  The default *line width* (stroke-width) of the links is 2px.
2.  The default *color* (stroke-width) of the links is *GREY*.

These are the basic features the user is likely to change, other features can be changed by visiting lines starting form line number 84-91 of 'custom.js' file

```javascript
var linkElements = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(dataset.links)
  .enter().append("line")
    .attr("stroke-width",2) //change the width here
    .attr("stroke","rgba(50, 50, 50, 0.2)")//change the color here
    .attr("data-orgcolor","rgba(50, 50, 50, 0.2)")//also change the color here(to same as above)
```

###Degree box

This is the box seen at the top-right side of the node.

The default settings can be changed by visiting line numbers 19-27 in the 'custom.css' file.

```css
.degreeBox{
  position: absolute;
  y: 5%;
  x: 85%;
  width: 22vh;
  height: 23vh;
  z-index: 9;
  background-color: #FFDAB9;
}
```

###Overlay

This is the overlay box that appears when the any node is single-clicked.

The default settings can be changed by visiting line numbers 8-17 in the 'custom.css' file.

```css
.overlay{
  position: absolute;
  y: 25%;
  x: 25%;
  width: 50vw;
  height: 62vh;
  z-index: 10;
  background-color: #FFDAB9;
  display: none;
}
```

The box mentioned above contains an *iframe*, the default settings for this can be changed by visiting lines 39-44 of the 'custom.css' file.

```css
.iframe {
  display: block;
  border: none;
  height: 50vh;
  width: 100%;
}
```
