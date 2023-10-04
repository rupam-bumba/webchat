const express = require("express");
const router = express.Router();




let singup = require("../controller/users/singup")
router.post("/sing-up",  singup.post);

let login = require("../controller/users/login")
router.post("/log-in",  login.post);

let list_users = require("../controller/users/list_users")
router.get("/list-users",  list_users.get);




module.exports = router;