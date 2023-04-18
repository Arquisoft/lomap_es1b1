import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';

const api:Router = express.Router()

const mongoose = require("mongoose");

const ubicacionSchema = new mongoose.Schema({
  date: Date,
  lat: Number,
  lng: Number,
  name: String,
  webId: String,
  address: String,
  category: String,
  isPublic: Boolean,
  ratings: [Number],
  comments: [String],
  descripcion: String
})

const Ubicacion = mongoose.model("ubicaciones", ubicacionSchema);

interface User {
    id: string;
    name: string;
    email: string;
    friends: Array<string>;
}

api.get(
  "/ubicaciones/list",
  async (req: Request, res: Response): Promise<Response> => { 
    const ubicaciones = await Ubicacion.find()
    return res.status(200).send(ubicaciones);
  }
);

api.post("/ubicaciones/add", [
  check('webid').isLength({ min: 1 }).trim().escape(),
],
async (req: Request, res: Response): Promise<Response> => {
  let date = req.body.date;
  let lat = req.body.lat;
  let lng = req.body.lng;
  let name = req.body.name;
  let webId = req.body.webId;
  let address = req.body.address;
  let category = req.body.category;
  let ratings = req.body.ratings;
  let comments = req.body.comments;
  let descripcion = req.body.descripcion;
  new Ubicacion({date, lat, lng, name, webId, address, category, ratings, comments, descripcion}).save();
  return res.sendStatus(200);
})

export default api;