import express from 'express';
import type { Request, Response } from 'express';
import { UserRecipe } from '../../models/index.js';
const router = express.Router();


router.get('/:username', async(req: Request, res: Response) => {
    try {
        const recipes = await UserRecipe.findAll({
            where: { username: req.params.username }
        });
        res.json(recipes);
    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
});

router.post('/', async(req: Request, res: Response) => {
    const { id, username } = req.body;
    try{
        const recipes = await UserRecipe.create ({
            username,
            recipe: id,
        });
        if(recipes) {
            res.json(recipes);
        } else {
            res.status(404).json({message: 'No recipes saved'})
        }

    } catch (error: any){
        res.status(500).json({message: error.message});
    }
});

export {router as userRecipeRouter};