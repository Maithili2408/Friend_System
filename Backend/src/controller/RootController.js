import express from 'express';
import AccountController from './AccountController';
 
import HealthCheckController from './HealthCheck';

import PostController from './PostController';


const router = express.Router();

router.use('/api/v1/account',AccountController);

router.use('/api/v1/posts',PostController);

router.use('/api/v1', HealthCheckController);

// add more routes



export default router;