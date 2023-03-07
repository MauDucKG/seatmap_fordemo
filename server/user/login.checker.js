const jwt = require("jsonwebtoken");
const User = require("./user.model");
const bcrypt = require("bcrypt");
const Token = require("../token/token.model");

const loginChecker = async (reqBody) => {
    const findUserByNameuser =  await User.findOne({username: reqBody.username});

    if (findUserByNameuser) {
        const isRight = bcrypt.compareSync(reqBody.password, findUserByNameuser.password);
        if(isRight) {
            const accessToken = jwt.sign(reqBody, process.env.ACCESS_TOKEN_SECRET);
            const newToken = new Token({
                id: findUserByNameuser._id,
                token: accessToken, 
            });
            Token.deleteMany({ id: findUserByNameuser._id}, () => newToken.save());
            return {findUserByNameuser, accessToken};
        }
    }

    return false;
}

module.exports =  loginChecker;