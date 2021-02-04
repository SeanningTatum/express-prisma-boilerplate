import { Router } from 'express';
import createPost from './createPost';
import getPostsByCategory from './getPostsByCategory';
import getPostsByUser from './getPostsByUser';

const router = Router();

router.get('/:categoryName', getPostsByCategory);
router.get('/', getPostsByUser);
router.post('/:userId', createPost);

export default router;
