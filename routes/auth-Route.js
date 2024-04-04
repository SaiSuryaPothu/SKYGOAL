const express = require("express")
const router = express.Router()
const {login, userDetails, SignUp} = require("../controllers/auth-controller")
const {auth} = require("../middlewares/auth-middleware")

router.route("/login").post(login)

router.route("/Signup").post(SignUp)

router.route("/userdetails").get(auth,userDetails)

module.exports = router;