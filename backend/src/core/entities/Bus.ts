export class Bus {
    constructor(
      public id: string,
      public ownerId: string,
      public name: string,
      public status: string | null,
      public type: string,
      public seatsAvailable: string | null,
      // public amenities: string[] | null,
      public createdAt: Date,
      public updatedAt: Date | null,
      public seatsTotal: number | null
    ) {}
  

  }
  