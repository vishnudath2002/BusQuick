import { IScheduleRepository } from "../../../core/interfaces/IScheduleRepository";
import { Schedule } from "../../../core/entities/Schedule";
import Schedules from "../db/models/Schedules";
import {ObjectId} from 'mongodb'

export class ScheduleRepository implements IScheduleRepository {
  async save(schedule: Schedule): Promise<void> {
    const scheduleToSave = new Schedules({
      Price: schedule.price,
      Operator_Id: schedule.operatorId,
      Bus_Id: schedule.busId,
      Route_Id: schedule.routeId,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      isActive: schedule.isActive,
    });
    await scheduleToSave.save();
  }

  async findById(scheduleId: string): Promise<Schedule | null> {
    const scheduleDoc = await Schedules.findById(scheduleId).exec();
    if (!scheduleDoc) return null;
    return this.mapToEntity(scheduleDoc);
  }

  async findByRouteId(routeId: string): Promise<Schedule[]> {
    // Log the query we're about to make
  

    const routeObjectId = new ObjectId(routeId);


    const scheduleDocs = await Schedules.find({
      Route_Id: routeObjectId
    }).exec();
   

    return scheduleDocs.map((doc) => this.mapToEntity(doc));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToEntity(scheduleDoc: any): Schedule {

    
    return new Schedule(
      scheduleDoc._id.toString(),
      scheduleDoc.Price,
      scheduleDoc.Operator_Id?.toString() || "",
      scheduleDoc.Bus_Id.toString(),
      scheduleDoc.Route_Id.toString(),
      scheduleDoc.startTime,
      scheduleDoc.endTime,
      scheduleDoc.isActive
    );
  }
}
