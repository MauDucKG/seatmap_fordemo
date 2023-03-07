const jwt = require("jsonwebtoken");
const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const Token = require("../token/token.model");
const {
  throwError500,
  throwError404,
} = require("../error-handler/errorHandler");

const listRoles = ['hr', 'dv', 'qa']

const loginChecker = require("./login.checker");

const SALT_ROUND = 10;
const validUser = (user) => {
  if (user.fullname !== undefined && user.role !== undefined && user.username !== undefined && user.password !== undefined) {
    user.fullname = user.fullname.trim().replace(/\s+/g, " ");
    const checkFullname = user.fullname.length >= 5 && user.fullname.length <= 100
    const checkRole = listRoles.indexOf(user.role) >= 0
    const checkUsername = user.username.length >= 8 && user.username.length <= 30 && /^(?![_.])[a-zA-Z0-9\-_@'.]+(?<![_.])$/.test(user.username)
    const checkPassword = user.password.length >= 8 && user.password.length <= 30 && /^[a-zA-Z0-9]+$/.test(user.password)

    return checkFullname && checkRole && checkUsername && checkPassword
  }
  return false
}
class UserController {
  // method: GET, path: /user
  getAllUser(req, res) {
    User.find((err, users) => {
      if (err) {
        throwError500();
      } else {
        let user_feedback = users.map((user) => {
          let user_new = {
            fullname: user.fullname,
            _id: user._id,
            image: user.image,
            role: user.role,
            username: user.username
          }
          return user_new
        })
        res.status(200).json({
          success: true,
          message: "Done!",
          users: user_feedback
        });
      }
    });
  }
  // method: POST, path: /user
  async addNewUser(req, res) {
    try {
      if (validUser(req.body)) {
        const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUND);
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.send({ success: true, user: newUser });
      } else {
        throwError404(res)
      }
    } catch (error) {
      throwError500();
    }
  }

  // method: POST, path: /user/checkUsername
  isUsernameExist(request, respond) {
    User.findOne({ username: request.body.username }, (err, user) => {
      if (err) {
        throwError500();
      } else {
        respond.status(200).json({
          success: true,
          isExist: user !== null ? true : false,
        });
      }
    });
  }
  // method: PUT, path: /user
  changeUser(request, respond) {
    User.findOneAndUpdate(
      { _id: request.body._id },
      request.body,
      { new: true },
      (err, mapDocument) => {
        if (err) {
          throwError500(respond);
          return;
        }

        if (mapDocument !== null) {
          respond.status(200).json({
            success: true,
            message: "Done!",
          });
          return;
        }

        throwError404(respond);
      }
    );
  }

  // method: DELETE, path: /user
  deleteUser(request, respond) {
    Token.findOneAndRemove({ id: request.body._id }, (err, userDocument) => { });

    User.findOneAndRemove({ _id: request.body._id }, (err, userDocument) => {
      if (err) {
        throwError500(respond);
        return;
      }

      if (userDocument !== null) {
        respond.status(200).json({
          success: true,
          message: "Done!",
        });
        return;
      }

      throwError404(respond);
    });
  }

  async login(req, res) {
    const checkUser = await loginChecker(req.body);
    if (!checkUser) {
      res.status(200).json({
        success: true,
        message: "Fail!",
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: "Done!",
        user: checkUser.findUserByNameuser,
        token: checkUser.accessToken,
      });
    }
  }

  //
  deleteToken(req, res) {
    Token.findOneAndRemove({ token: req.headers["authorization"] }, (err, userDocument) => {
      if (err) {
        throwError500(res);
        return;
      }

      if (userDocument !== null) {
        res.status(200).json({
          success: true,
          message: "Done!",
        });
        return;
      }

      throwError404(res);
    });
  }
  // method authorization the token
  authenToken(req, res, next) {
    const user_token = req.headers["authorization"];
    Token.find((err, tokens) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
        });
        console.log(err.message);
      } else {
        for (var i = 0; i < tokens.length; i++) {
          if (tokens[i].token === user_token) {
            if (!user_token) res.sendStatus(401);

            jwt.verify(
              user_token,
              process.env.ACCESS_TOKEN_SECRET,
              (err, data) => {
                if (err) {
                  res.sendStatus(403);
                  return;
                }
                next();
              }
            );
          }
        }
      }
    });
  }
}

module.exports = new UserController();
