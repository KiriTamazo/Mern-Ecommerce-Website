import mongoose from "mongoose";
const { Schema } = mongoose;

const gigSchema = new Schema(
  {
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", gigSchema);
