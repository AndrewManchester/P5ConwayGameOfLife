#Conway's Game of Life

A P5 version.
You can select cells, stop, start and clear the board.

Surprised by the speed. Change the frameRate to
speed the updates

~~~javascript
  frameRate(0.8)
~~~

Cells are square of size

~~~javascript
  var mySize = 20
~~~

board 
~~~javascript
  var canvas = createCanvas(400, 400);
~~~

400/20 is the number of cells

This code 
~~~javascript
   this.cells = 
      Array(this.rows).fill().map((temp,indexRows) =>       
           Array(this.cols).fill().map( (anotherTemp,indexCols) => {
     return new Cell(indexRows,indexCols,cellSize)}))
~~~  

creates an array [ [row 0], [row 1],.... [row 19]]
where say [row 0] are the cells in row 0
[ cell 0, cell 1, cell2 ... cell19]

variable cells is accessed using [row][col] 
