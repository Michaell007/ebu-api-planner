import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { registration, getDetailsUser, updateUser, getListUser, deleteUser } from "./controllers";

const router = new Router();

router.post('/register',
    token({ required: true}),
    body({
        username: {
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
        nom: {
            type: String,
            required: true,
            minlength: 5
        },
        prenom: {
            type: String,
            required: true,
            minlength: 5
        },
        RoleId: {
            type: Number,
            required: true
        },
        embaucheDate: { //'2022-01-17'
            type: String,
            required: false
        },
    }), registration)

router.put('/edit/:id',
    token({ required: true, admin_super: true }),
    body({
        username: {
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
        embaucheDate: { //'2022-01-17'
            type: String,
            required: false
        },
        nom: {
            type: String,
            required: true,
            minlength: 5
        },
        prenom: {
            type: String,
            required: true,
            minlength: 5
        },
        RoleId: {
            type: Number,
            required: true
        }
    }), updateUser)

router.get('/:id',
    token({ required: true}),
    getDetailsUser)

router.get('/liste',
    token({ required: true}),
    getListUser)

router.delete('/delete/:id',
    token({ required: true}),
    deleteUser)

export default router;