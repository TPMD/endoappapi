import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    return res.send(200)
  })

export default router