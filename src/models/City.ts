import { model, Schema } from "mongoose";

const citySchema = new Schema({
  cityName: String,
});

export default model("City", citySchema);
