#Default Settings for Force Algorithm

1.  Default distance between two linked nodes is 60px.
2.  Default repulsive force is decided by the charge on the individual nodes which is -500 units.
3.  Default gravitational focus is at [width,height] of the viewport.
4.  Default dragging of the nodes is smooth as friction is zero.

All of these can be changed by visiting lines 69-76 of the 'custom.js' file.

```javascript
var force = d3.layout.force()
				.nodes(dataset.nodes)
				.links(dataset.links)
				.linkDistance(60)
				//.friction(0.5)
				.charge(-500)
				.size([width, height])
				.start();
```
