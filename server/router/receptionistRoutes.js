import express from "express";
import {
    getReceptionistDashboard,
    registerReceptionist,
    searchReceptionist,
    updateReceptionist,
    updateReceptionistStatus,
} from "../controller/receptionistController.js";

import { protect, authorize } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/register",
    protect,
    authorize(["admin"]),
    registerReceptionist
);

router.get(
    "/search",
    protect,
    authorize(["admin"]),
    searchReceptionist
);

router.put(
    "/:receptionistId",
    protect,
    authorize(["admin"]),
    updateReceptionist
);

router.patch(
    "/:receptionistId/status",
    protect,
    authorize(["admin"]),
    updateReceptionistStatus
);

router.get(
    "/",
    protect,
    authorize(["receptionist"]),
    getReceptionistDashboard
);

export default router;