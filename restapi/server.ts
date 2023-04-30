import api from "./api";
import bp from "body-parser";
import { readFileSync } from "fs";
import { createServer } from "https";
import promBundle from "express-prom-bundle";
import express, { Application, RequestHandler } from "express";

const app: Application = express();
const port: number = 5000;
const mongoose = require('mongoose');

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

let host = process.env.host || "localhost";

var privateKey = readFileSync("certificates/host.key");
var certificate = readFileSync("certificates/host.crt");
var credentials = { key: privateKey, cert: certificate };

app.all("*", function (req, res, next) {
    if (req.secure) {
        return next();
    }
    console.log("redirecting to https");
    res.redirect("https://" + req.hostname + req.url);
});

app.use(bp.json());

app.use("/api", api);
mongoose.connect('mongodb+srv://' + "admin:yFcIRUz3i1lpjEAk@lomap.fx7ams0.mongodb.net" + '/LoMapDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

createServer(credentials, app)
    .listen(port, (): void => {
        console.log("Restapi listening on " + port);
    })
    .on("error", (error: Error) => {
        console.error("Error occured: " + error.message);
    });