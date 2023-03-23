import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameBoard from "../components/gameComponents/GameBoard";
import fetchWithJWT from "../utils/fetchWithJWT";

const Game = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState();

    async function loadGame() {
        setLoading(true);
        const response = await fetchWithJWT("/api/match/" + id);
        setGame(await response.json());
        setLoading(false);
    }

    useEffect(() => {
        loadGame();
        const reRender = setInterval(async ()=>{
            if (game?.winnerId) clearInterval(reRender);
            const response = await fetchWithJWT("/api/match/" + id);
            setGame(await response.json());
        }, 10000)
    }, []);

    return (
        <div>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <h1>{game?.player1Id.username} vs {game?.player2Id.username}</h1>
                    {game ? <GameBoard game={game} /> : null}
                </>
            )}
        </div>
    );
};

export default Game;
