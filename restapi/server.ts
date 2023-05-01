import api from "./api";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import express, { Application, RequestHandler } from "express";
import { readFileSync } from "fs";
import { createServer } from "https";

const mongoose = require('mongoose');
const app: Application = express();
const port: number = 5000;

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.json());
app.use("/api", api);

var privateKey = readFileSync("certificates/host.key");
var certificate = readFileSync("certificates/host.crt");
var credentials = { key: privateKey, cert: certificate };

createServer(credentials, app)
  .listen(port, (): void => {
    console.log("Restapi listening on " + port);
  })
  .on("error", (error: Error) => {
    console.error("Error occured: " + error.message);
  });

mongoose.connect('mongodb+srv://' + process.env.REACT_APP_MONGODB_URI + '/LoMapDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); 