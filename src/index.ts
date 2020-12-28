import { config } from "dotenv";
import "reflect-metadata";

config({ path: ".env" });
console.log(process.env.PORT);
