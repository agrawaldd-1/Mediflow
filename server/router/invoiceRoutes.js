import express from "express";
import {
    generateInvoice,
    searchInvoice,
    updatePaymentStatus,
    viewInvoice,
} from "../controller/invoiceController.js";

import { protect, authorize } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorize(["receptionist"]),
    generateInvoice
);

router.get(
    "/search",
    protect,
    authorize(["receptionist"]),
    searchInvoice
);

router.get(
    "/:invoiceNumber",
    protect,
    authorize(["receptionist"]),
    viewInvoice
);

router.patch(
    "/:invoiceNumber/payment-status",
    protect,
    authorize(["receptionist"]),
    updatePaymentStatus
);

export default router;