// TODO: Scoreboard, Refractor, Wait before I refactor I need to write a test suite.

/* indexOfEvery takes an array and returns an array with some 0-indexed indexes of
 * said array.
 * For example:
 *       indexOfEvery [1, 2, 3, 2, 3], 3 => [2, 4]
           --------+->[0  1  2  3  4]    => indexes
 *      As    for  |
 *      0-indexed  |
 *      we   mean.
*/
// Uncomment it out to test
function indexOfEvery(array, value) {
	var indexes = [], i;
	for(i = 0; i < array.length; ++i) {
		if(array[i] == value) {
		  indexes.push(i);
		}
	}
	return indexes || -1;
}

// For some reason this works if I copy into Chrome Javascript Repl
// but it doesnt appear to be loading when the page loads. Does it have
// something to do with the global IIFE?
Array.prototype.indexOfEvery = function(value) {
	var indexes = [], i;
	for(i = 0; i < this.length; ++i) {
		if(this[i] == value) {
		  indexes.push(i);
		}
	}
	return indexes || -1;
}
// function compareArrays(a1, a2) {
// 	return $(a1).not(a2).length === 0 &&
// 		$(a2).not(a1).length === 0;
// }


// These should be a better (lazy) way? JSON objects might cause weird errors. TODO: testing
function compareArrays(a1, a2) {
    return (JSON.stringify(a1) == JSON.stringify(a2));
}
	var grid = function () {
    var _grid = [0, 0, 0,
			     0, 0, 0,
			     0, 0, 0];
    var _winners =
    [[0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]];
    var _xsTurn = false;
    var _gameOver = false;
    var state = function() {
      return {..._grid};
    };
    var nextTurn = function () {
      _xsTurn = !_xsTurn;
      return _xsTurn;
    }
    var currentTurn = function() {
      if(_xsTurn)
        return "X";
      else if(!_xsTurn)
        return "O";
    }
    var isItemEmpty = function(xy) {
      if(_grid[xy] === 0)
        return true;
      else
        return false;
    }
    var putMove = function(xy) {
      if(isItemEmpty(xy)) {
        _grid[xy] = !_xsTurn ? "X" : "O";
        nextTurn();
      }
      return _grid[xy];
    }
    var isWinner = function() {
      var xresult = [];
      _winners
        .forEach(
          row => xresult.push(compareArrays(row,
                                            indexOfEvery(_grid,
                                                         "X"))));
                                                         /* This is the same array and manipulation, it should be extracted out and named / DRY'd */
      var oresult = [];
      _winners
        .forEach(
          row => oresult.push(compareArrays(row,
                                            indexOfEvery(_grid,
                                                         "O"))));
      if(xresult.some(r => r === true))
        return "X";
      if(oresult.some(r => r === true))
        return "O";
      else
        return false;
    }
    var isGridFull = function() {   // Do none of the items in _grid === 0, and 0 is the magic number for unplaced TODO: make constant for magic number
      return !(_grid.some(g => g === 0));
    }
    var isGameOver = function() {
      var winningState = isWinner();
      if(_gameOver)
        return true;
      if(isGridFull())
        return true;
      if(isWinner())
        return winningState;

    }
    return {
      state: state,
      nextTurn: nextTurn,
      currentTurn: currentTurn,
      isItemEmpty: isItemEmpty,
      putMove: putMove,
      isWinner: isWinner,
      isGridFull: isGridFull,
      isGameOver: isGameOver
    }
  }();
  $(document).ready(function() {
    var expGrid = grid;
    var playingGrid = [0, 0, 0,
                       0, 0, 0,
			           0, 0, 0];
	  $(".box").click(function() {
      if(expGrid.isWinner()) {
        $("h1").text(expGrid.isWinner() + " is the winner!");
        scoreboard.pushWinner(expGrid.isWinner());
        return 0;
      }
      if(expGrid.isGridFull()) {
        $("h1").text("Cats Game!");
        return 0;
      }
      var xy = $(this).index();
      if(expGrid.isItemEmpty(xy)) {
        expGrid.putMove(xy);
        $(this).text(expGrid.currentTurn());
      }
	  });
	  $(".reload").click(function() {
	    location.reload();
	  });
  });
