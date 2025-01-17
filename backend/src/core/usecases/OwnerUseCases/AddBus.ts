import { IBusRepository } from "../../interfaces/IBusRepository";
import { Bus } from "../../entities/Bus";

export class AddBus {
  constructor(private busRepository: IBusRepository) {}

  async execute(bus: Bus) {
    const result = await this.busRepository.addBus(bus);
    if(result === null){
        return {success: false, message: "Bus not added"}
    }
    return {success: true, message: "Bus added"}
  }

}
