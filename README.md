# Atlas-of-Learning
A graphical visualisation of a user's progress in learning, thereby creating a dynamic report card.

# Technologies used
1. django-python
2. neo4j
3. mongoDB
4. d3.js
5. html and CSS

# Features of the d3 rendered final graph
1. Hover fade.
2. Hover highlight.
3. Drag and drop.
4. Single-click for page redirection to the current node's URL.
5. Double-click for centre alignment of the current node.
6. Hover content box.

# Configurations
1. Single-click and double-click are distinguished by a 500 msec time-gap between successive clicks.
  -> < 500 for double-click
  -> > 500 for single-click
  
2. Single-click and drag-drop are also distinguished by a similar time-gap as above. This means that if a user 

3. To complete a single 'mouseover' and 'mouseleave' successive pair event, a time-gap of 100 msec is used. This means that a 2 successive mouse-hovers on 2 different nodes will take place with the expected behaviour only if they differ by 100 msec. If not, unexpected behaviour may take place and the user is advised to refresh the page. 

4. 
