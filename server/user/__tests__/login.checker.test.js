const db = require('./db');
const Token = require('../../token/token.model');
const User = require('../user.model');
const bcrypt = require("bcrypt");
require("dotenv").config();
const loginChecker = require('../login.checker');

beforeAll(async () => await db.connect());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

describe('Login Checker', () => {

    it.each([
        {username: "longlong_wrong", password: "12345678", invalidCase: "wrong username"},
        {username: "phihuy1208", password: "wrong_wrong", invalidCase: "wrong password"},
        {username: "luan_wrong", password: "pass_wrong", invalidCase: "wrong both username and password"},
    ])('Login fail with $invalidCase', async ({username, password}) => {
        const SALT_ROUND = 10;
        const existUser = {
            username: "phihuy1208",
            password: bcrypt.hashSync("12345678", SALT_ROUND),
            role: "hr",
            fullname: "Nguyen Thanh Long"
        }

        await new User(existUser).save();

        const userLogin = {
            username,
            password
        }
        const loginCheckerResults = await loginChecker(userLogin);

        expect(loginCheckerResults).toBeFalsy();
    })
    
    it('Login complete, delete all old token, generate new token', async () => {
        const SALT_ROUND = 13;
        const existUser = {
            username: "luanluan",
            password: bcrypt.hashSync("12345678", SALT_ROUND),
            role: "dv",
            fullname: "Nguyen Thanh Luan"
        }

        await new User(existUser).save();
        const userInfo = await User.findOne({username: "luanluan"});
        const existToken = {
            id: userInfo._id,
            token: "old_old_old"
        };
        await new Token(existToken).save();
        
        const userLogin = {
            username: "luanluan",
            password: "12345678"
        }

        const loginCheckerResults = await loginChecker(userLogin);

        const oldToken = await Token.findOne({token: "old_old_old"});
        const newToken = await Token.findOne({id: userInfo._id});

        expect(loginCheckerResults.findUserByNameuser.username).toEqual("luanluan");
        expect(loginCheckerResults.findUserByNameuser.fullname).toEqual("Nguyen Thanh Luan"); 
        expect(loginCheckerResults.findUserByNameuser.role).toEqual("dv"); 
        
        expect(oldToken).toBeFalsy();
        expect(loginCheckerResults.accessToken).toEqual(newToken.token);
    })
})