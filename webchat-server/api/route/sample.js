const express = require("express");
const router = express.Router();

const auth  = require("../middleware/auth");

let sample = require("../controller/sample")
router.get("/sample", auth,  sample.get);



module.exports = router;