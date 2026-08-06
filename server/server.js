import app from "./app.js";
import dotenv from "dotenv"
import { connect_db } from "./config/db.js";
dotenv.config();
console.log(process.env.MONGO_URL);
console.log(process.env.MONGO_URI);
const port = process.env.PORT||5000;

await connect_db();
app.listen(port, () => {
  console.log(`🚀 Server Running On Port ${port}`);
});


