import express from 'express'
import { getAllAvailableBeds } from '../controller/bedController.js'

const router = express.Router()

router.get('/available',getAllAvailableBeds)

export default router