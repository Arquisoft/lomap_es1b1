import api from "./api";
import cors from 'cors';
import bp from 'body-parser';
import { readFileSync } from "fs";
import { createServer } from "https";
import promBundle from 'express-prom-bundle';
import express, { Application, RequestHandler } from "express";

const mongoose = require('mongoose');
const app: Application = express();
const port: number = 5000;

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.json());

var privateKey = readFileSync("certificates/host.key");
var certificate = readFileSync("certificates/host.crt");
var credentials = { key: privateKey, cert: certificate };

app.use("/api", api)

createServer(credentials, app)
    .listen(port, (): void => {
        console.log("Restapi listening on " + port);
    })
    .on("error", (error: Error) => {
        console.error("Error occured: " + error.message);
    });

mongoose.connect('mongodb+srv://' + process.env.REACT_APP_MONGODB_URI + '/LoMapDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });