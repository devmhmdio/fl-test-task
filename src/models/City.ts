import { model, Schema } from "mongoose";

const citySchema = new Schema({
    cityname: String
});

export default model("City", citySchema);