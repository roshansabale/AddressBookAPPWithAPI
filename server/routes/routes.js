const express = require("express");
const controller = require('../controller/userController');
const auth = require('../middlewares/auth')

const router = express.Router();

router.post("/user/register", controller.addUser);
// for login
router.post("/user/login", controller.loginUser);

router.post("/addContact", auth.checkToken, controller.addContact);

router.get("/user/getAll", auth.checkToken, controller.getContacts);

router.post("/user/update", auth.checkToken, controller.updateContact);

router.delete("/remove/:userEmail", auth.checkToken, controller.deleteContact);
module.exports = router;