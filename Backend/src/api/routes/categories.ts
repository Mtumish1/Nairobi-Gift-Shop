import { Router } from 'express';
import { getAllCategories, getProductsByCategory } from '../controllers/categoryController';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id/products', getProductsByCategory);

export default router;
