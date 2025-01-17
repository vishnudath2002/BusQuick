import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IBuses extends Document {
  _id: ObjectId;
  OwnerId: ObjectId;
  Name: string;
  Status: string | null;
  Type: string;
  SeatsAvailable: string | null;
  // Amenities: string[] | null;
  CreatedAt: Date;
  UpdatedAt: Date | null;
  SeatsTotal: number | null;
}

const BusesSchema: Schema = new Schema({
  OwnerId: { type: Schema.Types.ObjectId},
  Name: { type: String, required: true },
  Status: { type: String },
  Type: { type: String, required: true },
  SeatsAvailable: { type: Number },
  // Amenities: [{ type: String }],
  CreatedAt: { type: Date, required: true },
  UpdatedAt: { type: Date },
  SeatsTotal: { type: Number },
});

const Buses = mongoose.model<IBuses>('Buses', BusesSchema);
export default Buses;
