const request = require('supertest');

const server = require('./server.js');

describe("GET route for '/games'", () => {
    it('returns status 200', async () => {
        const response = await request(server).get('/games');
        expect(response.status).toBe(200);
    });

    it('return empty array if no games', async () => {
        const response = await request(server).get('/games');
        expect(response.body).toEqual([]);
    });

    it('returns array of all stored games', async () => {
        const response = await request(server).get('/games');
        expect(response.body.length).toBe(0);
    });
});

describe("POST route for '/games'", () => {
    it('returns status 422 if incomplete data is entered', async () => {
        const response = await request(server).post('/games').send({ invalid: 'data'});
        expect(response.status).toBe(422);
    });

    it('returns error message if invalid data is entered', async () => {
        const response = await request(server).post('/games').send({ invalid: 'data'});
        expect(response.body.error).toBe("incorrect game data");
    });
    
    it('returns status 201 if data successfully added', async () => {
        const response = await request(server).post('/games').send({ 
            title: "Super Mario Bros 3",
            genre: "Platforming",
            releaseYear: "1990"
        });
        expect(response.status).toBe(201);
    });
});
