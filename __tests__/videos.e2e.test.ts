import { req } from "./test-helpers";
import { SETTINGS } from "../src/settings";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { db, Video } from "../src/db/db";

let newVideo: Video = db.videos[0];

describe(SETTINGS.PATH.VIDEOS, () => {
  beforeAll(async () => {
    await req.delete("/testing/all-data").expect(204);
  });

  afterAll(async () => {});

  it("GET videos = []", async () => {
    await req.get("/videos").expect([]);
  });

  it("- POST does not create the video with incorrect data (no title, no author)", async function () {
    await req
      .post("/videos")
      .send({ title: "", author: "" })
      .expect(400, {
        errorsMessages: [
          { message: "Title is required", field: "title" },
          { message: "Author is required", field: "author" },
          {
            message: "At least one resolution is required",
            field: "availableResolutions",
          },
        ],
      });

    const res = await req.get("/videos/");
    expect(res.body).toEqual([]);
  });

  it("+ POST new product with correct data", async () => {
    const res = await req
      .post("/videos")
      .send({
        title: "string",
        author: "string",
        availableResolutions: ["P144"],
      })
      .expect(201);
    newVideo = res.body;
    expect(res.body).toEqual({
      id: expect.any(Number),
      title: "string",
      author: "string",
      canBeDownloaded: expect.any(Boolean),
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
      availableResolutions: ["P144"],
    });
  });

  it("- GET product by ID with incorrect id", async () => {
    await req.get("/videos/helloWorld").expect(404);
  });
  it("+ GET product by ID with correct id", async () => {
    await req.get(`/videos/${newVideo.id}`).expect(200, newVideo);
  });

  it("- PUT product by ID with incorrect data", async () => {
    await req
      .put("/videos/1223")
      .send({ title: "title", author: "title" })
      .expect(400);

    const res = await req.get("/videos/");
    expect(res.body[0]).toEqual(newVideo);
  });

  it("+ PUT product by ID with correct data", async () => {
    await req
      .put(`/videos/${newVideo!.id}`)
      .send({
        title: "hello title",
        author: "hello author",
        canBeDownloaded: true,
        availableResolutions: ["P144"],
      })
      .expect(204);

    const res = await req.get("/videos");
    expect(res.body[0]).toEqual({
      ...newVideo,
      title: "hello title",
      author: "hello author",
      publicationDate: expect.any(String),
      availableResolutions: ["P144"],
      canBeDownloaded: true,
    });
    newVideo = res.body[0];
  });

  it("- DELETE product by incorrect ID", async () => {
    await req.delete("/videos/876328").expect(404);

    const res = await req.get("/videos");
    expect(res.body[0]).toEqual(newVideo);
  });
  it("+ DELETE product by correct ID", async () => {
    await req.delete(`/videos/${newVideo!.id}`);

    const res = await req.get("/videos");
    expect(res.body.length).toBe(0);
  });
});
