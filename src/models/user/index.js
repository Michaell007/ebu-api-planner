import mongoose, { Schema } from "mongoose";
import _ from "lodash";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const types = {
    PARTICULIER: "PARTICULIER",
    PROFESSIONNEL: "PROFESSIONNEL",
    CLIENT: "CLIENT",
};

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: null,
    },
    lastName: {
        type: String,
        trim: true,
        default: null,
    },
    phone: {
        type: String,
        // match: /^\+\d{2,20}$/,
        unique: true,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: [types.PARTICULIER, types.PROFESSIONNEL, types.CLIENT],
        default: types.PARTICULIER,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

// userSchema.pre('save', function(next) {
//   if(this.password === '' || this.password === null) {
//       const salt = bcrypt.genSaltSync(SALT_ROUNDS)
//       this.password  = bcrypt.hashSync(_.trim(this.password), salt)
//   }
//   next()
// })

userSchema.methods = {
    view(full) {
        let view = {};
        let fields = ["id", "firstName", "lastName", "phone", "email", "type"];

        if (full) {
            fields = [...fields, "phone", "email", "createdAt", "updatedAt"];
        }

        fields.forEach((field) => {
            view[field] = this[field];
        });

        return view;
    },

    getVerificationCodeDelay() {
        return 30; // 30 seconds
    },

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    async checkPassword(password) {
        const match = await bcrypt.compare(password, this.password);
        return match;
    },

    activationAccount() {
        this.isActive = true;
        return this.save();
    },

    changePassword({ new_password }) {
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        this.password = bcrypt.hashSync(_.trim(new_password), salt);
        return this.save();
    },

    isProfessionnel() {
        return this.type === types.PROFESSIONNEL;
    },

    async generatePasswordReset() {
        // genaration du code
        this.passwordVerification.code = generateCode(4);
        this.passwordVerification.expiredAt = Date.now() + 3600000; //expires in an hour
        // generation du token
        // this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        // this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour

        // register
        this.save();

        // Create user token verification -> permetttra plus tard de rechercher le user via ce token instance
        // const token = await TokenVerification.create({ _userId: this._id, token: crypto.randomBytes(16).toString('hex') })
        // send email link token via email password for reset
        // const link = `${publicHost}/user/reset-password/${this.resetPasswordToken}`
        // send code via email user
        await sendMailPasswordRecover({ name: this.getFullName(), toEmail: this.email, code: this.passwordVerification.code });
    },
};

userSchema.statics = {
    createUserInstance(data) {
        // hashing pass
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const cryptpwd = bcrypt.hashSync(_.trim(data.password), salt);

        const dataset = {
            ...data,
            password: cryptpwd,
            type: types.PROFESSIONNEL,
        };
        return this.create(dataset);
    },

    createDemandeurInstance(data) {
        // hashing pass
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const cryptpwd = bcrypt.hashSync(_.trim(data.password), salt);

        const dataset = {
            ...data,
            password: cryptpwd,
            type: types.DEMANDEUR,
        };
        return this.create(dataset);
    },

    createProfessionnelInstance(data) {
        // hashing pass
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const cryptpwd = bcrypt.hashSync(_.trim(data.password), salt);

        const dataset = {
            ...data,
            password: cryptpwd,
            type: types.PROFESSIONNEL,
        };
        return this.create(dataset);
    },

    findUserByEmail(email) {
        return this.findOne(email);
    },

    findUserByPhone(phone) {
        return this.findOne(phone);
    },
};

// userSchema.plugin(timestampPlugin);

const model = mongoose.model("User", userSchema);

export const schema = model.schema;
export default model;
