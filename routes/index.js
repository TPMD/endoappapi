import { Router } from 'express'
import doctorRouter from './doctor'
import patientRouter from './patient'
import userRouter from './user'
import imageRouter from './images'
import testRouter from './test'

let router = Router()
router.use('/user', userRouter)
router.use('/patient', patientRouter)
router.use('/doctor', doctorRouter)
router.use('/images', imageRouter)
router.use('/test', testRouter)
export default router
