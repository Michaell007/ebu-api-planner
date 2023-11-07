import dotenv from 'dotenv'
dotenv.config()

module.exports = {
    root: '/api',
    PORT: process.env.PORT || '8080',
    MONGODB_URL: 'mongodb://localhost:27017/plannerdb',
    SALT: 10,
    DATABASE: {
        username: 'postgres',
        password: '',
        host: 'localhost',
        dialect: 'postgres',
        name: 'medequip'
    },
    JWT_SECRET: '0a928bc597d04fa0a6e9a10a8463c1237c0d199970c24064902a987eef915b7aa66730e8f2fe4cb6b0918c91db2f3d5e5aadef33625f4b8aba694967e61d0beab1d63308142e473680d8805c59d2bd942f429a2754404f3ba47bb430604977077d56f932c70a4fdab0b64bb6d2fa4827'
};
