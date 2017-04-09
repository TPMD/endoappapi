import { Router } from 'express'
import doctorRouter from './doctor'
import patientRouter from './patient'
import userRouter from './user'

let router = Router()
router.use('/user', userRouter)
router.use('/patient', patientRouter)
router.use('/doctor', doctorRouter)
export default router
