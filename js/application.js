
$(document).ready(function() {
    var playingGrid = [0, 0, 0,
		       0, 0, 0,
		       0, 0, 0];
	var winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
		       [0, 3, 6], [1, 4, 7], [2, 5, 8],
		       [0, 4, 8], [2, 4, 6]];

    /*
      0 0 0  a b c 
      0 0 0  d e f
      0 0 0  g h i

     */
    var playingGridDom = $(".tictactoe");
    var xsTurn = true;
    function compareArrays(a1, a2) {
	return $(a1).not(a2).length === 0 &&
	    $(a2).not(a1).length === 0;
    }
    
    $(".box").click(function() {
	if(xsTurn && $(this).text().includes("_")) {
	    playingGrid[$(this).index()] = 1 || 0;
	    $(this).text("X");	    
	    var winnersResults = [];
	    winners
		.forEach(winningRow =>
			 winnersResults.push(
			     compareArrays(winningRow,
					   indexOfEvery(playingGrid, 1))));
	    console.log("X has Won: "+ winnersResults.some(r => r === true));
	    xsTurn = !xsTurn;
	}
	else if (!xsTurn && $(this).text().includes("_")){
	    playingGrid[$(this).index()] = 2 || 0;
	    $(this).text("O");
	    var winnersResults = [];
	    winners
		.forEach(winningRow =>
			 winnersResults.push(
			     compareArrays(winningRow,
					   indexOfEvery(playingGrid, 2))));
	    console.log("O has Won: "+ winnersResults.some(r => r === true));
	    xsTurn = !xsTurn;
	}
	if(isGridFull(playingGrid)) {
	    console.log("End Game\nXs: " +
			indexOfEvery(playingGrid, 1) + "\nOs: " +
			indexOfEvery(playingGrid, 2));
	}
    });
    function checkWinner() {
    }
    function indexOfEvery(array, value) {
	var indexes = [], i;
	for(i = 0; i < array.length; ++i) {
	    if(array[i] == value) {
		indexes.push(i);
	    }
	}
	return indexes || -1;
    }
    
    function checkWinner(grid) {
    }
    
    function isGridFull(grid) {
	for(var i = 0; i < grid.length; ++i) {
	    if(grid[i] === 0) { return false; }
	}
	return true;
    }
    
});
