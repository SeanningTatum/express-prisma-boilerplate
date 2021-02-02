import { Prisma, PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";
import express, { Request } from "express";
import userRoutes from './src/v1/user/user.routes'
const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes)

const server = app.listen(3000, () =>
  console.log(
    "🚀 Server ready at: http://localhost:3000\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api"
  )
);
