import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";

function GameBoard({ game }) {
    const board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];

    const [boardState, setBoardState] = useState(game.boardState || board);
    const [currentTurnPlayer, setCurrentTurnPlayer] = useState(
        game.currentTurn
    );
    const [playerTurn, setPlayerTurn] = useState();
    const [gameWinner, setGameWinner] = useState(game.winnerId || undefined);

    useEffect(() => {
        setBoardState([...game.boardState]);
        setCurrentTurnPlayer(game.currentTurn);
    }, [game]);

    useEffect(() => {
        if (currentTurnPlayer === game.player1Id._id) {
            setPlayerTurn(1);
        } else {
            setPlayerTurn(2);
        }
    }, [game]);

    useEffect(() => {
        if (playerTurn === 1) {
            setCurrentTurnPlayer(game.player1Id._id);
        } else {
            setCurrentTurnPlayer(game.player2Id._id);
        }
    }, [playerTurn]);

    async function placePiece(event) {
        if (
            AuthService.getProfile().data._id !== currentTurnPlayer ||
            gameWinner
        ) {
            return;
        }
        const selectedColumn = Number(event.target.dataset.column);
        let finalPosition;
        for (let i = boardState.length - 1; i >= 0; i--) {
            if (boardState[i][selectedColumn] === 0) {
                boardState[i][selectedColumn] = playerTurn;
                finalPosition = [i, selectedColumn];
                break;
            }
        }

        if (!finalPosition) return;

        setBoardState([...boardState]);

        if (checkVictory(playerTurn, finalPosition)) {
            setGameWinner(currentTurnPlayer);
            await fetchWithJWT("/api/match/winner", {
                method: "PUT",
                body: JSON.stringify({
                    winnerId: currentTurnPlayer,
                    gameId: game._id,
                }),
            });
        }

        const currentTurn =
            game.player1Id._id === currentTurnPlayer
                ? game.player2Id._id
                : game.player1Id._id;

        setPlayerTurn(playerTurn === 1 ? 2 : 1);

        fetchWithJWT("/api/match", {
            method: "PUT",
            body: JSON.stringify({
                id: game._id,
                boardState: [...boardState],
                currentTurn,
            }),
        });
    }

    function checkVictory(player, position) {
        // checkow row
        let inARow = 0;
        for (let i = 0; i < 7; i++) {
            if (boardState[position[0]][i] === player) {
                inARow++;
                if (inARow === 4) {
                    return true;
                }
            } else inARow = 0;
        }

        // check Column
        let inAColumn = 0;
        for (let i = 0; i < 6; i++) {
            if (boardState[i][position[1]] === player) {
                inAColumn++;
                if (inAColumn === 4) {
                    return true;
                }
            } else inAColumn = 0;
        }

        //check diagnal
        const diagnalRight = [];
        fillDiagnalArrayRight(position, diagnalRight, "up");
        diagnalRight.shift();
        fillDiagnalArrayRight(position, diagnalRight, "down");

        let diagnalRowRight = 0;
        for (let i = 0; i < diagnalRight.length; i++) {
            if (diagnalRight[i] === player) {
                diagnalRowRight++;
                if (diagnalRowRight === 4) {
                    return true;
                }
            } else diagnalRowRight = 0;
        }

        const diagnalLeft = [];
        fillDiagnalArrayLeft(position, diagnalLeft, "up");
        diagnalLeft.shift();
        fillDiagnalArrayLeft(position, diagnalLeft, "down");

        let diagnalRowLeft = 0;
        for (let i = 0; i < diagnalLeft.length; i++) {
            if (diagnalLeft[i] === player) {
                diagnalRowLeft++;
                if (diagnalRowLeft === 4) {
                    return true;
                }
            } else diagnalRowLeft = 0;
        }

        return false;
    }

    function fillDiagnalArrayRight(position, array, direction) {
        if (direction === "up") {
            if (position[0] >= 0 && position[1] <= 6) {
                array.push(boardState[position[0]][position[1]]);
                fillDiagnalArrayRight(
                    [position[0] - 1, position[1] + 1],
                    array,
                    "up"
                );
            }
        }
        if (direction === "down") {
            if (position[0] <= 5 && position[1] >= 0) {
                array.unshift(boardState[position[0]][position[1]]);
                fillDiagnalArrayRight(
                    [position[0] + 1, position[1] - 1],
                    array,
                    "down"
                );
            }
        }
    }

    function fillDiagnalArrayLeft(position, array, direction) {
        if (direction === "up") {
            if (position[0] >= 0 && position[1] >= 0) {
                array.push(boardState[position[0]][position[1]]);
                fillDiagnalArrayLeft(
                    [position[0] - 1, position[1] - 1],
                    array,
                    "up"
                );
            }
        }
        if (direction === "down") {
            if (position[0] <= 5 && position[1] <= 6) {
                array.unshift(boardState[position[0]][position[1]]);
                fillDiagnalArrayLeft(
                    [position[0] + 1, position[1] + 1],
                    array,
                    "down"
                );
            }
        }
    }

    return (
        <div>
            <div>
                {gameWinner ? (
                    <div className="winnerBox">
                        Winner{" "}
                        {gameWinner === game.player1Id._id
                            ? game.player1Id.username
                            : game.player2Id.username}
                        !
                    </div>
                ) : null}
                <p>
                    {currentTurnPlayer === game.player1Id._id
                        ? game.player1Id.username
                        : game.player2Id.username}
                    's turn
                </p>
                <div className="gameContainer p-2">
                    {boardState.map((row, rowIndex) => {
                        return row.map((gameHole, columnIndex) => {
                            return (
                                <div
                                    key={`${rowIndex}, ${columnIndex}`}
                                    className="gameSquare"
                                >
                                    <div
                                        style={{
                                            backgroundColor:
                                                boardState[rowIndex][
                                                    columnIndex
                                                ] === 0
                                                    ? "aliceblue"
                                                    : boardState[rowIndex][
                                                          columnIndex
                                                      ] === 1
                                                    ? "red"
                                                    : "blue",
                                        }}
                                        className="gameHole"
                                        data-column={columnIndex}
                                        onClick={placePiece}
                                    ></div>
                                </div>
                            );
                        });
                    })}
                </div>
            </div>
        </div>
    );
}

export default GameBoard;
