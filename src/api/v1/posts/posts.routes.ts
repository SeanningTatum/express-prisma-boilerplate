import { Router } from 'express';
import createPost from './createPost';
import getPostsByCategory from './getPostsByCategory';
import getPostsByUser from './getPostsByUser';

const router = Router();

router.get('/', getPostsByCategory);
router.get('/:userId', getPostsByUser);
router.post('/:userId', createPost);

export default router;
