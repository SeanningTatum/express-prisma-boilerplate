import { Router } from 'express';
import { validate } from 'express-validation';
import createPost, { createPostValidation } from './createPost';
import getPostsByCategory, { getPostsByCategoryValidation } from './getPostsByCategory';
import getPostsByUser, { getPostsByUserValidation } from './getPostsByUser';

const router = Router();

router.get('/', validate(getPostsByCategoryValidation), getPostsByCategory);
router.get('/:userId', validate(getPostsByUserValidation), getPostsByUser);
router.post('/:userId', validate(createPostValidation), createPost);

export default router;
