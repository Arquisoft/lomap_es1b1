import { check } from 'express-validator';
import express, { Request, Response, Router } from 'express';

const api: Router = express.Router();
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  id: String,
  date: Date,
  lat: Number,
  lng: Number,
  reviews: [],
  name: String,
  webId: String,
  address: String,
  category: String,
  isPublic: Boolean,
  description: String,
  canFriendsSee: Boolean
})

const Location = mongoose.model("locations", locationSchema);

api.get(
  "/locations/list",
  async (req: Request, res: Response): Promise<Response> => {
    const locations = await Location.find();
    return res.status(200).send(locations);
  }
);

api.post("/locations/add", [
  check('webid').isLength({ min: 1 }).trim().escape(),
],
  async (req: Request, res: Response): Promise<Response> => {
    let id = req.body.id;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let date = req.body.date;
    let name = req.body.name;
    let webId = req.body.webId;
    let address = req.body.address;
    let reviews = req.body.reviews;
    let category = req.body.category;
    let isPublic = req.body.isPublic;
    let description = req.body.description;
    let canFriendsSee = req.body.canFriendsSee;
    new Location({ id, date, lat, lng, name, webId, address, category, isPublic, reviews, description, canFriendsSee }).save();

    return res.sendStatus(200);
  })

api.post("/locations/update", [
  check('webid').isLength({ min: 1 }).trim().escape(),
],
  async (req: Request, res: Response): Promise<Response> => {
    await Location.findOneAndUpdate({ id: req.body.id }, { $set: { reviews: req.body.reviews } });
    return res.sendStatus(200);
  })

api.post("/locations/delete", [
  check('webid').isLength({ min: 1 }).trim().escape(),
],
  async (req: Request, res: Response): Promise<Response> => {
    await Location.findOneAndRemove({ id: req.body.id });
    return res.sendStatus(200);
  })

export default api;