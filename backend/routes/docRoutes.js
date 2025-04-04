import express from 'express'
import { addNewDoctor, getAllDoctor , updateProfilePic } from '../controller/docController.js'
import upload from '../middlewares/multer.js'

const router = express.Router()

router.get('/get-doctors',getAllDoctor)
router.post('/add',upload.single('profileImage'),addNewDoctor)
router.post('/:id/update-p-pic',upload.single('profileImage'),updateProfilePic)

export default router