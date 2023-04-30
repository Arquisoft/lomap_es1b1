import request, { Response } from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';

let app: Application;
let server: http.Server;

const mongoose = require("mongoose");

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: [process.env.REACT_APP_APP_URI || 'https://localhost:443']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    mongoose.connect('mongodb+srv://' + "admin:yFcIRUz3i1lpjEAk@lomap.fx7ams0.mongodb.net" + '/LoMapDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

    server = app.listen(port, (): void => {
        console.log('Restapi server for testing listening on ' + port);
    }).on("error", (error: Error) => {
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close() //close the server
    mongoose.connection.close()
})

describe('product ', () => {
    /**
     * Test that we can list products without any error.
     */
    it('can be listed', async () => {
        const response: Response = await request(app).get("/api/ubicaciones/list");
        expect(response.statusCode).toBe(200);
    });

    it('can be added', async () => {
        const response: Response = await request(app).post("/api/ubicaciones/add").send({
            id: "1",
            date: new Date(),
            lat: 0,
            lng: 0,
            name: "Test marker 1",
            webId: "https://example.com/user1#me",
            address: "123 Main St",
            category: "Test",
            isPublic: false,
            reviews: [],
            description: "This is a test marker",
            canFriendsSee: false,
        });
        expect(response.statusCode).toBe(200);
    });

    it('can be updated', async () => {
        const response: Response = await request(app).post("/api/ubicaciones/update").send({
            id: "1",
            date: new Date(),
            lat: 0,
            lng: 0,
            name: "Test marker 1",
            webId: "https://example.com/user1#me",
            address: "123 Main St",
            category: "Test",
            isPublic: false,
            reviews: [],
            description: "This is a test marker",
            canFriendsSee: false,
        });
        expect(response.statusCode).toBe(200);
    });

});