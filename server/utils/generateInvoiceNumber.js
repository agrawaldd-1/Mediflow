import { Counter } from "../models/counter.js";

export const generateInvoiceNumber = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "invoice" },
        {
            $inc: {
                sequence: 1,
            },
        },
        {
            new: true,
            upsert: true,
        }
    );

    return counter.sequence;
};