/**
 * Created by batmah on 16.10.16.
 */
import React, {Component} from 'react';
import CalculateWinner from './CalculateWinner';
import * as style from './style.css';

//---------------------------------------
const Square = (props) => (
    <button key={props.key} className={style.square} onClick={props.onClick}> {props.value} </button>
);

Square.propTypes = {
    onClick: React.PropTypes.func.isRequired
};

//---------------------------------
class Board extends Component {

   /* renderSquare(i) {
        return <Square value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}/>;
    }*/

    render() {
        return (
            <div>
                <div className={style.status}>{status}</div>

                {[0, 3, 6].map(
                    (v1) => (<div className={style.boardRow}>
                        {[0, 1, 2].map((v2) => (<Square key={v1+v2} value={this.props.squares[v1 + v2]}
                                                        onClick={() => this.props.onClick(v1 + v2)}/>))}
                    </div>)
                )}


                {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>*/}

            </div>
        );
    }
}

Board.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    squares: React.PropTypes.array.isRequired
};

//----------------------------------------

class App extends Component {

    constructor() {
        super();

        this.state = {
            squares: Array(9).fill(null),
            NextPlayer: 1,
            scroll_y: 0
        };

        //  this.clickHandle=this.clickHandle.bind(this);
        this.scrollHandle = this.scrollHandle.bind(this);
    }


    clickHandle(i) {
        const curr_squares = this.state.squares.slice();

        if (CalculateWinner(curr_squares) || curr_squares[i]) {
            return;
        }

        curr_squares[i] = this.state.NextPlayer === 1 ? "X" : "O";

        this.setState({
            squares: curr_squares,
            NextPlayer: this.state.NextPlayer === 1 ? 0 : 1
        });
    }

    scrollHandle(e) {
//debugger;
        this.setState({
            scroll_y: e.target.body.scrollTop
        });
    }

    componentDidMount() {
        document.addEventListener("scroll", this.scrollHandle);
    }

    componentWillUnMount() {
        document.removeEventListener("scroll", this.scrollHandle);
    }

    render() {

        const curr_squares = this.state.squares.slice();
        const winner = CalculateWinner(curr_squares); // X, O или null

        let status;
        if (winner) {
            status = "Победитель: " + winner;
            return (
                <div className={style.gameInfo}>
                    <div>{status}</div>
                    <a href="#" onClick={() => this.setState({squares: Array(9).fill(null), NextPlayer: 1})}>
                        Начать игру </a>
                </div>
            );
        }
        else if (this.state.squares.indexOf(null) === -1 && winner === null) {
            status = "Ничья";
            return (
                <div className={style.gameInfo}>
                    <div>{status}</div>
                    <div>Если будет 3и ничьи подряд, каждому игроку нужно будет оплатить штраф :-)</div>
                    <a href="#" onClick={() => this.setState({squares: Array(9).fill(null), NextPlayer: 1})}>
                        Начать игру </a>
                </div>
            );
        } else {
            status = "Сейчас играет: " + (this.state.NextPlayer === 1 ? "X" : "O");
            return (
                <div className={style.game}>
                    <div className={style.scrollInfo}>{this.state.scroll_y}</div>
                    <div className={style.game}>
                        <Board
                            squares={curr_squares}
                            onClick={i => this.clickHandle(i)}
                        />
                    </div>
                    <div className={style.gameInfo}>
                        <div>{status}</div>
                    </div>
                </div>
            );
        }
    }
}


export default App;