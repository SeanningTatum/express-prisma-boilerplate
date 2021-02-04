import './moduleAlias';
import * as bodyParser from 'body-parser';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import userRoutes from './api/v1/user/user.routes';
import postRoutes from './api/v1/posts/posts.routes';
import categoryRoutes from './api/v1/category/category.routes';
import swaggerDocs from './config/swagger';
import { PORT } from './constants/config';

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/category', categoryRoutes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(PORT, () => console.log(
  `🚀 Server ready at: http://localhost:${PORT}\n
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`,
));

// TODO: Add validation, plop-templates and deployment options
