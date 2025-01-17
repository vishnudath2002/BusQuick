import { IBusRepository } from "../../../core/interfaces/IBusRepository";
import { Bus } from "../../../core/entities/Bus";
import Buses from "../db/models/Buses";

export class BusRepository implements IBusRepository {
 

 

  async findById(busId: string): Promise<Bus | null> {
    const busDoc = await Buses.findById(busId).exec();
    if (!busDoc) return null;
    
    return new Bus(
      busDoc._id.toString(),
      busDoc.OwnerId.toString(),

      busDoc.Name,
      busDoc.Status !== null ? busDoc.Status : "Inactive",

      busDoc.Type,
      busDoc.SeatsAvailable !== null ? busDoc.SeatsAvailable.toString() : "0",
      // busDoc.Amenities,
      busDoc.CreatedAt,
      busDoc.UpdatedAt,
      busDoc.SeatsTotal !== null ? busDoc.SeatsTotal : 0 
    );
  }


   async addBus(bus: Bus): Promise<void> {
    const busDoc = new Buses(bus);
    await busDoc.save();
   }

  // async findByLocation(source: string, destination: string): Promise<Bus[]> {
  //   // Logic for filtering buses based on source and destination.
  //   return this.buses.filter(
  //     bus => bus.timing && bus.timing.arrival === source && bus.timing.departure === destination
  //   );
  // }

  // async findByRoute(routeId: string): Promise<Bus[]> {
  //   // Logic for finding buses by routeId.
  //   return this.buses.filter(bus => bus.routeId === routeId); // Assuming buses have a `routeId` property.
  // }

  // async findByTiming(departure: string, arrival: string): Promise<Bus[]> {
  //   // Logic for filtering buses based on timing.
  //   return this.buses.filter(
  //     bus => bus.timing?.departure === departure && bus.timing?.arrival === arrival
  //   );
  // }

  // async update(bus: Bus): Promise<void> {
  //   const index = this.buses.findIndex(b => b.id === bus.id);
  //   if (index !== -1) {
  //     this.buses[index] = bus;
  //   }
  // }

  // async delete(busId: string): Promise<void> {
  //   this.buses = this.buses.filter(bus => bus.id !== busId);
  // }

 
}
