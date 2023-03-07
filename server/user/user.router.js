const { webFramework } = require("../shared/internalServices");
const router = webFramework.Router();

const UserController = require("../user/user.controller");

router.post("/login", UserController.login);
router.delete("/logout", UserController.authenToken, UserController.deleteToken);
router.post("/checkUsername", UserController.authenToken, UserController.isUsernameExist);
router.get("/", UserController.authenToken, UserController.getAllUser);
router.post("/", UserController.authenToken, UserController.addNewUser);
router.put("/", UserController.authenToken, UserController.changeUser);
router.delete("/", UserController.authenToken, UserController.deleteUser);

module.exports = router;
