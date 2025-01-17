import { Route } from "../entities/Route";

export interface IRouteRepository {
  save(route: Route): Promise<void>;
//   findById(routeId: string): Promise<Route | null>;
  findBySourceAndDestination(source: string, destination: string): Promise<Route | null>;
//   update(route: Route): Promise<void>;
//   delete(routeId: string): Promise<void>;
}
