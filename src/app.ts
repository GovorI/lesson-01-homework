import express from "express";
import cors from "cors";
import { SETTINGS } from "./settings";
import { videosRouter } from "./videos/videoController";
import { testRouter } from "./testing/testingController";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(SETTINGS.PATH.VIDEOS, videosRouter);
app.use(SETTINGS.PATH.TESTING, testRouter);
