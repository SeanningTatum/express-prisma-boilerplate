import { Router } from 'express';
import createCategory from './createCategory';
import getCategories from './getCategories';

const router = Router();

router.get('/', getCategories);
router.post('/', createCategory);

export default router;
