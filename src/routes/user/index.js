import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { registration, getDetailsUser, updateUser, getListUser, deleteUser, changePasswordUser, 
        getUsersByRole, changeEtatUser } from "./controllers";

const router = new Router();

router.post('/register',
    // token({ required: true}),
    body({
        firstName: {
            type: String,
            trim: true,
            required: true
        },
        lastName: {
            type: String,
            trim: true,
            required: false
        },
        phone: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            minlength: 5
        }
    }), registration)

router.put('/edit/:id',
    token({ required: true }),
    body({
        firstName: {
            type: String,
            trim: true,
            required: true
        },
        lastName: {
            type: String,
            trim: true,
            required: true
        },
        phone: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: true
        },
    }), updateUser)

router.put('/password/:id',
    token({ required: true }),
    body({
        oldPassword: {
            type: String,
            trim: true,
            required: true
        },
        newPassword: {
            type: String,
            trim: true,
            required: true
        },
        repeatNewPassword: {
            type: String,
            trim: true,
            required: true
        }
    }), changePasswordUser)

router.get('/liste',
    token({ required: true}),
    getListUser)

router.get('/:id',
    token({ required: true}),
    getDetailsUser)

router.delete('/trash/:id',
    token({ required: true}),
    deleteUser)

router.get('/liste/:role',
    token({ required: true}),
    getUsersByRole)

router.put('/state/:id',
    token({ required: true }),
    body({
        state: {
            type: Boolean,
            required: true
        }
    }), changeEtatUser)

export default router;