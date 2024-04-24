import express, { application } from 'express';
import PostService from '../services/PostService';
const router = express.Router();
const postService = new PostService();




router.get('')
// router.get('id');
export default router
