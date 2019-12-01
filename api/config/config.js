const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    user: 'cvkkzmxa',
    saltRounds: process.env.SALTROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    expireTime: process.env.EXPIRE_TIME,
    serviceUrls:
    {
        userService: process.env.USER_SERVICE,
        shoppingService: process.env.SHOPPING_SERVICE,
        todoService: process.env.TODO_SERVICE
    }
};