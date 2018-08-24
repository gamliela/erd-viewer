import {DotGraph} from "./dot_json_types";

let erdData: DotGraph = null;
try {
  erdData = require("../../../../data/erd.dot_json.json");
} catch {
  console.log("erd data file could not be found, using a demo data instead");
  erdData = require("./demo_data.dot_json.json");
}

export default erdData;
