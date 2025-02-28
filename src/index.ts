import { app } from "./app";
import { SETTINGS } from "./settings";

app.listen(SETTINGS.PORT, () => {
  console.log(`Server is run on port ${SETTINGS.PORT}`);
});
