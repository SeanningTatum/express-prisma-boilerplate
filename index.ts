import { PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";
import express from "express";
import userRoutes from './src/api/v1/user/user.routes'
import postRoutes from './src/api/v1/posts/posts.routes'

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/post', postRoutes)

const server = app.listen(3000, () =>
  console.log(
    "🚀 Server ready at: http://localhost:3000\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api"
  )
);

// TODO: Add validation, swagger and deployment options
