import { Bus } from "../entities/Bus";

export interface IBusRepository {

  findById(busId: string): Promise<Bus | null>;
  addBus(bus: Bus): Promise<void>;
  // findByLocation(source: string, destination: string): Promise<Bus[]>;
  // findByTiming(departure: string, arrival: string): Promise<Bus[]>;
  // update(bus: Bus): Promise<void>;
  // delete(busId: string): Promise<void>;
}
