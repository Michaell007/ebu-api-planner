import { Router } from 'express'
import { sendHttpError } from '../middleware'

import auth from './auth'
import user from './user'
import demande from './demande';
import evenement from './evenement';
import commande from './commande';
import typeEvenement from './typeEvenement';
import participant from './participant';
import ville from './ville';

import Role from "./role";

const router = new Router()

// permet de generer des erreurs perso - sendHttpError - sendUserError
router.use(sendHttpError)
router.use('/auth', auth)
router.use('/user', user)
router.use('/demande', demande)
router.use('/evenement', evenement)
router.use('/commande', commande)
router.use('/typeEvenement', typeEvenement)
router.use('/participant', participant)
router.use('/ville', ville)


router.use('/role/user', Role)

export default router