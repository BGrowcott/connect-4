import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../utils/AuthService";
import fetchWithJWT from "../utils/fetchWithJWT";

const MyGames = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [startNewGame, setStartNewGame] = useState(false);
    const [myMatches, setMyMatches] = useState();
    const me = AuthService.getProfile().data;

    async function getMyMatches() {
        const response = await fetchWithJWT("/api/match");
        const matches = await response.json();
        setMyMatches(matches);
    }

    useEffect(() => {
        getMyMatches();
    }, []);

    async function getUsers() {
        const response = await fetchWithJWT("/api/user");
        const data = await response.json();
        const userApartFromMe = data.filter((user) => user._id !== me._id);
        setUserData(userApartFromMe);
    }

    async function newGameSetup() {
        await getUsers();
        setStartNewGame(true);
    }

    async function createNewGame(event) {
        event.preventDefault();
        const opponent = event.target.dataset.opponentid;
        const response = await fetchWithJWT("/api/match", {
            method: "POST",
            body: JSON.stringify({
                player1Id: me._id,
                player2Id: opponent,
                currentTurn: me._id,
            }),
        });
        const newGame = await response.json();
        navigate(`/mygames/${newGame._id}`);
    }

    return (
        <div>
            <h1>Hello World</h1>
            <div>
                <div>
                    <h2>Current Games</h2>
                    <div className="row g-2">
                        {myMatches?.map(match => {
                            return (
                                <div key={match._id} className="col-12 col-sm-6 col-md-4">
                                    <div className="bg-light p-2">
                                    <Link to={`/mygames/${match._id}`}>
                                        <h3><span className="text-uppercase">{match.player1Id.username}</span> vs <span className="text-uppercase">{match.player2Id.username}</span></h3>
                                    </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <button onClick={newGameSetup}>New Game</button>
                    {startNewGame ? (
                        <div>
                            <h2>Pick your opponent</h2>
                            <form>
                                {/* TODO make this search work */}
                                <input
                                    className="form-control"
                                    placeholder="Search by username..."
                                ></input>
                                {userData.map((user) => {
                                    return (
                                        <div
                                            className=" rounded bg-light p-2 m-2 d-flex justify-content-between align-items-center"
                                            key={user._id}
                                        >
                                            <span>{user.username}</span>
                                            <button
                                                data-opponentid={user._id}
                                                className="btn btn-success"
                                                onClick={createNewGame}
                                            >
                                                Play
                                            </button>
                                        </div>
                                    );
                                })}
                            </form>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default MyGames;
