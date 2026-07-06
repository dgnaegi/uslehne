import { Router } from 'express'
import { transactionDecisionsRouter } from './transactionDecisions'
import { transactionConfirmRouter } from './transactionConfirm'
import { transactionRateRouter } from './transactionRate'

const router = Router()
router.use(transactionDecisionsRouter)
router.use(transactionConfirmRouter)
router.use(transactionRateRouter)

export { router as transactionActionsRouter }
