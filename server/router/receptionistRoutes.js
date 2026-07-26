import express from "express";
import {
    registerReceptionist,
    searchReceptionist,
    updateReceptionist,
    updateReceptionistStatus,
} from "../controller/receptionistController.js";

import { protect, authorize } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Register Receptionist
router.post(
    "/register",
    protect,
    authorize(["admin"]),
    registerReceptionist
);


// Search Receptionist
router.get(
    "/search",
    protect,
    authorize(["admin"]),
    searchReceptionist
);



// Update Receptionist Profile
router.put(
    "/:id",
    protect,
    authorize(["admin"]),
    updateReceptionist
);

// Activate / Deactivate Receptionist
router.patch(
    "/:id/status",
    protect,
    authorize(["admin"]),
    updateReceptionistStatus
);

export default router;