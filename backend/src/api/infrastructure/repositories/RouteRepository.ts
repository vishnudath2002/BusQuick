import { IRouteRepository } from "../../../core/interfaces/IRouteRepository";
import { Route } from "../../../core/entities/Route";
import Routes from "../db/models/Route"; // Import the Mongoose model for Route

export class RouteRepository implements IRouteRepository {
  async save(route: Route): Promise<void> {
    const routeToSave = new Routes({
      Source: route.source,
      Destination: route.destination,
      Stops: route.stops,
      Distance: route.distance,
      CreatedAt: route.createdAt,
      EstimatedTime: route.estimatedTime,
      UpdatedAt: route.updatedAt,
    });
    await routeToSave.save();
  }

  async findById(routeId: string): Promise<Route | null> {
    const routeDoc = await Routes.findById(routeId).exec();
    if (!routeDoc) return null;

    return new Route(
      routeDoc._id.toString(),
      routeDoc.Source,
      routeDoc.Destination,
      routeDoc.Stops,
      routeDoc.Distance,
      routeDoc.CreatedAt,
      routeDoc.EstimatedTime,
      routeDoc.UpdatedAt
    );
  }

  async findBySourceAndDestination(source: string, destination: string): Promise<Route | null> {
    const routeDoc = await Routes.findOne({ Source: source, Destination: destination }).exec();
    if (!routeDoc) return null;

    return new Route(
      routeDoc._id.toString(),
      routeDoc.Source,
      routeDoc.Destination,
      routeDoc.Stops,
      routeDoc.Distance,
      routeDoc.CreatedAt,
      routeDoc.EstimatedTime,
      routeDoc.UpdatedAt
    );
  }


  // async update(route: Route): Promise<void> {
  //   await Routes.findByIdAndUpdate(route.id, {
  //     Source: route.source,
  //     Destination: route.destination,
  //     Stops: route.stops,
  //     Distance: route.distance,
  //     EstimatedTime: route.estimatedTime,
  //     UpdatedAt: new Date(),
  //   }).exec();
  // }

  // async delete(routeId: string): Promise<void> {
  //   await Routes.findByIdAndDelete(routeId).exec();
  // }
}
