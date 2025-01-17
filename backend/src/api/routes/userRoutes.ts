import express from "express";
import { BusController } from "../controllers/BusController";
import { BrowseBus } from "../../core/usecases/BrowseBus";

import { RouteRepository } from "../infrastructure/repositories/RouteRepository";
import { ScheduleRepository } from "../infrastructure/repositories/ScheduleRepository";
import { BusRepository } from "../infrastructure/repositories/BusRepository";

const router = express.Router();

const routeRepository = new RouteRepository();
const scheduleRepository = new ScheduleRepository();
const busRepository = new BusRepository();

const busController = new BusController(new BrowseBus(routeRepository,scheduleRepository,busRepository));
// router.get("/profile", showProfile);

// router.post("/checkstatus", checkUserStatus);

router.post("/buses/location", busController.getByLocation.bind(busController));

export default router;
