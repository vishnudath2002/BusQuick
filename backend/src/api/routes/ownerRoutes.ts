import express from "express";
import { BusController } from "../controllers/BusController";
import { AddBus } from "../../core/usecases/OwnerUseCases/AddBus";
import { BusRepository } from "../infrastructure/repositories/BusRepository";
//import { BrowseBus } from "../../core/usecases/BrowseBus";

const router = express.Router();

const busController = new BusController(
  new AddBus(new BusRepository())
);

router.post("/addBus", busController.createBus.bind(busController));

export default router;      