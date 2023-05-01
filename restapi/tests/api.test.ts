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
        origin: [process.env.REACT_APP_APP_URI || 'http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    const uri = process.env.MONGODB_URI;
    mongoose.connect('mongodb+srv://' + uri + '/LoMapDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

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
        const response: Response = await request(app).get("/api/locations/list");
        expect(response.statusCode).toBe(200);
    });
});