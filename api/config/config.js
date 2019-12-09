const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    username: process.env.USERNAME_ADMIN,
    userPassword: process.env.USER_PASSWORD_ADMIN
};