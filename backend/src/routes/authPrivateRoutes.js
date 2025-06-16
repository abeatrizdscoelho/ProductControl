import express from 'express';
const router = express.Router();
import { userList } from '../controllers/authPrivateController.js';

router.get('/userList', userList);

export default router;