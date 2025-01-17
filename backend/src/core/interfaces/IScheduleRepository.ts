import { Schedule } from "../entities/Schedule";

export interface IScheduleRepository {
  save(schedule: Schedule): Promise<void>;
  findById(scheduleId: string): Promise<Schedule | null>;
  // findByBusId(busId: string): Promise<Schedule[]>;
  findByRouteId(routeId: string): Promise<Schedule[]>;
  // update(schedule: Schedule): Promise<void>;
  // delete(scheduleId: string): Promise<void>;
}
