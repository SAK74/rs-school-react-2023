import express from "express";
const app = express();
import path from "path";
import { renderHandler } from "./render";

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, ".")));
app.use(express.static(path.resolve(__dirname, "../public")));

app.use("/", renderHandler);

app.listen(PORT, () => {
  console.log(`Serwer strting in port ${PORT}`);
});
