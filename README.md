## Conway's Game of Life

A P5 version.
You can select cells, stop, start and clear the board.

Surprised by the speed. Change the frameRate to larger value
to speed up the updates. There is a trade off of grid 
size and frameRate before you run into 'requestAnimationFrame' 
handler violations.

~~~javascript
  frameRate(0.8)
~~~

Cells are square of size

~~~javascript
  var mySize = 20
~~~

board 
~~~javascript
 var canvas = createCanvas(20*mySize, 20*mySize);
~~~

This code 
~~~javascript
    this.cells = 
      Array(this.rows).fill().map((temp,indexRows) =>       
      Array(this.cols).fill().map( (anotherTemp,indexCols) => false ))
~~~  

creates an array [ [row 0], [row 1],.... [row 19]]

where say [row 0] are the cells in row 0

[ cell 0, cell 1, cell2 ... cell19]

variable cells is accessed using [row][col] 

A cell only needs to know if its dead or alive so 
are represented by true or false.
