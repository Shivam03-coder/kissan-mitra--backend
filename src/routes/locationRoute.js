import { Router } from "express";
import {
  storeLocation,
  getWeatherData,
} from "../controllers/locationController.js";

const locationRoutes = Router();

locationRoutes.route("/store-location").post(storeLocation);

locationRoutes.route("/weather/:locationId").get(getWeatherData);

export default locationRoutes;
