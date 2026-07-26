import express from "express";
import {
    generateInvoice,
    viewInvoice,
    searchInvoice,
    updatePaymentStatus,
} from "../controller/invoiceController.js";

import { protect, authorize } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Generate Invoice
router.post(
    "/",
    protect,
    authorize(["receptionist"]),
    generateInvoice
);

// Search Invoice
router.get(
    "/search",
    protect,
    authorize(["receptionist"]),
    searchInvoice
);

// View Single Invoice
router.get(
    "/:invoiceNumber",
    protect,
    authorize(["receptionist"]),
    viewInvoice
);

// Update Payment Status
router.patch(
    "/:invoiceNumber/payment-status",
    protect,
    authorize(["receptionist"]),
    updatePaymentStatus
);

export default router;