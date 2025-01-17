export class Route {
    constructor(
      public id: string,
      public source: string,
      public destination: string,
      public stops: string[],
      public distance: number,
      public createdAt: Date,
      public estimatedTime: string,
      public updatedAt: Date | null
    ) {}
  
    // addStop(stop: string) {
    //   this.stops.push(stop);
    //   this.updatedAt = new Date();
    // }
  
    // removeStop(stop: string) {
    //   this.stops = this.stops.filter(s => s !== stop);
    //   this.updatedAt = new Date();
    // }
  
    // updateDistance(newDistance: number) {
    //   this.distance = newDistance;
    //   this.updatedAt = new Date();
    // }
  }
  