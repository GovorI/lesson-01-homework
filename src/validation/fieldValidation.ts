import { errorType } from "./types";

export enum ResolutionEnum {
  "P144" = "P144",
  "P240" = "P240",
  "P360" = "P360",
  "P480" = "P480",
  "P720" = "P720",
  "P1080" = "P1080",
  "P1440" = "P1440",
  "P2160" = "P2160",
}

export const titleFieldValidator = (
  title: string | undefined,
  errorsArray: Array<errorType>
) => {
  if (!title || title.trim().length < 1) {
    errorsArray.push({ message: "Title is required", field: "title" });
  } else if (title.trim().length > 40) {
    errorsArray.push({
      message: "Title must be no more than 40 characters",
      field: "title",
    });
  }
};

export const authorFieldValidator = (
  author: string | undefined,
  errorsArray: Array<errorType>
) => {
  if (!author || author.trim().length < 1) {
    errorsArray.push({
      message: "Author is required",
      field: "author",
    });
  } else if (author.trim().length > 20) {
    errorsArray.push({
      message: "Author must be no more than 20 characters",
      field: "author",
    });
  }
};

export const availableResolutionsFieldValidator = (
  availableResolutions: Array<string> | undefined,
  errorsArray: Array<errorType>
) => {
  if (!availableResolutions || availableResolutions.length === 0) {
    errorsArray.push({
      message: "At least one resolution is required",
      field: "availableResolutions",
    });
  } else {
    const validResolutions = Object.values(ResolutionEnum);
    for (const resolution of availableResolutions) {
      if (!Object.keys(ResolutionEnum).includes(resolution)) {
        errorsArray.push({
          message: "Invalid resolution value",
          field: "availableResolutions",
        });
        return;
      }
    }
  }
};

export const ageRestrictionValidator = (
  age: number,
  errorsArray: Array<errorType>
) => {
  if (age < 1 || age > 18) {
    errorsArray.push({
      message: "Invalide age value",
      field: "minAgeRestriction",
    });
  }
  return;
};
