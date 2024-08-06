import mongoose from "mongoose";
import LocationModel from "../models/locationModel.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.WEATHER_API_KEY;

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const storeLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const newLocation = new LocationModel({
      latitude,
      longitude,
    });

    const savedLocation = await newLocation.save();

    res.status(201).json({
      status: "success",
      message: "Location stored successfully",
      data: {
        latitude: savedLocation.latitude,
        longitude: savedLocation.longitude,
        id: savedLocation._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to store location: ${error.message}`,
    });
  }
};

const getWeatherData = async (req, res) => {
  try {
    const { locationId } = req.params;

    // Validate locationId format
    if (!isValidObjectId(locationId)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid location ID format",
      });
    }

    const location = await LocationModel.findById(locationId);
    if (!location) {
      return res.status(404).json({
        status: "failed",
        message: "Location not found",
      });
    }

    // Fetch weather data from OpenWeatherMap
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`
    );

    res.status(200).json({
      status: "success",
      data: weatherResponse.data,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to fetch weather data: ${error.message}`,
    });
  }
};

export { storeLocation, getWeatherData };
