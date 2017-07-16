# Atlas-of-Learning
A graphical visualisation of a user's progress in learning, thereby creating a dynamic report card.

# Technologies used
1. flask-python
2. neo4j
3. docker
4. d3.js
5. html and CSS

# Features of the d3 rendered final graph
1. Hover fade.
2. Hover highlight.
3. Drag and drop.
4. Single-click to open an overlay in the current node's context.
5. Double-click for centre alignment of the current node.
6. Hover content box.
7. Zoom in/out and pan checkbox.
8. Checkbox to show/hide graph.
9. Ability to change the global degree of all nodes (number of levels that will get highlighted upon hover).

To check out a live example, visit http://bl.ocks.org/SidShenoy/e13385b034d903976f34083b87be8794.

# Configurations
1. Single-click and double-click are distinguished by a 500 msec time-gap between successive clicks( < 500 for double-click,> 500 for single-click).
  
2. Single-click and drag-drop are also distinguished by a similar time-gap as above. This means that if a user drags and drops a node in less than 500 msec, then it is considered a 'single-click' event.

3. To complete a single 'mouseover' and 'mouseleave' successive pair event, a time-gap of 100 msec is used. This means that a 2 successive mouse-hovers on 2 different nodes will take place with the expected behaviour only if they differ by 100 msec. If not, unexpected behaviour may take place and the user is advised to refresh the page. 

#Documentation

View the complete documentation [here](https://sidshenoy.github.io/Atlas-of-Learning/license/).
