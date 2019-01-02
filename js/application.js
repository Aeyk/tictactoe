function indexOfEvery(array, value) {
	var indexes = [], i;
	for(i = 0; i < array.length; ++i) {
		if(array[i] == value) {
		  indexes.push(i);
		}
	}
	return indexes || -1;
}

;(function(){
  'use strict';
	var grid = function () {
    var _grid = [0, 0, 0,
			           0, 0, 0,
			           0, 0, 0];
    var init = function() {};
  
    var _winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
		                [0, 3, 6], [1, 4, 7], [2, 5, 8],
		                [0, 4, 8], [2, 4, 6]];
    
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

    var isGridFull = function() {
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
      init: init,
      nextTurn: nextTurn,
      currentTurn: currentTurn,
      isItemEmpty: isItemEmpty,
      putMove: putMove,
      isWinner: isWinner,
      isGridFull: isGridFull,
      isGameOver: isGameOver
    }
  }();

	function compareArrays(a1, a2) {
	  return $(a1).not(a2).length === 0 &&
		  $(a2).not(a1).length === 0;
	}
	var winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
		             [0, 3, 6], [1, 4, 7], [2, 5, 8],
		             [0, 4, 8], [2, 4, 6]];
  var xsTurn = true;
  var winnersResults = [];
	var winningLog = "";
	var gameOver = false;

  $(document).ready(function() {
    var expGrid = grid;
    var playingGrid = [0, 0, 0,
			                 0, 0, 0,
			                 0, 0, 0];	  
	  $(".box").click(function() {
      if(expGrid.isWinner()) {
        $("h1").text(expGrid.isWinner() + " is the winner!");
        return 0; 
      }
      if(expGrid.isGridFull()) {
        $("h1").text("Cats Game!");
        return 0;
      }
      var xy = $(this).index();
      
      if(expGrid.isItemEmpty(xy)) { 
        expGrid.putMove(xy);
      }
      
      $(this).text(expGrid.currentTurn());

      console.log(expGrid.state());
	  });

	  $(".reload").click(function() {
	    location.reload();
	  });
  });
}());
