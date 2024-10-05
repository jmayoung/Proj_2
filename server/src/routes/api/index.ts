import { userRouter } from './user-routes';
import express from 'express';
import { cocktailRouter } from './cocktail-routes';
import { recipeRouter } from './recipe-routes';
const router = express.Router();

router.use('/users', userRouter);
router.use('/recipes', recipeRouter)
router.use('/cocktails', cocktailRouter)

export default router;
