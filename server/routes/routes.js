const express = require("express");
const controller = require('../controller/userController');
const auth = require('../middlewares/auth')

const router = express.Router();

router.post("/user/register", controller.addUser);
// for login
router.post("/user/login", controller.loginUser);

router.post("/person/add", auth.checkToken, controller.addContact);

router.get("/person/getAll", auth.checkToken, controller.getContacts);

router.put("/person/update/:personId", auth.checkToken, controller.updateContact);

router.delete("/person/remove/:userEmail", auth.checkToken, controller.deleteContact);
module.exports = router;