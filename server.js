const express = require('express');
const server = express();

server.use(express.json());

module.exports = server;

let gamesDb = [];
let id = 1;

server.get('/games', (req, res) => {
    res
        .status(200)
        .json(gamesDb);
});

server.post('/games', (req, res) => {
    if (req.body && req.body.title && req.body.genre) {
        let newGame = {
            id: id,
            title: req.body.title,
            genre: req.body.genre
        }

        if ( req.body.releaseYear) {
            newGame.releaseYear = req.body.releaseYear;

            gamesDb.push(newGame);
            id++;

            res 
                .status(201)
                .json(gamesDb[id-2].id);
        }
    }
    else {
        res
            .status(422)
            .json({ error: "incorrect game data" });
    }
});