import { Router } from "express";
const router = Router()
import * as rc from './room.controller.js'
import { asyncHandler } from "../../utils/errorHandler.js";




router.get('/:room', asyncHandler(rc.initialRoom))


export default router