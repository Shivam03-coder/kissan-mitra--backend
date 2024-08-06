import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./config/passportjwtconfig.js";
import { passport } from "./config/passportjwtconfig.js";
import { appconfig } from "./config/appconfig.js";
import { Authroutes } from "./routes/userRoute.js";
import locationRoutes from './routes/locationRoute.js'
const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(
  cors({
    origin: appconfig.APP_BASE_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);


app.use('/api/location', locationRoutes);
app.use("/api/v1/chat-app", Authroutes);

export { app };
