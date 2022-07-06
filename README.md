# chain_reaction_webapp
![chainREACweb](https://user-images.githubusercontent.com/68727041/150777811-3d56fd40-e631-4009-92ec-3d4e339111ac.png)

<br>

### Purpose

Chain reaction is a deterministic combinatorial game of perfect information for 2 - 8 players.<br/>
It was originally developed by Buddy-Matt Entertainment for Android.<br/>
The most interesting thing is how unpredictable the game seems to be in the end, at least when you play it with your human friends. The obvious heuristic that tells us you're better off at the moment by having as many orbs as possible turns out to be very wrong. While it so seems to everyone, that say, red will win, blue suddenly takes over.<br/>
- The gameplay takes place in a m×n board. The one used here is of  dimension 9×6.<br/>
- For each cell in the board, we define a critical mass. The critical mass is equal to the number of orthogonally adjacent cells. That would be 4 for usual cells, 3 for   cells in the edge and 2 for cells in the corner.<br/>
- All cells are initially empty. The Red and the Green player take turns to place "orbs" of their corresponding colors. The Red player can only place an (red) orb in an   empty cell or a cell which already contains one or more red orbs. When two or more orbs are placed in the same cell, they stack up.<br/>
- When a cell is loaded with a number of orbs equal to its critical mass, the stack immediately explodes. As a result of the explosion, to each of the orthogonally         adjacent cells, an orb is added and the initial cell looses as many orbs as its critical mass. The explosions might result in overloading of an adjacent cell and the     chain reaction of explosion continues until every cell is stable.<br/>
- When a red cell explodes and there are green cells around, the green cells are converted to red and the other rules of explosions still follow. The same rule is         applicable for other colors.<br/>
- The winner is the one who eliminates every other player's orbs.<br/>

This is a Web App emulation of the android game chain reaction, frontend will look best on a laptop or tablet screen, but it can be viewed on a phone browser too(landscape mode-horizontally aligned).<br/>
Developed with HTML/CSS/Vanilla JS<br>
Have fun!

### How to use

<a href="https://nikhil-rgb.github.io/apps/chain-reaction/index.html">Try the web app from here!</a>
<br>
<br/>
If you liked this game, considering downloading the desktop version, as it has a much better UI and plenty of features that the web version does not.<br/>
<br/>
<a href="https://github.com/nikhil-RGB/chain_reaction_desktop/releases/tag/1.0.0">Check the Desktop version out here!</a>
