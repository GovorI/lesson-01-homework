import { Router, Request, Response } from "express";
import { db, getNextId, Video } from "../db/db";
import { errorType } from "../validation/types";
import { errorResponse } from "../validation/errorResponse";
import {
  ageRestrictionValidator,
  authorFieldValidator,
  availableResolutionsFieldValidator,
  titleFieldValidator,
} from "../validation/fieldValidation";

export const videosRouter = Router();

const videosController = {
  getVideos: (req: Request, res: Response) => {
    const videos = db.videos;
    res.status(200).json(videos);
  },
  getVideoById: (req: Request, res: Response) => {
    const videos = db.videos;
    const video = videos.find((v) => v.id === +req.params.id);
    if (!video) {
      res.status(404).send("Video not found");
    }
    res.status(200).json(video);
  },
  createVideo: (req: Request, res: Response) => {
    const errorsArray: Array<errorType> = [];
    const { title, author, availableResolutions } = req.body;

    titleFieldValidator(title, errorsArray);
    authorFieldValidator(author, errorsArray);
    availableResolutionsFieldValidator(availableResolutions, errorsArray);

    if (errorsArray.length > 0) {
      console.log(errorResponse(errorsArray));
      res.status(400).json(errorResponse(errorsArray));
      return;
    }

    const createdAt = new Date().toISOString();
    const video: Video = {
      id: getNextId(),
      title,
      author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt,
      publicationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      availableResolutions,
    };

    db.videos.push(video);
    res.status(201).json(video);
  },
  updateVideo: (req: Request, res: Response) => {
    const errorsArray: Array<errorType> = [];
    const id = req.params.id;
    const {
      title,
      author,
      availableResolutions,
      canBeDownloaded,
      minAgeRestriction,
    } = req.body;

    titleFieldValidator(title, errorsArray);
    authorFieldValidator(author, errorsArray);
    availableResolutionsFieldValidator(availableResolutions, errorsArray);
    ageRestrictionValidator(minAgeRestriction, errorsArray);

    if (errorsArray.length > 0) {
      res.status(400).json(errorResponse(errorsArray));
      return;
    }

    const video = db.videos.find((v) => v.id === +id);
    if (!video) {
      res.status(404).send("Video not found");
      return;
    }

    video.title = title;
    video.author = author;
    video.availableResolutions = availableResolutions;

    if (typeof canBeDownloaded === "boolean") {
      video.canBeDownloaded = canBeDownloaded;
    }
    if (minAgeRestriction !== undefined) {
      video.minAgeRestriction = minAgeRestriction;
    }
    res.status(204).end();
  },
  deleteVideo: (req: Request, res: Response) => {
    const id = req.params.id;
    const initialLength = db.videos.length;
    db.videos = db.videos.filter((v) => v.id !== +id);
    if (initialLength === db.videos.length) {
      res.status(404).send("Not Found");
    }
    res.status(204).end();
  },
};

videosRouter.get("/", videosController.getVideos);
videosRouter.get("/:id", videosController.getVideoById);
videosRouter.post("/", videosController.createVideo);
videosRouter.put("/:id", videosController.updateVideo);
videosRouter.delete("/:id", videosController.deleteVideo);
