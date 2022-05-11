import { Router } from 'express'
import { sendHttpError } from '../middleware'

import auth from './auth'
import user from './user'
import Role from "./role";

const router = new Router()

// permet de generer des erreurs perso - sendHttpError - sendUserError
router.use(sendHttpError)
router.use('/auth', auth)
router.use('/user', user)
router.use('/role/user', Role)

export default router