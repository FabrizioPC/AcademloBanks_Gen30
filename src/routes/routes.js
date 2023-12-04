import express from 'express';
import { router as userRouter } from '../modules/users/user.route.js';
import { router as transferRouter } from '../modules/transfers/transfers.route.js';
export const router = express.Router();

router.use('/users', userRouter);
router.use('/transfers', transferRouter);
