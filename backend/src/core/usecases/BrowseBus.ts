import { IRouteRepository } from "../interfaces/IRouteRepository";
import { IScheduleRepository } from "../interfaces/IScheduleRepository";
import { IBusRepository } from "../interfaces/IBusRepository";

export class BrowseBus {
  constructor(
    private routeRepository: IRouteRepository,
    private scheduleRepository: IScheduleRepository,
    private busRepository: IBusRepository
  ) {}

  async execute(source: string, destination: string) {
    // Find route by source and destination
    const route = await this.routeRepository.findBySourceAndDestination(source, destination);

    if (!route) {
      return { success: false, message: "No routes available" };
    }

    // Find schedules by route ID
    const schedules = await this.scheduleRepository.findByRouteId(route.id);

    if (!schedules || schedules.length === 0) {
      return { success: false, message: "No schedules available" };
    }

    // Fetch bus details for each schedule using the IBusRepository
    const enrichedSchedules = await Promise.all(
      schedules.map(async (schedule) => {
        const bus = await this.busRepository.findById(schedule.busId);
  
        if (bus) {
          return {
            scheduleId: schedule.id,
            price: schedule.price,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isActive: schedule.isActive,
            bus: {
              name: bus.name,
              type: bus.type,
              seatsAvailable: bus.seatsAvailable,
            },
          };
        }
        return null; 
      })
    );

   
    const filteredSchedules = enrichedSchedules.filter((entry) => entry !== null);

    if (filteredSchedules.length === 0) {
      return { success: false, message: "No bus details available for schedules" };
    }

    return {
      success: true,
      message: "Schedules fetched successfully",
      schedules: filteredSchedules,
    };
  }
}
