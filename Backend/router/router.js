const express = require("express");
const router = express.Router();
const navRoute = require("../controller/controller.js");
const signupSchema = require("../validator/auth-validator.js");
const signinSchema = require("../validator/singin-validator.js");
// const contactSchema = require("../validator/contact-validator.js");
const validate = require("../validator/middleware/validate-middleware.js");
const authMiddleware = require("../validator/middleware/auth-middleware.js")

router.route("/").get(navRoute.home);
router.route("/work").get(navRoute.work);
router.route("/contact").post(navRoute.contact);
router.route("/register").post(validate(signupSchema),navRoute.register);
router.route("/login").post(validate(signinSchema),navRoute.login);
router.route("/user").get(authMiddleware,navRoute.user);

module.exports = router;