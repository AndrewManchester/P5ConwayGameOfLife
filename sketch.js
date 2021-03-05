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
  var canvas = createCanvas(20*mySize, 20*mySize);
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
   grid.cells[row][column] = !grid.cells[row][column]
  
   grid.drawCell(row,column,grid.cells[row][column]) 
}
 


class Grid {
  constructor (cellSize) {
    this.cellSize = cellSize;
    this.cols = floor(width / this.cellSize);
    this.rows = floor(height / this.cellSize);

    this.cells = 
      Array(this.rows).fill().map((temp,indexRows) =>       
      Array(this.cols).fill().map( (anotherTemp,indexCols) => false ))
                                                                                                           
      
   //print(this.cells);
  }

  draw () {
    this.cells.forEach( (aRow, row) => 
          aRow.forEach( (aCol, col) =>
        this.drawCell(row,col,aCol)))
      
    }
    
   drawCell(row,column,aCol) {
    if (aCol) {
      fill(color(200, 0, 200));
    } else {
      fill(color('silver'));
    }
    noStroke();
    rect(column * this.cellSize + 1, row * this.cellSize + 1, 
                       this.cellSize - 1, this.cellSize - 1);
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
            if (newRow < 0 || newCol < 0 || 
                newRow >= rows || newCol >= cols) {
               return accum 
            } else {
               return accum +
                   (dataGrid[row+theCellRow][col+theCellCol] ? 1 : 0)
            }
          },0)
          
}
 
  
  processCellsInRow(aRow, rowNum, theGrid) {  
  return aRow.map((aCell, colNum) => 
	{
          const livingCellsAround = 
               this.sumValueOfSurroundingCells(rowNum, colNum, theGrid)
          //console.log(`living cells ${livingCellsAround}`)
          if (!aCell) {
             //Cell is dead. If it has three living cells around it then
             //bring it back to life
             return  (livingCellsAround === 3) ? true : false
          }
          else {
            //Cell is alive. It dies if living cells around it is
            //less than 2 or more than 3
             return (livingCellsAround < 2 || livingCellsAround > 3) ? false : true
          }
       })    //map end
    }
       

 life(gridFull) {		
    //Iterate old grid gridFull values to build newGrid
    //console.log(gridFull)
    let newGrid = gridFull.map((aRow, rowNum, theGrid) => 
                this.processCellsInRow(aRow, rowNum, theGrid))
    //console.log(newGrid)
    return newGrid
  }

  
}


