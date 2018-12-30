
$(document).ready(function() {
    var playingGrid = [0, 0, 0,
		       0, 0, 0,
		       0, 0, 0];

    /*
      0 0 0  a b c 
      0 0 0  d e f
      0 0 0  g h i

     */
    var playingGridDom = $(".tictactoe");
    var xsTurn = false;
    
    $(".box").click(function() {
	if(xsTurn) {
	    playingGrid[$(this).index()] = 1 || 0;
	}
	else {
	    playingGrid[$(this).index()] = 2 || 0;
	}
	xsTurn = !xsTurn;
	if(isGridFull(playingGrid)) {
	    console.log("End Game");
	    gridReset();
	}
	//console.log("Is Grid Full Yet: " + isGridFull(playingGrid));	
    });

    function applyPlayingGridToDom(grid, domGrid) {
	$.each(grid, function(index, value){
	    if(value === 1) { // this is for Xs Turn
		$.append(domGrid[index], value);
	    } else if (value === 2) { // this is for 0s turn
		domGrid[index] = value;
	    }
	    console.log(domGrid);
	});
    }
    
    function isGridFull(grid) {
	for(var i = 0; i < grid.length; ++i) {
	    if(grid[i] === 0) { return false; }
	}
	return true;
    }
    
});
