# README

## Stars
Design Questions:
1. Before running the real, all the commands would be added to it. I already have commands in a HashMap of string to command, so all that would have to be done is execute the command whose key is the first token from user input.

2. One issue is that the kd tree supports a finite number of points that are preloaded into the tree. If using it on points on the earth's surface, one would likely want to be able to pick any location, rather than only be able to select from a predetermined set of points. Since points on the earth's surface are indiscrete, the kd tree would not be able to account for every single point on the surface that someone might want to query. 
Another problem could arise from the ratio between axes. For points on the surface, differences between vertical axes would often be very small in comparison to the horizontal axes if the same unit of measurement is used, possibly to the point where precision is lost.

3. I could make the KDTree class extend Collections. Then, any methods that have a default in Collections but don't work right for a KDTree would have to be overridden in the KDTree class. 

GUI usage: invoke the gui with ./run --gui. 
The gui has options for a neighbors search, radius search, and stars command. For neighbors and radius search, the first input box should receive an integer, and the second box should receive either the coordinates separated by space, or the name of the star either, in quotes or not.

Bugs:
The only known bug is that the repl and parser are not equipped to handle star names with more than one space. 
Also, it would be better design for the repl to pass each command the raw user input and have each Command to conduct its own input parsing according to its needs, rather than how I implemented it, where the real parses the user input.