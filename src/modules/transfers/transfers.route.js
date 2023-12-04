import express from 'express';
import { createTransfer } from './transfers.controller.js';

export const router = express.Router();

router.route('/').post(createTransfer);
