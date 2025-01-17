import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface ISchedules extends Document {
  _id: ObjectId;
  Price: string;
  Operator_Id: ObjectId;
  Bus_Id: ObjectId;
  Route_Id: ObjectId;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
}

const SchedulesSchema: Schema = new Schema({
  Price: { type: String, required: true },
  Operator_Id: { type: Schema.Types.ObjectId},
  Bus_Id: { type: Schema.Types.ObjectId, required: true },
  Route_Id: { type: Schema.Types.ObjectId, required: true },
  startTime: { type: Date },
  endTime: { type: Date },
  isActive: { type: Boolean, default: true },
});

const Schedules = mongoose.model<ISchedules>('Schedules', SchedulesSchema);
export default Schedules;
