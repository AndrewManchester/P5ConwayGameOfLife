var gameOn = false;
var myButton
var myClearButton
var myCounter
var counter = 0
var mySize = 20
const START = "start"
const STOP = "stop"
const CLEAR = "clear"
const STOPSTART = "stopStart"

let currentState = START
function setup () {
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  canvas.mousePressed(clickOnCells)
  grid = new Grid(mySize);
 
  myButton = select("#start")
  //mouseClicked requires a function name
  //but you can create an anonymous function 
  myButton.mouseClicked(() => stateMachine(STOPSTART))

  myClearButton = select("#clear")
  myClearButton.mouseClicked(() => stateMachine(CLEAR))
  //console.log(myClearButton)
  myCounter = select(".counter")

  frameRate(0.8)
}

function stopStartLogic(){
    switch (currentState) {
     case START: {
       gameOn = true
       //myCounter.html(0)
       //myClearButton.hide()
       myClearButton.elt.classList.add('hide')
       myButton.html("Stop")
       currentState = STOP
       break
     }
     case STOP: {
       gameOn = false
       myButton.html("Start")
       myClearButton.elt.classList.remove('hide')
       //myClearButton.show() //wraps on show
       currentState = START
       break
     }
     deafualt: {
        print("Should have never got here")
      }
     
   }
}


function clearLogic(){
    switch (currentState) {
     case START: {
       grid = new Grid(mySize);
       counter = 0
       myCounter.html(counter)
       break
     }
     case STOP: {
       //ignore clear while waiting to stop
       //button has now been hidden
       break
     }
     deafualt: {
        print("Should have never got here")
      }
     
   }
}


function stateMachine(theButton) {
  switch (theButton) {
    
   case STOPSTART: {
     stopStartLogic() 
     break
     }
   case CLEAR: {
     clearLogic() 
     break
   }
    default: {
      print("Should have never got here!!")  
   }
 }
}  


function draw () {
  background(250);

  if (gameOn) {
     let newCells = grid.life(grid.cells)
     grid.cells = newCells
     myCounter.html(++counter)
     //gameOn = false //so it runs once
  }
  //Outside the if because we have to draw on mouse clicks
  grid.draw();
}

function clickOnCells() {
  
  //While game running stop mouse clicks
  if (currentState === STOP) return
  
  let row = floor(mouseY/mySize)
  let column = floor(mouseX/mySize)
   grid.cells[row][column].isAlive = 
  !grid.cells[row][column].isAlive
  
  grid.cells[row][column].draw()
  // grid.updatePopulation();
}
 


class Grid {
  constructor (cellSize) {
    this.cellSize = cellSize;
    this.cols = floor(width / this.cellSize);
    this.rows = floor(height / this.cellSize);

    this.cells = 
      Array(this.rows).fill().map((temp,indexRows) =>       
           Array(this.cols).fill().map( (anotherTemp,indexCols) => {
     return new Cell(indexRows,indexCols,cellSize)}))
                                                                                                           
      
   //print(this.cells);
  }

  draw () {
    this.cells.forEach( (aRow, row) => 
          aRow.forEach( (aCol, col) =>
        this.cells[row][col].draw()))
      
    }

  
    sumValueOfSurroundingCells(theCellRow, theCellCol, dataGrid)  {
     
        const rows = dataGrid.length
        const cols = dataGrid[0].length
        const offset = [[-1,-1],[-1,0],[-1,1],      //row above cell
                        [ 0,-1],[ 0,1],             //same row as cell. Removed [0,0]
                        [ 1,-1],[ 1,0],[ 1,1] ]     //row below cell
 
        return offset.reduce((accum, valueFromOffset) => {
            //alert(valueFromOffset)
            const [row, col] = valueFromOffset
            const newRow = row+theCellRow
            const newCol = col+theCellCol
            //Need to check that we are not accessing values outside our grid
            if (newRow < 0 || newCol < 0 || newRow >= rows || newCol >= cols) {
               //console.log(`    Edge cell`)
               //console.log(accum)
               return accum 
            } else {
               //console.log(`   ${accum + (dataGrid[row+theCellRow][col+theCellCol].isAlive ? 1 : 0)}`)
               //console.log(accum + (dataGrid[row+theCellRow][col+theCellCol].isAlive ? 1 : 0))
               return accum + (dataGrid[row+theCellRow][col+theCellCol].isAlive ? 1 : 0)
            }
          },0)
          
}
 
  
  processCellsInRow(aRow, rowNum, theGrid) {  
  return aRow.map((aCell, colNum) => 
	{
          const livingCellsAround = this.sumValueOfSurroundingCells(rowNum, colNum, theGrid)
          //console.log(`living cells ${livingCellsAround}`)
          if (!aCell.isAlive) {
             //Cell is dead. If it has three living cells around it then
             //bring it back to life
             return  new Cell(rowNum,colNum, this.cellSize,
             
             (livingCellsAround === 3) ? true : false)
          }
          else {
            //Cell is alive. It dies if living cells around it is
            //less than 2 or more than 3
             return new Cell(rowNum,colNum, this.cellSize, (livingCellsAround < 2 || livingCellsAround > 3) ? false : true)
          }
       })    //map end
    }
       
  
  
  

  

 life(gridFull) {		
    //Iterate old grid gridFull values to build newGrid
    //console.log(gridFull)
    let newGrid = gridFull.map((aRow, rowNum, theGrid) => this.processCellsInRow(aRow, rowNum, theGrid))
    //console.log(newGrid)
    return newGrid
  }

  
}

class Cell {
  constructor (row, column, size, isAlive = false) {
    this.column = column;
    this.row = row;
    this.size = size;
    this.isAlive = isAlive;
  }
  
  draw () {
    if (this.isAlive) {
      fill(color(200, 0, 200));
    } else {
      fill(color('silver'));
    }
    noStroke();
    rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
  }

}
