var ExplosionChecker = React.createClass({
  getInitialState: function () {
    return ({
      board: new Minesweeper.Board(9 ,5),
      gameWon: false,
      gameOver: false
    });
  },
  updateGame: function (pos, action) {

  },
  render: function () {
    return (
      <Board updateGame={this.updateGame} board={this.state.board}/>
    );
  }
});

var Board = React.createClass({
  render: function () {
    console.log(this.props.board);
    return (
      <div className="board">
      {
        this.props.board.grid.map(function (row, rowIdx) {
          return (
            <div className="row" key={rowIdx}>
              {
              row.map(function (tile, colIdx) {
                return <Tile updateGame={this.props.updateGame}
                             tile={tile}
                             pos={[rowIdx, colIdx]}
                             key={colIdx} />;

              }, this)
            }
            </div>
          );
        }, this)
      }
      </div>
    );

  }
});

var Tile = React.createClass({
  handleClick: function (e) {
    this.props.updateGame(this.props.pos, e.altKey);
  },
  render: function () {
    var tile = this.props.tile;
    var tileClass = "tile ";
    var tileContent = "😑";
    if (tile.explored) {
      if (tile.bombed) {
        tileContent = "💣";
        tileClass += "bombed";
      } else {
        tileContent = tile.adjacentBombCount();
        tileClass += "revealed";
      }
    } else if (tile.flagged) {
      tileContent = "🚩";
      tileClass += "flagged";
    }
    return (
      <div className={tileClass} onClick={this.handleClick}>{tileContent}</div>
    );
  }
});

React.render(
  <ExplosionChecker />,
  document.getElementById('explosion-checker')
)
