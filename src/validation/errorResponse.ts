import { errorType } from "./types";

export const errorResponse = (errorsArray: Array<errorType>) => {
  let errs = {
    errorsMessages: [] as Array<errorType>,
  };

  errorsArray.forEach((err) => {
    errs.errorsMessages.push(err);
  });
  return errs;
};
