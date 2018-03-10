#CM-MAZE
##Maze generation and management system

This pre-release version of cm-maze can help you create randomly 
generated mazes with ease!  While only the most rudimentary scenarios are serviced in this pre-released version, 
the framework is designed to facilitate randomized maps with 3 (or more!) dimensions, with any cardinality of 
exit-points-per-node you wish.

```javascript

var mazeBuilder = require( 'cm-maze' );
var maze = mazeBuilder.buildMaze();

```

This project is still in very early development.  Today it (mostly) successfully generates randomized node patterns and 
can intelligently handle providing location and navigation services.  There is also a super-cheap renderer which can be
applied to any html5 canvas - this renderer will draw a picture of the maze.  You'll need to run the library through browserify
in order to make it work, however.

If you're curious to see more or contribute yourself, visit the following resource links:

[API Documentation](http://creativemutagens.com/projects/cm-maze/api/)

[Github Repo](https://github.com/timondavis/cm-maze)