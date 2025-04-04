import express from 'express'
import { admitPatient, dischargePatient, getAdmittedPatients, getAllPatients, getDischargedPatients } from '../controller/patientController.js'

const router = express.Router()

router.get('/admitted',getAdmittedPatients)
router.get('/discharged',getDischargedPatients)
router.get('/all',getAllPatients)
router.post('/admit',admitPatient)
router.put('/:id/discharge',dischargePatient)

export default router