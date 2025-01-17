export class Schedule {
    constructor(
      public id: string,
      public price: string,
      public operatorId: string,
      public busId: string,
      public routeId: string,
      public startTime: Date,
      public endTime: Date,
      public isActive: boolean
    ) {}
  

  }
  