import { updateUser } from '../controller/user.controller.js'
import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.put("/update/:userId", verifyToken, updateUser)

export default router