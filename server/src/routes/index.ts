import apiRoutes from './api/index';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

//TODO: import your routes
const router = express.Router();

router.use('/api', apiRoutes); 

export default router;